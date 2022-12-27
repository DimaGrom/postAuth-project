import React, {useState, useEffect, useCallback} from 'react'
import '../css/main.css'
import {updatePost, getPost} from '../redux/postSlice.js'
import {useDispatch} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'


const EditPostPage = () => {

	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [oldImage, setOldImage] = useState('')
	const [newImage, setNewImage] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const params = useParams()

	const fechPost = useCallback(async () => {
		dispatch(getPost(params.id))
			.then(({payload}) => {
				setTitle(payload.title)
				setText(payload.text)
				setOldImage(payload.imageURL)
			})
	}, [params.id])

	useEffect(() => {
		fechPost()
	}, [fechPost])

	const deleteImageHandle = () => {
		setNewImage('')
		setOldImage('')
	}

	const submitHandler = () => {
		try {
			const data = new FormData()
			data.append('id', params.id)
			data.append('title', title)
			data.append('text', text)
			data.append('newImage', newImage)
			data.append('oldImage', oldImage)
			dispatch(updatePost(data))
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
					 	onChange={e => 
					 		{setNewImage(e.target.files[0])
					 		setOldImage('')}
					 	}
					 />
				</label>		
				<div className='flex object-cover py-2 relative'>

					{
						oldImage && (
							<img src={`http://localhost:3002/${oldImage}`} alt='Картинка' />
						)
					}
					{
						newImage && (
							<img src={URL.createObjectURL(newImage)} alt='Картинка' />
						)
					}

					{
						(oldImage || newImage) && (
							<button
								onClick={deleteImageHandle}
								className='flex justify-center border-0 rounded-full items-center text-white text-sm bg-red-500 hover:bg-red-700  cursor-pointer  transition absolute bottom-8 right-0 w-30 h-30'
							>
								X
							</button>
						)
					}

				
							
				</div>
				<label className='text-xs text-white opacity-70'>
					Заголовок поста:
					<input
						type='text'
						value={title}
						onChange={e => setTitle(e.target.value)}
						placeholder='Заголовок'
						className='py-1 px-2 text-black w-full rounded-lg bg-gray-400 hover:bg-gray-500 transition border my-2 text-sm outline-none box-border placeholder:opacity-90 cursor-pointer'
					/>
				</label>
				<label className='text-xs text-white opacity-70 my-2'>
					Текст поста:
					<textarea
						rows='5'
						value={text}
						onChange={e => setText(e.target.value)}
						placeholder='Текст'
						className='pt-1 px-2 my-2 text-black w-full rounded-lg bg-gray-400 hover:bg-gray-500 transition border text-sm outline-none resize-none box-border placeholder:opacity-90 cursor-pointer'
					/>
				</label>
				<div className='flex justify-center items-center gap-8 mt-4 w-full'>
					<button
						onClick={submitHandler}
						className='flex justify-center items-center text-white text-sm bg-gray-500 py-1 px-4 rounded-sm cursor-pointer hover:bg-gray-700 transition'
					>
						Изменить
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

export default EditPostPage