// Методы, связанные со счетами
const utils = require('../utils')

/**
 * Переход на страницу выписки по счету
 * @param page - текущая страница
 */
exports.goToStatement = async (page) => {
    await page.mouse.move(130, 115);
    await utils.click(page, '//a[text()=\'Выписка\']');
    await page.waitForSelector('#statement-page');
};

/**
 * Переход в раздел Касса
 * @param page - текущий экземпляр страницы
 */
exports.goToCashbox = async (page) => {
    await page.mouse.move(130, 115);
    await utils.click(page, '//a[text()=\'Касса\']');
}

/**
 * Создать новую заявку на выдачу наличных
 * @param page - текущий экземпляр страницы
 */
exports.addNewCashWithdrawal = async (page) => {
    await utils.click(page, '#new-cash-application');
    await utils.fill(page, '.input-small.amount', '1000000');
    await page.click('#forward');
}

/**
 * Установка фильтра для выписки -  в данном случае на "Сегодня"
 * @param page - текущая страница
 */
exports.setStatementFilter = async (page) => {
    await page.click('//a[text()=\'Сегодня\']');
    await utils.click(page, '#query-button')
    await page.waitForSelector('.statement-container');
};