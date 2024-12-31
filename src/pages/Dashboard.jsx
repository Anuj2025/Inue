import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import Loader from "../components/Loader"

// firebase defaultimport app from "./Config/Firebase"
import app from "../Config/Firebase";

import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "firebase/auth";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'; // Import the styles


export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const [projects, setProjects] = useState(null);
  
  // Loadings Mirrage
  useEffect(() => {

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);
  
  return (
    <>
   {isLoading ? (<Loader />) : (
   <div>
     <h1 className="text-3xl">Projects</h1>
    {/* Project Center */}
  
  <div className="card mt-10 w-full h-40 bg-base-200 text-center shadow-md">
    {projects ? (
    <div>projects Found</div>
    ) : (
<div className="w-full h-full flex flex-col justify-center align-middle place-content-center Center">
  <Link to="/new"><button className="btn m-10 btn-outline btn-primary">Create New</button>
  </Link>
</div>
    )}
  </div>
   </div>
   ) }
    </>
    );
}
