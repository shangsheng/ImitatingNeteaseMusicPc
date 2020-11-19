<template>
	<div id="discoverToplist">
		<div class="g-bd3 g-bd3-1 f-cb">
			<div class="g-sd3 g-sd3-1" v-if="rankingList">
				<div class="n-minelst n-minelst-2">
					<h2 class="f-ff1">云音乐特色榜</h2>
					<ul class="f-cb">
						<li :data-res-id="item.id" data-res-action="href" class="mine " :class="{'z-selected':zSelected==index}" v-for="(item,index) of rankingList" v-bind:hidden="index>3" @click="toplist($event)" v-bind:key="index">
							<div class="item f-cb">
								<div class="left">
									<router-link :to="{path:'/discover/toplist',query:{id:item.id}}" class="avatar" @click.native.stop="toplist($event)">
										<img :src="item.coverImgUrl" :alt="item.name"/>
										<span class="msk"></span>
									</router-link>
								</div>
								<p class="name">
									<router-link :to="{path:'/discover/toplist',query:{id:item.id}}" class="s-fc0" @click.native.stop="toplist($event)">
										{{item.name}}
									</router-link>
								</p>
								<p class="s-fc4">{{item.updateFrequency}}</p>
							</div>
						</li>
					</ul>
					<h2 class="scd f-ff1 ">全球媒体榜</h2>
					<ul class="f-cb">
						<li :data-res-id="item.id" daa-res-action="href" class="mine " :class="{'z-selected':zSelected==index}" v-for="(item,index) of rankingList" v-bind:hidden="index<4" @click="toplist($event)" v-bind:key="index">
							<div class="item f-cb">
								<div class="left">
									<router-link :to="{path:'/discover/toplist',query:{id:item.id}}" class="avatar" @click.native.stop="toplist($event)">
										<img :src="item.coverImgUrl" :alt="item.name"/>
										<span class="msk"></span>
									</router-link>
								</div>
								<p class="name">
									<router-link :to="{path:'/discover/toplist',query:{id:item.id}}" class="s-fc0" @click.native.stop="toplist($event)">
										{{item.name}}
									</router-link>
								</p>
								<p class="s-fc4">{{item.updateFrequency}}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			
			<div class="g-mn3" v-if="toplistData">
				<div class="g-mn3c">
					<div class="g-wrap">
						<div class="m-info m-info-rank f-cb">
							<div class="cover u-cover u-cover-rank">
								<img :src="toplistData.coverImgUrl"/>
								<span class="msk"></span>
							</div>
							<div class="cnt">
								<div class="cntc m-info">
									<div class="hd f-cb">
										<h2 class="f-ff2">{{toplistData.name}}</h2>
									</div>
									<div class="user f-cb">
										<i class="u-icn u-icn-57"></i>
										<span class="sep s-fc3">最近更新：{{toplistData.trackUpdateTime}}</span>
										<span class="s-fc4">({{rankingList[zSelected].updateFrequency}})</span>
									</div>
									<play-songs v-bind:playlistArr="playSongs" v-if="playSongs" :key="keyTop"></play-songs>
								</div>
							</div>
						</div>
						
					</div>
					<div class="g-wrap12">
						<div class="u-title u-title-1 f-cb">
							<h3>
								<span class="f-ff2">歌曲列表</span>
							</h3>
							<span class="sub s-fc3">
								<span>{{toplistData.tracks.length}}</span>
								首歌
							</span>
							<div class="more s-fc3">
								播放
								<strong class="s-fc6">{{toplistData.playCount}}</strong>
								次
							</div>
						</div>
						<songs-list-cashe v-bind:songsPreCahe="toplistData" v-if="toplistData" :key="keytoplist"></songs-list-cashe>
						<div class="u-load s-fc4" v-else>
							<i class="icn"></i>			
						</div>
						<my-comments :key="keyComments"></my-comments>
					</div>
					
				</div>
			</div>
			<div class="u-load s-fc4" v-else>
				<i class="icn"></i>			
			</div>
			<div class="u-load s-fc4 listSongs" v-show="keyHidden">
				<i class="icn"></i>			
			</div>
		</div>
	</div>
</template>

<script>
	import eventVue from '../../../../static/js/eventVue.js'
	export default {
	name:'discoverToplist',
    data () {
      return {
        zSlt:'phb',
        rankingList:null,
        zSelected:0,
        toplistData:null,
        idx:3,
        toplistIdx:[
        			{idx:0,name:'云音乐新歌榜'},{idx:1,name:'云音乐热歌榜'},{idx:2,name:'网易原创歌曲榜'},{idx:3,name:'云音乐飙升榜'},{idx:4,name:'云音乐国电榜'},
        			{idx:5,name:'UK排行榜周榜'},{idx:6,name:'美国Billboard周榜'},{idx:7,name:'KTV唛榜'},{idx:8,name:'iTunes榜'},{idx:9,name:'Hit FM Top榜'},
        			{idx:10,name:'日本Oricon周榜'},{idx:11,name:'韩国Melon排行榜周榜'},{idx:12,name:'韩国Mnet排行榜周榜'},{idx:13,name:'韩国Melon原声周榜'},{idx:14,name:'中国TOP排行榜(港台榜)'},
        			{idx:15,name:'中国TOP排行榜(内地榜)'},{idx:16,name:'香港电台中文歌曲龙虎榜'},{idx:17,name:'华语金曲榜'},{idx:18,name:'中国嘻哈榜'},{idx:19,name:'法国 NRJ Vos Hits 周榜'},
        			{idx:20,name:'台湾Hito排行榜'},{idx:21,name:'Beatport全球电子舞曲榜'},{idx:22,name:'云音乐ACG音乐榜'},{idx:23,name:'云音乐说唱榜'},{idx:24,name:'云音乐古典音乐榜'},
        			{idx:25,name:'云音乐电音榜'},{idx:26,name:'抖音排行榜'},{idx:27,name:'新声榜'},{idx:28,name:'云音乐韩语榜'},{idx:29,name:'英国Q杂志中文版周榜'},
        			{idx:30,name:'电竞音乐榜'},{idx:31,name:'云音乐欧美热歌榜'},{idx:32,name:'云音乐欧美新歌榜'},{idx:33,name:'说唱TOP榜'},{idx:34,name:'云音乐ACG动画榜'},{idx:35,name:'云音乐ACG游戏榜'},{idx:36,name:'云音乐ACG VOCALOID榜'}
        			],
        playSongs:null,
        barVoice:true,
        keyTop:1,
        keyHidden:false,
        keyComments:2,
        keytoplist:3,
      }
    },
    inject:['reload'],
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			var that = this;
			this.$root.eventVue.$emit('zSltV',this.zSlt)
			this.$root.eventVue.$emit('barVoice',this.barVoice)
			let id = this.$route.query.id;
			console.log(id)
			this.$http({
		         	method:'get',
		         	url:that.$host+'/toplist',
		         	emulateJSON: true
		         }).then(function(res){
		         	console.log(res.data)
		         	that.$.each(res.data.list,function(index,item){
		         		that.$.each(that.toplistIdx,function(nums,el){
		         			if(item.name == el.name){
		         				item.idx = el.idx
		         				return false
		         			}
		         		})
		         		
		         	})
		         	that.rankingList = res.data.list
		         	console.log(that.rankingList)
		         	if(id){
		       			that.$.each(that.rankingList,function(index,item){
	        				if(item.id == id){
	        					console.log(index)
	        					that.zSelected = index
	        					that.topListHttp(item.id)
	        					return false;
	        				}
	        			})
		         	}else{
		         		that.topListHttp(that.rankingList[0].id)
		         	}
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
        	topListHttp(idx){
        		var that = this;
        		if(this.toplistData!=null){
        		 this.keyHidden = true;
        		}
        		this.$http({
		         	method:'get',
		         	url:that.$host+'/playlist/detail?id='+idx,
		         	emulateJSON: true
		         }).then(function(res){
		         	console.log(res.data)
		         	var playlistSongs = new Object();
		         	res.data.playlist.trackUpdateTime = that.$datePublish('m-d',res.data.playlist.trackUpdateTime).replace('-','月')+'日';
		         	playlistSongs.commentCount = res.data.playlist.commentCount;
		         	playlistSongs.subscribedCount = res.data.playlist.subscribedCount;
		         	playlistSongs.id = res.data.playlist.id;
		         	playlistSongs.shareCount = res.data.playlist.shareCount;
		         	playlistSongs.specialType = res.data.playlist.specialType;
		         	playlistSongs.name = res.data.playlist.name;
		         	playlistSongs.pic = res.data.playlist.coverImgUrl;
		         	playlistSongs.author = res.data.playlist.creator.nickname;
		         	playlistSongs.liked = true;
		         	playlistSongs.types = 13;
		         	playlistSongs.froms = 31;
		         	playlistSongs.idx = idx;
		         	that.playSongs =playlistSongs;
		         	res.data.playlist.types = 13;
		         	res.data.playlist.froms = 31;
		         	res.data.playlist.category = '排行榜';
		         	// res.data.playlist.playCount = that.$Playback(res.data.playlist.playCount);
		         	that.toplistData = res.data.playlist;
		         	
		         	console.log(that.toplistData)
		         }).catch(res=>{
		         	console.log('请求失败：'+res);
		         })
        	},
        	toplist($event){
        		console.log($event)
        		
        		var that = this;
        		if(!$event.target.getAttribute('data-res-action')){
        			console.log($event.path[1].dataset.resId)
        			if($event.path[1].dataset.resId){
        				window.location.href="http://localhost:8080/#/discover/toplist?id="+$event.path[1].dataset.resId
        			}else if($event.path[2].dataset.resId){
        				window.location.href="http://localhost:8080/#/discover/toplist?id="+$event.path[2].dataset.resId
        			}
        			
				}
				let id = this.$route.query.id;
					console.log(id)
					this.$.each(that.rankingList,function(index,item){
        				if(item.id == id){
        					that.zSelected = index
        					that.topListHttp(item.id)
        					return false;
        				}
        			})
        	}
        },
        //监听
        watch: {
            '$route' (to, from) {

                if(this.$route.query.s){
                      this.reload()
                }

            },
          	toplistData(){
          		++this.keyTop;
          		++this.keyComments;
          		++this.keytoplist;
          		this.keyHidden = false;
          	}
        }
  }
</script>

<style lang="less" scoped>
	#discoverToplist{
		text-align: left;
		.g-sd3 {
		    float: left;
		    width: 240px;
		    position: fixed;
		    _position: absolute;
		}
		.g-sd3-1 {
		    position: static;
		}
		.n-minelst {
			li:hover{
			    background-color: #f4f2f2;
			}
			.z-hover {
			    background-color: #f4f2f2;
			}
			h2 {
			    padding: 0 10px 12px 15px;
			    font-size: 14px;
			    color: #000;
			    font-weight: bold;
			}
			h2.scd {
			    margin-top: 20px;
			}
			 li {
			    position: relative;
			    zoom: 1;
			    height: 42px;
			    padding: 6px 0 6px 20px;
			}
			li.z-selected {
			    background: #e6e6e6;
			}
			li.z-selected:hover {
			    background: #e6e6e6;
			}
			.item {
			    padding-left: 50px;
			}
			.left {
			    display: inline;
			    float: left;
			    margin-left: -50px;
			    overflow: hidden;
			    width: 40px;
			}
			.avatar {
			    display: block;
			    position: relative;
			    width: 40px;
			    height: 40px;
			    img {
				    width: 40px;
				    height: 40px;
				}
				 .msk {
				    position: absolute;
				    top: 0;
				    left: 0;
				    display: block;
				    width: 100%;
				    height: 100%;
				    background-position: -310px -330px;
				}
			}
			.name {
			    width: 150px;
			    overflow: hidden;
			    margin-top: 2px;
			    margin-bottom: 8px;
			    a {
				    white-space: nowrap;
				}
			}
		}
		.n-minelst-2 {
		    margin-top: 40px;
		    li {
			    padding: 10px 0 10px 20px;
			}
		}
		.g-mn3 {
		    height: 100%;
		    float: right;
		    width: 740px;
		    padding-bottom: 50px;
		}
		.g-wrap {
		    padding: 40px;
		}
		
		.u-cover-rank {
		    padding: 3px;
		    border: 1px solid #ccc;
		    width: 150px;
			height: 150px;
			img {
			    width: 150px;
			    height: 150px;
			    display: block;
			}
			.msk {
			    width: 150px;
			    height: 150px;
			    background-position: -230px -380px;
			    top: 3px;
			    left: 3px;
			    position: absolute;
			}
		}
		.m-info {
			.cover {
			    float: left;
			    position: relative;
			    display: inline;
			    margin: 0 -220px 0 0;
			}
			.cnt {
			    float: right;
			    width: 100%;
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
			.user {
			    margin: 0 0 20px;
			    line-height: 35px;
			    .u-icn {
				    float: left;
				    margin: 9px 0 0 3px;
				    *margin-top: 10px;
				}
			}
		}
		.m-info-rank {
			.cntc {
			    margin-left: 187px;
			}
			.hd {
			    margin: 16px 0 4px;
			}
			.sep {
			    margin-left: 5px;
			}
		}
		.u-icn-57 {
		    width: 13px;
		    height: 13px;
		    background-position: -18px -682px;
		}
		.g-wrap12 {
		    padding: 0 30px 40px 40px;
		}
		.u-title-1 {
		    height: 33px;
		    h3 {
			    font-size: 20px;
			    line-height: 28px;
			}
			.sub {
			    margin: 9px 0 0 20px;
			}
			.more {
			    margin-top: 5px;
			}
		}
		.listSongs{
			position:fixed;
			top: 50%;
			left: 50%;
		}
	}
</style>