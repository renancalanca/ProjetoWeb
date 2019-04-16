function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "questionario.xml", true);

  xmlhttp.send();
}
function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
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
