var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export var readFileChunk = function (file, start, end) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        var blob = file.slice(start, end);
        reader.addEventListener("load", function () {
            resolve(reader.result);
        });
        reader.addEventListener("error", function () {
            reject(reader.error);
        });
        reader.readAsArrayBuffer(blob);
    });
};
export var fileToArrayBuffer = function (file_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([file_1], args_1, true), void 0, function (file, chunkSize) {
        var arrayBuffers, offset, chunk, sliceFileBuffer, totalLength, result, position, _a, sliceFileBuffer_1, buffer;
        if (chunkSize === void 0) { chunkSize = 1024 * 1024; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    arrayBuffers = [];
                    offset = 0;
                    _b.label = 1;
                case 1:
                    if (!(offset < file.size)) return [3 /*break*/, 3];
                    return [4 /*yield*/, readFileChunk(file, offset, offset + chunkSize)];
                case 2:
                    chunk = _b.sent();
                    arrayBuffers.push(chunk);
                    offset += chunkSize;
                    return [3 /*break*/, 1];
                case 3:
                    sliceFileBuffer = arrayBuffers === null || arrayBuffers === void 0 ? void 0 : arrayBuffers.slice(0, 1000);
                    totalLength = sliceFileBuffer.reduce(function (acc, buffer) { return acc + buffer.byteLength; }, 0);
                    result = new Uint8Array(totalLength);
                    position = 0;
                    for (_a = 0, sliceFileBuffer_1 = sliceFileBuffer; _a < sliceFileBuffer_1.length; _a++) {
                        buffer = sliceFileBuffer_1[_a];
                        result.set(new Uint8Array(buffer), position);
                        position += buffer.byteLength;
                    }
                    return [2 /*return*/, result.buffer];
            }
        });
    });
};
/**
 * @description: 格式化文件大小
 * @param {number} size 文件大小
 * @param {*} fromUnit 传入文件的单位，默认为B，可选项：B、KB
 * @param {*} toUnit 格式化后的文件单位，默认为MB，可选项：KB、MB
 */
export function getFileSize(size, fromUnit, toUnit) {
    if (fromUnit === void 0) { fromUnit = "B"; }
    if (toUnit === void 0) { toUnit = "MB"; }
    var res = 0;
    if (fromUnit === "KB") {
        res = Number((size / 1024).toFixed(2));
        if (toUnit === "KB") {
            res = Number(size.toFixed(2));
        }
    }
    else {
        res = Number((size / 1024 / 1024).toFixed(2));
        if (toUnit === "KB") {
            res = Number((size / 1024).toFixed(2));
        }
    }
    return res;
}
/**
 * @description: 获取文件名的后缀名
 * @param {string} fileName 完整的文件名
 * @return {*} 文件名后缀
 */
export function getFileSuffixName(fileName) {
    var _a;
    var fileNameArr = (_a = fileName === null || fileName === void 0 ? void 0 : fileName.trim()) === null || _a === void 0 ? void 0 : _a.split(".");
    var fileNameType = (fileNameArr === null || fileNameArr === void 0 ? void 0 : fileNameArr.length) > 1 ? fileNameArr === null || fileNameArr === void 0 ? void 0 : fileNameArr.reverse()[0] : "";
    var fileSuffix = fileNameType ? ".".concat(fileNameType) : "";
    return fileSuffix;
}
