import dotenv from "dotenv";
import axios from "axios";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

/**
 * Data seeder script that deletes everything from the DB, and then inserts
 * the static sample data from ./data/users.js & ./data/products.js
 *
 * @example npm run data:import
 */

const cities = [1180, 378];
const productByBarcode = {};

const importData = async () => {
    console.log("seeder init");

    await Product.deleteMany();
    console.log("cleared products");

    for (let cityId of cities) {
        try {
            console.log("current city: ", cityId);
            const { data: stores } = await axios.post("https://api.superget.co.il/", null, {
                params: {
                    api_key: "cce0c9208ec7c102d23e7823c50ecef98800f70e",
                    action: "GetStoresByCityID",
                    city_id: cityId,
                    limit: 10,
                },
            });

            for (let store of stores) {
                try {
                    console.log("current store: ", store.store_id);
                    const { data: products } = await axios.post(
                        "https://api.superget.co.il/",
                        null,
                        {
                            params: {
                                api_key: "cce0c9208ec7c102d23e7823c50ecef98800f70e",
                                action: "GetPrice",
                                store_id: store.store_id,
                                limit: 100,
                            },
                        }
                    );

                    for (let product of products) {
                        let newProduct = {};
                        if (!productByBarcode[product.product_barcode]) {
                            newProduct = {
                                name: product.product_name,
                                barcode: product.product_barcode,
                                countInStock: 5,
                                description: product.product_description,
                                locations: [
                                    {
                                        cityId: cityId,
                                        branches: [
                                            {
                                                id: store.store_id,
                                                price: product.store_product_price,
                                            },
                                        ],
                                        minPrice: product.store_product_price,
                                        branchId: store.store_id,
                                    },
                                ],
                            };
                        } else {
                            newProduct = productByBarcode[product.product_barcode];

                            let duplicateCities = false;
                            for (let i = 0; i < newProduct.locations.length; i++) {
                                if (newProduct.locations[i].cityId !== cityId) continue;
                                newProduct.locations[i].branches.push({
                                    id: store.store_id,
                                    price: product.store_product_price,
                                });
                                if (
                                    newProduct.locations[i].minPrice > product.store_product_price
                                ) {
                                    newProduct.locations[i].minPrice = product.store_product_price;
                                    newProduct.locations[i].branchId = store.store_id;
                                }
                                duplicateCities = true;
                            }
                            if (!duplicateCities) {
                                newProduct.locations.push({
                                    cityId: cityId,
                                    branches: [
                                        { id: store.store_id, price: product.store_product_price },
                                    ],
                                    minPrice: product.store_product_price,
                                    branchId: store.store_id,
                                });
                            }
                        }
                        newProduct.category = "non";
                        productByBarcode[newProduct.barcode] = newProduct;
                    }
                } catch (error) {
                    console.error(error);
                    console.error("failed at GetPrice");
                    process.exit(1);
                }
            }
        } catch (error) {
            console.error(error);
            console.error("failed at GetStoresByCityID");
            process.exit(1);
        }
    }
    console.log("start insert");

    let finalProducts = Object.values(productByBarcode);
    await Product.insertMany(finalProducts);

    console.log("Data Imported!");
    process.exit(0);
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
