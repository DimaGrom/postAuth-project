import React from 'react'
import '../css/main.css'
import views from '../icons/eye4.png'
import comment from '../icons/message3.png'
import delepost from '../icons/delete.png' 
import Moment from 'react-moment'
import pence from '../icons/pencil.png'
import {Link} from 'react-router-dom'

const PostItem = ({post}) => {

	if(!post) {
		return (
			<div>
				<h3>Постов нет</h3>
			</div>
		)
	}

	return (
			<div className='flex flex-col basis-1/4 grow'>
				<Link to={`/${post.id}`}>
					<div className={post ? 'flex rounded-sm w-full' : 'flex rounded sm'} >
							{
								post.imageURL && <img
									className='w-full'  
									src={`http://localhost:3002/${post.imageURL}`}  
									alt='image' 
								/>
							}
					</div>
				</Link>
				<div className='flex justify-between items-center pt-2'>
					<div className='text-xs text-white opacity-50'>{post.userName}</div>
					<div className='text-xs text-white opacity-50'>
						<Moment date={post.datedate} format='DD MM YYYY' />
					</div>
				</div>
				<div className='text-xs text-white mt-2'>{post.title}</div>

				<p className='text-white text-xs opacity-60 pb-2 line-clamp-3'>{post.text}</p>

				<div className='flex items-center'>

					<div className='flex items-center gap-4 textx-xs'>
						<Link to={`/${post.id}`}
							className='flex gap-2 items-center justify-center tesp-white border-0 cursor-pointer'
						>
							<img className='bg-white inline-block w-3' src={views} alt='Просмотры' /><span className='text-xs'>{post.views}</span>
						</Link>
						<div
							className='flex gap-2 items-center justify-center text-xs tesp-white border-0 cursor-pointer'
						>
							<img className='bg-white block w-3' src={comment} alt='Комментарии' /><span className='text-xs'>{post.comments}</span>
						</div>
					</div>
				</div>
			</div>
	)
}

export default PostItem