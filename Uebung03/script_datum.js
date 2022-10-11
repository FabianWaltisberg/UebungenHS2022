
"use strict";   // muss immer am Anfang des JavaScript sein

function start(){

    var d = new Date ();
    var ds = d.toDateString();
    var ts = d.toLocaleTimeString();  //mit Locale eingebaut kommt unsere Zeit ohne Mitteleuropäische Zeit Text

    
    var p = document.getElementById("time").innerHTML = ts;  //entweder getElementById ohne #
    
    var o = document.querySelector("#output2");  // oder querySelector mit #
    o.innerHTML = ds;
                                                    // Kommt nicht drauf an vermute ich

    setTimeout(start,500);    //kann auch setIntervall sein
}










