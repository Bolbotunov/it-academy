var H1 = { a: 5, b: { b1: 6, b2: 7 } };
var H2 = { b: { b1: 6, b2: 7 }, a: 5 };
var H3 = { a: 5, b: { b1: 6 } };
var H4 = { a: 5, b: { b1: 66, b2: 7 } };
var H5 = { a: 5, b: { b1: 6, b2: 7, b3: 8 } };
var H6 = { a: null, b: undefined, c: Number.NaN };
var H7 = { c: Number.NaN, b: undefined, a: null };
var H8 = { a: 5, b: 6 };
var H9 = { c: 5, d: 6 };
var H10 = { a: 5 };
var A1 = [5, 7];
var A2 = [5, 5, 7];
var A3 = [5, 8, 7];

function deepComp(H1, H2) {
  if (typeof H1 !== typeof H2) { return false }
  if (Number.isNaN(H1) && Number.isNaN(H2)) { return true }
 if (typeof H1 !== 'object' || H1 == null || typeof H2 !== 'object' || H2 == null) { return H1 === H2 }
  if (Array.isArray(H1) !== Array.isArray(H2)) { return false }
  if (Array.isArray(H1)) {
    if (H1.length !== H2.length) { return false }
    for (let i=0; i < H1.length; i++) {
      if (!deepComp(H1[i],H2[i])) {
        return false
      }
    }
    return true
  }
  let keysH1 = Object.keys(H1)
  let keysH2 = Object.keys(H2)
  if (keysH1.length !== keysH2.length) { return false }
  for (key of keysH1) {
    if (!(key in H2) || !deepComp(H1[key], H2[key])) {  
      return false
    }
  }
  return true
}

function test() {
console.log(`тест (H1 равно H2): ${deepComp(H1, H2) ? 'пройден' : 'не пройден'}`); // true
console.log(`тест (H1 не равно H3): ${!deepComp(H1, H3) ? 'пройден' : 'не пройден'}`); // false
console.log(`тест (H1 не равно H4): ${!deepComp(H1, H4) ? 'пройден' : 'не пройден'}`); // false
console.log(`тест (H1 не равно H5): ${!deepComp(H1, H5) ? 'пройден' : 'не пройден'}`); // false
console.log(`тест (H6 равно H7): ${deepComp(H6, H7) ? 'пройден' : 'не пройден'}`); // true
console.log(`тест (H8 не равно H9): ${!deepComp(H8, H9) ? 'пройден' : 'не пройден'}`); // false
console.log(`тест (H8 не равно H10): ${!deepComp(H8, H10) ? 'пройден' : 'не пройден'}`); // false
console.log(`тест (null не равно H10): ${!deepComp(null, H10) ? 'пройден' : 'не пройден'}`); // false
console.log(`тест (H10 не равно null): ${!deepComp(H10, null) ? 'пройден' : 'не пройден'}`); // false
console.log(`тест (null равно null): ${deepComp(null, null) ? 'пройден' : 'не пройден'}`); // true
console.log(`тест (null не равно undefined): ${!deepComp(null, undefined) ? 'пройден' : 'не пройден'}`); // false
console.log(`тест (5 не равно '5'): ${!deepComp(5, "5") ? 'пройден' : 'не пройден'}`); // false
console.log(`тест (5 не равно H1): ${!deepComp(5, H1) ? 'пройден' : 'не пройден'}`); // false
console.log(`тест (A1 не равно H1): ${!deepComp(A1, H1) ? 'пройден' : 'не пройден'}`); // false
console.log(`тест (A2 не равно A3): ${!deepComp(A2, A3) ? 'пройден' : 'не пройден'}`); // false
console.log(`тест ({ a: 5, b: undefined } не равно { a: 5, c: undefined }): ${!deepComp({ a: 5, b: undefined }, { a: 5, c: undefined }) ? 'пройден' : 'не пройден'}`); // false
console.log(`тест ([5, 7] не равно { 0: 5, 1: 7 }): ${!deepComp([5, 7], { 0: 5, 1: 7 }) ? 'пройден' : 'не пройден'}`); // false
console.log(`тест ([5, 7] не равно { 0: 5, 1: 7, length: 2 }): ${!deepComp([5, 7], { 0: 5, 1: 7, length: 2 }) ? 'пройден' : 'не пройден'}`); // false
console.log(`тест ('aaa' не равно 'bbb'): ${!deepComp("aaa", "bbb") ? 'пройден' : 'не пройден'}`); // false
console.log(`тест (Number.NaN равно Number.NaN): ${deepComp(Number.NaN, Number.NaN) ? 'пройден' : 'не пройден'}`); // true
}

test()
