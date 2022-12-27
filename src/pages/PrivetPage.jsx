import React, {useState} from 'react'
import {useDispatch} from 'react-redux' 
import {createAvatar} from '../redux/privetSlice.js'

const PrivetPage = () => {

	const [avatar, setAvatar] = useState('')
	const dispatch = useDispatch()

	const hanleCreateAvatar = () => {
		const avatarData = new FormData()
		avatarData.append('avatar', avatar)
		dispatch(createAvatar(avatarData))
	}

	return (
		<div>
			<form 
				onSubmit={e => e.preventDefault()}
				className='w-1/3 mx-auto py-10'
			>
				<label
					className='text-gray-300 py-2 bg-gray-600 hover:bg-gray-700 transition text-xs flex justify-center items-center border-2 border-dotted cursor-pointer'
				>
					Выбрать Аватар
					<input 
						type='file'
					 	className='hidden' 
					 	onChange={e => setAvatar(e.target.files[0])}
					 />
				</label>		
		
				<div className='flex justify-center items-center gap-8 mt-4 w-full'>
					<button
						onClick={hanleCreateAvatar}
						className='flex justify-center items-center text-white text-sm bg-gray-500 py-1 px-4 rounded-sm cursor-pointer hover:bg-gray-700 transition'
					>
						Изменить
					</button>
				</div>
			</form>
		</div>
	)
}

export default PrivetPage