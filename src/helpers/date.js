/**
 * Get the next month from today
 */
export const getDayInNextMonth = () => {
    const today = new Date()
    const dayInNextMonth = new Date(today)
    dayInNextMonth.setMonth(today.getMonth() + 1)
    return dayInNextMonth
}

/**
 * Gererate date in format dd/mm/yyyy according to a specific timestamp
 * @param {*} timestamp 
 * @returns 
 */
export const dateFromTimestamp = (timestamp) => {

    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Month starts from 0, so add 1
    const year = date.getFullYear();

    // Pad day and month with leading zeros if necessary
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    // Construct the date string in dd/mm/yyyy format
    const dateString = `${formattedDay}/${formattedMonth}/${year}`;

    return dateString
}