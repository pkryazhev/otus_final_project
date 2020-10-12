//методы, относящиеся к странице карт
const utils = require('../utils')

/**
 * Переход в раздел "Карты"
 * @param page - текущий экземпляр страницы
 */
exports.goToCardPage = async (page) => {
    await page.click('#cards-overview-index');
};

/**
 * Добавление новой карты
 * @param page - текущий экземпляр страницы
 */
exports.addNewCard = async (page) => {
    await utils.click(page,'a#order-new-card-link');
    await page.waitForSelector('select#type-select');
    await page.selectOption('select#type-select', {index: 8});
    await utils.click(page,'[data-debit-card-event=\'formSubmissionSuccess_travelp\']');
    await page.waitForSelector('select#card-branch[size=\'1\']');
    await page.selectOption('select#card-branch[size=\'1\']', {index: 2});
    await page.waitForSelector('//button[text()=\'Заказать\']');
};

