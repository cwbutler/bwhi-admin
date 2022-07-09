import { DataStore } from '@aws-amplify/datastore';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { Alert } from '../../models';

const notificationAdapter = createEntityAdapter({
    selectId: ({ id }) => id,
    // Keep the "all IDs" array sorted based on date    
    sortComparer: (a, b) => new Date(a.datetime) - new Date(b.datetime)
})

export const selectors = notificationAdapter.getSelectors(state => state.notifications)

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async () => {
        const response = await DataStore.query(Alert)
        return response
    }
)

export const addNotifiction = createAsyncThunk(
    'notifications/addNotification',
    async (input) => {
        input.id = uuidv4()
        const response = await DataStore.save(new Alert(input))
        return response
    }
)

export const updateNotification = createAsyncThunk(
    'notifications/updateNotification',
    async (input) => {
        /* Models in DataStore are immutable. To update a record you must use the copyOf function
        to apply updates to the item’s fields rather than mutating the instance directly */
        const original = await DataStore.query(Alert, input.id)
        const response = await DataStore.save(Alert.copyOf(original, updated => {
            Object.keys(input).forEach(key => updated[key] = input[key])
        })) 
        return response
    }
)

export const deleteNotification = createAsyncThunk(
    'notifications/deleteNotification',
    async ({ id }) => {
        const item = await DataStore.query(Alert, id)
        DataStore.delete(item)
        return item
    }
)

const alertSlice = createSlice({
    name: 'notifications',
    initialState: notificationAdapter.getInitialState({
        loading: false,
        selectedId: undefined
    }),
    reducers: {
        setSelected: (state, action) => {
            state.selectedId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            notificationAdapter.setAll(state, action.payload)
        }),
        builder.addCase(addNotifiction.fulfilled, (state, action) => {
            notificationAdapter.addOne(state, action.payload)
        }),
        builder.addCase(updateNotification.fulfilled, (state, action) => {
            notificationAdapter.updateOne(state, { id: action.payload.id, changes: action.payload })
        }),
        builder.addCase(deleteNotification.fulfilled, (state, action) => {  
            notificationAdapter.removeOne(state, action.payload.id)
        })
    }
})

// Extract the action creators object and the reducer
const { actions, reducer } = alertSlice
export const { setSelected } = actions
// Export the reducer, either as a default or named export
export default reducer
