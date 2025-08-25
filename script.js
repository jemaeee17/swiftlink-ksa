$(document).ready(function () {
    let typed = null;
    let currentLang = "en";

    fetch("lang.json")
        .then(response => response.json())
        .then(translations => {

            // Typed animation
            function startTyping(lang) {
                if ($("#typed-it").length) {
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

            // Translation function
            function setLanguage(lang) {
                currentLang = lang;

                $("[data-translate]").each(function () {
                    const key = $(this).data("translate");
                    if (translations[lang][key]) {
                        const value = translations[lang][key];

                        if ($(this).is("input") || $(this).is("textarea")) {
                            $(this).attr("placeholder", value);
                        } else if ($(this).is("option")) {
                            $(this).text(value);
                        } else if (/<[a-z][\s\S]*>/i.test(value)) {
                            $(this).html(value);
                        } else {
                            $(this).text(value);
                        }
                    }
                });

                // Keep everything LTR
                $("body").attr("dir", "ltr");

                startTyping(lang);
            }

            // Handle language switch dropdown
            $(".dropdown-item").on("click", function (e) {
                e.preventDefault();
                const lang = $(this).attr("href").replace("?lang=", "");
                setLanguage(lang);
                localStorage.setItem("lang", lang); // Remember language across pages
            });

            // Restore language on page load or default to English
            const savedLang = localStorage.getItem("lang") || "en";
            setLanguage(savedLang);
            currentLang = savedLang;

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
