import { createSlice } from '@reduxjs/toolkit'

export const enableSlice = createSlice({
  name: 'enable',
  initialState: {
   enablePhoto: true,
   enableBio: true,
   enableInfos: true,
   enableAddresse: true,
   enablePhone: true,
   enableEmail: true,

  },
  reducers: {
    switchState: (currentState, action) => {
      currentState[action.payload] = !currentState[action.payload]

      if (action.payload === 'enableInfos' && !currentState[action.payload]) {
        currentState.enableEmail = false
        currentState.enablePhone = false
        currentState.enableAddresse = false
      }
    },
    initializeState: (currentState, action) => {
      currentState[action.payload.key] = action.payload.value
    },
  }
})

export const { switchState, initializeState } = enableSlice.actions

// Export the selector
export const selectorEnableSlice = (store) => store.enableSlice;

export default enableSlice.reducer