import { Preferences } from "@capacitor/preferences";


function hideAllSections(){
  Array.from(document.querySelectorAll(".game")).concat([document.getElementById("main"),document.getElementById("perfil")])
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
async function getPreferences(key){
  const {value} = await Preferences.get({key});
  return value === null ? null : JSON.parse(value);
  
}
async function setPreferences(key, obj){
  await Preferences.set({key, value: JSON.stringify(obj)});
  
}
function initApp(){
  setupButtons();
  getPreferences("config").then(config =>{
    hideAllSections();
    if(config === null){
      showSection("perfil");
    }else{
      showSection("main");
    }
  });
}
document.getElementById("savePreferences").addEventListener("click", e => {
  e.preventDefault();
  const config = {
    name: document.getElementById("name").value,
    nick: document.getElementById("nick").value
  };
  if(config.name.length === 0 || config.nick.length === 0){
    alert("debe completar los campos")
  } else{
    setPreferences("config", config).then(() => {
      hideAllSections();
      showSection("main");
    });
  }
});

document.addEventListener("DOMContentLoaded", initApp());











