

const buttonSearch = document.querySelector("#page-home main a") //selecionando a tag a

const modal = document.querySelector("#modal") //selecionando todo o modal

const close = document.querySelector("#modal .header a") //selecionando o icone do x

buttonSearch.addEventListener("click",() => { //quando ocorrer o evento do clica remover a classe hide
    modal.classList.remove("hide") //removendo a classe hide
})

close.addEventListener("click", () => { //quando ocorrer o click
    modal.classList.add("hide") //irá adicionar a classe hide
})