// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    // 表达式
    expression: '',
    // 目前为止的计算结果
    curResult: 0,
    // 当前的操作符（加减乘除）
    curOperator: '+',
    // 正在输入的内容
    curInputStr: '',
  },

  //
  //
  //

  equal() {
    const { curResult, curInputStr } = this.data;
    const result = curResult + Number(curInputStr);

    this.setData({
      curResult: result,
      curInputStr: String(result),
    })
  },

  reset() {
    this.setData({
      curInputStr: "0",
      curResult: 0,
      curOperator: '+'
    })
  },

  //
  //  回调函数
  //
  
  onClick(event: any)  {
    console.log(event);
    const value = event.target.id;
    switch (value) {
      case '+':
      case '-':
      case 'x':
      case '/':
        this.equal();
        this.setData({
          curOperator: value,
        });
        break;
      case '=':
        this.equal();
        break;
      default:
        console.log('value ->', value);
        this.setData({
          curInputStr: this.data.curInputStr + value
        })
    }
  },
  onLoad() {
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
})
