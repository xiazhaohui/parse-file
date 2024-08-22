import IMAGE_FILE_EXTENSION_LIST from "./src/extensions/image";
import VIDEO_FILE_EXTENSION_LIST from "./src/extensions/video";
import IMAGE_FILE_SIGNATURES from "./src/signatures/image";
import VIDEO_FILE_SIGNATURES from "./src/signatures/video";
import { TParseFileInfo } from "./src/types";
import {
  fileToArrayBuffer,
  getFileSize,
  getFileSuffixName,
} from "./src/utils/file";

/**
 * @description: 解析文件
 * @param {File} file 文件
 */
export const parseFile = async (file: File): Promise<TParseFileInfo> => {
  const fileBuffer = await fileToArrayBuffer(file);
  const sliceFileBuffer = fileBuffer?.slice(0, 1000);
  const dataView = new DataView(sliceFileBuffer as ArrayBuffer);
  // 数据流十六进制分析表
  const dataViewHexArray = Array.from({ length: dataView.byteLength }).map(
    (_item, itemIndex) => {
      const byte = dataView.getUint8(itemIndex);
      const data = byte.toString(16).padStart(2, "0").toLocaleUpperCase();
      return data;
    }
  );
  const hexString = dataViewHexArray.join(" ");

  const fileName = file.name;
  const fileSize = getFileSize(file.size);
  const fileExtension = getFileSuffixName(fileName);
  const fileType = file.type;
  const fileTypeHeader = fileType.split("/")[0];
  const fileSuffixUpperCase = fileName
    .slice(fileName.lastIndexOf(".") + 1)
    ?.toUpperCase();

  const isImage =
    IMAGE_FILE_EXTENSION_LIST.has(fileExtension) &&
    fileTypeHeader === "image" &&
    IMAGE_FILE_SIGNATURES.some((item) => hexString.startsWith(item));
  const isVideo =
    VIDEO_FILE_EXTENSION_LIST.has(fileExtension) &&
    fileTypeHeader === "video" &&
    VIDEO_FILE_SIGNATURES.some((item) => hexString.startsWith(item));
  const isAudio = fileTypeHeader === "audio";
  const isText = ["text", "application"].includes(fileTypeHeader);
  const isExcel =
    fileTypeHeader === "application" &&
    ["XLS", "XLSX"].includes(fileSuffixUpperCase);

  const returnValue = {
    fileName,
    fileSize,
    fileExtension,
    fileType,
    fileTypeHeader,
    hexadecimalData: dataViewHexArray,
    hexString,
    isImage,
    isVideo,
    isAudio,
    isText,
    isExcel,
  };
  console.log("解析文件", file, dataView, returnValue);

  return returnValue;
};
