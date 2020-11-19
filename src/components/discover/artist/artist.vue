<template>
	<div id="artists">
		<div class="g-bd2 f-cb">
			<artist-sger-nav v-bind:zSlts="zSltS"></artist-sger-nav>
			<div class="g-mn2">
				<div class="g-mn2c">
					<div class="g-wrap">
						<div class="u-title f-cb" v-if="signedlist">
							<h3>
								<span class="f-ff2">入驻歌手</span>
							</h3>
							<router-link to="/discover/artist/signed/" class="more s-fc3">更多</router-link>
						</div>
						<artist-sger-list v-bind:sgerList="signedlist" v-bind:sgerListLength="signedLength" v-bind:limit="signedLimit" v-bind:sgerMover="signedMover" v-if="signedLength !== 0"></artist-sger-list>
						<div class="u-load s-fc4" v-else>
							<i class="icn"></i>			
						</div>
						<div class="u-title f-cb" v-if="hotlist">
							<h3>
								<span class="f-ff2">热门歌手</span>
							</h3>
						</div>
						<artist-sger-list v-bind:sgerList="hotlist" v-bind:sgerListLength="hotLength" v-bind:limit="hotLimit" v-bind:sgerMover="hotMover" v-if="hotLength !== 0"></artist-sger-list>
						<div class="u-load s-fc4" v-else>
							<i class="icn"></i>			
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import artistSgerNav from '@/components/publics/artist-sgernav.vue'
	import artistSgerList from '@/components/publics/artist-sgerlist.vue'
	import eventVue from '../../../../static/js/eventVue.js'
	export default {
	name:'artists',
    data () {
      return {
        signedLimit:10,
        signedOffset:0,
        signedLength:0,
        signedlist:null,
        signedMover:false,
        hotLimit:100,
        hotOffset:0,
        hotLength:0,
        hotlist:null,
        zSlt:'gs',
        hotMover:false,
        zSltS:'tj',
        barVoice:true,
      }
    },
   components: {
	    artistSgerList,
	    artistSgerNav
	 },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
		var that = this;
//          debugger;
			this.$http({
		         	method:'get',
		         	url:that.$host+'/top/artists?offset='+that.hotOffset+'&limit='+that.hotLimit
		         }).then(function(res){
		         	console.log(res.data)
		         	that.hotlist = res.data.artists
		         	that.hotMover = res.data.more
		         	that.hotLength = res.data.artists.length
		         }).catch(res=>{
		         	console.log('请求失败：'+res);
		         })
		    this.$http({
		         	method:'get',
		         	url:that.$host+'/artist/list?cat=5001&offset='+that.signedOffset+'&limit='+that.signedLimit
		         }).then(function(res){
		         	console.log(res.data)
		         	that.signedlist = res.data.artists
		         	that.signedMover = res.data.more
		         	that.signedLength = res.data.artists.length
		         }).catch(res=>{
		         	console.log('请求失败：'+res);
		         })
		        this.$root.eventVue.$emit('zSltV',this.zSlt)
		        this.$root.eventVue.$emit('barVoice',this.barVoice)
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
        	
        }
  }
</script>

<style lang="less" scoped>
	#artists{
		text-align: left;
		.g-mn2 {
		    float: right;
		    width: 100%;
		    margin-left: -181px;
		}
		.g-mn2c {
		    margin-left: 181px;
		}
		.g-wrap {
		    padding: 40px;
		}
	}
	
</style>