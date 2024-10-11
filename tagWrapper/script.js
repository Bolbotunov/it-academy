function buildWrapper(a) {
  const dict = {
   '<': '&lt',
   '>': '&gt',
 '\"' :'&quot',
  "'" :'&prime',
  '&' :'&amp'
}
  function deleteSymbols(str) {
    let text = ''
     for(let i = 0; i < str.length; i++) {
      text += dict[str[i]] || str[i]
    }
    return text
  }
  return function(b,c) {
    let clearText = deleteSymbols(b)
    let attr=''
     for(let key in c) {
       let attrValue = c[key]
       let attrValueClear = deleteSymbols(attrValue)
       attr +=` ${key}='${attrValueClear}'`
     }
    return `<${a}${attr}>${clearText}</${a}>`
  }
}

let wrapP = buildWrapper('P');
let wrapH1 = buildWrapper('H1');

console.log(wrapP("Однажды в студёную зимнюю пору"));
console.log(wrapP("Однажды в студёную зимнюю пору", { lang: "ru" }));
console.log(wrapP("Однажды в <студёную> зимнюю пору"));
console.log(wrapH1("СТИХИ", { align: "center", title: "M&M's"}));
