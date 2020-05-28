<template>
	<div id="my">
		<div class="g-bd g-bd-full" v-if="loginBs">
			<div class="n-pglg">
				<div class="pic">
					<h2>登录网易云音乐</h2>
					<span class="btn cursor" data-idName="l" @click.stop="logShow($event)">立即登录</span>
				</div>
			</div>
		</div>
		<div class="g-mymusic" v-else>
			<div class="g-bd3 p-mymusic f-cb">
				<div class="g-sd3 u-scroll n-musicsd f-pr j-flag">
					<div v-for="(item,nIndex) in subcount" v-if="item.countfalse&&subCountData[item.name]!=0">
						<h2 class="usersub">
							<router-link :to="{path:item.pathUrl}" class="f-fs1 s-fc0 f-ff1">{{item.title}}({{subCountData[item.name]}})</router-link>
						</h2>
					</div>
					<div class="n-minelst n-minelst-1" v-else-if="subCountData[item.name]!=0" :class="{'n-minelst-hide':!item.playlistFalse}">
						<h2 class="f-ff1">
							<span class="u-btn u-btn-crt f-fr j-flag cursor"  data-action="create-playlist" v-if="item.name == 'createdPlaylistCount'">
								<i>新建</i>
							</span>
							<span class="rtitle f-pr cursor" data-action="spread" @click.stop="createPlaylist(item.playlistFalse,nIndex)">
								<i class="tri tri1"></i>
								{{item.title}}
								<span class="f-pa f-r-black-icon" style="display:inline-block;width:8px;height:8px;background-size:cover;"></span>
								<span class="f-r-icon-dis-5"></span>
								(<span class="j-flag">{{subCountData[item.name]}}</span>)
							</span>
						</h2>
						<ul class="j-flag f-cb" >
							<li class="j-iflag " :class="{'z-selected':itemz.num == indexZn}"  :data-res-index="indexZ" v-for="(itemz,indexZ) of item.cHeaderData" v-bind:key="indexZ">
								<div class="item f-cb" :data-res-id="itemz.id" @click.stop="getMyHttp($event)">
									<div class="left" @click.stop="getMyHttp($event)">
										<span class="avatar" @click.stop="getMyHttp($event)">
											<img :src="itemz.coverImgUrl" :data-res-id="itemz.id" @click.stop="getMyHttp($event)"/>
										</span>
									</div>
									<p class="name f-thide" @click.stop="getMyHttp($event)">
										<span class="s-fc0" :title="itemz.name" :data-res-id="itemz.id" @click.stop="getMyHttp($event)">{{itemz.name}}</span>
									</p>
									<p class="s-fc4 f-thide num" @click.stop="getMyHttp($event)">
										{{itemz.trackCount}}首 <i v-if="item.name == 'subPlaylistCount'" :data-res-id="itemz.id" @click.stop="getMyHttp($event)">by {{itemz.creator.nickname}}</i>
									</p>
								</div>
								
								<span class="oper hshow" v-if="indexZ!=0&&item.name == 'createdPlaylistCount'">
									<i class="u-icn u-icn-10" title="编辑"></i>
									<i class="u-icn u-icn-11" data-action="delete" :data-id="itemz.id" data-res-type="13" :data-res-name="item.name" :data-res-index="indexZ" title="删除" @click.stop="playlistDel($event)"></i>
								
								</span>
								<span class="oper hshow" v-else-if="item.name != 'createdPlaylistCount'">
									
									<i class="u-icn u-icn-11" data-action="delete" :data-id="itemz.id" data-res-type="13" :data-res-name="item.name" :data-res-index="indexZ" title="删除" @click.stop="Cancelsonglist($event)"></i>
								
								</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="g-mn3 f-pr j-flag">
					<my-playlist></my-playlist>
				</div>
			</div>
		</div>
		<div class="auto-1577339630725 m-layer z-show m-layer-w2" v-bind:hidden="deleteHidden">
			<div class="zbar" id="auto-id-DTTn9wxfR1pm0AGk">
				<div class="zttl f-thide">
					提示
				</div>
			</div>
			<div class="zcnt scgd">
				<div class="lyct f-cb f-tc">
					<div class="f-fs1">
						确定要删除歌单？
					</div>
					<div class="lybtn">
						<span class="u-btn2 u-btn2-2 u-btn2-w2" @click.stop="delClick">
							<i>确定</i>
						</span>
						<span class="u-btn2 u-btn2-1 u-btn2-w2" @click.stop="scHidden">
							<i>取消</i>
						</span>
					</div>
				</div>
			</div>
			<span class="zcls" title="关闭窗体" @click.stop="scHidden">x</span>
		</div>
		<div class="auto-1577339630724" v-bind:hidden="deleteHidden"></div>
	</div>
</template>

<script>
	import myPlaylist from '@/components/my/my-playlist.vue'
	export default {
  name: 'my',
  data () {
    return {
    	myData:{},
    	mNavfst:'wdyy',
        navBul:true,
        loginBs:true,
        subcount:[{'title':'我的歌手','name':'artistCount','countfalse':true,'pathUrl':'/my/m/music/artist'},{'title':'我的电台','name':'djRadioCount','countfalse':true,'pathUrl':'/my/m/music/radio'},{'title':'我的视频','name':'mvCount','countfalse':true,'pathUrl':'/my/m/music/mv'},
        		  {'title':'创建的歌单','name':'createdPlaylistCount','countfalse':false,'playlistFalse':false,'cHeaderData':[]},{'title':'收藏的歌单','name':'subPlaylistCount','countfalse':false,'playlistFalse':false,'cHeaderData':[]}],
        subCountData:{},
       indexZn:0,
       barVoice:true,
       deleteHidden:true,
    }
     
  },
  components:{
  	myPlaylist,
  },
  inject:['reload'],//app.vueҳ���ж����¼���
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		this.$root.eventVue.$emit('navBul',this.navBul);
	    this.$root.eventVue.$emit('mNavfst',this.mNavfst);
	    this.$root.eventVue.$emit('barVoice',this.barVoice);
		  var that =this;
		  var id = this.$route.query.id
		  console.log(this.$route)
	         if(this.$cookieUtil("email")){
					this.$logoRefresh(function(ress){
						console.log(ress)
						
						that.loginBs = false;
						that.$http({
				         	method:'get',
				         	url:that.$host+"/user/subcount"
				         }).then(function(res){
				         	console.log(res.data)
				         	that.$http({
					         	method:'get',
					         	url:that.$host+"/mv/sublist"
					         }).then(function(resvideo){
					         	console.log(resvideo.data)
					         	res.data.mvCount = resvideo.data.count
					         }).catch(res=>{
					         	console.log(res);
					         })
				         that.subCountData = res.data
				         }).catch(res=>{
				         	console.log('请求失败：'+res.data+','+res.statusText);
				         })
				         that.$http({
				         	method:'get',
				         	url:that.$host+"/user/playlist?uid="+ress.data.profile.userId
				         }).then(function(res){
				         	console.log(res.data)
				         	that.$.each(res.data.playlist,function(index,el){
						       	el.name =  el.name.replace(new RegExp(ress.data.profile.nickname,'gm'),'我')  
						       	if(el.creator.userId == ress.data.profile.userId){
						       		el.num = index
						       		that.subcount[that.subcount.length-2].cHeaderData.push(el)
						       	}else{
						       		el.num = index
						       		that.subcount[that.subcount.length-1].cHeaderData.push(el)
						       }
						       	if(id == el.id){
						       		that.indexZn = index
						       	}
				        	})
				         	
				         }).catch(res=>{
				         	console.log(res);
				         })
					})
					if(that.$route.name == 'my'&& !id){
						that.$router.push({
			                path: '/my/m/music/playlist',
			                query:{id:'704839883'}
			            })
					}
					
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
        	//登录显示
        	logShow($event){
        		var dataIdName = $event.target.getAttribute('data-idName');
        		console.log(dataIdName)
        		this.$root.eventVue.$emit('classify',dataIdName)
        		this.$toggleBody(1)
        		this.$drage('auto-id-e0uH7BGEq0gyq7zi')
        	},
        	getMyHttp($event){
        		console.log($event)
        		let id = $event.target.getAttribute('data-res-id')
        		console.log(id)
        		this.$router.push({
			        path: '/my/m/music/playlist',
			        query:{id:id}
			    })
        		
        	},
        	createPlaylist(flag,nIndex){
        		if(flag){
        			
        			this.$nextTick(()=>{
			        	this.subcount[nIndex].playlistFalse=false
			        })
        		}else{
        			console.log(flag)
        			console.log(nIndex)
        			this.$nextTick(()=>{
			        	this.subcount[nIndex].playlistFalse=true
			        })
        		}
        		 
        	},
        	//取消收藏歌单
        	Cancelsonglist($event){
        		var that = this;
        		this.$collection(this,{
			  		resAction:'fav',
			  		actionT:2
			  	},$event,0,function(data,option){
			  		console.log(data)
			  		if(data == 200){
			  			that.$root.eventVue.$emit('qxscHidden',false);
			  			console.log($event)
			  			let resIndex = $event.currentTarget.getAttribute('data-res-index')
	        			if($event.currentTarget.getAttribute('data-res-name') == 'createdPlaylistCount'){
	        				that.subcount[3].cHeaderData.splice(resIndex,1)
	        			}else{
	        				that.subcount[4].cHeaderData.splice(resIndex,1)
	        			}
			  		}
			  	})
        	},
        	delClick(){
        		let that = this;
        		that.$http({
				    method:'get',
			     	url:that.$host+"/playlist/delete?id="+that.playId
		         }).then(res=>{
		         	console.log(res.data)
		         	that.scHidden();
		         }).catch(res=>{
		         	console.log(res)
		         })
        	},
        	playlistDel($event){
        		this.playId = $event.currentTarget.getAttribute('data-id');
        		this.deleteHidden = false;
        		this.$drage('auto-id-DTTn9wxfR1pm0AGk');
        		this.$toggleBody(1)
        	},
        	scHidden(){
		  	this.$set(this.$data,'deleteHidden',true)
        	this.$toggleBody(0)
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
	#my{
		text-align: left;
		.n-pglg {
		    width: 807px;
		    height: 268px;
		    margin: 0 auto 0;
		    padding-top: 104px;
		    background-position: 0 104px;
		     h2 {
			    height: 100px;
			    text-indent: -9999px;
			}
			.btn {
			    display: block;
			    width: 167px;
			    height: 45px;
			    margin: 102px 0 0 482px;
			    background-position: 0 9999px;
			    text-indent: -9999px;
			}
			.btn:hover {
			    background-position: 0 -278px;
			}
		}
		.g-sd3 {
		    float: left;
		    width: 240px;
		    /*position: fixed;
		    _position: absolute;*/
		}
		.n-musicsd {
		    padding-bottom: 50px;
		    padding-top: 40px;
		    .usersub {
			    position: relative;
			    height: 36px;
			    line-height: 36px;
			    font-weight: bold;
			    a {
				    display: block;
				    padding: 0 5px 2px 35px;
				}
				a:hover {
				    background: #eee;
				    text-decoration: none;
				}
			}
			.usersub.js-selected {
			    background: #eee;
			}
		}
		.p-mymusic .g-sd3 {
		    height: 100%;
		    overflow-y: auto;
		    overflow-x: hidden;
		    _zoom: 1;
		}
		.n-minelst-1 {
		    margin-top: 5px;
		}
		.n-minelst {
			h2 {
			    padding: 0 10px 12px 15px;
			    font-size: 14px;
			    color: #000;
			    font-weight: bold;
			}
			.rtitle {
			    cursor: pointer;
			}
			.tri {
			    display: inline-block;
			    vertical-align: middle;
			    margin: 0 2px 0 5px;
			    cursor: pointer;
			    font-size: 0;
			    height: 0;
			    line-height: 0;
			}
			.tri1 {
			    border-color: #ccc transparent transparent;
			    border-style: solid dashed dashed;
			    border-width: 8px 7px 0;
			}
			 ul * {
			    cursor: pointer;
			    vertical-align: middle;
			}
			li {
			    position: relative;
			    zoom: 1;
			    height: 42px;
			    padding: 6px 0 6px 20px;
			}
			.item {
			    padding-left: 50px;
			}
			.left {
			    display: inline;
			    float: left;
			    margin-left: -50px;
			    overflow: hidden;
			    width: 40px;
			}
			.avatar {
			    display: block;
			    position: relative;
			    width: 40px;
			    height: 40px;
			    img {
				    width: 40px;
				    height: 40px;
				}
			}
			 .name {
			    width: 150px;
			    overflow: hidden;
			    margin-top: 2px;
			    margin-bottom: 8px;
			     span {
				    white-space: nowrap;
				}
			}
			.num {
			    width: 130px;
			}
		}
		.u-btn-crt {
		    width: 52px;
		    height: 22px;
		    background-position: 0 -96px;
		    i {
			    display: inline-block;
			    line-height: 22px;
			    *line-height: 23px;
			    overflow: hidden;
			    padding-left: 20px;
			    color: #515151;
			    font-size: 12px;
			    font-weight: normal;
			}
		}
		.f-r-icon-dis-5 {
		    display: inline-block;
		    width: 10px;
		}
		.n-minelst li:hover, .n-minelst .z-hover {
		    background-color: #f4f2f2;
		    .oper {
		    	display: block;
		    }
		}
		.n-minelst li.z-selected, .n-minelst li.z-selected:hover {
		    background: #e6e6e6;
		}
		.n-minelst-hide {
			ul {
			    display: none;
			}
			.tri1 {
			    border: 8px solid #ccc;
			    border-color: transparent transparent transparent #ccc;
			    border-style: dashed dashed dashed solid;
			    margin-right: 0;
			}
		}
		.n-minelst .oper {
		    position: absolute;
		    bottom: 7px;
		    right: 0;
		    display: none;
		    .u-icn {
			    float: left;
			    margin-right: 10px;
			}
			
		}
		.u-icn-10 {
		    width: 13px;
		    height: 13px;
		    background-position: 0 -270px;
		}
		.u-icn-10:hover {
		    background-position: -20px -270px;
		}
		.u-icn-11 {
		    width: 13px;
		    height: 14px;
		    background-position: 0 -284px;
		}
		.u-icn-11:hover {
		    background-position: -20px -284px;
		}
	}
	.scgd{
		text-align: center;
	}
</style>