
export const operationMap = {
  '+': add,
  '-': sub,
  '*': multiple,
  '/': divide
}

export function add(o1: number, o2: number) {
  return o1 + o2;
}

export function sub(o1: number, o2: number) {
  return o1 - o2;
}

export function multiple(o1: number, o2: number) {
  return o1 * o2;
}

export function divide(o1: number, o2: number) {
  return o1 / o2;
}