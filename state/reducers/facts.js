import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { db, storage, uploadFileToStorage } from '../../components/firebase'

const factsAdapter = createEntityAdapter({
    selectId: ({ id }) => id,
    // Keep the "all IDs" array sorted based on date    
    sortComparer: (a, b) => a.title - b.title
})

export const selectors = factsAdapter.getSelectors(state => state.facts)

export const fetchFacts = createAsyncThunk(
    'facts/fetchFacts',
    async () => {
        try {
            const data = [];
            const query = await getDocs(collection(db, "fastfacts"));
            query.forEach(d => data.push(d.data()));
            return data;
        } catch (e) {
            console.log(e);
        }
    }
)

export const addFact = createAsyncThunk(
    'facts/addFact',
    async (input) => {
        try {
            input.id = uuidv4();
            const factsDBRef = doc(db, "fastfacts", input.id);
            if (input.imageToUpload) {
                input.imageUrl = await uploadFileToStorage({
                    path: `images/fast-facts/${input.id}`,
                    file: input.imageToUpload
                });
                delete input.imageToUpload
            }
            await setDoc(factsDBRef, {
                id: input.id,
                title: input.title || null,
                description: input.description || null,
                imageUrl: input.imageUrl || null,
            });
            return input;
        } catch (e) {
            console.log(e);
        }
    }
)

export const updateFact = createAsyncThunk(
    'facts/updateFact',
    async (input) => {
        try {
            const factsDBRef = doc(db, "fastfacts", input.id);
            if (input.imageToUpload) {
                input.imageUrl = await uploadFileToStorage({
                    path: `images/fast-facts/${input.id}`,
                    file: input.imageToUpload
                });
                delete input.imageToUpload
            }
            await updateDoc(factsDBRef, input);
        } catch (e) {
            console.log(e);
        }
        return input;
    }
)

export const deleteFact = createAsyncThunk(
    'facts/deleteFact',
    async ({ id }) => {
        try {
            await deleteDoc(doc(db, "fastfacts", id));
        } catch (error) {
            console.log(error);
        }
        return { id };
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
