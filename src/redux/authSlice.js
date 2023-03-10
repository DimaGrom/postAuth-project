import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../utils/axios.js'

const initialState = {
	user: null,
	token: null,
	isLoading: false,
	status: null
}

export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async ({username, password}) => {
		try {
			const {data} = await axios.post('/auth/register', {
				username,
				password
			})
			if(data.token) {
				window.localStorage.setItem('token', data.token)
			}
			return data
		} catch(err) {
			console.log(err)
		}
	}
)

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async ({username, password}) => {
		const { data } = await axios.post('auth/login', {username, password})
		if(data.token) {
			window.localStorage.setItem('token', data.token)
		}
		return data
	}
)

export const getMe = createAsyncThunk(
	'auth/getMe',
	async () => {
		const { data } = await axios.get('auth/me')
		return data
	}
)

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logaut: (state) =>{
			state.user = null
			state.token = null
			state.isLoading = false
			state.status = null
		}
	},
	extraReducers: {
		// Регистрация пользователя
		[registerUser.pending]: (state) => {
			state.isLoading = true
		},
		[registerUser.fulfilled]: (state, action) => {
			state.isLoading = false
			state.status = action.payload.message
			state.user = action.payload.user
			state.token = action.payload.token
		},
		[registerUser.rejected]: (state, action) => {
			state.isLoading = true
			state.status = action.payload.message
		},
		// Logi пользователя
		[loginUser.pending]: (state) => {
			state.isLoading = true
		},
		[loginUser.fulfilled]: (state, action) => {
			state.isLoading = false
			state.status = action.payload.message
			state.user = action.payload.user
			state.token = action.payload.token
		},
		[loginUser.rejected]: (state, action) => {
			state.isLoading = true
			state.status = action.payload.message
		},
		// Проверка Авторизации
		[getMe.pending]: (state) => {
			state.isLoading = true
			state.status = null
		},
		[getMe.fulfilled]: (state, action) => {
			state.isLoading = false
			state.status = null
			state.user = action.payload?.user
			state.token = action.payload?.token
		},
		[getMe.rejected]: (state, action) => {
			state.isLoading = true
		},
	}
})

export const checkIsAuth = state => Boolean(state.auth.token)

export const {logaut} = authSlice.actions

export default authSlice.reducer