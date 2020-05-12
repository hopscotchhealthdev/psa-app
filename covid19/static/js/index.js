function updateContent(lang) {
    updateMenu(lang);
    featureData(lang);
    var en = {
        "home": {
            "title": "Record KaroNa",
            "heading": "The battle against Coronavirus isn't over.",
            "description": "As India emerges from lockdown, amplifying the right information is crucial to help tackle the spread of Coronavirus. Use your platform as a community leader to record and share important public health messages that reach your followers.",
            "challenge_button": "Take a video challenge",
            "about": "ABOUT",
            "text1": "Use your platform to make a difference",
            "text1_description": "Record public service announcements created by public health experts upload it to our Video Library.",
            "text2": "Share your Public Service Announcement",
            "text2_description": "Share your videos to your various social media accounts to spread the word! Droplets make an ocean.",
            "text3": "Drive healthy behaviours",
            "text3_description": "Watch videos of your friends, neighbours, and the world taking measures to fight Coronavirus. See what they’re saying!"
        }
    }

    var hi = {
        "home": {
            "title": "COVID-19 वीडियो चुनौती",
            "heading": "आओ मिलकर कोविद -19 को हराएं.",
            "description": "हमें बताएं कि आप क्या कर रहे हैं और कोरोनोवायरस-मुक्त रहने में क्या लगता है! एक साथ शब्द और #flattenthecurve फैलाएं!",
            "challenge_button": "एक वीडियो चुनौती लें",
            "about": "के बारे में",
            "text1": "एक फर्क करने के लिए अपने मंच का उपयोग करें",
            "text1_description": "सार्वजनिक स्वास्थ्य विशेषज्ञों द्वारा बनाई गई रिकॉर्ड सार्वजनिक सेवा की घोषणाएं इसे हमारे वीडियो लाइब्रेरी में अपलोड करती हैं।",
            "text2": "लूप में रहें",
            "text2_description": "अपने दोस्तों, पड़ोसियों, और दुनिया को कोरोनोवायरस से लड़ने के उपाय करते हुए देखें - देखें कि वे क्या कह रहे हैं!",
            "text3": "अपनी सार्वजनिक सेवा घोषणा साझा करें",
            "text3_description": "शब्द फैलाने के लिए अपने वीडियो अपने विभिन्न सोशल मीडिया खातों में साझा करें! बूंदें एक महासागर बनाती हैं।"
        }
    }

    var ma = {
        "home": {
            "title": "कोविद १९  व्हिडियो आव्हान",
            "heading": "कोविद १९ चा पसर थांबवा, स्वतः. इकडे फ्री मध्ये नोंदणी करा.",
            "description": "कोविद पसरा थांबवणे याचा साठी तुम्ही काय उपाय घेत आहात.एकत्र कोविद थांबूया!",
            "challenge_button": "व्हिडियो आव्हान घ्या",
            "about": "जाणीव",
            "text1": "आपला व्यासपीठ वापर, लोकांना माहिती देण्या करिता",
            "text1_description": "आरोग्य तज्ञ नि दिलेली घोषणा चे विडिओ रेकॉर्ड करा आणि अपलोड करा",
            "text2": "माहिती ठेवा",
            "text2_description": "इथे बघा आपले मित्र, शेजारचे अँड जगातील लोक काय उपाय घेत आहेत, कॉरोन विरुद्ध लढायला",
        }
    }


    var be = {
        "home": {
            "title": "কোভিড-১৯ ভিডিও চ্যালেঞ্জ",
            "heading": " আসুন, কোভিড-১৯কে হারাতে একসাথে এগোনো যাক",
            "description": " আমাদেরকে বলুন আপনি কি করছেন করোনাভাইরাসের থেকে নিজেকে সুরক্ষিত রাখতে! আসুন, বার্তা ছড়িয়ে দেওয়া যাক, এবং একসাথে আমরা করোনা সংক্রমণের গতিবেগকে কমিয়ে আনি!",
            "challenge_button": "একটি ভিডিও চ্যালেঞ্জে অংশগ্রহণ করুন",
            "about": "এর ব্যাপারে জানুন",
            "text1": "আপনার অনলাইন উপস্থিতিকে কাজে লাগান একটা ইতিবাচক প্রভাব ফেলতে",
            "text1_description": "গনস্বাস্থ্য বিজ্ঞানীদের দ্বারা বানানো  জনসচেতনতা মূলক বার্তা রেকর্ড করে আমাদের ভিডিও লাইব্রেরিতে আপলোড করুন",
            "text2": "এই লুপটিতে থাকুন",
            "text2_description": "আপনার বন্ধু, প্রতিবেশী এবং অন্যান্যদের বানানো ভিডিও দেখুন - তাঁরা কিভাবে করোনাভাইরাসের সংক্রমন ঠেকাতে নিজেদেরকে সুরক্ষিত রাখছেন - দেখুন তাঁরা কি বলছেন!"
            ,
            "text3": " আপনার জনসচেতনতামূলক বার্তাটি শেয়ার করুন",
            "text3_description": "আপনার ভিডিওগুলোকে বিভিন্ন সোশ্যাল মিডিয়া প্ল্যাটফর্মে শেয়ার করুন, যাতে বার্তা ছড়িয়ে দেওয়া যায়! বিন্দুতে বিন্দুতেই সিন্ধু হয়!"

        }
    }

    var ta = {
        "home": {
            "title": "கோவிட் -19 வீடியோ சவால் ",
            "heading": "கோவிட் -19 ஐ வெல்ல ஒன்றாக வாருங்கள்",
            "description": "நீங்கள் கொரோனா வைரஸ் இல்லாத நிலையில் உருவாக்க என்ன செய்கிறீர்கள்,என்ன தேவை என்று எங்களிடம் கூறுங்கள்! இந்த வார்த்தையை பரப்புவோம், #flattenthecurve ஒன்றாக!",
            "challenge_button": "வீடியோ சவாலை எடுத்துக் கொள்ளுங்கள்",
            "about": "எங்களை  பற்றி",
            "text1": "ஒரு வித்தியாசத்தை உருவாக்க உங்கள் தளத்தைப் பயன்படுத்தவும்",
            "text1_description": "பொது சுகாதார வல்லுநர்களால் உருவாக்கப்பட்ட பொது சேவை அறிவிப்புகளை எங்கள் வீடியோ நூலகத்தில் பதிவேற்றம் செய்க",
            "text2": " வளையத்தில் இருங்கள்",
            "text2_description": "உங்கள் நண்பர்கள், அயலவர்கள் மற்றும் உலகம் கொரோனா வைரஸை எதிர்த்துப் போராட நடவடிக்கை எடுக்கும் வீடியோக்களைப் பாருங்கள் - அவர்கள் என்ன சொல்கிறார்கள் என்று பாருங்கள்!",
            "text3": "உங்கள் பொது சேவை அறிவிப்பைப் பகிரவும்",
            "text3_description": "உங்கள் வீடியோக்களை உங்கள் பல்வேறு சமூக ஊடக கணக்குகளில் பகிர்ந்து கொள்ளுங்கள். நீர்த்துளிகள் ஒரு சமுத்திரத்தை உருவாக்கும்"


        }
    }

    selectLang = en;
    switch (lang) {
        case "en":
            selectLang = en;
            break;
        case "hi":
            selectLang = hi;
            break;
        case "ma":
            selectLang = ma;
            break;
        case "be":
            selectLang = be;
            break;
        case "ta":
            selectLang = ta;
            break;

    }
    $('#title').html(selectLang.home.title);
    $('#heading').html(selectLang.home.heading);
    $('#paragraph').html(selectLang.home.description);
    $('#challenge_btn').html(selectLang.home.challenge_button);

    $('#about').html(selectLang.home.about);
    $('#text1').html(selectLang.home.text1);
    $('#text1_description').html(selectLang.home.text1_description);
    $('#text2').html(selectLang.home.text2);
    $('#text2_description').html(selectLang.home.text2_description);
    $('#text3').html(selectLang.home.text3);
    $('#text3_description').html(selectLang.home.text3_description);
}
function featureData(lang) {
    firebase.firestore().collection("dailyfeaturevideohomepage").doc(lang).get().then(function (querySnapshot) {
        if (!querySnapshot.exists) {
            $('.w-dyn-empty').show();
            $('.firebaseData').html("");
        } else {
            const data = querySnapshot.data();
            $('.w-dyn-empty').hide();
            $('.firebaseData').html('<h2 class="heading-16"><strong class="bold-text-12">' + data.title + ' </strong></h2><div class="text-block-22"><a href="#" class="link-7">' + data.text + '</a></div><div class="w-dyn-list"><div class="w-dyn-items"><div class="w-dyn-item"><div class="w-row"><div class="w-col w-col-6"><div style="padding-top:56.17021276595745%" class="w-video w-embed"><iframe class="embedly-embed" src="' + data.video_url + '" scrolling="no" title="YouTube embed" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"></iframe></div></div><div class="column-22 w-col w-col-6"><h2 class="heading-17">' + data.video_title + '</h2><p class="paragraph-7">' + data.video_text + '</p></div></div></div></div></div>'
            );
        }
    });
}