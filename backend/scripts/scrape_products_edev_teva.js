import puppeteer from "puppeteer";
import dotenv from "dotenv";
import Product from "../models/productModel.js";
import connectDB from "../config/db.js";

dotenv.config();

connectDB();

const categories_id = [
    "86632",
    "86633",
    "86944",
    "86962",
    "86967",
    "86974",
    "86971",
    "86957",
    "86983",
    "86988",
    "87029",
    "87040",
    "87067",
    "87082",
    "87102",
    "87131",
    "87105",
    "87070",
    "86951",
    "86991",
];

const categories = {
    86632: "Vegetables",
    86633: "Fruits",
    86944: "Legumes",
    86962: "Baking",
    86967: "Oils",
    86974: "Pastas",
    86971: "Sauces",
    86957: "Spices",
    86983: "Chicken",
    86988: "Dairy",
    87029: "Breads",
    87040: "Tahini",
    87067: "Canned Tomatoes",
    87082: "Cereals",
    87102: "Frozen Vegetables",
    87131: "Drinks",
    87105: "Doughs",
    87070: "Canned Fish",
    86951: "Nuts",
    86991: "Eggs",
};

const importData = async () => {
    try {
        await Product.deleteMany();

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
        );
        let count = 0;
        let products = [];
        for (const cat_id of categories_id) {
            const url = `https://www.edenteva.co.il/categories/${cat_id}/products`;
            await page.goto(url);
            await page.waitForSelector(".item");
            const category = await page.$eval("h1.title", (text) => {
                return text.innerText;
            });
            console.log(category);
            const items = await page.$$(".item");
            for (let item of items) {
                let product = {};
                try {
                    const name = await item.$eval("div.name", (text) => {
                        return text.innerText;
                    });
                    console.log(name);
                    product.name = name;
                } catch (error) {
                    continue;
                }

                try {
                    const price = await item.$eval("span.price", (text) => {
                        return text.innerText.match(/\d+\.\d+/g)[0];
                    });
                    console.log(price);
                    product.price = price;
                } catch (error) {
                    continue;
                }

                try {
                    const image = await item.$eval("div.image", (img) => {
                        return img
                            .getAttribute("style")
                            .replace('background-image: url("', "")
                            .replace('");', "")
                            .replace("medium", "large");
                    });
                    console.log(image);
                    product.image = image;
                    if (image.includes("missing-image")) {
                        console.log("there is no image");
                        continue;
                    }
                } catch (error) {
                    continue;
                }
                product.countInStock = Math.floor(Math.random() * 100);
                product.category = categories[cat_id];
                products[count++] = product;
            }
        }
        await browser.close();
        console.log("finish scraping");
        console.log(products);
        await Product.insertMany(products);
        console.log("finish insert");
    } catch (error) {
        console.log(error);
    }
};

if (process.argv[2] == "-d") {
} else {
    importData();
}
