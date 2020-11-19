<template>
	<div id="mv">
		<div class="g-bd4 f-cb" v-wechat-title="this.title">
			<div class="g-mn4">
				<div class="g-mn4c">
					<div class="g-wrap6" v-if="mvData">
						<div class="n-mv">
							<div class="title f-cb">
								<h2 class="f-ff2 f-thide" title="">
									
									{{mvData.title}}
								</h2>
								<span class="name" :title="mvData.creator.nickname">
									by
									<router-link :to="{path:'/artist',query:{id:mvData.creator.userId}}" :title="mvData.creator.nickname" class="s-fc7" >{{mvData.creator.nickname}}</router-link>
								</span>
							</div>
							<div class="mv" :data-mid="mvData.vid" :data-duration="mvData.durationms"  data-flashvars="">
								
								<div class="m-ctvideo z-active " tabindex="1" :class="[video.playing?'z-play':'z-pause',{'z-fullscreen':definition}]">
									<div class="player" v-if="videoUrl.length>0">
										<video class="media"
											ref="video"
					                		@pause="onPause" 
					                		@play="onPlay" 
					                		@timeupdate="onTimeupdate" 
					                		@loadedmetadata="onLoadedmetadata"
					                		@error="onError"
					                		@progress="onProgress"
					                		
					                		preload="auto"
					                		
					                		>
					                		<!--暂时不能调节清晰度-->
					                		<source  :src="videoUrl[0].url" type="video/mp4">
					                		<!--Your browser does not support HTML5 video.-->
											<!--controls="controls"-->
										</video>
										<!--开始播放前的图片-->
										<div class="poster ffull" >
											<img :src="mvData.coverUrl" class="j-pic pic"/>
										</div>
										<!--屏幕上的播放键-->
										<div class="play ffull" >
											<span class="icn cursor" @click.stop="play"></span>
										</div>
										<!--加载视频-->
										<span class="loading"  :class="{'showLoading':loading}"></span>
										
										<i class="fast"></i>
										<div class="opbar">
											<ul class="j-ops ops ffr">
												<li class="itm">
													<span class="cursor j-like icn icn-like" data-action="video-like"></span>
												</li>
												<li class="itm">
													<span class="cursor j-sub icn icn-sub z-active" data-action="video-sub"></span>
												</li>
												<li class="itm">
													<span class="cursor icn icn-share" data-action="video-share"></span>
												</li>
											</ul>
											<h2 class="j-tt tt fthide" >{{mvData.title}}-{{mvData.creator.nickname}}</h2>
										</div>
										<div class="layer layer-err ffull">
											<div class="fvhc">
												<p class="err">连接失败，请重试</p>
												<span class="btnwrap ftdn cursor" data-action="video-replay">
													<span class="icn"></span>
													重新链接
												</span>
											</div>
										</div>
										<div class="layer layer-end layer-end-nonext ffull">
											<div class="fvhc">
												<div class="btn btn-1">
													<span class="icn top cursor" data-action="video-replay"></span>
													<span class="bottom">重播</span>
												</div>
											</div>
										</div>
										<div class="layer layer-end layer-end-next ffull">
											<div class="fvhc fvhc-1">
												<p class="tip fthide">
													即将自动为您播放：
													<span class="j-title"></span>
												</p>
												<div class="btns">
													<div class="btn btn-1">
														<span class="icn top cursor" data-action="video-replay"></span>
														<span class="bottom">重播</span>
													</div>
													<div class="btn btn-2">
														<span class="icn top cursor" data-action="video-next">
															<canvas class="j-next next" width="62" height="62"></canvas>
														</span>
														<span class="bottom ftdn cursor" data-action="video-cancel"></span>
													</div>
												</div>
											</div>
										</div>
										<div class="layer layer-err layer-err-fail ffull">
											<div class="fvhc">
												<p class="err">该MV需付费使用，请在网易云音乐手机客户端购买后观看</p>
											</div>
										</div>
									</div>
									<div class="controls">
										<div class="progress progress-1 fhide">
											<div class="j-out1 out out-1">
												
											</div>
											<div class="j-out2 out out-2">
												
											</div>
										</div>
										
										<div class="wrap">
											<div class="j-right right">
												<div class="duration ffl">
													{{video.duration}}
												</div>
												<div class="volume ffl" :class="{'z-mute':zMute}">
													<span class="cursor j-mute mute" @click.stop="showVoice"></span>
													<div class="sliderbg">
														<div class="j-slider slider" @click.stop="voiceDebug($event)" >
															<div class="j-out out" :style="{height:sliderHeight+'%'}">
																<div class="in">
																	<span class="dot"></span>
																</div>
															</div>
														</div>
														<i class="arrow"></i>
													</div>
												</div>
												<div class="brs ffl"  >
													<div class="bridge"></div>
													<div class="current" >
														<span class="j-label label">{{jOptions[optionsNums].name}}</span>
													</div>
													<ul class="j-options options" >
														<li class="itm " v-for="(items,indexn) in jOptions" :class="{'z-sel':optionsNums == indexn}" v-bind:key="indexn"  >
															<span class="label">{{items.name}}</span>
															<span class="cursor ffull" data-action="video-br" :data-index="indexn" @click.stop="clickDefinition(indexn)"></span>
														</li>
														
														<li class="arrow"></li>
													</ul>
												</div>
												<span class="full ffr cursor" @click.stop="enlargeVideo"></span>
											</div>
											<div class="foh">
												<!--播放时间与播放按钮-->
												<div class="j-left left">
													<span class="time">{{video.currentTime}}</span>
													<span class="play ffl cursor" @click.stop="play"></span>
												</div>
												<!--进度条-->
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
							<div class="btns f-cb">
								<span class="j-flag btn u-btn2 u-btn2-1 u-btn2-icn f-fl cursor" data-action="like" :data-liked="mvData.id" :data-count="mvData.likeCount">
									<i>
										<em class="icn icn-praise"></em>
										({{mvData.praisedCount}})
									</i>
								</span>
								<span class="j-flag btn u-btni u-btni-fav cursor" :class="{'u-btni-unfav':faDis}" data-action="sub" :data-res-id="mvData.vid" :data-liked="mvData.vid" :data-count="mvData.subscribeCount" @click.stop="likeClick($event)">
									<i>
										({{mvData.subscribeCount}})
									</i>
								</span>
								<span class="j-flag u-btni btn u-btni-share cursor" data-action="share" :data-name="mvData.name" :data-author="mvData.artistName" :data-authors="mvData.artistsName" :data-purl="mvData.cover" :data-count="mvData.shareCount">
									<i>
										({{mvData.shareCount}})
									</i>
								</span>
							</div>
						</div>
						<my-comments></my-comments>
					</div>
				</div>
			</div>
			<div class="g-sd4" v-if="mvData">
				<div class="g-wrap7">
					<h3 class="u-hd3">
						<span class="f-fl">
							MV简介
						</span>
					</h3>
					<div class="m-mvintr">
						<p class="s-fc4">发布时间:{{mvData.publishTime}}</p>
						<p class="s-fc4">播放次数:{{mvData.playTime}}次</p>
						<p class="intr" v-if="mvData.desc">{{mvData.desc}}</p>
					</div>
					<h3 class="u-hd3">
						<span class="f-fl">
							相关推荐
						</span>
					</h3>
					<ul class="n-mvlist f-cb" v-if="xgmv">
						<li v-for="(item,index) in xgmv" v-bind:key="index">
							<div class="u-cover u-cover-8 f-fl">
								<img :src="item.coverUrl"/>
								<p class="ci u-msk u-msk-1">
									<span class="u-icn2 u-icn2-mv"></span>
									{{item.playTime}}
								</p>
								<router-link :to="{path:'/video',query:{id:item.vid}}" class="f-link link" :title="item.title"></router-link>
							</div>
							<div class="cnt">
								<p class="tit f-thide">
									
									<router-link :to="{path:'/video',query:{id:item.vid}}" :title="item.title">{{item.title}}</router-link>
								</p>
								<p class="s-fc4">{{item.durationms}}</p>
								<p class="s-fc4 f-thide">
									by
									<router-link :to="{path:'/artist',query:{id:aItem.userId}}" class="s-fc4" v-for="(aItem,aIndex) of item.creator" v-bind:key="aIndex">{{aIndex ==  item.creator.length-1 && aItem.userName || (aTtem.userName + '-')}}</router-link>
								</p>
							</div>
						</li>
					</ul>
					<my-down></my-down>
				</div>
			</div>
			<div class="u-load s-fc4" v-else>
				<i class="icn"></i>			
			</div>
		</div>
	</div>
</template>

<script>
	import eventVue from '../../../static/js/eventVue.js'
	export default {
  name: 'video',
  data () {
    return {
    	jOptions:[{name:'1080P',brs:'1080'},{name:'超清',brs:'720'},{name:'高清',brs:'480'},{name:'标准',brs:'240'}],
    	definition:false,
    	optionsNums:0,
    	mvData:null,
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
		        ended:true,//是否播放完
    	},
    	videoData:{},
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
	    zSlt:'mvsp',
	    barVoice:false,
	    title:'mv',
	    xgmv:null,
	    videoUrl:[],
	    faDis:false,
	    logH:false,
	   CancelFavorite:true//切换收藏取消
    }
     
  },
  inject:['reload','playHidden'],//app.vueҳ���ж����¼���
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		this.mvHttp();
		this.playHidden();
		this.$root.eventVue.$emit('zSltV',this.zSlt);
		this.$root.eventVue.$emit('barVoice',this.barVoice);
		//不能用同级组件传值
		//重新请求判断是否登录
		let id = this.$route.query.id;
		let that = this;
		if(this.$cookieUtil("email")){
					this.$logoRefresh(function(ress){
						console.log(ress)
						 that.$http({
				         	method:'get',
				         	url:that.$host+"/mv/sublist"
				         }).then(function(res){
				         	console.log(res.data)
				         	that.$.each(res.data.data,function(index,el){
				         		
						       if(el.vid == id){
						       	that.faDis=true;
						       	that.CancelFavorite = false;
						       }
				        	})
				         }).catch(res=>{
				         	console.log(res);
				         })
				         that.logH = true
					})
				}

        },
        beforeMount: function () {
//          debugger;
        },
        mounted: function () {
//          debugger;
			let _this = this;
        	let id = this.$route.query.id;
			this.getHttp('/related/allvideo?id='+id,function(res){
				console.log(res)
				_this.$.each(res.data,function(index,el){
					el.durationms = _this.$formatTime(el.durationms/1000)
					el.playTime = _this.$Playback(el.playTime)
				})
				_this.xgmv = res.data
			})
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
        		_this.video.playing = false;
        	},
        	//取消/收藏
        	likeClick($event){
        		if(this.logH){
        			var that = this
        			
        			if(this.CancelFavorite){
        				var cades = this.$collection(this,{
				  		resAction:'video',
				  		actionT:1
				  	},$event,0,function(data){
        				if(data == 200 ){
	        				that.$root.eventVue.$emit('sccgHidden',false);
	        				that.faDis=true;
	        				that.CancelFavorite = false;
	        			}
        			})
        			}else{
        				var cades = this.$collection(this,{
				  		resAction:'video',
				  		actionT:2
				  	},$event,0,function(data){
        				if(data == 200 ){
	        				that.$root.eventVue.$emit('qxscHidden',false);
	        				that.faDis=false;
	        				that.CancelFavorite = true
	        			}
        			})
        				
        			}
        			
        		}else{
        			
	        		this.$root.eventVue.$emit('classify','l')
	        		this.$toggleBody(1)
	        		this.$drage('auto-id-e0uH7BGEq0gyq7zi')
        		}
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

<style  lang="less" >
	#mv{
		.n-mv {
		    margin-top: -23px;
		    .title {
			    padding-top: 10px;
			    margin-bottom: 8px;
			     h2 {
				    float: left;
				    max-width: 100%;
				    margin-top: -10px;
				    margin-right: 8px;
				    font-size: 24px;
				    line-height: 32px;
				    font-weight: normal;
				    .tag {
					    margin: 7px 5px auto auto;
					}
				}
			}
			.mv {
			    width: 640px;
			    height: 360px;
			    background-color: #2e2e2e;
			    font-size: 0;
			    line-height: 0;
			}
			.btn {
			    margin-right: 10px;
			}
			 .btns {
			    margin: 12px 0 45px;
			}
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
				.pic {
				    display: block;
				    width: 100%;
				    height: 100%;
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
					    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABVklEQVQ4ja2Uv0oDQRCHfxciBDEB1ZewUisrbSRY2gppbMTCwso+YGmnIPgIFoKdjbVG9QGiwUewMFFUc/rZzCXLcYv3b+CY29mZb2d3djYAlFGWJc1Lupb05PUC0n4BcMpYQqDt888C3jZgHzgDhjbeKgKuAD0DtczWsnGvCHjDgVSco3k1eyMeU0lRrKqktv0fSfqNyiNpYP9TeYp3aFk9AzXHPgP8AB9ANctRzAHHBg2B1dj8js1d+s54EbgD3kmWT2AzIfgx5jcArqIEBNx6gN/AObDg2VHHEzcEmnIyrTtBkWS559PAvsV1Ahj1dODWNMGWRuqS+pK+0ly3LFIz/VY2eN30Q9ngXdMXvkLlKd6Kc+0aZWZ8YPpEUr+sjKNH6gWYxRqkKHgC6Jr/XmR3G2QyB7jO+JHq2iIjsK+ls0gINN1FBSwB9/gfof+AN8Aasd38AbkxaSKNmBldAAAAAElFTkSuQmCC');
					}
					 .icn-sub {
					    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAATCAYAAACQjC21AAAAtElEQVQ4jc2UQQrCMBBFJyJdewlPYcDDudGdnsJDuLTH8ArNxgM8F0201Mb+GAQfDKXJ8DIZwhjQACeg450bsAVMDQOOE6Ihd2BdIkyV+dGmA85x71IiTEwlrDKtGBPo29bMCQ3YCcLEXhEq4aOjcwDW46wOzMwWYvI1xixqhXKOWqHMJ2EbT2Wwlv6z1/+2wuzV/7+HSzGvNfGd/uRhh7jgK2Sb+A3KPCzhYLwmdqgQPcfXAx4RU8sIXQekAAAAAElFTkSuQmCC');
					}
					.icn-share {
					    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAYAAABvVQZ0AAAA5ElEQVQ4ja3UPUrEQBgG4G8VUmznGexEsF/XU1ja2IqXsLURPUF6b2BrROzFzitssLESeSw2yhJm3EnIC2FChu9hMn+BCndYSadBlDyB2wwC8JQorDFPYSvAsnQEgFcc9DGAUigA8InzoViFSzT4SExFjXkJdoT3BNDP/TZsX36VB4/sEQAvOMUeAIrnbAH4wkWvD95wuPn9P+wG3zhL9NUy+yyHPeMq8/vZE5DDHrA7FbYYAiFmEOvMYlyarj2ZAvur3xkJJDM51nbvyxH1x127Nmy/HEtyjQhUuEM7Amm72grxA8cG1pzcIdwBAAAAAElFTkSuQmCC');
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
					    .icn {
						    display: inline-block;
						    width: 16px;
						    height: 16px;
						    margin-right: 8px;
						    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAXVBMVEVHcEylp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6ilp6g2dFIdAAAAHnRSTlMALu+7IvwpCZPD4Ob2NfidOwKMrNaE0xCmt9l4QM2HOVJOAAAAhElEQVQYGVXAVwKCMBBF0UtJZkIvKta3/2UK4YtDShCXWxduHjlItgRlwQ2QXhq8N+t9UGUgqS3IilYOOiSyYlBB0i5xcjkXvR5czOudVHFVquZk9c546k42N9q9mdRFsrVpJcGoJpJNpSSwpM6nbfuOQasE2BiUhc8scYj+KMvfUkOq/nbXCovtiIJcAAAAAElFTkSuQmCC') no-repeat center;
						    vertical-align: middle;
						}
					}
				}
				 .layer-end {
				 	.icn {
					    position: relative;
					    display: block;
					    background-repeat: no-repeat;
					    background-position: center center;
					}
					.btn {
					    display: inline-block;
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
						    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAA9lBMVEUAAAD///////8ODg7///8eHh7///9HcEz///+EhITU1NQJCQn///////////////+rq6t3d3cXFxf///////////9ubm43NzdRUVEuLi7///9aWlr///+4uLj////k5OT4+PiBgYH+/v60tLT///++vr7w8PDz8/Onp6e4uLj39/eqqqr///9OTk6IiIjw8PDr6+vExMT////////ExMRra2v7+/s2NjYUFBT////Hx8f///////////+goKApKSnt7e3m5ubo6OjJyckiIiKOjo7////IyMjS0tLm5ube3t7AwMC9vb1ycnLg4OCSkpL///////9m8kqvAAAAUXRSTlNmBhlmTmYJAGZmZmhlQmBHZo1mUSL+ZmZmZi1mW2Yc3PWT/LBMZmbvZrTzqjB9lurkvgJTZoj6dWsPvzw7YaRx593gwm+ZA2bKZtW5uIzYmzKo0XWdAAAC7UlEQVRIx62X53baQBCFRyCJi0QvoYMpxxgBBmyMfVxwL3GL5/1fJsgmwK4ko0S5PwDt0cfuzs7MzlDEVUp9EM9WE0Cimo0P6or7W+QyppfVGATF1LLuCw4lbbIWrRS0MFFYK1SiNZtPhrbCIRXAXpEkFfcAqKFvYT0OGNEwuSgcNYC47g3nEtiNkqeiu0jkPOCDcyCl0TfSUsD5gxusdIAftEU/gI7ihPUsjBJtVcnAoS7DShaPGvlQZoqsIsIHHTxmyJcyj+gcCPA5DI18SjNwtgnngBL5VgnIrWE9sd3Oos0T+gqOI0V/pT0k/8Ah7K433Gh8fZvNyXW31bJuJk3TabSfqC9hFRs+yWx/3rW7vJLVu3N4KtQvOASDJPh+gV71msemeZxujxf4L5k2EPqEk5sT27A5Yb5Or4eO3plvTXnqpA3rMYQF2Hzi2Vx8dT7jJ5EOI6Yv4LJoauYJ77zJqzyy+FQcSaG8gFUURTjfSjsP52jG4r6LUCOkxEAizH23o52zdSkMIKZQHTUJvjFdHeOde8JzDXUaICrPvFRDWjjvnIj2HlAcFeGdhhdMY97ffKwgTioKPh26LRq8gCxV4TeQ38S1aKhSAmGf8DFboptcEOA3Dk1uiWeFYHCgZUsGG54OveC002DSUfX51gvu8UQ+KslJhmyZHvCYm7KTyO4p+dHmqsW/td1TDow5j92nvua2IzDkkDwZSdGzMkb3zhGScjKgdD7vsvB0Sxr9TAZyGrIDYNZ0sDv84paGpAS40Cm32uK++y1+IrcEKKXez7nzPL5f480bzr+Sa+qVkv7XKkfM3dv74eXlcP/F/t30SvridbO0eX+0zkfd/onndSNedOuc1Xu+sqzR86tLIt646AJdscEu90BlRSRyBiPjl81IBY1dSk39llJTuZSK6IeY+i3iViXgunw8/Pfy0X/hqipuJfODr5L57OH/F+sB24RgDUrA1ihgU7ZsBz8W7eAFcLFoBz+82sHfML5y5iCTg2MAAAAASUVORK5CYII=');
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
					.btn-2 .icn {
					    width: 73px;
					    height: 73px;
					    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA9CAMAAAApvJHbAAAArlBMVEVHcEz///90dHQJCQn///8FBQX///8AAAD///////////////8dHR0QEBD///////////////////8DAwOKior///9kZGSoqKhCQkI4ODj///9ZWVklJSVOTk7KysoUFBQuLi78/Pzv7+/n5+cuLi6Pj4+3t7cYGBh0dHROTk7Q0ND5+fne3t5ERET09PQFBQVhYWHExMTa2tr+/v6jo6Ovr6/g4ODf39+FhYX///8ZgEQzAAAAOXRSTlMAFStcGGELZhoCFwFMVhAFEwgSZCcELyI5PQ4yRzYea0L66d9ymrNPjXzI9dZ58WeEvdH+pq3Y15VU14HQAAACgElEQVRIx6WX13qjMBBGR0JCP00WNgYbl3iT7GZLtle9/4vtBXY+20gg4rnmMFVTiAYkSZKEXiHLWBsBAIBgOp5NQGdt2oH7ptkff6EDf1AyANVqW0illFJKFvmKA0jjLIjl60JdSbTmgIhH3DUA3yqn5DXAhuyPgcrDKqVUzoHWZ342B3ZqUFaAcecwYWhyNSJFhdRlfZKCR2pU5AZi5tJcSxUiuz6eMdQLpQLx9Mp3DS5VqGxgsstU7aNgWMkK7bnTQK4mSAGcuT4fy3M/7+zF9hKNnEYrjpeaZzhMhNUTRHZSzdVkqU/KjVP1n/u3Q3SOtHuVgKtOrLU/Pg96Puty7Qy4tda+eXfnpdfQneFPPtra+/c+OoLoKkX5aWs/PnrwCjOiEvUgbT/9+uqpmJioxXqYtvbhmzvqmkh7SvyMtj+/P7qKnREZFKO0tV/6yZcQRCmiANravx+uvwCIABlE95O/R0KehPVpax8uv2hupsVNlodG7dkZtdsyprENqJY7T7XEQZXqKPUt9A2vZIeYKHO3lvEX2mBJRMb9TDqH/d2h6BpbjI23M/2+GxgI7XEMyVd0xeo4jObOqD/f/xvqyFuw0zSopk8DjpJO42A1Fd4ehwERzYBoIl29qCbS7rAPTWBzNv3FNNtzYHm+ncLz0txjpMHlxtqiCXZdcsx7W2YVuD8sarDrbTMzqIK0y7q3rhFRYtAE+B5xpEvXimwwHvl83zf7iLfAZtB6uQO0974oBbDyr6uHBhg6LhINVGtn8BcHDsyXI9eUAbDJrw142gFgZcA1NgeAep0XkVwsZFTkhw0AmDLsIktigyth8ZSTMitjbVIhIFKm29KH/gfyzpD0+K1y0QAAAABJRU5ErkJggg==');
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
					    top: 0;
					    left: 0;
					    right: 0;
					    height: 100%;
					}
					 .dot {
					    position: absolute;
					    top: -10px;
					    right: -12px;
					    display: block;
					    width: 24px;
					    height: 24px;
					    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAATlBMVEUAAABWVlYAAAAAAAAAAAAAAACsrKxHcEwAAAAAAAAAAAD+/v7Ozs4AAAD7+/vw8PDw8PD8/Pz7+/vLy8v////AMjy4JSW/MTvsusLsucFa/UGuAAAAFHRSTlMBPQ4jFwl7AAIGJ/unHPbe4Pb0o5pnj40AAACeSURBVBjTbZGLDsMgCEVRwRbta13t4/9/dKDtXDJvouSeYHgIXRb0WXC7gpiZSK6CoTCLLgSHtlA5wIRmWGKcB4PESiSPRr9uWasfSXKh6xn99pVH7jsAtmaqcDKWQYrgsP3oLakC3aLmTOnUODuFFKKatO9JYwyU4euGR4XsZjXXka76vFWo2VKz+TLmnTs9Y9aFLHUh7dW1l/z3HR9NnRFrL1EwZQAAAABJRU5ErkJggg==') no-repeat center;
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
						    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAMAAABcOc2zAAAARVBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////9X1DS3AAAAF3RSTlMAaX8jBXQwgHxlYmwbKxVQbRBIPE1DCA7eoYEAAABYSURBVAjXbY5JDoAwDAMHKLhl3///VJRSBFLxzRPFNkS5CQhzRdJYyIDK5vaNlwG20i8MtaJog2PXSvKi0EGvDj2gUsDJv8CuBrKXT+gZQ7Pa32FpemvTL5S2BAtdLazZAAAAAElFTkSuQmCC') no-repeat center center;
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
							    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB/HNKOAAAAIVBMVEX19ff19fdHcEz19ff19ff19ff19ffiSE719fffOzvwu8INAVqZAAAAB3RSTlPzvgBNhE5MvuDklQAAADFJREFUCNdjUDJkEFNiUOno6HBisACSzQwSXeUrGhk42mdWNEBJiAhEFqJSKZBBWAkAJkwSmrflNpkAAAAASUVORK5CYII=') no-repeat center;
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
					    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAHAgMAAABB3ES3AAAADFBMVEUCAgI+Pj5HcEw4ODgkC8kmAAAABHRSTlO0awDA/mVZJgAAACRJREFUCB1jOMDAzCxwgodJh0GTiZthCRPT4QlMjLscmBgkGQBKkgUi8CVBlQAAAABJRU5ErkJggg==') no-repeat;
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
					 .left {
					    float: left;
					    position: relative;
					    top: 20px;
					}
					.play {
					    width: 34px;
					    height: 32px;
					    margin: 0 6px;
					    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAP1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////9KjZoYAAAAFHRSTlMAAgUNLURLTToJEiUpSBcE1fVgn9plgu0AAADESURBVCjPfZLJcsQgDESbRWqx2EwS/v9bc7AhjCuDbqpXam0N3JGKiapYSXiPbJxheQEukkc8k2vhjAcZ3SDeqKWNrBWl+bvGKGFVD0K76iLl0ToJIwBkasZzKmUGYKxX/rPUVhoQeNw9+6tO5A8GlEsWQO9f35NFFhjPiXqfoicNwrSg/ro1EgVKt6Ih6qhQtv9Qo34SDJTdGJvh15Xj+8qbQ+3Ou3kK2udXwhu1+jlB/TMA0IZtXHrYZmc2AAjDorPtL+4MCs9tL4/kAAAAAElFTkSuQmCC') no-repeat center;
					}
					.play:hover {
					    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAXVBMVEX///////////////////////////9HcEz////////////////////////////////////////////////////////////////////////////////////////////0ao/XAAAAHnRSTlNoGQgOBRwUACYBIRsQHxEpAyNhCzQKLkdNzVc6WFniYId1AAABW0lEQVQ4y5WU0ZKDIAxFExCKKCBohWrb///MTWqntc7ulL0PMMLxxkgCnPZqn/pYhN320DSNINE07LAXQoAYpX9IjoKgA8KA1KicJTmFWr6hDWkZUHbOSwJIS56tYqh9I21z9minK7x0myz688bAk1Ch0PtlnUOY10JeJagnw8ggiLgB5GCidc5GEzIZESOGDWkbiUSkyUSHmoQumikRg5JtgJIR2hZIs6FMUHuvkTIzc4JitaC0gE3UBDBFhc6yzWNSkdcU28CJTa6QTacxXi7ROR5RdybDlW0IaUacIAWlPZr73cTII3qtQoIJx+YEHCdDMVr2ijdJNKpealMgcyRCvFtgtX6Ue0SO3q6wOM+I8DbB7Poj0rsZkvViQwCCkudPhB4DwH+Qb4EqPvd70hW/ruYAKo5xXwzdVgzdoRgqSqqmMGvK+5cmuR6apKbVahq2pu2rLo+/r6AfJestQtEz7SEAAAAASUVORK5CYII=');
					}
				}
				.progresswrap {
				    position: relative;
				    height: 34px;
				    padding: 15px 10px 0;
				    overflow: hidden;
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
					}
				}
			}
			.ffl {
			    float: left;
			}
			 .full {
			    display: block;
			    width: 34px;
			    height: 34px;
			    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOAQMAAAAlhr+SAAAABlBMVEX///////9VfPVsAAAAAnRSTlMAgJsrThgAAAArSURBVAgdBcAxDQAgDACw8iMJaYhDwCQggYOTY1mIorg8NsFCJzhMhpZafvJPCsNDJhdLAAAAAElFTkSuQmCC') no-repeat center;
			}
			.foh {
			    overflow: hidden;
			    position: relative;
			    top: -20px;
			}
			 .fhide {
			    display: none !important;
			}
		}
		.u-icn2-mvtag {
		    width: 29px;
		    height: 18px;
		    background-position: -230px -480px;
		}
		.n-mv .title .name, .n-mv .title .back {
		    float: left;
		    margin: 4px 0 0 0;
		    line-height: 17px;
		}
		.m-ctvideo.z-pause .poster {
		    display: none;
		     .play {
			    opacity: 1;
			}
		}
		.m-ctvideo.z-active .controls {
		    -ms-transform: translateY(0);
		    transform: translateY(0);
		}
		.m-ctvideo .controls:before {
		    content: '';
		    position: absolute;
		    bottom: 0;
		    left: 0;
		    width: 100%;
		    height: 79px;
		    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAABPCAMAAAD2ruSkAAAAVFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACn9Kj9AAAAHHRSTlMAAkIeBiRLSSk/OTEWBA4uRhELGAk2RCE7GzQTaLGHOAAAAFRJREFUCNdFwocNgDAAA7CyN3TP//+kQRG1LMSn6/i6eBzZWtYa7/pGVSssBc+TjRGpTjgMHAJOU7uu7fPwcXDO6BzuO8eI29b2PXuPUvKytPP8fwGF0geQtf5jJAAAAABJRU5ErkJggg==') repeat-x;
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
		.m-ctvideo .controls .wrap .brs:before {
		    left: 0;
		}
		.m-ctvideo .controls .wrap .brs .options .itm.z-sel, .m-ctvideo .controls .wrap .brs .options .itm:hover {
		    border-top-color: transparent;
		    background: rgba(255, 255, 255, 0.2);
		}
		.m-ctvideo.z-play .controls .wrap .play {
		    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAANlBMVEVHcEz///////////////////////////////////////////////////////////////////+GUsxbAAAAEXRSTlMALQ4SREsnTToECMRICxcvGG65Pc0AAACrSURBVCjPjZJJjgQhDASDwiZtuujl/5+dQ01XL0LM5MESCinxkvCr0cLcLdrgUzV0Kuo7KdJerp0c17JL5QQZ8pbnq7kiT2Lbu8dmT3aT9c+fu+kGUOWV765cFQg1AC6XV6UpYNN++D4er0ru2miH7ReiqBG6z9BdganPUJfhYoaQ48oZSjmmMUNDtmpj0fxi5MWiVuulzI5S/jrlIgCQz9jQj9jkv8I2jegP2ZgJU4kz3cYAAAAASUVORK5CYII=');
		}
		.m-ctvideo .controls .wrap .play:hover {
		    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAZlBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9ulurIAAAAIXRSTlMACQgYESEcA2gGDg0lFCkeYRUuV2YyS0hNOlk2RXj2263YUJsCAAABVElEQVQ4y5WU6XKDMAyEY3zJFz4wV0gP3v8lK5dA0zSdOPrFwDfelbzidHqppFTXkvIxoIjR7Lu0IUo+ArSjwnMsL6jTfyDZGCd4unQh59BdEhfONL8YRRjlSwdHdQunjNwwkjDRTgBhmFPbpnkIAFMrbhjZIHGGfGktGvGe2/aS4YzMoaUMRSL0Fn3G0lEUtg/IUKN2GccnCGgxRsc0aZriLAWYuLtKKS0WyD36Y5Riu42SykTeZ1iEVvshHYyWau38ZyqdFIbaEbrrMdLQHkLxj6/Xj8EKVxjsIEBPjdx0RphsJPhg1/X9zfJolCLRDjBuSor5DmbO1IasaxEzOEw+Q+fZhvAAyf8gKIYeCPMJAt+RDC2eeCAoRk0ZOORXkOdCz+0+b7pidBUXUHGNNWGoiNQRzBGD6bdgjnfBrIj3v0uiXlu1moWtWfuqn8fOne4/fwHyLiZPlvQt6gAAAABJRU5ErkJggg==');
		}
		u-btn2 {
		    padding: 0 5px 0 0;
		    white-space: nowrap;
		    i {
			    padding: 0 15px 0 20px;
			    pointer-events: none;
			}
		}
		.u-btn2, .u-btn2 i {
		    display: inline-block;
		    *display: inline;
		    *zoom: 1;
		    height: 31px;
		    line-height: 31px;
		    overflow: hidden;
		    *line-height: 32px;
		    vertical-align: top;
		    text-align: center;
		    cursor: pointer;
		    width: auto;
		}
		.u-btn2, .u-btn2:hover {
		    text-decoration: none;
		}
		.u-btn2-1 {
		    color: #333;
		    background-position: right -100px;
		    i {
			    color: #333;
			    background-position: 0 -59px;
			}
		}
		.u-btn2-1:hover {
		    color: #333;
		    background-position: right -182px;
		     i {
			    color: #333;
			    background-position: 0 -141px;
			}
		}
		u-btn2-icn i {
		    padding: 0 5px 0 10px;
		}
		.u-btn2 .icn-praise, .u-btn2 .icn-praised {
		    width: 17px;
		    height: 15px;
		    margin: 8px 6px 0 0;
		    background-position: 0 -95px;
		}
		.u-btn2 .icn {
		   float: left;
		} 
		.u-btni-share, .u-btni-fav, .u-btni-cmmt, .u-btni-dl {
		    background-position: right -1020px;
		}
		.u-btni-share i, .u-btni-fav i, .u-btni-cmmt i, .u-btni-dl i, .u-btni-unfav i {
		    padding-right: 2px;
		    padding-left: 28px;
		}
		.u-btni-fav i {
		    background-position: 0 -977px;
		}
		.u-btni-share:hover, .u-btni-fav:hover, .u-btni-cmmt:hover, .u-btni-dl:hover {
		    background-position: right -1106px;
		}
		.u-btni-fav:hover i {
		    background-position: 0 -1063px;
		}
		.u-btni-share i {
		    background-position: 0 -1225px;
		}
		.u-btni-share:hover i {
		    background-position: 0 -1268px;
		}
		.u-btni, .u-btni i {
		    float: left;
		    height: 31px;
		    line-height: 30px;
		    min-width: 23px;
		    cursor: pointer;
		}
		.u-btni {
		    padding: 0 5px 0 0;
		    white-space: nowrap;
		}
		
		.m-ctvideo .controls .wrap .volume .mute:hover {
		    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAA1klEQVQokaXSoUpEYRAF4M9fw4LJYHFBUKNPoGbjKtuM2+yGrb6AsA8gLNdq0HcQ2aBWq81kMRk9lhXkcq93YQemnMM5M8wcSbR0L8llDauS3CU5+sWK5trBDQY1fAXbmOAEmiYPkjwmeZn3X64kGSV5TjJLsrWGY1xgs2UbmGIV56jQxxBnBeMOMfSwjxHgHnBYsNEhhivAAeAN0G87Yr2+Aet1ouBjAYMx4AGwC3gvmOCzw+ALr5gChoDZ0m9sS+FektsGg2qOPSU5TdIYpP+ifF2P8g/2ehMg7DdaPQAAAABJRU5ErkJggg==');
		}
		.m-ctvideo .controls .wrap .full:hover {
		    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOAQMAAAAlhr+SAAAABlBMVEX///9HcExwQjx2AAAAAnRSTlPMABHcVXoAAAAtSURBVAgdBYCxDQAQEADvrxYxgCGMZkUj6RTihbiCFQ92bFiI3OQgm8zIxUP4r0gJqtt6EUUAAAAASUVORK5CYII=');
		}
		.m-ctvideo.z-play .controls .wrap .play:hover {
		    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAXVBMVEX///////////////////////////9HcEz////////////////////////////////////////////////////////////////////////////////////////////0ao/XAAAAHnRSTlNoGQgOBRwUACYBIRsQHxEpAyNhCzQKLkdNzVc6WFniYId1AAABW0lEQVQ4y5WU0ZKDIAxFExCKKCBohWrb///MTWqntc7ulL0PMMLxxkgCnPZqn/pYhN320DSNINE07LAXQoAYpX9IjoKgA8KA1KicJTmFWr6hDWkZUHbOSwJIS56tYqh9I21z9minK7x0myz688bAk1Ch0PtlnUOY10JeJagnw8ggiLgB5GCidc5GEzIZESOGDWkbiUSkyUSHmoQumikRg5JtgJIR2hZIs6FMUHuvkTIzc4JitaC0gE3UBDBFhc6yzWNSkdcU28CJTa6QTacxXi7ROR5RdybDlW0IaUacIAWlPZr73cTII3qtQoIJx+YEHCdDMVr2ijdJNKpealMgcyRCvFtgtX6Ue0SO3q6wOM+I8DbB7Poj0rsZkvViQwCCkudPhB4DwH+Qb4EqPvd70hW/ruYAKo5xXwzdVgzdoRgqSqqmMGvK+5cmuR6apKbVahq2pu2rLo+/r6AfJestQtEz7SEAAAAASUVORK5CYII=");
		}
		.showLoading{
			display: block;
		}
		.m-ctvideo.z-play .poster {
		    display: none;
		}
		.m-ctvideo.z-play .player .play {
		    opacity: 0;
		}
		.m-ctvideo.z-pause .player .play {
		    opacity: 1;
		}
		.m-ctvideo .controls .progress-2:hover .j-ht {
		    display: block;
		}
		.m-ctvideo .controls .progress-2 .j-ht .hovertime {
		    border: 1px solid rgba(255, 255, 255, 0.2);
		    padding: 5px;
		    background: rgba(0, 0, 0, 0.7);
		}
		.m-ctvideo .controls .wrap .volume.z-mute .mute {
		    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAAYUlEQVQYlYXQMQ6DMBBE0QdyKpQyvgRNjoFwGw6bcyHRmsYpInlh2vn6mt2h1irIAyUF5Qsbcg94ozSDhBkLnj1VwoopGjJelT/gMiP2O+CLIwKGzqP+zuwBkPFBjgDNUE4+0RIz4d8YGgAAAABJRU5ErkJggg==");
		}
		.m-ctvideo .controls .wrap .volume.z-mute .mute:hover {
		    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAAZ0lEQVQYlYXQsQ3CQBBE0XfWBaQELgBcC6GbcXIl2JkLoiQSOlgSEyDdmknn62t2S0RIckGrSXnDhqkHzGiHQcUDC8aeqkTEE9dsyHBWfoHTDHj9A3a8M6B0HvVzZg+ACSvuGeAwtA8l7xdMN4c25QAAAABJRU5ErkJggg==");
		}
		.m-ctvideo .controls .wrap .volume:hover .sliderbg {
		    display: block;
		}
		.m-ctvideo .controls .wrap .brs .options .itm.z-sel, .m-ctvideo .controls .wrap .brs .options .itm:hover {
		    border-top-color: transparent;
		    background: rgba(255, 255, 255, 0.2);
		}
		.m-ctvideo .controls .wrap .brs:hover .current {
		    color: #fff;
		}
		.m-ctvideo .controls .wrap .brs:hover .options {
		    display: block;
		}
		.m-ctvideo .controls .wrap .brs .options .itm.z-sel .label:before {
		    content: '';
		    position: absolute;
		    top: 9px;
		    left: 4px;
		    display: block;
		    width: 10px;
		    height: 8px;
		    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAMAAAD3JJ6EAAAABlBMVEVHcEy8vLzZyZ02AAAAAXRSTlMAQObYZgAAAB5JREFUCNdjYIABRgSLEZnFiBBDEGAKro6RkRHdGAADhgAVO+yZBgAAAABJRU5ErkJggg==") no-repeat center;
		}
		
		.m-ctvideo .controls .wrap .brs:after {
		    right: 0;
		}
		.m-ctvideo .controls .wrap .arrow:before, .m-ctvideo .controls .wrap .arrow:after {
		    content: '';
		    position: absolute;
		    top: 0;
		    border-top: 1px solid rgba(255, 255, 255, 0.2);
		    background: rgba(0, 0, 0, 0.7);
		}
		.m-ctvideo .controls .wrap .brs .options .arrow:before, .m-ctvideo .controls .wrap .brs .options .arrow:after {
		    width: 27px;
		}
		.m-ctvideo .controls .wrap .arrow:after {
		    right: -1px;
		}
		.m-ctvideo .controls .wrap .arrow:before {
		    left: -1px;
		}
		.m-ctvideo .controls .wrap .brs:hover .bridge {
		    position: absolute;
		    top: -150%;
		    left: 0;
		    width: 100%;
		    height: 300%;
		}
		.m-ctvideo.z-fullscreen {
		    position: fixed;
		    top: 0;
		    left: 0;
		    bottom: 0;
		    right: 0;
		    width: 100%;
		    height: 100%;
		    z-index: 1000;
		   .controls {
			    height: 59px;
			    -ms-transform: translateY(100%);
			    transform: translateY(100%);
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
					.brs{
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
			.player {
				.opbar {
				    display: none;
				    z-index: 1;
				}
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
			}
			.foh {
			    top: -8px;
			}
		}
		.m-ctvideo.z-fullscreen.z-active {
			.player .opbar {
			    display: block;
			}
			.controls {
			    -ms-transform: translateY(0);
			    transform: translateY(0);
			    
			}
			.wrap .play {
			    display: block;
			}
		}
		.m-ctvideo .player .opbar:before {
		    content: '';
		    position: absolute;
		    top: 0;
		    left: 0;
		    display: block;
		    width: 100%;
		    height: 139px;
		    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAACLCAMAAAB817gGAAAAWlBMVEUiIiIBAQENDQ0XFhYhISEDAwQgICBHcEwCAgIkIyMaGhocHBwjIyMdHR0LCwsJCQoSEhIFBQUTFBQfHx8VFRUODg4YGBgHBwcQEBAICAgbGxsGBgYREREAAADJlGhQAAAAHnRSTlNHAhksQwhAAAVMMjdJOhUSIwomPSkbLw4eEDQMIE0CDJsGAAAAcklEQVQY03XECRKDIABD0bhWUUFcQfT+1ywUGIShmZeP50HfZ4xjJLu61jdNtG1qXYNpigxD5LocQkBsf44jqKrItgXL8jJjfrlvQ+gKCG/fndIqPQpagtKAMU9CMkhpnKejLAXFwbmr1jSprssoij8+X3InDVGVb/bRAAAAAElFTkSuQmCC") repeat-x;
		}
		.m-ctvideo.z-fullscreen.z-play{
			 .controls {
			 	.wrap {
			 		.paly{
			 			background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAQlBMVEVHcEz////////////////////////////////////////////////////////////////////////////////////1bZCPAAAAFXRSTlMAG0dEBi0RTUsBNAsjOA/EMRYpP0hrD9IEAAABE0lEQVQ4y5WV226EMAxEJ9exE8IiYP//V/tQ2g1baLx+iYROZHtiD0Afmqey7SL7VqasuIu4BnYR1niNJSFDcnNUjbNLgZR0gTpPltx/yYX07g3TRLb6frk2MvWlqjbK9DeLYhK2jtRCn68bzJ7lRSb6eidF9Uy/fVDyrWbIwqOj6OnuOajjHo/EDf+Ftu/kVaQr8PE4nwBQKRXAyqW7/nyeTwDAwhXQwDwCM4MiM2AEIjBjesl0DyZOKGdtrkHHgo3zGJy5wTOOwUgPoY5BpdhBc2pzM2Z5zIKbn9A8FOYxQ7QMbrSsAo5VGC0XHH38bF3tBmC3FGijXNbpziYFNdrej5EuZyNdLoz0A2u2m/3g9/EF2uIQ+vBZ08gAAAAASUVORK5CYII=");
			 		}
			 		.play:hover{
			 			background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAaVBMVEVHcEz////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////dvhWBAAAAInRSTlMABhoYEQ9rDBQiFgQDHCQmCAEKHzIuKmRoNVVQXEVAN8tLkjt/0QAAAn9JREFUSMelloeW2yAQRa0GAgVYC6NebP//R+bNyNJWOwmZc9Y+i7m8aZTT6Yudz+dfnwwDp9dGRFVVSZK8wRKyirg/IJhe11IWbFLWNdAX2AORRZ6Xh+V5IV9gB1LqLE0NW5pmWh/YTzIVHCtynRnv1WHemwwYnKy+iTFTy7wEolw/D1Pbde00zL1TwMpc1t8oMElSF4TYcGvFB2tvwRJW1HDxE8VMXqZeNWOHiePSh6YJ/TJigW5slE/LnKmPTLUxdsGkYXXOWo7IOrcOWGSxG1W9Uzuj3CjE1DtL4bMhJdb1kxCjU18oOId4UtVg0dlR5JRpsiw1hM2Qb0Ahrh0C8ybhmxtEtzpEnWpNVaUaaw3MurUTg4OHKNiDIqE883YUHSWYEADURRuXUhE6MVqf5bsUCRWlUQvpKCSXRXaIsMwo0lqUKYuHFCAJoaZFPMqwytZ0x3epQc2ibSAlGWIhbeDcRAzPzdB8WcqfGdNETXDQ6E3qIRQ6cbEeXVZQK12vnu16pRbCmPb2IrqwS50rjuiG9HBSJS17vzu2+53EJRcEyb1xVNX5RKnT3rViJXHsP8hicsMGmBavawpgFa2DL0jgact3jwFFdaCKKUwOITQhAH4fxcL9lnVANDCjUXgAPxuLyRdQ4QLYGiopLYwmm2mJAxrEsqUm2SG2B5RsCV7EcECUh0n0W+meQpjUi4kmEcT/tyJQ7pJnUEL5C6LllXeoExzxc4jzI7r/h/7VvahExKU8qrjP2ii8aqOIho3aGnGb8Nl2z15s96iDJe4Iizos447lqAsg7qqJutTirs+4izrqSfDD48Nuf68eH3HPnMgHVdzTLfKR+LfP0d8lhG9Py+COrwAAAABJRU5ErkJggg==")
			 		}
			 	}
			 }
		}
		.n-mvlist {
		    margin-bottom: 20px;
		    li {
			    float: left;
			    width: 200px;
			    margin-bottom: 15px;
			    .link {
				    background: url("data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==");
				}
			}
			.cnt {
			    margin-left: 105px;
			    p {
				    line-height: 16px;
				}
			    .tit {
				    line-height: 21px;
				}
				.tag {
				    margin: -1px 4px auto auto;
				}
			}
		}
		.u-cover-8 {
		    width: 96px;
		    height: 54px;
		}
		.u-msk-1 {
		    width: 90px;
		    height: 20px;
		    background-position: 0 0;
		}
		.u-cover .ci {
		    position: absolute;
		    top: 0;
		    right: 0;
		    padding-right: 5px;
		    height: 20px;
		    line-height: 20px;
		    color: #fff;
		    box-sizing: border-box;
		    text-align: right;
		    text-shadow: -2px 1px rgba(0,0,0,.4);
		    .u-icn2-mv {
			    margin: -2px 2px 0 0;
			}
		}
		.u-icn2-mv {
		    width: 15px;
		    height: 10px;
		    background-position: -60px -310px;
		}
		.f-link {
		    position: absolute;
		    top: 0;
		    left: 0;
		    display: block;
		    width: 100%;
		    height: 100%;
		}
		.u-icn2-smvtag {
		    width: 26px;
		    height: 16px;
		    background-position: -270px -480px;
		}
		.g-sd4 {
		    position: relative;
		    float: right;
		    width: 270px;
		    zoom: 1;
		    text-align: left;
		}
		.g-wrap7 {
		    padding: 20px 40px 40px 30px;
		}
		.u-btni-unfav {
		    background-position: right -3123px;
		    i {
			    background-position: 0 -3080px;
			}
		}
		.u-btni-unfav:hover {
		    background-position: right -3223px;
		    i {
			    background-position: 0 -3180px;
			}
		}
	}
	@keyframes video-loading-spin{
			from{
				transform: rotateZ(0);
			}
			to{
				transform: rotateZ(-360deg);
			}
		}
		@-webkit-keyframes video-loading-spin{
			from{
				transform: rotateZ(0);
			}
			to{
				transform: rotateZ(-360deg);
			}
		}
</style>