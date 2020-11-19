<template>
	<div id="playsongs">
		<div class="btns f-cb" :data-rid="playlistArr.id" :data-type="playlistArr.types" :data-data-special="playlistArr.specialType">
			<span class="u-btn2 u-btn2-2 u-btni-addply f-fl ps-u-btn2" data-res-action="play" :data-res-id="playlistArr.id" :data-res-type="playlistArr.types" :data-res-from="playlistArr.froms" :data-res-idx="playlistArr.idx" title="播放" @click.stop="plays($event)">
				<i>
					<em class="ply"></em>
					播放
				</i>
			</span>
			<span class="u-btni u-btni-add" data-res-action="addto" :data-res-id="playlistArr.id" :data-res-type="playlistArr.types" title="添加到播放列表"></span>
			<span class="u-btni u-btni-fav " :class="{'u-btni-fav-dis':faDis}" data-res-action="fav" :data-count="playlistArr.subscribedCount" :data-res-id="playlistArr.id" :data-res-from="playlistArr.froms" :data-res-type="playlistArr.types" title="收藏" @click.stop="scColick($event)">
				<i v-if="playlistArr.liked&&playlistArr.subscribedCount">({{playlistArr.subscribedCount}})</i>
				<i v-else>收藏</i>
			</span>
			<span class="u-btni u-btni-share " data-res-action="share" :data-count="playlistArr.shareCount" :data-res-id="playlistArr.id" :data-res-type="playlistArr.types" :data-res-name="playlistArr.name" :data-res-author="playlistArr.author" :data-res-pic="playlistArr.pic" :data-res-authors="playlistArr.authors?playlistArr.authors:''" title="分享">
				<i v-if="playlistArr.shareCount">{{playlistArr.shareCount}}</i>
				<i v-else>分享</i>
			</span>
			<span class="u-btni u-btni-dl " data-res-action="download" :data-res-id="playlistArr.id" :data-res-type="playlistArr.types" title="下载"><i>下载</i></span>
			<span class="u-btni u-btni-cmmt " data-res-action="comment"><i>(<span id="cnt_comment_count">{{playlistArr.commentCount}}</span>)</i></span>
		</div>
	</div>
</template>

<script>
	import eventVue from '../../../static/js/eventVue.js'
	export default {
	name:'playsongs',
	props:['playlistArr'],
    data () {
      return {
        faDis:false,
        logH:false
      }
    },
     beforeCreate: function () {
//          debugger;
        },
        created: function () {
//          debugger;
			let that = this;
			console.log(this.playlistArr)
			 if(this.$cookieUtil("email")){
					this.$logoRefresh(function(ress){
						 that.$http({
				         	method:'get',
				         	url:that.$host+"/user/playlist?uid="+ress.data.profile.userId
				         }).then(function(res){
				         	console.log(res.data)
				         	that.$.each(res.data.playlist,function(index,el){
				         		console.log(el.id == that.playlistArr.id)
						       if(el.id == that.playlistArr.id){
						       	that.faDis=true;
						       }
				        	})
				         }).catch(res=>{
				         	console.log(res);
				         })
				         
				         that.logH = true
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
        	plays($event){
        		if($event.target.getAttribute('data-res-action') == 'play'){
						console.log($event)
						this.$root.eventVue.$emit('playid', 
						{resId:$event.target.getAttribute('data-res-id'),
						resData:$event.target.getAttribute('data-res-data'),
						resType:$event.target.getAttribute('data-res-type'),
						resFrom:$event.target.getAttribute('data-res-from'),
						resIdx:$event.target.getAttribute('data-res-idx'),
						})
					this.$root.eventVue.$emit('songsNum', 0)
					this.$localUtil('songsList',0)
					
				}else{
					console.log('点击播放图标不正确')
				}
        	},
        	scColick($event){
        		if(this.logH){
        			var that = this
        			var cades = this.$collection(this,{
				  		resAction:'fav',
				  		actionT:1
				  	},$event,0,function(data){
        				if(data == 200 ){
	        				that.$root.eventVue.$emit('sccgHidden',false);
	        				that.faDis=true;
	        			}
        			})
        			
        			
        		}else{
        			
	        		this.$root.eventVue.$emit('classify','l')
	        		this.$toggleBody(1)
	        		this.$drage('auto-id-e0uH7BGEq0gyq7zi')
        		}
        		
        		
        	}
        }
  }
</script>

<style lang="less" >
	.m-info .btns {
    margin-bottom: 25px;
    margin-right: -10px;
}
.u-btni-addply {
    float: left;
	    i {
	    padding: 0 7px 0 8px;
	}
}

.u-btn2-2 i {
    color: #fff;
    background-position: 0 -387px;
}
.u-btni, .u-btni i {
    float: left;
    height: 31px;
    line-height: 30px;
    min-width: 23px;
    cursor: pointer;
}
.u-btni {
    padding: 0 5px 0 0;
    white-space: nowrap;
}
.u-btni, .u-btni:hover {
    color: #333;
    text-decoration: none;
}
.u-btni-add {
    width: 31px;
    margin-left: -3px;
    padding-right: 0;
    background-position: 0 -1588px;
}
.u-btni-addply .ply {
    float: left;
    width: 20px;
    height: 18px;
    margin: 6px 2px 2px 0;
    background-position: 0 -1622px;
    overflow: hidden;
}
.m-info .btns .u-btni-add {
    margin-right: 5px;
}
#playsongs .u-btni, .m-info .btns .u-btni {
    margin-right: 6px;
    font-family: simsun,\5b8b\4f53;
}
.u-btni-share, .u-btni-fav, .u-btni-cmmt, .u-btni-dl {
    background-position: right -1020px;
}
.u-btni-fav i {
    background-position: 0 -977px;
}
.u-btni-share i, .u-btni-fav i, .u-btni-cmmt i, .u-btni-dl i, .u-btni-unfav i {
    padding-right: 2px;
    padding-left: 28px;
}
.u-btni-share i {
    background-position: 0 -1225px;
}
.u-btni-dl i {
    background-position: 0 -2761px;
}
.u-btni-cmmt i {
    background-position: 0 -1465px;
}
.u-btn2.ps-u-btn2 i {
    width: auto;
}
.u-btni-fav-dis, .u-btni-fav-dis:hover, .u-btni-fav-dis2, .u-btni-fav-dis2:hover, .u-btni-share-dis, .u-btni-share-dis:hover, .u-btni-cmmt-dis, .u-btni-cmmt-dis:hover, .u-btni-dl-dis, .u-btni-dl-dis:hover {
    cursor: default;
    background-position: right -1192px;
    pointer-events: none;
}
.u-btni-fav-dis i, .u-btni-fav-dis:hover i, .u-btni-fav-dis2 i, .u-btni-fav-dis2:hover i, .u-btni-share-dis i, .u-btni-share-dis:hover i, .u-btni-cmmt-dis i, .u-btni-cmmt-dis:hover i, .u-btni-dl-dis i, .u-btni-dl-dis:hover i {
    color: #bebebe;
    background-position: 0 -1149px;
    cursor: default;
    // background-position: -330px -235px;
}
</style>