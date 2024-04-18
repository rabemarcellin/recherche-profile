import React from 'react'
import { DiVim } from 'react-icons/di'
import ShowIcon from '../ShowIcon'

export default function Modal({children, isOpen, closeFunc, title }) {

    return (
        <div className={`${!isOpen ? 'hidden': ''}  w-screen h-screen bg-white/75 flex justify-center items-center absolute top-0 left-0`}
        >
            
            <div className=' w-fit h-fit bg-white rounded-xl border shadow p-4'>
                {closeFunc && (
                    <div className="flex gap-8 items-center justify-between">
                        <div className='font-bold'>{title || ''}</div>

                        <div>
                            <button onClick={closeFunc}>
                                <ShowIcon name="md-clear" />
                            </button>
                        </div>
                    </div>
                )}
                <div>
                    {children}
                </div>  
            </div>
        </div>  
    )
}
