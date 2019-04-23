function getXml(){
  // var texto = document.getElementById("txtXml").value.toString();
  // console.log(texto);

  var stringxml = 
  "<question>" +
  "<title>Qual o valor de 2+3?</title>"+
  "<answer>1</answer>" + 
  "<answer>2</answer>" +
  "<answer>3</answer>" +
  "<answer>4</answer>" +
  "<answer>5</answer>" +
  "</question>";

  var parser = new DOMParser();
  var oDom = parser.parseFromString(stringxml, "text/xml");
  console.log(oDom.getElementsByTagName("title")[0].childNodes[0].nodeValue);
  convertXmlToQuestion(oDom);
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
  var i;
  var x = xmlDoc.getElementsByTagName("question");
  var lstQuestions = [];
  for (i = 0; i < x.length; i++) {
    // lstQuestions.push(
    //   {
    //     id: x[i].getAttribute("id"),
    //     text: x[i].getElementsByTagName("text"),
    //     questions: x[i].getElementsByTagName("answer")
    //   }
    // );
    //div.className = colocar uma classe de css
    // txt += x[i].getElementsByTagName("text")[0].childNodes[0].nodeValue;
    //document.getElementsByTagName("body")[0].appendChild(iDiv);
    var iDiv = document.createElement("div");
    iDiv.id = x[i].getAttribute("id");
    var title = document.createElement("h3");
    title.textContent = x[i].getElementsByTagName("text");
    var input = document.createElement("INPUT");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "answer");
    input.setAttribute("value", "0"/*pegar o valor do que ta vindo do xml */);
    iDiv.innerHTML = title;
    iDiv.innerHTML = input;    
    console.log(x[i].getAttribute("id"));
  }
  document.getElementById("main").innerHTML = txt;
}
