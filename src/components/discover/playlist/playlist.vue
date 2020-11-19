<template>
	<div id="discoverPlaylist">
		<div class="g-bd">
			<div class="g-wrap p-pl f-pr">
				<div class="u-title f-cb">
					<h3>
						<span class="f-ff2 d-flag">{{catXzfl}}</span>
						<span class="u-btn2 u-btn2-1 menu d-flag cursor" @click.stop="catListShow"><i @click.stop="catListShow">选择分类 <em class="u-icn u-icn-38"></em></i></span>
					</h3>
					
					<div class="u-btn f-fr u-btn-hot d-flag">
						<router-link to="/discover/playlist/?order=hot" class="a1" @click.native="pathQuery">热门</router-link>
					</div>
				</div>
				<div class="n-sltlyr d-flag" v-bind:hidden="catListHeight" id="cateListBox">
					<div class="hd">
						<i class="icn"></i>
					</div>
					<div class="bd">
						<h3><router-link to="/discover/playlist/" class="j-flag u-btn u-btn-g s-fc1" @click.native="pathQuery"><em>全部风格</em></router-link></h3>
						<dl class="f-cb" v-for="(item,index) in catList" v-bind:key="index">
							<dt >
								<i class="u-icn" :class="[item.icon]"></i>
								{{item.name}}
							</dt>
							<dd>
								<router-link :to="{path:'/discover/playlist/',query:{cat:obj.name}}" class="s-fc1 " v-for="(obj,oIndex) of item.sub" :data-cat="obj.name" @click.native="pathQuery" v-bind:key="oIndex">{{obj.name}} <span class="line">|</span></router-link>
							</dd>
						</dl>
					</div>
					<div class="ft"></div>
				</div>
				<ul class="m-cvrlst f-cb" v-if="playlist.length>0">
					<li v-for="(item,index) of playlist" v-bind:key="index">
						<div class="u-cover u-cover-1">
							<img :src="item.coverImgUrl" class="j-flag"/>
							<router-link :to="{path:'/playlist',query:{id:item.id}}" class="msk" :title="item.name"></router-link>
							<div class="bottom">
								<span class="icon-play f-fr cursor" data-res-action="play" data-res-type="13" :data-res-id="item.id" @click.stop="playSong($event)"></span>
								<span class="icon-headset"></span>
								<span class="nb">{{item.playCount}}</span>
							</div>
						</div>
						
						<p class="dec">
							<router-link :to="{path:'/playlist',query:{id:item.id}}" :title="item.name" class="tit f-thide s-fc0">{{item.name}}</router-link>
						</p>
						<p>
							<span class="s-fc4">by</span>
							<router-link :to="{path:'/user/home',query:{id:item.creator.userId}}" class="nm nm-icn f-thide s-fc3" :title="item.creator.nickname">{{item.creator.nickname}}</router-link>
							<span class="u-icn " :class="[item.creator.userType == 200?'u-icn-84':'']"></span>
							<span class="u-icn " :class="[item.creator.vipType == 11&&item.creator.userType == 2?'u-icn-1':'']"></span>
							<span class="u-icn u-icn2 " :class="[item.creator.vipType == 11&&item.creator.userType == 4?'u-icn2-music2':'']"></span>
						</p>
					</li>
				</ul>
				<div class="u-load s-fc4" v-else>
					<i class="icn"></i>			
				</div>
				<pager v-bind:pageMovers="playlistMover" v-bind:pageLength="playlistLength" v-bind:limit="limit" v-if="playlistLength !== 0" v-on:listenToChild="playlistPagerChild"></pager>
			</div>
			
		</div>
	</div>
</template>

<script>
	import pager from '@/components/publics/pager.vue'
	import eventVue from '../../../../static/js/eventVue.js'
	export default {
	name:'discoverPlaylist',
    data () {
      return {
      	catList:[],
        catListIcon:[{icon:'u-icn-71'},{icon:'u-icn-6'},{icon:'u-icn-7'},{icon:'u-icn-8'},{icon:'u-icn-9'}],
        catListHeight:true,
        catXzfl:'全部',
        playlist:[],
        playlistLength:0,
        playlistMover:true,
        limit:35,
        newHot:"hot",
        cat:"全部",
        offset:0,
        zSlt:'gd',
        barVoice:true
      }
    },
    components: {
	    pager
	 },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
        	var that = this;
//          debugger;
			this.$http({
		         	method:'get',
		         	url:that.$host+'/playlist/catlist'
		         }).then(function(res){
		         	console.log(res.data)
		         	
		         	that.$.each(that.catListIcon,function(index,item){
		         		item.name = res.data.categories[index];
		         		item.sub = [];
		         		
		         			that.$.each(res.data.sub,function(n,el){
		         				
		         				if(index == el.category){
		         					item.sub.push(el)
		         				}
		         			})
		         		that.catList = that.catListIcon;
		         	})
		         	
		         	console.log(that.catList)
		         }).catch(res=>{
		         	console.log('请求失败：'+res);
		         })
		         this.pathQuery();
		        
		        this.$root.eventVue.$emit('zSltV',this.zSlt)
		        this.$root.eventVue.$emit('barVoice',this.barVoice)
        },
        beforeMount: function () {
//          debugger;
        },
        mounted: function () {
//          debugger;
			var _this = this;
			
			 _this.$(document).click(function(event){
		        var _con = _this.$('#cateListBox');  // 设置目标区域
		        if(!_con.is(event.target) && _con.has(event.target).length === 0){ // Mark 1
		           if(!_this.catListHeight){
						_this.catListShow();
						
					}
		           
		        }
		   });
		   
        },
        deactivated: function(){
            alert("keepAlive停用");
        },
        activated: function () {
            console.log('component activated');
        },
        beforeUpdate:function(){
        	console.log('=即将更新渲染=');
        	
        },
        updated:function(){
        	
            console.log('==更新成功==');
            
        },
        beforeDestroy: function () {
            console.group('beforeDestroy 销毁前状态===============》');
            
        },
        destroyed: function () {
            console.group('destroyed 销毁完成状态===============》');
            
        },
        
        methods:{
        	catListShow(){
        		if(this.catListHeight){
        			this.catListHeight = false;
        			
        		}else{
        			this.catListHeight = true;
        		}
        	},
        	playlistHttp(limit,newHot,cat,offset){
        		var that = this;
				this.$http({
			         	method:'get',
			         	url:that.$host+'/top/playlist?limit='+limit+'&order='+newHot+'&cat='+cat+"&offset="+offset,
			         }).then(function(res){
			         	console.log(res.data)
			         	that.$.each(res.data.playlists,function(index,el){
			         		el.playCount = that.$Playback(el.playCount)
			         	})
			         	that.playlist = res.data.playlists;
			         	that.playlistLength = Math.ceil(res.data.total/limit);
			         	that.catXzfl = res.data.cat;
			         }).catch(res=>{
			         	console.log('请求失败：'+res);
			         })
        	},
        	playlistPagerChild(data){
        		console.log(data)
        		var that = this;
        		that.offset = data;
        		this.playlistHttp(that.limit,that.newHot,that.cat,data)
        	},
        	pathQuery(){
        		var that = this;
		        var query = this.$route.query
		        if(query){
		        	if(query.cat){
		        		that.cat = query.cat;
		        		that.catXzfl = query.cat;
		        		that.catListHeight=true;
		        	}else if(query.order){
		        		that.newHot = query.order
		        	}
		        }
		        console.log(query)
		        this.playlistHttp(that.limit,that.newHot,that.cat,that.offset)
        	},
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
       		}
        }
  }
</script>

<style lang="less" scoped>
	
	.g-wrap {
	    padding: 40px;
	    text-align: left;
	}
	.u-title {
	    height: 40px;
	    border-bottom: 2px solid #c20c0c;
	    h3 {
		    float: left;
		    font-size: 24px;
		    font-weight: normal;
		}
		.menu {
		    _position: absolute;
		    font-size: 12px;
		    font-weight: normal;
		    margin: 2px 0 0 12px;
		    i {
			    color: #0c73c2 !important;
			    padding: 0 10px 0 15px;
			    _padding-right: 20px;
			}
			.u-icn-38 {
			    margin-left: 5px;
			    _position: absolute;
			    _top: 13px;
			}
		}
	}
	.f-ff2 {
	    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
	}
	.u-btn2-1 {
	    color: #333;
	    background-position: right -100px;
	    i {
		    color: #333;
		    background-position: 0 -59px;
		    
		}
	}
	.u-icn-38 {
	    width: 8px;
	    height: 5px;
	    background-position: -70px -543px;
	}
	.u-btn-hot {
	    height: 29px;
	    background-position: 0 0;
	    border-radius: 3px;
	}
	.u-title .u-btn .a1, .u-title .u-btn .a2 {
	    float: left;
	    width: 46px;
	    height: 29px;
	    line-height: 29px;
	    text-align: center;
	}
	.u-btn2 i {
	    width: 64px;
	}
	.n-sltlyr {
    /* display: none; */
	    position: absolute;
	    top: 75px;
	    z-index: 5;
	    width: 720px;
	     .hd {
		    height: 32px;
		}
		.icn {
		    position: absolute;
		    top: 2px;
		    left: 132px;
		    display: inline-block;
		    width: 24px;
		    height: 11px;
		    background-position: -48px 0;
		    vertical-align: middle;
		}
		.bd {
		    width: 700px;
		    padding: 0 10px;
		    background-position: -720px 0;
		    background-repeat: repeat-y;
		}
		h3 {
		    height: 37px;
		    padding-left: 26px;
		    border-bottom: 1px solid #e6e6e6;
		    font-weight: normal;
		}
		dt {
		    float: left;
		    display: inline;
		    width: 70px;
		    margin: 0 -100px 0 26px;
		    padding-top: 15px;
		    border-right: 1px solid #e6e6e6;
		    font-weight: bold;
		}
		.u-icn {
		    margin-right: 8px;
		    margin-bottom: 4px;
		}
		 dd {
		    margin-left: 96px;
		    padding: 16px 15px 0 15px;
		    border-left: 1px solid #e6e6e6;
		    line-height: 24px;
		    a {
			    white-space: nowrap;
			    display: inline-block;
			}
			.line {
			    margin: 0 8px 0 10px;
			    color: #d8d8d8;
			}
		}
		dd.last {
		    padding-bottom: 25px;
		}
		.ft {
		    height: 20px;
		    background-position: -1440px -12px;
		}
	}
	.u-btn-g {
    width: 75px;
    height: 26px;
    background-position: 0 -64px;
    text-align: center;
    line-height: 26px;
}
.u-icn-71 {
    width: 23px;
    height: 23px;
    background-position: -20px -735px;
}
.u-icn-6 {
    width: 24px;
    height: 24px;
    background-position: 0 -60px;
}
.u-icn-7 {
    width: 24px;
    height: 24px;
    background-position: 0 -88px;
}
.u-icn-8 {
    width: 24px;
    height: 24px;
    background-position: 0 -117px;
}
.u-icn-9 {
    width: 24px;
    height: 24px;
    background-position: 0 -141px;
}
/*歌单列表*/
.p-pl .m-cvrlst {
    margin: 30px 0 0 -50px;
}
.m-cvrlst {
	li {
	    float: left;
	    display: inline-block;
	    width: 140px;
	    height: 188px;
	    overflow: hidden;
	    padding: 0 0 30px 50px;
	    line-height: 1.4;
	    p{
			width: 100%;
			.u-icn {
			    margin-top: -1px;
			    *margin-top: -2px;
			    _margin-top: -3px;
			}
		}
		.dec {
		    margin: 8px 0 3px;
		    font-size: 14px;
		}
		.tit {
		    display: inline-block;
		    max-width: 100%;
		    _width: 100%;
		    vertical-align: middle;
		}
		 .nm {
		    display: inline-block;
		    max-width: 85%;
		    vertical-align: middle;
		}
		.nm-icn {
		    max-width: 76%;
		}
	}
	
}
.u-cover-1 {
    width: 140px;
    height: 140px;
    .msk {
	    background-position: 0 0;
	}
}
.u-cover img {
    display: block;
    width: 100%;
    height: 100%;
}
.u-cover .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 27px;
    background-position: 0 -537px;
    color: #ccc;
}
.u-cover .icon-play {
    position: absolute;
    right: 10px;
    bottom: 5px;
    width: 16px;
    height: 17px;
    background-position: 0 0;
}
.u-cover .icon-headset {
    float: left;
    width: 14px;
    height: 11px;
    background-position: 0 -24px;
    margin: 9px 5px 9px 10px;
}
.u-cover .nb {
    float: left;
    margin: 7px 0 0 0;
}

</style>