<template>
	<div id="taste">
		<div class="g-bd4 f-cb">
			<div class="g-mn4">
				<div class="g-mn4c">
					<div class="g-wrap6">
						<div class="n-daily">
							<div class="bg j-flag">
								<div class="cal u-date u-date-2 f-alpha">
									<div class="head j-item">
										{{dayweb}}
									</div>
									<div class="bd j-item">
										{{day}}
									</div>
									<span class="mask f-alpha"></span>
								</div>
							</div>
							<div class="btnwrap f-cb j-flag">
								<div class="btn f-fl">
									<span class="u-btn2 u-btn2-2 u-btni-addply f-fl cursor" data-res-action="play" data-res-type="24" @click.stop="plays($event)">
										<i>
											<em class="ply"></em>
											播放全部
										</i>
									</span>
									<span class="u-btni u-btni-add" data-res-action="addto" data-res-type="24"></span>
								</div>
								<span class="u-btni u-btni-fav f-fl" data-res-action="fav" data-action="col" data-res-type="24">
									<i>收藏全部</i>
								</span>
							</div>

						</div>
						<div class="n-songtb n-songtb-1 j-flag">
							<div class="u-title u-title-1 f-cb">
								<h3>
									<span class="f-ff2">歌曲列表</span>
								</h3>
								<span class="sub s-fc3">
									<span class="j-flag">{{tasteData.length}}</span> 首歌
								</span>
							</div>
							<div v-if="tasteData.length>0">
								<div class="j-flag">
									<table class="m-table " >
										<thead>
											<tr>
												<th class="first w1">
													<div class="wp">
														&nbsp;
													</div>
												</th>
												<th>
													<div class="wp af0">歌曲标题</div>
												</th>
												<th class="w2" >
													<div class="wp af1">时长</div>
												</th>
												<th class="w3 " >
													<div class="wp af2">歌手</div>
												</th>

												<th class="w4" >
													<div class="wp af3">专辑</div>
												</th>
											</tr>
										</thead>
										<tbody>
											<tr :class="{even:index%2==0}" v-for="(item,index) in tasteData" v-bind:key="index">
												<td class="left">
													<div class="hd ">

														<span class="ply " :class="{'ply-z-slt':songsNum == index}" data-res-action="play" :data-res-type="18"  :data-res-id="item.id"  title="播放" @click.stop="plays($event)" :data-res-index="index" >&nbsp;</span>
														
														<span class="num">{{index+1}}</span>
														<!--<div class="rk" v-bind:hidden="!songsPreCahe.tracks&&songsPreCahe.category != '排行榜'||songsPreCahe.category == '歌单'">
											<span class="ico ico u-icn u-icn-73 s-fc9" :class="[]"></span>
										</div>-->
													</div>
												</td>
												<td >
													<div class="f-cb">
														<div class="tt">
															
															<div class="ttc">
																<span class="txt">
																	<router-link :to="{path:'/song',query:{id:item.id}}" >
																		<b :title="item.name">
																			{{item.name}}
																		</b>
																	</router-link>
																	
																	<span v-if="item.alias.lenth != 0">
																		<span class="s-fc8" :title="item.alias"  v-for="(obj,index) of item.alias" v-bind:key="index">
																			-{{obj}}
																		</span>
																	</span>
																	<span class="mv" v-if="item.mvid" :data-res-id="item.mvid" data-res-action="mv" title="播放mv">mv</span>
																</span>
															</div>
														</div>
													</div>
												</td>
												<td class=" s-fc3">
													<span class="u-dur ">{{item.duration}}</span>
													<div class="opt hshow">
														<span class="u-icn u-icn-81 icn-add" data-res-action="addto" :data-res-type="18" :data-res-id="item.id"  title="添加到播放列表"></span>
														<span class="icn icn-fav" :data-res-id="item.id" data-res-action="fav" :data-res-type="18" title="收藏"></span>
														<span class="icn icn-share" :data-res-id="item.id" data-rs-action="share" :data-res-type="18" :data-res-name="item.name" :data-res-author="item.arLength" data-res-pic="item.al.picUrl" title="分享"></span>
														<span class="icn icn-dl" :data-res-id="item.id" data-res-action="download" :data-res-type="18" title="下载">下载</span>
													</div>
												</td>
												<td>
													<div class="text">

														<span :title="item.arLength">
												<router-link :to="{path:'/artist',query:{id:obj.id}}" v-for="(obj,oindex) in item.artists" v-bind:key="oindex">
													{{obj.name}} <span class="s-fc8" :title="tn" v-for="(tn,index) of obj.tns" v-bind:key="index"> - ({{tn}})</span> <i v-if="oindex != item.artists.length -1">/</i>
														</router-link>
														</span>

													</div>
												</td>
												<td class="hascls">
													<div class="f-pr">
														<div class="text">
															<router-link :to="{path:'/album',query:{id:item.album.id}}">
																{{item.album.name}}
															</router-link>
														</div>
														<span class="cls u-icn u-icn-80 f-tid icn-dislike cursor" title="不感兴趣" :data-res-id="item.id" data-res-action="dislike">不感兴趣</span>
													</div>
													
												</td>
											</tr>

										</tbody>

									</table>
								</div>
								<div class="j-flag"></div>
							</div>
							<div class="u-load s-fc4" v-else>
								<i class="icn"></i>			
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="g-sd4">
				<div class="g-wrap7">
					<div class="n-cmdsd">
						<div class="hd f-ff2">
							<span class="icn u-icn2 u-icn2-1"></span>
							个性化推荐如何工作
						</div>
						<p class="s-fc3">它聪明、熟悉每个用户的喜好，从海量音乐中挑选出你可能喜欢的音乐。</p>
						<p class="s-fc3">它通过你每一次操作来记录你的口味</p>
						<ul class="type s-fc4 j-flag">
							<li>
								<span class="icn u-icn2 u-icn2-2"></span>
								你播放了
								<strong class="s-fc6">{{listenSongsData.listenSongs}}</strong>
								首音乐
							</li>
							<li>
								<span class="icn u-icn2 u-icn2-3"></span>
								你喜欢
								<strong class="s-fc6">{{linkeData}}</strong>
								首音乐
							</li>
							<li class="last">
								<span class="icn u-icn2 u-icn2-4"></span>
								你收藏了
								<strong class="s-fc6">{{subcount.artistCount}}</strong>
								位歌手
							</li>
						</ul>
						<p class="s-fc3">你提供给云音乐的信息越多，它就越了解你的音乐喜好。</p>
					</div>
					<my-down></my-down>
				</div>
			</div>
		</div>
		
	</div>
	<!-- </div> -->
</template>

<script>
	import eventVue from '../../../../static/js/eventVue.js'
	export default {
		name: 'taste',
		data() {
			return {
				tasteData: {},
				day: 1,
				dayweb: '-',
				songsNum:null,//播放第几个歌曲
				zSlt:'mrgqtj',
				listenSongsData:{},
				subcount:{},
				linkeData:0,
				barVoice:true
			}

		},
		inject: ['reload'], //app.vueҳ���ж����¼���
		beforeCreate: function() {
			//          debugger;
		},
		created: function() {
			//          debugger;
			//当天日期
			var dayDate = new Date();
			var days = dayDate.getDay();
			this.day = dayDate.getDate();
			switch(days) {

				case 1:

					days = '星期一';

					break;

				case 2:

					days = '星期二';

					break;

				case 3:

					days = '星期三';

					break;

				case 4:

					days = '星期四';

					break;

				case 5:

					days = '星期五';

					break;

				case 6:

					days = '星期六';

					break;

				case 0:

					days = '星期日';

					break;

			}
			this.dayweb = days;
			var that = this;
			this.$http({
				method: 'get',
				url: that.$host + "/recommend/songs"
			}).then(function(res) {
				console.log(res.data)
				that.$.each(res.data.recommend,function(index,el){
					el.duration = that.$formatTime(el.duration/1000)
				})
				that.tasteData = res.data.recommend;
				that.getAllMsg()
			}).catch(error => {
				console.log(error.response.data)
				if(error.response.data.msg == "需要登录"){
					that.$router.push({
		                path: '/',
		            })
				}
			})
			this.$logoRefresh(function(res){
					console.log(res.data)
					that.$http({
						method: 'get',
						url: that.$host + "/user/detail?uid="+res.data.profile.userId
					}).then(function(res) {
						console.log(res.data)
						that.listenSongsData = res.data
					}).catch(error => {
						console.log(error)
					})
					that.$http({
						method: 'get',
						url: that.$host + "/user/subcount"
					}).then(function(res) {
						console.log(res.data)
						that.subcount = res.data
					}).catch(error => {
						console.log(error)
					})
					that.$http({
						method: 'get',
						url: that.$host + "/likelist?uid="+res.data.profile.userId
					}).then(function(res) {
						console.log(res.data)
						that.linkeData = res.data.ids.length
					}).catch(error => {
						console.log(error)
					})
				})
			this.$root.eventVue.$emit('zSltV',this.zSlt);
			this.$root.eventVue.$emit('barVoice',this.barVoice);
		},
		beforeMount: function() {
			//          debugger;
		},
		mounted: function() {
			//          debugger;

		},
		deactivated: function() {
			alert("keepAliveͣ��");
		},
		activated: function() {
			console.log('component activated');
		},
		beforeDestroy: function() {
			console.group('beforeDestroy ���ǰ״̬===============��');

		},
		destroyed: function() {
			console.group('destroyed ������״̬===============��');

		},
		directives: {
			//			�Զ����ȡ����
			focus: {

				update: function(el, {
					value
				}) {

					if(value) {

						el.focus()

					}

				}

			}

		},
		methods: {
		plays($event){
		        		let _this = this;
		        		if($event.target.getAttribute('data-res-action') == 'play'){
								console.log($event)
							console.log(this.$root.eventVue)
							this.$root.eventVue.$emit('playid', 
								{resId:$event.target.getAttribute('data-res-id'),
								resData:$event.target.getAttribute('data-res-data'),
								resType:$event.target.getAttribute('data-res-type'),
								resFrom:$event.target.getAttribute('data-res-from'),
								resIdx:$event.target.getAttribute('data-res-idx'),
								resProgram:_this.tasteData[$event.target.getAttribute('data-res-index')],
								songsNum:$event.target.getAttribute('data-res-index')
							})
						}else{
							console.log('点击播放图标不正确')
						}
						setTimeout(function(){
							_this.getAllMsg()
						},1000)
						
		        },
		getAllMsg(){
        		console.log(this.songsPreCahe)
				var _this = this;
				
					var songsData = JSON.parse(_this.$localUtil('songsData'))
					console.log(songsData)
					_this.$.each(_this.tasteData,function(index,item){
						console.log(item.id == songsData.id)
						if(songsData && item.id == songsData.id){
								console.log(index)
								_this.songsNum = index
								
						}
						
						
					})
					
				
						
				
				
				
        	}
				},
		
		//����
		watch: {
			'$route' (to, from) {

				console.log(to)
				console.log(from)
				//���ж���Ҫ�������������֮��������������ҳ��Ҳ�����������Լ��˱����������������жϣ����������ҳ��������ݼ��ص�����
				if(this.$route.query.id) {
					//this.reload()
					this.getAllMsg()
				}

			}
		}
	}
</script>

<style lang="less">
	#taste {
		.n-daily {
			.bg {
				width: 640px;
				height: 179px;
				padding-top: 1px;
			}
			.cal {
				float: left;
				margin: 34px 0 0 54px;
				_margin-left: 27px;
			}
			.btnwrap {
				margin-top: 30px;
				.btn {
					margin-right: 8px;
				}
			}
		}
		.u-date {
			position: relative;
			zoom: 1;
			display: block;
			width: 140px;
			height: 140px;
			background-position: 0 0;
			.head {
				display: block;
				height: 33px;
				line-height: 33px;
				color: #fed9d9;
				font-size: 14px;
				text-shadow: 0 -1px #962626;
				text-align: center;
			}
			.bd {
				display: block;
				line-height: 102px;
				text-align: center;
				font-size: 94px;
				font-family: Arial, Helvetica, sans-serif;
				font-weight: bold;
				color: #202020;
			}
			.mask {
				position: absolute;
				top: 33px;
				left: 0;
				width: 142px;
				height: 107px;
				background-position: 0 -150px;
				_background-position: 0 0;
			}
		}
		.u-date-2 {
			width: 114px;
			height: 114px;
			background-position: 0 -270px;
			_background-position: 0 0;
			.head {
				height: 26px;
				line-height: 26px;
				font-size: 12px;
			}
			.bd {
				font-size: 74px;
				line-height: 80px;
			}
			.mask {
				top: 26px;
				background-position: 0 -400px;
				_background-position: 0 0;
			}
		}
		.u-btn2-2 {
			color: #fff;
			background-position: right -428px;
			i {
				color: #fff;
				background-position: 0 -387px;
				width: auto;
			}
		}
		.u-btni-addply {
			float: left;
			i {
				padding: 0 7px 0 8px;
			}
			.ply {
				float: left;
				width: 20px;
				height: 18px;
				margin: 6px 2px 2px 0;
				background-position: 0 -1622px;
				overflow: hidden;
			}
		}
		.u-btni-add {
			width: 31px;
			margin-left: -3px;
			padding-right: 0;
			background-position: 0 -1588px;
		}
		.u-btni,
		.u-btni i {
			float: left;
			height: 31px;
			line-height: 30px;
			min-width: 23px;
			cursor: pointer;
		}
		.u-btni {
			padding: 0 5px 0 0;
			white-space: nowrap;
		}
		.u-btni,
		.u-btni:hover {
			color: #333;
			text-decoration: none;
		}
		.u-btni-share,
		.u-btni-fav,
		.u-btni-cmmt,
		.u-btni-dl {
			background-position: right -1020px;
		}
		.u-btni i {
			padding: 0 7px 0 36px;
		}
		.u-btni-share i,
		.u-btni-fav i,
		.u-btni-cmmt i,
		.u-btni-dl i,
		.u-btni-unfav i {
			padding-right: 2px;
			padding-left: 28px;
		}
		.u-btni-fav i {
			background-position: 0 -977px;
		}
		.n-songtb-1 {
			margin-top: 15px;
		}
		.f-fl {
			float: left;
		}
		.u-title-1 h3 {
			font-size: 20px;
			line-height: 28px;
		}
		table {
	    border-collapse: collapse;
	    border-spacing: 0;
	    table-layout: fixed;
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
	.m-table .mv, .m-table .icnfix {
	    position: absolute;
	    top: 0;
	    right: 0;
	}
	.m-table {
	    width: 100%;
	    border: 1px solid #d9d9d9;
	    th {
		    vertical-align: top;
		    text-align: left;
		    font-weight: normal;
		    color: #666;
		    height: 38px;
		    background-color: #f7f7f7;
		    background-position: 0 0;
		    background-repeat: repeat-x;
		    .wp {
			    height: 18px;
			    line-height: 18px;
			    padding: 8px 10px;
			    background-position: 0 -56px;
			}
		}
	    .w1 {
		    width: 74px;
		}
		th.first .wp {
		    background: none;
		}
		.w2 {
		    width: 111px;
		}
		.w3 {
		    width: 14%;
		}
		.w4 {
		    width: 20%;
		}
		td {
		    padding: 6px 10px;
		    line-height: 18px;
		    text-align: left;
		}
		 .even td {
		    background-color: #f7f7f7;
		}
		.hd {
		    height: 18px;
		    .ply {
			    float: right;
			}
			.num {
			    width: 25px;
			    margin-left: 5px;
			    color: #999;
			}
		}
		.ply {
		    width: 17px;
		    height: 17px;
		    cursor: pointer;
		    background-position: 0 -103px;
		}
		.tt {
		    float: left;
		    width: 100%;
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
		 b {
		    font-weight: normal;
		}
		.soil {
		    position: absolute;
		    text-indent: -9999em;
		}
		.opt {
		    float: left;
		}
		.hshow {
		    display: none;
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
		.icn-dl {
		    background-position: -81px -174px;
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
			span{
		    	white-space: nowrap;
		    }
		}
		.w2-1 {
		    width: 91px;
		}
		 .w3-1 {
		    width: 26%;
		}
	}
	
	.m-table .mv {
	    width: 23px;
	    height: 17px;
	    margin: 1px 0 0 0;
	    background-position: 0 -151px;
	}
	.m-table tr.z-hover .hshow, .m-table tr:hover .hshow {
	    display: block;
	    position: relative;
	    margin-right: -10px;
	}
	.m-table tr.z-hover .u-dur, .m-table tr:hover .u-dur {
	    display: none;
	}
	.m-table .ply-z-slt, .m-table .ply-z-slt:hover {
	    background-position: -20px -128px;
	}
	.m-table-rank {
		.rk {
		    float: right;
		    width: 32px;
		    margin-right: -5px;
		    text-align: center;
		    .ico {
			    padding-left: 8px;
			    line-height: 17px;
			    font-size: 10px;
			    font-family: Arial, Helvetica, sans-serif;
			}
			.u-icn-75 {
			    display: block;
			    float: none;
			    margin: 0 auto;
			    padding-left: 0;
			}
		}
		 td.rank {
		    padding-top: 10px;
		    padding-bottom: 10px;
		}
		.rpic {
		    float: left;
		    width: 50px;
		    height: 50px;
		    margin-right: 14px;
		}
		.u-icn-73 {
		    background-position: -74px -299px;
		}
		.u-icn-74 {
		    background-position: -74px -318px;
		}
	}
	.u-icn-80 {
		    width: 10px;
		    height: 10px;
		    background-position: -75px -352px;
		    
		}
	
	.m-table .cls {
		    display: none;
		    position: absolute;
		    top: 4px;
		    right: -2px;
		}
	.m-table tr.z-hover .hascls .cls, .m-table tr:hover .hascls .cls {
	    display: block;
	}
	.f-pr {
		    position: relative;
		    zoom: 1;
		}
	.f-tid {
	    text-indent: -9999px;
	}
	.n-cmdsd {
	    margin-bottom: 30px;
	    text-align: left;
		 .hd {
		    height: 22px;
		    padding: 5px 0 8px;
		    border-bottom: 1px solid #ccc;
		    line-height: 22px;
		    font-size: 18px;
		    .icn {
			    float: left;
			    margin-right: 6px;
			}
		}
		p {
		    margin: 1em 0;
		    line-height: 19px;
		}
		.type {
		    background: #f7f7f7;
		    padding: 17px 0 17px 12px;
		    li {
			    width: 188px;
			    height: 40px;
			    line-height: 20px;
			}
			.icn {
			    float: left;
			    margin-right: 8px;
			}
		}   
	}
		.u-icn2-1 {
		    width: 22px;
		    height: 22px;
		    background-position: 0 0;
		}
		.u-icn2-2, .u-icn2-3, .u-icn2-4 {
		    width: 22px;
		    height: 22px;
		    background-position: -25px 0;
		}
		.u-icn2-3 {
		    background-position: 0 -25px;
		}
		.u-icn2-4 {
		    background-position: -25px -25px;
		}
		.g-sd4 {
		    position: relative;
		    float: right;
		    width: 270px;
		    zoom: 1;
		}
		.g-wrap7 {
		    padding: 20px 40px 40px 30px;
		}
	}
</style>