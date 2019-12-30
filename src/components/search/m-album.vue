<template>
	<div id="m-album">
		<div class="ztag j-flag">
			<div class="n-srchrst ztag">
				<ul class="m-cvrlst m-cvrlst-alb3 f-cb" v-if="albumData">
					<li v-for=" item of albumData.albums">
						<div class="u-cover u-cover-alb2">
							<router-link :to="{path:'/album',query:{id:item.id}}">
								<img :src="item.picUrl"/>
								<span class="msk" :title="item.name"></span>
							</router-link>
							<span class="icon-play f-alpha f-fr cursor" data-res-action="play" data-res-type="19" :data-res-id="item.id" @click.stop="playSong"></span>
						</div>
						<p class="dec">
							<router-link :to="{path:'/album',query:{id:item.id}}" class="tit f-thide s-fc0" v-html="searchValue(item.name,albumData.values)"></router-link>
						</p>
						<p>
							
							<span class="nm f-thide" :title="item.artistsTitle">
								<router-link :to="{path:'/artist',query:{id:aItem.id}}" v-for="(aItem,aNum) in item.artists" v-html="searchValue(aNum == item.artists.length-1 && aItem.name || (aItem.name + '/'),albumData.values)"></router-link>
							</span>
						</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
  name: '',
  props:['albumData'],
  data () {
    return {}
     
  },
  inject:['reload'],//app.vueҳ���ж����¼���
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		console.log(this.albumData)
		let that = this;
		 
		 if(this.mAlbumData){
		 	this.$.each(this.albumData.albums,function(index,item){
			 	item.img1v1Url = item.picUrl + "?param=180y180";
			 	that.$.each(item.artists,function(num,el){
			 		let artistsTitle = '';
			 		if(num<item.artists.length-1){
			 			artistsTitle = artistsTitle + el.name + '/'
			 		}else{
			 			artistsTitle = artistsTitle + el.name 
			 		}
			 		item.artistsTitle = artistsTitle
			 	})
			 })
		 }
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
	#m-album{
		text-align: left;
		.n-srchrst {
		    margin-top: 20px;
		}
		.m-cvrlst-alb3 {
		    margin-left: -33px;
		     li {
			    padding-left: 33px;
			}
		}
		.m-cvrlst li {
		    float: left;
		    display: inline-block;
		    width: 140px;
		    height: 188px;
		    overflow: hidden;
		    padding: 0 0 30px 38px;
		    line-height: 1.4;
		    .dec {
			    margin: 8px 0 3px;
			    font-size: 14px;
			}
			p{
				width: 100%;
			}
			 .tit {
			    display: inline-block;
			    max-width: 100%;
			    _width: 100%;
			    vertical-align: middle;
			}
			.nm {
			    display: inline-block;
			    max-width: 85%;
			    vertical-align: middle;
			}
		}
		.m-cvrlst-alb2 li, .m-cvrlst-alb3 li {
		    width: 153px;
		    height: 178px;
		}
		.u-cover-alb2 {
		    width: 130px;
		    height: 130px;
		     .msk {
			    width: 153px;
			    height: 130px;
			    background-position: 0 -845px;
			}
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
		.u-cover-alb1 .icon-play, .u-cover-alb2 .icon-play, .u-cover-alb3 .icon-play {
		    display: none;
		    _display: block;
		}
		.u-cover-alb2 .icon-play:hover, .u-cover-alb3 .icon-play:hover, .u-cover-9 .icon-play:hover {
		    background-position: 0 -170px;
		    _background-position: 0 0;
		}
		.u-cover-alb1:hover .icon-play, .u-cover-alb2:hover .icon-play, .u-cover-alb3:hover .icon-play {
		    display: block;
		}
	}
</style>