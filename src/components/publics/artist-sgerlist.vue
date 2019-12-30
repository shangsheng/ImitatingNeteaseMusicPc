<template>
	<div id="artistSgerlist">
		<div class="m-sgerlist">
			<ul class="m-cvrlst m-cvrlst-5 f-cb" v-if="sgerList">
				<li v-for="(item,index) in sgerList" v-if="index<10" :class="{'line':index>4&&!sgerMover}">
					<div class="u-cover u-cover-5">
						<img :src="item.img1v1Url"/>
						<router-link :to="{path:'/artist',query:{id:item.id}}" class="msk" :title="item.name"></router-link>
					</div>
					<p>
						<router-link :to="{path:'/artist',query:{id:item.id}}" class="nm nm-icn f-thide s-fc0" :title="item.name">{{item.name}}</router-link>
						<router-link :to="{path:'/user/home',query:{id:item.accountId}}" class="icn u-icn u-icn-5" v-if="item.accountId" :title="item.name"></router-link>
						
					</p>
				</li>
				<li class="sml" v-else-if='!sgerMover'>
					
						<router-link :to="{path:'/artist',query:{id:item.id}}" class="nm nm-icn f-thide s-fc0" :title="item.name">{{item.name}}</router-link>
						<router-link :to="{path:'/user/home',query:{id:item.accountId}}" class="icn u-icn u-icn-5" v-if="item.accountId" :title="item.name"></router-link>
					
				</li>
				<li v-else>
					<div class="u-cover u-cover-5">
						<img :src="item.img1v1Url"/>
						<router-link :to="{path:'/artist',query:{id:item.id}}" class="msk" :title="item.name"></router-link>
					</div>
					<p>
						<router-link :to="{path:'/artist',query:{id:item.id}}" class="nm nm-icn f-thide s-fc0" :title="item.name">{{item.name}}</router-link>
						<router-link :to="{path:'/user/home',query:{id:item.accountId}}" class="icn u-icn u-icn-5" v-if="item.accountId" :title="item.name"></router-link>
					</p>
				</li>
			</ul>
			<div class="u-load s-fc4" v-else>
				<i class="icn"></i>			
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	name:'artistSgerlist',
	props:['sgerList','sgerListLength','limit','sgerMover'],
    data () {
      return {
         paging: {
                PageIndex: 0,
                isTrue: false,
                showLoading: false,
                loadingMessage: "上拉加载更多~"
           }
      }
    },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			console.log(this.sgerList)
        },
        beforeMount: function () {
//          debugger;
        },
        mounted: function () {
//          debugger;
			 //监听滚动
            window.addEventListener('scroll', () => {
                this.handleScroll();
            });
            //初始加载数据
            setTimeout(() => {
                this.getList();
            }, 1000);
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
        
        methods:{
        	  handleScroll() {
                var that = this;
                //判断滚动到底部
               
                if (that.$getScroll().top >= document.body.clientHeight - window.screen.availHeight-400) { //滚动高度>=页面高度-屏幕高度
                    if (that.paging.isTrue) {
                        setTimeout(function() {
                            that.paging.PageIndex++;
                            that.paging.showLoading = true;
                            that.paging.loadingMessage = "正在加载中~";
                            that.getList();
                        }, 1000); //防止连续下拉
                        that.paging.isTrue = false;
                    }
                }
            },
            getList() {
                var that = this;
                
                if (that.sgerListLength < that.paging.PageIndex*that.limit) {
                    that.paging.isTrue = false;
                    that.paging.loadingMessage = "暂时没有更多消息了哦~";
                } else {
                    that.paging.isTrue = true;
                    that.paging.loadingMessage = "上拉加载更多~";
                    that.$emit("listenToChild",that.paging.PageIndex);
                }
            }
        }
  }
</script>

<style lang="less">
	#artistSgerlist{
		text-align: left;
		.m-cvrlst {
			li {
			    float: left;
			    display: inline-block;
			    width: 140px;
			    height: 188px;
			    overflow: hidden;
			    padding: 0 0 30px 50px;
			    line-height: 1.4;
			     p {
				    width: 100%;
				    .u-icn {
					    margin-top: -1px;
					    *margin-top: -2px;
					    _margin-top: -3px;
					}
				}
				.nm {
				    display: inline-block;
				    max-width: 85%;
				    vertical-align: middle;
				}
			}
			li.line {
			    margin-bottom: 12px;
			    border-bottom: 1px dotted #999;
			}
			li.sml {
			    height: 30px;
			    width: 130px;
			    padding-bottom: 0;
			    line-height: 23px;
			}
		}
		.m-cvrlst-5 {
			li {
			    width: 130px;
			    height: 154px;
			     .nm-icn {
				    float: left;
				    max-width: 80%;
				}
				 .u-icn-5 {
				    position: relative;
				    float: right;
				}
			}
			li.sml .u-icn-5 {
			    float: left;
			    margin: 4px 0 0 2px;
			}
		}
		.m-sgerlist .m-cvrlst {
		    margin: 20px 0 0 -17px;
		    li {
			    padding-left: 17px;
			     p {
				    margin-top: 8px;
				}
			}
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
	}
</style>