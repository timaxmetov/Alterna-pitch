import React, { useState, useEffect, useRef } from 'react';
import { 
  Map, Plane, BookOpen, Users, Briefcase, Award, GraduationCap, ChevronRight, 
  CheckCircle, Globe, Send, Bot, Sparkles, Loader2, Star, Phone, User, Clock,
  MapPin, Heart, Coffee, MessageSquare, Landmark, Mountain, Utensils, PlayCircle,
  Activity, LineChart, PieChart, ShieldCheck, Target, Zap, Building, Network,
  LayoutDashboard, Mail, Database, AlertTriangle, Lightbulb, Video, MessageCircle, TrendingUp
} from 'lucide-react';

// ✅ ВСТАВЬ СВОЙ GEMINI API КЛЮЧ СЮДА
const GEMINI_API_KEY = 'AIzaSyAnobkVTo3PjxutU87iu4KE6vFBJVsksHg';

const content = {
  tr: {
    nav: {
      konsept: "Konsept",
      pasaport: "Pasaport",
      ortam: "Topluluk",
      kultur: "Kültür Blogu",
      b2g: "Devlet & B2G",
      strateji: "Strateji",
      iletisim: "İletişim"
    },
    hero: {
      badge: "EdTech'te Yeni Dönem",
      title1: "Türk Dünyası İçin",
      title2: "Küresel EdTech Ekosistemi",
      desc: "Sınırları aşan bir yolculuk. Geleneksel öğrenme yöntemlerini geride bırakın. Alterna ile Türkçe öğrenmek; şehirleri keşfettiğiniz, sanal pasaportunuzu doldurduğunuz ve küresel bir ağa katıldığınız interaktif bir maceradır.",
      btn1: "Platformu Keşfet",
      btn2: "AI Demosu"
    },
    kavram: {
      badge: "Oyunlaştırılmış Dil Öğrenme: Travel-Quest",
      title1: "Oyunlaştırılmış Dil Öğrenme: ",
      title2: "Travel-Quest",
      desc: "Sıkıcı ders kitaplarına son! Her seviye bir şehri temsil eder. Görevleri tamamlayın, yeni şehirlerin kilidini açın ve \"Sanal Pasaportunuzda\" damgalar biriktirin.",
      steps: [
        { level: 'A1', city: 'İstanbul', status: 'Giriş Seviyesi' },
        { level: 'A2', city: 'İzmir', status: 'Temel İletişim' },
        { level: 'B1', city: 'Antalya', status: 'Bağımsız Kullanıcı' },
        { level: 'B2', city: 'Ankara', status: 'Mesleki Yeterlilik' },
        { level: 'C1+', city: 'Kapadokya / Karadeniz', status: 'Uzmanlık & Kültür' }
      ]
    },
    validation: {
      title: "Pazar Doğrulaması",
      text: "Türkçe öğrenenler arasında yapılan güncel anket sonuçlarına göre, katılımcıların",
      percent: "%85'i",
      desc: "bu konsepti (Travel-Quest) oldukça ilgi çekici ve motive edici buluyor."
    },
    passport: {
      badge: "Oyunlaştırma & İlerleme",
      title: "Dijital Pasaportunla İlerlemeni Takip Et",
      desc: "Her Travel-Quest şehrini tamamladığında pasaportuna bir pul eklenir. 5 ana şehir = 5 seviye = Tam Yetki! Gerçek bir Türkiye uzmanı ol.",
      subtitle: "Travel-Quest • Türkiye",
      completed: "3/5",
      completedText: "Ana şehir tamamlandı",
      progressTitle: "Genel İlerleme",
      progressVal: "%60",
      stampsTitle: "PULLAR / ŞEHİR DAMGALARI",
      badgesTitle: "ROZETLER & BAŞARIMLAR",
      stamps: [
        { level: "A1", icon: "🏛️", locked: false },
        { level: "A2", icon: "🏵️", locked: false },
        { level: "B1", icon: "🌴", locked: false },
        { level: "B2", icon: "🏛️", locked: true },
        { level: "C1", icon: "🎈", locked: true },
        { level: "C1+", icon: "🌲", locked: true }
      ],
      badges: [
        { icon: "🗺️", name: "Kaşif", desc: "İlk şehri tamamla", locked: false },
        { icon: "🧭", name: "Seyyah", desc: "3 şehri tamamla", locked: false },
        { icon: "🎭", name: "Kültür Elçisi", desc: "Tüm A seviyelerini bitir", locked: false },
        { icon: "🤝", name: "Diplomat", desc: "B1 seviyesine ulaş", locked: true },
        { icon: "🎓", name: "Uzman", desc: "B2 seviyesine ulaş", locked: true },
        { icon: "🏆", name: "Usta", desc: "Tüm şehirleri tamamla", locked: true }
      ]
    },
    ortam: {
      badge: "Sosyal Ağ & Mevcut Durum",
      title: "Ortam — Küresel Türkçe Topluluğu",
      desc1: "Öğrencilerimiz dünyada yalnız değil. ",
      desc2: "Ortam",
      desc3: ", ortak ilgi alanlarına göre insanları eşleştiren, sanal kahve sohbetleri ve yüz yüze pratik buluşmaları organize eden interaktif bir ekosistemdir.",
      mvp: {
        title: "Mevcut Altyapı (MVP Traction)",
        notionTitle: "Notion Veritabanı",
        notionDesc: "Öğrenci eşleştirme ve ilerleme takibi şu an Notion üzerinde tam entegre çalışmaktadır.",
        meetTitle: "Google Meet Kulüpleri",
        meetDesc: "Canlı pratik ve konuşma kulüpleri haftalık olarak Meet üzerinden aktif şekilde yapılmaktadır.",
        traction: "Sistem aktif olarak çalışıyor ve kanıtlanmış bir çekişe (traction) sahip."
      },
      mapLabel: "Canlı Topluluk Haritası",
      tableTitle: "Öğrenci Veritabanı & Networking",
      tableSubtitle: "Sistem veritabanı önizlemesi",
      tableBtn: "Tüm Ağı Gör",
      th1: "Öğrenci",
      th2: "Gerçek Konum",
      th3: "Seviye (Şehir)",
      th4: "İlgi Alanları",
      th5: "Aksiyon",
      cities: { moskova: "Moskova", londra: "Londra", almati: "Almatı", pekin: "Pekin" },
      interests: ["Seyahat, Edebiyat", "Bilişim (IT), Tarih", "Sinema, Startuplar"],
      msgBtn: "Bağlantı Kur"
    },
    blog: {
      badge: "Kültür Blogu",
      title: "Türkiye'yi Derinlemesine Keşfet",
      desc: "Dil öğrenmek sadece kelime ezberlemek değildir. Platforma entegre \"Kültür Blogu\" ile Türkiye'nin zengin mirasını, coğrafyasını ve geleneklerini keşfedin. Hedef kitlenin ülkeye tam entegrasyonu sağlanır.",
      cards: [
        {
          title: "Tarih & Miras",
          desc: "Osmanlı'dan Cumhuriyet'e, antik kentlerden müzelere uzanan tarihi bir yolculuk.",
          items: ["Topkapı Sarayı Sırları", "Efes Antik Kenti Rehberi", "Ayasofya'nın Mimari Tarihi"]
        },
        {
          title: "Gelenek & Kültür",
          desc: "Türk insanının günlük yaşamı, misafirperverliği ve yüzyıllık gelenekleri.",
          items: ["Türk Kahvesi Ritüeli", "Geleneksel Türk Hamamı", "Nazar Boncuğu İnanışları"]
        },
        {
          title: "Coğrafya & Doğa",
          desc: "Kapadokya'nın peribacalarından Karadeniz'in yeşil yaylalarına detaylı rota.",
          items: ["Kapadokya Balon Turu", "Pamukkale Travertenleri", "İstanbul Boğazı Gizemleri"]
        },
        {
          title: "Mutfak & Lezzet",
          desc: "Dünyaca ünlü Türk mutfağı: Kebaplardan tatlılara, sokak lezzetlerinden yöresel yemeklere.",
          items: ["Kebap Bölgeleri", "Baklava ve Lokum Tarihi", "Sokak Lezzetleri Rehberi"]
        }
      ]
    },
    b2g: {
      badge: "B2G & Kurumsal Strateji",
      title1: "Devlet Kurumları İçin ",
      title2: "Stratejik Veri Havuzu",
      desc: "Alterna, sadece bir okul değil; Türkiye'ye ilgi duyan, yatırım yapan ve yerleşmeyi planlayan nitelikli yabancıların oluşturduğu bir Büyük Veri (Big Data) merkezidir.",
      dashTitle: "Alterna Analytics Dashboard",
      dashLive: "Canlı Veri Aktarımı",
      stat1Label: "Turizm & Emlak İlgisi",
      stat1Val: "+15%",
      stat1Sub: "Aylık Büyüme Trendi",
      stat2Label: "Rusya & BDT Pazarı",
      stat2Val: "%65",
      stat2Sub: "Kullanıcı Yoğunluğu",
      stat3Label: "Kurumsal Entegrasyon",
      stat3Val: "GoTürkiye",
      stat3Sub: "Potansiyel Ortaklık",
      bottomText: "Turizm Bakanlığı, Yunus Emre Enstitüsü ve TİKA gibi kurumlar için stratejik politikalar oluşturmayı sağlayacak hedef kitle analizleri ve pazar raporlamaları sunulur."
    },
    market: {
      badge: "Rakip Analizi & Pazar Boşluğu",
      title: "AppStore'da Benzersiz Konumlandırma",
      desc: "Şu anda AppStore veya Google Play'de Türkçe öğrenimini bu tarz bir 'Travel-Quest' formatında sunan hiçbir uygulama bulunmamaktadır.",
      highlight: "Alterna, sadece dil öğreniminde değil, aynı zamanda ülkeyi keşfetme (TravelTech) alanında da en iyi EdTech uygulaması olma potansiyeline sahiptir.",
      points: ["Geleneksel uygulamaların ötesinde", "Dil öğrenimi ve TravelTech entegrasyonu", "Mavi okyanus stratejisi (Rekabetsiz alan)"]
    },
    swot: {
      title: "Stratejik SWOT Analizi",
      desc: "Pazardaki rekabet konumumuz ve büyüme potansiyelimiz.",
      s: {
        title: "Güçlü Yönler",
        items: ["Benzersiz oyunlaştırma (Travel-Quest)", "Kurucunun dil tecrübesi (TÖMER C1, IELTS 7.5)", "Hazır Notion ve Google Meet altyapısı"]
      },
      w: {
        title: "Zayıf Yönler",
        items: ["B2B marka bilinirliği için pazarlama bütçesi ihtiyacı", "Hedef kitlenin TikTok/Reels ücretsiz tüketim alışkanlığı"]
      },
      o: {
        title: "Fırsatlar",
        items: ["B2G ortaklıkları (GoTürkiye) ve B2B satışları", "Yapay Zeka (LLM) entegrasyonu", "Türki Cumhuriyetlere (Kazakça vb.) genişleme"]
      },
      t: {
        title: "Tehditler",
        items: ["Duolingo gibi dev küresel rakipler", "Hedef kitlenin zaman yetersizliği (İş/Aile)"]
      },
      teamTitle: "Çekirdek Ekip",
      team: [
        {
          name: "Timur Akhmetov",
          role: "Kurucu & CEO",
          desc: "Akdeniz Üniversitesi Elektrik Mühendisliği öğrencisi. TÖMER C1, IELTS 7.5. Metodolojinin yazarı."
        },
        {
          name: "Şıngıs Narseit",
          role: "CTO & Lead Developer",
          desc: "Klagenfurt Üniversitesi (Robotics AI) öğrencisi. Full-stack geliştirici, AI uzmanı."
        }
      ]
    },
    esg: {
      title: "Sürdürülebilirlik & ESG (BM Hedefleri)",
      cards: [
        { num: "4", title: "Nitelikli Eğitim", desc: "Kapsayıcı, stressiz ve herkes için erişilebilir dijital eğitim platformu." },
        { num: "12", title: "Sorumlu Tüketim", desc: "%100 kağıtsız eğitim ve sıfır karbon ayak izi hedefi." },
        { num: "10", title: "Eşitsizliklerin Azaltılması", desc: "Yabancıların Türk toplumuna hızlı ekonomik ve kültürel adaptasyonu." }
      ]
    },
    ai: {
      badge: "Gelişmiş AI Pratiği",
      title: "Yapay Zeka Dil Asistanı",
      desc: "Öğrencilerimiz 7/24 aktif LLM destekli sanal karakterlerle konuşarak gerçek hayat simülasyonları yaparlar. Hata yapma korkusu olmadan pratik yapma imkanı.",
      levelText: "Seviyesi",
      inputPlaceholder: "Türkçe yanıt verin...",
      loading: "Asistan yazıyor..."
    },
    contact: {
      title: "Vizyonumuzu Birlikte Büyütelim",
      desc: "Alterna EdTech ekosistemini geliştirmek, yatırım fırsatlarını değerlendirmek veya mentorluk yapmak için bizimle iletişime geçin.",
      btnTg: "Telegram'dan Ulaşın",
      btnWa: "WhatsApp'tan Yazın",
      phone: "+7 775 888 09 10"
    },
    footer: { rights: "© 2026 Alterna EdTech. Tüm hakları saklıdır." },
    aiCities: [
      { id: 'istanbul', name: 'İstanbul', level: 'A1', role: 'Simitçi', greeting: 'Merhaba! Simit ister misin? (Merhaba! Simit ister misin?)' },
      { id: 'izmir', name: 'İzmir', level: 'A2', role: 'Kafe Garsonu', greeting: 'Hoş geldiniz! Ne içmek istersiniz? (Hoş geldiniz! Ne içmek istersiniz?)' },
      { id: 'antalya', name: 'Antalya', level: 'B1', role: 'Tur Rehberi', greeting: 'Antalya\'ya hoş geldiniz! Bugün nereyi gezmek istersiniz?' },
      { id: 'ankara', name: 'Ankara', level: 'B2', role: 'İş Ortağı', greeting: 'İyi günler. Toplantı için hazır mısınız?' },
      { id: 'kapadokya', name: 'Kapadokya / Karadeniz', level: 'C1+', role: 'Kültür Uzmanı', greeting: 'Hoş geldiniz. Türkiye\'nin derinliklerini keşfetmeye hazır mısınız?' }
    ]
  },
  en: {
    nav: {
      konsept: "Concept",
      pasaport: "Passport",
      ortam: "Community",
      kultur: "Culture Blog",
      b2g: "B2G & Analytics",
      strateji: "Strategy",
      iletisim: "Contact"
    },
    hero: {
      badge: "A New Era in EdTech",
      title1: "Global EdTech Ecosystem",
      title2: "for the Turkic World",
      desc: "A journey beyond borders. Leave traditional learning methods behind. Learning Turkish with Alterna is an interactive adventure: discover cities, fill your virtual passport, and join a global network.",
      btn1: "Explore Platform",
      btn2: "AI Demo"
    },
    kavram: {
      badge: "Gamified Language Learning: Travel-Quest",
      title1: "Gamification: ",
      title2: "Travel-Quest",
      desc: "No more boring textbooks! Each level is a city. Complete quests, unlock new locations, and collect stamps in your \"Virtual Passport\".",
      steps: [
        { level: 'A1', city: 'Istanbul', status: 'Beginner' },
        { level: 'A2', city: 'Izmir', status: 'Basic Comm.' },
        { level: 'B1', city: 'Antalya', status: 'Independent User' },
        { level: 'B2', city: 'Ankara', status: 'Professional' },
        { level: 'C1+', city: 'Cappadocia / Black Sea', status: 'Expert & Culture' }
      ]
    },
    validation: {
      title: "Market Validation",
      text: "According to our recent survey among Turkish language learners,",
      percent: "85%",
      desc: "of participants find the Travel-Quest concept highly engaging and motivating."
    },
    passport: {
      badge: "Gamification & Progress",
      title: "Track Your Progress with the Digital Passport",
      desc: "Upon completing each Travel-Quest city, a stamp is added to your passport. 5 cities = 5 levels = Full Access! Become a true expert on Turkey.",
      subtitle: "Travel-Quest • Turkey",
      completed: "3/5",
      completedText: "Main cities completed",
      progressTitle: "Overall Progress",
      progressVal: "60%",
      stampsTitle: "STAMPS / CITY MARKS",
      badgesTitle: "BADGES & ACHIEVEMENTS",
      stamps: [
        { level: "A1", icon: "🏛️", locked: false },
        { level: "A2", icon: "🏵️", locked: false },
        { level: "B1", icon: "🌴", locked: false },
        { level: "B2", icon: "🏛️", locked: true },
        { level: "C1", icon: "🎈", locked: true },
        { level: "C1+", icon: "🌲", locked: true }
      ],
      badges: [
        { icon: "🗺️", name: "Explorer", desc: "Complete the 1st city", locked: false },
        { icon: "🧭", name: "Traveler", desc: "Complete 3 cities", locked: false },
        { icon: "🎭", name: "Culture Envoy", desc: "Finish all A levels", locked: false },
        { icon: "🤝", name: "Diplomat", desc: "Reach B1 level", locked: true },
        { icon: "🎓", name: "Expert", desc: "Reach B2 level", locked: true },
        { icon: "🏆", name: "Master", desc: "Complete all cities", locked: true }
      ]
    },
    ortam: {
      badge: "Social Network & Current Status",
      title: "Ortam — Global Community",
      desc1: "Our students are not alone. ",
      desc2: "Ortam",
      desc3: " is an interactive ecosystem that connects people by interests, organizes virtual coffee chats, and sets up in-person practice meetups.",
      mvp: {
        title: "Ready Infrastructure (MVP Traction)",
        notionTitle: "Notion Database",
        notionDesc: "Student matching and progress tracking are already fully integrated and working in Notion.",
        meetTitle: "Google Meet Clubs",
        meetDesc: "Live speaking clubs and practice sessions are held weekly via Google Meet.",
        traction: "The system is already functioning and has proven traction."
      },
      mapLabel: "Live Community Map",
      tableTitle: "Student Database & Networking",
      tableSubtitle: "System matching preview",
      tableBtn: "View Full Network",
      th1: "Student",
      th2: "Real Location",
      th3: "Level (City)",
      th4: "Interests",
      th5: "Action",
      cities: { moskova: "Moscow", londra: "London", almati: "Almaty", pekin: "Beijing" },
      interests: ["Travel, Literature", "IT, History", "Cinema, Startups"],
      msgBtn: "Connect"
    },
    blog: {
      badge: "Culture Blog",
      title: "Explore Turkey Deeply",
      desc: "Learning a language isn't just memorization. The integrated \"Culture Blog\" introduces the country's heritage, geography, and traditions, ensuring deep integration of expats into society.",
      cards: [
        {
          title: "History & Heritage",
          desc: "A historical journey from the Ottoman Empire to the Republic, from ancient cities to museums.",
          items: ["Secrets of Topkapi Palace", "Guide to Ancient Ephesus", "History of Hagia Sophia"]
        },
        {
          title: "Traditions & Culture",
          desc: "The daily life of Turkish people, hospitality, and centuries-old traditions.",
          items: ["Turkish Coffee Ritual", "Traditional Hammam", "Evil Eye Amulet (Nazar)"]
        },
        {
          title: "Geography & Nature",
          desc: "Routes from the fairy chimneys of Cappadocia to the green plateaus of the Black Sea.",
          items: ["Cappadocia Hot Air Balloons", "Pamukkale Travertines", "Mysteries of the Bosphorus"]
        },
        {
          title: "Cuisine & Gastronomy",
          desc: "World-famous Turkish cuisine: from kebabs to street food and regional dishes.",
          items: ["Kebab Regions", "History of Baklava & Lokum", "Street Food Guide"]
        }
      ]
    },
    b2g: {
      badge: "B2G & Institutions",
      title1: "Strategic Data Pool for ",
      title2: "the Government",
      desc: "Alterna is not just a language school; it's a Big Data hub of qualified foreigners interested in Turkey, investing in it, and planning to relocate.",
      dashTitle: "Alterna Analytics Dashboard",
      dashLive: "Live Data",
      stat1Label: "Tourism & Real Estate Interest",
      stat1Val: "+15%",
      stat1Sub: "Monthly Growth",
      stat2Label: "CIS & Russia Market",
      stat2Val: "65%",
      stat2Sub: "Audience Density",
      stat3Label: "Institutional Integration",
      stat3Val: "GoTürkiye",
      stat3Sub: "Potential Partnership",
      bottomText: "Providing target audience analytics for the Ministry of Tourism, Yunus Emre Institute, and TIKA to shape strategic policies."
    },
    market: {
      badge: "Competitor Analysis & Market Gap",
      title: "Unique Positioning in the AppStore",
      desc: "Currently, there are no apps in the AppStore or Google Play that offer Turkish language learning in such a 'Travel-Quest' format.",
      highlight: "Alterna has the full potential to become the #1 EdTech and TravelTech application for learning Turkish and discovering the country.",
      points: ["Beyond traditional apps", "Integration of Language Learning and TravelTech", "Blue Ocean Strategy (Uncontested market)"]
    },
    swot: {
      title: "Strategic SWOT Analysis",
      desc: "Our market position and scaling potential.",
      s: {
        title: "Strengths",
        items: ["Unique Gamification (Travel-Quest)", "Founder's language expertise (TÖMER C1, IELTS 7.5)", "Ready MVP base (Notion + Google Meet)"]
      },
      w: {
        title: "Weaknesses",
        items: ["Need for marketing budget for B2B brand awareness", "Target audience's habit of free content (TikTok/Reels)"]
      },
      o: {
        title: "Opportunities",
        items: ["B2G partnerships (GoTürkiye) and B2B sales", "Integration of LLM (AI) models", "Scaling to other Turkic languages (Kazakh, Uzbek)"]
      },
      t: {
        title: "Threats",
        items: ["Global giants (Duolingo, Babbel)", "Lack of time among the target audience (Work/Family)"]
      },
      teamTitle: "Core Team",
      team: [
        {
          name: "Timur Akhmetov",
          role: "Founder & CEO",
          desc: "Electrical Eng. student, Akdeniz Univ. TÖMER C1, IELTS 7.5. Author of the methodology."
        },
        {
          name: "Shyngys Narseit",
          role: "CTO & Lead Developer",
          desc: "Robotics AI student, Klagenfurt Univ. Full-stack developer, AI expert."
        }
      ]
    },
    esg: {
      title: "ESG & UN Sustainable Development Goals",
      cards: [
        { num: "4", title: "Quality Education", desc: "An inclusive, accessible, and stress-free digital educational platform." },
        { num: "12", title: "Responsible Consumption", desc: "100% paperless learning and zero carbon footprint." },
        { num: "10", title: "Reduced Inequalities", desc: "Accelerated economic and cultural adaptation of expats into Turkish society." }
      ]
    },
    ai: {
      badge: "Advanced AI Practice",
      title: "AI Language Assistant",
      desc: "Students can practice the language 24/7 with virtual LLM characters, immersing themselves in real-life simulations without the fear of making a mistake.",
      levelText: "Level",
      inputPlaceholder: "Reply in Turkish...",
      loading: "Assistant is typing..."
    },
    contact: {
      title: "Let's Grow Our Vision Together",
      desc: "Contact us to discuss strategic partnerships, mentorship, or integrating the Alterna platform into your ecosystem.",
      btnTg: "Message on Telegram",
      btnWa: "Message on WhatsApp",
      phone: "+7 775 888 09 10"
    },
    footer: { rights: "© 2026 Alterna EdTech. All rights reserved." },
    aiCities: [
      { id: 'istanbul', name: 'Istanbul', level: 'A1', role: 'Simit Seller', greeting: 'Merhaba! Simit ister misin? (Hello! Would you like a simit?)' },
      { id: 'izmir', name: 'Izmir', level: 'A2', role: 'Cafe Waiter', greeting: 'Hoş geldiniz! Ne içmek istersiniz? (Welcome! What would you like to drink?)' },
      { id: 'antalya', name: 'Antalya', level: 'B1', role: 'Tour Guide', greeting: 'Antalya\'ya hoş geldiniz! Bugün nereyi gezmek istersiniz? (Welcome to Antalya! Where do you want to visit today?)' },
      { id: 'ankara', name: 'Ankara', level: 'B2', role: 'Business Partner', greeting: 'İyi günler. Toplantı için hazır mısınız? (Good day. Are you ready for the meeting?)' },
      { id: 'kapadokya', name: 'Cappadocia / Black Sea', level: 'C1+', role: 'Culture Expert', greeting: 'Hoş geldiniz. Türkiye\'nin derinliklerini keşfetmeye hazır mısınız? (Welcome. Are you ready to explore the depths of Turkey?)' }
    ]
  },
  ru: {
    nav: {
      konsept: "Концепт",
      pasaport: "Паспорт",
      ortam: "Комьюнити",
      kultur: "Культурный Блог",
      b2g: "B2G & Аналитика",
      strateji: "Стратегия",
      iletisim: "Контакты"
    },
    hero: {
      badge: "Новая эра в EdTech",
      title1: "Глобальная EdTech Экосистема",
      title2: "Для Тюркского Мира",
      desc: "Путешествие без границ. Оставьте традиционные методы в прошлом. Изучение турецкого с Alterna — это интерактивное приключение: открывайте города, заполняйте виртуальный паспорт и присоединяйтесь к глобальной сети.",
      btn1: "Узнать больше",
      btn2: "AI Демо-версия"
    },
    kavram: {
      badge: "Геймификация языка: Travel-Quest",
      title1: "Геймификация: ",
      title2: "Travel-Quest",
      desc: "Конец скучным учебникам! Каждый уровень — это город. Выполняйте квесты, открывайте новые локации и собирайте штампы в свой \"Виртуальный Паспорт\".",
      steps: [
        { level: 'A1', city: 'Стамбул', status: 'Начальный уровень' },
        { level: 'A2', city: 'Измир', status: 'Базовое общение' },
        { level: 'B1', city: 'Анталья', status: 'Независимый юзер' },
        { level: 'B2', city: 'Анкара', status: 'Проф. уровень' },
        { level: 'C1+', city: 'Каппадокия / Карадениз', status: 'Эксперт и Культура' }
      ]
    },
    validation: {
      title: "Подтверждение спроса",
      text: "По результатам нашего недавнего опроса среди изучающих турецкий язык,",
      percent: "85%",
      desc: "пользователей считают концепцию Travel-Quest увлекательной и сильно мотивирующей."
    },
    passport: {
      badge: "Геймификация и Прогресс",
      title: "Отслеживай прогресс в Цифровом Паспорте",
      desc: "По завершении каждого города Travel-Quest в паспорт добавляется штамп. 5 городов = 5 уровней = Полный доступ! Стань настоящим экспертом по Турции.",
      subtitle: "Travel-Quest • Турция",
      completed: "3/5",
      completedText: "Основных городов пройдено",
      progressTitle: "Общий прогресс",
      progressVal: "60%",
      stampsTitle: "ШТАМПЫ / ОТМЕТКИ ГОРОДОВ",
      badgesTitle: "ЗНАЧКИ И ДОСТИЖЕНИЯ",
      stamps: [
        { level: "A1", icon: "🏛️", locked: false },
        { level: "A2", icon: "🏵️", locked: false },
        { level: "B1", icon: "🌴", locked: false },
        { level: "B2", icon: "🏛️", locked: true },
        { level: "C1", icon: "🎈", locked: true },
        { level: "C1+", icon: "🌲", locked: true }
      ],
      badges: [
        { icon: "🗺️", name: "Исследователь", desc: "Пройди первый город", locked: false },
        { icon: "🧭", name: "Путешественник", desc: "Пройди 3 города", locked: false },
        { icon: "🎭", name: "Посол культуры", desc: "Заверши уровни A", locked: false },
        { icon: "🤝", name: "Дипломат", desc: "Достигни уровня B1", locked: true },
        { icon: "🎓", name: "Эксперт", desc: "Достигни уровня B2", locked: true },
        { icon: "🏆", name: "Мастер", desc: "Пройди все города", locked: true }
      ]
    },
    ortam: {
      badge: "Социальная Сеть & Текущий статус",
      title: "Ortam — Глобальное комьюнити",
      desc1: "Наши студенты не одиноки. ",
      desc2: "Ortam",
      desc3: " — это интерактивная экосистема, которая объединяет людей по интересам, организует виртуальные встречи за кофе и очные языковые практики.",
      mvp: {
        title: "Готовая Инфраструктура (MVP Traction)",
        notionTitle: "База данных Notion",
        notionDesc: "Матчинг студентов и трекинг прогресса уже полностью интегрированы и работают в Notion.",
        meetTitle: "Google Meet Клубы",
        meetDesc: "Разговорные клубы и живая практика еженедельно проводятся через Google Meet.",
        traction: "Система уже функционирует и доказала свою востребованность (traction)."
      },
      mapLabel: "Live Карта Комьюнити",
      tableTitle: "База Студентов & Нетворкинг",
      tableSubtitle: "Предпросмотр системы матчинга",
      tableBtn: "Вся сеть",
      th1: "Студент",
      th2: "Реальная Локация",
      th3: "Уровень (Город)",
      th4: "Интересы",
      th5: "Связь",
      cities: { moskova: "Москва", londra: "Лондон", almati: "Алматы", pekin: "Пекин" },
      interests: ["Путешествия, Литература", "IT, История", "Кино, Стартапы"],
      msgBtn: "Написать"
    },
    blog: {
      badge: "Культурный Блог",
      title: "Исследуй Турцию изнутри",
      desc: "Изучение языка — это не просто зубрежка. Интегрированный \"Культурный блог\" знакомит с наследием, географией и традициями страны, обеспечивая глубокую интеграцию экспатов и релокантов в общество.",
      cards: [
        {
          title: "История и Наследие",
          desc: "Историческое путешествие от Османской империи до Республики, от античных городов до музеев.",
          items: ["Секреты Дворца Топкапы", "Гид по Античному Эфесу", "История Айя-Софии"]
        },
        {
          title: "Традиции и Культура",
          desc: "Повседневная жизнь турецкого народа, гостеприимство и многовековые традиции.",
          items: ["Ритуал Турецкого Кофе", "Традиционный Хаммам", "Амулет от сглаза (Назар)"]
        },
        {
          title: "География и Природа",
          desc: "Маршруты от скал Каппадокии до зеленых плато Черного моря.",
          items: ["Воздушные шары Каппадокии", "Травертины Памуккале", "Тайны Босфора"]
        },
        {
          title: "Кухня и Гастрономия",
          desc: "Всемирно известная турецкая кухня: от кебабов до уличной еды.",
          items: ["Регионы Кебабов", "История Баклавы и Лукума", "Гид по Уличной Еде"]
        }
      ]
    },
    b2g: {
      badge: "B2G & Институты",
      title1: "Стратегическая база данных для ",
      title2: "Государства",
      desc: "Alterna — это не просто языковая школа, это центр Больших Данных (Big Data) о квалифицированных иностранцах, интересующихся Турцией, инвестирующих в нее и планирующих переезд.",
      dashTitle: "Аналитическая Платформа Alterna",
      dashLive: "Live Данные",
      stat1Label: "Интерес к Туризму/Недвижимости",
      stat1Val: "+15%",
      stat1Sub: "Ежемесячный рост",
      stat2Label: "Рынок РФ и СНГ",
      stat2Val: "65%",
      stat2Sub: "Плотность аудитории",
      stat3Label: "Институциональная интеграция",
      stat3Val: "GoTürkiye",
      stat3Sub: "Потенциальное партнерство",
      bottomText: "Предоставление аналитики целевой аудитории для Министерства туризма, Института Юнуса Эмре и TİKA для формирования стратегических политик."
    },
    market: {
      badge: "Анализ Конкурентов",
      title: "Уникальное позиционирование",
      desc: "На данный момент в AppStore нет аналогов приложения по изучению турецкого языка в таком увлекательном формате 'Travel-Quest'.",
      highlight: "У Alterna есть все перспективы стать лучшим EdTech и TravelTech приложением для изучения турецкого языка и знакомства со страной.",
      points: ["Выход за рамки традиционных приложений", "Слияние изучения языка и TravelTech", "Стратегия голубого океана"]
    },
    swot: {
      title: "Стратегический SWOT Анализ",
      desc: "Наша позиция на рынке и потенциал масштабирования.",
      s: {
        title: "Сильные стороны",
        items: ["Уникальная геймификация (Travel-Quest)", "Языковая экспертиза фаундера (TÖMER C1, IELTS 7.5)", "Готовая MVP база (Notion + Google Meet)"]
      },
      w: {
        title: "Слабые стороны",
        items: ["Потребность в маркетинговом бюджете для B2B", "Привычка ЦА к бесплатному контенту (TikTok/Reels)"]
      },
      o: {
        title: "Возможности",
        items: ["B2G партнерства (GoTürkiye) и B2B продажи", "Интеграция LLM (ИИ) моделей", "Масштабирование (казахский, узбекский языки)"]
      },
      t: {
        title: "Угрозы",
        items: ["Глобальные гиганты (Duolingo, Babbel)", "Нехватка времени у целевой аудитории (Работа/Семья)"]
      },
      teamTitle: "Ключевая Команда",
      team: [
        {
          name: "Тимур Ахметов",
          role: "Founder & CEO",
          desc: "Студент Электроинженерии, университет Акдениз. TÖMER C1, IELTS 7.5. Автор методологии."
        },
        {
          name: "Шынгыс Нарсейит",
          role: "CTO & Lead Developer",
          desc: "Студент Robotics AI, университет Клагенфурта. Full-stack разработчик, эксперт по ИИ."
        }
      ]
    },
    esg: {
      title: "ESG и Цели Устойчивого Развития ООН",
      cards: [
        { num: "4", title: "Качественное Образование", desc: "Инклюзивная, доступная и безстрессовая цифровая образовательная платформа." },
        { num: "12", title: "Ответственное Потребление", desc: "100% безбумажное обучение и нулевой углеродный след." },
        { num: "10", title: "Уменьшение Неравенства", desc: "Ускоренная экономическая и культурная адаптация экспатов в турецкое общество." }
      ]
    },
    ai: {
      badge: "Продвинутая ИИ Практика",
      title: "AI Языковой Ассистент",
      desc: "Студенты могут практиковать язык 24/7 с виртуальными персонажами (LLM), погружаясь в симуляции реальной жизни. Никакого страха сделать ошибку.",
      levelText: "Уровень",
      inputPlaceholder: "Ответьте на турецком...",
      loading: "Ассистент печатает..."
    },
    contact: {
      title: "Давайте развивать проект вместе",
      desc: "Свяжитесь с нами, чтобы обсудить стратегическое партнерство, менторство или интеграцию платформы Alterna в вашу экосистему.",
      btnTg: "Написать в Telegram",
      btnWa: "Написать в WhatsApp",
      phone: "+7 775 888 09 10"
    },
    footer: { rights: "© 2026 Alterna EdTech. Все права защищены." },
    aiCities: [
      { id: 'istanbul', name: 'Стамбул', level: 'A1', role: 'Продавец симитов', greeting: 'Merhaba! Simit ister misin? (Здравствуйте! Хотите симит?)' },
      { id: 'izmir', name: 'Измир', level: 'A2', role: 'Официант в кафе', greeting: 'Hoş geldiniz! Ne içmek istersiniz? (Добро пожаловать! Что будете пить?)' },
      { id: 'antalya', name: 'Анталья', level: 'B1', role: 'Гид экскурсии', greeting: 'Antalya\'ya hoş geldiniz! Bugün nereyi gezmek istersiniz? (Добро пожаловать в Анталью! Куда хотите отправиться сегодня?)' },
      { id: 'ankara', name: 'Анкара', level: 'B2', role: 'Бизнес-партнер', greeting: 'İyi günler. Toplantı için hazır mısınız? (Добрый день. Вы готовы к встрече?)' },
      { id: 'kapadokya', name: 'Каппадокия / Карадениз', level: 'C1+', role: 'Эксперт по культуре', greeting: 'Hoş geldiniz. Türkiye\'nin derinliklerini keşfetmeye hazır mısınız? (Добро пожаловать. Готовы ли вы исследовать глубины Турции?)' }
    ]
  }
};

const basePrompts = {
  tr: {
    istanbul: 'Sen İstanbul sokaklarında bir simitçisin. Kullanıcıyla çok basit bir Türkçe (A1 seviyesi) ile iletişim kur. Cevapların kısa ve öz olsun.',
    izmir: 'Sen İzmir\'de deniz manzaralı bir kafede samimi bir garsonusun. A2 seviyesinde Türkçe ile iletişim kur. Sipariş almak için standart ifadeler kullan.',
    antalya: 'Sen Antalya\'da bir tur rehberisin. B1 seviyesinde Türkçe ile iletişim kur. Şehir hakkında ilginç bilgiler verebilirsin.',
    ankara: 'Sen Ankara\'daki bir ofiste iş ortağısın. Profesyonel B2 seviyesi Türkçe ile iletişim kur. İş jargonu ve saygılı ("Siz") bir dil kullan.',
    kapadokya: 'Sen Türkiye\'nin (Kapadokya ve Karadeniz bölgesi) kültür ve tarih uzmanısın. İleri düzey C1+ Türkçe ile iletişim kur. Zengin kelime dağarcığı ve deyimler kullan.'
  },
  en: {
    istanbul: 'You are a simit seller on the street in Istanbul. Communicate with the user in very basic Turkish (A1 level). Your answers should be very short and simple. After each of your Turkish phrases, be sure to write the translation in English in parentheses.',
    izmir: 'You are a friendly waiter in a cafe with a sea view in Izmir. Communicate in Turkish at the A2 level. Use standard phrases for ordering food and drinks. After each of your Turkish phrases, be sure to write the translation in English in parentheses.',
    antalya: 'You are a tour guide in Antalya. Communicate in Turkish at the B1 level. You can tell interesting facts about the city. After each of your Turkish phrases, be sure to write the translation in English in parentheses.',
    ankara: 'You are a business partner in an office in Ankara. Communicate in professional Turkish at the B2 level. Use business vocabulary and respectful address (Siz). After each of your Turkish phrases, be sure to write the translation in English in parentheses.',
    kapadokya: 'You are an expert on the culture and history of Turkey (Cappadocia and the Black Sea region). Communicate in advanced Turkish at the C1+ level. Use rich vocabulary and idioms. After each of your Turkish phrases, be sure to write the translation in English in parentheses.'
  },
  ru: {
    istanbul: 'Ты продавец симитов на улице в Стамбуле. Общайся с пользователем на самом базовом турецком языке (уровень A1). Твои ответы должны быть очень короткими и простыми. После каждой своей фразы на турецком обязательно пиши перевод на русский язык в круглых скобках.',
    izmir: 'Ты дружелюбный официант в кафе с видом на море в Измире. Общайся на турецком языке уровня A2. Используй стандартные фразы для заказа еды и напитков. После каждой своей фразы на турецком обязательно пиши перевод на русский язык в круглых скобках.',
    antalya: 'Ты туристический гид в Анталье. Общайся на турецком языке уровня B1. Можешь рассказывать интересные факты о городе, использовать более сложные времена. После каждой своей фразы на турецком обязательно пиши перевод на русский язык в круглых скобках.',
    ankara: 'Ты деловой партнер в офисе в Анкаре. Общайся на профессиональном турецком языке уровня B2. Используй деловую лексику, уважительное обращение (Siz). После каждой своей фразы на турецком обязательно пиши перевод на русский язык в круглых скобках.',
    kapadokya: 'Ты эксперт по культуре и истории Турции (Каппадокия и Черноморский регион). Общайся на продвинутом турецком языке уровня C1+. Используй богатую лексику, идиомы ve сложные конструкции. После каждой своей фразы на турецком обязательно пиши перевод на русский язык в круглых скобках.'
  }
};

const App = () => {
  const [lang, setLang] = useState('tr');
  const t = content[lang];
  const [scrolled, setScrolled] = useState(false);

  const [selectedCityId, setSelectedCityId] = useState('istanbul');
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: 'bot', text: content['tr'].aiCities[0].greeting }
  ]);
  const chatEndRef = useRef(null);

  const activeCity = {
    ...t.aiCities.find(c => c.id === selectedCityId) || t.aiCities[0],
    prompt: basePrompts[lang][selectedCityId]
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  const handleLangChange = (newLang) => {
    setLang(newLang);
    const updatedCity = content[newLang].aiCities.find(c => c.id === selectedCityId);
    if (chatHistory.length === 1 && chatHistory[0].role === 'bot') {
      setChatHistory([{ role: 'bot', text: updatedCity.greeting }]);
    }
  };

  const handleCityChange = (cityId) => {
    setSelectedCityId(cityId);
    const newCity = t.aiCities.find(c => c.id === cityId);
    setChatHistory([{ role: 'bot', text: newCity.greeting }]);
  };

  // ✅ ОБНОВЛЁННАЯ ФУНКЦИЯ С GEMINI API
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const userText = chatInput.trim();
    const newHistory = [...chatHistory, { role: 'user', text: userText }];
    setChatHistory(newHistory);
    setChatInput('');
    setIsLoading(true);

    try {
      // Конвертируем историю чата в формат Gemini
      // Gemini требует: role = 'user' | 'model'
      // Первое сообщение всегда должно быть от 'user', поэтому фильтруем приветствие бота
      const geminiMessages = newHistory
        .filter((msg, idx) => {
          // Убираем начальное приветствие бота если оно стоит первым (Gemini не принимает model первым)
          if (idx === 0 && msg.role === 'bot') return false;
          return true;
        })
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            // Системный промпт — роль и уровень языка для выбранного города
            system_instruction: {
              parts: [{ text: activeCity.prompt }]
            },
            contents: geminiMessages
          })
        }
      );

      const data = await response.json();

      // Обработка ошибок от API
      if (data.error) {
        throw new Error(data.error.message || 'Gemini API error');
      }

      const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || '...';
      setChatHistory(prev => [...prev, { role: 'bot', text: botText }]);

    } catch (error) {
      console.error('Gemini API Error:', error);

      let errReply = `Hata: ${error.message}`;
      if (lang === 'ru') errReply = `Ошибка: ${error.message}`;
      if (lang === 'en') errReply = `Error: ${error.message}`;

      setChatHistory(prev => [...prev, { role: 'bot', text: errReply }]);
    } finally {
      setIsLoading(false);
    }
  };

  const mapPins = [
    { id: 1, x: '25%', y: '45%', name: 'Elena V.', city: t.ortam.cities.moskova, level: 'A2', flag: '🇷🇺' },
    { id: 2, x: '45%', y: '60%', name: 'John D.', city: t.ortam.cities.londra, level: 'B1', flag: '🇬🇧' },
    { id: 3, x: '75%', y: '35%', name: 'Aigerim S.', city: t.ortam.cities.almati, level: 'B2', flag: '🇰🇿' },
    { id: 4, x: '65%', y: '75%', name: 'Li W.', city: t.ortam.cities.pekin, level: 'A1', flag: '🇨🇳' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-red-200">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-slate-200' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#dc2626] rounded-xl flex items-center justify-center">
              <Map className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-black tracking-tighter text-slate-900">Alterna</div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-6 text-sm font-semibold text-slate-600">
              <a href="#kavram" className="hover:text-[#dc2626] transition-colors">{t.nav.konsept}</a>
              <a href="#pasaport" className="hover:text-[#dc2626] transition-colors">{t.nav.pasaport}</a>
              <a href="#ortam" className="hover:text-[#dc2626] transition-colors">{t.nav.ortam}</a>
              <a href="#kultur" className="hover:text-[#dc2626] transition-colors">{t.nav.kultur}</a>
              <a href="#b2g" className="hover:text-[#dc2626] transition-colors">{t.nav.b2g}</a>
              <a href="#swot" className="hover:text-[#dc2626] transition-colors">{t.nav.strateji}</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-200/50 p-1 rounded-full border border-slate-300">
              <button onClick={() => handleLangChange('tr')} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'tr' ? 'bg-white text-[#dc2626] shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>TR</button>
              <button onClick={() => handleLangChange('en')} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-white text-[#dc2626] shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>EN</button>
              <button onClick={() => handleLangChange('ru')} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'ru' ? 'bg-white text-[#dc2626] shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>RU</button>
            </div>
            <a href="#iletisim" className="hidden sm:flex bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#dc2626] transition-all shadow-md">
              {t.nav.iletisim}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-24 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-red-600 opacity-20 blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
            <Sparkles className="w-4 h-4" /> {t.hero.badge}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-8 tracking-tight">
            {t.hero.title1} <br/><span className="text-[#dc2626] bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">{t.hero.title2}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-3xl mx-auto font-medium">{t.hero.desc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#kavram" className="bg-[#dc2626] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2">
              {t.hero.btn1} <ChevronRight className="w-5 h-5" />
            </a>
            <a href="#ai-practice" className="bg-white/5 text-white border border-slate-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
              <Bot className="w-5 h-5" /> {t.hero.btn2}
            </a>
          </div>
        </div>
      </header>

      {/* Kavram / Travel-Quest */}
      <section id="kavram" className="pt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">{t.kavram.title1}<span className="text-[#dc2626]">{t.kavram.title2}</span></h2>
            <p className="text-lg text-slate-600 font-medium">{t.kavram.desc}</p>
          </div>
          <div className="grid md:grid-cols-5 gap-4 relative mb-12">
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-1 bg-slate-100 -translate-y-1/2 z-0"></div>
            {[
              { icon: Building, color: 'bg-[#dc2626]', textCol: 'text-white', data: t.kavram.steps[0] },
              { icon: Coffee, color: 'bg-slate-900', textCol: 'text-white', data: t.kavram.steps[1] },
              { icon: Map, color: 'bg-slate-200', textCol: 'text-slate-600', data: t.kavram.steps[2] },
              { icon: Briefcase, color: 'bg-slate-100', textCol: 'text-slate-400', data: t.kavram.steps[3] },
              { icon: Mountain, color: 'bg-slate-50', textCol: 'text-slate-300', data: t.kavram.steps[4] }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-shadow group">
                <div className={`w-16 h-16 ${step.color} ${step.textCol} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="text-sm font-black text-slate-400 mb-1 tracking-widest">{step.data.level}</div>
                <h4 className="text-xl font-bold text-slate-900 mb-2 text-center">{step.data.city}</h4>
                <p className="text-xs font-semibold text-slate-500 text-center uppercase tracking-wider">{step.data.status}</p>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-[2rem] p-8 md:p-10 border border-red-100 shadow-sm flex flex-col md:flex-row items-center gap-8 mb-24 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
              <PieChart className="w-64 h-64 text-[#dc2626] -mr-12 -mb-12" />
            </div>
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shrink-0 shadow-xl border-4 border-red-100 relative z-10">
              <span className="text-4xl font-black text-[#dc2626]">{t.validation.percent}</span>
            </div>
            <div className="relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/60 text-[#dc2626] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
                <PieChart className="w-4 h-4" /> {t.validation.title}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">
                {t.validation.text} <span className="text-[#dc2626] font-black">{t.validation.percent}</span> {t.validation.desc}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Dijital Pasaport */}
      <section id="pasaport" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-red-100 text-[#dc2626] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Award className="w-4 h-4" /> {t.passport.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{t.passport.title}</h2>
            <p className="text-lg text-slate-600 font-medium">{t.passport.desc}</p>
          </div>
          <div className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-xl border border-slate-200 p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-slate-100 pb-8 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center border border-red-100">
                  <Globe className="w-8 h-8 text-[#dc2626]" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">ALTERNA PASAPORT</h3>
                  <p className="text-slate-500 font-medium">{t.passport.subtitle}</p>
                </div>
              </div>
              <div className="text-left md:text-right">
                <div className="text-5xl font-black text-[#dc2626] leading-none mb-1">{t.passport.completed}</div>
                <p className="text-slate-500 text-sm font-medium">{t.passport.completedText}</p>
              </div>
            </div>
            <div className="mb-12">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-bold text-slate-700">{t.passport.progressTitle}</h4>
                <span className="text-sm font-black text-slate-900">{t.passport.progressVal}</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[60%] h-full bg-gradient-to-r from-teal-400 via-blue-500 to-[#dc2626] rounded-full"></div>
              </div>
            </div>
            <div className="mb-12">
              <h4 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-6">{t.passport.stampsTitle}</h4>
              <div className="flex flex-wrap gap-4">
                {t.passport.stamps.map((stamp, idx) => (
                  <div key={idx} className={`w-20 h-24 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${stamp.locked ? 'border-2 border-dashed border-slate-200 bg-slate-50 opacity-50 grayscale' : 'border-2 border-red-200 bg-red-50 shadow-sm'}`}>
                    <div className="text-3xl">{stamp.icon}</div>
                    <div className={`text-xs font-black ${stamp.locked ? 'text-slate-400' : 'text-[#dc2626]'}`}>{stamp.level}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-6">{t.passport.badgesTitle}</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {t.passport.badges.map((badge, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl flex flex-col items-center text-center transition-all ${badge.locked ? 'bg-slate-50 border border-slate-100 opacity-60 grayscale' : 'bg-amber-50/50 border border-amber-200 shadow-sm hover:shadow-md'}`}>
                    <div className="text-3xl mb-3">{badge.icon}</div>
                    <h5 className={`font-bold text-sm mb-1 ${badge.locked ? 'text-slate-500' : 'text-slate-900'}`}>{badge.name}</h5>
                    <p className="text-[10px] leading-tight text-slate-500 font-medium">{badge.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ortam */}
      <section id="ortam" className="py-24 bg-white border-t border-slate-200/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Network className="w-4 h-4" /> {t.ortam.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{t.ortam.title}</h2>
            <p className="text-lg text-slate-600 font-medium">
              {t.ortam.desc1} <span className="font-bold text-[#dc2626]">{t.ortam.desc2}</span>{t.ortam.desc3}
            </p>
          </div>
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 mb-20 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 relative z-10">
              <h3 className="text-2xl md:text-3xl font-black text-white">{t.ortam.mvp.title}</h3>
              <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold border border-emerald-500/30">
                <CheckCircle className="w-4 h-4" /> {t.ortam.mvp.traction}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl flex gap-6 hover:border-slate-500 transition-colors">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <Database className="w-8 h-8 text-slate-900" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{t.ortam.mvp.notionTitle}</h4>
                  <p className="text-slate-400 leading-relaxed text-sm font-medium">{t.ortam.mvp.notionDesc}</p>
                </div>
              </div>
              <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl flex gap-6 hover:border-slate-500 transition-colors">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{t.ortam.mvp.meetTitle}</h4>
                  <p className="text-slate-400 leading-relaxed text-sm font-medium">{t.ortam.mvp.meetDesc}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-[2.5rem] border border-slate-200 p-8 mb-12 relative h-[400px] overflow-hidden group">
            <div className="absolute top-6 left-8 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-slate-800 shadow-sm border border-slate-200 z-10 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div> {t.ortam.mapLabel}
            </div>
            <div className="w-full h-full relative">
              <div className="absolute w-full h-full z-10 inset-0">
                {mapPins.map((pin) => (
                  <div key={pin.id} className="absolute flex flex-col items-center group/pin" style={{ left: pin.x, top: pin.y }}>
                    <div className="w-4 h-4 bg-[#dc2626] rounded-full shadow-[0_0_15px_rgba(220,38,38,0.6)] animate-pulse"></div>
                    <div className="mt-2 bg-white px-3 py-1.5 rounded-lg shadow-lg border border-slate-100 opacity-0 group-hover/pin:opacity-100 transition-opacity -translate-y-2 group-hover/pin:translate-y-0 text-center pointer-events-none whitespace-nowrap">
                      <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5"><span className="text-sm">{pin.flag}</span> {pin.name}</div>
                      <div className="text-[10px] text-slate-500 font-medium flex justify-center gap-1 mt-0.5">
                        <span>{pin.city}</span> • <span className="text-[#dc2626]">{pin.level}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden mb-12">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{t.ortam.tableTitle}</h3>
                <p className="text-sm text-slate-500 mt-1">{t.ortam.tableSubtitle}</p>
              </div>
              <button className="text-sm font-bold text-[#dc2626] bg-red-50 px-4 py-2 rounded-full hover:bg-red-100 transition-colors hidden sm:block">{t.ortam.tableBtn}</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest border-b border-slate-200">
                    <th className="p-4 pl-8 font-bold">{t.ortam.th1}</th>
                    <th className="p-4 font-bold">{t.ortam.th2}</th>
                    <th className="p-4 font-bold">{t.ortam.th3}</th>
                    <th className="p-4 font-bold">{t.ortam.th4}</th>
                    <th className="p-4 pr-8 font-bold text-right">{t.ortam.th5}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { emoji: '👩🏼', name: 'Elena V.', flag: '🇷🇺', city: t.ortam.cities.moskova, level: 'A2', levelColor: 'bg-red-50 text-[#dc2626] border-red-100', interest: t.ortam.interests[0] },
                    { emoji: '👨🏻', name: 'John D.', flag: '🇬🇧', city: t.ortam.cities.londra, level: 'B1', levelColor: 'bg-amber-50 text-amber-600 border-amber-100', interest: t.ortam.interests[1] },
                    { emoji: '👩🏻', name: 'Aigerim S.', flag: '🇰🇿', city: t.ortam.cities.almati, level: 'B2', levelColor: 'bg-slate-100 text-slate-700 border-slate-200', interest: t.ortam.interests[2] },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 pl-8 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">{row.emoji}</div>
                        <span className="font-bold text-slate-900">{row.name}</span>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-600"><span className="text-lg mr-1">{row.flag}</span> {row.city}</td>
                      <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-bold border ${row.levelColor}`}>{row.level}</span></td>
                      <td className="p-4 text-sm text-slate-500">{row.interest}</td>
                      <td className="p-4 pr-8 text-right">
                        <button className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#dc2626] transition-colors"><MessageSquare className="w-3 h-3"/> {t.ortam.msgBtn}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Kültür Blogu */}
      <section id="kultur" className="py-24 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-slate-200">
              <BookOpen className="w-4 h-4" /> {t.blog.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{t.blog.title}</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto font-medium">{t.blog.desc}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Landmark, color: 'bg-[#dc2626]', shadow: 'shadow-red-600/20', dot: 'bg-[#dc2626]', card: t.blog.cards[0] },
              { icon: Coffee, color: 'bg-slate-900', shadow: 'shadow-slate-900/20', dot: 'bg-slate-900', card: t.blog.cards[1] },
              { icon: Mountain, color: 'bg-emerald-600', shadow: 'shadow-emerald-600/20', dot: 'bg-emerald-600', card: t.blog.cards[2] },
              { icon: Utensils, color: 'bg-amber-500', shadow: 'shadow-amber-500/20', dot: 'bg-amber-500', card: t.blog.cards[3] },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg ${item.shadow} group-hover:-translate-y-1 transition-transform`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.card.title}</h3>
                <p className="text-slate-600 mb-6 font-medium">{item.card.desc}</p>
                <ul className="space-y-2">
                  {item.card.items.map((it, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.dot}`}></div> {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2G */}
      <section id="b2g" className="py-24 bg-slate-900 text-white border-t border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Building className="w-4 h-4" /> {t.b2g.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">{t.b2g.title1}<span className="text-[#dc2626]">{t.b2g.title2}</span></h2>
            <p className="text-lg text-slate-300 font-medium">{t.b2g.desc}</p>
          </div>
          <div className="bg-slate-800 rounded-[2.5rem] border border-slate-700 shadow-2xl overflow-hidden p-8">
            <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-4">
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-6 h-6 text-[#dc2626]" />
                <h3 className="text-xl font-bold">{t.b2g.dashTitle}</h3>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div> {t.b2g.dashLive}
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700/50">
                <p className="text-slate-400 text-sm font-bold uppercase mb-2">{t.b2g.stat1Label}</p>
                <div className="text-3xl font-black mb-1">{t.b2g.stat1Val}</div>
                <p className="text-emerald-400 text-sm font-bold">{t.b2g.stat1Sub}</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700/50">
                <p className="text-slate-400 text-sm font-bold uppercase mb-2">{t.b2g.stat2Label}</p>
                <div className="text-3xl font-black mb-1">{t.b2g.stat2Val}</div>
                <p className="text-emerald-400 text-sm font-bold">{t.b2g.stat2Sub}</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700/50">
                <p className="text-slate-400 text-sm font-bold uppercase mb-2">{t.b2g.stat3Label}</p>
                <div className="text-3xl font-black mb-1 text-[#dc2626]">{t.b2g.stat3Val}</div>
                <p className="text-slate-400 text-sm font-bold">{t.b2g.stat3Sub}</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm text-center font-medium max-w-2xl mx-auto mt-4">{t.b2g.bottomText}</p>
          </div>
        </div>
      </section>

      {/* Market Gap */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
            <div className="absolute left-0 top-0 w-1/2 h-full opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500 via-transparent to-transparent"></div>
            <div className="flex-1 relative z-10 text-white">
              <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                <TrendingUp className="w-4 h-4" /> {t.market.badge}
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">{t.market.title}</h2>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">{t.market.desc}</p>
              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                <p className="text-white font-medium text-sm leading-relaxed">
                  <span className="text-[#dc2626] font-black mr-1">✓</span> {t.market.highlight}
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex flex-col gap-4 relative z-10">
              {t.market.points.map((pt, i) => (
                <div key={i} className="bg-slate-800 border border-slate-700 p-4 rounded-2xl flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center shrink-0 text-red-400">
                    <Star className="w-5 h-5" />
                  </div>
                  <span className="text-white font-bold text-sm">{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SWOT & Team */}
      <section id="swot" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">{t.swot.title}</h2>
            <p className="text-slate-600 font-medium">{t.swot.desc}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            {[
              { icon: Target, bg: 'bg-emerald-100', col: 'text-emerald-600', title: t.swot.s.title, items: t.swot.s.items, marker: <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0"/> },
              { icon: AlertTriangle, bg: 'bg-amber-100', col: 'text-amber-600', title: t.swot.w.title, items: t.swot.w.items, marker: <span className="w-5 h-5 flex items-center justify-center font-bold text-amber-500 shrink-0">-</span> },
              { icon: Lightbulb, bg: 'bg-blue-100', col: 'text-blue-600', title: t.swot.o.title, items: t.swot.o.items, marker: <span className="w-5 h-5 flex items-center justify-center font-bold text-blue-500 shrink-0">+</span> },
              { icon: ShieldCheck, bg: 'bg-red-100', col: 'text-[#dc2626]', title: t.swot.t.title, items: t.swot.t.items, marker: <span className="w-5 h-5 flex items-center justify-center font-bold text-[#dc2626] shrink-0">x</span> },
            ].map((block, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-full ${block.bg} flex items-center justify-center ${block.col}`}>
                    <block.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{block.title}</h3>
                </div>
                <ul className="space-y-4">
                  {block.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-700">{block.marker} {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">{t.swot.teamTitle}</h2>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-12 max-w-4xl mx-auto">
            {t.swot.team.map((member, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-md border border-slate-100 text-center flex-1">
                <div className="w-24 h-24 mx-auto bg-slate-200 rounded-full mb-6 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {idx === 0 ? <GraduationCap className="w-10 h-10 text-slate-400" /> : <User className="w-10 h-10 text-slate-400" />}
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-[#dc2626] font-bold text-sm mb-4">{member.role}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESG */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black mb-12">{t.esg.title}</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { color: 'bg-[#dc2626]', card: t.esg.cards[0] },
              { color: 'bg-amber-500', card: t.esg.cards[1] },
              { color: 'bg-blue-500', card: t.esg.cards[2] },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800 p-6 rounded-2xl w-full max-w-sm border border-slate-700 text-left flex items-start gap-4">
                <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center shrink-0 font-black text-xl text-white shadow-lg`}>{item.card.num}</div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{item.card.title}</h4>
                  <p className="text-slate-400 text-sm">{item.card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ AI Practice Section — с Gemini API */}
      <section id="ai-practice" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-1/3 opacity-5 pointer-events-none">
          <Bot className="w-full h-auto text-slate-900" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-100 text-[#dc2626] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-4 h-4" /> {t.ai.badge}
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{t.ai.title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium">{t.ai.desc}</p>
              <div className="flex flex-col gap-3 mb-8">
                {t.aiCities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => handleCityChange(city.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${selectedCityId === city.id ? 'border-[#dc2626] bg-red-50 shadow-md' : 'border-slate-200 hover:border-red-200 bg-white'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black ${selectedCityId === city.id ? 'bg-[#dc2626] text-white' : 'bg-slate-100 text-slate-600'}`}>
                        {city.level}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-slate-900">{city.name}</div>
                        <div className="text-sm text-slate-500 font-medium">{city.role}</div>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 ${selectedCityId === city.id ? 'text-[#dc2626]' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Interface */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[600px]">
              <div className="bg-slate-900 px-8 py-5 border-b border-slate-800 flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                  <Bot className="w-6 h-6 text-[#dc2626]" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{activeCity.role}</h3>
                  <p className="text-xs font-bold text-red-400 uppercase tracking-wider">{activeCity.name} • {t.ai.levelText} {activeCity.level}</p>
                </div>
                {/* Индикатор Gemini */}
                <div className="ml-auto flex items-center gap-1.5 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/20">
                  <Sparkles className="w-3 h-3" /> Gemini
                </div>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-6 bg-slate-50/50">
                {chatHistory.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-6 py-4 text-sm font-medium leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#dc2626] text-white rounded-tr-sm shadow-md'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-6 py-4 shadow-sm flex items-center gap-2">
                      <Loader2 className="w-5 h-5 text-[#dc2626] animate-spin" />
                      <span className="text-sm text-slate-500 font-medium">{t.ai.loading}</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="bg-white p-4 border-t border-slate-200">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={t.ai.inputPlaceholder}
                    disabled={isLoading}
                    className="w-full bg-slate-50 border border-slate-200 rounded-full py-4 pl-6 pr-16 focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] transition-all font-medium text-sm disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || isLoading}
                    className="absolute right-2 w-10 h-10 bg-[#dc2626] text-white rounded-full flex items-center justify-center hover:bg-red-800 transition-colors disabled:bg-slate-300"
                  >
                    <Send className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="iletisim" className="py-24 bg-[#dc2626] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 opacity-10 pointer-events-none">
          <Globe className="w-full h-auto text-black" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">{t.contact.title}</h2>
          <p className="text-xl text-red-100 mb-8 font-medium">{t.contact.desc}</p>
          <div className="inline-flex items-center gap-3 bg-red-800/50 text-white px-6 py-3 rounded-full font-bold text-xl mb-12 border border-red-700/50">
            <Phone className="w-6 h-6" /> {t.contact.phone}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="https://t.me/timaxmetov" target="_blank" rel="noreferrer" className="bg-white text-[#dc2626] px-8 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all shadow-xl shadow-red-900/20 flex items-center justify-center gap-3">
              {t.contact.btnTg} <Send className="w-5 h-5"/>
            </a>
            <a href="https://wa.me/77758880910" target="_blank" rel="noreferrer" className="bg-emerald-500 text-white border border-emerald-400 px-8 py-5 rounded-full font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-3">
              {t.contact.btnWa} <MessageCircle className="w-5 h-5"/>
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-black tracking-tighter text-[#dc2626]">ALTERNA</div>
            <div className="text-sm font-bold tracking-widest text-slate-500 uppercase">{t.footer.rights}</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
