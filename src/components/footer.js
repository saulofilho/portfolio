import React from "react"

const FooterWrapper = () => {
  return (
    <footer className="site-footer">
      <p className="warn">
        This World Wide Web generates random backgroundColor & color.
        In case of indistinguishable layout: F5.
    </p>
    <div className="var-color-container">
      <div id="bgColor"></div>
      <div id="clColor"></div>
    </div>
    <p>
        &copy; 2020 S&S &bull; From Pantanal
    <span role="img" aria-label="alligator"> 🐊 </span>
    to the world
    </p>
    <br />
    <p className="no">NO PLACE FOR RACISM, HOMOPHOBIA, FASCISM, SEXISM, HATE.</p>
    </footer>
  )
}

export default FooterWrapper
