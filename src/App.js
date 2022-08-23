import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accounts from "./Components/Accounts";
import Todo from "./Components/Todo";
import "./App.css"

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Accounts />} />
          <Route exact path="/todo" element={<Todo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;