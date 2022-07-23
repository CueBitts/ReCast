import {useState, useEffect, useRef} from 'react';
import {useParams, Link} from 'react-router-dom';

function Recast(props) {
    const {id} = useParams()


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
        const recast = props.recasts.find(r => r.id == id)
        
        return (
            <div className='recast'>
                <h2>{recast.name}</h2>
                <h4>Recast of <Link to={`/recasts/${recast.movie}`}>{movies.find(movie => movie.id == recast.movie)?.title}</Link> by <Link to={`/user/${recast.user.id}`}>{recast.user.name}</Link></h4>
                <p>{recast.desc}</p>
                {recast.recastInsts.map(recastInst => {   
                    return (
                        <div key={recastInst.id} className='recastInst'>    
                            <h6>{actors.find(actor => actor.id == recastInst.actor)?.name}</h6>
                            <img className='recastInstImg' src={`https://image.tmdb.org/t/p/w500/${actors.find(actor => actor.id == recastInst.actor)?.images.profiles[0].file_path}`} alt={actors.find(actor => actor.id == recastInst.actor)?.name}/>
                            <h6>as {recastInst.name}</h6>
                        </div>
                    )
                })}
            </div>
        )
    }
    
    return(
        <div className='recast'>
            {recasts && movies && actors ? loaded() : loading()}
        </div>
    )
}

export default Recast;