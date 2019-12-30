<template>
	<div id="artistAlbum">
		<ul class="m-cvrlst m-cvrlst-alb4 f-cb" v-if="artistAlbums">
			<li v-for="item in artistAlbums.hotAlbums">
				<div class="u-cover u-cover-alb3">
					<img :src="item.picUrl"/>
					<router-link :to="{path:'/album',query:{id:item.id}}" class="msk"></router-link>
					<span class="icon-play f-alpha cursor" data-res-action="play" data-res-type="19" :data-res-id="item.id" title="播放" @click.stop="playSong($event)"></span>
				</div>
				<p class="dec dec-1 f-thide2 f-pre" :title="item.name">
					<router-link :to="{path:'/album',query:{id:item.id}}" class="tit s-fc0">{{item.name}}</router-link>
				</p>
				<p>
					<span class="s-fc3">{{item.publishTime}}</span>
				</p>
			</li>
		</ul>
		<div class="u-load s-fc4" v-else>
			<i class="icn"></i>			
		</div>
		<pager v-bind:pageMovers="albumMover" v-bind:pageLength="albumLength" v-bind:limit="albumLimit" v-if="albumLength >1" v-on:listenToChild="playlistPagerChild"></pager>
	</div>
</template>

<script>
	import pager from '@/components/publics/pager.vue'
	export default {
	name:'artistAlbum',
	props:['artistAlbums','albumLimit'],
    data () {
      return {
        albumMover:false,
        albumLength:0,
        
      }
    },
     components: {
	    pager
	 },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			console.log(this.artistAlbums)
			if(this.artistAlbums){
				this.albumMover = this.artistAlbums.more;
				this.albumLength = Math.ceil(this.artistAlbums.artist.albumSize/12);
			}
			
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
        	playlistPagerChild(data){
        		
        		this.$emit("albumsToChild",data);
        	},
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
					
					
				}else{
					console.log('点击播放图标不正确')
				}
       		},
        }
  }
</script>

<style lang="less">
	#artistAlbum{
		text-align: left;
		.m-cvrlst-alb4 {
		    margin: 20px 0 0 -18px;
		    li {
			    width: 145px;
			    height: 175px;
			    padding-left: 18px;
			    
			}
			.u-cover-alb3 {
			    width: 120px;
			    height: 120px;
			    .msk {
				    width: 145px;
				    height: 120px;
				    background-position: -170px -850px;
				}
				.icon-play {
				    left: 85px;
				}
			}
		}
		.m-cvrlst li .dec-1 {
		    line-height: 19px;
		    max-height: 38px;
		    .tit {
			    display: inline;
			}
		}
		.m-cvrlst li p {
		    width: 100%;
		}
		.f-thide2 {
		    -webkit-line-clamp: 2;
		}
		.m-cvrlst li .dec {
		    margin: 8px 0 3px;
		    font-size: 14px;
		}
		.m-cvrlst li .tit {
		    display: inline-block;
		    max-width: 100%;
		    _width: 100%;
		    vertical-align: middle;
		}
		.u-cover .icon-play {
			    position: absolute;
			    right: 10px;
			    bottom: 5px;
			    width: 16px;
			    height: 17px;
			    background-position: 0 0;
			}
		.u-cover-alb2 .icon-play, .u-cover-alb3 .icon-play, .u-cover-9 .icon-play {
		    left: 94px;
		    width: 28px;
		    height: 28px;
		    background-position: 0 -140px;
		    _background-position: 0 0;
		}
	}
</style>