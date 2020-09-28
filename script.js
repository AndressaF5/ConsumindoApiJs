const key = "$2a$10$DY/YV2q35MKB2/tAz2lr/uRL8zRCFkCfjpAzTy.ywnGfmZ249DmuW";

function criarHtml(){

  var divPrincipal = document.querySelector("#divPrincipal");

  var br = document.createElement("br");
  var br1 = document.createElement("br");
  var br2 = document.createElement("br");

  var inputPersonagem = document.createElement("input");
  inputPersonagem.type = "radio";
  inputPersonagem.id = "inputPersonagem";

  var labelPersonagem = document.createElement("label");
  labelPersonagem.textContent = "Personagem";

  var inputHouse = document.createElement("input");
  inputHouse.type = "radio";
  inputHouse.id = "inputHouse";

  var labelHouse = document.createElement("input");
  labelHouse.textContent = "House";

  var labelHouse = document.createElement("label");
  labelHouse.textContent = "House";

  var labelPesquisa = document.createElement("label");
  labelPesquisa.textContent = "Digite alguma coisa: ";

  var inputCampo = document.createElement("input");
  inputCampo.type = "text";
  inputCampo.id = "inputCampo";

  var pErro = document.createElement("p");
  pErro.id = "pErro";

  var button = document.createElement("button");
  button.innerText = "Buscar";
  button.addEventListener("click", function() { verificarRadio() });

  divPrincipal.appendChild(inputPersonagem);
  divPrincipal.appendChild(labelPersonagem);
  divPrincipal.appendChild(br);
  divPrincipal.appendChild(inputHouse);
  divPrincipal.appendChild(labelHouse);
  divPrincipal.appendChild(br1);
  divPrincipal.appendChild(labelPesquisa);
  divPrincipal.appendChild(inputCampo);
  divPrincipal.appendChild(br2);
  divPrincipal.appendChild(button);
  divPrincipal.appendChild(pErro);

  criarDivDetalhes();

  divPrincipal.style.textAlign = "center";
}

function verificarRadio(){
  if(inputPersonagem.checked){
    buscarPersonagem(inputCampo.value);
    inputPersonagem.checked = false;

  }else if(inputHouse.checked){
    pesquisarHouse(inputCampo.value);
    inputHouse.checked = false;

  }else{
    pErro.textContent = "Selecione algum botão";
  }
}

function criarDivDetalhes(){
  var divDetalhes = document.createElement("div");
  divDetalhes.id = "divDetalhes";
  
  var pNomePersonagem = document.createElement("p");
  pNomePersonagem.id = "pNomePersonagem"

  var pRole = document.createElement("p");
  pRole.id = "pRole";

  var pSchool = document.createElement("p");
  pSchool.id = "pSchool";

  var pDateOfBirth = document.createElement("p");
  pDateOfBirth.id = "pDateOfBirth";

  var pActor = document.createElement("p");
  pActor.id = "pActor";

  var imgPersonagem = document.createElement("img");
  imgPersonagem.id = "imgPersonagem";

  divPrincipal.appendChild(divDetalhes);

  divDetalhes.appendChild(pNomePersonagem);
  divDetalhes.appendChild(pRole);
  divDetalhes.appendChild(pSchool);
  divDetalhes.appendChild(pDateOfBirth);
  divDetalhes.appendChild(pActor);

  divDetalhes.appendChild(imgPersonagem);
}

async function pesquisarHouse(house){
  let campoCapitalize = house.charAt(0).toUpperCase() + house.slice(1);

  let url = "https://www.potterapi.com/v1/houses"+ "?key=" + key;
  let response = await fetch(url);
  let data = await response.json();

  var ol = document.createElement("ol");
  ol.id = "ol";

  divDetalhes.appendChild(ol);

  for(let item in data){
    //console.log(data[item].members);
    for(let i = 0; i <= (data[item].members.length); i++){
      //console.log(data[item].members[i]);
      var dadosPersonagem = await buscarPersonagemPorId(data[item].members[i]);
      var li = document.createElement("li");
      pNomePersonagem.textContent = "Personagem: " + dadosPersonagem.name;
      pRole.textContent = "Função: " + dadosPersonagem.role;
      pSchool.textContent = "Escola: " + dadosPersonagem.school;
      // Corrigir erro do li
      li.appendChild(pNomePersonagem);
      li.appendChild(pRole);
      li.appendChild(pSchool);
      ol.appendChild(li);

    }
  }
}

async function buscarPersonagemPorId(id){
  let url = "https://www.potterapi.com/v1/characters/" + id + "?key=" + key;
  let response = await fetch(url);
  let data = await response.json();

  return {
    name : data.name,
    role : data.role,
    school : data.school,
  };

}

async function buscarPersonagem(valorPesquisa){
  
  let campoCapitalize = valorPesquisa.charAt(0).toUpperCase() + valorPesquisa.slice(1);

  //TODO: Na primeira api ele retorna apenas o primeiro, na outra ele retorna todos quando busco Weasley

  let url = "https://www.potterapi.com/v1/characters"+ "?key=" + key;
  let response = await fetch(url);
  let data = await response.json();
  
  //TODO: Corrigir erro do nome do Ron
  
  for(let i = 0; i < data.length; i++){
    if(((data[i].name).includes(campoCapitalize))){
      var dados = {
        personagem : data[i].name,
        role : data[i].role,
        school : data[i].school
      }

      var outrosDados = await pesquisarOutrosDados(data[i].name);

      dadosPersonagem(dados, outrosDados);
    }
  }
}

function dadosPersonagem(objDados, objOutrosDados){
  pNomePersonagem.textContent = "Personagem: " + objDados.personagem;
  pRole.textContent = "Função: " + objDados.role;
  pSchool.textContent = "Escola: " + objDados.school;
  // adicionar o bloodStatus e orderOfThePhoenix
  pDateOfBirth.textContent = "Data de Nascimento: " + objOutrosDados.dateOfBirth;
  pActor.textContent = "Ator/Atriz: " + objOutrosDados.actor;
  imgPersonagem.src = objOutrosDados.img;
}

async function pesquisarOutrosDados(nome){
  
  // descobrir como procurar o personagem pela url e mandar direto

  let url = "http://hp-api.herokuapp.com/api/characters";
  let response = await fetch(url);
  let data = await response.json();

  for(let i = 0; i < data.length; i++){
  
    if(((data[i].name).includes(nome))){

      return {
        actor : data[i].actor,
        dateOfBirth : data[i].dateOfBirth,
        img : data[i].image
      };

    }
  }
}

criarHtml();