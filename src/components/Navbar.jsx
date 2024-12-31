import {useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from "firebase/auth";

import app from "../Config/Firebase";



export default function Navbar() {
  
  const [user, setUser] = useState(false);
  const auth = getAuth(app);
  const Navigate = useNavigate();
  const [userProfileLetter, setLetter] = useState(false);
  
  useEffect(() =>{
    const subscriber = () => onAuthStateChanged(auth, (Creduser) => {
      if (Creduser) {
        setUser(true);
      } else {
        setUser(false);
      }
      
      console.log(user)
    });
    
    return subscriber();
  }, [auth]);
  
  function HandleSettings() {
    Navigate("/settings");
  }
  
  function SignInHandle() {
    Navigate("/auth");
  }
  
  function ProfileHandle() {
    Navigate("/profile");
  }
  // signOut function
 async function SignOutHandle() {
 try {

  await signOut(auth);
   toast.success("SignOut Completed")
 } catch (err){
   toast.error(err.meassage)
 }
}



  return (
<>
  <div className="navbar bg-base-100/70 backdrop-blur-md sticky top-0 z-50">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">
      Inue
    </a>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
     <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
  {user ? (<li>
    <a className="justify-between" onClick={ProfileHandle}>
     Profile
    <span className="badge">New</span>
    </a>
    </li>
    ) : (
<></>
    )}
   <li onClick={HandleSettings} ><a>Settings</a></li>
      {user ? (<li onClick={SignOutHandle}><a>Logout</a></li>) : (<li onClick={SignInHandle}><a>SignIn</a></li>)}
      </ul>
    </div>
  </div>
</div>
</>
    )
}