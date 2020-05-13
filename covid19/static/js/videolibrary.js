var cat = '';
var lang = '';
var key = '';

function goToShareApp(id) {
    window.location.href = `https://psanodeapp1.appspot.com/videolibrary/${id}`;
}

function goToRecorderApp(psaId) {
    window.location.href = `${window.location.origin}/recorder/index.html#/recorder/?id=${psaId}`
}
function individualChallenge(id) {
    window.location.href = `detail_individualvideochallenge.html?id=${id}`;
}

function languageChange(value) {
    localStorage.setItem("language", value);
    updateContent(value);
}

function updateContent(_lang) {
    lang = _lang;
    updateMenu(lang);
    filtercat('health');
}

function filtercat(_cat) {
    console.log(_cat);
    cat = _cat;
    $('[id*="cat_"] > div').removeClass("selected");
    $(`#cat_${cat} > div`).toggleClass("selected");
    libData();
    $('#page_title').html(`${selectLangMenu.menu.video_library}`);
}

function search(e) {
    key = e.target.value;
    if (e.keyCode == 13) {
        libData();
        return false;
    } else {
        return true;
    }
}

function libData() {
    var cards = ["green", "pink", "purple", "orange"];
    firebase.firestore().collection("videolibrary").where("lang", "==", lang).get().then(function (querySnapshot) {
        $('.firebaseData').html('');
        if (querySnapshot.docs.length == 0) {
            $('.w-dyn-empty').show();
        } else {
            $('.w-dyn-empty').hide();
        }
        var i = 1;
        key = key.trim();
        querySnapshot.forEach(snapItem => {
            if (snapItem.exists) {
                const element = snapItem.data();
                if (searchInString(element.video_title, key) || searchInString(element.description, key)) {
                    var card = cards[Math.abs((cards.length - (i - 1)) % 4)];
                    // element.description = 'Video Description';
                    var content = `<div class="video_card ${card}">
                    <div class="video_iframe">
                    <div class="iframe_wrap">
                    <iframe class="embedly-embed" src="${element.video_url}" scrolling="no" title="${element.video_dec}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true">
                    </iframe>
                    </div>  
                    </div>
                    <div class="challange_meta">
                    <h4 class="challange_label">${element.video_title}</h4>
                    <h1 class="card-title white">${trimSentence(element.description)}</h1>
                    <div class="challange-info white-80">Wed, April 8 2020 10:09 PM</div>
                    <div class="card-btns-flex centered">
                        <div class="card-btn">
                            <a href="#" onclick="goToShareApp('${snapItem.id}');return false;" class="btn-elipse light-grey w-inline-block">
                                <img src="images/share-icon-white.svg" width="18" height="18" alt="" class="card-btn-logo">
                            </a>
                        </div>
                        <div class="btn_label">${element.video_text}</div>
                    </div>
                    </div>
                    </div>`;
                    $('.firebaseData').append(content);
                    i += 1;
                }
            }
        });
    })
}