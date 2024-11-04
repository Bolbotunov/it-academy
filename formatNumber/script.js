function formatNumber(num, format) {
    let [integerPart, decimalPartNum] = num.toString().split('.')
    let [integerPartSharp, decimalPartSharp] = format.split('.')
    let integerPartWithSpaces = ''
    let result = ''
    let decimalPartNumLength
    let decimalPartSharpLength
    let integerPartIndex = integerPart.length - 1

      for (let i = 0; i <= integerPartSharp.length - 1; i++) {
        if(integerPartSharp[integerPartSharp.length - 1 - i] === ' ' && integerPartIndex >= 0) {
            integerPartWithSpaces = ' ' + integerPartWithSpaces
        } else if (integerPartIndex >= 0) {
            integerPartWithSpaces = integerPart[integerPartIndex] + integerPartWithSpaces
            integerPartIndex--
        }

    }
    if(integerPartIndex >= 0) {
        integerPartWithSpaces = integerPart.slice(0, integerPartIndex + 1) + integerPartWithSpaces.trim()
    }
      if((!decimalPartNum || decimalPartNum) && !decimalPartSharp) { return integerPartWithSpaces }
      if(!decimalPartNum && decimalPartSharp) {
        decimalPartNum = ''.padEnd(decimalPartSharp.length,'0')
      } else {
        decimalPartNumLength = decimalPartNum.length
        decimalPartSharpLength = decimalPartSharp.length
      }
      if(decimalPartNumLength > decimalPartSharpLength) {
        decimalPartNum = Math.round(Number(decimalPartNum) / ( 10 ** (decimalPartNumLength - decimalPartSharpLength)))
      } else if (decimalPartNumLength < decimalPartSharpLength) {
        decimalPartNum = decimalPartNum.padEnd(decimalPartSharpLength,'0')
      }
      result = integerPartWithSpaces + '.' + decimalPartNum
      return result
  }
