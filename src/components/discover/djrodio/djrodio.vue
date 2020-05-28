<template>
	<div id="discoverDjradio">
		<div class="g-bd">
			<div class="g-wrap m-radio">
				<dj-banner></dj-banner>
				<div class="rditop f-cb" v-if="djRecommended">
					<div class="blk f-fl">
						<div class="u-title f-cb">
							<h3>
								<router-link to="/discover/djradio/recommend" class="f-ff2">推荐节目</router-link>
							</h3>
							<router-link to="/discover/djradio/recommend" class="more s-fc3">更多</router-link>
						</div>
						<ul class="m-plylist toplist">
							<li class="itm " :class="{'bg':index%2 != 0}" v-for="(item,index) in djRecommended" v-bind:key="index">
								<span class="cvr u-cover u-cover-tiny f-fl cursor">
									<img :src="item.coverUrl"/>
									<i class="ply f-pa f-dn f-alpha cursor" :data-res-id="item.id" data-res-type="17" data-res-action="play" @click.stop="plays($event)"></i>
								</span>
								<div class="cnt f-fl">
									<h3 class="f-thide">
										<router-link :to="{path:'/program',query:{id:item.id}}" class="s-fc1 f-fw0" :title="item.name">
											{{item.name}}
										</router-link>
									</h3>
									<p class="f-thide">
										<router-link :to="{path:'/djradio',query:{id:item.dj.userId}}" class="s-fc4" :title="item.dj.nickname">
											{{item.dj.nickname}}
										</router-link>
									</p>
								</div>
								<router-link :to="{path:'/discover/djradio/category',query:{id:item.radio.categoryId}}" class="tag u-type">{{item.radio.category}}</router-link>
							</li>
						</ul>
					</div>
					<div class="blk f-fr" v-if="djRank">
						<div class="u-title f-cb">
							<h3>
								<router-link to="/discover/djradio/rank" class="f-ff2">节目排行榜</router-link>
							</h3>
							<router-link to="/discover/djradio/rank" class="more s-fc3">更多</router-link>
						</div>
						<ul class="m-plylist toplist toplist-r">
							<li class="itm" :class="{'bg':index%2 != 0}" v-for="(item,index) of djRank" v-bind:key="index">
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
								<div class="cnt f-fl">
									<h3 class="f-thide">
										<router-link :to="{path:'/program',query:{id:item.program.id}}" class="s-fc1 f-fw0" :title="item.program.name">
											{{item.program.name}}
										</router-link>
									</h3>
									<p class="f-thide">
										<router-link :to="{path:'/djradio',query:{id:item.program.radio.id}}" class="s-fc4" :title="item.program.radio.name">
											{{item.program.radio.name}}
										</router-link>
									</p>
								</div>
								<span class="hot u-hot f-fl">
									<i :style="{width:(item.program.listenerCount+item.program.likedCount+item.program.shareCount)/zScore*100+'%'}">
										<i></i>
									</i>
								</span>
							</li>
						</ul>
					</div>
					
				</div>
				<div class="rdimore" v-for="(item,index) in category" v-bind:key="index">
					<div class="u-title f-cb">
						<div class="u-title f-cb">
							<h3>
								<router-link :to="{path:'/discover/djradio/category',query:{id:item.types}}" class="f-ff2">
									{{item.name}}
									<span class="f-ff1">·</span>
									电台
								</router-link>
							</h3>
							<router-link :to="{path:'/discover/djradio/category',query:{id:item.types}}" class="more s-fc3">更多</router-link>
						</div>
						
					</div>
					<ul class="rdilist f-cb" v-if="item.rdimore">
							<li v-for="(obj,index) of item.rdimore"   :class="{'borderBottomColor':index==2||index==3}" v-bind:key="index">
								<div v-if="index<4">
									<router-link :to="{path:'/djradio',query:{id:obj.id}}" class="cvr u-cover u-cover-rdi f-fl">
										<img :src="obj.picUrl"/>
									</router-link>
									<div class="cnt">
										<h3 class="f-fs3">
											<router-link :to="{path:'/djradio',query:{id:obj.id}}" class="s-fc1" :title="obj.name">{{obj.name}}</router-link>
										</h3>
										<p class="note s-fc4">
											{{obj.rcmdtext}}
										</p>
									</div>
								</div>
							</li>
						</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	name:'discoverDjradio',
    data () {
      return {
        djRecommended:null,
        djRank:null,
        zScore:0,//播放、分享、点赞的总量
        category:[{types:2,name:'音乐故事',rdimore:null},{types:6,name:'美文读物',rdimore:null},{types:5,name:'脱口秀',rdimore:null},{types:3,name:'情感调频',rdimore:null},{types:2001,name:'创作|翻唱',rdimore:null},{types:11,name:'人文历史',rdimore:null}],
        
      }
    },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			var that = this;
			//推荐节目
			that.$http({
		         	method:'get',
		         	url:that.$host + "/program/recommend",
		         }).then(function(res){
		         	console.log(res.data)
		         	that.djRecommended = res.data.programs
		         	
		         }).catch(res=>{
		         	console.log('请求失败：'+res.data+','+res.statusText);
		         })
		    //节目排行榜
		    that.$http({
		         	method:'get',
		         	url:that.$host + "/dj/program/toplist?limit=10",
		         }).then(function(res){
		         	console.log(res.data)
		         	var zScore = 0;
		         	that.$.each(res.data.toplist,function(index,el){
		         		zScore = zScore + el.program.listenerCount+el.program.likedCount+el.program.shareCount
		         	})
		         	
		         	that.zScore = zScore
		         	that.djRank = res.data.toplist
		         }).catch(res=>{
		         	console.log('请求失败：'+res.data+','+res.statusText);
		         })
		     that.$.each(that.category,function(index,el){
		     	that.$http({
		         	method:'get',
		         	url:that.$host + "/dj/recommend/type?type="+el.types,
		         }).then(function(res){
		         	console.log(res.data)
		         	el.rdimore = res.data.djRadios
		         }).catch(res=>{
		         	console.log('请求失败：'+res.data+','+res.statusText);
		         }) 
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
	#discoverDjradio{
		text-align: left;
		.g-wrap {
		    padding: 40px;
		}
		.m-radio {
			.toplist {
			    height: 600px;
			    border: 1px solid #e2e2e2;
			    border-top: none;
			    .cvr {
				    margin-left: 20px;
				    _margin-left: 10px;
				}
				.tag {
				    margin: 1px 0 0 10px;
				    _margin-top: 9px;
				}
				.cnt {
				    width: 254px;
				    margin: 1px 0 0 10px;
				    line-height: 20px;
				}
				.rank {
				    width: 47px;
				    margin: 6px 0 0 0;
				    text-align: center;
				    line-height: normal;
				    .red {
					    color: #da4545;
					}
					em {
					    display: block;
					    width: 100%;
					    text-align: center;
					}
				}
				.hot {
				    margin-top: 16px;
				    i {
				    	overflow: hidden;
					    padding: 0 4px;
					    background-position: right -318px;
				    	i {
						    margin-left: -4px;
						    padding: 0 0 0 4px;
						    background-position: 0 -304px;
						}
				    }
				}
			}
			.toplist-r .cnt {
			    width: 208px;
			}
			.rditop{
				margin-top: 10px;
				.blk {
				    width: 440px;
				}
			}
			.new {
			    margin-top: 10px;
			}
			.itm {
			    width: 424px;
			    height: 40px;
			    padding: 10px 0;
			    line-height: 40px;
			} 
			.rdilist {
				margin-left: -30px;
				li {
				    float: left;
				    width: 435px;
				    height: 120px;
				    margin-left: 30px;
				    _margin-left: 15px;
				    padding: 20px 0;
				    border-bottom: 1px solid #e7e7e7;
				}
				.cnt {
				    margin-left: 140px;
				}
				h3 {
				    margin: 16px 0 20px;
				}
				.note {
				    margin-bottom: 6px;
				    line-height: 20px;
				}
				.borderBottomColor{
					border-bottom-color: #fff;
				}
			}
		}
		.m-plylist {
			.itm {
			    float: left;
			    width: 100%;
			    background: #fff;
			}
			.bg {
			    background: #f7f7f7;
			}
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
		.u-cover-tiny:hover .ply {
		    display: block;
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
		.u-rnk i {
		    margin: -1px 2px 0 0;
		    *margin-top: 0;
		    _margin-top: 1px;
		    vertical-align: middle;
		}
		.u-icn-72, .u-icn-73, .u-icn-74 {
		    width: 6px;
		    height: 6px;
		    background-position: -74px -274px;
		}
		.u-icn-73 {
		    background-position: -74px -304px;
		}
		.u-icn-74 {
		    background-position: -74px -324px;
		}
		.u-icn-75 {
		    width: 16px;
		    height: 17px;
		    background-position: -67px -283px;
		}
		.m-plylist .itm:hover, .m-plylist .z-hvr, .m-plylist .z-sel {
		    background: #eee;
		    
		}
		.rdimore {
		    margin-top: 35px;
		     .cvr {
			    margin-right: -200px;
			}
		}
		.u-cover-rdi {
		    width: 120px;
		    height: 120px;
		}
		 
	}
	
</style>