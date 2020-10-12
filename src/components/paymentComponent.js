//Методы, связанные с платежами
const utils = require('../utils')

/**
 * Переход к странице платежа на мобильный
 * @param page - текущий экземпляр страницы
 */
exports.goToMobilePayment = async (page) => {
    await page.click('#payments');
    await page.click('[title=\'Мобильная связь\']');
};

/**
 * Заполнение полей для отправки денег на мобильный
 * @param page - текущий экземпляр страницы
 */
exports.setMobilePaymentFields = async (page) => {
    await utils.fill(page, '[name=\'phoneNumber\']', '+7 (927) 111-11-11');
    await utils.fill(page, '.input-small.amount', '500');
    await utils.fill(page, '[name=\'payment.comment\']', 'random text');
};