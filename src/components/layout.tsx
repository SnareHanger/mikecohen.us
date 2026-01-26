import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import "../styles/style.css";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div
      id='container'
      data-testid='layout-container'
    >
      <header>
        <h1>
          <Link
            to='/'
            className='noHover'
            data-testid='header-title-link'
          >
            {site.siteMetadata.title}
          </Link>
        </h1>
        <div id='about'>
          Mike Cohen is mainly a software engineer, with a love for creative
          coding, art, music, gaming and design. Having a long history of using
          computers back to the days of the Commodore 64, he has always been
          fascinated with technology.
        </div>
        <div id='contactInfo'>
          <li>
            l:{" "}
            <a href='https://www.linkedin.com/in/mikeco/'>
              connect on linkedin
            </a>
          </li>
          <li>
            r:{" "}
            <a
              href='mike_cohen_resume.pdf'
              target='_blank'
            >
              resume
            </a>
          </li>
        </div>
      </header>
      <main data-testid='layout-main'>{children}</main>
      <footer>
        <span>&copy; Michael Cohen {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
