var qtdRespondida = 1;
var xmlQuiz;
var lstQtdAcertos = [];

function getXml() {
  // var texto = document.getElementById("txtXml").value.toString();
  // console.log(texto);

  var stringxml =
    "<quiz>" +
    "<question>" +
    "<title>Qual o valor de 1+1?</title>" +
    "<answer value='0'>1</answer>" +
    "<answer value='1'>2</answer>" +
    "<answer value='0'>3</answer>" +
    "<answer value='0'>4</answer>" +
    "<answer value='0'>5</answer>" +
    "</question>" +
    "<question>" +
    "<title>Qual o valor de 2+2?</title>" +
    "<answer value='0'>1</answer>" +
    "<answer value='0'>2</answer>" +
    "<answer value='0'>3</answer>" +
    "<answer value='1'>4</answer>" +
    "<answer value='0'>5</answer>" +
    "</question>" +
    "<quiz>";

  document.getElementById("btnStart").disabled = true;
  var parser = new DOMParser();
  var xml = parser.parseFromString(stringxml, "text/xml");
  xmlQuiz = xml;
  convertXmlToQuestion(xmlQuiz);

}

//Essa função será usada para quando estiver usando servidor
function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var xmlDoc = this.responseXML;
      convertXmlToQuestion(xmlDoc);
    }
  };
  xmlhttp.open("GET", "questionario.xml", true);
  xmlhttp.send();
}

function convertXmlToQuestion(xml) {
  var quizTeste = xml.getElementsByTagName("quiz");
  var lstQuestion = quizTeste[0].getElementsByTagName("question");
  lstQuestion = returnTenQuestions(lstQuestion);

  for (var i = 0; i < lstQuestion.length; i++) {
    var idDiv = i;
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "question");

    var title = document.createElement("h3");
    title.textContent = lstQuestion[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    newDiv.appendChild(title);

    var lstAnswer = lstQuestion[i].getElementsByTagName("answer");
    for (var y = 0; y < lstAnswer.length; y++) {
      var radioButton = document.createElement("INPUT");
      radioButton.setAttribute("id", "id" + y);
      radioButton.setAttribute("type", "radio");
      radioButton.setAttribute("name", "answer" + idDiv);
      var valueAnswer = lstAnswer[y].getAttribute("value");
      radioButton.setAttribute("value", valueAnswer);
      radioButton.required = true;
      newDiv.appendChild(radioButton);

      var label = document.createElement("lable");
      label.setAttribute("for", "id" + y);
      label.innerHTML = lstAnswer[y].childNodes[0].nodeValue + "<br>";
      newDiv.appendChild(label);
    }

    document.getElementById("quiz").appendChild(newDiv);
    document.getElementById("qtdTentativa").textContent = "Tentativa: "  + qtdRespondida;
    qtdRespondida++;
  }
}

function returnTenQuestions(lstQuestion){
  var lstSorted = [];
  var i = 0;
  while(i< 10){
    //Utilizar o random aqui quando tiver mais que 10 itens a lista
    //lstSorted.push(lstQuestion[Math.floor(Math.random()*items.length)]);
    i++;
  }
  lstSorted.push(lstQuestion[Math.floor(Math.random()*lstQuestion.length)]);
  return lstSorted;
}

function allChecked(){
  var lstQuestionAnswered = document.getElementsByClassName("question");
  var qtdChecked = 0;
  for (var i = 0; i < lstQuestionAnswered.length; i++) {
    var radios = lstQuestionAnswered[i].getElementsByTagName("input");
    for (var y = 0; y < radios.length; y++) {
      if (radios[y].type == "radio" && radios[y].checked) {
        qtdChecked++;
        //console.log("valor do radio " + value);
        break;
      }
    }
  }
  if(qtdChecked == lstQuestionAnswered.length){
    return true;
  }
  return false;

}

function verifyAnswer() {
  var lstQuestionAnswered = document.getElementsByClassName("question");
  var qtdAcertos = 0;
  
  if(!allChecked()){
    alert("Responda todas as Questões!");
    return null;
  }

  for (var i = 0; i < lstQuestionAnswered.length; i++) {
    var radios = lstQuestionAnswered[i].getElementsByTagName("input");
    var value;
    for (var y = 0; y < radios.length; y++) {
      if (radios[y].type == "radio" && radios[y].checked) {
        value = radios[y].value;
        //console.log("valor do radio " + value);
        break;
      }
    }
    if (value == "1") {
      qtdAcertos++;
    }
  }
  lstQtdAcertos.push(qtdAcertos);
  //console.log("quantidade de acertos: " + qtdAcertos);
  resetQuiz();
}

function concludeQuiz(){
// Verificará qual tipo de avaliação o usuario escolheu, pegara a lstQtdAcertos e mostrará para o usuário a nota dele.
}

function resetQuiz(){
  if(qtdRespondida == 3){
    document.getElementById("btnFinalizar").style.display = "inline-block";
    document.getElementById("btnNew").style.visibility = "hidden";
    console.log("Terceira tentativa?");
  }
  var questions = document.getElementsByClassName("question");
  while(questions.length > 0){
    questions[0].parentNode.removeChild(questions[0]);
  }
  convertXmlToQuestion(xmlQuiz);
}

