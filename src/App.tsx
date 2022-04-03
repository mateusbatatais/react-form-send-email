import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

import TopMenu from "./components/molecules/TopMenu";

import PersonaData from "./pages/PersonalData";
import ListItens from "./pages/ListItens";

function App() {
  return (
    <Router>
      <TopMenu />
      <div className="App">
        <Routes>
          <Route path="/" element={<PersonaData />} />
          <Route path="/listagem" element={<ListItens />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
