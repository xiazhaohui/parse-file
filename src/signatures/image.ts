const IMAGE_PNG_FILE_SIGNATURES = ["89 50 4E 47 0D 0A 1A 0A"];
const IMAGE_JPEG_FILE_SIGNATURES = ["FF D8 FF"];
const IMAGE_GIF_FILE_SIGNATURES = ["47 49 46"];

const IMAGE_FILE_SIGNATURES = [
  ...IMAGE_PNG_FILE_SIGNATURES,
  ...IMAGE_JPEG_FILE_SIGNATURES,
  ...IMAGE_GIF_FILE_SIGNATURES,
];

export default IMAGE_FILE_SIGNATURES;
