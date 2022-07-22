import {useState, useEffect, useRef} from 'react';
import {useParams, Link} from 'react-router-dom';

import './NewRecast.css'


function NewRecast(props) {
    const {id} = useParams()
    const recastAPI = 'http://localhost:8000'
    const APIKey = 'ab5b083db2d7cac5a40a452fba117560'
    const search = useRef(null)
    

    const [movie, setMovie] = useState(null)

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

    
    const showRecastModal = (character) => {
        
    }

    const hideRecastModal = () => {

    }


    const [actors, setActors] = useState(null)

    const getActors = (query) => {
        fetch(`https://api.themoviedb.org/3/search/person?api_key=${APIKey}&language=en-US&query=${query.replace(/ /g, '%20')}&include_adult=false&append_to_response=images`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setActors(data))
    }


    let recastId = 0
    const recastInsts = useRef([])
    const newRecastInst = useRef({
        name: '',
        actor: '',
        desc: '',
        recast: ''
    })

    const handleRecastInstChange = (cast) => (e) => {
        e.preventDefault()
        newRecastInst.current = { ...newRecastInst.current, name: cast.character}
        console.log(newRecastInst.current)
    }

    const handleRecastInstSubmit = (actor) => (e) => {
        e.preventDefault()
        newRecastInst.current = { ...newRecastInst.current, actor: actor.id}
        console.log(newRecastInst.current)
        recastInsts.current = [...recastInsts.current, newRecastInst.current]
        console.log(newRecastInst.current)
        console.log(recastInsts.current)
        newRecastInst.current = {
            name: '',
            actor: '',
            desc: '',
            recast: ''
        }
    }
    

    const [newRecast, setNewRecast] = useState({
        name: '',
        movie: '',
        user: '',
        desc: ''
    })
    
    const handleRecastChange = (e) => {
        setNewRecast({ ...newRecast, user: '1', movie: id, [e.target.name]: e.target.value  })
    }

    const handleRecastSubmit = async (e) => {
        e.preventDefault()
        console.log(newRecast)

        const response = await fetch(`${recastAPI}/recasts/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newRecast)
        })
        let data = await response.json()
        recastId = data.id
        console.log(recastId)

        console.log(recastInsts.current)
        recastInsts.current.map(async recastInst => {
            recastInst.recast = recastId
            await fetch(`${recastAPI}/recastinsts/`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(recastInst)
            })
        })

        setNewRecast({
            name: '',
            movie: '',
            user: '',
            desc: ''
        })
    }


    const [newSearch, setNewSearch] = useState({
        query: ''
    })
    
    const handleSearchChange = (e) => {
        setNewSearch({ ...newSearch, query: e.target.value })
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        getActors(newSearch.query)

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
                {/* <form name='newRecast' onSubmit={handleRecastSubmit}> */}
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
                        type='button'
                        name='submit'
                        onClick={handleRecastSubmit}>
                        Submit
                    </button>
                {/* </form> */}
                <div className='newRecast'>  
                    {movie?.credits.cast.map(cast => {
                        return (
                            <div key={cast.id} className='castInst'>
                                <p>{cast.character}</p>
                                <img className='castInstImg' src='https://cdn4.vectorstock.com/i/thumb-large/28/63/profile-placeholder-image-gray-silhouette-vector-21542863.jpg' alt='' onClick={handleRecastInstChange(cast)}/>
                                <p>Original Actor: {cast.name}</p>
                            </div>
                        )
                    })}
                </div>
                <div className='newRecastModal'>
                    <form name='search' onSubmit={handleSearchSubmit}>    
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
                                <p onClick={handleRecastInstSubmit(result)}>{result.name} {result.id}</p>
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