<template>
	<div id="m-mv">
		<div class="ztag j-flag">
			<div class="n-srchrst ztag">
				<ul class="m-mvlist f-cb" v-if="mMvData">
					<li v-for="item of mMvData.videos" >
						<div class="cover f-pr">
							<img :src="item.coverUrl"/>
							<span class="msk" :title="item.title"></span>
							<p class="tr u-msk u-msk-1">
								<span class="u-icn2 u-icn2-mv"></span>
								{{item.playTime}}
							</p>
							<p class="bl u-msk u-msk-2">{{item.durationms}}</p>
							<router-link :to="{path:item.type == 1?'/video':'/mv',query:{id:item.vid}}" class="link" v-if="item.type == 1"></router-link>
							<!--<router-link :to="{path:'',query:{id:item.vid}}" class="link" v-else></router-link>-->
						</div>
						<h4 class="title f-thide">
							<i class="tag u-icn2 u-icn2-smvtag" v-if="item.type == 0"></i>
							
							<router-link :to="{path:item.type == 1?'/video':'/mv',query:{id:item.vid}}" class="s-fc0" :title="item.title" v-html="searchValue(item.title,mMvData.values)"></router-link>
							<!--<router-link :to="{path:'/mv',query:{id:item.vid}}" class="s-fc0" :title="item.title" v-html="searchValue(item.title,mMvData.values)"></router-link>-->
						</h4>
						<h5 class="name f-thide">
							{{item.type == 1?'by':''}}
							<router-link :to="{path:'/user/home',query:{id:aItem.userId}}" v-for="(aItem,aNum) in item.creator" v-html="searchValue(aNum == item.creator.length-1 && aItem.userName || (aItem.userName + '/'),mMvData.values)"></router-link>
						</h5>
					</li>
					
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
  name: 'mMv',
  props:['mMvData'],
  data () {
    return {}
     
  },
  inject:['reload'],//app.vueҳ���ж����¼���
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		console.log(this.mMvData)
		 let that = this;
		 
		 if(this.mMvData){
		 	this.$.each(this.mMvData.videos,function(index,item){
			 	item.img1v1Url = item.picUrl + "?param=159y90";
			 	item.playTime = that.$Playback(item.playTime);
			 	item.durationms = that.$formatTime(item.durationms/1000);
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
	#m-mv{
		text-align: left;
		.n-srchrst {
		    margin-top: 20px;
		}
		.m-mvlist {
		    margin-left: -26px;
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
		.u-msk-1 {
		    width: 90px;
		    height: 20px;
		    background-position: 0 0;
		}
		.u-msk-2 {
		    width: 159px;
		    height: 25px;
		    background-position: 0 -25px;
		}
		.u-icn2-mv {
		    width: 15px;
		    height: 10px;
		    background-position: -60px -310px;
		}
		.u-icn2-smvtag {
		    width: 26px;
		    height: 16px;
		    background-position: -270px -480px;
		}
	}
</style>