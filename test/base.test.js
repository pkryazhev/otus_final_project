const { chromium } = require('playwright');
const utils = require('../src/utils');

describe('online bank test', () => {

    let page;
    let browser;

    beforeEach(async () => {
        browser = await chromium.launch({headless : false, slowMo : 100});
        page = await browser.newPage();
        await page.goto('https://idemo.bspb.ru/');
        await page.waitForSelector('#login-button');
        await page.click('#login-button');
        await page.waitForSelector('#otp-code');
        await page.click('#login-otp-button');
        await page.waitForSelector('div.navbar');
    });

    afterEach(async () =>{
        await browser.close();
    });

    test('statement test', async () => {
        await page.mouse.move(130, 115);
        await page.waitForSelector('//a[text()=\'Выписка\']');
        await page.click('//a[text()=\'Выписка\']');
        await page.waitForSelector('#statement-page');
        await page.click('//a[text()=\'Прошлый месяц\']');
        await page.waitForSelector('#query-button');
        await page.click('#query-button');
        await page.waitForSelector('.statement-container');
    });

    test('payment test', async () => {
        await page.click('#payments');
        await page.waitForSelector('[title=\'За мобильный жены\']');
        await page.click('[title=\'За мобильный жены\']');
        await page.waitForSelector('.input-small.amount');
        await page.fill('.input-small.amount', '500');
        expect('50.00 ₽').toEqual(await utils.getText(page, 'span#fee-amount'));
    });
});
