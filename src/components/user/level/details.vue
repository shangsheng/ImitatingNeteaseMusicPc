<template>
	<div id="details">
		<div class="g-bd f-cb">
			<div class="n-privilege">
				<h2 class="tit f-ff2">等级特权</h2>
				<router-link :to="{path:'/user/level'}" class="myleve">查看我的等级 <i class="gtblue-i"></i></router-link>
				<div class="list">
					<div class="tip">
						<span class="th1">等级</span>
						<span class="th2">特权</span>
					</div>
					<ul id="m-detail">
						<li v-for="(item,index) in telist">
							<span class="n-level"><i></i>{{index+1}}</span>
							<div v-for="(title,tIndex) in item">
								<span>{{title}}</span>
								<span class="point addico-span" v-if="tIndex<item.length-1"></span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import eventVue from '../../../../../static/js/eventVue.js'
	export default{
		name:'details',
		data(){
			return{
				telist:[['5G音乐云盘免费容量','黑名单上限20'],['20G音乐云盘免费容量','黑名单上限20'],['40G音乐云盘免费容量','黑名单上限20','云音乐商城满100减3元优惠券','价值50云贝'],['40G音乐云盘免费容量','黑名单上限20'],['40G音乐云盘免费容量','黑名单上限20','云音乐商城满100减6元优惠券','价值100云贝'],['60G音乐云盘免费容量','黑名单上限40'],['60G音乐云盘免费容量','黑名单上限80','云音乐商城满100减9元优惠券','价值400云贝'],['60G音乐云盘免费容量','黑名单上限100'],['60G音乐云盘免费容量','黑名单上限120','云音乐商城满100减12元优惠券','价值1200云贝'],['100G音乐云盘免费容量','黑名单上限140']],
				navBul:true,
				mNavfst:'djtq',
				barVoice:true
			}
		},
		beforeCreate:function(){
		
		},
		created:function(){
			if(this.level>0){
				this.levelList = this.telist[this.level-1]
			}
			this.$root.eventVue.$emit('navBul', this.navBul)
			this.$root.eventVue.$emit('mNavfst', this.mNavfst)
			this.$root.eventVue.$emit('barVoice', this.barVoice)
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
	.n-privilege {
	    position: relative;
	    z-index: 1;
	    zoom: 1;
	    padding: 25px 30px;
	    text-align: left;
	    h2.tit {
		    padding-left: 14px;
		    font-size: 22px;
		    line-height: 32px;
		    font-weight: 400;
		}
		a.myleve {
		    position: absolute;
		    right: 25px;
		    top: 40px;
		    color: #0e73ba;
		     i {
			    display: inline-block;
			    width: 7px;
			    height: 12px;
			    margin-left: 5px;
			    vertical-align: middle;
			    
			}
		}
		 .list {
		 	.tip {
			    padding-top: 6px;
			    padding-left: 14px;
			    height: 32px;
			    line-height: 32px;
			    border-bottom: solid 1px #e6e6e6;
			    color: #666;
			     span.th2 {
				    margin-left: 46px;
				}
			}
			li {
			    height: 30px;
			    padding-top: 20px;
			    overflow: hidden;
			    border-bottom: solid 1px #e6e6e6;
			    padding-left: 14px;
			    color: #666;
			    .n-level {
				    width: 46px;
				    display: inline-block;
				    line-height: 1;
				     i {
					    position: absolute;
					    left: -25px;
					    top: 0;
					    width: 25px;
					    height: 22px;
					    background-position: 0 -25px;
					}
				}
			    div{
			    	display: inline-block;
			    	vertical-align: top;
					 span.point {
					    display: inline-block;
					    vertical-align: middle;
					    width: 4px;
					    height: 4px;
					    margin-left: 15px;
					    margin-right: 15px;
					    
					}
			    }
			}
		}

	}
</style>