import React from 'react'
import { Link } from "gatsby"
import './About.css'

const About = () => {
  return (
    <div className="about">
      <p>
        Olá. :)
        <br />
        <br />
        My name is <a href="https://satanicandsatanist.tumblr.com/" className="blue my-name">
          <b>Saulo Filho</b></a>.
          I'm a <a href="https://github.com/saulofilho" className="green">
          Full Stack Javascript Developer
        </a>.
        <br />
        <br />
        A long time ago, I used to be (10+ years) a creative marketing professional, writing to advertising, content,
        cinema, music and entertainment scripts.
        <br />
        <br />
        Nowadays I've been working at <a href="https://www.dropsmart.com.br"
          className="green">DropSmart</a> as front end and at <a href="https://www.buenavistalab.com"
            className="green">Buena Vista Lab</a> as full stack.
        <br />
        <br />
        Let’s get in touch for any projects inquiries or even to coding something odd.
        So, don't be shy like me, and feel free to say hello[at]saulofilho.com
      </p>
      <br />
      <ul>
        <li>
          <Link to='/dev'>Dev's work</Link>
        </li>
        <li>
          <Link to='/ad'>Ad's work</Link>
        </li>
      </ul>
    </div>
  );
}

export default About
