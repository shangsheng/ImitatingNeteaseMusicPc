<template>
	<div id="resource-src">
		<div id="auto-id-EOh2FIVoG8UANbBa" v-if="resourceData">
			<div class="src src-artist f-cb">
				<router-link to="{path:'/artist',query:{id:resourceData.id}}" class="cover">
					<img :src="resourceData.picUrl+'?param=40y40&amp;quality=100'"/>
				</router-link>
				<span class="scnt f-thide s-fc1 f-fs1">
					歌手:
					<router-link to="{path:'/artist',query:{id:resourceData.id}}" class="s-fc3">{{resourceData.name}}</router-link>
				</span>
			</div>
		</div>
		<relay-src v-bind:pics="pics" v-bind:widthXT="338" v-bind:heightYT="0" v-bind:widthX="525" v-bind:heightY="10000" v-if="pics"></relay-src>
	</div>
</template>

<script>
	import relaySrc from '@/components/publics/relay-src.vue'
	export default {
  name: 'resourcSrc',
  props:['resourceData','pics'],
  data () {
    return {}
     
  },
   components:{
  	relaySrc
  },
  inject:['reload'],//app.vueҳ���ж����¼���
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		console.log(this.resourceData)
		console.log(this.pics)
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
	#resource-src{
		text-align: left;
		 .src,  .card,.hotrecmt .bar, .showpic {
		    background: #f5f5f5;
		}
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
				    display: block;
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
			}
			
		}
		.src-artist .scnt {
		    line-height: 40px;
		}
		 .ficon:after,  .pics .pic:after,  .src .cover:after, .src-mv .mv:after,  .activity:after,  .hotrecmt .cover:after {
		    content: '';
		    position: absolute;
		    top: 0;
		    left: 0;
		    width: 100%;
		    height: 100%;
		    box-sizing: border-box;
		    border: 1px solid rgba(0,0,0,0.1);
		    z-index: 100;
		    pointer-events: none;
		}
	}
</style>