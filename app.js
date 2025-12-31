let listaNumeroAleatorioSorteado = [];
let numeroLimite = 10;
let numeroSecreto = geralNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  if ("speechSynthesis" in window) {
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    utterance.rate = 1.2;
    window.speechSynthesis.speak(utterance);
  } else {
    console.log("Web Speech API não suportada neste navegador.");
  }
}

function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "jogo do número secreto");
  exibirTextoNaTela("p", "escolha um número entre 1 e 10");
}

exibirMensagemInicial();

function verificarChute() {
  let chute = document.querySelector("input").value;
  console.log(chute == numeroSecreto);

  if (chute == numeroSecreto) {
    let palavraTentativas = tentativas > 1 ? "tentativas" : "tentativas";
    let mensagemTentativas = `você descobriu o número secreto com ${tentativas} ${palavraTentativas}`;
    exibirTextoNaTela("h1", "acertou");
    exibirTextoNaTela("p", mensagemTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "o número secreto é menor");
    }
    if (chute < numeroSecreto) {
      exibirTextoNaTela("p", "o número secreto é maior");
    }
    tentativas++;
    limparCampo();
  }
}

function geralNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaNumeroAleatorioSorteado.length;

  if (quantidadeDeElementosNaLista == numeroLimite)
    [(listaNumeroAleatorioSorteado = [])];

  if (listaNumeroAleatorioSorteado.includes(numeroEscolhido)) {
    return geralNumeroAleatorio();
  } else {
    listaNumeroAleatorioSorteado.push(numeroEscolhido);
    console.log(listaNumeroAleatorioSorteado);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  numeroSecreto = geralNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
