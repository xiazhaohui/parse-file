var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var VIDEO_MP4_FILE_SIGNATURES = [
    "00 00 00 18 66 74 79 70",
    "00 00 00 20 66 74 79 70",
    "00 00 00 24 66 74 79 70",
];
var VIDEO_MOV_FILE_SIGNATURES = [
    "00 00 00 14 66 74 79 70",
    "00 00 00 1C 66 74 79 70",
];
var VIDEO_FILE_SIGNATURES = __spreadArray(__spreadArray([], VIDEO_MP4_FILE_SIGNATURES, true), VIDEO_MOV_FILE_SIGNATURES, true);
export default VIDEO_FILE_SIGNATURES;
