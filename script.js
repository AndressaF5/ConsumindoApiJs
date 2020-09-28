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

  var ul = document.createElement("ul");
  ul.id = "ul";
  var li = document.createElement("li");

  ul.style.textDecoration = "none";

  divDetalhes.appendChild(ul);

  for(let item in data){
    //console.log(data[item].members);
    for(let i = 0; i <= (data[item].members.length); i++){
      //console.log(data[item].members[i]);
      var dadosPersonagem = await buscarPersonagemPorId(data[item].members[i]);
      var p1 = document.createElement("p");
      p1.textContent = "Personagem: " + dadosPersonagem.name;

      var p2 = document.createElement("p");
      p2.textContent = "Função: " + dadosPersonagem.role;

      var p3 = document.createElement("p");
      p3.textContent = "Escola: " + dadosPersonagem.house;
      // Corrigir erro do li
      li.appendChild(p1);
      li.appendChild(p2);
      li.appendChild(p3);
      ul.appendChild(li);
    }
  }
}

async function buscarPersonagemPorId(id){
  let url = "https://www.potterapi.com/v1/characters/" + id + "?key=" + key;
  let response = await fetch(url);
  let data = await response.json();

  if(data != null){
    return {
      name : data.name,
      role : data.role,
      house : data.house
    };
  }else{
    return {
      name : "Undefined",
      role : "Undefined",
      house : "Undefined"
    };
  }
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
  let li = document.createElement("li");
  li.id = "li";
  
  let p1 = document.createElement("p");
  p1.id = "p1";

  let p2 = document.createElement("p");
  p2.id = "p2";

  let p3 = document.createElement("p");
  p3.id = "p3"

  let p4 = document.createElement("p");
  p4.id = "p4"

  let p5 = document.createElement("p");
  p5.id = "p5"

  let img = document.createElement("img");
  img.id = "img";
  img.style.width = "100px";

  p1.textContent = "Personagem: " + objDados.personagem;
  p2.textContent = "Função: " + objDados.role;
  p3.textContent = "Escola: " + objDados.school;
  p4.textContent =  "Data de Nascimento: " + objOutrosDados.dateOfBirth;
  p5.textContent =  "Ator/Atriz: " + objOutrosDados.actor;
  img.src = objOutrosDados.img;

  divDetalhes.appendChild(li);
  li.appendChild(p1);
  li.appendChild(p2);
  li.appendChild(p3);
  li.appendChild(p4);
  li.appendChild(p5);
  li.appendChild(img);
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

    }else{
      return {
        actor : "Undefined",
        dateOfBirth : "Undefined",
        img : "Undefined"
      };
    }
  }
}

criarHtml();