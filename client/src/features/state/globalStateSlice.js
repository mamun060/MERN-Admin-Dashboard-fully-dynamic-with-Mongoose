import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    mode: "dark",
    userId: "63701cc1f03239b7f700000e"
}

// create slice 

const globalStateSlice = createSlice({
    name: "globalState",
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = state.mode === 'light' ? "dark" : "light";
        }
    }
})

export const {setMode} = globalStateSlice.actions;

export default globalStateSlice.reducer;