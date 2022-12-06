import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'
import { db } from '../../components/firebase';

const schoolAdapter = createEntityAdapter({
    selectId: ({ id }={}) => id,
    // Keep the "all IDs" array sorted based on date    
    sortComparer: (a, b) => new Date(a.school_name) - new Date(b.school_name)
})

export const selectors = schoolAdapter.getSelectors(state => state.schools)

export const fetchSchools = createAsyncThunk(
    'schools/fetchSchools',
    async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "schools"));
            const schools = [];
            for (let i = 0; i < querySnapshot.size; i++) {
                const doc = querySnapshot.docs[i];
                const schoolData = doc.data();
                (await getDocs(collection(db, "schools", schoolData.id, "serviceCenters"))).docs.forEach(d => {
                    const serviceData = d.data();
                    if (serviceData.type === "health") {
                        schoolData.health_id = serviceData.id;
                        schoolData.health_name = serviceData.name;
                        schoolData.health_address = serviceData.address;
                        schoolData.health_address_url = serviceData.address_url;
                        schoolData.health_hours = serviceData.hours;
                        schoolData.health_phone = serviceData.phone;
                        schoolData.health_physical_services = serviceData.physical_services;
                        schoolData.health_sexual_services = serviceData.sexual_services;
                        schoolData.health_website = serviceData.website;
                        schools.push(schoolData);
                    }
                    if (serviceData.type === "counseling") {
                        schoolData.counseling_id = serviceData.id;
                        schoolData.counseling_name = serviceData.name;
                        schoolData.counseling_location = serviceData.address;
                        schoolData.counseling_address_url = serviceData.address_url;
                        schoolData.counseling_hours = serviceData.hours;
                        schoolData.counseling_phone = serviceData.main_phone;
                        schoolData.counseling_crisis_phone = serviceData.crisis_phone;
                        schoolData.counseling_crisis_text = serviceData.text_phone;
                        schoolData.counseling_website = serviceData.website;
                        schoolData.counseling_services = serviceData.mental_services;
                        schools.push(schoolData);
                    }
                });
            }
            return schools;
        } catch (e) {
            console.log(e);
            return [];
        }
    }
)

export const addSchool = createAsyncThunk(
    'schools/addSchool',
    async (input) => {
        try {
            input = cleanSchoolInput(input)
            input.id = uuidv4();
            const schoolRef = doc(db, "schools", input.id);
            await setDoc(schoolRef, {
                id: input.id,
                school_name: input.school_name || null,
                school_address: input.school_address || null,
            });
            if (input.health_name) {
                const serviceCenterId = uuidv4();
                const serviceCenterRef = doc(db, "schools", input.id, "serviceCenters", serviceCenterId);
                await setDoc(serviceCenterRef, {
                    id: serviceCenterId,
                    name: input.health_name || null,
                    address: input.health_address || null,
                    address_url: input.health_address_url || null,
                    hours: input.health_hours || null,
                    phone: input.health_phone || null,
                    physical_services: input.health_physical_services,
                    sexual_services: input.health_sexual_services,
                    website: input.health_website,
                    type: "health",
                });
            }
            if (input.counseling_name) {
                const counselingCenterId = uuidv4();
                const counselingCenterRef = doc(db, "schools", input.id, "serviceCenters", counselingCenterId);
                await setDoc(counselingCenterRef, {
                    id: counselingCenterId,
                    name: input.counseling_name || null,
                    address: input.counseling_location || null,
                    address_url: input.counseling_address_url || null,
                    hours: input.counseling_hours || null,
                    main_phone: input.counseling_phone || null,
                    crisis_phone: input.counseling_crisis_phone || null,
                    text_phone: input.counseling_crisis_text || null,
                    mental_services: input.counseling_services,
                    website: input.counseling_website,
                    type: "counseling",
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
)

export const updateSchool = createAsyncThunk(
    'schools/updateSchool',
    async (input) => {
        try {
            input = cleanSchoolInput(input)
            const schoolRef = doc(db, "schools", input.id);
            await updateDoc(schoolRef, {
                school_name: input.school_name || null,
                school_address: input.school_address || null,
            });
            if (input.health_name) {
                const healthRef = doc(db, "schools", input.id, "serviceCenters", input.health_id);
                await updateDoc(healthRef, {
                    name: input.health_name || null,
                    address: input.health_address || null,
                    address_url: input.health_address_url || null,
                    hours: input.health_hours || null,
                    phone: input.health_phone || null,
                    physical_services: input.health_physical_services,
                    sexual_services: input.health_sexual_services,
                    website: input.health_website,
                });
            }
            if (input.counseling_name) {
                const counselRef = doc(db, "schools", input.id, "serviceCenters", input.counseling_id);
                await updateDoc(counselRef, {
                    name: input.counseling_name || null,
                    address: input.counseling_location || null,
                    address_url: input.counseling_address_url || null,
                    hours: input.counseling_hours || null,
                    main_phone: input.counseling_phone || null,
                    crisis_phone: input.counseling_crisis_phone || null,
                    text_phone: input.counseling_crisis_text || null,
                    mental_services: input.counseling_services,
                    website: input.counseling_website,
                });
            }
        } catch (e) {
            console.log(e);
        }
        return input;
    }
)

export const deleteSchool = createAsyncThunk(
    'schools/deleteSchool',
    async ({ id }) => {
        try {
            await deleteDoc(doc(db, "schools", id));
        } catch (error) {
            console.log(error);
        }
        return { id };
    }
)

const schoolSlice = createSlice({
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
            if (action.payload) schoolAdapter.addOne(state, action.payload)
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
const { actions, reducer } = schoolSlice
export const { setSelected } = actions
// Export the reducer, either as a default or named export
export default reducer

function cleanSchoolInput(input) {
    if (!Array.isArray(input.health_sexual_services)) {
        input.health_sexual_services = input.health_sexual_services?.split(',')
    }
    if (!Array.isArray(input.health_physical_services)) {
        input.health_physical_services = input.health_physical_services?.split(',')
    }
    if (!Array.isArray(input.counseling_services)) {
        input.counseling_services = input.counseling_services?.split(',')
    }
    return input
}
