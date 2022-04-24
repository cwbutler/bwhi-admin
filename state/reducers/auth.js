import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = authSlice
// Extract and export each action creator by name
export const { setUser } = actions
// Export the reducer, either as a default or named export
export default reducer
