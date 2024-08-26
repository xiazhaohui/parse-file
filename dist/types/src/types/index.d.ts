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
    /** 文件十六进制字符串 */
    hexString: string;
    /** 是否是图片 */
    isImage: boolean;
    /** 是否是视频 */
    isVideo: boolean;
    /** 是否是音频 */
    isAudio: boolean;
    /** 是否是文本 */
    isText: boolean;
    /** 是否是Excel表格 */
    isExcel: boolean;
};
