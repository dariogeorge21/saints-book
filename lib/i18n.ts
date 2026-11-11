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
    nativeLabel: "हिंदी",
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
    "nav.contribute": "Contribute",
    "nav.home": "Home",

    // Hero
    "hero.tagline": "Stories of Christian Saints",
    "hero.title": "Lives of Faith & Stories That Inspire",
    "hero.titlePart1": "Lives of Faith",
    "hero.titlePart2": "Stories That",
    "hero.titlePart3": "Inspire",
    "hero.lead":
      "Discover the lives, faith, and lasting influence of Christian saints. Explore their stories and the important dates connected with them, from their birth and beatification to canonisation and feast days, across two thousand years of Christian history.",
    "hero.ctaStart": "Start Reading",
    "hero.ctaChronicles": "Browse Saints",
    "hero.ctaCalendar": "Explore Feast Days",
    "hero.tabDates": "Key Dates",
    "hero.tabQuote": "Words of Wisdom",
    "hero.tabPatronage": "Patron Saints",

    // Featured Gallery
    "gallery.badge": "[ FEATURED SAINT STORIES ]",
    "gallery.title": "Featured Saints",
    "gallery.lead":
      "Get to know saints whose faith, courage, and compassion continue to inspire people. Choose a saint to explore their life story.",
    "gallery.viewAll": "View All {count} Saints",
    "gallery.readChronicle": "Read Their Story",
    "gallery.feast": "Feast Day",

    // All Saints Page
    "allSaints.title": "Explore the Saints",
    "allSaints.lead":
      "Browse stories of Christian saints, learn about their lives, and discover the important dates remembered throughout Church history.",
    "allSaints.backHome": "Back to Home",
    "allSaints.searchPlaceholder": "Search by name, place, patronage, or keyword...",
    "allSaints.allEras": "All Eras",
    "allSaints.saintsCount": "Showing {filtered} of {total} saints",
    "allSaints.noResults": "No saints match your search. Try another name or keyword.",
    "allSaints.clearFilter": "Clear Filters",

    // Eras
    "era.ALL": "All Eras",
    "era.Early Church": "Early Church",
    "era.Medieval": "Middle Ages",
    "era.Renaissance & Reformation": "Renaissance & Reformation",
    "era.Modern Era": "Modern Era",

    // Months
    "month.ALL": "All Feast Days",
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
    "calendar.badge": "[ SAINTS' FEAST DAY CALENDAR ]",
    "calendar.title": "Feast Days & Canonisations",
    "calendar.lead":
      "Explore important dates in each saint's life, including their birth, beatification, canonisation, and annual feast day.",
    "calendar.search": "Search for a saint or feast day...",
    "calendar.allMonths": "All Months",
    "calendar.month": "Month",
    "calendar.readChronicle": "Read Their Story",
    "calendar.upcoming": "Next Feast Day",
    "calendar.liturgicalDays": "365 Days in the Liturgical Year",
    "calendar.born": "Born",
    "calendar.read": "Read Story",
    "calendar.patronOf": "Patron Saint of",

    // Story Page
    "story.back": "Back to All Saints",
    "story.chronicle": "Life Story",
    "story.archive": "SaintsBook Archive",
    "story.dob": "Date of Birth",
    "story.beatified": "Beatification Date",
    "story.canonised": "Canonisation Date",
    "story.feastDay": "Feast Day",
    "story.patronages": "Patronage:",
    "story.iconography": "Symbols & Artwork:",
    "story.location": "Places Connected to Their Life",
    "story.readIn": "Read this story in:",
    "story.prev": "Previous Saint",
    "story.next": "Next Saint",
    "story.viewAll": "View All Saints",

    // Footer
    "footer.creator": "A place to discover and read about Christian saints, created by",
    "footer.allRights": "SaintsBook Archive. All rights reserved.",
    "footer.scroll": "Back to Top",

    // Language Footer Switcher
    "footerBar.title": "Display Language",
    "footerBar.settings": "Language Settings",
    "footerBar.modePermanent": "Saved as Default",
    "footerBar.mode7days": "Saved for 7 Days",
    "footerBar.modeSession": "This Session Only",

    // Settings Page
    "settings.masthead": "Preferences & Accessibility",
    "settings.title": "Language & Reading Settings",
    "settings.subtitle":
      "Choose the language you want to use across the website and decide how long SaintsBook should remember your choice.",
    "settings.languageSection": "1. Choose Your Language",
    "settings.languageSectionDesc":
      "Select the language you find easiest to read. Website headings, menus, and available stories will appear in that language.",
    "settings.persistenceSection": "2. How Long Should We Remember It?",
    "settings.persistenceSectionDesc":
      "Choose how long your language preference should be saved on this device.",
    "settings.permanentLabel": "Always use {lang}",
    "settings.permanentDesc":
      "Your choice will be saved in this browser and remain your default until you change it.",
    "settings.sevenDaysLabel": "Remember my language for 7 days",
    "settings.sevenDaysDesc":
      "Your choice will be saved for one week. After 7 days, you will be asked to choose again.",
    "settings.askEachTimeLabel": "Ask me every time I visit",
    "settings.askEachTimeDesc":
      "Your choice will not be saved for future visits. You can choose your language whenever you open the website.",
    "settings.activeBadge": "Currently Active",
    "settings.previewSection": "3. Font Preview",
    "settings.previewSectionDesc":
      "See how English, Malayalam, and Hindi text will look on the website.",
    "settings.resetButton": "Reset to English",
    "settings.savedSuccess": "Your language settings have been saved.",
    "settings.expiresNotice": "Your selection expires in {days} days ({date})",

    // Language Prompt Modal
    "prompt.title": "Choose Your Language",
    "prompt.subtitle":
      "Welcome to SaintsBook. You can explore the stories of Christian saints in English, Malayalam, or Hindi.",
    "prompt.persistenceLabel": "How long should we remember your choice?",
    "prompt.remember7days": "Remember for 7 days",
    "prompt.recommendedBadge": "Recommended",
    "prompt.permanent": "Always use this as my default",
    "prompt.sessionOnly": "Only for this session",
    "prompt.confirm": "Continue",
  },

  ml: {
    // Navigation
    "nav.allSaints": "എല്ലാ വിശുദ്ധരും",
    "nav.calendar": "തിരുനാൾ കലണ്ടർ",
    "nav.startReading": "വായന തുടങ്ങുക",
    "nav.settings": "ക്രമീകരണങ്ങൾ",
    "nav.contribute": "പങ്കാളിയാകൂ",
    "nav.home": "ഹോം",

    // Hero
    "hero.tagline": "ക്രൈസ്തവ വിശുദ്ധരുടെ ജീവിതകഥകൾ",
    "hero.title": "വിശ്വാസജീവിതങ്ങൾ, എന്നും പ്രചോദനം പകരുന്ന കഥകൾ",
    "hero.titlePart1": "വിശ്വാസജീവിതങ്ങൾ",
    "hero.titlePart2": "എന്നും പ്രചോദനം",
    "hero.titlePart3": "പകരുന്ന കഥകൾ",
    "hero.lead":
      "ക്രൈസ്തവ വിശുദ്ധരുടെ ജീവിതവും വിശ്വാസവും ദൈവവിളിയും അവർ ലോകത്തിന് നൽകിയ സംഭാവനകളും അറിയൂ. രണ്ടായിരം വർഷത്തെ ക്രൈസ്തവ ചരിത്രത്തിൽ നിന്നുള്ള അവരുടെ ജനനം, വാഴ്ത്തപ്പെട്ട പദവി പ്രഖ്യാപനം, വിശുദ്ധപദവി പ്രഖ്യാപനം, തിരുനാൾ ദിനം തുടങ്ങിയ പ്രധാന വിവരങ്ങളും ഇവിടെ കണ്ടെത്താം.",
    "hero.ctaStart": "വായന തുടങ്ങുക",
    "hero.ctaChronicles": "വിശുദ്ധരെ പരിചയപ്പെടുക",
    "hero.ctaCalendar": "തിരുനാൾ ദിനങ്ങൾ കാണുക",
    "hero.tabDates": "പ്രധാന തീയതികൾ",
    "hero.tabQuote": "പ്രചോദനമേകുന്ന വാക്കുകൾ",
    "hero.tabPatronage": "സംരക്ഷക വിശുദ്ധർ",

    // Featured Gallery
    "gallery.badge": "[ തിരഞ്ഞെടുത്ത വിശുദ്ധരുടെ ജീവിതകഥകൾ ]",
    "gallery.title": "തിരഞ്ഞെടുത്ത വിശുദ്ധർ",
    "gallery.lead":
      "വിശ്വാസം, ധൈര്യം, കരുണ എന്നിവയിലൂടെ ഇന്നും നമ്മെ പ്രചോദിപ്പിക്കുന്ന വിശുദ്ധരെ പരിചയപ്പെടാം. ഓരോ വിശുദ്ധരുടെയും ജീവിതകഥ വായിക്കാൻ അവരെ തിരഞ്ഞെടുക്കുക.",
    "gallery.viewAll": "എല്ലാ {count} വിശുദ്ധരെയും കാണുക",
    "gallery.readChronicle": "ജീവിതകഥ വായിക്കുക",
    "gallery.feast": "തിരുനാൾ",

    // All Saints Page
    "allSaints.title": "ക്രൈസ്തവ വിശുദ്ധർ",
    "allSaints.lead":
      "സഭാചരിത്രത്തിലെ വിശുദ്ധരുടെ ജീവിതകഥകളും അവരുമായി ബന്ധപ്പെട്ട പ്രധാന തീയതികളും ഇവിടെ കണ്ടെത്താം.",
    "allSaints.backHome": "പ്രധാന പേജിലേക്ക് മടങ്ങുക",
    "allSaints.searchPlaceholder": "പേര്, സ്ഥലം, മധ്യസ്ഥത, അല്ലെങ്കിൽ ഒരു വാക്ക് ഉപയോഗിച്ച് തിരയുക...",
    "allSaints.allEras": "എല്ലാ കാലഘട്ടങ്ങളും",
    "allSaints.saintsCount": "ആകെ {total} വിശുദ്ധരിൽ {filtered} പേർ",
    "allSaints.noResults": "നിങ്ങളുടെ തിരച്ചിലിന് അനുയോജ്യമായ വിശുദ്ധരെ കണ്ടെത്താനായില്ല. മറ്റൊരു പേര് ഉപയോഗിച്ച് തിരയൂ.",
    "allSaints.clearFilter": "ഫിൽട്ടറുകൾ നീക്കുക",

    // Eras
    "era.ALL": "എല്ലാ കാലഘട്ടങ്ങളും",
    "era.Early Church": "ആദിമ സഭ",
    "era.Medieval": "മധ്യകാലഘട്ടം",
    "era.Renaissance & Reformation": "നവോത്ഥാനവും മതനവീകരണവും",
    "era.Modern Era": "ആധുനിക കാലഘട്ടം",

    // Months
    "month.ALL": "എല്ലാ തിരുനാളുകളും",
    "month.January": "ജനുവരി",
    "month.February": "ഫെബ്രുവരി",
    "month.March": "മാർച്ച്",
    "month.April": "ഏപ്രിൽ",
    "month.May": "മേയ്",
    "month.June": "ജൂൺ",
    "month.July": "ജൂലൈ",
    "month.August": "ഓഗസ്റ്റ്",
    "month.September": "സെപ്റ്റംബർ",
    "month.October": "ഒക്ടോബർ",
    "month.November": "നവംബർ",
    "month.December": "ഡിസംബർ",

    // Calendar
    "calendar.badge": "[ വിശുദ്ധരുടെ തിരുനാൾ കലണ്ടർ ]",
    "calendar.title": "തിരുനാളുകളും വിശുദ്ധപദവി പ്രഖ്യാപനങ്ങളും",
    "calendar.lead":
      "വിശുദ്ധരുടെ ജീവിതത്തിലെ പ്രധാന തീയതികൾ ഇവിടെ കാണാം: ജനനം, വാഴ്ത്തപ്പെട്ട പദവി പ്രഖ്യാപനം, വിശുദ്ധപദവി പ്രഖ്യാപനം, ഓരോ വർഷവും ആചരിക്കുന്ന തിരുനാൾ എന്നിവ.",
    "calendar.search": "വിശുദ്ധന്റെയോ തിരുനാളിന്റെയോ പേര് തിരയുക...",
    "calendar.allMonths": "എല്ലാ മാസങ്ങളും",
    "calendar.month": "മാസം",
    "calendar.readChronicle": "ജീവിതകഥ വായിക്കുക",
    "calendar.upcoming": "അടുത്ത തിരുനാൾ",
    "calendar.liturgicalDays": "ആരാധനാവർഷത്തിലെ 365 ദിനങ്ങൾ",
    "calendar.born": "ജനിച്ചത്",
    "calendar.read": "വായിക്കുക",
    "calendar.patronOf": "സംരക്ഷക വിശുദ്ധൻ:",

    // Story Page
    "story.back": "എല്ലാ വിശുദ്ധരിലേക്കും മടങ്ങുക",
    "story.chronicle": "ജീവിതകഥ",
    "story.archive": "SaintsBook Archive",
    "story.dob": "ജനനത്തീയതി",
    "story.beatified": "വാഴ്ത്തപ്പെട്ട പദവി പ്രഖ്യാപിച്ച തീയതി",
    "story.canonised": "വിശുദ്ധപദവി പ്രഖ്യാപിച്ച തീയതി",
    "story.feastDay": "തിരുനാൾ ദിനം",
    "story.patronages": "മധ്യസ്ഥതയും സംരക്ഷകത്വവും:",
    "story.iconography": "ചിത്രങ്ങളിലെ പ്രതീകങ്ങൾ:",
    "story.location": "ജീവിതവുമായി ബന്ധപ്പെട്ട സ്ഥലങ്ങൾ",
    "story.readIn": "ഈ ജീവിതകഥ വായിക്കേണ്ട ഭാഷ:",
    "story.prev": "മുൻ വിശുദ്ധൻ",
    "story.next": "അടുത്ത വിശുദ്ധൻ",
    "story.viewAll": "എല്ലാ വിശുദ്ധരെയും കാണുക",

    // Footer
    "footer.creator": "ക്രൈസ്തവ വിശുദ്ധരുടെ ജീവിതകഥകൾ വായിക്കാനുള്ള ഈ വേദി ഒരുക്കിയത്",
    "footer.allRights": "SaintsBook Archive. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.",
    "footer.scroll": "പേജിന്റെ മുകളിലേക്ക് പോകുക",

    // Language Footer Switcher
    "footerBar.title": "വെബ്സൈറ്റ് ഭാഷ",
    "footerBar.settings": "ഭാഷാ ക്രമീകരണങ്ങൾ",
    "footerBar.modePermanent": "സ്ഥിരമായി സൂക്ഷിച്ചു",
    "footerBar.mode7days": "7 ദിവസത്തേക്ക് സൂക്ഷിച്ചു",
    "footerBar.modeSession": "ഈ സെഷനിൽ മാത്രം",

    // Settings Page
    "settings.masthead": "മുൻഗണനകളും വായനാ സൗകര്യങ്ങളും",
    "settings.title": "ഭാഷയും വായനാ ക്രമീകരണങ്ങളും",
    "settings.subtitle":
      "വെബ്സൈറ്റ് ഏത് ഭാഷയിൽ ഉപയോഗിക്കണമെന്ന് തിരഞ്ഞെടുക്കാം. നിങ്ങളുടെ ഭാഷാ തിരഞ്ഞെടുപ്പ് എത്രകാലം ഓർത്തുവെക്കണമെന്നും ഇവിടെ നിശ്ചയിക്കാം.",
    "settings.languageSection": "1. ഭാഷ തിരഞ്ഞെടുക്കുക",
    "settings.languageSectionDesc":
      "നിങ്ങൾക്ക് വായിക്കാൻ എളുപ്പമുള്ള ഭാഷ തിരഞ്ഞെടുക്കുക. വെബ്സൈറ്റിലെ തലക്കെട്ടുകളും മെനുകളും ലഭ്യമായ ജീവിതകഥകളും ആ ഭാഷയിൽ കാണാം.",
    "settings.persistenceSection": "2. ഭാഷ എത്രകാലം ഓർത്തുവെക്കണം?",
    "settings.persistenceSectionDesc":
      "ഈ ഉപകരണത്തിൽ നിങ്ങളുടെ ഭാഷാ തിരഞ്ഞെടുപ്പ് എത്രകാലം സൂക്ഷിക്കണമെന്ന് തീരുമാനിക്കുക.",
    "settings.permanentLabel": "{lang} ഭാഷ സ്ഥിരമായി ഉപയോഗിക്കുക",
    "settings.permanentDesc":
      "നിങ്ങൾ മാറ്റുന്നതുവരെ തിരഞ്ഞെടുത്ത ഭാഷ ഈ ബ്രൗസറിൽ സൂക്ഷിക്കും.",
    "settings.sevenDaysLabel": "എന്റെ ഭാഷ 7 ദിവസത്തേക്ക് ഓർത്തുവെക്കുക",
    "settings.sevenDaysDesc":
      "നിങ്ങളുടെ തിരഞ്ഞെടുപ്പ് ഒരാഴ്ചത്തേക്ക് സൂക്ഷിക്കും. 7 ദിവസത്തിന് ശേഷം വീണ്ടും ഭാഷ തിരഞ്ഞെടുക്കാൻ ആവശ്യപ്പെടും.",
    "settings.askEachTimeLabel": "ഓരോ തവണയും ഭാഷ ചോദിക്കുക",
    "settings.askEachTimeDesc":
      "നിങ്ങളുടെ തിരഞ്ഞെടുപ്പ് അടുത്ത സന്ദർശനങ്ങൾക്കായി സൂക്ഷിക്കില്ല. വെബ്സൈറ്റ് തുറക്കുമ്പോഴെല്ലാം ഭാഷ തിരഞ്ഞെടുക്കാം.",
    "settings.activeBadge": "ഇപ്പോൾ തിരഞ്ഞെടുത്തിരിക്കുന്നത്",
    "settings.previewSection": "3. അക്ഷരങ്ങളുടെ പ്രിവ്യൂ",
    "settings.previewSectionDesc":
      "ഇംഗ്ലീഷ്, മലയാളം, ഹിന്ദി ഭാഷകളിലെ എഴുത്തുകൾ വെബ്സൈറ്റിൽ എങ്ങനെയുണ്ടെന്ന് ഇവിടെ കാണാം.",
    "settings.resetButton": "ഇംഗ്ലീഷിലേക്ക് മാറ്റുക",
    "settings.savedSuccess": "നിങ്ങളുടെ ഭാഷാ ക്രമീകരണം സൂക്ഷിച്ചു.",
    "settings.expiresNotice": "നിങ്ങളുടെ തിരഞ്ഞെടുപ്പ് {days} ദിവസത്തിനകം അവസാനിക്കും ({date})",

    // Language Prompt Modal
    "prompt.title": "വായിക്കാനുള്ള ഭാഷ തിരഞ്ഞെടുക്കുക",
    "prompt.subtitle":
      "സെയിന്റ്സ് ബുക്കിലേക്ക് സ്വാഗതം. ക്രൈസ്തവ വിശുദ്ധരുടെ ജീവിതകഥകൾ ഇംഗ്ലീഷ്, മലയാളം, ഹിന്ദി ഭാഷകളിൽ വായിക്കാം.",
    "prompt.persistenceLabel": "നിങ്ങളുടെ തിരഞ്ഞെടുപ്പ് എത്രകാലം ഓർത്തുവെക്കണം?",
    "prompt.remember7days": "7 ദിവസത്തേക്ക് ഓർത്തുവെക്കുക",
    "prompt.recommendedBadge": "ശുപാർശ ചെയ്യുന്നത്",
    "prompt.permanent": "ഈ ഭാഷ സ്ഥിരമായി ഉപയോഗിക്കുക",
    "prompt.sessionOnly": "ഈ സെഷനിൽ മാത്രം",
    "prompt.confirm": "തുടരുക",
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
    "hero.tagline": "ईसाई संतों के जीवन की कहानियाँ",
    "hero.title": "आस्था से भरे जीवन, प्रेरणा देने वाली कहानियाँ",
    "hero.titlePart1": "आस्था से भरे जीवन",
    "hero.titlePart2": "प्रेरणा देने वाली",
    "hero.titlePart3": "कहानियाँ",
    "hero.lead":
      "ईसाई संतों के जीवन, उनके विश्वास, ईश्वर के बुलावे और समाज पर उनके प्रभाव को जानें। यहाँ आपको दो हज़ार वर्षों के ईसाई इतिहास से जुड़ी महत्वपूर्ण जानकारियाँ मिलेंगी, जैसे संतों का जन्म, धन्य घोषित किए जाने की तारीख, संत घोषित किए जाने की तारीख और उनका वार्षिक पर्व-दिवस।",
    "hero.ctaStart": "पढ़ना शुरू करें",
    "hero.ctaChronicles": "सभी संतों को जानें",
    "hero.ctaCalendar": "पर्व-दिवस देखें",
    "hero.tabDates": "ज़रूरी तारीखें",
    "hero.tabQuote": "प्रेरक विचार",
    "hero.tabPatronage": "संरक्षक संत",

    // Featured Gallery
    "gallery.badge": "[ चुनिंदा संतों की जीवन-कथाएँ ]",
    "gallery.title": "चुनिंदा संत",
    "gallery.lead":
      "ऐसे संतों के बारे में जानें जिनका विश्वास, साहस और करुणा आज भी लोगों को प्रेरित करते हैं। किसी संत को चुनें और उनकी जीवन-कथा पढ़ें।",
    "gallery.viewAll": "सभी {count} संत देखें",
    "gallery.readChronicle": "जीवन-कथा पढ़ें",
    "gallery.feast": "पर्व-दिवस",

    // All Saints Page
    "allSaints.title": "सभी ईसाई संत",
    "allSaints.lead":
      "ईसाई इतिहास के संतों की जीवनियाँ पढ़ें और उनके जीवन से जुड़ी महत्वपूर्ण तारीखों के बारे में जानें।",
    "allSaints.backHome": "मुखपृष्ठ पर वापस जाएँ",
    "allSaints.searchPlaceholder": "संत का नाम, स्थान या उनसे जुड़ा कोई विषय खोजें...",
    "allSaints.allEras": "सभी युग",
    "allSaints.saintsCount": "कुल {total} में से {filtered} संत दिखाए जा रहे हैं",
    "allSaints.noResults": "आपकी खोज से मेल खाने वाला कोई संत नहीं मिला। कोई दूसरा नाम या शब्द आज़माएँ।",
    "allSaints.clearFilter": "सभी फ़िल्टर हटाएँ",

    // Eras
    "era.ALL": "सभी युग",
    "era.Early Church": "प्रारंभिक कलीसिया",
    "era.Medieval": "मध्य युग",
    "era.Renaissance & Reformation": "पुनर्जागरण और धर्म-सुधार",
    "era.Modern Era": "आधुनिक युग",

    // Months
    "month.ALL": "सभी पर्व-दिवस",
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
    "calendar.badge": "[ संतों के पर्व-दिवस ]",
    "calendar.title": "संतों के पर्व और संत घोषणा की तारीखें",
    "calendar.lead":
      "संतों के जीवन की महत्वपूर्ण तारीखें यहाँ देखें—जन्म, धन्य घोषित किए जाने का दिन, संत घोषित किए जाने का दिन और हर साल मनाया जाने वाला पर्व।",
    "calendar.search": "संत या पर्व का नाम खोजें...",
    "calendar.allMonths": "सभी महीने",
    "calendar.month": "महीना",
    "calendar.readChronicle": "जीवन-कथा पढ़ें",
    "calendar.upcoming": "अगला पर्व",
    "calendar.liturgicalDays": "कलीसियाई वर्ष के 365 दिन",
    "calendar.born": "जन्म",
    "calendar.read": "कहानी पढ़ें",
    "calendar.patronOf": "इनके संरक्षक संत",

    // Story Page
    "story.back": "सभी संतों पर वापस जाएँ",
    "story.chronicle": "जीवन-कथा",
    "story.archive": "SaintsBook Archive",
    "story.dob": "जन्म तिथि",
    "story.beatified": "धन्य घोषित किए जाने की तारीख",
    "story.canonised": "संत घोषित किए जाने की तारीख",
    "story.feastDay": "पर्व-दिवस",
    "story.patronages": "जिनके संरक्षक संत हैं:",
    "story.iconography": "चित्रों में दिखने वाले प्रतीक:",
    "story.location": "जीवन से जुड़े ऐतिहासिक स्थान",
    "story.readIn": "यह जीवन-कथा किस भाषा में पढ़ें:",
    "story.prev": "पिछले संत",
    "story.next": "अगले संत",
    "story.viewAll": "सभी संत देखें",

    // Footer
    "footer.creator": "ईसाई संतों की जीवन-कथाएँ पढ़ने का यह मंच बनाया है",
    "footer.allRights": "SaintsBook Archive. सर्वाधिकार सुरक्षित।",
    "footer.scroll": "पृष्ठ के शीर्ष पर जाएँ",

    // Language Footer Switcher
    "footerBar.title": "वेबसाइट की भाषा",
    "footerBar.settings": "भाषा सेटिंग्स",
    "footerBar.modePermanent": "डिफ़ॉल्ट के रूप में सेव है",
    "footerBar.mode7days": "7 दिनों के लिए सेव है",
    "footerBar.modeSession": "सिर्फ इस सत्र के लिए",

    // Settings Page
    "settings.masthead": "पसंद और पढ़ने की सुविधाएँ",
    "settings.title": "भाषा और पढ़ने की सेटिंग्स",
    "settings.subtitle":
      "वेबसाइट के लिए अपनी पसंदीदा भाषा चुनें। यह भी तय करें कि आपकी पसंद कितने समय तक याद रखी जाए।",
    "settings.languageSection": "1. अपनी भाषा चुनें",
    "settings.languageSectionDesc":
      "वह भाषा चुनें जिसमें आपको पढ़ना सबसे आसान लगता है। वेबसाइट के शीर्षक, मेनू और उपलब्ध जीवन-कथाएँ उसी भाषा में दिखाई देंगी।",
    "settings.persistenceSection": "2. भाषा कितने समय तक याद रखें?",
    "settings.persistenceSectionDesc":
      "चुनें कि इस डिवाइस पर आपकी भाषा की पसंद कितने समय तक सेव रखी जाए।",
    "settings.permanentLabel": "हमेशा {lang} भाषा इस्तेमाल करें",
    "settings.permanentDesc":
      "आपकी चुनी हुई भाषा इस ब्राउज़र में सेव रहेगी, जब तक आप इसे बदल नहीं देते।",
    "settings.sevenDaysLabel": "मेरी भाषा 7 दिनों तक याद रखें",
    "settings.sevenDaysDesc":
      "आपकी पसंद एक सप्ताह तक सेव रहेगी। 7 दिनों बाद आपसे भाषा फिर चुनने के लिए कहा जाएगा।",
    "settings.askEachTimeLabel": "हर बार वेबसाइट खोलने पर पूछें",
    "settings.askEachTimeDesc":
      "आपकी पसंद अगली बार के लिए सेव नहीं होगी। वेबसाइट खोलने पर आप हर बार भाषा चुन सकेंगे।",
    "settings.activeBadge": "अभी चुनी गई भाषा",
    "settings.previewSection": "3. फ़ॉन्ट का नमूना",
    "settings.previewSectionDesc":
      "देखें कि वेबसाइट पर अंग्रेज़ी, मलयालम और हिंदी का टेक्स्ट कैसा दिखाई देगा।",
    "settings.resetButton": "अंग्रेज़ी पर वापस जाएँ",
    "settings.savedSuccess": "आपकी भाषा सेटिंग सेव हो गई है।",
    "settings.expiresNotice": "आपकी पसंद {days} दिनों में समाप्त होगी ({date})",

    // Language Prompt Modal
    "prompt.title": "अपनी भाषा चुनें",
    "prompt.subtitle":
      "सेंट्सबुक में आपका स्वागत है। आप ईसाई संतों की जीवन-कथाएँ अंग्रेज़ी, मलयालम या हिंदी में पढ़ सकते हैं।",
    "prompt.persistenceLabel": "आपकी पसंद कितने समय तक याद रखें?",
    "prompt.remember7days": "7 दिनों तक याद रखें",
    "prompt.recommendedBadge": "सुझाया गया",
    "prompt.permanent": "इसी भाषा को हमेशा डिफ़ॉल्ट रखें",
    "prompt.sessionOnly": "सिर्फ इस सत्र के लिए",
    "prompt.confirm": "आगे बढ़ें",
  },
};
