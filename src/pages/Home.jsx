import { Link } from "react-router-dom";
import {useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";


// firebase
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../Config/Firebase";

export default function Home() {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
      } else {
        setUser(null); 
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [auth]);
  
  function handleDashboard() {
    navigate(`/dashboard?${user.uid}&Tab=dashboard`)
  }
  
  
  return (
    <>
      {/* Cards Notification */}
{user ? (

<ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
  <li>
    <a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      Inbox
      <span className="badge badge-sm">99+</span>
    </a>
  </li>
  <li>
    <a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Updates
      <span className="badge badge-sm badge-warning">NEW</span>
    </a>
  </li>
  <li>
    <a onClick={handleDashboard}>
  <MdDashboard />
      Dashboard
      <span className="badge badge-xs badge-info"></span>
    </a>
  </li>
</ul>
)
  : (
        <div className=" card bg-primary text-primary-content w-full">
        <div className="card-body">
          <h2 className="card-title">Join Our Community Now!</h2>
          <p>This Page Help's You To Create Mind Blowing Protfolio's With All free For Now</p>
          <div className="card-actions justify-end">
            <button className="btn"><Link to="/auth">Join Us</Link></button>
          </div>
        </div>
      </div>
  )
}

      {/* Dashboard Link */}
<div className="mt-10 m-2.5 flex align-middle place-content-center text-2xl">
      <h1>
        Dashboard System
      </h1>
    </div>
    
      <div className="_In-home h-auto overflow-y-auto">
  
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Likes</div>
            <div className="stat-value text-primary">25.6K</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Page Views</div>
            <div className="stat-value text-secondary">2.6M</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div className="w-16 rounded-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="avatar"
                  />
                </div>
              </div>
            </div>
            <div className="stat-value">86%</div>
            <div className="stat-title">Tasks done</div>
            <div className="stat-desc text-secondary">31 tasks remaining</div>
          </div>
        </div>
      </div>
      {user ? (
    <Link to={`/new?user=${user.uid}`} className="_In-home-try flex place-content-start ml-2.5">
    <button className="btn btn-outline btn-accent">Create New PortFolio</button>
      </Link>
      ) : (
   <Link to={`/auth`} className="_In-home-try flex place-content-start ml-2.5">
  <button className="btn btn-outline btn-accent">Create account PortFolio</button>
      </Link>
      )}
    </>
  );
}
