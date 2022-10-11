"use strict";

function changestyle() {
    var eingabefeld = document.querySelector("#src");

    var a = eingabefeld.value   // Der Wert von der Eingabe vom Eingabefeld wird in a abgespeichert

        var random = Math.floor(Math.random()*16777215).toString(16);
    var farbe = "#" + random;   // farbe ist eine random Farbe

    var o = document.querySelector("#ausgabe");
    o.innerHTML = a;     // Der Text von a wird auf der Webseite bei unter Variable o in ausgabe angezeigt
    o.style["color"] = farbe;
    o.style["font-size"] = "30px";
    o.style["padding"] = "0px 0px";
    o.style["text-align"] = "center";   // div. Style für Text von ausgabe oder Variable a
}