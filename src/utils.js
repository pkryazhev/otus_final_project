//Разного рода служебные функции

/**
 * Получение текста из элемента
 * @param page - текущий экземпляр страницы
 * @param selector - селектор, из которого получаем текст
 */
exports.getText = async (page, selector) => {
    try {
        await page.waitForSelector(selector)
        return await page.$eval(selector, element => element.textContent)
    }
    catch (error) {
        throw new Error(`Не удалось получить текст из ${selector}`)
    }
}

/**
 * Совмещенная функция click с ожиданием
 * @param page - текущий экземпляр страницы
 * @param selector - селектор, который заполняем
 */
exports.click = async (page, selector) =>{
    await page.waitForSelector(selector);
    await page.click(selector);
};

/**
 * Совмещенная функция fill с ожиданием
 * @param page - текущий экземпляр страницы
 * @param selector - селектор, который заполняем
 * @param text - текст, который вводим
 */
exports.fill = async (page, selector, text) =>{
    try {
        await page.waitForSelector(selector);
        await page.fill(selector, text);
    }
    catch (error){
        throw new Error(`Не удалось кликнуть по ${selector}`)
    }
};

/**
 * Получение текущей даты
 * return - Возвращает сегодняшнюю дату в формате дд.мм.гггг
 */
exports.getCurrentDate = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = dd + '.' + mm + '.' + yyyy;
    return today;
};