<template>
	<div id="song-list-pre-cache">
		<div data-key="" data-simple="" data-pvnamed="" v-if="songsP.length>0">
			<div>
				<div class="j-flag">
					<table class="m-table " :class="{'m-table-rank':songsPreCahe.category == '排行榜'}">
						<thead>
							<tr>
								<th class="first w1">
									<div class="wp">
										&nbsp;
									</div>
								</th>
								<th>
									<div class="wp af0">歌曲标题</div>
								</th>
								<th class="w2" :class="{'w2-1':!songsPreCahe.tracks||songsPreCahe.category == '排行榜'}">
									<div class="wp af1">时长</div>
								</th>
								<th class="w3 " :class="[songsPreCahe.tracks&&songsPreCahe.category == '排行榜'?'w3-1':'w4']">
									<div class="wp af2">歌手</div>
								</th>
								
								<th class="w4" v-bind:hidden="!songsPreCahe.tracks&&songsPreCahe.category != '歌单'||songsPreCahe.category == '排行榜'">
									<div class="wp af3">专辑</div>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr :class="{even:index%2==0}" v-for="(item,index) in songsP" >
								<td class="left">
									<div class="hd ">
										
										<span class="ply " :class="{'ply-z-slt':songsNum == index}" data-res-action="play" :data-res-type="songsPreCahe.types" :data-res-from="songsPreCahe.froms" :data-res-id="item.id" :data-res-data="songsPreCahe.id" title="播放" @click.stop="plays($event)" :data-res-index="index" v-if="songsPreCahe.category != '排行榜'">&nbsp;</span>
										<span class="ply " :class="{'ply-z-slt':songsData.id == item.id}" data-res-action="play" :data-res-type="songsPreCahe.types" :data-res-from="songsPreCahe.froms" :data-res-id="item.id" :data-res-data="songsPreCahe.id" title="播放" @click.stop="plays($event)" :data-res-index="index" v-else>&nbsp;</span>
										<span class="num">{{index+1}}</span>
										<!--<div class="rk" v-bind:hidden="!songsPreCahe.tracks&&songsPreCahe.category != '排行榜'||songsPreCahe.category == '歌单'">
											<span class="ico ico u-icn u-icn-73 s-fc9" :class="[]"></span>
										</div>-->
									</div>
								</td>
								<td :class="{'rank':songsPreCahe.category == '排行榜'}">
									<div class="f-cb">
										<div class="tt">
											<router-link :to="{path:'/song',query:{id:item.id}}" v-bind:hidden="!songsPreCahe.tracks&&songsPreCahe.category != '排行榜'||songsPreCahe.category == '歌单'||index>2">
												<img :src="item.al.picUrl" class="rpic"/>
											</router-link>
											<!--<span class="ply " :class="{'ply-z-slt':songsNum == index}" data-res-action="play" :data-res-type="songsPreCahe.types" :data-res-from="songsPreCahe.froms" :data-res-id="item.id" :data-res-data="songsPreCahe.id" title="播放" @click.stop="plays($event)" :data-res-index="index" v-else>&nbsp;</span>-->
											<div class="ttc">
												<span class="txt">
													<router-link :to="{path:'/song',query:{id:item.id}}" >
														<b :title="item.name">
															{{item.name}}
														</b>
													</router-link>
													<span class="s-fc8" :title="item.alia" v-if="item.alia.lenth != 0" v-for="obj of item.alia">
														-{{obj}}
													</span>
													<span class="mv" v-if="item.mv" :data-res-id="item.mv" data-res-action="mv" title="播放mv">mv</span>
												</span>
											</div>
										</div>
									</div>
								</td>
								<td class=" s-fc3">
									<span class="u-dur ">{{item.dt}}</span>
									<div class="opt hshow">
										<span class="u-icn u-icn-81 icn-add"  data-res-action="addto" :data-res-type="songsPreCahe.types" :data-res-from="songsPreCahe.froms" :data-res-id="item.id" :data-res-data="songsPreCahe.id" title="添加到播放列表"></span>
										<span class="icn icn-fav" :data-res-id="item.id" data-res-action="fav" :data-res-type="songsPreCahe.types" title="收藏"></span>
										<span class="icn icn-share" :data-res-id="item.id" data-rs-action="share" :data-res-type="songsPreCahe.types" :data-res-name="item.name" :data-res-author="item.arLength" data-res-pic="item.al.picUrl" title="分享"></span>
										<span class="icn icn-dl" :data-res-id="item.id" data-res-action="download" :data-res-type="songsPreCahe.types" title="下载">下载</span>
									</div>
								</td>
								<td>
									<div class="text">
										
											<span :title="item.arLength">
												<router-link :to="{path:'/artist',query:{id:obj.id}}" v-for="(obj,oindex) in item.ar">
													{{obj.name}} <span class="s-fc8" :title="tn" v-for="tn of obj.tns"> - ({{tn}})</span> <i v-if="oindex != item.ar.length -1">/</i>
												</router-link>
											</span>
										
									</div>
								</td>
								<td v-bind:hidden="!songsPreCahe.tracks&&songsPreCahe.category != '歌单'||songsPreCahe.category == '排行榜'">
									<div class="text">
										<router-link :to="{path:'/album',query:{id:item.al.id}}">
											{{item.al.name}}
										</router-link>
									</div>
								</td>
							</tr>
							
						</tbody>
						
					</table>
				</div>
				<div class="j-flag"></div>
			</div>
		</div>
		<div class="n-nmusic" v-else>
			<h3 class="f-ff2">
				<i class="u-icn u-icn-21"></i>
				暂无音乐！
			</h3>
			<p class="txt s-fc4">
				点击
				<i class="u-icn u-icn-22"></i>
				即可将你喜欢的音乐收藏到“我的音乐”    马上去
				<router-link to="/" class="s-fc7">发现音乐</router-link>
			</p>
		</div>
	</div>
</template>

<script>
	import eventVue from '../../../static/js/eventVue.js'
	export default {
	name:"songListPreCache",
	props:['songsPreCahe'],
    data () {
      return {
        songsNum:null,//播放第几个歌曲
        songsP:[],
        songsData:{}
      }
    },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			this.getAllMsg()
			
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
        beforeUpdate:function(){
        	console.log('=即将更新渲染=');
        	
        },
        updated:function(){
        	
            console.log('==更新成功==');
            
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
                    this.getAllMsg()
                }

            }
        },
        methods:{
        	plays($event){
        		let _this = this;
        		if($event.target.getAttribute('data-res-action') == 'play'){
						console.log($event)
					
					this.$root.eventVue.$emit('playid', 
						{resId:$event.target.getAttribute('data-res-id'),
						resData:$event.target.getAttribute('data-res-data'),
						resType:$event.target.getAttribute('data-res-type'),
						resFrom:$event.target.getAttribute('data-res-from'),
						resIdx:$event.target.getAttribute('data-res-idx'),
						resProgram:_this.songsP[$event.target.getAttribute('data-res-index')],
						songsNum:$event.target.getAttribute('data-res-index')
					})
				}else{
					console.log('点击播放图标不正确')
				}
				
        	},
        	getAllMsg(){
        		console.log(this.songsPreCahe)
				var _this = this;
				if(this.songsPreCahe.tracks){
					this.songsP = this.songsPreCahe.tracks
				}else{
					this.songsP = this.songsPreCahe
				}
				this.$.each(this.songsP,function(index,item){
					
					item.dt = _this.$formatTime(item.dt/1000)
					var arLength = '';
					_this.$.each(item.ar,function(ind,el){
						
						if(ind<item.ar.length-1){
							arLength = arLength+el.name+'/'
						}else{
							arLength = arLength+el.name
						}
						
					})
					item.arLength = arLength
				})
				
				
				
				if(_this.songsPreCahe.category == '排行榜'){
					var songsData = JSON.parse(_this.$localUtil('songsData'))
					console.log(songsData)
					_this.$.each(_this.songsPreCahe.tracks,function(index,item){
//						console.log(item.id == songsData.id)
						if(songsData && item.id == songsData.id){
					
								_this.songsData = songsData
								
						}
						
						//当期播放音乐的id
//						this.$root.eventVue.$on('songsId',(data)=>{
//						
//								_this.songsNum = data
//							
//							
//						})
					})
					
				}else{
					var songsList = JSON.parse(_this.$localUtil('songsList'))
					if(songsList && _this.songsPreCahe.id == songsList.id){
					
							_this.songsNum = JSON.parse(_this.$localUtil('songsNum'))
							
					}
					this.$root.eventVue.$on('songsNum',(data)=>{
						songsList = JSON.parse(_this.$localUtil('songsList'))
						console.log(this.songsPreCahe.id == songsList.id)
						if(this.songsPreCahe.id == songsList.id){
							_this.songsNum = data
						}
						
					})
				}
						
				
				
				
        	}
        }
  }
</script>

<style lang="less">
	table {
	    border-collapse: collapse;
	    border-spacing: 0;
	    table-layout: fixed;
	}
	.m-table .mv, .m-table .icn {
	    float: left;
	    width: 18px;
	    height: 16px;
	    margin: 2px 0 0 4px;
	    overflow: hidden;
	    text-indent: -999px;
	    cursor: pointer;
	}
	.m-table .mv, .m-table .icnfix {
	    position: absolute;
	    top: 0;
	    right: 0;
	}
	.m-table {
	    width: 100%;
	    border: 1px solid #d9d9d9;
	    th {
		    vertical-align: top;
		    text-align: left;
		    font-weight: normal;
		    color: #666;
		    height: 38px;
		    background-color: #f7f7f7;
		    background-position: 0 0;
		    background-repeat: repeat-x;
		    .wp {
			    height: 18px;
			    line-height: 18px;
			    padding: 8px 10px;
			    background-position: 0 -56px;
			}
		}
	    .w1 {
		    width: 74px;
		}
		th.first .wp {
		    background: none;
		}
		.w2 {
		    width: 111px;
		}
		.w3 {
		    width: 14%;
		}
		.w4 {
		    width: 20%;
		}
		td {
		    padding: 6px 10px;
		    line-height: 18px;
		    text-align: left;
		}
		 .even td {
		    background-color: #f7f7f7;
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
		.txt {
		    position: relative;
		    display: inline-block;
		    *display: inline;
		    *zoom: 1;
		    padding-right: 25px;
		    margin-right: -25px;
		    max-width: 99%;
		    height: 20px;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    white-space: nowrap;
		    
		}
		 b {
		    font-weight: normal;
		}
		.soil {
		    position: absolute;
		    text-indent: -9999em;
		}
		.opt {
		    float: left;
		}
		.hshow {
		    display: none;
		}
		.u-icn-81 {
		    float: left;
		    margin-top: 2px;
		}
		.icn-fav {
		    background-position: 0 -174px;
		}
		.icn-share {
		    background-position: 0 -195px;
		}
		.icn-dl {
		    background-position: -81px -174px;
		}
		.text {
		    width: 100%;
		    position: relative;
		    zoom: 1;
		    overflow: hidden;
		    white-space: nowrap;
		    text-overflow: ellipsis;
		    a {
			    white-space: nowrap;
			}
			span{
		    	white-space: nowrap;
		    }
		}
		.w2-1 {
		    width: 91px;
		}
		 .w3-1 {
		    width: 26%;
		}
	}
	
	.m-table .mv {
	    width: 23px;
	    height: 17px;
	    margin: 1px 0 0 0;
	    background-position: 0 -151px;
	}
	.m-table tr.z-hover .hshow, .m-table tr:hover .hshow {
	    display: block;
	    position: relative;
	    margin-right: -10px;
	}
	.m-table tr.z-hover .u-dur, .m-table tr:hover .u-dur {
	    display: none;
	}
	.m-table .ply-z-slt, .m-table .ply-z-slt:hover {
	    background-position: -20px -128px;
	}
	.m-table-rank {
		.rk {
		    float: right;
		    width: 32px;
		    margin-right: -5px;
		    text-align: center;
		    .ico {
			    padding-left: 8px;
			    line-height: 17px;
			    font-size: 10px;
			    font-family: Arial, Helvetica, sans-serif;
			}
			.u-icn-75 {
			    display: block;
			    float: none;
			    margin: 0 auto;
			    padding-left: 0;
			}
		}
		 td.rank {
		    padding-top: 10px;
		    padding-bottom: 10px;
		}
		.rpic {
		    float: left;
		    width: 50px;
		    height: 50px;
		    margin-right: 14px;
		}
		.u-icn-73 {
		    background-position: -74px -299px;
		}
		.u-icn-74 {
		    background-position: -74px -318px;
		}
	}
	.n-nmusic{
		padding: 105px 0 105px 0;
    	text-align: center;
    	h3 {
		    padding-bottom: 38px;
		    font-size: 18px;
		}
		.u-icn-21 {
		    margin-right: 17px;
		}
		.u-icn-22 {
		    margin: 0 9px 0 7px;
		}
	}
	.u-icn-21 {
	    width: 64px;
	    height: 50px;
	    background-position: 0 -347px;
	}
	.u-icn-22 {
	    width: 16px;
	    height: 14px;
	    background-position: 0 -400px;
	}
</style>