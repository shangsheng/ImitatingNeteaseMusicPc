<template>
	<div id="mDown">
		<div class="m-multi">
			<h3 class="u-hd3" >
				<span class="f-fl">网易云音乐多端下载</span>
			</h3>
			<ul class="bg f-cb">
				<li>
					<a href="https://itunes.apple.com/cn/app/id590338362" class="ios">iPhone</a>
				</li>
				<li>
					<a href="https://music.163.com/api/pc/download/latest" class="pc">pc</a>
				</li>
				<li>
					<a href="https://music.163.com/api/android/download/latest2" class="aos">Android</a>
				</li>
			</ul>
			<p class="s-fc4">同步歌单，随时畅听320k好音乐</p>
		</div>
	</div>
</template>

<script>
	export default {
	name:'mDown',
    data () {
      return {
        
      }
    },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
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

<style lang="less">
	.m-multi {
	    margin: 20px 0;
	    padding-bottom: 20px;
	    .bg {
		    height: 65px;
		    margin-bottom: 10px;
		    background-position: 0 -392px;
		    li {
			    float: left;
			    a {
				    display: block;
				    width: 42px;
				    height: 48px;
				    text-indent: -9999px;
				}
				.ios:hover {
				    background-position: 0 -472px;
				}
				.pc:hover {
				    background-position: -72px -472px;
				}
				.aos:hover {
				    background-position: -158px -472px;
				}
				.pc {
				    width: 60px;
				    margin: 0 26px 0 30px;
				}
			}
		}
	}
	.u-hd3 {
	    position: relative;
	    *zoom: 1;
	    height: 23px;
	    margin-bottom: 20px;
	    border-bottom: 1px solid #ccc;
	    color: #333;
	    font-weight: bold;
	}
</style>