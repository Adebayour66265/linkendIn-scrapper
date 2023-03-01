const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');

const gut = require('gut');


const urlencodedParser = bodyParser.urlencoded({ extends: false });
const router = express.Router();



router.post('/webApi', urlencodedParser, async (req, res) => {
    let url = req.body.myurl;


    await (async () => {
        const resultFromRespos = gut(url)
        console.log(url);

        let siteUrl = 'https://theeagleonline.com.ng/'


        var writeStream = fs.createWriteStream("userEmailsLink.txt", "utf-8");

        request(siteUrl, (err, res, html) => {
            if (!err && res.statusCode == 200) {
                console.log("Request was success");

                const $ = cherio.load(html);

                $("a").each((index, userEmail) => {
                    var a = $(userEmail).attr('mailto');
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
    })


    res.send('sent')
})



module.exports = router;