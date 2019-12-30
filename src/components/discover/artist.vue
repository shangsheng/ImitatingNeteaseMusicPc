<template>
	<div id="artist">
		<div class="g-bd4 f-cb">
			<div class="g-mn4">
				<div class="g-mn4c" v-if="artistsList">
					<div class="g-wrap6">
						<div class="n-artist f-cb">
							<div class="btm">
								<h2 class="sname f-thide sname-max" :title="artistsList.name">
									{{artistsList.name}}
								</h2>
								<h3 class="salias f-thide" :title="artistsList.name"></h3>
							</div>
							<img :src="artistsList.picUrl"/>
							<div class="mask f-alpha"></div>
							<router-link :to="{path:'/user/home',query:{id:artistsList.accountId}}" class="btn-rz f-tid" v-if="artistsList.accountId">Ta的个人主页</router-link>
							<span class="btnfav f-tid cursor" data-res-like="likeArtist" :data-res-id="id" @click.stop="clickLike($event)" :class="{'btnfav-0':likeBull}">收藏</span>
						</div>
						<ul class="m-tabs f-cb">
							<li :class="{'fst':index == indexNum}" v-for="(item,index) in mTabs">
								<span  :class="{'z-slt':index == indexNum}" @click.stop="cilickTabs(index)">
									<em :data-res-index="index">{{item.name}}</em>
								</span>
							</li>
							
						</ul>
						<div class="u-load s-fc4 f-hide" style="margin-top: 100px;">
							<i class="icn" ></i>
							加载中
						</div>
						<hot-sangs v-bind:songsList ="artistshot" v-if="indexNum == 0"></hot-sangs>
						<artist-album v-bind:artistAlbums="albumsHot" v-else-if="indexNum == 1" v-bind:albumLimit="alumsLimt" v-on:albumsToChild="artistAlbumChild"></artist-album>
						<artist-mv v-bind:artistMvs="mvsHot" v-else-if="indexNum == 2" v-bind:mvLimit="mvsLimt" v-on:mvToChild="artistMvChild" v-bind:mvLength="mvLength"></artist-mv>
						<artist-desc v-bind:artistDescs="descHot" v-else-if="indexNum == 3" v-bind:artistName="artistsList.name"></artist-desc>
					</div>
				</div>
				<div class="u-load s-fc4" v-else>
					<i class="icn"></i>			
				</div>
			</div>
			<div class="g-sd4">
				<div class="g-wrap7" v-if="hotArts">
					<h3 class="u-hd3">
						<span class="f-fl">热门歌手</span>
					</h3>
					<ul class="m-hdlist f-cb">
						<li v-for="item of hotArts">
							<div class="hd">
								<router-link :to="{path:'/artist',query:{id:item.id}}" :title="item.name">
									<img :src="item.img1v1Url"/>
								</router-link>
							</div>
							<p>
								<router-link :to="{path:'/artist',query:{id:item.id}}" :title="item.name" class="nm nm-icn f-ib f-thide" >{{item.name}}</router-link>
							</p>
						</li>
					</ul>
					<my-down></my-down>
				</div>
			</div>
		</div>
	</div>	
</template>

<script>
	import hotSangs from '@/components/publics/artist-hotSongs.vue'
	import artistAlbum from '@/components/publics/artist-album.vue'
	import artistMv from '@/components/publics/artist-mv.vue'
	import artistDesc from '@/components/publics/artist-desc.vue'
	import eventVue from '../../../static/js/eventVue.js'
	export default {
	name:'artist',
    data () {
      return {
        mTabs:[{name:'热门作品'},{name:'所有专辑'},{name:'相关MV'},{name:'艺人介绍'}],
        indexNum:0,
        artistsList:null,
        artistshot:null,
        zSlt:'gsxq',
        albumsHot:null,
        alumsLimt:12,
        alumsOffset:0,
        mvsHot:null,
        mvsLimt:12,
        mvOffset:0,
        mvLength:0,
        descHot:null,
        hotArts:null,
        navBul:false,
        barVoice:true,
        id:this.$route.query.id,
        likeBull:false,
        logH:false,
      }
    },
    components: {
	    hotSangs,
	    artistAlbum,
	    artistMv,
	    artistDesc
	 },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			var that = this;
			if(this.$cookieUtil("email")){
					this.$logoRefresh(function(ress){
						 that.$http({
				         	method:'get',
				         	url:that.$host+"/artist/sublist?uid="+ress.data.profile.userId
				         }).then(function(res){
				         	console.log(res.data)
				         	that.$.each(res.data.data,function(index,el){
				         		console.log(el.id)
				         		console.log(that.id)
				         		console.log(el.id == that.id)
						       if(el.id == that.id){
						       	that.likeBull=true;
						       }
				        	})
				         }).catch(res=>{
				         	console.log(res);
				         })
				         that.logH = true
					})
				}
			this.$http({
				method:'get',
				url:that.$host+'/top/artists?offset=0&limit=6'
			}).then(function(res){
				console.log(res.data)
				that.$.each(res.data.artists,function(index,el){
					el.img1v1Url = el.img1v1Url +"?param=50y50";
				})
				
				that.hotArts = res.data.artists;
				
			}).catch(res=>{
				console.log('请求失败：'+res);
			})
		    this.cilickTabs(this.indexNum)
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
        	cilickTabs(index){
        		var that = this;
				var id = this.$route.query.id
        		switch (index){
        			case 0:
        				
						this.$http({
						    	method:'get',
						    	url:that.$host+'/artists?id='+id
						    }).then(function(res){
						    	console.log(res.data)
						    	res.data.artist.picUrl =res.data.artist.picUrl +"?param=640y300"
						    	that.artistsList = res.data.artist;
						    	that.artistshot = res.data;
						    	that.indexNum = 0;
						    }).catch(res=>{
						    	console.log('请求失败：'+res);
						    })
						    
        				break;
        			case 1:
        				this.$http({
						    	method:'get',
						    	url:that.$host+'/artist/album?id='+id+'&limit='+that.alumsLimt+'&offset='+that.alumsOffset
						    }).then(function(res){
						    	console.log(res.data)
						    	that.$.each(res.data.hotAlbums,function(index,el){
						    	el.publishTime = that.$datePublish('Y.m.d',el.publishTime)
						    	})
						    	that.albumsHot = res.data;
						    	that.indexNum = 1;
						    }).catch(res=>{
						    	console.log('请求失败：'+res);
						    })
						    
        				break;
        			case 2:
        				this.$http({
						    	method:'get',
						    	url:that.$host+'/artist/mv?id='+id+'&limit='+that.mvsLimt+'&offset='+that.mvOffset
						    }).then(function(res){
						    	console.log(res.data)
						    	that.$.each(res.data.mvs,function(index,el){
						    	el.publishTime = that.$datePublish('Y.m.d',el.publishTime)
						    	})
						    	that.mvLength = Math.ceil(that.artistsList.mvSize/that.mvsLimt);
						    	that.mvsHot = res.data;
						    	that.indexNum = 2;
						    }).catch(res=>{
						    	console.log('请求失败：'+res);
						    })
        				break;
        			case 3:
        				
        				this.$http({
						    	method:'get',
						    	url:that.$host+'/artist/desc?id='+id
						    }).then(function(res){
						    	console.log(res.data)
//						    	that.$.each(res.data.mvs,function(index,el){
//						    	el.publishTime = that.$datePublish('Y.m.d',el.publishTime)
//						    	})
//						    	that.mvLength = Math.ceil(that.artistsList.mvSize/that.mvsLimt);
						    	that.descHot = res.data;
						    	that.indexNum = 3;
						    }).catch(res=>{
						    	console.log('请求失败：'+res);
						    })
        				break;
        		}
        	},
        	artistAlbumChild(data){
        		console.log(data)
        		this.alumsOffset = data;
        		this.cilickTabs(1);
        	},
        	artistMvChild(data){
        		console.log(data)
        	},
        	clickLike($event){
        		
        		
        		if(this.logH){
        			var that = this
        			
        			if(this.likeBull){
        			//取消收藏
	        		}else{
	        			var cades = this.$collection(this,{
				  		resAction:'likeArtist',
				  		actionT:1
				  	},$event,0,function(data){
	        				if(data == 200 ){
		        				that.$root.eventVue.$emit('sccgHidden',false);
		        				that.likeBull=true;
		        			}
	        			})
	        		}
        			
        		}else{
        			
	        		this.$root.eventVue.$emit('classify','l')
	        		this.$toggleBody(1)
	        		this.$drage('auto-id-e0uH7BGEq0gyq7zi')
        		}
        	}
        }
  }
</script>

<style lang="less">
	#artist{
		text-align: left;
		.g-bd4{
			width: 980px;
		}
		.n-artist {
		    position: relative;
		    zoom: 1;
		    height: 333px;
		    margin-top: -20px;
		     .sname {
			    float: left;
			    max-width: 100%;
			    height: 34px;
			    line-height: 24px;
			    font-weight: normal;
			    font-size: 24px;
			    color: #333;
			}
			.sname-max {
			    max-width: 75%;
			}
			.salias {
			    float: left;
			    max-width: 23%;
			    padding-left: 10px;
			    font-size: 14px;
			    line-height: 32px;
			    color: #999;
			    font-weight: normal;
			}
			.mask {
			    display: block;
			    width: 640px;
			    height: 300px;
			}
			img {
			    display: block;
			    width: 640px;
			    height: 300px;
			}
			.mask {
			    position: absolute;
			    top: 34px;
			    left: 0;
			}
			.btn-rz {
			    display: block;
			    position: absolute;
			    bottom: 18px;
			    right: 116px;
			    width: 96px;
			    height: 32px;
			    background-position: 0 -1156px;
			    _background-position: 0 0;
			}
			.btnfav {
			    display: block;
			    position: absolute;
			    bottom: 18px;
			    right: 20px;
			    width: 76px;
			    height: 32px;
			    background-position: 0 -500px;
			    _background-position: 0 0;
			}
			 .btnfav:hover {
			    background-position: 0 -540px;
			    _background-position: 0 0;
			}
			.btnfav-0 {
			    background-position: 0 -735px;
			    _background-position: 0 0;
			}
			.btnfav-0:hover {
			    background-position: 0 -781px;
			    _background-position: 0 0;
			}
		}
		.m-tabs {
		    height: 39px;
		    border: 1px solid #ccc;
		    border-width: 0 1px;
		    background-position: 0 0;
		    background-repeat: repeat-x;
		     li {
			    position: relative;
			    left: -1px;
			}
			span {
			    padding-left: 2px;
			}
			span.z-slt {
			    background-position: left -90px;
			    em {
				    background-position: right -90px;
				}
			}
			em {
			    height: 37px;
			    width: 134px;
			    padding: 2px 2px 0 0;
			    line-height: 37px;
			    cursor: pointer;
			    text-align: center;
			}
		}
		.m-tabs li, .m-tabs span, .m-tabs em {
		    float: left;
		    height: 39px;
		    font-size: 14px;
		}
		.f-tid {
		    text-indent: -9999px;
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
		    font-weight: bold;
		}
		.m-hdlist {
		    margin-left: -25px;
		    li {
			    float: left;
			    width: 50px;
			    height: 92px;
			    padding-left: 25px;
			}
			p {
			    margin-top: 7px;
			    text-align: center;
			}
			.nm {
			    width: 50px;
			    vertical-align: middle;
			}
		}
		.m-hdlist .hd, .m-hdlist .hd img {
		    width: 50px;
		    height: 50px;
		}
		
	}
</style>