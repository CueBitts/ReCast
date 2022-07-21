import {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';

import './Recasts.css'

function Recasts(props) {
    console.log(props.actors)

    const [recasts, setRecasts] = useState()
    useEffect(() => {
        setRecasts(props.recasts)
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

    const loaded = () => {
        return recasts.map(recast => (
            <div key={recast.id} className='recast'>
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
            </div>
        ))
    }

    return(
        <div className='recasts'>
            {recasts && movies && actors ? loaded() : loading()}
        </div>
    )
}

export default Recasts;