import React from 'react';

type UseImageFilenameProps = {
    filename: string,
    imageNum: number,
}

export default function useImageFilename(props: UseImageFilenameProps) {
    return props.filename.replace('{0}', props.imageNum.toString());
}