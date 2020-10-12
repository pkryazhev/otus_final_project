//методы, связанные со сменой пользователей
const utils = require('../utils');

/**
 * Переключение на юзера ЮЛ
 * @param page - текущий экземпляр страницы
 */
exports.switchToULUser = async (page) => {
    await page.click('.filter-option.pull-left');
    await utils.click(page, '//span[contains(text(), \'Коудборн\')]');
    await utils.click(page, '//a[contains(text(), \'Закрыть\')]');
}