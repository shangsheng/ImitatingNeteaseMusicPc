<template>
	<div id="footer">
		<div class="g-ft ">
			<div class="m-ft">
				<div class="m-ft f-cb">
					<div class="copy">
						
						<ul class="link clearfix">
							<li v-for="item in condition">
								<span @click.stop="clickHref($event)" :data-href="item.href" class="item s-fc4 cursor">{{item.name}}</span>
								<span class="line">|</span>
							</li>
						</ul>
						<ul class="right s-fc3 clearfix">
							<li v-for="(item,index) in copyright">
								<span class="span" :class="{sep:index == 0}" v-if="!item.href">{{item.name}}</span>
								
								<span @click.stop="clickHref($event)" :data-href="item.href" class="alink s-fc3 cursor" data-target="_blank" v-else>{{item.name}}</span>
							</li>
						</ul>
						<ul class="contact s-fc3 clearfix">
							<li v-for="(item,index) of complaints">
								<span class="span" :class="{sep:index == 0}" v-if="!item.href">{{item.name}}</span>
								
								<span @click.stop="clickHref($event)" :data-href="item.href" class="alink s-fc3 cursor" data-target="_blank" v-else>{{item.name}}</span>
							</li>
						</ul>
					</div>
					<ul class="enter f-fr ">
						<li class="unit" v-for="item in authentication">
							<span class="logo logonew  f-tid cursor" :class="'logo-${item.name}'" @click.stop="clickHref($event)" :data-href="item.href"></span>
							<span class="tt 'tt-${item.name}'"></span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!--反馈意见-->
		<div class="auto-1567990473441 m-layer z-show" v-bind:hidden="maskFalse">
			<div class="zbar" id="auto-id-HhkUzpUBAsoVQRuK">
				<div class="zttl f-thide">
					反馈意见
				</div>
			</div>
			<div class="zcnt">
				<div class="lyct f-cb">
					<div class="m-fdback">
						<div class="tip">
							任何产品中的问题，欢迎反馈给我们
						</div>
						<div class="u-txtwrap f-pr">
							<textarea class="u-txt area" placeholder="请输入反馈内容" v-model="valueFknr" :readonly="readonlys" @keyup="kupValue" :maxlength="maxValueFknr"></textarea>
							<span class="zs s-fc2" v-bind:hidden="valueFalse">{{valueNum}}/140</span>
						</div>
						<div class="u-txtwrap f-pr holder-parent">
							<textarea class="u-txt contact" placeholder="请留下联系方式（电话、QQ、邮箱）" maxlength="100" v-model="valueLxfs"></textarea>
						</div>
						<div class="u-err" v-bind:hidden="errFalse">
							<i class="u-icn u-icn-25"></i>
							内容不能为空
						</div>					
					</div>
					<div class="lybtn f-tc">
						<span class="u-btn2 u-btn2-2 u-btn2-w4" @click.stop="">
							<i>发送意见</i>
						</span>
						<span class="u-btn2 u-btn2-1 u-btn2-w4" @click.stop="clickQx">
							<i>取消</i>
						</span>
					</div>
				</div>
			</div>
			<span class="zcls" title="关闭窗口" @click.stop="clickHidden">x</span>		
		</div>
		<div class="auto-1567990473440 m-mask" v-bind:hidden="maskFalse"></div>
	</div>
</template>

<script>
	export default {
    data () {
      return {
        condition:[
        			{name:'服务条款',href:'https://music.163.com/html/web2/service.html'},
        			{name:'隐私政策',href:'https://music.163.com/html/web2/privacy.html'},
        			{name:'版权投诉指引',href:'https://music.163.com/st/staticdeal/complaints.html'},
        			{name:'反馈意见',href:'#'},
        		   ],
        copyright:[
        			{name:'网易公司版权所有©1997-2019'},
        			{name:'杭州乐读科技有限公司运营：'},
        			{name:'浙网文[2018]3506-263号',href:'https://p1.music.126.net/Mos9LTpl6kYt6YTutA6gjg==/109951164248627501.png'}
        		  ],
        complaints:[
        			{name:'违法和不良信息举报电话：0571-89853516'},
        			{name:'举报邮箱：'},
        			{name:'ncm5990@163.com',href:'https://music.163.com/mailto:ncm5990@163.com'}
        			],
        authentication:[
        				{name:'auth',href:'https://music.163.com/st/userbasic#/auth',},
        				{name:'musician',href:'https://music.163.com/recruit'},
        				{name:'reward',href:'https://music.163.com/web/reward'},
        				{name:'cash',href:'https://music.163.com/uservideo#/plan'}
        				],
        maskFalse:true,
        errFalse:true,
        valueFknr:'',
        valueLxfs:'',
        valueNum:0,
        valueFalse:true,
        readonlys:false,
        maxValueFknr:140
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
        	clickHref($event){
        		var dataHref = $event.target.getAttribute('data-href');
        		if(dataHref != '#'){
        			
        			this.$seehref(dataHref)
        		}else{
        			//弹框
        			this.clickFk()
        		}
        	},
        	clickFk(){
        		this.$drage("auto-id-HhkUzpUBAsoVQRuK");
        		this.$toggleBody(true);
        		this.maskFalse=false;
        	},
        	clickHidden(){
        		this.maskFalse=true;
        		this.$toggleBody(false);
        	},
        	clickQx(){
        		this.valueFknr = '';
        		this.valueLxfs = '';
        		this.errFalse = true;
        		this.valueNum = 0;
        		this.valueFalse = true;
        		this.maskFalse=true;
        		this.$toggleBody(false);
        	},
        	kupValue(){
        		var valueLength = this.valueFknr.length;
        		
        		this.valueFalse = false;
        		if(valueLength>=140){

					this.valueNum = this.maxValueFknr
        		}else{
        			this.valueNum = valueLength;
        			this.readonlys = false
        		}
        	}
        }
  }
</script>

<style>
	.g-ft {
	    position: relative;
	    height: 148px;
	    overflow: hidden;
	    border-top: 1px solid #d3d3d3;
	    background: #f2f2f2;
	}
	.m-ft {
     	width: 980px; 
	    margin: 0 auto;
	}
	.m-ft .copy {
	    float: left;
	    width: 520px;
	    padding-top: 15px;
	    line-height: 24px;
	}
	.m-ft .copy ul{
		display: block;
	}
.m-ft .copy ul	li{
	    	float: left;
	 	}
.m-ft .copy ul	 .line {
			margin: 0 8px 0 10px;
			color: #c2c2c2;
		}
.m-ft .copy ul	.sep {
		margin-right: 14px;
	}
	.s-fc4, span.s-fc4:hover {
	    color: #999;
	}
	.m-ft .enter {
	    width: 330px;
	    margin-top: 21px;
	}
	.f-fr {
	    float: right;
	}
	.m-ft .enter .unit {
	    float: left;
	    width: 60px;
	    height: 70px;
	    margin-left: 30px;
	    text-align: center;
	    color: #666;
	}
	.m-ft .enter .unit:first-child {
	    margin-left: 0;
	}
	.m-ft .logonew {
	    display: block;
	    float: none;
	    width: 50px;
	    height: 45px;
	    margin: 0 auto;
	}
	.m-ft .logo.logonew {
	    background: url(../../assets/foot_enter_new.png) no-repeat;
	    background-size: 110px 450px;
	}
	.m-ft .logonew.logo-auth {
	    background-position: -63px -101px;
	}
	.m-ft .logonew + .tt {
	    background: url(../../assets/foot_enter_tt.png) no-repeat;
	    background-size: 180px 100px;
	}
	.m-ft .enter .tt {
	    display: inline-block;
	    margin: 5px 5px 0;
	    width: 52px;
	    height: 14px;
	}
	.m-ft .enter .tt-auth {
	    background-position: -1px -91px;
	}
	.m-ft .logonew.logo-musician {
	    background-position: 0 0;
	}
	.m-ft .enter .tt-musician {
	    background-position: 0 0;
	}
	.m-ft .logonew.logo-reward {
	    background-position: -60px -50px;
	}
	.m-ft .enter .tt-reward {
	    background-position: 0 -54px;
	}
	.m-ft .logonew.logo-cash {
	    background-position: 0 -101px;
	}
	.m-ft .enter .tt-cash {
	    background-position: -1px -72px;
	}
	/*反馈意见*/
	div.m-layer {
	    position: absolute;
	    z-index: 9998;
	    width: 530px;
	    border-radius: 4px;
	    box-shadow: 0 5px 16px rgba(0,0,0,0.8);
	    border: none;
	}
	div.m-layer .zbar, div.m-layer .zttl {
	    cursor: move;
	    -webkit-user-select: none;
	    -moz-user-select: none;
	    -ms-user-select: none;
	    user-select: none;
	}
	div.m-layer .zbar {
	    position: relative;
	    z-index: 10;
	    border-bottom: 1px solid #191919;
	    border-radius: 4px 4px 0 0;
	    background: #2d2d2d;
	}
	.auto-1567990473441 .zttl {
	    margin-right: 20px;
	    text-align: left;
	}
	div.m-layer .zbar, div.m-layer .zttl {
	    cursor: move;
	    -webkit-user-select: none;
	    -moz-user-select: none;
	    -ms-user-select: none;
	    user-select: none;
	}
	div.m-layer .zttl {
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
	div.m-layer div.zcnt {
	    padding: 0;
	    border: 1px solid #878787;
	    border-width: 0 1px 1px;
	    border-radius: 0 0 4px 4px;
	    background: #fff;
	}
	div.m-layer div.zcnt .tip{
		text-align: left;
	}
	/*div.m-layer .lyct {
	    padding: 40px 0;
	}*/
	.m-fdback {
	    padding: 0 40px;
	}
	.u-txtwrap {
	    padding-right: 14px;
	}
	.m-fdback .u-txtwrap {
	    margin-top: 5px;
	}
	.u-txt {
	    height: 19px;
	    margin: 0;
	    padding: 5px 6px 6px;
	    border: 1px solid #cdcdcd;
	    border-radius: 2px;
	    line-height: 19px;
	}
	textarea.u-txt, div.u-txt {
	    width: 100%;
	    margin-right: -20px;
	}
	.m-fdback .area {
	    height: 100px;
	}
	.u-txtwrap .zs {
	    position: absolute;
	    bottom: 8px;
	    right: 10px;
	    _right: 20px;
	}
	div.holder-parent {
	    position: relative;
	    zoom: 1;
	}
	.m-fdback .contact {
	    height: 60px;
	}
	.u-err {
	    height: 17px;
	    margin-top: 5px;
	    line-height: 17px;
	    color: #e33232;
	    text-align: left;
	}
	div.m-layer .lybtn {
	    margin-top: 30px;
	}
	div.m-layer .lybtn a, div.m-layer .lsbtn a {
	    margin: 0 10px;
	}
	.u-btn2-w4 i {
	    width: 55px;
	}
	.u-btn2-1 i {
	    color: #333;
	    background-position: 0 -59px;
	}
	.f-cb:after {
	    clear: both;
	    content: '.';
	    display: block;
	    height: 0;
	    visibility: hidden;
	}
	.auto-1567990473440 {
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
	div.m-layer .zcls {
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
</style>