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

// base64地址图片加载完毕后
img.onload = function () {
    // 图片原始尺寸
    var originWidth = this.width;
    var originHeight = this.height;
    // 最大尺寸限制
    var maxWidth = 500, maxHeight = 500;
    // 目标尺寸
    var targetWidth = originWidth, targetHeight = originHeight;
    // 图片尺寸超过500x500的限制
    if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
    }
        
    // canvas对图片进行缩放
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    // 清除画布
    context.clearRect(0, 0, targetWidth, targetHeight);
    // 图片压缩
    context.drawImage(img, 0, 0, targetWidth, targetHeight);
    // 如果要上传到服务器的话：canvas转为blob并上传
    // canvas.toBlob(function (blob) {
    //     // 图片ajax上传
    //     var xhr = new XMLHttpRequest();
    //     // 文件上传成功
    //     xhr.onreadystatechange = function() {
    //         if (xhr.status == 200) {
    //             // xhr.responseText就是返回的数据
    //         }
    //     };
    //     // 开始上传
    //     xhr.open("POST", 'upload.php', true);
    //     xhr.send(blob);    
    // }, file.type || 'image/png');
	
	var li=document.createElement('div')
	li.setAttribute('class','imgsho')
	var immg=document.createElement('img')
	immg.setAttribute('src',canvas.toDataURL("image/png"))
	li.appendChild(immg)
	bottomview.appendChild(li)
	
	if(isY){
		let a = document.createElement("a"); // 生成一个a元素
		let event = new MouseEvent("click"); // 创建一个单击事件
		a.download = name || "photo"; // 设置图片名称
		a.style.display='none';
		a.href = canvas.toDataURL("image/png"); // 将生成的URL设置为a.href属性
		a.dispatchEvent(event); // 触发a的单击事件
	}
};

if(localStorage.getItem('imgs')){
	var iim=document.createElement('img')
	iim.setAttribute('src',localStorage.getItem('imgs'))
	iim.setAttribute('id','iim')
	iim.style.cssText="position: absolute;top: 50%;left: 50%;z-index: 1000;transform: translate(-50%,-50%);"
	hide.innerHTML="已选择压缩图片"
	files.appendChild(iim)
	img.src = localStorage.getItem('imgs');
	localStorage.removeItem('imgs')
}else{
	// 获取图片
	reader.onload = function(e) {
		var iim=document.createElement('img')
		iim.setAttribute('src',e.target.result)
		iim.setAttribute('id','iim')
		iim.style.cssText="position: absolute;top: 50%;left: 50%;z-index: 1000;transform: translate(-50%,-50%);"
		hide.innerHTML="已选择压缩图片"
		files.appendChild(iim)
		setTimeout(()=>{
			files.removeChild(iim)
			hide.innerHTML="未选择压缩图片"
		},1500)
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
	eleFile.addEventListener('dragover',function(event){
		event.preventDefault()
	})
	eleFile.addEventListener('drop',function(event){
		event.preventDefault()
		console.log(event)
		file=event.dataTransfer.files[0]
		if(file.type.indexOf("image")==0){
			reader.readAsDataURL(file)
		}
	});
	// Ctrl+V粘贴图片
	document.addEventListener('paste',function(event){
		// console.log(event.clipboardData || event.originalEvent.clipboardData)
		file=event.clipboardData.files[0] || event.originalEvent.clipboardData.files[0]
		if(file.type){
			if(file.type.indexOf("image")==0){
				reader.readAsDataURL(file)
			}
		}
	})
}