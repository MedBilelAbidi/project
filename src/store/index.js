import { configureStore } from '@reduxjs/toolkit'
import enableReducer from './enable-slice/enableStore'

export default configureStore({
  reducer: {
    enableSlice: enableReducer
  },
})