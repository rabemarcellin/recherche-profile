export const getUserFinishedSignup = state => (state.userAuth.haveSignup && state.userAuth.passwordToken) ? (
    state.userAuth
): null

export const getUserAuth = state => state.userAuth

export const userAuthSelector = state => state.userAuth