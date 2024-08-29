import React from 'react';
import './App.css';
import Header from './components/Header';
import Game from './components/Game/Game';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { useIsMobile } from './utils/utils';


function SizeUnavailable() {
  return (
    <div style={{marginTop:"200px",fontSize:20}}> 
      Désolé, 
      <div>
        Politcl est pour le moment <span style={{fontWeight:'bold'}}>indisponible sur les petits écrans</span> 
      </div>
      <span style={{fontSize:60}}>😢</span>
    </div>
  )
}
function App() {
  //const isLargeEnough = useMediaQuery('(min-width:1175px)');
  const isMobile = useIsMobile();
  return (
    <div className="App">
      <Analytics />
      <SpeedInsights />
      {!isMobile && <Header />}
      {!isMobile ? <Game /> : <SizeUnavailable />}
    </div>
  );
}

export default App;
