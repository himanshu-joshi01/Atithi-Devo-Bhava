function darkmode(){

    var mode;
    var root=document.querySelector(':root');  
    var rootStyle=getComputedStyle(root);
    console.log(rootStyle);
    var primary=rootStyle.getPropertyValue("--primary");
    var secondary=rootStyle.getPropertyValue("--secondary");
    if(primary==='white'&& secondary==='black')
    {
        root.style.setProperty('--primary','black');
        root.style.setProperty('--secondary','white');
        mode="DARK";
    }
    
else
{
    root.style.setProperty('--primary','white');
    root.style.setProperty('--secondary','black');
    mode="LIGHT";
}
localStorage.setItem("mode",JSON.stringify(mode));
}

let getMode=JSON.parse(localStorage.getItem("mode"));
var root=document.querySelector(':root');  
var rootStyle=getComputedStyle(root);
       if (getMode==="LIGHT")    
       {           
        localStorage.setItem("mode",JSON.stringify(getMode));
   

       }                  
       else 
       if(getMode==="DARK")                     
       {                           
        localStorage.setItem("mode",JSON.stringify(getMode));
        root.style.setProperty('--primary','black');
        root.style.setProperty('--secondary','white');
        
       }                             
    

// function switch_theme()
// {
// if(mode=="LIGHT")
// {
//     lightmode();

// if(getMode==="DARK")
// {
   
// }
// else
// if(getMode==="LIGHT")
// {
//     localStorage.setItem("mode","LIGHT");
//     root.style.setProperty('--primary','white');
//     root.style.setProperty('--secondary','black');

// }


