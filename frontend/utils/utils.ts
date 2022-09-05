

export const getTime = (date: Date) => {

    const dtm = new Date(date);
    const now = new Date();

    if (dtm.getDay() == now.getDay()) {
        return `Сегодня: ${dtm.toLocaleTimeString()}`
    }

    if (dtm.getDay() == now.getDay() - 1) {
        return `Вчера: ${dtm.toLocaleTimeString()}`
    }

    return dtm.toLocaleDateString();
}