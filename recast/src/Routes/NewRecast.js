import {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';


function NewRecast(props) {
    const recastAPI = 'http://localhost:8000'
    const TMDBAPIKey = 'ab5b083db2d7cac5a40a452fba117560'
    
    const search = useRef(null)

    const [movies, setMovies] = useState(null)

    const getMovie = (query) => {
        
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDBAPIKey}&language=en-US&query=${query.replace(/ /g, '%20')}&include_adult=false`, {
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
        getMovie(newSearch.query)

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
                    name='submit'
                >Search</button>
            </form>
            {movies?.results.map(result => {
                return (
                    <div key={result.id} className='result'>
                        <Link to='/new-recast/:id'>{result.title}</Link>
                    </div>
                )
            })}
        </div>
    )
}

export default NewRecast;