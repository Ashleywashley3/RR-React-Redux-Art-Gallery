import { createSlice } from '@reduxjs/toolkit'

//the data that comes back from the api.
const initialState = {
    objectId: 10245,
    apiData: {}
}
//all state is here in one place. 
export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            return {...state, apiData : action.payload}
        },
        clearData: () => {
            return initialState
        },
        inputId: (state, action) => {
            return { ...state, objectId: action.payload } 
        },
        incrementId: (state) => {
            return { ...state, objectId: state.objectId + 1 } //set to current value plus 1
        },
        decrementId: (state) => {
            return { ...state, objectId: state.objectId - 1 } //same thing but minus 1
        }
    }
})

export const { setData, clearData, incrementId, decrementId, inputId } = dataSlice.actions

export const fetchData = () => {
    const fetchDataThunk = async (dispatch, getState) => {
        let state = getState() //get current state immediately, 
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`)
        const rData = await response.json()
        dispatch(setData(rData))
    }
    return fetchDataThunk 
}

export default dataSlice.reducer