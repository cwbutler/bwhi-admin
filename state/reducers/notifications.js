import { createSlice } from '@reduxjs/toolkit'

const defaultAlert = {
    title: '',
    description: '',
    datetime: '',
    image: ''
}

const alertSlice = createSlice({
    name: 'notifications',
    initialState: {
        list: [],
        selectedAlert: defaultAlert
    },
    reducers: {
        setNotifications(state, action) {
            state.list = action.payload
        },
        resetSelectedAlert(state) {
            state.selectedAlert = defaultAlert
        },
        updateSelectedAlert(state, action) {
            state.selectedAlert = {
                ...state.selectedAlert,
                ...action.payload
            }
        },
        addSelectedAlert(state) {
            state.list.push(state.selectedAlert)
            state.selectedAlert = defaultAlert
        }
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = alertSlice
// Extract and export each action creator by name
export const { setNotifications, resetSelectedAlert, updateSelectedAlert, addSelectedAlert } = actions
// Export the reducer, either as a default or named export
export default reducer
