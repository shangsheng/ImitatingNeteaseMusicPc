<template>
	<div id="myPlaylist" v-wechat-title="this.title">
		<div class="g-mn3 f-pr j-flag">
			<div class="f-pr">
				<div class="j-flag">
					<div class="g-wrap">
						<div class="m-info f-cb" v-if="playlist">
							<div class="cover u-cover u-cover-dj">
								<img :src="playlist.coverImgUrl" :data-src="playlist.coverImgUrl" class="j-img"/>
								<span class="msk"></span>
							</div>
							<div class="cnt">
								<div class="cntc">
									<div class="hd f-cb">
										<i class="f-fl u-icn u-icn-13 f-pr">
											<span class="f-pa f-r-white-icon f-gd-u"></span>
										</i>
										<div class="tit">
											<h2 class="f-ff2 f-brk">{{playlist.name}}</h2>
										</div>
									</div>
									<div class="user f-cb">
										<router-link :to="{path:'/user/home',query:{id:playlist.creator.userId}}" class="face">
											<img :src="playlist.creator.avatarUrl"/>
										</router-link>
										<span class="name">
											<router-link :to="{path:'/user/home',query:{id:playlist.creator.userId}}" class="s-fc7">
												{{playlist.creator.nickname}}
											</router-link>
										</span>
										<span class="u-icn " :class="[playlist.creator.userType == 200?'u-icn-84':'']"></span>
										<span class="u-icn " :class="[playlist.creator.vipType == 11&&playlist.creator.userType == 2?'u-icn-1':'']"></span>
										<span class="u-icn u-icn2 " :class="[playlist.creator.vipType == 11&&playlist.creator.userType == 4?'u-icn2-music2':'']"></span>
										<span class="time s-fc4">{{playlist.createTime}} &nbsp;创建</span>
									</div>
									<play-songs v-bind:playlistArr="playSongs" v-if="playSongs"></play-songs>
									<div class="tags f-cb" v-if="playlist.tags.length != 0">
										<b>标签:</b>
										<router-link :to="{path:'/discover/playlist/',query:{cat:item,order:'hot'}}" class="u-tag" v-for="item of playlist.tags"><i>{{item}}</i></router-link>
									</div>
									<p class="intr f-brk" :class="{'f-hide':!fHide}" v-if="playlist.description">介绍: <span v-html="cutStringComent(playlist.description)"></span></p>
									<p class="intr f-brk " :class="{'f-hide':fHide}">介绍: <span v-html="playlist.description"></span></p>
									<div class="f-cb" v-if="playlist.description">
										<span class="s-fc7 f-fr cursor" @click.stop="fbrkTab">
											{{fHide?'展开':'收起'}}
											<i class="u-icn " :class="[fHide?'u-icn-69':'u-icn-70']"></i>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div class="n-songtb" v-if="playlist">
							<div class="u-title u-title-1 f-cb">
								<h3>
									<span class="f-ff2">歌曲类表</span>
								</h3>
								<span class="sub s-fc3">
									<span>{{playlist.tracks.length}}</span>
									歌首
								</span>
								<span class="more s-fc3">
									播放:
									<strong class="s-fc6">{{playlist.playCount}}</strong>
									次
								</span>
								<div class="out out-list s-fc3">
									<i class="u-icn u-icn-95 f-fl"></i>
									<span class="des s-fc7 cursor" @click.stop="shows">生成外链播放器</span>
								</div>
							</div>
							<songs-list-cashe v-bind:songsPreCahe="playlist" v-if="playlist"></songs-list-cashe>
							<div class="u-load s-fc4" v-else>
								<i class="icn"></i>			
							</div>
						</div>
						<div class="u-load s-fc4" v-else>
							<i class="icn"></i>			
						</div>
						<my-comments></my-comments>
					</div>
				</div>
				
			</div>
			
		</div>
		<div class="auto-1570515032630 m-layer z-show m-layer-w2" v-bind:hidden="zShow">
			<div class="zbar" id="auto-id-DAz5UrtJStqSvE3Z">
				<div class="zttl f-thide">
					提示
				</div>
			</div>
			<div class="zcnt">
				<div class="lyct f-cb f-tc">
					<div class="f-fs1">
						由于版权保护，无法生成外链。
					</div>
					<div class="lybtn">
						<span class="cursor u-btn2 u-btn2-2 u-btn2-w2" @click.stop="shows"><i>知道了</i></span>
					</div>
				</div>
			</div>
			<span class="zcls" @click.stop="shows">x</span>
		</div>
		<div class="auto-1570515032629" v-bind:hidden="zShow"></div>
	</div>
</template>

<script>
	import eventVue from '../../../static/js/eventVue.js'
	export default {
	name:'myPlaylist',
    data () {
      return {
        playlist:null,
        playSongs:{},
        fHide:true,
        relatedPlaylist:null,
        zShow:true,
        title:'歌单详情',
       
      }
    },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			var that = this;
			var id = this.$route.query.id
			this.$http({
		         	method:'get',
		         	url:that.$host+'/playlist/detail?id='+id
		         }).then(function(res){
		         	console.log(res.data)
		         	var playlistSongs = new Object();
		         	res.data.playlist.createTime = that.$datePublish('Y-m-d',res.data.playlist.createTime)
		         	if(res.data.playlist.description){
		         		res.data.playlist.description = res.data.playlist.description.replace(/\n/g,'<br>')
		         	}
		         	
		         	playlistSongs.commentCount = res.data.playlist.commentCount;
		         	playlistSongs.subscribedCount = res.data.playlist.subscribedCount;
		         	playlistSongs.id = res.data.playlist.id;
		         	playlistSongs.shareCount = res.data.playlist.shareCount;
		         	playlistSongs.specialType = res.data.playlist.specialType;
		         	playlistSongs.name = res.data.playlist.name;
		         	playlistSongs.pic = res.data.playlist.coverImgUrl;
		         	if(res.data.playlist.creator){
		         		playlistSongs.author = res.data.playlist.creator.nickname;
		         	}else{
		         		
					    that.$.ajax({
				        	method:'get',
				        	url:that.$host +'/user/detail',
				        	data:{
				        			uid:id,	
				        	},
				        	async: false,
				        	success:function(resp){
				       			console.log(resp)
				   				res.data.playlist.creator = resp.profile
			    			},
				   			error:function(res){
				        		console.log(res)
				   			}
				        })
		         	}
		         	
		         	playlistSongs.liked = true;
		         	playlistSongs.types = 13;
		         	that.playSongs =playlistSongs;
		         	res.data.playlist.types = 18;
		         	res.data.playlist.froms = 13;
		         	res.data.playlist.category = '歌单';
		         	that.playlist = res.data.playlist;
		         	that.title = res.data.playlist.name + ' - 歌单 - 我的云音乐'
//		         	that.$root.eventVue.$emit('titles',that.title)
		         }).catch(res=>{
		         	console.log('请求失败：'+res);
		         })
		         console.log(that.$formatTime(215.000))//dt是时间歌曲时间，秒保留两位数
		    
		    this.$http({
		    	method:'get',
		    	url:that.$host+'/related/playlist?id='+id
		    }).then(function(res){
		    	console.log(res.data)
		    	that.relatedPlaylist = res.data.playlists
		    }).catch(res=>{
		    	console.log('请求失败：'+res);
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
        
        methods:{
        	cutStringComent(commentCount){
        		return this.$cutString(commentCount,200)
        	},
        	fbrkTab(){
        		if(this.fHide){
        			this.fHide = false;
        		}else{
        			this.fHide = true;
        		}
        	},
        	shows(){
        		if(this.zShow){
        			this.zShow = false
        			this.$drage('auto-id-DAz5UrtJStqSvE3Z')
        		}else{
        			this.zShow = true
        		}
        	}
        }
  }
</script>

<style lang="less">
	.g-mn3 {
	    height: 100%;
	    float: right;
	    width: 740px;
	    padding-bottom: 50px;
	    border-left: 1px solid #d3d3d3;
	}
	.g-wrap {
    padding: 40px;
}
	.u-cover-dj {
	    width: 200px;
	    height: 200px;
	    .msk {
		    width: 208px;
		    height: 208px;
		    background-position: 0 -1285px;
		    top: -4px;
		    left: -4px;
		}
	   
	}
	 .m-info .user .face, .m-info .user .face img {
    float: left;
    width: 35px;
    height: 35px;
}
	.m-info {
		.hd {
		    position: relative;
		    margin: 0 0 12px;
		    line-height: 24px;
		     text-align: left;
		     h2 {
			    line-height: 24px;
			    font-size: 20px;
			    font-weight: normal;
			}
		}
		.tit {
		    margin-left: 64px;
		    position: relative;
		}
		.user {
		    margin: 0 0 20px;
		    line-height: 35px;
		    .face {
			    margin-right: 10px;
			}
			.name {
			    float: left;
			}
			.u-icn {
			    float: left;
			    margin: 9px 0 0 3px;
			    *margin-top: 10px;
			}
			.time {
			    margin-left: 15px;
			}
		}
		
		.tags {
		    margin: 25px 0 5px;
		    line-height: 22px;
		    b {
			    float: left;
			    margin-right: 10px;
			}
		}
		 b {
		    font-weight: normal;
		    color: #666;
		}
		.face {
			float: left;
			width: 35px;
		    height: 35px;
			img {
			    float: left;
			    width: 35px;
			    height: 35px;
			}
		}
		 
	}
	.u-icn-13 {
	    width: 54px;
	    height: 24px;
	    background-position: 0 -243px;
	}
	.f-gd-u{
		display:inline-block;
		width:8px;
		height:8px;
		top:2px;
		background-size:cover;
		left:34px;
	}
	
	.f-brk {
	    word-wrap: break-word;
	    word-break: break-word;
	    white-space: normal;
	    text-align: left;
	}
	.m-info 
.m-info .user .face, .m-info .user .face img {
    float: left;
    width: 35px;
    height: 35px;
}

.u-tag, .u-tag i {
    float: left;
    height: 22px;
    line-height: 22px;
}
.u-tag, .u-tag:hover {
    color: #777;
    text-decoration: none;
}
.u-tag {
    padding: 0 10px 0 0;
    text-shadow: 0 1px #fdfdfd;
    background-position: right -27px;
}
.m-info .tags .u-tag {
    float: left;
    margin: 0px 10px 3px 0;
}
.m-info .intr {
    margin-top: 4px;
    line-height: 18px;
    color: #666;
}
.f-hide, .js-hide {
    display: none !important;
}
.u-icn-69, .u-icn-70 {
    width: 11px;
    height: 8px;
    background-position: -65px -520px;
}
.u-icn-70 {
    background-position: -45px -520px;
}
.u-tag i {
    position: relative;
    zoom: 1;
    padding: 0 3px 0 13px;
    background-position: 0 0;
}
.n-songtb {
    margin-top: 27px;
    text-align: left;
}

.u-title-1 {
    height: 33px;
}
 .u-title-1  h3 {
	    font-size: 20px;
	    line-height: 28px;
	}
.u-title-1	.sub {
	    margin: 9px 0 0 20px;
	}
.u-title-1	.more {
	    margin-top: 5px;
	}
.u-title-1	 .out {
	    margin-top: 5px;
	    float: right;
	}
.u-title .out {
    margin-right: 20px;
}
.u-icn-95 {
    width: 16px;
    height: 16px;
    background-position: -34px -863px;
}
.g-sd4 {
    position: relative;
    float: right;
    width: 270px;
    zoom: 1;
}
.g-wrap7 {
    padding: 20px 40px 40px 30px;
}
.u-hd3 {
    position: relative;
    *zoom: 1;
    height: 23px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    color: #333;
}
.m-piclist {
    margin-left: -13px;
    padding-bottom: 25px;
    li {
	    display: inline;
	    padding: 0 0 13px 13px;
	}
}
.m-piclist li, .m-piclist li img {
    float: left;
    width: 40px;
    height: 40px;
}
.m-rctlist {
    margin-bottom: 25px;
    li {
	    float: left;
	    width: 200px;
	    height: 50px;
	    margin-bottom: 15px;
	    line-height: 24px;
	}
	.cver {
	    margin-right: -60px;
	}
	.info {
	    margin-left: 60px;
	    line-height: 24px;
	    p {
		    width: 140px;
		}
	}
	.by {
	    float: left;
	}
	.nm {
	    float: left;
	    max-width: 106px;
	    margin: 0 2px 0 4px;
	}
}
.m-rctlist .cver, .n-rctlist .cver img {
    float: left;
    width: 50px;
    height: 50px;
}
div.m-layer-w2 {
    width: 480px !important;
}
.auto-1570515032629 {
    position: fixed;
    _position: absolute;
    z-index: 100;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-image: url(data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==);
}
.u-btn2-w2 i {
    width: 40px;
}

</style>