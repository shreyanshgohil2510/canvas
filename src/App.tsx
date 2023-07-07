import Home from './pages/Home';
import Practice from './pages/Practice';
import { Routes, Route } from 'react-router-dom';
import Zoom from './pages/Zoom';
export default function App() {
  // Inits
  return (
    <Routes>
      <Route path="/" element={<Zoom />} />
      <Route path="/zoom" element={<Zoom />} />
      <Route path="/practice" element={<Practice />} />
    </Routes>
  );
}
