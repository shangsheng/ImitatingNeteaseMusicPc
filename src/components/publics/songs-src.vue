<template>
	<div id="songs-src">
		<div id="auto-id-0Eu40gNHJe1vdXrI" v-if="songData">
			<div class="src f-cb">
				<div class="cover cover-ply">
					<span class="lnk">
						<img :src="songData.song.album.picUrl+'?param=40y40&amp;quality=100'" />
						<span class="ply u-dicn u-dicn-8 f-alpha" data-log="event" :data-event-id="songData.friendId" data-res-action="play" data-res-type="18" :data-res-id="songData.song.id" @click.stop="plays($event)"></span>
					</span>
				</div>
				<div class="scnt">
					<h3 class="tit f-thide f-fs1">
						<router-link :to="{path:'/song',query:{id:songData.song.id}}" class="s-fc1">{{songData.song.name}}</router-link>
					</h3>
					<h4 class="from f-thide s-fc3">
						<router-link :to="{path:'/artist',query:{id:item.id}}" v-for="(item,index) in songData.song.artists">{{index == songData.song.artists.length-1&&item.name||(item.name+'/')}}</router-link>
					</h4>
				</div>
			</div>
		</div>
		<relay-src v-bind:pics="pics" v-bind:widthXT="338" v-bind:heightYT="0" v-bind:widthX="525" v-bind:heightY="10000" v-if="pics"></relay-src>
	</div>
</template>

<script>
	import relaySrc from '@/components/publics/relay-src.vue'
	export default {
  name: 'songSrc',
  props:['songData','pics'],
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
		console.log(this.songData)
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

<style  lang="less">
	#songs-src{
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
				    width: 40px;
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
	}
</style>