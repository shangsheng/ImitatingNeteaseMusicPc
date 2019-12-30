<template>
	<div id="djBanner" v-wechat-title="this.title">
		<div class="rditype f-pr f-cb">
			<div v-swiper:myDjSwiper="swiperOption" >
				<div class="swiper-wrapper boxes j-flag muti"  >
					<div class="swiper-slide  f-cb " >
					    <div class="li" :class="{'liMargin':index%9==0}" v-for="(item,index) in djCatelist" v-if="index<18">
					    	<router-link :to="{path:'/discover/djradio/category',query:{id:item.id}}" :class="{'z-sel':zSel==item.id}">
					    		<div class="icon" :style="{backgroundImage: 'url(' + item.picWebUrl + ')'}"></div>
					    		<em>{{item.name}}</em>
					    	</router-link>
					    </div>
					</div>
					<div class="swiper-slide  f-cb " >
					    <div class="li" :class="{'liMargin':index%9==0}" v-for="(item,index) in djCatelist" v-if="index>17">
					    	<router-link :to="{path:'/discover/djradio/category',query:{id:item.id}}" :class="{'z-sel':zSel==item.id}">
					    		<div class="icon" :style="{backgroundImage: 'url(' + item.picWebUrl + ')'}"></div>
					    		<em>{{item.name}}</em>
					    	</router-link>
					    </div>
					</div>
				</div>		
			 	<div class="swiper-pagination"></div>
			 </div>
			 <span class="turn turn-left j-flag z-dis swiper-button-prev" data-action="prev">向左</span>
			 <span class="turn turn-right j-flag swiper-button-next" data-action="next">向右</span>
		</div>
	</div>
</template>

<script>
	export default {
	name:'djBanner',
    data () {
      return {
        djCatelist:null,
        swiperOption: {
		     
				  observer: true,//修改swiper自己或子元素时，自动初始化swiper
          		  observeParents: true,//修改swiper的父元素时，自动初始化swiper
		          pagination: {
		            el: '.swiper-pagination',
					clickable :true,
		          },
		          navigation: {
				      nextEl: '.swiper-button-next',
				      prevEl: '.swiper-button-prev',
				    },
		    },
		zSlt:'dt',
		zSel:0,
		title:'电台主播'
      }
    },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			var id = this.$route.query.id;
			var that = this;
			that.$http({
		         	method:'get',
		         	url:that.$host + "/dj/catelist",
		         }).then(function(res){
		         	console.log(res.data)
		         	that.djCatelist = res.data.categories
		         }).catch(res=>{
		         	console.log('请求失败：'+res.data+','+res.statusText);
		         })
		         this.zSel = id;
		        this.$root.eventVue.$emit('zSltV',this.zSlt)
        },
        beforeMount: function () {
//          debugger;
			
        },
        mounted: function () {
//          debugger;
			
			this.myDjSwiper.slideTo(0, 1000, true)
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
        //监听
        watch: {
            '$route' (to, from) {

                console.log(to)
                console.log(from)
                //加判断主要发现这个加载了之后，容易引起其他页面也发送请求，所以加了笨方法，加了条件判断，解决了其他页面请求数据加载的问题
                if(this.$route.query.id){
                    this.getBanner()
                }

            }
        },
        methods:{
        	getBanner(){
        		var id = this.$route.query.id;
				var that = this;
				that.$http({
		         	method:'get',
		         	url:that.$host + "/dj/catelist",
		         }).then(function(res){
		         	console.log(res.data)
		         	that.djCatelist = res.data.categories
		         	
		         	that.$.each(res.data.categories,function(index,el){
		         		if(id == el.id){
		         			that.title = el.name + ' - 主播电台 - 我的云音乐'
		         		}
		         	})
		         }).catch(res=>{
		         	console.log('请求失败：'+res.data+','+res.statusText);
		         })
		         this.zSel = id;
        	}
        }
  }
</script>

<style lang="less">
	.m-radio {
		.rditype {
		    margin-bottom: 20px;
		    .boxes.muti {
			    height: 194px;
			}
			.boxes {
			    /*overflow: hidden;*/
			    max-height: 194px;
			}
			.li {
			    float: left;
			    margin: 0 0 25px 36px;
			}
			.liMargin{
				margin-left: 0;
			}
			a {
			    display: block;
			    width: 70px;
			    height: 70px;
			    background-position: 0 9999px;
			    text-align: center;
			    color: #888;
			     em {
				    margin-top: -3px;
				}
			}
			a:hover {
			    background-position: 0 0;
			    text-decoration: none;
			}
			 .icon {
			    width: 48px;
			    height: 48px;
			    margin: 2px auto 0;
			    background-position: 0 0;
			}
			a.z-sel {
				.icon {
				    background-position: -48px 0;
				}
			}
			.turn {
			    position: absolute;
			    top: 50%;
			    width: 20px;
			    height: 30px;
			    margin-top: -15px;
			    opacity: 0.25;
			    filter: alpha(opacity=25);
			    text-indent: -9999px;
			    cursor: pointer;
			}
			.swiper-button-prev.swiper-button-disabled, .swiper-button-next.swiper-button-disabled {
			    opacity: 0.08;
			    cursor: auto;
			    pointer-events: none;
			}
			.turn-left {
			    left: -26px;
			    background-position: 0 -30px;
			}
			
			.turn-right {
			    right: -26px;
			    background-position: -30px -30px;
			}
			 .swiper-pagination-bullet {
				    display: inline-block;
				    width: 20px;
				    height: 20px;
				    background-position: 0 0;
				    text-indent: -9999px;
				    cursor: pointer;
				    opacity: 1;
				}
			.swiper-pagination-bullet-active {
			    opacity: 1;
			    background-position: -30px 0;
			}
			.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
			    bottom: 0px;
			    left: 0;
			    width: 100%;
			}
		}
	}
	.m-radio .rditype a.z-sel, .m-radio .rditype a.z-sel:hover {
	    background-position: -70px 0;
	    color: #d35757;
	}
</style>