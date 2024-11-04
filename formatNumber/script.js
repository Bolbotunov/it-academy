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

function test() {
    console.log(`тест 1532.2, '# ###.###': ${formatNumber(1532.2, '# ###.###') === '1 532.200' ? 'пройден' : 'не пройден'}`);
    console.log(`тест 12345.678, '# ### ###.##': ${formatNumber(12345.678, '# ### ###.##') === '12 345.68' ? 'пройден' : 'не пройден'}`);
    console.log(`тест 123456789, '# ### ###.##': ${formatNumber(123456789, '# ### ###.##') === '123 456 789.00' ? 'пройден' : 'не пройден'}`);
    console.log(`тест 9876543210.5, '# ### ###.###': ${formatNumber(9876543210.5, '# ### ###.###') === '9876 543 210.500' ? 'пройден' : 'не пройден'}`);
    console.log(`тест 0.123, '# ### ###.#####': ${formatNumber(0.123, '# ### ###.#####') === '0.12300' ? 'пройден' : 'не пройден'}`);
    console.log(`тест 1234, '# ### ###': ${formatNumber(1234, '#### ###') === '1 234' ? 'пройден' : 'не пройден'}`);
    console.log(`тест 456.789, '# ###.##': ${formatNumber(456.789, '# ###.##') === '456.79' ? 'пройден' : 'не пройден'}`);
    console.log(`тест 12, '# ###.##': ${formatNumber(12, '# ###.##') === '12.00' ? 'пройден' : 'не пройден'}`);
    console.log(`тест 0.00045, '# ###.#####': ${formatNumber(0.00045, '# ###.#####') === '0.00045' ? 'пройден' : 'не пройден'}`);
    console.log(`тест 1.5, '# ###.##': ${formatNumber(1.5, '# ###.##') === '1.50' ? 'пройден' : 'не пройден'}`);
    console.log(`тест 9876543210.5, '### ####.##': ${formatNumber(9876543210.5, '### ####.##') === '987654 3210.50' ? 'пройден' : 'не пройден'}`);
    console.log(`тест 9876543210.5, '# #### ##.#####': ${formatNumber(9876543210.5, '# #### ##.#####') === '9876 5432 10.50000' ? 'пройден' : 'не пройден'}`);
    console.log(`тест 9876.844, '# #.##': ${formatNumber(9876.844, '# #.##') === '987 6.84' ? 'пройден' : 'не пройден'}`);
    }
