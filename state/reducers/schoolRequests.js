import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../components/firebase'

const schoolRequestsAdapter = createEntityAdapter({
    selectId: ({ school }) => school,
    // Keep the "all IDs" array sorted based on school name  
    sortComparer: (a, b) => a.school - b.school
})

const dbTableName = "schoolRequets"

export const selectors = schoolRequestsAdapter.getSelectors(state => state.schoolRequests)

export const fetchSchoolRequests = createAsyncThunk(
    'schoolRequests/fetchRequests',
    async () => {
        try {
            const data = [];
            const query = await getDocs(collection(db, dbTableName));
            query.forEach(d => data.push(d.data()));
            return data;
        } catch (e) {
            console.log(e);
        }
    }
)
const schoolRequestSlice = createSlice({
    name: 'schoolRequests',
    initialState: schoolRequestsAdapter.getInitialState({
        loading: false,
        selectedId: undefined
    }),
    reducers: {
        setSelected: (state, action) => {
            state.selectedId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSchoolRequests.fulfilled, (state, action) => {
            schoolRequestsAdapter.setAll(state, action.payload)
        })
    }
})

// Extract the action creators object and the reducer
const { actions, reducer } = schoolRequestSlice
export const { setSelected } = actions
// Export the reducer, either as a default or named export
export default reducer
