import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext';
import {  Link, Navigate,  useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';


export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null)
 const {ready,user,setUser} = useContext(UserContext);



let {subpage} = useParams();

 async function logout(){
  await axios.post('/logout')
  setUser(null)
  setRedirect('/')
 }

 if(ready) {
  return 'Loading...'
 }
 
 if(!user && !ready && !redirect) {
   return <Navigate to={'/'} />
  }




    if(redirect) {
      return <Navigate to={redirect} />
    }

  return (
    <div>
      <AccountNav />
      {subpage === undefined && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          {user.role === 1 && (
            <div>

            <Link to="/admin" className="btn primary max-w-sm mt-2 ml-2">
              <div className='flex'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 ml-14"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 7.5l3 4.5m0 0l3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              </div>
              <div>
              Go to Admin Page
              </div>
            </Link>
            </div>
          )}
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
