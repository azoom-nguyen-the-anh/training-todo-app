const TABS = {
  personal: { name: 'Personal', value: 'personal' },
  professional: { name: 'Professional', value: 'professional' },
}

const todo = {
  [TABS.personal.value]: [
    {
      name: 'Work',
      done: true,
    },
    {
      name: 'Work',
      done: false,
    },
    {
      name: 'Work',
      done: false,
    },
    {
      name: 'Work',
      done: true,
    },
    {
      name: 'Work',
      done: false,
    }
  ],
  [TABS.professional.value]: [
    {
      name: 'Work',
      done: true,
    },
    {
      name: 'Work',
      done: false,
    },
    {
      name: 'Work',
      done: false,
    },
    {
      name: 'Work',
      done: true,
    },
    {
      name: 'Work',
      done: false,
    }
  ],
}

let activeTab = TABS.personal.value

document.addEventListener('DOMContentLoaded', () => {
  addEventClickTab()
  addEventForForm()
  addEventAddTodo()
})

const addEventForForm = () => {
  const input = document.querySelector('.main > .container > .form > .input')
  const btn = document.querySelector('.main > .container > .form > .btn')

  input.onkeyup = (event) => {
    if(!event.target.value) {
      btn.setAttribute('disabled', true)
    } else {
      btn.removeAttribute('disabled')
    }
  }
}

const checkNameTodo = (value) => {
  const check = todo[activeTab].find(item => item.name.toLocaleLowerCase() === value.toLocaleLowerCase())

  return !!check
}

const addEventAddTodo = () => {
  const input = document.querySelector('.main > .container > .form > .input')
  const btn = document.querySelector('.main > .container > .form > .btn')

  btn.onclick = () => {
    const value = input.value

    if(!value) return

    const isCheckNameTodo = checkNameTodo(value)

    if (isCheckNameTodo) {
      input.value = ''
      btn.setAttribute('disabled', true)
      return 
    }

    const newTodo = {
      name: value,
      done: false,
    }

    todo[activeTab].push(newTodo)

    renderTodoList(activeTab)

    input.value = ''
    btn.setAttribute('disabled', true)
  }
}

const addEventClickTab = () => {
  const items = document.querySelectorAll('.card > .tab > .item')

  renderTodoList(TABS.personal.value)

  items.forEach(item => item.onclick = (event) => {
    const tab = event.target.dataset.tab

    removeClassActive(items)

    event.target.classList.add('active')

    activeTab = tab

    renderTodoList(tab)
  })
}

const removeClassActive = (items) => items.forEach(item => item.classList.remove('active'))

const createItemElement = (item, index) => {
  const itemElement = document.createElement('div')

  itemElement.classList.add('item')

  if(item.done) {
    itemElement.classList.add('checked') 
  }

  const iconStatus = item.done ? '<img src="icons/checked.svg" class="icon" />' : '<img src="icons/unchecked.svg" class="icon" />'

  itemElement.innerHTML = `
    ${iconStatus}
    <div class="text">${ TABS[activeTab].name } ${ item.name } No. ${ index + 1 }</div>
    <img src="icons/remove.svg" class="remove" />
  `

  return itemElement
}

const renderTodoList = (type) => {
  const todoList = todo[type]
  const currentTodoList = document.querySelector('.main > .container > .list > .content')

  const newTodoList = document.createElement('div')
  newTodoList.classList.add('list')

  todoList.forEach((item, index) => {
    const itemElement = createItemElement(item, index)

    newTodoList.appendChild(itemElement)
  })

  currentTodoList.innerHTML = newTodoList.innerHTML

  addEventRemoveItem()

  addEventDoneTodo()

  addEventClearDone()
}

const addEventRemoveItem = () => {
  const items = document.querySelectorAll('.main > .container > .list > .content > .item')
  const texts = document.querySelectorAll('.main > .container > .list > .content > .item > .text')
  const buttons = document.querySelectorAll('.main > .container > .list > .content > .item > .remove')
  
  buttons.forEach((item, index) => {
    item.onclick = () => {
      const todoName = texts[index].innerText
      const isConfirm = confirm(`${todoName} will be deleted. Are you sure?`)

      if(!isConfirm) return

      todo[activeTab].splice(index, 1)

      items[index].remove()
    }
  })
}

const addEventDoneTodo = () => {
  const items = document.querySelectorAll('.main > .container > .list > .content > .item')
  const icons = document.querySelectorAll('.main > .container > .list > .content > .item > .icon')
  const texts = document.querySelectorAll('.main > .container > .list > .content > .item > .text')

  items.forEach((item, index) => {
    icons[index].onclick = () => {
      todo[activeTab][index].done = !todo[activeTab][index].done

      item.classList.toggle('checked')

      const icon = todo[activeTab][index].done ? 'icons/checked.svg' : 'icons/unchecked.svg'

      icons[index].src = icon
    }

    texts[index].onclick = () => {
      todo[activeTab][index].done = !todo[activeTab][index].done

      item.classList.toggle('checked')

      const icon = todo[activeTab][index].done ? 'icons/checked.svg' : 'icons/unchecked.svg'

      icons[index].src = icon
    }
  })
}

const addEventClearDone = () => {
  const button = document.querySelector('.main > .container > .list > .clear')

  button.onclick = () => {
    todo[activeTab] = todo[activeTab].filter(item => !item.done)

    renderTodoList(activeTab)
  }
}