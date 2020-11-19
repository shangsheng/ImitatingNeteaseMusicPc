<template>
	<div id="song">
		<div class="g-bd4 f-cb">
			<div class="g-mn4">
				<div class="g-mn4c">
					<div class="g-wrap6" v-if="songs">
						<div class="m-lycifo" v-for="itemSongs of songs">
							<div class="f-cb">
								<div class="cvrwrap f-cb f-pr">
									<div class="u-cover u-cover-6 f-fl">
										<img :src="itemSongs.al.picUrl"/>
										<span class="msk f-alpha"></span>
									</div>
									<div class="out s-fc3">
										<i class="u-icn u-icn-95 f-fl"></i>
										<router-link :to="{path:'/outchain/2/',query:{id:itemSongs.al.id}}" class="des s-fc7">生成外链播放器</router-link>
									</div>
								</div>
								<div class="cnt">
									<div class="hd">
										<i class="lab u-icn u-icn-37"></i>
										<div class="tit">
											<em class="f-ff2">{{itemSongs.name}}</em>
											<router-link :to="{path:'/mv',query:{id:itemSongs.mv}}" v-if="itemSongs.mv" :title="itemSongs.al.name">
												<i class="icn u-icn u-icn-2"></i>
											</router-link>
											<div class="subtit f-fs1 f-ff2" v-if="itemSongs.tns">
												{{itemSongs.tns?itemSongs.tns[0]:''}}
											</div>
										</div>
									</div>
									<p class="des s-fc4">
										歌手:
										<span  :title="itemSongs.arName">
											<router-link :to="{path:'/artist',query:{id:item.id}}" class="s-fc7" v-for="(item,index) in itemSongs.ar">{{item.name}} <i v-if="index<songs.ar-1">/</i></router-link>
										</span>
									</p>
									<p class="des s-fc4">
										所属专辑:
										<router-link :to="{path:'/album',query:{id:itemSongs.al.id}}" class="s-fc7">{{itemSongs.al.name}}</router-link>
									</p>
									<play-songs v-bind:playlistArr="playSongs" v-if="playSongs"></play-songs>
									<div class="bd bd-open f-brk f-ib">
										<p class="j-flag "   v-for="(item,index) in lyric" v-if="index<10"  v-bind:hidden="item[0] == false">{{item[1]}}</br>{{ item[2]? item[2]:''}}</p>
										<!--<p class="j-flag " ref="lyricLines"  :class="{'z-sel': currentLineNum == index}" :data-time="item[0]"  v-for="(item,index) in tlyric"  v-bind:hidden="item.length == 1" v-if="tlyric.length != 0">{{item[1]}}</p>-->
										<!--暂无歌词-->
										<div class="nocnt nolyric" v-bind:hidden="!lyricHidden">
											<span class="s-fc4">{{songs.name}},暂无歌词</span>
										</div>
										<div  :class="{'f-hide':fHide}">
											<p class="j-flag "   v-for="(item,index) in lyric" v-if="index>=10"  v-bind:hidden="item[0] == false">{{item[1]}}</br>{{ item[2]? item[2]:''}}</p>
										</div>
									</div>
									
									<div class="crl" v-if="!lyricHidden">
										<span class="s-fc7  cursor" @click.stop="fbrkTab">
											{{fHide?'展开':'收起'}}
											<i class="u-icn " :class="[fHide?'u-icn-69':'u-icn-70']"></i>
										</span>
									</div>
								</div>
							</div>
							<div class="lrc-user">
								<p>
									<router-link :to="{path:'/lyric/report',query:{id:songs.id}}" class="f-tdu s-fc4">纠错</router-link>
								</p>
								<p class="s-fc3" v-if="transUser">
									&nbsp;&nbsp;&nbsp;&nbsp;贡献翻译:
									<router-link :to="{path:'/user/home',query:{id:transUser.id}}" class="f-tdu s-fc7">{{transUser.nickname}}</router-link>
								</p>
							</div>
						</div>
						<my-comments></my-comments>
					</div>
					<div class="u-load s-fc4" v-else>
						<i class="icn"></i>			
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import eventVue from '../../../static/js/eventVue.js'
	export default {
	name:'song',
    data () {
      return {
        songs:null,
        title:'歌曲详情',
        playSongs:{},
        lyricSong:null,
        zSlt:'gdxq',
        lyric:[],//歌词
	    tlyric:[],//翻译
	    lyricHidden:false,
	    fHide:true,
	    transUser:null,
	    barVoice:true
      }
    },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			var that = this;
			var id = this.$route.query.id;
			var playlistSongs = new Object();
			this.$http({
		         	method:'get',
		         	url:that.$host+'/song/detail?ids='+id
		         }).then(function(res){
		         	console.log(res.data)
		         	that.$.each(res.data.songs[0].ar,function(index,el){
		         		var arName = '';
		         		if(index<res.data.songs[0].ar.length){
		         			res.data.songs[0].arName = arName + el.name + '/'
		         		}else{
		         			res.data.songs[0].arName = arName + el.name
		         		}
		         	})
		         	
		         	playlistSongs.id = res.data.songs[0].id;
//		         	playlistSongs.specialType = res.data.songs[0].specialType;
		         	playlistSongs.name = res.data.songs[0].name;
		         	playlistSongs.liked = true;
		         	playlistSongs.types = 18;
		  
		         	that.songs = res.data.songs;
		         	that.title = res.data.songs[0].name + ' - 歌单 - 我的云音乐'
//		         	that.$root.eventVue.$emit('titles',that.title)
		         }).catch(res=>{
		         	console.log('请求失败：'+res);
		         })
		    var arrLyric = [];
			that.lyric = [];
			that.tlyric = [];
			
		    this.$http({
		         	method:'get',
		         	url:that.$host+'/lyric?id='+ id
		        }).then(function(res){
		         	console.log(res)
		         	if(res.data.lrc){
		         		if(res.data.lrc.lyric !== ''){
		         			arrLyric = res.data.lrc.lyric.split('[');
				         	
				         	if(res.data.tlyric.lyric){
				         		
				         		that.$.each(res.data.tlyric.lyric.split('['),function(index,item){
				         			var tarrItem = item.split(']')
				         			
				         			that.tlyric.push(tarrItem[1])
				         			
				         		})
				         	}
				         	that.$.each(arrLyric,function(index,item){
				         		
				         		var arrItem = item.split(']')
				         		arrItem[0] = that.$secondTime(arrItem[0])
				         		arrItem.push(that.tlyric[index])
				         		that.lyric.push(arrItem)
				         	})
				         	
				         	//that.lyric2 = that.lyric
				         	that.lyricHidden = false;
		         		}else{
		         			that.lyricHidden = true;
		         		}
		         		console.log(that.lyric)
		         	}else{
		         		that.lyricHidden = true;
		         	}
		         	that.transUser = res.data.transUser
		         }).catch(res=>{
		         	console.log('请求失败：'+res);
		         })
		    this.$root.eventVue.$emit('zSltV',this.zSlt)
		    this.$root.eventVue.$emit('barVoice',this.barVoice)
		    this.$root.eventVue.$on('commentCount',(data)=>{
		    	console.log(data)
		    	playlistSongs.commentCount = data;
		    	that.playSongs =playlistSongs;
		    })
        },
        beforeMount: function () {
//          debugger;
        },
        mounted: function () {
//          debugger;
			
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
        	fbrkTab(){
        		if(this.fHide){
        			this.fHide = false;
        		}else{
        			this.fHide = true;
        		}
        	}
        }
  }
</script>

<style lang="less" >
	#song{
		text-align: left;
		.m-lycifo {
		    margin-top: -10px;
		    .cvrwrap {
			    float: left;
			    width: 206px;
			    margin-right: -226px;
			    .out {
				    float: left;
				    margin: 20px 0 0 46px;
				}
			}
			.des {
			    margin: 10px 0;
			    /*text-decoration: underline;*/
			    span {
				    color: #333;
				}
				
			}
			.cnt {
			    float: right;
			    width: 414px;
			}
			.hd {
				.lab {
				    float: left;
				}
			}
			.tit {
			    margin-left: 64px;
			    position: relative;
			    top: -6px;
			    font-size: 24px;
			     * {
				    vertical-align: middle;
				}
				em {
				    margin-right: 7px;
				}
			}
			.subtit {
			    margin: 1px 0 5px;
			    color: #bababa;
			}
			.bd {
			    height: 299px;
			    margin-top: 13px;
			    line-height: 23px;
			}
			.bd-open {
			    height: auto;
			}
			.crl {
			    margin-top: 5px;
			}
		}
		
		.u-cover-6 {
		    width: 198px;
		    height: 198px;
		    img {
			    width: 130px;
			    height: 130px;
			    margin: 34px;
			}
			.msk {
			    width: 206px;
			    height: 205px;
			    top: -4px;
			    left: -4px;
			    background-position: -140px -580px;
			    _background-position: 0 0;
			}
		}
		.u-icn-37 {
		    width: 54px;
		    height: 24px;
		    background-position: 0 -463px;
		}
		.u-icn-69, .u-icn-70 {
		    width: 11px;
		    height: 8px;
		    background-position: -65px -520px;
		}
		.u-icn-70 {
		    background-position: -45px -520px;
		}
		.u-icn-2 {
		    width: 21px;
		    height: 18px;
		    background-position: 0 -18px;
		}
		.f-fs1 {
		    font-size: 14px;
		}
		.g-bd4{
			width: 980px;
		}
		.lrc-user {
		    text-align: right;
		    margin-top: 48px;
		    line-height: 30px;
		    p{
		    	text-align: right;
		    }
		}
		.f-tdu, .f-tdu:hover {
		    text-decoration: underline;
		}
	}
</style>