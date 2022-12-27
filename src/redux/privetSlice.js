import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../utils/axios.js'

const initialState = {
	avatar: '',
	isLoading: false,
	check: true
}

// Создаём аватар пользователя
export const createAvatar = createAsyncThunk(
	'privet/createAvatar',
	async (param) => {
		const {data} = await axios.post('/privet', param)
		return await data
	}
)

const privateSlice = createSlice({
	name: 'privet',
	initialState,
	reducers: {},
	extraReducers: {
		// Создаём аватар пользователя
		[createAvatar.pandig]: (state) => {
			console.log('createAvatar.fulfilled')
			state.isLoading = true
		},
		[createAvatar.fulfilled]: (state, action) => {
			console.log('createAvatar.fulfilled')
			state.isLoading = false
			state.statuse = action.payload?.message
			state.check = !state.check
		},
		[createAvatar.rejected]: (state, action) => {
			state.isLoading = true
			state.statuse = state.payload?.message
		},
	}
})

export default privateSlice.reducer