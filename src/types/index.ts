export type TParseFileInfo = {
  /** 文件名 */
  fileName: string;
  /** 文件大小（MB） */
  fileSize: number;
  /** 文件扩展名 */
  fileExtension: string;
  /** 文件媒体类型 */
  fileType: string;
  /** 文件类型头 */
  fileTypeHeader: string;
  /** 文件流十六进制 */
  hexadecimalData: string[];
  hexString: string;
  isImage: boolean;
  isVideo: boolean;
  isAudio: boolean;
  isText: boolean;
  isExcel: boolean;
};
