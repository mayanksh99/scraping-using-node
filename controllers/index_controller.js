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
			let links = Object.keys(elements).map(key => {
				let date = elements[key].querySelector("td:nth-child(2)")
					.innerText;
				let day = new Date(date);
				let today = new Date("2020-04-17");
				// if (day.toDateString() === today.toDateString()) {
				// 	return elements[key]
				// 		.querySelector("td > a")
				// 		.getAttribute("href");
				// }
				return (
					day.toDateString() === today.toDateString() &&
					elements[key].querySelector("td > a").getAttribute("href")
				);
			});
			return links;
		});

		return res.status(200).json({ message: "success", data: headings });
		// await browser.close();
		// let html = await page.content();
		// let $ = cheerio.load(html);
		// $("body > div > table > tbody")
		// 	.html()
		// 	.each(el => {
		// 		console.log(el);
		// 	});
		// $("tbody").e(el => {
		// 	console.log($(el).html());
		// });
	})();
};
