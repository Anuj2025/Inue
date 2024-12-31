import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

// Firebase
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
signInWithEmailAndPassword} from "firebase/auth";
import app from "../Config/Firebase";

// React Router
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isClicked, setClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState(false);
  
  /*if false means signin else true means login*/
  
  const auth = getAuth(app);
  const navigate = useNavigate(); // Initialize useNavigate hook
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
        navigate(`/dashboard?id=${currentUser.uid}&Tab=Dashboard`)
      } else {
        setUser(null); // Clear user when not authenticated
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [auth]);

  const handleClick = () => {
    if (!isClicked) {
      setClicked(true); 
      HandleCreateUserFunc();
    }
  };
  
  // Account creation function
  async function HandleCreateUserFunc() {
    try {
      // Create user asynchronously
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      setUser(userCredential.user);
      
      // Show success toast with user email
      toast.success(`Account Created: ${userCredential.user.email}`);
      
      // Navigate to the dashboard after successful account creation
      navigate("/dashboard"); // Assuming '/dashboard' is the route to the dashboard
    } catch (err) {
      // Show error toast with the error message
      toast.error(err.message);
    }
    
    setClicked(false);
  }
  
  async function handleClick2() {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/dashboard");
  }
  
  function handleAuthMode() {
    setAuthMode(!authMode);
  }

  return (
    <>
      {authMode? (
       <>
     <div className="h-1/2 flex flex-col justify-center place-content-center">
        <div className="_Inue-SignCom">
          <h1 className="text-8xl">LogIn</h1>
          <input 
            type="email" 
            placeholder="Type here" 
            className="input input-bordered w-full max-w-xs" 
            required 
            onChange={(e) => setEmail(e.target.value)} 
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            className="input input-bordered w-full max-w-xs" 
            required 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <button className="btn btn-accent w-full" onClick={handleClick2}>
            {isClicked ? (
              <span className="loading loading-spinner">LogIn...</span> // Correctly use spinner class
            ) : (
              <h2>LogIn</h2> // Button text when not clicked
            )}
          </button>
        </div>
      </div>
       
      
  <div className="">
  <button className="btn btn-accent w-full" onClick={handleAuthMode}>Create Acccunt</button>
  </div>
  </>
      ) : (
<>
        <div className="h-1/2 flex flex-col justify-center place-content-center">
        <div className="_Inue-SignCom">
          <h1 className="text-8xl">Create Account</h1>
          <input 
            type="text" 
            placeholder="UserName" 
            className="input input-bordered w-full max-w-xs" 
          />
          
          <input 
            type="email" 
            placeholder="Email" 
            className="input input-bordered w-full max-w-xs" 
            required 
            onChange={(e) => setEmail(e.target.value)} 
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            className="input input-bordered w-full max-w-xs" 
            required 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <button className="btn btn-accent w-full" onClick={handleClick}>
            {isClicked ? (
              <span className="loading loading-spinner">Creating</span> // Correctly use spinner class
            ) : (
              <h2>Create</h2> // Button text when not clicked
            )}
          </button>
        </div>
      </div>
<div>
  <button className="btn btn-accent w-full" onClick={handleAuthMode}>LogIn</button>
</div>   
</>
      )}
      <ToastContainer />
    </>
  );
}
