let collection = (that,dataOpton,$event,scSongId,callbak)=>{
//	dataOption{
//		resAction,//类别
//		actionT//取消或收藏
//	}
//收藏/取消收藏歌单   /playlist/subscribe?t=1&id=106697785
//收藏的歌手列表 /artist/sublist
//收藏/取消收藏歌手 /artist/sub?id=6452&t=1
//收藏视频/video/sub?t=1&mvid=
//收藏 MV/mv/sub?t=1&mvid=
//收藏的 MV 列表 /mv/sublist
//收藏/取消收藏专辑/album/sub?t=1&id=
	console.log($event)
	var pids = 0;
	if(typeof $event != 'number'){
		if(!$event.currentTarget.getAttribute('data-id')){
		  
			  if($event.currentTarget.getAttribute('data-id') ==0){
			  	pids = $event.currentTarget.getAttribute('data-id')
			  }else{
			  	pids = $event.currentTarget.getAttribute('data-res-id')
			  }
		}else{
			  pids = $event.currentTarget.getAttribute('data-id')
		}
	}else{
		pids = $event
	}
	
	var dataCount = 0;
	
	switch (dataOpton.resAction){
		case 'fav':
			if($event.currentTarget.getAttribute('data-action') == 'delete'){
				
				let data = 0;
				if($event.currentTarget.getAttribute('data-res-type') == 13){
					//收藏歌单
					that.$http({
						method:'get',
						url:that.$host + "/playlist/subscribe?t="+dataOpton.actionT+"&id="+pids,
					}).then(function(res){
						console.log(res.data)
						 
						callbak(res.data.code)
					}).catch(res=>{
						console.log(res);
					
					})
					
					}else if($event.currentTarget.getAttribute('data-res-type') == 19){
						//收藏专辑
						that.$http({
							method:'get',
							url:that.$host + "/album/sub?t="+dataOpton.actionT+"&id="+pids,
						}).then(function(res){
							console.log(res.data)
							 
							callbak(res.data.code)
						}).catch(res=>{
							console.log(res);
						
						})
					
					}else{
				
					that.$http({
					method:'get',
					url:that.$host + "/playlist/tracks?op="+dataOpton.actionT+"&pid="+pids+"&tracks="+scSongId,
					}).then(function(res){
						console.log(res.data)
						
						that.$set(that.$data,'sccgHidden',false)
				       	that.$set(that.$data,'scgdHidden',true)
			        	that.$toggleBody(0)
			        	setTimeout(function(){
			        		that.$set(that.$data,'sccgHidden',true)
			        	},3000)
					}).catch(res=>{
						console.log(res);
					
					})
				}
			}else{
				if($event.currentTarget.getAttribute('data-count') != undefined){
				let data = 0;
					if($event.currentTarget.getAttribute('data-res-type') == 13){
						//收藏歌单
						that.$http({
							method:'get',
							url:that.$host + "/playlist/subscribe?t="+dataOpton.actionT+"&id="+pids,
						}).then(function(res){
							console.log(res.data)
							 
							callbak(res.data.code)
						}).catch(res=>{
							console.log(res);
						
						})
						
					}else if($event.currentTarget.getAttribute('data-res-type') == 19){
						//收藏专辑
						that.$http({
							method:'get',
							url:that.$host + "/album/sub?t="+dataOpton.actionT+"&id="+pids,
						}).then(function(res){
							console.log(res.data)
							 
							callbak(res.data.code)
						}).catch(res=>{
							console.log(res);
						
						})
					
					}
				}else{
					that.$http({
					method:'get',
					url:that.$host + "/playlist/tracks?op="+dataOpton.actionT+"&pid="+pids+"&tracks="+scSongId,
					}).then(function(res){
						console.log(res.data)
						
						that.$set(that.$data,'sccgHidden',false)
				       	that.$set(that.$data,'scgdHidden',true)
			        	that.$toggleBody(0)
			        	setTimeout(function(){
			        		that.$set(that.$data,'sccgHidden',true)
			        	},3000)
					}).catch(res=>{
						console.log(res);
					
					})
				}
			}
			
			break;
		case 'like':
			//播放的歌曲收藏 & 收藏单曲到歌单
			that.$http({
				method:'get',
				url:that.$host + "/playlist/tracks?op="+dataOpton.actionT+"&pid="+pids+"&tracks="+scSongId,
			}).then(function(res){
				console.log(res.data)
				
				that.$set(that.$data,'sccgHidden',false)
		       	that.$set(that.$data,'scgdHidden',true)
	        	that.$toggleBody(0)
	        	setTimeout(function(){
	        		that.$set(that.$data,'sccgHidden',true)
	        	},3000)
			}).catch(res=>{
				console.log(res);
			
			})
			break;
		case 'likeall':
		console.log(scSongId)
			//播放列表收藏
			that.$http({
				method:'get',
				url:that.$host + "/playlist/tracks?op="+dataOpton.actionT+"&pid="+pids+"&tracks="+scSongId,
			}).then(function(res){
				console.log(res.data)
				
				that.$set(that.$data,'sccgHidden',false)
		       	that.$set(that.$data,'scgdHidden',true)
	        	that.$toggleBody(0)
	        	setTimeout(function(){
	        		that.$set(that.$data,'sccgHidden',true)
	        	},3000)
			}).catch(res=>{
				console.log(res);
			
			})
			break;
		case 'likeArtist':
			//歌手收藏
			that.$http({
				method:'get',
				url:that.$host + "/artist/sub?t="+dataOpton.actionT+"&id="+pids,
				}).then(function(res){
				console.log(res.data)
				callbak(res.data.code)
			}).catch(res=>{
				console.log(res);
					
			})
			break;
		case 'sub':
			//收藏mv
			that.$http({
				method:'get',
				url:that.$host + "/mv/sub?t="+dataOpton.actionT+"&mvid="+pids,
				}).then(function(res){
				console.log(res.data)
				callbak(res.data.code)
			}).catch(res=>{
				console.log(res);
					
			})
			break;
		case 'video':
			//收藏视频
			that.$http({
				method:'get',
				url:that.$host + "/video/sub?t="+dataOpton.actionT+"&id="+pids,
				}).then(function(res){
				console.log(res.data)
				callbak(res.data.code)
			}).catch(res=>{
				console.log(res);
					
			})
			break;
	}
}
export {
	collection,
}
