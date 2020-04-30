<template>
  <div :class='wrapClass'>
    <!-- <p style="color:transparent;">1</p> -->
    <div class="number-wrap" v-show="showPass">
      <h4>选择你的{{name}}号码</h4>
      <p class="qc">第{{qici}}期 周{{week}} {{hs}}开奖</p>
      <p class="tit">还可免费领取<span>{{ notes }}</span>注</p>
      <div class="ball">
        <span v-for="item in redList" :key="item">{{item}}</span>
        <template v-if='blueList.length>0'>
          <span class="blue" v-for="item in blueList" :key="item">{{item}}</span>
        </template>
        <img src="../assets/images/reflash.png" alt="" @click="shakeAction">
      </div>
      <input type="number" placeholder="请输入手机号码" oninput="if(value.length > 11)value = value.slice(0,11)"
        v-model="mobileNo">
      <!--showPass = false-->
      <div class="btns" v-if="mobileNo.length > 10" @click="checkRegit(mobileNo)">立即领取</div>
      <div class="btn" v-else>立即领取</div>
    </div>
    <div class="number-wraps" v-show="!showPass">
      <h4>选择你的{{name}}号码</h4>
      <p class="qc">第{{qici}}期 周{{week}} {{hs}}开奖</p>
      <p class="tit">还可免费领取<span>{{ notes}}</span>注</p>
      <div class="ball">
        <span v-for="item in redList" :key="item">{{item}}</span>
        <template v-if='blueList.length>0'>
          <span class="blue" v-for="item in blueList" :key="item">{{item}}</span>
        </template>
        <img src="../assets/images/reflash.png" alt="" @click="shakeAction">
      </div>
      <input type="number" placeholder="请输入手机号码" oninput="if(value.length > 11)value = value.slice(0,11)"
        v-model="mobileNo">
      <input type="password" placeholder="请设置登录密码" v-model="password">
      <input type="number" placeholder="请输入验证码" v-model="codes" oninput="if(value.length > 6)value = value.slice(0,6)">
      <div class="btns" @click="regMob">立即领取</div>
      <div class="yzm" @click="sendImgYzm" id='sendYzmbtn'>获取验证码</div>
    </div>

    <div class="people-wrap">
      <h4>正在抢号</h4>
      <div class="box">当前<span v-for="items in peopleNum" :key="items.index">{{items}}</span>人</div>
    </div>
    <div class="tips-wrap">
      <h4>活动规则</h4>
      <p> 1、本活动限连连中新注册用户参与
      </p>
      <p> 2、未注册用户参与本活动，将视为自愿注册连连中
      </p>
      <p> 3、只有在本活动页面参与才可以享受免费双色球优惠
      </p>
      <p> 4、本活动限时限量领取，先到先得，请尽快领取
      </p>
      <p> 5、同一IP，设备，手机号只能领取一次，如领取不成功，请切换4G网络尝试
      </p>
      <p> 6、严禁通过作弊手段刷取活动奖励，一经发现，将收回奖励并封号处理
      </p>
      <p> 7、活动所有解释权归连连中所有
      </p>
    </div>

    <div class="shadow" v-show="showYzm">
      <div class="yzm">
        <img src="../assets/images/close.png" alt="" @click="showYzm = false" class="close">
        <input type="text" placeholder="请输入图形验证码" oninput="if(value.length > 4)value = value.slice(0,4)" v-model="txm">
        <img :src="yzmImgUrl" alt="" class="ymg" @click="changeYzm">
        <div class="btn" @click="yzmBtn">确定</div>
      </div>
    </div>
    <div class="shadow" v-show="showLogin">
      <div class="toast-box">
        <p>领取成功</p>
        <p>登录激活后立即生效</p>
        <img src="../assets/images/close2.png" alt="" @click="showLogin = false">
        <div class="btn" @click='btnAction'>确定</div>
      </div>
    </div>
    <div class="shadow" v-show="showApp">
      <div class="toast-box">
        <p>没抢到?</p>
        <p>288红包等你来拿</p>
        <img src="../assets/images/close2.png" alt="" @click="showApp = false">
        <div class="btn" @click='btnAction'>打开APP</div>
      </div>
    </div>
    <div class="shadow" v-show='showEwm'>
      <div class="toast-box-ewm">
        <p>请用手机浏览器扫描下载APP</p>
        <img src="../assets/images/close2.png" class="close" alt="" @click="showEwm = false">
        <input id="text" type="hidden" value="" />
        <div class="ewm" id="qrcode">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import QRCode  from "qrcodejs2"
  import {
    login,
    mobregzym,
    checkRegit,
    mobregByGift,
    ssq
  } from '@/request/api';
  import { createNumArr,btnAction,notesNum,getWeek  } from '@/assets/js/layout';
  import {
    get
  } from '@/request/http';

  import {
    Toast
  } from 'mint-ui';
  export default {
    data() {
      return {
        wrapClass:{
          "index-wrap":true,
        },
        redList: [],
        blueList: [],
        redNumMax: 33,
        redNumMin:'1',
        redNumSize: 6,
        blueNumMax: 16,
        blueNumSize: 1,
        password:'',
        mobileNo: '',
        codes: '',
        notes:'',
        peopleNum:'',
        showYzm: false,
        showLogin: false,
        showApp: false,
        showPass: true,
        yzmImgUrl: '',
        txm: '',
        sendYzmbtn: true,
        num: 60,
        timer: null,
        qici: '',
        hs: '',
        week: '',
        comeFrom: '',
        cFrom: '',
        ballList: [],
        link: 'http://h.5988cai.com/lottery/#/type',
        showEwm:false,
        isPC:false,
        gid:'01',
        urlData:{
          'ios':'https://apps.apple.com/cn/app/%E6%8E%8C%E4%B8%8A%E5%AE%9D-%E4%BE%BF%E6%8D%B7%E5%B0%8F%E5%8A%A9%E6%89%8B/id1474061339?tdsourcetag=s_pctim_aiomsg',
          'and':'http://down.688cai.com/az_xlaicai/lianlianz.apk'
        },
        name:'双色球',
        gidList:'01,50,07',//彩种投注值小于9时，要为09;
      };
    },
    components: { QRCode },
    created() {
      let gid = this.$route.params.gid;
      let data = this.lottery[gid];
      //初始化参数
      this.redNumMax = data.redNumMax
      this.redNumSize = data.redNumSize
      this.blueNumMax = data.blueNumMax
      this.blueNumSize = data.blueNumSize
      this.redNumMin = data.redNumMin
      this.gid = gid
      this.name = data.name
      this.link = 'http://h.5988cai.com/lottery/#/type/'+gid;
      this.urlData = this.DownUrl;

      let className = 'index-wrap-'+gid;
      this.wrapClass[className] = true
      this.notes = notesNum().notes;
      this.peopleNum = notesNum().peopleNum;
      this.changeYzm();
      this.getSsq(gid);
      this.shakeAction();
      let ua = navigator.userAgent.toLowerCase();
      //ios终端
      let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //ios
        this.comeFrom = 136482;
        this.cFrom = 'ios';
      } else {
        //android
        this.comeFrom = 136481;
        this.cFrom = 'android';
      }
      if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { //移动端
        this.isPC = false;
      }else{
        this.isPC = true;
        //二维码
        this.$nextTick (function () {
          this.qrcode();
        })
      }
    },
    mounted() {},
    methods: {
      qrcode () {
          let that = this;
          let qrcode = new QRCode('qrcode', {
              width: 250,
              height: 250,        // 高度
              text:  this.link,   // 二维码内容
          })
      },
      shakeAction(){
        let red = '',buld = '',ballList = '';
        red = createNumArr([],this.redNumSize,this.redNumMin,this.redNumMax);
        if (this.gidList.indexOf(this.gid)>-1 ){
          red = red.map((item)=>{return item<10?('0'+item):item})
        }
        if (this.blueNumSize>0) {
          buld = createNumArr([],this.blueNumSize,1,this.blueNumMax);
          buld = buld.map((item)=>{return item<10?('0'+item):item})
          ballList = red.join(',') + '|' + buld.join(",") + ':1:1';
        }else{
          ballList = red.join(',') +':1:1';
        }
        
        this.redList = red;
        this.blueList = buld;
        this.ballList = ballList;
      },
      btnAction(){
        btnAction(this.urlData)
      },
      getSsq(gid) {
        var url = "/cpdata/game/"+gid+"/s.json?rnd=" + Math.random();
        get(url).then(res => {
          this.qici = res.period.row[0].pid;
          this.hs = res.period.row[0].at.slice(10,16);
          this.week = getWeek(res.period.row[0].at.slice(0, 11).split('-'))
        })
      },
      sendImgYzm() {
        const t = this;
        const umob = t.mobileNo;
        if (!t.sendYzmbtn) {
          return false
        }
        if (umob == '') {
          Toast("请输入手机号码");
          return false;
        }
        if (!(/^1[345678]\d{9}$/.test(umob))) {
          Toast("手机号码有误，请重填");
          return false;
        }
        t.changeYzm();
        t.showYzm = true;
      },
      yzmBtn() {
        const t = this;
        const txm = t.txm,
          mobileNo = t.mobileNo;
        let num = t.num,
          timer = t.timer;
        if (txm.length != 4) {
          Toast('请输入正确的验证码')
          return false;
        }
        mobregzym({
          "flag": 1,
          'yzm': txm,
          'comeFrom': t.comeFrom,
          'cfrom': t.cFrom,
          'mobileNo': mobileNo
        }).then(res => {
          const code = res.data.Resp.code;
          const desc = res.data.Resp.desc;
          if (code == 0) {
            t.sendYzmbtn = false;
            t.txm = '';
            t.showYzm = false;
            $('#sendYzmbtn').css({
              'backgroundColor': '#e0e0e0',
              'color': '#666'
            })
            timer = setInterval(function () {
              num--;
              $('#sendYzmbtn').html(num + 's重新发送');
              if (num == 0) {
                t.sendYzmbtn = true;
                clearInterval(timer);
                $('#sendYzmbtn').html('获取验证码');
                $('#sendYzmbtn').css({
                  'backgroundColor': '#fa8080',
                  'color': '#fff'
                });
              }
            }, 1000);
          } else {
            Toast(desc);
          }
        })
      },
      regMob() {
        const t = this;
        const umob = t.mobileNo,
          yzm = t.codes,
          upwd = t.password;
        if (umob == '') {
          Toast("请输入手机号码");
          return false;
        }
        if (!(/^1[345678]\d{9}$/.test(umob))) {
          Toast("手机号码有误，请重填");
          return false;
        }
        if(!(/^[a-zA-Z0-9]{6,20}$/.test(upwd))){
          Toast('请设置您的登陆密码,6-20个字符,只能含有数字和字母');
          return false;
        }
        mobregByGift({
          'mobileNo': umob,
          'yzm': yzm,
          'comeFrom': this.comeFrom,
          'codes': this.ballList,
          'gid': this.gid,
          'cfrom': this.cFrom,
          // 'fid':'free',
          'pwd':upwd,
        }).then(v => {
          const code = v.data.Resp.code,
            desc = v.data.Resp.desc;
          if (code == 0) {
            t.showPass = true;
            t.mobileNo = '';
            t.codes = '';
            clearInterval(t.timer);
            if (t.isPC) {
              t.showEwm = true;
            }else{
              t.showLogin = true;
            }
          } else {
            Toast(desc);
          }
        })
      },
      changeYzm() {
        this.txm = '';
        this.yzmImgUrl = this.keyUrl+"/rand.phpx?rnd=" + Math.random();
      },
      checkRegit(val) {
        checkRegit({
          'mobileNo': val,
          'comeFrom': this.comeFrom,
          'gid':this.gid,
          'cfrom': this.cFrom
        }).then((v) => {
          let code = v.data.Resp.falg;
          if (code == 1) { //已注册
            this.showApp = true;
          } else {
            this.showPass = false;
          }
        })
      }
    },
  };

</script>

<style lang='scss' scoped>
@import '../assets/css/lottye.scss';
</style>
