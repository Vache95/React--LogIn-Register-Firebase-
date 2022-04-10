import {React,useState} from 'react'
import {FormLogin,FormRegister,Error} from './components'
import { Route, Routes } from 'react-router-dom'
import './App.scss'

export default function App() {

 return (
   <div className="wrapper">
     <Routes>
       <Route path='/' element={<FormLogin/>}/>
       <Route path='/formregister' element={<FormRegister/>}/>
       <Route path="*" element={<Error/>}/>
     </Routes>
   </div>
  )
}

