import React from "react"
import FooterWrapper from './footer'
import 'prismjs/themes/prism-okaidia.css'

export default ({ children }) => {
  return (
    <div>
      {children}
      <FooterWrapper />
    </div>
  )
}
