import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import { supabase } from './supabaseClient'
import Confirm from './components/Confirm/Confirm';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Employee from './pages/Employee/Employee';
import NoPage from './pages/NoPage/NoPage'
import Home from './pages/Home/Home'
import AddEmp from './pages/Employee/AddEmp';

const App = () => {
  const [session, setSession] = useState(null)
 
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()

  }, [])
  return (
    <BrowserRouter>
      <Header session={session} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {!session ? (
            <>
              <Route path='/signup' element={<Signup />} />
              <Route path='/signin' element={<Signin />} />
            </>
          ) : 
          (
            <>
          <Route path='/emp' element={<Employee />} />
          <Route path='/add' element={<AddEmp />} />
            </>
          )
          }
          <Route path='/confirm' element={<Confirm />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
