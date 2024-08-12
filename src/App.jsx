import React from 'react';
import MainPage from "./pages/MainPage"
import Header from "./component1/Header";
import Footer from './component1/Footer';

function App() {
  return (
  <>
 
    <div className="App bg-gradient-to-b from-bgGradientColor1 to-bgGradientColor2">
      <Header/>
      <div className='p-4'>
        <MainPage/>
      </div>
      <Footer/>
    </div>
  </>
    
  );
}

export default App;
