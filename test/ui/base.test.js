const { chromium } = require('playwright');
const authorizationComponent = require('../../src/components/authorizationComponent');
const utils = require('../../src/utils');
const statementComponent = require('../../src/components/statementComponent');
const paymentComponent = require('../../src/components/paymentComponent');
const cardComponent = require('../../src/components/cardComponents');
const depositComponent = require('../../src/components/depositComponents');
const userComponent = require('../../src/components/userComponent');

describe('online bank test', () => {

    let page;
    let browser;

    beforeEach(async () => {
        browser = await chromium.launch({headless: true, args: ['--no-sandbox']});
        page = await browser.newPage();
        await authorizationComponent.authorization(page);
    });

    afterEach(async () =>{
        const screenshotBuffer = await page.screenshot();
        await reporter.addAttachment("Screenshot", screenshotBuffer, "image/png");
        await browser.close();
    });

    test('statement test', async () => {
        await statementComponent.goToStatement(page);
        await statementComponent.setStatementFilter(page);
        expect(`Период: ${utils.getCurrentDate()} - ${utils.getCurrentDate()}`).toEqual(await utils.getText(page, '.statement-header > div:nth-child(3)'));
    });

    test('payment test', async () => {
        await paymentComponent.goToMobilePayment(page);
        await paymentComponent.setMobilePaymentFields(page);
        expect('50.00 ₽').toEqual(await utils.getText(page, 'span#fee-amount'));
    });

    test('add card test', async () => {
        await cardComponent.goToCardPage(page);
        await cardComponent.addNewCard(page);
        expect('Заказать').toEqual(await utils.getText(page, '//button[text()=\'Заказать\']'));
    });

    test('deposit info test', async () => {
        await depositComponent.goToDeposit(page);
        expect(utils.getCurrentDate()).toEqual(await utils.getText(page, '#deposit-orderDate > div > span'));
    });

    test('order cash test', async () => {
        await userComponent.switchToULUser(page);
        await statementComponent.goToCashbox(page);
        await statementComponent.addNewCashWithdrawal(page);
        expect('Подтверждение заявки на бронирование ').toEqual(await utils.getText(page, '.page-header > h1'));
    })
});
