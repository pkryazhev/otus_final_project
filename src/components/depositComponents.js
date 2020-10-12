//методы, относящиеся к странице вкладов
const utils = require('../utils');

/**
 * Перход на страницу вклада (в данном случае конкретного)
 * @param page - текущий экземпляр страницы
 */
exports.goToDeposit = async (page) => {
    await utils.click(page,'#deposits-index');
    await utils.click(page,'#account-10032');
    await page.waitForSelector('#deposit-details');
};