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

const cities = [1180];
const productByBarcode = {};

const importData = async () => {
    console.log("seeder init");

    await Product.deleteMany();
    console.log("cleared products");

    for (let cityId of cities) {
        try {
            const { data: stores } = await axios.post("https://api.superget.co.il/", null, {
                params: {
                    api_key: "80e1f6c1d63013ef2697cf0b7f62fef95b9ca118",
                    action: "GetStoresByCityID",
                    city_id: cityId,
                    limit: 1,
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
                                api_key: "80e1f6c1d63013ef2697cf0b7f62fef95b9ca118",
                                action: "GetPrice",
                                store_id: store.store_id,
                                limit: 3,
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
                        console.log(productByBarcode);
                    }
                } catch (error) {
                    console.error(error);
                    console.error("failed at GetPrice");
                    process.exit(1);
                }
            }

            console.log("Data Imported!");
            process.exit(0);
        } catch (error) {
            console.error(error);
            console.error("failed at GetStoresByCityID");
            process.exit(1);
        }
    }
    console.log("start insert");
    let finalProducts = [...productByBarcode.values()];
    console.log(finalProducts);
    await Product.insertMany(finalProducts);
    console.log("finish insert");
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
