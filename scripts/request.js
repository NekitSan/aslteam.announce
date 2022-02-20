let requestURL = "scripts/lang/database.json";
let request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

// set lang params
if()
{
    
}

// set lang default
if(localStorage.lang == null || localStorage.lang == undefined)
    localStorage.lang = (window.navigator.language == undefined) ? "ru" : window.navigator.language.slice(0,2);
if(localStorage.lang != null || localStorage.lang != undefined || getUrlVars("lang") == "en")
{
    let tempSet = (localStorage.lang == "ru" || getUrlVars("lang") == "ru") ? "ru" : "en";
    let tempDefault = (tempSet == "ru") ? "en" : "ru";

    document.querySelector("#lang .setting__preview").textContent = tempSet;
    document.querySelector("#lang .setting__preview").dataset.lang = tempSet;

    document.querySelector("#list-lang .setting__preview").textContent = tempDefault;
    document.querySelector("#list-lang .setting__preview").dataset.lang = tempDefault;
}

// set theme default
if(localStorage.theme == null || localStorage.theme == undefined)
{
    joinTheme("dark");
    localStorage.theme = "dark";
}
if(localStorage.theme != null || localStorage.theme != undefined)
{
    joinTheme(localStorage.theme);

    let tempSet = (localStorage.theme == "dark") ? "dark" : "white";
    let tempDefault = (tempSet == "dark") ? "white" : "dark";

    document.querySelector("#theme .setting__preview").classList.remove(tempDefault+"-mod");
    document.querySelector("#theme .setting__preview").classList.add(tempSet+"-mod");
    document.querySelector("#theme .setting__preview").dataset.mod = tempSet;

    document.querySelector("#list-theme .setting__preview").classList.remove(tempSet+"-mod");
    document.querySelector("#list-theme .setting__preview").classList.add(tempDefault+"-mod");
    document.querySelector("#list-theme .setting__preview").dataset.mod = tempDefault;
}

renderHTML = request.onload = function() {
    const DATA = request.response;
    // set lang <html>
    document.documentElement.lang = localStorage.lang;

    // run render default content
    const RENDER_CONTENT = new renderContent(DATA[localStorage.lang]);
    RENDER_CONTENT.init();  
    
    // run render services content
    const RENDER_SERVICES = new renderServices(DATA[localStorage.lang]);
    RENDER_SERVICES.init();  
    
    // run render woeks content
    const RENDER_WORKS = new renderWorks(DATA[localStorage.lang]);
    RENDER_WORKS.init();  
    
    // run render team content
    const RENDER_TEAM = new renderTeam(DATA[localStorage.lang]);
    RENDER_TEAM.init();  
    
    // run render comment content
    const RENDER_REVIEW = new renderReview(DATA[localStorage.lang]);
    RENDER_REVIEW.init();  
}

// Сделать кнопку extra по другому, фон задать блоком, по центру ставить svg через mask
// Сделать по другому рендер для тимы
// Добавить для доп параметра у персоны, нормальное закрытие до окна 
