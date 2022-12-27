import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice.js'
import postSlice from './postSlice.js'
import commentSlice from './commentSlice.js'
import privateSlice from './privetSlice.js'

const store = configureStore({
	reducer: {
		auth: authSlice,
		post: postSlice,
		comment: commentSlice,
		privet: privateSlice
	}
})

export default store