import { ImageUpload } from "./pages/Home"
import LandingPage from "./pages/LandingPage"
import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<LandingPage />} />
        <Route path='/app' exact element={<ImageUpload />} />
      </Routes>
    </Router>
  )
}

export default App
