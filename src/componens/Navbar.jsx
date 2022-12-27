import React from 'react'
import '../css/main.css'
import { NavLink, Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {checkIsAuth} from '../redux/authSlice.js'
import {logaut} from '../redux/authSlice.js'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {		
	const dispatch = useDispatch()
	const isAuth = useSelector(checkIsAuth)
	const navigate = useNavigate()

	const activeStyles = {
		color: 'white'
	}

	const logautHandle = () => {
		dispatch(logaut())
		window.localStorage.removeItem('token')
		toast('Вы вышли из системы')
		navigate('/')
	}

	return (
		<div className='flex py-4 justify-between items-center'>

			<span className='flex py-4 justify-center flex-center items-center w-6 h-6 bg-gray-500 text-sm rounded-sm text-white'>A
			</span>

			{
				isAuth &&
					(<div className='flex'>
					
						<NavLink 
							to={'/'}	
							className='text-gray-400 text-sm hover-text-white cursor px-2 transition-04'	
							style={({isActive}) => isActive ? activeStyles : undefined}			
						>
								Главная				
						</NavLink>

						<NavLink
							to={'/posts'}
							className='text-gray-400 text-sm hover-text-white cursor px-2 transition-04'
							style={({isActive}) => isActive ? activeStyles : undefined}
						>

							Мои посты
						</NavLink>

						<NavLink 
							to='/new'
							className='text-gray-400 text-sm hover-text-white cursor px-2 transition-04'
							style={({isActive}) => isActive ? activeStyles : undefined}
						>
							Добавить посты
						</NavLink>

						<NavLink 
							to='/privet'
							className='text-gray-400 text-sm hover-text-white cursor px-2 transition-04'
							style={({isActive}) => isActive ? activeStyles : undefined}
						>
							Личный кабинет
						</NavLink>
						
					</div>)
			}

			{
				!isAuth &&
					(<div className='flex'>
					
						<NavLink 
							to={'/'}	
							className='text-gray-400 text-sm hover-text-white cursor px-2 transition-04'	
							style={({isActive}) => isActive ? activeStyles : undefined}			
						>
								Главная				
						</NavLink>
						
					</div>)
			}
					

			<div className='flex justify-between items-center text-sm rounded-sm text-white transition-04'>

				{
					isAuth 
						?
							(<button onClick={logautHandle} className='bg-gray-500 hover:bg-gray-600 px-4 py-1 transition-04'>
								 Выйти 
							</button>)
						:
							(<Link to='/login' className='bg-gray-500 hover_bg-gray-600 px-4 py-1 transition-04'>
								 Войти 
							</Link>)
				}
							
				
			</div>
		</div>
	)

}

export default Navbar