// () => {} - jeito de criar uma funcao anonima, uma maneira de criar uma funcao sem precisar colocar a palavra function


//O codigo de baixo serve para dizer que quando escolhemos alguma opcao da tag option ele irá fazer algo no console no caso printar, mas ai o valor do option tem que ser numerico
// document.querySelector("select[name=uf]") //aqui estamos indo lá para a tag do nome=uf
//         .addEventListener("change",() => {
//             console.log("Mudei !!")
//         } )


//.then( (res) => { return res.json () } ) é a mesma coisa que = .then( res => res.json () )

//catch = serve para quando o fetch voltar com nada
//fetch = serve é a promessa, de ir no site que colocamos e voltar com alguma coisa que nesse caso volta com um json
//then
//a += 1   = aqui seria mesma coisa que a = a + 1 so que de forma curta
// temos que colcoar ` e nao ' ou ""


function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json () ) //uma funcao anonima que esta retornando um valor de maneira curta
    .then( states => {

        for(state of states){ //esse for que dizer que a variavel state vai na variavel states pegar um estado printar e depois pegar outro estado e printar novamente
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome} </option>` //AAAAAA com essa linha conseguimos colocar na tag option todo os estados !!!!! AAAAA
        }

    } )
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    
    
    //console.log(event.target.value) //assim pegamos os valores de cada estado !!!
    const ufValue = event.target.value //mesma coisa no de cima

    const indexOfSelectedState = event.target.selectedIndex //pegando as posicoes - os indices
    stateInput.value = event.target.options[indexOfSelectedState].text //posicao selecionada dentro do estado que escolhemos, aqui seria o indice
    //se a gente colcoar a posicao 0 ele ia pegar apenas essa posicao mas como estamos passando uma varaivel onde pega todas as posicoes

    const ufSelect = document.querySelector("select[name=uf]")

    //https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios //url de pegar as cidades de SP por exemplo
    //${ufValue} //colocamos essa varaivel no lugar do {} que fica na URL
                                                                            //precisamos colocar a variavel que pega os valores nessa posicao do url !!
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios` //onde pegamos os dados em json
    
    //alem disso colocamos uma frase para aparecer no campo da cidade apos o disable ficar TRUE
    citySelect.innerHTML = " <option value>Selecione a Cidade</option>  "  //serve para limpar o campo de cidade
    citySelect.disabled = true //aqui ele irá desabilitar e habilitar bem rapido

    fetch(url) //todo esse codigo mesma coisa irá pegar o os dados e transformar em json
    .then( res => res.json () ) //uma funcao anonima que esta retornando um valor de maneira curta
    .then( cities => {
        

        //OBS ! fizemos a alteracao do city.id para city.nome para que não apareca o ID na URL da pagina
        for(city of cities){ //esse for que dizer que a variavel state vai na variavel states pegar um estado printar e depois pegar outro estado e printar novamente
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome} </option>` //AAAAAA com essa linha conseguimos colocar na tag option todo os estados !!!!! AAAAA
            //aqui estamos adicionando as cidades no campo
        }

        citySelect.disabled = false //retirar o disable que colocamos la no html, quando o option do estado for selecionado

    } )

}


document.querySelector("select[name=uf]") //aqui estamos indo lá para a tag do nome=uf
        .addEventListener("change", getCities ) //ouvidor de eventos, quando ocorrer algum evento faca algo
        //evento que irá ouvir é a troca chanve

//Items de coleta !!!
const itemsToCollect = document.querySelectorAll(".items-grid li") //Focando / olhando a tag LI

for (const item of itemsToCollect){
    item.addEventListener("click",handleSelectedItem) //o evento que esse irá ouvir é o click
    
}

// function handleSelectedItem(event){
//     console.log(event.target) //assim irá printar no console quando clicamos em algum item
// }

// function handleSelectedItem(event){
//     console.log(event.target.dataset.id) //SHOW ! com essa linha pegamos os numeros que colocamos no ID lá no html

// }

const collectedItems = document.querySelector("input[name=items]")

//Logica para adicionar e remover um indice de uma array


let selectedItems = []

function handleSelectedItem(event){

    const itemLi = event.target
    //toggle = selecionar ou remover - o li esta selecionado? se sim ele remove, se nao ele seleciona
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id
    
    


//aqui é referente quando for fazer o REQUEST sera enviado alem dos dados do formulario o ID de cada item

//Aqui ele esta indo la na variavel selectedItems pegar um item e joga dentro dessa funcao abaixo
//apos colocar na funcao, ele sera colcoado na varaivel itemFound e verificar se é o mesmo valor que esta na variavel itemId
const alreadySelected = selectedItems.findIndex( item => { //Pra cada item irá realizar essa funcao ! o metodo find serve para procurar os items que tem dentro de um array
    const itemFound = item == itemId  //Aqui diz se o indice um é igual ao indice um, fazendo validacao de ver se ele esta realmente selecionado ou nao
    return itemFound 

} )

//verificar se ha items selecionados, se sim pegar os items selecionador e tirar da selecao
//se nao estiver selecionado , atualizar o campo com os items selecionados

if (alreadySelected >= 0){
    //tirando umindice do array
    const filteredItems = selectedItems.filter(item => {
        const itemIsDifferent = item != itemId
        return itemIsDifferent
    })

    selectedItems = filteredItems
} else {
    selectedItems.push(itemId)
}

// console.log(selectedItems) //isso serve para mostrar no console

collectedItems.value = selectedItems //assim irá aparecer os indices dentro do input do hidden que esta no html

}

//fim da logica