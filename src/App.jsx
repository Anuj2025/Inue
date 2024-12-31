import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import Auth from "./.Auth/Auth";
import Dashboard from "./pages/Dashboard"
import New from "./pages/New"

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


import app from "./Config/Firebase";

import "./App.css";

import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "firebase/auth";



import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'; // Import the styles


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  const auth = getAuth(app);
  
  

  // Loading function
  useEffect(() => {

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);
  
  


  return (
    <>
      <ToastContainer />
      <Navbar />
      {isLoading ? (
        <main className="h-screen">
          <Loader />
        </main>
      ) : (
        <main className="h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/*"
              element={
                <div className="grid place-items-center h-1/2">
                  <h3 className="flex flex-col justify-center align-middle">
                    <span className="text-green-500 text-6xl">:(</span>
                    <h1 className="m-1 text-2xl">
                      Unable To Find Your File. Try Returning Home.
                    </h1>
                  </h3>
                </div>
              }
            />
           
           {/* private Routes */}
           
         <Route path="/auth" element={<Auth />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/new" element={<New />} />
          </Routes>
        </main>
      )}
      <Footer />
    </>
  );
}
