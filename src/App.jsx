import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import DettaglioPage from './pages/DettaglioPage.jsx'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/dettaglio" element={<DettaglioPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
