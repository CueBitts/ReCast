import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import './Header.css';

function Header() {
    const navigate = useNavigate()
    const [createRecast, setCreateRecast] = useState(null)
    const [userLink, setUserLink] = useState(null)
    const [signedIn, setSignedIn] = useState(sessionStorage.signedIn ? JSON.parse(sessionStorage.signedIn) : null)
    
    window.addEventListener('storage', () => setSignedIn(sessionStorage.signedIn ? JSON.parse(sessionStorage.signedIn) : null));
    
    useEffect(() => {
        if(sessionStorage.signedIn) {
            setUserLink(<Link to='/profile'>Profile</Link>)
            setCreateRecast(<Link to='/new-recast'>Create Recast</Link>)
        } else {
            setUserLink(
                <div>
                    <Link to='/sign-in'>Sign in</Link>
                    <Link to='/sign-up'>Sign up</Link>
                </div>
            )
            setCreateRecast(null)
        }
    }, [signedIn])
    
    
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
                {createRecast}
            </span>
        </div>
    )
}

export default Header;