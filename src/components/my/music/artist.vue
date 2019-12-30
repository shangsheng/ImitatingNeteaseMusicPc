<template>
	<div id="musicArtist">
		<div class="g-bd3 p-mymusic f-cb">
			<music-header></music-header>
			<div class="g-mn3 f-pr j-flag">
				<div class="g-wrap f-cb">
					<div class="u-title f-cb">
						<h3>
							<span class="f-ff2">我的歌手({{artistData.count}})</span>
						</h3>
					</div>
					<div class="n-singer j-flag">
						<div class="itm f-cb" v-for="(item,index) in artistData.data">
							<div class="cvr">
								<router-link :to="{path:'/artist',query:{id:item.id}}" class="f-ib f-tdn">
									<img :src="item.picUrl"/>
								</router-link>
							</div>
							<div class="cnt">
								<h4 class="tit f-fs2">
									<router-link :to="{path:'/artist',query:{id:item.id}}">{{item.name}}</router-link>
								</h4>
								<p class="s-fc3">
									{{item.albumSize!=0?item.albumSize:''}}
									 &nbsp;&nbsp;
									{{item.mvSize!=0?item.mvSize:''}}
								</p>
							</div>
						</div>
					</div>
					<pager v-bind:pageMovers="artistData.hasMore" v-bind:pageLength="artistData.count" v-bind:limit="limit" v-if="artistData.count >= 20" v-on:listenToChild="playlistPagerChild"></pager>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import pager from '@/components/publics/pager.vue'
	import musicHeader from '@/components/my/my-leftHader.vue'
	export default {
  name: 'musicArtist',
  data () {
    return {
    	artistData:{},
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
				         	url:that.$host+"/artist/sublist"
				         }).then(function(res){
				         	console.log(res.data)
				         	that.$.each(res.data.data,function(index,el){
				         		el.picUrl = el.picUrl +"?param=80y80"
				         		if(el.albumSize>0){
				         			el.albumSize = el.albumSize +'个专辑'
				         		}
				         		if(el.mvSize>0){
				         			el.mvSize = el.mvSize +'个mv'
				         		}
				         	})
				         	that.artistData = res.data
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
	#musicArtist{
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
		.n-singer {
		    margin-bottom: 50px;
		    .itm {
			    padding: 10px 0;
			    border-bottom: 1px solid #ddd;
			    .cvr {
				    float: left;
				    width: 80px;
				    height: 80px;
				    margin-right: -95px;
				    img {
					    width: 100%;
					    height: 100%;
					}
				}
				.cnt {
				    margin-left: 95px;
				}
				h4 {
				    height: 21px;
				    margin: 10px 0;
				    line-height: 21px;
				}
			}
		}
	}
</style>