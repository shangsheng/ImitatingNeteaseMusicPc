<template>
	<div id="m-songs">
		<div class="ztag j-flag">
			<div class="n-srchrst">
				<div class="srchsongst" v-if="songsData">
					<div class="item f-cb h-flag  " v-for="(item,index) of songsData.songs" :class="{'even':index%2 !=0}" ><!--v-if="item.copyright"-->
						<div class="td">
							<div class="hd">
								<span class="cursor ply " :class="{'ply-z-slt':songsNum == index}" title="播放" data-res-action="play" :data-res-copyright="item.copyright" data-res-type="18" :data-res-id="item.id" :data-res-data="songsData.values" data-res-from="32" @click.stop="playSong" :data-res-index="index"></span>
							</div>
							
						</div>
						<div class="td w0">
							<div class="sn">
								<div class="text">
									<router-link :to="{path:'/song',query:{id:item.id}}">
										<b :title="item.name" v-html="searchValue(item.name,songsData.values)"></b>
									</router-link>
									<router-link :to="{path:'/mv',query:{id:item.mvid}}" class="mv" v-if="item.mvid !=0" title="MV"></router-link>
								</div>
							</div>
						</div>
						<div class="td">
							<div class="opt hshow">
								<span class="u-icn u-icn-81 icn-add cursor" title="添加到播放列表" :data-res-copyright="item.copyright" data-res-type="18" :data-res-id="item.id" data-res-action="addto" data-res-from="32" :data-res-data="songsData.values"></span>
								<span class="icn icn-fav cursor" title="收藏" data-res-action="fav" :data-res-id="item.id"  data-res-type="18"></span>
								<span class="icn icn-share cursor" title="分享" data-res-action="share" :data-res-id="item.id"  data-res-type="18"></span>
								<span class="icn icn-dl cursor" title="下载" data-res-action="download" :data-indexid="'NL'+item.id" :data-res-id="item.id"  data-res-type="18"></span>
							</div>
						</div>
						<div class="td w1">
							<div class="text">
								<router-link :to="{path:'/artist',query:{id:aItem.id}}" v-for="(aItem,aNum) in item.artists" v-html="searchValue(aNum == item.artists.length-1 && aItem.name || (aItem.name + '/'),songsData.values)">
									
								</router-link>
							</div>
						</div>
						<div class="td w2">
							<div class="text">
								<router-link :to="{path:'/album',query:{id:item.album.id}}" class="s-fc3" :title="item.album.name" v-html="searchValue(item.album.name,songsData.values)"></router-link>
							</div>
						</div>
						<div class="td">
							{{item.duration}}
						</div>
					</div>
					<!--<div class="item f-cb h-flag  js-dis"  :class="{'even':index%2 !=0}" v-else>
						<div class="td">
							<div class="hd">
								<span class="cursor ply " title="播放" data-res-action="play" :data-res-copyright="item.copyright" data-res-type="18" :data-res-id="item.id" :data-res-data="songsData.values" data-res-from="32"></span>
							</div>
							
						</div>
						<div class="td w0">
							<div class="sn">
								<div class="text">
									<router-link :to="{path:'/song',query:{id:item.id}}">
										<b :title="item.name" v-html="searchValue(item.name,songsData.values)"></b>
									</router-link>
									<router-link :to="{path:'/mv',query:{id:item.mvid}}" class="mv" v-if="item.mvid !=0" title="MV"></router-link>
								</div>
							</div>
						</div>
						<div class="td">
							<div class="opt hshow">
								<span class="u-icn u-icn-81 icn-add cursor" title="添加到播放列表" :data-res-copyright="item.copyright" data-res-type="18" :data-res-id="item.id" data-res-action="addto" data-res-from="32" :data-res-data="songsData.values"></span>
								<span class="icn icn-fav cursor" title="收藏" data-res-action="fav" :data-res-id="item.id"  data-res-type="18"></span>
								<span class="icn icn-share cursor" title="分享" data-res-action="share" :data-res-id="item.id"  data-res-type="18"></span>
								<span class="icn icn-dl cursor" title="下载" data-res-action="download" :data-indexid="'NL'+item.id" :data-res-id="item.id"  data-res-type="18"></span>
							</div>
						</div>
						<div class="td w1">
							<div class="text">
								<router-link :to="{path:'/artist',query:{id:aItem.id}}" v-for="(aItem,aNum) in item.artists" v-html="searchValue(aNum == item.artists.length-1 && aItem.name || (aItem.name + '/'),songsData.values)">
									
								</router-link>
							</div>
						</div>
						<div class="td w2">
							<div class="text">
								<router-link :to="{path:'/album',query:{id:item.album.id}}" class="s-fc3" :title="item.album.name" v-html="searchValue(item.album.name,songsData.values)"></router-link>
							</div>
						</div>
						<div class="td">
							{{item.duration}}
						</div>
					</div>-->
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	
	export default {
  name: 'mSongs',
  props:['songsData'],
  data () {
    return {
    	songsNum:null,
    	
    }
     
  },
  inject:['reload'],
  
   beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			console.log(this.songsData)
			let that = this;
		 	
		 	if(this.songsData){
		 		this.$.each(this.songsData.songs,function(index,item){
			 		item.duration = that.$formatTime(item.duration/1000);
			 		if(item.copyrightId){
			 			item.copyright = 1;
			 		}else{
			 			item.copyright = 0;
			 		}
			 	})
		 	}
		 	this.getAllMsg()
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

			focus: {
			
				update: function (el, {value}) {
				
					if (value) {
					
						el.focus()
						
					
					}
				
				}
			
			}
		
		},
        methods:{
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
					this.songsNum = $event.target.getAttribute('data-res-index')
					
				}else{
					console.log('点击播放图标不正确')
				}
       		},
       		getAllMsg(){
        		console.log(this.songsData)
				var _this = this;
			
					var songsData = JSON.parse(_this.$localUtil('songsData'))
					console.log(songsData)
				
						this.$.each(_this.songsData.songs,function(index,el){
							if( songsData &&el.id == songsData.id){
									console.log(songsData.id)
									_this.songsNum = index
	//								JSON.parse(_this.$localUtil('songsNum'))
							}
						})
					
				}
        },
    	//监听
        watch: {
            '$route' (to, from) {

                console.log(to)
                console.log(from)
                
                if(this.$route.query.s){
                    //this.reload()
                    this.getAllMsg()
                }

            }
        }
}
</script>

<style  lang="less">
	#m-songs{
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
		.n-srchrst .srchsongst .hd .ply-z-slt, .n-srchrst .srchsongst .hd .ply-z-slt:hover {
		    background-position: -20px -128px;
		}
	}
</style>