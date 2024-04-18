import React from 'react'

export default function PricingTip() {
  return (
    <div className="w-screen h-screen bg-transparent backdrop-blur flex justify-center items-center absolute top-0 left-0 p-4">
        <div className=' w-full h-full max-w-[80vw] max-h-fit bg-white rounded-3xl border shadow-lg'>
            <div className="flex flex-col h-full">
                <div className="flex-1 border-b">
                    <flex className="flex divide-x h-full">
                        <div  className="w-1/3 max-w-96 max-h-[80vh] overflow-y-auto p-4">
                            <div className="h-screen">
                            hello
                            </div> 
                        </div>
                        <div className="flex-1 p-4">
                            hello
                        </div>
                    </flex>
                </div>
                <div className="flex-none py-2">
                    <div className="text-center">
                        <button className="underlie text-xs text-blue-700">
                            Se contenter de la periode d'essaie
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>

    </div>
  )
}
