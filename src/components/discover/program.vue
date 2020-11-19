<template>
	<div id="program" v-wechat-title="this.title">
		<div class="g-bd4 f-cb">
			<div class="g-mn4">
				<div class="g-mn4c">
					<div class="g-wrap6" v-if="djProgram">
						<div class="m-info m-info-program f-cb">
							<div class="cover u-cover u-cover-program">
								<img :src="djProgram.coverUrl"/>
							</div>
							<div class="cnt">
								<div class="cntc">
									<div class="topblk2">
										<div class="hd f-cb">
											<i class="f-fl u-icn2 u-icn2-7"></i>
											<div class="tit tit3">
												<h2 class="f-ff2">{{djProgram.name}}</h2>
											</div>
										</div>
										<div class="rdiname">
											<i class="icon u-icn2 u-icn2-8 f-fl"></i>
											<router-link :to="{path:'/djradio',query:{id:djProgram.radio.id}}" :title="djProgram.radio.name" class="f-fl f-fs2 f-ff2 s-fc3">{{djProgram.radio.name}}</router-link>
											<span class="j-flag">
												<span class="u-btni u-btni-dy cursor" data-res-action="sub">
													<i>
														<em class="u-icn2 u-icn2-dy"></em>
														订阅({{djProgram.radio.subCount}})
													</i>
												</span>
											</span>
										</div>
										
									</div>
									
								</div>
							</div>
						</div>
						<div class="m-prointr">
							<div class="btns f-cb j-flag">
								<span class="u-btni u-btni-play cursor" data-res-action="play" :data-res-id="djProgram.id" :data-res-radioid="djProgram.radio.id" data-res-type="17" data-res-radiotype="djradio" @click.stop="plays($event)">
									<i data-res-action="play" :data-res-id="djProgram.id" :data-res-radioid="djProgram.radio.id" data-res-type="17" data-res-radiotype="djradio" @click.stop="plays($event)">播放 {{djProgram.duration}}</i>
									
								</span>
								<span class="u-btn2 u-btn2-1 u-btn2-icn cursor" data-res-action="like" :data-res-id="djProgram.id" :data-res-radioid="djProgram.radio.id" data-res-type="17" data-res-radiotype="djradio">
									<i>
										<em class="icn icn-praise"></em>
										<span class="f-fl">({{djProgram.likedCount}})</span>
									</i>
								</span>
								<span class="u-btni u-btni-cmmt cursor" data-res-action="comment" :data-res-id="djProgram.id" :data-res-radioid="djProgram.radio.id" data-res-type="17" data-res-radiotype="djradio">
									<i>({{djProgram.commentCount}})</i>
								</span>
								<span class="u-btni u-btni-share cursor" data-res-action="share" :data-res-id="djProgram.id" :data-res-radioid="djProgram.radio.id" data-res-type="17" data-res-radiotype="djradio" :data-res-name="djProgram.name" :data-res-author="djProgram.radio.name" :data-res-pic="djProgram.radio.picUrl" :data-res-auditstatus="djProgram.auditStatus">
									<i>分享</i>
								</span>
								<span class="u-btni u-btni-dl cursor" data-res-action="download" :data-res-id="djProgram.id" :data-res-radioid="djProgram.radio.id" data-res-type="17" data-res-radiotype="djradio">
									<i>下载</i>
								</span>
								<span class="u-outlink">
									<i class="u-icn u-icn-95"></i>
									<router-link :to="{path:'/outchain/3/',query:{id:djProgram.id}}" class="s-fc7">生成外链播放器</router-link>
								</span>
							</div>
							<div class="sub">
								<router-link :to="{path:'/discover/djradio/category',query:{id:djProgram.radio.categoryId}}" class="cat u-type u-type-red">{{djProgram.radio.category}}</router-link>
								<strong class="f-fs1">
									{{djProgram.radio.name}}
									<span class="f-thide f-ib f-vam">第{{djProgram.radio.programCount}}期</span>
								</strong>
								<span class="s-fc4 sep">{{djProgram.createTime}} 创建</span>
								<span class="sep s-fc4">
									播放
									<em class="f-fw1 s-fc6">{{djProgram.listenerCount}}</em>
									次
								</span>
							</div>
							
							<p class="s-fc3" :class="{'f-hide':!fHide}" v-if="djProgram.description">介绍: <span v-html="cutStringComent(djProgram.description)"></span></p>
							<p class="s-fc3 " :class="{'f-hide':fHide}">介绍: <span v-html="djProgram.description"></span></p>
							<div class="f-cb" v-if="djProgram.description.length>200">
								<span class="s-fc7 f-fr cursor" @click.stop="fbrkTab">
									{{fHide?'展开':'收起'}}
									<i class="u-icn " :class="[fHide?'u-icn-69':'u-icn-70']"></i>
								</span>
							</div>
						</div>
						<my-comments></my-comments>
					</div>
					<div class="u-load s-fc4" v-else>
						<i class="icn"></i>			
					</div>
				</div>
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
	import eventVue from '../../../static/js/eventVue.js'
	export default {
	name:'program',
    data () {
      return {
        zSlt:'jmxq',
        djProgram:null,
        title:'电台节目详情',
        fHide:true,
        navBul:false,
        barVoice:true
      }
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
		         	url:that.$host + "/dj/program/detail?id="+id,
		         }).then(function(res){
		         	console.log(res.data)
		         	if(res.data.program.description){
		         		res.data.program.description = res.data.program.description.replace(/\n/g,'<br>')
		         	}
		         	res.data.program.createTime = that.$datePublish('Y-m-d',res.data.program.createTime)
		         	res.data.program.duration = that.$foramtChild(res.data.program.duration/1000)
		         	that.djProgram = res.data.program
		         	that.title = res.data.program.name + ' - 主播电台 - 我的云音乐'
//		         	
		         }).catch(res=>{
		         	console.log('请求失败：'+res);
		         })
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
        	cutStringComent(commentCount){
        		return this.$cutString(commentCount,200)
        	},
        	fbrkTab(){
        		if(this.fHide){
        			this.fHide = false;
        		}else{
        			this.fHide = true;
        		}
        	}
        }
  }
</script>
 
<style lang="less" >
	#program{
		text-align: left;
		.m-info-program {
			.cover {
			    padding: 3px;
			    border: 1px solid #d5d5d5;
			}
			.topblk2 {
			    padding-top: 18px;
			    .hd {
				    margin-bottom: 29px;
				}
			}
			.rdiname {
			    line-height: 26px;
			    .icon {
				    margin: 5px 7px 0 0;
				}
				.u-btni-dy {
				    margin-left: 17px;
				}
			}
		}
		.u-cover-program {
		    width: 140px;
		    height: 140px;
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
			.tit3 {
			    margin-left: 80px;
			    position: relative;
			}
		}
		.u-icn2-7 {
		    width: 73px;
		    height: 24px;
		    background-position: 0 -75px;
		}
		.u-icn2-8 {
		    width: 16px;
		    height: 17px;
		    background-position: -50px -20px;
		}
		.u-btni-dy {
		    background-position: right -2400px;
		}
		.u-btni, .u-btni i {
		    float: left;
		    height: 31px;
		    line-height: 30px;
		    min-width: 23px;
		    cursor: pointer;
		}
		.u-btni-dy, .u-btni-dy i {
		    height: 28px;
		    overflow: hidden;
		    line-height: 29px;
		}
		.u-btni {
		    padding: 0 5px 0 0;
		    white-space: nowrap;
		}
		.u-btni-dy i {
		    padding: 0 10px;
		    background-position: 0 -2370px;
		}
		.u-btni-dy:hover {
		    background-position: right -2470px;
		}
		.u-btni-dy:hover i {
		    background-position: 0 -2440px;
		}
		.u-btni-dy .u-icn2 {
		    float: left;
		    margin: 7px 4px 0 0;
		}
		.u-icn2-dy, .u-icn2-ydy {
		    width: 14px;
		    height: 14px;
		    background-position: -50px 0;
		}
		.m-prointr {
		    margin-top: 20px;
		    .btns {
			    margin-bottom: 25px;
			    .u-btni {
				    float: left;
				    margin-right: 10px;
				}
				.u-btn2 {
				    float: left;
				    margin-right: 10px;
				}
			}
			
			.sub {
			    height: 35px;
			    line-height: 35px;
			     .sep {
				    margin-left: 18px;
				}
			}
			.cat {
			    margin: -3px 9px 0 0;
			    position: relative;
			}
			.f-thide {
			    padding-bottom: 2px;
			    max-width: 42%;
			    margin-right: 5px;
			    vertical-align: middle;
			}
			p {
			    line-height: 23px;
			}
		}
		.u-btni i {
		    padding: 0 7px 0 36px;
		}
		.u-btni-play {
		    color: #fff;
		    background-position: right -676px;
		    i {
			    color: #fff;
			    background-position: 0 -633px;
			}
		}
		
		.u-btni-play:hover {
		    color: #fff;
		    background-position: right -762px;
		    i {
			    color: #fff;
			    background-position: 0 -719px;
			}
		}
		.u-btn2-1 {
		    color: #333;
		    background-position: right -100px;
		    i {
			    color: #333;
			    background-position: 0 -59px;
			}
		}
		.u-btn2-icn i {
		    padding: 0 5px 0 10px;
		}
		.u-btn2 .icn-praise, .u-btn2 .icn-praised {
		    width: 17px;
		    height: 15px;
		    margin: 8px 6px 0 0;
		    background-position: 0 -95px;
		}
		.u-btn2 .icn {
		    float: left;
		}
		.u-btn2-1:hover {
		    color: #333;
		    background-position: right -182px;
		    i {
			    color: #333;
			    background-position: 0 -141px;
			}
		}
		.u-btni-share, .u-btni-fav, .u-btni-cmmt, .u-btni-dl {
		    background-position: right -1020px;
		}
		.u-btni-cmmt i {
		    background-position: 0 -1465px;
		}
		.u-btni-share:hover, .u-btni-fav:hover, .u-btni-cmmt:hover, .u-btni-dl:hover {
		    background-position: right -1106px;
		}
		.u-btni-cmmt:hover i {
		    background-position: 0 -1508px;
		}
		.u-btni-share i, .u-btni-fav i, .u-btni-cmmt i, .u-btni-dl i, .u-btni-unfav i {
		    padding-right: 2px;
		    padding-left: 28px;
		}
		.u-btni-share i {
		    background-position: 0 -1225px;
		}
		.u-btni-share:hover i {
		    background-position: 0 -1268px;
		}
		.u-btni-dl i {
		    background-position: 0 -2761px;
		}
		.u-btni-dl:hover i {
		    background-position: 0 -2805px;
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
		.u-btn2 i {
		    width: auto;
		}
		.u-btni-dy i {
		    padding: 0 10px;
		    background-position: 0 -2370px;
		}
		.u-type-red {
		    color: #cc0000;
		    border-color: #cc0000;
		}
		.m-info-program .cntc {
		    margin-left: 170px;
		}
		.f-fs2 {
		    font-size: 16px;
		}
		
		.f-fw1 {
		    font-weight: bold;
		}
		.u-outlink {
		    float: left;
		    margin-left: 16px;
		    margin-top: 7px;
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
		.u-icn-69, .u-icn-70 {
		    width: 11px;
		    height: 8px;
		    background-position: -65px -520px;
		}
		.u-icn-70 {
		    background-position: -45px -520px;
		}
	}
</style>