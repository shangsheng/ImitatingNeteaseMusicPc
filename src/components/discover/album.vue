<template>
	<div id="album" v-wechat-title="this.title">
		<div class="g-bd4 f-cb p-share" v-if="album">
			<div class="g-mn4">
				<div class="g-mn4c">
					<div class="g-wrap6">
						<div class="m-info f-cb">
							<div class="cover u-cover u-cover-alb">
								<img :src="album.picUrl" class="j-img"/>
								<span class="msk"></span>
							</div>
							<div class="cnt">
								<div class="cntc">
									<div class="topblk">
										<div class="hd f-cb">
											<i class="f-fl u-icn u-icn-16"></i>
											<div class="tit">
												<h2 class="f-ff2">{{album.name}}</h2>
												<div class="subtit f-fs1 f-ff2" v-for=" keys in album.transNames" v-if="album.transNames.length>0">
													{{keys}}
												</div>
											</div>
										</div>
										<p class="intr">
											<b>歌手：</b>
											<span :title="album.artistsName">
												<router-link :to="{path:'/artist',query:{id:obj.id}}" v-for="(obj,num) in album.artists" class="s-fc7">{{obj.name}} <i v-bind:hidden="num ==album.artists.length-1">/</i></router-link>
											</span>
										</p>
										<p class="intr">
											<b>发行时间：</b>
											{{album.publishTime}}
										</p>
										<p class="intr">
											<b>发行公司：</b>
											{{album.company}}
										</p>
									</div>
									<play-songs v-bind:playlistArr="playSongs" v-if="playSongs"></play-songs>
								</div>
							</div>
						</div>
						<div class="n-albdesc">
							<h3>专辑介绍：</h3>
							<div class="f-brk" :class="{'f-hide':!fHide}">
								<p v-for="item in album.descriptions">{{item}}</p>
							</div>
							<div  :class="{'f-hide':fHide}">
								<p class="f-brk" v-for="item in album.description">{{item}}</p>
							</div>
							
							<div class="f-cb" v-if="album.description">
								<span class="s-fc7 f-fr cursor" @click.stop="fbrkTab">
									{{fHide?'展开':'收起'}}
									<i class="u-icn " :class="[fHide?'u-icn-69':'u-icn-70']"></i>
								</span>
							</div>
						</div>
						<div class="n-songtb">
							<div class="u-title u-title-1 f-cb">
								<div class="out out-list s-fc3">
									<i class="u-icn u-icn-95 f-fl"></i>
									<span class="des s-fc7 cursor" @click.stop="shows" data-action="outchain" :data-href="{path:'/outchain/1/',query:{id:album.id}}">生成外链播放器</span>
								</div>
								<h3>
									<span class="f-ff2">包含歌曲类表</span>
								</h3>
								<span class="sub s-fc3">
									<span>{{songs.length}}</span>
									歌首
								</span>
								
							</div>
							<songs-list-cashe v-bind:songsPreCahe="songs" v-if="songs"></songs-list-cashe>
							<div class="u-load s-fc4" v-else>
								<i class="icn"></i>			
							</div>
						</div>
						<my-comments></my-comments>
					</div>
				</div>
			</div>
			<div class="g-sd4">
				<div class="g-wrap7">
					<my-down></my-down>
				</div>
			</div>
		</div>
		<div class="u-load s-fc4" v-else>
			<i class="icn"></i>			
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
	name:'album',
    data () {
      return {
        playSongs:{},
        album:null,
        fHide:true,
        songs:null,
        zShow:true,
        zSlt:'zjxq',
        title:'专辑详情',
        navBul:false,
        barVoice:true
      }
    },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			let that = this;
			let id = this.$route.query.id;
			this.$http({
		         	method:'get',
		         	url:that.$host+'/album?id='+id
		         }).then(function(res){
		         	console.log(res.data)
		         	var playlistSongs = new Object();
		         	res.data.album.publishTime = that.$datePublish('Y-m-d',res.data.album.publishTime)
		         	if(res.data.album.description){
		         		res.data.album.descriptions = that.cutStringComent(res.data.album.description).split('\n')
		         		res.data.album.description = res.data.album.description.split('\n')
		         	}
		         	
		         	playlistSongs.commentCount = res.data.album.info.commentCount;
		         	playlistSongs.subscribedCount = res.data.album.info.likedCount;
		         	playlistSongs.id = res.data.album.id;
		         	playlistSongs.shareCount = res.data.album.info.shareCount;
		         	playlistSongs.specialType = res.data.album.type;
		         	playlistSongs.name = res.data.album.name;
		         	playlistSongs.pic = res.data.album.picUrl;
		         	playlistSongs.author = res.data.album.artist.name;
		         	playlistSongs.liked = false;
		         	playlistSongs.types = 19;
		         	that.playSongs =playlistSongs;
		         	res.data.album.types = 18;
		         	res.data.album.froms = 19;
		         	var arLength = '';
		         	that.$.each(res.data.album.artists,function(ind,el){
					
						if(ind<res.data.album.artists.length){
							arLength = arLength+el.name+'/'
						}else{
							arLength = arLength+el.name
						}
						
					})
		         	res.data.album.artistsName = arLength
		         	that.album = res.data.album;
		         	res.data.songs.types = 19;
		         	res.data.songs.froms = 18;
		         	res.data.songs.id = id;
		         	res.data.songs.category = '新碟';
		         	that.songs = res.data.songs;
		         	that.title = res.data.album.name + ' - 新碟 - 我的云音乐'
		         	that.$root.eventVue.$emit('titles',that.title)
		         }).catch(res=>{
		         	console.log('请求失败：'+res);
		         })
		         this.$root.eventVue.$emit('zSltV',this.zSlt)
		         this.$root.eventVue.$emit('navBul',this.navBul);
		         this.$root.eventVue.$emit('barVoice',this.barVoice);
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
        		return this.$cutString(commentCount,320)
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
	#album{
		text-align: left;
		.u-cover-alb {
		    width: 177px;
		    height: 177px;
		    .msk {
			    width: 209px;
			    height: 177px;
			    background-position: 0 -986px;
			}
		}
		.m-info {
			.topblk {
			    margin-bottom: 20px;
			}
			.subtit {
			    margin: 1px 0 5px;
			    line-height: 14px;
			    color: #bababa;
			}
			.intr {
				margin-top: 4px;
			    line-height: 18px;
			    color: #666;

				b {
				    display: inline-block;
				}
			}
			.tit {
			    margin-left: 64px;
			    position: relative;
			}
			.hd {
				position: relative;
    			margin: 0 0 12px;
    			line-height: 24px;
				h2 {
				    line-height: 24px;
				    font-size: 20px;
				    font-weight: normal;
				}
			}
		}
		.u-icn-16 {
		    width: 54px;
		    height: 24px;
		    background-position: 0 -186px;
		}
		.u-icn-69{
			width: 11px;
		    height: 8px;
		    background-position: -65px -520px;
		}
		 .u-icn-70 {
		    width: 11px;
		    height: 8px;
		    background-position: -45px -520px;
		}
		.n-albdesc{
			 p {
			    color: #666;
			    text-indent: 2em;
			    line-height: 24px;
			    margin-top: 4px;
			}
		}
		.n-songtb {
		    margin-top: 27px;
		}
		.u-title {
			.out {
			    margin-right: 20px;
			}
		}
		.u-title-1 {
		    height: 33px;
		    .out {
			    margin-top: 5px;
			    float: right;
			}
			h3 {
			    font-size: 20px;
			    line-height: 28px;
			}
			.sub {
			    margin: 9px 0 0 20px;
			}
		}
		.f-fs1 {
		    font-size: 14px;
		    line-height: 22px;
		    
		}
		.lybtn{
			text-align: center;
			.u-btn2-w2{
				i {
				    width: 40px;
				}
			}
		}
		div.m-layer {
			.zttl{
			padding: 0;
			}
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
	}
	
</style>