var tl = new TimelineLite(); 
tl.staggerFrom(".topics", 3, {
  css:{transform:"scale(0)",top:"60%",left:"50%"},ease:Elastic.easeOut
}, 0.3);


var twt = document.getElementById("twt");
var instg = document.getElementById("instg");
var drp = document.getElementById("drp");
var wp = document.getElementById("wp");
var hmtl5 = document.getElementById("fb");
var topics = document.getElementsByClassName("topics");
var info = document.getElementById("info");
var header = document.getElementById("header");

twt.addEventListener("mouseover",twtretina,false);
twt.addEventListener("touchstart",twtretina,false);
fb.addEventListener("mouseover",fbretina,false);
fb.addEventListener("touchstart",fbretina,false);
instg.addEventListener("mouseover",instgretina,false);
instg.addEventListener("touchstart",instgretina,false);
drp.addEventListener("mouseover",drpretina,false);
drp.addEventListener("touchstart",drpretina,false);
wp.addEventListener("mouseover",wpretina,false);
wp.addEventListener("touchstart",wpretina,false);
info.addEventListener("mouseover",inforetina,false);
info.addEventListener("touchstart",inforetina,false);
header.addEventListener("mouseover",headerretina,false);
header.addEventListener("touchstart",headerretina,false);


function headerretina(event){
   TweenMax.to("#retina", 0.2, {left:"50%",top:"59%"});
}


function inforetina(event){
   TweenMax.to("#retina", 0.2, {left:"50%",top:"61.5%"});
}


function twtretina(event) {
  TweenMax.to("#retina", 0.2, {left:"51%",top:"59.5%"});
}

function fbretina(event) {
  TweenMax.to("#retina", 0.2, {left:"49%",top:"59.5%"});
}

function wpretina(event) {
  TweenMax.to("#retina", 0.2, {left:"49%",top:"60.5%"});
}

function drpretina(event) {
  TweenMax.to("#retina", 0.2, {left:"51%",top:"60.5%"});
}

function instgretina(event) {
  TweenMax.to("#retina", 0.2, {left:"50%",top:"59%"});
}


for(var i=0; i< topics.length; i++){
  topics[i].addEventListener("mouseout",retinaout);
}
function retinaout(event) {
    TweenMax.to("#retina", 0.2, {left:"50%",top:"60%"});  
}