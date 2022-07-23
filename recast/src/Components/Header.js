import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import './Header.css';

function Header() {
    const navigate = useNavigate()
    const [userLink, setUserLink] = useState(null)
    
    useEffect(() => {
        if(sessionStorage.signedIn) {
            setUserLink(<Link to='/profile'>Profile</Link>)
        } else {
            setUserLink(
                <div>
                    <Link to='/sign-in'>Sign in</Link>
                    <Link to='/sign-up'>Sign up</Link>
                </div>
            )
        }
    }, [sessionStorage])
    
    
    const handleClickRecast = (e) => {
        e.preventDefault()
        
        navigate('/')
    }


    return (
        <div className='header'>    
            <span className='subHeader'>    
                <h2 onClick={handleClickRecast}>Re/Cast</h2>
                {userLink}
            </span>
            <span className='subHeader'>
                <Link to='/new-recast'>Create Recast</Link>
            </span>
        </div>
    )
}

export default Header;