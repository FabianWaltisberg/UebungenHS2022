
"use strict";   // muss immer am Anfang sein

function start(){

    var d = new Date ();
    var ds = d.toDateString();
    var ts = d.toTimeString();

    var o = document.querySelector("#output2");
    o.innerHTML = ds;
    var p = document.querySelector("#output1").innerHTML = ts;
    

    setTimeout(start,500);    //kann auch setIntervall sein
}










