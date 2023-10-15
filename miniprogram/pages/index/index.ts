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
      curInputStr: "0",
      curResult: 0,
      curOperator: '+'
    })
  },

  /** 算术运算符 */
  isArithOperator(char: string) {
    return ['+', '-', '*', '/'].includes(char);
  },

  pushCurInputStr() {
    const { curInputStr, stack } = this.data;
    // 有可能是负数，所以加个括号
    stack.push(`(${curInputStr})`);
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
})
