import * as React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import projects from "../projects.json";

import "../styles/style.css";

export default function Home() {
  return (
    <Layout>
      <div id='projects'>
        {Object.keys(projects).map((projectKey) => {
          const projectData = projects[
            projectKey as keyof typeof projects
          ] as Project;
          return (
            <Link key={projectKey}
              className='nohover'
              to={`projects/${projectKey}`}
            >
              <div id={projectKey}>
                <span>{projectData.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
}

export const Head = () => (
  <>
    <title>Mike Cohen</title>
    <link
      rel='apple-touch-icon'
      sizes='180x180'
      href='/images/apple-touch-icon.png'
    />
    <link
      rel='icon'
      type='image/png'
      sizes='32x32'
      href='/images/favicon-32x32.png'
    />
    <link
      rel='icon'
      type='image/png'
      sizes='16x16'
      href='/images/favicon-16x16.png'
    />
    <link
      rel='manifest'
      href='/site.webmanifest'
    />
  </>
);
