<template>
	<div id="artistCat">
		<div class="g-bd2 f-cb">
			<artist-sger-nav v-bind:zSlts="zSltS" v-on:zSltCat="catPagerChild"></artist-sger-nav>
			<div class="g-mn2">
				<div class="g-mn2c">
					<div class="g-wrap">
						
						<div class="u-title f-cb" >
							<h3>
								<span class="f-ff2">{{catName}}</span>
							</h3>
						</div>
						<ul class="n-ltlst f-cb" v-if="catlist">
							<li v-for="(item,index) of initial" v-bind:key="index">
								<span class="ch f-fs0 cursor" v-if="index == 0||index == initial.length-1" :class="{'z-slt':lZslt == item.Letter}" :data-res-letter="item.Letter" @click.stop="catLetter($event)">{{item.Letter}}</span>
								<span  v-else :class="{'z-slt':lZslt == item.Letter}" class="cursor" :data-res-letter="item.Letter" @click.stop="catLetter($event)">{{item.Letter}}</span>
							</li>
						</ul>
						<artist-sger-list v-bind:sgerList="catlist" v-bind:sgerListLength="catLength" v-bind:limit="catLimit" v-bind:sgerMover="catMover" v-if="catLength !== 0"></artist-sger-list>
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
	name:'artistCat',
    data () {
      return {
        catLimit:100,
        catOffset:0,
        catLength:0,
        catlist:null,
        catMover:false,
        zSlt:'gs',
        zSltS:'rz',
        initial:[{Letter:'热度'},{Letter:'A'},{Letter:'B'},{Letter:'C'},{Letter:'D'},{Letter:'E'},{Letter:'F'},{Letter:'G'},{Letter:'H'},{Letter:'I'},{Letter:'J'},
        {Letter:'K'},{Letter:'L'},{Letter:'M'},{Letter:'N'},{Letter:'O'},{Letter:'P'},{Letter:'Q'},{Letter:'R'},{Letter:'S'},{Letter:'T'},{Letter:'U'},{Letter:'V'},
        {Letter:'W'},{Letter:'X'},{Letter:'Y'},{Letter:'Z'},{Letter:'其他'}
        ],
        lZslt:'热度',
        catName:'',
        typeArea:[{catId:1001,area:7,type:1},{catId:1002,area:7,type:2},{catId:1003,area:7,type:3},{catId:2001,area:96,type:1},{catId:2002,area:96,type:2},{catId:2003,area:96,type:3},{catId:6001,area:8,type:1},{catId:6002,area:8,type:2},{catId:6003,area:8,type:3},{catId:7001,area:16,type:1},{catId:7002,area:16,type:2},{catId:7003,area:16,type:3},{catId:4001,area:0,type:1},{catId:4002,area:0,type:2},{catId:4003,area:0,type:3}]
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
			this.getHttp()
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
                    this.getHttp()
                }

            }
        },
        methods:{
        	getHttp(initial){
        		var that = this;
        		var catId = this.$route.query.id;
        		let index = 0;
        		for(var i=0;i<this.typeArea.length;i++){
        			if(catId == this.typeArea[i].catId){
        				index = i;
        				break;
        			}
        		}
        		if(initial){
        			var urls = that.$host+'/artist/list?type='+this.typeArea[index].type+'&area='+this.typeArea[index].area+'&offset='+that.catOffset+'&limit='+that.catLimit+'&initial='+initial
        		}else{
        			var urls = that.$host+'/artist/list?type='+this.typeArea[index].type+'&area='+this.typeArea[index].area+'&offset='+that.catOffset+'&limit='+that.catLimit
        		}
        		console.log(urls)
        		this.$http({
		         	method:'get',
		         	url:urls
		         }).then(function(res){
		         	console.log(res.data)
		         	that.catlist = res.data.artists
		         	that.catLength = res.data.artists.length
		         	that.signedMover = res.data.more
		 
		         }).catch(res=>{
		         	console.log('请求失败：'+res);
		         })
        	},
        	catPagerChild(data){
        		console.log(data)
        		this.catName = data.name;
        		this.zSltS = data.zSlt;
        		this.lZslt = '热度';
        	},
        	catLetter($event){
        		console.log($event)
        		if($event.target.getAttribute('data-res-letter') == '热度'){
        			this.getHttp('-1')
        			this.lZslt = $event.target.getAttribute('data-res-letter');
        		}else if($event.target.getAttribute('data-res-letter') != '其他'){
        			this.getHttp($event.target.getAttribute('data-res-letter'));
        			this.lZslt = $event.target.getAttribute('data-res-letter');
        		}else{
        			this.getHttp('0');
        			this.lZslt = $event.target.getAttribute('data-res-letter');
        		}
        	}
        }
  }
</script>

<style lang="less" scoped>
	#artistCat{
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
		.n-ltlst {
		    margin-top: 20px;
		    margin-left: -3px;
		    li {
			    display: inline;
			    float: left;
			    margin-left: 3px;
			    font-size: 14px;
			    span {
				    float: left;
				    width: 21px;
				    line-height: 24px;
				    text-align: center;
				}
				.ch {
				    width: 45px;
				    height: 24px;
				}
				span.z-slt,  span.z-slt:hover {
				    background: #c20c0c;
				    border-radius: 2px;
				    color: #fff;
				}
			}
		}
	
	}
</style>