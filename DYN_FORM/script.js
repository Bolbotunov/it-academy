const formDef2=
[
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {caption:'Зарегистрироваться',kind:'submit'},
];

const formDef1=
[
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'dropdown',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
  {label:'Разрешить отзывы:',kind:'check',name:'votes'},
  {label:'Описание сайта:',kind:'memo',name:'description'},
  {caption:'Опубликовать',kind:'submit'},
];

function createForm(formDef1) {
  const body = document.body
  let form = document.createElement('form')
    for (let i = 0; i < formDef1.length; i++) {
      let div = document.createElement('div')
      let label = document.createElement('label')
      label.textContent = formDef1[i].label
        if(formDef1[i].kind === 'dropdown') {
          let input = document.createElement('select')
            formDef1[i].variants.forEach((item) => {
              let option = document.createElement('option');
              option.value = item.value
              option.textContent = item.text;
              input.appendChild(option);
              div.appendChild(label)
              div.appendChild(input)
            })
        }
        else if (formDef1[i].kind === 'radio') {
          div.appendChild(label)
          formDef1[i].variants.forEach((item) => {
          let radioLabel = document.createElement('label')
          let radioInput = document.createElement('input')
          radioInput.type = 'radio'
          radioInput.value = item.value
          radioInput.name = formDef1[i].name
          radioLabel.textContent = item.text
          radioLabel.appendChild(radioInput)
          div.appendChild(radioLabel)
            })
        } else if (formDef1[i].kind === 'check') {
          input = document.createElement('input')
          input.type = 'checkbox'
          div.appendChild(label)
          div.appendChild(input)

        } else if (formDef1[i].kind === 'memo') {
          input = document.createElement('textarea')
          input.name = formDef1[i].name
          div.appendChild(label)
          div.appendChild(input)
        } else if (formDef1[i].kind === 'submit') {
          input = document.createElement('input')
          input.type = formDef1[i].kind
          input.value = formDef1[i].caption
          div.appendChild(label)
          div.appendChild(input)
          
        } else {
          input = document.createElement('input')
          input.type = formDef1[i].kind
          input.name = formDef1[i].name
          div.appendChild(label)
          div.appendChild(input)
        }
        let styles = {width:'350px', padding:'5px', display:'flex', justifyContent: 'space-between'}
        for (let key in styles) {
          div.style[key] = styles[key]
        }
        form.style.marginBottom = '55px'
        form.appendChild(div)
        body.appendChild(form)
    }
}
createForm(formDef1)
createForm(formDef2)
