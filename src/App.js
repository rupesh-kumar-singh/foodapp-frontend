import "./App.css";
import Home from "./screems/Home";

import { Route, Routes } from "react-router-dom";
import Login from "./screems/Login";

import Singup from "./screems/Singup";
import { Cartprovider } from "./components/Contextreducer";
import MyOrder from "./screems/Myorder";

function App() {
  return (
    <>
      <Cartprovider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/createuser" element={<Singup />} />
          <Route path="/myorder" element={<MyOrder />} />
        </Routes>
      </Cartprovider>
    </>
  );
}

export default App;
