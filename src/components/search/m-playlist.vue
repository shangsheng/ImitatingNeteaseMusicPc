<template>
	<div id="m-playlist">
		<div class="ztag j-flag">
			<div class="n-srchrst ztag" v-if="mPlaylist">
				<table class="m-table m-table-2 m-table-2-cover">
					<tbody>
						<tr class="h-flag" v-for="(item,index) in mPlaylist.playlists" :class="{'even':index%2!=0}" @mouseenter="hoverMouse($event)" @mouseleave="hoverLeave($event)">
							<td class="first w0">
								<div class="hd">
									<span class="ply cursor" data-res-type="13" :data-res-id="item.id" data-res-action="play" title="播放" @click.stop="playSong"></span>
								</div>
							</td>
							<td class="w7">
								<div class="u-cover u-cover-3">
									<router-link :to="{path:'/playlist',query:{id:item.id}}">
										<img :src="item.coverImgUrl"/>
										<span class="msk" :title="item.name"></span>
									</router-link>
								</div>
							</td>
							<td>
								<div class="f-cb">
									<div class="opt hshow" style="display: none;">
										<span class="u-icn u-icn-81" data-res-type="13" :data-res-id="item.id" data-res-action="addto" title="添加到播放列表"></span>
										<span class="icn icn-fav " data-res-type="13" :data-res-id="item.id" data-res-action="fav" title="收藏"></span>
										<span class="icn icn-share" data-res-type="13" :data-res-id="item.id" data-res-action="share" title="分享"></span>
									</div>
									<div class="tt">
										<div class="ttc">
										
											<span class="txt">
												<router-link :to="{path:'/playlist',query:{id:item.id}}" :title="item.name" v-html="searchValue(item.name,mPlaylist.values)"></router-link>
											</span>
											
										</div>
									</div>
								</div>
							</td>
							<td class="w11 s-fc4">{{item.trackCount}}首</td>
							<td class="w4">
								<div class="text">
									<span class="s-fc3">by</span>
									<router-link :to="{path:'/user/home',query:{id:item.creator.userId}}" :title="item.creator.nickname" v-html="searchValue(item.creator.nickname,mPlaylist.values)"></router-link>
									<span class="u-icn " :class="[item.creator.userType == 200?'u-icn-84':'']"></span>
									<span class="u-icn " :class="[item.creator.vipType == 11&&item.creator.userType == 2?'u-icn-1':'']"></span>
									<span class="u-icn u-icn2 " :class="[item.creator.vipType == 11&&item.creator.userType == 4?'u-icn2-music2':'']"></span>
								</div>
							</td>
							<td class="w6 s-fc4">
								收藏:<span>{{item.bookCount}}</span>
							</td>
							<td class="last w6 s-fc4">
								收听: <span>{{item.playCount}}</span>
							</td>
						</tr>
					</tbody>
					
				</table>
			</div>
		</div>
	</div>	
</template>

<script>
	export default {
  name: 'mPlaylist',
  props:['mPlaylist'],
  data () {
    return {
    	
    }
     
  },
  inject:['reload'],//app.vueҳ���ж����¼���
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		console.log(this.mPlaylist)
		  let that = this;
		 
		 if(this.mPlaylist){
		 	this.$.each(this.mPlaylist.playlists,function(index,item){
			 	item.img1v1Url = item.coverImgUrl + "?param=180y180";
			 	item.playCount = that.$Playback(item.playCount);
			 	item.bookCount = that.$Playback(item.bookCount);
			 	
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
        	hoverMouse(element){
        		
        		console.log(element)
        		
        		this.$(element.path[0]).addClass("z-hover");
        		this.$(element.path[0].children[2].children[0].children[0]).css({'display':'block'});
        	},
        	hoverLeave(element){
        		console.log(element)
        		this.$(element.path[0]).removeClass("z-hover");
        		this.$(element.path[0].children[2].children[0].children[0]).css({'display':'none'});
        	},
        	playSong($event){
       			   			
				if($event.target.getAttribute('data-res-action') == 'play'){
						console.log($event)
						this.$root.eventVue.$emit('playid', 
						{resId:$event.target.getAttribute('data-res-id'),
						resData:$event.target.getAttribute('data-res-data'),
						resType:$event.target.getAttribute('data-res-type'),
						resFrom:$event.target.getAttribute('data-res-from'),
						resIdx:$event.target.getAttribute('data-res-idx'),
						})
					
					
				}else{
					console.log('点击播放图标不正确')
				}
       		}
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
	#m-playlist{
		.n-srchrst {
		    margin-top: 20px;
		}
		.m-table {
		    width: 100%;
		    border: 1px solid #d9d9d9;
		    td {
			    padding: 6px 10px;
			    line-height: 18px;
			    text-align: left;
			}
			.w0 {
			    width: 25px;
			}
			.hd {
			    height: 18px;
			}
			.ply {
			    width: 17px;
			    height: 17px;
			    cursor: pointer;
			    background-position: 0 -103px;
    			float: right;
			}
			.w7 {
			    width: 50px;
			}
			.u-icn-81 {
			    float: left;
			    margin-top: 2px;
			}
			.icn-fav {
			    background-position: 0 -174px;
			}
			.icn-share {
			    background-position: 0 -195px;
			}
			.tt {
			    float: left;
			    width: 100%;
			}
			.ttc {
			    height: 18px;
			    margin-right: 20px;
			}
			.txt {
			    position: relative;
			    display: inline-block;
			    *display: inline;
			    *zoom: 1;
			    padding-right: 25px;
			    margin-right: -25px;
			    max-width: 99%;
			    height: 20px;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			}
			.w11 {
			    width: 35px;
			    padding-right: 0;
			    padding-left: 25px;
			}
			.w4 {
			    width: 20%;
			}
			.text {
			    width: 100%;
			    position: relative;
			    zoom: 1;
			    overflow: hidden;
			    white-space: nowrap;
			    text-overflow: ellipsis;
			    a {
				    white-space: nowrap;
				}
			}
			.w6 {
			    width: 78px;
			}
			.even td {
			    background-color: #f7f7f7;
			}
		}
		.m-table-2 {
		    border-collapse: separate;
		    border-spacing: 0;
		    border: 0;
		    tr {
		    	td {
				    padding-top: 8px;
				    padding-bottom: 8px;
				    border: 1px solid #fff;
				    border-width: 1px 0;
				}
				td.first {
				    border-left: 1px solid #fff;
				}
				td.last {
				    border-right: 1px solid #fff;
				}
		    }
			.hd {
			    padding-left: 5px;
			}
			.opt {
			    float: right;
			}
			 .tt {
			    margin-right: -100px;
			}
		}
		
		.m-table-2-cover tr td {
		    padding-top: 5px;
		    padding-bottom: 5px;
		}
		.u-cover-3 {
		    width: 50px;
		    height: 50px;
		    .msk {
			    background-position: -160px 0;
			}
		}
		.u-icn-81 {
		    width: 13px;
		    height: 13px;
		    background-position: 0 -700px;
		}
		.m-table .mv, .m-table .icn {
		    float: left;
		    width: 18px;
		    height: 16px;
		    margin: 2px 0 0 4px;
		    overflow: hidden;
		    text-indent: -999px;
		    cursor: pointer;
		}
		.m-table-2 tr:hover td.first, .m-table-2 tr.z-hover td.first {
		    border-left: 1px solid #e1e1e1;
		}
		.m-table-2 tr:hover td, .m-table-2 tr.z-hover td {
		    border-width: 1px 0;
		    border-color: #e1e1e1;
		    background: #f2f2f2;
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