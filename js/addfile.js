var isY=false
var aut=document.querySelector('.isY')
aut.onclick=function(e){
	if(this.checked){
		isY=true
	}else{
		isY=false
	}
}
var hide=document.querySelector('.hid')
files.onmouseenter=function(){
	hide.style.opacity=1
}
files.onmouseleave=function(){
	hide.style.opacity=0.4
}
var eleFile = document.querySelector('#file');

// 压缩图片需要的一些元素和对象
var reader = new FileReader(), img = new Image();

// 选择的文件对象
var file = null;

// 缩放图片需要的canvas
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

let mxcIdText='',mxcIdTexts=''
let com_imgUrls=''

// base64地址图片加载完毕后
img.onload = function () {
	// 图片原始尺寸
	var originWidth = this.width;
	var originHeight = this.height;
    document.querySelector('#onInput').addEventListener('click',function(){
		var filebox=document.querySelector('#bottomview .filebox')
		mxcIdText=document.querySelector('#mxcText').value
		mxcIdTexts=isNaN(document.querySelector('#mxcTexts').value)?16:document.querySelector('#mxcTexts').value
		console.log(mxcIdText)
		if(filebox.hasChildNodes()){
			filebox.removeChild(filebox.querySelector('img'))
		}
		
		    
		// 设置canvas高宽为图片高宽
		canvas.width = originWidth;
		canvas.height = originHeight;
		// 清除画布
		context.clearRect(0, 0, originWidth, originHeight);
		// 放上图片
		context.drawImage(img, 0, 0, originWidth, originHeight);
		
		context.font=` bolder ${mxcIdTexts}px HYShangWeiShouShuW`
		context.textAlign="center"
		
		
		// let messageHtml=document.createElement('font')
		// messageHtml.innerHTML=mxcIdText
		// console.log(messageHtml)
		
		// 获取像素数据
		var data = context.getImageData(0, 0, originWidth, originHeight).data;
		// console.log(data)
		var r=1,g=1,b=1;
		// 取所有像素的平均值
		for (var row = 0; row < originHeight; row++) {
		    for (var col = 0; col < originWidth; col++) {
		        if(row==0){
		            r += data[((originWidth * row) + col)];
		            g += data[((originWidth * row) + col) + 1];
		            b += data[((originWidth * row) + col) + 2];
		        }else{          originWidth
		            r += data[((originWidth * row) + col) * 4];
		            g += data[((originWidth * row) + col) * 4 + 1];
		            b += data[((originWidth * row) + col) * 4 + 2];
		        }
		    }
		}
		
		// console.log(r,g,b)
		// 求取平均值
		r /= (originWidth * originHeight);
		g /= (originWidth * originHeight);
		b /= (originWidth * originHeight);
		
		// 将最终的值取整
		r = Math.round(r);
		g = Math.round(g);
		b = Math.round(b);
		console.log(r,g,b)
		if(r<47 && g<47 && b<47){
			// 字体的颜色变为白色
			context.fillStyle="white";
		}else if(r>103 || g>103 || b>103){
			// 字体的颜色为黑色
			context.fillStyle="black";
		}
		
		if(mxcIdText && mxcIdTexts){
			// 加上文字
			context.fillText(mxcIdText,originWidth/2,originHeight-32);
		}
		
		
		
		var li=document.createElement('div')
		var immg=document.createElement('img')
		immg.setAttribute('src',canvas.toDataURL("image/png"))
		immg.setAttribute('style','animation: lightSpeedInLeft;animation-duration: .7s;')
		filebox.appendChild(immg)
		
		com_imgUrls=canvas.toDataURL("image/png")
		
		if(isY){
			let a = document.createElement("a"); // 生成一个a元素
			let event = new MouseEvent("click"); // 创建一个单击事件
			a.download = name || "photo"; // 设置图片名称
			a.style.display='none';
			a.href = canvas.toDataURL("image/png"); // 将生成的URL设置为a.href属性
			a.dispatchEvent(event); // 触发a的单击事件
		}
	})
};

document.querySelector('.fix').addEventListener('click',function(){
	if(com_imgUrls){
		localStorage.setItem('imgs',com_imgUrls)
		window.location.href="compress.html"
	}
})

// 获取图片
reader.onload = function(e) {
	var iim=document.createElement('img')
	iim.setAttribute('src',e.target.result)
	iim.setAttribute('id','iim')
	iim.style.cssText="position: absolute;top: 50%;left: 50%;z-index: 1000;transform: translate(-50%,-50%);"
	hide.innerHTML="已选择图片"
	files.appendChild(iim)
    img.src = e.target.result;
};
eleFile.addEventListener('change', function (event) {
 // console.log(event)
    file = event.target.files[0];
	name=event.target.files[0].name || '';
    // 选择的文件是图片
    if (file.type.indexOf("image") == 0) {
		// 文件base64化，以便获知图片原始尺寸
        reader.readAsDataURL(file);    
    }
});



// eleFile.addEventListener('dragover',function(event){
// 	event.preventDefault()
// })
// eleFile.addEventListener('drop',function(event){
// 	event.preventDefault()
// 	console.log(event)
// 	file=event.dataTransfer.files[0]
// 	if(file.type.indexOf("image")==0){
// 		reader.readAsDataURL(file)
// 	}
// });
// // Ctrl+V粘贴图片
// document.addEventListener('paste',function(event){
// 	// console.log(event.clipboardData || event.originalEvent.clipboardData)
// 	file=event.clipboardData.files[0] || event.originalEvent.clipboardData.files[0]
// 	if(file.type){
// 		if(file.type.indexOf("image")==0){
// 			reader.readAsDataURL(file)
// 		}
// 	}
// })