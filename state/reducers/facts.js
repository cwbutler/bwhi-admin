import { createSlice } from '@reduxjs/toolkit'

const defaultFact = {
    title: '',
    description: '',
    image: ''
}

const alertSlice = createSlice({
    name: 'facts',
    initialState: {
        list: [],
        selectedFact: defaultFact
    },
    reducers: {
        setFacts(state, action) {
            state.list = action.payload
        },
        resetSelectedFact(state) {
            state.selectedFact = defaultFact
        },
        updateSelectedFact(state, action) {
            state.selectedFact = {
                ...state.selectedFact,
                ...action.payload
            }
        },
        addSelectedFact(state) {
            state.list.push(state.selectedFact)
            state.selectedAlert = defaultFact
        }
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = alertSlice
// Extract and export each action creator by name
export const { setFacts, resetSelectedFact, updateSelectedFact, addSelectedFact } = actions
// Export the reducer, either as a default or named export
export default reducer
