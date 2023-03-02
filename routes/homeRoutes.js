const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cherio = require('cherio');

const gut = require('gut');
const { default: puppeteer } = require('puppeteer');

// const scrapper = require('./scrappAll');

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();


router.get('/', (req, res) => {
    res.render('home')
});

router.get('/indeed', (req, res) => {
    res.render('indeed')
});

router.get('/webApi', (req, res) => {
    res.render('scrapper', { value: '', siteUrl: '' });
});
router.get('/imgApi', (req, res) => {
    res.render('imageScrapper', { value: '', siteUrl: '' });
});
router.get('/numb', (req, res) => {
    res.render('imageScrapper', { value: '', siteUrl: '' });
});

router.get('/url', (req, res) => {
    res.json(JSON.parse(siteUrl));
});




router.post('/webApi', urlencodedParser, async (req, res) => {
    let siteUrl = req.body.inputData;
    let value;

    await (async () => {
        // const browser = await puppeteer.launch({
        //     headless: true
        // });

        // const page = await browser.newPage();

        // await page.goto(siteUrl);

        // await page.screenshot({ path: "scrapperImages/images" });


        var writeStream = fs.createWriteStream("./public/scrapData/userEmailsLink.txt", "utf-8");

        request(siteUrl, (err, res, html) => {
            if (!err && res.statusCode == 200) {
                // showToast()
                console.log("Request was success");

                const $ = cherio.load(html);



                value = $('a').each((index, userEmail) => {
                    var email = $(userEmail).attr('href') || $(userEmail).attr('href').replace('mailto:', '');
                    // var baseUrl = siteUrl
                    var Links = siteUrl + email;

                    console.log(Links);

                    writeStream.write(Links);
                    writeStream.write(siteUrl);
                    writeStream.write("\n")
                    console.log(siteUrl);
                })
            } else {
                // showToast();
                console.log("Request Failed");
            }
        })
        // console.log(siteUrl);
        // await browser.close();

    })();
    await res.render('scrapper', { value: value, siteUrl: siteUrl });
    // res.json({ value: value, siteUrl: siteUrl });
    // res.json(JSON.parse(siteUrl));


})



router.post('/imgApi', urlencodedParser, async (req, res) => {
    let siteUrl = req.body.inputData;
    let value;

    var writeStream = fs.createWriteStream("./public/scrapData/ImagesLink.txt", "utf-8");

    request(siteUrl, (err, res, html) => {
        if (!err && res.statusCode == 200) {


            const $ = cherio.load(html);

            $("img").each((index, image) => {
                var img = $(image).attr('src');
                // var baseUrl = siteUrl
                var Links = siteUrl + img;

                console.log(Links);
                writeStream.write(Links);
                writeStream.write("\n")
            })
        } else {
            console.log("Request Failed");
        }

    })
    await res.render('imageScrapper', { value: value, siteUrl: siteUrl });
})

router.post('/numb', urlencodedParser, async (req, res) => {
    let siteUrl = req.body.inputData;
    let value;

    var writeStream = fs.createWriteStream("./public/scrapData/Numbers.txt", "utf-8");

    request(siteUrl, (err, res, html) => {
        if (!err && res.statusCode == 200) {


            const $ = cherio.load(html);


            writeStream.write(Links);
            writeStream.write("\n")
        } else {
            console.log("Request Failed");
        }

    })
    await res.render('numbScrapper', { value: value, siteUrl: siteUrl });
})

module.exports = router;