import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../../components/firebase'

const resourcesAdapter = createEntityAdapter({
    selectId: ({ id }) => id,
    // Keep the "all IDs" array sorted based on date    
    sortComparer: (a, b) => a.title - b.title
})

export const selectors = resourcesAdapter.getSelectors(state => state.resources)

export const fetchresources = createAsyncThunk(
    'resources/fetchResources',
    async () => {
        try {
            const data = [];
            const query = await getDocs(collection(db, "resources"));
            query.forEach(d => data.push(d.data()));
            return data;
        } catch (e) {
            console.log(e);
        }
    }
)

export const addResource = createAsyncThunk(
    'resources/addResource',
    async (input) => {
        try {
            input.id = uuidv4();
            const resourcesDBRef = doc(db, "resources", input.id);
            await setDoc(resourcesDBRef, {
                id: input.id,
                topic: input.topic || null,
                name: input.name || null,
                url: input.url || null,
            });
            return input;
        } catch (e) {
            console.log(e);
        }
    }
)

export const updateResource = createAsyncThunk(
    'resources/updateResource',
    async (input) => {
        try {
            const ref = doc(db, "resources", input.id);
            await updateDoc(ref, input);
        } catch (e) {
            console.log(e);
        }
        return input;
    }
)

export const deleteResource = createAsyncThunk(
    'resources/deleteResource',
    async ({ id }) => {
        try {
            await deleteDoc(doc(db, "resources", id));
        } catch (error) {
            console.log(error);
        }
        return { id };
    }
)

const resourceslice = createSlice({
    name: 'resources',
    initialState: resourcesAdapter.getInitialState({
        loading: false,
        selectedId: undefined
    }),
    reducers: {
        setSelected: (state, action) => {
            state.selectedId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchresources.fulfilled, (state, action) => {
            resourcesAdapter.setAll(state, action.payload)
        }),
        builder.addCase(addResource.fulfilled, (state, action) => {
            resourcesAdapter.addOne(state, action.payload)
        }),
        builder.addCase(updateResource.fulfilled, (state, action) => {
            resourcesAdapter.updateOne(state, { id: action.payload.id, changes: action.payload })
        }),
        builder.addCase(deleteResource.fulfilled, (state, action) => {  
            resourcesAdapter.removeOne(state, action.payload.id)
        })
    }
})

// Extract the action creators object and the reducer
const { actions, reducer } = resourceslice
export const { setSelected } = actions
// Export the reducer, either as a default or named export
export default reducer
