import React from "react"
import FooterWrapper from './Footer'
import 'prismjs/themes/prism-okaidia.css'

export default ({ children }) => {
  return (
    <div>
      {children}
      <FooterWrapper />
    </div>
  )
}
