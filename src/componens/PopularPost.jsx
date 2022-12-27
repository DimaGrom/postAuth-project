import React from 'react'
import '../css/main.css'
import {Link} from 'react-router-dom'

const PopularPost = ({post}) => {
	
	if(!post) {
		return (
			<div>Постов нет</div>
		)
	}

	return (
		<Link to={`/${post.id}`} className='flex text-xs text-gray-300 hover:bg-gray-800 cursor-pointer'>
				{
					post && <p>{post?.title}</p>
				}
		</Link>
	)
}

export default PopularPost