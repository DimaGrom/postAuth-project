import React from 'react'
import Navbar from './Navbar.jsx'
import '../css/main.css'

const Layout = ({children}) => {

	return (
		<React.Fragment>
			<div className='base'>
				<div className='lg:container mx-auto'>
					<Navbar />
					{children}
				</div>
			</div>
		</React.Fragment>
	)
}

export default Layout