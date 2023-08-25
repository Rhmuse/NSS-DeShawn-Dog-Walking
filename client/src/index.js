import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import DogDetails from './Components/DogDetails';
import DogForm from './Components/DogForm';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/dogs/:id" element={<DogDetails />} />
        <Route path='dogs/new' element={<DogForm />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);

