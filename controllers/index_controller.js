const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
require("dotenv").config();

module.exports.index = (req, res) => {
	return res.json({ message: "Welcome to API" });
};

module.exports.getData = async (req, res) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const getLinks = async url => {
		await page.goto(url);
		const heading = await page.evaluate(() => {
			let elements = document.querySelectorAll(
				"body > div > table > tbody > tr"
			);
			let links = Object.keys(elements).map(key => {
				let date = elements[key].querySelector("td:nth-child(2)")
					.innerText;
				let weekLinks = [];
				let day = new Date(date);
				let today = new Date("2020-04-18");

				if (day.toDateString() === today.toDateString())
					weekLinks.push(
						elements[key]
							.querySelector("td > a")
							.getAttribute("href")
					);
				else return;

				return weekLinks;
			});
			return links;
		});
		var filtered = heading.filter(function (el) {
			return el != null;
		});

		return filtered;
	};
	let weekLinks = await getLinks("https://yourstory.com/sitemap_index.xml");
	for (let i = 0; i < weekLinks.length; i++) {
		let url = weekLinks[i][0];
		await page.goto(url);
		const heading = await page.evaluate(() => {
			let elements = document.querySelectorAll(
				"body > div > table > tbody > tr"
			);
			return elements;
		});
		console.log(heading);
	}
	let sites = weekLinks.forEach(async site => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		const heading = await page.evaluate(() => {
			let elements = document.querySelectorAll(
				"body > div > table > tbody > tr"
			);
			// 	let links = Object.keys(elements).map(key => {
			// 		let date = elements[key].querySelector("td:nth-child(3)")
			// 			.innerText;
			// 		let weekLinks = [];
			// 		let day = new Date(date);
			// 		let today = new Date("2020-04-18");

			// 		if (day.toDateString() === today.toDateString())
			// 			weekLinks.push(
			// 				elements[key]
			// 					.querySelector("td > a")
			// 					.getAttribute("href")
			// 			);
			// 		else return;

			// 		return weekLinks;
			// 	});
			// 	return links;
			return elements;
		});
		// var filtered = heading.filter(function (el) {
		// 	return el != null;
		// });

		await browser.close();
		return heading;
	});

	// (async () => {
	// 	const browser = await puppeteer.launch();
	// 	const page = await browser.newPage();
	// 	await page.goto("https://yourstory.com/sitemap_index.xml");
	// 	const headings = await page.evaluate(() => {
	// 		let elements = document.querySelectorAll(
	// 			"body > div > table > tbody > tr"
	// 		);
	// 		let links = Object.keys(elements).map(key => {
	// 			let date = elements[key].querySelector("td:nth-child(2)")
	// 				.innerText;
	// 			let weekLinks = [];
	// 			let day = new Date(date);
	// 			let today = new Date("2020-04-18");

	// 			if (day.toDateString() === today.toDateString())
	// 				weekLinks.push(
	// 					elements[key]
	// 						.querySelector("td > a")
	// 						.getAttribute("href")
	// 				);
	// 			else return;

	// 			return weekLinks;
	// 		});
	// 		return links;
	// 	});
	// 	var filtered = headings.filter(function (el) {
	// 		return el != null;
	// 	});
	// 	let sites = filtered.forEach(async site => {
	// 		await page.goto(site[0]);
	// 		const insidePage = await page.evaluate(() => {
	// 			let insideElement = document.querySelectorAll(
	// 				"body > div > table > tbody > tr"
	// 			);
	// 			return insideElement;
	// 		});
	// 		return insidePage;
	// 	});
	// 	console.log(sites);

	// 	// return res.status(200).json({ message: "success", data: sites });
	// 	await browser.close();
	// 	// let html = await page.content();
	// 	// let $ = cheerio.load(html);
	// 	// $("body > div > table > tbody")
	// 	// 	.html()
	// 	// 	.each(el => {
	// 	// 		console.log(el);
	// 	// 	});
	// 	// $("tbody").e(el => {
	// 	// 	console.log($(el).html());
	// 	// });
	// })();
	await browser.close();
};
