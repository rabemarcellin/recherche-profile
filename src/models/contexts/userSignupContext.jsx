// user after sign up context

import { createContext, useState } from "react";

const UserSignupContext = createContext(null)
export default UserSignupContext

export const SignupProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)
    
    return (
        <UserSignupContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserSignupContext.Provider>
    )
}