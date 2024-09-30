const arr = [[5, 7, [4, [2], 8, [1, 3], 2], [9, []], 1, 8]]

function treeSum(arr) {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
     if (typeof arr[i] === 'number') {
      sum += arr[i]
    } else {
      sum += treeSum(arr[i])
    }
  }
  return sum
}

console.log(`результат вызова функции : ${treeSum(arr)}`)
