import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers';

const store = configureStore({
    reducer,
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