import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'

Vue.use(Vuex)

const state = {
   direction: 'forward',
   includePage: [],
   saveOneValue:'', //保存的第一个页面的值
   saveThreeValue:'',//第三个页面保存的值
   saveFourValue:'',//第四个页面保存的值
}

const actions = {

}

const getters = {
   direction: state => state.direction,
   includePage: state => state.includePage,
   saveOneValue:state => state.saveOneValue,
   saveThreeValue:state => state.saveThreeValue,
   saveFourValue:state => state.saveFourValue,
}

const mutations = {
   [types.UPDATE_DIRECTION] (state, direction) {
      state.direction = direction;
   },
   [types.UPDATE_INCLUDE_PAGE] (state, obj) {
      if(obj.flag){
         state.includePage.push(obj.pageName);
      }else{
         state.includePage.splice(state.includePage.indexOf(obj.pageName),1);
      }
   },
   [types.UPDATE_SAVEONEVALUE] (state, update) {
      state.saveOneValue = update;
   },
   [types.UPDATE_SAVETHREEVALUE] (state, update) {
      state.saveThreeValue = update;
   },
   [types.UPDATE_SAVEFOURVALUE] (state, update) {
      state.saveFourValue = update;
   }
}

//导出vue实例
export default new Vuex.Store({
   strict: process.env.NODE_ENV !== 'production',
   state,
   actions,
   getters,
   mutations
})
