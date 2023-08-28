import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import DogDetails from './Components/Dog/DogDetails';
import DogForm from './Components/Dog/DogForm';
import WalkerList from './Components/Walker/WalkerList';
import WalkerAssignDog from './Components/Walker/WalkerAssignDog';
import CityList from './Components/City/CityList';
import WalkerForm from './Components/Walker/WalkerForm';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/dogs/:id" element={<DogDetails />} />
        <Route path='/dogs/new' element={<DogForm />} />
        <Route path='/walkers' element={<WalkerList />} />
        <Route path='/walkers/assigndog/:walkerId' element={<WalkerAssignDog />} />
        <Route path='/walkers/:walkerId' element={<WalkerForm />} />
        <Route path="/cities" element={<CityList />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);

