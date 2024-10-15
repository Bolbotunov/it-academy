function randomDiap(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

function mood(colorsCount) {
  const colors = [ '', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый' ];
  let dict = {}
  if(colorsCount > colors.length - 1) return console.log(`максимальное возможное количество уникальных
    цветов:${colors.length - 1}! -  Вы ввели ${colorsCount}` )
    console.log( 'цветов: ' + colorsCount );
  for ( let i=1; i <= colorsCount; i++ ) {
    const n = randomDiap(1,7);
      if(!dict[n]) {
        dict[n] = colors[n]
        const colorName = dict[n];
        console.log(colorName)
      } else {
        i--
      }
    }
  }
mood(5);
