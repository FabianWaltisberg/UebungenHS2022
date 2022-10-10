"use strict";


function changestyle() {
    var eingabefeld = document.querySelector("#src");

        var random = Math.floor(Math.random()*16777215).toString(16);
    var farbe = "#" + random;

    eingabefeld.style["color"] = farbe;
    eingabefeld.style["font-size"] = "30px";
    eingabefeld.style["padding"] = "0px 0px";
    eingabefeld.style["text-align"] = "center";

}