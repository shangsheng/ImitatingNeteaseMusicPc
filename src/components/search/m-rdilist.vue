<template>
	<div id="m-rdilist">
		<div class="ztag j-flag" v-if="mRdilist">
			<h2 class="head2">主播电台</h2>
			<ul class="m-rdilist f-cb">
				<li v-for="(item,index) of mRdilist.djRadios">
					<router-link :to="{path:'/djradio',query:{id:item.id}}" class="u-cover u-cover-rdi2">
						<img :src="item.picUrl"/>
					</router-link>
					<h3 class="f-fs2 f-thide">
						<router-link :to="{path:'/djradio',query:{id:item.id}}" class="s-fc1" v-html="searchValue(item.name,mRdilist.values)"></router-link>
					</h3>
					<p class="f-thide s-fc4">
						by
						<router-link :to="{path:'/user/home',query:{id:item.dj.userId}}" v-html="searchValue(item.dj.nickname,mRdilist.values)"></router-link>
						
						<span class="u-icn " :class="[item.dj.userType == 200?'u-icn-84':'']"></span>
						<span class="u-icn " :class="[item.dj.vipType == 11&&item.dj.userType == 2?'u-icn-1':'']"></span>
						<span class="u-icn u-icn2 " :class="[item.dj.vipType == 11&&item.dj.userType == 4?'u-icn2-music2':'']"></span>
						<i class="icnfix u-icn u-icn-s-01 f-sep" v-if="item.dj.gender == 1"></i>
						<i class="icnfix u-icn u-icn-s-02 f-sep" v-else-if="item.dj.gender == 2"></i>
					</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
  name: 'mRdilist',
  props:['mRdilist'],
  data () {
    return {}
     
  },
  inject:['reload'],//app.vueҳ���ж����¼���
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		console.log(this.mRdilist)
		 let that = this;
		 
		 if(this.mRdilist){
		 	this.$.each(this.mRdilist.djRadios,function(index,item){
			 	item.picUrl = item.picUrl + "?param=200y200";
			 	
			 	
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
	#m-rdilist{
		text-align: left;
		.head2 {
		    margin-top: 8px;
		    padding-bottom: 6px;
		    border-bottom: 1px solid #dadada;
		    line-height: 17px;
		    font-weight: bold;
		}
		.m-rdilist {
		    margin: 16px 0 0 -37px;
		     li {
			    float: left;
			    width: 150px;
			    margin: 0 0 40px 37px;
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
		.u-icn-s-01 {
		    width: 14px;
		    height: 15px;
		    background-position: -70px -20px;
		}
		.u-icn-s-02 {
		    width: 14px;
		    height: 15px;
		    background-position: -70px 0;
		}
		.u-icn-84 {
		    width: 12px;
		    height: 13px;
		    background-position: -65px -840px;
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
	}
</style>