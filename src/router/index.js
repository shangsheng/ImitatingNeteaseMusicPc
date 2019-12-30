import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import discoverPlaylist from '@/components/discover/playlist/playlist'
import playlist from '@/components/discover/playlist'
import discoverAlbum from '@/components/discover/album/album'
import album from '@/components/discover/album'
import discoverToplist from '@/components/discover/toplist/toplist'
import discoverDjradio from '@/components/discover/djrodio/djrodio'
import discoverCategory from '@/components/discover/djrodio/category'
import djRadio from '@/components/discover/djradio'
import Rank from '@/components/discover/djrodio/rank'
import Program from '@/components/discover/program'
import Recommend from '@/components/discover/program/recommend'
import discoverArtist from '@/components/discover/artist/artist'
import discoverSigned from '@/components/discover/artist/signed'
import discoverCat from '@/components/discover/artist/cat'
import Artist from '@/components/discover/artist'
import Songs from '@/components/songs/song'
import searchM from '@/components/search/m'
import userHome from '@/components/user/home'
import songsRank from '@/components/user/songs/rank'
import taste from '@/components/discover/recommend/taste'
import my from '@/components/my/my'
import myArtist from '@/components/my/music/artist'
import myMv from '@/components/my/music/mv'
import myRadio from '@/components/my/music/radio'
import mv from '@/components/mv/mv'
import video from '@/components/video/video'
import friend from '@/components/friend/friend'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      alias: '/discover',
      meta:{title:'我的云音乐'},
    },
    {
      path: '/discover/playlist',
      name: 'discoverPlaylist',
      component: discoverPlaylist,
      meta:{title:'歌单'},
      
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: playlist,
      meta:{title:'歌单详情'},
      
    },
    {
      path: '/discover/album',
      name: 'discoverAlbum',
      component: discoverAlbum,
      meta:{title:'新碟上架'},
      
    },
    {
      path: '/album',
      name: 'album',
      component: album,
      meta:{title:'专辑详情'},
      
    },
    {
      path: '/discover/toplist',
      name: 'discoverToplist',
      component: discoverToplist,
      meta:{title:'排行榜'},
      
    },
    {
      path: '/discover/djradio',
      name: 'discoverDjradio',
      component: discoverDjradio,
      meta:{title:'主播电台'},
      
    },
    {
      path: '/discover/djradio/category',
      name: 'discoverCategory',
      component: discoverCategory,
      meta:{title:'主播电台类型'}, 
    },
    {
      path: '/djradio',
      name: 'djradio',
      component: djRadio,
      meta:{title:'电台详情'}, 
    },
    {
      path: '/discover/djradio/rank',
      name: 'rank',
      component: Rank,
      meta:{title:'节目排行榜'}, 
    },
    {
      path: '/program',
      name: 'progrm',
      component: Program,
      meta:{title:'电台节目详情'}, 
    },
    {
      path: '/discover/djradio/recommend',
      name: 'recommend',
      component: Recommend,
      meta:{title:'推荐节目'}, 
    },
    {
      path: '/discover/artist/',
      name: 'artists',
      component: discoverArtist,
      meta:{title:'推荐歌手'}, 
    },
    {
      path: '/discover/artist/signed/',
      name: 'signed',
      component: discoverSigned,
      meta:{title:'入驻歌手'},
    },
    {
      path: '/discover/artist/cat/',
      name: 'artistCat',
      component: discoverCat,
      meta:{title:'歌手'}, 
    },
    {
      path: '/artist/',
      name: 'artist',
      component: Artist,
      meta:{title:'歌手'}, 
    },
    {
      path: '/songs/',
      name: 'song',
      component: Songs,
      alias: '/song',
      meta:{title:'歌曲详情'}, 
    },
    {
      path: '/search/m/',
      name: 'mSearch',
      component: searchM,
      meta:{title:'搜索'}, 
    },
    {
    	path:'/user/home',
    	name:'userHome',
    	component:userHome,
    	meta:{title:'用户'}
    },
    
     {
    	path:'/user/songs/rank',
    	name:'songsRank',
    	component:songsRank,
    	meta:{title:'用户'}
    },
     {
    	path:'/discover/recommend/taste',
    	name:'taste',
    	component:taste,
    	meta:{title:'每日歌曲推荐-我的云音乐'}
    },
    {
    	path:'/my',
    	name:'my',
    	component:my,
    	meta:{title:'我的云音乐'},
    	alias: '/my/m/music/playlist',
    },
    {
    	path:'/my/m/music/artist',
    	name:'musicArtist',
    	component:myArtist,
    	meta:{title:'我的歌手'},
    },
    {
    	path:'/my/m/music/mv',
    	name:'musicMv',
    	component:myMv,
    	meta:{title:'我的视频'},
    },
     {
    	path:'/my/m/music/radio',
    	name:'musicRadio',
    	component:myRadio,
    	meta:{title:'我订阅的电台'},
    },
     {
    	path:'/mv',
    	name:'mv',
    	component:mv,
    	meta:{title:'mv'},
    },
    {
    	path:'/video',
    	name:'video',
    	component:video,
    	meta:{title:'视频'},
    },
     {
    	path:'/friend',
    	name:'friend',
    	component:friend,
    	meta:{title:'朋友'},
    },
  ]
})
