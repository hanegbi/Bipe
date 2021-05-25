import puppeteer from "puppeteer";
import dotenv from "dotenv";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const getImages = async () => {
    // try {
        // await Product.deleteMany();
        const products = await Product.find()
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
        );
        for (let product of products){
            const url = `https://www.google.com/search?q=${product.name}&source=lnms&tbm=isch`
            await page.goto(url);
            try {
                await page.waitForSelector("img.rg_i");

            } catch (error) {
                console.log(`Error has occurred ocuccrd with ${product.name}`)
                continue
            }

            const image = await page.$eval("img.rg_i", (img) => {
                return img.getAttribute('src');
            });
            var updateImage = { $set: {image: image} };
            await Product.updateOne(product,updateImage)
            console.log(`Updated ${product.name}`)
        }
    
        await browser.close();
        console.log("finish scraping");


    
};

if (process.argv[2] == "-d") {
} else {
    getImages();
}
