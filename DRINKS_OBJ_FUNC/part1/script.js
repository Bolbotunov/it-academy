function ObjStorageFunc() {
  let dict = {}
  this.addValue = function(key,value) {
    dict[key] = value
  }
  this.getValue = function(key){
    return dict[key]
  }
  this.deleteValue = function(key){
    return key in dict ? (delete dict[key] && true) : false
  }
  this.getKeys = function() {
    let keysArr = []
    for(key in dict) {
      keysArr.push(key)
    }
    return keysArr
  }
}

let storage = new ObjStorageFunc()

storage.addValue('name', 'oleg')
storage.addValue('age', 34)

console.log(storage.getValue('age'))
console.log(storage.getValue('name'))
console.log(storage.deleteValue('name'))
console.log(storage.deleteValue('name'))
console.log(storage.getKeys())
