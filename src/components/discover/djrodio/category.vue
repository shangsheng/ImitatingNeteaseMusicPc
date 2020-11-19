<template>
	<div id="discoverCategory" >
		<div class="g-bd">
			<div class="g-wrap m-radio">
				<dj-banner></dj-banner>
				<div class="new" >
					<div class="u-title f-cb">
						<h3>
							<span class="f-ff2">优秀新电台</span>
						</h3>
					</div>
					<ul class="m-rdilist f-cb" v-if="djNewCategory">
						<li v-for="(item,index) of djNewCategory" v-bind:key="index">
							<div v-if="index<5">
								<router-link :to="{path:'/djradio',query:{id:item.id}}" class="u-cover u-cover-rdi2">
									<img :src="item.picUrl"/>
								</router-link>
								<h3 class="f-fs2">
									<router-link :to="{path:'/djradio',query:{id:item.id}}" :title="item.name" class="s-fc1">{{item.name}}</router-link>
								</h3>
								<p class="f-thide2 s-fc4">{{item.rcmdtext}}</p>
							</div>
						</li>
					</ul>
					<div class="u-load s-fc4" v-else>
						<i class="icn"></i>			
					</div>
				</div>
				<div class="rdimore" >
					<div class="u-title f-cb">
						<h3>
							<span class="f-ff2">电台排行榜</span>
						</h3>
						<div class="tab tab-r">
							<!--<span data-res-action="order" data-res-order="1" class=" cursor">
								上升最快
							</span>
							<span class="line">|</span>-->
							<span data-res-action="order" data-res-order="0" class="cursor z-sel">
								最热电台
							</span>
						</div>
					</div>
					<ul class="rdilist rdilist-2 f-cb" v-if="djRdilist">
						<li v-for="(item,index) in djRdilist" v-bind:key="index">
							<router-link :to="{path:'/djradio',query:{id:item.id}}" class="cvr u-cover u-cover-rdi f-fl">
								<img :src="item.picUrl"/>
							</router-link>
							<div class="cnt">
								<h3 class="f-fs3">
									<router-link :to="{path:'/djradio',query:{id:item.id}}" :title="item.name">{{item.name}}</router-link>
								</h3>
								<p class="note">
									<i class="u-icn u-icn-27"></i>
									<router-link :to="{path:'/user/home',query:{id:item.dj.userId}}" class="sep f-brk" :title="item.dj.nickname">{{item.dj.nickname}}</router-link>
									<span class="u-icn " :class="[item.dj.userType == 200?'u-icn-84':'']"></span>
									<span class="u-icn " :class="[item.dj.vipType == 11&&item.dj.userType == 2?'u-icn-1':'']"></span>
									<span class="u-icn u-icn2 " :class="[item.dj.vipType == 11&&item.dj.userType == 4?'u-icn2-music2':'']"></span>
								</p>
								<p class="s-fc4">
									<!--共 期-->&nbsp;&nbsp;&nbsp;订阅 {{item.subCount}}次
								</p>
							</div>
						</li>
					</ul>
					<div class="u-load s-fc4" v-else>
						<i class="icn"></i>			
					</div>
					<pager v-bind:pageMovers="playlistMover" v-bind:pageLength="playlistLength" v-bind:limit="limit" v-if="playlistLength >= 20" v-on:listenToChild="playlistPagerChild"></pager>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import pager from '@/components/publics/pager.vue'
	export default {
	name:"discoverCategory",
    data () {
      return {
        djNewCategory:null,
        djRdilist:null,
        offset:0,
        limit:30,
        hot:'hot',
        playlistLength:0,
        playlistMover:true,
        hotBoule:true,
       	
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
			let id = this.$route.query.id;
			var that = this;
			that.$http({
		         	method:'get',
		         	url:that.$host + "/dj/recommend/type?type="+id,
		         }).then(function(res){
		         	console.log(res.data)
		         	that.djNewCategory = res.data.djRadios
		         	
		         }).catch(res=>{
		         	console.log('请求失败：'+res.data+','+res.statusText);
		         })
		    that.$http({
		         	method:'get',
		         	url:that.$host + "/dj/radio/hot?cateId="+id+"&offset="+that.offset+"&limit="+that.limit,
		         }).then(function(res){
		         	console.log(res.data)
		         	that.djRdilist = res.data.djRadios
		         	
		         	that.playlistLength = Math.ceil(res.data.count/(that.limit+4))
		         	that.playlistMover = res.data.hasMore
		         }).catch(res=>{
		         	console.log('请求失败：'+res.data+','+res.statusText);
		         })
        },
        beforeMount: function () {
//          debugger;
        },
        mounted: function () {
//          debugger;
			
        },
        deactivated: function(){
            //alert("keepAlive停用");
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
        watch: {
            '$route' (to, from) {

                console.log(to)
                console.log(from)
                //加判断主要发现这个加载了之后，容易引起其他页面也发送请求，所以加了笨方法，加了条件判断，解决了其他页面请求数据加载的问题
                if(this.$route.query.id){
                    this.getCategory()
                }

            }
        },
        methods:{
        	getCategory(){
        		let id = this.$route.query.id;
				var that = this;
				that.$http({
		         	method:'get',
		         	url:that.$host + "/dj/recommend/type?type="+id,
		         }).then(function(res){
		         	console.log(res.data)
		         	that.djNewCategory = res.data.djRadios
		         	
		         }).catch(res=>{
		         	console.log('请求失败：'+res.data+','+res.statusText);
		         })
        	},
        	playlistPagerChild(data){
        		var that = this;
        		that.offset = data;
        		var id = this.$route.query.id;
        		this.httpCategory(id,data,that.limit)
        	},
        	httpCategory(id,offset,limit){
        		let that = this;
        		 that.$http({
		         	method:'get',
		         	url:that.$host + "/dj/radio/hot?cateId="+id+"&offset="+offset+"&limit="+limit,
		         }).then(function(res){
		         	console.log(res.data)
		         	that.djRdilist = res.data.djRadios
		         	
		         }).catch(res=>{
		         	console.log('请求失败：'+res.data+','+res.statusText);
		         })
        	},
        	hotNew(){
        		if(this.hotBoule){
        			this.hotBoule = false;
        			this.hot = 'new'
        		}else{
        			this.hotBoule = true;
        			this.hot = 'hot'
        		}
        	}
        }
  }
</script>

<style lang="less" scoped>
#discoverCategory{
	text-align: left;
	.g-wrap {
	    padding: 40px;
	}
	.m-radio {
		.new {
		    margin-top: 10px;
		}
		.rdimore {
		    margin-top: 35px;
		}
		.rdilist {
		    margin-left: -30px;
		    li {
			    float: left;
			    width: 435px;
			    height: 120px;
			    margin-left: 30px;
			    _margin-left: 15px;
			    padding: 20px 0;
			    border-bottom: 1px solid #e7e7e7;
			    .cvr {
				    margin-right: -200px;
				}
			}
			.cnt {
			    margin-left: 140px;
			}
			.note {
			    margin-bottom: 6px;
			    line-height: 20px;
			}
		}
		.u-cover-rdi {
		    width: 120px;
		    height: 120px;
		}
		.rdilist-2 {
			h3 {
			    height: 64px;
			    margin: 0;
			    line-height: 64px;
			    a {
				    display: inline-block;
				    line-height: normal;
				    vertical-align: middle;
				}
			}
			.sep {
			    margin-left: 5px;
			}
		}
	}
	.m-rdilist {
	    margin: 16px 0 0 -37px;
	     li {
		    float: left;
		    width: 150px;
		    margin-left: 37px;
		}
		h3 {
		    margin: 13px 0 6px;
		    line-height: 16px;
		    font-size: 14px;
		    font-weight: normal;
		}
		 p {
		    line-height: 18px;
		}
	}
	.u-cover-rdi2 {
	    width: 150px;
	    height: 150px;
	}
	.u-icn-27 {
	    background-position: -50px -300px;
	}
	.u-title .tab-r {
	    float: right;
	    margin: 12px 0 0 20px;
	    span {
		    color: #666;
		}
	    span.z-sel {
		    color: #c20c0c;
		}
		 .line {
		    margin: 0 10px;
		    color: #c7c7c7;
		}
	}
	.u-icn2-music2 {
	    width: 12px;
	    height: 13px;
	    background-position: -110px -190px;
	}
	.u-icn-1 {
	    width: 11px;
	    height: 13px;
	    background-position: 0 1px;
	    font-size: 100%;
	    font-style: normal;
	}
	.u-icn-84 {
	    width: 12px;
	    height: 13px;
	    background-position: -65px -840px;
	}
}
	
</style>