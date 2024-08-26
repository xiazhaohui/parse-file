# parse-file

> 解析文件流，分析文件合法性，获取文件信息

### 校验规则

判断文件是否是图片或者视频等类型，采用文件扩展名+mediaType+文件签名等多重验证方式进行校验。

### 文件类型

目前支持的文件类型：

- 图片（.png、.jpg、.jpeg）
- 视频（.mp4、.mov）
- 音频
- 文本
- 表格

### 返回数据

解析后的数据格式

```typescript
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
}
```

> 持续更新中...
