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
    // 上一次输入的字符
    prevChar: '',
  },

  //
  //
  //

  equal() {
    const { curResult, curInputStr, curOperator } = this.data;

    const operand1 = curResult;
    const operand2 = Number(curInputStr);

    let result;
    switch (curOperator) {
      case '+':
        result = operand1 + operand2;
        break;
      case '-':
        result = operand1 - operand2;
        break;
      case '*':
        result = operand1 * operand2;
        break;
      case '/':
        result = operand1 / operand2;
        break;
    }
    
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

  /** 算术运算符 */
  isArithOperator(char: string) {
    return ['+', '-', '*', '/'].includes(char);
  },

  //
  //  回调函数
  //
  
  onClick(event: any)  {
    console.log(event);
    const value = event.target.id;
    const { prevChar, curInputStr } = this.data;

    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
        this.equal();
        this.setData({
          curOperator: value,
        });
        break;
      case '%':
        console.log('% do nothing')
        break;
      case '=':
        this.equal();
        break;
      default:
        this.setData({
          curInputStr: (curInputStr === '0' || this.isArithOperator(prevChar)) ? value : this.data.curInputStr + value
        })
    }

    this.setData({
      prevChar: value
    });
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
