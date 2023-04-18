const textArea = document.querySelector(".input-text");
const textOutput = document.querySelector("#textoutput");
const encryptButton = document.querySelector("#encrypt-button");
const decryptButton = document.querySelector("#decrypt-button");
const svgmsgElement = document.querySelector(".svg-msg");
const outputDiv = document.querySelector(".output");
const copyButton = document.querySelector("#copy-button")


const subDict = {
  'a': "ai",
  'e': "enter",
  'i': "imes",
  'o': "ober",
  'u': "ufat",
}

// Pegando valor do text area
textArea.addEventListener('input', (e) => {
  const text = e.target.value;

  // Remove caracteres que não são letras minúsculas sem acentos
  const textFiltrado = text.toLowerCase().replace(/[^a-z ]/g, "");

  //Atualiza o valor do textarea
  if (textFiltrado !== text) {
    e.target.value = textFiltrado;
  }

  console.log(textFiltrado)
});

// Evento no botão de criptografia
encryptButton.addEventListener('click', () => {
  const inputText = textArea.value;
  const encryptedText = encrypt(inputText);
  showText(encryptedText);
  console.log(encryptedText)
});

function encryptButtonHandler() {
  const inputText = document.querySelector(".input-text");

  const text = inputText.value;
  const encryptedText = encrypt(text);
  const textOutput = document.querySelector("#textoutput");
  textOutput.value = encryptedText;
  inputText.value = ""; // Limpa o conteúdo do input-text
}
document.querySelector("#encrypt-button").addEventListener("click", encryptButtonHandler);

// Evento botão descriptografia
decryptButton.addEventListener('click', () => {
  const inputText = textArea.value;
  const decryptedText = decrypt(inputText);
  showText(decryptedText);
  console.log(decryptedText)
});

function decryptButtonHandler() {
  const inputText = document.querySelector(".input-text");

  const text = inputText.value;
  const decryptedText = decrypt(text);
  const textOutput = document.querySelector("#textoutput");
  textOutput.value = decryptedText;
  inputText.value = ""; // Limpa o conteúdo do input-text
}
document.querySelector("#decrypt-button").addEventListener("click", decryptButtonHandler);

//Botão de Copiar
copyButton.addEventListener("click", () => {
  textOutput.select()
  document.execCommand("copy")
  alert("Copiado com sucesso!!")

  setTimeout(()=>{
    textOutput.value = ""
    textOutput.style.display = "none"
    showText("")
  },500)
})

// Função de criptografia
function encrypt(text) {
  let textoCriptografado = "";

  for (let i = 0; i < text.length; i++) {
    const letraAtual = text[i];
    const letraCriptografada = subDict[letraAtual];

    if (letraCriptografada) {
      textoCriptografado += letraCriptografada;
    } else {
      textoCriptografado += letraAtual;
    }
  }

  return textoCriptografado;
}

// Função de descriptografia
function decrypt(text) {
  const subDictInverse = {};
  for (const key in subDict) {
    if (Object.hasOwnProperty.call(subDict, key)) {
      const value = subDict[key];
      subDictInverse[value] = key;
    }
  }

  let textoDescriptografado = "";
  let i = 0;

  while (i < text.length) {
    let blocoSize = 1;
    let blocoEncontrado = false;
    while (i + blocoSize <= text.length) {
      const blocoCriptografado = text.slice(i, i + blocoSize);
      if (subDictInverse[blocoCriptografado]) {
        textoDescriptografado += subDictInverse[blocoCriptografado];
        blocoEncontrado = true;
        break;
      }
      blocoSize++;
    }
    if (!blocoEncontrado) {
      textoDescriptografado += text[i];
      i++;
    } else {
      i += blocoSize;
    }
  }

  return textoDescriptografado;
}

// Função para exibir o texto criptografado ou descriptografado
function showText(text) {

  //Esconde SVG e MSG
  if (text.length === 0) {
    svgmsgElement.style.display = "block"
    textOutput.style.display = "none"
  } else {
    svgmsgElement.style.display = "none"
    textOutput.style.display = "block"
  }
  textOutput.value = text;
}

// Função para redimensionar o textarea
textOutput.addEventListener('input', () => {
  autoResizeTextArea(textOutput);
});

function autoResizeTextArea(textArea) {
  // define o número mínimo de linhas
  const minLinhas = 1;

  // define o número máximo de linhas
  const maxLinhas = 10;

  // configura a altura mínima do textarea
  textArea.style.height = "auto";
  textArea.style.height = `${textArea.scrollHeight}px`;

  // ajusta a altura para o número mínimo de linhas se for menor do que isso
  const linhas = textArea.value.split("\n").length;
  if (linhas < minLinhas) {
    textArea.style.height = `${textArea.scrollHeight}px`;
  }

  // ajusta a altura para o número máximo de linhas se for maior do que isso
  if (linhas > maxLinhas) {
    textArea.style.overflowY = "scroll";
    textArea.style.height = `${maxLinhas * 32}px`;
  } else {
    textArea.style.overflowY = "hidden";
  }

}