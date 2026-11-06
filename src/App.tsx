import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import DarkModeToggle from './components/DarkModeToggle'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Detail from './pages/Detail'
import Favorites from './pages/Favorites'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorar" element={<Explore />} />
          <Route path="/explorar/:id" element={<Detail />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/contacto" element={<Contact />} />
          {/* Ruta comodín: cualquier URL no reconocida cae en 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <DarkModeToggle />
    </div>
  )
}
