import IMAGE_FILE_EXTENSION_LIST from "./src/extensions/image";
import VIDEO_FILE_EXTENSION_LIST from "./src/extensions/video";
import AUDIO_FILE_ENTENSION_LIST from "./src/extensions/audio";
import { TParseFileInfo } from "./src/types/index";
import {
  getFileSize,
  getFileSuffixName,
  getSignatureType,
} from "./src/utils/file";

/**
 * @description: 解析文件
 * @param {File} file 文件
 */
export const parseFile = async (file: File): Promise<TParseFileInfo> => {
  const sliceFileBuffer = await file.slice(0, 1000).arrayBuffer();
  const dataView = new DataView(sliceFileBuffer);
  // 数据流十六进制分析表
  const dataViewHexArray = Array.from({ length: dataView.byteLength }).map(
    (_item, itemIndex) => {
      const byte = dataView.getUint8(itemIndex);
      const data = byte.toString(16).padStart(2, "0").toLocaleUpperCase();
      return data;
    }
  );
  const hexString = dataViewHexArray.join(" ");
  // ASCII 字符串
  const asciiData = Array.from({ length: dataView.byteLength }).map(
    (_item, itemIndex) => {
      const byte = dataView.getUint8(itemIndex);
      const data = String.fromCharCode(byte);
      return data;
    }
  );

  const fileName = file.name;
  const fileSize = getFileSize(file.size);
  const fileExtension = getFileSuffixName(fileName);
  const fileType = file.type;
  const fileTypeHeader = fileType.split("/")[0];
  const fileSuffixUpperCase = fileName
    .slice(fileName.lastIndexOf(".") + 1)
    ?.toUpperCase();

  const signatureType = getSignatureType(hexString, fileType) as string;

  // 文件扩展名 + 文件类型头 + 文件流十六进制分析表
  const isImage =
    IMAGE_FILE_EXTENSION_LIST.includes(fileExtension) &&
    fileTypeHeader === "image" &&
    getSignatureType(hexString, fileType) === "image";
  const isVideo =
    VIDEO_FILE_EXTENSION_LIST.includes(fileExtension) &&
    fileTypeHeader === "video" &&
    getSignatureType(hexString, fileType) === "video";
  const isAudio =
    AUDIO_FILE_ENTENSION_LIST.has(fileExtension) &&
    fileTypeHeader === "audio" &&
    getSignatureType(hexString, fileType) === "audio";
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
    hexString,
    hexadecimalData: dataViewHexArray,
    asciiData,
    signatureType,
    isImage,
    isVideo,
    isAudio,
    isText,
    isExcel,
  };
  console.log("解析文件", file, dataView, returnValue);

  return returnValue;
};
