<template>
	<div id="video-src">
		<div class="src src-video f-cb" v-if="videoData">
			<div class="video f-pr j-flag" :class="{'f-hide':!videHide}" @click.stop="videHideClick(true)">
				<div class="info f-pa" @click.stop="videHideClick(true)">
					<div class="tit u-dicn u-dicn-17">
						<p class="f-thide2">
							<span class="h3">{{videoData.title}}</span>
							<span class="h4">-by{{videoData.creator.nickname}}</span>
						</p>
					</div>
					<div class="bottom u-dicn u-dicn-49">
						<span class="f-fl">
							<i class="icn u-dicn u-dicn-43"></i>
							{{videoData.playTime}}
						</span>
						<span class="f-fr">
							<i class="icn u-dicn u-dicn-44"></i>
							{{videoData.durationms}}
						</span>
						
					</div>
					<i class="ply u-dicn u-dicn-42 f-alpha" @click.stop="videHideClick(true)"></i>
				</div>
				<img :src="videoData.coverUrl+'?param=338y189'" class="f-img" @click.stop="videHideClick(true)"/>
			</div>
			<div class="fold f-cb j-flag " :class="{'f-hide':videHide}">
						<span class="btn s-fc3 f-fl" @click.stop="videHideClick(false)">
							<i class="icn u-dicn u-dicn-18"></i>
							<span class="cursor" @click.stop="videHideClick(false)">收起</span>
						</span>
						<span class="sep f-fl"></span>
						<div class="inf f-thide s-fc3">
							<router-link :to="{path:'/video',query:{id:videoData.videoId}}" class="btn s-fc3">
								<i class="icn u-dicn u-dicn-35"></i>
								{{videoData.title}}
							</router-link>
							<router-link :to="{path:'/user/home',query:{id:videoData.creator.userId}}" class="sub s-fc4">
								{{videoData.creator.nickname}}
							</router-link>
						</div>
					</div>
					<div class="mv mv-full f-pr j-flag " :class="{'f-hide':videHide}" v-if="videoUrl.length>0" :style="{width:videoWidth+'px',height:videoHeight + 'px'}">
						<div class="m-ctvideo z-active z-pause"  :class="[video.playing?'z-play':'z-pause',{'z-fullscreen':definition},{'z-end':video.zEnd}]">
							<div class="player">
								<video class="media" 
									ref="video"
					                @pause="onPause" 
					                @play="onPlay" 
					                @timeupdate="onTimeupdate" 
					                @loadedmetadata="onLoadedmetadata"
					                @error="onError"
					                @progress="onProgress"
					                @ended="ended"		
					                preload="auto">
									<source  :src="videoUrl[0].url" type="video/mp4">
								</video>
								<div class="poster ffull">
									<img :src="videoData.coverUrl" class="j-pic pic"/>
								</div>
								<div class="play ffull" v-bind:hidden="video.zEnd">
									<span class="icn cursor" @click.stop="play"></span>
								</div>
								<span class="loading"></span>
								<i class="fast"></i>
								<div class="opbar">
									<ul class="j-ops ops ffr fhide">
										<li class="itm">
											<span class="cursor j-like icn icn-like" data-action="video-like"></span>
											
										</li>
										<li class="itm">
											<span class="cursor j-sub icn icn-sub" data-action="video-sub"></span>
										</li>
										<li class="itm">
											<span class="cursor icn icn-share" data-action="video-share"></span>
										</li>
									</ul>
									<h2 class="j-tt tt fthide"></h2>
								</div>
								<div class="layer layer-err ffull">
									<div class="fvhc">
										<p class="err">连接失败，请重试</p>
										<span class="btnwrap ftdn cursor" data-action="video-replay">
											<i class="icn"></i>
											重新连接
										</span>
									</div>
								</div>
								<div class="layer layer-end layer-end-nonext ffull" >
									<div class="fvhc">
										<div class="btn btn-1" @click.stop="play">
											<span class="icn top cursor" @click.stop="play">
												
											</span>
											<span class="bottom" @click.stop="play">重播</span>
										</div>
									</div>
								</div>
								<div class="layer layer-end layer-end-next ffull">
									<div class="fvhc fvhc-1">
										<p class="tip fthide">
											即将自动为您播放：
											<span class="j-title">重播</span>
										</p>
										<div class="btns">
											<div class="btn btn-1">
												<span class="icn top cursor" data-action="video-replay"></span>
												<span class="bottom">重播</span>
											</div>
											<div class="btn btn-2">
												<span class="cursor icn top" data-action="video-next">
													<canvas class="j-next next" width="65" height="65"></canvas>
												</span>
												<span class="bottom ftdn cursor" data-action="video-cancel">取消</span>
											</div>
										</div>
									</div>
									
								</div>
								<div class="layer layer-err layer-err-fail ffull">
									<div class="fvhc">
										<p class="err">该VIDEO需付费使用，请在网易云音乐手机客户端购买后观看</p>
									</div>
								</div>
							</div>
							<div class="controls">
								<div class="progress progress-1 fhide">
									<div class="j-out1 out out-1"></div>
									<div class="j-out2 out out-2"></div>
								</div>
								<div class="wrap">
									<div class="j-right right">
										<div class="duration ffl">
											{{video.duration}}
										</div>
										<div class="volume ffl" >
											<span class="j-mute mute cursor" @click.stop="showVoice"></span>
											<div class="sliderbg">
												<div class="j-slider slider" @click.stop="voiceDebug($event)">
													<div class="j-out out" :style="{height:sliderHeight+'%'}">
														<div class="in">
															<span class="dot"></span>
														</div>
													</div>
												</div>
												<i class="arrow"></i>
											</div>
										</div>
										<div class="brs ffl">
											<div class="bridge"></div>
											<div class="current">
												<span class="j-label label">{{jOptions[optionsNums].name}}</span>
											</div>
											<ul class="j-options options">
												<li class="itm" v-for="(items,indexn) in jOptions" :class="{'z-sel':optionsNums == indexn}" >
													<span class="label">{{items.name}}</span>
													<span class="ffull cursor" data-action="video-br" :data-index="indexn" @click.stop="clickDefinition(indexn)"></span>
												</li>
											</ul>
										</div>
										<span class="full ffr cursor" @click.stop="enlargeVideo"></span>
									</div>
									<div class="foh">
										<div class="j-left left">
											<span class="time">{{video.currentTime}}</span>
											<span class="play ffl cursor" @click.stop="play"></span>
										</div>
										<div class="j-progress progresswrap">
											<div class="progress progress-2" @mousemove="playbackMouse($event)" @click.stop="playbackClick($event)">
												<!--点击进度条快进的位置-->
												<div class="j-ht" :style="{left:videoLeft+'px'}">
													<span class="hovertime">{{currentTime}}</span>
													<span class="arrow"></span>
												</div>
												<!--播放过的长度-->
												<div class="j-out1 out out-1" :style="{width:jout1Width+'%'}">
													<div class="in">
														<span class="dot" @mousedown="playbackProgress($event)"></span>
													</div>
												</div>
												<!--缓存长度-->
												<div class="j-out2 out out-2" :style="{width:buffWidth+'%'}">															
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					
		</div>
	</div>
</template>

<script>
	export default {
  name: 'videoSrc',
  props:['videoData'],
  data () {
    return {
    	jOptions:[{name:'1080P',brs:'1080'},{name:'超清',brs:'720'},{name:'高清',brs:'480'},{name:'标准',brs:'240'}],
    	definition:false,
    	optionsNums:0,
    	video:{
    		
    		  // 该字段是视频是否处于播放状态的属性
		        playing: false,
		 		duration:'00:00',//总时长
		        // 视频当前播放时长
		        currentTime: '00:00',
		        // 视频最大播放时长
		        maxTime: 0,
		        minTime: 0,
		        volume:0,
		        step: 0.1,
		        readyState:0,//视频当前的就绪状态
		        zEnd:false,//是否播放完
    	},
    	loading:true,
    	jout1Width:0,
    	clientXStart:243,//进度条开始x坐标
	    clientXEnd:635,
	    currentTime:'00:00',//快进时间
	    videoLeft:-27,
	    clientYStart:483,//音量条开始x坐标
	    clientYEnd:410,
	    buffWidth:0,
	    buffLength:1,
	    vHidden:false,
	    zMute:false,
	    sliderHeight:50,
	    videoUrl:[],
	    videHide:true,//判断视频是否显示
	    videoWidth:590,
	    videoHeight:0,
    }
     
  },
  inject:['reload'],//app.vueҳ���ж����¼���
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		console.log(this.videoData)
		 this.videoHttp(this.videoData.videoId)
		 this.videoHeight = (this.videoWidth/this.videoData.width)*this.videoData.height
		 this.videoData.playTime = this.$Playback(this.videoData.playTime)
		 this.videoData.durationms = this.$formatTime(this.videoData.durationms/1000)
        },
        beforeMount: function () {
//          debugger;
        },
        mounted: function () {
//          debugger;
			
        },
        deactivated: function(){
            alert("keepAliveͣ��");
        },
        activated: function () {
            console.log('component activated');
        },
        beforeDestroy: function () {
            console.group('beforeDestroy ���ǰ״̬===============��');
            
        },
        destroyed: function () {
            console.group('destroyed ������״̬===============��');
            
        },
        directives: {
//			�Զ����ȡ����
			focus: {
			
				update: function (el, {value}) {
				
					if (value) {
					
						el.focus()
						
					
					}
				
				}
			
			}
		
		},
        methods:{
        	clickDefinition(num){
        		this.optionsNums = num
        		
        	},
        	videHideClick(booleans){
        		console.log(booleans)
        		if(booleans){
        			this.videHide = false;
        			this.play();
        		}else{
        			this.videHide = true;
        			this.play();
        		}
        	},
//      	全屏播放
        	enlargeVideo(){
        		if(this.definition){
        			this.definition = false
        		}else{
        			this.definition = true
        		}
        	},
        	mvHttp(){
        		let _this = this;
        		let id = this.$route.query.id;
        		_this.getHttp('/video/detail?id='+id,function(res){
				     console.log(res.data)
				   
				     res.data.playTime =  _this.$Playback(res.data.playTime)
					 res.data.publishTime = _this.$datePublish('Y-m-d',res.data.publishTime)
					_this.videoHttp(res.data.vid)
				     _this.title = res.data.title
				     _this.mvData = res.data
				    
			    })
        	},
        	getHttp(href,callBack){
        		var that = this;
        		this.$http({
		         	method:'get',
		         	url:that.$host+href,
		         	changeOrigin: true,  //是否跨域
		         }).then(function(res){
//		         	console.log(res.data)
		         	callBack(res.data)
		         }).catch(res=>{
		         	console.log('请求失败：'+res);
		         })
        	},
        	videoHttp(id){
        		let _this = this;
        			_this.getHttp('/video/url?id='+id,function(res){
					     console.log(res)
					     _this.$.each(res.urls,function(index,el){
					     	if(el.r == 240){
					     		_this.optionsNums = 3
					     	}else if(el.r == 480){
					     		_this.optionsNums = 2
					     	}else if(el.r == 720){
					     		_this.optionsNums = 1
					     	}else if(el.r == 1080){
					     		_this.optionsNums = 0
					     	}
					     })
					    _this.videoUrl = res.urls
				    })
        	},
        	play(){
        		let _this = this;
        		this.video.zEnd = false;
        		if(_this.video.playing){
        			//暂停
        			_this.$refs.video.pause();
        			_this.video.playing = false;
        		}else{
        			//播放
        			let playPromise = this.$refs.video.play();
        			
        				if (playPromise !== undefined ) {
        					playPromise.then(() => {
        						_this.$refs.video.play();
        						_this.video.currentTime = _this.$refs.video.currentTime;
        						_this.video.playing = true;
        					}).catch((error)=> {
								console.log('Registration failed', ':^(', error);
							})
        				}
        			
        		}
        	},
        	onPause(){
        		
        	},
        	onPlay(){
        		
        	},
        	onTimeupdate(){//当目前的播放位置已更改时
        		
        		this.video.currentTime = this.$formatTime(parseInt(this.$refs.video.currentTime))
        		this.jout1Width = (this.$refs.video.currentTime/this.$refs.video.duration)*100
        		console.log(this.$refs.video.currentTime)
        	
        		setTimeout(function(){
	        			for(var i=0;i<this.buffLength;i++){
		        			if(this.$refs.video.buffered.start(i)-this.$refs.video.currentTime<1){
		        				this.buffWidth = (this.$refs.video.buffered.end(i)/this.$refs.video.duration)*100
		        			}
		        		}
	        		},100)
        	},
        	onLoadedmetadata(){//当浏览器已加载音频/视频的元数据时
        		console.log(this.$refs)
        		let _this = this
        		this.video.duration = this.$formatTime(parseInt(this.$refs.video.duration))
        		this.video.currentTime = this.$formatTime(parseInt(this.$refs.video.currentTime))
        		//首个缓存结束时间
        		setTimeout(function(){
        			_this.buffWidth = (_this.$refs.video.buffered.end(0)/_this.$refs.video.duration)*100
        			_this.buffLength = _this.$refs.video.buffered.length
        		},100)
        		
        		_this.$refs.video.defaultMuted = false
        		console.log(_this.$refs.video.defaultMuted)
        	},
        	//拖拽及点击播放进度
			playbackProgress(event){
				
				var event = event || window.event;
				var _this = this
				
				var drages = event.path[1]
				
				var diffX = event.clientX;
				var numX = event.clientX-_this.clientXStart
				if(typeof drages.setCapture !== 'undefined'){
					drages.setCapture();
				}
				document.onmousemove=function(event){
					var event = event || windw.event;
					var moveX = event.clientX - diffX+numX;
					
					//var moveY = event.clientY - diffY;clientXStart:388,	clientXEnd:888//进度条开始x坐标
					if(moveX < 0){
						moveX = 0;
					}else if(moveX > _this.clientXEnd - _this.clientXStart){
						moveX = _this.clientXEnd - _this.clientXStart
					}else if( moveX == 0){
						moveX = diffX
					}
					
					var widthNum = moveX/(_this.clientXEnd - _this.clientXStart)
					_this.jout1Width = widthNum*100
					_this.$refs.video.currentTime = widthNum * _this.$refs.video.duration
					_this.video.currentTime = _this.$refs.video.currentTime;
	        		
				}
				document.onmouseup=function(event){
					var event = event || windw.event;
					event.path[0].onmousedown = null;
					this.onmousemove = null;
					
					if(typeof drages.releaseCapture != 'undefined'){
						drages.releaseCapture();
					}
				}
			},
			//显示点击进度条快进的时间
			playbackMouse(event){
				
				var event = event || window.event;
				var _this = this
				if(event.path[0].className != 'progress progress-2'){
					var drages = event.path[3].children[0]
				}else{
					var drages = event.path[0].children[0]
				}
				
				console.log(event)
				var diffX = event.clientX;
				console.log(diffX)
				var numX = event.clientX-_this.clientXStart
				if(numX<0){
					numX = 0
				}else if(numX>_this.clientXEnd - _this.clientXStart){
					numX = _this.clientXEnd - _this.clientXStart
				}else if(numX == 0){
					numX = 0
				}
				console.log(numX)
				var widthNum = numX/(_this.clientXEnd - _this.clientXStart)
			_this.videoLeft = numX-27; 
				_this.currentTime = _this.$formatTime(parseInt(widthNum * _this.$refs.video.duration))
				
				
			},
			//点击进度条快进
			playbackClick(event){
				
				var event = event || window.event;
				var _this = this
				
				var diffX = event.clientX;
				var numX = event.clientX-_this.clientXStart
				if(numX<0){
					numX = 0
				}else if(numX>_this.clientXEnd - _this.clientXStart){
					numX = _this.clientXEnd - _this.clientXStart
				}else if(numX == 0){
					numX = diffX
				}
				var widthNum = numX/(_this.clientXEnd - _this.clientXStart)
				_this.jout1Width = widthNum*100
				_this.$refs.video.currentTime = widthNum * _this.$refs.video.duration
				_this.video.currentTime = _this.$refs.video.currentTime;
			},
			 //是否静音
		   showVoice(){
		   		if(this.zMute){
		   			console.log(this.zMute)
		   			this.zMute = false
		   			this.$refs.video.muted=false
		   			this.sliderHeight = 100
		   		}else{
		   			this.zMute = true
		   			this.$refs.video.muted=true
		   			this.sliderHeight = 0
		   		}
		   },
		   //声音大小调试
		  voiceDebug(event){
		  	console.log(event)
		  	var topNum = event.clientY - this.clientYEnd;//top距离
		  	var  heigthNum = this.clientYStart - this.clientYEnd -topNum;
		  	if(heigthNum  > this.clientYStart - this.clientYEnd){
		  		topNum = 0;
		  		heigthNum = this.clientYStart - this.clientYEnd;
		  	}else if(heigthNum <= 0){
		  		topNum = this.clientYStart - this.clientYEnd;
		  		heigthNum =  0;
		  	}
//		  	if(event.path[0].className != 'j-slider slider'){
//				var drages = event.path[1].children[0]
//			}else{
//				var drages = event.path[0].children[0]
//			}
//		  	this.$(drages).css({height:heigthNum})
		  	
		  	var valumes = heigthNum / (this.clientYStart - this.clientYEnd)
		  	this.sliderHeight = valumes*100
		  	this.$refs.video.volume = valumes
			this.video.volume = this.$refs.video.volume;
		  	
		  },
        	onError(){//当在音频/视频加载期间发生错误时
        		
        	},
        	onProgress(){//当浏览器正在下载音频/视频时
        		this.loading = false;
        		
        	},
       		//播放结束
        	ended(){
        		console.log()
        		this.video.zEnd = true;
        		this.video.playing = false;
        	}
        },
         //����
        watch: {
            '$route' (to, from) {

                console.log(to)
                console.log(from)
                //���ж���Ҫ�������������֮��������������ҳ��Ҳ�����������Լ��˱����������������жϣ����������ҳ��������ݼ��ص�����
                if(this.$route.query.id){
                    //this.reload()
                }

            }
        }
}
</script>

<style  lang="less">
	#video-src{
		text-align: left;
		 .src {
		    display: block;
		    position: relative;
		    padding: 10px;
		    margin: 4px 0 5px;
		}
		 .src-video {
		    padding: 0;
		    background: none !important;
		    .video {
			    width: 338px;
			    height: 189px;
			     .info {
				    z-index: 10;
				    left: 0;
				    top: 0;
				    right: 0;
				    bottom: 0;
				    box-sizing: border-box;
				    color: #fff;
				    cursor: pointer;
				    background: rgba(0,0,0,0.1);
				}
			}
			.tit {
			    width: 100%;
			    box-sizing: border-box;
			    font-size: 12px;
			    line-height: 15px;
			    padding: 10px;
			    height: 100px;
			    p {
				    max-height: 30px;
				}
			}
			.bottom {
			    position: absolute;
			    left: 0;
			    right: 0;
			    bottom: 0;
			    padding: 33px 10px 10px;
			    height: 10px;
			    line-height: 10px;
			    font-size: 14px;
			}
			.ply {
			    position: absolute;
			    top: 50%;
			    left: 50%;
			    margin: -20px 0 0 -20px;
			    opacity: 0.8;
			    filter: Alpha(opacity=80);
			}
			.fold {
			    margin: 7px 0 10px;
			     .btn {
			     	cursor: pointer;
			     	i {
					    margin: 1px 3px 0 0;
					}
					.u-dicn-35 {
					    margin-right: 6px;
					}
			     }
			     .sep {
				    display: inline-block;
				    position: relative;
				    top: 1px;
				    width: 1px;
				    height: 13px;
				    margin: 0 8px;
				    background: #ddd;
				}
				.inf {
				    margin-left: 60px;
				}
				 .sub {
				    margin-left: 5px;
				}
			}
			.mv-full {
			    width: auto;
			    height: auto;
			}
		}
		 .src,  .card,  .hotrecmt .bar,  .showpic {
		    background: #f5f5f5;
		}
		.u-dicn-17 {
		    background: url('../../assets/frd_cover_mask.png') 0 -184px repeat-x;
		}
		 .src-video .h4,  .src-video .h4 a {
		    color: rgba(255,255,255,0.5);
		}
		.u-dicn-49 {
		    background: url('../../assets/frd_cover_mask.png') 0 -285px repeat-x;
		}
		.u-dicn-42 {
		    width: 40px;
		    height: 40px;
		    background-position: 0 -510px;
		}
		.u-dicn-18 {
		    width: 13px;
		    height: 13px;
		    background-position: -108px -19px;
		}
		.u-dicn-35 {
		    width: 12px;
		    height: 12px;
		    background-position: 0 -429px;
		}
		/*视频样式*/
		 .src-video .mv-full {
		    width: auto;
		    height: auto;
		}
		.m-ctvideo {
		    position: relative;
		    display: block;
		    width: 100%;
		    height: 100%;
		    font-size: 12px;
		    line-height: 1.42857;
		    color: #fff;
		    overflow: hidden;
		    .player {
			    position: relative;
			    width: 100%;
			    height: 100%;
			    box-sizing: border-box;
			     .media {
				    display: block;
				    width: 100%;
				    height: 100%;
				    background: #000;
				}
				 .play {
				 	.icn {
					    display: block;
					    position: absolute;
					    top: 50%;
					    left: 50%;
					    width: 74px;
					    height: 74px;
					    margin-left: -37px;
					    margin-top: -37px;
					    background-position: center center;
					    background-repeat: no-repeat;
					    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAwFBMVEUAAAATExMlJSUHBweRkZH///////9HcEz09PT///////////////8cHBz///+0tLT////////////b29vy8vLv7+////////98fHz///9AQEA3Nzf////Pz8////9lZWXDw8P////////////e3t6bm5vY2Njw8PCxsbH///+5ublgYGBdXV3////////////k5ORdXV0wMDDt7e2mpqb////h4eF4eHhCQkKNjY3JyclPT0/U1NTQ0NDc3Nzg4ODNvLiUAAAAQHRSTlNmaGlnc2F+APCABx95aWR3DVMKe+1+WitxSmtrA3pxb3g+Imh8oNDrr1d4b244OiXbg3Pnp3fYjnmZwn7Lx9R8wCePZgAAAi9JREFUSMell9da3DAQhcdVc9zLFrb3Ql3CsoEEkrz/W+WCJWAsW3J8Lm39n+yZ0dEMCam8wyKNpgEQTKN0cfDkq0jyLLmLXBTkRneJFuz3XABzezY0DSLDHM7sOQC35yth3wEQ31hUkHUTA3D8WjhJgdw2SCLDzoE0qYb7Abo2VcruIuhXwOMBEJtUIzMGBmMZ7DnABSl0AThZGc5W+DMipUY5VtlX2FthYpKGwglWXhEeO5iERJq0My7AA6xN0pS5xuAz3AdGpK0R0P+Ak0Ad52LMg+QffImYGinG5Tu8RDdsBoddLM+wA5sayobzBvvIqbFy+EKQED3Zxpvd9ql+654QJDIXkjN4z8w/H6phA24mSNziSvJyx8x8/FFNX+FWkHBwLXnHb3p9roKv4QjyXFjVMO82lhy24Hp0wJxqYObti5ye40ALeZI/YN49WvJ4LyjFTAEzf/8mWTFDShGGSpg7+3I2h4hoClMNM9+XNjcxpQCGDsy7TalMAgJIC2bef1kCNICPpURrf3Zp5xAn3YBx51ESMK1UyVI9RKRVJNzZW9IiUZcn8++XivJUHoyq2p7joDqSzNvn6iNZbwZ83NSZQYUNndlfD/U2JDfAdw+z6g1Qbr0q9zxbr9z0N8fXJx3Tb3XdtLvoWl2x7S73Vm2FEAOstX87zIsNTbtWSmRNmrhM0j6u/7d9bNe4tmuZ2zXrLccE1YCybDQaWVaj0ajlUPZpHDy57qluHPwLCJFHIPLGbYAAAAAASUVORK5CYII=');
					}
				 	.icn:hover {
					    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABKCAMAAAArDjJDAAABKVBMVEU7Ozv///////9JSUn///////8+Pj5HcEz09PT///88PDz///9DQ0P///////////////////9BQUH///////////////////////9OTk7///////9VVVX///9dXV3///////////////////91dXVgYGBSUlJubm7///////////9TU1NmZmZpaWmnp6f///9ZWVn////////////////////Dw8P////i4uJycnL///////9GRkb////y8vL////////Ozs5qamry8vKWlpb///9jY2OFhYXGxsbo6Ojv7+/////////Z2dn///+ZmZl6enrh4eGJiYnc3Nx/f3+BgYH////////AwMCysrK5ubn///////+kpKTW1taSkpKnp6eHh4fV1dWbfFtZAAAAY3RSTlOFAgOJAQSFAPOZhQaICBkjDgyGHgkxFRsrixATjjKQEhcuJSibko2XCgsgh5SWkIGPOBFjTZSSU5aZdnqIhPE8cpSJmI1viYzK5u6OPpWHrZ3fpNuLjD1/xLzBjD+Plam0jNY27mMaAAAFIUlEQVRYw62Y+1faWBDHL1BoRgQSIBCAQAKCvJWXIIIc8dWqdbfbh1vbutv9//+InZsA5HFjomV+8nj0c74zczMv8tbF3qzN7S/JsxCfz+/3BzXDH3y+Z4HEkeOjkHA4EklqFomEw2EE+hxpxIHjQ0wkWRcEns9qxvO8UE8iL+hzoBG2IOTUBD5bTKUUJaqboqSKWV6oRVAbE2ZH6aA630sp0XSiEVtbI5GOKqkeX9dhriiUpIGKqWiiUSpLqiqKMpooqqpULiEuVdRgdmGEIamGoDRyVLk76E9mt0OA4e1s0h90ZRVpFFYLh23CiE1SUuhRkCTe9Q/AYgf9H6JEYT0haRNGTCRNUi6aKEny4AQA4Kzza9GcEjJtLn51zuhvTgayVEpEcygs6DexiNm5iJBNpWOSOKCCjj6HiMlCn4+otIEoxdKprBAxR59YSEUlUVK/TgDGnQBhWKAzBph8VUsJpWhhEaN3SSGXbpTF0RDOOzvEwXY65zAcieVGOickjT5uUFRTDp2TL9G1JnG2nSa6edlFJ3NUlw2FudNJ3QeAC+JiFxixFWvtIlmTwkIRSfMZjK+Iq12N4X6OrKIQXrNWKH+4llUaUncGH5rEgzU/wKwrNZRsLew3oVBUkk8lyvKDR5LGepDLiRSfXMkia/dy6ZJ4CWMTaYeaE2sMl2IJw7Vykazc60Vj6gjgysgJLY2NuwIYqbFob+UiWWYP3ZPuhsbcISge30WLxx1gFzC8k9DFZRaJLqpeRPdO4MhM2t0NUEMaG3YEJ+hisa7LoihNVEMawHnTiIojKFNFywSmCGOwmucwkBqaLB31xqeJkg+gY/x0kZTJHxbQDhHGFvYTDmRNFvWQolaixsQkCkmFSqvdblUQFtBhVtZ4JUtH+YKYPhqpjgm1G6gWWo+nH/893m9XCvmMFjKrsA6NFiaRekho0AV8nXMAY1XZiU8z+Ur7Pcdx//21t9/aeGmuOQBzfKcCDTxFRXilofaN6aOoQPWwdXyKKO7m295xu8UWdgR9taHwER0VTGajNOhfTAUTUYX2HqfbJxTWrrCEfaGBj2aTQYryBTF/5S6AqfrSUFXWKO7m0UFYCKBbxhxisBBFQyWN4IxYUPnC/hrFcR//MQgzsM5gJNFgURSNOg1Vx4aqGFHc6d9/roTFDT52aLBo3N8SLeoxdQLXLiiOe/8HprJiYV3DRI1pcV+ixBksXFHc6TsUpunaoBYwE1coLYHiLTTdUVTYcatQpbLW3yHcinoKlyh5CFMvKO70cb9ymJluUAEYymYUAPGE4rh3LfwiDcECeDXqRvNwjYrbUF4dtKnKwNAcK69hx9dliZUx7C94DKwMGh+D9yfKfFeGJ+r5w8HPkPXaDR/OM5+zp2/Q+Dk7FhlPlcFUZBxKn8d6ZSp97IJsr6Ls8m4uyA5twlLb2U3H3CYcmld810vHMTcvp5aq9cFvN582fZDRoC0tddPof5q683TTnfNV9thgbfTs8UObGap0ZjjMO80MGev44TQUrSaZjOMkYx+KmKOabb7yNKqxB0g6Pmpjn9PUxxogHcZal1mUPdZuhu0DeLKNyA4D8hNmzz5sb1aA+b3XFeCJrhOMFcCwmNz/7mKyxXXJsMR13ZY44rLE2VZLZ5LrarnFhXeba7jDceB60QyEQoHm4voFxwHryeLHb5wsHA4p3+kh5fsLDymm8056fd4R6XXnxeedbR6dtnoKsx3o+OV97hUHuq2eDbd7zHzFifV/0Ogo7eAW+MoAAAAASUVORK5CYII=");
					}
				 }
				.loading {
				    display: none;
				    position: absolute;
				    top: 50%;
				    left: 50%;
				    width: 25px;
				    height: 25px;
				    margin-top: -12px;
				    margin-left: -12px;
				    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTJGMTY4N0Q4OUNEMTFFNTg3NjdCRkQ0MUY1NDc0MjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTJGMTY4N0U4OUNEMTFFNTg3NjdCRkQ0MUY1NDc0MjMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMkYxNjg3Qjg5Q0QxMUU1ODc2N0JGRDQxRjU0NzQyMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMkYxNjg3Qzg5Q0QxMUU1ODc2N0JGRDQxRjU0NzQyMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrcE36MAAAI5SURBVHjarJZNaxRBEIZneia7WY35UC+zOZhD8ORpFf+AIbkHRMGr+KcUbx6861EhEAi4IoIecshBidkQFE2McdyvGd9a3oq1LZtMZlPwBHY3009XdXf1hHmeBwVjFtwFCeiAA7ANNsEn0Bv1YHgGyTK4CZwh5G9HYB28AX3/QRcUjzZnK4NkRGd4EayAR+DqqZm8rddD+/lWq6X/UAVL4AoHlfJFJiuNFDwDX/6TcPCIs7Pm3Ihs1MAiuA3qnkiyfgK++eWqUBKZGQYjBDrjD+ApeMnPXZYzBqs6hmMWFUomDBkEWYG1kkm8A8/Bb2YhsjmZ40DCMl1izVXWKyiw8Rm8YkZ/uM0bkpVjbWuUCBEEnaBcfAQ7FKWs1IL8mQaThjQoH1q6I5ZOSGSBZlgi3ffjSCRalMTMZEolISVpibXwQxb9O8+S7NKBbdqc4l5wPnHIiUsmUcxSOYryc5J0uR4ybu448AWmdxlbemJMgWNVdOEP5ItflKioPqakZs5KqpJdT9Lwm+QZY5IC5afjhZOZQzkPbpQU6FFok8GhdNiyPR6gCmchojvI5lqJtYjZTjqUHOrCD3ok+MHGWGXp7kFUtHR6p3QNKhu6T+RGe0iJRsYTvAG2RvS00FzD9vPxkRi6GSGSnfWAG8CKMj60z5bxFbyGtG0G9nvYP2szSfyZSZu5z7cS+5CV9fnSsFZ0sfyQV53H4AUXLjAtwrEfxV5ZT4x4xPcZN8N7cJ0kpmPvgWZRyV8BBgA25MVVFgGwPAAAAABJRU5ErkJggg==') no-repeat;
				    animation: 2s linear infinite forwards video-loading-spin;
				}
				.fast {
				    display: none;
				    position: absolute;
				    top: 50%;
				    left: 50%;
				    width: 48px;
				    height: 33px;
				    margin-left: -24px;
				    margin-top: -16px;
				    background-repeat: no-repeat;
				}
				.opbar {
				    display: none;
				    position: absolute;
				    top: 0;
				    left: 0;
				    width: 100%;
				    .ops {
					    height: 50px;
					}
					.itm {
					    float: left;
					    position: relative;
					    width: 61px;
					    height: 16px;
					    margin-top: 17px;
					    padding: 0;
					    border: none;
					    border-left: 1px solid rgba(255, 255, 255, 0.2);
					    text-align: center;
					}
					.itm:first-child {
					    border-left: none;
					}
					.icn {
					    position: relative;
					    top: -11px;
					    display: inline-block;
					    width: 36px;
					    height: 36px;
					    background-repeat: no-repeat;
					    background-position: center center;
					}
					 .icn-like {
					    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABVklEQVQ4ja2Uv0oDQRCHfxciBDEB1ZewUisrbSRY2gppbMTCwso+YGmnIPgIFoKdjbVG9QGiwUewMFFUc/rZzCXLcYv3b+CY29mZb2d3djYAlFGWJc1Lupb05PUC0n4BcMpYQqDt888C3jZgHzgDhjbeKgKuAD0DtczWsnGvCHjDgVSco3k1eyMeU0lRrKqktv0fSfqNyiNpYP9TeYp3aFk9AzXHPgP8AB9ANctRzAHHBg2B1dj8js1d+s54EbgD3kmWT2AzIfgx5jcArqIEBNx6gN/AObDg2VHHEzcEmnIyrTtBkWS559PAvsV1Ahj1dODWNMGWRuqS+pK+0ly3LFIz/VY2eN30Q9ngXdMXvkLlKd6Kc+0aZWZ8YPpEUr+sjKNH6gWYxRqkKHgC6Jr/XmR3G2QyB7jO+JHq2iIjsK+ls0gINN1FBSwB9/gfof+AN8Aasd38AbkxaSKNmBldAAAAAElFTkSuQmCC");
					}
					.icn-like:hover {
					    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAqFBMVEX///////////////////////////9HcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9jRADzAAAAN3RSTlMzBSIdJQITAAEGBw0QBA8IChUnGiku1AsX/Ss2fT1DH4f3MPXialmiZfnh8bxylefGUc1franJDxjlOQAAAapJREFUKM9tk9l2qzAMRYWxHRMzg5khaYZmaG97Z/3/n1VOYQXSngfA7GXJ0pFhtZSyui9hCYXjrT1HqO8wwUhL6esoUN9g4ZTS5ZxlMp74DKugTPjuT/fLMBmN8WdYRJLBX8T6bbfx1+IBK0e7uy3uX2vsmqp8xCJK0vaAHXR4gE3oTFgpEVA9JYX+gYcWYI89H7MDlePF2pcyY7u2wC0AvONg3NCzHJRY68RlPG0ATvhOm4f60kKehbZ6UJ7OUrAa/mF9pvcWf9KzcX2KDyJO0ufiCa0uHTQNXOlr//9s4ysItAvFDdavz8A3zIyrY17FAhyfwRP2AIgAvJIJMzbRGxbg6gA8yW/EPoyro5JKyAF6vAALnQXOk+hmGp11wBdg/hKncq2sq5JBR8d/DM6lZ7u7pl/UIJOV4itWVIs5475PqbHL3FXpeZGuUviNJ4rtqAUGVkmZZJyseRnsOVdLDDnnuYH2StaQp9TzRVs+1Z/w2qZ282rW1Jnqo8koM+G5JRMsjmactpmhM+XuNC3TOMzE3Cocb8J9mO7ydezd5/xzFGdyAjFdww8Ldzhx2yOCAgAAAABJRU5ErkJggg==");
					}
					.icn-sub {
					    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAATCAYAAACQjC21AAAAtElEQVQ4jc2UQQrCMBBFJyJdewlPYcDDudGdnsJDuLTH8ArNxgM8F0201Mb+GAQfDKXJ8DIZwhjQACeg450bsAVMDQOOE6Ihd2BdIkyV+dGmA85x71IiTEwlrDKtGBPo29bMCQ3YCcLEXhEq4aOjcwDW46wOzMwWYvI1xixqhXKOWqHMJ2EbT2Wwlv6z1/+2wuzV/7+HSzGvNfGd/uRhh7jgK2Sb+A3KPCzhYLwmdqgQPcfXAx4RU8sIXQekAAAAAElFTkSuQmCC");
					}
					.icn-sub:hover {
					    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAbCAMAAABY1h8eAAAAYFBMVEX///////////////////////////////9HcEz////////////////////////////////////////////////////////////////////////////////////////////NZf7jAAAAH3RSTlMzKQIEJiMuEgAGJQEPCxoDHwjyFtCnCTljMJ+541HJBnOsSgAAARZJREFUKM+VkumSgyAQhIdbkEvRaLIH7/+WO6IKSba2arvKP3xlD/Q0dF3X08C01owF2netABEbnFUoe9Ohf4ZUO+WjMEbEZG+spdAzl4SEIhKVG/Q2YR8AdFBimceM+lzB+FQGuIEhhuC8nPOu8Qsk4dyY6JXTtANmI4x53Vw/8jcckiI51oNWAnIuJ8uYT4t5EWqgCE2BRhB45EsP6V1AyDdIvPLkNIU1jxAtOyFPNvFjHn54IpR+/nOaAIjgBZoGRm/KGULMZPOqUBqyuyE1r/BO5LTfc5Lk/h/4p60UGMIvF9oT4ht8f8qRrbxCryE0W4G3+Np95tfgmyZUnStrO1R1LPtqH79Ua9L0tuosWG18o6OaP4oqIPiu4pG3AAAAAElFTkSuQmCC");
					}
					.icn-share {
					    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAYAAABvVQZ0AAAA5ElEQVQ4ja3UPUrEQBgG4G8VUmznGexEsF/XU1ja2IqXsLURPUF6b2BrROzFzitssLESeSw2yhJm3EnIC2FChu9hMn+BCndYSadBlDyB2wwC8JQorDFPYSvAsnQEgFcc9DGAUigA8InzoViFSzT4SExFjXkJdoT3BNDP/TZsX36VB4/sEQAvOMUeAIrnbAH4wkWvD95wuPn9P+wG3zhL9NUy+yyHPeMq8/vZE5DDHrA7FbYYAiFmEOvMYlyarj2ZAvur3xkJJDM51nbvyxH1x127Nmy/HEtyjQhUuEM7Amm72grxA8cG1pzcIdwBAAAAAElFTkSuQmCC");
					}
					 .icn-share:hover {
					    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAMAAACnDzTfAAAAgVBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8KTOKkAAAAKnRSTlMAIwQgEiYMMwYBAhAcGRYpDiUJCCwvMfIu0KY8VLI4f9/3Y2GIu8aZ03UVRvQoAAABZUlEQVQoz2WSaXuDIBCEhUUWkUOjxiNn0/Ti///ALkSNaeebvM/u4DBZlmWF1lyRONdFkW1VaN7ISpBKueOa8JNrJYUFVucMjJBNnNczLbh0rMOkFlxJkg1/QN0Idp76EDV6MAZonHYnJu0whYfGvffd6TAwJ1XcyyvAPtxwVbgesbYEs0wJhiHQ2TDMLLxdMHeSPJWoE6uBbnS+j8n5dIBSRZZH1oJheLzOxuGDiUYvzBvwx35Bf+aYxzGE75/Di19ine/eQ7j/vWdi2OIULoh7PB06Zqv0fwsbcPxCygUoWMp1y/Zt+7nPbVmVzoCxItqtfjU7Aq3iu9Iyn4PYPf1a40TaxCvTjmNrJN8wUVZyp5R0KScoE3tkxoxzNCosRUffTKhN1j5P8iluZHHu3xsh3kKPUPHXt101DVbq107M6qdzeoaXLi2KpUh1Wjs4q67BihT1truLKirhWtG584tiueP5LwkUKf4Cxu5+AAAAAElFTkSuQmCC");
					}
					.tt {
					    position: relative;
					    width: auto;
					    height: 50px;
					    padding-left: 20px;
					    margin-right: 200px;
					    line-height: 50px;
					    font-size: 18px;
					    color: #fff;
					    font-weight: normal;
					}
				}
				.layer {
				    display: none;
				    height: auto;
				    background: rgba(0, 0, 0, 0.7);
				}
				.layer-err {
					.err {
					    font-size: 18px;
					    color: #a5a7a8;
					}
					.btnwrap {
					    display: block;
					    width: 140px;
					    height: 40px;
					    line-height: 36px;
					    margin-top: 27px;
					    box-sizing: border-box;
					    border: 2px solid rgba(255, 255, 255, 0.4);
					    border-radius: 20px;
					    font-size: 14px;
					    color: #a5a7a8;
					}
					.btnwrap:hover {
					    color: #fff;
					}
				}
				.layer-end {
					.btn {
					    display: inline-block;
					    .icn {
						    position: relative;
						    display: block;
						    background-repeat: no-repeat;
						    background-position: center center;
						}
						.bottom {
						    position: static;
						    display: inline-block;
						    width: auto;
						    height: 26px;
						    padding: 0 10px;
						    margin-top: 8px;
						    line-height: 26px;
						    font-size: 14px;
						    color: #a5a7a8;
						}
					}
					.btn-1 {
						.icn {
						    width: 74px;
						    height: 74px;
						    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAA9lBMVEUAAAD///////8ODg7///8eHh7///9HcEz///+EhITU1NQJCQn///////////////+rq6t3d3cXFxf///////////9ubm43NzdRUVEuLi7///9aWlr///+4uLj////k5OT4+PiBgYH+/v60tLT///++vr7w8PDz8/Onp6e4uLj39/eqqqr///9OTk6IiIjw8PDr6+vExMT////////ExMRra2v7+/s2NjYUFBT////Hx8f///////////+goKApKSnt7e3m5ubo6OjJyckiIiKOjo7////IyMjS0tLm5ube3t7AwMC9vb1ycnLg4OCSkpL///////9m8kqvAAAAUXRSTlNmBhlmTmYJAGZmZmhlQmBHZo1mUSL+ZmZmZi1mW2Yc3PWT/LBMZmbvZrTzqjB9lurkvgJTZoj6dWsPvzw7YaRx593gwm+ZA2bKZtW5uIzYmzKo0XWdAAAC7UlEQVRIx62X53baQBCFRyCJi0QvoYMpxxgBBmyMfVxwL3GL5/1fJsgmwK4ko0S5PwDt0cfuzs7MzlDEVUp9EM9WE0Cimo0P6or7W+QyppfVGATF1LLuCw4lbbIWrRS0MFFYK1SiNZtPhrbCIRXAXpEkFfcAqKFvYT0OGNEwuSgcNYC47g3nEtiNkqeiu0jkPOCDcyCl0TfSUsD5gxusdIAftEU/gI7ihPUsjBJtVcnAoS7DShaPGvlQZoqsIsIHHTxmyJcyj+gcCPA5DI18SjNwtgnngBL5VgnIrWE9sd3Oos0T+gqOI0V/pT0k/8Ah7K433Gh8fZvNyXW31bJuJk3TabSfqC9hFRs+yWx/3rW7vJLVu3N4KtQvOASDJPh+gV71msemeZxujxf4L5k2EPqEk5sT27A5Yb5Or4eO3plvTXnqpA3rMYQF2Hzi2Vx8dT7jJ5EOI6Yv4LJoauYJ77zJqzyy+FQcSaG8gFUURTjfSjsP52jG4r6LUCOkxEAizH23o52zdSkMIKZQHTUJvjFdHeOde8JzDXUaICrPvFRDWjjvnIj2HlAcFeGdhhdMY97ffKwgTioKPh26LRq8gCxV4TeQ38S1aKhSAmGf8DFboptcEOA3Dk1uiWeFYHCgZUsGG54OveC002DSUfX51gvu8UQ+KslJhmyZHvCYm7KTyO4p+dHmqsW/td1TDow5j92nvua2IzDkkDwZSdGzMkb3zhGScjKgdD7vsvB0Sxr9TAZyGrIDYNZ0sDv84paGpAS40Cm32uK++y1+IrcEKKXez7nzPL5f480bzr+Sa+qVkv7XKkfM3dv74eXlcP/F/t30SvridbO0eX+0zkfd/onndSNedOuc1Xu+sqzR86tLIt646AJdscEu90BlRSRyBiPjl81IBY1dSk39llJTuZSK6IeY+i3iViXgunw8/Pfy0X/hqipuJfODr5L57OH/F+sB24RgDUrA1ihgU7ZsBz8W7eAFcLFoBz+82sHfML5y5iCTg2MAAAAASUVORK5CYII=");
						}
						.icn:hover {
						    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABKCAMAAAArDjJDAAAAolBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////89O+wrAAAANXRSTlMAF5YdCBsOAgEEBQsTERQGJSEZCSMfDCcHECQrLzKVKXF9NkFij1tOgnZpRu+Izaj649mfuExOrv8AAAeESURBVFjDrVjXdqNKEFwNAlsIECBEDiIoJ4fL///are5BwVby7vG82EeCUnd1dZo/f56c19P58+8Hb7/QGfDhf/8JkGEG+ijs98d8+v1wpA8Y7m9xANMfD31f07QIB398fzjuM9yP0RgIOL4WmYZl9bpjWYYRaT7Qfgx2BIoMq+eqqnI+qtuzjOgI9hOTADTUTKunKhPH8eLY5hPHnudMFLVnmdqQwJ4ZBpP0cOwT0MSJ7XQzn5a7WZ7PduV0vknt2JkQmD8O9ceGsUngiIA8O5uXuaCT48h/ynllewQGzh4aRkjhWDMZqF7R66tmUVdpEKRVvWhWhLaqGczUxuF9LHIOLFmu4tibEq9NF0kQ2B44AmeebQfJYoqPy43tKK4Fxu45yUg+THLiDG8smwwwzmSidgdB8Owga5b4jSx2YJh/BwvedUj2YiZmTREQxSrpCYKySF8qhSIoGny9sI9YN3zskBQvWeNnKwBx4CNSOR2IngUCsApGrxNP6bCukQaMFKdgaR4wG6ZGqRKGI5wwpDSC3IjJYA7G0pixBt+xKHZDQsqWYlcHMkY+p9zpILfHpF1V8YJ6KZYZYQ3D71ivL6Ox1lO9FI9UgQeTohOQzqdDo0QAn0FVimXqqT1tPPoKBaLGmqU6SXlEMv1hX3qGAjMcUpUZEZ4OCUd40q6Wokwc1dLGX+gi93zTdey12HVIke9TlQI9mslHO/qrh0ONsXZibTug64uL0j0lXghRE1LPMEyKHVeZnov6cC4KOrDYg6AWYgG6vrjI0cOX2QyxQ+h61qlKQZmkdBI8aSOiPCYnGWsuZpmjGpdRhFGI3sSeiilsYiAuMJQvsR0UCZ0g8KBKgwqMLrG8AC/YSi+6MAtG0TcbMavwjWUaCNF+XzBEuj7st+3b9uOwToMuXYAVjiNSzizfgHky68wUGVWKJsAXZmT0FLttM5xabNvT2YoK7jMW+OIwNaK0Jz3zZNYrM+XVYlnEigW2DaiCoVYAev9cb7KqXucfAFsVUuLgix0JlnktzZJQ0FQEo1ZklGsi2yzVzgBVHdp2v87SNEnI2bTZt+0hsVni+kDS24gVs6W/dP75sCPLBTIBihv7lhIAqvqvfdtVWZYUVLJQX5J0+db+l8j4d2alIucgSg9fX/ChEs/FCkyZwz5BFYA6tNsGTqYFUpvKlWMX6XzbHgqOP5vlOgjiPIbk+xJqwP6VYgEGEdiwg2rf1hmMSvEDPapYqD9BMn9r8Yv02EAnVdsLJj4aM1kvOsGnuUg8EBjqo6GhkoPtDDZVGTlkUs2izAvSZbutYiYauQYPE5GnYHjIZEmqNp1/I7Qck2n/qEgOgFKpjIecLV6R7lvBZrGHAF+JjSSLoBh9LhpWyIDjSWI4nj0ehD/kkKXYSdNuM4/eHcjAN2LO3rycWJ+CKoQGuiWVKfb+DOXKfoDfMHtw8aNFtoDoAXKEyZpS4Il3gkIOlKIGuBbiFSqnDkJP4UsoKWWpfCXzYVbeHuChNgZZGiu7JHkw1IAjsROVtJMLDhiOg6CAohzuniOaXSg+4Llp9wWIBlnMTCV25A6FkLWg2DMEAlCQGhyhHkal4ThthFwo6UnXKep2i1gT1IgqU5rPWO9nqDwPOtUyFMqMyk2Qm4XsnK9EjgPJvRHUkKAQ+iDP70ONGMp1qQvKQU+OZkyFU1TPoC4cRO1GxUIJNjS/fzF/dg5uHjn4hXbZWqvPmiYMOfm8HrsS076+T/t3MQwogMv2wFUuvOwAUgzivhiuJEpQ8KLwurL9epxOxsjVAhJdk0TDa4l+SxydC70SQ9PAsjpJ0dDM/c2Gf9v0TuJ8T2fZyOJl+5EVHmfyiFr86JzO+f10/lpkqHjgkfS9/UyBBa0PZZuGbIG0e1RkLkofRUKXhgdN205TdAXXMsyIurSrAGn91k7vlz7mXUVBnlKXQMHCz8HjIm/fpmlC1djFkQV5vW0/HxXkU5tIiRt6iGiJEzQcQU0ipjYd20WSzZ60Cdm8FGpeFEM2a0i9F+Wk/VhlCfUual5rdMJPal7RvebVtVSnzpdBZ5acSuOieUdLPawWdb2YftL/6yct9aLR29RTww4Lkc527+fK/D7LnjX6P91MtMlnVXw0v08dZhKjXYn9+3b7vv9sEho/MBcx0u3xg80itngoopGQ5rE+1wea+nmiKS6GotOAdT0U8ahmHEe1I1ZIQ2e3yf14VJNT7XGAZCy8IPdLLoJ0uBDSVvlwgOzGWjBPY61NWMSXHNRp7TVpMkVBDb+MtctbY+3lsF1mdkeuLsf+40Yfdh/05bCdlTeH7S8rQFkF3LGGx1Xi71aAq8WEN5zOI7quuFxM3MeLyfd1iQbY2+sS7YsP16WrJY62Wvd6iXNpF36yxF2tliRJRfm2Wiok2aer5XnhnWDhzbHwprcW3hQLb/5k4T2v4T1UuZruBW6v4XlZox72Hq3hl5cDBHb/coBy6PHlwPnKwqC7D7u6fWVB9x/GsyuL80VKJBfuWxcpp6x+esNDhun9biy6vt5R5Y0MyuhP7p1+7dLpV6/CfvOC7levDX/3MvMfrlj/B/zdHAlIsLpXAAAAAElFTkSuQmCC");
						}
					}
				}
				.layer-end-next {
					.tip {
					    width: 80%;
					    margin: 0 auto;
					    font-size: 14px;
					    color: rgba(255, 255, 255, 0.8);
					}
					.btns {
					    margin-top: 43px;
					}
					 .btn-2 {
					    margin-left: 68px;
					    .icn {
						    width: 73px;
						    height: 73px;
						    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA9CAMAAAApvJHbAAAArlBMVEVHcEz///90dHQJCQn///8FBQX///8AAAD///////////////8dHR0QEBD///////////////////8DAwOKior///9kZGSoqKhCQkI4ODj///9ZWVklJSVOTk7KysoUFBQuLi78/Pzv7+/n5+cuLi6Pj4+3t7cYGBh0dHROTk7Q0ND5+fne3t5ERET09PQFBQVhYWHExMTa2tr+/v6jo6Ovr6/g4ODf39+FhYX///8ZgEQzAAAAOXRSTlMAFStcGGELZhoCFwFMVhAFEwgSZCcELyI5PQ4yRzYea0L66d9ymrNPjXzI9dZ58WeEvdH+pq3Y15VU14HQAAACgElEQVRIx6WX13qjMBBGR0JCP00WNgYbl3iT7GZLtle9/4vtBXY+20gg4rnmMFVTiAYkSZKEXiHLWBsBAIBgOp5NQGdt2oH7ptkff6EDf1AyANVqW0illFJKFvmKA0jjLIjl60JdSbTmgIhH3DUA3yqn5DXAhuyPgcrDKqVUzoHWZ342B3ZqUFaAcecwYWhyNSJFhdRlfZKCR2pU5AZi5tJcSxUiuz6eMdQLpQLx9Mp3DS5VqGxgsstU7aNgWMkK7bnTQK4mSAGcuT4fy3M/7+zF9hKNnEYrjpeaZzhMhNUTRHZSzdVkqU/KjVP1n/u3Q3SOtHuVgKtOrLU/Pg96Puty7Qy4tda+eXfnpdfQneFPPtra+/c+OoLoKkX5aWs/PnrwCjOiEvUgbT/9+uqpmJioxXqYtvbhmzvqmkh7SvyMtj+/P7qKnREZFKO0tV/6yZcQRCmiANravx+uvwCIABlE95O/R0KehPVpax8uv2hupsVNlodG7dkZtdsyprENqJY7T7XEQZXqKPUt9A2vZIeYKHO3lvEX2mBJRMb9TDqH/d2h6BpbjI23M/2+GxgI7XEMyVd0xeo4jObOqD/f/xvqyFuw0zSopk8DjpJO42A1Fd4ehwERzYBoIl29qCbS7rAPTWBzNv3FNNtzYHm+ncLz0txjpMHlxtqiCXZdcsx7W2YVuD8sarDrbTMzqIK0y7q3rhFRYtAE+B5xpEvXimwwHvl83zf7iLfAZtB6uQO0974oBbDyr6uHBhg6LhINVGtn8BcHDsyXI9eUAbDJrw142gFgZcA1NgeAep0XkVwsZFTkhw0AmDLsIktigyth8ZSTMitjbVIhIFKm29KH/gfyzpD0+K1y0QAAAABJRU5ErkJggg==");
						}
						.icn:hover {
						    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABJCAMAAABGrfvuAAAAnFBMVEX///////////////////////////9HcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8aKwi1AAAAM3RSTlMBChUEAyANAAIHGwYSBR0XCz0kCB87GDMRJw8QExosNj8pIiMwOEL4xq7hWNSXeGmH7k6x/fMNAAAG0ElEQVRYw61YaduaVhAFFKKIbLIIwmU3S7O05f//t56Ze0Fxe82TzocmJXCcObOP9um1aLN8+ujNlyCbzXq9YlmvN5vXeNozFICs9rvd9nA46Dr+s93t9iuG+x0k4KxXANF937Ly/HTK89zyfR1wAHuimfYYZ08w1unoFIXBUhTO8WRZ/mG7Z7A3kICzAg5gnMLwkrK0WcoySYB3zKEZK/YRktLHz4+Fl9i2G5mmGULwRxS5duIZzskirHu1lv/P/ECfo5GUQMlEWsVKqlRkpgkwowDWdn9nonarEOEUie2aWT8ELPEwxOpvadNGbmkUuX+vlrZkCAqdCg84osKXQyqasGUJoR8hxyI03cRwlFoPkTQNDPmWY5TAGWBOn7Wt6bouM+66ptllKfDjvjPthNRaQmnXQFDISGAX3q9Ea4LiMvE8jgJ4kfjvSNe4aWHi6QZKWwAdDdvsepglWukpiiKEZU6RBTSY3QkYmYambRyXUDPShoA8t82qusaLbukVDoWiT6kio/3kGB5MD9OgHjLT9hhqpl2bgFZbAuqa4ByILrI9+JrTYy8zeM/Jw26NOhHXZCFDbZZIcP8OHCmgMCqNI8WfSllNmxJahhorHoiWDNyuJiiFBJIsw24VUCIDZhl8mgrbvPBgIaAacHXydxNVmrLtYBWJmQGoISBLf5QPKuIs8ouCKiyi6gqJbPPcsFIaWYfdevOwVsosOBHUANr5XWWfpvxmFXbb17UC2kugjZSljWv4BlBtFtdp53pk3wUJ/+YkURbUfWiWMxBxvN/tb+qRxm4m7wj8MNsnldKkSjl+pKqrCQhfTuUOpfcm8WXEJCCjjmHfUSlFSGtWSQQxws3IdekNjnlUTVRKFMpFbZMOKomqvmWlJNKk0hD0ymwGwtvk8KRM7osI/Qp9IuogxCf6jr+4qDSAbWcKNbhTzykLww5VpFjWNo2czfYFPfGxXUukFTsODxG0+RT+8mn35dtPITKKZuu6fEv7bBOM8EerDSFtdjoSLguCjFWa4mx1yD2zGcfxy79Ud8ulidqGleqGoHGJc/yERsYhvPugat2LSp82e/1Yhj2Qxs8/hr4BH4s6STrD+D5IzUSap8lH4FvMFjPSzi/sLB1Zvv1K+4yzbFaLmOIYjPGcvQckHWEWBvCCUnNGchuFNI5fz+mU2Yp5KI0Eg3mZa5z0PccA1SURVB2eyMiYkCIxI42f/676BlHCzBOUMi8NBNWp3YapcxK3hztJy/UVknGNNI7f/5qYR5xqxC9FpwhSctSMFKUTTZ+eIsHEOhUdsUUxp1TIgkrxSw+KJKqCRkG/QBr/+Qm2XE4oTdESgnLKVXoAJZOIiPsYiYJLhHYhlSJX2S07D7F5QQqJuP1HSOP4o4/A556QKPfMOA6vkdw47t5EGr+byNkLEnQAdfr/jxTF8Xs8IXVeW0eMR28y3j1lfIoCzsQ/igIVmT0V9+2LGB8/fw3S5jYym0VkAgnVoZNK/kG2QEnU3nqggNJn591m8D+cwfarDCbiyNw6Mxn796oK6lpmq6oisTtuOFfF4O1KN5iqT8nqW5o92qYrQ+7t6luQcf1U/dERiChUh5rofNYRlGHXHYGNq5D53PCmLsW9PL1uCXOX+oUuZT7uUiU1SY4m2aUuzTxEcD7qnBgVbzonjYA0lFaxoOo/dc65m6dvdnMC4p8hleZue5kwmiBo2ncmDB64ybYQrW1W6cnUs7maeg43Uw+PdZT1XYpM4flwmp+uJrHqjUlsAgpFQCWbxt+76VDUZ0Gsz2Pmo+kQHE1AdS9/9zJnLidWcx597ydWHn51BXTmZjuNmTdT9MBQ5TIKbxZSeBRkN/E5oEydR9+byT7jyZ4DUd/ej6q82J4MzIUCQA0n6jSOP9g2aorppDipdWOtyFrz3u/njodZXPB2416vCHcbUBafz1XGK9DR4hDY7ki22wPCK3do/wv7GhpxM7qsLQ+3svPQhHJ3PtLJQQl2vMKgTYr2tiq7XaUebIrkXrwZmhE2Tjo5KDF4X2/DPq6Dft4UNe3F9srLItZw5G6ELZhuDnyAwCrc8sJOCiVye9W05xs1NnOsgkMNvfos7LCWm1LaLpQLOzZbsIjGsAC63/KtE9ZK2pyBVQ9pL5oM0jQ97eW8aUfs2buDwaPLAzuogyH1UoIBiz9wDMeaG8MH1xByto2VPhR9OsRxHMQxaRe27FFnWkjfu9AAq5QHmknkhaYgnAdXlVdXoyMdCMhrUhJ5NZIXqEcHqOeXLF9dsiahS5avP9bn9XWNKyYdHKT4V9e137v4ERid/JBxJDs6+D0/0r1xhbyW10fN/wAR6jCEuk3YCQAAAABJRU5ErkJggg==");
						}
						.bottom {
						    margin-top: 7px;
						    background-color: rgba(255, 255, 255, 0.2);
						    border-radius: 9999px;
						}
						.bottom:hover {
						    color: #fff;
						}
					}
				}
			}
			 .ffull {
			    position: absolute;
			    display: block;
			    top: 0;
			    left: 0;
			    bottom: 0;
			    right: 0;
			    width: 100%;
			    height: 100%;
			    background: rgba(255, 255, 255, 0);
			}
			.poster {
			    background: rgba(0, 0, 0, 0.1);
			    .pic {
				    display: block;
				    width: 100%;
				    height: 100%;
				}
				
			}
			.fhide {
			    display: none !important;
			}
			.ffr {
			    float: right;
			}
			.fthide {
			    display: block;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			    word-wrap: normal;
			}
			.fvhc {
			    position: absolute;
			    top: 50%;
			    left: 50%;
			    -ms-transform: translate(-50%, -50%);
			    transform: translate(-50%, -50%);
			    text-align: center;
			}
			.fvhc-1 {
			    width: 100%;
			}
			.controls {
			    position: absolute;
			    bottom: 0;
			    left: 0;
			    width: 100%;
			    height: 42px;
			    -ms-transform: translateY(100%);
			    transform: translateY(100%);
			    transition: transform 0.2s ease-in;
			     .progress {
				    position: absolute;
				    top: 0;
				    left: 0;
				    width: 100%;
				    height: 4px;
				    border-radius: 2px;
				    background-color: rgba(255, 255, 255, 0.2);
				    cursor: pointer;
				    -webkit-user-select: none;
				    -moz-user-select: none;
				    -ms-user-select: none;
				    user-select: none;
				    .out {
					    position: absolute;
					    top: 0;
					    left: 0;
					    height: 100%;
					    border-radius: 2px;
					}
					.out-1 {
					    background-color: #b2072a;
					    z-index: 2;
					}
					.out-2 {
					    background-color: rgba(255, 255, 255, 0.3);
					    z-index: 1;
					}
					.in {
						position: absolute;
					    bottom: 0;
					    left: 0;
					    height: 100%;
					}
					.dot {
					    cursor: pointer;
					    position: absolute;
					    top: -8px;
					    left: -8px;
					    display: block;
					    width: 20px;
					    height: 20px;
					    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB/HNKOAAAAIVBMVEX19ff19fdHcEz19ff19ff19ff19ffiSE719fffOzvwu8INAVqZAAAAB3RSTlPzvgBNhE5MvuDklQAAADFJREFUCNdjUDJkEFNiUOno6HBisACSzQwSXeUrGhk42mdWNEBJiAhEFqJSKZBBWAkAJkwSmrflNpkAAAAASUVORK5CYII=") no-repeat center;
					}
				}
				.progress-1 {
				    top: -4px;
				}
				.wrap {
				    position: absolute;
				    bottom: 0;
				    left: 0;
				    width: 100%;
				    height: 100%;
				    .right {
					    float: right;
					}
					.volume {
					    position: relative;
					    margin-left: 10px;
					    margin-right: 1px;
					    padding: 11px 10px;
					    .mute {
						    display: block;
						    width: 16px;
						    height: 12px;
						    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAMAAABcOc2zAAAARVBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////9X1DS3AAAAF3RSTlMAaX8jBXQwgHxlYmwbKxVQbRBIPE1DCA7eoYEAAABYSURBVAjXbY5JDoAwDAMHKLhl3///VJRSBFLxzRPFNkS5CQhzRdJYyIDK5vaNlwG20i8MtaJog2PXSvKi0EGvDj2gUsDJv8CuBrKXT+gZQ7Pa32FpemvTL5S2BAtdLazZAAAAAElFTkSuQmCC") no-repeat center center;
						}
						.mute:hover {
						    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAA1klEQVQokaXSoUpEYRAF4M9fw4LJYHFBUKNPoGbjKtuM2+yGrb6AsA8gLNdq0HcQ2aBWq81kMRk9lhXkcq93YQemnMM5M8wcSbR0L8llDauS3CU5+sWK5trBDQY1fAXbmOAEmiYPkjwmeZn3X64kGSV5TjJLsrWGY1xgs2UbmGIV56jQxxBnBeMOMfSwjxHgHnBYsNEhhivAAeAN0G87Yr2+Aet1ouBjAYMx4AGwC3gvmOCzw+ALr5gChoDZ0m9sS+FektsGg2qOPSU5TdIYpP+ifF2P8g/2ehMg7DdaPQAAAABJRU5ErkJggg==");
						}
						.sliderbg {
						    display: none;
						    position: absolute;
						    top: -2px;
						    left: 6px;
						    width: 22px;
						    height: 86px;
						    border: 1px solid rgba(255, 255, 255, 0.2);
						    border-bottom: none;
						    background: rgba(0, 0, 0, 0.7);
						    -ms-transform: translateY(-100%);
						    transform: translateY(-100%);
						}
						.slider {
						    position: relative;
						    width: 4px;
						    height: 70px;
						    margin: 6px 9px;
						    border-radius: 2px;
						    background-color: rgba(255, 255, 255, 0.2);
						    .out {
							    position: absolute;
							    bottom: 0;
							    left: 0;
							    width: 100%;
							    background: #b2072a;
							    border-radius: 2px;
							}
							.in {
							    position: absolute;
							    bottom: 0;
							    left: 0;
							    height: 100%;
							}
							.dot {
							    cursor: pointer;
							    position: absolute;
							    top: -8px;
							    left: -8px;
							    display: block;
							    width: 20px;
							    height: 20px;
							    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB/HNKOAAAAIVBMVEX19ff19fdHcEz19ff19ff19ff19ffiSE719fffOzvwu8INAVqZAAAAB3RSTlPzvgBNhE5MvuDklQAAADFJREFUCNdjUDJkEFNiUOno6HBisACSzQwSXeUrGhk42mdWNEBJiAhEFqJSKZBBWAkAJkwSmrflNpkAAAAASUVORK5CYII=") no-repeat center;
							}
						}
					}
					.arrow {
					    display: block;
					    position: absolute;
					    top: auto;
					    bottom: -7px;
					    left: 0;
					    right: auto;
					    width: 100%;
					    height: 7px;
					    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAHAgMAAABB3ES3AAAADFBMVEUCAgI+Pj5HcEw4ODgkC8kmAAAABHRSTlO0awDA/mVZJgAAACRJREFUCB1jOMDAzCxwgodJh0GTiZthCRPT4QlMjLscmBgkGQBKkgUi8CVBlQAAAABJRU5ErkJggg==") no-repeat;
					    background-position: center top;
					    cursor: default;
					    
					}
					.brs {
					    position: relative;
					    width: 50px;
					    height: 17px;
					    margin-top: 9px;
					    z-index: 3;
					    .current {
						    line-height: 17px;
						    text-align: center;
						    color: rgba(255, 255, 255, 0.5);
						    cursor: default;
						}
						.options {
						    display: none;
						    position: absolute;
						    top: -13px;
						    left: -8px;
						    width: 66px;
						    box-sizing: border-box;
						    border: 1px solid rgba(255, 255, 255, 0.2);
						    border-bottom: none;
						    background: rgba(0, 0, 0, 0.7);
						    -ms-transform: translateY(-100%);
						    transform: translateY(-100%);
						    .itm {
							    position: relative;
							    height: 26px;
							    padding: 0;
							    line-height: 26px;
							    border: none;
							    border-top: 1px solid rgba(255, 255, 255, 0.2);
							}
						    .itm:first-child {
							    border-top-color: transparent;
							}
							.label {
							    position: relative;
							    display: block;
							    width: 100%;
							    height: 100%;
							    padding: 0 10px 0 18px;
							    box-sizing: border-box;
							    text-align: justify;
							    overflow: hidden;
							}
						}
					}
					.brs:before {
					    left: 0;
					}
					.full {
					    display: block;
					    width: 34px;
					    height: 34px;
					    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOAQMAAAAlhr+SAAAABlBMVEX///////9VfPVsAAAAAnRSTlMAgJsrThgAAAArSURBVAgdBcAxDQAgDACw8iMJaYhDwCQggYOTY1mIorg8NsFCJzhMhpZafvJPCsNDJhdLAAAAAElFTkSuQmCC") no-repeat center;
					}
					.full:hover {
					    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOAQMAAAAlhr+SAAAABlBMVEX///9HcExwQjx2AAAAAnRSTlPMABHcVXoAAAAtSURBVAgdBYCxDQAQEADvrxYxgCGMZkUj6RTihbiCFQ92bFiI3OQgm8zIxUP4r0gJqtt6EUUAAAAASUVORK5CYII=");
					}
					.left {
					    float: left;
					    position: relative;
					    top: 20px;
					}
					.play {
					    width: 34px;
					    height: 32px;
					    margin: 0 6px;
					    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAP1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////9KjZoYAAAAFHRSTlMAAgUNLURLTToJEiUpSBcE1fVgn9plgu0AAADESURBVCjPfZLJcsQgDESbRWqx2EwS/v9bc7AhjCuDbqpXam0N3JGKiapYSXiPbJxheQEukkc8k2vhjAcZ3SDeqKWNrBWl+bvGKGFVD0K76iLl0ToJIwBkasZzKmUGYKxX/rPUVhoQeNw9+6tO5A8GlEsWQO9f35NFFhjPiXqfoicNwrSg/ro1EgVKt6Ih6qhQtv9Qo34SDJTdGJvh15Xj+8qbQ+3Ou3kK2udXwhu1+jlB/TMA0IZtXHrYZmc2AAjDorPtL+4MCs9tL4/kAAAAAElFTkSuQmCC") no-repeat center;
					}
					.play:hover {
					    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAZlBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9ulurIAAAAIXRSTlMACQgYESEcA2gGDg0lFCkeYRUuV2YyS0hNOlk2RXj2263YUJsCAAABVElEQVQ4y5WU6XKDMAyEY3zJFz4wV0gP3v8lK5dA0zSdOPrFwDfelbzidHqppFTXkvIxoIjR7Lu0IUo+ArSjwnMsL6jTfyDZGCd4unQh59BdEhfONL8YRRjlSwdHdQunjNwwkjDRTgBhmFPbpnkIAFMrbhjZIHGGfGktGvGe2/aS4YzMoaUMRSL0Fn3G0lEUtg/IUKN2GccnCGgxRsc0aZriLAWYuLtKKS0WyD36Y5Riu42SykTeZ1iEVvshHYyWau38ZyqdFIbaEbrrMdLQHkLxj6/Xj8EKVxjsIEBPjdx0RphsJPhg1/X9zfJolCLRDjBuSor5DmbO1IasaxEzOEw+Q+fZhvAAyf8gKIYeCPMJAt+RDC2eeCAoRk0ZOORXkOdCz+0+b7pidBUXUHGNNWGoiNQRzBGD6bdgjnfBrIj3v0uiXlu1moWtWfuqn8fOne4/fwHyLiZPlvQt6gAAAABJRU5ErkJggg==");
					}
				}
				.progresswrap {
				    position: relative;
				    height: 34px;
				    padding: 15px 10px 0;
				    overflow: hidden;
				}
				.progress-2 {
				    top: 35px;
				    left: 10px;
				    right: 10px;
				    width: auto;
				    .j-ht {
					    display: none;
					    position: absolute;
					    top: -27px;
					    min-width: 44px;
					    .hovertime {
						    border: 1px solid rgba(255, 255, 255, 0.2);
						    padding: 5px;
						    background: rgba(0, 0, 0, 0.7);
						}
						.arrow {
						    bottom: -10px;
						}
					}
				}
			}
			.controls:before {
			    content: '';
			    position: absolute;
			    bottom: 0;
			    left: 0;
			    width: 100%;
			    height: 79px;
			    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAABPCAMAAAD2ruSkAAAAVFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACn9Kj9AAAAHHRSTlMAAkIeBiRLSSk/OTEWBA4uRhELGAk2RCE7GzQTaLGHOAAAAFRJREFUCNdFwocNgDAAA7CyN3TP//+kQRG1LMSn6/i6eBzZWtYa7/pGVSssBc+TjRGpTjgMHAJOU7uu7fPwcXDO6BzuO8eI29b2PXuPUvKytPP8fwGF0geQtf5jJAAAAABJRU5ErkJggg==") repeat-x;
			}
			.ffl {
			    float: left;
			}
			.foh {
			    overflow: hidden;
			    position: relative;
			    top: -20px;
			}
		}
		.m-ctvideo.z-pause {
			.poster {
			    display: none;
			}
			.player {
				.play {
				    opacity: 1;
				}
			}
		}
		.m-ctvideo.z-active {
			.controls {
			    -ms-transform: translateY(0);
			    transform: translateY(0);
			}
		}
		.m-ctvideo .controls .wrap .time, .m-ctvideo .controls .wrap .duration {
		    height: 34px;
		    margin: 0;
		    line-height: 34px;
		    color: rgba(255, 255, 255, 0.5);
		    position: static;
		}
		.m-ctvideo .controls .wrap .brs:before, .m-ctvideo .controls .wrap .brs:after {
		    content: '';
		    position: absolute;
		    top: 0;
		    display: block;
		    width: 1px;
		    height: 100%;
		    background: rgba(255, 255, 255, 0.2);
		}
		.m-ctvideo .controls .wrap .brs .options .itm.z-sel, .m-ctvideo .controls .wrap .brs .options .itm:hover {
		    border-top-color: transparent;
		    background: rgba(255, 255, 255, 0.2);
		}
		.m-ctvideo.z-fullscreen {
		    position: fixed;
		    top: 0;
		    left: 0;
		    bottom: 0;
		    right: 0;
		    width: 100%;
		    height: 100%;
		    z-index: 2000;
		    .player {
		    	.play {
		    		.icn {
					    background-image: url("data:image/png;base64,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");
					    width: 110px;
					    height: 110px;
					    margin-left: -55px;
					    margin-top: -55px;
					}
					.icn:hover {
					    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAMAAADxhdbJAAABGlBMVEU7OzsAAAD///////////////////9CQkL///////96enr///////////////9LS0v///////////9HR0dQUFD///////////////////////////////9XV1f///9fX19cXFxUVFRvb292dnZzc3P///9jY2Nra2vW1tZoaGhmZmZoaGhwcHD///////////9paWlZWVnf39////////////9XV1eampr///////////9GRkZkZGT7+/t/f39iYmKKioqfn5/q6ur///////////9SUlL29vbw8PCampqKioqAgIB5eXni4uLZ2dnLy8vFxcWnp6eQkJCwsLC4uLjKysr////p6enU1NS4uLixsbG/v7+SkpL///9v2WfzAAAAXXRSTlOFAHECMwQGhwoWnQglHhOKEA4MiYwhGy0YKmwvJ48xkpGNmJuZN5OWdZWVgH5oYT2Wj3NZVTqBelJJQYOA+n2BfHlyY09GgfXurqWgfeDYzsm1fHh3dWXn1MC7xaniF4BHAAAGaklEQVRo3qyWCXMSQRSER1lFUSPBxABLgACLhDuBEI5gEo33fd///2/Yb+axs2QWBla7KlVhKfiq+/UbRlyJpFgs2ufWwMVmusbyH/x3nI+5fkk+dh2cnSVBt27dunFJeCShBjEqjllESqU2NzeTAeFlKkVMJv4zjllAAbSxsXHzkvAIUCCZGB3HMPgCK0mkdPr+/ft3AsLLdBpMIFPwaAcKK4yMgZUGaHt7+7ZUjiT/wyNA0yCSRStQ2GAwBhahQMlkdnZ2XF94kckACySIZNEGFEtomJkPA2rHzTshyrs7QPpAzHAJTyy3BhizJMrrjIa99tdW9urVbLbV7g1HHU8imQjgcoNiAU3lCGeAwZcDjYdtYC4r2x6OHQgeAYRDmajm2XExRdtMIkaC5YnV0ygT2SNinoCINLmpeDErTgfJOd7OEcy7aPEX1z59fH06eDqJi8lkcPr646cav9G68AiYu82JcqB2HAeZpBwl7KivjB2eN+LCULxxfqgs9o8kkBJNcqB2HAcprWVcOFOwR8cDsVCD40cKCIduRhrkQC04RaOOYGpkbSRhtaawqFmTwBEZxASpMWE8EU6TQSLHtoQ1xApqSGAbicpAw3kihJYEDUGytUPtzObwkA0iUPCSITyxiJZ3vN5V6EysoTP6RM9z8gYvFMdJgoYgH1OOp2ItnVKijxEoeJynidPm0EmiYWwdWrVzsbbOaQk7GCB41M95e2I+SkXLgEZjeygi6CENELyM4nGcJo5oqY2bmtYUkdTUvJsbKfBCcaom2De0hGjZhoioRpZ46Av2T9XFwKnBES3nOh7N7URE1gnNz3PcHPHmxieCUXJNPOoke4voj/rpcV2CcYr5KGUp+8bcIs2vL+s5H6cImlODe2J0MmI/n6jxBe2JgDlEicEdYdBfhKm4iLNW4n1BXY4wPsSp7WmcbCVF2cYxORCmwLmntBJxgAO0TXHKdmpcoCfbubwz4lIa1gC7q6SBtnqOnHxuW7dF42Y98RDlWag3wLa2tvbwR8QVeGeIU7YzYE9oc7InfUS5kLa3e3BwsLsLJBzagYizL9vC9jQOG07mZE+a4TTAisVCtVooFA9WAzapLWSPdl3jYjFZSzZXE6bIG2jV+n63292vVwm4QqI1tifLGSOe0DvHk2uE47ZA2y+VKpVKqfQAQERqNdjg6and07jZzl0sMBdHlMVqt/R++uZFIlGulLr1QnHXbhD2Lma7xzhkyUVxnJaenGGuUC+Vp3/+TN+9SiQSldI+ErUaxPRajsNloTSFzJKLMsZ9UoTjyFwl8Yf0/AN4ZSRasCeK++eYyyLTFJylXHHchY4X40pl4KTevmSD1soc46ZEq05pMg695CxRlEE4DqOrlxLAKT37SQYr9soMUBZOE91kHPdyTCsejsPo9ivA+XrzWybarRaKSw0eIk3upsT5o3OdIWdpCMVknNb0fYITXWoQaQ4d1x+eCIyujaVbjOvO41CZF7oy2qC5em09PI3LyB2Ph9IUrsw4re/2nYjLTc8EcdyUDu34YncPTJyuTLhB3vQOd4Vwuim4NHxeE4fKBHcijPcZlwjdFY0zm2LHQdNfvkHmmV2Zx/GZgiV/HU5bgoO+vVAGmWfekXp8rgRxLhXzZE13LDpGy+Ad7N01eCdUTVfj/LX7ijMlGg7HKPmroy/AGefKV3/xgjj8HDyNhONjtNKtFveM6T3Fj4KJy7l0Yk6izI534kcZ9szpTejUdHMzXMzHXcWWR3YHfcf0zDTj+FofF/tbrbnbMAzEMPSAFF4nC6RNmTbI/oukNAwGeAhpnXUTCPBHIh95HDeScY+f48ZhnDxMf9xLxsnD3D+Vynd31ZcJv3nw3+lvDkss2yq6xGBFpztTVzQcoOwi6AGC85rcOz2vIB7Sa67iQaVRqFVAGonwS5UYCz+Rta7ORFl7U9EeqmgW7WpJ2CN81COwJQHDZTggMlxqJwN/x3ZSzbLpXtksMwpQb/4Gb04ogEHHTh7uSB4YdCjGsbgKYxyCVEyNLEjFCI6ZGCM4AIxE/FzAyPiUeSbjU4DDQGszOMzoexvAogF9zwX7Rmyx+bHF5FBmbuR0faBWGBd2CEOrot4uQXZJTN+nhHB+xaJXgaSqHpOXf55Y/ulYbTqpuNW3lhaX7rpXCoPC5Bp1UKfsulaV95+i8po17Bkl85oK/Rcw1FXK9CzY0wAAAABJRU5ErkJggg==");
					}
		    	}
		    	.opbar {
				    display: none;
				    z-index: 1;
				}
		    }
		    .controls {
		    	.wrap {
		    		.right {
					    margin-top: 9px;
					}
					.duration {
					    margin-right: 18px;
					}
					 .volume {
					    right: 10px;
					}
					.brs::before {
					    left: -6px;
					}
					 .brs {
					 	.current {
						    margin-left: -6px;
						}
						.options {
						    left: -11px;
						}
					 }
					 .full {
					    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEX///////9VfPVsAAAAAnRSTlMAgJsrThgAAAAoSURBVAjXY2BjYEhjYChjYLBjYJBjYPgHRlBQD0YVDAw1DAx5YHUJAJDTBmHDM60MAAAAAElFTkSuQmCC");
					    width: 48px;
					}
					.full:hover {
					    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEX///9HcExwQjx2AAAAAnRSTlPMABHcVXoAAAAuSURBVAjXY/j5n2Hmf4bO/wwH/zM8/M/ACEb/IagBjNoZ/jcz/J/I8H8mw//5AGyrGYHLJzQyAAAAAElFTkSuQmCC");
					}
					.left {
					    top: 7px;
					}
					.time {
					    height: 52px;
					    line-height: 52px;
					}
					.play {
					    width: 52px;
					    height: 50px;
					    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAdVBMVEVHcEz////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////qLaloAAAAJnRSTlMAAjMMRy4FTUsRGyk4CB41D0VDJEot+Ro/QNpZu+6YzOarg4JubTIFvewAAAE8SURBVDjLjVXXksMgDBQYs+BuHKdcr/r/T7yHyySAwUFv1ux4VVYLURB2kWdljDrLxVI2+tbBC9f2SZheDeDqZtJC6KmpHWBWvcU1CpABnZWAOsW4GuiqOFl1QB1kxAgzpOoZDEbhfY9QmSatwujzqio3ikrd2U847AzNHnDtSCsMtBMDlL4Sd7Qb3T95b4xf4Oe2igqmJ6IW0s/yx2GDlGiJaEbwD2Z+i3dsMRNZOIqA/BQX7WBpiZbEzMzHbx0teCGJZgtkfm8DxUDSBVMKyMdfLznhQgo6CWR+uVNpKDIQGSC/Pt/UBVMO3KEeAupsMz9RM8XjSQ/8azvw4hWmRFGlRFEus2Lh0lp4CuXHRU3huZYbAIl9S/FUI7pCkyKRtz1RZqRNwpprA7j1oTUTUd/OvtnPGbN/8Hz8AUkgHlDQxnDBAAAAAElFTkSuQmCC") no-repeat center;
					    margin: 0 10px;
					}
					.play:hover {
					    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAnFBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+hnS02AAAAM3RSTlMAEBUgDAQjAgcBGmsTHAgWGB0KDw0eJQURNiozaWxmLlQoJ1A/Y0ZZX0tET5Ox7tX44cmPyxVLAAADCUlEQVRIx6WW52KbMBSFw1IwEhuExMbbTtLF+79bjwTNapy26v2V2P7uuUu6urt7Z5vN5v6N4YO7z00RXlVVvh/BfB9/eor7A1JVUZa5xWpulkVV9QmmET9yC0swZi/GhFW4kX8TW5Fc2HESBOFiQRDbIl+xj2Q8BJaLOAlLxyGrOU4ZJrHIEaT3m5hi/KwQdpI6hMvjeO7btj+PR8mJkya2KDL/PQWm8rOcJaFDhsuBvrLDZSBOmLA8Q4hvKM1YdlCS+qGl3WG3l0NdD3K/O3S0fahJGdiWpl4znmYcvu8pHeV2u6bE+VaOlPZ77mjKe6Geme2OdqcGRFmmunhpiQybU0d32/cUgstyMBO+vU5cFSxJYnQpRvFRmOkKXxOoPHsOEExUMOiMXS+3CD+JGRPCyvMcbY6R6Fb23QgtVkS/qM29n4mk5LuubzhJgShCjxAGKmdx6PCm73a8TETmL5ASyu2Q7GkruRMCsXLLAoWx8zG4rq6QbOmehHa+SkHIFYlT991VZSugoYaPLdNTqf6pGl27vnYS4WopLRSnZEdPE1xhPguLJZi9IGZqehYqJNOJ7kgaL1KAlNDQtg0pYwuJFCwpnyRXoQp3oay4JA1tByWlIS8q4OhCRzSQuRGGNk75/KUbBmTOCiWmi8tHekEoReRt7tAj+OGHTi7iqpKknuf5ad/UJIR25Ef4SUpkd+CIBb1SEKKT9KD64CLzTAS8ATR/PzdKDAMeZbqPByoR3wK5+OBIlzZUHv5NJw3N86McJkeFiEOjGkmPyrGCfHghI7qgovOUj7Jeofnr2Kg6F4BQij0dCabC1xDqcKZSJ4kj79ov0PztsZnKOHcBhUTSs/qRgnTxejosTt5B8/zjSgJRaGig/eJ5hVpa34BQ/JBhSOyA1LT9f+iT8I4fhWdUCKOSGzXXbIwMBtboaJgdwvW4P/zLcTe6WMyuMKPL8vlanj6/lqc317LRAnhZNdPtVTPdXlBvlpra1reXmtn6NFvURk8Cs8eH2TPH8EFl9nQzfCT+7XP0Jy7enJI9f01lAAAAAElFTkSuQmCC");
					}
					
		    	}
		    	.progress-2 {
				    top: 32px;
				}
		    }
		    .foh {
			    top: -8px;
			}
		}
		.m-ctvideo.z-fullscreen.z-active {
			.player {
				.opbar {
				    display: block;
				}
			}
			.controls {
			    -ms-transform: translateY(0);
			    transform: translateY(0);
			}
			.wrap {
				.play {
				    display: block;
				}
			}
		}
		.m-ctvideo.z-play {
			.poster {
			    display: none;
			}
			.player{
				.play {
				    opacity: 0;
				}
			}
		}
		.m-ctvideo.z-play .controls .wrap .play{
			background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAANlBMVEVHcEz///////////////////////////////////////////////////////////////////+GUsxbAAAAEXRSTlMALQ4SREsnTToECMRICxcvGG65Pc0AAACrSURBVCjPjZJJjgQhDASDwiZtuujl/5+dQ01XL0LM5MESCinxkvCr0cLcLdrgUzV0Kuo7KdJerp0c17JL5QQZ8pbnq7kiT2Lbu8dmT3aT9c+fu+kGUOWV765cFQg1AC6XV6UpYNN++D4er0ru2miH7ReiqBG6z9BdganPUJfhYoaQ48oZSjmmMUNDtmpj0fxi5MWiVuulzI5S/jrlIgCQz9jQj9jkv8I2jegP2ZgJU4kz3cYAAAAASUVORK5CYII=");
		}
		.m-ctvideo.z-play .controls .wrap .play:hover{
			background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAXVBMVEX///////////////////////////9HcEz////////////////////////////////////////////////////////////////////////////////////////////0ao/XAAAAHnRSTlNoGQgOBRwUACYBIRsQHxEpAyNhCzQKLkdNzVc6WFniYId1AAABW0lEQVQ4y5WU0ZKDIAxFExCKKCBohWrb///MTWqntc7ulL0PMMLxxkgCnPZqn/pYhN320DSNINE07LAXQoAYpX9IjoKgA8KA1KicJTmFWr6hDWkZUHbOSwJIS56tYqh9I21z9minK7x0myz688bAk1Ch0PtlnUOY10JeJagnw8ggiLgB5GCidc5GEzIZESOGDWkbiUSkyUSHmoQumikRg5JtgJIR2hZIs6FMUHuvkTIzc4JitaC0gE3UBDBFhc6yzWNSkdcU28CJTa6QTacxXi7ROR5RdybDlW0IaUacIAWlPZr73cTII3qtQoIJx+YEHCdDMVr2ijdJNKpealMgcyRCvFtgtX6Ue0SO3q6wOM+I8DbB7Poj0rsZkvViQwCCkudPhB4DwH+Qb4EqPvd70hW/ruYAKo5xXwzdVgzdoRgqSqqmMGvK+5cmuR6apKbVahq2pu2rLo+/r6AfJestQtEz7SEAAAAASUVORK5CYII=");
		}
		.m-ctvideo.z-fullscreen.z-play .controls .wrap .play{
			background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAQlBMVEVHcEz////////////////////////////////////////////////////////////////////////////////////1bZCPAAAAFXRSTlMAG0dEBi0RTUsBNAsjOA/EMRYpP0hrD9IEAAABE0lEQVQ4y5WV226EMAxEJ9exE8IiYP//V/tQ2g1baLx+iYROZHtiD0Afmqey7SL7VqasuIu4BnYR1niNJSFDcnNUjbNLgZR0gTpPltx/yYX07g3TRLb6frk2MvWlqjbK9DeLYhK2jtRCn68bzJ7lRSb6eidF9Uy/fVDyrWbIwqOj6OnuOajjHo/EDf+Ftu/kVaQr8PE4nwBQKRXAyqW7/nyeTwDAwhXQwDwCM4MiM2AEIjBjesl0DyZOKGdtrkHHgo3zGJy5wTOOwUgPoY5BpdhBc2pzM2Z5zIKbn9A8FOYxQ7QMbrSsAo5VGC0XHH38bF3tBmC3FGijXNbpziYFNdrej5EuZyNdLoz0A2u2m/3g9/EF2uIQ+vBZ08gAAAAASUVORK5CYII=");
		}
		.m-ctvideo.z-fullscreen.z-play .controls .wrap .play:hover{
			background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAaVBMVEVHcEz////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////dvhWBAAAAInRSTlMABhoYEQ9rDBQiFgQDHCQmCAEKHzIuKmRoNVVQXEVAN8tLkjt/0QAAAn9JREFUSMelloeW2yAQRa0GAgVYC6NebP//R+bNyNJWOwmZc9Y+i7m8aZTT6Yudz+dfnwwDp9dGRFVVSZK8wRKyirg/IJhe11IWbFLWNdAX2AORRZ6Xh+V5IV9gB1LqLE0NW5pmWh/YTzIVHCtynRnv1WHemwwYnKy+iTFTy7wEolw/D1Pbde00zL1TwMpc1t8oMElSF4TYcGvFB2tvwRJW1HDxE8VMXqZeNWOHiePSh6YJ/TJigW5slE/LnKmPTLUxdsGkYXXOWo7IOrcOWGSxG1W9Uzuj3CjE1DtL4bMhJdb1kxCjU18oOId4UtVg0dlR5JRpsiw1hM2Qb0Ahrh0C8ybhmxtEtzpEnWpNVaUaaw3MurUTg4OHKNiDIqE883YUHSWYEADURRuXUhE6MVqf5bsUCRWlUQvpKCSXRXaIsMwo0lqUKYuHFCAJoaZFPMqwytZ0x3epQc2ibSAlGWIhbeDcRAzPzdB8WcqfGdNETXDQ6E3qIRQ6cbEeXVZQK12vnu16pRbCmPb2IrqwS50rjuiG9HBSJS17vzu2+53EJRcEyb1xVNX5RKnT3rViJXHsP8hicsMGmBavawpgFa2DL0jgact3jwFFdaCKKUwOITQhAH4fxcL9lnVANDCjUXgAPxuLyRdQ4QLYGiopLYwmm2mJAxrEsqUm2SG2B5RsCV7EcECUh0n0W+meQpjUi4kmEcT/tyJQ7pJnUEL5C6LllXeoExzxc4jzI7r/h/7VvahExKU8qrjP2ii8aqOIho3aGnGb8Nl2z15s96iDJe4Iizos447lqAsg7qqJutTirs+4izrqSfDD48Nuf68eH3HPnMgHVdzTLfKR+LfP0d8lhG9Py+COrwAAAABJRU5ErkJggg==");
		}
		.m-ctvideo .controls .wrap .volume:hover .sliderbg {
		    display: block;
		}
		.m-ctvideo.z-end .player .layer-end-nonext {
		    display: block;
		}
	}
	@keyframes video-loading-spin{
		0%{
			    transform: rotateZ(0);
		}
		100%{
			    transform: rotateZ(-360deg);
		}
	}
</style>