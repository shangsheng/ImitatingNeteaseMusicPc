import myHeader from '../../src/components/header/header.vue'
import logOn from '../../src/components/logOn/log.vue'
import myFooter from '../../src/components/footer/footer.vue'
import myPlay from '../../src/components/barPlay/barPlay.vue'
import { HappyScroll } from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
import playSongs from '../../src/components/publics/palysongs.vue'
import songsListCashe from '../../src/components/publics/songsListcahe.vue'
import comments from '../../src/components/publics/comments.vue'
import mDown from '../../src/components/publics/mdd-down.vue'
import djBanner from '../../src/components/publics/djbanner.vue'
import userCvrlst from '../../src/components/publics/user-cvrlst.vue'
const component ={
	install:function(Vue){
		Vue.component('my-headers',myHeader)
		Vue.component('my-log',logOn)
		Vue.component('my-footer',myFooter)
		Vue.component('my-play',myPlay)
		Vue.component('happy-scroll', HappyScroll)
		Vue.component('play-songs',playSongs)
		Vue.component('songs-list-cashe',songsListCashe)
		Vue.component('my-comments',comments)
		Vue.component('my-down',mDown)
		Vue.component('dj-banner',djBanner)
		Vue.component('user-cvrlst',userCvrlst)
	}
}
export default component