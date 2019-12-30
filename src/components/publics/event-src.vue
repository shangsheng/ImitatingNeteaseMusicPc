<template>
	<div id="event-src">
		<div class="card" v-if="eventData">
			<div class="text  f-brk j-text" v-html="$addLinks($addNameLinks($addThLinks($addBr(eventSrcData.msg))))"></div>
			<div class="j-flag" v-if="eventSrcData">
				<video-src v-bind:videoData="eventSrcData.video" v-if="eventSrcData.video"></video-src>
				<mv-src v-bind:mvData="eventSrcData.mv" v-else-if="eventSrcData.mv"></mv-src>
				<playlist-src v-bind:playlistData="eventSrcData.playlist" v-bind:pics="eventData.pics" v-else-if="eventSrcData.playlist"></playlist-src>
				<song-src v-bind:songData="eventSrcData" v-bind:pics="eventData.pics" v-else-if="eventSrcData.song"></song-src>
				<album-src v-bind:albumData="eventSrcData" v-bind:pics="eventData.pics" v-else-if="eventSrcData.album"></album-src>
				<event-src v-bind:eventData="eventSrcData" v-else-if="eventSrcData.event"></event-src>
				<resource-src v-bind:resourceData="eventSrcData.resource" v-bind:pics="eventData.pics" v-else-if="eventSrcData.resource"></resource-src>
				<relay-src v-bind:pics="eventData.pics" v-bind:widthXT="170" v-bind:heightYT="338" v-bind:widthX="525" v-bind:heightY="10000" v-else></relay-src>
			</div>
			<div class="doper j-flag">
				<span class="s-fc7 cursor" data-action="like">
					<i class="icn u-dicn u-dicn-3"></i>
					<span class="j-flag" data-count="eventData.type">({{eventData.type}})</span>
				</span>
				<span class="line">|</span>
				<span class="s-fc7 cursor" data-action="forward">
					转发
					<span class="j-flag" data-count="eventData.insiteForwardCount">({{eventData.insiteForwardCount}})</span>
				</span>
				<span class="line">|</span>
				<span class="s-fc7 cursor" data-action="comment">
					评论
					<span class="j-flag" data-count="eventData.info.commentCount">({{eventData.info.commentCount}})</span>
				</span>
				<!--<router-link :to="{path:'/event',query:{id:loginData.profile.userId}}" class="s-fc7">
					评论
					<span class="j-flag" data-count="eventData.info.commentCount">({{eventData.info.commentCount}})</span>
				</router-link>-->
			</div>
		</div>
	</div>
</template>

<script>
	import videoSrc from '@/components/publics/video-src.vue'
	import mvSrc from '@/components/publics/mv-src.vue'
	import playlistSrc from '@/components/publics/playlist-src.vue'
	import relaySrc from '@/components/publics/relay-src.vue'
	import songSrc from '@/components/publics/songs-src.vue'
	import albumSrc from '@/components/publics/album-src.vue'
	import resourceSrc from '@/components/publics/resource-src.vue'
	export default {
  name: 'eventSrc',
  props:['eventData'],
  data () {
    return {
    	eventSrcData:null,
    }
     
  },
   components:{
  	videoSrc,
  	mvSrc,
  	playlistSrc,
  	relaySrc,
  	songSrc,
  	albumSrc,
  	resourceSrc
  },
  inject:['reload'],//app.vueҳ���ж����¼���
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		console.log(this.eventData)
		if(this.eventData){
			 this.eventSrcData = JSON.parse(this.eventData.json);
		 	this.eventSrcData.friendId = this.eventData.id;
		}
		
		 console.log(this.eventSrcData)
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
	#event-src{
		text-align: left;
		 .src,  .card,  .hotrecmt .bar,  .showpic {
		    background: #f5f5f5;
		}
		.card {
		    padding: 10px;
		    margin: 4px 0 5px;
		    .text {
			    color: #666;
			    margin-top: 0;
    			font-size: 12px;
    			line-height: 24px;
			    word-break: break-word;
			}
			.doper {
			    margin-top: 10px;
			    opacity: 0.5;
			    filter: Alpha(opacity=50);
			}
		}
		.doper {
		    margin: 18px 0 -2px;
		    text-align: right;
		    line-height: normal;
		    .icn {
			    margin: -1px 3px 0 0;
			}
		}
		.u-dicn-3, .u-dicn-4, .u-dicn-5, .u-dicn-6 {
		    width: 14px;
		    height: 14px;
		    background-position: 0 -20px;
		}
		 .doper .u-dicn-3,  .doper .u-dicn-4 {
		    margin-top: 0px;
		}
	}
</style>