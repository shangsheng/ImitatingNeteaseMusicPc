<template>
	<div id="rank">
		<div class="g-bd">
			<div class="g-wrap m-radio" v-if="rankList">
				<div class="u-title f-pr f-cb">
					<h3>
						<span class="f-ff2">节目排行榜</span>
					</h3>
					<span class="sub s-fc4">最近更新:{{rankList.updateTime}}</span>
					<div class="info f-pa">
						<span class="icon u-icn2 u-icn2-5 j-flag cursor"></span>
						<div class="tip s-fc3 f-brk f-pa j-flag">
							选取云音乐中7天内发布的热度最高的节目，每天更新。热度由节目播放、赞、分享数量总和计算。
						</div>
					</div>
				</div>
				<ul class="m-plylist toplist toplist-rank f-cb">
					<li class="itm" v-for="(item,index) in rankList.toplist">
						<div class="rank s-fc4 f-fl">
							<em class=" f-fs1" :class="{'red':index<3}" v-if="index<9">0{{ index+1}}</em>
							<em class=" f-fs1"  v-else>{{ index+1}}</em>
							<span class="u-rnk  f-ff0" v-if="item.lastRank>0&&item.lastRank - item.rank != 0" :class="[item.lastRank - item.rank >0?'u-rnk-up':'u-rnk-dn']">
								<i class="u-icn u-icn-73"   v-if="item.lastRank - item.rank >0"></i>
								<i class="u-icn " :class="[item.lastRank - item.rank ==0?'u-icn-72':'u-icn-74']"  v-else></i>
								{{item.lastRank - item.rank >0 ? item.lastRank - item.rank : -(item.lastRank - item.rank)}}
							</span>
							<span class="u-rnk  f-ff0" v-else-if="item.lastRank - item.rank == 0" >
								<i class="u-icn u-icn-72"></i>
								0
							</span>
							<span class="u-rnk  f-ff0" v-else>								
								<i class="u-icn u-icn-75" ></i>		
							</span>
									
						</div>
						<span class="cvr u-cover u-cover-tiny f-fl cursor">
							<img :src="item.program.coverUrl"/>
							<i class="ply f-pa f-dn f-alpha cursor" :data-res-id="item.program.id" data-res-type="17" data-res-action="play" @click.stop="plays($event)"></i>
						</span>
						<div class="col cnt f-thide">
							<router-link :to="{path:'/program',query:{id:item.program.id}}" class="s-fc1" :title="item.program.name">
								{{item.program.name}}
							</router-link>
						</div>
						<div class="col artist f-thide">
							<router-link :to="{path:'/djradio',query:{id:item.program.radio.id}}" class="s-fc3" :title="item.program.radio.name">
								{{item.program.radio.name}}
							</router-link>
						</div>
						<div class="col tag">
							<router-link :to="{path:'/discover/djradio/category',query:{id:item.program.radio.categoryId}}" class="u-type" :title="item.program.radio.category">
								{{item.program.radio.category}}
							</router-link>
						</div>
						<span class="col hot u-hot f-fl">
							<i :style="{width:(item.program.listenerCount+item.program.likedCount+item.program.shareCount)/zScore*100+'%'}">
								<i></i>
							</i>
						</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	name:'rank',
    data () {
      return {
        rankList:null,
        zSlt:'dt',
        barVoice:true
      }
    },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			var that =this;
			that.$http({
		         	method:'get',
		         	url:that.$host + "/dj/program/toplist?limit=100",
		         }).then(function(res){
		         	console.log(res.data)
		         	res.data.updateTime = that.$datePublish('Y-m-d',res.data.updateTime)
		         	var zScore = 0;
		         	that.$.each(res.data.toplist,function(index,el){
		         		zScore = zScore + el.program.listenerCount+el.program.likedCount+el.program.shareCount
		         	})
		         	
		         	that.zScore = zScore
		         	that.rankList = res.data
		         }).catch(res=>{
		         	console.log('请求失败：'+res.data+','+res.statusText);
		         })
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
        	plays($event){
        		if($event.target.getAttribute('data-res-action') == 'play'){
						console.log($event)
						this.$root.eventVue.$emit('playid', 
						{resId:$event.target.getAttribute('data-res-id'),
						resData:$event.target.getAttribute('data-res-data'),
						resType:$event.target.getAttribute('data-res-type'),
						resFrom:$event.target.getAttribute('data-res-from'),
						resIdx:$event.target.getAttribute('data-res-idx'),
						})
					this.$root.eventVue.$emit('songsNum', 0)
					this.$localUtil('songsList',0)
					
				}else{
					console.log('点击播放图标不正确')
				}
        	}
        }
  }
</script>

<style lang="less">
	#rank{
		text-align: left;
		.g-wrap {
		    padding: 40px;
		}
		.u-title .info {
		    bottom: 9px;
		    right: 0;
		    width: 18px;
		    height: 18px;
		    .tip {
			    display: none;
			    top: 13px;
			    right: -41px;
			    width: 295px;
			    height: 43px;
			    padding: 24px 19px 19px 19px;
			    line-height: 20px;
			    z-index: 9999;
			}
		}
		.u-icn2-5 {
		    width: 18px;
		    height: 18px;
		    background-position: 0 -50px;
		}
		.m-radio {
			.toplist {
			    height: 600px;
			    border: 1px solid #e2e2e2;
			    border-top: none;
			    .itm {
				    width: 424px;
				    height: 40px;
				    padding: 10px 0;
				    line-height: 40px;
				}
				.rank {
				    width: 47px;
				    margin: 6px 0 0 0;
				    text-align: center;
				    line-height: normal;
				}
				.tag {
				    margin: 1px 0 0 10px;
				    _margin-top: 9px;
				}
			}
			.toplist-rank{
				height: auto;
			    .itm {
				    width: 100%;
				}
				.tag {
				    width: 140px;
				}
				.artist {
				    width: 176px;
				}
			} 
			.toplist-recmd {
			    height: auto;
			    .itm {
				    width: 100%;
				}
			}
		}
		.m-plylist {
			.itm {
			    float: left;
			    width: 100%;
			    background: #fff;
			}
			.col {
			    float: left;
			    margin-left: 10px;
			}
			.rank {
				em {
				    display: block;
				    width: 100%;
				    text-align: center;
				}
				.red {
				    color: #da4545;
				}
				.cvr {
				    margin: 0;
				}
				
				.hot {
				    margin-left: 28px;
				} 
			}
			.hot {
			    margin-top: 16px;
			}
		}
		.u-icn-72, .u-icn-73, .u-icn-74 {
		    width: 6px;
		    height: 6px;
		    background-position: -74px -274px;
		}
		.u-icn-73 {
		    background-position: -74px -304px;
		}
		.u-rnk i {
		    margin: -1px 2px 0 0;
		    *margin-top: 0;
		    _margin-top: 1px;
		    vertical-align: middle;
		}
		.u-cover-tiny {
		    width: 40px;
		    height: 40px;
		    .ply {
			    position: absolute;
			    display: none;
			    _display: block;
			    width: 22px;
			    height: 22px;
			    top: 50%;
			    left: 50%;
			    overflow: hidden;
			    margin: -11px 0 0 -11px;
			    background-position: 0 -85px;
			    _background-position: 0 0;
			}
		}
		.m-radio .toplist-rank .cnt, .m-radio .toplist-recmd .cnt {
		    width: 304px;
		    margin: 0 0 0 10px;
		    line-height: 40px;
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
		.u-hot {
		    display: block;
		    position: relative;
		    width: 100px;
		    background-position: 0 -240px;
		    line-height: normal;
		}
		.u-hot, .u-hot i {
		    display: block;
		    height: 8px;
		}
		.u-hot i {
		    overflow: hidden;
		    padding: 0 4px;
		    background-position: right -318px;
		    i {
			    margin-left: -4px;
			    padding: 0 0 0 4px;
			    background-position: 0 -304px;
			}
		}
		.m-plylist .itm:hover, .m-plylist .z-hvr, .m-plylist .z-sel {
		    background: #eee;
		}
		.u-icn-74 {
		    background-position: -74px -324px;
		}
		.u-icn-75 {
		    width: 16px;
		    height: 17px;
		    background-position: -67px -283px;
		}
		.m-radio .toplist .itm:hover .cvr .ply, .m-radio .toplist .itm.js-hover .cvr .ply {
		    display: block;
		}
		.u-title .info .tip {
		    display: none;
		    top: 13px;
		    right: -41px;
		    width: 295px;
		    height: 43px;
		    padding: 24px 19px 19px 19px;
		    line-height: 20px;
		    z-index: 9999;
		}
		.u-title .info:hover .tip {
		    display: block;
		}
		
	}
</style>