import * as React from 'react';
import ProjectLayout from '../../components/projectLayout';

type ProjectProps = {
    projectKey: string
}

export default function Project({projectKey}: ProjectProps) {
    return <ProjectLayout projectKey={projectKey} />;
}

export const Head = () => (
    <>
        <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
        />
    </>
);