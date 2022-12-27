import React from 'react'
import '../css/main.css'

const PopularPost = ({post}) => {

	console.log('post ', post)

	if(!post) {
		return (
			<div>Постов нет</div>
		)
	}

	return (
		<div className='flex text-xs text-gray-300 hover:bg-gray-800 cursor-pointer'>
				{
					post ? <p>Да</p> : <p>Нет</p>
				}
		</div>
	)
}

export default PopularPost