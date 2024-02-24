import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import { supabase } from './supabaseClient'
import Confirm from './components/Confirm/Confirm';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Client from './pages/ClientDetails/Client'
import NoPage from './pages/NoPage/NoPage'
import Home from './pages/Home/Home'
import AddClient from './pages/ClientDetails/AddClient'
import Employee from './pages/Employee/Employee';
import AddEmp from './pages/Employee/AddEmp';
import Alert from './components/alert/Alert';

const App = () => {
  const [session, setSession] = useState(null)
  const [msg, setmsg] = useState(null)


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

  const showMsg = (message) => {
    setmsg(message)
    setTimeout(() => {
      setmsg(null)
    }, 3000);
  }

  return (
    <BrowserRouter>
      <Header session={session} />
      <Alert msg={msg} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {!session ? (
            <>
              <Route path='/signup' element={<Signup showMsg={showMsg} />} />
              <Route path='/signin' element={<Signin showMsg={showMsg} />} />
            </>
          ) :
            (
              <>
                <Route path='/client' element={<Client showMsg={showMsg}/>} />
                <Route path='/confirm' element={<Confirm />} />
                <Route path='/add' element={<AddClient showMsg={showMsg} />} />
                <Route path='/employee/:id' element={<Employee  showMsg={showMsg}/>} />
                <Route path='/addemp/:id' element={<AddEmp showMsg={showMsg} />} />
              </>
            )
          }
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
