

import { shape, string, object, func } from "prop-types";

const imageType = shape({
  file: object, // object type for the image file (e.g., File object from file input)
  previewUrl: string, // string type for the URL of the image preview (e.g., object URL)
  url: string.isRequired,
  alt: string.isRequired,
});

export default imageType;
