import React from "react"
import Sketch from '../components/Sketch'
import './404.css'

const page404 = () => {
  return (
    <>
      <div className="page-404">
        <h1>Page not found.</h1>
        <h3>Ops! The page you are looking for has been removed or relocated.</h3>
      </div>
      <Sketch />
    </>
  )
}

export default page404;
