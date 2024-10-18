let h1 = {a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN }
var a1=[ 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN];
var v1="sss";
var z1 = null;
var n1=Number.NaN;

function deepCopy(h1) {
  if(Array.isArray(h1)) {
    let arr = []
    for(let i=0; i < h1.length;i++) {
      arr[i] = deepCopy(h1[i])
    }
    return arr
  } else if(typeof h1 === 'object' && h1 !== null) {
      let h2 = {}
    for(let key in h1) {
      h2[key] = deepCopy(h1[key])
    } 
    return h2
  } else {
    return h1
  }
  }
let h2 = deepCopy(h1)
console.log(h2)

//----TEST-----------------//
function test(h1,h2){
  let done = 0
  let errors = 0
  function count(name, condition){
    if(condition) {
      console.log(`Тест(${name}): Прошел`)
      done++
    } else {
       console.log(`Тест(${name}): НЕ ПРОШЕЛ`)
       errors++
    }
  }
{  
    var h2 = deepCopy(h1)
    count('h1===h2', !(h1 === h2));
    count('h1.a===h2.a', h1.a === h2.a);
    count('h1.b===h2.b', !(h1.b === h2.b));
    count('h1.b.b1===h2.b.b1', h1.b.b1 === h2.b.b1);
    count('h1.c===h2.c', !(h1.c === h2.c));
    count('h1.c[0]===h2.c[0]', h1.c[0] === h2.c[0]);
    count('h1.d===h2.d', h1.d === h2.d);
    count('h1.e===h2.e', h1.e === h2.e);
    count('isNaN(h2.f)', isNaN(h2.f));
    count('h2.c instanceof Array', h2.c instanceof Array);
  }

  {    
    var a2 = deepCopy(a1);
    count('a1===a2', !(a1 === a2));
    count('typeof(a2)===typeof(a1)', typeof(a2) === typeof(a1));
    count('a1[0]===a2[0]', a1[0] === a2[0]);
    count('a1[1]===a2[1]', !(a1[1] === a2[1]));
    count('a1[1].b1===a2[1].b1', a1[1].b1 === a2[1].b1);
    count('a1[2]===a2[2]', !(a1[2] === a2[2]));
    count('a1[2][0]===a2[2][0]', a1[2][0] === a2[2][0]);
    count('a1[3]===a2[3]', a1[3] === a2[3]);
    count('a1[4]===a2[4]', a1[4] === a2[4]);
    count('isNaN(a2[5])', isNaN(a2[5]));
    count('a2[2] instanceof Array', a2[2] instanceof Array);
  }

  {    
    var v2 = deepCopy(v1);
    count('v1===v2', v1 === v2);
    count('typeof(v2)===typeof(v1)', typeof(v2) === typeof(v1));
  }

  {    
    var z2 = deepCopy(z1);
    count('z1===z2', z1 === z2);
    count('typeof(z2)===typeof(z1)', typeof(z2) === typeof(z1));
  }

  {    
    var n2 = deepCopy(n1);
    count('typeof(n2)===typeof(n1)', typeof(n2) === typeof(n1));
    count('isNaN(n2)', isNaN(n2));
  }
  
  console.log(`тестов пройдено: ${done}`)
 console.error(`тестов НЕ ПРОЙДЕНО: ${errors}`)
}

test(h1,h2)
