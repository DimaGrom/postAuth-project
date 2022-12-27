import React, { useState, useEffect } from 'react'
import '../css/main.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/authSlice.js'
import { toast } from 'react-toastify'
import {checkIsAuth} from '../redux/authSlice.js'

const RegistrationPage  = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {status} = useSelector(state => state.auth)
	const isAuth = useSelector(checkIsAuth)
	
	const handleSubmit = () => {
		try {
			dispatch(registerUser({username, password}))
			setUsername('')
			setPassword('')
		} catch(err) {
			console.log(err)
		}
	}

	useEffect(() => {
		if(status) {
			toast(status)
		}
		if(isAuth) {
			navigate('/')
		}
	}, [status, navigate, isAuth])


	return (
		<div className='mt-48'>
			<form 
				onSubmit={e => e.preventDefault()}
				className='w-5/12 mx-auto 	'
			>
				<h1 className='text-lg text-white text-center'>Авторизация </h1>
				<label className='text-xs text-gray-400'>
					Имя: 
					<input 
						type='text'
						placeholder='Username'
						value={username}
						onChange={e => setUsername(e.target.value)}
						className='mt-1 text-black w-full rounded-lg bg-gray-400 py-1 px-2 text-xs outline-none placeholder:text-gray-700'
					/>
				</label>
				<label className='text-xs text-gray-400'>
					Пароль:
					<input 
						type='password'
						placeholder='Password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='mt-1 text-black w-full rounded-lg bg-gray-400 py-1 px-2 text-xs outline-none placeholder:text-gray-700'
					/>
				</label>
				<div className='flex gap-8 justify-center mt-4'>
					<button
						type='submit'
						onClick={handleSubmit}
						className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2 hover:bg-gray-700 transition'
					>
						Подвердить
					</button>
					<Link to='/login' className='flex justify-center items-center text-xs text-white hover:text-d6d6d6 transition'>
						Уже зарегистрированны? 
					</Link>
				</div>
			</form>
		</div>
	)
}

export default RegistrationPage