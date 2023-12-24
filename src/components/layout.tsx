import * as React from "react";
import { Link } from "gatsby";

import "../styles/style.css";

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({children}: LayoutProps) {
  return (
    <>
      <header>
        <h1>
          <Link to='/' className="noHover">Mike Cohen</Link>
        </h1>
          <div id="about">Mike Cohen is an artist and designer interested in creating works that play with people's perception of things.  He uses light, sound, sculpture and the screen to construct environments and ideas that gives a viewer the sense that something is different than what should be.  Having a long history of using computers back to the days of the Commodore 64, he has always been fascinated with technology. His current focus is in audio and visual performance and installation, ranging from creating new instruments to music visualization.</div>
          <div id="contactInfo">
            <li>l: <a href="https://www.linkedin.com/in/mikeco/">connect on linkedin</a></li>
            <li>r: <a href="mike_cohen_resume.pdf" target="_blank">resume</a></li>
          </div>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <span>&copy; Michael Cohen {(new Date()).getFullYear()}</span>
      </footer>

    </>
  );
}