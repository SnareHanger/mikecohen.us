type ProjectImages = {
  filename: string;
  imageCount: number;
};

type ProjectVideo = {
  videoUrl: string;
  videoThumb: string;
};

type Project = {
  name: string;
  workType: string;
  body: string;
  dir: string;
  images?: ProjectImages;
  video?: ProjectVideo;
};

type Projects = {
  [projectKey: string]: Project;
};
