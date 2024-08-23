export declare const readFileChunk: (file: File, start: number, end: number) => Promise<unknown>;
export declare const fileToArrayBuffer: (file: File, chunkSize?: number) => Promise<ArrayBufferLike>;
/**
 * @description: 格式化文件大小
 * @param {number} size 文件大小
 * @param {*} fromUnit 传入文件的单位，默认为B，可选项：B、KB
 * @param {*} toUnit 格式化后的文件单位，默认为MB，可选项：KB、MB
 */
export declare function getFileSize(size: number, fromUnit?: string, toUnit?: string): number;
/**
 * @description: 获取文件名的后缀名
 * @param {string} fileName 完整的文件名
 * @return {*} 文件名后缀
 */
export declare function getFileSuffixName(fileName: string): string;
