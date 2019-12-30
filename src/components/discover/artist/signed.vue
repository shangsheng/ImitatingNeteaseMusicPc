<template>
	<div id="signed">
		<div class="g-bd2 f-cb">
			<artist-sger-nav v-bind:zSlts="zSltS"></artist-sger-nav>
			<div class="g-mn2">
				<div class="g-mn2c">
					<div class="g-wrap">
						<div class="u-title f-cb" v-if="signedlist.length">
							<h3>
								<span class="f-ff2">入驻歌手</span>
							</h3>
							
						</div>
						<artist-sger-list v-bind:sgerList="signedlist" v-bind:sgerListLength="signedLength" v-bind:limit="signedLimit" v-bind:sgerMover="signedMover" v-if="signedLength !== 0" v-on:listenToChild="signedPagerChild"></artist-sger-list>
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
	name:'signed',
    data () {
      return {
        signedLimit:50,
        signedOffset:0,
        signedLength:240,
        signedlist:[],
        signedMover:false,
        zSlt:'gs',
        zSltS:'rz',
        barVoice:true
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
//          debugger;
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
        	getHttp(signedOffset){
        		var that = this;
        		this.$http({
		         	method:'get',
		         	url:that.$host+'/artist/list?cat=5001&offset='+signedOffset+'&limit='+that.signedLimit
		         }).then(function(res){
		         	console.log(res.data)
		         	that.$.each(res.data.artists,function(index,item){
		         		that.signedlist.push(item)
		         	})
		         	
		         	that.signedMover = res.data.more
		 
		         }).catch(res=>{
		         	console.log('请求失败：'+res);
		         })
        	},
        	signedPagerChild(data){
        		console.log(data)
        		var that = this;
        		that.signedOffset = data*that.signedLimit;
        		this.getHttp(that.signedOffset)
        	}
        }
  }
</script>

<style lang="less">
	#signed{
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