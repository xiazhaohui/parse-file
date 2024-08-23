var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var IMAGE_PNG_FILE_SIGNATURES = ["89 50 4E 47 0D 0A 1A 0A"];
var IMAGE_JPEG_FILE_SIGNATURES = ["FF D8 FF"];
var IMAGE_GIF_FILE_SIGNATURES = ["47 49 46"];
var IMAGE_FILE_SIGNATURES = __spreadArray(__spreadArray(__spreadArray([], IMAGE_PNG_FILE_SIGNATURES, true), IMAGE_JPEG_FILE_SIGNATURES, true), IMAGE_GIF_FILE_SIGNATURES, true);
export default IMAGE_FILE_SIGNATURES;
