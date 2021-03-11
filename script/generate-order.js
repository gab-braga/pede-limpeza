
let shopping_cart = []

const phone = "558899951396"
let link = "https://api.whatsapp.com/send?phone=558899951396&text=Ola%20Gabriel%0AQuero%20fazer%20meu%20pedido"

function generate_order() {

        //const name = elementName.innerText
        //const price = parseFloat(elementPrice.innerText.replace(",", "."))
        //const item = {name: name, price: price, quantity: quantity}
    
}

function validate_form() {

}

function take_order() {

}

function generate_whatsapp_link() {

}

function add_to_shopping_cart(event) {
    const elementBox = event.currentTarget
    const elementQuantity = elementBox.children[0]
    const elementBack = elementBox.children[1]

    const quantity = parseInt(elementQuantity.innerText) + 1
    if(quantity <= 20) {
        elementQuantity.innerText = quantity
        elementQuantity.style.display = "block"
        elementBack.style.display = "block"
    }
}

function remove_to_shopping_cart(event) {
    event.stopPropagation()
    const elementBack = event.currentTarget
    const elementBox = elementBack.parentElement
    const elementQuantity = elementBox.children[0]

    const quantity = parseInt(elementQuantity.innerText) - 1
    if(quantity > 0) {
        elementQuantity.innerText = quantity
    }
    else {
        elementQuantity.innerText = 0
        elementQuantity.style.display = "none"
        elementBack.style.display = "none"
    }
}