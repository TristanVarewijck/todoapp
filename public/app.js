
const body = document.getElementById('body'); 
const navButton = document.getElementById('navButton'); 
const nav = document.getElementById('slideNav'); 
const header = document.getElementById('header'); 

navButton.addEventListener("click", showNav); 

function showNav(){
    header.classList.toggle('noShadow'); 
    nav.classList.toggle('showNav'); 
    body.classList.toggle('noScroll');
}

// toggle by menu click
function showUploadForm(){

    // form
    imageFormUpload = document.getElementById("uploadForm");
    imageFormUpload.classList.toggle("update-image-show"); 
    
};


