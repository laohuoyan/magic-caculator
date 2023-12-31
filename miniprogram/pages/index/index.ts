// index.ts

import calculate from './calculate';
import { formatWithComma } from './utils';

Page({
  data: {
    stack: [] as string[],
    // 目前为止的计算结果
    curResult: 0,
    // 当前的操作符（加减乘除）
    curOperator: '+',
    // 正在输入的内容
    curInputStr: '0',
    formattedInputStr: '0',
    // 上一次输入的字符
    prevChar: '',
    // 触摸对象
    startTouch: null,
  },

  //
  //
  //

  /**
   *  TODO: formattedInputStr 应该通过监听属性变化更新
   */
  setCurInputStr(str: string) {
      this.setData({
          curInputStr: str,
          formattedInputStr: formatWithComma(str)
      })
  },

  /**
   * 计算当前结果
   */
  calc() {
    const { stack } = this.data;
    const result = calculate(stack.join(' '));
    console.log(stack.join(' '));
    this.setData({
      stack: [],
      curResult: result,
    })
    this.setCurInputStr(String(result))
  },

  /**
   * AC 重置
   */
  reset() {
    this.setData({
      curResult: 0,
      curOperator: '+'
    })
    this.setCurInputStr('0')
  },

  /** 算术运算符 */
  isArithOperator(char: string) {
    return ['+', '-', '*', '/'].includes(char);
  },

  pushCurInputStr() {
    const { curInputStr, stack } = this.data;
    // 有可能是负数，所以加个括号
    stack.push(curInputStr);
    // stack.push(`(${curInputStr})`);
  },

  // 删除最后一个字符
  deleteLastChar() {
    const { curInputStr } = this.data;
    const len = curInputStr.length;
    if (len <= 1) {
      this.setCurInputStr('0');
      return;
    }

    this.setCurInputStr(
      curInputStr.slice(0, len - 1)
    );
  },

  //
  //  回调函数
  //
  
  onClick(event: any)  {
    const value = event.target.id;
    const { prevChar, curInputStr, stack } = this.data;

    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
        this.pushCurInputStr();
        stack.push(value);
        this.setData({
          curOperator: value,
        });
        break;
      case '+/-':
        if (curInputStr.startsWith('-')) {
          this.setData({
            curInputStr: curInputStr.substr(1),
          })
        } else if(curInputStr !== '0') {
          this.setData({
            curInputStr: `-${curInputStr}`,
          })
        }
        break;
      case '%':
        this.setCurInputStr(String(Number(curInputStr) * 0.01))
        break;
      case '=':
        this.pushCurInputStr();
        this.calc();
        break;
      default:
        this.setCurInputStr(
            (curInputStr === '0' || this.isArithOperator(prevChar))
                ? value
                : curInputStr + value
        )
    }

    this.setData({
      prevChar: value
    });
  },

  handleTouchStart(evt: any) {
    const touch = evt.touches[0];
    this.setData({
      startTouch: touch
    })
  },

  handleTouchEnd(evt: any) {
    const endTouch = evt.changedTouches[0];
    const { startTouch } = this.data;
    if (!endTouch || !startTouch) return;
    
    // 向右划
    if (endTouch.pageX - (startTouch as any).pageX > 0) {
      this.deleteLastChar();
    }

    this.setData({
      startTouch: undefined,
    });
  }
})
