import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllPost} from '../redux/postSlice.js'
import PostItem from '../componens/PostItem.jsx'
import PopularPost from '../componens/PopularPost.jsx'

const MainPage = () => {
	const dispatch = useDispatch()
	const {posts, popularposts} = useSelector(state => state.post)

	useEffect(() => {
		dispatch(getAllPost())
	}, [dispatch])

	if(!posts) {
		return (
			<h2>Постов нет</h2>
		)
	}


	return (
		<div className='mx-auto py-10'>
			<div className='flex justify-between gap-8'>
				<div className='flex flex-col gap-6 basis-9/12'>

					{
						posts && posts.map((post, idx) => <PostItem key={idx} post={post} />
						)
					}

				</div>
				<div className='basis-3/12'>
					<div className='text-xs uppercase text-white'>
						Популярные:
					</div>
					<div className='mt-10'>
						{
							popularposts && popularposts.map((post, idx) => <PopularPost key={idx} post={post} />
							)
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainPage