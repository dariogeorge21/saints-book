export interface Saint {
  id: string;
  name: string;
  latinName?: string;
  epithet: string;
  dateOfBirth: string;
  beatifiedDate: string; // Also referred to as beautified date
  canonisedDate: string;
  feastDate: string;
  feastMonth: string;
  era: "Early Church" | "Medieval" | "Renaissance & Reformation" | "Modern Era";
  location: string;
  patronage: string[];
  attributes: string;
  quote: string;
  story: string[]; // Divided into multiple rich editorial paragraphs
}

export const SAINTS_DATA: Saint[] = [
  {
    id: "st-francis-of-assisi",
    name: "St. Francis of Assisi",
    latinName: "Sanctus Franciscus Assisiensis",
    epithet: "Founder of the Franciscans • Patron of Ecology",
    dateOfBirth: "c. 1181 / 1182",
    beatifiedDate: "Pre-congregation (no separate beatification recorded)",
    canonisedDate: "16 July 1228 by Pope Gregory IX",
    feastDate: "October 4",
    feastMonth: "October",
    era: "Medieval",
    location: "Assisi, Italy",
    patronage: ["Animals", "Ecology", "Italy", "Merchants", "Peace"],
    attributes: "Brown Franciscan habit, Tau cross, birds, lamb, stigmata",
    quote: "Praised be You, my Lord, through all Your creatures. — Canticle of the Creatures",
    story: [
      "Born into a prosperous merchant family in Assisi around 1181 or 1182, Francis first dreamed of adventure and military glory. Illness, imprisonment and prayer gradually changed his priorities, drawing him toward a life shaped by the Gospel.",
      "After hearing Christ call him to rebuild His Church, Francis embraced poverty, cared for lepers and gathered companions who became the Franciscan Order. His joyful preaching placed peace, humility and care for creation at the heart of Christian life.",
      "In 1219, during the Fifth Crusade, he travelled to Egypt and met Sultan al-Kamil in an effort to speak about faith and peace. In 1224, Francis received the stigmata at Mount La Verna. He died at the Porziuncola on 3 October 1226."
    ],
  },
  {
    id: "st-alphonsa",
    name: "St. Alphonsa",
    latinName: "Sancta Alphonsa ab Immaculata Conceptione",
    epithet: "India’s First Woman Saint • Witness of Patient Faith",
    dateOfBirth: "August 19, 1910",
    beatifiedDate: "8 February 1986 by Pope John Paul II",
    canonisedDate: "12 October 2008 by Pope Benedict XVI",
    feastDate: "July 28",
    feastMonth: "July",
    era: "Modern Era",
    location: "Kudamalur & Bharananganam, Kerala, India",
    patronage: ["The Sick", "People Facing Illness", "Those Who Suffer", "Students", "Kerala"],
    attributes: "Franciscan Clarist habit, crucifix, rosary, prayer book",
    quote: "I feel that the Lord has destined me to be an oblation, a sacrifice of suffering. — St. Alphonsa",
    story: [
      "Born Annakutty Muttathupadathu in Kudamalur, Kerala, on 19 August 1910, Alphonsa faced loss and hardship from an early age. Her quiet faith and desire for religious life grew under the care of her family.",
      "She joined the Franciscan Clarist Congregation and took the name Alphonsa. Much of her religious life was marked by recurring illness, yet she met suffering with prayer, patience and a deep love for Christ.",
      "Her gentle presence became a lasting example of faith lived through hardship. She died at Bharananganam on 28 July 1946 and was canonized in 2008, becoming the first woman of Indian origin to be declared a saint by the Catholic Church."
    ],
  },
  {
    id: "st-euphrasia",
    name: "St. Euphrasia",
    latinName: "Sancta Euphrasia a Sacratissimo Corde Iesu",
    epithet: "The Praying Mother • Carmelite Contemplative",
    dateOfBirth: "October 17, 1877",
    beatifiedDate: "3 December 2006 by Pope Benedict XVI",
    canonisedDate: "23 November 2014 by Pope Francis",
    feastDate: "August 29",
    feastMonth: "August",
    era: "Modern Era",
    location: "Kattoor & Ollur, Thrissur, Kerala, India",
    patronage: ["Contemplative Prayer", "Religious Sisters", "The Sick", "Kerala"],
    attributes: "Carmelite habit, crucifix, rosary, Eucharistic monstrance",
    quote: "I will not forget it, not even after death. — St. Euphrasia",
    story: [
      "Born Rose Eluvathingal in Kattoor, Kerala, on 17 October 1877, she grew up in a home shaped by prayer and devotion to Mary. From childhood, she felt drawn to a life of consecration and entered the Congregation of the Mother of Carmel.",
      "Euphrasia became known for her deep devotion to the Blessed Sacrament and her long hours of prayer. Her fellow sisters affectionately called her the “Praying Mother,” while those around her experienced her kindness, humility and concern for the sick.",
      "Her life joined quiet contemplation with practical love for others. She died on 29 August 1952 and was canonized by Pope Francis on 23 November 2014."
    ],
  },
  {
    id: "st-kuriakose-elias-chavara",
    name: "St. Kuriakose Elias Chavara",
    latinName: "Sanctus Kuriakose Elias Chavara",
    epithet: "Priest, Educator & Social Reformer • CMI Co-founder",
    dateOfBirth: "February 10, 1805",
    beatifiedDate: "8 February 1986 by Pope John Paul II",
    canonisedDate: "23 November 2014 by Pope Francis",
    feastDate: "January 3",
    feastMonth: "January",
    era: "Modern Era",
    location: "Kainakary, Mannanam & Koonammavu, Kerala, India",
    patronage: ["Families", "Education", "Priests", "Kerala", "Syro-Malabar Church"],
    attributes: "Carmelite habit, priestly stole, rosary, book or manuscript",
    quote: "Sanctification of oneself and the salvation of others. — St. Chavara’s motto",
    story: [
      "Born in Kainakary, Kerala, on 10 February 1805, Kuriakose Elias Chavara was ordained a priest in 1829. His life became closely linked with the spiritual and social growth of the Syro-Malabar Church.",
      "In 1831, he joined Fathers Thomas Palackal and Thomas Porukara in establishing the first indigenous religious congregation for men in India, now known as the Carmelites of Mary Immaculate (CMI). He later helped establish a congregation for women with Father Leopold Beccaro.",
      "Chavara championed education, publishing and care for people in need, encouraging churches to support schools for children. Guided by the motto “Sanctification of oneself and the salvation of others,” he died on 3 January 1871 and was canonized in 2014."
    ],
  },
  {
    id: "st-carlo-acutis",
    name: "St. Carlo Acutis",
    latinName: "Sanctus Carolus Acutis",
    epithet: "The Millennial Saint • Witness to the Eucharist",
    dateOfBirth: "May 3, 1991",
    beatifiedDate: "10 October 2020 by Pope Francis",
    canonisedDate: "7 September 2025 by Pope Leo XIV",
    feastDate: "October 12",
    feastMonth: "October",
    era: "Modern Era",
    location: "London, United Kingdom; Milan & Assisi, Italy",
    patronage: ["Young People", "Students", "Computer Programmers", "Internet Evangelization", "Eucharistic Devotion"],
    attributes: "Blue polo shirt, jeans, backpack, computer, Eucharistic monstrance",
    quote: "The Eucharist is my highway to heaven. — St. Carlo Acutis",
    story: [
      "Born in London on 3 May 1991, Carlo Acutis grew up in Milan and developed a lively faith from childhood. He loved computers, football and helping others, while making prayer and the Eucharist a regular part of his daily life.",
      "Carlo used his interest in technology to create an online exhibition documenting Eucharistic miracles. He also served as a catechist, helped people experiencing poverty and tried to make classmates feel included.",
      "Diagnosed with an aggressive form of leukemia in 2006, he offered his suffering for the Church and the Pope. He died in Monza on 12 October 2006, aged 15, was beatified in 2020 and canonized on 7 September 2025."
    ],
  },
  {
    id: "st-augustine-of-hippo",
    name: "St. Augustine of Hippo",
    latinName: "Sanctus Aurelius Augustinus Hipponensis",
    epithet: "Doctor of Grace • Bishop of Hippo",
    dateOfBirth: "November 13, 354",
    beatifiedDate: "Pre-congregation (no separate beatification recorded)",
    canonisedDate: "Pre-congregation recognition (no formal date recorded)",
    feastDate: "August 28",
    feastMonth: "August",
    era: "Early Church",
    location: "Thagaste & Hippo Regius, Roman North Africa (modern Algeria)",
    patronage: ["Theologians", "Philosophers", "Converts", "Scholars", "Printers"],
    attributes: "Bishop’s vestments, crozier, flaming heart, open book, quill",
    quote: "You have made us for Yourself, O Lord, and our hearts are restless until they rest in You. — Confessions",
    story: [
      "Born in Thagaste in Roman North Africa in 354, Augustine was gifted in learning but spent years searching for truth and meaning. His mother, St. Monica, continued to pray for him as he explored different philosophies and ways of life.",
      "In Milan, the preaching of St. Ambrose and his own reading of Scripture helped lead him toward Christianity. He was baptized by Ambrose in 387, returned to North Africa and later became a priest and then Bishop of Hippo.",
      "Augustine wrote influential works including Confessions and The City of God, shaping Christian thought for generations. Remembered as one of the great Doctors of the Church, he died in Hippo on 28 August 430."
    ],
  },
  {
    id: "st-joseph",
    name: "St. Joseph",
    latinName: "Sanctus Ioseph",
    epithet: "Spouse of Mary • Guardian of the Holy Family",
    dateOfBirth: "Unknown (1st century)",
    beatifiedDate: "Pre-congregation (no separate beatification recorded)",
    canonisedDate: "Pre-congregation recognition (no formal date recorded)",
    feastDate: "March 19",
    feastMonth: "March",
    era: "Early Church",
    location: "Nazareth & Bethlehem, Galilee and Judea",
    patronage: ["Universal Church", "Families", "Fathers", "Workers", "Carpenters"],
    attributes: "Carpenter’s tools, flowering staff, lily, Child Jesus",
    quote: "He did as the angel of the Lord had commanded him. — Matthew 1:24",
    story: [
      "The Gospels present Joseph as a just man from the line of David, betrothed to Mary. When an angel guided him in a dream, he welcomed Mary into his home and accepted the responsibility of caring for Jesus.",
      "Joseph protected his family when they fled to Egypt and later made their home in Nazareth. He worked as a carpenter and helped Jesus grow, offering an example of faithfulness through ordinary work and quiet responsibility.",
      "Though the Gospels record no spoken words from Joseph, his actions reveal trust, courage and obedience. He is honoured as the spouse of Mary and guardian of the Holy Family; his solemnity is celebrated on 19 March."
    ],
  },
  {
    id: "st-jude-thaddeus",
    name: "St. Jude Thaddeus",
    latinName: "Sanctus Iudas Thaddaeus",
    epithet: "Apostle of Hope • Patron of Hopeless Causes",
    dateOfBirth: "Unknown (1st century)",
    beatifiedDate: "Pre-congregation (no separate beatification recorded)",
    canonisedDate: "Pre-congregation recognition (no formal date recorded)",
    feastDate: "October 28",
    feastMonth: "October",
    era: "Early Church",
    location: "Galilee and the wider eastern Mediterranean",
    patronage: ["Hopeless Causes", "Desperate Situations", "Hospitals", "Difficult Circumstances"],
    attributes: "Apostle’s medallion showing Christ’s face, flame, staff or club",
    quote: "Keep yourselves in the love of God. — Jude 1:21",
    story: [
      "Jude, also called Thaddaeus, was one of the Twelve Apostles chosen by Jesus. He is distinct from Judas Iscariot, and the Gospel of John remembers him asking Jesus why He would reveal Himself to His disciples and not to the world.",
      "After Pentecost, Christian tradition says Jude carried the Gospel to regions of the Middle East. Details of his later journeys and death are uncertain, so accounts of his missionary travels are best understood as tradition.",
      "The Church celebrates his feast together with St. Simon on 28 October. Over time, devotion to Jude grew especially among people facing difficult or seemingly hopeless situations."
    ],
  },
  {
    id: "st-matthew-apostle",
    name: "St. Matthew the Apostle",
    latinName: "Sanctus Matthaeus Apostolus et Evangelista",
    epithet: "Apostle & Evangelist • Called from the Tax Desk",
    dateOfBirth: "Unknown (1st century)",
    beatifiedDate: "Pre-congregation (no separate beatification recorded)",
    canonisedDate: "Pre-congregation recognition (no formal date recorded)",
    feastDate: "September 21",
    feastMonth: "September",
    era: "Early Church",
    location: "Capernaum, Galilee (Holy Land)",
    patronage: ["Accountants", "Bankers", "Bookkeepers", "Tax Collectors", "Customs Officers"],
    attributes: "Winged human figure, Gospel book, pen, writing desk, money bag",
    quote: "I desire mercy, not sacrifice. — Matthew 9:13",
    story: [
      "Before following Jesus, Matthew—also known as Levi—worked as a tax collector in Capernaum. Many people viewed tax collectors with suspicion, but Jesus called him with the simple words, “Follow me,” and Matthew left his work to become a disciple.",
      "Matthew welcomed Jesus to a meal with other tax collectors and people considered sinners. The moment showed the mercy at the heart of Jesus’ mission: He came not to call the self-righteous, but those who knew they needed God.",
      "Christian tradition associates Matthew with the Gospel that bears his name. His feast is celebrated on 21 September, and his story reminds us that a new beginning is possible when we respond to God’s call."
    ],
  },
  {
    id: "st-peter-apostle",
    name: "St. Peter the Apostle",
    latinName: "Sanctus Petrus Apostolus",
    epithet: "Prince of the Apostles • The Rock",
    dateOfBirth: "Unknown (1st century)",
    beatifiedDate: "Pre-congregation (no separate beatification recorded)",
    canonisedDate: "Pre-congregation recognition (no formal date recorded)",
    feastDate: "June 29",
    feastMonth: "June",
    era: "Early Church",
    location: "Bethsaida & Capernaum, Galilee; Rome",
    patronage: ["The Papacy", "Fishermen", "Net Makers", "Shipbuilders", "The Universal Church"],
    attributes: "Two keys, fishing net, boat, rooster, apostle’s scroll",
    quote: "Lord, to whom shall we go? You have the words of eternal life. — John 6:68",
    story: [
      "Known first as Simon, Peter was a fisherman from Bethsaida who worked around the Sea of Galilee with his brother Andrew. Jesus called him to become a “fisher of people” and gave him the name Peter, meaning rock.",
      "Peter became a leading voice among the Twelve. He professed Jesus as the Messiah and received the symbolic keys of the Kingdom, yet he also knew fear and failure. After denying Jesus, he was restored and entrusted with caring for Christ’s flock.",
      "Early Christian tradition remembers Peter preaching in Rome and dying there as a martyr during the persecution under Emperor Nero. Honoured as a foundational apostle and the first pope in Catholic tradition, he shares his feast day with St. Paul on 29 June."
    ],
  },
];
