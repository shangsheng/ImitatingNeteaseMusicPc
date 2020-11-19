<template>
	<div id="playlist-src">
		<div id="auto-id-fm67POSwvIW3OG75" v-if="playlistData">
			<div class="src f-cb">
				<div class="cover">
					<span class="lnk">
						<img :src="playlistData.coverImgUrl"/>
						<span class="ply u-dicn u-dicn-8 f-alpha" data-res-action="play" data-res-type="13" :data-res-id="playlistData.id" data-log="event" :data-event-id="playlistData.friendId" @click.stop="plays($event)"></span>
					</span>
				</div>
				<div class="scnt">
					<h3 class="tit f-thide s-fc1 f-fs1">
						<span class="tag u-dtag">
							歌单
							<i class="rt"></i>
						</span>
						<router-link :to="{path:'/playlist',query:{id:playlistData.id}}" class="s-fc1">{{playlistData.name}}</router-link>
					</h3>
					<h4 class="from f-thide s-fc3">
						by
						<router-link :to="{path:'/user/home',query:{id:playlistData.creator.userId}}" class="s-fc3">{{playlistData.creator.nickname}}</router-link>
					</h4>
				</div>
			</div>
		</div>
		<div id="auto-id-wOXeigMtHN3od2L4">
			<ul class="pics f-cb j-flag" :class="{'f-hide':!slideBulean}">
				<li class="pic pic-s " :class="{'clear':index%3==0}" data-action="expand" :data-index="index" v-for="(item,index) in pics" @click.stop="swiperImg($event)">
					<img :src="item.pcSquareUrl+'?param=110y110&amp;quality=100'" class="f-img j-img f-curbig"/>
				</li>
			</ul>
			<div class="showpic j-flag " :class="{'f-hide':slideBulean}">
				<div class="btns">
					<span class="btn s-fc3 cursor" @click.stop="zHideBollen(false)">
						<i class="icn u-dicn u-dicn-18"></i>
						收起
					</span>
					<span class="line">|</span>
					<span class="btn s-fc3 cursor" @click.stop="originbollen(true)">
						<i class="icn u-dicn u-dicn-30"></i>
						查看原图
					</span>
					<span class="line">|</span>
					<a :href="pics[dowImgSrc].originUrl+'?param=525x10000'" class="btn s-fc3 j-flag" target="_blank">
						<i class="icn u-dicn u-dicn-31"></i>
						下载
					</a>
				</div>
				<div class="slide f-sltnone f-pr"  >
					 <swiper :options="swiperOption" ref="mySwiper"  >
					    <swiper-slide v-for="(slide, index) in pics" :key="index">
					    	<img :src="slide.originUrl+'?param=525x10000'" class="j-flag thepic f-cursml"/>
					    </swiper-slide>
					    
					    <div class="swiper-button-prev f-curleft slt-prev"></div><!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
    					<div class="swiper-button-next f-curright slt-next"></div><!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
					 </swiper>
					 <div class="swiper-pagination slide-pagination" slot="pagination"></div>
				</div>
			</div>
		</div>
		<div id="auto-id-kOb4UJCOgm4gtc2t" class="m-timelineslide f-sltnone" :class="{'f-hide':originHide}">
			<div class="mask f-alpha">
				<div class="picbody j-flag">
					<div class="fail fail-loading j-flag f-hide"></div>
					<div class="picwrap f-pr">
						<swiper :options="swiperOptionOrigin" ref="mySwiperOrigin"  >
						    <swiper-slide v-for="(slide, index) in pics" :key="index">
						    	<img :src="slide.originUrl" class="j-flag thepic"/>
						    </swiper-slide>
						    
						    <div class="swiper-button-prev f-curleft origin-prev"></div><!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
	    					<div class="swiper-button-next f-curright origin-next"></div><!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
						 </swiper>
						 <div class="swiper-pagination origin-pagination" slot="pagination"></div>
					</div>
				</div>
				<a :href="pics[dowImgOrigin].originUrl+'?param=999y9999'" class="btn btn-dld f-alpha f-pa j-flag" target="_blank"></a>
				<button class="btn btn-cls f-alpha f-pa cursor" @click.stop="originbollen(false)"></button>
			</div>
		</div>
	</div>
</template>

<script>
	import eventVue from '../../../static/js/eventVue.js'
	export default {
  name: 'playlistSrc',
  props:['playlistData','pics'],
  data () {
  	let _this = this
    return {
    	swiperOption:{
    		pagination: {
			    el: '.slide-pagination',
			    clickable :true,
			 },
		　　autoplay: false,
		　　autoplayDisableOnInteraction: false,
		　　loop: false,
		　　effect : 'fade',
			navigation: {
		      nextEl: '.slt-next',
		      prevEl: '.slt-prev',
		    },
		    on:{
		    	slideChange() {
		    		_this.dowImgSrc = this.activeIndex
		    		_this.dowImgOrigin = this.activeIndex
		    		_this.origin.slideTo(this.activeIndex, 1000, false);
		    	},
		    	click($event){
		    		console.log($event)
		    		if($event.clientX<536&&$event.clientX>392)
		    		_this.slideBulean = true
		    	}
		    }
    	},
    	dowImgSrc:0,
    	slideBulean:true,
    	originHide:true,
    	swiperOptionOrigin:{
    		pagination: {
			    el: '.origin-pagination',
			    clickable :true,
			 },
			autoplay: false,
		　　autoplayDisableOnInteraction: false,
		　　loop: false,
		　　effect : 'fade',
			fadeEffect: {
			    crossFade: true,
			},
			navigation: {
		      nextEl: '.origin-next',
		      prevEl: '.origin-prev',
		    },
		    on:{
		    	slideChange() {
		    		_this.dowImgOrigin = this.activeIndex
		    	},
		    	
		    }
    	},
    	dowImgOrigin:0,
    	 
    }
     
  },
  inject:['reload'],//app.vueҳ���ж����¼���
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		console.log(this.playlistData)
		 
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
		computed: {
	      swiper() {
	        return this.$refs.mySwiper.swiper
	      },
	      origin(){
	      	return this.$refs.mySwiperOrigin.swiper
	      }
	   },
        methods:{
        	swiperImg($event){
        		console.log($event)
        		let index = $event.path[1].dataset.index
        		console.log(index)
        		this.swiper.slideTo(index, 1000, false);
        		this.dowImgSrc = index;
        		this.slideBulean = false;
        		this.dowImgOrigin = index;
        		this.origin.slideTo(index, 1000, false);
        	},
        	zHideBollen(booleans){
        		if(booleans){
        			this.slideBulean = false
        		}else{
        			this.slideBulean = true
        		}
        	},
        	originbollen(booleans){
        		if(booleans){
        			this.originHide = false
        		}else{
        			this.originHide = true
        		}
        	},
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

<style  lang="less" >
	#playlist-src{
		text-align: left;
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
			     .tit {
			     	.tag {
					    position: relative;
					    top: -1px;
					    zoom: 1;
					}
			     }
			}
			.tag {
			    margin-right: 6px;
			}
		}
		 .src,  .card,  .hotrecmt .bar,  .showpic {
		    background: #f5f5f5;
		}
		 .src .cover:hover .ply,  .src .cover-ply .ply {
		    display: block;
		    z-index: 200;
		}
		.u-dtag {
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
			    height: 16px;
    			font-size: 12px;
			}
		}
		.u-dtag {
		    color: #e03f40;
		}
		.pics .pic,  .showpic .slide {
		    background-repeat: no-repeat;
		    background-position: center center;
		}
		.pics {
			.clear {
			    clear: left;
			}
			 .pic {
			    float: left;
			    position: relative;
			    zoom: 1;
			    width: 224px;
			    height: 224px;
			    margin-left: 4px;
			    margin-top: 4px;
			    background-color: #e5e5e5;
			}
			.pic-s {
			    width: 110px;
			    height: 110px;
			}
			 img {
			    display: block;
			    width: 100%;
			    height: 100%;
			}
		}
		.f-img, .f-blk {
		    display: block;
		    width: 100%;
		    height: 100%;
		}
		.showpic .slide {
		    width: 525px;
		    padding-top: 1px;
		    min-height: 306px;
		    _height: 306px;
		    margin: 0 auto;
		     .thepic {
			    display: block;
			    min-width: 100px;
			    min-height: 100px;
			    max-width: 100%;
			    margin: 0 auto;
			}
		}
		.swiper-button-next, .swiper-container-rtl .swiper-button-prev {
		    background-image: none;
		    right: 0px;
		    left: auto;
		    top: 22px;
		    width: 175px;
		    height: 100%;
		}
		.swiper-button-prev, .swiper-container-rtl .swiper-button-next {
		    background-image: none;
		    left: 0px;
		    right: auto;
		    width: 175px;
		    height: 100%;
		    top:22px;
		}
		.swiper-pagination-bullet {
		    display: inline-block;
		    border-radius: 100%;
		    background: url('../../assets/frd_dyn_sprite.png') 0 9999px no-repeat;
		    width: 16px;
		    height: 16px;
		    cursor: pointer;
		    opacity: 0.8;
		    filter: Alpha(opacity=80);
		    background-position: -80px -130px;
		}
		.swiper-pagination-bullet-active {
		    opacity: 1;
		    background-position: -80px -150px;
		}
		.swiper-pagination {
     		position: static; 
		    text-align: center;
		    -webkit-transition: 300ms opacity;
		    -o-transition: 300ms opacity;
		    transition: 300ms opacity;
		    -webkit-transform: translate3d(0, 0, 0);
		    transform: translate3d(0, 0, 0);
		    z-index: 10;
		}
		.showpic {
			.btns {
			    padding: 12px 0 12px 20px;
			    line-height: normal;
			    .icn {
				    margin: 1px 2px 0 0;
				}
				.line {
				    margin: 0 7px 0 10px;
				    color: #ddd;
				}
				
			}
		}
		.u-dicn-18 {
		    width: 13px;
		    height: 13px;
		    background-position: -108px -19px;
		}
		.u-dicn-30 {
		    width: 13px;
		    height: 13px;
		    background-position: -180px -20px;
		}
		.u-dicn-31 {
		    width: 14px;
		    height: 13px;
		    background-position: -45px -58px;
		}
		.u-dtag, .u-dtag .rt {
		    /*position: relative;*/
		    display: inline-block;
		    height: 16px;
		    font-size: 12px;
		}
		.m-timelineslide, .m-timelineslide .mask, .m-timelineslide .picbody {
		    position: fixed;
		    _position: absolute;
		    top: 0;
		    right: 0;
		    bottom: 0;
		    left: 0;
		    width: 100%;
		    height: 100%;
		    z-index: 1000;
		}
		.f-sltnone {
		    -moz-user-select: none;
		    -webkit-user-select: none;
		    -ms-user-select: none;
		    user-select: none;
		}
		.m-timelineslide{
			.mask {
			    background: #000;
			    opacity: 0.9;
			    filter: Alpha(opacity=90);
			}
			 .picbody {
			    overflow: auto;
			    overflow-x: hidden;
			    text-align: center;
			}
			.fail-loading {
			    background-image: url('../../assets/loading_showpic.gif');
			}
			 .fail {
			    background: url('../../assets/show_pic_fail.png') no-repeat center center;
			}
			.picwrap {
			    margin: 0 120px;
			    height: 100%;
			    img {
				    max-width: 100%;
				    margin-top: 10px;
				    vertical-align: middle;
				}
			}
			 .btn-dld {
			    background: url('../../assets/frd_show_dld.png') no-repeat center center;
			    opacity: 0.6;
			    filter: Alpha(opacity=80);
			    left: 50%;
			    bottom: 130px;
			    width: 78px;
			    height: 32px;
			    margin-left: -39px;
			    border: none;
			    text-indent: -9999px;
			    z-index: 1020;
			}
			 button {
			    background: transparent;
			    border: none;
			}
			.btn-cls {
			    background: url('../../assets/frd_show_cls.png') no-repeat center center;
			    opacity: 0.4;
			    filter: Alpha(opacity=40);
			    width: 40px;
			    height: 40px;
			    top: 30px;
			    right: 30px;
			    z-index: 1020;
			}
			.btn-cls:hover {
			    opacity: 0.7;
			    filter: Alpha(opacity=70);
			}
			.origin-next, .swiper-container-rtl .origin-prev {
			    background-image: none;
			    right: 0px;
			    left: auto;
			    top: 0px;
			    width: 50%;
			    height: 100%;
			}
			.origin-prev, .swiper-container-rtl .origin-next {
			    background-image: none;
			    left: 0px;
			    right: auto;
			    width: 50%;
			    height: 100%;
			    top:0px;
			}
		} 
	}
</style>