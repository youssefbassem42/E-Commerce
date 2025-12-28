var title=document.getElementById('t');
title.style.cssText="color: rgba(16, 23, 80, 1);margin:0;font-size:40px"
var el = document.createElement("div");
var txt=document.createTextNode("Home.pages");
var span=document.createElement("span");
span.style.color="#f44f91";
span.textContent=".About Us";
el.setAttribute('style','font-size:17px;');
el.appendChild(txt);
el.appendChild(span);
document.getElementById('d').appendChild(el);

var els=document.getElementsByTagName("h3");
for(let i=0;i<els.length;i++)
    els[i].style.color="rgba(21, 24, 117, 1)";

var imgs=document.querySelectorAll(".i");
for(let i=0;i<feats.length;i++){
    imgs[i].style.width="100px";
    imgs[i].style.hieght="100px";
}