<template>
	<div id="album-src">
		<div id="auto-id-0Eu40gNHJe1vdXrI" v-if="albumData">
			<div class="src f-cb">
				<div class="cover cover-alb u-dicn u-dicn-23">
					<span class="lnk">
						<img :src="albumData.album.blurPicUrl+'?param=40y40&amp;quality=100'" />
						<span class="ply u-dicn u-dicn-8 f-alpha" data-log="event" :data-event-id="albumData.friendId" data-res-action="play" data-res-type="19" :data-res-id="albumData.album.id" @click.stop="plays($event)"></span>
					</span>
				</div>
				<div class="scnt src-alb">
					<h3 class="tit f-thide f-fs1">
						<span class="tag u-dtag">
							{{albumData.album.type}}
							<i class="rt"></i>
						</span>
						<router-link :to="{path:'/album',query:{id:albumData.album.id}}" class="s-fc1">{{albumData.album.name}}</router-link>
					</h3>
					<h4 class="from f-thide s-fc3">
						<router-link :to="{path:'/artist',query:{id:item.id}}" v-for="(item,index) in albumData.album.artists" class="s-fc3" v-bind:key="index">{{index == albumData.album.artists.length-1&&item.name||(item.name+'/')}}</router-link>
					</h4>
				</div>
			</div>
		</div>
		<relay-src v-bind:pics="pics" v-bind:widthXT="224" v-bind:heightYT="224" v-bind:widthX="525" v-bind:heightY="10000" v-if="pics"></relay-src>
	</div>
</template>

<script>
	import relaySrc from '@/components/publics/relay-src.vue'
	export default {
  name: 'albumSrc',
  props:['albumData','pics'],
  data () {
    return {}
     
  },
   components:{
  	relaySrc
  },
  inject:['reload'],//app.vueҳ���ж����¼���
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		console.log(this.albumData)
		console.log(this.pics)
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
        	plays($event){
        		if($event.target.getAttribute('data-res-action') == 'play'){
						console.log($event)
						this.$root.eventVue.$emit('playid', 
						{resId:$event.target.getAttribute('data-res-id'),
						resData:$event.target.getAttribute('data-res-data'),
						resType:$event.target.getAttribute('data-res-type'),
						resFrom:$event.target.getAttribute('data-res-from'),
						resIdx:$event.target.getAttribute('data-res-idx'),
						eventId:$event.target.getAttribute('data-event-id'),
						})
					this.$root.eventVue.$emit('songsNum', 0)
					this.$localUtil('songsList',0)
					
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

<style  lang="less" >
	#album-src{
		text-align: left;
		.src, .m-dlist .card,  .hotrecmt .bar,  .showpic {
		    background: #f5f5f5;
		}
		 .src {
		    display: block;
		    position: relative;
		    padding: 10px;
		    margin: 4px 0 5px;
		    .cover {
			    position: relative;
			    zoom: 1;
			    width: 40px;
			    height: 40px;
			    float: left;
			    img {
				    width: 40px !important;
				    height: 40px;
				    display: block;
				}
				.ply {
				    display: none;
				    position: absolute;
				    top: 0;
				    left: 0;
				    width: 40px;
				    height: 40px;
				    margin: 0;
				    background-position: -100px -70px;
				    _background-position: 0 0;
				    opacity: 0.8;
				    filter: Alpha(opacity=80);
				    cursor: pointer;
				}
			}
			 .scnt {
			    display: block;
			    position: absolute;
			    top: 10px;
			    left: 60px;
			    right: 30px;
			    height: 40px;
			    line-height: 22px;
			    .tit .tag {
				    position: relative;
				    top: -1px;
				    zoom: 1;
				}
			}
			.cover-alb {
			    width: 50px;
			}
			.tag {
			    margin-right: 6px;
			}
			.src-alb.scnt {
			    left: 70px;
			}
		}
	 .src .cover:hover .ply,  .src .cover-ply .ply {
		    display: block;
		    z-index: 200;
		}
		.m-timeline h3 {
		    margin-top: -2px;
		}
		 h3,  h4 {
		    font-weight: normal;
		}
		.u-dicn-23 {
		    background-position: right -70px;
		}
		.u-dtag {
		    color: #e03f40;
		    padding: 0 2px 0 3px;
		    background-position: -110px 0;
		    line-height: 16px;
		    .rt {
			    position: absolute;
			    top: 0;
			    right: 0px;
			    display: block;
			    width: 3px;
			    background-position: right 0;
			}
		}
		.u-dtag, .u-dtag .rt {
		    /*position: relative;*/
		    display: inline-block;
		    height: 16px;
		    font-size: 12px;
		}
	}
</style>