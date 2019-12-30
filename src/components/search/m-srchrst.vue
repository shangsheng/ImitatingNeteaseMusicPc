<template>
	<div id="m-artist">
		<div class="ztag j-flag">
			<div class="n-srchrst ztag">
				<div class="m-sgerlist m-sgerlist-1" v-if="artistData">
					<ul class="m-cvrlst m-cvrlst-5 f-cb">
						<li v-for="item in artistData.artists">
							<div class="u-cover u-cover-5">
								<router-link :to="{path:'/artist',query:{id:item.id}}">
									<img :src="item.img1v1Url"/>
									<span class="msk" :title="item.name"></span>
								</router-link>
							</div>
							<p>
								<router-link :to="{path:'/artist',query:{id:item.id}}" class="nm f-thide s-fc0" :title="item.name" v-html="searchValue(item.name,artistData.values)"></router-link>
								<router-link :to="{path:'/user/home',query:{id:item.id}}" v-if="item.accountId">
									<i class="u-icn u-icn-5"></i>
								</router-link>
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
  name: 'mArtist',
  props:['artistData'],
  data () {
    return {}
     
  },
  inject:['reload'],//app.vueҳ���ж����¼���
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		console.log(this.artistData)
		if(this.artistData){
			this.$.each(this.artistData.artists,function(index,item){
			 	item.img1v1Url = item.img1v1Url + "?param=130y130";
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

<style  lang="less">
	#m-artist{
		text-align: left;
		.n-srchrst {
		    margin-top: 20px;
		}
		.m-sgerlist-1 .m-cvrlst {
		    margin: 0 0 0 -24px;
		     li {
			    padding-left: 24px;
			     p {
				    margin-top: 8px;
				    width: 100%;
				}
			}
		}
		.m-cvrlst li {
		    float: left;
		    display: inline-block;
		    width: 140px;
		    height: 188px;
		    overflow: hidden;
		    padding: 0 0 30px 50px;
		    line-height: 1.4;
		    .nm {
			    display: inline-block;
			    max-width: 85%;
			    vertical-align: middle;
			}
		}
		.m-cvrlst-5 li {
		    width: 130px;
		    height: 154px;
		}
		.u-cover-5 {
		    width: 130px;
		    height: 130px;
		    .msk {
			    background-position: 0 -680px;
			}
		}
		.u-icn-5 {
		    width: 17px;
		    height: 18px;
		    background-position: 0 -740px;
		}
		.m-cvrlst-5 li .u-icn-5 {
		    position: relative;
		    float: right;
		}
		.m-cvrlst li p .u-icn {
		    margin-top: -1px;
		    *margin-top: -2px;
		    _margin-top: -3px;
		}
	}
</style>