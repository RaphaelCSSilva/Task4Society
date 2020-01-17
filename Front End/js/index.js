window.onload = async function () {

  // Fetch para popular as lists de tipo atividade e espaco ao criar atividade

  criarAtividadeBtn.addEventListener("click", popularListsCriarAtividadeModal);

  //Fetch para criar uma atividade

  criaNovaAtividadeBtn.addEventListener("click", criarAtividade);

  // Fetch para login do utilizador
  
  loginBtn.addEventListener("click", login);   

  // Fetch para signup de um utilizador

  signupBtn.addEventListener("click", signup);
  
  //Fetch para logout do utilizador

  logoutBtn.addEventListener("click", logout);

  //Fetch para preencher os detalhes do utilziador

  detalhesUtilizadorBtn.addEventListener("click", preencherDadosUtilizador);

  //Fetch para atualizar as atividades

  refreshAtividades();

  //Funcao para esconder certos botoes dependendo do estado do utilizador (LoggedIn ou nao)
  
  profileBtns();

  //Fetch para guardar dados do utilizador

  //guardarDadosBtn.addEventListener('click', guardarDados);

}

const profileBtns = async () => {
  var id_utilizador = localStorage.getItem('id_utilizador')
  const response = await fetch(`http://localhost:3000/utilizadores/` + id_utilizador)
  const loggedInUtilizador = await response.json()

  if (localStorage.getItem('id_utilizador') !== null) {
    document.getElementById("loginBtnNav").style.display = "none";
    document.getElementById("registe-seBtn").style.display = "none";  
    document.getElementById("welcomeTextHeader").innerHTML = "Bem-vindo " + loggedInUtilizador.nome;
    if (loggedInUtilizador.perfil !== "Administrador") {
      document.getElementById("adminAreaBtn").style.display = "none"; 
      document.getElementById("adminArea").style.display = "none";
    }
  } else {
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("detalhesUtilizadorBtn").style.display = "none";  
    document.getElementById("criarAtividadeBtn").style.display = "none";
    document.getElementById("adminAreaBtn").style.display = "none";
    document.getElementById("inscreverAtividadeBtn").style.display = "none";
    document.getElementById("adminArea").style.display = "none";
  }
}

/* --------------------------------------------------------Grupo Paulo--------------------------------------------------- */
/* --------------------------------------------------------Grupo Paulo--------------------------------------------------- */
function loadEspacosAdmin() {
  var conteudo = document.getElementById("conteudoAdmin")
  var filler = document.getElementById("adminEspacos").innerHTML
  conteudo.innerHTML = filler;
}

function loadPatrocinadoresAdmin() {
  var conteudo = document.getElementById("conteudoAdmin")
  var filler = document.getElementById("adminPatrocinadores").innerHTML
  conteudo.innerHTML = filler;
}

function openSpaceNewModal() {
  $('#newSpaceModal').modal('show')
}

function saveSpace() {
  //chamada fetch para envio dos dados para o servior via POST   
  fetch('http://localhost:3000/API/v1/espacos/espacos/', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      // body: JSON.stringify(data) 
      body: JSON.stringify({
          id_espaco: document.getElementById("newIdespaco").value,
          nome: document.getElementById("newNome").value,
          morada: document.getElementById("newMorada").value,
          localidade: document.getElementById("newLocalidade").value,
          distrito: document.getElementById("newDistrito").value,
          cod_postal: document.getElementById("newCP").value,
          lotacao: document.getElementById("newLotacao").value,
          id_gestor_espaco: document.getElementById("newGestor").value
      })
  }).then(function (response) {
      if (!response.ok) {
          console.log(response); //=> number 100–599     

          if (response.status === 409) {
              alert("Duplicated Id");
          } else {
              throw Error(response.statusText);
          }
      } else {

          alert("Registo com sucesso !");
          location.href = "espacos.html";
          // refreshEspacos(); 
      }
  }).then(function (result) {
      console.log(result);
  }).catch(function (err) {
      alert("erro !!"); console.error(err);
  });
}

/* --------------------------------------------------------Grupo Paulo--------------------------------------------------- */
/* --------------------------------------------------------Grupo Paulo--------------------------------------------------- */


//Funcao para exibir o modal dos detalhes de utilizador
function openUserDetailsModal(){
  $('#userDetailsModal').modal('show')
}

//Funcao para exibir o modal de criar nova atividade
function openCriarAtividadeModal(){
  $('#criarAtividadeModal').modal('show')
}

// Funcao fetch para login
const loginBtn = document.getElementById("loginBtn");

async function login(e) {
  e.preventDefault();
  var data = {
    email:document.getElementById("emailLogin").value,
    password:document.getElementById("passwordLogin").value
  };
  e.reset;
  console.log(data);
  console.log(JSON.stringify(data));
  fetch('http://localhost:3000/signin', {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'include'
  })
    .then(function (response) {
      //console.log(response.headers.get('Set-Cookie'));
      console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(function (err) {
      console.log(err);
    })
    .then(async function (result) {
      if (result) {
        localStorage.setItem("id_utilizador", result.id_utilizador);
        alert("Autenticação feita com sucesso!");
        window.location.replace("/index.html");
      }
      else {
        alert("Os dados que inseriu estão incorretos!");
        console.log(result);
      }
    });
}


// Funcoes para verificacao de registo
function checkPassword(str)
{
  var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  return re.test(str);
}

function checkForm(form)
{
  if(form.usernameNew.value == "") {
    alert("Error: Username cannot be blank!");
    form.username.focus();
    return false;
  }
  re = /^\w+$/;
  if(!re.test(form.username.value)) {
    alert("Error: Username must contain only letters, numbers and underscores!");
    form.username.focus();
    return false;
  }
  if(form.pwd1.value != "" && form.pwd1.value == form.pwd2.value) {
    if(!checkPassword(form.pwd1.value)) {
      alert("The password you have entered is not valid!");
      form.pwd1.focus();
      return false;
    }
  } else {
    alert("Error: Please check that you've entered and confirmed your password!");
    form.pwd1.focus();
    return false;
  }
  return true;
}


//Funcao fetch para signup

const signupBtn = this.document.getElementById('signupBtn');

async function signup(e) {
  e.preventDefault();
  var data = {
    username: document.getElementById("usernameNew").value,
    nome: document.getElementById("nomeNew").value,
    email: document.getElementById("emailNew").value,
    password: document.getElementById("passwordNew").value
  };
  e.reset;
  fetch('http://localhost:3000/signup', {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'include'
  })
    .then(function (response) {
      //console.log(response.headers.get('Set-Cookie'));
      console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(function (err) {
      console.log(err);
    })
    .then(async function (result) {
      if (result) {
        localStorage.setItem("id_utilizador", result.id_utilizador);
        alert("Conta criada com sucesso!");
        window.location.replace("/");
      }
      else {
        alert("Os dados que inseriu estão incorretos!");
        console.log(result);
      }
    });
}

//Funcao fetch para logout

const logoutBtn = this.document.getElementById('logoutBtn');
  
async function logout(e) {
  e.preventDefault();
  e.reset;
  fetch('http://localhost:3000/logout')
    .then(function (response) {
      //console.log(response.headers.get('Set-Cookie'));
      console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(function (err) {
      console.log(err);
    })
    .then(async function (result) {
      if (result) {
        localStorage.clear();
        alert("Cookies apagados com sucesso!");
        window.location.replace("/index.html");
      }
      else {
        alert("Os dados que inseriu estão incorretos!");
        console.log(result);
      }
    });
}

//Funcao fetch para preencher dados do utilizador

const detalhesUtilizadorBtn = document.getElementById("detalhesUtilizadorBtn");

async function preencherDadosUtilizador() {

  const id_utilizador = localStorage.getItem('id_utilizador');
  fetch('http://localhost:3000/utilizadores/' + id_utilizador)
    .then(function(response) {
      //console.log(response.headers.get('Set-Cookie'));
      console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(function(err) {
      console.log(err);
    })
    .then(async function(result) {
      if (result) {
          document.getElementById('loggedInUsername').value = result.username;
          document.getElementById('loggedInNome').value = result.nome;
          document.getElementById('loggedInEmail').value = result.email;
          document.getElementById('loggedInTelefone').value = result.telefone;
          document.getElementById('loggedInMorada').value = result.morada;
          document.getElementById('loggedInLocalidade').value = result.localidade;
          document.getElementById('loggedInDistrito').value = result.distrito;
          document.getElementById('loggedInCP').value = result.cod_postal;
      } else {
        console.log(result);
      }
    });
}

//Funcao fetch para atualizar o painel das atividades



const refreshAtividades = async () => {
  const fillPainelAtividades = document.getElementById("painelAtividades");
  const fillPortfolioAtividades = document.getElementById("portfolioAtividadesModais");
  let listAtividadestxt = "";
  let portfolioAtividadesTxt = "";
  
  fetch("http://localhost:3000/atividades")
    .then(function(response) {
      //console.log(response.headers.get('Set-Cookie'));
      console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(function(err) {
      console.log(err);
    })
    .then(async function(result) {
      if (result) {
          for (const atividade of result) {

              var id_atividade = atividade.id_atividade;
              var id_espaco = atividade.id_espaco;
              var id_tipo_atividade = atividade.id_tipo_atividade;

              const responseEspacos = await fetch(`http://localhost:3000/espacos/` + id_espaco);
              const espaco = await responseEspacos.json();

              const responseReserva = await fetch(`http://localhost:3000/reservas/espaco/` + id_espaco + '/atividade/' + id_atividade);
              const reserva = await responseReserva.json();

              const responseTipo = await fetch(`http://localhost:3000/tipos_atividades/` + id_tipo_atividade);
              const tipo = await responseTipo.json();

              console.log("--------------------------------------------")
          console.log(atividade.imagem)




            listAtividadestxt += "<div class='col-md-4 col-sm-6 portfolio-item'> <a class='portfolio-link' data-toggle='modal' href='#portfolioModal" + atividade.id_atividade +"'> <div class='portfolio-hover'> <div class='portfolio-hover-content'> </div> </div> <img class='img-fluid' src='"+ atividade.imagem +"' alt='Imagem nao encontrada!'> </a> <div class='portfolio-caption'> <h4>" + atividade.nome + "</h4> <p class='text-muted'>" + espaco.nome + "</p> </div> </div>";
              
            portfolioAtividadesTxt += "<div class='portfolio-modal modal fade' id='portfolioModal" + atividade.id_atividade + "' tabindex='-1' role='dialog' aria-hidden='true'> <div class='modal-dialog'> <div class='modal-content'> <div class='container'> <div class='row'> <div class='col-lg-12 mx-auto'> <div class='modal-body'> <h2 class='text-uppercase'>" + atividade.nome + "</h2> <p class='item-intro text-muted'>Tipo: " + tipo.nome + "</p><img class='img-fluid d-block mx-auto' src='"+atividade.imagem+"' alt='Imagem nao encontrada!'> <div class='row'> <div class='col-lg-6'> <ul class='list-inline'> <h3 class='text-uppercase'>Atividade</h3> <li>Data: " + reserva.dataHora + "</li><li>Hora: " + reserva.dataHora + "</li><li>Custo: " + atividade.valor + "€</li><li>Participantes: " + atividade.num_participantes + "</li></ul> </div><div class='col-lg-6'> <ul class='list-inline'> <h3 class='text-uppercase'>Espaço</h3> <li>Nome: " + espaco.nome + "</li><li>Morada: " + espaco.morada + "</li><li>Localidade: " + espaco.localidade + "</li><li>Distrito: " + espaco.distrito + "</li></ul> </div></div></div><div class='modal-footer'> <button class='btn btn-secondary w-50' data-dismiss='modal' type='button'>Fechar</button> <button id='inscreverAtividadeBtn' class='btn btn-primary w-50' type='button' onclick=''>Inscrever</button> </div></div></div></div></div></div></div>";

            
          }
          fillPainelAtividades.innerHTML = listAtividadestxt;
          fillPortfolioAtividades.innerHTML = portfolioAtividadesTxt;
          
      } else {
        //alert("Os dados que inseriu estão incorretos!");
        console.log(result);
      }
    });
}


//Funcao para validar o tipo de ficheiro como imagem

function validateImagem(){
  var fileName = document.getElementById("imagemNovaAtividade").value;
  var idxDot = fileName.lastIndexOf(".") + 1;
  var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
  if (extFile=="png" || extFile=="jpg" || extFile=="jpeg"){
      //Ok, nao precisa executar nada.
  }else{
      alert("Apenas ficheiros tipo .png .jpg ou .jpeg são aceites!");
      document.getElementById("imagemNovaAtividade").value = "";
  }   
}

/* //Funcao fetch para alterar dados do utilizador

const guardarDadosBtn = this.document.getElementById('guardarDadosBtn');

const guardarDados = async (e) => {
  e.preventDefault();
  
  var id_utilizador = localStorage.getItem('id_utilizador')
  const response = await fetch(`http://localhost:3000/utilizadores/` + id_utilizador)
  const utilizador = await response.json()

  var data = {
    username: document.getElementById("loggedInUsername").value,
    nome: document.getElementById("loggedInNome").value,
    email: document.getElementById("loggedInEmail").value,
    //password: document.getElementById("loggedInPassword").value || ,
    telefone: document.getElementById("loggedInTelefone").value || utilizador.telefone,
    morada: document.getElementById("loggedInMorada").value || utilizador.morada,
    localidade: document.getElementById("loggedInLocalidade").value || utilizador.localidade,
    distrito: document.getElementById("loggedInDistrito").value || utilizador.distrito,
    cod_postal: document.getElementById("loggedInCP").value || utilizador.cod_postal
  };
  console.log(data);
  e.reset;
   fetch('http://localhost:3000/signup', {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'include'
  })
    .then(function (response) {
      //console.log(response.headers.get('Set-Cookie'));
      console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(function (err) {
      console.log(err);
    })
    .then(async function (result) {
      if (result) {
        localStorage.setItem("id_utilizador", result.id_utilizador);
        alert("Conta criada com sucesso!");
        window.location.replace("/");
      }
      else {
        alert("Os dados que inseriu estão incorretos!");
        console.log(result);
      }
    });
} */
 


//Funcao fetch para enviar email newsletter

const mailingListBtn = document.getElementById("mailingListBtn");

async function newsletterSend() {

  var dataNewsletter = {
    email: document.getElementById("mailingListInput").value
  }

  fetch("http://localhost:3000/email", {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(dataNewsletter),
    credentials: 'include'
  })
    .then(function(response) {
      //console.log(response.headers.get('Set-Cookie'));
      console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(function(err) {
      console.log(err);
    })
    .then(async function(result) {
      if (result) {
        console.log(result);
      } else {
        //alert("Os dados que inseriu estão incorretos!");
        console.log(result);
      }
    });
}

// Funcao para popular as lists de tipo atividade e espaco ao criar atividade

const criarAtividadeBtn = document.getElementById("criarAtividadeBtn");

async function popularListsCriarAtividadeModal() {

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  const responseEspacos = await fetch(`http://localhost:3000/espacos`);
  const espaco = await responseEspacos.json();
  
  const dropdownDivEspacoNovaAtividade = document.getElementById('dropdownDivEspacoNovaAtividade');

  dropdownDivEspacoNovaAtividade.innerHTML = "";

  for(index in espaco) {
    console.log(espaco[index]);
    //dropdownDivEspacoNovaAtividade.innerHTML += `<option>${espaco[index].nome}/option>`;
    dropdownDivEspacoNovaAtividade.options[dropdownDivEspacoNovaAtividade.options.length] = new Option(espaco[index].nome, espaco[index].espacoId);
  }
  

  const responseTiposAtividades = await fetch(`http://localhost:3000/tipos_atividades`);
  const tiposAtividades = await responseTiposAtividades.json();

  const dropdownDivTipNovaAtividade = document.getElementById('dropdownDivTipNovaAtividade');

  dropdownDivTipNovaAtividade.innerHTML = "";

  for(index in tiposAtividades) {
    console.log(tiposAtividades);
    //dropdownDivEspacoNovaAtividade.innerHTML += `<option>${espaco[index].nome}/option>`;
    dropdownDivTipNovaAtividade.options[dropdownDivTipNovaAtividade.options.length] = new Option(tiposAtividades[index].nome, tiposAtividades[index].id_tipo_atividade);
  }

};

//Funcao para criar as atividades

const criaNovaAtividadeBtn = document.getElementById("criaNovaAtividadeBtn");

async function criarAtividade() {
  
  const dropdownDivEspacoNovaAtividade = document.getElementById('dropdownDivEspacoNovaAtividade');
  const dropdownDivTipNovaAtividade = document.getElementById('dropdownDivTipNovaAtividade');


  var nome = document.getElementById("nomeAtividade");
  var custoNovaAtividade = document.getElementById("custoNovaAtividade");
  var nParticipantesNovaAtividade = document.getElementById("nParticipantesNovaAtividade");
  //var dataHoraNovaAtividade = document.getElementById("dataHoraNovaAtividade");
  var urlImagemAtividade = document.getElementById("urlImagemAtividade");

  console.log(dropdownDivEspacoNovaAtividade.value);

  var data = {
    id_espaco: dropdownDivEspacoNovaAtividade.value,
    id_tipo_atividade: dropdownDivTipNovaAtividade.value,
    nome: nome.value,
    valor: custoNovaAtividade.value,
    num_participantes: nParticipantesNovaAtividade.value,
    imagem: urlImagemAtividade.value
  };


  fetch("http://localhost:3000/atividades", {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'include'
  })
    .then(function(response) {
      //console.log(response.headers.get('Set-Cookie'));
      console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(function(err) {
      console.log(err);
    })
    .then(async function(result) {
      if (result) {
        console.log(result);
      } else {
        //alert("Os dados que inseriu estão incorretos!");
        console.log(result);
      }
    });

    /* const selectedFile = document.getElementById('imagemNovaAtividade').files[0];

    const formData = new FormData();

    formData.append("imagem", selectedFile);
    formData.append("nomeAtividade", nome.value);

    console.log(formData);

    fetch("http://localhost:3000/gravarImagem", {
    mode: 'cors',
    method: 'POST',
    body: formData,
    credentials: 'include'
  })
    .then(function(response) {
      //console.log(response.headers.get('Set-Cookie'));
      console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(function(err) {
      console.log(err);
    })
    .then(async function(result) {
      if (result) {
        console.log(result);
      } else {
        //alert("Os dados que inseriu estão incorretos!");
        console.log(result);
      }
    }); */

}