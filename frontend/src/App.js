import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

const Authorize = () => {
  const history = useNavigate();
  history.push("/login");
};

function App() {
  return (
    <ChakraProvider>
      <div className="App flex h-[100vh]">
        <Router>
          <Navbar />
          <div className="w-full h-full sm:p-12">
            <Routes>
              <Route path="/" />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </Router>

        <footer className="bg-black absolute text-white p-4 bottom-0 w-full text-center">
          Copyright MyStoicCircle
        </footer>
      </div>
    </ChakraProvider>
  );
}

export default App;
