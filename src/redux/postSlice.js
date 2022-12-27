import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../utils/axios.js'

const initialState = {
	posts: [],
	post: [],
	myposts: [],
	popularposts: [],
	statuse: null,
	isLoading: false,
	check: false
}

// Создание нового поста
export const createPost = createAsyncThunk(
	'post/createPost',
	async (params) => {
		const {data} = await axios.post('/posts', params)
		return data
	}
)


// Получение всех постов
export const getAllPost = createAsyncThunk(
	'post/getAllPost',
	async () => {
		const {data} = await axios.get('/posts')
		return data
	}
)

// Получение поста по id
export const getPost = createAsyncThunk(
	'post/getPost',
	async (id) => {
		const {data} = await axios.get(`/posts/${id}`)
		return await data
	}
)

// Получение моих постов
export const myPosts = createAsyncThunk(
	'post/myPosts',
	async () => {
		const {data} = await axios.get('posts/user/me')
		return await data
	}
)

// Удаление поста
export const deletPost = createAsyncThunk(
	'post/deletPost',
	async (id) => {
		const {data} = await axios.delete(`/posts/${id}`)
		return await data
	}
)

// Редактирование поста
export const updatePost = createAsyncThunk(
	'post/updatePost',
	async (update) => {
		const {data} = await axios.put(`/posts/${update.id}`, update, 
				{
				headers: {"Content-Type": "multipart/form-data"}
			}
			)
		return data
	}
)

export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {},
	extraReducers: {
		// Создаем новый пост
		[createPost.pandig]: (state) => {
			state.isLoading = true
		},
		[createPost.fulfilled]: (state, action) => {
			state.isLoading = false
			state.statuse = action.payload.message
			state.posts.push(action.payload.post)
			state.check = !state.check
		},
		[createPost.rejected]: (state, action) => {
			state.isLoading = true
			state.statuse = state.payload?.message
		},
		// Получение всех постов
		[getAllPost.pandig]: (state) => {
			state.isLoading = true
		},
		[getAllPost.fulfilled]: (state, action) => {
			state.isLoading = false
			state.posts = action.payload.posts
			state.popularposts = action.payload.popularposts
		},
		[getAllPost.rejected]: (state, action) => {
			state.isLoading = true
			state.statuse = state.payload?.message
		},
		// Получение поста по id
		[getPost.pandig]: (state) => {
			state.isLoading = true
		},
		[getPost.fulfilled]: (state, action) => {
			state.isLoading = false
			state.post = action.payload
		},
		[getPost.rejected]: (state, action) => {
			state.isLoading = true
			state.statuse = state.payload?.message
		},
		// Получение моих постов
		[myPosts.pandig]: (state) => {
			state.isLoading = true
		},
		[myPosts.fulfilled]: (state, action) => {
			state.isLoading = false
			state.myposts = action.payload.myposts
			state.popularposts = action.payload.popularposts
		},
		[myPosts.rejected]: (state, action) => {
			state.isLoading = true
			state.statuse = state.payload?.message
		},
		// Редактирование поста
		[updatePost.pandig]: (state) => {
			state.isLoading = true
		},
		[updatePost.fulfilled]: (state, action) => {
			state.isLoading = false
			state.post = action?.payload
		},
		[updatePost.rejected]: (state, action) => {
			state.isLoading = true
			state.statuse = state.payload?.message
		},
		// Удаление поста
		[deletPost.pandig]: (state) => {
			state.isLoading = true
		},
		[deletPost.fulfilled]: (state, action) => {
			state.isLoading = false
			state.statuse = state.payload?.message
			state.check = !state.check
		},
		[deletPost.rejected]: (state, action) => {
			state.isLoading = true
		},
	}
})

// export const {} = postSlice.actions

export default postSlice.reducer