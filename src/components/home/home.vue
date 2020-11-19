<template>
	<div id="home" v-wechat-title="this.title" >
		<div class="n-ban d-flag " id="index-banner">
			
    		<div class="wrap f-pr">
    			<div class=" wr" v-if="banners.length>0">
					 <div v-swiper:mySwiper="swiperOption" >
					    <div class="swiper-wrapper"  >
					      <div class="swiper-slide" v-for="(banner,index) in banners"  :data-targetType = 'banner.targetType' :data-href="banner.url" v-bind:key="index">
					        <router-link v-for = "item in bannersType"  :to="{path:item.path,query:{id:banner.encodeId}}"   v-if="item.targetType == banner.targetType && item.targetType != 3000">
					        	<img :src="banner.imageUrl">
					        </router-link>
					         <router-link   to="/"  v-else-if="item.targetType == 3000&&item.targetType == banner.targetType" @click.native="seehref(banner.url)">
					        	<img :src="banner.imageUrl" >
					        </router-link>
					      </div>
					    </div>
	    				
					    <div class="swiper-pagination"></div>
					 </div>
					 <a href="javascript:void(0);" class="swiper-button-prev">&lt;</a>
	    			 <a href="javascript:void(0);" class="swiper-button-next">&gt;</a>
				</div>
				<div class="u-load s-fc4" v-else>
					<i class="icn"></i>			
				</div>
				<div class="download f-pr">
	    			 <router-link :to="{path:'/banner',query:{type:'downloadapp',source:'banner'}}" class="btn">下载客户端</router-link>
	    			 <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
	    			 <span class="shadow"></span>
	    			 <span class="shadowr"></span>
	    		</div>
	    		
    		</div>
		</div>
		<div class="wrap">
			<!--热门推荐-->
	    		<div class="g-bd1 f-cb" id="discover-module">
	    			<div class="g-mn1">
	    				<div class="g-mn1c">
	    					<div class="g-wrap3">
		    					<div class="n-rcmd">
		    						<div class="v-hd2">
		    							<router-link to="/discover/playlist/" class="tit f-ff2 f-td">热门推荐</router-link>
		    							<div class="tab">
		    								
		    								<div class="tab-list" v-for="(item, index) of catList" v-bind:key="index">
		    									<router-link :to="{path:item.path,query:{cat:item.cat}}" class="s-fc3">{{item.cat}}</router-link>
		    									<span class="line"  v-bind:hidden=" index == catList.length-1">|</span>
		    								</div>
		    							</div>
		    							<span class="more">
			    							<router-link to="/discover/playlist/">更多</router-link>
			    							<i class="cor s-bg s-bg-6"></i>
			    						</span>
		    						</div>
		    						<ul class="m-cvrlst f-cb" v-if="hotTj.length>0">
		    							<li v-for="(item,index) of hotTj" v-bind:key="index">
		    								<div class="u-cover u-cover-1">
		    									<img :src="item.picUrl"/>
		    									<i class="u-jp u-icn2 u-icn2-jp3"  :class="{'hidden':!item.highQuality}"></i>
		    									<router-link :to="{path: !item.program ? '/playlist': '/dj',query:{id:item.id}}" class='msk' :title="item.name"  data-res-action="log"></router-link>
		    									<div class="bottom">
		    										<span class="icon-play f-fr f-hand" title="播放" :data-res-type="item.type" :data-res-id="item.id" data-res-action="play" @click.stop="playSong($event)"></span>
		    										<span class="icon-headset"></span>
		    										<span class="nb">{{item.playCount}}</span>
		    									</div>
		    								</div>
		    								<p class="dec">
		    									<router-link :to="{path:!item.program ? '/playlist': '/dj',query:{id:item.id}}" class="tit s-fc0">
		    										<i class="u-icn u-icn-53"  :class="{'hidden':item.type == 13}"></i>
		    										{{item.name}}
		    									</router-link>
		    								</p>
		    							</li>
		    						</ul>
		    						<div class="u-load s-fc4" v-else>
										<i class="icn"></i>			
									</div>
		    					</div>
		    					
		    					<div class="n-rcmd" v-if="resource.length>0">
		    						<div class="v-hd2">
		    							<span class="tit f-ff2 f-tdn">个性化推荐</span>
		    						</div>
		    						<ul class="m-cvrlst m-cvrlst-idv f-cb">
		    							<li>
		    								<router-link to="/discover/recommend/taste" class="date u-date f-alpha" titile="每日歌曲推荐">
		    									<span class="head">{{dayweb}}</span>
		    									<span class="bd">{{day}}</span>
		    									<span class="mask f-alpha" titile="每日歌曲推荐"></span>
		    								</router-link>
		    								<p class="dec">
		    									<router-link to="/discover/recommend/taste" class="tit s-fc0" title="每日歌曲推荐">每日歌曲推荐</router-link>
		    								</p>
		    								<p class="idv s-fc4" title="根据你的口味生成，每天6:00更新">
		    									根据你的口味生成，<br>每天6:00更新
		    								</p>
		    							</li>
		    							<li v-for="(item,index) in resource" v-bind:key="index">
		    								<div class="u-cover u-cover-1">
		    									<img :src="item.picUrl"/>
		    									<router-link :to="{path:'/playlist',query:{id:item.id}}" class="msk" title="item.name"></router-link>
		    									<div class="bottom">
		    										<span class="icon-play f-fr" data-res-action="play" data-res-type="13" :data-res-id="item.name" title="播放" @click.stop="playSong($event)"></span>
		    										<i class="icon-headset"></i>
		    										<span class="nb">{{item.playcount}}</span>
		    									</div>
		    								</div>
		    								<p class="dec f-brk">
		    									<router-link :to="{path:'/playlist',query:{id:item.id}}" class="tit s-fc0" :title="item.name">{{item.name}}</router-link>
		    								</p>
		    								<p class="idv f-brk s-fc4">
		    									<em>{{item.copywriter}}</em>
		    									<span class="btn s-bg s-bg-13 cursor" data-index="0" data-action="dislike" data-res-type="1" :data-res-id="item.id">不感兴趣</span>
		    								</p>
		    							</li>
		    						</ul>
		    					</div>
		    					<div class="u-load s-fc4" v-else-if="!loginBs">
									<i class="icn"></i>			
								</div>
		    					<div class="n-new">
		    						<div class="v-hd2">
		    							<router-link to="/discover/album/" class="tit f-ff2 f-td">新碟上架</router-link>
		    							
		    							<span class="more">
			    							<router-link to="/discover/album/">更多</router-link>
			    							<i class="cor s-bg s-bg-6"></i>
			    						</span>
		    						</div>
		    						<div class="n-disk" v-if="discShelves.length>0">
		    							<div class="inner">
		    								<div class="roll f-pr" >
												
												  <swiper :options="swiperDisc" ref="mySwiperDisc">
											        <swiper-slide
											          class="swiper-item"
											          v-for="(item,index) in discShelves"
											          :key="index"
											          
											        >
												         <div class="u-cover u-cover-alb1">
													        <img :src="item.picUrl"/>
													        <router-link class="msk" :to="{path:'/album',query:{id:item.id}}" :title="item.name"></router-link>
													        <span class="icon-play f-alpha f-fr f-hand" title="播放" :data-res-type="item.type" :data-res-id="item.id" data-res-action="play" @click.stop="playSong($event)"></span>
													    
													    </div>
													    <p class="f-thide">
													        <router-link class="s-fc0 tit" :to="{path:'/album',query:{id:item.id}}" :title="item.name">{{item.name}}</router-link>
													    </p>
													    <p class="tit f-thide">
													        <router-link class="s-fc3" :to="{path:'/artist',query:{id:item.artist.id}}" :title="item.name">{{item.artist.name}}</router-link>
													    </p>
											        </swiper-slide>
											      </swiper>
												 
											</div>
											<a href="javascript:void(0);" class="click-flag pre s-bg s-bg-7 f-tdn">&nbsp;</a>
								    		<a href="javascript:void(0);" class="click-flag nxt s-bg s-bg-8 f-tdn">&nbsp;</a>
		    							</div>
		    							
		    						</div>
		    						<div class="u-load s-fc4" v-else>
										<i class="icn"></i>			
									</div>
		    					</div>
		    					<div class="n-bill">
		    						<div class="v-hd2">
		    							<router-link to="/discover/toplist/" class="tit f-ff2 f-td">榜单</router-link>
		    							
		    							<span class="more">
			    							<router-link to="/discover/toplist/">更多</router-link>
			    							<i class="cor s-bg s-bg-6"></i>
			    						</span>
		    						</div>
		    						<div class="n-bilst" v-if="homeLists.length>0">
		    							<dl class="blk" v-for="(item,index ) in homeLists"  :class="{'blk-1':index == homeLists.length-1}" v-bind:key="index">
		    								<dt class="top" >
		    									<div class="cver u-cover u-cover-4">
		    										<img :src="item.playlist.coverImgUrl" class="j-img"/>
		    										<router-link :to="{path:'/discover/toplist',query:{id:item.playlist.id}}" :title="item.playlist.name" class="msk"></router-link>
		    									</div>
		    									<div class="tit">
		    										<router-link :to="{path:'/discover/toplist',query:{id:item.playlist.id}}" :title="item.playlist.name">
		    											<h3 class="f-fs1 f-thide">{{item.playlist.name}}</h3>
		    										</router-link>
		    										<div class="btn">
		    											<span class="s-bg s-bg-9 f-tdn cursor" hidefocus="true"  :data-res-id="item.playlist.id" data-res-from="31" data-res-action="play" :data-res-type="item.playlist.type" :data-res-idx ="item.playlist.idx" @click.stop="playSong($event)" title="播放"></span>
		    											<span class="s-bg  f-tdn cursor subscribe-flag " :class="[item.faDis?'s-bg-10-slt':'s-bg-10']" hidefocus="true" :data-plid="item.playlist.id" title="收藏"  @click.stop="scColick($event)" :data-index="index"></span>
		    										</div>
		    									</div>
		    								</dt>
		    								<dd>
		    									<ol>
		    										<li v-for="(list,num) of item.playlist.tracks" v-bind:key="num"   onmouseover="this.className='z-hvr'" onmouseout="this.className=''">
		    											<span class="no " :class="{'no-top': num<=2}">{{num+1}}</span>
		    											<router-link :to="{path:'/song',query:{id:list.id}}" :title="list.name" class="nm s-fc0 f-thide">{{list.name}}</router-link>
		    											<div class="oper">
		    												<span class="s-bg s-bg-11 cursor" hidefocus="true"  :data-res-id="list.id" data-res-action="play" :data-res-type="list.type" :data-res-data="item.playlist.id" :data-res-idx ="item.playlist.idx" title="播放" @click.stop="playSong($event)"></span>
		    												<span class="u-icn u-icn-81 cursor" title="添加到播放列表" hidefocus="true" :data-res-id="list.id"   :data-res-data="item.playlist.id"></span>
		    												<span class="s-bg s-bg-12 cursor" title="收藏" hidefocus="true"  :data-res-fee="list.fee"  :data-res-id="list.id" ></span>
		    											</div>
		    										</li>
		    									</ol>
		    									<div class="more">
		    										<router-link :to="{path:'/discover/toplist',query:{id:item.playlist.id}}" class="s-fc0">查看更多></router-link>
		    									</div>
		    								</dd>
		    							</dl>
		    						</div>
		    						<div class="u-load s-fc4" v-else>
										<i class="icn"></i>			
									</div>
		    					</div>
		    				</div>
	    				</div>
	    			</div>
	    			<div class="g-sd1">
	    				<div class="n-myinfo n-myinfo-1 s-bg s-bg-1" v-if="loginBs">
	    					<p class="note s-fc3">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
	    					<span class="btn s-bg s-bg-2 f-tdn cursor" data-idName="l" @click.stop="logShow($event)">用户登录</span><!--v-on:click.stop="login()"-->
	    				</div>
	    				<div class="n-myinfo n-myinfos s-bg s-bg-5" v-else>
	    					<div class="f-cb">
	    						<router-link :to=" {path:'/user/home',query:{id:loginData.profile.userId}}" class="head f-pr">
	    							<img :src="loginData.profile.avatarUrl"/>
	    						</router-link>
	    						<div class="info">
	    							<h4>
	    								<router-link :to=" {path:'/user/home',query:{id:loginData.profile.userId}}" class="nm nm-icn f-fs1 f-ib f-thide">
	    									{{loginData.profile.nickname}}
	    								</router-link>
	    								
	    							</h4>
	    							<p>
	    								<router-link to="/user/level" class="u-lv u-icn2 u-icn2-lv">
	    									{{loginData.level}}
	    									<i class="right u-icn2 u-icn2-lvright"></i>
	    								</router-link>
	    							</p>
	    							<div class="btnwrap f-pr">
	    								<span class="u-btn2 sign  " :class="[signs?' u-btn2-2':'u-btn2-dis']" @click.stop="dailySignin">
	    									<i>{{signs?'签到':'已签到'}}</i>
	    								</span>
	    							</div>
	    						</div>
	    					</div>
	    					<ul class="dny s-fc3 f-cb">
	    						<li class="fst"> 
	    							<router-link to="{path:'/user/event',query:{id:loginData.profile.userId}}">
	    								<strong>{{loginData.profile.eventCount}}</strong>
	    								<span>动态</span>
	    							</router-link>
	    						</li>
	    						<li >
	    							<router-link to="{path:'/user/follows',query:{id:loginData.profile.userId}}">
	    								<strong>{{loginData.profile.follows}}</strong>
	    								<span>关注</span>
	    							</router-link>
	    						</li>
	    						<li class="lst">
	    							<router-link to="{path:'/user/fans',query:{id:loginData.profile.userId}}">
	    								<strong>{{loginData.profile.followeds}}</strong>
	    								<span>粉丝</span>
	    							</router-link>
	    						</li>
	    					</ul> 
	    				</div>
	    				<div class="n-dj n-dj-1">
		    				<h3 class="v-hd3">热门主播</h3>
		    				<ul class="n-hotdj f-cb" v-if="hotZb.length>0">
		    					<li v-for="(item,index) in hotZb" :key="index" v-bind:hidden="index>20">
		    						<router-link :to="{path:'/user/home',query:{id:item.id}}" class="cver">
		    							<img :src="item.picUrl" class="j-img"/>
		    						</router-link>
		    						<div class="info">
		    							<p>
		    								<router-link :to="{path:'/user/home',query:{id:item.id}}" class="nm-icn f-thide s-fc0">{{item.name}}</router-link>
		    								<sup class="u-icn u-icn-1"></sup>
		    							</p>
		    							<p class="f-thide s-fc3">
		    								{{item.rcmdtext}}
		    							</p>
		    						</div>
		    					</li>
		    				</ul>
		    				<div class="u-load s-fc4" v-else>
								<i class="icn"></i>			
							</div>
		    			</div>
	    			</div>
	    			
	    		</div>
		</div>
		
	</div>
	
</template>

<script>
	import eventVue from '../../../static/js/eventVue.js'
	export default {
		name:'home',
	    data () {
	    	let _this = this
	      return {
	      	zSlt:'tj',
	      	topList:[19723756,3779629,2884035],
	      	homeLists:[],
	      	hotTj:[],
	      	hotZb:[],
	        banners: [],
	        bannersType:[
	        				{targetType: 1,path:'/song'},
	        				{targetType: 1004,path:'/mv'},
	        				{targetType: 3000,path:'banners.url'},
	        				{targetType: 10,path:'/album'},
	        				{targetType: 1000,path:'/playlist'},
	        				{targetType: 1005,path:'/topic'},
	        				{targetType: 1001,path:'/dj'},
	        				{targetType: 1009,path:'/djradio'}
	        			],
	        catList:[
		    		 {cat:'华语',path:'/discover/playlist/'},
		    		 {cat:'流行',path:'/discover/playlist/'},
		    		 {cat:'摇滚',path:'/discover/playlist/'},
		    		 {cat:'民谣',path:'/discover/playlist/'},
		    		 {cat:'电子',path:'/discover/playlist/'}
		    		 ],
	         swiperOption: {
		          loop: true,
		          effect : 'fade',
				  observer: true,//修改swiper自己或子元素时，自动初始化swiper
          		  observeParents: true,//修改swiper的父元素时，自动初始化swiper
		          pagination: {
		            el: '.swiper-pagination',
					clickable :true,
		          },
		          navigation: {
				      nextEl: '.swiper-button-next',
				      prevEl: '.swiper-button-prev',
				    },
		          autoplay: {
				    delay: 4000,
				    stopOnLastSlide: false,
				    disableOnInteraction: false,
				  },
		          on: {
		          	click(){
		          		
		          	},
		            slideChange() {
//		              console.log('onSlideChangeEnd', this);
					  //console.log(this.slides[this.activeIndex].children[0].children[0].currentSrc)
					  var img = this.slides[this.activeIndex].children[0].children[0].currentSrc;
						//获取图片的颜色
						/*_this.$rgbaster.colors(img, {
						  success: function(payload) {
						    // payload.dominant是主色，RGB形式表示
						    // payload.secondary是次色，RGB形式表示
						    // payload.palette是调色板，含多个主要颜色，数组
						    //console.log(payload.dominant);
						    //console.log(payload.secondary);
						    //console.log(payload.palette)[];
						    _this.$getId('index-banner').style.backgroundColor=payload.dominant;
						  }
						});*/
						_this.$getId('index-banner').style.backgroundImage = 'url('+img+'?imageView&blur=40x20)';
						_this.$getId('index-banner').style.backgroundSize = '6000px';
						_this.$getId('index-banner').style.backgroundPosition = 'center center'
		            },
		            tap() {
		              console.log('onTap', this);
		            },
		            
		        }
		    },
		    discShelves:[],
		    swiperDisc:{
		    	loop:true,
		    	observer: true,//修改swiper自己或子元素时，自动初始化swiper
          		observeParents: true,//修改swiper的父元素时，自动初始化swiper
          		navigation: {
				      nextEl: '.nxt',
				      prevEl: '.pre',
				},
				slidesPerView: 5,
          		spaceBetween: 15,
          		freeMode: true,
          		
		    },
		    loginBs:true,
          	loginData:null,
          	signs:true,
          	point:0,
          	daily_bonus_click_able:true,//按钮是否可以点击
          	daily_bonus_ajaxing:true,//签到请求过
          	mNavfst:'fxyy',
          	navBul:false,
          	day:1,
          	dayweb:'-',
          	resource:[],
          	barVoice:true,
          	title:"我的云音乐",
          	faDis:false,
        	logH:false
		}
    },
    inject:['reload'],
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			 //热门推荐
	         var that =this;
	         if(this.$cookieUtil("email")){
					this.$logoRefresh(function(res){
						
						that.loginData =  JSON.parse(that.$localUtil("logoData"));
						that.loginBs = false;
						console.log(that.loginData)
						that.$http({
				         	method:'get',
				         	url:that.$host + "/user/detail?uid="+res.data.profile.userId,
				         }).then(function(res){
				         	console.log(res.data)
				         	that.loginData = res.data
				         	that.logH = true
				         }).catch(res=>{
				         	console.log('请求失败：'+res.data+','+res.statusText);
				         })
					})
					  this.$http({
			         	method:'get',
			         	url:that.$host+"/recommend/resource"
			         }).then(function(res){
			         	console.log(res.data)
			         	const recommend = res.data.recommend.slice(0,3);
			         	that.$.each(recommend,function(index,el){
			         		el.playcount = that.$Playback(el.playcount);
			         	})
			         	that.resource = recommend;
			         	
			         }).catch(error=>{
			         	console.log(error)
			         })
			          if(this.$localUtil('last_daily_bonus_date')===null||this.if_today_daily_bonus_local()===false){
			         	this.signs = true;
			         	this.daily_bonus_click_able = true;
			         	this.$.ajax({
			        			method:'get',
			        			url:that.$host+'/daily_signin',
			        			data:{
			        				type:1
			        			},
			        			xhrFields: {
					                withCredentials: true // 这里设置了withCredentials 
					           },
			        			error:function(resp){
			        			
			        				if(resp.responseJSON.code == -2){
			        					that.signs = false;
					        			let date = new Date();
									   	let month = date.getMonth()+1;
									   	let current_date = date.getFullYear()+"/"+ month +"/"+date.getDate()+" 08:00:00";
					        			that.$localUtil('last_daily_bonus_date',current_date)
			        				}
			        			}
			        		})
			         }else{
			         	this.signs = false;
			         	this.daily_bonus_click_able = false;
			         }
				}
//	         this.logout()
			this.$http({
	         	method:'get',
	         	url:that.$host + "/personalized?limit=5",
	         }).then(function(res){
				console.log(res.data)
				that.$.each(res.data.result,function(index,item){
					item.name = that.$cutString(item.name,40)
					item.playCount = that.$Playback(item.playCount)
					item.type = 13
				})
	         	that.hotTj = res.data.result;
	         	that.$http({
		         	method:'get',
		         	url:that.$host + "/personalized/djprogram",
		         }).then(function(res){
		         	console.log(res.data)
		         	that.$.each(res.data.result,function(index,item){
					item.name = that.$cutString(item.name,40)
					item.playCount = that.$Playback(item.program.adjustedPlayCount)
					item.type = 17
				})
		         	that.hotTj.splice(3,0,res.data.result[0])
		         	that.hotTj.splice(5,0,res.data.result[1])
		         	that.hotTj.splice(7,0,res.data.result[2])
		         	console.log(that.hotTj)
		         }).catch(res=>{
		         	console.log('请求失败：'+res.data+','+res.statusText);
		         })
	         }).catch(res=>{
	         	console.log('请求失败：'+res.data+','+res.statusText);
	         })
	         	//榜单
	         this.$.each(this.topList,function(index,item){
	         	that.$http({
		         	method:'get',
		         	url:that.$host+"/top/list?id="+item
		         }).then(function(res){
		         	console.log(res.data)
		         	res.data.playlist.type = 13;
		         	res.data.playlist.idx = item;
		         	res.data.faDis = false;
					that.$.each(res.data.playlist.tracks,function(index,item){
						
						item.type = 18;
					})
					res.data.playlist.tracks = res.data.playlist.tracks.slice(0,10);
		         	that.homeLists.push(res.data)
		         	console.log(that.homeLists)
		         }).catch(res=>{
		         	console.log('请求失败：'+res.data+','+res.statusText);
		         })
	         })
	           //热门主播
	         this.$http({
	         	method:'get',
	         	url:that.$host+"/dj/hot"
	         }).then(function(res){
	         	console.log(res.data)
	         	that.hotZb = res.data.djRadios
	         	
	         }).catch(res=>{
	         	console.log('请求失败：'+res.data+','+res.statusText);
	         })
	         this.$root.eventVue.$emit('zSltV',this.zSlt);
	         this.$root.eventVue.$emit('navBul',this.navBul);
	         this.$root.eventVue.$emit('mNavfst',this.mNavfst);
	         this.$root.eventVue.$emit('barVoice',this.barVoice);
	         //当天日期
	         var dayDate = new Date();
			 var days = dayDate.getDay();
			 this.day = dayDate.getDate();
			   switch(days) {

			            case 1:
			
			                  days = '星期一';
			
			                  break;
			
			            case 2:
			
			                  days = '星期二';
			
			                  break;
			
			            case 3:
			
			                  days = '星期三';
			
			                  break;
			
			            case 4:
			
			                  days = '星期四';
			
			                  break;
			
			            case 5:
			
			                  days = '星期五';
			
			                  break;
			
			            case 6:
			
			                  days = '星期六';
			
			                  break;
			
			            case 0:
			
			                  days = '星期日';
			
			                  break;
			
			
			
			      }
			   this.dayweb = days; 
			 
        },
        beforeMount: function () {
//          debugger;
        },
        computed: {
	     
	    },
        mounted: function () {
        	var that =this;
			//banner
			this.$http({
	        	method:'get',
	        	url:'http://localhost:3000/banner?type=0',
	        }).then(function(resp){                            
		        console.log(resp.data);
		        that.banners = resp.data.banners
		        
		        that.$rgbaster.colors( that.banners[that.banners.length-1].imageUrl, {
						  success: function(payload) {
						  
						    //console.log(payload.dominant);
						    //console.log(payload.secondary);
						    //console.log(payload.palette)[];
						    that.$getId('index-banner').style.backgroundColor=payload.dominant;
						  }
				});
		        that.$nextTick(()=>{
		        	that.mySwiper.slideTo(0, 1000, false)
		        })
		        }).catch(resp => {
		        console.log('请求失败：'+resp.data+','+resp.statusText);
	        });
	        //新碟上架
         	this.$http({
	         	method:'get',
	         	url:that.$host+"/album/newest"
	         }).then(function(res){
	         	console.log(res.data.albums)
	         	that.$.each(res.data.albums,function(index,item){
						
					item.type = 19
				})
	         	that.discShelves = res.data.albums
	         	that.$nextTick(()=>{
		        	
	      			that.$refs.mySwiperDisc.swiper.slideTo(5, 1000, false)
		        })
	         }).catch(res=>{
	         	console.log('请求失败：'+res.data+','+res.statusText);
	         })
	        
//	         this.dailySignin()
        },
        deactivated: function(){
//          alert("keepAlive停用");
        },
        activated: function () {
            console.log('component activated');
        },
        beforeDestroy: function () {
            console.group('beforeDestroy 销毁前状态===============》');
            
        },
        destroyed: function () {
            console.group('destroyed 销毁完成状态===============》');
            
        },
        
        methods:{
        	seehref(href){
        		console.log(href)
        		this.$seehref(href);
        	},
        	//登录显示
        	logShow($event){
        		var dataIdName = $event.target.getAttribute('data-idName');
        		console.log(dataIdName)
        		this.$root.eventVue.$emit('classify',dataIdName)
        		this.$toggleBody(1)
        		this.$drage('auto-id-e0uH7BGEq0gyq7zi')
        	},
        	//播放音乐 传递参数
       		playSong($event){
       			   			
				if($event.target.getAttribute('data-res-action') == 'play'){
						console.log($event)
						this.$root.eventVue.$emit('playid', 
						{resId:$event.target.getAttribute('data-res-id'),
						resData:$event.target.getAttribute('data-res-data'),
						resType:$event.target.getAttribute('data-res-type'),
						resFrom:$event.target.getAttribute('data-res-from'),
						resIdx:$event.target.getAttribute('data-res-idx'),
						})
					
					
				}else{
					console.log('点击播放图标不正确')
				}
       		},
       		logout(){
        		var _this = this;
        		this.$http({
	        			method:'get',
	        			url:'http://localhost:3000/logout'
	        		}).then(function(resp){                            
	        			console.log(resp.data);
	        			_this.$removeLocalStorage('logoData');
	        			_this.loginBs = true;
	        			_this.$delCookie("email");
	        			setTimeout(function(){
		                   	 console.log(_this)
		                     this.reload();
		                  }.bind(_this),1000)
	        		}).catch(resp => {
	        			console.log('请求失败：'+resp.status+','+resp.statusText);
	        		});
        		
        	},
        	dailySignin(){
        		var _this = this;
        		if((this.daily_bonus_click_able === false)||(this.daily_bonus_ajaxing === false)) return;
	        		this.$.ajax({
	        			method:'get',
	        			url:_this.$host+'/daily_signin',
	        			data:{
	        				type:1
	        			},
	        			xhrFields: {
			                withCredentials: true // 这里设置了withCredentials
			            },
			            
	        			success:function(resp){
	        				console.log(resp)
	        				if(resp.code == 200 ){
		        				_this.signs = false;
			        			let date = new Date();
							   	let month = date.getMonth()+1;
							   	let current_date = date.getFullYear()+"/"+ month +"/"+date.getDate()+" 08:00:00";
			        			_this.$localUtil('last_daily_bonus_date',current_date)
		        			}else{
		        				_this.daily_bonus_ajaxing = false;
		        			}
	        			},
	        			error:function(resp){
	        			
	        				if(resp.responseJSON.code == -2){
	        					_this.signs = false;
			        			let date = new Date();
							   	let month = date.getMonth()+1;
							   	let current_date = date.getFullYear()+"/"+ month +"/"+date.getDate()+" 08:00:00";
			        			_this.$localUtil('last_daily_bonus_date',current_date)
	        				}
	        			}
	        		})
        	},
        	if_today_daily_bonus_local(){
        		let _this = this;
				//获取本地储存
			   let last_daily_bonus_date = Date.parse(_this.$localUtil('last_daily_bonus_date'));
			   //获取今天日期
			   let date = new Date();
			   let month = date.getMonth()+1;
			   let current_date = date.getFullYear()+"/"+ month +"/"+date.getDate()+" 08:00:00";
			   let today = Date.parse(current_date);
			   //判断是否相等
			   if(last_daily_bonus_date === today)
			       return true;
			   else
			       return false;
			},
        	 //点击收藏
	       scColick($event){
	       	console.log($event)
	        		if(this.logH){
	        			// this.$root.eventVue.$emit('yjscHidden',false);
	        			var that = this;
	        			let num = $event.currentTarget.getAttribute('data-index');
	        			var cades = this.$collection(this,{
					  		resAction:'fav',
					  		actionT:1
					  	},$event,0,function(data){
	        				if(data == 200 ){
		        				that.$root.eventVue.$emit('sccgHidden',false);
		        				// that.faDis=true;
		        				that.homeLists[num].faDis=true;
		        			}
	        			})
	        			
	        			
	        		}else{
	        			
		        		this.$root.eventVue.$emit('classify','l')
		        		this.$toggleBody(1)
		        		this.$drage('auto-id-e0uH7BGEq0gyq7zi')
	        		}
	        		
	        		
	        	}
        },
        updated:function(){
        	var that = this;
        	 if (this.banners.length>1) {
			    
			    this.mySwiper.slideTo(0, 1000, true)
			  }
        	 
//	         this.$nextTick(() => {
	         	//console.log(that.$refs)
	      	 	//that.$refs.mySwiperDisc.swiper.slideTo(5, 1000, false)
//	      	 })
       },
      
       
  }
</script>

<style lang="less" scoped>
	/* @import '../../../static/css/public.less';*/
	.s-bg, .v-hd2, .n-disk li,.n-news-li {
	    background: url('../../assets/index.png') no-repeat 0 9999px;
	}
	.icon-img{
        background-image: url("../../assets/icon.png");
        background-repeat: no-repeat;
    }
	.hidden{
		display: none !important;
	}
	.banner-img{
		background-image: url(../../assets/banner.png);
	}
	.s-bg-1 {
	    background-position: 0 0;
	}
	.s-bg-2 {
	    background-position: 0 -195px;
	}
	.wr{
		position: relative;
		.swiper-container {
			height:336px;
	      	width:730px;
	      	margin-right:300px;
	      	
			
		}
		.swiper-button-prev, .swiper-button-next {
			    position: absolute;
			    top: 50%;
			    width: 37px;
			    height: 63px;
			    margin-top: -31px;
			    z-index: 999;
			    cursor: pointer;
			    background-position: 0 9999px;
			    background-size: 100%;
			    background-repeat: no-repeat;
			    .banner-img;
			    text-indent: -9999px;
			}
			.swiper-button-next, .swiper-container-rtl .swiper-button-prev {
			    right: 0px;
			    background-position: 0 -477px;
			    _background-position: 0 0;
			    /*left: auto;*/
			}
			.swiper-button-prev, .swiper-container-rtl .swiper-button-next {
			    left: 0px;
			    background-position: 0 -340px;
			    _background-position: 0 0;
			    /*right: auto;*/
			}
			.swiper-button-prev:hover{
				background-position: 0 -406px;
    			_background-position: 0 0;
			}
			.swiper-button-next:hover{
				background-position: 0 -547px;
    			_background-position: 0 0;
			}
		.swiper-slide {
	      text-align: center;
	      font-size: 38px;
	      font-weight: 700;
	      background-color: #fff;
	      display: flex;
	      justify-content: center;
	      align-items: center;
	      
	      img{
	      	display: block;
		    width: 730px;
		    height: 336px;
		    -webkit-backface-visibility: hidden;
	      }
	    }
	    .swiper-pagination {
	    	position: absolute;
		    top: 310px;
		    left: 0;
		    width: 730px;
		    height: 20px;
		    text-align: center;
	      > .swiper-pagination-bullet {
	        background-color: #fff;
	        opacity: 0.6;
	      }
	      > .swiper-pagination-bullet-active {
			    opacity: 1;
			    background: red;
			}
	    }
	    
	}
	/*下载客户端*/
	.n-ban{
		position: relative;
	}
	.n-ban .download, .n-ban .download .btn {
	    background: url(../../assets/download.png) no-repeat 0 0;
	    _background: url(../../assets/download.png) no-repeat 0 0;
	}
	.n-ban .download {
	    position: absolute;
	    top: 0;
	    z-index: 20;
	    right: 46px;
	    width: 254px;
	    height: 336px;
	    .btn{
	    	display: block;
		    width: 215px;
		    height: 56px;
		    margin: 212px 0 0 19px;
		    background-position: 0 9999px;
		    text-indent: -9999px;
	    }
	    p{
	    	margin: 10px auto;
		    text-align: center;
		    color: #8d8d8d;
	    }
	    
	}
	.n-ban .download .shadow, .n-ban .download .shadowr {
	    display: block;
	    _display: none;
	    position: absolute;
	    top: 0;
	    left: -20px;
	    width: 20px;
	    height: 336px;
	    background-position: -1px 0;
	    .banner-img;
	}
	.n-ban .download .shadowr {
	    left: auto;
	    right: -20px;
	    background-position: -20px 0;
	}
	/*热门推荐*/
	.g-mn1 {
	    float: left;
	    width: 100%;
	    margin-right: -250px;
	}
	.g-mn1c{
		margin-right: 251px;
	}
	.g-wrap3 {
	    padding: 20px 20px 40px;
	}
	.v-hd2 {
	    height: 33px;
	    padding: 0 10px 0 34px;
	    background-position: -225px -156px;
	    border-bottom: 2px solid #C10D0C;
	    .tit {
		    float: left;
		    font-size: 20px;
		    font-weight: normal;
		    line-height: 28px;
		}
		.tab {
		    float: left;
		    margin: 7px 0 0 20px;
		    .tab-list{
		    	float: left;
		    }
		    .line{
		    	margin: 0 10px;
    			color: #ccc;
		    }
		}
		.more {
			    float: right;
			    margin-top: 9px;
			    _margin-top: 11px;
			}
	}
	.v-hd2 .more .cor, .v-hd3 .more .cor {
	    display: inline-block;
	    width: 12px;
	    height: 12px;
	    margin-left: 4px;
	    vertical-align: middle;
	}
	.s-bg-6 {
	    background-position: 0 -240px;
	}
	.n-rcmd {
		.m-cvrlst {
		    margin: 20px 0 0 -42px;
		}
		li {
		    width: 140px !important;
		    height: 204px !important;
		    padding-left: 42px !important;
		    .u-cover-1 {
			    width: 140px;
			    height: 140px;
			}
			
		}
		
	}
	.u-cover-1 .msk {
	    background-position: 0 0;
	}
	.u-cover {
		.bottom {
		    position: absolute;
		    bottom: 0;
		    left: 0;
		    width: 100%;
		    height: 27px;
		    background-position: 0 -537px;
		    color: #ccc;
		}
		.icon-play {
		    position: absolute;
		    right: 10px;
		    bottom: 5px;
		    width: 16px;
		    height: 17px;
		    background-position: 0 0;
		}
		.icon-headset {
		    float: left;
		    width: 14px;
		    height: 11px;
		    background-position: 0 -24px;
		    margin: 9px 5px 9px 10px;
		}
		.nb {
		    float: left;
		    margin: 7px 0 0 0;
		}
	}
	.u-icn2-jp3 {
	    width: 40px;
	    height: 40px;
	    background-position: -135px -220px;
	}
	.u-jp {
	    position: absolute;
	    top: 0;
	    left: 0;
	}
	.m-cvrlst li .dec {
	    margin: 8px 0 3px;
	    font-size: 14px;
	    width:100%;
	    text-align: left;
	}
	.m-cvrlst li .tit {
	    display: inline-block;
	    max-width: 100%;
	    _width: 100%;
	    vertical-align: middle;
	}
	.m-cvrlst li .dec i {
	    position: relative;
	    top: -1px;
	    margin-right: 3px;
	    vertical-align: middle;
	}
	.n-new{
		margin: 0;
	}
	.n-disk {
	    position: relative;
	    zoom: 1;
	    height: 186px;
	    margin: 20px 0 37px;
	    border: 1px solid #d3d3d3;
	    text-align: left;
	    .inner {
		    height: 184px;
		    padding-left: 16px;
		    background: #f5f5f5;
		    border: 1px solid #fff;
		}
		.roll {
		    float: left;
		    width: 652px;
		    height: 180px;
		    overflow: hidden;
		    padding-left:11px;
		}
		.swiper-container{
			width: 645px;
    		margin: 28px 0 0 0;
		}
		.swiper-slide{
			    float: left;
			    display: inline;
			    width: 118px;
			    height: 150px;
			    /*margin-left: 11px;*/
			   .n-news-li;
			    background-position: -260px 100px;
			    	
		}
		.u-cover {
		    margin-bottom: 7px;
		}
		p {
		    width: 90%;
		    line-height: 18px;
		}
		 .pre {
		    position: absolute;
		    top: 71px;
		    width: 17px;
		    height: 17px;
		    left: 4px;
		    
		}
		.nxt {
		    position: absolute;
		    top: 71px;
		    width: 17px;
		    height: 17px;
		    
		}
	}
	.u-cover-alb1 .msk {
	    width: 118px;
	    height: 100px;
	    background-position: 0 -570px;
	}
	/*榜单*/
	.n-bilst {
	    height: 472px;
	    margin-top: 20px;
	    padding-left: 1px;
	    text-align: left;
	    .blk {
		    float: left;
		    width: 230px;
		}
		.blk-1 {
		    width: 228px;
		}
		.top {
		    height: 100px;
		    padding: 20px 0 0 19px;
		}
		.cver {
		    float: left;
		    display: inline;
		}
		.tit {
		    float: left;
		    width: 116px;
		    margin: 6px 0 0 10px;
		    h3 {
			    width: 100%;
			}
		}
		 .btn {
		    margin-top: 10px;
		    span {
			    display: block;
			    float: left;
			    width: 22px;
			    height: 22px;
			    margin-right: 10px;
			    text-indent: -9999px;
			}
		}
		 ol {
		    height: 319px;
		    margin-left: 50px;
		    line-height: 32px;
		    li {
			    height: 32px;
			    vertical-align: middle;
			     .no {
				    float: left;
				    position: relative;
				    width: 35px;
				    height: 32px;
				    margin-left: -35px;
				    text-align: center;
				    color: #666;
				    font-size: 16px;
				}
			    .no-top {
				    color: #c10d0c;
				}
				
			}
			 li.z-hvr {
			 	.oper {
				    display: block;
				}
			 }
			 
			.nm {
			    float: left;
			    width: 170px;
			    height: 32px;
			}
			.oper {
			    display: none;
			    float: right;
			    width: 82px;
			    margin-top: 7px;
			    span {
				    float: left;
				    width: 17px;
				    height: 17px;
				    margin-right: 10px;
				}
				.u-icn-81 {
				    margin: 2px 6px 0 0;
				}
			}
		}
		 .more {
		    clear: both;
		    height: 32px;
		    margin-right: 32px;
		    text-align: right;
		    line-height: 32px;
		}
		
	}
	.u-cover-4 {
	    width: 80px;
	    height: 80px;
	    .msk {
	        background-position: -145px -57px;
	    }
	    
	}
	.u-icn-81 {
	    width: 13px;
	    height: 13px;
	    .icon-img;
	    background-position: 0 -700px;
	}
	.n-bilst ol li.z-hvr .nm, .n-bilst ol li:hover .nm {
	    width: 96px;
	}
	.g-sd1 {
	    position: relative;
	    float: right;
	    width: 250px;
	    zoom: 1;
	    text-align: left;
	}
	.n-myinfo-1 {
	    height: 126px;
	    padding-top: 0;
	     .btn {
		    margin: 0 auto;
		}
	    
	}
	.n-myinfo .note {
	    width: 205px;
	    margin: 0 auto;
	    padding: 16px 0;
	    line-height: 22px;
	}
	.n-myinfo .btn {
	    display: block;
	    width: 100px;
	    height: 31px;
	    line-height: 31px;
	    text-align: center;
	    color: #fff;
	    text-shadow: 0 1px 0 #8a060b;
	}
	/*热门主播*/
	.n-dj-1 {
	    margin-top: 30px;
	    text-align: left;
	}
	.v-hd3 {
	    position: relative;
	    *zoom: 1;
	    height: 23px;
	    margin: 0 20px;
	    border-bottom: 1px solid #ccc;
	    color: #333;
	}
	.n-hotdj {
	    margin: 20px 0 0 20px;
	     li {
		    float: left;
		    width: 210px;
		    height: 50px;
		    img {
			    width: 40px;
			    height: 40px;
			    box-shadow: 0 0 1px #333333 inset;
			}
		}
		 .cver {
		    float: left;
		    width: 40px;
		    margin-right: 10px;
		}
		.info {
		    float: left;
		    width: 160px;
		    line-height: 21px;
		    .u-icn {
			    margin-top: -1px;
			    *margin-top: -2px;
			}
		}
		.n-hotdj p {
		    width: 100%;
		}
		.nm-icn {
		    display: inline-block;
		    *display: inline;
		    zoom: 1;
		    max-width: 88%;
		    vertical-align: middle;
		}
	}
	.s-bg-8 {
	    background-position: -300px -75px;
	}
	.s-bg-10 {
	    background-position: -300px -205px;
	}
	.s-bg-9 {
	    background-position: -267px -205px;
	}
	.s-bg-11 {
	    background-position: -267px -268px;
	}
	.u-icn-81 {
	    
	    background-position: 0 -700px;
	}
	.s-bg-12 {
	    background-position: -297px -268px;
	}
	.s-bg-7 {
	    background-position: -260px -75px;
	}
	.s-bg-8:hover {
	    background-position: -320px -75px;
	}
	.s-bg-7:hover {
	    background-position: -280px -75px;
	}
	.s-bg-9:hover {
	    background-position: -267px -235px;
	}
	.s-bg-10:hover {
	    background-position: -300px -235px;
	}
	.s-bg-11:hover {
	    background-position: -267px -288px;
	}
	.u-icn-81:hover {
	    background-position: -22px -700px;
	}
	.s-bg-12:hover {
	    background-position: -297px -288px;
	}
	.s-bg-5 {
	    background-position: 0 -270px;
	}
	.s-bg-10-slt, .s-bg-10-slt:hover {
	    background-position: -330px -235px;
	    cursor: default;
	    pointer-events: none;
	}
	.n-myinfos {
		 .info {
		    float: left;
		    width: 115px;
		    margin-left: 18px;
		    padding-top: 3px;
		    .nm-icn {
			    width: auto;
			    max-width: 100%;
			    vertical-align: middle;
			}
			h4{
				overflow: hidden;
			}
			p {
			    width: 100%;
			    margin-top: 5px;
			}
			.btnwrap {
			    margin-top: 15px;
			}
		}
		.head {
		    float: left;
		    width: 80px;
		    height: 80px;
		    margin-left: 20px;
		    _margin-left: 10px;
		    padding: 2px;
		    background: #fff;
		    border: 1px solid #dadada;
		    img {
			    display: block;
			    width: 80px;
			    height: 80px;
			}
		}
		.u-lv {
		    display: inline-block;
		    height: 17px;
		    overflow: hidden;
		    padding-left: 25px;
		    line-height: 18px;
		    color: #999;
		    font-weight: bold;
		    font-style: italic;
		    i {
			    float: right;
			}
		}
		
		.dny {
		    margin: 22px 0 0 20px;
		    li {
			    float: left;
			    height: 40px;
			    padding: 0 18px;
			    border-right: 1px solid #e4e4e4;
			    a {
				    display: block;
				    color: #666;
				    *{
				    	cursor: pointer;
				    }
				}
			}
			strong {
			    display: block;
			    font-size: 20px;
			    font-weight: normal;
			}
			span {
			    margin-left: 2px;
			}
			li.fst {
			    padding-left: 0;
			}
			li.lst {
			    padding-right: 0;
			    border-right: none;
			}
		}
		
	}
	.n-myinfos {
		    height: 165px;
		    padding-top: 20px;
		    .u-btn2 i {

			    width: auto;
			
			}
			
			.u-btn2-dis, .u-btn2-dis i {
			    color: #bebebe;
			    cursor: default;
			}
			.u-btn2-dis, .u-btn2-dis:hover, .u-btn2-dis:active {
			    color: #bebebe;
			    background-position: right -346px;
			}
			.u-btn2-2 {
			    color: #fff;
			    background-position: right -428px;
			}
			.u-icn2-lv {
		    background-position: -130px -64px;
			}
			.u-icn2-lvright {
			    width: 8px;
			    height: 17px;
			    background-position: -192px -64px;
			}
			.info .btnwrap .sign i {
			    width: 60px;
			}
			.u-btn2-2 i {
			    color: #fff;
			    background-position: 0 -387px;
			}
			.u-btn2-dis i, .u-btn2-dis:hover i, .u-btn2-dis:active i {
			    color: #bebebe;
			    background-position: 0 -305px;
			}
		}
		/*个性化*/
		.n-rcmd .m-cvrlst-idv {
			text-align: left;
		    display: table;
		    margin-bottom: 4px;
		    line-height: 0;
		    li {
			    display: table-cell;
			    height: auto;
			}
			.u-date {
			    position: relative;
			    zoom: 1;
			    display: block;
			    width: 140px;
			    height: 140px;
			    background-position: 0 0;
			    .head {
				    display: block;
				    height: 33px;
				    line-height: 33px;
				    color: #fed9d9;
				    font-size: 14px;
				    text-shadow: 0 -1px #962626;
				    text-align: center;
				}
				.bd {
				    display: block;
				    line-height: 102px;
				    text-align: center;
				    font-size: 94px;
				    font-family: Arial, Helvetica, sans-serif;
				    font-weight: bold;
				    color: #202020;
				}
				.mask {
				    position: absolute;
				    top: 33px;
				    left: 0;
				    width: 142px;
				    height: 107px;
				    background-position: 0 -150px;
				    _background-position: 0 0;
				}
			}
			.tit {
			    height: auto;
			    max-height: 36px;
			    _height: 36px;
			    overflow: hidden;
			}
			.idv {
			    margin-top: 3px;
			    position: relative;
			    z-index: 2;
			    .btn {
				    display: none;
				    width: 63px;
				    height: 26px;
				    margin-top: 0px;
				    text-align: center;
				    line-height: 26px;
				}
			}
			.s-bg-13 {
			    background-position: 0 -130px;
			    color: #666;
			}
		}
		.n-rcmd .m-cvrlst-idv .idv>em {
		    min-height: 30px;
		    display: inline-block;
		}
		.n-rcmd .m-cvrlst-idv .js-hvr em, .n-rcmd .m-cvrlst-idv .idv:hover em {
		    visibility: hidden;
		}
		.n-rcmd .m-cvrlst-idv .js-hvr .btn, .n-rcmd .m-cvrlst-idv .idv:hover .btn {
		    display: block;
		    position: absolute;
		    top: 10px;
		    left: 0;
		    z-index: 1;
		}
</style>