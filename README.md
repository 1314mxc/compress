本工具为**在线图片处理工具**，具有“图片压缩”、“图片合成”、“背景图片融和”的功能，用完即走，目前在移动端和PC端皆支持良好。

## 前端压缩图片的优势
1. 由于上传图片尺寸比较小，因此上传速度会比较快，交互会更加流畅，同时大大降低了网络异常导致上传失败风险。
2. 图片没有大小限制，因为不用传输到服务器，所以理论上可以上传任意大小的图片进行压缩

## 暂时来说，前端压缩图片的缺点
1. 对于一些字体较小的图片来说，如果没有把控好压缩的“度”，整个图片会非常模糊

## 关于此工具
**体验地址：** [http://htmlpreview.github.io/?https://github.com/1314mxc/compress/blob/master/index.html](http://htmlpreview.github.io/?https://github.com/1314mxc/compress/blob/master/index.html)

暂时只能支持png等静态图片上传，不支持更改格式，暂不支持GIF动图压缩；
*此版本建议不要用来压缩含有大量小字体图片！！！*


## 此版本较上版本优化
- 此版本为1.3.1beta，为正式版做预告，并部分修复了前几个版本中资源加载速度与显示格式的问题
- |
- 1.3.0正式版，修复了移动端和PC端按钮显示位置偏差严重的问题，新增“图片合成”功能，支持以一张图片为背景合成，多数情况下并不会改变原图大小。预计下个版本支持“自定义背景图片透明度设置”
- |
- 1.3.0beta版，为下一版本做准备。此版本优化了图片提交方式、修复图片显示不完全的问题。预告：预计1.3.0正式版本中会增加“图片合成”功能。
- |
- 1.2.0，新增列表项，修复1.1.0中列表项表意不明、显示混乱的问题，修复1.1.0中“是否自动下载”按钮在不同机型的位置显示错误，规范限制input按钮为“图片获取”，将选择图片后在原位置2s的原图显示时间缩短为1.5s（下个版本预计会有专门预览框/按钮）
- |
- 1.1.0，新增控制按钮，可以自行决定是否压缩完自动下载；新增预览，在选择图片后在选择的地方会有2s的图片显示时间（下个版本预计会有专门预览框/按钮）


## 联系作者
| ➕微信 | ➕QQ |
|--|--|
| ![yunxiaomengnb](https://img-blog.csdnimg.cn/20200716102902499.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzNjI0ODc4,size_16,color_FFFFFF,t_70) | ![1562494673](https://img-blog.csdnimg.cn/20200716102919163.png) |


## 实现
本demo的核心就是canvas的绘图方法drawImage()。
其使用参数如下：
```
context.drawImage(img, dx, dy);
context.drawImage(img, dx, dy, dWidth, dHeight);
context.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```

把一张大的图片，直接画在一张小小的**画布**上。此时大图片就天然变成了小图片，压缩就这么实现了。

完整源码见上面compress.html文件。

