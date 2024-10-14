function buildWrapper(tag) {
   const dict = {
   '<': '&lt;',
   '>': '&gt;',
 '\"' :'&quot;',
  "'" :'&prime;',
  '&' :'&amp;',
}
  function deleteSymbols(str) {
    let text = ''
     for(let i = 0; i < str.length; i++) {
      text += dict[str[i]] || str[i]
    }
    return text
  }
  return function(createdText,attributes) {
    let clearText = deleteSymbols(createdText)
    let attr=''
     for(let key in attributes) {
       let attrValue = attributes[key]
       let attrValueClear = deleteSymbols(attrValue)
       attr +=` ${key}='${attrValueClear}'`
     }
    return `<${tag}${attr}>${clearText}</${tag}>`
  }
}

let wrapP = buildWrapper('P');
let wrapH1 = buildWrapper('H1');

console.log(wrapP("Однажды в студёную зимнюю пору"));
console.log(wrapP("Однажды в студёную зимнюю пору", { lang: "ru" }));
console.log(wrapP("Однажды в <студёную> зимнюю пору"));
console.log(wrapH1("СТИХИ", { align: "center", title: "M&M's"}));

