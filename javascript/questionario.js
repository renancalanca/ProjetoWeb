var qtdRespondida = 1;
var xmlQuiz;
var lstQtdAcertos = [];

function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var xmlDoc = this.responseXML;
      xmlQuiz = xmlDoc;
      convertXmlToQuestion(xmlDoc);
    }
  };
  xmlhttp.open("GET", "../xml/questionario.xml", true);
  xmlhttp.send();
}

function convertXmlToQuestion(xml) {
  var lstQuestion = xml.getElementsByTagName("question");
  lstQuestion = retornaDezQuestoes(lstQuestion);

  for (var i = 0; i < lstQuestion.length; i++) {
    var idDiv = "div" + i;
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "question");
    newDiv.setAttribute("id", idDiv);
    newDiv.style.display = "none";

    var newPagination = document.createElement("a");
    newPagination.setAttribute("href", "#"+ idDiv);
    var linkText = document.createTextNode(i + 1);
    newPagination.appendChild(linkText);
    newPagination.setAttribute("onclick", "mostraQuestao(this);");
    document.getElementById("divPagination").appendChild(newPagination);

    var title = document.createElement("h4");
    title.textContent = i + 1 + ") " + lstQuestion[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    newDiv.appendChild(title);

    var lstAnswer = lstQuestion[i].getElementsByTagName("answer");
    for (var y = 0; y < lstAnswer.length; y++) {
      var radioButton = document.createElement("INPUT");
      radioButton.setAttribute("id", "id" + y);
      radioButton.setAttribute("type", "radio");
      radioButton.setAttribute("name", "answer" + i);
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
  }

  document.getElementById("btnStart").disabled = true;
  document.getElementById("ddlAvaliacao").disabled = true;
  document.getElementById("btnNovaTentativa").style.display = "inline-block";
  document.getElementById("btnNovaTentativa").style.visibility = "visible";
  qtdRespondida++;
}

function retornaDezQuestoes(lstQuestion){
  var lstSorted = [];
  var i = 0;
  var existe;

  while(i< 10){
    var rand = Math.floor(Math.random()*lstQuestion.length);
    for(var y= 0; y< lstSorted.length; y++){
      if(lstSorted[y] == lstQuestion[rand]){
        existe = true;
      }
    }
    if(!existe){
      lstSorted.push(lstQuestion[rand]);
      i++;
    }
    existe = false;
  }
  console.log(lstSorted);
  return lstSorted;
}

function todosChecados(){
  var lstQuestionAnswered = document.getElementsByClassName("question");
  var qtdChecked = 0;
  for (var i = 0; i < lstQuestionAnswered.length; i++) {
    var radios = lstQuestionAnswered[i].getElementsByTagName("input");
    for (var y = 0; y < radios.length; y++) {
      if (radios[y].type == "radio" && radios[y].checked) {
        qtdChecked++;
        break;
      }
    }
  }
  
  if(qtdChecked == lstQuestionAnswered.length){
    return true;
  }
  return false;
}

function verificaResposta() {
  var lstQuestionAnswered = document.getElementsByClassName("question");
  var qtdAcertos = 0;
  
  if(!todosChecados()){
    alert("Responda todas as Questões!");
    return null;
  }

  for (var i = 0; i < lstQuestionAnswered.length; i++) {
    var radios = lstQuestionAnswered[i].getElementsByTagName("input");
    var value;
    for (var y = 0; y < radios.length; y++) {
      if (radios[y].type == "radio" && radios[y].checked) {
        value = radios[y].value;
        break;
      }
    }
    if (value == "1") {
      qtdAcertos++;
    }
  }
  lstQtdAcertos.push(qtdAcertos);
  console.log("quantidade de acertos: " + qtdAcertos);
  resetQuiz();
}

function concluirQuiz(){
  var ddl = document.getElementById("ddlAvaliacao");
  var avaliacao = ddl.options[ddl.selectedIndex].value;
  var notaFinal;

  switch(avaliacao){
    case "maiorNota": 
      notaFinal = retornaMaiorNota();
      break;
    case "media": 
      notaFinal = retornaMedia();
      break;
    case "ultimaNota": 
      notaFinal = retornaUltimaNota();
      break;
    default:
      notaFinal = 0;
  }

  alert("A sua nota final é de : " + notaFinal);

  //Reseta Elementos da página.
  limparQuestoes();
  document.getElementById("btnStart").disabled = false;
  document.getElementById("ddlAvaliacao").disabled = false;
  document.getElementById("btnNovaTentativa").style.display = "none";
  document.getElementById("btnFinalizar").style.display = "none";
  lstQtdAcertos = [];
  qtdRespondida = 1;
  document.getElementById("qtdTentativa").textContent = "Tentativa: "  + qtdRespondida;
}

function retornaMaiorNota(){
  var maiorNota = 0;
  for(var i = 0; i< lstQtdAcertos.length; i++){
    if(lstQtdAcertos[i] > maiorNota){
      maiorNota = lstQtdAcertos[i];
    }
  }
  return maiorNota;
}

function retornaMedia(){
  var media = 0;
  for(var i =0; i< lstQtdAcertos.length; i++){
    media += lstQtdAcertos[i];
  }
  media = media/lstQtdAcertos.length;
  console.log(media);
  return media;
}

function retornaUltimaNota(){
  var i = lstQtdAcertos.length;
  var ultimaNota = lstQtdAcertos[i-1];

  return ultimaNota;
}

function resetQuiz(){
  if(qtdRespondida == 4){
    document.getElementById("btnFinalizar").style.display = "inline-block";
    document.getElementById("btnNovaTentativa").style.visibility = "hidden";
    limparQuestoes();
    return;
  }
  limparQuestoes();
  convertXmlToQuestion(xmlQuiz);
}

function limparQuestoes(){
  var questions = document.getElementsByClassName("question");
  while(questions.length > 0){
    questions[0].parentNode.removeChild(questions[0]);
  }

  var pagination = document.getElementsByTagName("a");
  while(pagination.length > 0){
    pagination[0].parentNode.removeChild(pagination[0]);
  }
}

function mostraQuestao(param){
   var idQuestao = "div" + (param.innerHTML - 1);
   var divsToHide = document.getElementsByClassName("question");

   for(var i = 0; i < divsToHide.length; i++){
    divsToHide[i].style.display = "none";
  }
  document.getElementById(idQuestao).style.display = "inline-block";
}
