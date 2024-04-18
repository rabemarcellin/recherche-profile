export const  calculateAge = (birthday) => {
    // Split the birthday string into day, month, and year components
    const [day, month, year] = birthday.split('/').map(Number);

    // Create a Date object using the components (Note: month is 0-indexed)
    const birthdayDate = new Date(year, month - 1, day);

    // Get the current date
    const currentDate = new Date();
  
    // Calculate the difference in years
    let age = currentDate.getFullYear() - birthdayDate.getFullYear();

    // Check if the current date is before the birthday in the current year
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const birthMonth = birthdayDate.getMonth();
    const birthDay = birthdayDate.getDate();

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        age--;
    }

    return age;
}