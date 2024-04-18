const dayUnit = 'd';
const monthUnit = 'm';


export const evaluatePlanDelay = (input) => {
    const match = input.match(/(\d+)([a-zA-Z]+)/);
   
    if (match) {
       return {
         delayNumber: parseInt(match[1], 10),
         unit: match[2] 
       };
    } else {
       return null;
    }
}


export const convertDelayToDays = ( subscriptionDelay, subscription) => {
    const { delayNumber, unit } = evaluatePlanDelay(subscriptionDelay);

    console.log(unit)

    const endDate = subscription.end_in
    if (unit === dayUnit) {
        return delayNumber; // If delay is already in days, return it
    } else if (unit === monthUnit) {
        // Extract year and month from the end date
        const [endYear, endMonth] = endDate.split('-').map(Number);
        
        // Calculate the number of days in the specified month
        const daysInMonth = new Date(endYear, endMonth, 0).getDate();
        
        // Convert months to days
        return delayNumber * daysInMonth;
    } else {
        return null; // Invalid unit
    }
}

export const setEndSubscriptionDate = (planDelay) => {
    const { delayNumber, unit } = evaluatePlanDelay(planDelay);
    if (!delayNumber || !unit) return null; 

    const today = new Date();
    let endDate;

    switch(unit) {
        case dayUnit: {
            endDate = new Date(today);
            endDate.setDate(today.getDate() + delayNumber); 
            break;
        }
        case monthUnit: {
            endDate = new Date(today);
            endDate.setMonth(today.getMonth() + delayNumber); 
            break;
        }
        default: {
            return null; 
        }
    }
    return endDate;
}

/**
 * Guess how many days rest on a subscription 
 */
export const guesRemainingSubscription = (subscription) => {

    const endDateString = subscription.end_in; // format yyyy-mm-dd

    const endDate = new Date(endDateString);

    const currentDate = new Date();

    // Calcul du nombre de jours restants
    const timeDifference = endDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); 

    return daysRemaining > 0 ? daysRemaining : null 
}

