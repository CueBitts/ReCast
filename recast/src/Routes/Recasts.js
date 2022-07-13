function Recasts(props) {
    const loading = () => {
        return <h3>Loading...</h3>
    }

    const loaded = () => {

        console.log(props.recasts)

        return props.recasts.map(recast => (
            <div className='recast'>
                {JSON.stringify(recast)}
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