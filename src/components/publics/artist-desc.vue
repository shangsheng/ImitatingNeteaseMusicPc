<template>
	<div id="artistDesc">
		<div class="n-artdesc" v-if="artistDescs">
			<h2>
				<i>&nbsp;</i>
				{{artistName}}简介
			</h2>
			<p>{{artistDescs.briefDesc}}</p>
			<div v-for="(item,index) of artistDescs.introduction" v-bind:key="index">
				<div v-if="artistDescs.introduction.length>0">
					<h2>
						<i>&nbsp;</i>
						{{item.ti}}
					</h2>
					<p class="z-indent" v-html="item.txt"></p>
				</div>
			</div>
		</div>
		<div class="u-load s-fc4" v-else>
			<i class="icn"></i>			
		</div>
	</div>
</template>

<script>
	export default {
	name:'artistDesc',
	props:['artistDescs','artistName'],
    data () {
      return {
        
      }
    },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			console.log(this.artistDescs)
			
			this.$.each(this.artistDescs.introduction,function(index,el){
				el.txt = el.txt.replace(/\n/g,'<br>')
			})
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

<style lang="less" >
	#artistDesc{
		.n-artdesc {
		    margin-top: 30px;
		     h2 {
			    margin: 28px 0 8px 0;
			    color: #333;
			    font-size: 14px;
			    font-weight: bold;
			    i {
				    height: 14px;
				    width: 3px;
				    margin-right: 7px;
				    background: #c10d0c;
				}
			}
			 p {
			    line-height: 25px;
			    color: #666;
			    text-indent: 2em;
			}
			p.z-indent {
			    text-indent: 0;
			}
		}
	}
</style>