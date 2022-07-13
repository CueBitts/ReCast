import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Recasts from '../Routes/Recasts';

function Main() {
    const API = 'http://localhost:8000'
    const [recasts, setRecasts] = useState(null)

    const getRecasts = () => {
        fetch(`${API}/recasts/`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
            // body: JSON.stringify()
        })
        .then(response => response.json())
        .then(data => setRecasts(data))
        .catch(error => console.log(error))
    }

    useEffect(() => getRecasts(), [])

    return(
        <div className='Main'>
            <Routes>
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