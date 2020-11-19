<template>
	<div id="log" v-bind:hidden="loghide">
		<div class="auto-1566780113701 m-layer z-show">
			<div class="zbar u-zbar-1" id="auto-id-e0uH7BGEq0gyq7zi">
				<div class="zttl f-thide" v-if="login.l.id == classify">
					{{login.l.name}}
				</div>
				<div class="zttl f-thide" v-else-if="login.pl.id == classify">
					{{login.pl.name}}
				</div>
				<div class="zttl f-thide" v-else-if="login.el.id == classify">
					{{login.el.name}}
				</div>
			</div>
			<div class="zcnt ">
					<div class="lyct lyct-1" id="auto-id-vIFXRGMyiLqiMHdJ" v-if="login.l.id == classify">
						<div class="n-log2 n-log2-1 f-cb">
							<div class="u-main">
								<div class="u-plt"></div>
								<div class="f-mgt10 ">
									<div class="u-btn2 u-btn2-2" data-action="pl"  v-on:click.stop="skip($event)">
										<i>手机号登录</i>
									</div>
									
								</div>
								<div class="f-mgt10">
									<div class="u-btn2 u-btn2-1" data-action="reg">
										<i>注册</i>
									</div>
								</div>
							</div>
							<div class="u-alt">
								<ul>
									
									<li  v-for="(item,index) in login.l.logoMode" v-bind:key="index">
										<span  v-if="item.target == '_self'"><i class="u-mlg2" :class=" [item.icon]" :data-action="item.idName" @click.stop="skip($event)"></i><em :data-action="item.idName" @click.stop="skip($event)">{{item.name}}</em></span>
										<router-link v-else :to="{path:'/api/sns/authorize',query:{id:item.id}}" :target= 'item.target'>
											<span><i class="u-mlg2"  :class=" [item.icon]"></i><em>{{item.name}}</em></span>
										</router-link>
									</li>
									<!-- <li   :data-action="item.idName">
										
									</li> -->
								</ul>
							</div>
						</div>
						
					</div>
					<div class="lyct lyct-1" id="auto-id-d5qBvc0bg5qiTdXA" v-else-if="login.pl.id == classify">
						<div class="n-log2 n-log2-2">
							<div class="j-mob">
								<div class="u-phonewrap" id="auto-id-KKKqmJBS7MuWhvfK">
									<div class="current" @click.stop="skip($event)" data-action="options">
										<span class="j-code" @click.stop="skip($event)" data-action="options">+{{login.pl.code}}</span>
										<span class="icn u-icn2 u-icn2-17" @click.stop="skip($event)" data-action="options"></span>
									</div>
									<div class="txtwrap">
										<input type="text" name="p" id="p" placeholder="请输入手机号" class="j-phone txt u-txt" v-model="login.pl.pVlaue"/>
									</div>
									<ul class="j-list options " :class="{'f-hide':login.pl.areaCode}">
										<li class="item f-cb" v-for="(item, index) in login.pl.options" data-action="select" :data-index="index" @click="skip($event)" v-bind:key="index">
											<span class="lt" data-action="select" :data-index="index" @click="skip($event)">{{item.name}}</span>
											<span class="rt" data-action="select" :data-index="index" @click="skip($event)">+{{item.countrycode}}</span>
										</li>
									</ul>
								</div>
								
							</div>
							<div class="f-mgt10">
								<input type="password" name="pw" id="pw" class="j-pwd u-txt"  placeholder="请输入密码" v-model="login.pl.pPw"/>
							</div>
							<div class="j-err u-err" v-bind:hidden="login.pl.pwPlErr">
								<i class="u-icn u-icn-25"></i>
								<span>{{login.pl.pwErr}}</span>
							</div>
							<div class="f-mgt10">
								<label class="s-fc3">
									<input type="checkbox" class="j-auto u-auto"  :checked="login.pl.checked"/>
									自动登录
								</label>
								<div class="f-fr s-fc3" data-action='forget'>
									忘记密码
								</div>
							</div>
							<div class="f-mgt20">
								<div class="j-primary u-btn2 u-btn2-2" data-action="login" @click.stop="logoP">
									<i>登录</i>
								</div>
							</div>
						</div>
						<div class="js-btmbar n-loglink2 f-cb">
							<div class="f-fl s-primary" data-action="l" @click="skip($event)">
								&lt;&nbsp;&nbsp;其他登录方式
							</div>
							<div class="f-fr" data-action="reg">
								没有账号？免费注册&nbsp;&nbsp;>
							</div>
						</div>
					</div>
					<div class="lyct lyct-1" id="auto-id-lptVQyhNUvVKxMSU" v-else-if="login.el.id == classify">
						<div class="n-log2 n-log2-2">
							<div class="f-pr"><!--v-focus="true"-->
								<input type="text" name="e" id="e" placeholder="请输入账号" autocomplete="off"  class="js-input u-txt" v-model="login.el.eValue " @keyup="eValue"  @blur.native.capture="blurValue"/>
								<ul class="js-suggest u-fill" v-bind:hidden="login.el.selTips">
									<li class="f-thide "  v-for="(item, index) in login.el.selected " v-if="index == 0" :class="{'js-selected':jsSelected == index}"  >
										<span data-action="suggest" :title="item.eSuffix" @mousedown.stop="skip($event)">{{item.eSuffix }}</span>
									</li>
									<li class="f-thide " v-else :class="{'js-selected':jsSelected == index}"  >
										<span data-action="suggest" :title="item.eSuffix" @mousedown.stop="skip($event)">{{item.eSuffix }}</span>
									</li>
								</ul>
								
							</div>
							<div class="f-mgt10">
								<input type="password" name="pw" id="pw" class="j-pwd u-txt"  placeholder="请输入密码" v-model="login.el.ePw" />
							</div>
							<div class="ScapTcha js-scaptcha"></div>
							<div class="j-err u-err" v-bind:hidden="login.el.pwElErr">
								<i class="u-icn u-icn-25"></i>
								<span>{{login.el.eErr}}</span>
							</div>
							<div class="f-mgt10">
								<label class="s-fc3">
									<input type="checkbox" class="j-auto u-auto"  :checked="login.el.checked"/>
									自动登录
								</label>
								<div class="f-fr s-fc3" data-action='forget'>
									忘记密码
								</div>
							</div>
							<div class="f-mgt20">
								<div class="j-primary u-btn2 u-btn2-2" data-action="login" @click.stop="logoEl" @keyup.enter="logoEl">
									<i>登录</i>
								</div>
							</div>
						</div>
						<div class="js-btmbar n-loglink2 f-cb">
							<div class="f-fl s-primary" data-action="l" @click="skip($event)">
								&lt;&nbsp;&nbsp;其他登录方式
							</div>
							
						</div>
					</div>
			</div>
			
			<span class="zcls u-zcls-1" title="关闭窗口" id="auto-id-lW1baKCCFt3kA4Xs" data-action='hide' @click="skip($event)">x</span>
		</div>
		<div class="auto-1566780113700 m-mask"></div>
	</div>
</template>

<script>
	//import eventVue from '../../../static/js/eventVue.js'
	import {delCookie,getCookie,setCookie} from '../../../static/js/util.js'
	import CryptoJS from "crypto-js"
	let that = {};
	export default{
		name:'log',
		data(){
			that = this;
			return {
				login:{
					'l':{
						id:'l',
						name:'登录',
						logoMode:[
					      			{'name':'微信登录','target':"_blank",'idName':'weixin','icon':'u-mlg2-wx','id':0},
					      			{'name':'QQ登录','target':"_blank",'idName':'QQ','icon':'u-mlg2-qq','id':1},
					      			{'name':'新浪微博登录','target':"_blank",'idName':'xinlang','icon':'u-mlg2-sn','id':2},
					      			{'name':'网易邮箱登录','target':"_self",'idName':'el','icon':'u-mlg2-wy'}
				      			]
					},
					'pl':{
						id:'pl',
						name:'手机登录',
						pVlaue:'',
						pPw:'',
						pwErr:'密码或手机号不正确',//错误内容
						pwPlErr:true,//手机登录密码错误显示
						code:'86',
						checked:true,
						options:[
							{name:'中国',countrycode:'86'},
							{name:'中国香港',countrycode:'852'},
							{name:'中国澳门',countrycode:'853'},
							{name:'中国台湾',countrycode:'886'},
							{name:'日本',countrycode:'81'},
							{name:'韩国',countrycode:'82'},
							{name:'英国',countrycode:'44'},
							{name:'美国',countrycode:'1'},
							{name:'加拿大',countrycode:'1'},
							{name:'法国',countrycode:'33'},
							{name:'芬兰',countrycode:'358'},
							{name:'德国',countrycode:'49'},
							{name:'荷兰',countrycode:'31'},
							{name:'意大利',countrycode:'39'},
							{name:'印度',countrycode:'91'},
							{name:'泰国',countrycode:'66'},
							{name:'新西兰',countrycode:'46'},
							{name:'葡萄牙',countrycode:'351'},
							{name:'俄罗斯',countrycode:'7'},
							{name:'新加坡',countrycode:'65'},
							{name:'马来西亚',countrycode:'60'},
							{name:'西班牙',countrycode:'34'},
							{name:'南非',countrycode:'27'}
						],
						areaCode:true
					},
					'el':{
						id:'el',
						name:'邮箱登录',
						eValue:'',
						ePw:'',
						eErr:'密码或手机号不正确',
						pwElErr:true,//邮箱登录密码错误显示
						checked:true,
						selected:[
								{eSuffix:'@163.com'},
								{eSuffix:'@126.com'},
								{eSuffix:'@yeah.net'},
								{eSuffix:'@vip.163.com'},
								{eSuffix:'@vip.126.com'},
								{eSuffix:'@188.com'},
							],
						selTips:true,//邮箱输入提示
						
					}
				},
				classify:'l',
				loghide:true,//是否显示登录及注册组件
				jsSelected:0,
				logoData:null,
			}
		},
		inject:['reload'],
		filters: {
		  eTips: function (value) {
		    if (!value) return ''
		    
			
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
			var _this = this;
			//this.$drage(this.$el.childNodes[0].children[0].id)
			
			this.$(document).click(function(){
				_this.login.pl.areaCode = true;
				_this.login.el.selTips = true;
			})
			this.$root.eventVue.$on('classify',function(val){
				_this.classify = val;
				_this.loghide = false;
			})
        },
        deactivated: function(){
            alert("keepAlive停用");
        },
        activated: function () {
            console.log('component activated');
        },
        beforeDestroy: function () {
            console.group('beforeDestroy 销毁前状态===============》');
            this.offxxxListener()
        },
        destroyed: function () {
            console.group('destroyed 销毁完成状态===============》');
            
        },
        directives: {
//			自定义获取焦点
			focus: {
			
				update: function (el, {value}) {
				
					if (value) {
					
						el.focus()
						
					}
				
				}
			
			}
		
		},
        methods:{
        	
        	skip($event){
        		
        		var dataclassify = $event.target.getAttribute('data-action');
        		
        		
        		switch (dataclassify){
        			case 'options':
        				this.$set(this.login.pl,'areaCode',false)
        				break;
        			case 'hide':
        				this.$set(this.$data,'loghide',true)
        				this.$toggleBody(0)
        				break;
        			case 'select':
        				var dataIndex = $event.target.getAttribute('data-index')
        				console.log(dataIndex)
        				var code = this.login.pl.options[dataIndex].countrycode
        				this.$set(this.login.pl,'code',code)
        				break;
        			case 'suggest':
        				var titles = $event.target.getAttribute('title');
        				
        				this.$set(this.login.el,'eValue',titles)
						break;
        				
        			default:
        				this.$set(this.$data,'classify',dataclassify)
        				this.$toggleBody(1)
        				break;
        		}
        		
        	},
        	eValue(){
        		
        		var selectedArr=[]
        		var selected=[
								{eSuffix:'@163.com'},
								{eSuffix:'@126.com'},
								{eSuffix:'@yeah.net'},
								{eSuffix:'@vip.163.com'},
								{eSuffix:'@vip.126.com'},
								{eSuffix:'@188.com'},
							]
        		
        		var eValue =this.login.el.eValue;
        		var  flag = '';
        		
	            if(eValue.indexOf("@")>0){
	                flag=eValue.substring(eValue.indexOf("@")-1);//获取的输入的@开始的内容
	                
	                eValue=eValue.substring(0,eValue.indexOf("@"));
	               
	            }else{
	                flag="";
	                
	                //首字符是@
	                if(eValue.substring(0,1) == '@'){
	                	eValue=eValue.substring(0,eValue.indexOf("@"));
	                }
	            }
	             var val="";
	            //将输入内容和后缀链接
	           
        		for(var i=0;i<selected.length;i++){
        			val=selected[i].eSuffix;
	                val=val.substring(val.indexOf("@"));
	                
        			var eSuffix = {eSuffix:eValue+val}
        		
        			selectedArr.push(eSuffix)
        			
        		}
        		
        		var eArr = []//检查满足条件的内容
        		if(flag!=""){
                var reg=new RegExp(flag,"i");
                	
	                for(var i=0;i<selectedArr.length;i++){
	                	
	                    if(reg.test(selectedArr[i].eSuffix)){
	                    	
	                    	eArr.push(selectedArr[i])
	                    	
	                    	this.login.el.selTips = false;
	                        
	                    }else{
	                    	 selectedArr.splice(i, 1);
	                        this.login.el.selTips = true;
	                       
	                    }
	                }
	                selectedArr = eArr
	            }
        		
        		this.$set(this.login.el,'selected',selectedArr)
        		if(this.login.el.eValue == ''){
        			this.login.el.selTips = true;
        		}else{
        			this.login.el.selTips = false;
        		}
        		
        	},
        	blurValue(){
        		
        	},
//      	ePw(){
//      		//密码keyup事件
//      	},
        	offxxxListener () {
        		
			    this.$root.eventVue.$off("classify");
			},
			logoEl(){
				var checkedTime = 0
				if(this.login.el.checked){
					checkedTime = 1000*60*60*24
				}else{
					checkedTime = 1000*60*60*24*10
				}
				var that = this;
				var exdate = new Date(); //获取时间
				var exdays = 1;
				if(that.login.el.eValue == '' ){
					
			         that.login.el.eErr='请输入登录账号';
			         that.login.el.pwElErr=false;
				}else if(that.login.el.ePw == ''){
					that.login.el.eErr='请输入登录密码'
			        that.login.el.pwElErr=false
					
				}else{
					
					let data = {'email':this.login.el.eValue,'password':this.login.el.ePw}
		            /*接口请求*/
		           
				this.$http({
					method: "post",
				    url: that.$host+'/login',
				    data: data,
				   
				    withCredentials: true
				}).then((res)=>{
		               
		                console.log(res.data)
		             /*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
		              if(res.code == 500){
		                  that.login.el.eErr = "该用户不存在"
		                  that.login.el.pwElErr = false
		              }else if(res.code == 502){
		                  that.login.el.eErr = "密码输入错误"
		                  that.login.el.pwElErr = false
		              }else{

						  that.logoData = res.data;
			         	  that.$set(that.$data,'loghide',true);
        				  that.$toggleBody(0);
		                  setCookie('email',this.login.el.eValue,checkedTime);
		                  this.$localUtil('logoData',this.logoData)
		                  setTimeout(function(){
		                  	this.reload();
		                  }.bind(that),1000)
		              }
		          }).catch(resp => {
	        			if(res.code == 500){
		                  that.login.el.eErr = "该用户不存在"
		                  that.login.el.pwElErr = false
			              }else if(res.code == 502){
			                  that.login.el.eErr = "密码输入错误"
			                  that.login.el.pwElErr = false
			              }
	        		});
				}
			},
			//手机号登录
			logoP(){
				var checkedTime = 0
				if(this.login.el.checked){
					checkedTime = 1000*60*60*24
				}else{
					checkedTime = 1000*60*60*24*10
				}
				var that = this;
				var exdate = new Date(); //获取时间
				var exdays = 1;
				if(that.login.el.eValue == '' ){
					
			         that.login.pl.pwErr='请输入登录账号';
			         that.login.pl.pwElErr=false;
				}else if(that.login.el.ePw == ''){
					that.login.pl.pwErr='请输入登录密码'
			        that.login.pl.pwElErr=false
					
				}else{
					
					let data = {'phone':this.login.pl.pVlaue,'password':this.login.pl.pPw,'countrycode':this.login.pl.code}
		            /*接口请求*/
		           
				this.$http({
					method: "post",
				    url: that.$host+'/login/cellphone',
				    data: data,
				   
				    withCredentials: true
				}).then((res)=>{
		                console.log(res)
		             /*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
		              if(res.code == 500){
		                  that.login.el.pwErr = "该用户不存在"
		                  that.login.el.pwPlErr = false
		              }else if(res.code == 502){
		                  that.login.el.pwErr = "密码输入错误"
		                  that.login.el.pwPlErr = false
		              }else{

						  that.logoData = res.data;
			         	  that.$set(that.$data,'loghide',true);
        				  that.$toggleBody(0);
		                  setCookie('email',this.login.el.eValue,checkedTime);
		                  this.$localUtil('logoData',this.logoData)
		                  setTimeout(function(){
		                  	this.reload();
		                  }.bind(that),1000)
		              }
		          }).catch(resp => {
	        			if(res.code == 500){
		                  that.login.pl.pwErr = "该用户不存在"
		                  that.login.pl.pwPlErr = false
			              }else if(res.code == 502){
			                  that.login.pl.pwErr = "密码输入错误"
			                  that.login.pl.pwPlErr = false
			              }
	        		});
				}
			}
        },
        
	}
</script>

<style lang="less" >
	@import '../../../static/css/public.less';
	.auto-1566780113701 {
	    position: absolute;
	    z-index: 1000;
	    border: 1px solid #aaa;
	    background: #fff;
	    .zttl {
		    margin-right: 20px;
		    text-align: left;
		}
		.zbar {
		    line-height: 30px;
		    background: #8098E7;
		    border-bottom: 1px solid #aaa;
		}
		
	}
	div.m-layer {
	    position: absolute;
	    z-index: 9998;
	    width: 530px;
	    border-radius: 4px;
	    box-shadow: 0 5px 16px rgba(0,0,0,0.8);
	    border: none;
	    .zttl{
	    	.zttl;
	    	padding-right: 45px;
		    margin: 0;
		    height: 38px;
		    line-height: 38px;
		    padding-left: 18px;
		    border-radius: 3px 3px 0 0;
		    font-weight: bold;
		    font-size: 14px;
		    color: #fff;
		    background-position: 50% 0;
		    _background-image: none;
	    }
	    .zbar {
		    position: relative;
		    z-index: 10;
		    border-bottom: 1px solid #191919;
		    border-radius: 4px 4px 0 0;
		    background: #2d2d2d;
		    .zttl;
		}
		div.zcnt {
		    padding: 0;
		    border: 1px solid #878787;
		    border-width: 0 1px 1px;
		    border-radius: 0 0 4px 4px;
		    background: #fff;
		}
		.lyct {
		    padding: 40px 0;
		}
		.lyct-1 {
		    padding: 0;
		}
		.zcls {
		    position: absolute;
		    z-index: 20;
		    top: 16px;
		    right: 20px;
		    width: 10px;
		    height: 10px;
		    overflow: hidden;
		    text-indent: -9999px;
		    cursor: pointer;
		    background-position: 0 -95px;
		}
	}
	.auto-1566780113700 {
	    position: fixed;
	    _position: absolute;
	    z-index: 100;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    width: 100%;
	    height: 100%;
	    background-image: url(data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==);
	}
	div.m-mask {
	    z-index: 1001;
	}
	.n-log2-1 {
	    padding: 40px 0 39px;
	}
	.n-log2 {
		.u-main {
		    float: left;
		    width: 224px;
		    padding: 0 35px 3px 40px;
		    border-right: 1px dotted #ccc;
		    .u-plt {
			    height: 120px;
			    background: url(../../assets/platform.png) no-repeat 13px 0;
			}
			.u-btn2 {
			    width: 219px;
			}
		}	
	}
	.f-mgt10 {
	    margin-top: 10px;
	}
		
.u-btn2{
	display: inline-block;
	*display: inline;
	*zoom: 1;
	height: 31px;
	line-height: 31px;
	overflow: hidden;
	*line-height: 32px;
	vertical-align: top;
	text-align: center;
	cursor: pointer;
	i {
	    display: inline-block;
	    *display: inline;
	    *zoom: 1;
	    height: 31px;
	    line-height: 31px;
	    overflow: hidden;
	    *line-height: 32px;
	    vertical-align: top;
	    text-align: center;
	    cursor: pointer;
	    padding: 0 15px 0 20px;
    	pointer-events: none;
	}
}
	.u-btn2 {
	    padding: 0 5px 0 0;
	    white-space: nowrap;
		i {
		    width: 184px;
		}
	}
	
	
	.u-mlg2 {
	    width: 38px;
	    height: 38px;
	}
	
	.n-log2 {
		.u-alt {
		    float: left;
		    padding: 3px 0 3px 40px;
		    margin-top: -15px;
		    text-align: left;
		    li {
			    margin-top: 15px;
			    .u-mlg2 {
				    margin-right: 14px;
				}
				 a {
				    font-size: 12px;
				    color: #333;
				    line-height: 38px;
				}
				em{
					font-size: 12px;
				    color: #333;
				    line-height: 38px;
				}
				span{
					cursor: pointer;
				}
			}
		}
	}
	/*登录*/
	.n-log2-2 {
	    padding: 30px 0 43px;
	    width: 220px;
	    margin: 0 auto;
	    text-align: left;
	}
	.u-phonewrap {
	    position: relative;
	    height: 30px;
	    margin: 0;
	    border: 1px solid #cdcdcd;
	    border-radius: 2px;
	    z-index: 10;
	    .current {
		    position: relative;
		    float: left;
		    display: block;
		    height: 30px;
		    line-height: 30px;
		    padding: 0 18px 0 5px;
		    border-right: 1px solid #cdcdcd;
		    cursor: pointer;
		    .icn {
			    position: absolute;
			    top: 14px;
			    right: 7px;
			}
		}
		.txtwrap {
		    overflow: hidden;
		}
		 .txt {
		    display: block;
		    padding: 5px 8px 5px;
		    height: 20px;
		    line-height: 20px;
		    border: none;
		}
		.options {
		    position: absolute;
		    top: 31px;
		    left: -1px;
		    width: 100%;
		    height: 128px;
		    border: 1px solid #cdcdcd;
		    border-top: none;
		    clear: both;
		    background-color: #fff;
		    overflow: auto;
		    .item {
			    height: 32px;
			    line-height: 32px;
			    color: #333;
			    cursor: pointer;
			    overflow: hidden;
			    .lt {
				    padding-left: 7px;
				}
				.rt {
				    float: right;
				    margin-right: 10px;
				}
			}
			.item:hover {
			    background-color: #eaeaea;
			}
		}
		
	}
	.u-txt {
	    height: 19px;
	    margin: 0;
	    padding: 5px 6px 6px;
	    border: 1px solid #cdcdcd;
	    border-radius: 2px;
	    line-height: 19px;
	}
	.n-log2 .u-txt {
	    width: 206px;
	}
	.f-mgt10 {
	    margin-top: 10px;
	}
	.u-err {
	    height: 17px;
	    margin-top: 5px;
	    line-height: 17px;
	    color: #e33232;
	}
	.n-log2 {
		 .u-auto {
		    margin: 0 12px 0 0;
		    vertical-align: middle;
		}
		.u-err {
		    height: auto;
		    line-height: 18px;
		    i {
			    margin-top: -2px;
			}
		}
		.u-fill {
		    position: absolute;
		    top: 31px;
		    left: 0;
		    width: 218px;
		    background: #fff;
		    border: 1px solid #ccc;
		    span {
			    display: block;
			    height: 25px;
			    padding-left: 5px;
			    line-height: 25px;
			}
		}
	}
	
	.u-err i {
	    margin-right: 8px;
	}
	.s-fc3, .s-fc3:hover {
	    color: #666;
	}
	.f-mgt20 {
	    margin-top: 20px;
	}
	.n-loglink2 {
	    padding: 0 19px;
	    height: 48px;
	    border-top: 1px solid #c6c6c6;
	    border-radius: 0 0 4px 4px;
	    line-height: 48px;
	    background-color: #f7f7f7;
	    div.s-primary {
		    color: #0c72c3;
		}
	}
	.n-loglink2 div {
	    font-size: 12px;
	    color: #999;
	    text-decoration: none;
	    cursor: pointer;
	}
	.f-thide {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    word-wrap: normal;
	}
	.n-log2 .u-fill span:hover, .n-log2 .u-fill .js-selected {
	    background: #f2f2f2;
	    text-decoration: none;
	}
	
</style>