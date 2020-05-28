<template>
	<div id="sgernav">
		<div class="g-sd2">
			<div class="g-wrap4 n-sgernav">
				<h2 class="tit">推荐</h2>
				<ul class="nav f-cb">
					<li>
						<router-link to="/discover/artist/" class="cat-flag " :class="{'z-slt':zSlts == 'tj'}">推荐歌手</router-link>
					</li>
					<li>
						<router-link to="/discover/artist/signed/" class="cat-flag" :class="{'z-slt':zSlts == 'rz'}">入驻歌手</router-link>
					</li>
				</ul>
				<!--循环数据-->
				<div v-if="artistList">
					<div class="blk"  v-for="(item,index) in artistList" v-bind:key="index">
						<h2 class="tit">{{item.name}}</h2>
						<ul class="nav f-cb">
							<li v-for="(obj,oIndex) in item.listCat" v-bind:key="oIndex">
								<router-link :to="{path:'/discover/artist/cat/',query:{id:obj.cat}}" class="cat-flag " :data-res-cat="obj.cat" :class="{'z-slt':zSlts == obj.zSlt}" >{{obj.name}}</router-link>
							</li>
							
						</ul>
					</div>
				</div>
				<div class="u-load s-fc4" v-else>
					<i class="icn"></i>			
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {
	name:'sgernav',
	props:['zSlts'],
    data () {
      return {
        artistList:[{name:'华语',listCat:[{cat:'1001',name:'华语男歌手',zSlt:'hyn'},{cat:'1002',name:'华语女歌手',zSlt:'hynv'},{cat:'1003',name:'华语组合/乐队',zSlt:'hyzh'}]},
        			{name:'欧美',listCat:[{cat:'2001',name:'欧美男歌手',zSlt:'omn'},{cat:'2002',name:'欧美女歌手',zSlt:'omnv'},{cat:'2003',name:'欧美组合/乐队',zSlt:'omzh'}]},
        			{name:'日本',listCat:[{cat:'6001',name:'日本男歌手',zSlt:'rbn'},{cat:'6002',name:'日本女歌手',zSlt:'rbnv'},{cat:'6003',name:'日本组合/乐队',zSlt:'rbzh'}]},
        			{name:'韩国',listCat:[{cat:'7001',name:'韩国男歌手',zSlt:'hgn'},{cat:'7002',name:'韩国女歌手',zSlt:'hgnv'},{cat:'7003',name:'韩国组合/乐队',zSlt:'hgzh'}]},
        			{name:'其他',listCat:[{cat:'4001',name:'其他男歌手',zSlt:'qtn'},{cat:'4002',name:'其他女歌手',zSlt:'qtnv'},{cat:'4003',name:'其他组合/乐队',zSlt:'qtzh'}]}
        ],
      }
    },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
		this.getArtist()
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
        watch: {
            '$route' (to, from) {

                console.log(to)
                console.log(from)
                //加判断主要发现这个加载了之后，容易引起其他页面也发送请求，所以加了笨方法，加了条件判断，解决了其他页面请求数据加载的问题
                if(this.$route.query.id){
                    this.getArtist()
                }

            }
        },
        methods:{
        	
        	getArtist(){
        		var that = this;
				var catId = this.$route.query.id
		
				if(catId != undefined){
					that.$.each(that.artistList,function(index,el){
						that.$.each(el.listCat,function(num,item){
							if(catId === item.cat){
								console.log(catId)
								that.$emit("zSltCat",item)
								return false;
							}
						})
					})
				}
        	}
        }
  }
</script>

<style lang="less">
	#sgernav{
		text-align: left;
		.nav {
		    float: inherit;
		     padding-left: 0px; 
		    li a{
		     	text-align: left;
		     }
		}
		.g-sd2 {
		    position: relative;
		    float: left;
		    width: 180px;
		}
		.g-wrap4 {
		    padding: 0 10px 40px;
		}
		.n-sgernav {
		    margin-top: 51px;
		    .tit {
			    height: 25px;
			    padding-left: 14px;
			    font-size: 16px;
			    font-family: "Microsoft Yahei";
			    font-weight: bold;
			}
			li {
			    margin-bottom: 2px;
			    float: left;
				width: 160px;
				height: 29px;
				line-height: 29px;
			    a {
				    float: left;
				    width: 160px;
				    height: 29px;
				    line-height: 29px;
				}
			}
		}
		.n-sgernav li a {
		    width: 133px;
		    padding-left: 27px;
		    background-position: 0 -30px;
		    color: #333;
		}
		.n-sgernav li a.z-slt, .n-sgernav li a.z-slt:hover {
		    background-position: 0 0;
		    text-decoration: none;
		    color: #c20c0c;
		}
	}
</style>