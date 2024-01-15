import * as React from "react";
import Layout from "./layout";
import {
  projectBody,
  projectImages,
  videoLink,
} from "./projectLayout.module.css";
import { navigate } from "gatsby";
import ProjectImages from "./projectImages";
const projects: Projects = require("../projects.json");

type ProjectLayoutProps = {
  projectKey: string;
};

export default function ProjectLayout({ projectKey }: ProjectLayoutProps) {
  const project = projects[projectKey];
  if (!project) {
    if (typeof window !== undefined) {
      //navigate('/');
    }
    return null;
  }
  const projectBodyHtml = { __html: project.body };
  return (
    <Layout>
      <div className={projectBody}>
        <div className={projectImages}>
          {project.video && (
            <>
              <a
                className={videoLink}
                title={project.video.videoUrl}
                href={project.video.videoUrl}
              >
                <img
                  src={`/images/${project.dir}/thumbs/${project.video.videoThumb}`}
                  title={project.video.videoThumb}
                />
              </a>
            </>
          )}
          {project.images && (
            <ProjectImages
              dir={project.dir}
              images={project.images}
            />
          )}
        </div>
        <div className='projectContent'>
          <div className='upperSection'>
            <span
              className='projectTitle'
              data-testid='project-title'
            >
              {project.name}
            </span>
            <br />
            <span
              className='myTitle'
              data-testid='project-work-type'
            >
              {project.workType}
            </span>
          </div>
          <div
            className='projectText'
            data-testid='project-text'
            dangerouslySetInnerHTML={projectBodyHtml}
          ></div>
        </div>
      </div>
    </Layout>
  );
}
