import * as React from 'react';
import ProjectLayout from '../../components/projectLayout';

type ProjectProps = {
    projectKey: string
}

export default function Project({projectKey}: ProjectProps) {
    return <ProjectLayout projectKey={projectKey} />;
}