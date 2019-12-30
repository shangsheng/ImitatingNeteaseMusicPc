<template>
	<div id="musicMv">
		<div class="g-bd3 p-mymusic f-cb">
			<music-header></music-header>
			<div class="g-mn3 f-pr j-flag">
				<div class="g-wrap f-cb">
					<div class="u-title f-cb">
						<h3>
							<span class="f-ff2">我的视频({{mvData.count}})</span>
						</h3>
					</div>
					<ul class="j-flag n-favmv m-mvlist m-mvlist-1 f-cb">
						<li v-for="item in mvData.data">
							<div class="cover f-pr">
								<img :src="item.coverUrl"/>
								<span class="msk" :title="item.title"></span>
								<p class="tr u-msk u-msk-1">
									<span class="u-icn2 u-icn2-mv"></span>
									{{item.playTime}}
								</p>
								<p class="bl u-msk u-msk-2">{{item.durationms}}</p>
								<router-link :to="{path:item.type == 0 ? '/mv' : '/video',query:{id:item.vid}}" class="link"></router-link>
							</div>
							<h4 class="title f-thide">
								<i class="tag u-icn2 u-icn2-smvtag" v-if="item.type == 0"></i>
								<router-link :to="{path:item.type == 0 ? '/mv' : '/video',query:{id:item.vid}}" class="s-fc0" :title="item.title">{{item.title}}</router-link>
							</h4>
							<h5 class="name f-thide">
								<span class="f-thide" :title="item.creatorTitle">
									<router-link :to="{path:'/artist',query:{id:itemA.userId}}" class="s-fc3" v-for="(itemA,indexA) in item.creator">{{itemA == item.creator.length-1? itemA.userName : (itemA.userName + '/')}}</router-link>
								</span>
							</h5>
						</li>
					</ul>
					<pager v-bind:pageMovers="mvData.hasMore" v-bind:pageLength="mvData.count" v-bind:limit="limit" v-if="mvData.count >= 20" v-on:listenToChild="playlistPagerChild"></pager>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import pager from '@/components/publics/pager.vue'
	import musicHeader from '@/components/my/my-leftHader.vue'
	export default {
  name: 'musicMv',
  data () {
    return {
    	mvData:{},
    	limit:20
    }
     
  },
   components:{
  	musicHeader,
  	pager
  },
  inject:['reload'],//app.vueҳ���ж����¼���
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		var that =this;
		if(this.$cookieUtil("email")){
					this.$logoRefresh(function(ress){
						console.log(ress)
						
						that.loginBs = false;
						that.$http({
				         	method:'get',
				         	url:that.$host+"/mv/sublist"
				         }).then(function(res){
				         	console.log(res.data)
				         	that.$.each(res.data.data,function(index,el){
				         		el.coverUrl = el.coverUrl +"?param=159y90"
				         		el.playTime = that.$Playback(el.playTime)
				         		el.durationms = that.$formatTime(el.durationms/1000)
				         		let creatorTitle = '';
				         		that.$.each(el.creator,function(nums,item){
				         			
				         			if(nums>el.creator.length){
				         				creatorTitle = creatorTitle +'/'
				         			}else{
				         				creatorTitle = creatorTitle
				         			}
				         		})
				         		el.creatorTitle = creatorTitle
				         	})
				         	that.mvData = res.data
				         }).catch(res=>{
				         	console.log(res);
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
        	playlistPagerChild(data){
        		console.log(data)
        	}
        },
         //����
        watch: {
            '$route' (to, from) {

                console.log(to)
                console.log(from)
                //���ж���Ҫ�������������֮��������������ҳ��Ҳ�����������Լ��˱����������������жϣ����������ҳ��������ݼ��ص�����
                if(this.$route.query.id){
                      this.reload()
                }

            }
        }
}
</script>

<style  lang="less">
	#musicMv{
		text-align: left;
		.g-mn3 {
		    height: 100%;
		    float: right;
		    width: 740px;
		    padding-bottom: 50px;
		}
		.g-wrap {
		    padding: 40px;
		}
		.m-mvlist {
			.cover {
			    width: 159px;
			    height: 90px;
			    .link {
				    position: absolute;
				    left: 0;
				    top: 0;
				    width: 100%;
				    height: 100%;
				    z-index: 9;
				    background: url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==);
				}
			}
			li {
			    float: left;
			    width: 159px;
			    padding: 0 0 40px 26px;
			    line-height: 1.5;
			    overflow: hidden;
			    img {
				    width: 100%;
				    height: 90px;
				}
			}
			 .tr {
			    position: absolute;
			    top: 0;
			    right: 0;
			    padding-right: 5px;
			    height: 20px;
			    line-height: 20px;
			    color: #fff;
			    box-sizing: border-box;
			    text-align: right;
			    text-shadow: -2px 1px rgba(0,0,0,.4);
			}
			.u-icn2-mv {
			    margin: -2px 2px 0 0;
			}
			.bl {
			    position: absolute;
			    bottom: 0;
			    left: 0;
			    padding-left: 5px;
			    height: 20px;
			    line-height: 20px;
			    color: #fff;
			    text-shadow: -2px 1px rgba(0,0,0,.4);
			}
			.title {
			    width: 100%;
			    height: auto;
			    margin: 7px 0 1px;
			    border: none;
			    font-size: 14px;
			    font-weight: normal;
			     .tag {
				    margin: -2px 4px auto auto;
				}
			}
			.name {
			    width: 100%;
			    font-weight: normal;
			}
		}
		.m-mvlist-1 {
		    margin-left: -8px;
		    li {
			    padding: 0 0 25px 8px;
			}
		}
		.n-favmv {
		    padding-top: 11px;
		}
		.u-msk-1 {
		    width: 90px;
		    height: 20px;
		    background-position: 0 0;
		}
		.u-icn2-mv {
		    width: 15px;
		    height: 10px;
		    background-position: -60px -310px;
		}
		.u-msk-2 {
		    width: 159px;
		    height: 25px;
		    background-position: 0 -25px;
		}
		.u-icn2-smvtag {
		    width: 26px;
		    height: 16px;
		    background-position: -270px -480px;
		}
	}
</style>