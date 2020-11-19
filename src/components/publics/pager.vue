<template>
	<div id="m-pl-pager">
		<div class="u-page">
			<span class="zbtn zprv " :class="{'js-disabled':current_page == 1 }" @click="prvPage(current_page)">上一页</span>
			<span class="zpgi " :class="[current_page == 1?'js-selected':'']"  @click="jumpPage(1)" v-if="pages==1|| current_page>5">1</span>
			<span class="zdot" v-show="efont" >...</span>
			<span class="zpgi" v-for="num of indexs"  :class="{'js-selected':current_page == num }" @click="jumpPage(num)" v-if="num != indexs.length || current_page == pages || num == 7">{{num}}</span>
			<span class="zdot" v-show="current_page<pages-4" >...</span>
			<span class="zpgi" :class="[current_page == pages?'js-selected':'']"  @click="jumpPage(pages)" v-if= "current_page != pages&&current_page<pages-4">{{pages}}</span>
			<span class="zbtn znxt" :class="{'js-disabled':current_page == pages}" @click="nxtPage(current_page)" >下一页</span>
		</div>
	</div>	
</template>

<script>
	export default {
	name:'mPlPager',
	props:['pageMovers','pageLength','limit'],//pageLength总页码数mover是否有多个分页limit一页中的个数
    data () {
      return {
       
        current_page: 1, //当前页 
      	pages: 4, //总页数 
      	changePage:'',//跳转页 
      	nowIndex:0,
      	limits:35,
      
      }
    },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			console.log(this.props)
			this.mover = this.pageMovers;
			this.pages = this.pageLength;
			this.limits = this.limit;
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
        	jumpPage: function(id) { 
		       this.current_page = id; 
		       this.$emit("listenToChild",id*this.limits-this.limits);
		    },
		    prvPage:function(id){
		    	if(id>1){
		    		this.current_page = id -1;
		    		this.$emit("listenToChild",this.current_page*this.limits-this.limits);
		    	}
		    },
		    nxtPage:function(id){
		    	if(id<this.pages){
		    		
		    		this.current_page = id +1;
		    		this.$emit("listenToChild",this.current_page*this.limits-this.limits);
		    	}
		    }
        },
        computed:{ 
        	show:function(){ 
		          return this.pages && this.pages !=1 
		      }, 
		      efont: function() { 
		        if (this.pages <= 7) return false; 
		        return this.current_page > 5 
		      }, 
		      indexs: function() { 
		  
		        var left = 1, 
		          right = this.pages, 
		          ar = []; 
		          console.log(right)
		        if (this.pages >= 7) { 
		          if (this.current_page > 5 && this.current_page < this.pages - 4) { 
		            left = Number(this.current_page) - 3; 
		            right = Number(this.current_page) + 3; 
		          } else { 
		            if (this.current_page <= 5) { 
		              left = 1; 
		              right = 7; 
		            } else { 
		              right = this.pages; 
		  
		              left = this.pages - 6; 
		            } 
		          } 
		        } 
		        while (left <= right) { 
		          ar.push(left); 
		          left++; 
		        } 
		        console.log(ar)
		        return  ar; 
		      }, 
		    
        }
  }
</script>

<style language="less" >
	
	div.u-page {
	    margin: 20px 0;
	    text-align: center;
	}
	div.u-page span{
		text-align: center;
		
	}
	div.u-page span.zprv.js-disabled, div.u-page span.zprv.js-disabled:hover {
	    background-position: 0 -620px;
	    color: #cacaca;
	    cursor: default;
	    text-align: center;
	}
	div.u-page .zbtn, div.u-page .zpgi {
	    margin: 0 1px 0 2px;
	    display: inline-block;
	    border: 1px solid #ccc;
	    border-radius: 2px;
	    vertical-align: middle;
	}
	div.u-page .zpgi {
	    height: 22px;
	    padding: 0 8px;
	    background-color: #fff;
	    line-height: 22px;
	    cursor: pointer;
	}
	div.u-page span.js-selected, div.u-page span.js-selected:hover {
	    background-position: 0 -650px !important;
	    border-color: #A2161B;
	    color: #fff;
	    cursor: default;
	}
	
	div.u-page .zbtn {
	    width: 69px;
	    height: 24px;
	    line-height: 24px;
	    color: #333;
	    text-align: left;
	    padding: 0;
	}
	div.u-page .znxt {
	    width: 57px;
	    padding-left: 12px;
	    background-position: -75px -560px !important;
	     cursor: pointer;
	}
	div.u-page .zprv{
		text-align: center;
		 cursor: pointer;
	}
	
</style>