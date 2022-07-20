import {Link} from 'react-router-dom';

import './Header.css';

function Header() {
    return (
        <div className='header'>    
            <span className='subHeader'>    
                <h2>Re/Cast</h2>
                <Link to=''>Sign in/Sign up/Profile</Link>
            </span>
            <span className='subHeader'>
                <Link to='/new-recast'>Create Recast</Link>
                <p>Sort V</p>
            </span>
        </div>
    )
}

export default Header;