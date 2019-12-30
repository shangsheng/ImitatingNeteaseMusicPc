<template>
	<div id="friend">
		<div class="g-bd5 f-cb" v-if="loginB">
			<div class="g-mn5" >
				<div class="g-mn5c" >
					<div class="g-wrap8">
						<div class="m-timeline-title u-title f-cb">
							<h3>
								<span class="f-ff2">动态</span>
							</h3>
							<span class="btn u-dicn u-dicn-40 f-fr f-pr" title="发布视频"></span>
							<span class="btn u-dicn u-dicn-38 f-fr" title="发布动态"></span>
						</div>
						<span class="m-dynamicbar f-ff1"  :class="{'f-hide':dynamicbarNew}">
							<em>0</em>
							条动态
							<i class="u-icn u-icn-63"></i>
						</span>
						<div id="auto-id-GlL9TO000FlFKtrP" v-if="friendData.length>0">
							<span class="m-dynamicbar f-ff1 j-flag" data-action="pull" style="display:none;"></span>
							<div class="m-timeline">
								<ul class="m-dlist j-flag">
									
									<li class="itm" v-for="(item,index) of friendData">
										<div class="gface" v-bind:hidden="item.json.msg == undefined">
											<router-link to="{path:'/user/home',query:{id:item.user.userId}}" class="ficon">
												<img :src="item.user.avatarUrl" class="j-flag"/>
											</router-link>
										</div>
										<div class="gcnt j-flag">
											<div class="dcntc" v-if="item.json.msg !=undefined">
												<div class="type f-pr f-fs1">
													<router-link to="{path:'/user/home',query:{id:item.user.userId}}">{{item.user.nickname}}</router-link>
													<sup class="u-icn " :class="[item.user.userType == 201&&item.user.vipType == 11?'u-icn-84':'']" v-if="item.user.userType == 201"></sup>
													<sup class="u-icn " :class="[item.user.vipType == 11&&item.user.userType == 2||item.user.userType==10?'u-icn-1':'']" v-else-if="item.user.userType == 2"></sup>
													<sup class="icn u-icn2 " :class="[item.user.vipType == 11||item.user.vipType == 10&&item.user.userType == 4 ||item.user.vipType == 0&&item.user.vipRights != null?'u-icn2-music2':'']" v-else></sup>
													<span class="sep s-fc3" v-if="item.json.video">发布视频</span>
													<span class="sep s-fc3" v-else-if="item.json.song">分享单曲</span>
													<span class="sep s-fc3" v-else-if="item.json.event">转发</span>
													<span class="sep s-fc3" v-else-if="item.json.mv">分享MV</span>
													<span class="sep s-fc3" v-else-if="item.json.playlist">分享歌单</span>
													<span class="sep s-fc3" v-else-if="item.json.album">分享专辑</span>
													<span class="sep s-fc3" v-else-if="item.json.resource">分享歌手</span>
													<span class="sep s-fc3" v-else-if="item.json.topic">分享专栏文章</span>
													<span class="gz u-dbtn f-pa j-follow" data-action="follow" :data-id="item.user.userId" v-if="!item.user.followed">
														<i class="u-dicn u-dicn-11"></i>
														关注
													</span>
													<span class="gz u-dbtn u-dbtn-ygz f-pa" v-else-if="gzFoolowed">
														<i class="u-dicn u-dicn-24"></i>
														已关注
													</span>
													<span class="gz u-dbtn u-dbtn-qx f-pa" v-else>
														取消关注
													</span>
												</div>
												<div class="time">
													<router-link class="s-fc4" to="{path:'/event',query:{id:item.id,uid:item.user.userId}}">{{item.eventTime}}</router-link>
												</div>
												<div class="text f-fs1  f-brk j-text" v-html="$addLinks($addNameLinks($addThLinks($addBr(item.json.msg))))">
													<!--v-html="$addNameLinks($addLinks(addThLinks(item.json.msg)))"-->
													<!--{{item.json.msg}}-->
												</div>
												<!--视频-->
												<div class="j-flag">
													<video-src v-bind:videoData="item.json.video" v-if="item.json.video"></video-src>
													<mv-src v-bind:mvData="item.json.mv" v-else-if="item.json.mv"></mv-src>
													<playlist-src v-bind:playlistData="item.json.playlist" v-bind:pics="item.pics" v-else-if="item.json.playlist"></playlist-src>
													<song-src v-bind:songData="item.json" v-bind:pics="item.pics" v-else-if="item.json.song"></song-src>
													<album-src v-bind:albumData="item.json" v-bind:pics="item.pics" v-else-if="item.json.album"></album-src>
													<event-src v-bind:eventData="item.json.event" v-else-if="item.json.event"></event-src>
													<resource-src v-bind:resourceData="item.json.resource" v-bind:pics="item.pics" v-else-if="item.json.resource"></resource-src>
													<topic-src v-bind:topicData="item.json.topic" v-else-if="item.json.topic"></topic-src>
													<relay-src v-bind:pics="item.pics" v-bind:widthXT="170" v-bind:heightYT="338" v-bind:widthX="525" v-bind:heightY="10000" v-else></relay-src>
												</div>
												<div class="doper j-flag">
													<span class="s-fc7 cursor" data-action="like">
														<i class="icn u-dicn " :class="[item.info.liked&&liked?'u-dicn-4':'u-dicn-3']"></i>
														<span class="j-flag" :data-action="item.info.likedCount">({{item.info.likedCount}})</span>
													</span>
													<span class="line">|</span>
													<span class="s-fc7 cursor" data-action="forward">
														转发
														<span class="j-flag" :data-action="item.insiteForwardCount">({{item.insiteForwardCount}})</span>
													</span>
													<span class="line">|</span>
													<span class="s-fc7 cursor" data-action="comment" @click.stop="commentsClick(index)">
														评论
														<span class="j-flag" :data-action="item.info.commentCount">({{item.info.commentCount}})</span>
													</span>
												</div>
												<div class="arrow u-dicn u-dicn-2 j-flag" @click.stop="mngHideClick(index)">
													<ul class="mng mng-long j-flag " :class="{'f-hide':item.mngHide}">
														<li>
															<span class="li f-fl s-fc3" data-action="nointer">
																<i class="icn u-dicn u-dicn-25 f-fl"></i>
																不感兴趣，减少这类推荐
															</span>
														</li>
														<li>
															<span class="li f-fl s-fc3" data-action="disrcmd">
																<i class="icn u-dicn u-dicn-37 f-fl"></i>
																不再显示推荐动态
															</span>
														</li>
													</ul>
												</div>
												<div class="dsup j-flag f-hide">
													赞
													<span class="j-flag"></span>
												</div>
												<div class="j-flag f-hide">
													
												</div>
												<div class="m-dynamic" v-if="item.info.commentsHide">
													<div class="dbox dbox-cmt">
														<span class="darr"><i class="bd">◆</i><i class="bg">◆</i></span>
														<comments v-bind:commentId="item.info.threadId" v-if="item.info.commentsHide" :key="commentsCount"></comments>
													</div>
													
												</div>
											</div>
											<div class="activity f-pr f-hand" v-else>
												<img :src="item.json.coverPCUrl+'?param=590y252'" class="f-img"/>
												<span class="mask f-img f-pa f-alpha"></span>
												<div class="title f-pr">
													<div class="inner f-pr">
														<h3 class="s-fc12 f-ff2">
															{{item.json.title}}
															<div class="number f-ff2 f-fs0 s-fc12 f-pa">
																
																<span class="cnt">
																	<em class="f-vhide">xxxxxxx</em>
																	<i>{{item.json.participateCount}}人参加</i>
																</span>
															</div>
														</h3>
													</div>
												</div>
												<span class="cls u-dicn u-dicn-12 f-pa"></span>
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div class="u-load s-fc4" v-bind:hidden="scrollB">
								<i class="icn"></i>
								
							</div>
						</div>
						<div class="u-load s-fc4" v-else>
							<i class="icn"></i>
							
						</div>
					</div>
				</div>
			</div>
			<div class="g-sd5"v-if="loginData">
				<div class="n-frduser">
					<router-link :to="{path:'/user/home',query:{id:loginData.profile.userId}}" class="face">
						<img :src="loginData.profile.avatarUrl+'?param=70y70'"/>
					</router-link>
					<h5 class="f-thide">
						<router-link :to="{path:'/user/home',query:{id:loginData.profile.userId}}" class="s-fc1 f-fs1" :title="loginData.profile.nickname">{{loginData.profile.nickname}}</router-link>
					</h5>
					<p class="f-brk" :title="loginData.profile.description">{{loginData.profile.description}}</p>
					<ul class="f-cb">
						<li class="fst">
	    					<router-link to="{path:'/user/event',query:{id:loginData.profile.userId}}">
	    						<em>{{loginData.profile.eventCount}}</em>
	    						<i>动态</i>
	    					</router-link>
	    				</li>
						<li >
	    					<router-link to="{path:'/user/follows',query:{id:loginData.profile.userId}}">
	    						<em>{{loginData.profile.follows}}</em>
	    						<i>关注</i>
							</router-link>
	    				</li>
	    				<li class="lst">
	    					<router-link to="{path:'/user/fans',query:{id:loginData.profile.userId}}">
								<em>{{loginData.profile.followeds}}</em>
	    						<i>粉丝</i>
	    					</router-link>
	    				</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="g-bd g-bd-full" v-else>
			<div class="n-pglg2">
				<div class="welc s-fc3 f-fs1">
					你可以关注明星和好友品味他们的私房歌单<br>通过他们的动态发现更多精彩音乐
				</div>
				<span class="btn cursor" data-idName="l" @click.stop="logShow($event)"></span>
			</div>
		</div>
	</div>
</template>

<script>
	import eventVue from '../../../static/js/eventVue.js'
	import videoSrc from '@/components/publics/video-src.vue'
	import mvSrc from '@/components/publics/mv-src.vue'
	import playlistSrc from '@/components/publics/playlist-src.vue'
	import relaySrc from '@/components/publics/relay-src.vue'
	import songSrc from '@/components/publics/songs-src.vue'
	import albumSrc from '@/components/publics/album-src.vue'
	import eventSrc from '@/components/publics/event-src.vue'
	import resourceSrc from '@/components/publics/resource-src.vue'
	import topicSrc from '@/components/publics/topic-src.vue'
	import comments from '@/components/publics/comments.vue'
	export default {
  name: 'friend',
  data () {
    return {
    	pagesize:30,
    	lasttime:0,
    	friendData:[],
    	more:false,
    	dynamicbarNew:true,
    	userHomeData:null,
    	gzFoolowed:true,
    	liked:true,
    	dyNewData:null,
    	mNavfst:'yy',
    	navBul:true,
    	barVoice:true,
    	loginData:null,
    	loginB:false,
    	scrollB:false,
    	commentsCount:1
    }
     
  },
  components:{
  	videoSrc,
  	mvSrc,
  	playlistSrc,
  	relaySrc,
  	songSrc,
  	albumSrc,
  	eventSrc,
  	resourceSrc,
  	topicSrc,
  	comments
  },
  inject:['reload'],//app.vueҳ���ж����¼���
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		 var that =this;
	         if(this.$cookieUtil("email")){
					this.$logoRefresh(function(res){
						console.log(res)
						that.friendHttp(that.lasttime)
						that.$http({
				         	method:'get',
				         	url:that.$host + "/user/detail?uid="+res.data.profile.userId,
				         }).then(function(res){
				         	console.log(res.data)
				         	that.loginData = res.data
				         }).catch(res=>{
				         	console.log('请求失败：'+res.data+','+res.statusText);
				         })
				         that.loginB = true;
					})
					
				}
		 this.$root.eventVue.$emit('navBul',this.navBul);
	     this.$root.eventVue.$emit('mNavfst',this.mNavfst);
	     this.$root.eventVue.$emit('barVoice',this.barVoice);
        },
        beforeMount: function () {
//          debugger;
        },
        mounted: function () {
//          debugger;
			this.$nextTick(function () {
		      window.addEventListener('scroll', this.onScroll)
		    })
			var _this = this;
			
			 _this.$(document).click(function(event){
		        var _con = _this.$('#friend');  // 设置目标区域
		        if(!_con.is(event.target) && _con.has(event.target).length === 0){ // Mark 1
		           _this.$.each(_this.friendData,function(index,el){
		           	el.mngHide = true
		           })
		        }
		   });
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
        	friendHttp(lasttime){
        		let that = this
        		  this.$http({
			         	method:'get',
			         	url:that.$host+"/event?pagesize="+that.pagesize+"&lasttime="+lasttime
			         }).then(function(res){
			         	console.log(res.data)
			         	that.$.each(res.data.event,function(index,el){
			         		el.eventTime = that.$timeDJq(el.eventTime)
			         		el.json = JSON.parse(el.json)
			         		el.json.friendId = el.id
			         		el.mngHide = true
			         		el.info.commentsHide = false
			         		that.friendData.push(el)
			         	})
			         	that.scrollB = true
			         	that.lasttime = res.data.lasttime
			         	that.more = res.data.more
			         	
			         }).catch(error=>{
			         	console.log(error)
			         })
        	},
        	 // 获取滚动条当前的位置
			    getScrollTop () {
			      var scrollTop = 0
			      if (document.documentElement && document.documentElement.scrollTop) {
			        scrollTop = document.documentElement.scrollTop
			      } else if (document.body) {
			        scrollTop = document.body.scrollTop
			      }
			      return scrollTop
			    },
			    // 获取当前可视范围的高度
			    getClientHeight () {
			      var clientHeight = 0
			      if (document.body.clientHeight && document.documentElement.clientHeight) {
			        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
			      } else {
			        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
			      }
			      return clientHeight
			    },
			
			    // 获取文档完整的高度
			    getScrollHeight () {
			      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
			    },
			    // 滚动事件触发下拉加载
			    onScroll () {
			      if (this.getScrollHeight() - this.getClientHeight() - this.getScrollTop() <= 0) {
//			        if (this.status === 1) {
//			          this.status = 0
//			          // 页码，分页用，默认第一页
//			          //this.deliverParams.page += 1
//			          
//			          //alert('触发！！！')
//			          
//			        }
					this.scrollB = false
			        // 调用请求函数
			        this.friendHttp(this.lasttime)
			      }
			    },
			    mngHideClick(index){
			    	console.log(index)
			    	if(this.friendData[index].mngHide){
			    		this.friendData[index].mngHide = false
			    	}else{
			    		this.friendData[index].mngHide = true
			    	}
			    },
			    //登录显示
	        	logShow($event){
	        		var dataIdName = $event.target.getAttribute('data-idName');
	        		console.log(dataIdName)
	        		this.$root.eventVue.$emit('classify',dataIdName)
	        		this.$toggleBody(1)
	        		this.$drage('auto-id-e0uH7BGEq0gyq7zi')
	        	},
	        	commentsClick(index){
	        		if(this.friendData[index].info.commentsHide){
			    		this.friendData[index].info.commentsHide = false
			    	}else{
			    		this.friendData[index].info.commentsHide = true
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

            },
            friendData(){
            	++this.commentsCount
            }
        }
}
</script>

<style  lang="less">
	#friend{
		text-align: left;
		.g-mn5c {
		    margin-right: 309px;
		}
		.g-wrap8 {
		    padding: 20px 30px;
		}
		.u-title {
		    height: 40px;
		    border-bottom: 2px solid #c20c0c;
		    h3 {
			    float: left;
			    font-size: 24px;
			    font-weight: normal;
			}
		}
		.m-timeline-title {
			.btn {
			    cursor: pointer;
			    margin: 6px 0 0 10px;
			    overflow: hidden;
			}
			
		}
		.m-dynamicbar {
			    display: block;
			    color: #666;
			    background: #fffcdf;
			    border: 1px solid #f0eb98;
			    padding: 8px 0;
			    text-align: center;
			    letter-spacing: 1px;
			     .u-icn {
				    margin-left: 6px;
				}
		}
		.u-dicn-40 {
		    width: 84px;
		    height: 24px;
		    background-position: -100px -452px;
		}
		.u-dicn-38 {
		    width: 71px;
		    height: 24px;
		    background-position: 0 -452px;
		}
		.u-icn-63 {
		    width: 9px;
		    height: 5px;
		    background-position: -72px -663px;
		}
		.m-timeline {
		    position: relative;
		    zoom: 1;
		    text-shadow: none;
		    .dsup {
			    margin: 30px 0;
			}
		}
		.m-dlist {
		    position: relative;
		    zoom: 1;
		    .itm {
			    position: relative;
			    padding: 20px 0;
			    border-bottom: 1px solid;
			}
			.itm:first-child {
			    border-top: none;
			}
			.gface {
			    position: absolute;
			    top: 20px;
			    left: 0;
			    width: 54px;
			}
			.ficon {
			    float: left;
			    position: relative;
			    zoom: 1;
			    width: 45px;
			    height: 45px;
			}
			 .gcnt {
			    position: relative;
			    zoom: 1;
			    margin-left: 55px;
			    padding-top: 4px;
			}
			.type {
				.u-icn-1 {
				    margin: -3px 0 0 1px;
				}
				.u-icn2-music2 {
				    margin: -2px 0 0 1px;
				}
				.sep {
				    margin-left: 5px;
				}
				 .gz {
				    top: -10px;
				    right: 22px;
				}
			}
			.time {
			    margin-top: 7px;
			}
			.text {
			    margin-top: 10px;
			    line-height: 24px;
			    font-size: 14px;
			    word-break: break-word;
			}
			 .doper {
			    margin: 18px 0 -2px;
			    text-align: right;
			    line-height: normal;
			    .icn {
				    margin: -1px 3px 0 0;
				}
				.line {
				    margin: 0 10px 0 12px;
				    color: #c7c7c7;
				}
			}
			.arrow {
			    position: absolute;
			    top: -3px;
			    right: -3px;
			    cursor: pointer;
			}
		    .mng {
			    width: 105px;
			    position: absolute;
			    top: 23px;
			    right: 3px;
			}
			 .mng-long {
			    width: 172px;
			}
			.mng {
			    background: #fff;
			    border: 1px solid #cccfd9;
			    box-shadow: 0 0 4px rgba(0,0,0,0.1);
			    .icn {
				    width: 16px;
				    height: 16px;
				    margin: 7px 8px 0 9px;
				}
			}
		}
		.m-timeline .head, .m-timeline .head h2, .m-dlist .itm {
		    border-color: #e8e8e9;
		}
		.m-dlist .ficon img, .m-dlist .src .cover img {
		    display: block;
		    width: 100%;
		}
		.m-dlist .ficon:after, .m-dlist .pics .pic:after, .m-dlist .src .cover:after, .m-dlist .src-mv .mv:after, .m-dlist .activity:after, .m-dlist .hotrecmt .cover:after {
		    content: '';
		    position: absolute;
		    top: 0;
		    left: 0;
		    width: 100%;
		    height: 100%;
		    box-sizing: border-box;
		    border: 1px solid rgba(0,0,0,0.1);
		    z-index: 100;
		    pointer-events: none;
		}
		.u-icn-1 {
		    width: 11px;
		    height: 13px;
		    background-position: 0 1px;
		    font-size: 100%;
		    font-style: normal;
		}
		.u-icn2-music2 {
		    width: 12px;
		    height: 13px;
		    background-position: -110px -190px;
		}
		.u-dbtn {
		    width: 52px;
		    height: 22px;
		    border-radius: 2px;
		    line-height: 22px;
		    *line-height: 23px;
		    font-size: 12px;
		    cursor: pointer;
		}
		.u-dbtn {
		    background: #fff;
		    border: 1px solid #ccc;
		    color: #333;
		     i {
			    float: left;
			    margin: 5px 4px 0 6px;
			}
		}
		.u-dbtn:hover {
		    background: #e5e5e5;
		}
		.u-dicn-11, .u-dicn-24 {
		    width: 12px;
		    height: 12px;
		    background-position: -65px 0;
		}
		.u-dbtn-ygz {
		    width: 65px;
		    cursor: default;
		    pointer-events: none;
		}
		.u-dicn-24 {
		    background-position: -85px -25px;
		}
		.u-dbtn-qx {
		    text-align: center;
		}
		.u-dicn-3, .u-dicn-4, .u-dicn-5, .u-dicn-6 {
		    width: 14px;
		    height: 14px;
		    background-position: 0 -20px;
		}
		.m-dlist .doper .u-dicn-3, .m-dlist .doper .u-dicn-4 {
		    margin-top: 0px;
		}
		.u-dicn-2 {
		    width: 19px;
		    height: 19px;
		    background-position: -15px 0;
		}
		.m-dlist .mng li, .m-dlist .mng .li {
		    float: left;
		    width: 105px;
		    height: 30px;
		    overflow: hidden;
		    line-height: 31px;
		    *line-height: 33px;
		}
		.m-dlist .mng-long li, .m-dlist .mng-long .li {
		    width: 172px;
		}
		.u-dicn-25 {
		    background-position: 0 -360px;
		}
		.u-dicn-37 {
		    width: 16px;
		    height: 16px;
		    background-position: -106px -361px;
		}
		.u-link i {
		    float: left;
		    margin: 3px 4px 0 0;
		}
		.u-dicn-28, .u-dicn-29 {
		    width: 15px;
		    height: 15px;
		    background-position: -60px -360px;
		}
		.u-dicn-4 {
		    background-position: -20px -20px;
		}
		.m-dlist .text .link {
		    margin: -1px 0 0 8px;
		    vertical-align: middle;
		}
		.u-link {
		    background: #f9f9f9;
		    border: 1px solid #e2e2e2;
		    color: #0c73c2;
		}
		.u-link {
		    display: inline-block;
		    height: 21px;
		    overflow: hidden;
		    padding: 0 6px;
		    line-height: 22px;
		    font-size: 12px;
		}
		.u-icn-84 {
		    width: 12px;
		    height: 13px;
		    background-position: -65px -840px;
		}
		.m-dlist .activity {
			width: 590px;
		    height: 252px;
		    text-align: center;
		    display: table;
			.mask {
			    top: 0;
			    left: 0;
			}
			.title {
			    width: 100%;
			    height: 100%;
			    display: table-cell;
			    vertical-align: middle;
			    .inner {
				    display: inline-block;
				    min-width: 140px;
				    max-width: 400px;
				}
			    .inner:before {
				    content: '';
				    display: block;
				    width: 100%;
				    height: 2px;
				    background: #fff;
				    opacity: 0.2;
				    filter: alpha(opacity=20);
				}
			}
			
			
			h3 {
			    padding: 27px 20px 38px;
			    line-height: 30px;
			    vertical-align: middle;
			    font-size: 20px;
			    word-break: break-all;
			    color: #FFFFFF;
			}
			.number {
			    left: 0;
			    right: 0;
			    bottom: 0;
			    line-height: 12px;
			    height: 12px;
			    padding-bottom: 5px;
			    display: table;
			    word-break: normal;
			    .cnt {
				    position: relative;
				    display: table-cell;
				    padding: 0 12px;
				    i {
					    position: absolute;
					    left: 0;
					    right: 0;
					    text-align: center;
					    top: 5px;
					    font-size: 12px;
					    color: #FFFFFF;
					}
				}
			}
			img {
			    position: absolute;
			    top: 0;
			    left: 0;
			}
			.cls {
			    top: 10px;
			    right: 10px;
			    cursor: pointer;
			}
		}
		.m-dlist h3, .m-dlist h4 {
		    font-weight: normal;
		}
		.m-timeline h3 {
		    margin-top: -2px;
		}
		.m-dlist .activity .number:before, .m-dlist .activity .number:after {
		    content: '';
		    display: table-cell;
		    width: 50%;
		    border-bottom: 2px solid #fff;
		    opacity: 0.2;
		    filter: alpha(opacity=20);
		}
		.u-dicn-12 {
		    width: 21px;
		    height: 20px;
		    background-position: -70px -40px;
		}
		.f-img, .f-blk {
		    display: block;
		    width: 100%;
		    height: 100%;
		}
		.m-dlist h3, .m-dlist h4 {
		    font-weight: normal;
		}
		.m-timeline h3 {
		    margin-top: -2px;
		}
		.g-sd5 {
		    position: relative;
		    float: right;
		    width: 309px;
		    padding: 0 1px;
		    zoom: 1;
		}
		.n-frduser {
		    position: relative;
		    height: 193px;
		    .face {
			    position: absolute;
			    top: 38px;
			    left: 30px;
			    width: 70px;
			    height: 70px;
			    img {
				    display: block;
				    width: 62px;
				    height: 62px;
				    padding: 2px;
				    background: #fff;
				    border: 1px solid #dadada;
				}
			}
			 h5 {
			    top: 40px;
			    font-size: 14px;
			    width: 180px;
			}
			p {
			    top: 67px;
			    height: 38px;
			    overflow: hidden;
			    line-height: 19px;
			    color: #888;
			}
			ul {
			    position: absolute;
			    top: 134px;
			    left: 13px;
			    overflow: hidden;
			    li {
				    display: inline;
				    float: left;
				    margin: 0 2px 0 -2px;
				    border-left: 1px solid #c2c2c2;
				    a {
					    display: block;
					    padding: 0 20px;
					    color: #666;
					}
					em {
					    display: block;
					    padding: 0 0 9px;
					    font-size: 20px;
					    line-height: 20px;
					    font-family: Arial;
					}
					i {
					    display: block;
					    padding: 0 0 0 2px;
					}
				}
			}
		}
		.n-frduser h5, .n-frduser p {
		    position: absolute;
		    left: 112px;
		    width: 160px;
		}
		.g-mn5 {
		    float: left;
		    width: 100%;
		    margin-right: -312px;
		}
		.n-pglg2 {
		    width: 902px;
		    height: 414px;
		    margin: 0 auto 0;
		    padding-top: 70px;
		    background-position: 0 70px;
		    .welc {
			    padding: 178px 0 0 535px;
			    line-height: 23px;
			}
			.btn {
			    display: block;
			    width: 157px;
			    height: 48px;
			    margin: 36px 0 0 535px;
			    background-position: 0 9999px;
			    text-indent: -9999px;
			}
			.btn:hover {
			    background-position: 0 -430px;
			}
		}
		.m-dynamic {
		    line-height: 20px;
		    .dbox {
			    position: relative;
			    zoom: 1;
			    margin: 12px 0 0;
			    padding: 15px;
			    border: 1px solid #d9d9d9;
			    background: #f8f8f8;
			    border-radius: 2px;
			    box-shadow: inset 0 0 0 1px #fcfcfc;
			}
			.darr {
			    position: absolute;
			    top: -7px;
			    right: 20px;
			    font-size: 12px;
			    line-height: 14px;
			    user-select: none;
			    i {
				    position: absolute;
				    top: 0;
				    left: 0;
				}
				.bg {
				    top: 1px;
				    color: #f8f8f8;
				}
				.bd {
				    color: #d9d9d9;
				}
			}
			.n-cmt{
				margin-top: 0;
			}
		}
	}
</style>