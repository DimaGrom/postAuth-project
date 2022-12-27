import React, {useEffect} from 'react'
import PostItem from '../componens/PostItem.jsx'
import PopularPost from '../componens/PopularPost.jsx'
import {myPosts} from '../redux/postSlice.js'
import {useDispatch, useSelector} from 'react-redux'


const PostsPage = () => {
	const dispatch = useDispatch()

	const posts = useSelector(state => state.post.myposts)
	const popularposts = useSelector(state => state.post.popularposts)
	const check = useSelector(state => state.post.check)

	useEffect(() => {
		dispatch(myPosts())
	}, [dispatch, check])

	if(!posts) {
		return (
			<h2>Постов нет</h2>
		)
	}

	return (
		<div className='max-w-900 mx-auto py-10'>
			
			<div className='flex justify-between gap-8'>
				<div className='flex flex-col gap-6 basis-8/12'>
					{
						posts && posts.map((post, idx) => <PostItem key={idx} post={post} />
						)
					}
				</div>
				<div className='basis-4/12'>
					<div className='text-xs uppercase text-white'>
						Популярные:
					</div>
					<div className='mt-10'>
						{
							popularposts && popularposts.map((pos, idx) => <PopularPost key={idx} post={pos} />
							)
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostsPage