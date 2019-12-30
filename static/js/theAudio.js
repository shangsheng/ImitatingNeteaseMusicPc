let fs = require('fs');
let AudioContext = window.AudioContext ;
let audioCtx = AudioContext ? new AudioContext() : '';




/*fs.readFile(_this.voicePath,function(err, data){
      _this.audioPlay(data);
});
console.log(typeof data)  //返回类型为object，就是原生Buffer

let dataTmp = data.buffer  // arrayBuffer

audioCtx.decodeAudioData(dataTmp)  //这才是最后的audioBuffer
audioPlay:function (data) {
    let audioBufferSourceNode = audioCtx.createBufferSource();
}*/
const audios = {
	audioPlay:function (data) {
	    let audioBufferSourceNode = audioCtx.createBufferSource();
	    audioCtx.decodeAudioData(data.buffer).then(function (decodedData) {
	        audioBufferSourceNode.buffer = decodedData;
	    });
	    audioBufferSourceNode.connect(audioCtx.destination);
	    audioBufferSourceNode && audioBufferSourceNode.start(0,0,1);
	    return audioBufferSourceNode
	},
	install:function(src){
		let _this = this;
		let audioP = null;
		fs.readFile(src,function(err, data){
	      audioP =  _this.audioPlay(data);
		});
		return audioP;
	}
}
export default audios

import { truncate, ftruncate, truncateSync } from "fs";
import { fips } from "crypto";
import { clearInterval } from 'timers';
// 将整数转换成 时：分：秒的格式
function realFormatSecond(second) {
  var secondType = typeof second;
 
  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);
 
    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;
    // hours + ':' +
    return ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2);
  } else {
    return "0:00:00";
  }
}
var times=null;
export default {
  data() {
    return {
      sliderTime: 0,
      silderNone: 0,
    
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false,
 
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0,
        minTime: 0,
        step: 0.1
      },
      lefticon: "",
      play: false, // 播放暂停按钮
      current: {
        startTime: "00:00",
        endtime: "00:00",
        index: 1,
        nextIndex: 1,
        poster: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg",
        name: "第一节:",
        author: "暂无",
        audioHttp: "../../../../static/audio/1.mp3",
        title: "四大基础险种",
        desc: "主讲老师:郭冲老师",
        content: {
          name: "课程内容",
          title:
            "第一次买重疾，这些都要注意 医疗险，除了百万你还要知道这些写家庭支柱，都该看看寿险意外险，不是你该省的钱"
        },
        times: ""
      }
    };
  },
  created() {
    var that = this;
    that.$refs.audio.play();
    that.play = true;
    that.$refs.audio.pause();
    //  that.silderNone=0;
 
  },
  mounted() {
    // this.$refs.audio.play();
    var that=this;
    that.play = true;
    // this.$refs.audio.pause();
      times= setInterval(() => {
      that.silderNone =that.silderNone+10;
         if(that.silderNone==100){
        window.clearInterval(times);
      }
     
    console.log("开始播放",that.silderNone);
 
    }, 1000);
  },
  methods: {
    /**
     * 控制音频的播放与暂停 {三元运算方式简单/后期优化}
     */
    startPlayOrPause() {
      console.log(this.audio.playing);
      if (!this.audio.playing) {
        this.play = true;
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
        this.play = false;
      }
    },
    /**
     * 切换歌曲事件
     */
    switchAudio(value) {
      var that = this;
      if (value === "top") {
        this.current = {
          startTime: "00:00",
          endtime: "00:00",
          index: 1,
          nextIndex: 1,
          poster: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg",
          name: "第一节:",
          author: "暂无",
          audioHttp: "../../../../static/audio/1.mp3",
          title: "四大基础险种",
          desc: "主讲老师:郭冲老师",
          content: {
            name: "课程内容",
            title:
              "第一次买重疾，这些都要注意 医疗险，除了百万你还要知道这些写家庭支柱，都该看看寿险意外险，不是你该省的钱"
          },
          time: ""
        };
      } else if (value === "bottom") {
        this.current = {
          startTime: "00:00",
          endtime: "00:00",
          index: 2,
          nextIndex: 2,
          poster: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg",
          name: "第二节:",
          author: "暂无",
          audioHttp: "../../../../static/audio/2.mp3",
          title: "儿童保险",
          desc: "主讲老师:老白老师",
          content: {
            name: "课程内容",
            title:
              "第一次买重疾，这些都要注意 医疗险，除了百万你还要知道这些写家庭支柱，都该看看寿险意外险，不是你该省的钱"
          },
          time: ""
        };
      }
      this.sliderTime = 0;
      this.audio.currentTime = "00:00";
      this.play = true; // 更改播放暂停按钮为播放
      that.silderNone=0;
      // 切换下一首，进度条模拟预加载效果
       times= setInterval(() => {
      that.silderNone =that.silderNone+10;
         if(that.silderNone==100){
        window.clearInterval(times);
      }
     
    console.log("开始播放",that.silderNone);
 
    }, 1000);
      this.$refs.audio.play();
      // index = 0; // 清空颜色进度条
    },
    // 播放音频
    play() {
      console.log("你的播放开启了");
      this.$refs.audio.play();
      this.play = true;
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause();
    },
    // 当音频播放
    onPlay() {
      console.log("音频正在播放中");
      this.audio.playing = true;
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false;
      var startTime = parseInt(this.audio.currentTime);
      console.log(
        "this.audio.playing",
        this.audio.playing,
        "maxTime",
        this.audio.maxTime
      );
      //
      this.play = false;
      if (startTime == this.audio.maxTime) {
        this.sliderTime = 0;
        this.audio.currentTime = "00:00";
      }
    },
    handleFocus() {
      console.log("focues");
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    // 结束时间
    onLoadedmetadata(res) {
      console.log("loadedmetadata");
      // console.log(res)
      this.audio.maxTime = parseInt(res.target.duration);
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    // 当音频当前时间改变后，进度条也要改变
    onTimeupdate(res) {
      console.log("timeupdate");
      // console.log(res)
      this.audio.currentTime = res.target.currentTime;
      this.sliderTime = parseInt(
        (this.audio.currentTime / this.audio.maxTime) * 100
      );
    },
 
    // 进度条格式化toolTip
    formatProcessToolTip(index = 0) {
      index = parseInt((this.audio.maxTime / 100) * index);
      return "进度条: " + realFormatSecond(index);
    },
 
    handleTouchStart(e) {
      this.setValue(e.touches[0]);
      this.$refs.audio.play();
      document.addEventListener("touchmove", this.handleTouchMove);
      document.addEventListener("touchup", this.handleTouchEnd);
      document.addEventListener("touchend", this.handleTouchEnd);
      document.addEventListener("touchcancel", this.handleTouchEnd);
 
      // e.preventDefault();
      // this.onDragStart(e);
    },
    handleTouchMove(e) {
      console.log(e.changedTouches[0]);
      this.setValue(e.changedTouches[0]);
    },
    handleTouchEnd(e) {
      this.setValue(e.changedTouches[0]);
      document.removeEventListener("touchmove", this.handleTouchMove);
      document.removeEventListener("touchup", this.handleTouchEnd);
      document.removeEventListener("touchend", this.handleTouchEnd);
      document.removeEventListener("touchcancel", this.handleTouchEnd);
      // this.onDragStop(e);
    },
    // 从点击位置更新 value
    setValue(e) {
      const $el = this.$el;
      const { maxTime, minTime, step } = this.audio;
      let value =
        ((e.clientX - $el.getBoundingClientRect().left) / $el.offsetWidth) *
        (maxTime - minTime);
      value = Math.round(value / step) * step + minTime;
      value = parseFloat(value.toFixed(5));
 
      if (value > maxTime) {
        value = maxTime;
      } else if (value < minTime) {
        value = minTime;
      }
      this.$refs.audio.currentTime = value;
    },
    // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
    changeCurrentTime(index) {
      console.log("拖动进度条");
      // this.audio.playing && this.pause();
      // console.log('拖动了',index,this.sliderTime,this.audio.maxTime,parseInt(index / 100 * this.audio.maxTime))
      // !this.audio.playing && this.play();
      this.$refs.audio.currentTime = parseInt(
        (index / 100) * this.audio.maxTime
      );
    }
  },
  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    transPlayPause(value) {
      return value ? "暂停" : "播放";
    },
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      return realFormatSecond(second);
    }
  }
};
