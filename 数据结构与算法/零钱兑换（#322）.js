// 递归（自顶向下）
var coinChange = function(coins, amount) {
  if (amount < 1) return 0
  let count = [];
  return _coinChange(coins, amount, count);
};

function _coinChange(coins, amount, count) {
    debugger
  if (amount < 0) return -1;
  if (amount === 0) return 0;
  if (count[amount]) return count[amount];
  let min = amount + 1;
  for (let i = 0; i < coins.length; i++) {
    let last = _coinChange(coins, amount - coins[i], count);
    if (last < 0) continue
    min = Math.min(min, last + 1)
    //   console.log(`amount:${amount}---min:${min}`)
  } 
  count[amount] = min === amount + 1 ? -1 : min
  return count[amount];
}

console.log(coinChange([1, 2, 5], 3));

// // dp（自底向上）
// var coinChange = function(coins, amount) {

// };