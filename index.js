const puppeteer = require('puppeteer')
const fs = require('fs/promises')

async function start() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://en.wikipedia.org/wiki/List_of_current_United_States_senators")
    // await page.screenshot({path: "congress.png", fullPage: true})

    const names = await page.evaluate(() => {
       return  Array.from(
            document.querySelectorAll("#senators > tbody > tr > th > span > span > span > a")).map(x => x.textContent)
    })
    await fs.writeFile("senate-names.txt", names.join("\r\n"))

    await browser.close()
}

start()