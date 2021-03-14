

function generate_order() {
    const phone = '558899951396'
    const space = '%20'
    const enter = '%0A'
    let link = `https://api.whatsapp.com/send?phone=${phone}&text=Olá, meu pedido de hoje é:${enter}`

    const items = document.querySelectorAll(".box-info-order table tbody tr")
    for(let i = 0; i < items.length; i++) {
        const quantity = items[i].children[0].innerText
        const description = items[i].children[1].innerText
        let item = `* ${quantity} | ${description}${enter}`
        link += item
    }
    const total = `Total: R$ ${calculate_total()}`
    link += total

    const elementButton = document.querySelector('#button')
    elementButton.href = link
}

function calculate_total() {
    const items = document.querySelectorAll(".box-info-order table tbody tr")
    let total = 0.0
    for(let i = 0; i < items.length; i++) {
        const elementVelue = items[i].children[2]
        const value = parseFloat(elementVelue.innerText.replace("R$ ", ""))
        total += value
    }
    return total
}

function update_table(item) {
    const table = document.querySelector(".box-info-order table")
    const items = document.querySelectorAll(".box-info-order table tbody tr")

    let not_exist_item = true
    for(let i = 0; i < items.length; i++) {
        if(items[i].children[1].innerText === item.description) {
            items[i].children[0].innerHTML = item.quantity
            items[i].children[2].innerHTML = `R$ ${item.value}`
            not_exist_item = false
            if(item.quantity === 0) { 
                items[i].parentNode.removeChild(items[i])
            }
            break
        }
    }
    
    if(not_exist_item) {
        let html = '<tr>'
        html += `<td>${item.quantity}</td>`
        html += `<td>${item.description}</td>`
        html += `<td>R$ ${item.value}</td>`
        html += '</tr>'
        
        table.children[2].innerHTML += html
    }

    table.children[3].children[0].children[1].innerText = `R$ ${calculate_total()}`

    const items_refresh = document.querySelectorAll(".box-info-order table tbody tr")
    if(items_refresh.length === 0) {
        table.parentElement.parentElement.style.display = "none"
    }
    else {
        table.parentElement.parentElement.style.display = "block"
    }
}

function filter(event) {
    const elementOption = event.currentTarget
    const option = elementOption.value
    const items = document.querySelectorAll('.box-info-sample')

    for(let i = 0; i < items.length; i++) {
        if(option === 'default') {
            items[i].parentElement.style.display = "block"
        }
        else if(option === items[i].id) {
            items[i].parentElement.style.display = "block"
        }
        else {
            items[i].parentElement.style.display = "none"
        }
    }
}

function add_to_shopping_cart(event) {
    const elementBox = event.currentTarget
    const elementQuantity = elementBox.children[0]
    const elementBack = elementBox.children[1]
    const elementDescription = elementBox.children[3].children[0]
    const elementValue = elementBox.children[3].children[1].children[0]

    const quantity = parseInt(elementQuantity.innerText) + 1

    if(quantity <= 10) {
        elementQuantity.innerText = quantity
        elementQuantity.style.display = "block"
        elementBack.style.display = "block"

        const description = elementDescription.innerText
        const value = parseFloat(elementValue.innerText.replace(",", "."))

        const item = {quantity: quantity, description: description, value: (value * quantity)}
        update_table(item)
    }
}

function remove_to_shopping_cart(event) {
    event.stopPropagation()
    const elementBack = event.currentTarget
    const elementBox = elementBack.parentElement
    const elementQuantity = elementBox.children[0]
    const elementDescription = elementBox.children[3].children[0]
    const elementValue = elementBox.children[3].children[1].children[0]

    const quantity = parseInt(elementQuantity.innerText) - 1

    if(quantity > 0) {
        elementQuantity.innerText = quantity
    }
    else {
        elementQuantity.innerText = 0
        elementQuantity.style.display = "none"
        elementBack.style.display = "none"
    }

    const description = elementDescription.innerText
    const value = parseFloat(elementValue.innerText.replace(",", "."))

    const item = {quantity: quantity, description: description, value: (value * quantity)}
    update_table(item)
}