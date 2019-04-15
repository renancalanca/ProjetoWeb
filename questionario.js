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
  var x = xmlDoc.getElementsByTagName("CD");
  for (i = 0; i < x.length; i++) {
    var div = document.createElement("div");
    console.log(x[i].getAttribute("id"));
    div.id = x[i].getAttribute("id");
    //div.className = colocar uma classe de css
    var txt = "";
    x[i].getElementsByTagName("text")[0].childNodes[0].nodeValue;
  }
  document.getElementById("demo").innerHTML = table;
}
