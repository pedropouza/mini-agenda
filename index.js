const buttonSection = document.getElementById('buttonSection')

let countTask = 0   // Somando cada LI para não terem mesmo ID
let itemCount = 0   // Contagem do total de LI presente

// Adicionando tarefa (criando LI, Input e Botoes)
const addTask = document.getElementById('addTask')
addTask.addEventListener('click', function() {
  const taskList = document.getElementById('taskList')
  const newLi = document.createElement('li')
  newLi.id = `task-${countTask}`
  newLi.className = 'rowLi'

  const newInput = document.createElement('input')
  newInput.type = 'text'
  newInput.id = `taskInput-${countTask}`
  newInput.className = 'taskInput'

  itemCount++
  const removeTask = document.createElement('button')
  removeTask.type = 'button'
  removeTask.innerText = 'Cancelar'
  removeTask.className = 'removeTask'
  removeTask.addEventListener('click', function(){
    newLi.remove()
    itemCount--
    if (itemCount == 0) {
      buttonSection.style.display = 'none'
    }
  })

  buttonSection.style.display = 'flex'

  countTask++
  newLi.append(newInput, removeTask)
  taskList.append(newLi)
})


// Faz com que limpe e exclua os Botoes os LI presentes
function clearLi() {
  const allLi = document.querySelectorAll('.rowLi')
  allLi.forEach(function(row){
    row.remove()
  })
  buttonSection.style.display = 'none'
  itemCount = 0
  const selecDate = document.getElementById('selectDate')
  selecDate.value = ""
}
// Botão de Limpar
const resetButton = document.getElementById('resetButton')
resetButton.addEventListener('click', clearLi)


// Botão de Salvar
let countListSection = 0

const saveButton = document.getElementById('saveButton')
saveButton.addEventListener('click', function (ev) {
  ev.preventDefault()
  // Pegando informações da data selecionada
  const selectDate = document.getElementById('selectDate').value;
  if (!selectDate) {
    alert('Escolha uma data para continuar!')
  } else {
    const date = new Date(selectDate);
    const weekDates = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const weekDate = weekDates[date.getDay()];  // Diz o Dia da Semana
    const formatDate = new Intl.DateTimeFormat('pt-BR').format(date); // Formata o dia para padrão BR
    
    // Criando as tags HTML
    //    Bloco de Section inteiro
    const listSection = document.getElementById('listSection')
    const listSectionAll = document.createElement('section')
    listSectionAll.id = `listSection-${countListSection}`
    listSectionAll.className = 'listSectionAll'
    countListSection++
  
    //    DIV onde ficará o dia da semana e a data
    const dateTag = document.createElement('div')
    dateTag.className = 'dateHeader'
    const pWeek = document.createElement('p')
    pWeek.textContent = weekDate
    const pDate = document.createElement('p')
    pDate.textContent = formatDate
    dateTag.append(pWeek, pDate)
  
    //    UL onde ficará a lista
    const ul = document.createElement('ul')
    ul.id = `list-${countListSection}`
    const allInput = document.querySelectorAll('.taskInput')
    allInput.forEach(function(row){
      const li = document.createElement('li')
      if (row.value) {
        li.textContent = row.value
        ul.append(li)
      }
    })
  
    //    Botao de Remover da lista
    const removeBtn = document.createElement('button')
    removeBtn.className = 'removeBtn'
    removeBtn.type = 'button'
    removeBtn.textContent = 'Remover'
    removeBtn.addEventListener('click', function() {
      listSectionAll.remove()
    })
  
    listSectionAll.append(dateTag, ul, removeBtn)
    listSection.append(listSectionAll)
    clearLi();
  }
  
})

