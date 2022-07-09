import { DataStore } from '@aws-amplify/datastore';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { Facts } from '../../models';

const factsAdapter = createEntityAdapter({
    selectId: ({ id }) => id,
    // Keep the "all IDs" array sorted based on date    
    sortComparer: (a, b) => a.title - b.title
})

export const selectors = factsAdapter.getSelectors(state => state.facts)

export const fetchFacts = createAsyncThunk(
    'facts/fetchFacts',
    async () => {
        const response = await DataStore.query(Facts)
        return response
    }
)

export const addFact = createAsyncThunk(
    'facts/addFact',
    async (input) => {
        input.id = uuidv4()
        const response = await DataStore.save(new Facts(input))
        return response
    }
)

export const updateFact = createAsyncThunk(
    'facts/updateFact',
    async (input) => {
        /* Models in DataStore are immutable. To update a record you must use the copyOf function
        to apply updates to the item’s fields rather than mutating the instance directly */
        const original = await DataStore.query(Facts, input.id)
        const response = await DataStore.save(Facts.copyOf(original, updated => {
            Object.keys(input).forEach(key => updated[key] = input[key])
        })) 
        return response
    }
)

export const deleteFact = createAsyncThunk(
    'facts/deleteFact',
    async ({ id }) => {
        const item = await DataStore.query(Facts, id)
        DataStore.delete(item)
        return item
    }
)

const factSlice = createSlice({
    name: 'facts',
    initialState: factsAdapter.getInitialState({
        loading: false,
        selectedId: undefined
    }),
    reducers: {
        setSelected: (state, action) => {
            state.selectedId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFacts.fulfilled, (state, action) => {
            factsAdapter.setAll(state, action.payload)
        }),
        builder.addCase(addFact.fulfilled, (state, action) => {
            factsAdapter.addOne(state, action.payload)
        }),
        builder.addCase(updateFact.fulfilled, (state, action) => {
            factsAdapter.updateOne(state, { id: action.payload.id, changes: action.payload })
        }),
        builder.addCase(deleteFact.fulfilled, (state, action) => {  
            factsAdapter.removeOne(state, action.payload.id)
        })
    }
})

// Extract the action creators object and the reducer
const { actions, reducer } = factSlice
export const { setSelected } = actions
// Export the reducer, either as a default or named export
export default reducer
