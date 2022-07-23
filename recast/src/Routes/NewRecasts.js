import {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';


function NewRecasts(props) {
    const APIKey = 'ab5b083db2d7cac5a40a452fba117560'
    
    
    const search = useRef(null)

    const [movies, setMovies] = useState(null)

    const getMovies = (query) => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&language=en-US&query=${query.replace(/ /g, '%20')}&include_adult=false`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setMovies(data))
    }   

    const [newSearch, setNewSearch] = useState({
        query: ''
    })
    
    const handleChange = (e) => {
        setNewSearch({ ...newSearch, query: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getMovies(newSearch.query)

        search.current.value = ''
        setNewSearch({
            query: ''
        })
    }
    
    return (
        <div className='newRecast'>
            <form onSubmit = {handleSubmit}>    
                <input
                    className='input'
                    type='text'
                    name='search'
                    ref={search}

                    placeholder='Search'

                    onChange={handleChange}
                />
                <button
                    className='button'
                    type='submit'
                    name='submit'>
                    Search
                </button>
            </form>
            {movies?.results.map(result => {
                return (
                    <div key={result.id} className='result'>
                        <Link to={`/new-recast/${result.id}`}>{result.title} ({result.release_date?.slice(0,4)})</Link>
                    </div>
                )
            })}
        </div>
    )
}

export default NewRecasts;