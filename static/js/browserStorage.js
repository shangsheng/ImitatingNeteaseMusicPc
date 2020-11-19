var kvTool = {
	maxage:259200,
	path:"/",
	domain:"http://localhost:3000/",
	secure:false,
}
function setCookie(k,v,options){
	if(!options){
		document.cookie = k + "=" + v;
	}else{
		var tmp = [];
		for(var key in options){
			tmp.push(kvTool[key] + "=" + options[key]);
		}
		document.cookie = k + "=" + v + ";" + tmp.join(";");
	}
}
function getCookie(k){
	var strCookie = document.cookie;
	var kvs = strCookie.split(';').map(v=>v.trim());
	var objCookie = {};
	kvs.forEach(v=>{
		var kv = v.split("=");
		objCookie[kv[0]] = kv[1];
	});
	return objCookie[k];
}
 function delCookie(c_name){
    setCookie(c_name, "", -1)
}
var cookieUtil = function(key,value,options){
	if(!value){
		return getCookie(key);
	}else{
		setCookie(key,value,options);
	}
}
const setLocalStorage = (name,content)=>{
	if(!name) return;
//	console.log(typeof content)
	if(typeof content !== 'strung'){
		content = JSON.stringify(content)
	}
	window.localStorage.setItem(name,content)
}
const getLocalStorage = name =>{
	if(!name) return;
	return window.localStorage.getItem(name)
}
const removeLocalStorage = name =>{
	if(!name) return;
	window.localStorage.removeItem(name)
}
const localUtil = function(name,content){
	
	if(!content){
		return  getLocalStorage(name)
	}else{
		setLocalStorage(name,content)
	}
}
export{
	cookieUtil,
	localUtil,
	removeLocalStorage,
	delCookie,
	setLocalStorage
}
