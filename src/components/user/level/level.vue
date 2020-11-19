<template>
	<div id="my-level" class="g-bd">
		<div class="n-mylv">
			<div class="n-lv">
				<div class="h3">
					当前等级:
					<span class="n-level-big">
						<i></i>
						{{level}}
					</span>
					<span class="n-level-tips">等级数据每天下午2点更新</span>
				</div>
				<div class="sub">
					<div class="subbg">
						<div :style="{width:widthLevel+'px'}">
							<span class="wg-img-sub-subbg"></span>
						</div>
					</div>
					<div class="subnum">
						<div class="divison">
							<span v-for="item in lines-1"></span>
						</div>
						<div class="divnum">
							<ul>
								<li v-for="item in lines+1" :class="{'z-ov':item-1<level,'z-on':item-1==level}">{{item-1}}</li>
							</ul>
						</div>
					</div>
					
				</div>
			</div>
			<div class="n-pow">
				<div class="h3">
					当前等级特权：
				</div>
				<div class="telist" v-if="levelList">
					<ul class="j-flag">
						<li v-for="item in levelList">{{item}}</li>
					</ul>
				</div>
				<div class="aboutmore">
					<router-link :to="{path:'/level/details'}"  >了解等级特权></router-link>
				</div>
			</div>
			<div class="n-nextlv" v-if="lines !== level">
				<div class="h4">
					距离下一个等级：
					<span class="n-level">
						<i></i>
						{{level+1}}
					</span>
					<span class="n-iconpoint">
						<span class="icon u-icn2 u-icn2-5 j-flag"></span>
						<div class="tip">
							<p>听歌量是指累计播放的歌曲数量而非播放次数，并且实际播放时间过短的歌曲将不纳入计算，每天最多计算300首。</p>
							<p>登录天数是指使用云音乐的天数，在多端同时使用不会被重复计算。</p>
							<i class="t"></i>
							<i class="b"></i>
						</div>
					</span>
				</div>
				<div class="uitl">
					<span class="tit">听歌:</span>
					<div class="bar">
						<div class="barbox">
							<span :style="{width:widthSong+'%'}"></span>
						</div>
					</div>
					还需听歌{{songList}}首
				</div>
				<div class="uitl">
					<span class="tit">登录:</span>
					<div class="bar">
						<div class="barbox">
							<span :style="{width:widthLog+'%'}"></span>
						</div>
					</div>
					还需登录{{logDay}}天
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import eventVue from '../../../../../static/js/eventVue.js'
	export default{
		name:'level',
		data(){
			return {
				lines:10,
				level:8,
				levelList:null,
				widthLevel:698.408,
				widthSong:46.76,
				widthLog:100,
				logDay:0,
				songList:2662,
				navBul:true,
				mNavfst:'djxx',
				barVoice:true
			}
		},
		beforeCreate:function(){
		
		},
		created:function(){
			
			this.$root.eventVue.$emit('navBul', this.navBul)
			this.$root.eventVue.$emit('mNavfst', this.mNavfst)
			this.$root.eventVue.$emit('barVoice', this.barVoice)
			const that = this;
			that.$http({
				method:'get',
	         	url:that.$host + "/user/level",
				 }).then(function(res){
				        console.log(res.data)
				    	// that.loginData = res.data
				    	that.level=res.data.data.level;
				    	that.widthSong = res.data.data.progress*100;
				    	that.widthLog = (res.data.data.nowLoginCount/res.data.data.nextLoginCount)*100;
				    	that.levelList = res.data.data.info.split("$");
				    	that.logDay = res.data.data.nextLoginCount-res.data.data.nowLoginCount;
				    	that.songList = res.data.data.nextPlayCount-res.data.data.nowPlayCount;
				    	that.widthLevel = ((res.data.data.nowLoginCount+res.data.data.nowPlayCount)/(res.data.data.nextPlayCount+res.data.data.nextPlayCount))*84.721+(res.data.data.level*84.721);
			      }).catch(res=>{
				        console.log('请求失败：'+res.data+','+res.statusText);
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

        }
	}
</script>
<style lang="less" scoped>
	.n-mylv {
	    padding: 70px 68px;
	    text-align: left;
	     .h3 {
		    position: relative;
		    z-index: 1;
		    zoom: 1;
		    height: 32px;
		    line-height: 32px;
		    color: #333;
		    font-size: 22px;
		    margin-bottom: 4px;
		    font-family: 'Microsoft YaHei';
		    .n-level-tips {
			    position: absolute;
			    z-index: 1;
			    left: 0;
			    top: 101px;
			    font-size: 12px;
			    color: #999;
			    font-family: Arial, Helvetica, sans-serif;
			}

		}
	}
	.n-lv {
	    margin-bottom: 52px;
	    .sub {
		    width: 100%;
		    position: relative;
		    z-index: 1;
		    padding-top: 31px;
		    height: 34px;
		    overflow: hidden;
		    .subbg {
			    width: 835px;
			    height: 10px;
			    position: absolute;
			    left: 0;
			    bottom: 0;
			    z-index: 2;
			    border-radius: 10px;
			    background: #dcdfe6;
			    span {
				    width: 100%;
				    height: 10px;
				    display: block;
				    border-radius: 10px;
				    -webkit-animation: subbar 2s;
				    animation: subbar 2s;
				}
			}
			.subnum {
			    width: 100%;
			    height: 40px;
			    left: 0;
			    bottom: 0;
			    position: absolute;
			    z-index: 2;
			    .divison {
				    position: absolute;
				    left: 13px;
				    bottom: 0;
				    width: 100%;
				    height: 10px;
				    span{
				    	float: left;
					    display: inline;
					    width: 1px;
					    background: #fff;
					    height: 10px;
					    margin-left: 80px;
				    }
				}
			}
		}
		.divnum {
		    position: absolute;
		    left: 0;
		    top: 0;
		    font-family: 'Microsoft YaHei';
		    font-size: 18px;
		    color: #c4c6cc;
		    width: 980px;
		    li {
			    float: left;
			    width: 25px;
			    height: 28px;
			    line-height: 24px;
			    display: inline;
			    margin-right: 56px;
			    text-align: center;
			}
			li.z-ov {
			    color: #ed5757;
			    -webkit-animation: show 3s;
			    animation: show 3s;
			}
			li.z-on {
			    color: #fff;
			    background-position: 0 -50px;
			    -webkit-animation: show1 2s;
			    animation: show1 2s;
			}
		}
	}
	.n-level-big {
	    position: relative;
	    z-index: 1;
	    zoom: 1;
	    height: 32px;
	    line-height: 32px;
	    margin-left: 30px;
	    zoom: 1;
	    font-family: Arial;
	    font-size: 24px;
	    font-weight: 700;
	    color: #e03a24;
	    font-style: italic;
	    i {
		    position: absolute;
		    left: -30px;
		    top: 0;
		    z-index: 1;
		    width: 30px;
		    height: 30px;
		    background-position: left 5px;
		}
	}
	.n-pow {
	    border-bottom: solid 1px #ddd;
	    margin-bottom: 36px;
	    .telist {
		    padding-bottom: 10px;
		    li {
			    height: 30px;
			    line-height: 30px;
			    color: #666;
			    padding-left: 13px;
			    background-position: -17px -82px;
			    font-size: 14px;
			}
		}
		.aboutmore {
		    color: #0e73ba;
		    margin-top: 28px;
		    padding-left: 4px;
		    margin-bottom: 26px;
		    height: 20px;
		    line-height: 20px;
		    a{
		    	color: #0e73ba;
		    }
		}
	}
	.n-nextlv {
		.h4 {
		    height: 22px;
		    line-height: 22px;
		    font-size: 14px;
		    color: #333;
		    margin-bottom: 20px;
		}
		.n-level {
		    position: relative;
		    margin-left: 25px;
		    zoom: 1;
		    font-family: Arial;
		    font-size: 18px;
		    font-weight: 700;
		    color: #e03a24;
		    font-style: italic;
		    i {
			    position: absolute;
			    left: -25px;
			    top: 0;
			    width: 25px;
			    height: 22px;
			    background-position: 0 -25px;
			}
		}
		.n-iconpoint {
		    position: relative;
		    margin-left: 10px;
		    left: -5px;
		    top: -2px;
		    z-index: 2;
		    span{
		    	cursor: pointer;
		    }
		    div.tip {
			    position: absolute;
			    left: -33px;
			    top: 30px;
			    display: none;
			    width: 295px;
			    font-size: 12px;
			    line-height: 20px;
			    padding: 8px 19px 7px 19px;
			    z-index: 2;
			    color: #666;
			     i.t {
				    position: absolute;
				    width: 327px;
				    height: 16px;
				    left: 0;
				    top: -16px;
				}
				i.b {
				    position: absolute;
				    width: 327px;
				    height: 12px;
				    left: 0;
				    bottom: -12px;
				}
			}
		}
		.uitl {
		    font-size: 12px;
		    color: #999;
		    height: 32px;
		    line-height: 32px;
		    .tit {
			    line-height: 32px;
			    color: #666;
			}
			.bar {
			    display: inline-block;
			    width: 160px;
			    height: 12px;
			    margin-right: 6px;
			    position: relative;
			    *display: inline;
			    zoom: 1;
			}
			.barbox {
			    position: absolute;
			    top: 7px;
			    left: 0;
			    z-index: 1;
			    width: 160px;
			    height: 4px;
			    line-height: 0;
			    background: #dcdfe6;
			    border-radius: 4px;
			    span {
				    width: 100%;
				    height: 100%;
				    background: #f75757;
				    border-radius: 4px;
				    display: block;
				    
				}
			}
		}
	}
	.u-icn2-5 {
	    width: 18px;
	    height: 18px;
	    background-position: 0 -50px;
	}
	.u-icn2-5:hover {
	    background-position: -20px -50px;
	}
	.n-iconpoint:hover div.tip {
	    display: block;
	}
@keyframes show{
	0% {
	    color: #c4c6cc;
	}
	100% {
	    color: #ed5757;
	}
}
@keyframes show1{
	0% {
	    color: #c4c6cc;
	    background-position: 9999px 9999px;
	}
	50% {
	    color: #c4c6cc;
	    background-position: 0 -50px;
	}
	100% {
	    color: #fff;
	}
}
@keyframes subbar{
	0% {
	    width: 0;
	}
	100% {
	    width: 100%;
	}
}
</style>