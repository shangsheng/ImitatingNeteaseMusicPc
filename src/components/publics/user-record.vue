<template>
	<div id="user-record" v-if="msg">
		<div class="u-title u-title-1 f-cb m-record-title" v-if="userRecords.listenSongs != 0">
			<h3>
				<span class="f-ff2 s-fc3">听歌排行榜</span>
			</h3>
			<h4>累积听歌 {{userRecords.listenSongs}}首</h4>
			<span class="n-iconpoint">
				<span class="icon u-icn2 u-icn2-5 j-flag"></span>
				<div class="tip">
					<p>实际播放时间过短的歌曲将不纳入计算。</p>
					<i class="t"></i>
					<i class="b"></i>
				</div>
			</span>
			<div class="nav f-cb">
				<span :class="{'z-sel':types == 0}" data-action="songsall" @click="record(0)">所有时间</span>
				<span :class="{'z-sel':types == 1}" data-action="songsweek" @click="record(1)">最近一周</span>
			</div>
		</div>
		<div class="m-record" :data-songs="userRecords.listenSongs">
			<div v-if="recordData">
				<div class="j-flag" v-if="recordData.length>0">
					<ul>
						<li v-for="(item,index) in recordData" :class="{'even':index%2!=0}">
							<div class="hd ">
								<span class="ply cursor" :class="{'ply-z-slt':songsNum == index}" data-res-type="18" data-res-from="50"  data-res-action="play" :data-res-data="item.idData" :data-res-id="item.song.id" @click.stop="playSong" :data-res-index="index"></span>
								<span class="num">{{index+1}}.</span>
							</div>
							<div class="song">
								<div class="tt">
									<div class="ttc">
										<span class="txt">
											<router-link :to="{path:'/song',query:{id:item.song.id}}">
												<b :title="item.song.name">{{item.song.name}}</b>
											</router-link>
											<span class="ar s-fc8">
												<em>-</em>
												<span :title="item.song.arTitle" >
													<router-link :to="{path:'/artist',query:{id:itemArtist.id}}" class="s-fc8" v-for="(itemArtist,nums) in item.song.ar ">{{itemArtist.name}} <i v-if="nums<item.song.ar.length-1">/</i></router-link>
												</span>
											</span>
										</span>
										
									</div>
								</div>
								<div class="opt">
									<span class="u-icn u-icn-81 icn-add cursor" data-res-type="18" data-res-from="50"  data-res-action="addto" :data-res-data="item.idData" :data-res-id="item.song.id" title="添加到播放列表"></span>
									<span class="icn icn-fav cursor" data-res-type="18"   data-res-action="subscribe" :data-res-id="item.song.id" title="收藏"></span>
									<span class="icn icn-share cursor" data-res-type="18"   data-res-action="share" :data-res-id="item.song.id" :data-res-name="item.song.name" :data-res-author="item.song.arTitle" title="分享">分享</span>
									<span class="icn icn-dl cursor" data-res-type="18"   data-res-action="download" :data-res-id="item.song.id" title="下载">下载</span>
								</div>
							</div>
							<div class="tops">
								<span class="bg" :style="{width:item.score+'%'}"></span>
							</div>
						</li>
					</ul>
					<div class="more" v-if="recordData.length>9">
						<router-link :to="{path:'/user/songs/rank',query:{id:userRecords.profile.userId}}">查看更多></router-link>
					</div>
				</div>
				<div class="n-nmusic" v-else>
					<h3 class="f-ff2">
						<i class="u-icn u-icn-21"></i>
						暂无听歌记录
					</h3>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import eventVue from '../../../static/js/eventVue.js'
	export default {
  name: 'userRecord',
  props:['userRecords'],
  data () {
    return {
    	recordData:null,
    	types:0,
    	songsNum:null,
    	msg:true,
    }
     
  },
  inject:['reload'],//app.vueҳ���ж����¼���
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		this.record(this.types)
		this.getAllMsg()
		 console.log(this.userRecords)
        },
        beforeMount: function () {
//          debugger;
        },
        mounted: function () {
//          debugger;
			
        },
        deactivated: function(){
            alert("keepAliveͣ��");
        },
        activated: function () {
            console.log('component activated');
        },
        beforeDestroy: function () {
            console.group('beforeDestroy ���ǰ״̬===============��');
            
        },
        destroyed: function () {
            console.group('destroyed ������״̬===============��');
            
        },
        directives: {
//			�Զ����ȡ����
			focus: {
			
				update: function (el, {value}) {
				
					if (value) {
					
						el.focus()
						
					
					}
				
				}
			
			}
		
		},
        methods:{
        	record(types){
        		let that = this;
				let id =  this.$route.query.id;
				this.$http({
			        method:'get',
			        url:that.$host +'/user/record?uid='+id+'&type='+types
			    }).then(function(resp){                            
			        console.log(resp.data);
			        if(resp.data.allData != undefined){
			        	if(resp.data.allData.length>0){
			        		 that.recordData = resp.data.allData.slice(0,10);
					        console.log(that.recordData)
					        that.$.each(that.recordData,function(index,el){
					        	el.idData = id;
					        	let arTitle = '';
					        	that.$.each(el.ar,function(num,item){
					        		console.log(item)
					        		if(num<el.ar.length-1){
					        			arTitle = arTitle + item.name+'/'
					        		}else{
					        			arTitle = arTitle + item.name
					        		}
					        	})
					        	el.arTitle = arTitle
					        })
			        	}else{
			        		that.recordData = resp.data.allData
			        	}
			        }else{
			        	 if(resp.data.weekData.length>0){
			        		 that.recordData = resp.data.weekData.slice(0,10);
					        console.log(that.recordData)
					        that.$.each(that.recordData,function(index,el){
					        	el.idData = id;
					        	let arTitle = '';
					        	that.$.each(el.ar,function(num,item){
					        		console.log(item)
					        		if(num<el.ar.length-1){
					        			arTitle = arTitle + item.name+'/'
					        		}else{
					        			arTitle = arTitle + item.name
					        		}
					        	})
					        	el.arTitle = arTitle
					        })
			        	}else{
			        		that.recordData = resp.data.weekData
			        	}
			        }
			       that.types = types;
			    }).catch(error => {
			    	if (error.response) {
					      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
					      console.log(error.response.data);
					      if(error.response.data.msg == '无权限访问'){
					      	that.msg = false
					      }
					    
					    } else {
					      // Something happened in setting up the request that triggered an Error
					      console.log('Error', error.message);
					    }
			     
//			        if(resp)
			    });
        	},
        	playSong($event){
       			 let that = this;
				if($event.target.getAttribute('data-res-action') == 'play'){
						console.log($event)
						this.$root.eventVue.$emit('playid', 
						{resId:$event.target.getAttribute('data-res-id'),
						resData:$event.target.getAttribute('data-res-data'),
						resType:$event.target.getAttribute('data-res-type'),
						resFrom:$event.target.getAttribute('data-res-from'),
						resIdx:$event.target.getAttribute('data-res-idx'),
						types:that.types,
						resSongsNum:$event.target.getAttribute('data-res-index')
						})
					this.songsNum = $event.target.getAttribute('data-res-index')
					
				}else{
					console.log('点击播放图标不正确')
				}
       		},
       		getAllMsg(){
        		console.log(this.recordData)
				var _this = this;
			
					var songsData = JSON.parse(_this.$localUtil('songsData'))
					console.log(songsData)
				
						this.$.each(_this.recordData,function(index,el){
							if( songsData &&el.song.id == songsData.id){
									console.log(songsData.id)
									_this.songsNum = index
	//								JSON.parse(_this.$localUtil('songsNum'))
							}
						})
					
				}
        },
         //����
        watch: {
            '$route' (to, from) {

                console.log(to)
                console.log(from)
                //���ж���Ҫ�������������֮��������������ҳ��Ҳ�����������Լ��˱����������������жϣ����������ҳ��������ݼ��ص�����
                if(this.$route.query.id){
                    //this.reload()
                    this.getAllMsg()
                }

            }
        }
}
</script>

<style  lang="less">
	#user-record{
		text-align: left;
		
		.m-record-title {
		    position: relative;
		    z-index: 2;
		    zoom: 1;
		     h4 {
			    float: left;
			    display: inline;
			    margin-top: 5px;
			    margin-left: 10px;
			    line-height: 26px;
			    font-weight: 400;
			    color: #666;
			}
			 .nav {
			    position: absolute;
			    z-index: 1;
			    right: 0;
			    bottom: 5px;
			    span {
				    line-height: 26px;
				    color: #666;
				    cursor: pointer;
				}
				span.z-sel {
				    color: #333;
				    font-weight: 700;
				}
			}
		}
		.n-iconpoint {
		    position: relative;
		    margin-left: 10px;
		    left: -1px;
		    top: 8px;
		    line-height: 18px;
		    z-index: 2;
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
		.u-icn2-5 {
		    width: 18px;
		    height: 18px;
		    background-position: 0 -50px;
		}
		.m-record-title .nav span, .m-record-title .nav i {
		    float: right;
		    margin-left: 8px;
		}
		.m-record {
		    margin-bottom: 36px;
		    ul {
			    border: 1px solid #e2e2e2;
			    border-top: none;
			}
			 li {
			    height: 38px;
			    line-height: 38px;
			    overflow: hidden;
			    .hd {
				    float: left;
				    width: 72px;
				    height: 38px;
				    overflow: hidden;
				    .num {
					    float: left;
					    display: inline;
					    padding-left: 5px;
					    padding-right: 8px;
					    width: 37px;
					    text-align: right;
					    overflow: hidden;
					    text-overflow: ellipsis;
					    white-space: nowrap;
					    font-size: 16px;
					    color: #666;
					}
				}
				.song {
				    float: left;
				    position: relative;
				    z-index: 1;
				    zoom: 1;
				    padding-left: 10px;
				    width: 510px;
				    height: 38px;
				    overflow: hidden;
				    .tt {
					    float: left;
					    width: 100%;
					    .txt {
						    position: relative;
						    display: inline-block;
						    max-width: 99%;
						    overflow: hidden;
						    text-overflow: ellipsis;
						    white-space: nowrap;
						    
						}
						 .ar em {
						    margin: 0 5px;
						}
					}
				}
				 .tops {
				    float: right;
				    position: relative;
				    z-index: 1;
				    zoom: 1;
				    width: 319px;
				    height: 38px;
				    line-height: 38px;
				     span.bg {
					    position: absolute;
					    z-index: 1;
					    width: 100%;
					    height: 38px;
					    background-color: #4eb4f5;
					    opacity: 0.1;
					    filter: Alpha(opacity=10);
					}

				}
			}
			.ply {
			    float: right;
			    display: inline;
			    margin-top: 10px;
			    width: 17px;
			    height: 17px;
			    cursor: pointer;
			    background-position: 0 -103px;
			}
			.opt {
			    position: absolute;
			    z-index: 1;
			    right: 0;
			    top: 11px;
			    display: none;
			    width: 92px;
			    height: 20px;
			    overflow: hidden;
			}
			 .icn-add {
			    float: left;
			    margin-top: 2px;
			}
			span.icn {
			    float: left;
			    width: 18px;
			    height: 16px;
			    margin: 2px 0 0 8px;
			    overflow: hidden;
			    text-indent: -999px;
			    cursor: pointer;
			}
			 span.icn-fav {
			    background-position: 0 -174px;
			}
			span.icn-share {
			    background-position: 0 -195px;
			}
			span.icn-dl {
			    background-position: -81px -174px;
			}
			li.even {
			    background-color: #f7f7f7;
			}
			li:hover {
			    background: #eeeeee;
			    .opt {
				    display: block;
				}
			}
			.ply:hover {
			    background-position: 0 -128px;
			}
			span.icn-fav:hover {
			    background-position: -20px -174px;
			}
			span.icn-share:hover {
			    background-position: -20px -195px;
			}
			span.icn-dl:hover {
			    background-position: -104px -174px;
			}
			 .more {
			    height: 32px;
			    line-height: 32px;
			    text-align: right;
			     a {
				    color: #666;
				}
			}
		}
		.u-icn-81 {
		    width: 13px;
		    height: 13px;
		    background-position: 0 -700px;
		}
		.u-icn-81:hover {
		    background-position: -22px -700px;
		}
		.n-nmusic {
		    padding: 105px 0 105px 0;
		    text-align: center;
		     h3 {
			    padding-bottom: 38px;
			    font-size: 18px;
			}
			.u-icn-21 {
			    margin-right: 17px;
			}
		}
		.u-icn-21 {
		    width: 64px;
		    height: 50px;
		    background-position: 0 -347px;
		}
		.m-record .ply-z-slt, .m-record .ply-z-slt:hover {
		    background-position: -20px -128px;
		}
	}
</style>