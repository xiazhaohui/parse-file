import IMAGE_FILE_SIGNATURES from "../signatures/image";
import VIDEO_FILE_SIGNATURES from "../signatures/video";
import AUDIO_FILE_SIGNATURES, {
  AUDIO_M4A_FILE_SIGNATURES,
} from "../signatures/audio";

export const readFileChunk = (file: File, start: number, end: number) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const blob = file.slice(start, end);

    reader.addEventListener("load", () => {
      resolve(reader.result);
    });
    reader.addEventListener("error", () => {
      reject(reader.error);
    });
    reader.readAsArrayBuffer(blob);
  });
};

export const fileToArrayBuffer = async (
  file: File,
  chunkSize = 1024 * 1024
) => {
  const arrayBuffers = [] as any;
  let offset = 0;

  while (offset < file.size) {
    // eslint-disable-next-line no-await-in-loop
    const chunk = await readFileChunk(file, offset, offset + chunkSize);
    arrayBuffers.push(chunk);
    offset += chunkSize;
  }
  const sliceFileBuffer = arrayBuffers?.slice(0, 1000);
  const totalLength = sliceFileBuffer.reduce(
    (acc: any, buffer: any) => acc + (buffer as any).byteLength,
    0
  );

  /**
   * 内存爆了。
   * 对于大多数现代浏览器，单个ArrayBuffer的最大大小通常限制在几百兆字节（MB）到几个G字节（GB）之间
   * 只取前1000位数据
   */
  const result = new Uint8Array(totalLength as any);

  let position = 0;
  for (const buffer of sliceFileBuffer) {
    result.set(new Uint8Array(buffer as any), position);
    position += (buffer as any).byteLength;
  }

  return result.buffer;
};

/**
 * @description: 格式化文件大小
 * @param {number} size 文件大小
 * @param {*} fromUnit 传入文件的单位，默认为B，可选项：B、KB
 * @param {*} toUnit 格式化后的文件单位，默认为MB，可选项：KB、MB
 */
export function getFileSize(size: number, fromUnit = "B", toUnit = "MB") {
  let res = 0;

  if (fromUnit === "KB") {
    res = Number((size / 1024).toFixed(2));
    if (toUnit === "KB") {
      res = Number(size.toFixed(2));
    }
  } else {
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
export function getFileSuffixName(fileName: string) {
  const fileNameArr = fileName?.trim()?.split(".");
  const fileNameType = fileNameArr?.length > 1 ? fileNameArr?.reverse()[0] : "";
  const fileSuffix = fileNameType ? `.${fileNameType}` : "";

  return fileSuffix;
}

/**
 * @description: 文件签名类型
 * @description: 视频文件签名的排列规律不同其他，box大小不确定，只有ftyp和后面的兼容标准可确定；
 * @description: m4a音频文件签名的排列规律不同其他音频文件，和视频文件签名逻辑相似，box大小不确定，只有ftyp和后面的兼容标准可确定；
 * @param {string} hexString 十六进制字符串
 * @param {string} mediaType 媒体类型
 */
export const getSignatureType = (hexString: string, mediaType: string) => {
  const fileType = mediaType.split("/")[0];
  let type = fileType;

  if (IMAGE_FILE_SIGNATURES.some((item) => hexString.startsWith(item))) {
    type = "image";
  }
  if (VIDEO_FILE_SIGNATURES.some((item) => hexString.includes(item))) {
    type = "video";
  }
  if (
    mediaType === "audio/x-m4a" &&
    AUDIO_M4A_FILE_SIGNATURES.some((item) => hexString.includes(item))
  ) {
    type = "audio";
  }
  if (
    mediaType !== "audio/x-m4a" &&
    AUDIO_FILE_SIGNATURES.some((item) => hexString.startsWith(item))
  ) {
    type = "audio";
  }

  return type;
};
