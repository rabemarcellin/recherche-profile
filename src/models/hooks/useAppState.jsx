import { useState } from "react";


export default function useAppState() {
    const [state, setState] = useState(
        {
            enterpriseName: '',
            phoneNumber: '',
            password: '',
            activity: '',
            rememberMe: false
        }
    )

    const updateState = (name, value) => {
        setState({...state, [name]: value})
    }

  return (
    {
        state, updateState
    }
  )
}
