README
==========
## 前提
	随着不断学习vue,需要做小项目来练习锻炼使用vue中了解新的知识，此项目是利用`网易云音乐pc端`的UI设计，功能实现的，尽可能的以假乱真。</br>
	注：此项目仅供学习使用，正常使用请使用`网易云音乐官方网站`
	感谢：[https://binaryify.github.io/NeteaseCloudMusicApi/#/](https://binaryify.github.io/NeteaseCloudMusicApi/#/)   提供的API支持
## 项目目标
	尽可能的实现网易云音乐pc端的功能
### 环境依赖
	node v11.12.0,
	
	
### 部署步骤
	```
		# 克隆
	```
	```
		# 打开项目目录
	```
	```
		# 安装依赖
		npm install
	```
	```
		# 运行项目
		npm run dev
	```
### 实现的功能
	1.邮箱登录
	2.手机号登录
	3.退出登录
	4.发现音乐推荐页面
	5.排行榜页面
	6.歌单页面
	7.歌手页面
	8.新碟上架页面
	9.主播电台页面
	10.歌单详情页面
	11.歌手详情页面
	12.专辑详情页面
	13.mv详情页面
	14.视频详情页面
	15.歌曲详情页面
	16.歌词滚动
	17.我的音乐页面
	18.朋友页面
	19.评论模板
	20.评论点赞
	21.签到
	22.搜索
	23.电台详情
	24.关注用户
	25.收藏音乐，歌单，专辑，歌手
### 目录结构描述
	```.my-music
		+---node_modules
		+---build
		+---config
		+---src
		|   +--- assets //图片地址
		|   +--- componets
		|   |    +---  backTotop
		|   |    |     +--- backTotop.vue //返回顶部按钮
		|   |    +---  barPlay
		|   |    |     +---  barPlay.vue //音乐播放组件
		|	|	 +---  discover
		|	|	 |     +--- album
		|   |    |     |    +--- album.vue //新碟上架页面
		|	|	 +---  discover
		|	|	 |	   +--- artist
		|	|	 |	   |    +--- artist.vue //歌手页面
		|	|	 |	   |	+--- cat.vue //歌手分类页面
		|	|	 |	   |    +--- signed.vue //入住歌手页面
		|	|	 |	   +--- djrodio
		|	|	 |	   |	+--- djrodio.vue //主播电台页面
		|	|	 |	   |	+--- category.vue //电台分类页面
		|	|	 |	   |	+--- rank.vue //节目排行榜页面
		|	|	 |	   +--- playlist
		|	|	 |	   |	+--- playlist.vue //歌单页面
		|	|	 |	   +--- program
		|	|	 |	   |	+--- recommend.vue //主播电台里的推荐节目
		|	|	 |	   +--- recommend
		|	|	 |	   |	+--- taste.vue //每日歌曲推荐页面
		|	|	 |	   +--- toplist 
		|	|	 |	   |	+--- toplist.vue //排行榜
		|	|	 |	   +--- album.vue //专辑详情
		|	|	 |	   +--- artist.vue //歌手详情
		|	|	 |	   +--- djradio.vue //电台详情
		|	|	 |	   +--- playlist.vue //排行榜详情
		|	|	 |	   +--- program.vue //电台节目详情
		|	|	 +---  footer
		|	|	 |	   +--- footer.vue //底部组件
		|	|	 +---  friend
		|	|	 |	   +--- friend.vue //朋友页面
		|	|	 +---  header
		|	|	 | 	   +--- header.vue //头部组件
		|	| 	 +---  home
		|	|	 |	   +--- home.vue //发现音乐推荐页面
		|	|	 +---  logOn
		|	|	 |	   |	 +--- log.vue //登录组件
		|	|	 +---  mv
		|	|	 +---  mv.vue //mv详情页面
		|	|	 +---  my
		|	|	 |	   +--- music
		|	|	 | 	   |	+--- artist.vue //我的歌手页面
		|	|	 |	   |	+--- mv.vue //我的视频页面
		|	|	 |	   |	+--- radio.vue //我的电台页面
		|	|	 |	   +--- my.vue //我的音乐页面
		|	|	 |	   +--- my-leftHader.vue //我的音乐左侧组件
		|	|	 |	   +--- my-playlist.vue //我的音乐右侧组件
		|	|	 +---  publics
		|	|	 |	   +--- album-src.vue //朋友-分享专辑组件
		|	|	 |	   +--- artist-album.vue //歌手-所有专辑组件
		|	|	 |	   +--- artist-desc.vue //歌手-艺人介绍组件
		|	|	 |	   +--- artist-hotSongs.vue //歌手-热门作品组件
		|	|	 |	   +--- artist-mv.vue //歌手-相关mv组件
		|	|	 |	   +--- artist-sgerlist.vue //入住歌手-下拉加载组件
		|	|	 |	   +--- artist-sgernav.vue //歌手-左侧类别组件
		|	|	 |	   +--- comments.vue //评论组件
		|	|	 |	   +--- djbanner.vue //电台-轮播类型组件
		|	|	 |	   +--- event-src.vue //朋友-转发组件
		|	|	 |	   +--- mdd-down.vue //下载组件
		|	|	 |	   +--- mv-src.vue //朋友-mv组件
		|	|	 |	   +--- pager.vue //分页组件
		|	|	 |	   +--- palysongs.vue //播放、收藏、分享、下载组件
		|	|	 |	   +--- playlist-src.vue //朋友-歌单组件
		|	|	 |	   +--- relay-src.vue //朋友-其他组件
		|	|	 |	   +--- songsListcahe.vue //歌曲列表组件
		|	|	 |	   +--- songs-src.vue //朋友-单曲组件
		|	|	 |	   +--- topic-src.vue //朋友-专栏文章组件
		|	|	 |	   +--- user-cvrst.vue //用户-创建歌单组件
		|	|	 |	   +--- user-record.vue //用户-听歌历史记录组件
		|	|	 |	   +--- video-src.vue //朋友-视频组件
		|	|	 +---  search
		|	|	 |	   +--- m.vue //搜索页面
		|	|	 |	   +--- m-album.vue //搜索-专辑组件
		|	|	 |	   +--- m-lyric.vue //搜索-歌词组件
		|	|	 |	   +--- m-mv.vue //搜索-mv组件
		|	|	 |	   +--- m-playlist.vue //搜索-歌单组件
		|	|	 |	   +--- m-rdilist.vue //搜索-电台主播组件
		|	|	 |	   +--- m-songs.vue //搜索-单曲组件
		|	|	 |	   +--- m-srchrst.vue //搜索-歌手组件
		|	|	 |	   +--- m-user.vue //搜索-用户组件
		|	|	 +---  songs
		|	|	 |	   +--- song.vue //歌曲详情页面
		|	|	 +---  user
		|	|	 |	   +--- songs
		|	|	 |	   |	+--- rank.vue //用户-听歌排行榜更多页面
		|	|	 |     +--- home.vue //用户页面
		|	|	 +---  video
		|	|	 |	   +--- video.vue //视频详情页面
		|   +--- router
		|	|    +---  index.js //路由
		|   +--- vuex
		|   +--- APP.vue
		|   +--- main.js
		+---static
		|	+--- css
		|	|	 +---  public.less //公共的css
		|	+--- js
		|	|	 +---  api.js //API链接
		|	|	 +---  browserStorage.js //封装cookie/storage
		|	|	 +---  component.js //注入公共组件
		|	|	 +---  publics.js //封装公共的js
		|	|	 +---  rgbaster.min.js //获取图片背景颜色js
		+---test
		+---index.html
		+---package.json
		+---package-lock.json
		+---README.md
	```
### V1.0.1 版本内容更新