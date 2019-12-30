<template>
	<div id="m-search">
		<div class="g-bd">
			<div class="g-wrap n-srch">
				<div class="pgsrch f-pr j-suggest">
					
					<input type="text" class="srch j-flag" @keyup="search" v-model="values" v-focus="focusState" @blur="blurlist()" @keydown.enter="searchEnter"/>
					<span class="btn j-flag cursor" title="搜索">搜索</span>
					<div class="u-lstlay j-flag" id="srch-nr" v-bind:class="{show:!searchhidden}">
							<div class="m-ulist">
								<p class="note s-fc3">
									<router-link :to="{path:'/search/m',query:{s:values,type:1002}}">
										搜索“{{values}}”相关用户》
									</router-link>
								</p>
								<div class="rap">
									<div class="itm f-cb" v-for="(item,index) in serachdata.order">
										<h3 class="hd">
											<i class="icn u-icn "   v-bind:class="{' u-icn-26': item === 'songs', 'u-icn-27': item === 'artists','u-icn-28': item === 'albums','u-icn-96': item === 'mvs','u-icn-29': item === 'playlists' }"></i>
											
											<em class="fl">{{searchList[item]}}</em>
										</h3>
										<ul class="f-cb" :class="{odd: index%2!= 0}">
											<li v-for=" keys in serachdata[item]" >
												<router-link :to="{path:'/songs',query:{id:keys.id}}" v-if="item === 'songs'" >
													<i v-html="searchValue(keys.name,values)"></i>- <i v-for="songsA in keys.artists" v-html="searchValue(songsA.name,values)"></i>
													
												</router-link>
												<router-link :to="{path:'/artist',query:{id:keys.id}}" v-else-if="item === 'artists'" >
													<i v-html="searchValue(keys.name,values)"></i>
												</router-link>
												<router-link :to="{path:'/album',query:{id:keys.id}}"  v-else-if="item === 'albums'">
													<i v-html="searchValue(keys.name,values)"></i>-<i v-html="searchValue(keys.artist.name,values)"></i>
													
												</router-link>
												<router-link :to="{path:'/mvs',query:{id:keys.id}}" v-else-if="item === 'mvs'">
													<i v-html="searchValue(keys.name,values)"></i>- <i v-for="mvsA in keys.artists" v-html="searchValue(mvsA.name,values)"></i>
													
												</router-link>
												<router-link :to="{path:'/playlist',query:{id:keys.id}}" v-else="item === 'playlists'">
													<i v-html="searchValue(keys.name,values)"></i>
													
												</router-link>
											</li>
											
										</ul>
									</div>
									
								</div>
							</div>
						</div>
				</div>
				<div class="m-search" v-if="mData||mSrchrstData||mAlbumData||mMvData||mLyricData||mPlaylistData||mRdilistData||mUserData">
					<div class="snote s-fc4 ztag">
						搜索"{{searchDatas.values}}",找到 <span class="s-fc6">{{searchDatas.Count}}</span>{{tabsSrch[num].partitive}}
						{{searchDatas.partitive}}
						<router-link :to="{path:'/search',query:{s:item}}" v-for="(item,index) of searchDatas.queryCorrected" class="s-fc7">{{item}} <i v-if="index<searchDatas.queryCorrected.length-1">/</i></router-link>
					</div>
					<ul class="m-tabs m-tabs-srch f-cb ztag">
						<li :class="{'fst': num == index}"  v-for="(item,index) in tabsSrch">
							
							<span class=" cursor" :class="{'z-slt':num == index}" :data-type="item.type">
								<em @click.stop="searchClick(index)">{{item.name}}</em>
							</span>
						</li>
					</ul>
					
					<!--单曲-->
					<m-songs v-bind:songsData="mData"  v-if="num == 0 " :key="menuKey"></m-songs>
					<m-srchrst v-bind:artistData="mSrchrstData"  v-else-if="num == 1 " :key="mArtistKey"></m-srchrst>
					<m-album v-bind:albumData="mAlbumData" v-else-if="num == 2 " :key="mAlbumKey"></m-album>
					<m-mv v-bind:mMvData="mMvData" v-else-if="num == 3 " :key="mMvKey"></m-mv>
					<m-lyric v-bind:mLyricData="mLyricData" v-else-if="num == 4 " :key="mLyricKey"></m-lyric>
					<m-playlist v-bind:mPlaylist="mPlaylistData" v-else-if="num == 5 " :key="mPlaylistKey"></m-playlist>
					<m-rdilist v-bind:mRdilist="mRdilistData" v-else-if="num == 6 " :key="mRdilistKey"></m-rdilist>
					<m-user v-bind:mUser="mUserData" v-else-if="num == 7 " :key="mUserKey"></m-user>
					<div class="ztag j-flag auto-1573694747127-parent">
						<pager v-bind:pageMovers="mSearchMover" v-bind:pageLength="mSearchLength" v-bind:limit="tabsSrch[0].limit" v-if="mSearchLength > 1" v-on:listenToChild="mSongsChild" :key="mSearchKey"></pager>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
     <!--1004: MV, 1018:综合-->
<script>
	import pager from '@/components/publics/pager.vue'
	import mSongs from '@/components/search/m-songs.vue'
	import mSrchrst from '@/components/search/m-srchrst.vue'
	import mAlbum from '@/components/search/m-album.vue'
	import mMv from '@/components/search/m-mv.vue'
	import mLyric from '@/components/search/m-lyric.vue'
	import mPlaylist from '@/components/search/m-playlist.vue'
	import mRdilist from '@/components/search/m-rdilist.vue'
	import mUser from '@/components/search/m-user.vue'
	import eventVue from '../../../static/js/eventVue.js'
	export default{
		name:'mSearch',
		data(){
			return{
				values:'',
				tabsSrch:[{name:'单曲',type:1,limit:30,partitive:'首单曲'},{name:'歌手',type:100,limit:90,partitive:'个歌手'},{name:'专辑',type:10,limit:75,partitive:'张专辑'},{name:'视频',type:1014,limit:20,partitive:'个视频'},
						  {name:'歌词',type:1006,limit:30,partitive:'个歌词'},{name:'歌单',type:1000,limit:30,partitive:'个歌单'},{name:'主播电台',type:1009,limit:30,partitive:'个节目'},{name:'用户',type:1002,limit:30,partitive:'个用户'}],
				num:0,
				searchhidden:true,
				serachdata:{},
				searchList:{'songs':'单曲','artists':'歌手','albums':'专辑','mvs':'视频','playlists':'歌单'},
				focusState:false,
				mData:null,//单曲数据
				mSongsOffset:0,
				mSearchMover:true,
    			mSearchLength:0,
    			menuKey:1,
    			mArtistKey:1,
    			mSearchKey:1,
    			mSrchrstData:null,//歌手数据
    			searchDatas:null,//总的数据
    			mAlbumData:null,//专辑
    			mAlbumKey:1,
    			mMvData:null,//视频
    			mMvKey:1,
    			mLyricData:null,//歌词
    			mLyricKey:1,
    			mPlaylistData:null,//歌单
    			mPlaylistKey:1,
    			mRdilistData:null,//主播电台
    			mRdilistKey:1,
    			mUserData:null,//用户
    			mUserKey:1,
    			navBul:true,
    			barVoice:true
			}
		},
		components:{
			mSongs,
			pager,
			mSrchrst,
			mAlbum,
			mMv,
			mLyric,
			mPlaylist,
			mRdilist,
			mUser
		},
		inject:['reload'],
		created: function () {
//          debugger;
			console.log(this.$route)
			let that = this;
			let sValues = this.$route.query.s;
		 	this.values = sValues;
		 	let types = this.$route.query.type;
		 	if(types){
		 		this.$.each(this.tabsSrch,function(index,el){
		 			if(el.type == types){
		 				that.num = index;
		 				that.searchHttp(sValues,that.tabsSrch[index].limit,that.mSongsOffset,types);
		 				return false;
		 			}
		 		});
		 	}else{
		 		this.searchHttp(sValues,this.tabsSrch[0].limit,this.mSongsOffset,this.tabsSrch[0].type);
		 	}
		 	 this.$root.eventVue.$emit('navBul',this.navBul)
		 	 this.$root.eventVue.$emit('barVoice',this.barVoice)
       },
        directives: {

			focus: {
			
				update: function (el, {value}) {
				
					if (value) {
					
						el.focus()
						
					
					}
				
				}
			
			}
		
		},
       mounted: function () {
//          debugger;
			
       },
		methods:{
			//执行搜索
        	search(){
        		var that = this;
        		if(this.values != ''){
        			this.$http({
	        			method:'get',
	        			url:'http://192.168.1.74:3000/search/suggest?keywords='+this.values
	        		}).then(function(resp){                            
	        			console.log(resp.data);
	        			that.serachdata = resp.data.result;
	        			that.searchhidden=false;
	        		}).catch(resp => {
	        			console.log('请求失败：'+resp.status+','+resp.statusText);
	        		});
	        		
        		}
        		
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
        	searchEnter(){
        		console.log(this.values)
        		this.$router.push({name: "mSearch", query: {'s': this.values}});
        		this.searchhidden=true;
        		this.focusState=false;
        		
        	},
        	mSongsChild(data){
        		console.log(data)
        		this.searchHttp(this.mData.values,this.tabsSrch[this.num].limit,data,this.tabsSrch[this.num].type);
        	},
        	searchHttp(s,limit,offset,type){
        		console.log(typeof type)
        		if(typeof type != Number){
        			type = Number(type)
        		}
        		let that = this;
        		this.$http({
		         	method:'get',
		         	url:that.$host+'/search?keywords='+s+'&limit='+limit+'&offset='+offset+'&type='+type
		         }).then(function(res){
		         	console.log(res.data)
		         	if(res.data.result.queryCorrected){
		         		res.data.result.partitive = ',您是不是要搜:';
		         	}
		         	res.data.result.values = that.values;
		         	
		         	console.log(typeof type)
				 	
				 	
				 	switch(type){
				 		case 1:
				 			if(res.data.result.songCount > limit){
						 		that.mSearchMover = true
						 	}else{
						 		that.mSearchMover = false
						 	}
				 			that.mSearchLength = Math.ceil(res.data.result.songCount/limit);
				 			that.searchDatas = res.data.result;
				 			that.searchDatas.Count = that.searchDatas.songCount;
				 			that.mData = res.data.result;
				 			break;
				 		case 100:
				 			if(res.data.result.artistCount > limit){
						 		that.mSearchMover = true
						 	}else{
						 		that.mSearchMover = false
						 	}
				 			that.mSearchLength = Math.ceil(res.data.result.artistCount/limit);
				 			
				 			that.searchDatas = res.data.result;
				 			that.searchDatas.Count = that.searchDatas.artistCount;
				 			that.mSrchrstData = res.data.result;
				 			break;
				 		case 10:
				 			if(res.data.result.albumCount > limit){
						 		that.mSearchMover = true
						 	}else{
						 		that.mSearchMover = false
						 	}
				 			that.mSearchLength = Math.ceil(res.data.result.albumCount/limit);
				 			
				 			that.searchDatas = res.data.result;
				 			that.searchDatas.Count = that.searchDatas.albumCount;
				 			that.mAlbumData = res.data.result;
				 			break;
				 		case 1014:
				 			if(res.data.result.videoCount > limit){
						 		that.mSearchMover = true
						 	}else{
						 		that.mSearchMover = false
						 	}
				 			that.mSearchLength = Math.ceil(res.data.result.videoCount/limit);
				 			
				 			that.searchDatas = res.data.result;
				 			that.searchDatas.Count = that.searchDatas.videoCount;
				 			that.mMvData = res.data.result;
				 			break;
				 		case 1006:
				 			if(res.data.result.songCount > limit){
						 		that.mSearchMover = true
						 	}else{
						 		that.mSearchMover = false
						 	}
				 			that.mSearchLength = Math.ceil(res.data.result.songCount/limit);
				 			
				 			that.searchDatas = res.data.result;
				 			that.searchDatas.Count = that.searchDatas.songCount;
				 			that.mLyricData = res.data.result;
				 			break;
				 		case 1000:
				 			if(res.data.result.playlistCount > limit){
						 		that.mSearchMover = true
						 	}else{
						 		that.mSearchMover = false
						 	}
				 			that.mSearchLength = Math.ceil(res.data.result.playlistCount/limit);
				 			
				 			that.searchDatas = res.data.result;
				 			that.searchDatas.Count = that.searchDatas.playlistCount;
				 			that.mPlaylistData = res.data.result;
				 			break;
				 		case 1009:
				 			if(res.data.result.djRadiosCount > limit){
						 		that.mSearchMover = true
						 	}else{
						 		that.mSearchMover = false
						 	}
				 			that.mSearchLength = Math.ceil(res.data.result.djRadiosCount/limit);
				 			
				 			that.searchDatas = res.data.result;
				 			that.searchDatas.Count = that.searchDatas.djRadiosCount;
				 			that.mRdilistData = res.data.result;
				 			break;
				 		case 1002:
				 			console.log(res.data)
				 			if(res.data.result.userprofileCount > limit){
						 		that.mSearchMover = true
						 	}else{
						 		that.mSearchMover = false
						 	}
				 			that.mSearchLength = Math.ceil(res.data.result.userprofileCount/limit);
				 			
				 			that.searchDatas = res.data.result;
				 			that.searchDatas.Count = that.searchDatas.userprofileCount;
				 			that.mUserData = res.data.result;
				 			break;
				 	}
//				 	that.menuTree();
		         }).catch(res=>{
		         	console.log('请求失败：'+res);
		         })
        	},
        	searchClick(num){
        		this.num = num;
        		
        		let that = this;
				let sValues = this.$route.query.s;
			 	this.values = sValues;
			 	let types = this.$route.query.type;
			 	if(types){
			 		this.$router.push({ path:'/search/m', query: {s:this.values,type:that.tabsSrch[num].type} });
//			 		that.num = num;
//		 			that.searchHttp(sValues,that.tabsSrch[num].limit,that.mSongsOffset,types);
//		 			this.$route.query.type = that.tabsSrch[num].type
			 	}else{
			 		this.searchHttp(this.mData.values,this.tabsSrch[this.num].limit,this.mSongsOffset,this.tabsSrch[this.num].type);
			 	}
        	}
		},
		//监听
        watch: {
            '$route' (to, from) {

                console.log(to)
                console.log(from)
                
                if(this.$route.query.s){
                      this.reload()
                }

            },
            mData(){
                ++this.menuKey
            },
            mSrchrstData(){
            	
            	++this.mArtistKey
            },
            mSearchLength(){
            	++this.mSearchKey
            },
            mAlbumData(){
            	++this.mAlbumKey
            },
            mMvData(){
            	++this.mMvKey
            },
            mLyricData(){
            	++this.mLyricKey
            },
            mPlaylistData(){
            	++this.mPlaylistKey
            },
            mRdilistData(){
            	++this.mRdilistKey
            },
            mUserData(){
            	++this.mUserKey
            }
        }
	}
</script>

<style lang="less">
	#m-search{
		text-align: left;
		.g-wrap {
		    padding: 40px;
		}
		.n-srch {
			.pgsrch {
			    width: 420px;
			    height: 40px;
			    margin: 0 auto;
			    background-position: 0 0;
			    z-index: 10;
			    .srch {
				    float: left;
				    width: 320px;
				    height: 17px;
				    margin: 12px 0 0 20px;
				    padding: 0;
				    background: #fff;
				    border: none;
				}
				.btn {
				    float: right;
				    width: 50px;
				    height: 40px;
				    text-indent: -9999px;
				}
			}
			.snote {
			    margin: 28px 0 17px;
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
		.m-tabs-srch em {
		    width: 108px;
		}
		.n-srch .pgsrch .u-lstlay {
		    top: 43px;
		    width: 418px;
		}
	}
</style>