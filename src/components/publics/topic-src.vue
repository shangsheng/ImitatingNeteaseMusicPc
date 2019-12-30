<template>
	<div id="topic-src">
		<div class="src src-topic f-cb" v-if="topicData">
			<div class="cover">
				<router-link :to="{path:'/topic',query:{id:topicData.id}}" class="lnk"></router-link>
				<img :src="topicData.coverUrl+'?param=111y74&amp;quality=100'"/>
			</div>
			<div class="scnt">
				<div class="inner">
					<h3 class="tit f-thide2 f-fs1">
						<span class="tag u-dtag">
							专栏
							<i class="rt"></i>
						</span>
						<router-link :to="{path:'/topic',query:{id:topicData.id}}" class="s-fc1">{{topicData.title}}</router-link>
					</h3>
					<h4 class="from f-thide s-fc3">
						by  <router-link to="{path:'/user/home',query:{id:topicData.creator.userId}}" class="s-fc3">{{topicData.creator.nickname}}</router-link>
					</h4>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
  name: 'topicSrc',
  props:['topicData'],
  data () {
    return {}
     
  },
  inject:['reload'],//app.vueҳ���ж����¼���
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		console.log(this.topicData)
		 
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
	#topic-src{
		text-align: left;
		.src,  .card,  .hotrecmt .bar,  .showpic {
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
		.src-topic {
			.cover {
			    float: right;
			    width: 111px;
			    height: 74px;
			    img {
				    width: 111px;
				    height: 74px;
				}
			}
			.scnt {
			    left: 10px;
			    right: 131px;
			    height: 74px;
			    line-height: 74px;
			}
			 .inner {
			    display: inline-block;
			    margin-top: 2px;
			    line-height: 20px;
			    vertical-align: middle;
			}
			h3 {
			    margin-bottom: 3px;
			}
		}
		 .ficon:after,  .pics .pic:after,  .src .cover:after,  .src-mv .mv:after,  .activity:after,  .hotrecmt .cover:after {
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
		.m-timeline h3 {
		    margin-top: -2px;
		}
		 h3,  h4 {
		    font-weight: normal;
		}
		.u-dtag {
		    color: #e03f40;
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
			}
		}
		.u-dtag, .u-dtag .rt {
		    /*position: relative;*/
		    display: inline-block;
		    height: 16px;
		    font-size: 12px;
		}
	}
</style>