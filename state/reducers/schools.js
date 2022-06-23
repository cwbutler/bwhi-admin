import { createSlice } from '@reduxjs/toolkit'

const defaultSchool = {
    name: '',
    service_center: '',
    address: '',
    hours: '',
    phone: '',
    website: ''
}

const schoolSlice = createSlice({
    name: 'schools',
    initialState: {
        list: [],
        selectedSchool: defaultSchool
    },
    reducers: {
        setSchool(state, action) {
            state.list = action.payload
        },
        resetSelectedSchool(state) {
            state.selectedSchool = defaultFact
        },
        updateSelectedSchool(state, action) {
            state.selectedSchool = {
                ...state.selectedSchool,
                ...action.payload
            }
        },
        addSelectedSchool(state) {
            state.list.push(state.selectedSchool)
            state.selectedSchool = defaultSchool
        }
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = schoolSlice
// Extract and export each action creator by name
export const { setSchool, resetSelectedSchool, updateSelectedSchool, addSelectedSchool } = actions
// Export the reducer, either as a default or named export
export default reducer
