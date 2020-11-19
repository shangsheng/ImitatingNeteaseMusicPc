<template>
	<div id="djradio" v-wechat-title="this.title">
		<div class="g-bd4 f-cb">
			<div class="g-mn4" v-if="djDetail">
				<div class="g-mn4c">
					<div class="g-wrap6">
						<div class="m-info f-cb">
							<div class="cover u-cover u-cover-dj">
								<img :src="djDetail.picUrl"/>
								<span class="msk"></span>
							</div>
							<div class="cnt">
								<div class="cntc">
									<div class="hd f-cb">
										<i class="f-fl u-icn u-icn-93"></i>
										<div class="tit">
											<h2 class="f-ff2">{{djDetail.name}}</h2>
										</div>
									</div>
									<div class="user f-cb">
										<router-link :to="{path:'/user/home',query:{id:djDetail.dj.userId}}" class="face">
											<img :src="djDetail.dj.avatarUrl"/>
										</router-link>
										<span class="name">
											<router-link :to="{path:'/user/home',query:{id:djDetail.dj.userId}}" class="s-fc7" :title="djDetail.dj.nickname">
												{{djDetail.dj.nickname}}
											</router-link>
										</span>
						
										<span class="u-icn " :class="[djDetail.dj.userType == 200?'u-icn-84':'']"></span>
										<span class="u-icn " :class="[djDetail.dj.vipType == 11&&djDetail.dj.userType == 2?'u-icn-1':'']"></span>
										<span class="u-icn u-icn2 " :class="[djDetail.dj.vipType == 11&&djDetail.dj.userType == 4?'u-icn2-music2':'']"></span>
									</div>
									<div class="btns f-cb j-flag">
										<span class="u-btni " :class="[djDetail.subed?'u-btni-subed':'u-btni-sub']" :data-res-id="djDetail.id" data-res-action="sub" data-res-radiotype="djradio">
											<i v-if="djDetail.subed">已订阅({{djDetail.subCount}})</i>
											<i v-else >订阅({{djDetail.subCount}})</i>
										</span>
										<span class="u-btni u-btni-playall" :data-res-id="djDetail.id" data-res-action="play" :data-res-radioid="djDetail.id" data-res-radiotype="djradio" :data-res-order="djDetail.dj.authStatus" @click.stop="plays($event)" data-res-index="0" :data-res-limit="limit">
											<i :data-res-id="djDetail.id" data-res-action="play" :data-res-radioid="djDetail.id" data-res-radiotype="djradio" :data-res-order="djDetail.dj.authStatus" @click.stop="plays($event)" data-res-index="0" :data-res-limit="limit">播放全部</i>
										</span>
										<span class="u-btni  u-btni-share"  data-res-action="share" :data-res-id="djDetail.id" data-res-radiotype="djradio" :data-res-author="djDetail.dj.nickname" :data-res-name="djDetail.name">
											<i>分享({{djDetail.shareCount}})</i>
										</span>
									</div>
									<p class="intr f-brk">
										<router-link :to="{path:'/discover/djradio/category',query:{id:djDetail.categoryId}}" class="cat cat u-type u-type-red">{{djDetail.category}}</router-link>
										
										<span :class="{'f-hide':fHide}" v-html="cutStringComent(djDetail.desc)"></span>
										<span  :class="{'f-hide':!fHide}" v-html="djDetail.desc"></span>
									</p>
									<div class="f-cb" v-if="djDetail.desc.length>100">
										<span class="s-fc7 f-fr cursor" @click.stop="fbrkTab">
											{{fHide?'展开':'收起'}}
											<i class="u-icn " :class="[fHide?'u-icn-69':'u-icn-70']"></i>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div class="n-songtb">
							<div class="u-title u-title-1 f-cb">
								<h3>
									<span class="f-ff2">节目列表</span>
								</h3>
								<span class="sub s-fc4">共{{djDetail.programCount}}期</span>
								<div class="u-sort f-fr f-cb">
									<span class="desc  cursor" :class="{'z-sel':zselSorts}" data-actoin="order" data-bh="jx" title="降序" @click.stop="sorts(false)"></span>
									<span class="asc cursor"  :class="{'z-sel':!zselSorts}" data-actoin="order" data-bh="sx" title="升序" @click.stop="sorts(true)"></span>
								</div>
								<div class="out f-fr">
									<i class="u-icn u-icn-95"></i>
									<router-link :to="{path:'/outchain/4/',query:{id:djDetail.id}}" class="s-fc7">生成外链播放器</router-link>
								</div>
							</div>
							<div class="u-goon f-hide j-flag"></div>
							<table class="m-table m-table-program">
								<tbody>
									<tr class="j-tr" v-for="(item,index) in djProgram" v-bind:key="index"  @mouseover="selectStyle (item) " :class="{'z-hover':item.active,'even': index%2 != 0}"     @mouseout="outStyle(item)" >
										<td class="col1" >
											<div class="hd">
												<span class="ply" :class="{'ply-z-slt':songsNum == index}" data-res-action="play" :data-res-id="item.id" data-res-from="70" :data-res-radioid="item.radio.id" data-res-radiotype="djradio" :data-res-data="item.radio.id" data-res-type="17" title="播放" @click.stop="plays($event)" :data-res-index="index"></span>
												<span class="num">{{item.serialNum}}</span>
											</div>
										</td>
										<td class="col2">
											<div class="tt f-thide">
												<router-link :to="{path:'/program',query:{id:item.id}}" :title="item.name">{{item.name}}</router-link>
											</div>
											<div class="opt hshow">
												<span class="u-icn u-icn-81 icn-add" data-res-type="17" :data-res-id="item.id" :data-res-radioid="item.radio.id" data-res-radiotype="djradio" data-res-from="70" :data-res-data="item.radio.id" data-res-action="addto" title="添加到播放列表"></span>
												<span class="icn icn-share" data-res-type="17" data-res-action="share" :data-res-id="item.id" :data-res-radioid="item.radio.id" data-res-radiotype="djradio" data-res-from="70" :data-res-data="item.radio.id" :data-res-auditstatus="item.auditStatus" :data-res-name="item.name" :data-res-author="item.radio.name" :data-res-pic="item.coverUrl" title="分享">分享</span>
												<span class="icn icn-dl" data-res-type="17" data-res-action="download" :data-res-id="item.id" :data-res-radioid="item.radio.id" data-res-radiotype="djradio" data-res-from="70" :data-res-data="item.radio.id" title="下载">下载</span>
											</div>
										</td>
										<td class="col3">
											<span class="s-fc3">播放{{item.listenerCount}}</span>
										</td>
										<td class="col4">
											<span class="s-fc3">攒{{item.likedCount}}</span>
										</td>
										<td class="col5">
											<span class="s-fc4">{{item.createTime}}</span>
										</td>
										<td class="f-pr">
											<span class="s-fc4">{{item.duration}}</span>
										</td>
									</tr>
									
								</tbody>
							
							</table>
							<pager v-bind:pageMovers="playlistMover" v-bind:pageLength="playlistLength" v-bind:limit="limit" v-if="playlistLength >= 40" v-on:listenToChild="playlistPagerChild"></pager>
						</div>
					</div>
				</div>
			</div>
			<div class="u-load s-fc4" v-else>
				<i class="icn"></i>			
			</div>
			<div class="g-sd4">
				<div class="g-wrap7">
					<my-down></my-down>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	import pager from '@/components/publics/pager.vue'
	import eventVue from '../../../static/js/eventVue.js'
	export default {
	name:'djradio',
    data () {
      return {
        title:'电台详情',
        djDetail:null,
        djProgram:null,
        limit:40,
        playlistLength:0,
        playlistMover:true,
        fHide:false,
        zselSorts:true,
        songsNum:null,//播放第几条
        zSlt:'dtxq',
         navBul:false,
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
//          debugger;
			let id = this.$route.query.id;
			var that = this;
			this.$http({
		         	method:'get',
		         	url:that.$host + "/dj/detail?rid="+id,
		         }).then(function(res){
		         	console.log(res.data)
		         	if(res.data.djRadio.desc){
		         		res.data.djRadio.desc = res.data.djRadio.desc.replace(/\n/g,'<br>')
		         	}
		         	that.djDetail = res.data.djRadio
		         	that.title = res.data.djRadio.name + ' - 主播电台 - 我的云音乐'
		         	that.$http({
			         	method:'get',
			         	url:that.$host + "/dj/program?rid="+res.data.djRadio.id+"&limit="+that.limit,
			         }).then(function(res){
			         	console.log(res.data)
			         	that.playlistMover = res.data.more;
			         	that.$.each(res.data.programs,function(index,el){
			         		
			         		el.duration = that.$formatTime(el.duration/1000);
			         		el.createTime = that.$datePublish('Y-m-d',el.createTime);
			         		el.listenerCount = that.$Playback(el.listenerCount);
			         	})
			         	that.djProgram = res.data.programs;
			         	
			         	that.huancun();
			         }).catch(res=>{
			         	console.log('请求失败：'+res);
			         })
		         }).catch(res=>{
		         	console.log('请求失败：'+res);
		         })
		    this.$root.eventVue.$emit('zSltV',this.zSlt)
		    this.$root.eventVue.$emit('navBul',this.navBul);
		    this.$root.eventVue.$emit('navBul',this.barVoice);
        },
        beforeMount: function () {
//          debugger;
        },
        mounted: function () {
//          debugger;
			console.log(this.djDetail)
			console.log(this.djProgram)
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
        //监听
        watch: {
            '$route' (to, from) {

                console.log(to)
                console.log(from)
                //加判断主要发现这个加载了之后，容易引起其他页面也发送请求，所以加了笨方法，加了条件判断，解决了其他页面请求数据加载的问题
                if(this.$route.query.id){
                    this.huancun()
                }

            }
        },
        methods:{
        	 selectStyle (item) {
		        var _this=this;
		        this.$nextTick(function () {
		          this.djProgram.forEach(function (item) {
		            _this.$set(item,'active',false);
		          });
		          this.$set(item,'active',true);
		    });
      },
      outStyle (item) {
        this.$set(item,'active',false);
      },
      cutStringComent(commentCount){
        		return this.$cutString(commentCount,190)
        },
        fbrkTab(){
        		if(this.fHide){
        			this.fHide = false;
        		}else{
        			this.fHide = true;
        		}
        	},
        sorts(booleans){
        	
        	if(booleans){
        		this.zselSorts = false
        		this.djProgram = this.$arraySort(this.djProgram,'serialNum',true)
        	}else{
        		this.zselSorts = true
        		this.djProgram = this.$arraySort(this.djProgram,'serialNum',false)
        	}
        },
        plays($event){
        	
        		if($event.target.getAttribute('data-res-action') == 'play'){
						console.log($event)
						this.$root.eventVue.$emit('playid', 
						{resId:$event.target.getAttribute('data-res-id'),
						resData:$event.target.getAttribute('data-res-data'),
						resType:$event.target.getAttribute('data-res-type'),
						resFrom:$event.target.getAttribute('data-res-from'),
						resIdx:$event.target.getAttribute('data-res-idx'),
						resRadiotype:$event.target.getAttribute('data-res-radiotype'),
						resRadioid:$event.target.getAttribute('data-res-radioid'),
						songsNum:$event.target.getAttribute('data-res-index'),
						resLimit:$event.target.getAttribute('data-res-limit')
						})
				}else{
					console.log('点击播放图标不正确')
				}
        	},
        huancun(){
        	var that = this;
        	var songsList = JSON.parse(that.$localUtil('songsList'))
					if(that.djDetail.id == songsList.id){
					
							that.songsNum = JSON.parse(that.$localUtil('songsNum'))
							
					}
					this.$root.eventVue.$on('songsNum',(data)=>{
						songsList = JSON.parse(that.$localUtil('songsList'))
						console.log(this.djDetail.id == songsList.id)
						if(this.djDetail.id == songsList.id){
							that.songsNum = data
						}
						
					})
        	}
        },
        
  }
</script>

<style lang="less" scoped>
	#djradio{
		text-align: left;
		.g-wrap {
		    padding: 40px;
		}
		.m-info {
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
			 .tit {
			    margin-left: 64px;
			    position: relative;
			}
			.user {
			    margin: 0 0 20px;
			    line-height: 35px;
			    .face {
				    margin-right: 10px;
				    float: left;
				    width: 35px;
				    height: 35px;
				    img{
				    	float: left;
					    width: 35px;
					    height: 35px;
				    }
				}
				.name {
				    float: left;
				}
				.u-icn2-music2 {
				    float: left;
				    margin: 11px 0 0 3px;
				    *margin-top: 12px;
				}
			}
			.btns {
			    margin-bottom: 25px;
			    margin-right: -10px;
			}
		}
		.u-icn-93 {
		    width: 55px;
		    height: 24px;
		    background-position: 0 -1014px;
		}
		.u-icn2-music2 {
		    width: 12px;
		    height: 13px;
		    background-position: -110px -190px;
		}
		.u-btni, .u-btni i {
		    float: left;
		    height: 31px;
		    line-height: 30px;
		    min-width: 23px;
		    cursor: pointer;
		}
		.u-btni i {
		    padding: 0 7px 0 36px;
		}
		.u-btni-sub i {
		    background-position: 0 -2125px;
		    padding-left: 30px;
		}
		
		.u-btni {
		    padding: 0 5px 0 0;
		    white-space: nowrap;
		}
		.u-btni, .u-btni:hover {
		    color: #333;
		    text-decoration: none;
		}
		.u-btni-sub {
		    background-position: right -2163px;
		    color: #fff;
		}
		.u-btni-sub:hover {
		    color: #fff;
		    background-position: right -2558px;
		}
		.u-btni-sub:hover i {
		    background-position: 0 -2516px;
		}
		.u-btni-subed {
		    background-position: right -2325px;
		     i {
			    background-position: 0 -2207px;
			    padding-left: 30px;
			}
		}
		.u-btni-subed:hover {
		    background-position: right -2640px;
		    i {
			    background-position: 0 -2599px;
			}
		}
		.m-info .btns2 .u-btni, .m-info .btns .u-btni {
		    margin-right: 6px;
		    font-family: simsun,\5b8b\4f53;
		}
		.u-btni-playall {
		    background-position: right -2325px;
		    i {
			    background-position: 0 -2285px;
			    padding-left: 30px;
			}
		}
		.u-btni-share, .u-btni-fav, .u-btni-cmmt, .u-btni-dl {
		    background-position: right -1020px;
		}
		.u-btni-share i, .u-btni-fav i, .u-btni-cmmt i, .u-btni-dl i, .u-btni-unfav i {
		    padding-right: 2px;
		    padding-left: 28px;
		}
		.u-btni-share i {
		    background-position: 0 -1225px;
		}
		.u-type {
		    display: inline-block;
		    position: relative;
		    top: -1px;
		    height: 16px;
		    overflow: hidden;
		    padding: 0 6px;
		    border: 1px solid #999;
		    line-height: 16px;
		    *line-height: 18px;
		    color: #999;
		    vertical-align: middle;
		    font-size: 12px;
		}
		.u-type-red {
		    color: #cc0000;
		    border-color: #cc0000;
		}
		.m-info .intr .cat {
		    margin-right: 7px;
		}
		.m-info .intr {
		    margin-top: 4px;
		    line-height: 18px;
		    color: #666;
		}
		.n-songtb {
		    margin-top: 27px;
		}
		.u-sort .desc, .u-sort .asc {
		    float: left;
		    height: 25px;
		    width: 29px;
		}
		.u-sort .desc {
		    background-position: 0 0;
		}
		.u-sort .asc {
		    width: 28px;
		    background-position: -40px 0;
		}
		.u-sort .asc:hover {
		    width: 28px;
		    background-position: -40px -60px;
		}
		.u-sort .desc:hover {
		    background-position: 0 -60px;
		}
	
		.u-sort .desc.z-sel {
		    background-position: 0 -30px;
		    cursor: default;
		}
		.u-sort .asc.z-sel {
		    background-position: -40px -30px;
		    cursor: default;
		}
		
		.m-table {
		    width: 100%;
		    border: 1px solid #d9d9d9;
		    tr.z-hover td {
			    background-color: #e6e6e6;
			}
			.even td {
			    background-color: #f7f7f7;
			}
		    td {
			    padding: 6px 10px;
			    line-height: 18px;
			    text-align: left;
			}
			
			.hd {
			    height: 18px;
			    .ply {
				    float: right;
				}
				.num {
				    width: 25px;
				    margin-left: 5px;
				    color: #999;
				}
			}
			.ply {
			    width: 17px;
			    height: 17px;
			    cursor: pointer;
			    background-position: 0 -103px;
			}
			.tt {
			    float: left;
			    width: 100%;
			}
			.hshow {
			    display: none;
			}
			.u-icn-81 {
			    float: left;
			    margin-top: 2px;
			}
			 .mv,  .icn {
			    float: left;
			    width: 18px;
			    height: 16px;
			    margin: 2px 0 0 4px;
			    overflow: hidden;
			    text-indent: -999px;
			    cursor: pointer;
			}
			 .icn-share {
			    background-position: 0 -195px;
			}
			.icn-dl {
			    background-position: -81px -174px;
			}
		}
		.m-table-program {
		    border-top: none;
		    tr {
			    height: 55px;
			}
			td {
			    padding: 0 10px;
			}
			 .col1 {
			    width: 62px;
			}
			.hd {
				.num {
				    margin-left: 10px;
				}
			}
			 .col2 {
			    width: 230px;
			    padding-left: 0;
			}
			 .tt {
			    margin-right: -100px;
			}
			.opt {
			    float: right;
			}
			.col3 {
			    width: 60px;
			}
			.col4 {
			    width: 70px;
			}
			.col5 {
			    width: 66px;
			}
		}
		.u-icn-81 {
		    width: 13px;
		    height: 13px;
		    background-position: 0 -700px;
		}
		.u-cover-dj .msk {
		    width: 208px;
		    height: 208px;
		    background-position: 0 -1285px;
		    top: -4px;
		    left: -4px;
		}
		.u-cover-dj {
		    width: 200px;
		    height: 200px;
		}
		.u-icn-1 {
		    width: 11px;
		    height: 13px;
		    background-position: 0 1px;
		    font-size: 100%;
		    font-style: normal;
		}
		.u-icn-84 {
		    width: 12px;
		    height: 13px;
		    background-position: -65px -840px;
		}
		.u-title .out {
		    margin-right: 20px;
		}
		.u-title-1 .out {
		    margin-top: 5px;
		    float: right;
		}
		.u-icn-69, .u-icn-70 {
		    width: 11px;
		    height: 8px;
		    background-position: -65px -520px;
		}
		.u-icn-70 {
		    background-position: -45px -520px;
		}
		.m-table .ply-z-slt, .m-table .ply-z-slt:hover {
		    background-position: -20px -128px;
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