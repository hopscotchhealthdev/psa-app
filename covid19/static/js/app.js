$(document).ready(function () {
    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
        if (!(event.target.matches('.hamburger-line') || event.target.matches('#nav'))) {
            var el = document.getElementById("nav-mobile");
            if (el.classList.contains("show-nav")) {
                el.classList.remove('show-nav');
            }
        }
    }

    if (localStorage.getItem("language")) {
        updateContent(localStorage.getItem("language"));
    } else {
        updateContent('en');
    }
    $('.lang-dropdown').html(`<a onclick="languageChange('en')">English</a>
    <a onclick="languageChange('hi')">Hindi</a>
    <a onclick="languageChange('ma')">Marathi</a>
    <a onclick="languageChange('be')">Bengali</a>
    <a onclick="languageChange('ta')">Tamil</a>`);
})

var en_menu = {
    "menu": {
        "home": "HOME",
        "video_challenge": "VIDEO CHALLENGES",
        "video_library": "VIDEO LIBRARY",
        "faq": "FAQS",
        "login": "LOGIN"
    }
}

var hi_menu = {
    "menu": {
        "home": "घर",
        "video_challenge": "वीडियो चुनौती",
        "video_library": "वीडियो पुस्तकालय",
        "faq": "सामान्य प्रश्नोत्तर",
        "login": "लॉग इन करें"
    }

}

var ma_menu = {
    "menu": {
        "home": "सुरुवात",
        "video_challenge": " व्हिडियो आव्हान",
        "video_library": "सगळे व्हिडिओस",
        "faq": "प्रश्नांचे उत्तर",
        "login": "लॉगिन"
    }
}


var be_menu = {
    "menu": {
        "home": "হোমপেজে যান",
        "video_challenge": "ভিডিও চ্যালেঞ্জগুলো",
        "video_library": "ভিডিও সংকলন",
        "faq": "কিছু সাধারন প্রশ্নের উত্তর",
        "login": "লগ-ইন"
    }
}

var ta_menu = {
    "menu": {
        "home": "முகப்பு",
        "video_challenge": "வீடியோ சவால்கள்",
        "video_library": "வீடியோ லைப்ரரி",
        "faq": "அடிக்கடி கேட்கப்படும் கேள்விகள்",
        "login": "உள்நுழை"
    }
}

function updateMenu(lang) {
    selectLangMenu = en_menu;
    switch (lang) {
        case "en":
            selectLangMenu = en_menu;
            break;
        case "hi":
            selectLangMenu = hi_menu;
            break;
        case "ma":
            selectLangMenu = ma_menu;
            break;
        case "be":
            selectLangMenu = be_menu;
            break;
        case "ta":
            selectLangMenu = ta_menu;
            break;

    }

    var m = selectLangMenu.menu;

    $('.nav_for_index').html(`<a href="videolibrary.html" class="nav-link w-nav-link" id="nav_challenge">${m.video_library}</a>
    <a href="videochallenges.html" class="nav-link w-nav-link" id="nav_library">${m.video_challenge}</a>
    <a href="faqs.html" class="nav-link w-nav-link" id="nav_faq">${m.faq}</a>
    <a href="terms-and-conditions.html" class="nav-link w-nav-link" id="nav_privacypolicy">Privacy Policy</a>
    <a href="../login/index.html" class="nav-link w-nav-link" id="nav_login">${m.login}</a>`);

    $('.nav_for_other').html(`<a href="index.html" class="nav-link w-nav-link" id="nav_home">${m.home}</a>
    <a href="videolibrary.html" class="nav-link w-nav-link" id="nav_challenge">${m.video_library}</a>
    <a href="videochallenges.html" class="nav-link w-nav-link" id="nav_library">${m.video_challenge}</a>
    <a href="faqs.html" class="nav-link w-nav-link" id="nav_faq">${m.faq}</a>
    <a href="terms-and-conditions.html" class="nav-link w-nav-link" id="nav_privacypolicy">Privacy Policy</a>
    <a href="../login/index.html" class="nav-link w-nav-link" id="nav_login">${m.login}</a>`);
}

function showHiddenFlex(id) {
    console.log(id, document.getElementById(id).classList);
    document.getElementById(id).classList.toggle("show_flex");
}

function openLangDesktop() {
    document.getElementById("myDropdownDesktop").classList.toggle("show");
}

function openLang() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function openNav() {
    document.getElementById("nav-mobile").classList.toggle("show-nav");
}

function languageChange(value) {
    localStorage.setItem("language", value);
    updateContent(value);
}

function trimSentence(txt) {
    var firstLine = txt.split('. ')[0];
    if (firstLine != txt) {
        firstLine += '..';
    }
    return firstLine;
}

function searchInString(target, key) {
    if (key) {
        var str = target.toLowerCase();
        key = key.toLowerCase();
        var n = str.search(key);
        return n > -1;
    } else {
        return true;
    }
}

