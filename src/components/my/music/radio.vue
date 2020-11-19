<template>
	<div id="musicRadio">
		<div class="g-bd3 p-mymusic f-cb">
			<music-header></music-header>
			<div class="g-mn3 f-pr j-flag">
				<div class="g-wrap f-cb">
					<div class="u-title f-cb">
						<h3>
							<span class="f-ff2">我订阅的电台({{radioData.count}})</span>
						</h3>
					</div>
					<ul class="n-favrdi f-cb j-flag">
						<li class="z-flag" v-for="(item,index) in radioData.djRadios" v-bind:key="index">
							<router-link :to="{path:'/djradio',query:{id:item.id}}" class="cvr u-cover u-cover-3 f-fl">
								<img :src="item.picUrl"/>
								<i class="u-bub " v-if="item.newProgramCount>0">
									<b class="f-alpha"></b>
									<em>{{item.newProgramCount}}</em>
								</i>
							</router-link>
							<div class="col cnt f-pr">
								<h3 class="f-fw0 f-fs1 f-thide">
									<router-link :to="{path:'/djradio',query:{id:item.id}}" class="s-fc1">{{item.name}}</router-link>
								</h3>
								<p class="col s-fc4">
									by &nbsp;
									<router-link :to="{path:'/user/home',query:{id:item.dj.userId}}" class="s-fc4">{{item.dj.nickname}}</router-link>
								</p>
								<div class="opt hshow">
									<span class="icn u-icn2 u-icn2-share" :data-res-pic="item.picUrl" :data-res-author="item.dj.nickname" :data-res-name="item.name" :data-res-id="item.id" data-res-action="share" data-res-type="70" title="分享">分享</span>
									<span class="icn u-icn2 u-icn2-del" data-res-action="del" :data-res-id="item.id" title="删除">删除</span>
								</div>
							</div>
							<div class="col no s-fc4">
								{{item.programCount}}期
							</div>
						</li>
					</ul>
					<pager v-bind:pageMovers="radioData.hasMore" v-bind:pageLength="radioData.count" v-bind:limit="limit" v-if="radioData.count >= 20" v-on:listenToChild="playlistPagerChild"></pager>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import pager from '@/components/publics/pager.vue'
	import musicHeader from '@/components/my/my-leftHader.vue'
	export default {
  name: 'musicRadio',
  data () {
    return {
    	radioData:{},
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
				         	url:that.$host+"/dj/sublist"
				         }).then(function(res){
				         	console.log(res.data)
//				         	that.$.each(res.data.data,function(index,el){
//				         		el.coverUrl = el.coverUrl +"?param=159y90"
//				         		el.playTime = that.$Playback(el.playTime)
//				         		el.durationms = that.$formatTime(el.durationms/1000)
//				         		let creatorTitle = '';
//				         		that.$.each(el.creator,function(nums,item){
//				         			
//				         			if(nums>el.creator.length){
//				         				creatorTitle = creatorTitle +'/'
//				         			}else{
//				         				creatorTitle = creatorTitle
//				         			}
//				         		})
//				         		el.creatorTitle = creatorTitle
//				         	})
				         	that.radioData = res.data
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

<style  lang="less" >
	#musicRadio{
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
		.n-favrdi {
		    margin-bottom: 24px;
		    li {
			    float: left;
			    width: 100%;
			    height: 50px;
			    padding: 10px 0;
			    border-bottom: 1px solid #e7e7e7;
			    line-height: 50px;
			}
			.cvr .u-bub {
			    position: absolute;
			    top: -10px;
			    right: -10px;
			}
			.col {
			    float: left;
			    margin-left: 10px;
			    .col {
				    margin-left: 0px;
				}
			}
			.cnt {
			    width: 488px;
			    padding-right: 57px;
			    line-height: 24px;
			    .opt {
				    position: absolute;
				    top: 50%;
				    right: 0;
				    margin-top: -6px;
				    .icn {
					    float: right;
					    margin-right: 10px;
					    text-indent: -9999px;
					    cursor: pointer;
					}
				}
				.hshow {
				    display: none;
				}
			}
			 .no {
			    max-width: 40px;
			    overflow: visible;
			    white-space: nowrap;
			}
		}
		.u-cover-3 {
		    width: 50px;
		    height: 50px;
		}
		.u-bub {
		    display: block;
		    position: relative;
		    zoom: 1;
		    width: 22px;
		    height: 22px;
		    color: #fff;
		    text-align: center;
		    line-height: 23px;
		    font-weight: bold;
		     em {
			    float: none;
			    display: block;
			    position: relative;
			    text-align: center;
			    z-index: 2;
			}
		}
		.u-icn2-share, .u-icn2-fav, .u-icn2-del {
		    width: 16px;
		    height: 14px;
		    background-position: -90px 0;
		}
		.u-icn2-del {
		    background-position: -130px 0;
		}
	}
</style>