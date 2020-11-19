<template>
	<div id="headers">
		<div id="g-topbar">
			<div class="m-top">
				<div class="wrap">
					<div class="m-logo">
						<router-link to="/">
							<span>网易云音乐</span>
						</router-link>
					</div>
					<div class="m-s">
						<ul  class="m-nav">
							<li  :class="{'fst':mNavfst == 'fxyy'}">
								<span>
									<router-link to="/">
										<em>发现音乐</em>
										<sub class="cur">&nbsp;</sub>
									</router-link>
								</span>
							</li>
							<li :class="{'fst':mNavfst == 'wdyy'}">
								<span>
									<router-link to="/my">
										<em>我的音乐</em>
										<sub class="cur">&nbsp;</sub>
									</router-link>
								</span>
							</li>
							<li :class="{'fst':mNavfst == 'yy'}">
								<span>
									<router-link to="/friend">
										<em>朋友</em>
										<sub class="cur">&nbsp;</sub>
									</router-link>
								</span>
							</li>
							<li :class="{'fst':mNavfst == 'sc'}">
								<span>
									<a href="https://music.163.com/store/product" target="_blank">
										<em>商城</em>
										<sub class="cur">&nbsp;</sub>
									</a>
								</span>
							</li>
							<li :class="{'fst':mNavfst == 'yyr'}">
								<span>
									<a href="https://music.163.com/nmusician/web/index#/" target="_blank">
										<em>音乐人</em>
										<sub class="cur">&nbsp;</sub>
									</a>
								</span>
							</li>
							<li class="lst" :class="{'fst':mNavfst == 'xzkhd'}">
								<span>
									<router-link to="/download">
										<em>下载客户端</em>
										<sub class="cur">&nbsp;</sub>
									</router-link>
									<sup class="hot">&nbsp;</sup>
								</span>
							</li>
						</ul>
					</div>
					<!--登录后的样式-->
					<div class="m-topheads f-pr j-tflag" v-if="logoBline" @mouseleave="logoHide(true)">
						<div class="head f-fl f-pr"  @mouseover="logoHide(false)">
							<img :src="logoData.profile.avatarUrl"/>
							<router-link :to="{path:'/user/home',query:{id:logoData.profile.userId}}" class="mask"></router-link>
							<i class="m-topmsg f-pa f-hide j-uflag"></i>
						</div>
						<router-link :to="{path:'/user/home',query:{id:logoData.profile.userId}}" class="name f-thide f-fl f-tdn f-hide">{{logoData.profile.nickname}}</router-link>
						<div class="m-tlist m-tlist-lged j-uflag" v-bind:hidden="loginD">
							<ul class="f-cb lb mg">
								<li v-for=" (item,index) of lbmg" v-bind:key="index">
									<router-link :to="{path:item.path,query:{id:logoData.profile.userId}}" class="item-1">
										<i class="icn" :class="[item.icon]"></i>
										<em>{{item.name}}</em>
									</router-link>
								</li>
							</ul>
							<ul class="f-cb ltb mg">
								<li v-for="(item,index) in ltbmg" v-bind:key="index">
									<router-link :to="{path:item.path,query:{id:logoData.profile.userId}}" class="item-2">
										<i class="icn" :class="[item.icon]"></i>
										<em>{{item.name}}</em>
									</router-link>
								</li>
							</ul>
							<ul class="f-cb lt">
								<li>
									<span class="itm-3" data-action="logout" @click.stop="logout">
										<i class="icn icn-ex"></i>
										<em>退出</em>
									</span>
								</li>
							</ul>
						</div>
					</div>
					<div class="m-tophead" id="auto-id" @mouseleave="classHidden()" @mouseenter="classObjest()" v-else>
						<span class="link-dl" data-idName="l" @click.stop="logShow($event)">登录</span>
						<div class="m-tlist" v-bind:class="{show:dllit , hidden:disnone}">
							<ul class="f-cb">
								<li :class="[item.target == '_self'?'lb':'ltb']" v-for="(item,index) in logoMode" v-bind:key="index"  :data-idName="item.idName" @click.stop="logShow($event)">
									<span v-if="item.target == '_self'"><i class="icon" :class=" [item.icon]" :data-idName="item.idName" @click.stop="logShow($event)"></i><em :data-idName="item.idName" @click.stop="logShow($event)">{{item.name}}</em></span>
									<router-link v-else :to="{path:'/api/sns/authorize',query:{id:item.id}}" target= 'item.target'>
										<span><i class="icon"  :class=" [item.icon]"></i><em>{{item.name}}</em></span>
									</router-link>
								</li>
								<!-- <li class="ltb"  :data-idName="item.idName">
									
								</li> -->
								<!--<li class="lb">
									<span><i class="icon "></i><em>QQ登录</em></span>
								</li>
								<li class="ltb">
									<router-link to="/api/sns/authorize">
										<span><i class="icon "></i><em>新浪微博登录</em></span>
									</router-link>
								</li>
								<li class="lb">
									
										<span><i class="icon "></i><em>网易邮箱登录</em></span>
									
								</li>-->
							</ul>
							<i class="arr"></i>
						</div>
					</div>
					
					<div class="m-topvd">
						<router-link to='/login'>创业者中心</router-link>
					</div>
					<!--搜索-->
					<div class="m-srch">
						<div class="srchbg">
							<span class="parent" @click.stop="searchf">
								<input type="text" name="srch" id="srch" @keyup="search" v-model="values" v-focus="focusState" @blur="blurlist()" @keydown.enter="searchEnter"/>
								<label class="srch-text" v-bind:class="{hidden:!searchShow}" id="aout-id-srch">{{serchValue}}</label>
							</span>
							
						</div>
						<!--搜索内容-->
						<div class="u-lstlay j-flag" id="srch-nr" v-bind:class="{show:!searchhidden}">
							<div class="m-ulist">
								<p class="note s-fc3">
									<router-link :to="{path:'/search/m',query:{s:values,type:1002}}">
										搜索“{{values}}”相关用户》
									</router-link>
								</p>
								<div class="rap">
									<div class="itm f-cb" v-for="(item,index) in serachdata.order" v-bind:key="index">
										<h3 class="hd">
											<i class="icn u-icn "   v-bind:class="{' u-icn-26': item === 'songs', 'u-icn-27': item === 'artists','u-icn-28': item === 'albums','u-icn-96': item === 'mvs','u-icn-29': item === 'playlists' }"></i>
											
											<em class="fl">{{searchList[item]}}</em>
										</h3>
										<ul class="f-cb" :class="{odd: index%2!= 0}">
											<li v-for=" (keys,keyIndex) in serachdata[item]" v-bind:key="keyIndex">
												<router-link :to="{path:'/songs',query:{id:keys.id}}" v-if="item === 'songs'" >
													<i v-html="searchValue(keys.name,values)"></i>- <i v-for="(songsA,aIndex) in keys.artists" v-bind:key="aIndex" v-html="searchValue(songsA.name,values)"></i>
													
												</router-link>
												<router-link :to="{path:'/artist',query:{id:keys.id}}" v-else-if="item === 'artists'" >
													<i v-html="searchValue(keys.name,values)"></i>
												</router-link>
												<router-link :to="{path:'/album',query:{id:keys.id}}"  v-else-if="item === 'albums'">
													<i v-html="searchValue(keys.name,values)"></i>-<i v-html="searchValue(keys.artist.name,values)"></i>
													
												</router-link>
												<router-link :to="{path:'/mv',query:{id:keys.id}}" v-else-if="item === 'mvs'">
													<i v-html="searchValue(keys.name,values)"></i>- <i v-for="(mvsA,aIndex) in keys.artists" v-bind:key="aIndex" v-html="searchValue(mvsA.name,values)"></i>
													
												</router-link>
												<router-link :to="{path:'/playlist',query:{id:keys.id}}" v-else-if="item === 'playlists'">
													<i v-html="searchValue(keys.name,values)"></i>
													
												</router-link>
											</li>
											
										</ul>
									</div>
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--二级导航-->
			<div class="m-subnav m-subnav-up f-pr j-tflag " :class="{'f-hide':!navBul}"></div>
			<div class="m-subnav j-tflag" id="g_nav2" :class="{'f-hide':navBul}">
				<div class="wrap f-pr">
					<ul class="nav">
						<li :class="{'z-slt':zSlt == 'tj'}">
							<router-link to='/discover'>
								<em>推荐</em>
							</router-link>
						</li>
						<li :class="{'z-slt':zSlt == 'phb'}">
							<router-link to='/discover/toplist'>
								<em>排行榜</em>
							</router-link>
						</li>
						<li :class="{'z-slt':zSlt == 'gd'}">
							<router-link to='/discover/playlist'>
								<em>歌单</em>
							</router-link>
						</li>
						<li :class="{'z-slt':zSlt == 'dt'}">
							<router-link to='/discover/djradio'>
								<em>主播电台</em>
							</router-link>
						</li>
						<li :class="{'z-slt':zSlt == 'gs'}">
							<router-link to='/discover/artist'>
								<em>歌手</em>
							</router-link>
						</li>
						<li :class="{'z-slt':zSlt == 'xdsj'}">
							<router-link to='/discover/album'>
								<em>新碟上架</em>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import eventVue from '../../../static/js/eventVue.js'
	export default {
  name: 'headers',
  data () {
    return {
      serchValue: '音乐/视频/电台/用户',
      dllit:false,
      disnone:true,
      searchShow:true,
      searchhidden:true,
      focusState:false,
      values:'',
      serachdata:{},//搜索内容
      searchList:{'songs':'单曲','artists':'歌手','albums':'专辑','mvs':'视频','playlists':'歌单'},
      logoMode:[
      			{'name':'手机号登录','target':"_self",'idName':'pl','icon':'icon-sj'},
      			{'name':'微信登录','target':"_blank",'idName':'weixin','icon':'icon-wx','id':0},
      			{'name':'QQ登录','target':"_blank",'idName':'QQ','icon':'icon-qq','id':1},
      			{'name':'新浪微博登录','target':"_blank",'idName':'xinlang','icon':'icon-wb','id':2},
      			{'name':'网易邮箱登录','target':"_self",'idName':'el','icon':'icon-yx'}
      			],
      zSlt:'tj',
      logoBline:false,//是否登录
      logoData:null,
      lbmg:[{'path':'/user/home','name':'我的主页','icon':'icn-hm'},{'path':'/msg','name':'我的消息','icon':'icn-msg'},{'path':'/user/level','name':'我的等级','icon':'icn-lv'},{'path':'/member','name':'VIP会员','icon':'icn-mbr'}],
      ltbmg:[{'path':'/user/update','name':'个人设置','icon':'icn-st'},{'path':'/login?targetUrl=%2Fst/userbasic/#/nameverify','name':'实名认证','icon':'icn-verify'}],
      loginD:true,
      searchItme:null,
      navBul:false,
      mNavfst:'fxyy',
    }
  },
  inject:['reload','playHidden'],
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			var that = this;
			if(this.$cookieUtil("email")){
				this.$logoRefresh(function(data){
					that.logoData =  JSON.parse(that.$localUtil("logoData"));
					that.logoBline = true;
					
				})
			}
			/*else{
				this.logout();
			}*/
			
		 
		 eventVue.$on('zSltV', (data) => {
	        console.log(data)
			this.zSlt = data;
			this.playHidden();
	      })
		 eventVue.$on('navBul', (data) => {
	        console.log(data)
			this.navBul = data;
			this.playHidden();
	      })
		  eventVue.$on('mNavfst', (data) => {
	        console.log(data)
			this.mNavfst = data;
			this.playHidden();
	      })
        },
        beforeMount: function () {
//          debugger;
        },
        mounted: function () {
//          debugger;
			
        },
        deactivated: function(){
            alert("keepAlive停用");
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
        directives: {
//			自定义获取焦点
			focus: {
			
				update: function (el, {value}) {
				
					if (value) {
					
						el.focus()
						
					
					}
				
				}
			
			}
		
		},
        methods:{
        	classObjest(){
        		
        		this.dllit = true;
        		this.disnone = false;
        		
        	},
        	classHidden(){
        		this.dllit = false;
        		this.disnone = true;
        	},
        	searchf(){
        		this.searchShow=false;
        		if(this.values){
        			this.searchhidden=false;
        		}
        		clearTimeout(this.searchItme);
        		this.focusState=true;
        	},
        	blurlist(){
        		if(!this.values){
        			this.searchShow=true;
        		}
        		let that = this;
        		this.searchItme = setTimeout(function(){
        			that.searchhidden=true;
        			that.focusState=false;
        		},1000)
        		
        	},
        	//执行搜索
        	search(){
        		var that = this;
        		if(this.values != ''){
        			this.$http({
	        			method:'get',
	        			url:'http://192.168.1.115:3000/search/suggest?keywords='+this.values
	        		}).then(function(resp){                            
	        			console.log(resp.data);
	        			that.serachdata = resp.data.result;
	        			that.searchhidden=false;
	        		}).catch(resp => {
	        			console.log('请求失败：'+resp.status+','+resp.statusText);
	        		});
	        		
        		}
        		
        	},
        	//登录显示
        	logShow($event){
        		var dataIdName = $event.target.getAttribute('data-idName');
        		console.log(dataIdName)
        		eventVue.$emit('classify',dataIdName)
        		this.$drage('auto-id-e0uH7BGEq0gyq7zi')
        		this.$toggleBody(1)
        	},
        	logout(){
        		var _this = this;
        		this.$http({
	        			method:'get',
	        			url:'http://192.168.1.115:3000/logout'
	        		}).then(function(resp){                            
	        			console.log(resp.data);
	        			_this.$removeLocalStorage('logoData');
	        			_this.logoBline = false;
	        			_this.$delCookie("email");
	        			setTimeout(function(){
	        				console.log(_this)
		                    this.reload();
		                 }.bind(_this),1000);
	        		}).catch(resp => {
	        			console.log('请求失败：'+resp.status+','+resp.statusText);
	        		});
        		
        	},
        	logoHide(data){
        		this.loginD = data;
        	},
        	searchEnter(){
        		console.log(this.values)
        		this.$router.push({name: "mSearch", query: {'s': this.values}});
        		this.searchhidden=true;
        		this.focusState=false;
        		
        	}
        },
         //监听
        watch: {
            '$route' (to, from) {

                console.log(to)
                console.log(from)
                //加判断主要发现这个加载了之后，容易引起其他页面也发送请求，所以加了笨方法，加了条件判断，解决了其他页面请求数据加载的问题
                if(this.$route.query.id){
                    //this.reload()
                }

            }
        }
}
</script>

<style  lang="less" scoped>
	@import '../../../static/css/public.less';
	
	.m-top{
		background-color: @basebgc;
		border-bottom: 1px solid @baseBorder;
	    position: relative;
	    z-index: 1000;
	    height: 70px;
	    box-sizing: border-box;
	}
	.show{
		display: block !important;
	}
	.hidden{
		display: none !important;
	}
	.m-logo{
	    width: 176px;
	    height: 69px;
	    background-position: 0 0;
		.p-img;
		.fl;
		span{
			width: 157px;
		    height: 100%;
		    padding-right: 20px;
		    text-indent: -9999px;
		    display: inline-block;
		}
	}
	.m-nav{
		.fl;
		li{
			position: relative;
		    *zoom: 1;
		    background-position: right -300px;
		    .p-img;
    		.fl;
    		height: 70px;
    		font-size: 14px;
    		span{
    			.fl;
    			height: 70px;
    			font-size: 14px;
    				
    		}
    		a{
    			    padding: 0 19px;
				    text-align: center;
				    line-height: 70px;
				    color: #ccc;
				    height: 70px;
    				font-size: 14px;
    				.fl;
    		}
		}
		li.fst{
			span{
				background: none;
				
    			a{
    				color: #FFFFFF;
    				background: #000;
    			}
			}
		}
		li.lst{
			position: relative;
			.hot{
				display: block;
			    position: absolute;
			    top: 21px;
			    left: 100px;
			    width: 28px;
			    height: 19px;
			    background-position: -190px 0;
			    .p-img;
			}
		}
		a:hover{
			background: #000;
		    text-decoration: none;
		    color: #fff;
		}
	}
	.m-tophead{
		.fr;
		height: 45px;
	    margin: 19px 0 0 20px;
	    padding: 0 22px 0 0;
	    background-position: right -47px;
	    .p-img;
	    position: relative;
	    zoom: 1;
	    .link-dl{
	    	display: block;
		    width: 28px;
		    margin-top: 7px;
		    color: #787878;
		    cursor: pointer;
		    font-size: 12px;
	    }
	    .m-tlist{
	    	display: none;
	    	position: absolute;
		    top: 38px;
		    right: -43px;
		    width: 158px;
		    background: #2b2b2b;
		    border: 1px solid #202020;
		    box-shadow: 0 8px 24px 0 rgba(0,0,0,0.50);
		    border-radius: 4px;
		    .f-cb{
		    	li{
		    		.fl;
					box-sizing: border-box;
				    width: 100%;
		    		span{
		    			    .fl;
						    box-sizing: border-box;
						    width: 100%;
						    position: relative;
						    height: 38px;
						    box-sizing: border-box;
						    overflow: hidden;
						    padding-left: 24px;
						    color: #ccc;
						    line-height: 39px;
						    font-size: 12px;
						    cursor: pointer;
						    i{
						    	    float: left;
								    width: 18px;
								    height: 18px;
								    margin: 10px 10px 0 -7px;
								    .p-img-logo;
						    }
						    em{
						    	.fl;
    							width: 100px;
    							text-align: left;
						    }
						    .icon-sj{
						    	background-position: 0 0;
						    }
						    .icon-wx{
						    	background-position: -20px -20px;
						    }
						    .icon-qq{
						    	background-position: -20px -40px;
						    }
						    .icon-wb{
						    	background-position: 0 -20px;
						    }
						    .icon-yx{
						    	background-position: 0 -40px;
						    }
		    		}
		    	}
		    }
		    .arr{
		    	    position: absolute;
				    top: -8px;
				    left: 50%;
				    width: 14px;
				    height: 8px;
				    margin-left: -7px;
				    background-position: -20px 0;
				    .p-img-logo;
		    }
	    } 
	}
	 .m-topvd{
	    	.fr;
	    	a{
		    	.fr;
			    width: 90px;
			    height: 32px;
			    margin: 19px 0 0 12px;
			    box-sizing: border-box;
			    /*padding-left: 16px;*/
			    border: 1px solid #4F4F4F;
			    background-position: 0 -140px;
			    line-height: 33px;
			    color: #ccc;
			    border-radius: 20px;
			    font-size: 12px;
			    text-align: center;
		    }
		    a:hover{
		    	color: #FFFFFF;
		    	border-color: #FFFFFF;
		    }
	    }
	    /*搜索*/
	   .m-srch{
	   	.fr;
	   	position: relative;
	   	width: 158px;
    	height: 32px;
    	zoom: 1;
    	.srchbg{
    		margin-top: 19px;
		    background-position: 0 -99px;
		    background-color: #fff;
		    border-radius: 32px;
		    width: 158px;
    		height: 32px;
    		.p-img;
    		.fr;
    		.parent{
    			display: block;
    			position: relative;
    			margin: 4px 0 0 30px;
    			input{
    				color: #333;
    				line-height: 24px;
    				width: 95%;
				    margin: 0;
				    padding: 0;
				    background: transparent;
				    font-size: 12px;
				    border: none;
    			}
    			label{
    				display: block;
				    position: absolute;
				    top: 0;
				    left: 0;
				    width: 90%;
				    color: #9b9b9b;
				    cursor: text;
				    font-size: 12px;
				    padding-top: 4px;
    			}
    		}
    	}
	   }
	   .m-subnav{
	   	z-index: 90;
	    height: 35px;
	    box-sizing: border-box;
	    background-color: #C20C0C;
	    border-bottom: 1px solid #a40011;
	   }
	   .m-subnav-up {
		    height: 5px;
		    _overflow: hidden;
		    border-bottom: none;
		}
		.f-hide, .js-hide {
		    display: none !important;
		}
		.nav{
		    	.fl;
    			padding-left: 180px;
    			li{
    				.fl;
				    height: 34px;
				    text-align: center;
				    a{
				    	.fl;
					    height: 34px;
					    text-align: center;
					    font-size: 12px;
					    color: #FFFFFF;
					    em{
					    	    display: inline-block;
							    height: 20px;
							    padding: 0 13px;
							    margin: 7px 17px 0;
							    border-radius: 20px;
							    line-height: 21px;
					    }
				    }
    			}
    			.z-slt a em,li a:hover em{
    				    background: #9B0909;
    			}
		    }
		    /*搜索内容*/
		   .u-lstlay {
		    position: absolute;
		    z-index: 120;
		    left: 0;
		    box-sizing: border-box;
		    border: 1px solid #bebebe;
		    border-radius: 4px;
		    background: #fff;
		    box-shadow: 0 4px 7px #555;
		    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);
		    font-size: 12px;
		    display: none;
		}
		.m-srch .u-lstlay {
		    clear: both;
		    top: 59px;
		    width: 240px;
		}
		.m-ulist .note {
		    height: 42px;
		    height: 17px;
		    padding: 11px 10px;
		    border-bottom: 1px solid #e2e2e2;
		}
		.s-fc3, a.s-fc3:hover {
		    color: #666;
		}
		.m-ulist .hd {
		    float: left;
		    width: 52px;
		    margin-right: -100px;
		    padding: 10px 0 0 10px;
		    *padding-top: 9px;
		    border-right: 1px solid #e2e2e2;
		    line-height: 17px;
		    *line-height: 19px;
		    font-weight: normal;
		}
		.m-ulist .hd .icn {
		    float: left;
		    margin: 2px 4px 0 0;
		}
		.u-icn-26, .u-icn-27, .u-icn-28, .u-icn-29 {
		    width: 14px;
		    height: 15px;
		    background-position: -35px -300px;
		}
		.u-icn, .u-icn2, .u-icn3 {
		    display: inline-block;
		    overflow: hidden;
		    vertical-align: middle;
		    .icon-img;
		}
		.u-icn-27 {
		    background-position: -50px -300px;
		}
		.u-icn-28 {
		    background-position: -35px -320px;
		}
		.u-icn-29 {
		    background-position: -50px -320px;
		}
		.u-icn-96 {
		    width: 13px;
		    height: 12px;
		    background-position: -60px -862px;
		}
		.m-ulist {
			ul {
			    margin-left: 62px;
			    margin-top: -1px;
			    padding: 6px 0 5px;
			    border-top: 1px solid #e2e2e2;
			    border-left: 1px solid #e2e2e2;
			    li{
			    	width: 100%;
	    			text-align: left;
	    			a{
	    				display: block;
					    width: 100%;
					    text-indent: 12px;
					    line-height: 24px;
					    overflow: hidden;
					    white-space: nowrap;
					    text-overflow: ellipsis;
	    			}
	    			 a:hover {
					    background-color: #e3e5e7;
    					cursor: pointer;
    					text-decoration: none;
					}
			    }
			}
			ul.odd {
			    background: #f9f8f8;
			}
		}
		
		.s-fc7, a.s-fc7:hover {
		    color: #0c73c2;
		}
		.m-nav .cur {
		    display: none;
		}
		.m-nav li.fst .cur {
		    display: block;
		    position: absolute;
		    left: 50%;
		    top: 64px;
		    width: 12px;
		    height: 7px;
		    margin-left: -6px;
		    overflow: hidden;
		    background-position: -226px 0;
		    .p-img;
		}
		.m-topheads {
		    float: right;
		    height: 45px;
		    margin: 19px 0 0 20px;
		    padding: 0 22px 0 0;
		    background-position: right -47px;
		    background-image: none;
		     .head{
		     	width: 30px;
			    height: 30px;
			    margin-top: 1px;
			    img {
				    width: 30px;
				    height: 30px;
				    border-radius: 30px;
				}
		     }
		     .m-topmsg {
			    display: inline-block;
			    min-width: 17px;
			    height: 17px;
			    padding: 0 4px;
			    box-sizing: border-box;
			    background: #C20C0C;
			    border-radius: 18px;
			    border: 1px solid #242424;
			    line-height: 16px;
			    font-size: 12px;
			    white-space: nowrap;
			    color: #fff;
			    text-align: center;
			    top: -5px;
    			left: 20px;
			} 
			.name {
			    display: inline-block;
			    max-width: 100px;
			    margin: 8px 0 0 8px;
			    line-height: 17px;
			    color: #adadad;
			}
			>.m-tlist {
			    position: absolute;
			    top: 38px;
			    right: -43px;
			    width: 158px;
			    background: #2b2b2b;
			    border: 1px solid #202020;
			    box-shadow: 0 8px 24px 0 rgba(0,0,0,0.50);
			    border-radius: 4px;
			    a {
				    position: relative;
				    height: 38px;
				    box-sizing: border-box;
				    overflow: hidden;
				    padding-left: 24px;
				    color: #ccc;
				    line-height: 39px;
				}
			    >li{
			    	float: left;
				    box-sizing: border-box;
				    width: 100%;
				     a,span {
					    float: left;
					    box-sizing: border-box;
					    width: 100%;
					    
					}
			    }
			     .icn {
				    float: left;
				    width: 18px;
				    height: 18px;
				    margin: 10px 10px 0 -7px;
				}
			    .icn-hm {
			    	background-position: 0 -80px;
				}
				em {
				    float: left;
				    width: 100px;
				}
				.icn-msg {
				    background-position: -20px -120px;
				}
				.m-topmsg {
				    top: 7px;
				    left: 110px;
				}
				.icn-lv {
				    background-position: 0 -100px;
				}
				.icn-mbr {
				    background-position: 0 -221px;
				    margin-top: 9px;
				}
				.ltb {
				    border: 1px solid #232323;
				    border-width: 1px 0;
				}
				.icn-st {
				    background-position: 0 -140px;
				}
				.icn-verify {
				    background-position: -20px -142px;
				}
				.icn-ex {
				    background-position: 0 -200px;
				}
			}
			
			
			>.m-tlist-lged {
				.icn {
				    margin: 7px 10px 0 0;
				}
				a {
				    height: 34px;
				    line-height: 34px;
				   	display: block;
					text-align: left;
				}
			}
			 .m-tlist li{
			 	 float: left;
				 box-sizing: border-box;
				 width: 100%;
				 text-align: left;
			 	span {
				   	display: block;
				    cursor: pointer;
				    height: 34px;
	    			line-height: 34px;
	    			overflow: hidden;
    				padding-left: 24px;
    				color: #ccc;
    				position: relative;
				}
			 }
			 .m-tlist a:hover, .m-tlist span:hover {
			    background: #353535;
			    text-decoration: none;
			    color: #fff;
			}
		}
</style>