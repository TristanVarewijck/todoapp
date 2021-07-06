
// require 
const navButton = document.getElementById('navButton'); 
 
// events 
navButton.addEventListener("click", showNav); 

// functions 


function showNav(){
        const body = document.getElementById('body');
        const nav = document.getElementById('slideNav'); 
        const header = document.getElementById('header');
    
        header.classList.toggle('noShadow'); 
        nav.classList.toggle('showNav'); 
        body.classList.toggle('noScroll');
    
        setTimeout(function(){
        if(navButton.getElementsByTagName("span")[0].innerHTML === "close"){
            navButton.getElementsByTagName("span")[0].innerHTML = 'menu';
        
        } else{
            navButton.getElementsByTagName("span")[0].innerHTML = 'close'
        }; 
 }, 200)
}

// add active state to nav buttons
// function addActive(){

//     const navLinks = document.querySelectorAll(".nav-link");
//     navLinks.addEventListener("click", addActive);

//     for(item in navLinks){
        
//     }

// }

function showUploadForm(){
    // form
    imageFormUpload = document.getElementById("uploadForm");
    imageFormUpload.classList.toggle("update-image-show"); 
    
};





