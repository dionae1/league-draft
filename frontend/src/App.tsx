import { BrowserRouter, Routes, Route } from 'react-router'

import ClassicDraft from './pages/ClassicDraft';
import FearlessDraft from './pages/FearlessDraft';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="classic" element={<ClassicDraft />} />
          <Route path="fearless" element={<FearlessDraft />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;