import React, { useState, useRef, useEffect } from 'react'
import ShowIcon from '../ShowIcon'
import './input-phone-number.css'


const MG_SUFFIX = "+261"

export default function InputPhoneNumber({defaultValue, setFinalValue, disabled = false, international = false }) {

    /* useful when user click on backspace or delete in case and it focus other case of the number, 
     * avoid direclty remove number phone item in the next focused case
     */
    const [isPrev, setIsPrev] = useState(false)

    const operatorSuffixRef = useRef(0)
    const firstTwoRef = useRef(0)
    const middleThreeRef = useRef(0)
    const lastTwoRef = useRef(0)

    const [operatorSuffix, setOperatorSuffix] = useState(defaultValue?.operatorSuffix || '')
    const [firstTwo, setFirstTwo] = useState(defaultValue?.firstTwo || '')
    const [middleThree, setMiddleThree] = useState(defaultValue?.middleThree || '')
    const [lastTwo, setLastTwo] = useState(defaultValue?.lastTwo || '')


    const caseUpdater = (value, maxValueAbleChange, setter, nextFocusRef) => {
        try {
            for(var eachNumber of value) {
                if(!(eachNumber.toString() == parseInt(eachNumber))) {
                    throw new Error(`${eachNumber} is not a valid number.`)
                }
            }

            if(setter === setOperatorSuffix && value.length > 0 && value[0] != 3) {
                throw new Error(`Operator suffix should begin with number <3>`)
            }

            if(value.length > maxValueAbleChange) {
                return null
            }

            if(!isPrev) {
                setter(value)
            } else {
                setIsPrev(false)
            }
            value.length === maxValueAbleChange && nextFocusRef && nextFocusRef.current.focus()
        } catch (error) {
            return null
        }
    }

    const handleDeleteOnCase = (value, prevFocusRef) => {
        // Handle backspace (8) and delete (46) key events
        if(value.length === 0) {
            prevFocusRef.current.focus()
            setIsPrev(!false)
        }
    }

    /**
     * 
     * @param {Boolean} international - if not international, return in national phone number syntax 
     * @returns 
     */
    const generateValidNumber = (international = false) => {
        return international ? (
            `${MG_SUFFIX}${operatorSuffix}${firstTwo}${middleThree}${lastTwo}`
        ): (
            `0${operatorSuffix}${firstTwo}${middleThree}${lastTwo}`
        )
    }

    useEffect(() => {
        if(
            operatorSuffix.length === 2
            && 
            firstTwo.length === 2
            &&
            middleThree.length === 3
            &&
            lastTwo.length === 2
        ) {
            setFinalValue(
                generateValidNumber(international)
            )
        } else {
            setFinalValue("not-ready-yet")
        }
    }, [operatorSuffix, firstTwo, middleThree, lastTwo])

  return (
    <div className='border p-2 rounded-xl bg-slate-50 flex gap-4 items-center'>
        <div>
            <ShowIcon name="md-call" />
        </div>
        <div>
            {MG_SUFFIX}
        </div>
        <div className='flex gap-2'>
            <input 
                ref={operatorSuffixRef} 
                type="text" 
                placeholder='34' 
                className='number-case number-case--two'
                value={operatorSuffix}
                onChange={event => {
                    const value = event.target.value
                    caseUpdater(value, 2, setOperatorSuffix, firstTwoRef)
                }}
                disabled={disabled}
            />
            <input
                ref={firstTwoRef} 
                type="text" 
                className='number-case number-case--two'
                value={firstTwo}
                onChange={event => {
                    const value = event.target.value
                    caseUpdater(value, 2, setFirstTwo, middleThreeRef)
                }}
                onKeyDown={event => {
                    if (event.key === "Backspace" || event.key === "Delete") {
                        handleDeleteOnCase(firstTwo, operatorSuffixRef)
                    }
                }}
                disabled={disabled}
            />
            <input 
                ref={middleThreeRef}
                type="text" 
                className='number-case number-case--three' 
                value={middleThree}
                onChange={event => {
                    const value = event.target.value
                    caseUpdater(value, 3, setMiddleThree, lastTwoRef)
                }}
                onKeyDown={event => {
                    if (event.key === "Backspace" || event.key === "Delete") {
                        handleDeleteOnCase(middleThree, firstTwoRef)
                    }
                }}
                disabled={disabled}

            />
            <input 
                ref={lastTwoRef}
                type="text" 
                className='number-case number-case--two' 
                value={lastTwo}
                onChange={event => {
                    const value = event.target.value
                    caseUpdater(value, 2, setLastTwo)
                }}
                onKeyDown={event => {
                    if (event.key === "Backspace" || event.key === "Delete") {
                        handleDeleteOnCase(lastTwo, middleThreeRef)
                    }
                }}
                disabled={disabled}
            />

        </div>
    </div>
  )
}
