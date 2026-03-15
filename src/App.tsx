import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/core/CustomCursor';
import LenisProvider from './components/core/LenisProvider';
import NoiseOverlay from './components/ui/NoiseOverlay';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Portofoliu from './pages/Portofoliu';
import Despre from './pages/Despre';
import Contact from './pages/Contact';

function App() {
  const location = useLocation();

  return (
    <LenisProvider>
      <NoiseOverlay />
      <CustomCursor />
      <Navbar />
      
      {/* Container pentru rute cu AnimatePresence */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/portofoliu" element={<Portofoliu />} />
          <Route path="/despre" element={<Despre />} />
          <Route path="/contact" element={<Contact />} />
          {/* Servicii rutează spre Despre pentru exemplificare */}
          <Route path="/servicii" element={<Despre />} /> 
        </Routes>
      </AnimatePresence>

      <Footer />
    </LenisProvider>
  );
}

export default App;
