const fs = require('fs');
const puppeteer = require('puppeteer');

const data = {
    list: []
}

async function main(linkedInScrapper) {
    // lauches chromium

    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage();

    // https://www.linkedin.com/mypreferences/d/categories/sign-in-and-security
    await page.goto(`https://www.linkedin.com/in/${linkedInScrapper}`, {
        timeout: 0,
        waitUntil: 'networkidle0'
    });

    const pdf = page.pdf({
        path: '',
        format: "A4"
    });

    const screenshot = page.screenshot({
        path: '',
        fullPage: true
    })


    const linkedIn = await page.evaluete(async (data) => {
        const scrapperDiv = document.querySelectorAll("category-text-container ")
        scrapperDiv.forEach((item, index) => {
            console.log(`scraping data of product: ${index}`);
            const emailDetails = item.querySelector('category-text__name sans-medium ')?.innerText;
            const phoneDetails = item.querySelector('category-text__name sans-medium ')?.innerText;


            data.list.push({
                emailDetails,
                phoneDetails
            })
        });
        return data
    }, data);

    console.log(`sucessfully collected ${linkedIn.list.length} products`);

    let response = await linkedIn;

    let json = JSON.stringify(linkedIn, null, 2);
    fs.writeFile('linkendIn.json', json, 'utf-8', () => {
        console.log('written in LinkedIn');

    })

    await browser.close();
    return response;
}

module.exports = main;