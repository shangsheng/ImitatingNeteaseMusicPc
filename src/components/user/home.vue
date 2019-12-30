<template>
	<div id="user-home" >
		<div class="g-bd" v-wechat-title="this.title">
			<div class="g-wrap p-prf" v-if="userDetail">
				<dl class="m-proifo f-cb">
					<dt class="f-pr">
						<img :src="userDetail.profile.avatarUrl"/>
					</dt>
					<dd>
						<div class="name f-cb">
							<div class="f-cb">
								<div class="edit" v-if="userDetail.profile.artistId">
									<router-link :to="{path:'/artist',query:{id:userDetail.profile.artistId}}" class="u-btn2 u-btn2-1">
										<i>查看歌手页</i>
									</router-link>
								</div>
								<h2 class="wrap f-fl f-cb ">
									<span class="tit f-ff2 s-fc0 f-thide">{{userDetail.profile.nickname}}</span>
									<span class="vip-code-230" v-if="userDetail.profile.vipType == 11"></span>
									<span class="lev u-lev u-icn2 u-icn2-lev">
										{{userDetail.level}}
										<i class="right u-icn2 u-icn2-levr"></i>
									</span>
									<i class="icn u-icn u-icn-00" v-if="userDetail.profile.gender == 0"></i>
									<i class="icn u-icn u-icn-02" v-else-if="userDetail.profile.gender == 2"></i>
									<i class="icn u-icn u-icn-01" v-else-if="userDetail.profile.gender == 1"></i>
								</h2>
								<div class="head-oper">
									<span class="btn u-btn u-btn-7 f-tdn" data-action="send">
										<i>发私信</i>
									</span>
									<span class="btn u-btn u-btn-5 f-tdn" data-action="delfollow" v-if="userDetail.profile.followMe">
										<i>互相关注</i>
									</span>
									<span class="btn u-btn u-btn-6 f-tdn" data-action="delfollow" v-else-if="userDetail.profile.followed||t==2" @mouseover="btnFollowed(true)" @mouseleave="btnFollowed(false)" @click.stop="clickFollow(2)">
										<i>{{btnF}}</i>
									</span>
									
									<span class="btn u-btn u-btn-8 f-tdn" data-action="follow" v-else @click.stop="clickFollow(1)">关注</span>
								</div>
							</div>
							<p class="djp f-fs1 s-fc3" v-if="userDetail.profile.allAuthTypes&&userDetail.profile.allAuthTypes.length>0">
								<span v-for="item in userDetail.profile.allAuthTypes" v-if="item.type == 4">
									<i class="tag u-icn2 u-icn2-pfyyr"></i>
								{{item.desc}}
								</span>
								<span  v-else-if="item.type == 2">
									<i class="tag u-icn2 u-icn2-pfv"></i>
								{{item.desc}}
								</span>
							</p>
						</div>
						<ul class="data s-fc3 f-cb">
							<li class="fst">
								<router-link :to="{path:'/user/event',query:{id:userDetail.profile.userId}}">
									<strong>{{userDetail.profile.eventCount}}</strong>
									<span>动态</span>
								</router-link>
							</li>
							<li>
								<router-link :to="{path:'/user/follows',query:{id:userDetail.profile.userId}}">
									<strong>{{userDetail.profile.follows}}</strong>
									<span>关注</span>
								</router-link>
							</li>
							<li>
								<router-link :to="{path:'/user/fans',query:{id:userDetail.profile.userId}}">
									<strong>{{userDetail.profile.followeds}}</strong>
									<span>粉丝</span>
									<i class="u-icn u-icn-68 f-alpha" style="display: none;"></i>
								</router-link>
							</li>
						</ul>
						<div class="inf s-fc3 f-brk" v-if="userDetail.profile.signature">
							个人介绍:{{userDetail.profile.signature}}
						</div>
						<div class="inf s-fc3" v-if="userDetail.profile.cityDistricts.length>0">
							所在地区:<span v-for="(item,index) of userDetail.profile.cityDistricts">{{item.name}} <i v-if="index< userDetail.profile.cityDistricts-1">-</i></span>
						</div>
						<div class="inf s-fc3 f-cb" v-if="userDetail.bindings.length>1">
							<span class="tit">社交网络:</span>
							<ul class="u-logo u-logo-s f-cb">
								<li v-for="item in userDetail.bindings" v-if="item.type == 2">
									<a :href="item.url" class="u-slg " :class="{'u-slg-sn':item.type == 2}" target="_blank" ></a>
								</li>
							</ul>
						</div>
					</dd>
				</dl>
				<!--创建电台-->
				
				<user-record v-bind:userRecords="userDetail" v-if="userDetail"></user-record>
				<div class="u-load s-fc4" v-else>
					<i class="icn"></i>			
				</div>
				<user-cvrlst></user-cvrlst>
			</div>
			<div class="u-load s-fc4" v-else>
				<i class="icn"></i>			
			</div>
		</div>
	</div>	
</template>

<script>
	import userRecord from '@/components/publics/user-record.vue'
	import eventVue from '../../../static/js/eventVue.js'
	export default {
  name: 'userHome',
  data () {
    return {
    	userDetail:null,
    	delfollow:false,
    	follow:false,
    	btnF:'已关注',
    	t:1,//关注
    	navBul:true,
    	mNavfst:'yyxq',
    	title:'用户',
    	barVoice:true
    }
     
  },
  components:{
  	userRecord,
  },
  inject:['reload'],//app.vueҳ���ж����¼���
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		let that = this;
		let id =  this.$route.query.id;
		this.$http({
	        method:'get',
	        url:that.$host +'/user/detail?uid='+id
	    }).then(function(resp){                            
	        console.log(resp.data);
	        that.$.ajax({
	        	method:'get',
	        	url:'https://restapi.amap.com/v3/config/district',
	        	data:{
	        			keywords:resp.data.profile.city,
	        			subdistrict:0,
	        			key:'7887f8898bfdbc49ff7805c05583719e'
	        	},
	        	async: false,
	        	success:function(res){
	       			console.log(res)
	   				resp.data.profile.cityDistricts = res.districts
    			},
	   			error:function(res){
	        		console.log(res)
	   			}
	        })
	        resp.data.profile.avatarUrl = resp.data.profile.avatarUrl+"?param=180y180";
	        that.title = resp.data.profile.nickname+'-用户'+'-我的云音乐';
	      
	       that.userDetail = resp.data
	     
	    }).catch(resp => {
	        console.log('请求失败：'+resp.status+','+resp.statusText);
	    });
		 this.$root.eventVue.$emit('navBul',this.navBul)
		 this.$root.eventVue.$emit('mNavfst',this.mNavfst)
		 this.$root.eventVue.$emit('barVoice',this.barVoice)
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
        	btnFollowed(btns){
        		if(btns){
        			this.btnF = '取消关注'
        		}else{
        			this.btnF = '已关注'
        		}
        	},
        	clickFollow(t){
        		let id =  this.$route.query.id;
        		let that =this;
        		this.$http({
			        method:'get',
			        url:that.$host +'/user/detail??id='+id+'&t='+t
			    }).then(function(resp){                            
			        console.log(resp.data);
			       
			       if(t==1){
			       	this.t = 2
			       }else{
			       	this.t = 1
			       }
			    }).catch(resp => {
			        console.log('请求失败：'+resp.status+','+resp.statusText);
			    });
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

<style  lang="less">
	#user-home{
		text-align: left;
		.g-wrap {
		    padding: 40px;
		}
		.m-proifo {
		    margin-bottom: 43px;
		     dt {
			    float: left;
			    width: 188px;
			    margin-right: 40px;
			     img {
				    display: block;
				    width: 180px;
				    height: 180px;
				    padding: 3px;
				    background: #fff;
				    border: 1px solid #d5d5d5;
				}
			}
			dd {
			    float: left;
			    width: 670px;
			}
			.name {
			    padding-bottom: 12px;
			    margin-bottom: 10px;
			    border-bottom: 1px solid #ddd;
			     .wrap {
				    padding-bottom: 3px;
				    width: auto;
				}
				 .tit {
				    float: left;
				    margin-top: 3px;
				    font-size: 22px;
				    font-weight: normal;
				    line-height: 30px;
				}
				 .lev {
				    float: left;
				    margin: 8px 0 0 10px;
				}
				.icn {
				    float: left;
				    margin: 9px 0 0 8px;
				}
				 .btn {
				    float: left;
				    margin: 4px 0 0 15px;
				}
				.u-icn-01 {
				    margin-top: 9px;
				}
				 .edit {
				    float: right;
				    margin-top: 4px;
				}
				.djp:first-of-type {
				    margin-top: 8px;
				}
				.tag {
				    margin-right: 6px;
				    float: left;
				}
			}
			 .data {
			    height: 41px;
			    margin-bottom: 15px;
			     li {
				    float: left;
				    padding: 0 40px 0 20px;
				    border-left: 1px solid #ddd;
				}
				.fst {
				    padding-left: 0;
				    border-left: none;
				}
				 a {
				    display: inline-block;
				    *display: inline;
				    position: relative;
				    zoom: 1;
				    color: #666;
				}
				 strong {
				    display: block;
				    margin-top: -4px;
				    font-size: 24px;
				    font-weight: normal;
				    cursor: pointer;
				}
				 span {
				    display: block;
				    text-indent: 2px;
				    cursor: pointer;
				}
			}
			.inf {
			    margin-bottom: 5px;
			    line-height: 21px;
			    .tit {
				    float: left;
				}
			}
			
		}
		.u-lev {
		    display: inline-block;
		    height: 19px;
		    overflow: hidden;
		    padding-left: 29px;
		    line-height: 21px;
		    color: #e03a24;
		    font-size: 14px;
		    font-weight: bold;
		    font-style: italic;
		     i {
			    float: right;
			}
		}
		.u-icn2-lev {
		    background-position: -135px -190px;
		}
		.u-icn2-levr {
		    width: 9px;
		    height: 19px;
		    background-position: -191px -190px;
		}
		.head-oper{
			float: left;
		}
		.u-btn-7 {
		    width: 75px;
		    height: 31px;
		    background-position: 0 -810px;
		     i {
			    display: inline-block;
			    height: 29px;
			    line-height: 29px;
			    padding-left: 30px;
			}
		}
		.u-btn-6, .u-btn-ygz {
		    width: 70px;
		    height: 31px;
		    background-position: 0 -919px;
		}
		.u-btn-6 i, .u-btn-ygz i {
		    display: inline-block;
		    height: 30px;
		    line-height: 30px;
		    padding-left: 26px;
		    color: #666;
		}
		.u-btn-5 {
		    width: 81px;
		    height: 31px;
		    background-position: 0 -955px;
		    i {
			    display: inline-block;
			    height: 29px;
			    line-height: 29px;
			    padding-left: 25px;
			    color: #666;
			}
		}
		.u-btn-8 {
		    width: 40px;
		    height: 31px;
		    padding-left: 30px;
		    background-position: 0 -720px;
		    color: #fff;
		    line-height: 30px;
		}
		.u-logo-s {
		    margin-left: -8px;
		    li {
			    margin-left: 8px;
			    height: 22px;
			}
		}
	 	.u-logo	li {
		    float: left;
		}
		.u-slg {
		    width: 20px;
		    height: 20px;
		}
		.u-slg-sn {
		    background-position: 0 0;
		}
		.u-title-1 {
		    height: 33px;
		    h3 {
			    font-size: 20px;
			    line-height: 28px;
			}
		}
		.u-btn-6:hover {
		    background-position: 0 -760px;
		    text-align: center;
		    i{
		    	padding-left: 0;
		    }
		}
		.u-icn-02 {
		    width: 20px;
		    height: 20px;
		    background-position: -41px -27px;
		}
		.u-icn-01 {
		    width: 20px;
		    height: 20px;
		    background-position: -41px -57px;
		}
		.u-btn2-1 i {
		    color: #333;
		    background-position: 0 -59px;
		}
		.u-btn2-1 {
		    color: #333;
		    background-position: right -100px;
		}
		.u-btn2-1:hover i {
		    color: #333;
		    background-position: 0 -141px;
		}
		.u-btn2, .u-btn2:hover {
		    text-decoration: none;
		}
		.u-btn2 i {
		    width: auto;
		}
		.u-icn2-pfyyr {
		    background-position: -150px -480px;
		}
		.u-icn2-pfv, .u-icn2-pfdr, .u-icn2-pfyyr {
		    width: 68px;
		    height: 20px;
		}
		.u-icn2-pfv {
		    background-position: 0 -480px;
		}
		.vip-code-230 {
		    width: 38px;
		    height: 36px;
		    background-image: url(http://p1.music.126.net/DjfcGsYjT1HqrIQk9YdV7Q==/109951163322550511.png);
		    background-size: 100% 20px;
		    background-repeat: no-repeat;
		    background-position: center;
		    float: left;
		    margin-left: 10px;
		}
	}
</style>