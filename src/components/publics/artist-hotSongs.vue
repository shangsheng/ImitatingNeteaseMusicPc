<template>
	<div id="hotSongs">
		<div class="n-top50" v-if="songsList">
			<div class="m-info">
				<div class="btns f-cb">
					<span class="u-btn2 u-btn2-2 u-btni-addply f-fl" data-res-action="play" :data-res-id="songsList.artist.id" data-res-type="2" title="播放" @click.stop="plays($event)" data-res-index="0">
						<i>
							<em class="ply"></em>
							播放
						</i>
					</span>
					<span class="u-btni u-btni-add" data-res-action="addto" :data-res-id="songsList.artist.id" data-res-type="2" title="添加到播放列表"></span>
					<span class="u-btni u-btni-fav" data-res-action="fav" :data-res-id="songsList.artist.id" data-res-type="2" :data-res-name="songsList.artist.name">
						<i>收藏热门({{songsList.hotSongs.length}})</i>
					</span>
					<div class="f-fr">
						<div class="u-btn2 u-btn2-1 sltbtn">
							<i>
								<em class="sltbtn-txt">{{choseMes}}</em>
								<em class="u-icn u-icn-38 u-icn-arr"></em>
							</i>
							<ul class="filter j-slt">
								<li class="choose " :class="{'z-select':choseMes == item.title}" :data-res-type="item.type" data-res-action="choose" :data-res-value="item.title" v-for="(item,index) of chooseSelect" v-bind:key="index">
									{{item.title}}
								</li>
							</ul>
						</div>
						
					</div>
				</div>
				
			</div>
			<div>
				<div class="f-cb">
					<div class="j-flag">
						<table class="m-table m-table-1 m-table-4">
							
							<tbody>
								<tr v-for="(item,index) in songsList.hotSongs" :class="{'even ':index%2==0}" v-bind:key="index">
									<td class="w1">
										<div class="hd">
											<span :data-res-id="item.id" :class="{'ply-z-slt':songsNum == index}" data-res-type="18" data-res-action="play" data-res-from="2" :data-res-data="songsList.artist.id" class="ply " @click.stop="plays($event)" :data-res-index="index">&nbsp;</span>
											<span class="num">{{index+1}}</span>
										</div>
									</td>
									<td>
										<div class="f-cb">
											<div class="tt">
												<div class="ttc">
													<span class="txt">
														<router-link :to="{path:'/song',query:{id:item.id}}">
															<b :title="item.name">{{item.name}}</b>
														</router-link>
														<span class="mv" data-res-action="mv" :data-res-id="item.id" v-bind:hidden="!item.mv" title="播放mv">MV</span>
													</span>
												</div>
											</div>
										</div>
									</td>
									<td class="w2-1 s-fc3">
										<span class="u-dur">{{item.dt/1000|dTime}}</span>
										<div class="opt hshow">
											<span class="u-icn u-icn-81 icn-add" data-res-action="addto" :data-res-id="item.id" data-res-type="18" data-res-from="2" :data-res-data="songsList.artist.id" title="添加到播放列表"></span>
											<span class="icn icn-fav" data-res-action="fav" :data-res-id="item.id" data-res-type="18" title="收藏"></span>
											<span class="icn icn-share" data-res-action="share" :data-res-id="item.id" data-res-type="18" :data-res-pic="item.al.picUrl" :data-res-author="songsList.artist.name" :data-res-name="item.name" title="分享">分享</span>
											<span class="icn icn-dl" data-res-action="download" :data-res-id="item.id" data-res-type="18"></span>
										</div>
									</td>
									<td class="w4">
										<div class="text">
											<router-link :to="{path:'/album',query:{id:item.al.id}}" :title="item.al.name">{{item.al.name}}</router-link>
										</div>
									</td>
								</tr>	
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="u-load s-fc4" v-else>
			<i class="icn"></i>			
		</div>
	</div>
</template>

<script>
	import eventVue from '../../../static/js/eventVue.js'
	export default {
	name:'hotSongs',
	props:['songsList'],
    data () {
      return {
        songsNum:null,
        chooseSelect:[{type:"1",title:'热门单曲'},{type:"2",title:'作词作品'},{type:"3",title:'作曲作品'}],
        choseMes:'热门单曲'
      }
    },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			console.log(this.songsList)
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
        activated: function () {
            console.log('component activated');
        },
        beforeDestroy: function () {
            console.group('beforeDestroy 销毁前状态===============》');
            
        },
        destroyed: function () {
            console.group('destroyed 销毁完成状态===============》');
            
        },
        filters:{
        	dTime(time) {
        		 const formatNumber = n => {
				  n = n.toString()
				  return n[1] ? n : '0' + n
				}
				 if(typeof time !== 'number' || time <0){
				  return time
				 }
				 const hour = parseInt(time/3600)
				 time = time%3600
				 const minute = parseInt(time/60)
				 time = Math.round(time%60)
				 const second = time
				 if(hour==0){
				 	return [ minute, second].map(formatNumber).join(':')
				 }else{
				 	return [hour, minute, second].map(formatNumber).join(':')
				 }
				
	 		}
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
						songsNum:$event.target.getAttribute('data-res-index')
					})
				}else{
					console.log('点击播放图标不正确')
				}
				
        	},
        	getAllMsg(){
        		console.log(this.songsList)
				var _this = this;
			
					var songsList = JSON.parse(_this.$localUtil('songsList'))
					console.log(songsList)
					
					
					if(songsList &&_this.songsList.artist.id == songsList.id){
						_this.songsNum = JSON.parse(_this.$localUtil('songsNum'))
					}else{
						this.$.each(_this.songsList.hotSongs,function(index,el){
							if( songsList &&el.id == songsList.id){
									console.log(songsList.id)
									_this.songsNum = index
	//								JSON.parse(_this.$localUtil('songsNum'))
							}
						})
					}
					this.$root.eventVue.$on('songsNum',(data)=>{
						songsList = JSON.parse(_this.$localUtil('songsList'))
						console.log(this.songsList.artist.id == songsList.id)
						if(this.songsList.artist.id == songsList.id){
							_this.songsNum = data
						}
						
					})
				},
			clickChoose($event){
				//判断作词作曲
			}

        }
  }
</script>

<style lang="less">
	#hotSongs{
		text-align: left;
		.n-top50 .btns {
		    margin: 20px 0 10px;
		}
		.u-btni-addply {
		    float: left;
		     i {
			    padding: 0 7px 0 8px;
			    width: auto;
			}
		}
		.u-btni, .u-btni i {
		    float: left;
		    height: 31px;
		    line-height: 30px;
		    min-width: 23px;
		    cursor: pointer;
		}
		.u-btni {
		    padding: 0 5px 0 0;
		    white-space: nowrap;
		}
		.u-btni-add {
		    width: 31px;
		    margin-left: -3px;
		    padding-right: 0;
		    background-position: 0 -1588px;
		}
		.m-info .btns2 .u-btni, .m-info .btns .u-btni {
		    margin-right: 6px;
		    font-family: simsun,\5b8b\4f53;
		}
		.m-info .btns .u-btni-add {
		    margin-right: 5px;
		}
		.u-btni-share, .u-btni-fav, .u-btni-cmmt, .u-btni-dl {
		    background-position: right -1020px;
		}
		.u-btni-fav i {
		    background-position: 0 -977px;
		}
		.n-top50 .sltbtn, .n-top50 .filter {
		    display: block;
		    color: #333;
		    font-size: 12px;
		    cursor: pointer;
		    font-family: simsun,\5b8b\4f53;
		    i{
		    	width: auto;
		    }
		}
		.u-icn-38 {
		    width: 8px;
		    height: 5px;
		    background-position: -70px -543px;
		}
		.n-top50 .sltbtn .u-icn-arr {
		    margin-left: 6px;
		    background: url(../../assets/icon3.png) no-repeat 0 0;
		}
		.n-top50 {
			.filter {
			    position: absolute;
			    z-index: 1;
			    display: none;
			    width: 100px;
			    height: 93px;
			    margin-top: -2px;
			    line-height: 30px;
			    border: solid 1px #c3c3c3;
			    border-bottom-right-radius: 4px;
			    border-bottom-left-radius: 4px;
			    box-shadow: 0 0 4px 0 rgba(0,0,0,0.1);
			    background-color: #fff;
			}
			.choose {
			    padding-left: 20px;
			    text-align: left;
			    border-bottom: solid 1px rgba(0,0,0,0.1);
			    background-color: #fff;
			}
		}
		.n-top50 .choose.z-select, .n-top50 .choose:hover {
		    background-color: rgba(0,0,0,0.1);
		}
		.m-table {
		    width: 100%;
		    border: 1px solid #d9d9d9;
		    td {
			    padding: 6px 10px;
			    line-height: 18px;
			    text-align: left;
			}
			.w1 {
			    width: 74px;
			}
			.even td {
			    background-color: #f7f7f7;
			}
			.ply {
			    width: 17px;
			    height: 17px;
			    cursor: pointer;
			    background-position: 0 -103px;
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
			.tt {
			    float: left;
			    width: 100%;
			}
			.ttc {
			    height: 18px;
			    margin-right: 20px;
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
			.mv {
			    width: 23px;
			    height: 17px;
			    margin: 1px 0 0 0;
			    background-position: 0 -151px;
			    overflow: hidden;
			    text-indent: -999px;
			    cursor: pointer;
			    position: absolute;
    			top: 0;
    			right: 0;
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
			.w4 {
			    width: 20%;
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
			}
		}
		.m-table-4, .m-table-5 {
		    border: none;
		}
		.m-table-1 .w2-1 {
		    width: 69px;
		}
		.u-icn-81 {
		    width: 13px;
		    height: 13px;
		    background-position: 0 -700px;
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
		.u-btni-share i, .u-btni-fav i, .u-btni-cmmt i, .u-btni-dl i, .u-btni-unfav i {
		    padding-right: 2px;
		    padding-left: 28px;
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
		.n-top50 .sltbtn:hover .filter {
		    display: block;
		}
	}
</style>