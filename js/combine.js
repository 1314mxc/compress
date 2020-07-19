var hide=document.querySelector('#fileso .hid')
fileso.onmouseenter=function(){
	hide.style.opacity=1
}
fileso.onmouseleave=function(){
	hide.style.opacity=0.4
}
var hide2=document.querySelector('#filest .hid')
filest.onmouseenter=function(){
	hide2.style.opacity=1
}
filest.onmouseleave=function(){
	hide2.style.opacity=0.4
}
var fimg1=new Image(),fimg2=new Image();
var cimg=null,cid=0,chd=0,vimg=null,vid=0,vhd=0;
var isY=false
var aut=document.querySelector('.isY')
aut.onclick=function(e){
	if(this.checked){
		isY=true
	}else{
		isY=false
	}
}
fileo.addEventListener("change",function(e){
	let fileReader=new FileReader(),
		fileType=e.target.files[0].type;
	let file = e.target.files[0];
	fileReader.onload=function(e){
		let img=document.createElement('img')
		img.setAttribute('src',e.target.result)
		img.setAttribute('id','iim')
		img.style.cssText="position: absolute;top: 50%;left: 50%;z-index: 1000;transform: translate(-50%,-50%);"
		hide.innerHTML=''
		fileso.appendChild(img)
		fimg1.src=e.target.result
		cimg=img
	}
	// 选择的文件是图片
	if (fileType.indexOf("image") == 0) {
		// 文件base64化，以便获知图片原始尺寸
	    fileReader.readAsDataURL(file);    
	}
})
filet.addEventListener("change",function(e){
	let fileReader=new FileReader(),
		fileType=e.target.files[0].type;
	let file = e.target.files[0];
	fileReader.onload=function(e){
		let img=document.createElement('img')
		img.setAttribute('src',e.target.result)
		img.setAttribute('id','iims')
		img.style.cssText="position: absolute;top: 50%;left: 50%;z-index: 1000;transform: translate(-50%,-50%);"
		hide2.innerHTML=''
		filest.appendChild(img)
		fimg2.src=e.target.result
		vimg=img
	}
	// 选择的文件是图片
	if (fileType.indexOf("image") == 0) {
		// 文件base64化，以便获知图片原始尺寸
	    fileReader.readAsDataURL(file);    
	}
})

fimg1.onload=function(){
	// console.log(cimg)
	cid=document.querySelector('img[id="iim"]').offsetWidth
	chd=document.querySelector('img[id="iim"]').offsetHeight
}

var canvass=document.createElement('canvas');
var contextt=canvass.getContext('2d');
fimg2.onload=function(){
	vid=document.querySelector('img[id="iims"]').offsetWidth
	vhd=document.querySelector('img[id="iims"]').offsetHeight
	canvass.width = vid;
	canvass.height = vhd;
	contextt.drawImage(fimg2, 0, 0, vid, vhd);
	let imageData = contextt.getImageData(0, 0, vid, vhd)
	    , data = imageData.data
	  for(let i = 0; i < data.length; i+=4) {
	    data[i+3] = 80
	  }
	  
	contextt.putImageData(imageData, 0, 0)
	fimg2.src=canvass.toDataURL("image/png")
}

bto.addEventListener('click', function(){
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	cid=(cid==0)?500:cid
	chd=(chd==0)?480:chd
	canvas.width = cid;
	canvas.height = chd;
	
	// context.drawImage(fimg1, 0, 0, cid, chd);
	
	
	
	// 绘制
	context.drawImage(fimg1, 0, 0, cid, chd);
	// 再次绘制
	context.drawImage(fimg2, 0, 0, cid, chd);
	// 回调
	// console.log(canvas)
	var immg=document.createElement('img')
	immg.setAttribute('src',canvas.toDataURL("image/png"))
	filess.appendChild(immg)
	var dil=document.querySelector('#filess .hids')
	dil.innerHTML=''
	if(isY){
		let a = document.createElement("a"); // 生成一个a元素
		let event = new MouseEvent("click"); // 创建一个单击事件
		a.download = name || "photo"; // 设置图片名称
		a.style.display='none';
		a.href = canvas.toDataURL("image/png"); // 将生成的URL设置为a.href属性
		a.dispatchEvent(event); // 触发a的单击事件
	}
	
});