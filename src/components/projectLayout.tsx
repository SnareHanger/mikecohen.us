import * as React from "react";
import Layout from "./layout";
import "./projectLayout.css";
import { navigate } from "gatsby";
import ProjectImages from "./projectImage";

const projects: Projects = require('../projects.json');

type ProjectLayoutProps = {
  projectKey: string,
}

export default function ProjectLayout({projectKey}: ProjectLayoutProps) {
  const project = projects[projectKey];
  if(!project) {
    navigate('/');
    return null;
  }
  const projectBody = { __html: project.body };
  return (
    <Layout>
      <div className='projectBody'>
        <div className='projectImages'>
          {project.video && <>
                <a title={project.video.videoUrl} href={project.video.videoUrl}>
                  <img src={`/images/${project.dir}/thumbs/${project.video.videoThumb}`} title={project.video.videoThumb} />
                </a>
              </>}
          {project.images && <ProjectImages dir={project.dir} images={project.images} />}
        </div>
        <div className='projectContent'>
          <div className='upperSection'>
            <span className='projectTitle'>{project.name}</span>
            <br />
            <span className='myTitle'>{project.workType}</span>
          </div>
          <div
            className='projectText'
            dangerouslySetInnerHTML={projectBody}
          ></div>
        </div>
      </div>
    </Layout>
  );
}
