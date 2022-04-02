import React from "react";
import Navbar from "./Components/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import { ListItems } from "./screens/ListItems";
import { Home } from "./screens/Home";
import AddBook from "./screens/AddBook";
import AddMagazine from "./screens/AddMagazine";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/list" element={<ListItems />} />
          <Route path="/addBooks" element={<AddBook />} />
          <Route path="/addMagazines" element={<AddMagazine />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}
