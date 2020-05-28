<template>
  <div id="app">
   <my-headers v-if="isRouterAlive"></my-headers>
   <my-log ></my-log>
   <router-view v-if="isRouterAlive"></router-view><!--router-view写错了reouter-view-->
   <my-footer></my-footer>
   <!--<el-tooltip placement="top" content="返回顶部">-->
      <back-to-top 
        transitionName="fade"
        :customStyle="myBackToTopStyle" 
        :visibilityHeight="90" 
        :backPosition="50">
      </back-to-top>
    <!--</el-tooltip>-->
    <!--底部播放组件-->
		<my-play v-if="playShow"></my-play>
  </div>
</template>

<script>
	import BackToTop from '@/components/backTotop/backTotop.vue'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload,
      playHidden:this.playHidden
    }
  },
  data() {
    return {
      myBackToTopStyle: {
        'right': '100px',
        'bottom': '160px',
        'width': '49px',
        'height': '44px',
        'border-radius': '10px',
        'line-height': '44px', 
        'background': '#fff'
      },
      isRouterAlive: true,
      isRouterMain:true,
      playShow:true,
    }
  },
  components: {
    BackToTop
  },
  created:function (){
    this.myPlay()
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
        
      })
    },
    myPlay(){
      console.log(this.$route)
      if(this.$route.name === 'mv'|| this.$route.name === 'video'){
        this.playShow = false
      }
    },
   playHidden(){
     
      this.$nextTick(function () {
        this.isRouterAlive = true
        if(this.$route.name === 'mv'|| this.$route.name === 'video'){
          this.playShow = false
        }else{
          this.playShow = true
        }
      })
   }
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
