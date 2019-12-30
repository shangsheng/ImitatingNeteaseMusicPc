<template>
	<div id="userCvrlst">
		<div class="cHeader" v-if="cHeaderData.length>0">
			<div class="u-title u-title-1 f-cb">
				<h3>
					<span class="f-ff2 f-pr">
						{{cHeaderData[0].creator.nickname}}创建的歌单
						<span class="f-pa f-r-black-icon " style="display:inline-block;width:8px;height:8px;top:1px;background-size:cover;"></span>
						&nbsp;({{cHeaderData.length}})
					</span>
				</h3>
			</div>
			<ul class="m-cvrlst f-cb">
				<li v-for="item in cHeaderData">
					<div class="u-cover u-cover-1">
						<img :src="item.coverImgUrl"/>
						<router-link :to="{path:'/playlist',query:{id:item.userId}}" class="msk" :title="item.name"></router-link>
						<div class="bottom">
							<span class="icon-play f-fr cursor" data-res-action="play" title="播放" data-res-type="13" :data-res-id="item.userId" @click.stop="playSong"></span>
							<span class="icon-headset"></span>
							<span class="nb">{{item.playCount}}</span>
						</div>
					</div>
					<p class="dec">
						<router-link :to="{path:'/playlist',query:{id:item.userId}}" :title="item.name" class="tit f-thide s-fc0">{{item.name}}</router-link>
					</p>
				</li>
			</ul>
		</div>
		<div class="sHeader" v-if="sHeaderData.length>0">
			<div class="u-title u-title-1 f-cb">
				<h3>
					<span class="f-ff2 f-pr">
						{{sHeaderData[0].creator.nickname}}收藏的歌单
						<span class="f-pa f-r-black-icon " style="display:inline-block;width:8px;height:8px;top:1px;background-size:cover;"></span>
						&nbsp;({{sHeaderData.length}})
					</span>
				</h3>
			</div>
			<ul class="m-cvrlst f-cb">
				<li v-for="item in sHeaderData">
					<div class="u-cover u-cover-1">
						<img :src="item.coverImgUrl"/>
						<router-link :to="{path:'/playlist',query:{id:item.userId}}" class="msk" :title="item.name"></router-link>
						<div class="bottom">
							<span class="icon-play f-fr cursor" data-res-action="play" title="播放" data-res-type="13" :data-res-id="item.userId" @click.stop="playSong"></span>
							<span class="icon-headset"></span>
							<span class="nb">{{item.playCount}}</span>
						</div>
					</div>
					<p class="dec">
						<router-link :to="{path:'/playlist',query:{id:item.userId}}" :title="item.name" class="tit f-thide s-fc0">{{item.name}}</router-link>
					</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import eventVue from '../../../static/js/eventVue.js'
	export default {
  name: 'userCvrlst',
  data () {
    return {
    	cHeaderData:[],
    	sHeaderData:[]
    }
     
  },
  inject:['reload'],//app.vueҳ���ж����¼���
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		let that = this;
				let id =  this.$route.query.id;
				this.$http({
			        method:'get',
			        url:that.$host +'/user/playlist?uid='+id
			    }).then(function(resp){                            
			        console.log(resp.data);
			       that.$.each(resp.data.playlist,function(index,el){
			       	el.playCount = that.$Playback(el.playCount)
			       	if(el.creator.userId == id){
			       		that.cHeaderData.push(el)
			       	}else{
			       		that.sHeaderData.push(el)
			       	}
			       	console.log(that.sHeaderData)
			       })
			    }).catch(resp => {
			        console.log('请求失败：'+resp.status+','+resp.statusText);
			    });
		 
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
					this.songsNum = $event.target.getAttribute('data-res-index')
					
				}else{
					console.log('点击播放图标不正确')
				}
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
                }

            }
        }
}
</script>

<style  lang="less">
	#userCvrlst{
		.f-pa {
		    position: absolute;
		}
		 .m-cvrlst {
		    margin: 20px 0 0 -50px;
		    li {
			    height: 165px;
			    overflow: hidden;
			}
		}
		.m-cvrlst li {
		    float: left;
		    display: inline-block;
		    width: 140px;
		    height: 188px;
		    overflow: hidden;
		    padding: 0 0 30px 50px;
		    line-height: 1.4;
		    .dec {
			    margin: 8px 0 3px;
			    font-size: 14px;
			}
			 p {
			    width: 100%;
			}
			.tit {
			    display: inline-block;
			    max-width: 100%;
			    _width: 100%;
			    vertical-align: middle;
			}
		}
		.u-cover-1 {
		    width: 140px;
		    height: 140px;
		    .msk {
			    background-position: 0 0;
			}
		}
		.u-cover {
			.icon-play {
			    position: absolute;
			    right: 10px;
			    bottom: 5px;
			    width: 16px;
			    height: 17px;
			    background-position: 0 0;
			}
			.bottom {
			    position: absolute;
			    bottom: 0;
			    left: 0;
			    width: 100%;
			    height: 27px;
			    background-position: 0 -537px;
			    color: #ccc;
			}
			.icon-headset {
			    float: left;
			    width: 14px;
			    height: 11px;
			    background-position: 0 -24px;
			    margin: 9px 5px 9px 10px;
			}
			.nb {
			    float: left;
			    margin: 7px 0 0 0;
			}
			.icon-play:hover {
			    background-position: 0 -60px;
			}
		}
	}
</style>