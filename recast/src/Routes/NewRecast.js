import React, {useState, useEffect, useRef} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';

import './NewRecast.css'
import Modal from '../Components/Modal';
import useModal from '../Components/UseModal';


function NewRecast(props) {
    const {id} = useParams()
    const recastAPI = 'https://recastapi.herokuapp.com'
    const APIKey = 'ab5b083db2d7cac5a40a452fba117560'
    const search = useRef(null)
    const navigate = useNavigate()
    const {isShowing, toggle} = useModal()
    

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

    // const [actor, setActor] = useState(null)

    // useEffect(() => {
        // const getActor = (id) => {
        //     fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${APIKey}&language=en-US&append_to_response=images`, {
        //         method: 'GET',
        //         headers: {
        //             'content-type': 'application/json'
        //         }
        //     })
        //     .then(response => response.json())
        //     .then(data => {console.log(data)})
        //     .then(data => setActor(data))
        // }
    //     getActor()
    // }, [actor])

    // getActor()
        // recastInstImgs.current = [...recastInstImgs.current, {actor: actor.id, img: `https://image.tmdb.org/t/p/w500/${actor.images.profiles[0].file_path}`}]

    


    let recastId = 0
    const recastInsts = useRef([])
    const recastInstImgs = useRef([])
    const newRecastInst = useRef({
        name: '',
        actor: '',
        desc: '',
        recast: ''
    })

    const handleRecastInstClick = (cast) => (e) => {
        e.preventDefault()

        handleRecastInstChange(cast)
        toggle()
    } 
    
    const handleRecastInstChange = (cast) => {
        newRecastInst.current = { ...newRecastInst.current, name: cast.character}
        console.log(newRecastInst.current)
    }

    const handleRecastInstSubmit = (actor) => async (e) => {
        e.preventDefault()
        
        newRecastInst.current = { ...newRecastInst.current, actor: actor.id}
        recastInsts.current = [...recastInsts.current, newRecastInst.current]
        
        const response = await fetch(`https://api.themoviedb.org/3/person/${actor.id}?api_key=${APIKey}&language=en-US&append_to_response=images`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        let data = await response.json()
        recastInstImgs.current = [...recastInstImgs.current, {actor: actor.id,name: actor.name, img: `https://image.tmdb.org/t/p/w500/${data.images.profiles[0].file_path}`}]
        
        {/* {`https://image.tmdb.org/t/p/w500/${actors.find(actor => actor.id == recastInst.actor)?.images.profiles[0].file_path}`} */}
        console.log(newRecastInst.current)
        console.log(recastInsts.current)
        console.log(recastInstImgs.current)
        setActors(null)
        toggle()
        
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
        setNewRecast({ ...newRecast, user: JSON.parse(sessionStorage.signedIn).id, movie: id, [e.target.name]: e.target.value  })
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

        navigate('/')
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
                                <img className='castInstImg' src={recastInsts.current?.find(recastInst => recastInst.name == cast.character) ? recastInstImgs.current?.find(recastInstImg => recastInstImg.actor == recastInsts.current?.find(recastInst => recastInst.name == cast.character).actor)?.img : 'https://cdn4.vectorstock.com/i/thumb-large/28/63/profile-placeholder-image-gray-silhouette-vector-21542863.jpg'} alt='' onClick={handleRecastInstClick(cast)}/>
                                {recastInsts.current?.find(recastInst => recastInst.name == cast.character) ? <p>Recast: {recastInstImgs.current?.find(recastInstImg => recastInstImg.actor == recastInsts.current?.find(recastInst => recastInst.name == cast.character).actor)?.name}</p> : <p>Original Actor: {cast.name}</p>}
                            </div>
                        )
                    })}
                </div>
                <Modal
                    isShowing={isShowing}
                    hide={toggle}
                    handleSearchSubmit={handleSearchSubmit}
                    search={search}
                    handleSearchChange={handleSearchChange}
                    actors={actors}
                    handleRecastInstSubmit={handleRecastInstSubmit}
                />
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