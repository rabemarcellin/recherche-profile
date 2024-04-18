import { descendingItemsById } from "../../../helpers/array";

export const subscriptionsSelector = state => state.subscriptions

export const selectSortedSubscription = state => {
    const subscriptions = subscriptionsSelector(state)

    const identity = (x) => x;
    let sortedSubscriptions = subscriptions.map(identity);

    sortedSubscriptions.sort(descendingItemsById)

    return sortedSubscriptions
    
}
export const currentSubscriptionSelector = state => {
    try {
        const subscriptions = subscriptionsSelector(state);

        const today = new Date().getTime(); 

        const currentSubscription = subscriptions.find(subscription => {
            const endDateTimestamp = new Date(subscription.end_in).getTime();
            return today <= endDateTimestamp; 
        });

        return currentSubscription;
    } catch (error) {
        console.error(error)
        return null
    }
};
