const { chromium } = require('playwright');
const utils = require('../../src/utils');

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
        const screenshotBuffer = await page.screenshot();
        reporter.addAttachment("Screenshot", screenshotBuffer, "image/png");
        await browser.close();
    });

    test('statement test', async () => {
        await page.mouse.move(130, 115);
        await utils.click(page, '//a[text()=\'Выписка\']');
        await page.waitForSelector('#statement-page');
        await page.click('//a[text()=\'Прошлый месяц\']');
        await utils.click(page, '#query-button')
        await page.waitForSelector('.statement-container');
    });

    test('payment test', async () => {
        await page.click('#payments');
        await utils.click(page, '[title=\'За мобильный жены\']')
        await utils.fill(page, '.input-small.amount', '500')
        expect('50.00 ₽').toEqual(await utils.getText(page, 'span#fee-amount'));
    });

    test('add card test', async () =>{
        await page.click('#cards-overview-index');
        await utils.click(page,'a#order-new-card-link');
        await page.waitForSelector('select#type-select');
        await page.selectOption('select#type-select', {index: 8});
        await utils.click(page,'[data-debit-card-event=\'formSubmissionSuccess_travelp\']');
        await page.waitForSelector('select#card-branch[size=\'1\']');
        await page.selectOption('select#card-branch[size=\'1\']', {index: 2});
        await page.waitForSelector('//button[text()=\'Заказать\']');
    });

    test('deposit info test', async () =>{
        await utils.click(page,'#deposits-index');
        await utils.click(page,'#account-10032');
        await page.waitForSelector('#deposit-details');
    });

    test('order cash test', async () =>{
        await page.click('.filter-option.pull-left');
        await utils.click(page, '//span[contains(text(), \'Коудборн\')]');
        await utils.click(page, '//a[contains(text(), \'Закрыть\')]');
        await page.mouse.move(130, 115);
        await utils.click(page, '//a[text()=\'Касса\']');
        await utils.click(page, '#new-cash-application');
        await utils.fill(page, '.input-small.amount', '1000000');
        await page.waitForSelector('#forward');
    })
});
