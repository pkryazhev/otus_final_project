
exports.getText = async (page, selector) => {
    try {
        await page.waitForSelector(selector)
        return await page.$eval(selector, element => element.textContent)
    }
    catch (error) {
        throw new Error(`Не удалось получить текст из ${selector}`)
    }
}

exports.click = async (page, selector) =>{
    await page.waitForSelector(selector);
    await page.click(selector);
};

exports.fill = async (page, selector, text) =>{
    try {
        await page.waitForSelector(selector);
        await page.fill(selector, text);
    }
    catch (error){
        throw new Error(`Не удалось кликнуть по ${selector}`)
    }
};