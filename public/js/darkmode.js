var mode,check;
var root=document.querySelector(':root');  
var rootStyle=getComputedStyle(root);
function checkmode() {
   
    var checkBox = document.getElementById("toggle");
 
    if (checkBox.checked === true){
     
     darkmode();
    } else{

        lightmode();
        
    }
}


  
function darkmode(){

        root.style.setProperty('--primary','black');
        root.style.setProperty('--secondary','whitesmoke');
        mode="DARK";
        sessionStorage.setItem("mode",JSON.stringify(mode));
       
        
}

function lightmode(){
    root.style.setProperty('--primary','whitesmoke');
    root.style.setProperty('--secondary','black');
    mode="LIGHT";
    sessionStorage.setItem("mode",JSON.stringify(mode));

  
}


let getMode=JSON.parse(sessionStorage.getItem("mode"));

var root=document.querySelector(':root');  
var rootStyle=getComputedStyle(root);


       if (getMode==="LIGHT")    
       {           
        sessionStorage.setItem("mode",JSON.stringify(getMode));

       }                  
       else 
       if(getMode==="DARK")                     
       {                           
        sessionStorage.setItem("mode",JSON.stringify(getMode));
        root.style.setProperty('--primary','black');
        root.style.setProperty('--secondary','whitesmoke');
                
       }                             
