import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSortedSubscription } from '../../../../models/redux/subscription/subscriptionsSelectors'
import SubscriptionDetails from '../../../customs/SubscriptionDetails';
import PaginateSubscriptions from '../../../customs/Pagination';

import './subscription.css'

export default function Subscription() {

    const [currentItems, setCurrentItems ] = useState(null)

    const sortedSubscriptions = useSelector(selectSortedSubscription)

    const columns = [
        'Numero de telephone',
        'Date de debut',
        'Validite'
    ]
    
    return (
        <div>
            <div className='mt-4 mb-8'>
                <h1 className='font-bold text-2xl'>Abonnements</h1>
            </div>

            <table className="table-fixed w-full bg-slate-10">
                <thead>
                    <tr className='text-gray-500 text-s'>
                    {columns.map(column => (
                        <th key={`subscription--column-${column}`}>{column}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    <SubscriptionDetails currentItems={currentItems} />                                   
                </tbody>
            </table>

            <PaginateSubscriptions itemsPerPage={1} items={sortedSubscriptions} setCurrentItems={setCurrentItems} />
        </div>
    )
}
