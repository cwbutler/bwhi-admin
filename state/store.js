import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            // Ignore these action types
            ignoredActions: ['auth/setUser'],
            // Ignore these paths in the state
            ignoredPaths: ['auth.user'],
        }
    })
})

export default store