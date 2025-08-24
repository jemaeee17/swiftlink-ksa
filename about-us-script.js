$(document).ready(function () {
    let typed = null;
    let currentLang = "en";

    fetch("lang.json")
        .then(response => response.json())
        .then(translations => {

            function startTyping(lang) {
                if ($("#typed-it").length) { // only if element exists
                    if (typed) typed.destroy();
                    $("#typed-it").text("");
                    $("#typed-it").attr("dir", "ltr").css("text-align", "left");

                    typed = new Typed("#typed-it", {
                        strings: translations[lang].typedStrings,
                        typeSpeed: 80,
                        backSpeed: 40,
                        loop: true
                    });
                }
            }

            function setLanguage(lang) {
                currentLang = lang;

                $("[data-translate]").each(function () {
                    const key = $(this).data("translate");
                    if (translations[lang][key]) {
                        $(this).text(translations[lang][key]);
                    }
                });

                $("body").attr("dir", "ltr");
                startTyping(lang);
            }

            setLanguage(currentLang);

            $(".dropdown-item").on("click", function (e) {
                e.preventDefault();
                const lang = $(this).attr("href").replace("?lang=", "");
                setLanguage(lang);
                localStorage.setItem("lang", lang); // ✅ Remember language across pages
            });

            // Restore language on page load
            const savedLang = localStorage.getItem("lang");
            if (savedLang) {
                setLanguage(savedLang);
            }

            // Scroll animation only if .contact-section exists
            const contactSection = document.querySelector(".contact-section");
            if (contactSection) {
                window.addEventListener("scroll", () => {
                    const scrollPosition = window.scrollY;
                    const contactSectionTop = contactSection.offsetTop;
                    if (scrollPosition >= contactSectionTop - window.innerHeight / 2) {
                        contactSection.classList.add("animated");
                    }
                });
            }
        });
});
