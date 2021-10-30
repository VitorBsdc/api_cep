//  1. Ler o valor do CEP que foi digitado na <input type="text" id="cep"> index.html
//por exemplo: 04757-000

const cep = document.querySelector("#cep");

//  2. Quando o <input type="text" id="cep"> perder o foco disparamos o evento e
//  o método assíncrono fetch()

cep.addEventListener("blur", (e) => 
{
    //  passamos para a API da ViaCep o CEP sem o "-" ou seja 04757000
    let search = cep.value.replace("-", "") 

    //  cross origin/domain - consultar diferentes servidores
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    //  `viacep.com.br/ws/${search}/json/` é uma template string
    //  `viacep.com.br/ws/${search}/json/` é uma string
    //  para o fetch vamos passar dois parâmetros> 1° URL do serviço, 2° as opções/options
    fetch(`https://viacep.com.br/ws/${search}/json/`, options)

    //  vamos tratar a resposta no formato JSON que representa uma promise/promessa
    .then(response => {
        response.json()
            .then(data => showData(data))
        })
    .catch(e => console.log('Ocorreu algum erro: ' + e))
})

//  3. Vamos ler cada valor retornado da promise e popular nos campos do formulário
const showData = (result) => {
    for(const campo in result){
        if(document.querySelector("#" + campo)){
            document.querySelector("#" + campo).value = result[campo]
        }
    }
}