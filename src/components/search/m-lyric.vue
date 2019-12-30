<template>
	<div id="m-lyric">
		<div class="ztag j-flag">
			<div class="n-srchrst">
				<div class="srchsongst" v-if="mLyricData">
					<div  v-for="(item,index) of mLyricData.songs"  >
						<div class="item f-cb h-flag  " :class="{'even':index%2 !=0}">
						<div class="td">
							<div class="hd">
								<span class="cursor ply " title="播放" data-res-action="play" :data-res-copyright="item.copyright" data-res-type="18" :data-res-id="item.id" :data-res-data="mLyricData.values" data-res-from="32"></span>
							</div>
							
						</div>
						<div class="td w0">
							<div class="sn">
								<div class="text">
									<router-link :to="{path:'/song',query:{id:item.id}}">
										<b :title="item.name" v-html="searchValue(item.name,mLyricData.values)"></b>
									</router-link>
									<router-link :to="{path:'/mv',query:{id:item.mvid}}" class="mv" v-if="item.mvid !=0" title="MV"></router-link>
								</div>
							</div>
						</div>
						<div class="td">
							<div class="opt hshow">
								<span class="u-icn u-icn-81 icn-add cursor" title="添加到播放列表" :data-res-copyright="item.copyright" data-res-type="18" :data-res-id="item.id" data-res-action="addto" data-res-from="32" :data-res-data="mLyricData.values"></span>
								<span class="icn icn-fav cursor" title="收藏" data-res-action="fav" :data-res-id="item.id"  data-res-type="18"></span>
								<span class="icn icn-share cursor" title="分享" data-res-action="share" :data-res-id="item.id"  data-res-type="18"></span>
								<span class="icn icn-dl cursor" title="下载" data-res-action="download" :data-indexid="'NL'+item.id" :data-res-id="item.id"  data-res-type="18"></span>
							</div>
						</div>
						<div class="td w1">
							<div class="text">
								<router-link :to="{path:'/artist',query:{id:aItem.id}}" v-for="(aItem,aNum) in item.artists" v-html="searchValue(aNum == item.artists.length-1 && aItem.name || (aItem.name + '/'),mLyricData.values)">
									
								</router-link>
							</div>
						</div>
						<div class="td w2">
							<div class="text">
								<router-link :to="{path:'/album',query:{id:item.album.id}}" class="s-fc3" :title="item.album.name" v-html="searchValue(item.album.name,mLyricData.values)"></router-link>
							</div>
						</div>
						<div class="td">
							{{item.duration}}
						</div>
					</div>
						<div class="lyric" >
							<div :class="{'f-hide':!item.lyric[index].fHide}">
								<p v-for="(lyricItem,nums) of item.lyric[index].lyric" v-if="nums<5&&lyricItem[1]!= 'undefined'" >{{lyricItem[1]}}</p>
							</div>
							<div :class="{'f-hide':item.lyric[index].fHide}">
								<p v-for="lyricItem of item.lyric[index].lyric" v-if="lyricItem[1]!= 'undefined'">{{lyricItem[1]}}</p>
							</div>
							<div class="crl">
								<span class="s-fc3  cursor" @click.stop="fbrkTab(index)">
									{{lyricData[index].fHide?'展开':'收起'}}
									<i class="u-icn " :class="[item.lyric[index].fHide?'u-icn-69':'u-icn-70']"></i>
								</span>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
  name: 'mLyric',
  props:['mLyricData'],
  data () {
    return {
    	lyricHidden:false,//没有歌词时
    	lyricData:[],
    	fHide:true,
    }
     
  },
  inject:['reload'],//app.vueҳ���ж����¼���
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		console.log(this.mLyricData)
		let that = this;
		 let  lyricGet =  (id)=>{
				var that = this;
				var arrLyric = [];
				var lyric = [];
				var tlyric = [];
				var lyricObj = {};
				this.$.ajax({
					method:'get',
		         	url:that.$host+'/lyric?id='+ id,
		         	async: false,
		         	success:function(res){
		         	console.log(res)
		         	if(res.lrc){
		         		if(res.lrc.lyric !== ''){
		         			arrLyric = res.lrc.lyric.split('[');
				         	
				         	if(res.tlyric.lyric){
				         		
				         		that.$.each(res.tlyric.lyric.split('['),function(index,item){
				         			var tarrItem = item.split(']')
				         			
				         			tlyric.push(tarrItem[1])
				         			
				         		})
				         	}
				         	that.$.each(arrLyric,function(index,item){
				         		
				         		var arrItem = item.split(']')
				         		arrItem[0] = that.$secondTime(arrItem[0])
				         		arrItem.push(tlyric[index])
				         		lyric.push(arrItem)
				         	})
				         	lyricObj = {lyric:lyric,tlyric:tlyric,fHide:that.fHide};
				         	console.log(lyricObj)
				         	that.lyricData.push(lyricObj)
				         	console.log(that.lyricData)
				         	//that.lyric2 = that.lyric
				         	that.lyricHidden = false;
		         		}else{
		         			lyricObj = {lyric:lyric,tlyric:tlyric,fHide:that.fHide};
		         			that.lyricData.push(lyricObj)
		         			that.lyricHidden = true;
		         		}
		         		
		         	}else{
		         		lyricObj = {lyric:lyric,tlyric:tlyric,fHide:that.fHide};
		         		that.lyricData.push(lyricObj)
		         		that.lyricHidden = true;
		         	}
		         	
		         },
		         error:function(res){
		         	console.log('请求失败：'+res);
		         }
				})
				
			}
		 if(this.mLyricData){
		 		this.$.each(this.mLyricData.songs,function(index,item){
			 		item.duration = that.$formatTime(item.duration/1000);
			 		if(item.copyrightId){
			 			item.copyright = 1;
			 		}else{
			 			item.copyright = 0;
			 		}
			 		lyricGet(item.id);
			 		item.lyric = that.lyricData;
			 		console.log(item)
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
            console.group('beforeDestroy 销毁前状态̬===============��');
            
        },
        destroyed: function () {
            console.group('destroyed 销毁完全状态==============��');
            
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
        	
			fbrkTab(indexs){
        		if(this.lyricData[indexs].fHide){
        			this.lyricData[indexs].fHide = false;
        		}else{
        			this.lyricData[indexs].fHide = true;
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

<style  lang="less">
	#m-lyric{
		text-align: left;
		.n-srchrst {
		    margin-top: 20px;
		    .srchsongst {
		    	.item {
				    padding: 10px 10px 8px 18px;
				    border: 1px solid #fff;
				}
				 .even {
				    background: #f7f7f7;
				    border-color: #f7f7f7;
				}
				.td {
				    float: left;
				    margin-right: 5px;
				}
				.hd {
				    height: 17px;
				    width: 17px;
				    .ply {
					    display: inline-block;
					    width: 17px;
					    height: 17px;
					    margin-right: 15px;
					    cursor: pointer;
					    background-position: 0 -103px;
					}
				}
				.text {
				    width: 100%;
				    overflow: hidden;
				    white-space: nowrap;
				    text-overflow: ellipsis;
				}
				.w0 {
				    width: 370px;
				    .text {
					    position: relative;
					    display: inline-block;
					    *display: inline;
					    *zoom: 1;
					    padding-right: 25px;
					    width: auto;
					    max-width: 100%;
					    height: 20px;
					}
				}
				 b {
				    font-weight: normal;
				}
				.hshow {
				    visibility: hidden;
				}
				 .u-icn-81 {
				    margin-right: 8px;
				    margin-bottom: 3px;
				}
				.icn {
				    display: inline-block;
				    vertical-align: middle;
				    width: 18px;
				    height: 16px;
				    cursor: pointer;
				    margin: 0 7px 0 0;
				}
				 .icn-fav {
				    margin-left: 0;
				    background-position: 0 -174px;
				}
				.icn-share {
				    background-position: 0 -195px;
				}
				.icn-dl {
				    background-position: -81px -174px;
				}
				.w1 {
				    width: 15%;
				    margin-right: 12px;
				}
				.w2 {
				    width: 18%;
				    margin-right: 12px;
				}
				 .mv {
				    background-position: 0 -151px;
				}
		    }
		}
		.u-icn-81 {
		    width: 13px;
		    height: 13px;
		    background-position: 0 -700px;
		}
		.n-srchrst .srchsongst .item:hover, .n-srchrst .srchsongst .z-hover {
		    border: 1px solid #e1e1e1;
		    background: #f2f2f2;
		}
		.n-srchrst .srchsongst .item:hover .hshow, .n-srchrst .srchsongst .z-hover .hshow {
		    visibility: visible;
		}
		.u-icn-81:hover {
		    background-position: -22px -700px;
		}
		.n-srchrst .srchsongst .icn-fav:hover {
		    background-position: -20px -174px;
		}
		.n-srchrst .srchsongst .icn-share:hover {
		    background-position: -20px -195px;
		}
		.n-srchrst .srchsongst .icn-dl:hover {
		    background-position: -104px -174px;
		}
		.n-srchrst .srchsongst .mv, .n-srchrst .srchsongst .mv-dis {
		    position: absolute;
		    right: 0;
		    display: inline-block;
		    vertical-align: middle;
		    width: 23px;
		    height: 17px;
		}
		.n-srchrst .srchsongst .js-dis * {
		    color: #bbb !important;
		}
		.n-srchrst .srchsongst .js-dis:hover .opt, .n-srchrst .srchsongst .js-dis .z-hover .opt {
		    visibility: hidden;
		}
		.n-srchrst .srchsongst .lyric {
		    margin: 10px 0 18px 52px;
		    color: #666;
		    line-height: 23px;
		    word-wrap: break-word;
		    word-break: break-all;
		     .crl {
			    margin-top: 5px;
			}
			 .u-icn {
			    margin-left: 5px;
			}
		}
		.u-icn-69, .u-icn-70 {
		    width: 11px;
		    height: 8px;
		    background-position: -65px -520px;
		}
		.u-icn-70 {
		    background-position: -45px -520px;
		}
	}
</style>