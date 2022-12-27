import react, {useEffect, useState} from 'react'
import '../css/main.css'
import views from '../icons/eye4.png'
import commentsImag from '../icons/message3.png'
import Moment from 'react-moment'
import {useParams, useNavigate, Link} from 'react-router-dom'
import {getPost} from '../redux/postSlice.js'
import {getAllComments} from '../redux/commentSlice.js'
import {useDispatch, useSelector} from 'react-redux'
import delepost from '../icons/delete.png' 
import pence from '../icons/pencil.png'
import {deletPost} from '../redux/postSlice.js'
import {createComment} from '../redux/commentSlice.js'
import {checkIsAuth} from '../redux/authSlice.js'
import CommentItem from '../componens/CommentItem.jsx'


const PostPage = () => {

	const params = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {post} = useSelector(state => state.post)
	const {user} = useSelector(state => state.auth)
	const [comment, setComment] = useState('')
	const isAyth = (useSelector(checkIsAuth))
	const [comments, setComments] = useState([])
	const {chackcomment} = useSelector(state => state.comment)

	useEffect(() => {
		dispatch(getPost(params.id))
		dispatch(getAllComments(params.id))
			.then(data => setComments(data.payload.comments))
	}, [dispatch, params.id, chackcomment])

	if(!post) {
		return (
			<div>
				<h3>Пост загружается</h3>
			</div>
		)
	}

	const getBack = () => {navigate('/')}

	const handeleDeletePost = () => {
		dispatch(deletPost(params.id))
		navigate('/posts')
	}

	const handleCreateComment = () => {
		try  {
			const data = {}
			data.id = params.id
			data.comment = comment
			dispatch(createComment(data))
			setComment('')
		} catch(err) {
			console.log(err)
		}
	}

	return (
		<div>

			<button
				className='flex justify-center items-center bg-gray-600 hover:bg-gray-700 text-sx text-white rounded-sm py-2 px-4 my-5 transition mt-5'
				onClick={getBack}
			>
				Назад
			</button>

			<div className='flex gap-8 py-8'>
				<div className='max-w-600'>
					<div className='flex flex-col basis-1/4'>
						<div className={post ? 'flex rounded-sm w-full' : 'flex rounded sm'} >
								{
									post.imageURL && <img src={`http://localhost:3002/${post.imageURL}`}  alt='image' />
								}
						</div>
					</div>

					<div className='flex justify-between items-center pt-2'>
						<div className='text-xs text-white opacity-50'>{post.userName}</div>
						<div className='text-xs text-white opacity-50'>
							<Moment date={post.datedate} format='DD MM YYYY' />
						</div>
					</div>

					<div className='text-xs text-white mt-2'>{post.title}
					</div>
					<p className='text-white text-xs opacity-60 pb-2'>{post.text}</p>

					<div className='flex items-center justify-between  mb-5'>

						<div className='flex items-center gap-4 textx-xs'>
							<div
								className='flex gap-2 items-center justify-center text-white border-0 cursor-pointer'
							>
								<img className='bg-white inline-block w-3' src={views} alt='Просмотры' /><span className='text-xs'>{post.views}</span>
							</div>
							<div
								className='flex gap-2 items-center justify-center text-xs text-white border-0 cursor-pointer'
							>
								<img className='bg-white block w-3' src={commentsImag} alt='Комментарии' /><span className='text-xs'>{post.comments}</span>
							</div>
						</div>

						<div className='flex items-center gap-4 textx-xs'>
							<div
								onClick={handeleDeletePost}
								className='flex gap-2 items-center justify-center border-0 cursor-pointer'
							>
								{
									user?.id === post?.author && (
										<img className='bg-white inline-block w-3' src={delepost} alt='Редактировать' />
									)
								}	
							</div>
							<Link to={`/${params.id}/edit`} 
								className='flex gap-2 items-center justify-center tesp-white border-0 cursor-pointer'
							>
								{
									user?.id === post?.author && (
										<img className='bg-white inline-block w-3' src={pence} alt='Редактировать' />
									)
								}	
							</Link>
						</div>
						
					</div>

				</div>

					{
						isAyth ? (
							<div className='w-4/12 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm px-2 box-border'>
								COMMENTS
								<form
									onSubmit={e => e.preventDefault()}
									className='flex gap-1'
								>
									<input
										value={comment}
										onChange={e => setComment(e.target.value)}
										type='text'
										placeholder='Comment'
										className='w-full text-black rounded-sm bg-gray-400 border px-2 p-2 outline-none text-xs .placeholder:text-gray-600'
									/>
									<p></p>
									<button
										onClick={handleCreateComment}
										type='submit'
										className='bg-gray-400 hover:bg-gray-500 text-sx text-white text-xs rounded-sm py-1 px-2 border-none transition'
									>
										Добавить
									</button>
								</form>
									{
										comments && comments.map((com, indx) => (
											<CommentItem key={indx} comment={com} />
										))
									}
							</div>
						) : (
							<h1>Что бы читать и добавлять комментарии необходимо автроризоваться или зайти на свою страничку.</h1>
						)
					}

						
			</div>

		</div>
	)
}

export default PostPage


