import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc, Timestamp } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../../components/firebase'

const notificationAdapter = createEntityAdapter({
    selectId: ({ id }={}) => id,
    // Keep the "all IDs" array sorted based on date    
    sortComparer: (a, b) => new Date(a.datetime) - new Date(b.datetime)
})

export const selectors = notificationAdapter.getSelectors(state => state.notifications)

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async () => {
        try {
            const data = [];
            const query = await getDocs(collection(db, "notifications"));
            query.forEach(d => data.push(d.data()));
            return data;
        } catch (e) {
            console.log(e);
        }
    }
)

export const addNotifiction = createAsyncThunk(
    'notifications/addNotification',
    async (input) => {
        try {
            input.id = uuidv4();
            input.sent = false;
            input.cancel = false;
            input.scheduledTime = Timestamp.fromDate(new Date(input.scheduledTime));
            const dbREf = doc(db, "notifications", input.id);
            if (input.imageToUpload) {
                input.imageUrl = await uploadFileToStorage({
                    path: `images/notifications/${input.id}`,
                    file: input.imageToUpload
                });
            }
            delete input.imageToUpload
            await setDoc(dbREf, input);
            return input;
        } catch (e) {
            console.log(e);
        }
    }
)

export const updateNotification = createAsyncThunk(
    'notifications/updateNotification',
    async (input) => {
        try {
            const ref = doc(db, "notifications", input.id);
            if (input.imageToUpload) {
                input.imageUrl = await uploadFileToStorage({
                    path: `images/notifications/${input.id}`,
                    file: input.imageToUpload
                });
            }
            delete input.imageToUpload
            await updateDoc(ref, input);
        } catch (e) {
            console.log(e);
        }
        return input;
    }
)

export const deleteNotification = createAsyncThunk(
    'notifications/deleteNotification',
    async ({ id }) => {
        try {
            await deleteDoc(doc(db, "notifications", id));
        } catch (error) {
            console.log(error);
        }
        return { id };
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
            if (action.payload) notificationAdapter.setAll(state, action.payload)
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
