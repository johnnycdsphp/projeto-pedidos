import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import './App.css'
import Login from "./Views/Login";
import Pedidos from "./Views/Pedidos";
import Page404 from "./Views/Page404";

const App = () =>  {
  return (
    <main className="App">
      <Router>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/pedidos" exact element={<Pedidos />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
      </Router>
    </main>
  );
}

export default App