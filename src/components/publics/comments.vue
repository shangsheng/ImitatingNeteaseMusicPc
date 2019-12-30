<template>
	<div id="comments" v-if='commentData'>
		<div class="n-cmt">
			<div>
				<div class="u-title u-title-1">
					<h3>
						<span class="f-ff2">评论</span>
					</h3>
					<span class="sub s-fc3">
						共
						<span class="j-flag">{{commentData.total}}</span>
						条评论
					</span>
				</div>
				<div class="m-cmmt">
					<div class="iptarea">
						<div class="head">
							<img :src="userData.profile.avatarUrl" v-if="userData"/>
							<img src="../../assets/default_avatar.jpg" v-else/>
						</div>
						<div class="j-flag">
							<div>
								<div class="m-cmmtipt f-cb f-pr">
									<div class="u-txtwrap holder-parent f-pr">
										<textarea  class="u-txt area j-flag" placeholder="评论" v-model="values"></textarea>
									</div>
									<div class="btns f-cb f-pr auto-1569825257080-parent">
										<i class="icn u-icn u-icn-36 j-flag"></i>
										<i class="icn u-icn u-icn-41 j-flag"></i>
										<span class="btn u-btn u-btn-1 j-flag" @click.stop="logButton(1)">评论</span>
										<span class="zs s-fc4 j-flag">140</span>
									</div>
									<div class="corr u-arr">
										<em class="arrline">◆</em>
										<span class="arrclr">◆</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="cmmts j-flag">
						<h3 class="u-hd4" v-if="commentData.moreHot">精彩评论</h3>
						<div class="itm" :data-id="item.commentId" v-for="item in commentData.hotComments">
							<div class="head">
								<router-link :to="{path:'/user/home',query:{id:item.user.userId}}">
									<img :src="item.user.avatarUrl"/>
								</router-link>
							</div>
							<div class="cntwrap">
								<div>
									<div class="cnt f-brk">
										<router-link :to="{path:'/user/home',query:{id:item.user.userId}}" class="s-fc7">{{item.user.nickname}}</router-link>
										<sup class="u-icn u-icn-84" v-if="item.user.userType === 200"></sup>
										<img src="https://p1.music.126.net/y8pM-M1mytg6B1ThedCbJA==/109951163709550847.png" v-if="item.user.vipType === 11" class="brand-tag brand-vip"/>
										:{{item.content}}
									</div>
								</div>
								<div class="que f-brk f-pr s-fc3" v-if="item.beReplied.length != 0" v-for="beItem of item.beReplied">
									<span class="darr">
										<i class="bd">◆</i>
										<i class="bg">◆</i>
									</span>
									<router-link :to="{path:'/user/home',query:{id:beItem.user.userId}}" class="s-fc7">{{beItem.user.nickname}}</router-link>
									<sup class="u-icn u-icn-84" v-if="beItem.user.userType === 200"></sup>
									<img src="https://p1.music.126.net/y8pM-M1mytg6B1ThedCbJA==/109951163709550847.png" v-if="beItem.user.vipType === 11" class="brand-tag brand-vip"/>
									:{{beItem.content}}
								</div>
								<div class="rp">
									<div class="time s-fc4">
										{{item.time}}
									</div>
									<span :data-id="item.commentId" data-type="like" :data-likes="item.liked" @click.stop="like($event)">
										<i class="zan u-icn2  cursor" :class="[item.liked?'u-icn2-13':'u-icn2-12']"></i>
										({{item.likedCount}})
									</span>|
									<span class="s-fc3" :data-id="item.commentId" data-type="reply">回复</span>
								</div>
							</div>
						</div>
						<h3 class="u-hd4" v-if="commentData.total>0">最新评论({{commentData.total}})</h3>
						<div class="itm" :data-id="item.commentId" v-for="item in commentData.comments">
							<div class="head">
								<router-link :to="{path:'/user/home',query:{id:item.user.userId}}">
									<img :src="item.user.avatarUrl"/>
								</router-link>
							</div>
							<div class="cntwrap">
								<div>
									<div class="cnt f-brk">
										<router-link :to="{path:'/user/home',query:{id:item.user.userId}}" class="s-fc7">{{item.user.nickname}}</router-link>
										<sup class="u-icn u-icn-84" v-if="item.user.userType === 200"></sup>
										<img src="https://p1.music.126.net/y8pM-M1mytg6B1ThedCbJA==/109951163709550847.png" v-if="item.user.vipType === 11" class="brand-tag brand-vip"/>
										:{{item.content}}
									</div>
								</div>
								<div class="que f-brk f-pr s-fc3" v-if="item.beReplied.length != 0" v-for="beItem of item.beReplied">
									<span class="darr">
										<i class="bd">◆</i>
										<i class="bg">◆</i>
									</span>
									<router-link :to="{path:'/user/home',query:{id:beItem.user.userId}}" class="s-fc7">{{beItem.user.nickname}}</router-link>
									<sup class="u-icn u-icn-84" v-if="beItem.user.userType === 200"></sup>
									<img src="https://p1.music.126.net/y8pM-M1mytg6B1ThedCbJA==/109951163709550847.png" v-if="beItem.user.vipType === 11" class="brand-tag brand-vip"/>
									:{{beItem.content}}
								</div>
								<div class="rp">
									<div class="time s-fc4">
										{{item.time}}
									</div>
									<span :data-id="item.commentId" data-type="like" :data-likes="item.liked" @click.stop="like($event)">
										<i class="zan u-icn2  cursor" :class="[item.liked?'u-icn2-13':'u-icn2-12']" ></i>
										({{item.likedCount}})
									</span>|
									<span class="s-fc3" :data-id="item.commentId" data-type="reply">回复</span>
								</div>
							</div>
						</div>
					</div>
					<pager v-bind:pageMovers="playlistMover" v-bind:pageLength="playlistLength" v-bind:limit="limit" v-if="playlistLength >= 20" v-on:listenToChild="playlistPagerChild"></pager>
				</div>
			</div>
		</div>	
	</div>
</template>

<script>
	import pager from '@/components/publics/pager.vue'
	import eventVue from '../../../static/js/eventVue.js'
	export default {
	name:'comments',
	props:['commentId'],
    data () {
      return {
        playlistMover:true,//是否有多个评论
        playlistLength:0,//页码数
        limit:20,//一页中显示几个
        commentData:null,
        before:0,//上一页最后一个time值
        offset:0,//偏移量
        userData:null,//登录过的用户信息
        values:'',
        type:0,
        typeLike:0,
        likeT:1,
        
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
			var that = this;
			var id = this.$route.query.id
			console.log(this.$route)
			var name = this.$route.name
			if(name === 'playlist'){
				this.commentHttp(name,'/comment/playlist?',id,this.offset)
				this.type = 2;
				this.typeLike = 2;
			}else if(name === 'album'){
				this.commentHttp(name,'/comment/album?',id,this.offset)
				this.type = 3;
				this.typeLike = 3;
			}else if(name == 'discoverToplist'){
				if(id){
					this.commentHttp(name,'/comment/playlist?',id,this.offset)
				}else{
					this.commentHttp(name,'/comment/playlist?','19723756',this.offset)
				}
				this.type = 2;
				this.typeLike = 2;
				
			}else if(name == 'progrm'){
				
				this.commentHttp(name,'/comment/dj?',id,this.offset)
				this.type = 4;
				this.typeLike = 4;
			}else if(name == 'song'){
				this.commentHttp(name,'/comment/music?',id,this.offset)
				this.type = 0;
				this.typeLike = 0;
			}else if(name == 'my'){
				this.commentHttp(name,'/comment/playlist?',id,this.offset)
				this.type = 2;
				this.typeLike = 2;
			}else if(name == 'mv'){
				this.commentHttp(name,'/comment/mv?',id,this.offset)
				this.type = 1;
				this.typeLike = 1;
			}else if(name == 'video'){
				this.commentHttp(name,'/comment/video?',id,this.offset)
				this.type = 5;
				this.typeLike = 5;
			}else if(name == 'friend'){
				id = this.commentId
				this.commentHttp(name,'/comment/event?',id,this.offset)
				this.typeLike = 6;
			}
			if(this.$cookieUtil("email")){
				this.$logoRefresh(function(data){
					console.log(data)
					that.userData = data.data
				})
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
        	playlistPagerChild(data){
        		console.log(data)
        		var id = this.$route.query.id
				
				var name = this.$route.name
				
        		this.offset = data*this.limit
        		
        		if(name === 'playlist'){
        			if(this.offset>5000){
	        			this.commentHttp(name,"/comment/playlist?",id,this.offset,this.before)
		        	}else{
		        		this.commentHttp(name,'/comment/playlist?',id,this.offset)
		        	}
        		}else if(name === 'album'){
        			if(this.offset>5000){
	        			this.commentHttp(name,"/comment/album?",id,this.offset,this.before)
		        	}else{
		        		this.commentHttp(name,'/comment/album?',id,this.offset)
		        	}
        		}else if(name == 'discoverToplist'){
        			if(this.offset>5000){
	        			this.commentHttp(name,"/comment/playlist?",id,this.offset,this.before)
		        	}else{
		        		this.commentHttp(name,'/comment/playlist?',id,this.offset)
		        	}
        		}else if(name == 'song'){
        			if(this.offset>5000){
	        			this.commentHttp(name,"/comment/music?",id,this.offset,this.before)
		        	}else{
		        		this.commentHttp(name,'/comment/music?',id,this.offset)
		        	}
        		}else if(name == 'mv'){
        			if(this.offset>5000){
	        			this.commentHttp(name,"/comment/mv?",id,this.offset,this.before)
		        	}else{
		        		this.commentHttp(name,'/comment/mv?',id,this.offset)
		        	}
        		}
        		
        	},
        	commentHttp(name,src,id,offset,before){
        		var that = this;
        		console.log(before)
        		if(before){
        			var urls = that.$host+src+"id="+id+"&offset="+offset+"&before="+before
        			console.log(urls)
        		}else{
        			
        			if(name == 'friend'){
        				var urls = that.$host+src+"threadId="+id+"&offset="+offset
        			}else{
        				var urls = that.$host+src+"id="+id+"&offset="+offset
        			}
        		}
				
					this.$http({
		         	method:'get',
		         	url:urls
			         }).then(function(res){
			         	console.log(res.data)
			         	
			         	that.$.each(res.data.hotComments,function(index,item){
			         		item.time = that.$timeDJq(item.time)
			         	})
			         	that.$.each(res.data.comments,function(index,item){
			         		
			         		if(res.data.comments.length-1 === index){
			         			console.log(index)
			         			that.before = res.data.comments[index].time
			         		}
			         		item.time = that.$timeDJq(item.time)
			         	})
			         	that.commentData = res.data
			         	that.playlistMover = res.data.more
			         	
			         	that.playlistLength = Math.ceil(res.data.total/that.limit)
			         	
			         	eventVue.$emit('commentCount',res.data.total)
			         }).catch(res=>{
			         	console.log('请求失败：'+res);
			         })
				
			},
			logButton(t,commentId){
				let that = this;
				console.log(commentId)
				if(commentId){
        			var urls = that.$host+'/comment?t='+t+"&type="+that.type+"&content="+that.values+"&commentId="+commentId
        			console.log(urls)
        		}else{
        			var urls = that.$host+'/comment?t='+t+"&type="+that.type+"&content="+that.values
        		}
				this.$http({
		         	method:'get',
		         	url: urls 
			         }).then(function(res){
			         	console.log(res.data)
			         	
			         }).catch(res=>{
			         	console.log(res.responseJSON)
			         })
			},
			//评论点赞
			like($event){
				let that = this;
				var id = this.$route.query.id
				console.log($event)
//				if(commentId){id=29178366&cid=12840183&t=1&type=0
//      			var urls = that.$host+'/comment/like?id='+id+"&type="+that.typeLike+"&content"+that.values+"&commentId="+commentId
//      			console.log(urls)
//      		}else{
//      			
//      		}
				console.log(that.$($event.path[1]).attr('data-likes'))
				//点赞不能取消和点赞切换
				
        		if(that.$($event.path[1]).attr('data-likes')){
        			this.likeT = 0
        		}else{
        			this.likeT = 1
        		}
        		var urls = that.$host+'/comment/like?id='+id+"&type="+that.typeLike+"&cid="+$event.path[1].dataset.id+"&t="+that.likeT
				this.$http({
		         	method:'get',
		         	url: urls 
			         }).then(function(res){
			         	console.log(res.data)
			         	console.log(that.likeT)
			         	var num = Number(that.getNum($event.path[1].innerText,'(',')'))
			         	if(that.likeT == 0){
			         		$event.path[1].innerHTML = '<i class="zan u-icn2 u-icn2-12 cursor" ></i>('+ (num-1)+')&nbsp'
			         		
			         		that.$($event.path[1]).attr('data-likes',false)
			         	}else{
			         		$event.path[1].innerHTML = '<i class="zan u-icn2 u-icn2-13 cursor" ></i>('+ (num+1)+')&nbsp'
			         		
			         		that.$($event.path[1]).attr('data-likes',true)
			         	}
			         	
			         }).catch(res=>{
			         	console.log(res)
			         })
			},
			 getNum(str,firstStr,secondStr){
			   if(str == "" || str == null || str == undefined){ // "",null,undefined
			       return "";
			   }
			   if(str.indexOf(firstStr)<0){
			        return "";
			   }
			   var subFirstStr=str.substring(str.indexOf(firstStr)+firstStr.length,str.length);
			   var subSecondStr=subFirstStr.substring(0,subFirstStr.indexOf(secondStr));
			   return subSecondStr;
			}
        }
  }
</script>

<style lang="less">
	.n-cmt {
	    margin-top: 40px;
	    text-align: left;
	}
	.m-cmmt {
	    margin-top: 20px;
	    .iptarea {
		    margin-bottom: 20px;
		    .m-cmmtipt {
			    margin-left: 62px;
			}
		}
		.head {
		    float: left;
		    width: 50px;
		    height: 50px;
		    margin-right: -100px;
		    img {
			    float: left;
			    width: 50px;
			    height: 50px;
			    margin-right: -100px;
			}
		}
	}
	.f-pr {
	    position: relative;
	    zoom: 1;
	}
	.u-txtwrap {
	    padding-right: 14px;
	}
	div.holder-parent {
	    position: relative;
	    zoom: 1;
	}
	.m-cmmtipt {
		.btns {
		    clear: both;
		    padding-top: 10px;
		    .icn {
			    float: left;
			    margin: 0px 10px 0 0;
			    cursor: pointer;
			}
			.btn {
			    float: right;
			}
			.zs {
			    float: right;
			    margin-right: 10px;
			    line-height: 25px;
			}
		}
		.area {
		    height: 50px;
		    display: block;
		}
		.corr {
		    position: absolute;
		    top: 11px;
		    left: -7px;
		}
	}
	.u-icn-36 {
	    width: 18px;
	    height: 18px;
	    background-position: -40px -490px;
	}
.u-icn-41 {
    width: 18px;
    height: 18px;
    background-position: -60px -490px;
}
.u-btn-1 {
    width: 46px;
    height: 25px;
    background-position: -84px -64px;
    color: #fff;
    text-align: center;
    line-height: 25px;
}
.u-arr {
    width: 13px;
    height: 14px;
    overflow: hidden;
    .arrline {
	    color: #cdcdcd;
	}
	.arrclr {
	    margin: -10px 0 0 1px;
	    _margin-top: -17px;
	    color: #fff;
	}
}
.u-arr .arrline, .u-arr .arrclr, .u-arr .arriner {
    display: block;
    font-family: "SimSun";
    font-size: 15px;
    font-style: normal;
    font-weight: normal;
    height: 10px;
    line-height: normal;
}
.u-hd4 {
    position: relative;
    top: 1px;
    height: 20px;
    border-bottom: 1px solid #cfcfcf;
}
.m-cmmt {
	.cmmts {
		.itm {
		    padding: 15px 0;
		    border-top: 1px dotted #ccc;
		}
		img {
		    vertical-align: middle;
		}
		.cntwrap {
		    margin-left: 60px;
		     .s-fc7 {
			    margin-right: 5px;
			}
			.u-icn2 {
			    margin-right: 5px;
			    vertical-align: -2px;
			}
			.brand-tag {
			    margin-right: 5px;
			    vertical-align: -1px;
			}
			.brand-vip {
			    height: 12px;
			}
		}
		.cnt {
		    width: 100%;
		    overflow: hidden;
		    line-height: 20px;
		}
		 div.rp {
		    margin-top: 15px;
		    text-align: right;
		}
		.time {
		    float: left;
		    margin: 0 !important;
		}
		.zan {
		    margin-top: -4px;
		}
		.sep {
		    margin: 0 8px;
		    color: #ccc;
		}
		.que {
		    padding: 8px 19px;
		    margin-top: 10px;
		    line-height: 20px;
		    background: #f4f4f4;
		    border: 1px solid #dedede;
		    .darr {
			    position: absolute;
			    top: -7px;
			    left: 20px;
			    font-size: 12px;
			    line-height: 14px;
			    .bd {
				    color: #dedede;
				}
				i {
				    position: absolute;
				    top: 0;
				    left: 0;
				}
				.bg {
				    top: 1px;
				    color: #f4f4f4;
				}
			}
		}
	}
}
.f-brk {
    word-wrap: break-word;
    word-break: break-word;
    white-space: normal;
}
.m-cmmt .cmmts .cntwrap .f-brk, .m-cmmt .cmmts .cnt.f-brk {
    word-break: break-word;
}
.u-icn2-12, .u-icn2-13 {
    width: 15px;
    height: 14px;
    background-position: -150px 0;
}
.u-icn2-13 {
    background-position: -170px 0;
}
</style>