function hideAllSections(){
  Array.from(document.querySelectorAll(".game")).concat([document.getElementById("main")])
  .forEach(element => element.classList.add("nodisp"));
}
function showSection(sectionId){
  document.getElementById(sectionId).classList.remove("nodisp");
}
function setupButtons(){
  document.querySelectorAll(".game")
  .forEach(gameElement => {
    const id = gameElement.getAttribute("id")
    document.getElementById(`btn-${id}`).addEventListener("click", () => { 
      hideAllSections();
      showSection(id);
     });
     document.getElementById(`btn-${id}-back`).addEventListener("click", () => { 
      hideAllSections();
      showSection("main");
     });

  });
}

function initApp(){
  setupButtons();
}

document.addEventListener("DOMContentLoaded", initApp());











