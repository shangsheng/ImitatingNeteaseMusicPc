<template>
	<div id="discoverAlbum">
		<div class="g-bd" v-if="discShelves">
			<div class="g-wrap n-alblist f-pr">
				<div class="u-title f-cb">
					<h3>
						<span class="f-ff2">热门新碟</span>
					</h3>
				</div>
				<ul class="m-cvrlst m-cvrlst-alb2 f-cb">
					<li v-for="(item,index) in discShelves" v-bind:key="index">
						
							<div class="u-cover u-cover-alb2">
								<img :src="item.picUrl"/>
								<router-link :to="{path:'/album',query:{id:item.id}}" class="msk" :title="item.name"></router-link>
								<span class="icon-play f-alpha f-fr cou cursor" title="播放" :data-res-type="item.type" :data-res-id="item.id" data-res-action="play" @click.stop="playSong($event)"></span>
							</div>
							<p class="dec">
								<router-link :to="{path:'/album',query:{id:item.id}}" class="tit f-thide s-fc0" :title="item.name">{{item.name}}</router-link>
							</p>
							<p class="f-thide">
								<span class="nm f-thide" :title="item.artistName">
									<router-link :to="{path:'/artist',query:{id:obj.id}}" class="s-fc3" v-for="(obj,nums) of item.artists" v-bind:key="nums">{{obj.name}} <i v-bind:hidden="nums == item.artists.length-1">/</i></router-link>
								</span>
							</p>
					
					</li>
				</ul>
				<div class="u-title f-cb">
					<h3>
						<span class="f-ff2">
							全部新碟
						</span>
					</h3>
					<div class="tab">
						<!-- <router-link :to="{path:item.path,query:{area:item.area}}" ></router-link> -->
						<span class="s-fc3" v-for="(item,nums) of tabsFc" @click="areasQuery" :data-areas="item.area">{{item.name}} <span class="line" v-bind:hidden="nums == tabsFc.length-1">|</span></span>
					</div>
					
				</div>
				<ul class="m-cvrlst m-cvrlst-alb2 f-cb" v-if="allDiscShelves">
					<li v-for="(item,index) in allDiscShelves" v-bind:key="index">
						<div class="u-cover u-cover-alb2">
							<img :src="item.picUrl"/>
							<router-link :to="{path:'/album',query:{id:item.id}}" class="msk" :title="item.name"></router-link>
							<span class="icon-play f-alpha f-fr cou cursor" title="播放" :data-res-type="item.type" :data-res-id="item.id" data-res-action="play" @click.stop="playSong($event)"></span>
						</div>
						<p class="dec">
							<router-link :to="{path:'/album',query:{id:item.id}}" class="tit f-thide s-fc0" :title="item.name">{{item.name}}</router-link>
						</p>
						<p class="f-thide">
							<span class="nm f-thide" :title="item.artistName">
								<router-link :to="{path:'/artist',query:{id:obj.id}}" class="s-fc3" v-for="(obj,nums) of item.artists" v-bind:key="nums">{{obj.name}} <i v-bind:hidden="nums == item.artists.length-1">/</i></router-link>
							</span>
						</p>
					</li>
				</ul>
				<div class="u-load s-fc4" v-else>
					<i class="icn"></i>			
				</div>
				<pager v-bind:pageMovers="playlistMover" v-bind:pageLength="playlistLength" v-bind:limit="limit" v-if="playlistLength !== 0" v-on:listenToChild="playlistPagerChild"></pager>
			</div>
		</div>
		<div class="u-load s-fc4" v-else>
			<i class="icn"></i>			
		</div>
	</div>
</template>

<script>
	import pager from '@/components/publics/pager.vue'
	import eventVue from '../../../../static/js/eventVue.js'
	export default {
	name:'discoverAlbum',
    data () {
      return {
        discShelves:null,
        tabsFc:[{path:'/discover/album',name:'全部',area:'ALL'},
        		{path:'/discover/album',name:'华语',area:'ZH'},
        		{path:'/discover/album',name:'欧美',area:'EA'},
        		{path:'/discover/album',name:'韩国',area:'KR'},
        		{path:'/discover/album',name:'日本',area:'JP'}
        ],
        allDiscShelves:null,
        offset:0,
        limit:35,
        playlistLength:0,
        playlistMover:true,
        zSlt:'xdsj',
        areas:'ALL',
        barVoice:true,
        totalLength:15//新碟的总个数
      }
    },
    components: {
	    pager
	 },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			let that = this;
			this.$http({
	         	method:'get',
	         	url:that.$host+"/album/newest"
	         }).then(function(res){
	         	console.log(res.data.albums)
	         	that.$.each(res.data.albums,function(index,item){
						
					item.type = 19
					let  artistName  = '';
					that.$.each(item.artists,function(nums,el){
						
						if(nums<item.artists.length-1){
							artistName = artistName+el.name + '/'
						}else{
							
							item.artistName = artistName+el.name
						}
					})
				})
	         	that.discShelves = res.data.albums.slice(0,10);
	         	
	         }).catch(res=>{
	         	console.log('请求失败：'+res.data+','+res.statusText);
	         })
	         this.pathQuery()
	         this.$root.eventVue.$emit('zSltV',this.zSlt)
	         this.$root.eventVue.$emit('barVoice',this.barVoice)
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
        	discHttp(offset,limit,areas){
        		let that = this;
        		this.$http({
	         	method:'get',
	         	url:that.$host+"/top/album/?offset="+offset+"&limit="+limit+"&area="+areas
	         }).then(function(res){
	         	console.log(res.data)
	         	that.$.each(res.data.monthData,function(index,item){
						
					item.type = 19
					let  artistName  = '';
					that.$.each(item.artists,function(nums,el){
						
						if(nums<item.artists.length-1){
							artistName = artistName+el.name + '/'
						}else{
							
							item.artistName = artistName+el.name
						}
					})
				})
	         	that.allDiscShelves = res.data.monthData
	         	that.playlistLength = that.totalLength //res.data.total
	         	that.playlistMover = res.data.hasMore
	         }).catch(res=>{
	         	console.log('请求失败：'+res.data+','+res.statusText);
	         })
        	},
        	playlistPagerChild(data){
        		console.log(data)
        		var that = this;
        		that.offset = data;
        		this.discHttp(data,that.limit)
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
       		},
       		pathQuery(){
        		var that = this;
		        var query = this.$route.query
		        if(query){
		        	if(query.areas){
		        		that.areas = query.areas;
		        		
		        	}
		        }
		        console.log(query)
		        this.discHttp(this.offset,this.limit,this.areas)
        	},
        	//点击单页面更新
        	areasQuery(e){
        		const that = this;
        		console.log(e.target.dataset.areas)
        		that.areas = e.target.dataset.areas;
        		let query = this.$router.history.current.query;
		        let path = this.$router.history.current.path;
		      //对象的拷贝
		        let newQuery = JSON.parse(JSON.stringify(query));
		      // 地址栏的参数值赋值
		        newQuery.areas = that.areas;
		        this.$router.push({ path, query: newQuery });
		        this.discHttp(this.offset,this.limit,this.areas)
        	}
        }
  }
</script>

<style lang="less" scoped>
	#discoverAlbum{
		text-align: left;
		.g-wrap {
		    padding: 40px;
		}
		.n-alblist {
			.m-cvrlst {
			    margin: 20px 0 0 -33px;
			    li {
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
			    }
			}
			.m-cvrlst-alb2 {
				
    			.u-cover-alb2 {
				    width: 130px;
				    height: 130px;
				    .icon-play{
						left: 94px;
					    width: 28px;
					    height: 28px;
					    background-position: 0 -140px;
					    _background-position: 0 0;
					}
				}
				li {
				    padding-left: 33px;
				    width: 153px;
		    		height: 178px;
				}
				.msk {
				    width: 153px;
				    height: 130px;
				    background-position: 0 -845px;
				}
				
			}
		}
		 .m-cvrlst-alb3 {
		 	li {
			    width: 153px;
			    height: 178px;
			}
			.u-cvrlst-alb3{
				.icon-play{
					left: 94px;
				    width: 28px;
				    height: 28px;
				    background-position: 0 -140px;
				    _background-position: 0 0;
				}
			}
			
		 }
		.u-cover-9 {
			.icon-play {
			    left: 94px;
			    width: 28px;
			    height: 28px;
			    background-position: 0 -140px;
			    _background-position: 0 0;
			}
		}
		.u-title {
			.tab {
			    float: left;
			    margin: 12px 0 0 20px;
			     a {
				    color: #666;
				}
				.line {
				    margin: 0 10px;
				    color: #c7c7c7;
				}
				span.s-fc3{
					cursor: pointer;
				}
			}
			
		}
		.u-cover {
			.icon-play {
			    position: absolute;
			    right: 10px;
			    bottom: 5px;
			
			}
		}
	}
	
</style>