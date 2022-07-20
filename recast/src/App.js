import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from './Components/Header';
import Main from './Components/Main';

function App() {
  return (
    <div className='app'>
      <Header/>
      <Routes>
        <Route
          path='*'
          element={<Main/>}
        />
      </Routes>
    </div>
  )
}

export default App;