// Форматирование картинок
class Webp
{
    eventsAttach()
    {
        this.testWebP(function (support) {

            if (support == true) {
                document.querySelector('body').classList.add('webp');
            } else {
                document.querySelector('body').classList.add('no-webp');
            }
        });
    }
    testWebP(callback) {

        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    init()
    {
        this.eventsAttach();
    }
}

const WEBP_TRUE = new Webp();
WEBP_TRUE.init();
// Классы, объекты, функции
// render
class renderContent
{
    constructor(params)
    {
        this.data = params;
    }

    renderMenu()
    {
        let area = document.querySelector(".menu__container").children;

        for(let i = 0; i < area.length; i++)
            area[i].querySelector(".menu__link").textContent = this.data.CONTENT.MENU[i];
    }

    renderTitle()
    {
        let area = document.querySelectorAll(".title");

        for(let i = 0; i < area.length; i++)
            area[i].textContent = this.data.CONTENT.MENU[i];
    }

    renderAboutDescription()
    {
        document.querySelector(".aboutus__description").textContent = this.data.CONTENT.ABOUT_DESCRIPTION;
    }

    renderFooter()
    {
        document.querySelector(".footer__license").textContent = this.data.CONTENT.LICENCE_FOOTER;
        document.querySelector(".footer__socNetWork__item").textContent = this.data.CONTENT.TEXT_FOOTER;
    }

    init()
    {
        this.renderMenu();
        this.renderTitle();
        this.renderAboutDescription();
        this.renderFooter();
    }
}

class renderServices
{
    constructor(params)
    {
        this.data = params;
    }

    render_preview()
    {
        let tempData, tempName;
        document.querySelector(".service__container").innerHTML = "";

        function HTML_SERVICE_TEAM(data, user)
        {
            return `
            <div class="service__item" id="${user}">
                <div class="service__item--circle" style="background: ${data.parametrs.color}"></div>
                <div class="service__item--rectangle">
                    <h3 class="service__item__tile">${data.parametrs.name}</h3>
                    <svg class="service__item__icon_next" width="61" height="16" viewBox="0 0 61 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.71429 8L30.5 13L52.2857 8L61 9L30.5 16L0 9L8.71429 8Z" fill="#A8A8A8"></path>
                        <path d="M13.5714 0L30 5L46.4286 0L53 1L30 8L7 1L13.5714 0Z" fill="#888888"></path>
                    </svg>
                </div>
            </div>
            `;
        }

        for(let i = 1; i <= Object.keys(this.data.SERVICE_TEAM).length; i++)
        {
            tempName = (i < 10) ? "serv_0" + i : "serv_" + i;
            tempData = this.data.SERVICE_TEAM[tempName];

            if(this.data.SERVICE_TEAM[tempName].parametrs.status)
                document.querySelector(".service__container").insertAdjacentHTML( 'afterbegin', HTML_SERVICE_TEAM(tempData, tempName) );
        }
    }

    render_description(item)
    {
        let options = '';
        let firstContent = `
        <div class="service__window">
            <h4 class="service__window__tile">${this.data.SERVICE_TEAM[item].constet.tile}</h4>
            <p class="service__window__description description">${this.data.SERVICE_TEAM[item].constet.description}</p>
            <div class="service__options container">
        `;

        for( let i = 1; i <= Object.keys(this.data.SERVICE_TEAM[item].constet.params).length; i++ )
        {
            options += `
            <div class="service__option">
                <img src="images/${this.data.SERVICE_TEAM[item].constet.params['opt'+i].imgSrc}" class="service__option__img">
                <h4 class="service__window__tile">${this.data.SERVICE_TEAM[item].constet.params['opt'+i].tile}</h4>
                <div class="service__option__price">${this.data.SERVICE_TEAM[item].constet.params['opt'+i].price}</div>
            </div>
            `;
        }
        
        return firstContent + options + "</div><div class='service__window--exit'></div></div>";
    }

    click_preview()
    {
        document.querySelectorAll(".service__item").forEach(
            item => item.addEventListener("click", () => {
                document.body.style.overflow = "hidden";


                document.querySelector(".pop_up__service").classList.toggle("disable");
                document.querySelector(".service__container--scroll").innerHTML = this.render_description(item.id);

                
                document.querySelector(".service__window--exit").addEventListener("click", () => {
                    document.querySelector(".pop_up__service").classList.add("disable");
                    document.body.style.overflow = "auto";
                });
            }) 
        );   
    }

    init()
    {
        this.render_preview();
        this.click_preview();
    }
}

class renderWorks
{
    constructor(params)
    {
        this.data = params;
    }

    renderContent()
    {
        document.querySelector(".works__container").innerHTML = "";

        function HTML_WORKS_TEAM(data)
        {
            let linkIcon = "", linkTrue = "";
            if(data.link)
            {
                linkIcon = "<div class='works__link--icon'></div>";
                linkTrue = `href="${data.link}" target="_blank"`;
            }
            
            return `
                <a ${linkTrue} class="works__item">
                    ${linkIcon}
                    <div class="works__item__top container">
                        <img class="works__item__img" src="images/${data.img}" alt="Картинка достижения">
                        <h3 class="works__item__tile">${data.title}</h3>
                    </div>
                    <p class="works__item__content">
                        ${data.text}
                    </p>
                </a>
            `;
        }

        for(let i = 1; i <= Object.keys(this.data.WORKS_TEAM).length; i++)
        {
            document.querySelector(".works__container").insertAdjacentHTML( 'afterbegin', HTML_WORKS_TEAM(this.data.WORKS_TEAM[i]) );
        }
    }

    init()
    {
        this.renderContent();
    }
}

class renderTeam
{
    constructor(params)
    {
        this.data = params;
    }

    render_preview()
    {
        let tempData, tempName;
        document.querySelector(".aboutus__container").innerHTML = "";

        function HTML_TEAM(data, user)
        {
            let iconParamets = "";
            if(data.positions != null)
            {
                iconParamets = `<span class="mask__extra--icon"></span><svg class="aboutus__extra__icon" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d)">
                    <circle cx="24" cy="20" r="20" fill="#2C2C2C"/>
                    </g>
                    <path d="M23 25H25V19H23V25ZM24 15C23.5 15 23 15.5 23 16C23 16.5 23.5 17 24 17C24.5 17 25 16.5 25 16C25 15.5 24.5 15 24 15ZM24 11C19 11 15 15 15 20C15 25 19 29 24 29C29 29 33 25 33 20C33 15 29 11 24 11ZM24 27C20.1 27 17 23.9 17 20C17 16.1 20.1 13 24 13C27.9 13 31 16.1 31 20C31 23.9 27.9 27 24 27Z" fill="#848484"/>
                    <defs>
                    <filter id="filter0_d" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                    </filter>
                    </defs>
                </svg>`;
            }
            
            return `
            <div class="aboutus__item" id="${user}" data-count="0">
                <img class="aboutus__item__img" src="images/team/${data.img}" alt="Фотография ${data.nikname}">
                <h3 class="aboutus__item__nikname">${data.nikname}</h3>
                <h4 class="aboutus__item__position">${data.description}</h4>
                <div class="aboutus__extra--button">
                    ${iconParamets}
                </div>
                <div class="extra__window person disable">
                </div>
            </div>
            `;
        }

        for(let i = Object.keys(this.data.TEAM).length; i >= 1; i--)
        {
            tempName = (i < 10) ? "pers_0" + i : "pers_" + i;
            tempData = this.data.TEAM[tempName];

            document.querySelector(".aboutus__container").insertAdjacentHTML( 'afterbegin', HTML_TEAM(tempData, tempName) );
        }
    }

    render_description(item)
    {
        let personPositions = "", personLinks = "";

        if(this.data.TEAM[item].positions != null)
        {
            for(let i = (this.data.TEAM[item].positions.length - 1); i >= 0; i--)
            {
                personPositions += `<li class="person__position__item person--key">${this.data.TEAM[item].positions[i]}</li>`;
            } 
        }

        if(this.data.TEAM[item].links != null)
        {
            for(let i = (Object.keys(this.data.TEAM[item].links).length - 1); i >= 0; i--)
            {
                personLinks += `<a href="${this.data.TEAM[item].links[Object.keys(this.data.TEAM[item].links)[i]]}" class="person__links__item person--key" target="_blank">
                    ${ICONS_NETWORK[Object.keys(this.data.TEAM[item].links)[i]]}
                </a>`;
            } 
        }
        return `
        <div class="person__top mod--grad person--key">
            <img class="person__top__img person--key" src="images/team/${this.data.TEAM[item].img}" alt="Фото члена команды">
            <h3 class="person__top__tile person--key">${this.data.TEAM[item].nikname}</h3>
        </div>
        <ul class="person__position person--key">
            ${personPositions}
        </ul>
        <div class="person__links container person--key">
            ${personLinks}
        </div><div class="person__line--button mod--grad person--key"></div>
        `;
    }


    click_preview() // Разобраться с кнопкой (чтобы когда и на неё нажимали, убиралось окно)
    {
        document.body.addEventListener("click", (e) => { 
            // count ставится на нажатый элемент сохраняя прежнее свое знач
            if(e.target.classList.contains("mask__extra--icon"))
            {
                let idEelement = e.target.parentNode.parentNode.id;

                if(document.querySelector( "#" + idEelement ).dataset.count > 0)
                    document.querySelectorAll(".aboutus__item").forEach(
                        item => {
                            if(item != document.querySelector( "#" + idEelement ))
                            {
                                item.dataset.count = 0;
                            }
                        }
                    );
                 
                document.querySelector( "#" + idEelement ).dataset.count = 1 + Number(document.querySelector( "#" + idEelement ).dataset.count);
                let count = document.querySelector( "#" + idEelement ).dataset.count;

                if((count % 2) == 0)
                {
                    document.querySelector( "#" + idEelement + " .extra__window" ).innerHTML = "";
                    document.querySelector( "#" + idEelement + " .extra__window" ).classList.add("disable");
                }
                if((count % 2) == 1)
                {
                    document.querySelector( "#" + idEelement + " .extra__window" ).innerHTML = this.render_description(idEelement);
                    document.querySelector( "#" + idEelement + " .extra__window" ).classList.remove("disable");
                }
            }
         });
    }

    init()
    {
        this.render_preview();
        this.click_preview();
    }
}

class renderReview
{
    constructor(params)
    {
        this.data = params;
    }

    renderContent()
    {
        document.querySelector(".reviews__container").innerHTML = "";

        function HTML_COMMENTS(data)
        {
            return `
                <div class="review">
                    <h3 class="review__name">${data.name}</h3>
                    <h4 class="review__organ">${data.campany}</h4>
                    <p class="review__descriptrion description">
                        ${data.text}
                    </p>
                    <div class="review__stars srars_${data.rating}x">
                        <div class="star"></div>
                        <div class="star"></div>
                        <div class="star"></div>
                        <div class="star"></div>
                        <div class="star"></div>
                    </div>
                    <div class="review__data">${data.date}</div>
                </div>
            `;
        }

        for(let i = 1; i <= Object.keys(this.data.COMMENTS).length; i++)
        {
            document.querySelector(".reviews__container").insertAdjacentHTML( 'afterbegin', HTML_COMMENTS(this.data.COMMENTS[i]) );
        }
    }

    init()
    {
        this.renderContent();
    }
}

// Buttons
function openSetting(event)
{
    let path;

    if(event.classList.contains("setting__preview"))
    {
        path = document.querySelector( "#"+event.parentNode.parentNode.id+" .setting--list" );
        if(event.parentNode.parentNode.id == "list-lang" || event.parentNode.parentNode.id == "list-theme")
            path = document.querySelector( "#"+event.parentNode.parentNode.id+".setting--list" );
            
        path.classList.toggle("disable");

        if(event.closest(".setting"))
            if(path.classList.contains("disable"))
                document.querySelectorAll(".setting--list").forEach( item => { item.classList.add("disable"); });
    }
}
function settingSetParams(event)
{
    let tempDefault, tempSet;

    if(event.classList.contains("setting__preview"))
    {
        if(Object.keys(event.dataset).length != 0)
        {
            if(event.dataset.lang)
            {
                if(event.dataset.status == "set")
                {
                    tempDefault = document.querySelector("#lang .setting__preview").dataset.lang;
                    tempSet = event.dataset.lang;

                    document.querySelector("#lang .setting__preview").textContent = tempSet;
                    document.querySelector("#lang .setting__preview").dataset.lang = tempSet;

                    event.textContent = tempDefault;
                    event.dataset.lang = tempDefault;

                    localStorage.lang = tempSet;
                    renderHTML();
                }
            }
            if(event.dataset.mod)
            {
                if(event.dataset.status == "set")
                {
                    tempDefault = document.querySelector("#theme .setting__preview").dataset.mod;
                    tempSet = event.dataset.mod;

                    document.querySelector("#theme .setting__preview").classList.remove(tempDefault+"-mod");
                    document.querySelector("#theme .setting__preview").classList.add(tempSet+"-mod");
                    document.querySelector("#theme .setting__preview").dataset.mod = tempSet;

                    event.classList.remove(tempSet+"-mod");
                    event.classList.add(tempDefault+"-mod");
                    event.dataset.mod = tempDefault;

                    joinTheme(tempSet);
                    localStorage.theme = tempSet;
                }
            }
        }
    }
}

function joinTheme(name)
{
    return document.querySelector("#switcherTheme").href = 'style/themes/' + name + ".css";
}

function getUrlVars(parm)
{
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars[parm];
}

function setDefaultTheme(tempSet, tempDefault)
{
    document.querySelector("#lang .setting__preview").textContent = tempSet;
    document.querySelector("#lang .setting__preview").dataset.lang = tempSet;

    document.querySelector("#list-lang .setting__preview").textContent = tempDefault;
    document.querySelector("#list-lang .setting__preview").dataset.lang = tempDefault;
}

const ICONS_NETWORK = {
    "discord": `<svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20z" fill="#7289DA"/><path d="M26.891 11H13.11c-1.164 0-2.11.92-2.11 2.06v13.52c0 1.14.946 2.06 2.109 2.06h11.664l-.546-1.85 1.317 1.19 1.245 1.12L29 31V13.06c0-1.14-.946-2.06-2.109-2.06zm-3.97 13.06s-.37-.43-.679-.81c1.348-.37 1.862-1.19 1.862-1.19a5.96 5.96 0 01-1.183.59c-.514.21-1.008.35-1.491.43-.988.18-1.893.13-2.664-.01a8.821 8.821 0 01-1.512-.43c-.237-.09-.494-.2-.751-.34-.031-.02-.062-.03-.093-.05a.142.142 0 01-.04-.03c-.186-.1-.289-.17-.289-.17s.494.8 1.8 1.18c-.308.38-.689.83-.689.83-2.273-.07-3.137-1.52-3.137-1.52 0-3.22 1.481-5.83 1.481-5.83 1.481-1.08 2.89-1.05 2.89-1.05l.103.12c-1.851.52-2.705 1.31-2.705 1.31s.226-.12.607-.29c1.1-.47 1.975-.6 2.335-.63.061-.01.113-.02.175-.02a8.95 8.95 0 012.077-.02c.977.11 2.027.39 3.096.96 0 0-.812-.75-2.56-1.27l.143-.16s1.41-.03 2.89 1.05c0 0 1.482 2.61 1.482 5.83 0 0-.875 1.45-3.148 1.52zm-4.783-4.67c-.586 0-1.049.5-1.049 1.11 0 .61.473 1.11 1.05 1.11.586 0 1.048-.5 1.048-1.11.01-.61-.462-1.11-1.049-1.11zm3.755 0c-.587 0-1.05.5-1.05 1.11 0 .61.474 1.11 1.05 1.11.586 0 1.049-.5 1.049-1.11 0-.61-.463-1.11-1.05-1.11z" fill="#fff"/></svg>`,
    "git": `<svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="15" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15 3C8.37 3 3 8.37 3 15c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0027 15c0-6.63-5.37-12-12-12z" fill="#000"/></svg>`,
    "inst": `<svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="15" fill="url(#paint0_linear)"/><path d="M19.936 9h-9.122A1.78 1.78 0 009 10.814v9.122a1.78 1.78 0 001.814 1.814h9.122a1.78 1.78 0 001.814-1.814v-9.122A1.78 1.78 0 0019.936 9zm-4.561 10.2c2.109 0 3.825-1.667 3.825-3.678 0-.343-.049-.736-.147-1.03h1.079v5.198a.49.49 0 01-.49.49h-8.533a.491.491 0 01-.49-.49v-5.247h1.127a3.732 3.732 0 00-.147 1.03c-.049 2.06 1.667 3.727 3.776 3.727zm0-1.471c-1.373 0-2.452-1.079-2.452-2.403s1.079-2.403 2.452-2.403 2.452 1.079 2.452 2.403c0 1.373-1.079 2.403-2.452 2.403zm4.708-5.247c0 .294-.245.54-.54.54H18.17a.544.544 0 01-.54-.54v-1.324c0-.294.246-.54.54-.54h1.373c.294 0 .54.245.54.54v1.324z" fill="#fff"/><defs><linearGradient id="paint0_linear" x1="6.375" y1="26.625" x2="26.25" y2="6" gradientUnits="userSpaceOnUse"><stop stop-color="#EEA054"/><stop offset=".503" stop-color="#D64763"/><stop offset="1" stop-color="#B62A99"/></linearGradient></defs></svg>`,
    "steam": `<svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="15" fill="#000"/><g clip-path="url(#clip0)" fill="#fff"><path d="M20.725 6.086c-3.035 0-5.511 2.443-5.535 5.455l-3.446 4.919c-.962-.087-1.791.111-2.524.556l-4.72-1.9v5.19l2.791 1.117a4.138 4.138 0 004.03 3.241c2.137 0 3.908-1.634 4.103-3.715l5.306-3.86c3.044 0 5.52-2.456 5.52-5.503v-.001c0-3.032-2.477-5.5-5.525-5.5zM8.64 21.964c.494.189.995.396 1.49.59a2.404 2.404 0 003.142-1.33 2.39 2.39 0 00-1.345-3.12l-1.262-.507c1.88-.417 3.69.991 3.69 2.95 0 1.678-4.24 4.176-5.715 1.417zm12.089-6.692c-2.049 0-3.714-1.645-3.714-3.686 0-2.032 1.66-3.686 3.714-3.686 2.035 0 3.7 1.654 3.7 3.686a3.688 3.688 0 01-3.7 3.686z"/><path d="M20.74 8.629a2.955 2.955 0 00-2.96 2.95c0 1.63 1.32 2.95 2.96 2.95a2.958 2.958 0 002.96-2.95 2.958 2.958 0 00-2.96-2.95z"/></g><defs><clipPath id="clip0"><path fill="#fff" transform="translate(4.5 4.5)" d="M0 0h21.75v21.75H0z"/></clipPath></defs></svg>`,
    "telegram": `<svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="15" fill="#2F89CE"/><path d="M7.013 15.28l3.449 1.287 1.344 4.325c.058.292.41.35.643.175l1.929-1.578c.175-.175.467-.175.701 0l3.449 2.513c.234.176.584.059.643-.233l2.572-12.275c.058-.292-.234-.585-.527-.468L7.013 14.521c-.35.117-.35.643 0 .76zm4.618.644l6.78-4.15c.117-.059.234.117.117.175l-5.553 5.202c-.175.175-.35.41-.35.701l-.176 1.403c0 .175-.292.234-.35 0l-.702-2.572c-.176-.292-.059-.643.234-.76z" fill="#fff"/></svg>`,
    "vk": `<svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="15" fill="#7294C7"/><path d="M22.355 18.836c0-.062-.063-.062-.063-.124-.249-.498-.81-1.12-1.556-1.806-.374-.311-.56-.56-.685-.685-.187-.249-.187-.436-.125-.685.063-.186.312-.498.747-1.058.25-.312.374-.498.56-.685.935-1.245 1.37-2.055 1.246-2.429l-.062-.062c-.062-.062-.125-.124-.25-.124-.124-.063-.31-.063-.497 0h-2.802l-.063.062c-.062.062-.062.062-.062.124-.249.685-.56 1.246-.872 1.868-.186.312-.373.623-.56.872-.187.25-.311.436-.436.56-.124.125-.249.187-.311.312-.063.062-.187.124-.187.062-.062 0-.125 0-.125-.062l-.186-.187c-.063-.062-.063-.187-.125-.311v-3.114c0-.062-.062-.186-.062-.249l-.187-.187c-.062-.062-.187-.062-.249-.124a5.583 5.583 0 00-1.12-.125c-.997 0-1.682.063-1.931.187-.125.063-.25.125-.311.25-.125.124-.125.186-.063.186.312.062.56.187.685.374l.063.124c.062.063.062.187.124.374s.062.373.062.623v.996c0 .311-.062.498-.062.685 0 .187-.062.311-.125.373-.062.125-.062.187-.124.187 0 0 0 .062-.062.062-.063 0-.125.063-.25.063a.472.472 0 01-.248-.125.75.75 0 01-.312-.311 2.172 2.172 0 01-.373-.56c-.125-.25-.312-.499-.436-.872l-.125-.25a8.784 8.784 0 01-.311-.684c-.125-.312-.25-.56-.374-.872-.062-.125-.124-.187-.187-.25h-.062s-.062-.061-.124-.061c-.063 0-.125-.063-.187-.063H7.348c-.249 0-.373.063-.436.125l-.062.062v.125c0 .062 0 .124.062.249.312.747.685 1.494 1.059 2.241.374.685.747 1.308.996 1.744.312.436.56.872.872 1.245.311.374.498.623.56.747l.25.25.186.186c.125.125.311.312.56.498.25.187.561.374.872.56.312.188.685.312 1.059.437.436.124.81.186 1.183.124h.934a.566.566 0 00.436-.187l.062-.062c0-.062.062-.062.062-.124v-.25c0-.249 0-.435.063-.622.062-.187.062-.312.124-.436a.86.86 0 01.187-.25l.125-.124h.062c.124-.062.311 0 .436.125.186.124.373.311.498.498.124.187.311.374.56.623.25.249.436.436.56.498l.187.124c.125.063.25.125.436.187.187.063.312.062.436.062l2.117-.062c.187 0 .374-.062.498-.124.125-.063.187-.125.187-.25v-.248c-.124-.125-.124-.187-.124-.25z" fill="#fff"/></svg>`,
    "youtube": `<svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="15" fill="#F40000"/><path d="M21.535 14.185c0-.291-.049-.63-.049-1.018a67.126 67.126 0 00-.145-1.115c-.097-.388-.242-.68-.533-.922a1.638 1.638 0 00-.922-.436c-1.115-.146-2.763-.194-4.994-.194-2.23 0-3.927.049-4.994.194a1.634 1.634 0 00-.92.436 1.935 1.935 0 00-.534.921c-.097.34-.146.68-.146 1.116-.048.388-.048.727-.048 1.018v2.23c0 .291.048.63.048 1.018.049.388.097.776.146 1.116.097.387.242.678.533.92.243.243.582.389.921.437 1.116.146 2.764.194 4.994.194s3.928-.049 4.994-.194c.34-.048.68-.194.922-.436.242-.243.436-.534.533-.921.097-.34.145-.68.145-1.116.049-.387.049-.727.049-1.018v-2.23zm-4.073 1.503l-3.83 2.376a.37.37 0 01-.243.097c-.097 0-.145 0-.242-.049a.509.509 0 01-.242-.436v-4.8a.51.51 0 01.242-.437.44.44 0 01.485 0l3.83 2.376c.146.097.242.243.242.388 0 .146-.096.388-.242.485z" fill="#fff"/></svg>`
}

/*
    # 1. Не пойму почему на некоторых устройствах сколл не опускается до футера
    # 2. Попробовал покапать в сторону "Переполнение", "координаты элемента", ручками вписывал высоту (впринципе в таком случае работает, НО это хреновый вариант)
    # 3. Я хз что делать, буду гуглить еще, но тут полюбому дело в разметки, вообще надо лишнее по-вырезать и посмотреть как будет
*/

 
// Open setting
document.body.addEventListener("click", (e) => openSetting(e.target));

// set width header
document.querySelector(".header").style.width = document.querySelector("main").clientWidth + "px";

// Close
document.body.addEventListener("click", (e) => {
    if(!e.target.closest(".setting"))
        if(!document.querySelector(".setting--list").classList.contains("disable"))
            document.querySelectorAll(".setting--list").forEach( item => { item.classList.add("disable"); });

    if(!e.target.closest(".aboutus__extra--button") || !e.target.closest(".extra__window"))
        document.querySelectorAll(".aboutus__item").forEach( item => {
            item.querySelector( ".extra__window" ).classList.add("disable")
            if(item.dataset.count >= 1)
                item.dataset.count = 0;
        });
        
    if(document.body.clientWidth > 415)
    {
        document.querySelectorAll(".aboutus__item").forEach(item => {
            item.querySelector(".extra__window").classList.remove("extra__window--pos_r");
        });
    
        document.querySelectorAll(".aboutus__item").forEach(item => {
            if(document.body.clientWidth / 2 <= item.getBoundingClientRect().x)
                item.querySelector(".extra__window").classList.add("extra__window--pos_r");
            if(document.body.clientWidth / 2 > item.getBoundingClientRect().x)
                item.querySelector(".extra__window").classList.add("extra__window--pos_l");
        });
    }
});
// Set params
document.querySelector(".setting").addEventListener("click", (e) => settingSetParams(e.target));

// open/Close menu adaptive
document.querySelector(".open__list").addEventListener("click", (e) => {
    document.querySelector(".logo").classList.toggle("disable");
    document.querySelector(".menu").classList.toggle("disable");
    document.querySelector(".header__extra").classList.toggle("disable");

    document.querySelector(".header--fixed").style.boxShadow = "0 7px 12px rgba(0, 0, 0, 0.3)";
});



// set disable style menu and close menu
if(document.body.clientWidth <= 1330)
{
    document.querySelector(".logo").classList.add("disable");
    document.querySelector(".menu").classList.add("disable");
    document.querySelector(".header__extra").classList.add("disable");

    document.body.addEventListener("click", (e) => {
        if(
            e.target.closest(".header") == null && 
            !document.querySelector(".logo").classList.contains("disable") ||
            e.target.closest(".setting") ||
            e.target.closest(".menu__item") ||
            e.target.closest(".link__item") ||
            e.target.classList.contains("menu__item") ||
            e.target.classList.contains("link__item")
        )
        {
            document.querySelector(".logo").classList.add("disable");
            document.querySelector(".menu").classList.add("disable");
            document.querySelector(".header__extra").classList.add("disable");
        }
    });
}

// Close Pop_up
document.querySelector(".pop_up__service").addEventListener("click", (e) => {
    if( e.target.classList == "pop_up__service")
    {
        e.target.classList.add("disable");
        document.body.style.overflow = "auto";
    }
});

