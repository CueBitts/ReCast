import {useParams} from 'react-router-dom';

function Recast(props) {
    const {id} = useParams()

    const loading = () => {
        return <h3>Loading...</h3>
    }

    const loaded = () => {
        const recast = props.recasts.find(r => r.id == id)
        
        return (
            <div className='recast'>
                <h2>{recast.name}</h2>
                <h4>Recast of {recast.movie.name} by {recast.user.name}</h4>
                <p>{recast.desc}</p>
            </div>
        )
    }
    
    return(
        <div className='recast'>
            {props.recasts ? loaded() : loading()}
        </div>
    )
}

export default Recast;