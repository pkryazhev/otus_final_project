//Методы, связанные с авторизацией

const config = require('../../jest.config');


/**
 * Открытие страницы авторизации и вход в систему
 * @param page - текущая страница
 */
exports.authorization = async (page) => {
    await page.goto(config.testURL);
    await page.waitForSelector('#login-button');
    await page.click('#login-button');
    await page.waitForSelector('#otp-code');
    await page.click('#login-otp-button');
    await page.waitForSelector('div.navbar');
}