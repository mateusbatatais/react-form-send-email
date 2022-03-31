import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.scss";

import PersonaData from "./pages/PersonalData";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PersonaData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
