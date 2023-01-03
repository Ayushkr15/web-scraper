const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()


const url = "https://medimonks.com/shop/";

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        $(".woocommerce-loop-product__title", html).each(function () {
          const title = $(this).find("a").text();
          articles.push(title)
        });

        $(".product-loop-wrapper", html).each(function () {
          //const title = $(this).text();
          const url = $(this).find("img").attr("src");
          articles.push({
           // title,
            url,
          });
        });
        console.log(articles)
    }).catch(err => console.log(err))

app.listen( PORT, () => console.log(`server running on PORT ${PORT}`))