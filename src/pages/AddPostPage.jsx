import React, {useState} from 'react'
import '../css/main.css'
import {createPost} from '../redux/postSlice.js'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const AddPostPage = () => {
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [image, setImage] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	
	const submitHandler = () => {
		try {
			const data = new FormData()
			data.append('title', title)
			data.append('text', text)
			data.append('image', image)
			dispatch(createPost(data))
			navigate('/posts')
		} catch(err) {
			console.log(err)
		}
	}

	const clearHandle = () => {
		setTitle('')
		setText('')
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
					Прикрепить изображение
					<input 
						type='file'
					 	className='hidden' 
					 	onChange={e => setImage(e.target.files[0])}
					 />
				</label>		
				<div className='flex object-cover py-2'>
					{
						image && <img src={URL.createObjectURL(image)} alt='img' />
					}
				</div>
				<label className='text-xs text-white opacity-70'>
					Заголовок поста:
					<input
						type='text'
						value={title}
						onChange={e => setTitle(e.target.value)}
						placeholder='Заголовок'
						className='py-1 px-2 text-black w-full rounded-lg bg-gray-400 hover:bg-gray-500 transition border my-2 text-sm outline-none box-border placeholder:opacity-90'
					/>
				</label>
				<label className='text-xs text-white opacity-70 my-2'>
					Текст поста:
					<textarea
						rows='5'
						value={text}
						onChange={e => setText(e.target.value)}
						placeholder='Текст'
						className='pt-1 px-2 my-2 text-black w-full rounded-lg bg-gray-400 hover:bg-gray-500 transition border text-sm outline-none resize-none box-border placeholder:opacity-90'
					/>
				</label>
				<div className='flex justify-center items-center gap-8 mt-4 w-full'>
					<button
						onClick={submitHandler}
						className='flex justify-center items-center text-white text-sm bg-gray-500 py-1 px-4 rounded-sm cursor-pointer hover:bg-gray-700 transition'
					>
						Добавить
					</button>
					<button
						onClick={clearHandle}
						className='flex justify-center items-center text-white text-sm bg-red-500 py-1 px-4 rounded-sm cursor-pointer hover:bg-gray-700 transition'
					>
						Отменить
					</button>
				</div>
			</form>
		</div>
	)
}

export default AddPostPage