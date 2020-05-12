function refreshContent() {
    if (localStorage.getItem("language")) {
        updateContent(localStorage.getItem("language"));
    } else {
        updateContent('en');
    }
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

function updateContent(lang) {
    updateMenu(lang);
    $('#page_title').html(selectLangMenu.menu.video_challenge);
    challengeData(lang);
}

function challengeData(lang) {
    var borders = ["green-border", "blue-border", "orange-border", "pink"];
    var borders_desktop = ["orange-outline", "blue-outline", "green-outline", "pink-outline"];
    firebase.firestore().collection("videochallenge").where("lang", "==", lang).orderBy("video_challenge", "asc").get().then(function (querySnapshot) {
        $('.firebaseData').html("");
        $('.firebaseDataDesktop').html("");
        if (querySnapshot.docs.length == 0) {
            $('.w-dyn-empty').show();
            $('.firebaseData').html("");
            $('.firebaseDataDesktop').html("");
        }
        var i = 1;
        querySnapshot.forEach(snapItem => {
            if (snapItem.exists) {
                $('.w-dyn-empty').hide();
                const data = snapItem.data();
                let buttons = "";
                if (data.buttons) {
                    data.buttons.forEach(item => {
                        // buttons = buttons + `
                        // <div style="padding-bottom: 5px;" onclick="goToRecorderApp('${item.psaId}')" class="w-col-32 w-col-4 width-32">
                        // <div class="button-9 w-button p-4">${item.text}</div></div>`;
                        buttons = buttons +
                            `<a class="challange_btn w-button" href="#" 
                            onclick="goToRecorderApp('${item.psaId}');return false;">${item.text}</a>`;
                    })
                }
                if (lang == "en") {
                    buttons = `<div class="display-flex">${buttons}</div>`;
                } else {
                    buttons = `<div class="display-center">${buttons}</div>`;
                }
                var border = borders[Math.abs((borders.length - (i - 1)) % 4)];
                var contentMobile = `
                <div class="challange_card ${border}" onclick="showHiddenFlex('${data.video_challenge}')">
                    <div class="challange_text_block">
                        <h1 class="challange_title_label">${data.title}</h1>
                        <div class="challange_sub__label">${data.description}</div>
                        <div class="recorders_wrap">
                            <img src="images/profile_grey.svg" width="13" height="13" alt="" class="recorder_svg">
                            <div class="challange_info__label">${data.share}</div>
                        </div>
                        <div class="challange_btns_wrap" id='${data.video_challenge}'>
                            ${buttons}
                        </div>
                    </div>
                    <div class="play_btn">
                        <img src="${data.image_url}" alt="" class="challange_illustration">
                    </div>
                </div>`;
                $('.firebaseData').append(contentMobile);

                border = borders_desktop[Math.abs((borders_desktop.length - (i - 1)) % 4)];
                var vis_wrap = `<div class="challange_visual_wrap">
                <div>
                <div class="play_btn">
                <img src="images/video-button-filled.svg" alt="" class="play_svg">
                <img src="${data.image_url}" alt="" />
                </div>
                <div class="video-bg-overlay no-borders"></div>
                </div>
                </div>`;
                var chl_info = `<div class="challange_info">
                <h1 class="challange_heading">${data.title}</h1>
                <p class="challange_p">${data.description}</p>
                <div class="recorders_wrap_desktop">
                <img src="images/profile_grey.svg" width="20" height="20" alt="" class="recorder_svg__desktop">
                    <div class="challange_info__label__desktop">${data.share}</div>
                </div>
                <div class="challange_btns_wrap__desktop">
                    ${buttons}
                </div>
                </div>`;
                var contentDesktop = `<div class="challange_module--desktop">
                <div class="challange_module_wrap ${border}">
                 ${i % 2 == 0 ? chl_info : vis_wrap}
                 ${i % 2 == 0 ? vis_wrap : chl_info}
                </div>
              </div>`;
                $('.firebaseDataDesktop').append(contentDesktop);
                // $('.firebaseData').append(
                //     `<div class="w-row mb-30">
                //     <div class="w-col w-col-6"><img src='${data.image_url}' height="180" alt=""></div>
                //     <div class="text-left w-col w-col-6"><a href="#" onclick="individualChallenge('${snapItem.id}')"  class="link-3">
                //     <strong class="bold-text-7">${data.title}</strong> </a><div class="text-block-7">${data.share}</div><
                //     div class="display-flex">${buttons}</div></div>`
                // );
                i += 1;
            }
        });
    });
}