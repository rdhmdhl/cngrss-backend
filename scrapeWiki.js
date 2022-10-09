// scape wiki for senators
// not finished
async function startScrape() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://en.wikipedia.org/wiki/List_of_current_United_States_senators")
    // take screenshot
    // await page.screenshot({path: "congress.png", fullPage: true})

    const names = await page.evaluate(() => {
       return  Array.from(
            document.querySelectorAll("#senators > tbody > tr > th > span > span > span > a")).map(x => x.textContent)
    })

    const states = await page.evaluate(() => {
       return  Array.from(
            document.querySelectorAll("#senators > tbody > tr > td:nth-child(1) > a")).map(x => x.textContent)
    })

    await fs.writeFile("senator-names.txt", names.join("\r\n"))
    await fs.writeFile("states.txt", states.join("\r\n"))

    await browser.close()
}
startScrape()



