let jsbk = {};
jsbk = {
  getRandom:function(min,max){
    if (min == 0) 
      return parseInt(Math.random() * max);
    else
      return Math.floor( Math.random() * max + 1);
    
  },
  sortNum:function(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 1; j < arr.length - i; j++) {
        if (arr[i] > arr[i + j]) {
          let temp = arr[i]
          arr[i] = arr[i + j]
          arr[i + j] = temp
        }
      }
    }
    return arr
  },
  createNumArr:function(numArr, numSize,numMin,numMax) {
    // 清空已有数组
    let that = jsbk;
    numArr.splice(0, numArr.length)
    while (numArr.length < numSize) {
      let num = that.getRandom(numMin,numMax)
      // 当生成的号码与原有号码不重复时，才加入到数组中
      if (numArr.indexOf(num) === -1) {
        numArr.push(num)
      }
    }
    return that.sortNum(numArr)
  },
  btnAction(data) {
    let ua = navigator.userAgent.toLowerCase();
    //ios终端
    let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      //ios
      window.location.href = data.ios;
    } else {
      //android
      window.location.href = data.and
    }
  },
  notesNum:function() {
      let d = new Date();
      let hh = d.getHours();
      let curTimestamp =  (new Date()).valueOf(); //当前时间戳
      let timestampDiff = parseInt((curTimestamp % (1000 * 60 * 60)) / (1000 * 60)) + hh * 60; // 参数时间戳与当前时间戳相差秒数
      let peopleNum = 10000 + timestampDiff*25;
      peopleNum = peopleNum.toString();
      let notes = 10000 - timestampDiff*6;
      return {peopleNum,notes}
  },
  //获取周几
  getWeek(data){//格式
    const arys1 =  data;
    let week = '';
    var ssdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
    week = String(ssdate.getDay()).replace("0", "日").replace("1", "一").replace("2", "二").replace("3",
            "三").replace("4", "四").replace("5", "五").replace("6", "六"); //就是你要的星期几
    return week;
  },
}
export const getRandom = jsbk.getRandom;
export const sortNum = jsbk.sortNum;
export const createNumArr = jsbk.createNumArr;
export const btnAction = jsbk.btnAction;
export const notesNum = jsbk.notesNum;
export const getWeek = jsbk.getWeek;

