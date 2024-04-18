import React from 'react'
import { currentSubscriptionSelector } from '../../models/redux/subscription/subscriptionsSelectors';
import { useSelector } from 'react-redux';
import { formatRenderedPhonenumber } from '../../helpers/phone-number';
import { dateFromTimestamp } from '../../helpers/date';
import { convertDelayToDays, guesRemainingSubscription } from '../../helpers/subscription';
import { selectPricingPlans } from '../../models/redux/plan/pricingPlansSelectors';

const SubscriptionDetails = ({ currentItems }) => {

    const currentSubscription = useSelector(currentSubscriptionSelector)

    const pricingPlans = useSelector(selectPricingPlans)

    const getPlanById = id => pricingPlans?.find(plan => plan.id === id)

    return (
      <>
        {currentItems &&
          currentItems.map((subscription) => (
            <tr className={`${ currentSubscription && currentSubscription.id === subscription.id ? 'subscription--active': 'subscription'}`} key={`subscription--table-${subscription.id}`}>
                <td>{formatRenderedPhonenumber(subscription.phone_number)}</td>
                <td>{dateFromTimestamp(subscription.created_at)}</td>
                <td>
                    <div>
                        <div>
                            <span className='px-1'>
                                {convertDelayToDays(
                                    getPlanById(subscription.plan_id).delay, 
                                    subscription
                                )}
                            </span>
                            jours
                        </div>
                        <div className="text-xs font-bold">
                            {
                                guesRemainingSubscription(subscription) ?
                                `${guesRemainingSubscription(subscription)} jours restants`: 
                                'Expiree'
                            } 
                        </div>
                    </div>
                </td>
            </tr>
        ))}
      </>
    );
}
export default SubscriptionDetails 