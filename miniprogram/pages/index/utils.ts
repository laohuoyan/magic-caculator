
export function formatWithComma(numStr: string) {
  return numStr.replace(/(\d)(?=(\d{3})+$)/g, function($1) {
    return $1 + ",";
  });
}