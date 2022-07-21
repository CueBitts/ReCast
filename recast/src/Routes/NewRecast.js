import {useState, useEffect, useRef} from 'react';
import {useParams, Link} from 'react-router-dom';

import './NewRecast.css'


function NewRecast(props) {
    const {id} = useParams()
    const APIKey = 'ab5b083db2d7cac5a40a452fba117560'
    const search = useRef(null)
    
    const [movie, setMovie] = useState(null)
    
    // const getMovie = () => {
    //         fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKey}&language=en-US&append_to_response=credits`, {
    //             method: 'GET',
    //             headers: {
    //                 'content-type': 'application/json'
    //             }
    //         })
    //         .then(response => response.json())
    //         .then(data => setMovie(data))
    // }

    useEffect(() => {
        const getMovie = () => {
            return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKey}&language=en-US&append_to_response=credits`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => setMovie(data))
        }
        getMovie()
    }, [])
    
    const [newRecast, setNewRecast] = useState({
        name: '',
        movie: '',
        user: '',
        desc: ''
    })

    const showRecastModal = (character) => {
        console.log(character.name)
        
    }

    const hideRecastModal = () => {

    }
    
    

    const [actors, setActors] = useState(null)

    const getActors = (query) => {
        fetch(`https://api.themoviedb.org/3/search/person?api_key=${APIKey}&language=en-US&query=${query.replace(/ /g, '%20')}&include_adult=false`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setActors(data))
    }   

    const [newSearch, setNewSearch] = useState({
        query: ''
    })
    
    const handleRecastChange = (e) => {
        setNewRecast({ ...newRecast, user: '1', movie: id, [e.target.name]: e.target.value  })
    }

    const handleRecastSubmit = (e) => {
        e.preventDefault()
        console.log(newRecast)
        // add to psql

        setNewRecast({
            name: '',
            movie: '',
            user: '',
            desc: ''
        })
    }

    const handleSearchChange = (e) => {
        setNewSearch({ ...newSearch, query: e.target.value })
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        getActors(newSearch.query)
        console.log(actors)

        search.current.value = ''
        setNewSearch({
            query: ''
        })
    }
    
    const loading = () => {
        return <h3>Loading...</h3>
    }
    
    const loaded = () => {
        return (
            <div className='newRecast'>
                <form onSubmit={handleRecastSubmit}>
                    <input
                        className='input'
                        type='text'
                        name='name'
                        placeholder='Title'

                        onChange={handleRecastChange}
                    />
                    <p>Recast of {movie.title}</p>
                    <input
                        className='input'
                        type='text'
                        name='desc'
                        placeholder='Description'

                        onChange={handleRecastChange}
                    />
                    <button
                        className='button'
                        type='submit'
                        name='submit'>
                        Submit
                    </button>
                </form>
                <div className='newRecast'>  
                    {movie?.credits.cast.map(character => {
                        return (
                            <div key={character.id} className='castInst'>
                                <p>{character.character}</p>
                                <img className='castInstImg' src='https://cdn4.vectorstock.com/i/thumb-large/28/63/profile-placeholder-image-gray-silhouette-vector-21542863.jpg' alt='' onClick={e => showRecastModal(character)}/>
                                <p>Original Actor: {character.name}</p>
                            </div>
                        )
                    })}
                </div>
                <div className='newRecastModal'>
                    <form onSubmit = {handleSearchSubmit}>    
                        <input
                            className='input'
                            type='text'
                            name='search'
                            ref={search}

                            placeholder='Search'

                            onChange={handleSearchChange}
                        />
                        <button
                            className='button'
                            type='submit'
                            name='submit'>
                            Search
                        </button>
                    </form>
                    {actors?.results.map(result => {
                        return (
                            <div key={result.id} className='result'>
                                <Link to=''>{result.name} {result.id}</Link>
                                {result.name} {result.id}
                            </div>
                        )
            })}
                </div>
            </div>
        )
    }

    return(
        <div className='newRecast'>
            {movie ? loaded() : loading()}
        </div>
    )
}

export default NewRecast;