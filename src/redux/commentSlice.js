import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../utils/axios.js'

const initialState = {
	comments: [],
	comment: [],
	isLoading: false,
	statuse: '',
	chackcomment: true,
	avatar: ''
}

// Create New Comment
export const createComment = createAsyncThunk(
	'comment/createComment',
	async (param) => {
		//http://localhost:3002/api/comment'
		const {data} = await axios.post(`/comment`, param)
		return await data
	}
) 

// Получение всех комментариев
export const getAllComments = createAsyncThunk(
	'comment/getAllComments',
	async (param) => {
		const {data} = await axios.post('comment/for', {param})
		// console.log('data getAllComments ', data)
		return await data
	}
)

// Получение аватара
export const getAvatar = createAsyncThunk(
	'comment/getAvatar',
	async (param) => {
		const {data} = await axios.post('comment/avatar', {param})
		return await data
	}
)

export const commentSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {},
	extraReducers:{
		// Создаем новый комментарий
		[createComment.pandig]: (state) => {
			state.isLoading = true
		},
		[createComment.fulfilled]: (state, action) => {
			state.isLoading = false
			state.comments = action.payload?.comments
			state.comment = action.payload?.comment
			state.statuse = action.payload?.message
			state.chackcomment = !state.chackcomment
		},
		[createComment.rejected]: (state, action) => {
			state.isLoading = true
			state.statuse = state.payload?.message
		},
		// Пуе Фдд Сщььутеы
		[getAllComments.pandig]: (state) => {
			state.isLoading = true
		},
		[getAllComments.fulfilled]: (state, action) => {
			state.isLoading = false
			state.comments = action.payload?.comments
			state.statuse = action.payload?.message
		},
		[getAllComments.rejected]: (state, action) => {
			state.isLoading = true
			state.statuse = state.payload?.message
		},
		// Получение аватара
		[getAvatar.pandig]: (state) => {
			state.isLoading = true
		},
		[getAvatar.fulfilled]: (state, action) => {
			state.isLoading = false
			state.avatar = action.payload?.avatar
		},
		[getAvatar.rejected]: (state, action) => {
			state.isLoading = true
			state.statuse = state.payload?.message
		},
	}
})

const {} = commentSlice.actions

export default commentSlice.reducer