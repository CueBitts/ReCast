import {useState, useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import './Profile.css'


function Profile(props) {
    const recastAPI = 'https://recastapi.herokuapp.com'
    const navigate = useNavigate()
    const name = useRef(null)
    const password = useRef(null)
    
    const [recasts, setRecasts] = useState()
    useEffect(() => {
        setRecasts(props.recasts?.filter(recast => recast.user.id == JSON.parse(sessionStorage.signedIn).id))
    }, [props.recasts])

    const [movies, setMovies] = useState()
    useEffect(() => {
        setMovies(props.movies)
    }, [props.movies])

    const [actors, setActors] = useState()
    useEffect(() => {
        setActors(props.actors)
    }, [props.actors])
    

    const handleSignOut = (e) => {
        e.preventDefault()

        sessionStorage.clear()
        navigate('/')
    }
    
    const handleDeleteProfile = async (e) => {
        e.preventDefault()

        await fetch(`${recastAPI}/users/${JSON.parse(sessionStorage.signedIn).id}/`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            if(!result) {
                console.log('delete unsuccessful')
            } else {
                console.log('delete successful')
                sessionStorage.clear()
                navigate('/')
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleDeleteRecast = (id) => async (e) => {
        e.preventDefault()

        await fetch(`${recastAPI}/recasts/${id}/`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            if(!result) {
                console.log('delete unsuccessful')
            } else {
                console.log('delete successful')
            }
        })
        .catch(error => {
            console.log(error)
        })
    }


    const [newForm, setNewForm] = useState({
        name: '',
        password: ''
    })
    
    const handleChange = (e) => {
        e.preventDefault()

        setNewForm({ ...newForm, [e.target.name]: e.target.value })
        console.log(newForm)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await fetch(`${recastAPI}/users/${JSON.parse(sessionStorage.signedIn).id}/`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newForm)
        })
        .then(response => response.json())
        .then(result => {
            if(!result) {
                console.log('update unsuccessful')
            } else {
                console.log('update successful')
                sessionStorage.setItem('signedIn', JSON.stringify(result))
            }
        })
        .catch(error => {
            console.log(error)
        })

        name.current.value = ''
        password.current.value = '' 
        setNewForm({
            name: '',
            password: ''
        })
    }


    const loading = () => {
        return <h3>Loading...</h3>
    }

    const loaded = () => {
        return ( 
            <div className='profile'>
                <h2>{JSON.parse(sessionStorage.signedIn).name}'s Profile</h2>
                <h4>Update Profile</h4>
                <button
                    className='button'
                    type='button'
                    name='signOut'
                    
                    onClick={handleSignOut}>
                    Sign Out
                </button>
                <button
                    className='button'
                    type='button'
                    name='deleteProfile'
                    
                    onClick={handleDeleteProfile}>
                    Delete Profile
                </button>
                <form onSubmit = {handleSubmit}>    
                    <input
                        className='input'
                        type='text'
                        name='name'
                        ref={name}

                        placeholder='Username'

                        onChange={handleChange}
                    />
                    <input
                        className='input'
                        type='password'
                        name='password'
                        ref={password}

                        placeholder='Password'

                        onChange={handleChange}
                    />
                    <button
                        className='button'
                        type='submit'
                        name='submit'>
                        Submit
                    </button>
                </form>    
                {recasts.map(recast => (
                    <div key={recast.id} className='recast'>
                        <div className='recastHeader'>
                            <span>
                                <h2>{recast.name}</h2>
                                <button
                                    className='button'
                                    type='button'
                                    name='deleteRecast'
                                    
                                    onClick={handleDeleteRecast(recast.id)}>
                                    Delete Recast
                                </button>
                            </span>
                            <h4>Recast of <Link to=''>{movies.find(movie => movie.id == recast.movie)?.title}</Link> by <Link to=''>{recast.user.name}</Link></h4>
                        </div>
                        {recast.recastInsts.slice(0, 5).map(recastInst => {   
                            return (
                                <div key={recastInst.id} className='recastInst'>    
                                    <h6>{actors.find(actor => actor.id == recastInst.actor)?.name}</h6>
                                    <img className='recastInstImg' src={`https://image.tmdb.org/t/p/w500/${actors.find(actor => actor.id == recastInst.actor)?.images.profiles[0].file_path}`} alt={actors.find(actor => actor.id == recastInst.actor)?.name}/>
                                    <h6>as {recastInst.name}</h6>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        )
    }

    return(
        <div className='recasts'>
            {recasts && movies && actors ? loaded() : loading()}
        </div>
    )
}

export default Profile;