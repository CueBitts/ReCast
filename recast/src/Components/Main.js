import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Recasts from '../Routes/Recasts';
import Recast from '../Routes/Recast';
import NewRecast from '../Routes/NewRecast';

function Main() {
    const recastAPI = 'http://localhost:8000'
    const [recasts, setRecasts] = useState(null)

    const getRecasts = () => {
        fetch(`${recastAPI}/recasts/`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setRecasts(data))
    }

    useEffect(() => getRecasts(), [])

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
                    path='/new-recast'
                    element={<NewRecast
                        recasts={recasts}
                    />}
                />
                <Route
                    path='*'
                    element={<Recasts
                        recasts={recasts}
                    />}
                />
            </Routes>
        </div>
    )
}

export default Main;