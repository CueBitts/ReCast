import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Recasts from '../Routes/Recasts';
import Recast from '../Routes/Recast';
import SignIn  from '../Routes/SignIn';
import SignUp from '../Routes/SignUp';
import NewRecasts from '../Routes/NewRecasts';
import NewRecast from '../Routes/NewRecast';


function Main() {
    const recastAPI = 'http://localhost:8000'
    const APIKey = 'ab5b083db2d7cac5a40a452fba117560'
    
    const [recasts, setRecasts] = useState()
    const [movies, setMovies] = useState([])
    const [actors, setActors] = useState([])

    useEffect(() => {
        async function getData() {
            const response = await fetch(`${recastAPI}/recasts/`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })
            let data = await response.json()
            setRecasts(data)
            // console.log(data)
            data.map(async recast => {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${recast.movie}?api_key=${APIKey}&language=en-US`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                let data = await response.json()
                setMovies(movies => [...movies, data])
                // console.log(data)
                recast.recastInsts.map(async recastInst => {
                    const response = await fetch(`https://api.themoviedb.org/3/person/${recastInst.actor}?api_key=${APIKey}&language=en-US&append_to_response=images`, {
                        method: 'GET',
                        headers: {
                            'content-type': 'application/json'
                        }
                    })
                    let data = await response.json()
                    setActors(actors => [...actors, data])
                    // console.log(data)
                })
            })
        }
        getData()
    }, [])

    return(
        <div className='Main'>
            <Routes>
                <Route
                    path='/recasts/:id'
                    element={<Recast
                        recasts={recasts}
                    />}
                />
                <Route
                    path='/sign-in'
                    element={<SignIn/>}
                />
                <Route
                    path='/sign-up'
                    element={<SignUp/>}
                />
                <Route
                    path='/new-recast'
                    element={<NewRecasts/>}
                />
                <Route
                    path='/new-recast/:id'
                    element={<NewRecast/>}
                />
                <Route
                    path='*'
                    element={<Recasts
                        recasts={recasts}
                        movies={movies}
                        actors={actors}
                    />}
                />
            </Routes>
        </div>
    )
}

export default Main;