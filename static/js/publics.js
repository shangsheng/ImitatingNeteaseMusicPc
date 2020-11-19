import Vue from 'vue'
//拖拽
function getScroll(){
    return {
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    };
}
function drage(drag){
			var drag = document.getElementById(drag);
			console.log(drag)
			var drages = drag.parentNode;
			drages.style.left = window.innerWidth/2 - (drages.offsetWidth?drages.offsetWidth/2 :265)  + 'px';
			drages.style.top = window.innerHeight/2+ getScroll().top - (drages.offsetHeight?drages.offsetHeight/2 : 163) + 'px';
			drag.onmousedown=function(event){
				var event = event || window.event;
				var diffY = event.clientY - drages.offsetTop;
				var diffX = event.clientX - drages.offsetLeft;
				if(typeof drages.setCapture !== 'undefined'){
					drages.setCapture();
				}
				document.onmousemove=function(event){
					var event = event || windw.event;
					var moveX = event.clientX - diffX;
					var moveY = event.clientY - diffY;
					if(moveX < 0){
						moveX = 0;
					}else if(moveX > window.innerWidth - drages.offsetWidth){
						moveX = window.innerWidth - drages.offsetWidth
					}
					if(moveY < 0){
						moveY = 0;
					}else if(moveY > window.innerHeight + getScroll().top - drages.offsetHeight){
						moveY = window.innerHeight + getScroll().top - drages.offsetHeight
					}
					drages.style.left = moveX + 'px';
					drages.style.top = moveY + 'px';
				}
				document.onmouseup=function(event){
					var event = event || windw.event;
					drag.onmousedown = null;
					this.onmousemove = null;
					
					if(typeof drages.releaseCapture != 'undefined'){
						drages.releaseCapture();
					}
				}
			}
			
		}
function seehref (href){
	window.open(href)
}
function getId(id){
	return document.getElementById(id)
}
function Playback(volume){
	if(volume>=10000){
		if(volume>=100000000){
			return Math.round(volume/100000000)+'亿'
		}else{
			return Math.round(volume/10000)+'万'
		}
	}else{
		return volume
	}
}
/**参数说明： 
 
 * 根据长度截取先使用字符串，超长部分追加… 
 
 * str 对象字符串 
 
 * len 目标字节长度 
 
 * 返回值： 处理结果字符串 
 
 */
 
 function cutString(str, len) { 
 
   //length属性读出来的汉字长度为1 
 
   if(str.length*2 <= len) { 
 
     return str; 
 
   } 
 
   var strlen = 0; 
 
   var s = ""; 
 
   for(var i = 0;i < str.length; i++) { 
 
     s = s + str.charAt(i); 
 
     if (str.charCodeAt(i) > 128) { 
 
       strlen = strlen + 2; 
 
       if(strlen >= len){ 
 
         return s.substring(0,s.length-1) + "..."; 
 
       } 
 
     } else { 
 
       strlen = strlen + 1; 
 
       if(strlen >= len){ 
 
         return s.substring(0,s.length-2) + "..."; 
 
       } 
 
     } 
 
   } 
 
   return s; 
 
 } 
// body 是否显示滚动条
 function toggleBody (isPin){
			
				if(isPin){
					document.body.style['overflow-y'] = 'hidden'
				}
			
				else{
					document.body.style['overflow-y'] = 'auto'
			
				}
			}
 //判断是否有版权
	function checkMusic(that,id,callBack){
		that.$http({
		    method:'get',
		    url:that.$host+'/check/music?id='+id
		}).then(function(res){
//		         	console.log(res.data)
	     	callBack(res.data)
		}).catch(res=>{
		        console.log('请求失败：'+res.data+','+res.statusText);
		})
	}
	
	//时间格式
	const formatTime = time => {
	 if(typeof time !== 'number' || time <0){
	  return time
	 }
	 const hour = parseInt(time/3600)
	 time = time%3600
	 const minute = parseInt(time/60)
	 time = Math.round(time%60)
	 const second = time
	 if(hour==0){
	 	return [ minute, second].map(formatNumber).join(':')
	 }else{
	 	return [hour, minute, second].map(formatNumber).join(':')
	 }
	  
	}
	
	const formatNumber = n => {
	  n = n.toString()
	  return n[1] ? n : '0' + n
	}
	//时间格式汉字后缀
	const foramtChild = time =>{
		if(typeof time !== 'number' || time <0){
		  return time
		 }
		 const hour = parseInt(time/3600)
		 time = time%3600
		 const minute = parseInt(time/60)
		 time = Math.round(time%60)
		 const second = time
		 if(hour==0){
		 	return formatNumber(minute) + '分' + formatNumber(second)+'秒'
		 }else{
		 	return formatNumber(hour) + '时' + formatNumber(minute) + '分' + formatNumber(second)+'秒'
		 	
		 }
	}
	//转化成秒
	const secondTime = item =>{
		console.log(item)
		if(typeof item !== 'string' || item == ''){
			return false
		}
		const arrh = item.split(":");
		if(arrh.length>2){
			item = Number(arrh[0]*60)+Number(arrh[1])+Number(arrh[2])/1000
		}else{
			item = Number(arrh[0]*60)+Number(arrh[1])
		}
		return item
	}
	 /**
  *时间
  */
  const datePublish=(format, timestamp)=>{ 
  	
    var a, jsdate=((timestamp) ? new Date(timestamp) : new Date()); 
    var pad = function(n, c){ 
        if((n = n + "").length < c){ 
            return new Array(++c - n.length).join("0") + n; 
        } else { 
            return n; 
        } 
    }; 
    var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
    var txt_ordin = {1:"st", 2:"nd", 3:"rd", 21:"st", 22:"nd", 23:"rd", 31:"st"}; 
    var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  
    var f = { 
        // Day 
        d: function(){return pad(f.j(), 2)}, 
        D: function(){return f.l().substr(0,3)}, 
        j: function(){return jsdate.getDate()}, 
        l: function(){return txt_weekdays[f.w()]}, 
        N: function(){return f.w() + 1}, 
        S: function(){return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'}, 
        w: function(){return jsdate.getDay()}, 
        z: function(){return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0}, 
        
        // Week 
        W: function(){ 
            var a = f.z(), b = 364 + f.L() - a; 
            var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1; 
            if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){ 
                return 1; 
            } else{ 
                if(a <= 2 && nd >= 4 && a >= (6 - nd)){ 
                    nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31"); 
                    return date("W", Math.round(nd2.getTime()/1000)); 
                } else{ 
                    return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0); 
                } 
            } 
        }, 
        
        // Month 
        F: function(){return txt_months[f.n()]}, 
        m: function(){return pad(f.n(), 2)}, 
        M: function(){return f.F().substr(0,3)}, 
        n: function(){return jsdate.getMonth() + 1}, 
        t: function(){ 
            var n; 
            if( (n = jsdate.getMonth() + 1) == 2 ){ 
                return 28 + f.L(); 
            } else{ 
                if( n & 1 && n < 8 || !(n & 1) && n > 7 ){ 
                    return 31; 
                } else{ 
                    return 30; 
                } 
            } 
        }, 
        
        // Year 
        L: function(){var y = f.Y();return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0}, 
        //o not supported yet 
        Y: function(){return jsdate.getFullYear()}, 
        y: function(){return (jsdate.getFullYear() + "").slice(2)}, 
        
        // Time 
        a: function(){return jsdate.getHours() > 11 ? "pm" : "am"}, 
        A: function(){return f.a().toUpperCase()}, 
        B: function(){ 
            // peter paul koch: 
            var off = (jsdate.getTimezoneOffset() + 60)*60; 
            var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off; 
            var beat = Math.floor(theSeconds/86.4); 
            if (beat > 1000) beat -= 1000; 
            if (beat < 0) beat += 1000; 
            if ((String(beat)).length == 1) beat = "00"+beat; 
            if ((String(beat)).length == 2) beat = "0"+beat; 
            return beat; 
        }, 
        g: function(){return jsdate.getHours() % 12 || 12}, 
        G: function(){return jsdate.getHours()}, 
        h: function(){return pad(f.g(), 2)}, 
        H: function(){return pad(jsdate.getHours(), 2)}, 
        i: function(){return pad(jsdate.getMinutes(), 2)}, 
        s: function(){return pad(jsdate.getSeconds(), 2)}, 
        //u not supported yet 
        
        // Timezone 
        //e not supported yet 
        //I not supported yet 
        O: function(){ 
            var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4); 
            if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t; 
            return t; 
        }, 
        P: function(){var O = f.O();return (O.substr(0, 3) + ":" + O.substr(3, 2))}, 
        //T not supported yet 
        //Z not supported yet 
        
        // Full Date/Time 
        c: function(){return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()}, 
        //r not supported yet 
        U: function(){return Math.round(jsdate.getTime()/1000)} 
    }; 
        console.log(format)
    return format.replace(/([a-zA-Z])/g, function(t, s){ 
      console.log(t)
      console.log(s)
      let ret ;
        if( t!=s ){ 
            // escaped 
            ret = s; 
        } else if( f[s] ){ 
            // a date function exists 
            ret = f[s](); 
        } else{ 
            // nothing special 
            ret = s; 
        } 
        return ret; 
    }); 
}
  //手写滚动条
const gdt=(outs,inners,scrollbtns,scrollbars)=>{
	function mouseWheel(obj,upfun,downfun){if(obj.addEventListener){obj.addEventListener("mousewheel",fn);obj.addEventListener("DOMMouseScroll",fn)}else{obj.attachEvent("onmousewheel",fn);}
	function fn(e){var ev=e||window.event;var val=ev.detail||ev.wheelDelta;if(val==-3||val==120){upfun();}else if(val==3||val==-120){downfun();}
	if(ev.preventDefault){ev.preventDefault();}else{ev.returnValue=false;}}}
	
	var out=document.querySelector(outs)//滚动内容的外部元素
	console.log(out)
    var inner=document.querySelector(inners)//滚动内容元素
    console.log(inner)
    var scrollbtn=document.querySelector(scrollbtns)//滚动条
    var scrollbar=document.querySelector(scrollbars)//滚动条的父级元素
    var innerH=inner.offsetHeight;
    console.log(innerH)
    var outH=out.offsetHeight;
    console.log(outH)
    var scrollbarH=scrollbar.offsetHeight;
    var bili=innerH/outH;
    console.log(bili)
    var tops=0;
    var speed=20;
    // if(bili<1){
    //     scrollbtn.style.display="none";
    // }
    var scrollbtnH=scrollbarH/bili;
    scrollbtn.style.height=scrollbtnH+"px";
    var lenH=scrollbarH-scrollbtnH;
    if(bili<1){
        scrollbar.style.display="none";
    }else{
        scrollbtn.onclick=function (e) {
            var ev=e||window.event;
            if(scrollbtn.stopPropagation){
                ev.stopPropagation();
            }else{
                ev.cancelBubble();
            }
        }
        scrollbtn.onmousedown = function (e) {
            var ev=e||window.event;
            var lenY=ev.clientY-this.offsetTop;
            if(ev.preventDefault){
                ev.preventDefault()
            }else{
                ev.returnValue=false;
            }
            document.onmousemove = function (e) {
                var ev = e || window.event;
                tops = ev.clientY - lenY;
                if(tops<0){
                    tops=0;
                }
                if(tops>lenH){
                    tops=lenH;
                }
                scrollbtn.style.top = tops + "px";
                var innerT=tops*bili;
                inner.style.marginTop=-innerT+"px";
            }
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
        mouseWheel(out,function(){
            tops-=speed;
            setTop()
        },function(){
            tops+=speed;
            setTop()
        })
        scrollbar.onclick=function (e) {
            var ev=e||window.event;
            tops=ev.offsetY;
            setTop()
        }
        document.onkeydown=function (e) {
            var ev=e||event;
            if(ev.keyCode==38){
                tops-=speed;
                setTop()
            }else if(ev.keyCode==40){
                tops+=speed;
                setTop()
            }
        }
        function setTop(){
            if(tops<0){
                tops=0;
            }
            if(tops>=lenH){
                tops=lenH;
            }
            scrollbtn.style.top=tops+"px";
            inner.style.marginTop=-tops*bili+"px";
        }
    }
}
//多久前
const timeDJq=(timestamp)=>{
		
	 	var jsdate=((timestamp) ? new Date(timestamp) : new Date()); 
	 	var date = new Date();
		
		var timeStamp = Date.parse(date); //当前时间戳
		
		
//		var timestamp2 = Date.parse(new Date(timestamp));
		var num = (timeStamp - timestamp)/1000 ;
		
		var day = Math.floor(num / 86400);
		
		var dayP = num % 86400;
		var h = Math.floor(dayP / 3600);
		var hP = dayP % 3600;
		var m = Math.floor(hP / 60);
		var s = hP % 60;
		
		 if(0 < m && m < 60 && day < 1) {
			return  m + "分前";
		} else if(0 < s && s < 60 && day < 1 && m < 1) {
			return '刚刚';
		}else{
			var getDay = jsdate.getDate();
			var hours = jsdate.getHours();
			var month = jsdate.getMonth()+1;
			var minutes = jsdate.getMinutes();
			var year = jsdate.getFullYear();
//			console.log(year)
			
			if(day>1){
				
//				console.log(Math.round(day / 30))
				if(Math.round(day / 30)>12){
					
					return year + '年' + month +'月'+ getDay + '日'  
				}else{
					
					if(hours<10){
						hours = '0' + hours
					}
					if(minutes<10){
						minutes = '0' + minutes
					}
					return month +'月'+ getDay + '日' + " " + hours + ':' + minutes 
				}
			}else if(day == 1){
				if(hours<10){
						hours = '0' + hours
					}
					if(minutes<10){
						minutes = '0' + minutes
					}
				return '昨天'+hours + ':' + minutes
			}else {
				if(hours<10){
					hours = '0' + hours
				}
				if(minutes<10){
					minutes = '0' + minutes
				}
				return hours + ':' + minutes
			}
		}
		
}
//升序降序
let  arraySort = function(arr, sortText,boolean) {
        if (!sortText) {
            return arr
        }
        var _sortText = sortText.split(',').reverse(),
            _arr = arr.slice(0);
            
        for (var i = 0, len = _sortText.length; i < len; i++) {
      			//升序
            	_arr.sort(function(n1, n2) {
            		
	                return n1[_sortText[i]] - n2[_sortText[i]]
	            })
        }
        if(!boolean){
            //降序
            _arr.reverse();		
        }
        return _arr;
   }
let logoRefresh = function (callback){
	var that = this;
	this.$http({
			    method:'get',
		     	url:that.$host+'/login/status'	
			}).then(function(res){
			     	console.log(res.data)
			       callback(res)
   	         }).catch(res=>{
		         	console.log('请求失败：'+res);			
   	         })
}
//正则匹配链接替换a标签
let addLinks = function ($text) {
	console.log($text)
	if($text == undefined) return $text
	 var r=$text.match(/(http[s]?:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"\s])*)/ig);
	console.log(r)
   if(r){
	   	 for (var index = 0; index <  r.length; index++) {
	   	 	console.log(r[index])
	        $text=$text.replace(r[index],'<a target="_blank" href="'+r[index]+'" class="link u-link"> <i class="u-dicn u-dicn-28"></i> 网页链接</a>');
	    }
   }
    return $text  
}
//正则匹配@name名字
let addNameLinks = function($name){
	console.log($name)
	if($name == undefined) return $name
	 var r=$name.match(/@.*?\s+/ig);
	 var reg = new RegExp("@", "g");
    if(r){
    	for (var index = 0; index <  r.length; index++) {
	        $name=$name.replace(r[index],"<a href='/user/home?nickname="+r[index].replace(reg, '')+"' class='s-fc7'>"+r[index]+"</a>");
	    }
    }
    return $name
}
//正则匹配#号之间替换成a标签
let addThLinks = function($th){
	console.log($th)
	if($th == undefined) return $th
	 var r=$th.match(/#.*?\#/ig);
	 console.log(r)
	 if(r){
	 	for (var index = 0; index <  r.length; index++) {
	        $th=$th.replace(r[index],"<a href='javascript:;' class='s-fc7'>"+r[index]+"</a>");
	    } 
	 }
    
    return $th
}
//换行
let addBr = function($br){
	console.log($br)
	if($br == undefined) return $br
	 var r=$br.match(/\n/ig);
	 console.log(r)
	 if(r){
	 	for (var index = 0; index <  r.length; index++) {
	        $br=$br.replace(r[index],"<br>");
	    } 
	 }
    
    return $br
	
}
//字符串转换成布尔值
let toboolean = function (val){
   
    if(typeof val === 'string'){
        switch (val.toLowerCase()){
    　　　　case "true": case 1: case "yes": return true;
    　　　　case "false": case 0: case "no": case null: return false;
    　　　　default:return Boolean(val);
    　　}
    }else{
        return val
    }
　　
}
export  {
	drage,
	seehref,
	getId,
	Playback,
	cutString,
	toggleBody,
	checkMusic,
	formatTime,
	datePublish,
	secondTime,
	gdt,
	timeDJq,
	arraySort,
	foramtChild,
	getScroll,
	logoRefresh,
	addLinks,
	addNameLinks,
	addThLinks,
	addBr,
    toboolean
}
