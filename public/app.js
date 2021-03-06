
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

// function navState(evt, tabID){
//     let navButtons; 
//     // navLinks.addEventListener("click", navState());
//     navButtons = document.getElementsByClassName("nav-link");
//     for(i = 0; i < navButtons.length; i++){
//         navButtons[i].className = navButtons[i].className.replace('activeButton', " ");  
//     }

//         document.getElementById(tabID).classList.add = "activeButton";
//         evt.currentTarget.className += "activeButton";

// }

function openContent(evt, contentType, callback){
    let i, tabcontent, tabButtons;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

    tabButtons = document.getElementsByClassName("tabButton"); 
    for (i = 0; i < tabButtons.length; i++){
        tabButtons[i].className = tabButtons[i].className.replace('active', ""); 
    }

    document.getElementById(contentType).style.display = "block";
    evt.currentTarget.className += "active"; 
    document.getElementById("tabs").scrollIntoView(true);
}

function showUploadForm(){
    // form
    imageFormUpload = document.getElementById("uploadForm");
    imageFormUpload.classList.toggle("update-image-show"); 
    
};





