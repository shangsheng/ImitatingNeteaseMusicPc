<template>
	<div id="m-user">
		<div class="ztag j-flag">
			<div class="n-srchrst ztag" v-if="mUser&&mUser.userprofiles[0].detailProfile" >
				<table class="m-table m-table-2 m-table-2-cover">
					<tbody>
						
						<tr class="h-flag " v-for="(item,index) in mUser.userprofiles" :class="{'even':index%2!=0}">
							<td class="first w7">
								<div class="u-cover u-cover-3">
									<router-link :to="{path:'/user/home',query:{id:item.userId}}">
										<img :src="item.avatarUrl"/>
										<span class="msk"></span>
									</router-link>
								</div>
							</td>
							<td>
								<div class="ttc">
									<router-link :to="{path:'/user/home',query:{id:item.userId}}" class="txt f-fs1" v-html="searchValue(item.nickname,mUser.values)"></router-link>
									<span class="u-icn " :class="[item.userType == 200?'u-icn-84':'']"></span>
									<span class="u-icn " :class="[item.vipType == 11&&item.userType == 2?'u-icn-1':'']"></span>
									<span class="u-icn u-icn2 " :class="[item.vipType == 11&&item.userType == 4?'u-icn2-music2':'']"></span>
									<i class="icnfix u-icn u-icn-s-01 f-sep" v-if="item.gender == 1"></i>
									<i class="icnfix u-icn u-icn-s-02 f-sep" v-else-if="item.gender == 2"></i>
								</div>
							</td>
							<td class="w9">
								<span class="u-btn u-btn-3 f-tdn" :data-res-id="item.userId" data-res-action="follow">
									<i>关注</i>
								</span>
							</td>
							<td class="w9 s-fc4" >
								歌单:{{item.detailProfile.playlistCount}}
							</td>
							<td class="last w9 s-fc4">
								粉丝:
								<span>{{item.detailProfile.followeds}}</span>
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
  name: 'mUser',
  props:['mUser'],
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
			console.log(this.mUser)
		 let that = this;
		 
		 if(this.mUser){
		 	this.$.each(this.mUser.userprofiles,function(index,item){
			 	item.avatarUrl = item.avatarUrl + "?param=180y180";
			 	
	        		that.$.ajax({
	        			method:'get',
	        			url:'http://192.168.1.74:3000/user/detail',
	        			data:{uid:item.userId},
	        			async: false,
	        			success:function(res){
	        				console.log(res)
	        				res.profile.followeds = that.$Playback(res.profile.followeds)
	        				item.detailProfile = res.profile
	        			},
	        			error:function(res){
	        				console.log(res)
	        			}
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
            console.group('beforeDestroy 销毁前状态״̬===============��');
            
        },
        destroyed: function () {
            console.group('destroyed 销毁完全状态̬===============��');
            
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

            },
            
        }
}
</script>

<style  lang="less" >
	#m-user{
		text-align: left;
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
			.w7 {
			    width: 50px;
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
			.even {
				td {
				    background-color: #f7f7f7;
				}
			}
			.w9 {
			    width: 96px;
			}
			td.last {
			    border-right: 1px solid #fff;
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
		    }
		}
		.m-table-2-cover {
			tr {
				td {
				    padding-top: 5px;
				    padding-bottom: 5px;
				}
			}
		}
		.u-cover-3 {
		    width: 50px;
		    height: 50px;
		    .msk {
			    background-position: -160px 0;
			}
		}
		.u-icn-1 {
		    width: 11px;
		    height: 13px;
		    background-position: 0 1px;
		    font-size: 100%;
		    font-style: normal;
		}
		.m-table .txt .u-icn-1, .m-table .txt .u-icn-84, .m-table .txt .u-icn2-music2 {
		    margin-top: -3px;
		    *margin-top: -1px;
		    _margin-top: -2px;
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
		.u-icn-s-02 {
		    width: 14px;
		    height: 15px;
		    background-position: -70px 0;
		}
		.m-table .mv, .m-table .icnfix {
		    position: absolute;
		    top: 0;
		    right: 0;
		}
		.m-table .icnfix {
		    top: 2px;
		    _top: 0;
		    right: auto;
		    margin-left: 5px;
		    z-index: 10;
		}
		.u-icn-s-01 {
		    width: 14px;
		    height: 15px;
		    background-position: -70px -20px;
		}
		.u-btn-3 {
		    width: 64px;
		    height: 27px;
		    background-position: 0 -990px;
		    line-height: 27px;
		    i {
			    display: inline-block;
			    height: 25px;
			    line-height: 25px;
			    padding-left: 26px;
			    color: #5d5d5d;
			    cursor: pointer;
			}
		}
		.m-table-2 tr:hover td.first, .m-table-2 tr.z-hover td.first {
		    border-left: 1px solid #e1e1e1;
		}
		.m-table-2 tr:hover td, .m-table-2 tr.z-hover td {
		    border-width: 1px 0;
		    border-color: #e1e1e1;
		    background: #f2f2f2;
		}
	}
</style>