import '../../styles/global.scss'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

type RouterProps = {
  Login: React.FC
}

const Router: React.FC<RouterProps> = ({ Login }: RouterProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
