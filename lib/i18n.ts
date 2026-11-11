export type SupportedLanguage = "en" | "ml" | "hi";

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
  script: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
    script: "Latin",
    flag: "EN",
  },
  {
    code: "ml",
    label: "Malayalam",
    nativeLabel: "മലയാളം",
    script: "Google Sans (Malayalam)",
    flag: "ML",
  },
  {
    code: "hi",
    label: "Hindi",
    nativeLabel: "हिन्दी",
    script: "Tiro Devanagari Hindi",
    flag: "HI",
  },
];

export const UI_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Navigation
    "nav.allSaints": "All Saints",
    "nav.calendar": "Feast Calendar",
    "nav.startReading": "Start Reading",
    "nav.settings": "Settings",
    "nav.contribute": "Contribute Now",
    "nav.home": "Home",

    // Hero
    "hero.tagline": "The Book of Christian Saints",
    "hero.title": "Sacred Lives & Enduring Chronicles",
    "hero.titlePart1": "Sacred Lives",
    "hero.titlePart2": "Enduring",
    "hero.titlePart3": "Chronicles",
    "hero.lead":
      "An architectural digital illuminated book dedicated to the stories, divine callings, and enduring legacies of Christian saints. Documenting dates of birth, beatification, canonisation, and annual feast days across two millennia.",
    "hero.ctaStart": "Start Reading",
    "hero.ctaChronicles": "All Chronicles",
    "hero.ctaCalendar": "Feast Calendar",
    "hero.tabDates": "Milestones",
    "hero.tabQuote": "Sacred Words",
    "hero.tabPatronage": "Patronage",

    // Featured Gallery
    "gallery.badge": "[ CURATED SACRED CHRONICLES ]",
    "gallery.title": "Featured Saints",
    "gallery.lead":
      "Selected sacred biographies documenting holy virtues, trials, milestone dates, and divine calling. Select any saint to read their complete dedicated chronicle.",
    "gallery.viewAll": "View All {count} Saints",
    "gallery.readChronicle": "Read Chronicle",
    "gallery.feast": "Feast",

    // All Saints Page
    "allSaints.title": "The Canon of Christian Saints",
    "allSaints.lead":
      "Comprehensive chronicle archive recording sacred biographies, milestone liturgical dates, and enduring relics across church history.",
    "allSaints.backHome": "Back to Home",
    "allSaints.searchPlaceholder": "Search by saint name, location, patronage, or words...",
    "allSaints.allEras": "All Eras",
    "allSaints.saintsCount": "{filtered} of {total} Saints",
    "allSaints.noResults": "No saints found matching your search filter.",
    "allSaints.clearFilter": "Clear Filter",

    // Eras
    "era.ALL": "All Eras",
    "era.Early Church": "Early Church",
    "era.Medieval": "Medieval",
    "era.Renaissance & Reformation": "Renaissance & Reformation",
    "era.Modern Era": "Modern Era",

    // Months
    "month.ALL": "All Feasts",
    "month.January": "January",
    "month.February": "February",
    "month.March": "March",
    "month.April": "April",
    "month.May": "May",
    "month.June": "June",
    "month.July": "July",
    "month.August": "August",
    "month.September": "September",
    "month.October": "October",
    "month.November": "November",
    "month.December": "December",

    // Calendar
    "calendar.badge": "[ LITURGICAL LEDGER & CHRONOLOGY ]",
    "calendar.title": "Feast Days & Canonisations",
    "calendar.lead":
      "Complete liturgical accession register tracking dates of birth, beatification decrees, solemn canonisations, and annual feast days.",
    "calendar.search": "Search feast or saint...",
    "calendar.allMonths": "All Months",
    "calendar.month": "Month",
    "calendar.readChronicle": "Read Chronicle",
    "calendar.upcoming": "Next Upcoming Feast",
    "calendar.liturgicalDays": "365 Liturgical Days",
    "calendar.born": "Born",
    "calendar.read": "Read",
    "calendar.patronOf": "Patron of",

    // Story Page
    "story.back": "All Saints Chronicles",
    "story.chronicle": "Sacred Chronicle",
    "story.archive": "SaintsBook Archive",
    "story.dob": "Date of Birth",
    "story.beatified": "Beatified Date",
    "story.canonised": "Canonised Date",
    "story.feastDay": "Feast Day",
    "story.patronages": "Patronages:",
    "story.iconography": "Iconography & Symbols:",
    "story.location": "Historical Location",
    "story.readIn": "Read this chronicle in:",
    "story.prev": "Previous Saint",
    "story.next": "Next Saint",
    "story.viewAll": "All Saints",

    // Footer
    "footer.creator": "A Christian saints reading platform created by",
    "footer.allRights": "SaintsBook Archive. All rights reserved.",
    "footer.scroll": "Scroll to top",

    // Language Footer Switcher
    "footerBar.title": "Reading Language",
    "footerBar.settings": "Language Settings",
    "footerBar.modePermanent": "Permanent",
    "footerBar.mode7days": "Saved for 7 days",
    "footerBar.modeSession": "Current session",

    // Settings Page
    "settings.masthead": "Preferences & Accessibility",
    "settings.title": "Language & Reading Settings",
    "settings.subtitle":
      "Configure your preferred language for website navigation and sacred saint chronicles, and decide how long SaintsBook should remember your preference.",
    "settings.languageSection": "1. Choose Website Language",
    "settings.languageSectionDesc":
      "Select your preferred language. SaintsBook will render headings, stories, and navigation in this language.",
    "settings.persistenceSection": "2. Language Persistence Strategy",
    "settings.persistenceSectionDesc":
      "Choose how your preference should be remembered across visits.",
    "settings.permanentLabel": "Permanently set language to {lang}",
    "settings.permanentDesc":
      "Your chosen language is saved in your browser storage and will remain your default until you change it.",
    "settings.sevenDaysLabel": "Remember my language for 7 days",
    "settings.sevenDaysDesc":
      "Your preference is preserved for one week. After 7 days, SaintsBook will check in with you again.",
    "settings.askEachTimeLabel": "Ask each time I load the website",
    "settings.askEachTimeDesc":
      "Does not save a long-term language setting. Displays a quick language selector when you visit anew.",
    "settings.activeBadge": "Currently Active",
    "settings.previewSection": "3. Live Chronicle Typography Preview",
    "settings.previewSectionDesc":
      "Real-time visual preview of how Malayalam (Google Sans), Hindi (Tiro Devanagari Hindi), and English text render.",
    "settings.resetButton": "Reset to Default (English)",
    "settings.savedSuccess": "Language preferences successfully updated!",
    "settings.expiresNotice": "Expires in {days} days ({date})",

    // Language Prompt Modal
    "prompt.title": "Choose Your Reading Language",
    "prompt.subtitle":
      "Welcome to SaintsBook. You can read the sacred chronicles and navigate in English, Malayalam, or Hindi.",
    "prompt.persistenceLabel": "Persistence Preference:",
    "prompt.remember7days": "Remember for 7 days",
    "prompt.recommendedBadge": "Recommended",
    "prompt.permanent": "Permanently set as my default",
    "prompt.sessionOnly": "Just for this session",
    "prompt.confirm": "Continue Reading",
  },

  ml: {
    // Navigation
    "nav.allSaints": "എല്ലാ വിശുദ്ധരും",
    "nav.calendar": "തിരുനാൾ കലണ്ടർ",
    "nav.startReading": "വായിച്ചു തുടങ്ങുക",
    "nav.settings": "ക്രമീകരണങ്ങൾ",
    "nav.contribute": "പങ്കാളിയാകുക",
    "nav.home": "ഹോം",

    // Hero
    "hero.tagline": "ക്രൈസ്തവ വിശുദ്ധരുടെ ഗ്രന്ഥം",
    "hero.title": "വിശുദ്ധ ജീവിതങ്ങളും ശാശ്വത ചരിത്രങ്ങളും",
    "hero.titlePart1": "വിശുദ്ധ ജീവിതങ്ങളും",
    "hero.titlePart2": "ശാശ്വത",
    "hero.titlePart3": "ചരിത്രങ്ങളും",
    "hero.lead":
      "ക്രൈസ്തവ വിശുദ്ധരുടെ പുണ്യജീവിതങ്ങൾ, ദൈവിക വിളി, ആത്മീയ പൈതൃകം എന്നിവ രേഖപ്പെടുത്തുന്ന ഡിജിറ്റൽ ഗ്രന്ഥശാല. കഴിഞ്ഞ രണ്ട് സഹസ്രാബ്ദങ്ങളിലെ ജനനതീയതി, വാഴ്ത്തപ്പെടൽ, വിശുദ്ധപദവി പ്രഖ്യാപനം, തിരുനാൾ ദിനങ്ങൾ എന്നിവ ഇവിടെ രേഖപ്പെടുത്തിയിരിക്കുന്നു.",
    "hero.ctaStart": "വായിച്ചു തുടങ്ങുക",
    "hero.ctaChronicles": "എല്ലാ ചരിത്രങ്ങളും",
    "hero.ctaCalendar": "തിരുനാൾ കലണ്ടർ",
    "hero.tabDates": "പ്രധാന നാഴികക്കല്ലുകൾ",
    "hero.tabQuote": "വിശുദ്ധ വചനം",
    "hero.tabPatronage": "മധ്യസ്ഥത",

    // Featured Gallery
    "gallery.badge": "[ തിരഞ്ഞെടുത്ത വിശുദ്ധ ചരിത്രങ്ങൾ ]",
    "gallery.title": "പ്രമുഖ വിശുദ്ധർ",
    "gallery.lead":
      "വിശുദ്ധ ഗുണങ്ങൾ, സഹനങ്ങൾ, ജീവിത നാഴികക്കല്ലുകൾ എന്നിവ രേഖപ്പെടുത്തുന്ന വിശുദ്ധ ജീവചരിത്രങ്ങൾ. പൂർണ്ണമായ ചരിത്രം വായിക്കാൻ വിശുദ്ധരെ തിരഞ്ഞെടുക്കുക.",
    "gallery.viewAll": "എല്ലാ {count} വിശുദ്ധരെയും കാണുക",
    "gallery.readChronicle": "ചരിത്രം വായിക്കുക",
    "gallery.feast": "തിരുനാൾ",

    // All Saints Page
    "allSaints.title": "ക്രൈസ്തവ വിശുദ്ധരുടെ നാമാവലി",
    "allSaints.lead":
      "തിരുസഭാ ചരിത്രത്തിലെ വിശുദ്ധ ജീവചരിത്രങ്ങൾ, ആരാധനാക്രമ നാഴികക്കല്ലുകൾ, പുണ്യസ്മരണകൾ എന്നിവയുടെ സമ്പൂർണ്ണ ശേഖരം.",
    "allSaints.backHome": "ഹോമിലേക്ക് മടങ്ങുക",
    "allSaints.searchPlaceholder": "വിശുദ്ധന്റെ പേര്, സ്ഥലം, മധ്യസ്ഥത എന്നിവ തിരയുക...",
    "allSaints.allEras": "എല്ലാ യുഗങ്ങളും",
    "allSaints.saintsCount": "{total} വിശുദ്ധരിൽ {filtered} പേർ",
    "allSaints.noResults": "നിങ്ങൾ തിരഞ്ഞ ഫലങ്ങളൊന്നും കണ്ടെത്തിയില്ല.",
    "allSaints.clearFilter": "തിരച്ചിൽ പുനഃക്രമീകരിക്കുക",

    // Eras
    "era.ALL": "എല്ലാ യുഗങ്ങളും",
    "era.Early Church": "ആദിമ സഭ",
    "era.Medieval": "മധ്യകാലഘട്ടം",
    "era.Renaissance & Reformation": "നവോത്ഥാന കാലം",
    "era.Modern Era": "ആധുനിക യുഗം",

    // Months
    "month.ALL": "എല്ലാ തിരുനാളുകളും",
    "month.January": "ജനുവരി",
    "month.February": "ഫെബ്രുവരി",
    "month.March": "മാർച്ച്",
    "month.April": "ഏപ്രിൽ",
    "month.May": "മെയ്",
    "month.June": "ജൂൺ",
    "month.July": "ജൂലൈ",
    "month.August": "ആഗസ്റ്റ്",
    "month.September": "സെപ്റ്റംബർ",
    "month.October": "ഒക്ടോബർ",
    "month.November": "നവംബർ",
    "month.December": "ഡിസംബർ",

    // Calendar
    "calendar.badge": "[ ആരാധനാക്രമ കലണ്ടർ ]",
    "calendar.title": "തിരുനാൾ ദിനങ്ങളും വിശുദ്ധപദവികളും",
    "calendar.lead":
      "ജനനം, വാഴ്ത്തപ്പെടൽ, വിശുദ്ധപദവി പ്രഖ്യാപനം, വാർഷിക തിരുനാൾ ദിനങ്ങൾ എന്നിവ രേഖപ്പെടുത്തുന്ന സമ്പൂർണ്ണ രേഖ.",
    "calendar.search": "തിരുനാൾ അല്ലെങ്കിൽ വിശുദ്ധന്റെ പേര് തിരയുക...",
    "calendar.allMonths": "എല്ലാ മാസങ്ങളും",
    "calendar.month": "മാസം",
    "calendar.readChronicle": "ചരിത്രം വായിക്കുക",
    "calendar.upcoming": "അടുത്ത തിരുനാൾ",
    "calendar.liturgicalDays": "365 ആരാധനാക്രമ ദിനങ്ങൾ",
    "calendar.born": "ജനനം",
    "calendar.read": "വായിക്കുക",
    "calendar.patronOf": "മധ്യസ്ഥൻ",

    // Story Page
    "story.back": "എല്ലാ വിശുദ്ധരുടെ ചരിത്രങ്ങൾ",
    "story.chronicle": "വിശുദ്ധ ചരിത്രം",
    "story.archive": "സെയിന്റ്സ് ബുക്ക് ആർക്കൈവ്",
    "story.dob": "ജനന തീയതി",
    "story.beatified": "വാഴ്ത്തപ്പെട്ട തീയതി",
    "story.canonised": "വിശുദ്ധപദവി പ്രഖ്യാപനം",
    "story.feastDay": "തിരുനാൾ ദിനം",
    "story.patronages": "മധ്യസ്ഥത:",
    "story.iconography": "പ്രതീകങ്ങളും ചിഹ്നങ്ങളും:",
    "story.location": "ചരിത്രപരമായ സ്ഥലം",
    "story.readIn": "ഈ ചരിത്രം വായിക്കുക:",
    "story.prev": "മുൻപത്തെ വിശുദ്ധൻ",
    "story.next": "അടുത്ത വിശുദ്ധൻ",
    "story.viewAll": "എല്ലാ വിശുദ്ധരും",

    // Footer
    "footer.creator": "ക്രൈസ്തവ വിശുദ്ധരുടെ വായനാവേദി നിർമ്മിച്ചത്",
    "footer.allRights": "സെയിന്റ്സ് ബുക്ക് ആർക്കൈവ്. സർവ്വ അവകാശങ്ങളും നിക്ഷിപ്തം.",
    "footer.scroll": "മുകളിലേക്ക് പോകുക",

    // Language Footer Switcher
    "footerBar.title": "വായനാ ഭാഷ",
    "footerBar.settings": "ഭാഷാ ക്രമീകരണങ്ങൾ",
    "footerBar.modePermanent": "സ്ഥിരമായി സൂക്ഷിച്ചു",
    "footerBar.mode7days": "7 ദിവസത്തേക്ക് സൂക്ഷിച്ചു",
    "footerBar.modeSession": "ഈ തവണ മാത്രം",

    // Settings Page
    "settings.masthead": "മുൻഗണനകളും ക്രമീകരണങ്ങളും",
    "settings.title": "ഭാഷയും വായനാ ക്രമീകരണങ്ങളും",
    "settings.subtitle":
      "വെബ്സൈറ്റിലെ വിവരങ്ങളും വിശുദ്ധരുടെ ചരിത്രങ്ങളും ഏത് ഭാഷയിൽ വായിക്കണമെന്ന് തിരഞ്ഞെടുക്കുക. നിങ്ങളുടെ മുൻഗണന എത്രകാലം ഓർത്തുവെക്കണമെന്നും ഇവിടെ തീരുമാനിക്കാം.",
    "settings.languageSection": "1. വെബ്സൈറ്റ് ഭാഷ തിരഞ്ഞെടുക്കുക",
    "settings.languageSectionDesc":
      "നിങ്ങൾക്ക് അനുയോജ്യമായ ഭാഷ തിരഞ്ഞെടുക്കുക. തലക്കെട്ടുകളും ചരിത്രങ്ങളും ഈ ഭാഷയിൽ ദൃശ്യമാകും.",
    "settings.persistenceSection": "2. ഭാഷ ഓർമ്മിച്ചു വെക്കാനുള്ള കാലാവധി",
    "settings.persistenceSectionDesc":
      "നിങ്ങൾ വീണ്ടും വരുമ്പോൾ ഭാഷ എങ്ങനെ ഓർമ്മിക്കണമെന്ന് ക്രമീകരിക്കുക.",
    "settings.permanentLabel": "സ്ഥിരമായി {lang} ഭാഷയായി നിശ്ചയിക്കുക",
    "settings.permanentDesc":
      "നിങ്ങൾ മാറ്റുന്നതുവരെ ഈ ബ്രൗസറിൽ നിങ്ങളുടെ തിരഞ്ഞെടുപ്പ് ശാശ്വതമായി നിലനിൽക്കും.",
    "settings.sevenDaysLabel": "7 ദിവസത്തേക്ക് എന്റെ ഭാഷ ഓർമ്മിക്കുക",
    "settings.sevenDaysDesc":
      "ഒരു ആഴ്ചത്തേക്ക് നിങ്ങളുടെ ഭാഷ സൂക്ഷിക്കും. 7 ദിവസത്തിന് ശേഷം വീണ്ടും സ്ഥിരീകരണം ആവശ്യപ്പെടും.",
    "settings.askEachTimeLabel": "ഓരോ തവണ സൈറ്റ് തുറക്കുമ്പോഴും ചോദിക്കുക",
    "settings.askEachTimeDesc":
      "സ്ഥിരമായി സൂക്ഷിക്കില്ല. പുതിയ സന്ദർശനത്തിൽ ഒരു ലളിതമായ ചോയ്‌സ് കാണിക്കും.",
    "settings.activeBadge": "നിലവിൽ സജീവം",
    "settings.previewSection": "3. തത്സമയ അക്ഷര രൂപരേഖ പ്രിവ്യൂ",
    "settings.previewSectionDesc":
      "Google Sans (മലയാളം), Tiro Devanagari Hindi, English ലിപികളുടെ ഭംഗി തത്സമയം കാണാം.",
    "settings.resetButton": "യഥാർത്ഥ രൂപത്തിലേക്ക് മാറ്റുക (English)",
    "settings.savedSuccess": "ഭാഷാ മുൻഗണനകൾ വിജയകരമായി അപ്‌ഡേറ്റ് ചെയ്തു!",
    "settings.expiresNotice": "{days} ദിവസങ്ങളിൽ കാലാവധി അവസാനിക്കും ({date})",

    // Language Prompt Modal
    "prompt.title": "വായനാ ഭാഷ തിരഞ്ഞെടുക്കുക",
    "prompt.subtitle":
      "സെയിന്റ്സ് ബുക്കിലേക്ക് സ്വാഗതം. വിശുദ്ധരുടെ ചരിത്രങ്ങൾ ഇംഗ്ലീഷ്, മലയാളം, ഹിന്ദി ഭാഷകളിൽ വായിക്കാം.",
    "prompt.persistenceLabel": "സൂക്ഷിക്കേണ്ട കാലാവധി:",
    "prompt.remember7days": "7 ദിവസത്തേക്ക് ഓർമ്മിക്കുക",
    "prompt.recommendedBadge": "ശുപാർശ ചെയ്യുന്നു",
    "prompt.permanent": "സ്ഥിരമായി തിരഞ്ഞെടുക്കുക",
    "prompt.sessionOnly": "ഈ തവണ മാത്രം",
    "prompt.confirm": "വായന തുടരുക",
  },

  hi: {
    // Navigation
    "nav.allSaints": "सभी संत",
    "nav.calendar": "पर्व कैलेंडर",
    "nav.startReading": "पढ़ना शुरू करें",
    "nav.settings": "सेटिंग्स",
    "nav.contribute": "योगदान दें",
    "nav.home": "होम",

    // Hero
    "hero.tagline": "ईसाई संतों की पुस्तक",
    "hero.title": "पवित्र जीवन और अमर गाथाएं",
    "hero.titlePart1": "पवित्र जीवन और",
    "hero.titlePart2": "अमर",
    "hero.titlePart3": "गाथाएं",
    "hero.lead":
      "ईसाई संतों के पवित्र जीवन, ईश्वरीय बुलाहट और आध्यात्मिक विरासत को समर्पित एक डिजिटल संग्रह। दो सहस्राब्दियों में उनके जन्म, धन्य घोषणा, संत पद और वार्षिक पर्व दिवसों का विवरण।",
    "hero.ctaStart": "पढ़ना शुरू करें",
    "hero.ctaChronicles": "सभी गाथाएं",
    "hero.ctaCalendar": "पर्व कैलेंडर",
    "hero.tabDates": "प्रमुख तिथियां",
    "hero.tabQuote": "पवित्र वचन",
    "hero.tabPatronage": "मध्यस्थता",

    // Featured Gallery
    "gallery.badge": "[ चुनिंदा पवित्र गाथाएं ]",
    "gallery.title": "प्रमुख संत",
    "gallery.lead":
      "पवित्र गुणों, कष्टों और ईश्वरीय बुलाहट को दर्शाती चुनिंदा जीवन गाथाएं। संपूर्ण जीवनी पढ़ने के लिए किसी भी संत को चुनें।",
    "gallery.viewAll": "सभी {count} संत देखें",
    "gallery.readChronicle": "गाथा पढ़ें",
    "gallery.feast": "पर्व दिवस",

    // All Saints Page
    "allSaints.title": "ईसाई संतों की नामावली",
    "allSaints.lead":
      "कलीसिया के इतिहास में संतों की जीवनियों, धर्मविधि तिथियों और पवित्र स्मृतियों का व्यापक संग्रह।",
    "allSaints.backHome": "होम पर वापस जाएं",
    "allSaints.searchPlaceholder": "संत का नाम, स्थान या मध्यस्थता खोजें...",
    "allSaints.allEras": "सभी युग",
    "allSaints.saintsCount": "{total} में से {filtered} संत",
    "allSaints.noResults": "आपकी खोज के अनुसार कोई संत नहीं मिले।",
    "allSaints.clearFilter": "फ़िल्टर हटाएं",

    // Eras
    "era.ALL": "सभी युग",
    "era.Early Church": "आरंभिक कलीसिया",
    "era.Medieval": "मध्यकाल",
    "era.Renaissance & Reformation": "पुनर्जागरण काल",
    "era.Modern Era": "आधुनिक युग",

    // Months
    "month.ALL": "सभी पर्व",
    "month.January": "जनवरी",
    "month.February": "फ़रवरी",
    "month.March": "मार्च",
    "month.April": "अप्रैल",
    "month.May": "मई",
    "month.June": "जून",
    "month.July": "जुलाई",
    "month.August": "अगस्त",
    "month.September": "सितंबर",
    "month.October": "अक्टूबर",
    "month.November": "नवंबर",
    "month.December": "दिसंबर",

    // Calendar
    "calendar.badge": "[ धर्मविधि पंचांग ]",
    "calendar.title": "पर्व दिवस और संत घोषणाएं",
    "calendar.lead":
      "जन्म, धन्य घोषणा, संत पदवी और वार्षिक पर्व दिवसों को दर्ज करने वाला संपूर्ण पंचांग।",
    "calendar.search": "पर्व या संत का नाम खोजें...",
    "calendar.allMonths": "सभी महीने",
    "calendar.month": "महीना",
    "calendar.readChronicle": "गाथा पढ़ें",
    "calendar.upcoming": "आगामी पर्व",
    "calendar.liturgicalDays": "365 धर्मविधि दिवस",
    "calendar.born": "जन्म",
    "calendar.read": "पढ़ें",
    "calendar.patronOf": "मध्यस्थ",

    // Story Page
    "story.back": "सभी संत गाथाएं",
    "story.chronicle": "पवित्र गाथा",
    "story.archive": "सेंट्स बुक आर्काइव",
    "story.dob": "जन्म तिथि",
    "story.beatified": "धन्य घोषित तिथि",
    "story.canonised": "संत घोषित तिथि",
    "story.feastDay": "पर्व दिवस",
    "story.patronages": "मध्यस्थता:",
    "story.iconography": "प्रतीक और चिह्न:",
    "story.location": "ऐतिहासिक स्थान",
    "story.readIn": "यह गाथा इस भाषा में पढ़ें:",
    "story.prev": "पिछले संत",
    "story.next": "अगले संत",
    "story.viewAll": "सभी संत",

    // Footer
    "footer.creator": "ईसाई संतों के अध्ययन मंच के निर्माता",
    "footer.allRights": "सेंट्स बुक आर्काइव। सर्वाधिकार सुरक्षित।",
    "footer.scroll": "शीर्ष पर जाएं",

    // Language Footer Switcher
    "footerBar.title": "पठन भाषा",
    "footerBar.settings": "भाषा सेटिंग्स",
    "footerBar.modePermanent": "स्थायी रूप से सुरक्षित",
    "footerBar.mode7days": "7 दिनों के लिए सुरक्षित",
    "footerBar.modeSession": "केवल इस सत्र के लिए",

    // Settings Page
    "settings.masthead": "प्राथमिकताएं और सेटिंग्स",
    "settings.title": "भाषा और पठन सेटिंग्स",
    "settings.subtitle":
      "वेबसाइट और संतों की जीवन गाथाएं पढ़ने के लिए अपनी पसंदीदा भाषा चुनें और तय करें कि आपकी पसंद कितने दिनों तक याद रखी जाए।",
    "settings.languageSection": "1. वेबसाइट की भाषा चुनें",
    "settings.languageSectionDesc":
      "अपनी पसंदीदा भाषा चुनें। वेबसाइट के शीर्षक, गाथाएं और नेविगेशन इसी भाषा में दिखाई देंगे।",
    "settings.persistenceSection": "2. भाषा याद रखने की अवधि",
    "settings.persistenceSectionDesc":
      "चुनें कि आपकी भाषा प्राथमिकता को कैसे सुरक्षित रखा जाए।",
    "settings.permanentLabel": "स्थायी रूप से {lang} भाषा चुनें",
    "settings.permanentDesc":
      "आपकी भाषा ब्राउज़र में सुरक्षित रहेगी जब तक आप इसे स्वयं नहीं बदलते।",
    "settings.sevenDaysLabel": "मेरी भाषा 7 दिनों तक याद रखें",
    "settings.sevenDaysDesc":
      "आपकी प्राथमिकता एक सप्ताह के लिए सुरक्षित रहेगी। 7 दिनों के बाद पुनः पूछा जाएगा।",
    "settings.askEachTimeLabel": "वेबसाइट खोलने पर हर बार पूछें",
    "settings.askEachTimeDesc":
      "स्थायी रूप से सुरक्षित नहीं करेगा। नई यात्रा पर भाषा चुनने का विकल्प दिखाई देगा।",
    "settings.activeBadge": "वर्तमान में सक्रिय",
    "settings.previewSection": "3. लाइव फ़ॉन्ट और गाथा पूर्वावलोकन",
    "settings.previewSectionDesc":
      "Google Sans (मलयालम), Tiro Devanagari Hindi और अंग्रेजी में सुलेखन पूर्वावलोकन।",
    "settings.resetButton": "डिफ़ॉल्ट पर रीसेट करें (English)",
    "settings.savedSuccess": "भाषा प्राथमिकता सफलतापूर्वक अपडेट कर दी गई!",
    "settings.expiresNotice": "{days} दिनों में समाप्त होगा ({date})",

    // Language Prompt Modal
    "prompt.title": "अपनी पठन भाषा चुनें",
    "prompt.subtitle":
      "सेंट्स बुक में आपका स्वागत है। आप संतों की गाथाएं अंग्रेजी, मलयालम या हिंदी में पढ़ सकते हैं।",
    "prompt.persistenceLabel": "प्राथमिकता अवधि:",
    "prompt.remember7days": "मेरी भाषा 7 दिनों तक याद रखें",
    "prompt.recommendedBadge": "अनुशंसित",
    "prompt.permanent": "स्थायी रूप से डिफ़ॉल्ट बनाएं",
    "prompt.sessionOnly": "केवल इस सत्र के लिए",
    "prompt.confirm": "पढ़ना जारी रखें",
  },
};
