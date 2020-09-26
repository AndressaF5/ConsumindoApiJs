const key = "$2a$10$DY/YV2q35MKB2/tAz2lr/uRL8zRCFkCfjpAzTy.ywnGfmZ249DmuW";

async function buscaApiHarryPotter(){
  let url = "https://www.potterapi.com/v1/characters" + "?key=" + key;

  let response = await fetch(url);
  let data = await response.json();

  console.log(data[50]);
}

async function buscarNomeOuApelido(){
  
  var campoNome = document.getElementById("campoNome").value;

  var campoCapitalize = campoNome.charAt(0).toUpperCase() + campoNome.slice(1);

  let url = "https://www.potterapi.com/v1/characters"+ "?key=" + key;

  let response = await fetch(url);

  let data = await response.json();

  for(let i = 0; i < data.length; i++){

    if(((data[i].name).startsWith(campoCapitalize)) == true){
      console.log(data[i]);
      pesquisarImagem(data[i].name);
    }
  }
}

async function pesquisarImagem(nome){
  
  var campoCapitalize = nome.charAt(0).toUpperCase() + nome.slice(1);
  
  let url = "http://hp-api.herokuapp.com/api/characters"
  
  let response = await fetch(url);
  
  let data = await response.json();
  
  for(let i = 0; i < data.length; i++){
  
    if(((data[i].name).startsWith(campoCapitalize)) == true){
      console.log(data[i].dateOfBirth);
      console.log(data[i].actor);
      console.log(data[i].house);
      console.log(data[i].patronus);
      var img = document.getElementById("imagemPersonagem");
      img.src = data[i].image;
    }
  }
}

/*async function buscarNome(){
  let url = "http://hp-api.herokuapp.com/api/characters";
  
  let response = await fetch(url);
  let data = response.json();

  console.log(data);
}*/