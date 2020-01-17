window.onload = async function () {

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
  isLoggedInBtns();
  
  //Fetch para guardar dados do utilizador

  //guardarDadosBtn.addEventListener('click', guardarDados);

  //Fetch para newsletter

  mailingListBtn.addEventListener("click", newsletterSend);

}


function isLoggedInBtns() {
   if (localStorage.getItem('id_utilizador') !== null) {        
        document.getElementById("loginBtnNav").style.display = "none";
        document.getElementById("registe-seBtn").style.display = "none";  
      } else {
        document.getElementById("logoutBtn").style.display = "none";
        document.getElementById("detalhesUtilizadorBtn").style.display = "none";  
        document.getElementById("criarAtividadeBtn").style.display = "none";  
      }
    }

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

async function refreshAtividades() {
  const fillPainelAtividades = document.getElementById("painelAtividades");
  let txt = "";
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
              txt += "<div class='col-md-4 col-sm-6 portfolio-item'> <a class='portfolio-link' data-toggle='modal' href='#portfolioModal1'> <div class='portfolio-hover'> <div class='portfolio-hover-content'> <i class='fas fa-plus fa-3x'></i> </div> </div> <img class='img-fluid' src='img/portfolio/01-thumbnail.jpg' alt=''> </a> <div class='portfolio-caption'> <h4>" + atividade.nome + "</h4> <p class='text-muted'>" + atividade.espaco + "</p> </div> </div>";
          }
          fillPainelAtividades.innerHTML = txt;
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

//Funcao fetch para alterar dados do utilizador

/* const guardarDadosBtn = this.document.getElementById('guardarDadosBtn');

async function guardarDados(e) {
  e.preventDefault();

  const id_utilizador = localStorage.getItem('id_utilizador');
  const utilizador;
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
          utilizador = result;
      } else {
        console.log(result);
      }
    });

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
  /* fetch('http://localhost:3000/signup', {
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
 
*/

//Funcao fetch para enviar email newsletter

const mailingListBtn = document.getElementById("mailingListBtn");

async function newsletterSend() {

  const data = {
    email = document.getElementById("mailingListInput").value
  }

  fetch("http://localhost:3000/email", {
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
}