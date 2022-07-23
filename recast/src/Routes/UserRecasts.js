import {useState, useEffect, useRef} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';

import './Recasts.css'

function UserRecasts(props) {
    const {id} = useParams()
    const navigate = useNavigate()

    
    const [recasts, setRecasts] = useState()
    useEffect(() => {
        setRecasts(props.recasts.filter(recast => recast.user.id == id))
    }, [props.recasts])

    const [movies, setMovies] = useState()
    useEffect(() => {
        setMovies(props.movies)
    }, [props.movies])

    const [actors, setActors] = useState()
    useEffect(() => {
        setActors(props.actors)
    }, [props.actors])
    
    const loading = () => {
        return <h3>Loading...</h3>
    }


    const handleRecastClick = (id) => (e) => {
        e.preventDefault()

        navigate(`/recast/${id}`)
    }

    const loaded = () => {
        return recasts.map(recast => (
            <div key={recast.id} className='recast' onClick={handleRecastClick(recast.id)}>
                <div className='recastHeader'>
                    <h2>{recast.name}</h2>
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
                {/* <span><p onClick={handleUpvote(recast.id)}>Upvote {recast.upvotes.length}</p> <p onClick={handleDownvote(recast.id)}>Downvote {recast.downvotes.length}</p></span> */}
            </div>
        ))
    }

    return(
        <div className='recasts'>
            {recasts && movies && actors ? loaded() : loading()}
        </div>
    )
}

export default UserRecasts;