import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage"
import Header from "./component1/Header";
import Footer from './component1/Footer';
import Earned from './pages/Earned';

function App() {
  return (
    <div className="App bg-gradient-to-b p-4 from-bgGradientColor1 to-bgGradientColor2 flex flex-col h-screen gap-4 justify-between">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/play' element={<MainPage />} />
          <Route path='/earn' element={<Earned />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
