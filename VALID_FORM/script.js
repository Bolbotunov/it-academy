let form = document.forms.form
let error = document.querySelector('.error')
let errorMessage 
let dev = form.elements.dev
let sitename = form.elements.sitename
let siteurl = form.elements.siteurl
let date = form.elements.date
let visitors = form.elements.visitors
let email = form.elements.email
let division = form.elements.division
let payment = form.elements.payment
let votes = form.elements.votes
let description = form.elements.description

function getError(formItem, message) {
  errorMessage = formItem.querySelector('.error-message')
  formItem.classList.add('get-error')
  errorMessage.innerHTML = message
}

function removeError(formItem) {
  errorMessage = formItem.querySelector('.error-message')
  formItem.classList.remove('get-error')
}

dev.addEventListener('blur', function() {
  let errorPath = dev.parentElement.parentElement.querySelector('.error')
  let message = 'поле не должно быть пустым'
  if(dev.value.length === 0) {
    getError(errorPath, message)
    shakeForm()
  } else {
    dev.dataset.notValid = false
    removeError(errorPath)
  }
})

sitename.addEventListener('blur', function() {
  let errorPath = sitename.parentElement.parentElement.querySelector('.error')
  let message = 'поле не должно быть пустым'
  if(sitename.value.length === 0) {
    getError(errorPath, message)
    shakeForm()
  } else {
    sitename.dataset.notValid = false
    removeError(errorPath)
  }
})

siteurl.addEventListener('blur', function() {
  let errorPath = siteurl.parentElement.parentElement.querySelector('.error')
  let message = 'поле не должно быть пустым'
  if(siteurl.value.length === 0) {
    getError(errorPath, message)
    shakeForm()
  } else {
    siteurl.dataset.notValid = false
    removeError(errorPath)
  }
})


date.addEventListener('input', function() {
  let errorPath = date.parentElement.parentElement.querySelector('.error')
  let message = 'выберите дату'
  if(!date.value) {
    getError(errorPath, message)
    shakeForm()
  } else {
    date.dataset.notValid = false
    removeError(errorPath)
  }
})

visitors.addEventListener('blur', function() {
  let errorPath = visitors.parentElement.parentElement.querySelector('.error')
  let message = 'введите количество посетителей'
  if(!visitors.value) {
    getError(errorPath, message)
    shakeForm()
  } else {
    visitors.dataset.notValid = false
    removeError(errorPath)
  }
})

email.addEventListener('blur', function() {
  let errorPath = email.parentElement.parentElement.querySelector('.error')
  let message = 'введите количество посетителей'
  if(email.value.length === 0) {
    getError(errorPath, message)
    shakeForm()
  } else {
    email.dataset.notValid = false
    removeError(errorPath)
  }
})

division.addEventListener('change', function() {
  let errorPath = division.parentElement.parentElement.querySelector('.error')
  let message = 'категория "здоровье" закрыта'
  if(division.value === '1') {
    getError(errorPath, message)
    shakeForm()
  } else {
    division.dataset.notValid = false
    removeError(errorPath)
  }
})

payment.forEach((item)=>{
  item.addEventListener('change', function() {
    let errorPath = payment[0].closest('.form__item').querySelector('.error')
      let message = 'бесплатное размещение недоступно'
      if (payment.value === '1' || payment.value === '') {
        getError(errorPath, message)
        shakeForm()
      } else {
        removeError(errorPath)
      }
    })
  })

votes.addEventListener('change', function() {
    let errorPath = votes.parentElement.parentElement.querySelector('.error')
    let message = 'нужно разрешить отзывы'
    if(!votes.checked) {
      getError(errorPath, message)
      shakeForm()
    } else {
      votes.dataset.notValid = false
      removeError(errorPath)
    }
  })

description.addEventListener('blur', function() {
    let errorPath = description.parentElement.parentElement.querySelector('.error')
    let message = 'поле нужно заполнить'
    if(description.value === '') {
      getError(errorPath, message)
      shakeForm()
    } else {
      description.dataset.notValid = false
      removeError(errorPath)
    }
  })

form.addEventListener('submit', validForm);


function validForm(event) {
  if (dev.value.length === 0) {
    let errorPath = dev.parentElement.parentElement.querySelector('.error')
    dev.dataset.notValid = true
    let message = 'поле не должно быть пустым'
    getError(errorPath, message)
    event.preventDefault();
    }
  if (sitename.value.length === 0) {
    let errorPath = sitename.parentElement.parentElement.querySelector('.error')
    sitename.dataset.notValid = true
    let message = 'поле не должно быть пустым'
    getError(errorPath, message)
    event.preventDefault();
    }
  if (siteurl.value.length === 0) {
    let errorPath = siteurl.parentElement.parentElement.querySelector('.error')
    let message = 'поле не должно быть пустым'
    siteurl.dataset.notValid = true
    getError(errorPath, message)
    event.preventDefault();
    }
  if (!date.value) {
    let errorPath = date.parentElement.parentElement.querySelector('.error')
    let message = 'выберите дату'
    date.dataset.notValid = true
    getError(errorPath, message)
    event.preventDefault();
    }
  if (!visitors.value) {
    let errorPath = visitors.parentElement.parentElement.querySelector('.error')
    let message = 'введите количество посетителей'
    visitors.dataset.notValid = true
    getError(errorPath, message)
    event.preventDefault();
    }
  if (email.value.length === 0) {
      let errorPath = email.parentElement.parentElement.querySelector('.error')
      let message = 'поле не должно быть пустым'
      email.dataset.notValid = true
      getError(errorPath, message)
      event.preventDefault();
    }
  if (division.value === '1') {
    let errorPath = division.parentElement.parentElement.querySelector('.error')
    let message = 'категория "здоровье" закрыта'
    division.dataset.notValid = true
    getError(errorPath, message)
    event.preventDefault();
    }
  if (payment.value === '1' || payment.value === '') {
    let errorPath = payment[0].closest('.form__item').querySelector('.error')
    let message = 'пункт не выбран'
    let isSelected = Array.from(payment).some(radio => radio.checked)
    if (!isSelected) {
      getError(errorPath, message)
    }
    event.preventDefault();
  }
  if (!votes.checked) {
    let errorPath = votes.parentElement.parentElement.querySelector('.error')
    let message = 'нужно разрешить отзывы'
    votes.dataset.notValid = true
      getError(errorPath, message)
      event.preventDefault();
    }
    if (description.value === '') {
    let errorPath = description.parentElement.parentElement.querySelector('.error')
    let message = 'поле нужно заполнить'
    description.dataset.notValid = true
    getError(errorPath, message)
    event.preventDefault();
    }
    let firstNotValid = document.querySelectorAll('[data-not-valid="true"]');
    firstNotValid[0].focus()
}

function shakeForm() {
  form.classList.add('shake')
  setTimeout(() => {
    form.classList.remove('shake')
  }, 200);
}
