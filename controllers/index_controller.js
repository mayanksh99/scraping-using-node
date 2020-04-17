const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
require("dotenv").config();

module.exports.index = (req, res) => {
	return res.json({ message: "Welcome to API" });
};

module.exports.getData = (req, res) => {
	(async () => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto("https://yourstory.com/sitemap_index.xml");
		const headings = await page.evaluate(() => {
			let elements = document.querySelectorAll(
				"body > div > table > tbody > tr"
			);
			return elements.forEach(el => {
				console.log(el);
				// let articles = [];
				// return el.querySelector("td > a").getAttribute("href");
			});
		});
		console.log(headings);
	})();
};
