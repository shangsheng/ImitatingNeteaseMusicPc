<template>
	<div id="recommend">
		<div class="g-bd">
			<div class="g-wrap m-radio">
				<div class="u-title f-pr f-cb">
					<h3>
						<span class="f-ff2">推荐节目</span>
					</h3>
					<span class="sub s-fc4">(每日更新)</span>
				</div>
				<ul class="m-plylist toplist toplist-recmd f-cb" v-if="recommendList">
					<li class="itm" v-for="(item,index) of recommendList" :class="{'bg':index%2!=0}" v-bind:key="index">
						<span class="col cvr u-cover u-cover-tiny" title="播放">
							<img :src="item.coverUrl"/>
							<i class="ply f-pa f-dn f-alpha cursor" data-res-action="play" :data-res-id="item.id" data-res-type="17" @click.stop="plays($event)"></i>
						</span>
						<div class="col cnt f-thide">
							<router-link :to="{path:'/program',query:{id:item.id}}" class="s-fc1" :title="item.name">{{item.name}}</router-link>
						</div>
						<div class="col artist f-thide">
							<router-link :to="{path:'/djradio',query:{id:item.radio.id}}" class="s-fc3" :title="item.radio.name">{{item.radio.name}}</router-link>
						</div>
						<div class="col col-4 s-fc4">
							播放
							{{item.listenerCount}}
						</div>
						<div class="col col-5 s-fc4">
							攒{{item.likedCount}}
						</div>
						<router-link :to="{path:'/discover/djradio/category',query:{id:item.radio.categoryId}}" class="tag u-type">{{item.radio.category}}</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	name:'recommend',
    data () {
      return {
        recommendList:null,
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
		         	url:that.$host + "/program/recommend?limit=50",
		         }).then(function(res){
		         	console.log(res.data)
		         	//res.data.updateTime = that.$datePublish('Y-m-d',res.data.updateTime)
		         	
		         	that.recommendList = res.data.programs
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
	#recommend{
		text-align: left;
		.g-wrap {
		    padding: 40px;
		}
		.m-plylist {
			.col {
			    float: left;
			    margin-left: 10px;
			}
			.itm {
			    float: left;
			    width: 100%;
			    background: #fff;
			}
			.bg {
			    background: #f7f7f7;
			}
		} 
		.m-radio .toplist {
		    height: 600px;
		    border: 1px solid #e2e2e2;
		    border-top: none;
		    .itm {
			    width: 424px;
			    height: 40px;
			    padding: 10px 0;
			    line-height: 40px;
			}
			.cvr {
			    margin-left: 20px;
			    _margin-left: 10px;
			}
			.tag {
			    margin: 1px 0 0 10px;
			    _margin-top: 9px;
			}
		}
		.m-radio .toplist-rank, .m-radio .toplist-recmd {
		    height: auto;
		}
		.m-radio .toplist-rank .itm, .m-radio .toplist-recmd .itm {
		    width: 100%;
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
		.m-radio .toplist-recmd {
			.artist {
			    width: 166px;
			}
			.col-4 {
			    width: 90px;
			}
			.col-5 {
			    width: 126px;
			}
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
		.u-cover-tiny:hover .ply {
		    display: block;
		}
		.m-plylist .itm:hover, .m-plylist .z-hvr, .m-plylist .z-sel {
		    background: #eee;
		}
		
	}
</style>