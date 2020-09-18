const { chromium } = require('playwright');
const utils = require('../../src/utils');
const config = require('/jest.config')

describe('online bank test', () => {

    let page;
    let browser;

    beforeEach(async () => {
        browser = await chromium.launch({headless: true, args: ['--no-sandbox']});
        page = await browser.newPage();
        await page.goto(config.testURL);
        await page.waitForSelector('#login-button');
        await page.click('#login-button');
        await page.waitForSelector('#otp-code');

    });

    afterEach(async () =>{
        const screenshotBuffer = await page.screenshot();
        await reporter.addAttachment("Screenshot", screenshotBuffer, "image/png");
        await browser.close();
    });

    test('statement test', async () => {
        await page.waitForSelector('#otp-code');
    });

    test('payment test', async () => {
        await page.waitForSelector('#otp-code');
    });

    test('add card test', async () =>{
        await page.waitForSelector('#otp-code');
    });

    test('deposit info test', async () =>{
        await page.waitForSelector('#otp-code');
    });

    test('order cash test', async () =>{
        await page.waitForSelector('#otp-code');
    })
});
