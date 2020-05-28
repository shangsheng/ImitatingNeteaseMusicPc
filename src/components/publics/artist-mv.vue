<template>
	<div id="artistMv">
		<ul class="m-cvrlst m-cvrlst-7 f-cb" v-if="artistMvs">
			<li v-for="(item,index) in artistMvs.mvs" v-bind:key="index">
				<div class="u-cover u-cover-7">
					<img :src="item.imgurl"/>
					<router-link :to="{path:'/mv',query:{id:item.id}}" class="msk"></router-link>
					<router-link :to="{path:'/mv',query:{id:item.id}}" class="icon-play f-alpha"></router-link>
				</div>
				<p class="dec" :title="item.name">
					<router-link :to="{path:'/mv',query:{id:item.id}}" class="tit f-thide s-fc0">{{item.name}}</router-link>
				</p>
			</li>
		</ul>
		<div class="u-load s-fc4" v-else>
			<i class="icn"></i>			
		</div>
		<pager v-bind:pageMovers="mvMover" v-bind:pageLength="mvLength" v-bind:limit="mvLimit" v-if="mvLength >1" v-on:listenToChild="MvPagerChild"></pager>
	</div>
</template>

<script>
	import pager from '@/components/publics/pager.vue'
	export default {
	name:'artistMv',
	props:['artistMvs','mvLimit','mvLength'],
    data () {
      return {
        mvMover:false,
      }
    },
     components: {
	    pager
	 },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			console.log(this.artistMvs)
			if(this.artistMvs){
				this.mvMover = this.artistMvs.hasMore;
			}
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
        	MvPagerChild(data){
        		this.$emit("mvToChild",data);
        	}
        }
  }
</script>

<style lang="less">
	#artistMv{
		.m-cvrlst-7 {
		    margin: 20px 0 0 -29px;
		     li {
			    width: 137px;
			    height: 140px;
			    padding-left: 29px;
			    .dec {
				    margin: 8px 0 3px;
				    font-size: 14px;
				}
			}
		}
		.u-cover .icon-play {
		    position: absolute;
		    right: 10px;
		    bottom: 5px;
		    width: 16px;
		    height: 17px;
		    background-position: 0 0;
		}
		.u-cover-7 {
		    width: 137px;
		    height: 103px;
		    .msk {
			    background-position: 0 -1170px;
			}
			.icon-play {
			    width: 44px;
			    height: 44px;
			    top: 50%;
			    left: 50%;
			    margin: -22px 0 0 -22px;
			    background-position: -30px -135px;
			    _background-position: 0 0;
			}
		}
		.u-cover-7 .icon-play:hover {
		    background-position: -30px -85px;
		    _background-position: 0 0;
		}
	}
	
</style>