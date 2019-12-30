<template>
	<div id="plays" v-wechat-title="this.title">
		<div class="g-btmbar" v-if="barVoice">
			<div class="m-playbar m-playbar-lock" :class="['fixeds'?'m-playbar-lock':'m-playbar-unlock']" id="auto-id-tTDtnqRJsntkOJwF">
				<div class="updn">
					<div class="left f-fl">
						<span class="btn cursor" data-action="lock"></span>
					</div>
					<div class="right f-fl"></div>
				</div>
				<div class="bg"></div>
				<div class="hand" title="展示播放条"></div>
				<div class="wrap">
					<div class="btns">
						<span class="cursor prv" data-action="prev" title="上一首(ctrl+←)" @click.stop="prev">上一首</span>
						<span class="cursor ply j-flag" :class="{'pas':pasPlay}" data-action="play" title="播放/暂停(p)" @click.stop="play">播放/暂停</span>
						<span class="cursor nxt" data-action="next" title="下一首(ctrl+→)" @click.stop="next">下一首</span>
					</div>
					<div class="head j-flag" v-if="songsData&&songstracks.length>0">
						<img :src="songstracks[songsNum].album.picUrl" v-if="songstracks[songsNum].album"/>
						<img :src="songstracks[songsNum].al.picUrl" v-else-if="!songstracks[songsNum].dj"/>
						<img :src="songstracks[songsNum].coverUrl" v-else/>
						<router-link :to="{path:songsData.path,query:{id:songsData.id}}" class="mask"></router-link><!--歌曲图片-->
					</div>
					<div class="head j-flag" v-else>
						<img src="../../assets/default_album.jpg"/>
					</div>
					<div class="play" v-if="songsData&&songstracks.length>0">
						<div class="j-flag words" >
							<router-link :to="{path:songsData.path,query:{id:songsData.id}}" class="f-thide name fc1 f-fl" :title="songstracks[songsNum].name">{{songstracks[songsNum].name}}</router-link><!--歌曲名-->
							<router-link :to="{path:'/mv',query:{id:songstracks[songsNum].mvid}}" class="mv f-fl" v-bind:hidden="songstracks[songsNum].mvid == 0" title="mv" v-if="songstracks[songsNum].mvid !=undefined"></router-link>
							<router-link :to="{path:'/mv',query:{id:songstracks[songsNum].mv}}" class="mv f-fl" v-bind:hidden="songstracks[songsNum].mv == 0" title="mv" v-else></router-link>
							<span class="by f-thide f-fl" >
								<span :title="item.name" v-for="item in songstracks[songsNum].artists" v-if="songstracks[songsNum].artists">
									<router-link :to="{path:songsData.arPath,query:{id:item.id}}">{{item.name}}</router-link>
								</span>
								<span v-else-if="songstracks[songsNum].dj" :title="songstracks[songsNum].radio.name">
									<router-link :to="{path:songsData.arPath,query:{id:songstracks[songsNum].radio.id}}">{{songstracks[songsNum].radio.name}}</router-link>
								</span>
								<span :title="item.name" v-for="item in songstracks[songsNum].ar" v-else>
									<router-link :to="{path:songsData.arPath,query:{id:item.id}}">{{item.name}}</router-link>
								</span>
							</span><!--歌手名-->
							<router-link :to="{path:songsData.titlePath,query:{s:songsList.resData}}" class="src" :title="songsData.title" v-if="songslx[songsList.num].srarchB"></router-link><!--专辑链接-->
							<router-link :to="{path:songsData.titlePath,query:{id:songsList.id}}" class="src" :title="songsData.title" v-else-if="songslx[songsList.num].titlePath"></router-link>
						</div>
						
						<div class="m-pbar" data-action="noop">
							<div class="barbg j-flag" @click.stop="playbackClick($event)">
								<div class="rdy" :style="{width:rdyWidth+'%'}"></div>
								<div class="cur" :style="{width:curWidth+'%'}">
									<span class="btn f-tdn f-alpha" :class="{'z-load':longing}" @mousedown="playbackProgress($event)">
										<i></i>
									</span>
								</div>
								<audio
					                ref="audio"
					                @pause="onPause"
					                @play="onPlay"
					                @timeupdate="onTimeupdate"
					                @loadedmetadata="onLoadedmetadata"
					                preload="auto"
					                muted="muted"
					                :src="songsData.url"
					                controls="controls"
					                style="display:none;"
					              ></audio>
							</div>
							<span class="j-flag time">
								<em>{{timePlay}}</em>&nbsp;/
								{{timePlayLength}}
							</span>
						</div>
					</div>
					<div class="play" v-else>
						<div class="j-flag words"></div>
						<div class="m-pbar" data-action="noop">
							<div class="barbg j-flag" @click.stop="playbackClick($event)">
								<div class="rdy" :style="{width:rdyWidth+'%'}"></div>
								<div class="cur" :style="{width:curWidth+'%'}">
									<span class="btn f-tdn f-alpha" :class="{'z-load':longing}" @mousedown="playbackProgress($event)">
										<i></i>
									</span>
								</div>
							</div>
							<span class="j-flag time">
								<em>{{timePlay}}</em>
								{{timePlayLength}}
							</span>
						</div>
					</div>
					<div class="oper f-fl">
						<span class="icn icn-add j-flag cursor" data-anction="like" title="收藏" :data-id="songsData.id" @click.stop="logonSc($event)">收藏</span>
						<span class="icn icn-share cursor" data-action="share" title="分享">分享</span>
					</div>
					<div class="ctrl f-fl f-pr j-flag">
						<div class="m-vol" v-bind:hidden="vHidden">
							<div class="barbg"></div>
							<div class="vbg j-t" @click.stop="voiceDebug($event)">
								<div class="curr j-t" :style="{height:vHeight + 'px'}" @click.stop="voiceDebug($event)"></div>
								<span class="btn f-alpha j-t" :style="{top:vTop + 'px'}" @mousedown="voiceProgress($event)"></span>
							</div>
						</div>
						<span class="cursor icn icn-vol" data-action="volume" title="声音" @click.stop="showVoice"></span>
						<span class="cursor icn " :class="[playFs[playFsIndex].className]" data-action="mode" :data-res-id="playFs[playFsIndex].id" :title="playFs[playFsIndex].titles" @click.stop="playXs($event)"></span>
						<span class="add f-pr">
							<span class="tip" v-bind:hidden="tipTitle">已开始播放</span>
							<span class="icn icn-list s-fc3" data-action="panel" title="播放列表" @click.stop="showHideList">{{lengthTracks}}</span>
						</span>
						<div class="tip tip-1" v-bind:hidden="tipFs">
							{{playFs[playFsIndex].titles}}
						</div>
					</div>
				</div>
				<div class="list" v-if="songstracks.length>0"  v-bind:hidden="tracksHidden">
					<div class="listhd">
						<div class="listhdc">
							<h4>播放列表(<span class="j-flag">{{songstracks.length}}</span>)</h4>
							<span class="addall" data-action="likeall" :data-id="songsList.id" @click.stop="logonSc($event)">
								<i class="ico ico-add"></i>
								收藏全部
							</span>
							<span class="line"></span>
							<span class="clear" data-action="clear" @click.stop="removeBrowser">
								<i class="ico icn-del"></i>
								清除
							</span>
							<p class="lytit f-ff0 f-thide j-flag">{{songstracks[songsNum].name}}</p><!--歌名-->
							<span class="close" data-action="close" @click.stop="showHideList">关闭</span>
						</div>
					</div>
					<div class="listbd" >
						<img :src="picUrl() + songstracks[songsNum].album.picId_str" class="imgbg j-flag" v-if="songstracks[songsNum].album"/>
						<img :src="picUrl() + songstracks[songsNum].al.pic_str" class="imgbg j-flag" v-else-if="!songstracks[songsNum].dj"/>
						<img :src="songstracks[songsNum].blurCoverUrl" class="imgbg j-flag" v-else/>
						<div class="msk"></div>
						<div class="listbdc j-flag">
							
							<happy-scroll color="rgba(134,134,134,0.8)" :min-length-v="0.2" size="6" smaller-move-v="start" resize hide-horizontal>
								<ul class="f-cb">
									<li v-for="(item,index) in songstracks"  :class="{'z-sel':songsNum == index}" data-action="play" :data-index="index" :data-id="item.id" >
										<div class="col col-1">
											<div class="playicn"></div>
										</div>
										<div class="col col-2" @click.stop="songsListIndex($event)">
											{{item.name}}
										</div>
										<div class="col col-3">
											<div class="icns">
												<i class="ico icn-del" :data-id="item.id" data-action="delete" title="删除" @click.stop="songsDel">删除</i>
												<i class="ico ico-dl" :data-id="item.id" data-action="download" title="下载">下载</i>
												<i class="ico ico-share" :data-id="item.id" data-action="share" title="分享" >分享</i>
												<i class="j-t ico ico-add" :data-id="item.id" data-action="like" title="收藏" @click.stop="logonSc($event)">收藏</i>
											</div>
										</div>
										<div class="col col-4">
											<span title="" >
												<router-link :to="{path:'/artist',query:{id:val.id}}" v-for="(val,i) in item.artists" v-if="item.artists">{{val.name}}{{i != item.artists.length-1?'/':''}}</router-link>
												<router-link :to="{path:'/artist',query:{id:val.id}}" v-for="(val,i) in item.ar" v-else>{{val.name}}{{i != item.ar.length-1?'/':''}}</router-link>
											</span>
										</div>
										<div class="col col-5">
											{{item.dt}}
										</div>
										<div class="col col-6" ><!--来源-->
											<router-link :to="{path:songslx[songsList.num].titlePath,query:{s:songsList.resData}}" :class="{'ico-src-dis':songslx[songsList.num].titlePath == false}" class="ico ico-src" :title="songslx[songsList.num].title" v-if="songslx[songsList.num].srarchB">来源</router-link>
											<router-link :to="{path:songslx[songsList.num].titlePath,query:{id:songsList.id,songlist:item.id}}" :class="{'ico-src-dis':songslx[songsList.num].titlePath == false}" class="ico ico-src" :title="songslx[songsList.num].title" v-else>来源</router-link>
										</div>
									</li>
								</ul>
							</happy-scroll>
						</div>
						<!--<div class="bline j-flag bline-2">
							<span class="scrol scrol-2"></span>
						</div>-->
						<div class="ask j-flag">
							<i class="ico ico-ask"></i>
						</div>
						<div class="upload j-flag">
							<router-link :to="{path:'/lyric/report',query:{id:songstracks[songsNum].id}}">报错</router-link>
						</div>
						<div class="msk2"></div>
						
						<div class="msk2-listlyric">
							<happy-scroll color="rgba(134,134,134,0.8)" :min-length-v="0.2" size="6" :scroll-top="lyricPheight" smaller-move-v="start"  resize hide-horizontal ref="lyricScroll">
								<div class="listlyric j-flag" id="j-lyric">
									<p class="j-flag " ref="lyricLine"  :class="{'z-sel': currentLineNum == index}" :data-time="item[0]"  v-for="(item,index) in lyric"  v-bind:hidden="item[0] == false">{{item[1]}}</br>{{ item[2]? item[2]:''}}</p>
									<!--<p class="j-flag " ref="lyricLines"  :class="{'z-sel': currentLineNum == index}" :data-time="item[0]"  v-for="(item,index) in tlyric"  v-bind:hidden="item.length == 1" v-if="tlyric.length != 0">{{item[1]}}</p>-->
									<!--暂无歌词-->
									<div class="nocnt nolyric" v-bind:hidden="!lyricHidden">
										<span class="s-fc4">{{songstracks[songsNum].name}},暂无歌词</span>
									</div>
								</div>
							</happy-scroll>
						</div>
						<!--<div class="bline bline-1 j-flag">
							<span class="scrol scrol-1 j-flag"></span>
						</div>-->
					</div>
				</div>
				<div class="list" v-else v-bind:hidden="tracksHidden">
					<div class="listhd">
						<div class="listhdc">
							<h4>播放列表(<span class="j-flag">0</span>)</h4>
							<span class="addall" data-action="likeall" >
								<i class="ico ico-add"></i>
								收藏全部
							</span>
							<span class="line"></span>
							<span class="clear" data-action="clear" @click.stop="removeBrowser">
								<i class="ico icn-del"></i>
								清除
							</span>
							<p class="lytit f-ff0 f-thide j-flag"></p><!--歌名-->
							<span class="close" data-action="close" @click.stop="showHideList">关闭</span>
						</div>
					</div>
					<div class="listbd" >
						
						<div class="msk"></div>
						<div class="listbdc j-flag">
							
							<div class="nocnt">
								<i class="ico ico-face"></i>
								您还没有添加任何歌曲
								<br />
								去首页
								<router-link to="/discover/" class="f-tdu">发现音乐</router-link>
								,或在
								<router-link to="/my/">我的音乐</router-link>
								搜听自己收藏的歌单
							</div>
						</div>
						<div class="bline j-flag bline-2">
							<span class="scrol scrol-2" style="height: 260px; display: none; top: 0px;"></span>
						</div>
						<div class="ask j-flag">
							<i class="ico ico-ask"></i>
						</div>
						<div class="upload j-flag">
							报错
						</div>
						<div class="msk2"></div>
						
						<div class="msk2-listlyric">
							
						</div>
						
					</div>
				</div>
			</div>
		</div>
		<!--版权提示-->
		<div class="auto-1569208815672 m-layer z-show m-layer-w5" v-bind:hidden="qxHidden">
			<div class="zbar" id="auto-id-84n9GT7xhfGXTWds">
				<div class="zttl f-thide">
					提示
				</div>
				
			</div>
			<div class="zcnt">
				<div id="auto-id-rTJTmvnIp8AaBuOX">
					<div class="lyct f-tc">
						<div class="f-cb m-tipinfo">
							<i class="u-icn2 u-icn2-11 f-fl"></i>
							<div class="f-fr f-pr f-fs1 tip">
								版权方要求，当前专辑需单独付费，购买数字专辑即可无限畅享
							</div>
						</div>
					</div>
					<div class="lsbtn f-tc">
						<span class="u-btn2 u-btn2-2 u-btn2-2-h " data-action="ok"><i>立即订购</i></span>
						<span class="u-btn2 u-btn2-1 u-btn2-1-h " data-action="cc"><i>以后再说</i></span>
					</div>
				</div>		
			</div>
			<span class="zcls" title="关闭窗体" @click.stop="songsHidden">x</span>
		</div>
		<div class="auto-1569208815671" v-bind:hidden="qxHidden"></div>
		<!--添加单曲歌单-->
		<div class="auto-1576560301926 m-layer z-show m-layer-w2" v-bind:hidden="scgdHidden" v-if="tjgdmIf">
			<div class="zbar" id="auto-id-vaJfFz2D7xPOl1AA">
				<div class="zttl f-thide">
					添加到歌单
				</div>
			</div>
			<div class="zcnt">
				<div class="lyct lyct-1 m-favgd f-cb">
					<div class="tit j-flag" @click.stop="clickCreate">
						<i class="u-icn u-icn-33"></i>
						新歌单
					</div>
					<div class="j-flag">
						<ul>
							<li :data-id="item.id" class="xtag" v-for="item in userDataList" @click.stop="scSuccess($event)">
								<div class="item f-cb">
									<div class="left">
										<span class="avatar">
											<img :src="item.coverImgUrl+'?param=40y40'"/>
										</span>
									</div>
									<p class="name f-thide">
										<span class="s-fc0">{{item.name}}</span>
									</p>
									<p class="s-fc3">{{item.trackCount}}首</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<span class="zcls" title="关闭窗体" @click.stop="scHidden">x</span>
		</div>
		<!--新建歌单-->
		<div class="auto-1576560301926 m-layer z-show m-layer-w2" v-bind:hidden="scgdHidden" v-else>
			<div class="zbar" id="auto-id-seAMZkrlrAAEGciX">
				<div class="zttl f-thide">
					新建歌单
				</div>
			</div>
			<div class="zcnt">
				<div class="lyct m-crgd f-cb f-tc">
					<p>
						歌单名:<input type="text" class="u-txt j-flag" v-model="playlistName"/>
					</p>
					<div class="u-err  j-flag" :class="{'f-vhide':err}">
						<i class="u-icn u-icn-25"></i>
						{{errName}}
					</div>
					<p class="tip s-fc4">可通过“收藏”将音乐添加到新歌单中</p>
					<div class="btn">
						<span class="u-btn2 u-btn2-2 u-btn2-w2 j-flag" @click.stop="createPlaylist">
							<i>新建</i>
						</span>
						<span class="u-btn2 u-btn2-1 u-btn2-w2 j-flag" @click.stop="creategb">
							<i>取消</i>
						</span>
					</div>
				</div>
			</div>
			<span class="zcls" title="关闭窗体" @click.stop="creategb">x</span>
		</div>
		<div class="tjcg" v-bind:hidden="sccgHidden"><i class="u-icn2 u-icn21-100"></i>添加成功</div>
		<div class="tjcg" v-bind:hidden="qxscHidden"><i class="u-icn2 u-icn21-100"></i>取消收藏成功</div>
		<div class="auto-1576560301925"  v-bind:hidden="scgdHidden"></div>
		
	</div>
</template>

<script>
	import eventVue from '../../../static/js/eventVue.js'
	import { truncate, ftruncate, truncateSync } from "fs";
	import { fips } from "crypto";
	import { clearInterval } from 'timers';
	var times = null;
	var lxFsTimes = null;
	var plyFsTimes = null;
	var tipTitleTimes = null;
	
	export default {
		name:'palys',
	    data () {
	      return {
	      	audio: {
		        // 该字段是音频是否处于播放状态的属性
		        playing: false,
		 		duration:0,//总时长
		        // 音频当前播放时长
		        currentTime: 0,
		        // 音频最大播放时长
		        maxTime: 0,
		        minTime: 0,
		        volume:0,
		        step: 0.1,
		        readyState:0,//音频当前的就绪状态
		        ended:true,//是否播放完
		      },
		    songstracks:[],//歌曲列表
	      	songsList:[],//歌曲类表
	        songsData:null,//歌曲内容
	        tipTitle:true,//已播放
	        pasPlay:false,//暂停/播放
	        rdyWidth:'1',//缓存的长度
	        curWidth:'1',//播放的长度
	        timePlay:'00:00',//播放的时间
	        timePlayLength:'00:00',//播放的总时间
	        vHeight:'24',//声音的高度
	        vTop:'60',//声音控制器距离顶部的高度
	        vHidden:true,//是否显示声音控制器
	        playFs:[
	        	{className:'icn-loop',titles:'循环',id:0},
	        	{className:'icn-shuffle',titles:'随机',id:1},
	        	{className:'icn-one',titles:'单曲循环',id:2}
	        	],
	        playFsIndex:0,//播放类型的顺序数
	        tipFs:true,//播放的类型提示
	        tipSj:false,//随机播放判断
	        fixeds:true,//是否固定点位到底部
	        songsNum:0,//播放第几条歌曲
	        songslx:[{title:'来自歌单',path:'/songs',arPath:'/artist',titlePath:'/playlist',srarchB:false},
	        		 {title:'来自电台节目',path:'/program',arPath:'/radio',titlePath:'/dj',srarchB:false},
	        		 {title:'来自专辑',path:'/songs',arPath:'/artist',titlePath:'/album',srarchB:false},
	        		 {title:'来自榜单',path:'/songs',arPath:'/artist',titlePath:'/discover/toplist',srarchB:false},
	        		 {title:'来自歌手',path:'/songs',arPath:'/artist',titlePath:'/artist',srarchB:false},
	        		 {title:'暂无来源',path:'/songs',arPath:'/artist',titlePath:false,srarchB:false},
	        		 {title:'来自单曲搜索',path:'/songs',arPath:'/artist',titlePath:'/search/m',srarchB:true},
	        		 {title:'来自每日歌曲推荐',path:'/songs',arPath:'/artist',titlePath:'/discover/recommend/taste',srarchB:false},],//播放的类型
	        lengthTracks:0,//歌单列表里的歌曲个数
	        longing:false,
	        clientXStart:388,//进度条开始x坐标
	        clientXEnd:888,
	        clientYStart:905,//音量条开始x坐标
	        clientYEnd:825,
	        tracksHidden:true,//是否显示歌单列表
	        lyric:[],//歌词
	        tlyric:[],//翻译
	        //lyric2:[],//备份lyric
	        lyricHidden:true,
	        currentLineNum:0,//播放的歌词
	        lyricClass:false,
	        lyricPheight:0,//歌词的高度
	        qxHidden:true,
	        title:'',
	        barVoice:true,
	        scgdHidden:true,
	        sccgHidden:true,
	        userDataList:[],
	        scSongId:null,
	        scOption:{},
	        like:'like',//收藏类型
	        qxscHidden:true,//取消收藏
	        tjgdmIf:true,
	        playlistName:'',//添加歌单名
	        errName:'歌单名不能为空',
	        err:true
	      }
    },
     beforeCreate: function () {
//          debugger;
			
			
        },
        created: function () {
//          debugger;
			eventVue.$on('barVoice', (data) => {
		        console.log(data)
		        this.barVoice = data
		      })
			var _this = this;
			this.title = this.$route.meta.title
			 // 用$on事件来接收参数
			var songsList = null;
	      this.$root.eventVue.$on('playid', (data) => {
	      console.log(data)
	      	songsList = JSON.parse(_this.$localUtil('songsList'))
	      	console.log(songsList)
	        if(data.resData&&data.resData == songsList.id){
	        	
	        	if(!data.resFrom){
	        		//榜单请求歌曲和列表从第几个播放
	        		_this.getHttp('/top/list?idx='+data.resIdx,function(res){
	        			
	        			res.playlist.num = 3;
						_this.songsList = res.playlist;
						
						_this.songstracks = res.playlist.tracks;
						_this.$.each(_this.songstracks,function(index,item){
							
							item.dt = _this.$formatTime(item.dt/1000)
						})
						//存储歌曲列表和播放的当前歌曲和播放第几个歌曲的数字
						
						_this.$localUtil("songstracks",_this.songstracks)//存储播放歌曲列表
						_this.$localUtil("songsList",_this.songsList)
						_this.lengthTracks = _this.songstracks.length;
		         		_this.loginjz();
						_this.$.each(_this.songsList.tracks,function(index,item){
							
							if(item.id == data.resId){
								_this.songsNum = index
								_this.songsHttp(_this.songsList.tracks[_this.songsNum].id,3);
								
							}
						})
	        			
	        			
	        		})
	        	}else if(data.resType == '18'){
	        			if(data.resData == _this.songsList.id){
	        				_this.songsNum = data.songsNum
	        			}else{
	        				_this.songstracks.push(data.resProgram);
	        			}
	        			if(data.resFrom == '2'){
	        				_this.songsHttp(data.resId,4);
	        			}else{
	        				_this.songsHttp(data.resId,0);
	        			}
	        			
	        				
	        		}else if(data.resType == '19'){
	        			if(data.resData == _this.songsList.id){
	        				_this.songsNum = data.songsNum
	        			}else{
	        				_this.songstracks.push(data.resProgram);
	        			}
	        				
	        			_this.songsHttp(data.resId,0);
	        		}
	        	
	        } else if(data.eventId){
	        	//朋友动态
	        	
	        		if(data.resType == '18'){
						var flog = false;
						var songsNum = 0;
						console.log(songsList)
						console.log(_this.songstracks)
						_this.$.each(_this.songstracks,function(index,item){
							console.log(item)
							if(item.id == data.resId){
								flog = true;
								songsNum = index;
								return false;
							}
						})
						if(flog){
							//播放列表中有相对应的歌曲
	//						_this.songstracks = _this.$localUtil("songstracks")
	//	        			_this.songsList   = _this.$localUtil("songsList")
							_this.songsList.num = 5;
							_this.songsNum = songsNum;
				        	_this.loginjz();
				        	_this.songsHttp(_this.songstracks[songsNum].id,5);
				        	_this.$localUtil('songsNum',_this.songsNum);
						}else{
							//歌曲列表中没有相对应的歌曲
							console.log(data.resId)
							_this.getHttp('/song/detail?ids='+data.resId,function(res){
				        			console.log(res)
				        			res.songs[0].num = 5;
				        			_this.songsList = res.songs[0];
				        			_this.songstracks.push(res.songs[0]);
				        			_this.$.each(_this.songstracks,function(index,item){
	//									
										item.dt = _this.$formatTime(item.dt/1000)
									})
	//			        			
				        			_this.$localUtil("songstracks",_this.songstracks)
				        			_this.$localUtil("songsList",_this.songsList)
				        			_this.lengthTracks = _this.songstracks.length;
				        			_this.songsNum = _this.lengthTracks-1;
				        			_this.$localUtil('songsNum',_this.songsNum)
				        			_this.loginjz();
				        			console.log(_this.songsList.tracks)
				        			_this.songsHttp(_this.songsList.tracks[_this.songsNum].id,5);
				        			
				        		})
						}
					}else if(data.resType == '13'){
		        		console.log(typeof data.resData)
		        		//歌单播放
		        		_this.getHttp('/playlist/detail?id='+data.resId,function(res){
		        			
		        			res.playlist.num = 0;
		        			_this.songsList = res.playlist;
		        			_this.songstracks = res.playlist.tracks;
		        			_this.$.each(_this.songstracks,function(index,item){
								
								item.dt = _this.$formatTime(item.dt/1000)
							})
		        			
		        			_this.$localUtil("songstracks",_this.songstracks)
		        			_this.$localUtil("songsList",_this.songsList)
		        			_this.lengthTracks = _this.songstracks.length;
		        			_this.songsNum = 0;
		        			_this.loginjz()
		        			_this.songsHttp(_this.songsList.tracks[0].id,0);
		        			
		        		})
		        	}else if(data.resType == '19'){
	        		//专辑播放
	        		_this.getHttp('/album?id='+data.resId,function(res){
		        			console.log(res)
		        			res.album.num = 2;
		        			res.album.tracks = res.songs;
		        			_this.songsList = res.album;
		        			_this.songstracks = res.songs;
		        			_this.$.each(_this.songstracks,function(index,item){
								
								item.dt = _this.$formatTime(item.dt/1000)
							})
		        			
		        			_this.$localUtil("songstracks",_this.songstracks)
		        			_this.$localUtil("songsList",_this.songsList)
		        			_this.lengthTracks = _this.songstracks.length;
		        			_this.songsNum = 0;
		        			_this.loginjz()
		        			_this.songsHttp(_this.songsList.tracks[0].id,2);
		        			
		        		})
		        	}
	        	
	        }else{
	        	
	        	if(data.resFrom){
	        		
	        			
			        		if(data.resIdx){
			        			//榜单请求和列表，全部播放(还需要一个榜单参数)
				        		_this.getHttp('/top/list?idx='+data.resIdx,function(res){
				        			
				        			res.playlist.num = 3;
									_this.songsList = res.playlist;
									_this.songstracks = res.playlist.tracks;
									_this.$.each(_this.songstracks,function(index,item){
										
										item.dt = _this.$formatTime(item.dt/1000)
									})
									console.log(_this.songstracks)
									_this.$localUtil("songstracks",_this.songstracks)
									_this.$localUtil("songsList",_this.songsList)
									_this.lengthTracks = _this.songstracks.length;
				        			_this.songsNum = 0;
				        			_this.loginjz()
				        			_this.songsHttp(_this.songsList.tracks[0].id,3);
			        			})
			        		}else if(data.resType == '18'){
			        		
			        		//歌单播放
			        		console.log(typeof data.resData)
			        		
			        		//搜索请求单曲
			        		if(data.resFrom == 32){
			        			_this.getHttp('/song/detail?ids='+data.resId,function(res){
			        				console.log(res)
				        			res.songs[0].num = 6;
				        			_this.songsList = res.songs[0];
				        			_this.songstracks.push(res.songs[0]);
				        			_this.$.each(_this.songstracks,function(index,item){
										
										item.dt = _this.$formatTime(item.dt/1000)
									})
				        			
				        			_this.$localUtil("songstracks",_this.songstracks)
				        			_this.$localUtil("songsList",_this.songsList)
				        			_this.lengthTracks = _this.songstracks.length;
				        			_this.songsNum = _this.lengthTracks-1;
				        			_this.loginjz()
				        			_this.songsHttp(_this.songsList.id,6);
				        			
				        		})
			        		}else if(data.resFrom == 50){
			        			_this.getHttp('/user/record?uid='+data.resData+'&type='+data.types,function(res){
			        				console.log(res)
				        	
									if(res.allData){
										res.allData[data.resSongsNum].song.num = 5;
										_this.songsList = res.allData[data.resSongsNum].song;
				        				_this.songstracks.push(res.allData[data.resSongsNum].song);
				        				
									}else{
										res.weekData[data.resSongsNum].song.num = 5;
										_this.songsList = res.weekData[data.resSongsNum].song;
				        				_this.songstracks.push(res.weekData[data.resSongsNum].song);
									}
									_this.$.each(_this.songstracks,function(index,item){	
											item.dt = _this.$formatTime(item.dt/1000)
									})
				        			_this.$localUtil("songstracks",_this.songstracks)
				        			_this.$localUtil("songsList",_this.songsList)
				        			_this.lengthTracks = _this.songstracks.length;
				        			_this.songsNum = _this.lengthTracks-1;
				        			_this.loginjz()
				        			_this.songsHttp(_this.songsList.id,5);
				        		})
			        			
			        		}else{
			        			_this.getHttp('/playlist/detail?id='+data.resData,function(res){
			        			
				        			res.playlist.num = 0;
				        			_this.songsList = res.playlist;
				        			_this.songstracks = res.playlist.tracks;
				        			_this.$.each(_this.songstracks,function(index,item){
										
										item.dt = _this.$formatTime(item.dt/1000)
									})
				        			
				        			_this.$localUtil("songstracks",_this.songstracks)
				        			_this.$localUtil("songsList",_this.songsList)
				        			_this.lengthTracks = _this.songstracks.length;
				        			_this.songsNum = data.songsNum;
				        			_this.loginjz()
				        			_this.songsHttp(_this.songsList.tracks[data.songsNum].id,0);
				        			
				        		})
			        		}
			        	}else if(data.resType == '17'){
			        		//电台播放
			        		_this.getHttp('/dj/program/detail?id='+data.resData,function(res){
			        			
			        			res.program.num = 1;
			        			_this.songsList = res.program;
			        			_this.songstracks.push(res.program);
			        			_this.$.each(_this.songstracks,function(index,item){
									
									item.dt = _this.$formatTime(item.dt/1000)
								})
			        			
			        			_this.$localUtil("songstracks",_this.songstracks)
			        			_this.$localUtil("songsList",_this.songsList)
			        			_this.lengthTracks = _this.songstracks.length;
			        			_this.songsNum = _this.lengthTracks-1;
			        			_this.loginjz()
			        			_this.songsHttp(_this.songsList.mainTrackId,1);
			        			
				         		
			        		})
			        	}else if(data.resType == '19'){
			        		//专辑播放
			        		_this.getHttp('/album?id='+data.resData,function(res){
			        			
			        			res.album.num = 2;
			        			res.album.tracks = res.songs;
			        			_this.songsList = res.album;
			        			_this.songstracks = res.songs;
			        			_this.$.each(_this.songstracks,function(index,item){
									
									item.dt = _this.$formatTime(item.dt/1000)
								})
			        			
			        			_this.$localUtil("songstracks",_this.songstracks)
			        			_this.$localUtil("songsList",_this.songsList)
			        			_this.lengthTracks = _this.songstracks.length;
			        			_this.songsNum = data.songsNum;
			        			_this.loginjz()
			        			_this.songsHttp(_this.songsList.tracks[data.songsNum].id,2);
			        			
			        		})
			        	}
	        	}else if(data.resType == '13'){
	        		console.log(typeof data.resData)
	        		//歌单播放
	        		_this.getHttp('/playlist/detail?id='+data.resId,function(res){
	        			
	        			res.playlist.num = 0;
	        			_this.songsList = res.playlist;
	        			_this.songstracks = res.playlist.tracks;
	        			_this.$.each(_this.songstracks,function(index,item){
							
							item.dt = _this.$formatTime(item.dt/1000)
						})
	        			
	        			_this.$localUtil("songstracks",_this.songstracks)
	        			_this.$localUtil("songsList",_this.songsList)
	        			_this.lengthTracks = _this.songstracks.length;
	        			_this.songsNum = 0;
	        			_this.loginjz()
	        			_this.songsHttp(_this.songsList.tracks[0].id,0);
	        			
	        		})
	        	}else if(data.resType == '17'){
	        		//电台播放
	        		_this.getHttp('/dj/program/detail?id='+data.resId,function(res){
	        			
	        			res.program.num = 1;
	        			_this.songsList = res.program;
	        			_this.songstracks.push(res.program);
	        			_this.$.each(_this.songstracks,function(index,item){
							
							item.dt = _this.$formatTime(item.dt/1000)
						})
	        			
	        			_this.$localUtil("songstracks",_this.songstracks)
	        			_this.$localUtil("songsList",_this.songsList)
	        			_this.lengthTracks = _this.songstracks.length;
	        			_this.songsNum = _this.lengthTracks-1;
	        			_this.loginjz()
	        			_this.songsHttp(_this.songsList.mainTrackId,1);
	        			
		         		
	        		})
	        	}else if(data.resType == '19'){
	        		//专辑播放
	        		_this.getHttp('/album?id='+data.resId,function(res){
	        			console.log(res)
	        			res.album.num = 2;
	        			res.album.tracks = res.songs;
	        			_this.songsList = res.album;
	        			_this.songstracks = res.songs;
	        			_this.$.each(_this.songstracks,function(index,item){
							
							item.dt = _this.$formatTime(item.dt/1000)
						})
	        			
	        			_this.$localUtil("songstracks",_this.songstracks)
	        			_this.$localUtil("songsList",_this.songsList)
	        			_this.lengthTracks = _this.songstracks.length;
	        			_this.songsNum = 0;
	        			_this.loginjz()
	        			_this.songsHttp(_this.songsList.tracks[0].id,2);
	        			
	        		})
	        	}else if(data.resRadiotype == 'djradio'){
	        		//电台播放
	        		//_this.getHttp('/dj/program/detail?id='+data.resId,function(res){
	        			
//	        			res.program.num = 1;
//	        			_this.songsList = res.program;
//	        			_this.songstracks.push(res.program);
//	        			_this.$.each(_this.songstracks,function(index,item){
//							
//							item.dt = _this.$formatTime(item.dt/1000)
//						})
//	        			
//	        			_this.$localUtil("songstracks",_this.songstracks)
//	        			_this.$localUtil("songsList",_this.songsList)
//	        			_this.lengthTracks = _this.songstracks.length;
//	        			_this.songsNum = _this.lengthTracks-1;
//	        			_this.loginjz()
//	        			_this.songsHttp(_this.songsList.mainTrackId,1);
		        			
	        	//}
	        	
	        		
				         _this.$http({
				         	method:'get',
				         	url:_this.$host + "/dj/detail?rid="+data.resRadioid,
				         }).then(function(res){
				         	console.log(res.data)
				         	
				         	res.data.djRadio.num = 1;
	        				_this.songsList = res.data.djRadio;
	        				_this.$localUtil("songsList",_this.songsList)
				         	_this.$http({
				         	method:'get',
				         	url:_this.$host + "/dj/program?rid="+data.resId+"&limit="+data.resLimit,
				         }).then(function(res){
				         	console.log(res.data)
	        				_this.songstracks=res.data.programs;
				         	_this.$.each(res.data.programs,function(index,el){
				         		
				         		el.duration = _this.$formatTime(el.duration/1000);
				         		el.createTime = _this.$datePublish('Y-m-d',el.createTime);
				         		el.listenerCount = _this.$Playback(el.listenerCount);
				         	})
			         		_this.$localUtil("songstracks",_this.songstracks)
		        			
		        			_this.lengthTracks = _this.songstracks.length;
		        			_this.songsNum = 0;
		        			_this.loginjz();
		        			_this.songsHttp(_this.songstracks[0].id,1);
		        		}).catch(res=>{
					         	console.log('请求失败：'+res);
					         })
				         }).catch(res=>{
				         	console.log('请求失败：'+res);
				         })
				}else if(data.resType == '2'){
					//歌手播放
	        		_this.getHttp('/artists?id='+data.resId,function(res){
	        			console.log(res)
	        			res.artist.num = 2;
//	        			res.album.tracks = res.songs;
	        			_this.songsList =res.artist;
	        			_this.songstracks = res.hotSongs;
	        			_this.$.each(_this.songstracks,function(index,item){
							
							item.dt = _this.$formatTime(item.dt/1000)
						})
	        			
	        			_this.$localUtil("songstracks",_this.songstracks)
	        			_this.$localUtil("songsList",_this.songsList)
	        			_this.lengthTracks = _this.songstracks.length;
	        			_this.songsNum = 0;
	        			_this.loginjz()
	        			console.log(_this.songstracks)
	        			_this.songsHttp(_this.songstracks[0].id,4);
	        			
	        		})
				}else if(data.resType == '18'){
					var flog = false;
					var songsNum = 0;
					console.log(songsList)
					console.log(_this.songstracks)
					_this.$.each(_this.songstracks,function(index,item){
						console.log(item)
						if(item.id == data.resId){
							flog = true;
							songsNum = index;
							return false;
						}
					})
					if(flog){
						//播放列表中有相对应的歌曲
//						_this.songstracks = _this.$localUtil("songstracks")
//	        			_this.songsList   = _this.$localUtil("songsList")
						_this.songsList.num = 5;
						_this.songsNum = songsNum;
			        	_this.loginjz();
			        	_this.songsHttp(_this.songstracks[songsNum].id,5);
			        	_this.$localUtil('songsNum',_this.songsNum);
					}else{
						//歌曲列表中没有相对应的歌曲
						console.log(data.resId)
						_this.getHttp('/song/detail?ids='+data.resId,function(res){
			        			console.log(res)
			        			res.songs[0].num = 5;
			        			_this.songsList = res.songs[0];
			        			_this.songstracks.push(res.songs[0]);
			        			_this.$.each(_this.songstracks,function(index,item){
//									
									item.dt = _this.$formatTime(item.dt/1000)
								})
//			        			
			        			_this.$localUtil("songstracks",_this.songstracks)
			        			_this.$localUtil("songsList",_this.songsList)
			        			_this.lengthTracks = _this.songstracks.length;
			        			_this.songsNum = _this.lengthTracks-1;
			        			_this.$localUtil('songsNum',_this.songsNum)
			        			_this.loginjz();
			        			console.log(_this.songsList.tracks)
			        			_this.songsHttp(_this.songsList.tracks[_this.songsNum].id,5);
			        			
			        		})
					}
				}else if(data.resType == '24' ){
					_this.getHttp('/recommend/songs',function(res){
			   			console.log(res)
				        _this.songsList.num = 7;
	        			_this.songsList.tracks = res.recommend;
	        			_this.songstracks = res.recommend;
	        			_this.$.each(_this.songstracks,function(index,item){
							
							item.dt = _this.$formatTime(item.dt/1000)
						})
	        			
	        			_this.$localUtil("songstracks",_this.songstracks)
	        			_this.$localUtil("songsList",_this.songsList)
	        			_this.lengthTracks = _this.songstracks.length;
	        			_this.songsNum = 0;
	        			_this.loginjz()
	        			_this.songsHttp(_this.songsList.tracks[0].id,7);
				        			
				        		})
				}
	        }
	      })
//	      eventVue.$on('titles', (data) => {
//	        console.log(data)
//	        this.title = data
//	      })
        },
        beforeMount: function () {
//          debugger;
			
			if(this.$localUtil("songstracks") != null){
				
				this.songstracks = JSON.parse(this.$localUtil("songstracks"))
				
				this.lengthTracks = this.songstracks.length;
			}
			if(this.$localUtil("songsData") != null){
				this.songsData = JSON.parse(this.$localUtil("songsData"))
				this.songsNum = Number(this.songsData.songsNum)
				this.lyricGet(this.songsData.id)
			}
			if(this.$localUtil("songsList") != null){
				this.songsList = JSON.parse(this.$localUtil("songsList"))
				
			}
        },
        mounted: function () {
//          debugger;
			//cookie localStorage sessionStorage 存储播放的数据 
			var _this = this;
			
			 _this.$(document).click(function(event){
		        var _con = _this.$('#plays');  // 设置目标区域
		        if(!_con.is(event.target) && _con.has(event.target).length === 0){ // Mark 1
		           if(!_this.vHidden){
						_this.showVoice();
						
					}
		           if(!_this.tracksHidden){
		           		_this.showHideList();
		           }
		        }
		   });
		   this.$root.eventVue.$on('scOption',function(val){
				_this.scgdHidden = val.scgdHidden;
				_this.scSongId = val.scSongId;
				_this.like = val.like;
				
				this.logonSc()
			})
        	this.$root.eventVue.$on('sccgHidden',function(val){
        		_this.sccgHidden = val
        		setTimeout(function(){
	        		_this.$set(_this.$data,'sccgHidden',true)
	        	},3000)
        	})
        	this.$root.eventVue.$on('qxscHidden',function(val){
        		_this.qxscHidden = val
        		setTimeout(function(){
	        		_this.$set(_this.$data,'qxscHidden',true)
	        	},3000)
        	})
        	
        },
        
        deactivated: function(){
            //alert("keepAlive停用");
        },
        activated: function () {
            console.log('component activated');
        },
        beforeUpdate:function(){
        	console.log('=即将更新渲染=');
        	console.log(this.audio)
        	this.audio.readyState = this.$refs.audio.readyState
        },
        updated:function(){
        	
            console.log('==更新成功==');
            
        },
        beforeDestroy: function () {
            console.group('beforeDestroy 销毁前状态===============》');
            //监听器全部手动移除
//          this.offxxxListener();	
        },
        destroyed: function () {
            console.group('destroyed 销毁完成状态===============》');
            
        },
        
        methods:{
        	getHttp(href,callBack){
        		var that = this;
        		this.$http({
		         	method:'get',
		         	url:that.$host+href
		         }).then(function(res){
//		         	console.log(res.data)
		         	callBack(res.data)
		         }).catch(res=>{
		         	console.log('请求失败：'+res);
		         })
        	},
        	offxxxListener () {
        		
			    this.$root.eventVue.$off("playid");
			},
			play(){
				console.log(this)
				if(this.audio.ended){
					this.pauses()
				}
				if(this.$refs.audio){
					if(this.pasPlay){
						//暂停
						console.log(this.$refs)
	//					this.pauses()
						this.$options.methods.pauses.apply(this)
						this.$refs.audio.pause();
						this.pasPlay = false;
						this.title = this.$route.meta.title;
					}else{
						
						//播放
						console.log(this.$refs)
						this.longing = true;
						let playPromise = this.$refs.audio.play();
						
						if (playPromise !== undefined ) {
							playPromise.then(() => {
								this.longing = false;
								this.$refs.audio.play();
								this.timePlayLength = this.$formatTime(parseInt(this.$refs.audio.duration));
								this.audio.duration = this.$refs.audio.duration;
								this.audio.currentTime = this.$refs.audio.currentTime;
								this.audio.maxTime = this.$refs.audio.duration;
								this.audio.minTime = this.$refs.audio.currentTime;
								this.audio.volume = this.vHeight/100;
								this.$refs.audio.volume = this.audio.volume;
								this.pasPlay = true
								if(!this.lyricHidden){
									this.gundong()
								}
								this.title = this.songstracks[this.songsNum].name
								
							}).catch((error)=> {
								console.log('Registration failed', ':^(', error);
							})
						}
					}
				}else{
					this.longing = true;
				}
			},
			songsHttp(id,num){
				var that = this;
				var timess;
				console.log(id)
        		this.$http({
		         	method:'get',
		         	url:that.$host+'/song/url?id='+ id
		         }).then(function(res){
		         	if(res.data.data[0].url){
		         		that.$.each(res.data.data,function(index,item){
		         			if(that.songslx[num]){
		         				item.title = that.songslx[num].title
				         		item.path = that.songslx[num].path
				         		item.arPath = that.songslx[num].arPath
				         		item.titlePath = that.songslx[num].titlePath
				         		item.srarchB = that.songslx[num].titlePath
				         		that.timePlayLength = that.$formatTime(item.size)
		         			}else{
		         				that.timePlayLength = that.$formatTime(item.size)
		         			}
			         		
			         	})
			         	console.log(res.data)
			         	that.songsData = res.data.data[0]
			         	
			         	that.tipTitle = false;
			         	lxFsTimes = setInterval(() => {
					      	that.tipTitle = true;
					      
					        that.longing = false;
					        window.clearInterval(lxFsTimes);
					      
						},3000)
			         	
			         	timess= setInterval(() => {
			         		that.pasPlay = false;//开始播放
					      	that.$options.methods.play.apply(that);//methods调用相同的函数
					      	//请求歌词
					      	that.lyricGet(id)
					      	that.songsData.songsNum = that.songsNum
					      	that.$localUtil("songsData",that.songsData)
					      	
					      	console.log(that.songsData)
					        that.longing = false;
					        window.clearInterval(timess);
					      
						})
			         	//传到页面的歌曲列表播放第几个歌曲
			         	that.$root.eventVue.$emit('songsNum',that.songsNum)
			         	//that.$root.eventVue.$emit('songsId',that.songsData.id)
			         	that.$localUtil('songsNum',that.songsNum)
		         	}else{
		         		
		         		that.$drage("auto-id-84n9GT7xhfGXTWds");
		         		that.qxHidden = false;
		         		that.$options.methods.pauses.apply(that)
						that.$refs.audio.pause();
						that.pasPlay = false;
						that.title = that.$route.meta.title;
						that.songsData.songsNum = that.songsNum;
						that.$root.eventVue.$emit('songsNum',that.songsNum)
		         	}
		         	
		         	
		         }).catch(res=>{
		         	console.log('请求失败：'+res);
		         })
			},
			
			next(){
				//bug 当暂停播放时，点击下一首会自动播放
				var _this = this;
				if(this.songstracks){
					if(this.songsNum>=this.songstracks.length-1){
						this.songsNum = 0
					}else{
						this.songsNum = Number(this.songsNum) +1
					}
					
					if(this.tipSj){
						_this.songsNum = Math.round(Math.random()*_this.lengthTracks,10)
					}
					console.log(this.songsNum)
					console.log(this.songstracks)
					this.songsHttp(this.songstracks[this.songsNum].id,this.songsList.num)
					this.loginjz();
				}else{
					this.longing = true;
				}
				
				this.pauses() 
				
			},
			prev(){
				var _this = this;
				if(this.songstracks){
					if(this.songsNum<=0){
						this.songsNum = this.songstracks.length-1
					}else{
						this.songsNum = this.songsNum -1
					}
					if(this.tipSj){
						_this.songsNum = Math.round(Math.random()*_this.lengthTracks,10)
					}
					this.songsHttp(this.songstracks[this.songsNum].id,this.songsList.num)
					this.loginjz();
				}else{
					this.longing = true;
				}
				this.pauses() 
				
			},
			onPause(){
				var _this = this;
				this.audio.playing = false;
		      var startTime = this.$refs.audio.currentTime;
		     
		      
		      //
		      this.pasPlay = false;
		      if (startTime == this.audio.maxTime) {
		        this.rdyWidth = 0;
		        this.curWidth = 0;
		        this.audio.currentTime = "00:00";
		        this.timePlay = "00:00";
		        if(this.songsNum>=this.songstracks.length-1){
						this.songsNum = 0
					}else{
						this.songsNum = this.songsNum +1
					}
					
					if(this.tipSj){
						_this.songsNum = Math.round(Math.random()*_this.lengthTracks,10)
					}
					this.songsHttp(this.songstracks[this.songsNum].id,this.songsList.num)
		      }
		      
			},
			onPlay(){
				console.log("音频正在播放中");
				var that = this;
      			this.audio.playing = true;
      			this.timePlay = this.$formatTime(parseInt(this.$refs.audio.currentTime))
      			
      			this.audio.duration = this.$refs.audio.duration;
				this.audio.currentTime = this.$refs.audio.currentTime;
				this.audio.maxTime = this.$refs.audio.duration;
				this.audio.minTime = this.$refs.audio.currentTime;
				this.audio.volume  = this.$refs.audio.volume;
      			this.timePlayLength = this.$formatTime(parseInt(this.$refs.audio.duration));
      			
			},
			onTimeupdate(){
				this.timePlay = this.$formatTime(parseInt(this.$refs.audio.currentTime))
				this.curWidth = (this.$refs.audio.currentTime/this.audio.duration)*100
				
				this.audio.currentTime = this.$refs.audio.currentTime
				this.audio.ended = this.$refs.audio.ended
				if(this.audio.ended){
					this.pauses()
				}
			},
			onLoadedmetadata(){
				//音频加载后触发
			},
			//拖拽及点击播放进度
			playbackProgress(event){
				
				var event = event || window.event;
				var _this = this
				
				var drages = event.path[1]
				
				var diffX = event.clientX;
				var numX = event.clientX-_this.clientXStart
				if(typeof drages.setCapture !== 'undefined'){
					drages.setCapture();
				}
				document.onmousemove=function(event){
					var event = event || windw.event;
					var moveX = event.clientX - diffX+numX;
					
					//var moveY = event.clientY - diffY;clientXStart:388,	clientXEnd:888//进度条开始x坐标
					if(moveX < 0){
						moveX = 0;
					}else if(moveX > _this.clientXEnd - _this.clientXStart){
						moveX = _this.clientXEnd - _this.clientXStart
					}else if( moveX == 0){
						moveX = diffX
					}
					
					var widthNum = moveX/(_this.clientXEnd - _this.clientXStart)
					drages.style.width = widthNum*100 
					_this.$refs.audio.currentTime = widthNum * _this.audio.duration
					_this.audio.currentTime = _this.$refs.audio.currentTime;
	        		
				}
				document.onmouseup=function(event){
					var event = event || windw.event;
					event.path[0].onmousedown = null;
					this.onmousemove = null;
					
					if(typeof drages.releaseCapture != 'undefined'){
						drages.releaseCapture();
					}
				}
			},
			//点击进度条快进
			playbackClick(event){
				
				var event = event || window.event;
				var _this = this
				
				var drages = event.path[1].children[1]
				
				var diffX = event.clientX;
				var numX = event.clientX-_this.clientXStart
				if(numX<0){
					numX = 0
				}else if(numX>_this.clientXEnd - _this.clientXStart){
					numX = _this.clientXEnd - _this.clientXStart
				}else if(numX == 0){
					numX = diffX
				}
				var widthNum = numX/(_this.clientXEnd - _this.clientXStart)
				drages.style.width = widthNum*100 
				_this.$refs.audio.currentTime = widthNum * _this.audio.duration
				_this.audio.currentTime = _this.$refs.audio.currentTime;
			},
			//进度条模拟预加载
			loginjz(){
				var that = this;
		      	this.audio.currentTime = "00:00";
		      	//this.pasPlay = true; // 更改播放暂停按钮为播放
		      	this.rdyWidth=0;
		      	// 切换下一首，进度条模拟预加载效果
		       times= setInterval(() => {
		      	that.rdyWidth =that.rdyWidth+10;
		      	that.longing = true;
		        if(that.rdyWidth>=100){
		        	that.longing = false;
		        window.clearInterval(times);
		      }
			},10)
		   },
		   //播放的形式
		   playXs($event){
		   	
		   	var _this = this;
		   	 var id = parseInt($event.target.getAttribute('data-res-id'))
		   	 
		   	 if(id>=0&&id<2){
		   	 	this.playFsIndex = id+1
		   	 	console.log(this.playFsIndex)
		   	 }else{
		   	 	this.playFsIndex = 0
		   	 }
		   	 window.clearTimeout(plyFsTimes);
		   	 this.tipFs = false
		   	 plyFsTimes = setTimeout(()=>{
				_this.tipFs = true		   	 	
		   	 },3000)
		   	 switch (this.playFsIndex){
		   	 	case 0:
		   	 		//循环
		   	 		if(this.songsNum == this.lengthTracks-1){
		   	 			this.songsNum = this.lengthTracks-1
		   	 		}
		   	 		this.$refs.audio.loop = false
		   	 		this.tipSj = false;
		   	 		break;
		   	 	case 1:
		   	 		//随机
		   	 		
		   	 		this.tipSj = true;
		   	 		this.$refs.audio.loop = false
		   	 		break;
		   	 	case 2:
		   	 		//单曲循环
		   	 		console.log(this.$refs.audio.loop)
		   	 		this.$refs.audio.loop = true
		   	 		this.tipSj = false;
		   	 		break;
		   	 }
		   },
		   //显示调试声音的高度
		   showVoice(){
		   		if(this.vHidden){
		   			this.vHidden = false
		   		}else{
		   			this.vHidden = true
		   		}
		   },
		   //声音大小调试
		  voiceDebug(event){
		  	
		  	var topNum = event.clientY - this.clientYEnd;//top距离
		  	var  heigthNum = this.clientYStart - this.clientYEnd -topNum;
		  	if(heigthNum  > this.clientYStart - this.clientYEnd){
		  		topNum = 0;
		  		heigthNum = this.clientYStart - this.clientYEnd;
		  	}else if(heigthNum <= 0){
		  		topNum = this.clientYStart - this.clientYEnd;
		  		heigthNum =  0;
		  	}
		  	
		  	this.$(event.path[0].children[0]).css({height:heigthNum})
		  	this.$(event.path[0].children[1]).css({top:topNum})
		  	var valumes = heigthNum / (this.clientYStart - this.clientYEnd)
		  	this.$refs.audio.volume = valumes
			this.audio.volume = this.$refs.audio.volume;
		  	
		  },
		  //拖拽及点击播放进度
		  voiceProgress(event){
				console.log(event)
				var event = event || window.event;
				var _this = this
				
				var drages = event.path[1]
				var drages0 = event.path[0]
				var drages1 = drages0.previousSibling.previousSibling
				
				var diffY = event.clientY;
				var numY = event.clientY-_this.clientYStart
				if(typeof drages.setCapture !== 'undefined'){
					drages.setCapture();
				}
				document.onmousemove=function(event){
					var event = event || windw.event;
					
					var moveY =event.clientY  - diffY+ numY;
					
					var widthNum = _this.clientYStart - _this.clientYEnd +moveY;
					
					console.log(_this.clientYStart - _this.clientYEnd)
					if(moveY < _this.clientYEnd - _this.clientYStart){
						console.log(moveY)
						moveY = _this.clientYEnd - _this.clientYStart;
						widthNum = 0;
					}else if(widthNum > _this.clientYStart - _this.clientYEnd){
						moveY = 0;
						widthNum = _this.clientYStart - _this.clientYEnd;
					}
					
						_this.$(drages0).css({top:widthNum})
						_this.$(drages1).css({height:-moveY})
						
					var valumes = -moveY / (_this.clientYStart - _this.clientYEnd)

					_this.$refs.audio.volume = valumes
					_this.audio.volume = _this.$refs.audio.volume;
	        		
				}
				document.onmouseup=function(event){
					var event = event || windw.event;
					drages0.onmousedown = null;
					this.onmousemove = null;
					
					if(typeof drages.releaseCapture != 'undefined'){
						drages.releaseCapture();
					}
				}
			},
			//显示隐藏歌曲列表
			showHideList(){
				if(this.tracksHidden){
					this.tracksHidden = false;
					
				}else{
					this.tracksHidden = true;
				}
			},
			picUrl(){
				return this.$imgSrc
			},
			//歌词
			lyricGet(id){
				var that = this;
				var arrLyric = [];
				that.lyric = [];
				that.tlyric = [];
				this.$http({
		         	method:'get',
		         	url:that.$host+'/lyric?id='+ id
		         }).then(function(res){
		         	
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
		         		
		         	}else{
		         		that.lyricHidden = true;
		         	}
		         	
		         }).catch(res=>{
		         	console.log('请求失败：'+res);
		         })
			},
			 // 实现歌词滚动
		  gundong () {
		  	var that = this;
		   
		      //:class="[audio.currentTime >= item[0]?'z-sel':'']"
		      // 当前播放时间 that.audio.currentTime
		      
			  tipTitleTimes = setInterval(()=>{
			  	
			  	if(that.$refs.lyricLine ){
				  		for(var i=0;i<that.$refs.lyricLine.length;i++){
					  		if(that.$refs.lyricLine[i+1]){
					  			if(that.audio.currentTime <= that.$refs.lyricLine[i+1].dataset.time){
					  				that.currentLineNum = i
					  				
					  				that.lyricPheight = that.lyricPheight + Number(that.$refs.lyricLine[i].offsetHeight)
					  				
					  				var lyricHeight = 0;
					  				for(var j=0;j<i;j++){
					  					lyricHeight = lyricHeight + Number(that.$refs.lyricLine[j].offsetHeight)
					  				}
					  				that.lyricPheight = lyricHeight-80
				  				
					  				break;
					  			}
					  		}else{
					  			that.currentLineNum = i
					  			that.pauses()
					  		}
					  	}
					 
				  	}
			  },50)
			 
		  },
		  // 暂停歌词
		  pauses () {
		  	
		    if (tipTitleTimes !== '') {
		    	
		      window.clearInterval(tipTitleTimes)
		      // console.log(this.obj)
		    }
		  },
		  //清除存储
		  removeBrowser(){
		  	this.$removeLocalStorage("songstracks")
			this.$removeLocalStorage("songsData")
			this.$removeLocalStorage("songsNum")
		  },
		  //歌曲是否有权限
		  songsQx(id){
		  	var that = this;
		  	this.$http({
		         	method:'get',
		         	url:that.$host+'/check/music?id='+ id
		         }).then(function(res){
		         	console.log(res.data)
		         	
		         }).catch(res=>{
		         	console.log('请求失败：'+res);
		         })
		  },
		  //是否显示歌曲权限弹框
		  songsHidden(){
		  	this.qxHidden = true;
		  },
		  //播放歌曲类表内容
		  songsListIndex($event){
		  	
		  	window.clearInterval(tipTitleTimes)
		  	this.songsHttp($event.path[1].dataset.id,this.songsList.num)
		  	this.songsNum = $event.path[1].dataset.index
		  	this.$localUtil("songsNum",this.songsNum);
		  },
		  //删除对应的歌曲
		  songsDel(){
		  	this.songstracks.splice(this.songsNum,1);
		  	this.$localUtil("songstracks",this.songstracks);
		  	if(this.songsNum -1 < 0){
		  		this.songsNum = 0;
		  	}else {
		  		this.songsNum = this.songsNum - 1;
		  	}
		  	this.$localUtil("songsNum",this.songsNum);
		  },
		  //收藏
		  logonSc($event){
		  	 var that =this;
	         if(this.$cookieUtil("email")){
					
					if(that.userDataList.length>0){
						that.$set(that.$data,'scgdHidden',false)
	        			that.$toggleBody(1)
	        			that.$drage('auto-id-vaJfFz2D7xPOl1AA')
	        			if($event){
	        				that.scSongId = $event.target.getAttribute('data-id')
	        			}
	        			
					}else{
						this.$logoRefresh(function(res){
						
							that.loginData =  JSON.parse(that.$localUtil("logoData"));
							that.loginBs = false;
							console.log(that.loginData)
							let resData = res;
							that.$http({
					         	method:'get',
					         	url:that.$host + "/user/playlist?uid="+resData.data.profile.userId,
					         }).then(function(res){
					         	console.log(res.data)
					         	that.$.each(res.data.playlist,function(index,el){
					         		if(el.creator.userId == resData.data.profile.userId){
					         			el.name = el.name.replace(new RegExp(resData.data.profile.nickname,'gm'),'我')
					         			that.userDataList.push(el)
					         		}
					         	})
					         	if($event.target.getAttribute('data-action') == 'likeall'){
	        						
			        				that.$.each(that.songstracks,function(index,el){
			        					if(index == 0){
			        						if(that.songstracks.length>1){
			        							that.scSongId = el.id+','
			        						}else{
			        							that.scSongId = el.id
			        						}
			        						
			        					}else if(index<that.songstracks.length-1&&index>0){
			        						that.scSongId = that.scSongId + el.id+','
			        					}else if(index>0){
			        						that.scSongId = that.scSongId + el.id
			        					}
			        				})
			        				
			        			}else{
			        				that.scSongId = $event.target.getAttribute('data-id')
			        			}
					         	that.$set(that.$data,'userDataList',that.userDataList)
					         	that.$set(that.$data,'scgdHidden',false)
	        					that.$toggleBody(1)
	        					that.$drage('auto-id-vaJfFz2D7xPOl1AA')
	        					
					         }).catch(res=>{
					         	console.log(res);
					         	
				        		that.$root.eventVue.$emit('classify','l')
				        		that.$toggleBody(1)
				        		that.$drage('auto-id-e0uH7BGEq0gyq7zi')
					         })
						})
						
					}
				}else{
					this.$root.eventVue.$emit('classify','l')
			        this.$toggleBody(1)
			        this.$drage('auto-id-e0uH7BGEq0gyq7zi')
				}
		  },
		  scHidden(){
		  	this.$set(this.$data,'scgdHidden',true)
        	this.$toggleBody(0)
		  },
		  //收藏成功操作
		  scSuccess($event){
		  	this.$collection(this,{
		  		resAction:this.like,
		  		actionT:'add'
		  	},$event,this.scSongId)
		  },
		  //创建歌单
		  createPlaylist(){
		  	let that = this;
		  	if(that.playlistName != ''){
		  		that.$http({
			  		method:'get',
					url:that.$host + "/playlist/create?name="+that.playlistName,
			  	}).then(res=>{
			  		console.log(res.data)
			  		that.tjgdmIf = true;
		  			that.$set(that.$data,'scgdHidden',true);
		  			that.$collection(that,{
				  		resAction:'likeall',
				  		actionT:'add'
				  	},res.data.id,that.scSongId)
			  	}).catch(res=>{
			  		console.log(res)
			  	})
		  	}else{
		  		that.err = false;
		  	}
		  	
		  },
		  clickCreate(){
		  	let that = this;
		  	this.tjgdmIf = false;
		  	
		  	setTimeout(function(){
		  		that.$drage('auto-id-seAMZkrlrAAEGciX');
		  	},100)
		  },
		  //关闭创建歌单
		  creategb(){
		  	this.tjgdmIf = true;
		  	this.$set(this.$data,'scgdHidden',true);
		  }
        },
        
  }
</script>

<style lang="less">
	.m-pbar .btn, .m-vol .btn {
	    background: url(../../assets/iconall.png) no-repeat;
	    _background: url(../../assets/iconall.png);
	}
	.g-btmbar {
	    position: fixed;
	    _position: absolute;
	    zoom: 1;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    height: 0;
	    width: 100%;
	    z-index: 1002;
	}
	.m-playbar-unlock .updn .btn {
	    background-position: -80px -380px;
	}
	.m-playbar {
	    position: absolute;
	    zoom: 1;
	    top: -53px;
	    left: 0;
	    width: 100%;
	    height: 53px;
	    margin: 0 auto;
	    .updn {
		    position: relative;
		    z-index: 11;
		    .left {
			    position: absolute;
			    top: -14px;
			    right: 15px;
			    width: 52px;
			    height: 67px;
			    background-position: 0 -380px;
			}
			.right {
			    position: absolute;
			    top: -1px;
			    right: 0;
			    width: 15px;
			    height: 54px;
			    background-position: -52px -393px;
			    pointer-events: none;
			}
			.btn {
			    display: block;
			    width: 18px;
			    height: 18px;
			    margin: 6px 0 0 17px;
			}
		}
		.bg {
		    height: 53px;
		    zoom: 1;
		    margin-right: 67px;
		    background-position: 0 0;
		    background-repeat: repeat-x;
		}
		.hand {
		    position: absolute;
		    top: -10px;
		    width: 100%;
		    height: 20px;
		    cursor: pointer;
		}
		.wrap {
		    position: absolute;
		    left: 50%;
		    top: 6px;
		    z-index: 15;
		    /*width: 980px;*/
		    height: 47px;
		    margin: 0 auto;
		    margin-left: -490px;
		}
		.btns {
		    width: 137px;
		    padding: 6px 0 0 0;
		    span {
			    display: block;
			    float: left;
			    width: 28px;
			    height: 28px;
			    margin-right: 8px;
			    margin-top: 5px;
			    text-indent: -9999px;
			}
			.prv {
			    background-position: 0 -130px;
			}
			.ply {
			    width: 36px;
			    height: 36px;
			    margin-top: 0;
			    background-position: 0 -204px;
			}
			.nxt {
			    background-position: -80px -130px;
			}
			.pas {
			    background-position: 0 -165px;
			}
		}
		 .words {
		    height: 28px;
		    overflow: hidden;
		    color: #e8e8e8;
		    text-shadow: 0 1px 0 #171717;
		    line-height: 28px;
		    .fc1 {
			    color: #e8e8e8;
			}
			.name{
				max-width:300px;
			}
			.by {
			    max-width: 220px;
			    margin-left: 15px;
			    color: #9b9b9b;
			    a{
			    	color:#9b9b9b;
			    }
			}
			.src {
			    float: left;
			    width: 14px;
			    height: 15px;
			    margin: 7px 0 0 13px;
			    background-position: -110px -103px;
			}
		}
		.play {
		    position: relative;
		    *zoom: 1;
		    width: 680px;
		}
		.oper {
		    width: 60px;
		}
		.icn {
		    float: left;
		    width: 25px;
		    height: 25px;
		    margin: 11px 2px 0 0;
		    text-indent: -9999px;
		}
		.icn-add {
		    background-position: -88px -163px;
		}
		.icn-share {
		    background-position: -114px -163px;
		}
		.ctrl {
		    position: relative;
		    z-index: 10;
		    width: 113px;
		    padding-left: 13px;
		    background-position: -147px -238px;
		}
		.icn-vol {
		    background-position: -2px -248px;
		}
		.icn-loop {
		    background-position: -3px -344px;
		}
		.icn-shuffle {
		    background-position: -66px -248px;
		}
		.icn-one {
		    background-position: -66px -344px;
		}
		.add {
		    float: left;
		    width: 59px;
		    height: 36px;
		}
		.tip {
		    position: absolute;
		    top: -51px;
		    left: -65px;
		    clear: both;
		    width: 152px;
		    height: 49px;
		    background-position: 0 -287px;
		    text-align: center;
		    color: #fff;
		    line-height: 37px;
		}
		.icn-list {
		    display: block;
		    float: none;
		    width: 38px;
		    padding-left: 21px;
		    background-position: -42px -68px;
		    line-height: 27px;
		    text-align: center;
		    color: #666;
		    text-shadow: 0 1px 0 #080707;
		    text-indent: 0;
		    text-decoration: none;
		}
		.tip-1 {
		    top: -35px;
		    left: 12px;
		    width: 81px;
		    height: 39px;
		    line-height: 34px;
		    background-position: 0 -457px;
		}
	}
	.m-playbar-lock .updn .btn {
	    background-position: -100px -380px;
	}
	.m-pbar, .m-pbar .barbg {
	    width: 500px;
	}
	.m-pbar .barbg, .m-pbar .cur, .m-pbar .rdy {
	    height: 9px;
	    background-position: right 0;
	}
	.m-pbar .rdy {
	    background-position: right -30px;
	}
	.m-pbar .cur {
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 1%;
	    background-position: left -66px;
	}
	.m-pbar .btn {
	    position: absolute;
	    top: -7px;
	    right: -13px;
	    width: 22px;
	    height: 24px;
	    margin-left: -11px;
	    background-position: 0 -250px;
	    _background-position: 0 0;
	}
	.m-pbar .btn i {
	    visibility: hidden;
	    position: absolute;
	    left: 5px;
	    top: 5px;
	    width: 12px;
	    height: 12px;
	    background: url('../../assets/loading.gif');
		
	}
	.m-pbar .time {
	    position: absolute;
	    top: -3px;
	    right: -100px;
	    color: #797979;
	    text-shadow: 0 1px 0 #121212;
	    em {
		    color: #a1a1a1;
		}
	}
	.m-vol .vbg, .m-vol .curr {
	    position: absolute;
	    top: 11px;
	    left: 14px;
	    width: 4px;
	    height: 93px;
	}
	
	.m-vol {
	    position: absolute;
	    top: -113px;
	    left: 9px;
	    clear: both;
	    width: 32px;
	    height: 113px;
	    .barbg {
		    position: absolute;
		    top: 0;
		    left: 0;
		    width: 32px;
		    height: 113px;
		    background-position: 0 -503px;
		}
		.vbg {
		    padding: 4px 0;
		    top: 7px;
		}
		.curr {
		    top: auto;
		    bottom: 4px;
		    left: 0;
		    background-position: -40px bottom;
		    overflow: hidden;
		}
		.btn {
		    position: absolute;
		    top: 0;
		    left: -7px;
		    display: block;
		    width: 18px;
		    height: 20px;
		    background-position: -40px -250px;
		    _background-position: 0 0;
		    cursor: pointer;
		}
	}
	.m-playbar .head, .m-playbar .head img {
	    width: 34px;
	    height: 34px;
	}
	.m-playbar .head {
	    position: relative;
	    *zoom: 1;
	    margin: 6px 15px 0 0;
	}
	.m-playbar .head, .m-playbar .head img {
	    width: 34px;
	    height: 34px;
	}
	.m-playbar .head .mask {
	    position: absolute;
	    top: 0px;
	    left: 0px;
	    display: block;
	    width: 34px;
	    height: 35px;
	    background-position: 0 -80px;
	}
	.m-playbar .words .mv {
	    width: 19px;
	    height: 17px;
	    margin: 6px 0 0 3px;
	    background-position: 0 -57px;
	}
	.idAuio{
		/*display:none;*/
	}
	.m-pbar .z-load i {
	    visibility: visible;
	    cursor: default;
	}
	.m-pbar .z-load i {
	    visibility: visible;
	    cursor: default;
	}
	/*播放列表*/
	.m-playbar .listhdc .clear, .m-playbar .listhdc .addall {
	    position: absolute;
	    left: 490px;
	    top: 12px;
	    height: 15px;
	    line-height: 15px;
	    cursor: pointer;
	}
	.m-playbar {
		.list {
		    position: absolute;
		    left: 50%;
		    bottom: 47px;
		    _bottom: 46px;
		    width: 986px;
		    _width: 982px;
		    height: 301px;
		    margin-left: -493px;
		    _marign-left: -491px;
		    ul{
		    	color: #CCCCCC;
		    }
		    li {
			    float: left;
			    width: 100%;
			}
			li.z-sel {
			    background-color: rgba(0,0,0,0.3);
			    _background-color: #202020;
			}
			.nocnt {
			    padding-top: 85px;
			    text-align: center;
			    line-height: 43px;
			    .ico {
				    float: none;
				    display: inline-block;
				    position: relative;
				    top: -4px;
				    width: 36px;
				    height: 29px;
				    margin-right: 3px;
				    background-position: -138px 0;
				    vertical-align: middle;
				}
			}
			.nolyric {
			    padding-top: 85px;
			}
		}
		.listhd {
		    background-position: 0 0;
		    height: 41px;
		}
		.listhdc {
		    position: relative;
		    height: 40px;
		    h4 {
			    position: absolute;
			    left: 25px;
			    top: 0;
			    height: 39px;
			    line-height: 39px;
			    font-size: 14px;
			    color: #e2e2e2;
			    
			}
			.addall {
			    left: 398px;
			}
			span{
				color: #CCCCCC;
			}
			.ico {
			    float: left;
			    margin: 1px 6px 0 0;
			    *margin-top: 0;
			}
			.line {
			    position: absolute;
			    top: 13px;
			    left: 477px;
			    height: 15px;
			    border-left: 1px solid #000;
			    border-right: 1px solid #2c2c2c;
			}
			.lytit {
			    position: absolute;
			    left: 595px;
			    top: 0;
			    width: 346px;
			    text-align: center;
			    height: 39px;
			    line-height: 39px;
			    color: #fff;
			    font-size: 14px;
			}
			.close {
			    position: absolute;
			    top: 6px;
			    right: 8px;
			    width: 30px;
			    height: 30px;
			    overflow: hidden;
			    text-indent: -999px;
			    cursor: pointer;
			    background-position: -195px 9px;
			}
		}
		.ico-add {
		    width: 16px;
		    background-position: -24px 0;
		}
		.icn-del {
		    width: 13px;
		    background-position: -51px 0;
		}
		.listbd {
		    position: absolute;
		    left: 0;
		    top: 41px;
		    width: 976px;
		    _width: 972px;
		    height: 260px;
		    overflow: hidden;
		    background-position: -1014px 0;
		    _background-position: -1018px 0;
		    background-repeat: repeat-y;
		    .bline {
			    position: absolute;
			    left: 555px;
			    _left: 553px;
			    top: -1px;
			    z-index: 2;
			    width: 6px;
			    height: 260px;
			    background: #000;
			    opacity: .5;
			    filter: Alpha(opacity=50);
			}
			.scrol {
			    position: absolute;
			    left: 0;
			    top: 0px;
			    width: 4px;
			    border-radius: 5px;
			    height: 100px;
			    cursor: pointer;
			    background: #868686;
			    border: 1px solid #a6a6a6;
			    opacity: .8;
			    filter: Alpha(opacity=80);
			}
			.bline-1 {
			    left: auto;
			    right: 2px;
			    _right: 0;
			}
			.scrol-1 {
			    left: auto;
			    right: 0;
			}
		}
		.imgbg {
		    position: absolute;
		    left: 2px;
		    _left: 0;
		    top: -1px;
		    z-index: 1;
		    width: 980px;
		    height: auto;
		    opacity: .2;
		    filter: Alpha(opacity=20);
		}
		.msk {
		    position: absolute;
		    left: 2px;
		    _left: 0;
		    top: 0;
		    z-index: 2;
		    width: 558px;
		    height: 260px;
		    background: #121212;
		    opacity: .5;
		    filter: Alpha(opacity=50);
		}
		.listbdc {
		    position: absolute;
		    left: 2px;
		    _left: 0;
		    top: 0;
		    z-index: 4;
		    height: 260px;
		    width: 553px;
		    overflow: hidden;
		    ul{
		    	color: #CCCCCC;
		    	overflow: hidden;
		    }
		}
		.col {
		    float: left;
		    padding-left: 10px;
		    height: 28px;
		    line-height: 28px;
		    _line-height: 29px;
		    overflow: hidden;
		    cursor: pointer;
		    .icns {
			    display: none;
			    position: absolute;
			    right: 0;
			    top: 0;
			    width: 100px;
			    height: 23px;
			}
			.ico {
			    float: right;
			    overflow: hidden;
			    margin: 7px 0 0 10px;
			    text-indent: -9999px;
			}
			.ico-src {
			    width: 14px;
			    margin-left: 0;
			    background-position: -80px 0px;
			}
		}
		.col-1 {
		    width: 10px;
		}
		.col-2 {
		    width: 256px;
		}
		.col-3 {
		    width: 78px;
		    position: relative;
		}
		.playicn {
		    display: none;
		    margin-top: 8px;
		    width: 10px;
		    height: 13px;
		    background-position: -182px 0;
		    
		}
		.icn-del {
		    width: 13px;
		    background-position: -51px 0;
		}
		.ico {
		    height: 16px;
		}
		.ico-dl {
		    width: 14px;
		    background-position: -57px -50px;
		}
		.ico-share {
		    width: 14px;
		    background-position: 0 0;
		}
		.ico-add {
		    width: 16px;
		    background-position: -24px 0;
		}
		.col-4 {
		    width: 70px;
		}
		.col-5 {
		    width: 35px;
		    color: #666;
		}
		.col-6 {
		    width: 37px;
		    padding-left: 6px;
		}
		.ask {
		    position: absolute;
		    right: 25px;
		    top: 12px;
		    cursor: pointer;
		    z-index: 5;
		}
		.ico-ask {
		    display: inline-block;
		    width: 21px;
		    height: 21px;
		    background-position: 0 -50px;
		    text-indent: 0;
		    _background: none;
		    _filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../../assets/playlist_ask.png',sizingMethod='scale');
		}
		.upload {
		    position: absolute;
		    right: 12px;
		    top: 40px;
		    box-shadow: 0 2px 3px rgba(0,0,0,.75);
		    width: 81px;
		    z-index: 5;
		    display: none;
		     a {
			    display: block;
			    text-align: center;
			    padding: 8px 0;
			    color: #666;
			    background: #ebebeb;
			    text-shadow: 0 1px 0 #fff;
			}
		}
		.msk2 {
		    position: absolute;
		    left: 560px;
		    _left: 560px;
		    top: 0;
		    z-index: 3;
		    width: 420px;
		    height: 250px;
		    background: #121212;
		    opacity: .01;
		    filter: Alpha(opacity=1);
		}
		.listlyric {
		    position: relative;
		    right: 0px;
		    top: 0;
		    z-index: 4;
		    margin: 21px 0 20px 0;
/*		    height: 219px;*/
		    width: 354px;
		    overflow: hidden;
		    p {
			    color: #989898;
			    word-wrap: break-word;
			    text-align: center;
			    line-height: 32px;
			    height: auto !important;
			    height: 32px;
			    min-height: 32px;
			    -webkit-transition: color 0.7s linear;
			    -moz-transition: color 0.7s linear;
			    -o-transition: color 0.7s linear;
			    transition: color 0.7s linear;
			}
			p.z-sel {
			    color: #fff;
			    font-size: 14px;
			    -webkit-transition: color 0.7s linear;
			    -moz-transition: color 0.7s linear;
			    -o-transition: color 0.7s linear;
			    transition: color 0.7s linear;
			}
		}
		
	}
	.m-playbar .list li.z-sel .playicn, .m-playbar .list li:hover .icns, .m-playbar .list li.z-hover1 .icns {
    display: block;
}
.m-playbar .col a, .m-playbar .col a:hover {
    color: #9b9b9b;
}
.m-playbar .list li:hover .col, .m-playbar .list li:hover .col a, .m-playbar .list li:hover .col a:hover, .m-playbar .list li.z-sel .col, .m-playbar .list li.z-sel .col a, .m-playbar .list li.z-sel .col a:hover {
    color: #fff;
}
.m-playbar .col-2, .m-playbar .col-4 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
}
.m-playbar .list .nocnt, .m-playbar .list .nocnt a {
    color: #aaa;
}
.happy-scroll-container{
	width: 100% !important;
	height: 100% !important;
}
.msk2-listlyric{
	position: absolute;
    left: 560px;
    _left: 560px;
    top: 0;
    z-index: 4;
    width: 420px;
    height: 250px;
    background:transparent;
    opacity: 1;
    filter: alpha(opacity=1);
}
/*版权提示*/
.auto-1569208815671 {
    position: fixed;
    _position: absolute;
    z-index: 100;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-image: url(data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==);
}
div.m-layer-w5 {
    width: 442px;
    text-align: left;
    
}
.u-icn2-11 {
    width: 40px;
    height: 40px;
    background-position: -78px -45px;
}
.m-tipinfo .tip {
    width: 300px;
    line-height: 22px;
    text-align: left;
}
div.m-layer{
	
	.lsbtn {
	    padding: 10px 0;
	    border-radius: 0 0 4px 4px;
	    border-top: 1px solid #c6c6c6;
	    background-color: #f7f7f7;
	    text-align: center;
	}
} 
.m-tipinfo {
    padding: 15px 40px;
}
div.m-layer .lybtn span, div.m-layer .lsbtn span {
    margin: 0 10px;
}
/*.u-btn2-2-h {
    background-position: right -1690px;
}*/
.u-btn2-1-h {
    background-position: right -1850px;
}
.u-btn2-1-h, .u-btn2-1-h i, .u-btn2-2-h, .u-btn2-2-h i {
    height: 35px;
    line-height: 34px;
    *line-height: 36px;
}
.u-btn2-2-h i {
    background-position: 0 -1650px;
}
.u-btn2-1-h i {
    background-position: 0 -1810px;
}
.u-btn2-2-h i,.u-btn2-1-h i {
	width: 83px;
}
.u-btn2-2-h:hover{
	background-position: right -1770px;
}
.u-btn2-2-h:hover i {
    color: #fff;
    background-position: 0 -1730px;
}
.u-btn2-1-h:hover {
    background-position: right -1930px;
}
.u-btn2-1-h:hover i {
    background-position: 0 -1890px;
}
/*歌曲收藏*/
.auto-1576560301925 {
    position: fixed;
    _position: absolute;
    z-index: 100;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-image: url(data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==);
}
div.m-layer .lyct-1 {
    padding: 0;
}
.m-favgd {
	text-align: left;
	.tit {
	    padding: 10px 0 10px 35px;
	    background: #e6e6e6;
	    cursor: pointer;
	}
	.u-icn-33 {
	    margin-right: 10px;
	}
	ul{
		* {
		    cursor: pointer;
		}
		li {
		    padding: 6px 0 6px 35px;
		    border-top: 1px solid #e0e0e0;
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
		    position: relative;
		    display: block;
		    width: 40px;
		    height: 40px;
		    img {
			    width: 40px;
			    height: 40px;
			}
		}
		.name {
		    margin-top: 2px;
		    margin-bottom: 8px;
		}
		 p {
		    word-wrap: break-word;
		}
	} 
	
}
.u-icn-33 {
    width: 35px;
    height: 36px;
    background-position: 0 -495px;
}
.tjcg{
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -140px;
	width: 280px;
	height: 56px;
	text-align: center;
	line-height: 56px;
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 0px 0px 20px #a7a3a3;
    z-index: 1000;
	.u-icn21-100{
		width:14px;
    	height: 14px;
    	background-position: 0 -380px;
    	margin-right: 10px;
	}
	background-color:#fff;
}
.m-favgd {
    overflow-y: auto;
    height: 374px;
}
.m-favgd ul li:hover, .m-layer-favgd ul li.z-hvr {
    background: #f2f2f2;
}
#auto-id-seAMZkrlrAAEGciX{
	text-align: left;
}
.m-crgd .u-txt {
    vertical-align: middle;
    width: 330px;
    height: 19px;
    margin: 0;
    padding: 5px 6px 6px;
    border: 1px solid #cdcdcd;
    border-radius: 2px;
    line-height: 19px;
}
.m-crgd .tip {
    margin: 8px 0 20px 48px;
}
.m-crgd .btn, .m-crgd .u-err {
    margin-left: 48px;
}
.m-crgd .u-btn2-1 {
    margin-left: 20px;
}
.m-crgd {
    margin-left: 30px;
    text-align: left;
}
</style>