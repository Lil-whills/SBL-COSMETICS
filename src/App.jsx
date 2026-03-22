import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/navbar";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="min-h-screen bg-[#050b16] text-white">
      <Header />
      <Navbar />
      <Homepage />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;