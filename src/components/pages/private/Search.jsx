import React, { useEffect, useState } from 'react'
import { isArrayEmpty, removeItemFromArray } from '../../../helpers/array'
import Modal from '../../customs/Modal'
import ShowIcon from '../../customs/ShowIcon'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchFilters, selectUserSearchs } from '../../../models/redux/userWorkers/userWorkersSelectors'
import { searchUserWorkersAction } from '../../../models/redux/userWorkers/userWorkersActions'
import UserWorkerLink from '../../customs/UserWorkerLink'
import Pagination from '../../customs/Pagination'

export default function Search() {
    const dispatch = useDispatch()
    const [currentItems, setCurrentItems ] = useState([])
    const [searchFilters, setSearchFilters] = useState([])
    const [openSearchInput, setOpenSearchInput] = useState(false)
    
    const searchResults = useSelector(selectUserSearchs)
    const searchResultsFilters = useSelector(selectSearchFilters)

    
    useEffect(() => {
        if(!isArrayEmpty(searchResultsFilters))
        {
            setSearchFilters(searchResultsFilters)
        }
    }, [searchResultsFilters])
    
    useEffect(() => {
        if(isArrayEmpty(searchResults))
        {
            if(!openSearchInput) setOpenSearchInput(true)
        } else {
            if(openSearchInput) setOpenSearchInput(false)
        }
    }, [searchResults])

    const doSearch = (event) => {
        event.preventDefault()

        if(!isArrayEmpty(searchFilters))
        {
            dispatch(searchUserWorkersAction(searchFilters))
        }
    }

  return (
    <div>
        {openSearchInput ? (
            <Modal
                title="Champ de recherche" 
                isOpen={openSearchInput} 
                closeFunc={() => setOpenSearchInput(false)}
            >
                <div className="w-full md:w-[500px]">
                    <div className="my-2">
                        <label htmlFor="search-filter-input" className='text-xs font-bold text-gray-500'>Filtres</label>
                    </div>
        
                    <div className='flex items-center border-2 border-blue-500 gap-2 p-1 rounded-lg'>
                        <ShowIcon name={'md-search'} />
                        <input 
                            type="text" 
                            className='outline-none mx-2 w-full'
                            name="" 
                            id="search-filter-input"
                            onKeyDown={event => {
                                if(event.key === 'Enter') {
                                    event.preventDefault()
                                    
                                    const value = event.target.value
                                    if(value.length > 2 && !searchFilters.find(item => item === value))
                                    {
                                        setSearchFilters([...searchFilters, value])
                                        event.target.value = ''
                                    }
                                    

                                }
                            }}
                        />
                    </div>

                    {
                        !isArrayEmpty(searchFilters) && (
                            <div>
        

                                <div className="flex flex-wrap gap-2 my-4 items-center">
                                    {searchFilters.map(filter => (
                                        <div 
                                            key={`filter-user-search--${filter}`}
                                            className='transition duration-300 hover:bg-slate-200 font-bold text-sm py-1 px-2 rounded-3xl border border-gray-500 text-gray-500'    
                                        >
                                            <div className="flex items-center gap-2 justify-between">
                                                <div className=''>
                                                    {filter}
                                                </div>
                                                <div className='flex items-center'>
                                                    <button onClick={() => {
                                                        setSearchFilters(filters => filters.filter(item => item !== filter))
                                                    }}>
                                                        <ShowIcon name="ai-delete" className='stroke-2 ' />
                                                    </button>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 pt-2 flex justify-end border-t">
                                    <button 
                                        className='my-2 rounded font-bold bg-blue-500 text-white p-2'
                                        onClick={doSearch}
                                    >Rechercher</button>
                                </div>
                            </div>
                        )
                    }
                    
                </div>
            </Modal>
        ):(
            <div>
                {/* search header */}
                <div className="border shadow rounded-xl p-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className='font-bold'>Filtres</div>
                            <div className="flex flex-wrap gap-2 my-4 items-center">
                                {
                                    !isArrayEmpty(searchResultsFilters) && (
                                        searchResultsFilters.map(filter => (
                                                    <div 
                                                        key={`filter-user-search--${filter}`}
                                                        className='transition duration-300 hover:bg-slate-200 font-bold text-sm py-1 px-2 rounded-3xl border border-gray-500 text-gray-500'    
                                                    >
                                                        <div className="flex items-center gap-2 justify-between">
                                                            <div className=''>
                                                                {filter}
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                        ))
                                    )
                                }  
                                <div className='bg-blue-500 stroke-white w-8 h-8 flex justify-center items-center rounded-full overflow-hidden'>
                                    <ShowIcon name='md-search' className='text-white' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-3">
                    <div className="flex justify-end">
                        <div className='text-gray-500 font-bold text-sm'>
                            {searchResults.length} resultat(s) trouve(s)
                        </div>
                    </div>
                </div>

                <div className='my-2 grid grid-cols-3'>
                    <UserWorkerLink currentItems={currentItems} />
                </div>
                <Pagination itemsPerPage={1} items={searchResults} setCurrentItems={setCurrentItems} />
            </div>
            
        )}
         
    </div>
  )
}
