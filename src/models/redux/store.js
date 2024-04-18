import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authReducer";
import userAuthReducer from "./userAuth/userAuthReducer";
import pricingPlansReducer from "./plan/pricingPlansReducer";
import subscriptionsReducer from "./subscription/subscriptionsReducer";
import userWorkersReducer from "./userWorkers/userWorkersReducer";

const store = configureStore({
    reducer: combineReducers({
        auth: authReducer,
        userAuth: userAuthReducer,
        pricingPlans: pricingPlansReducer,
        subscriptions: subscriptionsReducer,
        userWorkers: userWorkersReducer
    })
})
export default store