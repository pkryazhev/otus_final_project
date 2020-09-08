
exports.getText = async (page, selector) => {
    try {
        await page.waitForSelector(selector)
        return await page.$eval(selector, element => element.textContent)
    }
    catch (error) {
        throw new Error(`Не удалось получить текст из ${selector}`)
    }
}