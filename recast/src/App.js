import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Main from './Components/Main';

function App() {
  return (
    <div className='app'>
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