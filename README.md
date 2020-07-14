## 前端压缩图片的优势
1. 由于上传图片尺寸比较小，因此上传速度会比较快，交互会更加流畅，同时大大降低了网络异常导致上传失败风险。
2. 图片没有大小限制，因为不用传输到服务器，所以理论上可以上传任意大小的图片进行压缩

## 暂时来说，前端压缩图片的缺点
1. 对于一些字体较小的图片来说，如果没有把控好压缩的“度”，整个图片会非常模糊

## 关于此工具
**体验地址：** [http://htmlpreview.github.io/?https://github.com/1314mxc/compress/blob/master/compress.html](http://htmlpreview.github.io/?https://github.com/1314mxc/compress/blob/master/compress.html)

暂时只能支持png等静态图片上传，不支持更改格式，暂不支持GIF动图压缩；
*此版本建议不要用来压缩含有大量小字体图片！！！*


## 此版本较上版本优化
此版本为1.1.0，新增控制按钮，可以自行决定是否压缩完自动下载；新增预览，在选择图片后在选择的地方会有2s的图片显示时间（下个版本预计会有专门预览框/按钮）


## 实现
本demo的核心就是canvas的绘图方法drawImage()。
其使用参数如下：
```
context.drawImage(img, dx, dy);
context.drawImage(img, dx, dy, dWidth, dHeight);
context.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```

· img
就是图片对象，可以是页面上获取的DOM对象，也可以是虚拟DOM中的图片对象。
· dx, dy, dWidth, dHeight
表示在canvas画布上规划处一片区域用来放置图片，dx, dy为canvas元素的左上角坐标，dWidth, dHeight指canvas元素上用在显示图片的区域大小。如果没有指定sx,sy,sWidth,sHeight这4个参数，则图片会被拉伸或缩放在这片区域内。
· sx,sy,swidth,sheight
这4个坐标是针对图片元素的，表示图片在canvas画布上显示的大小和位置。sx,sy表示图片上sx,sy这个坐标作为左上角，然后往右下角的swidth,sheight尺寸范围图片作为最终在canvas上显示的图片内容。
drawImage()方法有一个非常怪异的地方，大家一定要注意，那就是5参数和9参数里面参数位置是不一样的，这个和一般的API有所不同。一般API可选参数是放在后面。

举个例子，一张图片（假设图片对象是img）的原始尺寸是2800*3760，现在需要把尺寸限制为400*300大小，很简单，原理核心代码示意：
```
context.drawImage(img,0,0,400,300);
```
把一张大的图片，直接画在一张小小的**画布**上。此时大图片就天然变成了小图片，压缩就这么实现了。

完整源码见上面compress.html文件。

但是以后的一个版本一定会有一个“记忆用户压缩列表”的功能，这是为了防止有些人总是用完就删，结果下次再用就找不到了 —— 这当然要用到后端，但是【前端压缩】的核心基础不会变（除非哪一天有更好的方法了）
