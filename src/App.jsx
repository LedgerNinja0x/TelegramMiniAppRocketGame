import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import MainPage from "./pages/MainPage"
import Footer from './component1/Footer';
import Earned from './pages/Earned';
import Friends from './pages/Friends';
import Stats from './pages/Stats';
import Wallet from './pages/Wallet';
import { Toaster } from 'react-hot-toast';
import UserInfo from './pages/UserInfo';
import Stars from './component1/Stars';
import Loading from './pages/Loading';
import { Provider as JotaiProvider } from 'jotai';
import Layout from './component/atom/layout.jsx';



function App() {
  const [isLoading, setLoadingState] = useState(true);
  
  const handleLoadingState = (loading) =>{
     setLoadingState(loading); 
  }

  useEffect(() => {
    const adjustHeight = () =>{
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    adjustHeight();
    window.addEventListener('resize', adjustHeight);
    return () =>{
      window.removeEventListener('resize',adjustHeight);
    };
  },[]);

  
  return (
    <JotaiProvider>
    <div className="App h-screen overflow-hidden flex flex-col relative">
      
      {!isLoading?
          ( <>
          <Stars/>
          <BrowserRouter>
            <Toaster />
           
              <Routes>  
                <Route path="/" element={<MainPage />} />
                <Route path='/play' element={<MainPage />} />
                <Route path='/earn' element={<Layout><Earned /></Layout>} />
                <Route path='/friends' element={<Layout><Friends /></Layout>} />
                <Route path='/stats' element={<Layout><Stats /></Layout>} />
                <Route path='/wallet' element={<Layout><Wallet /></Layout>} />
                <Route path='/userInfo' element={<Layout><UserInfo /></Layout>} />
              </Routes>
            
            <Footer />
          </BrowserRouter>
          </>)
      : <Loading setLoading ={handleLoadingState} />
      
      }
    </div>
    </JotaiProvider>
  );
}

export default App;
