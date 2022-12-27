import React, {useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './componens/Layout.jsx'
import RegistrationPage from './pages/RegistrationPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {getMe} from './redux/authSlice.js'
import {useDispatch} from 'react-redux'
import AddPostPage from './pages/AddPostPage.jsx'
import MainPage from './pages/MainPage.jsx'
import PostPage from './pages/PostPage.jsx'
import PostsPage from './pages/PostsPage.jsx'
import EditPostPage from './pages/EditPostPage.jsx'
import PrivetPage from './pages/PrivetPage.jsx'

const App = () => {		
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getMe())
	}, [dispatch])

	return (
		<Layout>
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path="/registration" element={<RegistrationPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/new" element={<AddPostPage />} />
				<Route path="/:id" element={<PostPage />} />
				<Route path="/posts" element={<PostsPage />} />
				<Route path=":id/edit" element={<EditPostPage />} />
				<Route path="/privet" element={<PrivetPage />} />
			</Routes>
			<ToastContainer position='bottom-right' />
		</Layout>
	)

}

export default App