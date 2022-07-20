import {Link} from 'react-router-dom';

import './Recasts.css'

function Recasts(props) {
    const loading = () => {
        return <h3>Loading...</h3>
    }

    const loaded = () => {
        return props.recasts.map(recast => (
            <div key={recast.id} className='recast'>
                <div className='recastHeader'>
                    <h2>{recast.name}</h2>
                    <h4>Recast of <Link to=''>{recast.movie.name}</Link> by <Link to=''>{recast.user.name}</Link></h4>
                </div>
                {recast.recastInsts.map(recastInst => {
                    return (
                        <div key={recastInst.id} className='recastInst'>    
                            <h6>{recastInst.actor.name}</h6>
                            <img className='recastInstImg' src={recastInst.actor.img} alt=''/>
                            <h6>as {recastInst.name}</h6>
                        </div>
                    )
                })}
            </div>
        ))
    }

    return(
        <div className='recasts'>
            {props.recasts ? loaded() : loading()}
        </div>
    )
}

export default Recasts;