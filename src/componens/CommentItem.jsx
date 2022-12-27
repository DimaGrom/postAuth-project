import React, {useEffect, useState} from 'react'
import '../css/main.css'
import {useDispatch, useSelector} from 'react-redux'
import {getAvatar} from '../redux/commentSlice.js'
import Moment from 'react-moment'

const CommentItem = ({comment}) => {
	const [avatar, setAvatar] = useState('')
	const [fullComment, setFullComment] = useState(true)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAvatar(comment.authorID))
			.then(data => setAvatar(data.payload.avatar))
	}, [dispatch])

	if(!comment) {
		return (
			<div>
				Коммертариев нет
			</div>
		)
	}

	return (
		<div className='flex gap-2 justify-start aline-items-center bg-gray-400 p-1 rounded-sm relative' >
				{
					avatar ? (
						<img
							src={`http://localhost:3002/${avatar}`}
							alt='img'
							className='w-30 h-30 rounded-f5'
						/>
					) : (
						<div className='w-30 h-30 rounded-f5 bg-gray-200' ></div>
					)
				}	
				<div 
					className={fullComment ? 'text-xs line-clamp-3 cursor-pointer transition' : 'text-xs cursor-pointer'}
					onClick={() => setFullComment(!fullComment)}
				>
					{comment.text}
				</div>
				<div 
					className='text-black font-bold opacity-50 text-10 absolute bottom-0 right-4'
				>
					<Moment date={comment.datedate} format='DD MM YYYY' />
				</div>
		</div>
	)
}

export default CommentItem

