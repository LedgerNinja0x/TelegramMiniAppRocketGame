import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import MainPage from "./pages/MainPage"
import Header from "./component1/Header";
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
import Layout from './component/atom/Layout';



function App() {
  const [isLoading, setLoadingState] = useState(false);
  return (
    <JotaiProvider>
    <div className="App h-screen flex flex-col relative">
      
      {isLoading?
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
      : <Loading setLoading ={(e)=>setLoadingState(e)} />
      
      }
    </div>
    </JotaiProvider>
  );
}

export default App;
