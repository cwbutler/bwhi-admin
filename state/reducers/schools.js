import { DataStore } from '@aws-amplify/datastore';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { School } from '../../models';

const schoolAdapter = createEntityAdapter({
    selectId: ({ id }) => id,
    // Keep the "all IDs" array sorted based on date    
    sortComparer: (a, b) => new Date(a.school_name) - new Date(b.school_name)
})

export const selectors = schoolAdapter.getSelectors(state => state.schools)

export const fetchSchools = createAsyncThunk(
    'schools/fetchSchools',
    async () => {
        const response = await DataStore.query(School)
        return response
    }
)

export const addSchool = createAsyncThunk(
    'schools/addSchool',
    async (input) => {
        input = cleanSchoolInput(input)
        input.id = uuidv4()
        console.log(input)
        const response = await DataStore.save(new School(input))
        return response
    }
)

export const updateSchool = createAsyncThunk(
    'schools/updateSchool',
    async (input) => {
        input = cleanSchoolInput(input)
        /* Models in DataStore are immutable. To update a record you must use the copyOf function
        to apply updates to the item’s fields rather than mutating the instance directly */
        const original = await DataStore.query(School, input.id)
        const response = await DataStore.save(School.copyOf(original, updated => {
            Object.keys(input).forEach(key => updated[key] = input[key])
        })) 
        return response
    }
)

export const deleteSchool = createAsyncThunk(
    'schools/deleteSchool',
    async ({ id }) => {
        const item = await DataStore.query(School, id)
        DataStore.delete(item)
        return item
    }
)

const schoolSclice = createSlice({
    name: 'schools',
    initialState: schoolAdapter.getInitialState({
        loading: false,
        selectedSchool: undefined
    }),
    reducers: {
        setSelected: (state, action) => {
            state.selectedId = action.payload
            return state
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSchools.fulfilled, (state, action) => {
            schoolAdapter.setAll(state, action.payload)
        }),
        builder.addCase(addSchool.fulfilled, (state, action) => {
            schoolAdapter.addOne(state, action.payload)
        }),
        builder.addCase(updateSchool.fulfilled, (state, action) => {
            schoolAdapter.updateOne(state, { id: action.payload.id, changes: action.payload })
        }),
        builder.addCase(deleteSchool.fulfilled, (state, action) => {  
            schoolAdapter.removeOne(state, action.payload.id)
        })
    }
})

// Extract the action creators object and the reducer
const { actions, reducer } = schoolSclice
export const { setSelected } = actions
// Export the reducer, either as a default or named export
export default reducer

function cleanSchoolInput(input) {
    if (!Array.isArray(input.health_sexual_services)) {
        input.health_sexual_services = input.health_sexual_services.split(',')
    }
    if (!Array.isArray(input.health_physical_services)) {
        input.health_physical_services = input.health_physical_services.split(',')
    }
    if (!Array.isArray(input.counseling_services)) {
        input.counseling_services = input.counseling_services.split(',')
    }
    return input
}
