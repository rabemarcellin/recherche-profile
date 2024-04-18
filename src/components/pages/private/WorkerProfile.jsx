import React, { useEffect, useState } from 'react'
import { useLoaderData, useLocation } from 'react-router-dom';
import store from '../../../models/redux/store'
import { getOneWorkerAction } from '../../../models/redux/userWorkers/userWorkersActions'
import { useDispatch, useSelector } from 'react-redux'
import { selectSeeUser } from '../../../models/redux/userWorkers/userWorkersSelectors'
import { getCountries } from 'react-phone-number-input';
import getUserWorkerService from '../../../services/user-workers/getOneUserWorker';
import { isNumeric } from '../../../helpers/number';
import { getFileType } from '../../../helpers/file';
import PdfViewer from '../../customs/PdfViewer';
import { calculateAge } from '../../../helpers/user';
import ShowIcon from '../../customs/ShowIcon';
import { isArrayEmpty } from '../../../helpers/array';

export const userWorkerLoader = async ({ params }) => {
    const userWorkerId = params.id 

    console.log(userWorkerId)

    const userWorker = await getUserWorkerService(userWorkerId)
    return userWorker
}

/*
export const userWorkerLoader = async ({ params }) => {
  const userWorkerId = params.id 

  console.log(userWorkerId)

  
  if(!userWorkerId) return null 

  else {
    console.log('aa')
    store.dispatch(getOneWorkerAction(userWorkerId))
  } 
}
*/

const ProfileTabs = () => {
  const user = useSelector(selectSeeUser)

  const headers = [
    {
      index: 0,
      name: 'Dernier occupation'
    },
    {
      index: 1,
      name: 'Parcours academic'
    }
  ]

  const [currentTab, setCurrentTab] = useState(headers.find(header => header.index === 0))
  
  

  return (
    <div>
        <div className="flex">
          {headers.map(header => (
              <div>
                <button onClick={() => setCurrentTab(header)} className={`font-semibold px-8 border-b-2 ${currentTab.index === header.index ?  'border-b-blue-500 text-blue-500': 'text-gray-300 border-b-gray-300'}`}>
                  {header.name}
                </button>
              </div>
          ))} 
        </div>

        {user && currentTab.index === 0 && (
          <div className="my-4">
              <div className="bg-slate-100 rounded-xl p-4">
                  <div>
                  <ShowIcon name="gr-blockquote" size={48} />
                  </div>
                  <div className="leading-8 text-xl">
                    {user.last_occupation}
                  </div>
              </div>
            </div>
        )}

        {user && currentTab.index === 1 && (
           <div className="my-4">
           <ul className='list-disc leading-8 text-lg'>
             {
               !isArrayEmpty(user.academic_levels) && user.academic_levels.map((study, index) => (
                 <li key={`study-academic-levels--${index*54353}`} className=''>{study}</li>
               ))
             }
           </ul>
          
         </div>
        )}
    </div>
  )
}

export default function WorkerProfile() {
  const dispatch = useDispatch() 
  const user = useSelector(selectSeeUser)

  const [userId, setUserId] = useState(null)
  const [currentTab, setCurrentTab] = useState(0)
  const location = useLocation();
  // Splitting the pathname by '/' and getting the last part, which should be '25' in this case
  

  useEffect(() => {
    setUserId(location.pathname.split('/').pop())
  }, [])

  useEffect(() => {

    console.log(userId)

      if(isNumeric(userId)) {
        dispatch(getOneWorkerAction(userId))
      } 

      // else? not found
  }, [userId])

  if(!user)
  {
    return <div>Fetching user</div>
  }

  return (
    <div>
      { user && (
        <div className="grid grid-cols-2 gap-10">
          <div>
            <div className="mb-8">
              <div className='flex gap-2 items-center'>
                <h1 className='font-bold text-xl'>
                    {`${user.name} ${user.firstName || ""}`}
                </h1>
                <div>
                  <span className='text-sm font-bold py-1 bg-blue-500 text-white px-4 rounded-3xl w-fit'>
                    {calculateAge(user?.birthday)} ans
                  </span>
                </div>
              </div>
              <div className='text-xl text-gray-800'>
                {user.speciality}
              </div>
            </div>
            <ProfileTabs />
          </div>
          <div>
            <div className='border rounded-3xl overflow-hidden'>
              {getFileType(user.cv_url) === 'image' && (
                    <img src={user.cv_url} alt="cv" className='object-cover' />
              )}

              {getFileType(user.cv_url) === 'pdf' && (
                    <PdfViewer file={user.cv_url} />
              )}
            </div>
          </div>
        </div>
      )}
      
    </div>
  )
}
