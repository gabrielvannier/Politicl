import React from "react";
import "./App.css";
import Header from "./components/Header";
import Game from "./components/Game/Game";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <div className="App">
      <Analytics />
      <SpeedInsights />
      <Header />
      <Game />
      <Footer />
    </div>
  );
}

export default App;
