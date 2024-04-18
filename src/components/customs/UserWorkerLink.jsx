import React from 'react'
import { isArrayEmpty } from '../../helpers/array'
import { Link } from 'react-router-dom'

export default function UserWorkerLink({ currentItems }) {
  return (
            !isArrayEmpty(currentItems) && currentItems.map(result => (
                <Link to={`/profile/${result.id}`} className='inline-block cursor-pointer hover:shadow bg-slate-100 border p-2 rounded-lg' key={`result-item--user-workers-${result.id*44523}`}>
                    <span className="inline-block font-bold text-lg">
                        {`${result.name} ${result.firstName || ""}`}
                    </span>
                    <span className="inline-block text-gray-500 text-sm italic font-bold">
                        {result.speciality}
                    </span>

                    <span className="inline-block my-4 line-clamp-3">
                        {result.last_occupation}
                    </span>
                </Link>
            ))
  )
}
