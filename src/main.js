// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueWechatTitle from 'vue-wechat-title'
//import '../static/css/public.less'
import component from '../static/js/component.js'
import {drage,seehref,getId,Playback,cutString,toggleBody,checkMusic,formatTime,
	datePublish,secondTime,gdt,timeDJq,arraySort,foramtChild,getScroll,logoRefresh,addLinks,addNameLinks,addThLinks,
	addBr} from '../static/js/publics.js'
import rgbaster from '../static/js/rgbaster.min.js'
import eventVue from '../static/js/eventVue.js'
import {cookieUtil,localUtil,removeLocalStorage,delCookie} from '../static/js/browserStorage.js'
import {collection} from '../static/js/collection.js'
//import audios from '../static/js/theAudio.js'
//import {post,fetch,patch,put} from '../static/js/https'
axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.prototype.$http=axios
//Vue.prototype.$post =post 
Vue.prototype.$drage = drage
Vue.prototype.$seehref = seehref
Vue.prototype.$getId = getId
Vue.prototype.$Playback = Playback
Vue.prototype.$cutString = cutString
Vue.prototype.$toggleBody = toggleBody
Vue.prototype.$ = $
Vue.prototype.$host = 'http://192.168.1.74:3000'   //接口base地址
Vue.prototype.$imgSrc = 'https://music.163.com/api/img/blur/'
Vue.prototype.$rgbaster = rgbaster
Vue.prototype.$checkMusic = checkMusic
Vue.prototype.$formatTime = formatTime
Vue.prototype.$datePublish = datePublish
Vue.prototype.$secondTime = secondTime
Vue.prototype.$gdt = gdt
Vue.prototype.$cookieUtil = cookieUtil
Vue.prototype.$localUtil = localUtil
Vue.prototype.$removeLocalStorage = removeLocalStorage
Vue.prototype.$delCookie = delCookie
Vue.prototype.$timeDJq = timeDJq
Vue.prototype.$arraySort = arraySort
Vue.prototype.$foramtChild = foramtChild
Vue.prototype.$getScroll = getScroll
//Vue.prototype.$audios = audios
Vue.prototype.$logoRefresh = logoRefresh
Vue.prototype.$addLinks = addLinks
Vue.prototype.$addNameLinks = addNameLinks
Vue.prototype.$addThLinks = addThLinks
Vue.prototype.$addBr = addBr
Vue.prototype.$collection = collection
//注册组件
Vue.use(component)

Vue.use(VueAwesomeSwiper)
Vue.use(VueWechatTitle)
if (process.browser) {
  const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
  Vue.use(VueAwesomeSwiper)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data:{eventVue},
  components: { App },
  template: '<App/>',
})
//添加过滤全局方法
Vue.prototype.searchValue=function(value,mates){
			if(!value) return ''
			value = value.toString()
			
			var str = '<span class="s-fc7 f-tdn">'+mates+'</span>'
			
			return  value.replace(new RegExp(mates,'gm'),str)
}

// 根据路由设置标题
router.beforeEach((to, from, next) => {
    /*路由发生改变修改页面的title */
    if(to.meta.title) {
      document.title = to.meta.title
    }
    next();
})

//			自定义获取焦点
//Vue.directives('focus',{
//	update: function (el, {value}) {
//				
//					if (value) {
//					
//						el.focus()
//						
//					
//					}
//				
//				}
//})
//过滤器
//Vue.filter('eTips',function(value){
//	if (!value) return ''
//		    var searchRegex = new RegExp(this.login.el.eValue, 'i');
//		    var arr=[];
//	        for(var i= 0, j = value.length; i < j; i++){
//	            arr[i] = {};
//	           
//	            if(searchRegex.test(value[i].eSuffix)){
//	            	arr[i].eSuffix = value[i].eSuffix;
//	            }
//	        }
//	        return arr;
//		 })
