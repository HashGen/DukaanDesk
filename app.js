/* DukaanDesk — Vanilla JavaScript application */
(function () {
  'use strict';

  const STORAGE_KEY = 'dukaandesk.local.v1';
  const modes = ['Cash', 'UPI', 'Other'];
  const units = ['piece', 'packet', 'kg', 'gram', 'litre', 'ml', 'dozen', 'metre', 'box', 'pair', 'set', 'bag', 'other'];
  const icons = {
    store: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10h18l-2-6H5l-2 6Z"/><path d="M5 10v10h14V10M9 20v-6h6v6"/><path d="M3 10c0 3 4 3 4 0 0 3 4 3 4 0 0 3 4 3 4 0 0 3 4 3 4 0"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
    bag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3M9 12l3 3 3-3"/></svg>',
    wallet: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="15" rx="2"/><path d="M3 9V5a2 2 0 0 1 2-2h13M16 13h5M17 13v1"/></svg>',
    users: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="4"/><path d="M2 21v-2a7 7 0 0 1 14 0v2M17 4a4 4 0 0 1 0 8M18 15a6 6 0 0 1 4 6"/></svg>',
    activity: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>',
    trend: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 17 6-6 4 4 8-9M14 6h7v7"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    down: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16M5 13l7 7 7-7"/></svg>',
    edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"/><path d="m16.5 3.5 4 4L9 19l-5 1 1-5Z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v6M14 10v6"/></svg>',
    download: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></svg>',
    help: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.6 9a2.5 2.5 0 1 1 4.8 1c-.8 1.2-2.4 1.5-2.4 3M12 17h.01"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m18 6-12 12M6 6l12 12"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
    file: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.6 9A7 7 0 0 1 18 6l2 6M4 12l2 6a7 7 0 0 0 12.4-3"/></svg>'
  };
  const app = document.getElementById('app');
  let state = loadState();
  let tab = 'dashboard';

  const LANGUAGE_KEY = 'dukaandesk.language.v1';
  const LANGUAGE_DEFAULT = 'hinglish';
  const LANGUAGES = [{"id":"en","name":"English"},{"id":"hinglish","name":"Hinglish"},{"id":"hi","name":"हिन्दी"},{"id":"ur","name":"اردو"},{"id":"bn","name":"বাংলা"},{"id":"mr","name":"मराठी"},{"id":"ta","name":"தமிழ்"},{"id":"es","name":"Español"},{"id":"fr","name":"Français"},{"id":"ar","name":"العربية"},{"id":"pt","name":"Português"},{"id":"id","name":"Bahasa Indonesia"}];
  const I18N = {"en":{"dashboard":"Dashboard","sales":"Sales register","credit":"Customer credit","history":"Daily history","guide":"Help & tutorials","language":"Language","choose":"Choose your language","title":"Learn DukaanDesk step by step","description":"Visual tutorials with diagrams, examples, data safety and source code.","hero":"From first sale to daily report","heroDesc":"Follow the flow diagrams, then complete the numbered steps.","saleTitle":"1. Record a sale","saleDesc":"Enter product, quantity and price. The app calculates the total automatically.","creditTitle":"2. Track customer credit","creditDesc":"Enter the amount received; the rest becomes credit.","repayTitle":"3. Record a repayment","repayDesc":"Choose a customer and record the amount received.","historyTitle":"4. Review and protect records","historyDesc":"Review date-wise totals and download a backup regularly.","openSale":"Open New sale","item":"Enter item + quantity + price","total":"Total bill calculated","received":"Enter amount received","due":"Balance becomes credit","customer":"Choose customer","repayment":"Record repayment","balance":"Outstanding balance updates","date":"Select date","report":"Review daily totals","backup":"Download JSON backup","example":"Example","numbers":"Understanding dashboard numbers","safety":"Keep your data safe","autosave":"Auto-save","source":"Source code","sourceDesc":"Download the HTML/CSS/JS project.","sourceZip":"Download source ZIP","name":"English"},"hinglish":{"dashboard":"Dashboard","sales":"Sales register","credit":"Customer udhaar","history":"Daily history","guide":"Help & tutorials","language":"Language","choose":"App ki language choose karein","title":"DukaanDesk step-by-step seekhein","description":"Diagrams, examples, data safety aur source code ke saath tutorials.","hero":"Pehli sale se daily report tak","heroDesc":"Pehle diagram dekhein, phir numbered steps follow karein.","saleTitle":"1. Sale record karein","saleDesc":"Product, quantity aur price daalein. Total app khud calculate karega.","creditTitle":"2. Customer udhaar track karein","creditDesc":"Mila hua amount daalein; baaki amount udhaar banega.","repayTitle":"3. Payment jama record karein","repayDesc":"Customer choose karein aur received payment record karein.","historyTitle":"4. Record check aur safe rakhein","historyDesc":"Date-wise totals dekhein aur regular backup lein.","openSale":"Nayi bikri kholein","item":"Item + quantity + price daalein","total":"Total bill calculate","received":"Mila hua amount daalein","due":"Baaki udhaar banega","customer":"Customer choose karein","repayment":"Jama payment record karein","balance":"Baaki balance update","date":"Date choose karein","report":"Daily totals check karein","backup":"JSON backup download","example":"Example","numbers":"Dashboard numbers samjhein","safety":"Apna data safe rakhein","autosave":"Auto-save","source":"Source code","sourceDesc":"Plain HTML, CSS aur JavaScript project download karein.","sourceZip":"HTML/CSS/JS source ZIP download","name":"Hinglish"},"hi":{"dashboard":"डैशबोर्ड","sales":"बिक्री रजिस्टर","credit":"ग्राहक उधार","history":"दैनिक इतिहास","guide":"मदद और ट्यूटोरियल","language":"भाषा","choose":"ऐप की भाषा चुनें","title":"DukaanDesk को चरण-दर-चरण सीखें","description":"डायग्राम, उदाहरण, डेटा सुरक्षा और सोर्स कोड के साथ ट्यूटोरियल।","hero":"पहली बिक्री से दैनिक रिपोर्ट तक","heroDesc":"फ्लो डायग्राम देखें और क्रमांकित चरण पूरे करें।","saleTitle":"1. बिक्री दर्ज करें","saleDesc":"सामान, मात्रा और कीमत भरें। कुल बिल अपने-आप निकलेगा।","creditTitle":"2. ग्राहक का उधार देखें","creditDesc":"मिली रकम भरें; बाकी रकम उधार बनेगी।","repayTitle":"3. भुगतान जमा दर्ज करें","repayDesc":"ग्राहक चुनें और मिली रकम दर्ज करें।","historyTitle":"4. रिकॉर्ड सुरक्षित रखें","historyDesc":"तारीख के हिसाब से कुल देखें और नियमित बैकअप लें।","openSale":"नई बिक्री खोलें","item":"सामान + मात्रा + कीमत भरें","total":"कुल बिल तैयार","received":"मिली रकम भरें","due":"बाकी रकम उधार बनेगी","customer":"ग्राहक चुनें","repayment":"जमा भुगतान दर्ज करें","balance":"बाकी रकम अपडेट होगी","date":"तारीख चुनें","report":"दैनिक कुल देखें","backup":"JSON बैकअप डाउनलोड","example":"उदाहरण","numbers":"डैशबोर्ड के आंकड़े समझें","safety":"अपना डेटा सुरक्षित रखें","autosave":"अपने-आप सेव","source":"सोर्स कोड","sourceDesc":"HTML, CSS और JavaScript प्रोजेक्ट डाउनलोड करें।","sourceZip":"HTML/CSS/JS सोर्स ZIP डाउनलोड","name":"हिन्दी"},"ur":{"dashboard":"ڈیش بورڈ","sales":"فروخت رجسٹر","credit":"گاہک کا ادھار","history":"روزانہ کی تاریخ","guide":"مدد اور سبق","language":"زبان","choose":"ایپ کی زبان منتخب کریں","title":"DukaanDesk مرحلہ وار سیکھیں","description":"خاکوں، مثالوں، ڈیٹا کی حفاظت اور سورس کوڈ کے ساتھ رہنمائی۔","hero":"پہلی فروخت سے روزانہ رپورٹ تک","heroDesc":"فلو ڈایاگرام دیکھیں اور مراحل پر عمل کریں۔","saleTitle":"1. فروخت درج کریں","saleDesc":"چیز، مقدار اور قیمت درج کریں۔ کل بل خود حساب ہوگا۔","creditTitle":"2. گاہک کا ادھار دیکھیں","creditDesc":"وصول شدہ رقم درج کریں؛ باقی رقم ادھار بنے گی۔","repayTitle":"3. ادائیگی درج کریں","repayDesc":"گاہک منتخب کریں اور وصول شدہ رقم درج کریں۔","historyTitle":"4. ریکارڈ محفوظ رکھیں","historyDesc":"تاریخ کے لحاظ سے حساب دیکھیں اور بیک اپ لیں۔","openSale":"نئی فروخت کھولیں","item":"چیز + مقدار + قیمت درج کریں","total":"کل بل تیار","received":"وصول شدہ رقم درج کریں","due":"باقی رقم ادھار بنے گی","customer":"گاہک منتخب کریں","repayment":"وصولی درج کریں","balance":"باقی رقم اپ ڈیٹ ہوگی","date":"تاریخ منتخب کریں","report":"روزانہ حساب دیکھیں","backup":"JSON بیک اپ ڈاؤن لوڈ","example":"مثال","numbers":"ڈیش بورڈ کے اعداد","safety":"ڈیٹا محفوظ رکھیں","autosave":"خودکار محفوظ","source":"سورس کوڈ","sourceDesc":"HTML، CSS اور JavaScript ڈاؤن لوڈ کریں۔","sourceZip":"HTML/CSS/JS سورس ZIP ڈاؤن لوڈ","name":"اردو"},"bn":{"dashboard":"ড্যাশবোর্ড","sales":"বিক্রির খাতা","credit":"গ্রাহকের বাকি","history":"দৈনিক ইতিহাস","guide":"সহায়তা ও টিউটোরিয়াল","language":"ভাষা","choose":"অ্যাপের ভাষা বেছে নিন","title":"ধাপে ধাপে DukaanDesk শিখুন","description":"ডায়াগ্রাম, উদাহরণ, ডেটা সুরক্ষা ও সোর্স কোডসহ টিউটোরিয়াল।","hero":"প্রথম বিক্রি থেকে দৈনিক রিপোর্ট","heroDesc":"ফ্লো ডায়াগ্রাম দেখে ধাপগুলি অনুসরণ করুন।","saleTitle":"1. বিক্রি রেকর্ড করুন","saleDesc":"পণ্য, পরিমাণ ও দাম লিখুন। মোট বিল স্বয়ংক্রিয়ভাবে হিসাব হবে।","creditTitle":"2. গ্রাহকের বাকি দেখুন","creditDesc":"প্রাপ্ত টাকা লিখুন; বাকি টাকা ঋণ হবে।","repayTitle":"3. টাকা জমার রেকর্ড","repayDesc":"গ্রাহক বেছে নিয়ে পাওয়া টাকা লিখুন।","historyTitle":"4. রেকর্ড নিরাপদ রাখুন","historyDesc":"তারিখভিত্তিক হিসাব দেখুন এবং ব্যাকআপ রাখুন।","openSale":"নতুন বিক্রি খুলুন","item":"পণ্য + পরিমাণ + দাম লিখুন","total":"মোট বিল হিসাব","received":"প্রাপ্ত টাকা লিখুন","due":"বাকি টাকা ঋণ হবে","customer":"গ্রাহক বেছে নিন","repayment":"জমা টাকা রেকর্ড","balance":"বাকি আপডেট হবে","date":"তারিখ বেছে নিন","report":"দৈনিক মোট দেখুন","backup":"JSON ব্যাকআপ ডাউনলোড","example":"উদাহরণ","numbers":"ড্যাশবোর্ডের সংখ্যা বুঝুন","safety":"ডেটা নিরাপদ রাখুন","autosave":"স্বয়ংক্রিয় সংরক্ষণ","source":"সোর্স কোড","sourceDesc":"HTML, CSS ও JavaScript প্রজেক্ট ডাউনলোড করুন।","sourceZip":"HTML/CSS/JS সোর্স ZIP ডাউনলোড","name":"বাংলা"},"mr":{"dashboard":"डॅशबोर्ड","sales":"विक्री नोंदवही","credit":"ग्राहक उधारी","history":"दैनिक इतिहास","guide":"मदत आणि ट्युटोरियल","language":"भाषा","choose":"अॅपची भाषा निवडा","title":"DukaanDesk टप्प्याटप्प्याने शिका","description":"आकृत्या, उदाहरणे, डेटा सुरक्षा आणि सोर्स कोडसह मार्गदर्शन.","hero":"पहिल्या विक्रीपासून दैनिक अहवालापर्यंत","heroDesc":"फ्लो डायग्राम पाहा आणि टप्पे पूर्ण करा.","saleTitle":"1. विक्री नोंदवा","saleDesc":"वस्तू, प्रमाण आणि किंमत भरा. एकूण बिल आपोआप मोजले जाईल.","creditTitle":"2. ग्राहकाची उधारी पाहा","creditDesc":"मिळालेली रक्कम भरा; बाकी रक्कम उधारी ठरेल.","repayTitle":"3. जमा पेमेंट नोंदवा","repayDesc":"ग्राहक निवडा आणि मिळालेली रक्कम नोंदवा.","historyTitle":"4. नोंदी सुरक्षित ठेवा","historyDesc":"तारखेनुसार हिशोब पाहा आणि बॅकअप घ्या.","openSale":"नवीन विक्री उघडा","item":"वस्तू + प्रमाण + किंमत भरा","total":"एकूण बिल तयार","received":"मिळालेली रक्कम भरा","due":"बाकी उधारी ठरेल","customer":"ग्राहक निवडा","repayment":"जमा पेमेंट नोंदवा","balance":"बाकी रक्कम अद्ययावत","date":"तारीख निवडा","report":"दैनिक एकूण पाहा","backup":"JSON बॅकअप डाउनलोड","example":"उदाहरण","numbers":"डॅशबोर्डचे आकडे समजून घ्या","safety":"डेटा सुरक्षित ठेवा","autosave":"स्वयंचलित जतन","source":"सोर्स कोड","sourceDesc":"HTML, CSS आणि JavaScript प्रोजेक्ट डाउनलोड करा.","sourceZip":"HTML/CSS/JS सोर्स ZIP डाउनलोड","name":"मराठी"},"ta":{"dashboard":"டாஷ்போர்டு","sales":"விற்பனைப் பதிவு","credit":"வாடிக்கையாளர் கடன்","history":"தினசரி வரலாறு","guide":"உதவி மற்றும் பயிற்சி","language":"மொழி","choose":"பயன்பாட்டு மொழியைத் தேர்ந்தெடுக்கவும்","title":"DukaanDesk-ஐ படிப்படியாகக் கற்றுக்கொள்ளுங்கள்","description":"வரைபடங்கள், எடுத்துக்காட்டுகள், தரவு பாதுகாப்பு மற்றும் மூலக் குறியீட்டுடன் பயிற்சிகள்.","hero":"முதல் விற்பனையிலிருந்து தினசரி அறிக்கை வரை","heroDesc":"ஓட்ட வரைபடத்தைப் பார்த்து படிகளைப் பின்பற்றுங்கள்.","saleTitle":"1. விற்பனையைப் பதிவு செய்யவும்","saleDesc":"பொருள், அளவு, விலையை உள்ளிடுங்கள். மொத்தத் தொகை தானாகக் கணக்கிடப்படும்.","creditTitle":"2. வாடிக்கையாளர் கடனைப் பார்க்கவும்","creditDesc":"பெற்ற தொகையை உள்ளிடுங்கள்; மீதி தொகை கடனாகும்.","repayTitle":"3. கட்டணத்தைப் பதிவு செய்யவும்","repayDesc":"வாடிக்கையாளரைத் தேர்ந்தெடுத்து பெற்ற தொகையைப் பதிவு செய்யவும்.","historyTitle":"4. பதிவுகளைப் பாதுகாக்கவும்","historyDesc":"தேதி வாரியான மொத்தத்தைப் பார்த்து காப்புப்பிரதி எடுக்கவும்.","openSale":"புதிய விற்பனையைத் திறக்கவும்","item":"பொருள் + அளவு + விலை உள்ளிடவும்","total":"மொத்தத் தொகை கணக்கிடப்பட்டது","received":"பெற்ற தொகையை உள்ளிடவும்","due":"மீதித் தொகை கடனாகும்","customer":"வாடிக்கையாளரைத் தேர்ந்தெடுக்கவும்","repayment":"கட்டணத்தைப் பதிவு செய்யவும்","balance":"மீதித் தொகை புதுப்பிக்கப்படும்","date":"தேதியைத் தேர்ந்தெடுக்கவும்","report":"தினசரி மொத்தத்தைப் பார்க்கவும்","backup":"JSON காப்புப்பிரதி பதிவிறக்கம்","example":"எடுத்துக்காட்டு","numbers":"டாஷ்போர்டு எண்களைப் புரிந்துகொள்ளுங்கள்","safety":"உங்கள் தரவைப் பாதுகாக்கவும்","autosave":"தானாகச் சேமிக்கப்படும்","source":"மூலக் குறியீடு","sourceDesc":"HTML, CSS மற்றும் JavaScript திட்டத்தைப் பதிவிறக்கவும்.","sourceZip":"HTML/CSS/JS மூல ZIP பதிவிறக்கம்","name":"தமிழ்"},"es":{"dashboard":"Panel","sales":"Registro de ventas","credit":"Crédito de clientes","history":"Historial diario","guide":"Ayuda y tutoriales","language":"Idioma","choose":"Elige el idioma de la aplicación","title":"Aprende DukaanDesk paso a paso","description":"Tutoriales visuales con diagramas, ejemplos, seguridad de datos y código fuente.","hero":"De la primera venta al informe diario","heroDesc":"Sigue los diagramas de flujo y completa los pasos numerados.","saleTitle":"1. Registrar una venta","saleDesc":"Introduce producto, cantidad y precio. El total se calcula automáticamente.","creditTitle":"2. Controlar el crédito del cliente","creditDesc":"Introduce el importe recibido; el saldo restante pasa a crédito.","repayTitle":"3. Registrar un pago","repayDesc":"Elige un cliente y registra el importe recibido.","historyTitle":"4. Revisar y proteger los registros","historyDesc":"Usa el historial por fecha y descarga copias de seguridad regularmente.","openSale":"Abrir nueva venta","item":"Producto + cantidad + precio","total":"Total calculado","received":"Introducir importe recibido","due":"El saldo pasa a crédito","customer":"Elegir cliente","repayment":"Registrar pago","balance":"Saldo actualizado","date":"Elegir fecha","report":"Revisar totales diarios","backup":"Descargar copia JSON","example":"Ejemplo","numbers":"Entender los números del panel","safety":"Protege tus datos","autosave":"Guardado automático","source":"Código fuente","sourceDesc":"Descarga el proyecto HTML, CSS y JavaScript.","sourceZip":"Descargar ZIP HTML/CSS/JS","name":"Español"},"fr":{"dashboard":"Tableau de bord","sales":"Registre des ventes","credit":"Crédit client","history":"Historique quotidien","guide":"Aide et tutoriels","language":"Langue","choose":"Choisissez la langue de l’application","title":"Apprenez DukaanDesk étape par étape","description":"Tutoriels visuels avec schémas, exemples, sécurité des données et code source.","hero":"De la première vente au rapport quotidien","heroDesc":"Suivez les schémas et les étapes numérotées.","saleTitle":"1. Enregistrer une vente","saleDesc":"Saisissez le produit, la quantité et le prix. Le total est calculé automatiquement.","creditTitle":"2. Suivre le crédit client","creditDesc":"Saisissez le montant reçu ; le solde restant devient un crédit.","repayTitle":"3. Enregistrer un paiement","repayDesc":"Choisissez un client et saisissez le montant reçu.","historyTitle":"4. Protéger les données","historyDesc":"Consultez l’historique par date et téléchargez une sauvegarde régulièrement.","openSale":"Ouvrir une nouvelle vente","item":"Produit + quantité + prix","total":"Total calculé","received":"Saisir le montant reçu","due":"Le solde devient un crédit","customer":"Choisir un client","repayment":"Enregistrer le paiement","balance":"Solde mis à jour","date":"Choisir une date","report":"Consulter les totaux quotidiens","backup":"Télécharger la sauvegarde JSON","example":"Exemple","numbers":"Comprendre le tableau de bord","safety":"Protégez vos données","autosave":"Enregistrement automatique","source":"Code source","sourceDesc":"Téléchargez le projet HTML, CSS et JavaScript.","sourceZip":"Télécharger le ZIP HTML/CSS/JS","name":"Français"},"ar":{"dashboard":"لوحة التحكم","sales":"سجل المبيعات","credit":"ديون العملاء","history":"السجل اليومي","guide":"المساعدة والدروس","language":"اللغة","choose":"اختر لغة التطبيق","title":"تعلّم DukaanDesk خطوة بخطوة","description":"دروس مرئية مع مخططات وأمثلة وحماية البيانات والشفرة المصدرية.","hero":"من أول عملية بيع إلى التقرير اليومي","heroDesc":"اتبع مخططات التدفق ثم الخطوات المرقمة.","saleTitle":"1. تسجيل عملية بيع","saleDesc":"أدخل المنتج والكمية والسعر. سيُحسب الإجمالي تلقائيًا.","creditTitle":"2. متابعة ديون العملاء","creditDesc":"أدخل المبلغ المستلم؛ يصبح المتبقي دينًا.","repayTitle":"3. تسجيل السداد","repayDesc":"اختر العميل وسجّل المبلغ المستلم.","historyTitle":"4. حماية السجلات","historyDesc":"استخدم السجل حسب التاريخ ونزّل نسخة احتياطية بانتظام.","openSale":"فتح بيع جديد","item":"المنتج + الكمية + السعر","total":"تم حساب الإجمالي","received":"أدخل المبلغ المستلم","due":"المتبقي يصبح دينًا","customer":"اختر العميل","repayment":"تسجيل السداد","balance":"تحديث الرصيد","date":"اختر التاريخ","report":"مراجعة الإجماليات اليومية","backup":"تنزيل نسخة JSON","example":"مثال","numbers":"فهم أرقام لوحة التحكم","safety":"احمِ بياناتك","autosave":"حفظ تلقائي","source":"الشفرة المصدرية","sourceDesc":"نزّل مشروع HTML وCSS وJavaScript.","sourceZip":"تنزيل ZIP للمصدر","name":"العربية"},"pt":{"dashboard":"Painel","sales":"Registro de vendas","credit":"Crédito de clientes","history":"Histórico diário","guide":"Ajuda e tutoriais","language":"Idioma","choose":"Escolha o idioma do aplicativo","title":"Aprenda o DukaanDesk passo a passo","description":"Tutoriais visuais com diagramas, exemplos, segurança e código-fonte.","hero":"Da primeira venda ao relatório diário","heroDesc":"Siga os diagramas e conclua as etapas numeradas.","saleTitle":"1. Registrar uma venda","saleDesc":"Informe produto, quantidade e preço. O total é calculado automaticamente.","creditTitle":"2. Acompanhar crédito do cliente","creditDesc":"Informe o valor recebido; o saldo restante vira crédito.","repayTitle":"3. Registrar pagamento","repayDesc":"Escolha o cliente e registre o valor recebido.","historyTitle":"4. Proteger registros","historyDesc":"Use o histórico por data e baixe backups regularmente.","openSale":"Abrir nova venda","item":"Produto + quantidade + preço","total":"Total calculado","received":"Informar valor recebido","due":"Saldo vira crédito","customer":"Escolher cliente","repayment":"Registrar pagamento","balance":"Saldo atualizado","date":"Selecionar data","report":"Revisar totais diários","backup":"Baixar backup JSON","example":"Exemplo","numbers":"Entender os números do painel","safety":"Mantenha seus dados seguros","autosave":"Salvamento automático","source":"Código-fonte","sourceDesc":"Baixe o projeto HTML, CSS e JavaScript.","sourceZip":"Baixar ZIP HTML/CSS/JS","name":"Português"},"id":{"dashboard":"Dasbor","sales":"Daftar penjualan","credit":"Kredit pelanggan","history":"Riwayat harian","guide":"Bantuan & tutorial","language":"Bahasa","choose":"Pilih bahasa aplikasi","title":"Pelajari DukaanDesk langkah demi langkah","description":"Tutorial visual dengan diagram, contoh, keamanan data, dan kode sumber.","hero":"Dari penjualan pertama ke laporan harian","heroDesc":"Ikuti diagram alur dan langkah-langkah bernomor.","saleTitle":"1. Catat penjualan","saleDesc":"Masukkan produk, jumlah dan harga. Total dihitung otomatis.","creditTitle":"2. Pantau kredit pelanggan","creditDesc":"Masukkan jumlah yang diterima; sisa tagihan menjadi kredit.","repayTitle":"3. Catat pembayaran","repayDesc":"Pilih pelanggan dan catat jumlah yang diterima.","historyTitle":"4. Lindungi catatan","historyDesc":"Gunakan riwayat berdasarkan tanggal dan unduh cadangan rutin.","openSale":"Buka penjualan baru","item":"Produk + jumlah + harga","total":"Total dihitung","received":"Masukkan jumlah diterima","due":"Sisa menjadi kredit","customer":"Pilih pelanggan","repayment":"Catat pembayaran","balance":"Saldo diperbarui","date":"Pilih tanggal","report":"Periksa total harian","backup":"Unduh cadangan JSON","example":"Contoh","numbers":"Memahami angka dasbor","safety":"Jaga keamanan data","autosave":"Simpan otomatis","source":"Kode sumber","sourceDesc":"Unduh proyek HTML, CSS, dan JavaScript.","sourceZip":"Unduh ZIP sumber HTML/CSS/JS","name":"Bahasa Indonesia"}};
  let currentLanguage = LANGUAGE_DEFAULT;
  try { currentLanguage = localStorage.getItem(LANGUAGE_KEY) || LANGUAGE_DEFAULT; } catch (error) {}
  if (!I18N[currentLanguage]) currentLanguage = LANGUAGE_DEFAULT;
  const tr = key => (I18N[currentLanguage] && I18N[currentLanguage][key]) || I18N.en[key] || key;
  function setLanguage(code) {
    currentLanguage = I18N[code] ? code : LANGUAGE_DEFAULT;
    try { localStorage.setItem(LANGUAGE_KEY, currentLanguage); } catch (error) {}
    document.documentElement.lang = currentLanguage === 'hinglish' ? 'en' : currentLanguage;
    document.documentElement.dir = ['ur','ar'].includes(currentLanguage) ? 'rtl' : 'ltr';
    render();
  }
  function languagePickerHtml(className) {
    return '<div class="' + className + ' native-language-picker" aria-label="' + escapeHtml(tr('choose')) + '"><button type="button" class="language-trigger" data-action="toggle-language" aria-label="' + escapeHtml(tr('choose')) + '" title="' + escapeHtml(tr('choose')) + '">' + '<svg viewBox="0 0 24 24" width="23" height="23" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"></path></svg>' + '</button><div class="language-menu app-select-menu" data-language-menu hidden>' + LANGUAGES.map(option => '<button type="button" class="language-option' + (option.id === currentLanguage ? ' selected' : '') + '" data-action="set-language:' + option.id + '">' + escapeHtml(option.name) + '</button>').join('') + '</div></div>';
  }

  let saleDialog = false;
  let collectionDialog = false;
  let editingSaleId = null;
  let editingCollectionId = null;
  let deleteTarget = null;
  let searchQuery = '';
  let historyDate = todayISO();
  let noticeTimer = 0;
  let saleError = '';
  let collectionError = '';
  let saleDraft = freshSale();
  let collectionDraft = freshCollection();

  function todayISO() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function newId() {
    return window.crypto && typeof window.crypto.randomUUID === 'function' ? window.crypto.randomUUID() : String(Date.now()) + '-' + Math.random().toString(36).slice(2, 9);
  }
  function round(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
  function money(value) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2, minimumFractionDigits: 0 }).format(Number.isFinite(Number(value)) ? Number(value) : 0);
  }
  function shortDate(value) {
    if (!value) return '—';
    return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(new Date(value + 'T00:00:00'));
  }
  function longDate(value) {
    if (!value) return '—';
    return new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value + 'T00:00:00'));
  }
  function normalized(value) {
    return String(value || '').trim().toLocaleLowerCase();
  }
  function loadState() {
    const fallback = { sales: [], collections: [], shopName: 'Meri Dukaan' };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return fallback;
      const data = JSON.parse(raw);
      const sales = Array.isArray(data.sales) ? data.sales.map((row, index) => ({
        id: String(row && row.id != null ? row.id : 'legacy-sale-' + index),
        createdAt: String(row && row.createdAt || row && row.date || new Date().toISOString()),
        date: /^\d{4}-\d{2}-\d{2}$/.test(String(row && row.date || '')) ? row.date : todayISO(),
        item: String(row && (row.item ?? row.name ?? row.product) || 'Unnamed item'),
        qty: Math.max(0, Number(row && (row.qty ?? row.quantity) || 0)),
        unit: String(row && row.unit || 'piece'),
        price: Math.max(0, Number(row && (row.price ?? row.rate) || 0)),
        paid: Math.max(0, Number(row && (row.paid ?? row.received) || 0)),
        total: Math.max(0, Number(row && row.total != null ? row.total : Number(row && (row.qty ?? row.quantity) || 0) * Number(row && (row.price ?? row.rate) || 0))),
        customer: String(row && (row.customer ?? row.customerName) || ''),
        paymentMode: String(row && (row.paymentMode ?? row.mode) || 'Cash'),
        note: String(row && row.note || '')
      })) : [];
      const collections = Array.isArray(data.collections) ? data.collections.map((row, index) => ({
        id: String(row && row.id != null ? row.id : 'legacy-collection-' + index),
        createdAt: String(row && row.createdAt || row && row.date || new Date().toISOString()),
        date: /^\d{4}-\d{2}-\d{2}$/.test(String(row && row.date || '')) ? row.date : todayISO(),
        customer: String(row && (row.customer ?? row.customerName) || ''),
        amount: Math.max(0, Number(row && row.amount || 0)),
        mode: String(row && (row.mode ?? row.paymentMode) || 'Cash'),
        note: String(row && row.note || '')
      })) : [];
      return {
        sales,
        collections,
        shopName: typeof data.shopName === 'string' && data.shopName.trim() ? data.shopName : fallback.shopName
      };
    } catch (error) {
      console.warn('DukaanDesk could not read localStorage:', error);
      return fallback;
    }
  }
  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('DukaanDesk localStorage save failed:', error);
      showToast('Device storage full hai. Data backup download kar lein.');
    }
  }
  function dueFor(sale) {
    return round(Math.max(0, sale.total - sale.paid));
  }
  function totalsForDate(date) {
    const daySales = state.sales.filter(item => item.date === date);
    const dayCollections = state.collections.filter(item => item.date === date);
    const salesTotal = round(daySales.reduce((sum, item) => sum + item.total, 0));
    const received = round(daySales.reduce((sum, item) => sum + item.paid, 0));
    const newCredit = round(daySales.reduce((sum, item) => sum + dueFor(item), 0));
    const recovered = round(dayCollections.reduce((sum, item) => sum + item.amount, 0));
    return { daySales, dayCollections, salesTotal, received, newCredit, recovered, collected: round(received + recovered), count: daySales.length };
  }
  function currentDueForCustomer(name) {
    const key = normalized(name);
    const owed = state.sales.filter(item => normalized(item.customer) === key).reduce((sum, item) => sum + dueFor(item), 0);
    const returned = state.collections.filter(item => normalized(item.customer) === key).reduce((sum, item) => sum + item.amount, 0);
    return round(Math.max(0, owed - returned));
  }
  function customerBalances() {
    const map = new Map();
    state.sales.forEach(sale => {
      const due = dueFor(sale);
      if (!sale.customer.trim() || due <= 0) return;
      const key = normalized(sale.customer);
      const row = map.get(key) || { key, name: sale.customer.trim(), due: 0 };
      row.due += due;
      map.set(key, row);
    });
    state.collections.forEach(entry => {
      const key = normalized(entry.customer);
      const row = map.get(key) || { key, name: entry.customer.trim(), due: 0 };
      row.due -= entry.amount;
      map.set(key, row);
    });
    return Array.from(map.values()).map(row => ({ ...row, due: round(Math.max(0, row.due)) })).filter(row => row.due > 0).sort((a, b) => b.due - a.due);
  }
  function allCustomerNames() {
    const names = new Map();
    state.sales.forEach(row => { if (row.customer.trim()) names.set(normalized(row.customer), row.customer.trim()); });
    state.collections.forEach(row => { if (row.customer.trim()) names.set(normalized(row.customer), row.customer.trim()); });
    return Array.from(names.values()).sort((a, b) => a.localeCompare(b));
  }
  function freshSale() {
    return { date: todayISO(), item: '', qty: '1', unit: 'piece', price: '', paid: '', customer: '', paymentMode: 'Cash', note: '' };
  }
  function freshCollection(customer) {
    return { date: todayISO(), customer: customer || '', amount: '', mode: 'Cash', note: '' };
  }
  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  }
  function svg(name, size) {
    return '<span class="icon icon-' + escapeHtml(name) + '" style="--icon-size:' + (size || 18) + 'px">' + (icons[name] || icons.activity) + '</span>';
  }
  function buttonIcon(name, label, action, extraClass) {
    return '<button type="button" class="row-action ' + (extraClass || '') + '" data-action="' + action + '" aria-label="' + escapeHtml(label) + '" title="' + escapeHtml(label) + '">' + svg(name, 15) + '</button>';
  }
  function saleRow(sale) {
    const due = dueFor(sale);
    const modeClass = due > 0 ? 'mode-credit' : sale.paymentMode === 'UPI' ? 'mode-upi' : 'mode-cash';
    return '<article class="sale-row">' +
      '<div class="sale-item-cell"><div class="item-symbol">' + svg('bag', 17) + '</div><div class="sale-item-copy"><strong>' + escapeHtml(sale.item) + '</strong><span>' + escapeHtml(sale.qty) + ' ' + escapeHtml(sale.unit) + (sale.customer ? ' · ' + escapeHtml(sale.customer) : '') + '</span></div></div>' +
      '<div class="sale-date-cell"><span class="mobile-label">Date</span>' + shortDate(sale.date) + '</div>' +
      '<div class="sale-amount-cell"><span class="mobile-label">Total bill</span><strong>' + money(sale.total) + '</strong>' + (due > 0 ? '<small class="due-text">Due ' + money(due) + '</small>' : '<small class="paid-text">' + svg('check', 12) + ' Paid</small>') + '</div>' +
      '<div class="sale-mode-cell"><span class="mobile-label">Payment</span><span class="mode-pill ' + modeClass + '">' + (due > 0 ? 'Udhaar' : escapeHtml(sale.paymentMode)) + '</span></div>' +
      '<div class="sale-actions">' + buttonIcon('edit', 'Edit ' + sale.item, 'edit-sale:' + sale.id) + buttonIcon('trash', 'Delete ' + sale.item, 'delete-sale:' + sale.id, 'danger-action') + '</div>' +
    '</article>';
  }
  function collectionRow(entry) {
    return '<div class="collection-row"><div class="collection-icon">' + svg('down', 17) + '</div><div class="collection-person"><strong>' + escapeHtml(entry.customer) + '</strong><span>' + shortDate(entry.date) + (entry.note ? ' · ' + escapeHtml(entry.note) : '') + '</span></div><div class="collection-amount"><strong>+' + money(entry.amount) + '</strong><span>' + escapeHtml(entry.mode) + '</span></div><div class="collection-actions">' + buttonIcon('edit', 'Edit collection for ' + entry.customer, 'edit-collection:' + entry.id) + buttonIcon('trash', 'Delete collection for ' + entry.customer, 'delete-collection:' + entry.id, 'danger-action') + '</div></div>';
  }
  function saleList(items, emptyTitle, emptyText) {
    if (!items.length) return '<div class="empty-state"><div class="empty-icon">' + svg('file', 22) + '</div><strong>' + escapeHtml(emptyTitle || 'Abhi koi entry nahi hai') + '</strong><p>' + escapeHtml(emptyText || 'Nayi bikri add karte hi aapka hisaab yahan dikhne lagega.') + '</p></div>';
    return '<div class="sale-list">' + items.map(saleRow).join('') + '</div>';
  }
  function collectionList(items) {
    if (!items.length) return '<div class="empty-state compact-empty"><div class="empty-icon">' + svg('down', 21) + '</div><strong>Koi jama entry nahi</strong><p>Jab customer udhaar chukaye, uski entry yahan karein.</p></div>';
    return '<div class="collection-list">' + items.map(collectionRow).join('') + '</div>';
  }
  function metricCard(label, value, subtitle, icon, tone, footHtml) {
    return '<div class="metric-card ' + (tone || '') + '"><div class="metric-top"><span class="metric-icon ' + (tone === 'metric-sales' ? '' : tone || '') + '">' + svg(icon, 18) + '</span><span class="metric-overline">' + label + '</span></div><div class="metric-value">' + money(value) + '</div><div class="metric-foot"><span class="metric-caption">' + subtitle + '</span>' + (footHtml || '') + '</div>' + (tone === 'metric-sales' ? '<div class="metric-stripe"></div>' : '') + '</div>';
  }
  function dashboardHtml() {
    const today = todayISO();
    const stats = totalsForDate(today);
    const customers = customerBalances();
    const weekData = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setHours(12, 0, 0, 0);
      date.setDate(date.getDate() - (6 - index));
      const iso = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
      return { iso, label: new Intl.DateTimeFormat('en-IN', { weekday: 'short' }).format(date), amount: round(state.sales.filter(sale => sale.date === iso).reduce((sum, sale) => sum + sale.total, 0)) };
    });
    const weekMax = Math.max(1, ...weekData.map(day => day.amount));
    const recent = [...state.sales].sort((a, b) => (b.date + b.createdAt).localeCompare(a.date + a.createdAt)).slice(0, 6);
    return '<section class="page-enter">' +
      '<div class="welcome-row"><div><div class="eyebrow"><span class="eyebrow-line"></span> DAILY SNAPSHOT</div><h2>Dukaan ka hisaab,<br class="desktop-break"> bilkul clear.</h2><p>' + longDate(today) + ' <span class="dot-separator">·</span> Aaj ka business summary</p></div><div class="welcome-mark"><div class="welcome-mark-inner">' + svg('store', 32) + '</div><span class="welcome-spark spark-one"></span><span class="welcome-spark spark-two"></span><span class="welcome-spark spark-three"></span></div></div>' +
      '<div class="metrics-grid">' +
      metricCard('TOTAL SALES', stats.salesTotal, 'Aaj ki total bikri', 'bag', 'metric-sales', '<span class="metric-mini-count">' + stats.count + ' bills</span>') +
      metricCard('TOTAL COLLECTION', stats.collected, 'Sale payment + udhaar recovery', 'wallet', '', '<span class="mini-good">' + svg('down', 13) + ' ' + money(stats.recovered) + ' recovered</span>') +
      metricCard('NEW UDHAAR', stats.newCredit, 'Aaj customers ko diya', 'users', 'icon-amber', '<button class="text-link" data-action="tab:udhaar">Khata dekhein ↗</button>') +
      metricCard('TOTAL BAAKI', customers.reduce((sum, row) => sum + row.due, 0), customers.length + ' customers ka udhaar', 'activity', 'icon-purple', '<button class="text-link" data-action="tab:udhaar">Manage ↗</button>') +
      '</div>' +
      '<div class="dashboard-columns"><section class="panel trend-panel"><div class="panel-heading"><div><h3>Bikri ka trend</h3><p>Pichhle 7 din ki total sales</p></div><span class="panel-heading-icon">' + svg('trend', 17) + '</span></div><div class="trend-total"><strong>' + money(weekData.reduce((sum, day) => sum + day.amount, 0)) + '</strong><span>7 din ka total</span></div><div class="bar-chart" role="img" aria-label="Last seven days sales bar chart">' +
      weekData.map(day => '<div class="bar-column" title="' + day.iso + ': ' + money(day.amount) + '"><span class="bar-value">' + (day.amount > 0 ? money(day.amount) : '') + '</span><div class="bar-track"><div class="bar-fill ' + (day.iso === today ? 'bar-today' : '') + '" style="height:' + Math.max(day.amount > 0 ? 8 : 3, (day.amount / weekMax) * 100) + '%"></div></div><span class="bar-label ' + (day.iso === today ? 'bar-label-today' : '') + '">' + day.label + '</span></div>').join('') +
      '</div><div class="chart-foot"><span><span class="legend-dot"></span> Daily sales</span><span><span class="legend-dot legend-today"></span> Today</span></div></section>' +
      '<section class="panel quick-panel"><div class="panel-heading"><div><h3>Quick actions</h3><p>Roz ke kaam, ek tap mein</p></div><span class="panel-heading-icon">' + svg('activity', 17) + '</span></div>' +
      '<button type="button" class="quick-action" data-action="new-sale"><span class="quick-icon quick-icon-green">' + svg('plus', 18) + '</span><span class="quick-copy"><strong>Nayi bikri add karein</strong><small>Item, quantity aur payment save karein</small></span>' + svg('trend', 17) + '</button>' +
      '<button type="button" class="quick-action" data-action="new-collection"><span class="quick-icon quick-icon-orange">' + svg('down', 18) + '</span><span class="quick-copy"><strong>Udhaar jama karein</strong><small>Customer se mila paisa record karein</small></span>' + svg('trend', 17) + '</button>' +
      '<button class="quick-action" data-action="tab:history"><span class="quick-icon quick-icon-blue">' + svg('file', 18) + '</span><span class="quick-copy"><strong>Purana hisaab dekhein</strong><small>Kisi bhi din ki entry kholein</small></span>' + svg('trend', 17) + '</button>' +
      '<div class="quick-foot">' + svg('shield', 14) + '<span>Har change aapke device mein auto-save hota hai.</span></div></section></div>' +
      '<section class="panel recent-panel"><div class="panel-heading panel-heading-row"><div><h3>Recent entries</h3><p>Aapki latest saved bikri</p></div><button class="text-link" data-action="tab:transactions">Saari entries ↗</button></div>' +
      saleList(recent, 'Abhi tak pehli bikri nahi hui', 'Apni pehli sale add karein — record yahin se shuru hoga.') +
      '</section><div class="data-footnote">' + svg('shield', 15) + '<span>Private by design — koi account nahi, koi server upload nahi. Aapka hisaab isi browser ke local storage mein rehta hai.</span></div></section>';
  }
  function transactionsHtml() {
    const list = [...state.sales].sort((a, b) => (b.date + b.createdAt).localeCompare(a.date + a.createdAt)).filter(sale => {
      const q = normalized(searchQuery);
      return !q || normalized(sale.item).includes(q) || normalized(sale.customer).includes(q) || sale.date.includes(q);
    });
    return '<section class="page-enter"><div class="section-intro"><div><div class="eyebrow"><span class="eyebrow-line"></span> SALES REGISTER</div><h2>Har entry par poora control.</h2><p>Galti se amount likh diya? Entry ko kabhi bhi edit ya delete karein.</p></div><button type="button" class="primary-button" data-action="new-sale">' + svg('plus', 17) + ' Nayi bikri</button></div>' +
      '<div class="list-toolbar"><div class="search-field">' + svg('search', 17) + '<input type="search" data-field="search" placeholder="Item, customer ya date search karein..." aria-label="Search sales" value="' + escapeHtml(searchQuery) + '">' + (searchQuery ? '<button data-action="clear-search" aria-label="Clear search">' + svg('close', 15) + '</button>' : '') + '</div><div class="result-count">' + list.length + ' entries</div></div>' +
      '<section class="panel register-panel"><div class="panel-heading panel-heading-row"><div><h3>Sales register</h3><p>Latest entries pehle dikhengi</p></div><span class="register-total">' + state.sales.length + ' total</span></div>' +
      saleList(list, searchQuery ? 'Koi matching entry nahi mili' : 'Sales register khaali hai', searchQuery ? 'Doosra item, customer ya date try karein.' : 'Nayi bikri add karke register shuru karein.') +
      '</section></section>';
  }
  function udhaarHtml() {
    const customers = customerBalances();
    const totalDue = round(customers.reduce((sum, row) => sum + row.due, 0));
    const collectionHistory = [...state.collections].sort((a, b) => (b.date + b.createdAt).localeCompare(a.date + a.createdAt)).slice(0, 8);
    return '<section class="page-enter"><div class="section-intro"><div><div class="eyebrow"><span class="eyebrow-line"></span> CUSTOMER KHATA</div><h2>Udhaar ka hisaab clear rakhein.</h2><p>Customer-wise baaki dekhein aur payment milte hi jama karein.</p></div><button type="button" class="primary-button" data-action="new-collection">' + svg('plus', 17) + ' Udhaar jama</button></div>' +
      '<div class="credit-summary-grid"><div class="credit-summary-card"><span class="credit-summary-icon credit-green">' + svg('wallet', 18) + '</span><small>TOTAL OUTSTANDING</small><strong>' + money(totalDue) + '</strong><span>Customers se lena baaki</span></div><div class="credit-summary-card"><span class="credit-summary-icon credit-orange">' + svg('users', 18) + '</span><small>CUSTOMERS</small><strong>' + customers.length + '</strong><span>Jinke paise baaki hain</span></div><div class="credit-summary-card"><span class="credit-summary-icon credit-blue">' + svg('down', 18) + '</span><small>ALL-TIME RECOVERY</small><strong>' + money(state.collections.reduce((sum, row) => sum + row.amount, 0)) + '</strong><span>Jama hua udhaar</span></div></div>' +
      '<section class="panel credit-panel"><div class="panel-heading panel-heading-row"><div><h3>Customer balances</h3><p>Sabse zyada baaki pehle</p></div><span class="register-total">' + customers.length + ' customers</span></div>' +
      (customers.length ? '<div class="customer-grid">' + customers.map(row => '<article class="customer-card"><div class="customer-card-top"><span class="customer-avatar">' + escapeHtml(row.name.charAt(0).toUpperCase()) + '</span><span class="customer-status">BAAKI</span></div><strong class="customer-name">' + escapeHtml(row.name) + '</strong><div class="customer-balance-label">Total baaki</div><div class="customer-balance">' + money(row.due) + '</div><button class="primary-button collect-button" data-action="collect-for:' + escapeHtml(row.name) + '">' + svg('down', 14) + ' Jama karein</button></article>').join('') + '</div>' : '<div class="empty-state"><div class="empty-icon">' + svg('users', 22) + '</div><strong>Koi udhaar baaki nahi</strong><p>Jis sale mein payment baaki hogi, customer yahan dikhai dega.</p></div>') +
      '</section><section class="panel recovery-panel"><div class="panel-heading panel-heading-row"><div><h3>Recent recoveries</h3><p>Customer se jama hua paisa</p></div><button class="text-link" data-action="new-collection">+ Nayi entry</button></div>' + collectionList(collectionHistory) + '</section></section>';
  }
  function historyHtml() {
    const stats = totalsForDate(historyDate);
    const all = [...stats.daySales].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return '<section class="page-enter"><div class="section-intro history-intro"><div><div class="eyebrow"><span class="eyebrow-line"></span> DAILY HISTORY</div><h2>Har din ka poora record.</h2><p>Date select karke purana hisaab aur recovery dekhein.</p></div><label class="history-date-picker">' + svg('calendar', 17) + '<input type="date" data-field="history-date" value="' + escapeHtml(historyDate) + '" aria-label="History date"><button type="button" class="today-button" data-action="history-today">Aaj</button></label></div>' +
      '<div class="history-date-banner"><span class="history-date-icon">' + svg('calendar', 18) + '</span><div><small>SELECTED DAY</small><strong>' + longDate(historyDate) + '</strong></div><span class="history-count">' + stats.count + ' bills</span></div>' +
      '<div class="metrics-grid history-metrics">' + metricCard('TOTAL SALES', stats.salesTotal, 'Is din ki bikri', 'bag', 'metric-sales') + metricCard('PAYMENT RECEIVED', stats.received, 'Sale ke saath mila', 'wallet', '') + metricCard('NEW UDHAAR', stats.newCredit, 'Is din ka naya baaki', 'users', 'icon-amber') + metricCard('UDHAAR RECOVERED', stats.recovered, 'Purana paisa jama', 'down', '') + '</div>' +
      '<section class="panel history-list-panel"><div class="panel-heading panel-heading-row"><div><h3>Is din ki sales</h3><p>' + longDate(historyDate) + '</p></div><span class="register-total">' + all.length + ' entries</span></div>' + saleList(all, 'Is date par koi sale nahi', 'Doosri date select karke us din ka hisaab dekhein.') + '</section>' +
      '<section class="panel recovery-panel"><div class="panel-heading"><div><h3>Is din ki recoveries</h3><p>Udhaar jama entries</p></div></div>' + collectionList(stats.dayCollections) + '</section></section>';
  }
  function flowDiagram(kind, steps) {
    return '<div class="flow-diagram flow-' + kind + '" role="img" aria-label="' + escapeHtml(steps.join(' then ')) + '">' +
      steps.map((step,index) => '<div class="flow-node"><span class="flow-node-number">' + (index+1) + '</span><strong>' + escapeHtml(step) + '</strong></div>' +
        (index < steps.length-1 ? '<span class="flow-arrow" aria-hidden="true">→</span>' : '')).join('') + '</div>';
  }
  function tutorialSection(number, title, description, diagram, steps, example, tone) {
    return '<article class="tutorial-panel panel"><div class="tutorial-panel-heading"><span class="tutorial-badge ' + tone + '">' + number + '</span><div><h3>' + title + '</h3><p>' + description + '</p></div></div>' + diagram +
      '<ol class="tutorial-step-list">' + steps.map((step,index) => '<li><span class="step-num">' + (index+1) + '</span><span>' + step + '</span></li>').join('') + '</ol>' +
      '<div class="tutorial-example"><strong>' + tr('example') + '</strong><span>' + example + '</span></div></article>';
  }
  function guideText(key) {
    const text = {
      en:{helpCentre:'HELP CENTRE',saleDueHint:'Add a customer name to track the balance.',sameCustomer:'Use the same customer name on each sale.',openCredit:'Open Customer credit and review the balance.',paymentSave:'Enter the amount and payment mode, then save.',compareTotals:'Compare sales, payments received, credit and repayments.',saleExample:'2 items × ₹350 = ₹700. ₹300 received → ₹400 remaining.',creditExample:'Bill ₹1,000 − ₹300 received = ₹700 credit. ₹200 repaid → ₹500 remaining.',historyExample:'The backup contains your records; the source ZIP contains the app code.',totalsIntro:'What each total means',salesMeaning:'Full value of bills for the selected day, including unpaid amounts.',collectionMeaning:'Money received with sales plus old credit collected that day.',balanceMeaning:'The current amount still owed by customers.',safetyIntro:'Protect your shop records.',autosaveDesc:'Every sale and collection is saved on this device.',backupDesc:'Download a backup regularly so you can restore your records.',privacyNote:'Records stay in this browser on this device; clearing browser data can erase them.'},
      hinglish:{helpCentre:'HELP CENTRE',saleDueHint:'Balance track karne ke liye customer ka naam daalein.',sameCustomer:'Har sale mein customer ka same naam use karein.',openCredit:'Customer credit kholkar baaki amount dekhein.',paymentSave:'Amount aur payment mode daal kar save karein.',compareTotals:'Sales, mili payment, udhaar aur jama amount compare karein.',saleExample:'2 items × ₹350 = ₹700. ₹300 mile → ₹400 baaki.',creditExample:'Bill ₹1,000 − ₹300 mile = ₹700 udhaar. ₹200 jama → ₹500 baaki.',historyExample:'Backup mein aapka hisaab hai; source ZIP mein app ka code hai.',totalsIntro:'Har total ka matlab',salesMeaning:'Selected din ke bills ki poori value, chahe payment baaki ho.',collectionMeaning:'Sale par mila paisa plus us din purane udhaar ki recovery.',balanceMeaning:'Customers se abhi total kitna lena baaki hai.',safetyIntro:'Dukaan ka record safe rakhein.',autosaveDesc:'Har sale aur jama isi device par save hoti hai.',backupDesc:'Record restore karne ke liye regular backup download karein.',privacyNote:'Record isi device ke browser mein rehta hai; browser data clear karne se mit sakta hai.'},
      hi:{helpCentre:'मदद केंद्र',saleDueHint:'बाकी रकम देखने के लिए ग्राहक का नाम भरें।',sameCustomer:'हर बिक्री में ग्राहक का एक ही नाम रखें।',openCredit:'ग्राहक उधार खोलकर बाकी रकम देखें।',paymentSave:'रकम और भुगतान का तरीका भरकर सेव करें।',compareTotals:'बिक्री, मिली रकम, उधार और वसूली की तुलना करें।',saleExample:'2 सामान × ₹350 = ₹700। ₹300 मिले → ₹400 बाकी।',creditExample:'बिल ₹1,000 − ₹300 मिले = ₹700 उधार। ₹200 जमा → ₹500 बाकी।',historyExample:'बैकअप में आपका हिसाब है; सोर्स ZIP में ऐप का कोड है।',totalsIntro:'हर कुल का मतलब',salesMeaning:'चुने दिन के बिलों की पूरी कीमत, चाहे भुगतान बाकी हो।',collectionMeaning:'बिक्री पर मिली रकम और उस दिन पुराना उधार जमा रकम।',balanceMeaning:'ग्राहकों से अभी कुल कितनी रकम लेनी बाकी है।',safetyIntro:'दुकान का हिसाब सुरक्षित रखें।',autosaveDesc:'हर बिक्री और जमा इसी डिवाइस पर सेव होती है।',backupDesc:'रिकॉर्ड वापस पाने के लिए नियमित बैकअप डाउनलोड करें।',privacyNote:'रिकॉर्ड इसी डिवाइस के ब्राउज़र में रहता है; ब्राउज़र डेटा मिटाने से रिकॉर्ड मिट सकते हैं।'},
      ur:{helpCentre:'مدد کا مرکز',saleDueHint:'بقایا دیکھنے کے لیے گاہک کا نام درج کریں۔',sameCustomer:'ہر فروخت میں گاہک کا ایک ہی نام استعمال کریں۔',openCredit:'گاہک کا ادھار کھول کر بقایا دیکھیں۔',paymentSave:'رقم اور ادائیگی کا طریقہ درج کرکے محفوظ کریں۔',compareTotals:'فروخت، وصول شدہ رقم، ادھار اور واپسی کا موازنہ کریں۔',saleExample:'2 اشیا × ₹350 = ₹700۔ ₹300 وصول → ₹400 باقی۔',creditExample:'بل ₹1,000 − ₹300 وصول = ₹700 ادھار۔ ₹200 ادا → ₹500 باقی۔',historyExample:'بیک اپ میں آپ کا حساب ہے؛ سورس ZIP میں ایپ کا کوڈ ہے۔',totalsIntro:'ہر مجموعے کا مطلب',salesMeaning:'منتخب دن کے بلوں کی پوری قیمت، چاہے ادائیگی باقی ہو۔',collectionMeaning:'فروخت پر وصول رقم اور اس دن پرانے ادھار کی وصولی۔',balanceMeaning:'گاہکوں سے اب تک کل کتنی رقم لینی باقی ہے۔',safetyIntro:'دکان کا حساب محفوظ رکھیں۔',autosaveDesc:'ہر فروخت اور وصولی اسی ڈیوائس میں محفوظ ہوتی ہے۔',backupDesc:'ریکارڈ واپس حاصل کرنے کے لیے باقاعدگی سے بیک اپ لیں۔',privacyNote:'ریکارڈ اسی براؤزر اور ڈیوائس میں رہتا ہے؛ براؤزر ڈیٹا مٹانے سے ختم ہو سکتا ہے.'},
      bn:{helpCentre:'সহায়তা কেন্দ্র',saleDueHint:'বাকি দেখার জন্য গ্রাহকের নাম লিখুন।',sameCustomer:'প্রতিটি বিক্রিতে একই গ্রাহকের নাম ব্যবহার করুন।',openCredit:'গ্রাহকের বাকি খুলে বর্তমান হিসাব দেখুন।',paymentSave:'টাকার পরিমাণ ও পেমেন্টের ধরন লিখে সেভ করুন।',compareTotals:'বিক্রি, পাওয়া টাকা, বাকি ও আদায় তুলনা করুন।',saleExample:'2টি পণ্য × ₹350 = ₹700। ₹300 পেয়েছেন → ₹400 বাকি।',creditExample:'বিল ₹1,000 − ₹300 পাওয়া = ₹700 বাকি। ₹200 আদায় → ₹500 বাকি।',historyExample:'ব্যাকআপে হিসাব থাকে; সোর্স ZIP-এ অ্যাপের কোড থাকে।',totalsIntro:'প্রতিটি মোটের অর্থ',salesMeaning:'নির্বাচিত দিনের সব বিলের মোট মূল্য, বাকি থাকলেও।',collectionMeaning:'বিক্রির সময় পাওয়া টাকা ও ওই দিনে পুরনো বাকি আদায়।',balanceMeaning:'গ্রাহকদের কাছ থেকে এখনও মোট কত টাকা পাওনা।',safetyIntro:'দোকানের হিসাব নিরাপদ রাখুন।',autosaveDesc:'প্রতিটি বিক্রি ও আদায় এই ডিভাইসে সেভ হয়।',backupDesc:'রেকর্ড ফেরত পেতে নিয়মিত ব্যাকআপ ডাউনলোড করুন।',privacyNote:'রেকর্ড এই ব্রাউজারেই থাকে; ব্রাউজারের ডেটা মুছলে হারাতে পারে।'},
      mr:{helpCentre:'मदत केंद्र',saleDueHint:'बाकी रक्कम पाहण्यासाठी ग्राहकाचे नाव भरा.',sameCustomer:'प्रत्येक विक्रीत ग्राहकाचे तेच नाव वापरा.',openCredit:'ग्राहक उधारी उघडून शिल्लक पाहा.',paymentSave:'रक्कम आणि पेमेंटचा प्रकार भरून सेव्ह करा.',compareTotals:'विक्री, मिळालेले पैसे, उधारी आणि वसुलीची तुलना करा.',saleExample:'2 वस्तू × ₹350 = ₹700. ₹300 मिळाले → ₹400 बाकी.',creditExample:'बिल ₹1,000 − ₹300 मिळाले = ₹700 उधारी. ₹200 जमा → ₹500 बाकी.',historyExample:'बॅकअपमध्ये तुमचा हिशोब असतो; सोर्स ZIP मध्ये अॅपचा कोड असतो.',totalsIntro:'प्रत्येक एकूण रकमेचा अर्थ',salesMeaning:'निवडलेल्या दिवसाच्या बिलांची पूर्ण किंमत, पैसे बाकी असले तरी.',collectionMeaning:'विक्रीवेळी मिळालेले पैसे आणि त्या दिवशी वसूल झालेली जुनी उधारी.',balanceMeaning:'ग्राहकांकडून अजून एकूण किती पैसे येणे बाकी आहेत.',safetyIntro:'दुकानाचा हिशोब सुरक्षित ठेवा.',autosaveDesc:'प्रत्येक विक्री आणि जमा याच डिव्हाइसवर सेव्ह होते.',backupDesc:'नोंदी परत मिळवण्यासाठी नियमित बॅकअप डाउनलोड करा.',privacyNote:'नोंदी याच ब्राउझरमध्ये राहतात; ब्राउझर डेटा पुसल्यास त्या जाऊ शकतात.'},
      ta:{helpCentre:'உதவி மையம்',saleDueHint:'நிலுவையைத் தெரிந்துகொள்ள வாடிக்கையாளர் பெயரை உள்ளிடுங்கள்.',sameCustomer:'ஒவ்வொரு விற்பனையிலும் அதே வாடிக்கையாளர் பெயரைப் பயன்படுத்துங்கள்.',openCredit:'வாடிக்கையாளர் கடனைத் திறந்து நிலுவையைப் பாருங்கள்.',paymentSave:'தொகை மற்றும் கட்டண முறையை உள்ளிட்டு சேமிக்கவும்.',compareTotals:'விற்பனை, பெற்ற பணம், கடன் மற்றும் வசூலை ஒப்பிடுங்கள்.',saleExample:'2 பொருட்கள் × ₹350 = ₹700. ₹300 பெற்றீர்கள் → ₹400 மீதி.',creditExample:'பில் ₹1,000 − ₹300 பெற்றது = ₹700 கடன். ₹200 வசூல் → ₹500 மீதி.',historyExample:'காப்புப்பிரதியில் உங்கள் கணக்கு இருக்கும்; மூல ZIP-இல் செயலியின் குறியீடு இருக்கும்.',totalsIntro:'ஒவ்வொரு மொத்தத்தின் பொருள்',salesMeaning:'தேர்ந்தெடுத்த நாளின் அனைத்து பில்களின் மதிப்பு; செலுத்தாத தொகையும் இதில் அடங்கும்.',collectionMeaning:'விற்பனையில் பெற்ற பணமும் அன்று வசூலித்த பழைய கடனும்.',balanceMeaning:'வாடிக்கையாளர்களிடமிருந்து இன்னும் பெற வேண்டிய மொத்தத் தொகை.',safetyIntro:'கடை கணக்கைப் பாதுகாப்பாக வைத்திருங்கள்.',autosaveDesc:'ஒவ்வொரு விற்பனையும் வசூலும் இந்தச் சாதனத்தில் சேமிக்கப்படும்.',backupDesc:'பதிவுகளை மீட்டெடுக்க அவ்வப்போது காப்புப்பிரதி பதிவிறக்கவும்.',privacyNote:'பதிவுகள் இந்த உலாவியில் இருக்கும்; உலாவித் தரவை அழித்தால் அவை நீங்கலாம்.'},
      es:{helpCentre:'CENTRO DE AYUDA',saleDueHint:'Añade el nombre del cliente para seguir el saldo.',sameCustomer:'Usa el mismo nombre de cliente en cada venta.',openCredit:'Abre el crédito del cliente y revisa el saldo.',paymentSave:'Introduce el importe y el medio de pago, y guarda.',compareTotals:'Compara ventas, pagos recibidos, crédito y cobros.',saleExample:'2 artículos × ₹350 = ₹700. Recibidos ₹300 → quedan ₹400.',creditExample:'Factura ₹1.000 − ₹300 recibidos = ₹700 de crédito. Se pagan ₹200 → quedan ₹500.',historyExample:'La copia contiene tus registros; el ZIP contiene el código de la app.',totalsIntro:'Qué significa cada total',salesMeaning:'Valor completo de las facturas del día seleccionado, incluso las pendientes.',collectionMeaning:'Pagos recibidos con ventas más crédito antiguo cobrado ese día.',balanceMeaning:'Importe total que los clientes aún deben.',safetyIntro:'Protege los registros de tu tienda.',autosaveDesc:'Cada venta y cobro se guarda en este dispositivo.',backupDesc:'Descarga copias periódicas para poder restaurar los registros.',privacyNote:'Los datos permanecen en este navegador; al borrar sus datos puedes perderlos.'},
      fr:{helpCentre:'CENTRE D’AIDE',saleDueHint:'Ajoutez le nom du client pour suivre le solde.',sameCustomer:'Utilisez le même nom de client pour chaque vente.',openCredit:'Ouvrez le crédit client et vérifiez le solde.',paymentSave:'Saisissez le montant et le mode de paiement, puis enregistrez.',compareTotals:'Comparez ventes, paiements reçus, crédits et remboursements.',saleExample:'2 articles × ₹350 = ₹700. ₹300 reçus → ₹400 restants.',creditExample:'Facture ₹1 000 − ₹300 reçus = ₹700 de crédit. ₹200 remboursés → ₹500 restants.',historyExample:'La sauvegarde contient vos données ; le ZIP contient le code de l’application.',totalsIntro:'Signification des totaux',salesMeaning:'Valeur totale des factures du jour choisi, y compris les impayés.',collectionMeaning:'Paiements reçus avec les ventes et anciens crédits encaissés ce jour-là.',balanceMeaning:'Montant total que les clients doivent encore.',safetyIntro:'Protégez les comptes de votre boutique.',autosaveDesc:'Chaque vente et encaissement est enregistré sur cet appareil.',backupDesc:'Téléchargez régulièrement une sauvegarde pour restaurer vos données.',privacyNote:'Les données restent dans ce navigateur ; les effacer peut les supprimer.'},
      ar:{helpCentre:'مركز المساعدة',saleDueHint:'أدخل اسم العميل لمتابعة الرصيد.',sameCustomer:'استخدم اسم العميل نفسه في كل عملية بيع.',openCredit:'افتح حساب العميل وراجع الرصيد المتبقي.',paymentSave:'أدخل المبلغ وطريقة الدفع ثم احفظ.',compareTotals:'قارن المبيعات والمبالغ المستلمة والديون والتحصيلات.',saleExample:'قطعتان × ₹350 = ₹700. تم استلام ₹300 → المتبقي ₹400.',creditExample:'الفاتورة ₹1,000 − المستلم ₹300 = دين ₹700. تم سداد ₹200 → المتبقي ₹500.',historyExample:'تحتوي النسخة الاحتياطية على سجلاتك؛ ويحتوي ZIP على كود التطبيق.',totalsIntro:'معنى كل إجمالي',salesMeaning:'القيمة الكاملة لفواتير اليوم المحدد، بما فيها المبالغ غير المدفوعة.',collectionMeaning:'المدفوعات المستلمة مع المبيعات والديون القديمة المحصلة في ذلك اليوم.',balanceMeaning:'إجمالي المبلغ الذي لا يزال العملاء مدينين به.',safetyIntro:'احفظ سجلات متجرك بأمان.',autosaveDesc:'تُحفظ كل عملية بيع وتحصيل على هذا الجهاز.',backupDesc:'نزّل نسخة احتياطية بانتظام لاستعادة السجلات.',privacyNote:'تبقى السجلات في هذا المتصفح؛ وقد يؤدي مسح بياناته إلى فقدانها.'},
      pt:{helpCentre:'CENTRO DE AJUDA',saleDueHint:'Adicione o nome do cliente para acompanhar o saldo.',sameCustomer:'Use o mesmo nome do cliente em cada venda.',openCredit:'Abra o crédito do cliente e confira o saldo.',paymentSave:'Informe o valor e a forma de pagamento e salve.',compareTotals:'Compare vendas, pagamentos recebidos, crédito e cobranças.',saleExample:'2 itens × ₹350 = ₹700. Recebidos ₹300 → faltam ₹400.',creditExample:'Conta ₹1.000 − ₹300 recebidos = ₹700 de crédito. Pagos ₹200 → faltam ₹500.',historyExample:'O backup contém seus registros; o ZIP contém o código do app.',totalsIntro:'O significado de cada total',salesMeaning:'Valor total das contas do dia selecionado, incluindo valores pendentes.',collectionMeaning:'Pagamentos recebidos nas vendas mais créditos antigos cobrados no dia.',balanceMeaning:'Valor total que os clientes ainda devem.',safetyIntro:'Proteja os registros da sua loja.',autosaveDesc:'Cada venda e recebimento é salvo neste dispositivo.',backupDesc:'Baixe backups regularmente para restaurar seus registros.',privacyNote:'Os registros ficam neste navegador; apagar os dados pode removê-los.'},
      id:{helpCentre:'PUSAT BANTUAN',saleDueHint:'Tambahkan nama pelanggan untuk melacak saldo.',sameCustomer:'Gunakan nama pelanggan yang sama pada setiap penjualan.',openCredit:'Buka kredit pelanggan dan periksa saldonya.',paymentSave:'Masukkan jumlah dan metode pembayaran, lalu simpan.',compareTotals:'Bandingkan penjualan, pembayaran diterima, kredit, dan pelunasan.',saleExample:'2 barang × ₹350 = ₹700. Diterima ₹300 → sisa ₹400.',creditExample:'Tagihan ₹1.000 − diterima ₹300 = kredit ₹700. Dibayar ₹200 → sisa ₹500.',historyExample:'Cadangan berisi catatan Anda; ZIP sumber berisi kode aplikasi.',totalsIntro:'Arti setiap total',salesMeaning:'Nilai seluruh tagihan pada tanggal yang dipilih, termasuk yang belum dibayar.',collectionMeaning:'Pembayaran saat penjualan ditambah kredit lama yang ditagih hari itu.',balanceMeaning:'Jumlah yang masih harus dibayar pelanggan.',safetyIntro:'Jaga keamanan catatan toko Anda.',autosaveDesc:'Setiap penjualan dan pembayaran tersimpan di perangkat ini.',backupDesc:'Unduh cadangan secara rutin agar catatan dapat dipulihkan.',privacyNote:'Catatan tersimpan di browser ini; menghapus data browser bisa menghapusnya.'}
    };
    const base = text[currentLanguage] || text.en;
    return base[key] || text.en[key] || tr(key);
  }

  function guideHtml() {
    const saleFlow = flowDiagram('sale',[tr('openSale'),tr('item'),tr('total'),tr('received'),tr('due')]);
    const creditFlow = flowDiagram('credit',[tr('customer'),tr('creditTitle'),tr('repayment'),tr('balance')]);
    const historyFlow = flowDiagram('history',[tr('date'),tr('report'),tr('backup')]);
    const stepsSale = [tr('openSale')+'.',tr('item')+'.',tr('total')+'.',tr('received')+'.',tr('due')+'. ' + guideText('saleDueHint')];
    const stepsCredit = [guideText('sameCustomer'),guideText('openCredit'),tr('repayment')+'.',guideText('paymentSave')];
    const stepsHistory = [tr('date')+'.',tr('report')+'.',guideText('compareTotals'),tr('backup')+'.'];
    return '<section class="page-enter guide-page"><div class="section-intro"><div><div class="eyebrow"><span class="eyebrow-line"></span> ' + tr('helpCentre') + '</div><h2>' + tr('title') + '</h2><p>' + tr('description') + '</p></div>' +
      '</div>' +
      '<div class="guide-hero"><div class="guide-hero-icon">' + svg('help',25) + '</div><div><span class="guide-kicker">' + tr('hero') + '</span><h3>' + tr('hero') + '</h3><p>' + tr('heroDesc') + '</p></div></div><div class="tutorial-grid">' +
      tutorialSection('01',tr('saleTitle'),tr('saleDesc'),saleFlow,stepsSale,guideText('saleExample'),'tutorial-green') +
      tutorialSection('02',tr('creditTitle'),tr('creditDesc'),creditFlow,stepsCredit,guideText('creditExample'),'tutorial-orange') +
      tutorialSection('03',tr('historyTitle'),tr('historyDesc'),historyFlow,stepsHistory,guideText('historyExample'),'tutorial-blue') +
      '</div><section class="panel guide-section"><div class="panel-heading"><div><h3>' + tr('numbers') + '</h3><p>' + tr('totalsIntro') + '</p></div></div><div class="guide-table"><div><strong>' + tr('sales') + '</strong><span>' + tr('salesMeaning') + '</span></div><div><strong>' + tr('credit') + '</strong><span>' + tr('collectionMeaning') + '</span></div><div><strong>' + tr('balance') + '</strong><span>' + tr('balanceMeaning') + '</span></div></div></section>' +
      '<section class="panel guide-section"><div class="panel-heading"><div><h3>' + tr('safety') + '</h3><p>' + tr('safetyIntro') + '</p></div>' + svg('shield',20) + '</div><div class="safety-grid"><div>' + svg('check',17) + '<span><b>' + tr('autosave') + ':</b> ' + tr('autosaveDesc') + '</span></div><div>' + svg('download',17) + '<span><b>' + tr('backup') + ':</b> ' + tr('backupDesc') + '</span></div><div>' + svg('shield',17) + '<span>' + tr('privacyNote') + '</span></div></div><button class="secondary-button guide-backup-button" data-action="backup">' + svg('download',15) + tr('backup') + '</button></section>' +
      '</section>';
  }
  function field(label, id, value, options) {
    options = options || {};
    const safeLabel = escapeHtml(label);
    const safeId = escapeHtml(id);
    const safeValue = escapeHtml(value == null ? '' : value);
    const required = options.required ? ' required aria-required="true"' : '';
    const labelSuffix = options.required ? ' <i>*</i>' : (options.optional ? ' <small>optional</small>' : '');
    let control = '';
    if (Array.isArray(options.select)) {
      control = '<div class="custom-select-field" data-custom-select="' + safeId + '">' +
        '<button type="button" class="custom-select-trigger" data-action="toggle-select:' + safeId + '" aria-haspopup="listbox" aria-expanded="false">' +
        '<span>' + escapeHtml(value == null ? '' : value) + '</span><svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></button>' +
        '<div class="app-select-menu custom-select-menu" data-select-menu="' + safeId + '" role="listbox" hidden>' +
        options.select.map(function (option) {
          const selected = String(option) === String(value) ? ' selected' : '';
          return '<button type="button" role="option" aria-selected="' + (selected ? 'true' : 'false') + '" class="language-option custom-select-option' + selected + '" data-action="select-value:' + safeId + ':' + encodeURIComponent(option) + '">' + escapeHtml(option) + '</button>';
        }).join('') + '</div></div>';
    } else {
      const type = ['text', 'date', 'number', 'email', 'tel'].includes(options.type) ? options.type : 'text';
      const placeholder = options.placeholder ? ' placeholder="' + escapeHtml(options.placeholder) + '"' : '';
      const min = options.min != null ? ' min="' + escapeHtml(options.min) + '"' : '';
      const step = options.step != null ? ' step="' + escapeHtml(options.step) + '"' : '';
      const list = options.list ? ' list="' + escapeHtml(options.list) + '"' : '';
      control = '<input id="' + safeId + '" name="' + safeId + '" data-field="' + safeId + '" type="' + type + '" value="' + safeValue + '"' + placeholder + min + step + list + required + ' autocomplete="off">';
    }
    return '<label class="form-field" for="' + safeId + '"><span>' + safeLabel + labelSuffix + '</span>' + control + '</label>';
  }

  function saleModalHtml() {
    if (!saleDialog) return '';
    const isEdit = Boolean(editingSaleId);
    const title = isEdit ? 'Sale entry edit karein' : 'Nayi bikri add karein';
    const total = round(Math.max(0, Number(saleDraft.qty) || 0) * Math.max(0, Number(saleDraft.price) || 0));
    const paid = Math.max(0, Number(saleDraft.paid) || 0);
    const due = round(Math.max(0, total - paid));
    const names = allCustomerNames();
    return '<section class="entry-page"><section class="entry-page-card" aria-labelledby="sale-modal-title"><div class="modal-heading"><div><span class="modal-kicker">SALES REGISTER</span><h2 id="sale-modal-title">' + title + '</h2><p>Item aur payment ki details bharein.</p></div><button class="modal-close" data-action="close-sale" aria-label="Close dialog">' + svg('close', 17) + '</button></div><form class="modal-form" data-form="sale" novalidate>' +
      field('Date', 'sale-date', saleDraft.date, { type: 'date', required: true }) +
      field('Item ka naam', 'sale-item', saleDraft.item, { required: true, placeholder: 'Jaise: Chawal 5kg' }) +
      '<div class="form-grid-three">' + field('Quantity', 'sale-qty', saleDraft.qty, { type: 'number', min: '0.01', step: 'any', required: true }) + field('Unit', 'sale-unit', saleDraft.unit, { select: units }) + field('Rate (₹)', 'sale-price', saleDraft.price, { type: 'number', min: '0', step: 'any', required: true, placeholder: '0' }) + '</div>' +
      '<div class="bill-preview"><div><span>Total bill</span><strong>' + money(total) + '</strong></div><div><span>Baaki udhaar</span><strong class="' + (due > 0 ? 'preview-due' : 'preview-clear') + '">' + money(due) + '</strong></div></div>' +
      '<div class="form-grid-two">' + field('Abhi mila (₹)', 'sale-paid', saleDraft.paid, { type: 'number', min: '0', step: 'any', required: true, placeholder: '0' }) + field('Payment mode', 'sale-mode', saleDraft.paymentMode, { select: modes }) + '</div>' +
      field('Customer naam (optional)', 'sale-customer', saleDraft.customer, { placeholder: 'Udhaar ho to naam likhein' }) +
      (names.length ? '<datalist id="customer-names">' + names.map(name => '<option value="' + escapeHtml(name) + '"></option>').join('') + '</datalist>' : '') +
      field('Note (optional)', 'sale-note', saleDraft.note, { placeholder: 'Koi extra details...' }) +
      (saleError ? '<div class="form-error" role="alert">' + escapeHtml(saleError) + '</div>' : '') +
      '<div class="modal-actions"><button type="button" class="secondary-button" data-action="close-sale">Cancel</button><button type="submit" class="primary-button">' + svg('check', 16) + (isEdit ? ' Changes save karein' : ' Sale save karein') + '</button></div></form></section></section>';
  }
  function collectionModalHtml() {
    if (!collectionDialog) return '';
    const isEdit = Boolean(editingCollectionId);
    const due = currentDueForCustomer(collectionDraft.customer);
    return '<section class="entry-page"><section class="entry-page-card" aria-labelledby="collection-modal-title"><div class="modal-heading"><div><span class="modal-kicker">CUSTOMER KHATA</span><h2 id="collection-modal-title">' + (isEdit ? 'Jama entry edit karein' : 'Udhaar jama karein') + '</h2><p>Customer se mile payment ka record banayein.</p></div><button class="modal-close" data-action="close-collection" aria-label="Close dialog">' + svg('close', 17) + '</button></div><form class="modal-form" data-form="collection" novalidate>' +
      field('Date', 'collection-date', collectionDraft.date, { type: 'date', required: true }) +
      field('Customer naam', 'collection-customer', collectionDraft.customer, { required: true, placeholder: 'Customer ka naam' }) +
      '<div class="bill-preview"><div><span>Current baaki</span><strong>' + money(due) + '</strong></div><div><span>Jama amount</span><strong class="preview-clear">' + money(collectionDraft.amount) + '</strong></div></div>' +
      '<div class="form-grid-two">' + field('Jama amount (₹)', 'collection-amount', collectionDraft.amount, { type: 'number', min: '0.01', step: 'any', required: true, placeholder: '0' }) + field('Payment mode', 'collection-mode', collectionDraft.mode, { select: modes }) + '</div>' +
      field('Note (optional)', 'collection-note', collectionDraft.note, { placeholder: 'Koi extra details...' }) +
      (collectionError ? '<div class="form-error" role="alert">' + escapeHtml(collectionError) + '</div>' : '') +
      '<div class="modal-actions"><button type="button" class="secondary-button" data-action="close-collection">Cancel</button><button type="submit" class="primary-button">' + svg('check', 16) + (isEdit ? ' Changes save karein' : ' Jama save karein') + '</button></div></form></section></section>';
  }
  function confirmModalHtml() {
    if (!deleteTarget) return '';
    const label = deleteTarget.type === 'sale' ? 'sale entry' : 'jama entry';
    return '<section class="entry-page"><section class="entry-page-card confirm-page" aria-labelledby="delete-title"><button class="modal-close confirm-close" data-action="cancel-delete" aria-label="Close dialog">' + svg('close', 16) + '</button><span class="confirm-icon">' + svg('trash', 21) + '</span><h2 id="delete-title">Entry delete karein?</h2><p>Yeh ' + label + ' permanently delete ho jayegi. Is action ko undo nahi kar sakte.</p><div class="modal-actions"><button class="secondary-button" data-action="cancel-delete">Cancel</button><button class="delete-confirm-button" data-action="confirm-delete">' + svg('trash', 15) + ' Haan, delete karein</button></div></section></section>';
  }

  function shellHtml(content) {
    const navItems = [
      { id: 'dashboard', label: tr('dashboard'), icon: 'activity' },
      { id: 'transactions', label: tr('sales'), icon: 'bag' },
      { id: 'udhaar', label: tr('credit'), icon: 'users' },
      { id: 'history', label: tr('history'), icon: 'calendar' },
      { id: 'guide', label: tr('guide'), icon: 'help' }
    ];
    const active = navItems.find(item => item.id === tab) || navItems[0];
    const nav = mobile => navItems.map(item =>
      '<button type="button" class="' + (mobile ? 'mobile-nav-link' : 'nav-link') + (tab === item.id ? ' active' : '') + '" data-action="tab:' + item.id + '"' +
      (tab === item.id ? ' aria-current="page"' : '') + '>' + svg(item.icon, mobile ? 19 : 18) +
      '<span>' + item.label + '</span>' + (tab === item.id && !mobile ? '<span class="active-dot"></span>' : '') + '</button>'
    ).join('');
    return '<div class="app-shell">' +
      '<aside class="sidebar"><div class="brand-lockup"><span class="brand-mark">' + svg('store', 23) + '</span><span class="brand-copy"><strong>DukaanDesk</strong><small>SMART SHOP HISAB</small></span></div>' +
      '<div class="side-label">WORKSPACE</div><nav class="side-nav" aria-label="Main navigation">' + nav(false) + '</nav><div class="sidebar-spacer"></div>' +
      '<button class="shop-switcher" type="button" data-action="rename-shop"><span class="shop-avatar">' + svg('store', 18) + '</span><span class="shop-switch-copy"><small>YOUR SHOP</small><strong>' + escapeHtml(state.shopName) + '</strong></span><span class="shop-chevron">⌄</span></button>' +
      '<div class="local-note"><span class="local-note-icon">' + svg('shield', 17) + '</span><span><strong>Private by design</strong><small>Your records stay in this browser.</small></span></div>' +
      '<div class="sidebar-footer"><span class="status-dot"></span> LOCAL STORAGE <span class="version-tag">v1.0</span></div></aside>' +
      '<div class="workspace"><header class="topbar"><div class="topbar-title-wrap"><div class="mobile-brand"><span class="brand-mark">' + svg('store', 18) + '</span><strong>DukaanDesk</strong></div><div class="topbar-title"><h1>' + active.label + '</h1><p>' + longDate(todayISO()) + '</p></div></div>' +
      '<div class="topbar-actions">' + languagePickerHtml('header-language-picker') + '<button type="button" class="theme-toggle" data-action="toggle-theme" aria-label="Toggle light and dark mode" title="Toggle theme">' + (document.documentElement.dataset.theme === 'dark' ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>' : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.9 13A8.5 8.5 0 0 1 11 3.1 8.5 8.5 0 1 0 20.9 13Z"/></svg>') + '</button>' +
      '<span class="today-chip">' + svg('calendar', 15) + longDate(todayISO()) + '</span>' +
      '<button type="button" class="primary-button" data-action="new-sale">' + svg('plus', 16) + '<span>' + tr('openSale') + '</span></button></div></header>' +
      '<main class="main-content">' + content + '</main><footer class="mobile-footer">' + svg('shield', 13) + ' Private by design · Local device storage</footer></div>' +
      '<nav class="mobile-nav" aria-label="Mobile navigation">' + nav(true) + '</nav></div>';
  }
  const APP_VISIBLE_TEXT = {"DAILY SNAPSHOT":["DAILY SNAPSHOT","DAILY SNAPSHOT","आज का हिसाब","روزانہ کا حساب","দৈনিক হিসাব","दैनिक आढावा","தினசரி சுருக்கம்","RESUMEN DIARIO","APERÇU QUOTIDIEN","ملخص اليوم","RESUMO DIÁRIO","RINGKASAN HARIAN"],"Dukaan ka hisaab,":["Shop accounts,","Dukaan ka hisaab,","दुकान का हिसाब,","دکان کا حساب،","দোকানের হিসাব,","दुकानचा हिशोब,","கடை கணக்கு,","Cuentas de la tienda,","Comptes de la boutique,","حسابات المتجر،","Contas da loja,","Catatan toko,"],"bilkul clear.":["crystal clear.","bilkul clear.","बिल्कुल साफ़।","بالکل واضح۔","একেবারে পরিষ্কার।","अगदी स्पष्ट.","தெளிவாக.","todo claro.","tout est clair.","واضح تمامًا.","tudo claro.","sangat jelas."],"Aaj ka business summary":["Today’s business summary","Aaj ka business summary","आज के कारोबार का सार","آج کے کاروبار کا خلاصہ","আজকের ব্যবসার সারাংশ","आजच्या व्यवसायाचा सारांश","இன்றைய வணிகச் சுருக்கம்","Resumen de hoy","Résumé du jour","ملخص أعمال اليوم","Resumo de hoje","Ringkasan bisnis hari ini"],"Aaj ki total bikri":["Today’s sales total","Aaj ki total bikri","आज की कुल बिक्री","آج کی کل فروخت","আজকের মোট বিক্রি","आजची एकूण विक्री","இன்றைய மொத்த விற்பனை","Ventas de hoy","Ventes du jour","إجمالي مبيعات اليوم","Vendas de hoje","Total penjualan hari ini"],"Sale payment + udhaar recovery":["Sale payments + credit collected","Sale payment + udhaar recovery","बिक्री की रकम + उधार की वसूली","فروخت کی وصولی + ادھار کی واپسی","বিক্রির টাকা + বাকি আদায়","विक्रीची रक्कम + उधारी वसुली","விற்பனைப் பணம் + கடன் வசூல்","Pagos de ventas + créditos cobrados","Paiements des ventes + crédits encaissés","مدفوعات المبيعات + تحصيل الديون","Pagamentos de vendas + crédito recebido","Pembayaran penjualan + kredit tertagih"],"NEW UDHAAR":["NEW CREDIT","NEW UDHAAR","नया उधार","نیا ادھار","নতুন বাকি","नवीन उधारी","புதிய கடன்","CRÉDITO NUEVO","NOUVEAU CRÉDIT","دين جديد","NOVO CRÉDITO","KREDIT BARU"],"Aaj customers ko diya":["New credit today","Aaj customers ko diya","आज ग्राहकों को दिया","آج گاہکوں کو دیا","আজ গ্রাহকদের দেওয়া","आज ग्राहकांना दिले","இன்று வாடிக்கையாளர்களுக்கு வழங்கியது","Crédito dado hoy","Crédit accordé aujourd’hui","الائتمان الممنوح اليوم","Crédito concedido hoje","Kredit diberikan hari ini"],"TOTAL BAAKI":["TOTAL OWED","TOTAL BAAKI","कुल बकाया","کل بقایا","মোট বাকি","एकूण बाकी","மொத்த நிலுவை","TOTAL PENDIENTE","TOTAL DÛ","إجمالي المستحق","TOTAL EM ABERTO","TOTAL PIUTANG"],"Bikri ka trend":["Sales trend","Bikri ka trend","बिक्री का रुझान","فروخت کا رجحان","বিক্রির প্রবণতা","विक्रीचा कल","விற்பனைப் போக்கு","Tendencia de ventas","Tendance des ventes","اتجاه المبيعات","Tendência de vendas","Tren penjualan"],"Quick actions":["Quick actions","Quick actions","झटपट काम","فوری کام","দ্রুত কাজ","जलद कृती","விரைவு செயல்கள்","Acciones rápidas","Actions rapides","إجراءات سريعة","Ações rápidas","Tindakan cepat"],"Roz ke kaam, ek tap mein":["Daily tasks, one tap away","Roz ke kaam, ek tap mein","रोज़ के काम, एक टैप में","روزمرہ کے کام، ایک ٹیپ میں","প্রতিদিনের কাজ, এক ট্যাপে","दररोजची कामे, एका टॅपमध्ये","தினசரி வேலைகள் ஒரே தட்டலில்","Tareas diarias con un toque","Les tâches du jour en un geste","مهام يومية بلمسة واحدة","Tarefas diárias com um toque","Tugas harian sekali ketuk"],"Nayi bikri add karein":["Add a new sale","Nayi bikri add karein","नई बिक्री जोड़ें","نئی فروخت شامل کریں","নতুন বিক্রি যোগ করুন","नवीन विक्री जोडा","புதிய விற்பனையைச் சேர்க்கவும்","Añadir una venta","Ajouter une vente","إضافة عملية بيع","Adicionar venda","Tambah penjualan"],"Udhaar jama karein":["Record a credit payment","Udhaar jama karein","उधार की वसूली दर्ज करें","ادھار کی وصولی درج کریں","বাকি আদায় নথিভুক্ত করুন","उधारी वसुली नोंदवा","கடன் வசூலைப் பதிவு செய்யவும்","Registrar cobro de crédito","Enregistrer un remboursement","تسجيل تحصيل الدين","Registar recebimento de crédito","Catat pembayaran kredit"],"Purana hisaab dekhein":["View previous records","Purana hisaab dekhein","पुराना हिसाब देखें","پرانا حساب دیکھیں","পুরোনো হিসাব দেখুন","जुना हिशोब पाहा","முந்தைய கணக்கைப் பார்க்கவும்","Ver registros anteriores","Voir les anciens comptes","عرض السجلات السابقة","Ver registos anteriores","Lihat catatan sebelumnya"],"Recent entries":["Recent entries","Recent entries","हाल की एंट्री","حالیہ اندراجات","সাম্প্রতিক এন্ট্রি","अलीकडील नोंदी","சமீபத்திய பதிவுகள்","Entradas recientes","Entrées récentes","الإدخالات الأخيرة","Registos recentes","Catatan terbaru"],"Sales register":["Sales register","Sales register","बिक्री रजिस्टर","فروخت رجسٹر","বিক্রির খাতা","विक्री नोंदवही","விற்பனைப் பதிவு","Registro de ventas","Registre des ventes","سجل المبيعات","Registo de vendas","Daftar penjualan"],"Customer balances":["Customer balances","Customer balances","ग्राहकों का बकाया","گاہکوں کے بقایا","গ্রাহকের বাকি","ग्राहकांची बाकी","வாடிக்கையாளர் நிலுவை","Saldos de clientes","Soldes clients","أرصدة العملاء","Saldos de clientes","Saldo pelanggan"],"Date":["Date","Date","तारीख","تاریخ","তারিখ","तारीख","தேதி","Fecha","Date","التاريخ","Data","Tanggal"],"Payment":["Payment","Payment","भुगतान","ادائیگی","পেমেন্ট","पेमेंट","பணம்","Pago","Paiement","الدفع","Pagamento","Pembayaran"],"Paid":["Paid","Paid","चुकाया","ادا","পরিশোধিত","भरले","செலுத்தப்பட்டது","Pagado","Payé","مدفوع","Pago","Lunas"],"Due":["Due","Baaki","बाकी","بقایا","বাকি","बाकी","நிலுவை","Pendiente","Dû","مستحق","Pendente","Belum dibayar"],"Today":["Today","Today","आज","آج","আজ","आज","இன்று","Hoy","Aujourd’hui","اليوم","Hoje","Hari ini"],"TOTAL SALES":["TOTAL SALES","TOTAL SALES","कुल बिक्री","کل فروخت","মোট বিক্রি","एकूण विक्री","மொத்த விற்பனை","VENTAS TOTALES","VENTES TOTALES","إجمالي المبيعات","VENDAS TOTAIS","TOTAL PENJUALAN"],"TOTAL COLLECTION":["TOTAL COLLECTION","TOTAL COLLECTION","कुल वसूली","کل وصولی","মোট আদায়","एकूण वसुली","மொத்த வசூல்","COBRO TOTAL","ENCAISSEMENTS TOTAUX","إجمالي التحصيل","TOTAL RECEBIDO","TOTAL PENAGIHAN"],"New credit today":["New credit today","Aaj customers ko diya","आज का नया उधार","ادھار آج","আজকের বাকি","आजची उधारी","இன்றைய கடன்","Crédito nuevo hoy","Nouveau crédit du jour","دين اليوم","Crédito novo hoje","Kredit baru hari ini"],"Total bill":["Total bill","Total bill","कुल बिल","کل بل","মোট বিল","एकूण बिल","மொத்தப் பில்","Total de la factura","Total de la facture","إجمالي الفاتورة","Total da conta","Total tagihan"],"WORKSPACE":["WORKSPACE","WORKSPACE","कार्यस्थान","ورک اسپیس","কর্মক্ষেত্র","कार्यस्थान","பணியிடம்","ESPACIO DE TRABAJO","ESPACE DE TRAVAIL","مساحة العمل","ESPAÇO DE TRABALHO","RUANG KERJA"],"YOUR SHOP":["YOUR SHOP","AAPKI DUKAAN","आपकी दुकान","آپ کی دکان","আপনার দোকান","तुमचे दुकान","உங்கள் கடை","TU TIENDA","VOTRE BOUTIQUE","متجرك","SUA LOJA","TOKO ANDA"],"SMART SHOP HISAB":["SMART SHOP HISAB","SMART SHOP HISAB","स्मार्ट दुकान हिसाब","اسمارٹ دکان حساب","স্মার্ট দোকানের হিসাব","स्मार्ट दुकान हिशोब","ஸ்மார்ட் கடை கணக்கு","CUENTAS INTELIGENTES","COMPTES MALINS","حسابات المتجر الذكية","CONTAS INTELIGENTES","HISAB TOKO PINTAR"],"Private by design":["Private by design","Privacy ka dhyan","डिज़ाइन से निजी","نجی طور پر ڈیزائن","গোপনীয়তা-ভিত্তিক","गोपनीयतेला प्राधान्य","தனியுரிமை முதன்மை","Privado por diseño","Privé par conception","خصوصية حسب التصميم","Privado por design","Privasi sejak desain"],"Your records stay in this browser.":["Your records stay in this browser.","Aapka hisaab isi browser mein rehta hai.","आपका हिसाब इसी ब्राउज़र में रहता है।","آپ کا حساب اسی براؤزر میں رہتا ہے۔","আপনার হিসাব এই ব্রাউজারেই থাকে।","तुमचा हिशोब याच ब्राउझरमध्ये राहतो.","உங்கள் பதிவுகள் இந்த உலாவியிலேயே இருக்கும்.","Tus registros quedan en este navegador.","Vos données restent dans ce navigateur.","تبقى سجلاتك في هذا المتصفح.","Seus registros ficam neste navegador.","Catatan Anda tetap di browser ini."],"DAILY SNAPSHOT":["DAILY SNAPSHOT","AAJ KA HISAAB","आज का हिसाब","روزانہ کا حساب","দৈনিক হিসাব","दैनिक आढावा","தினசரி சுருக்கம்","RESUMEN DIARIO","APERÇU QUOTIDIEN","ملخص اليوم","RESUMO DIÁRIO","RINGKASAN HARIAN"],"Shop accounts,":["Shop accounts,","Dukaan ka hisaab,","दुकान का हिसाब,","دکان کا حساب،","দোকানের হিসাব,","दुकानचा हिशोब,","கடை கணக்கு,","Cuentas de la tienda,","Comptes de la boutique,","حسابات المتجر،","Contas da loja,","Catatan toko,"],"crystal clear.":["crystal clear.","bilkul clear.","बिल्कुल साफ़।","بالکل واضح۔","একেবারে পরিষ্কার।","अगदी स्पष्ट.","தெளிவாக.","todo claro.","tout est clair.","واضح تمامًا.","tudo claro.","sangat jelas."],"Today’s business summary":["Today’s business summary","Aaj ka business summary","आज के कारोबार का सार","آج کے کاروبار کا خلاصہ","আজকের ব্যবসার সারাংশ","आजच्या व्यवसायाचा सारांश","இன்றைய வணிகச் சுருக்கம்","Resumen de hoy","Résumé du jour","ملخص أعمال اليوم","Resumo de hoje","Ringkasan bisnis hari ini"],"Total owed":["Total owed","Kul baaki","कुल बकाया","کل بقایا","মোট বাকি","एकूण बाकी","மொத்த நிலுவை","Total pendiente","Total dû","إجمالي المستحق","Total em aberto","Total piutang"],"Quick actions":["Quick actions","Jaldi wale kaam","झटपट काम","فوری کام","দ্রুত কাজ","जलद कृती","விரைவு செயல்கள்","Acciones rápidas","Actions rapides","إجراءات سريعة","Ações rápidas","Aksi cepat"],"Daily tasks, one tap away":["Daily tasks, one tap away","Roz ke kaam, ek tap mein","रोज़ के काम, एक टैप में","روزمرہ کام، ایک ٹیپ میں","দৈনিক কাজ, এক ট্যাপে","दैनिक कामे, एका टॅपमध्ये","தினசரி பணிகள், ஒரே தொடுதலில்","Tareas diarias, a un toque","Tâches quotidiennes en un clic","المهام اليومية بلمسة","Tarefas diárias com um toque","Tugas harian, sekali ketuk"],"Add a new sale":["Add a new sale","Nayi bikri jodein","नई बिक्री जोड़ें","نئی فروخت شامل کریں","নতুন বিক্রি যোগ করুন","नवीन विक्री जोडा","புதிய விற்பனையைச் சேர்க்கவும்","Añadir una venta","Ajouter une vente","إضافة عملية بيع","Adicionar uma venda","Tambah penjualan"],"Record a credit payment":["Record a credit payment","Udhaar ki payment likhein","उधार का भुगतान दर्ज करें","ادھار کی ادائیگی درج کریں","বাকি টাকা জমা লিখুন","उधारीची रक्कम नोंदवा","கடன் கட்டணத்தைப் பதிவு செய்யவும்","Registrar pago de crédito","Enregistrer un paiement de crédit","تسجيل دفعة ائتمان","Registrar pagamento de crédito","Catat pembayaran kredit"],"View previous records":["View previous records","Purane record dekhein","पुराने रिकॉर्ड देखें","پچھلے ریکارڈ دیکھیں","আগের রেকর্ড দেখুন","मागील नोंदी पाहा","முந்தைய பதிவுகளைப் பார்க்கவும்","Ver registros anteriores","Voir les enregistrements précédents","عرض السجلات السابقة","Ver registros anteriores","Lihat catatan sebelumnya"],"Recent entries":["Recent entries","Haal ki entries","हाल की प्रविष्टियाँ","حالیہ اندراجات","সাম্প্রতিক এন্ট্রি","अलीकडील नोंदी","சமீபத்திய பதிவுகள்","Entradas recientes","Entrées récentes","الإدخالات الأخيرة","Entradas recentes","Catatan terbaru"],"Saari entries":["All entries","Saari entries","सभी प्रविष्टियाँ","تمام اندراجات","সব এন্ট্রি","सर्व नोंदी","அனைத்து பதிவுகள்","Todas las entradas","Toutes les entrées","كل الإدخالات","Todas as entradas","Semua catatan"],"Abhi tak pehli bikri nahi hui":["No sales yet","Abhi tak pehli bikri nahi hui","अभी तक पहली बिक्री नहीं हुई","ابھی تک پہلی فروخت نہیں ہوئی","এখনও কোনো বিক্রি হয়নি","अजून विक्री झालेली नाही","இன்னும் விற்பனை இல்லை","Aún no hay ventas","Aucune vente pour le moment","لا توجد مبيعات بعد","Ainda não há vendas","Belum ada penjualan"],"Apni pehli sale add karein — record yahin se shuru hoga.":["Add your first sale — your records start here.","Apni pehli sale add karein — record yahin se shuru hoga.","अपनी पहली बिक्री जोड़ें — रिकॉर्ड यहीं से शुरू होगा।","اپنی پہلی فروخت شامل کریں — ریکارڈ یہاں سے شروع ہوگا۔","প্রথম বিক্রি যোগ করুন — এখান থেকেই রেকর্ড শুরু হবে।","पहिली विक्री जोडा — नोंद इथून सुरू होईल.","முதல் விற்பனையைச் சேர்க்கவும் — பதிவு இங்கிருந்து தொடங்கும்.","Añade tu primera venta: aquí comienzan los registros.","Ajoutez votre première vente : vos données commencent ici.","أضف أول عملية بيع لتبدأ سجلاتك.","Adicione sua primeira venda — seus registros começam aqui.","Tambahkan penjualan pertama Anda — catatan dimulai di sini."],"Local device storage":["Local device storage","Data isi device mein save hai","स्थानीय डिवाइस में डेटा","ڈیٹا اسی ڈیوائس میں محفوظ ہے","ডেটা এই ডিভাইসে সংরক্ষিত","डेटा याच डिव्हाइसवर जतन","சாதனத்தில் உள்ளூர் சேமிப்பு","Almacenamiento local","Stockage local","تخزين محلي على الجهاز","Armazenamento local","Penyimpanan perangkat lokal"],"SALES REGISTER":["SALES REGISTER","SALES REGISTER","बिक्री रजिस्टर","سیلز رجسٹر","বিক্রয় রেজিস্টার","विक्री नोंदवही","விற்பனைப் பதிவு","REGISTRO DE VENTAS","REGISTRE DES VENTES","سجل المبيعات","REGISTRO DE VENDAS","DAFTAR PENJUALAN"],"Har entry par poora control.":["Full control over every entry.","Har entry par poora control.","हर प्रविष्टि पर पूरा नियंत्रण।","ہر اندراج پر مکمل کنٹرول۔","প্রতিটি এন্ট্রির ওপর পূর্ণ নিয়ন্ত্রণ।","प्रत्येक नोंदीवर पूर्ण नियंत्रण.","ஒவ்வொரு பதிவிலும் முழுக் கட்டுப்பாடு.","Control total de cada entrada.","Contrôle total de chaque entrée.","تحكم كامل بكل إدخال.","Controle total de cada entrada.","Kontrol penuh setiap catatan."],"Galti se amount likh diya? Entry ko kabhi bhi edit ya delete karein.":["Entered an amount incorrectly? Edit or delete any entry anytime.","Galti se amount likh diya? Entry ko kabhi bhi edit ya delete karein.","गलती से रकम लिख दी? किसी भी प्रविष्टि को कभी भी संपादित या हटाएँ।","غلط رقم درج ہوگئی؟ کسی بھی اندراج کو کبھی بھی ترمیم یا حذف کریں۔","ভুল করে টাকা লিখেছেন? যেকোনো এন্ট্রি যেকোনো সময় সম্পাদনা বা মুছুন।","चुकून रक्कम लिहिली? कोणतीही नोंद कधीही संपादित करा किंवा हटवा.","தவறான தொகையை உள்ளிட்டீர்களா? எந்தப் பதிவையும் எப்போது வேண்டுமானாலும் திருத்தலாம் அல்லது நீக்கலாம்.","¿Importe incorrecto? Edita o elimina cualquier entrada cuando quieras.","Montant incorrect ? Modifiez ou supprimez une entrée à tout moment.","هل أدخلت مبلغًا خاطئًا؟ عدّل أي إدخال أو احذفه في أي وقت.","Valor incorreto? Edite ou exclua qualquer entrada a qualquer momento.","Salah memasukkan jumlah? Edit atau hapus catatan kapan saja."],"Nayi bikri":["New sale","Nayi bikri","नई बिक्री","نئی فروخت","নতুন বিক্রি","नवीन विक्री","புதிய விற்பனை","Nueva venta","Nouvelle vente","بيع جديد","Nova venda","Penjualan baru"],"Item, customer ya date search karein...":["Search item, customer or date...","Item, customer ya date search karein...","सामान, ग्राहक या तारीख खोजें...","آئٹم، گاہک یا تاریخ تلاش کریں...","পণ্য, গ্রাহক বা তারিখ খুঁজুন...","वस्तू, ग्राहक किंवा तारीख शोधा...","பொருள், வாடிக்கையாளர் அல்லது தேதியைத் தேடுங்கள்...","Buscar artículo, cliente o fecha...","Rechercher article, client ou date...","ابحث عن صنف أو عميل أو تاريخ...","Buscar item, cliente ou data...","Cari barang, pelanggan, atau tanggal..."],"Search sales":["Search sales","Sales search karein","बिक्री खोजें","فروخت تلاش کریں","বিক্রি খুঁজুন","विक्री शोधा","விற்பனையைத் தேடுங்கள்","Buscar ventas","Rechercher des ventes","بحث المبيعات","Pesquisar vendas","Cari penjualan"],"entries":["entries","entries","प्रविष्टियाँ","اندراجات","এন্ট্রি","नोंदी","பதிவுகள்","entradas","entrées","إدخالات","entradas","catatan"],"Sales register":["Sales register","Sales register","बिक्री रजिस्टर","سیلز رجسٹر","বিক্রয় রেজিস্টার","विक्री नोंदवही","விற்பனைப் பதிவு","Registro de ventas","Registre des ventes","سجل المبيعات","Registro de vendas","Daftar penjualan"],"Latest entries pehle dikhengi":["Latest entries appear first","Latest entries pehle dikhengi","नई प्रविष्टियाँ पहले दिखेंगी","تازہ اندراجات پہلے دکھائی دیں گے","সর্বশেষ এন্ট্রি আগে দেখানো হবে","नवीन नोंदी आधी दिसतील","சமீபத்திய பதிவுகள் முதலில் தோன்றும்","Las entradas más recientes aparecen primero","Les entrées les plus récentes apparaissent en premier","تظهر الإدخالات الأحدث أولًا","As entradas mais recentes aparecem primeiro","Catatan terbaru ditampilkan lebih dulu"],"Koi matching entry nahi mili":["No matching entries found","Koi matching entry nahi mili","कोई मिलती-जुलती प्रविष्टि नहीं मिली","کوئی مماثل اندراج نہیں ملا","মিলছে এমন কোনো এন্ট্রি নেই","जुळणारी नोंद सापडली नाही","பொருந்தும் பதிவுகள் இல்லை","No se encontraron entradas","Aucune entrée correspondante","لم يتم العثور على إدخالات مطابقة","Nenhuma entrada correspondente","Tidak ada catatan yang cocok"],"Doosra item, customer ya date try karein.":["Try another item, customer or date.","Doosra item, customer ya date try karein.","कोई दूसरा सामान, ग्राहक या तारीख आज़माएँ।","کوئی اور آئٹم، گاہک یا تاریخ آزمائیں۔","অন্য পণ্য, গ্রাহক বা তারিখ চেষ্টা করুন।","दुसरी वस्तू, ग्राहक किंवा तारीख वापरून पाहा.","வேறு பொருள், வாடிக்கையாளர் அல்லது தேதியை முயற்சிக்கவும்.","Prueba otro artículo, cliente o fecha.","Essayez un autre article, client ou une autre date.","جرّب صنفًا أو عميلًا أو تاريخًا آخر.","Tente outro item, cliente ou data.","Coba barang, pelanggan, atau tanggal lain."],"Sales register khaali hai":["Sales register is empty","Sales register khaali hai","बिक्री रजिस्टर खाली है","سیلز رجسٹر خالی ہے","বিক্রয় রেজিস্টার খালি","विक्री नोंदवही रिकामी आहे","விற்பனைப் பதிவு காலியாக உள்ளது","El registro de ventas está vacío","Le registre des ventes est vide","سجل المبيعات فارغ","O registro de vendas está vazio","Daftar penjualan kosong"],"Nayi bikri add karke register shuru karein.":["Add a new sale to get started.","Nayi bikri add karke register shuru karein.","शुरू करने के लिए नई बिक्री जोड़ें।","شروع کرنے کے لیے نئی فروخت شامل کریں۔","শুরু করতে নতুন বিক্রি যোগ করুন।","सुरू करण्यासाठी नवीन विक्री जोडा.","தொடங்க புதிய விற்பனையைச் சேர்க்கவும்.","Añade una venta para comenzar.","Ajoutez une vente pour commencer.","أضف عملية بيع للبدء.","Adicione uma venda para começar.","Tambahkan penjualan untuk memulai."],"CUSTOMER KHATA":["CUSTOMER LEDGER","CUSTOMER KHATA","ग्राहक खाता","گاہک کا کھاتہ","গ্রাহক খাতা","ग्राहक खाते","வாடிக்கையாளர் கணக்கு","CUENTA DEL CLIENTE","COMPTE CLIENT","دفتر العميل","CONTA DO CLIENTE","BUKU PELANGGAN"],"Udhaar ka hisaab clear rakhein.":["Keep customer credit clear.","Udhaar ka hisaab clear rakhein.","ग्राहकों के उधार का हिसाब साफ़ रखें।","گاہکوں کے ادھار کا حساب واضح رکھیں۔","গ্রাহকের বাকি হিসাব পরিষ্কার রাখুন।","ग्राहकांच्या उधारीचा हिशोब स्पष्ट ठेवा.","வாடிக்கையாளர் கடன் கணக்கைத் தெளிவாக வைத்திருங்கள்.","Mantén claras las cuentas de crédito.","Gardez les comptes de crédit clairs.","حافظ على وضوح حسابات الائتمان.","Mantenha as contas de crédito claras.","Jaga catatan kredit pelanggan tetap jelas."],"Customer-wise baaki dekhein aur payment milte hi jama karein.":["See each customer's balance and record payments as soon as received.","Customer-wise baaki dekhein aur payment milte hi jama karein.","हर ग्राहक का बकाया देखें और भुगतान मिलते ही दर्ज करें।","ہر گاہک کا بقایا دیکھیں اور ادائیگی ملتے ہی درج کریں۔","প্রতিটি গ্রাহকের বাকি দেখুন এবং টাকা পেলেই জমা লিখুন।","प्रत्येक ग्राहकाची बाकी पाहा आणि पैसे मिळताच नोंदवा.","ஒவ்வொரு வாடிக்கையாளரின் நிலுவையையும் பார்த்து பணம் கிடைத்ததும் பதிவு செய்யுங்கள்.","Consulta el saldo de cada cliente y registra los pagos recibidos.","Consultez le solde de chaque client et enregistrez les paiements reçus.","اطّلع على رصيد كل عميل وسجّل الدفعات فور استلامها.","Veja o saldo de cada cliente e registre os pagamentos recebidos.","Lihat saldo tiap pelanggan dan catat pembayaran saat diterima."],"Udhaar jama":["Record payment","Udhaar jama","उधार जमा करें","ادھار کی ادائیگی","বাকি জমা","उधारी जमा","கடன் தொகையைப் பெறுதல்","Registrar pago","Enregistrer le paiement","تسجيل دفعة","Registrar pagamento","Catat pembayaran"],"TOTAL OUTSTANDING":["TOTAL OUTSTANDING","TOTAL OUTSTANDING","कुल बकाया","کل بقایا","মোট বাকি","एकूण बाकी","மொத்த நிலுவை","TOTAL PENDIENTE","TOTAL DÛ","إجمالي المستحق","TOTAL EM ABERTO","TOTAL PIUTANG"],"Customers se lena baaki":["Amount customers still owe","Customers se lena baaki","ग्राहकों से लेना बाकी","گاہکوں سے وصول کرنا باقی","গ্রাহকদের কাছ থেকে পাওনা","ग्राहकांकडून येणे बाकी","வாடிக்கையாளர்களிடமிருந்து பெற வேண்டியது","Importe pendiente de clientes","Montant dû par les clients","المبلغ المستحق من العملاء","Valor devido pelos clientes","Jumlah piutang pelanggan"],"CUSTOMERS":["CUSTOMERS","CUSTOMERS","ग्राहक","گاہک","গ্রাহক","ग्राहक","வாடிக்கையாளர்கள்","CLIENTES","CLIENTS","العملاء","CLIENTES","PELANGGAN"],"Jinke paise baaki hain":["Customers with an outstanding balance","Jinke paise baaki hain","जिनका पैसा बाकी है","جن کے پیسے باقی ہیں","যাদের টাকা বাকি আছে","ज्यांचे पैसे बाकी आहेत","பணம் நிலுவையில் உள்ளவர்கள்","Clientes con saldo pendiente","Clients avec un solde dû","العملاء الذين عليهم رصيد","Clientes com saldo pendente","Pelanggan dengan saldo terutang"],"ALL-TIME RECOVERY":["ALL-TIME RECOVERY","ALL-TIME RECOVERY","अब तक की वसूली","اب تک کی وصولی","সর্বমোট আদায়","आतापर्यंतची वसुली","மொத்த வசூல்","RECUPERACIÓN TOTAL","RECOUVREMENT TOTAL","إجمالي التحصيل","RECUPERAÇÃO TOTAL","TOTAL PEMULIHAN"],"Jama hua udhaar":["Credit payments collected","Jama hua udhaar","वसूला गया उधार","وصول شدہ ادھار","আদায় করা বাকি","वसूल केलेली उधारी","வசூலிக்கப்பட்ட கடன்","Crédito cobrado","Crédit recouvré","الائتمان المحصّل","Crédito recebido","Kredit tertagih"],"Customer balances":["Customer balances","Customer balances","ग्राहकों का बकाया","گاہکوں کے بقایا","গ্রাহকের বাকি","ग्राहकांची बाकी","வாடிக்கையாளர் நிலுவை","Saldos de clientes","Soldes clients","أرصدة العملاء","Saldos de clientes","Saldo pelanggan"],"Sabse zyada baaki pehle":["Largest balance first","Sabse zyada baaki pehle","सबसे बड़ा बकाया पहले","سب سے زیادہ بقایا پہلے","সবচেয়ে বেশি বাকি আগে","सर्वाधिक बाकी आधी","அதிக நிலுவை முதலில்","Mayor saldo primero","Solde le plus élevé en premier","أعلى رصيد أولًا","Maior saldo primeiro","Saldo terbesar dahulu"],"customers":["customers","customers","ग्राहक","گاہک","গ্রাহক","ग्राहक","வாடிக்கையாளர்கள்","clientes","clients","العملاء","clientes","pelanggan"],"BAAKI":["DUE","BAAKI","बकाया","بقایا","বাকি","बाकी","நிலுவை","PENDIENTE","DÛ","مستحق","PENDENTE","TERUTANG"],"Total baaki":["Total due","Total baaki","कुल बकाया","کل بقایا","মোট বাকি","एकूण बाकी","மொத்த நிலுவை","Total pendiente","Total dû","إجمالي المستحق","Total em aberto","Total terutang"],"Jama karein":["Record payment","Jama karein","जमा करें","جمع کریں","জমা করুন","जमा करा","செலுத்தவும்","Registrar pago","Enregistrer le paiement","تسجيل الدفعة","Registrar pagamento","Catat pembayaran"],"Koi udhaar baaki nahi":["No outstanding credit","Koi udhaar baaki nahi","कोई उधार बाकी नहीं","کوئی ادھار باقی نہیں","কোনো বাকি নেই","उधारी बाकी नाही","நிலுவைக் கடன் இல்லை","No hay crédito pendiente","Aucun crédit en attente","لا توجد ديون مستحقة","Não há crédito pendente","Tidak ada kredit terutang"],"Jis sale mein payment baaki hogi, customer yahan dikhai dega.":["Customers with unpaid sales will appear here.","Jis sale mein payment baaki hogi, customer yahan dikhai dega.","जिस बिक्री का भुगतान बाकी होगा, उसका ग्राहक यहाँ दिखेगा।","جس فروخت کی ادائیگی باقی ہوگی، اس کا گاہک یہاں دکھائی دے گا۔","যে বিক্রির টাকা বাকি, সেই গ্রাহক এখানে দেখা যাবে।","ज्या विक्रीचे पैसे बाकी असतील तो ग्राहक येथे दिसेल.","பணம் நிலுவையில் உள்ள விற்பனையின் வாடிக்கையாளர் இங்கே தோன்றுவார்.","Los clientes con ventas pendientes aparecerán aquí.","Les clients ayant des ventes impayées apparaîtront ici.","سيظهر هنا العملاء الذين لديهم مبيعات غير مدفوعة.","Clientes com vendas não pagas aparecerão aqui.","Pelanggan dengan penjualan belum lunas akan muncul di sini."],"Recent recoveries":["Recent payments","Recent recoveries","हाल की वसूली","حالیہ وصولیاں","সাম্প্রতিক আদায়","अलीकडील वसुली","சமீபத்திய வசூல்கள்","Pagos recientes","Paiements récents","الدفعات الأخيرة","Pagamentos recentes","Pembayaran terbaru"],"Customer se jama hua paisa":["Payments collected from customers","Customer se jama hua paisa","ग्राहकों से वसूला गया पैसा","گاہکوں سے وصول شدہ رقم","গ্রাহকদের কাছ থেকে আদায় করা টাকা","ग्राहकांकडून जमा झालेली रक्कम","வாடிக்கையாளர்களிடமிருந்து வசூலித்த பணம்","Pagos recibidos de clientes","Paiements reçus des clients","المدفوعات المستلمة من العملاء","Pagamentos recebidos dos clientes","Pembayaran dari pelanggan"],"Nayi entry":["New entry","Nayi entry","नई प्रविष्टि","نیا اندراج","নতুন এন্ট্রি","नवीन नोंद","புதிய பதிவு","Nueva entrada","Nouvelle entrée","إدخال جديد","Nova entrada","Catatan baru"],"Har din ka poora record.":["A complete record for every day.","Har din ka poora record.","हर दिन का पूरा रिकॉर्ड।","ہر دن کا مکمل ریکارڈ۔","প্রতিদিনের সম্পূর্ণ রেকর্ড।","प्रत्येक दिवसाची संपूर्ण नोंद.","ஒவ்வொரு நாளுக்குமான முழுப் பதிவு.","Un registro completo de cada día.","Un dossier complet pour chaque jour.","سجل كامل لكل يوم.","Um registro completo de cada dia.","Catatan lengkap setiap hari."],"Date select karke purana hisaab aur recovery dekhein.":["Select a date to view past records and payments.","Date select karke purana hisaab aur recovery dekhein.","पुराना हिसाब और वसूली देखने के लिए तारीख चुनें।","پرانا حساب اور وصولی دیکھنے کے لیے تاریخ منتخب کریں۔","পুরোনো হিসাব ও আদায় দেখতে তারিখ বেছে নিন।","जुना हिशोब आणि वसुली पाहण्यासाठी तारीख निवडा.","கடந்த பதிவுகள் மற்றும் வசூலைப் பார்க்க தேதியைத் தேர்ந்தெடுக்கவும்.","Selecciona una fecha para ver registros y pagos anteriores.","Choisissez une date pour consulter les anciens relevés et paiements.","اختر تاريخًا لعرض السجلات والتحصيلات السابقة.","Selecione uma data para ver registros e pagamentos anteriores.","Pilih tanggal untuk melihat catatan dan pembayaran sebelumnya."],"SELECTED DAY":["SELECTED DAY","SELECTED DAY","चुना हुआ दिन","منتخب دن","নির্বাচিত দিন","निवडलेला दिवस","தேர்ந்தெடுத்த நாள்","DÍA SELECCIONADO","JOUR SÉLECTIONNÉ","اليوم المحدد","DIA SELECIONADO","HARI DIPILIH"],"Payment received":["Payment received","Payment received","प्राप्त भुगतान","وصول شدہ ادائیگی","প্রাপ্ত পেমেন্ট","मिळालेले पैसे","பெறப்பட்ட கட்டணம்","Pago recibido","Paiement reçu","الدفعة المستلمة","Pagamento recebido","Pembayaran diterima"],"Sale ke saath mila":["Received with sales","Sale ke saath mila","बिक्री के साथ मिला","فروخت کے ساتھ موصول","বিক্রির সঙ্গে পাওয়া","विक्रीसोबत मिळाले","விற்பனையுடன் பெறப்பட்டது","Recibido con ventas","Reçu avec les ventes","المستلم مع المبيعات","Recebido com as vendas","Diterima dari penjualan"],"Is din ki sales":["Sales for this day","Is din ki sales","इस दिन की बिक्री","اس دن کی فروخت","এই দিনের বিক্রি","या दिवसाची विक्री","இந்த நாளின் விற்பனை","Ventas de este día","Ventes de ce jour","مبيعات هذا اليوم","Vendas deste dia","Penjualan hari ini"],"Is din ki bikri":["Sales for this day","Is din ki bikri","इस दिन की बिक्री","اس دن کی فروخت","এই দিনের বিক্রি","या दिवसाची विक्री","இந்த நாளின் விற்பனை","Ventas de este día","Ventes de ce jour","مبيعات هذا اليوم","Vendas deste dia","Penjualan hari ini"],"Is din ka naya baaki":["New balance for this day","Is din ka naya baaki","इस दिन का नया बकाया","اس دن کا نیا بقایا","এই দিনের নতুন বাকি","या दिवसाची नवीन उधारी","இந்த நாளின் புதிய நிலுவை","Nuevo saldo del día","Nouveau solde du jour","الرصيد الجديد لهذا اليوم","Novo saldo do dia","Saldo baru hari ini"],"Purana paisa jama":["Previous credit collected","Purana paisa jama","पुराना बकाया वसूला","پرانا بقایا وصول ہوا","পুরোনো বাকি আদায়","जुनी उधारी जमा","பழைய நிலுவை வசூல்","Crédito anterior cobrado","Ancien crédit recouvré","تحصيل الرصيد السابق","Crédito anterior recebido","Kredit lama tertagih"],"Is date par koi sale nahi":["No sales on this date","Is date par koi sale nahi","इस तारीख को कोई बिक्री नहीं","اس تاریخ کو کوئی فروخت نہیں","এই তারিখে কোনো বিক্রি নেই","या तारखेला विक्री नाही","இந்தத் தேதியில் விற்பனை இல்லை","No hay ventas en esta fecha","Aucune vente à cette date","لا توجد مبيعات في هذا التاريخ","Não há vendas nesta data","Tidak ada penjualan pada tanggal ini"],"Doosri date select karke us din ka hisaab dekhein.":["Select another date to view that day's records.","Doosri date select karke us din ka hisaab dekhein.","उस दिन का हिसाब देखने के लिए दूसरी तारीख चुनें।","اس دن کا حساب دیکھنے کے لیے دوسری تاریخ منتخب کریں۔","সেই দিনের হিসাব দেখতে অন্য তারিখ বেছে নিন।","त्या दिवसाचा हिशोब पाहण्यासाठी दुसरी तारीख निवडा.","அந்த நாளின் கணக்கைப் பார்க்க வேறு தேதியைத் தேர்ந்தெடுக்கவும்.","Selecciona otra fecha para ver sus registros.","Choisissez une autre date pour consulter ses relevés.","اختر تاريخًا آخر لعرض سجلاته.","Selecione outra data para ver os registros daquele dia.","Pilih tanggal lain untuk melihat catatan hari itu."],"Is din ki recoveries":["Payments collected this day","Is din ki recoveries","इस दिन की वसूली","اس دن کی وصولیاں","এই দিনের আদায়","या दिवसाची वसुली","இந்த நாளின் வசூல்கள்","Pagos recibidos este día","Paiements reçus ce jour","الدفعات المستلمة اليوم","Pagamentos recebidos neste dia","Pembayaran hari ini"],"Udhaar jama entries":["Credit payments","Udhaar jama entries","उधार जमा प्रविष्टियाँ","ادھار کی ادائیگیوں کے اندراجات","বাকি জমার এন্ট্রি","उधारी जमा नोंदी","கடன் செலுத்தல் பதிவுகள்","Pagos de crédito","Paiements de crédit","إدخالات سداد الديون","Pagamentos de crédito","Catatan pembayaran kredit"],"Roz ke kaam, ek tap mein":["Daily tasks, one tap away","Roz ke kaam, ek tap mein","रोज़ के काम, एक टैप में","روزمرہ کام، ایک ٹیپ میں","দৈনিক কাজ, এক ট্যাপে","दैनिक कामे, एका टॅपमध्ये","தினசரி பணிகள், ஒரே தொடுதலில்","Tareas diarias, a un toque","Tâches quotidiennes en un clic","المهام اليومية بلمسة","Tarefas diárias com um toque","Tugas harian, sekali ketuk"],"Nayi bikri add karein":["Add a new sale","Nayi bikri add karein","नई बिक्री जोड़ें","نئی فروخت شامل کریں","নতুন বিক্রি যোগ করুন","नवीन विक्री जोडा","புதிய விற்பனையைச் சேர்க்கவும்","Añadir una venta","Ajouter une vente","إضافة عملية بيع","Adicionar uma venda","Tambah penjualan"],"Item, quantity aur payment save karein":["Save item, quantity and payment","Item, quantity aur payment save karein","सामान, मात्रा और भुगतान सेव करें","آئٹم، مقدار اور ادائیگی محفوظ کریں","পণ্য, পরিমাণ ও পেমেন্ট সংরক্ষণ করুন","वस्तू, प्रमाण आणि पेमेंट जतन करा","பொருள், அளவு மற்றும் கட்டணத்தைச் சேமிக்கவும்","Guardar artículo, cantidad y pago","Enregistrer l'article, la quantité et le paiement","احفظ الصنف والكمية والدفع","Salvar item, quantidade e pagamento","Simpan barang, jumlah, dan pembayaran"],"Udhaar jama karein":["Record a credit payment","Udhaar jama karein","उधार जमा करें","ادھار کی ادائیگی درج کریں","বাকি জমা লিখুন","उधारी जमा करा","கடன் தொகையைப் பதிவு செய்யவும்","Registrar pago de crédito","Enregistrer un paiement de crédit","تسجيل دفعة ائتمان","Registrar pagamento de crédito","Catat pembayaran kredit"],"Customer se mila paisa record karein":["Record money received from a customer","Customer se mila paisa record karein","ग्राहक से मिला पैसा दर्ज करें","گاہک سے موصول رقم درج کریں","গ্রাহকের কাছ থেকে পাওয়া টাকা লিখুন","ग्राहकाकडून मिळालेले पैसे नोंदवा","வாடிக்கையாளரிடமிருந்து பெற்ற பணத்தைப் பதிவு செய்யவும்","Registrar el dinero recibido del cliente","Enregistrer l'argent reçu du client","سجّل المبلغ المستلم من العميل","Registre o dinheiro recebido do cliente","Catat uang yang diterima dari pelanggan"],"Kisi bhi din ki entry kholein":["Open entries for any day","Kisi bhi din ki entry kholein","किसी भी दिन की प्रविष्टियाँ खोलें","کسی بھی دن کے اندراجات کھولیں","যেকোনো দিনের এন্ট্রি খুলুন","कोणत्याही दिवसाच्या नोंदी उघडा","எந்த நாளின் பதிவுகளையும் திறக்கவும்","Abre entradas de cualquier día","Ouvrez les entrées de n'importe quel jour","افتح إدخالات أي يوم","Abra entradas de qualquer dia","Buka catatan hari apa pun"],"Saari entries":["All entries","Saari entries","सभी प्रविष्टियाँ","تمام اندراجات","সব এন্ট্রি","सर्व नोंदी","அனைத்து பதிவுகள்","Todas las entradas","Toutes les entrées","كل الإدخالات","Todas as entradas","Semua catatan"],"Apni latest saved bikri":["Your latest saved sales","Apni latest saved bikri","आपकी हाल की बिक्री","آپ کی حالیہ فروخت","আপনার সাম্প্রতিক বিক্রি","तुमची अलीकडील विक्री","உங்கள் சமீபத்திய விற்பனைகள்","Tus ventas recientes","Vos ventes récentes","أحدث مبيعاتك","Suas vendas recentes","Penjualan terbaru Anda"],"Private by design · Local device storage":["Private by design · Local device storage","Privacy ka dhyan · Data isi device mein","डिज़ाइन से निजी · डेटा इसी डिवाइस में","خصوصی ڈیزائن · ڈیٹا اسی ڈیوائس میں","গোপনীয়তা · ডেটা এই ডিভাইসে","खासगीपणा · डेटा याच डिव्हाइसवर","தனியுரிமை · தரவு இந்தச் சாதனத்தில்","Privado por diseño · Almacenamiento local","Privé par conception · Stockage local","خصوصية حسب التصميم · تخزين محلي","Privado por design · Armazenamento local","Privat · Penyimpanan lokal"],"Private by design — koi account nahi, koi server upload nahi. Aapka hisaab isi browser ke local storage mein rehta hai.":["Private by design — no account or server upload. Your records stay in this browser's local storage.","Private by design — koi account nahi, koi server upload nahi. Aapka hisaab isi browser ke local storage mein rehta hai.","निजता सुरक्षित — कोई अकाउंट या सर्वर अपलोड नहीं। आपका हिसाब इसी ब्राउज़र के लोकल स्टोरेज में रहता है।","رازداری محفوظ — کوئی اکاؤنٹ یا سرور اپ لوڈ نہیں۔ آپ کا حساب اسی براؤزر کے مقامی اسٹوریج میں رہتا ہے۔","গোপনীয়তা বজায় থাকে — কোনো অ্যাকাউন্ট বা সার্ভার আপলোড নেই। হিসাব এই ব্রাউজারের লোকাল স্টোরেজে থাকে।","खासगीपणा जपला जातो — खाते किंवा सर्व्हर अपलोड नाही. तुमचा हिशोब याच ब्राउझरमध्ये राहतो.","தனியுரிமை பாதுகாக்கப்படுகிறது — கணக்கு அல்லது சர்வர் பதிவேற்றம் இல்லை. உங்கள் கணக்கு இந்த உலாவியிலேயே இருக்கும்.","Privado por diseño: sin cuenta ni carga al servidor. Tus datos quedan en este navegador.","Confidentialité : aucun compte ni envoi au serveur. Vos données restent dans ce navigateur.","خصوصية مضمونة — لا حساب ولا رفع للخادم. تبقى سجلاتك في هذا المتصفح.","Privado por design — sem conta nem envio ao servidor. Seus registros ficam neste navegador.","Privat sejak desain — tanpa akun atau unggahan server. Catatan tetap di browser ini."],"History date":["History date","History date","इतिहास की तारीख","تاریخِ ریکارڈ","ইতিহাসের তারিখ","इतिहासाची तारीख","வரலாற்றுத் தேதி","Fecha del historial","Date de l'historique","تاريخ السجل","Data do histórico","Tanggal riwayat"],"Clear search":["Clear search","Search saaf karein","खोज हटाएँ","تلاش صاف کریں","অনুসন্ধান মুছুন","शोध साफ करा","தேடலை அழிக்கவும்","Borrar búsqueda","Effacer la recherche","مسح البحث","Limpar pesquisa","Hapus pencarian"],"Open New sale":["Open new sale","Nayi bikri kholein","नई बिक्री खोलें","نئی فروخت کھولیں","নতুন বিক্রি খুলুন","नवीन विक्री उघडा","புதிய விற்பனையைத் திறக்கவும்","Abrir nueva venta","Ouvrir une nouvelle vente","فتح عملية بيع جديدة","Abrir nova venda","Buka penjualan baru"],"Help & tutorials":["Help & tutorials","Help & tutorials","मदद और ट्यूटोरियल","مدد اور رہنما","সহায়তা ও টিউটোরিয়াল","मदत आणि शिकवण्या","உதவி மற்றும் பயிற்சிகள்","Ayuda y tutoriales","Aide et tutoriels","المساعدة والشروحات","Ajuda e tutoriais","Bantuan & tutorial"],"Dashboard":["Dashboard","Dashboard","डैशबोर्ड","ڈیش بورڈ","ড্যাশবোর্ড","डॅशबोर्ड","டாஷ்போர்டு","Panel","Tableau de bord","لوحة التحكم","Painel","Dasbor"],"Customer credit":["Customer credit","Customer udhaar","ग्राहक उधार","گاہک کا ادھار","গ্রাহকের বাকি","ग्राहक उधारी","வாடிக்கையாளர் கடன்","Crédito del cliente","Crédit client","ائتمان العميل","Crédito do cliente","Kredit pelanggan"],"Daily history":["Daily history","Daily history","दैनिक इतिहास","روزانہ کی تاریخ","দৈনিক ইতিহাস","दैनिक इतिहास","தினசரி வரலாறு","Historial diario","Historique quotidien","السجل اليومي","Histórico diário","Riwayat harian"],"WORKSPACE":["WORKSPACE","WORKSPACE","कार्यक्षेत्र","ورک اسپیس","কর্মক্ষেত্র","कार्यक्षेत्र","பணியிடம்","ESPACIO DE TRABAJO","ESPACE DE TRAVAIL","مساحة العمل","ESPAÇO DE TRABALHO","RUANG KERJA"],"YOUR SHOP":["YOUR SHOP","Aapki dukaan","आपकी दुकान","آپ کی دکان","আপনার দোকান","तुमचे दुकान","உங்கள் கடை","Tu tienda","Votre boutique","متجرك","Sua loja","Toko Anda"],"SMART SHOP HISAB":["SMART SHOP HISAB","SMART SHOP HISAB","स्मार्ट दुकान हिसाब","اسمارٹ دکان حساب","স্মার্ট দোকানের হিসাব","स्मार्ट दुकान हिशोब","ஸ்மார்ட் கடை கணக்கு","Cuentas inteligentes","Comptes malins","حسابات ذكية","Contas inteligentes","Hisab toko pintar"],"Your records stay in this browser.":["Your records stay in this browser.","Aapka hisaab isi browser mein rehta hai.","आपका हिसाब इसी ब्राउज़र में रहता है।","آپ کا حساب اسی براؤزر میں رہتا ہے۔","আপনার হিসাব এই ব্রাউজারেই থাকে।","तुमचा हिशोब याच ब्राउझरमध्ये राहतो.","உங்கள் பதிவுகள் இந்த உலாவியிலேயே இருக்கும்.","Tus registros quedan en este navegador.","Vos données restent dans ce navigateur.","تبقى سجلاتك في هذا المتصفح.","Seus registros ficam neste navegador.","Catatan tetap di browser ini."],"Daily sales":["Daily sales","Daily sales","दैनिक बिक्री","روزانہ فروخت","দৈনিক বিক্রি","दैनिक विक्री","தினசரி விற்பனை","Ventas diarias","Ventes quotidiennes","المبيعات اليومية","Vendas diárias","Penjualan harian"],"Today":["Today","Aaj","आज","آج","আজ","आज","இன்று","Hoy","Aujourd’hui","اليوم","Hoje","Hari ini"],"Manage ↗":["Manage ↗","Manage ↗","प्रबंधित करें ↗","انتظام ↗","পরিচালনা ↗","व्यवस्थापित करा ↗","நிர்வகிக்க ↗","Gestionar ↗","Gérer ↗","إدارة ↗","Gerenciar ↗","Kelola ↗"],"Khata dekhein ↗":["View ledger ↗","Khata dekhein ↗","खाता देखें ↗","کھاتہ دیکھیں ↗","খাতা দেখুন ↗","खाते पाहा ↗","கணக்கைப் பார்க்க ↗","Ver cuenta ↗","Voir le compte ↗","عرض الحساب ↗","Ver conta ↗","Lihat buku ↗"],"Today's sales total":["Today's sales total","Aaj ki total bikri","आज की कुल बिक्री","آج کی کل فروخت","আজকের মোট বিক্রি","आजची एकूण विक्री","இன்றைய மொத்த விற்பனை","Ventas de hoy","Ventes du jour","إجمالي مبيعات اليوم","Vendas de hoje","Total penjualan hari ini"],"bills":["bills","bills","बिल","بل","বিল","बिले","பில்கள்","facturas","factures","فواتير","contas","tagihan"],"recovered":["recovered","vasool hua","वसूला गया","وصول شدہ","আদায় হয়েছে","वसूल झाले","வசூலிக்கப்பட்டது","recuperado","recouvré","تم تحصيله","recuperado","tertagih"],"New credit":["New credit","Naya udhaar","नया उधार","نیا ادھار","নতুন বাকি","नवीन उधारी","புதிய கடன்","Nuevo crédito","Nouveau crédit","ائتمان جديد","Novo crédito","Kredit baru"],"Total owed":["Total owed","Kul baaki","कुल बकाया","کل بقایا","মোট বাকি","एकूण बाकी","மொத்த நிலுவை","Total pendiente","Total dû","إجمالي المستحق","Total em aberto","Total terutang"],"Recent entries":["Recent entries","Haal ki entries","हाल की प्रविष्टियाँ","حالیہ اندراجات","সাম্প্রতিক এন্ট্রি","अलीकडील नोंदी","சமீபத்திய பதிவுகள்","Entradas recientes","Entrées récentes","الإدخالات الأخيرة","Entradas recentes","Catatan terbaru"],"Quick actions":["Quick actions","Quick actions","झटपट काम","فوری کام","দ্রুত কাজ","जलद कृती","விரைவு செயல்கள்","Acciones rápidas","Actions rapides","إجراءات س rapides","Ações rápidas","Aksi cepat"],"SALES REGISTER":["SALES REGISTER","SALES REGISTER","बिक्री रजिस्टर","سیلز رجسٹر","বিক্রয় রেজিস্টার","विक्री नोंदवही","விற்பனைப் பதிவு","REGISTRO DE VENTAS","REGISTRE DES VENTES","سجل المبيعات","REGISTRO DE VENDAS","DAFTAR PENJUALAN"],"Is din ki sales":["Sales for this day","Is din ki sales","इस दिन की बिक्री","اس دن کی فروخت","এই দিনের বিক্রি","या दिवसाची विक्री","இந்த நாளின் விற்பனை","Ventas de este día","Ventes de ce jour","مبيعات هذا اليوم","Vendas deste dia","Penjualan hari ini"],"Koi jama entry nahi":["No payments recorded","Koi jama entry nahi","कोई भुगतान दर्ज नहीं है","کوئی ادائیگی درج نہیں","কোনো জমা এন্ট্রি নেই","कोणतीही जमा नोंद नाही","பணம் செலுத்திய பதிவு இல்லை","No hay pagos registrados","Aucun paiement enregistré","لا توجد دفعات مسجلة","Nenhum pagamento registrado","Belum ada pembayaran"],"Jab customer udhaar chukaye, uski entry yahan karein.":["Record a payment here when a customer repays credit.","Jab customer udhaar chukaye, uski entry yahan karein.","ग्राहक उधार चुकाए तो यहाँ भुगतान दर्ज करें।","جب گاہک ادھار چکائے تو یہاں ادائیگی درج کریں۔","গ্রাহক বাকি শোধ করলে এখানে এন্ট্রি করুন।","ग्राहकाने उधारी फेडल्यावर येथे नोंद करा.","வாடிக்கையாளர் கடனைத் திருப்பிச் செலுத்தும்போது இங்கே பதிவு செய்யவும்.","Registra aquí el pago cuando un cliente abone su crédito.","Enregistrez ici le paiement lorsqu'un client rembourse son crédit.","سجّل الدفعة هنا عندما يسدد العميل دينه.","Registre aqui o pagamento quando o cliente quitar o crédito.","Catat pembayaran saat pelanggan melunasi kredit."],"Aaj ki total bikri":["Today's total sales","Aaj ki total bikri","आज की कुल बिक्री","آج کی کل فروخت","আজকের মোট বিক্রি","आजची एकूण विक्री","இன்றைய மொத்த விற்பனை","Ventas totales de hoy","Ventes totales du jour","إجمالي مبيعات اليوم","Vendas totais de hoje","Total penjualan hari ini"],"Sale payment + udhaar recovery":["Sale payments + credit collected","Sale payment + udhaar recovery","बिक्री का भुगतान + उधार वसूली","فروخت کی ادائیگی + ادھار وصولی","বিক্রির পেমেন্ট + বাকি আদায়","विक्री पेमेंट + उधारी वसुली","விற்பனைப் பணம் + கடன் வசூல்","Pagos de ventas + crédito cobrado","Paiements des ventes + crédit recouvré","مدفوعات المبيعات + تحصيل الائتمان","Pagamentos de vendas + crédito recebido","Pembayaran penjualan + kredit tertagih"],"Aaj customers ko diya":["Credit given to customers today","Aaj customers ko diya","आज ग्राहकों को दिया गया उधार","آج گاہکوں کو دیا گیا ادھار","আজ গ্রাহকদের দেওয়া বাকি","आज ग्राहकांना दिलेली उधारी","இன்று வாடிக்கையாளர்களுக்கு வழங்கிய கடன்","Crédito dado hoy a clientes","Crédit accordé aujourd'hui","الائتمان الممنوح للعملاء اليوم","Crédito concedido hoje","Kredit yang diberikan hari ini"],"0 customers ka udhaar":["0 customers owe you","0 customers ka udhaar","0 ग्राहकों का बकाया","0 گاہکوں کا بقایا","০ জন গ্রাহকের বাকি","० ग्राहकांची उधारी","0 வாடிக்கையாளர்களின் நிலுவை","0 clientes te deben","0 client vous doivent","0 عميل مدين لك","0 clientes devem","0 pelanggan berutang"],"Bikri ka trend":["Sales trend","Bikri ka trend","बिक्री का रुझान","فروخت کا رجحان","বিক্রির প্রবণতা","विक्रीचा कल","விற்பனைப் போக்கு","Tendencia de ventas","Tendance des ventes","اتجاه المبيعات","Tendência de vendas","Tren penjualan"],"Pichhle 7 din ki total sales":["Total sales over the last 7 days","Pichhle 7 din ki total sales","पिछले 7 दिनों की कुल बिक्री","گزشتہ 7 دنوں کی کل فروخت","গত ৭ দিনের মোট বিক্রি","मागील ७ दिवसांची एकूण विक्री","கடந்த 7 நாட்களின் மொத்த விற்பனை","Ventas totales de los últimos 7 días","Ventes totales des 7 derniers jours","إجمالي المبيعات خلال آخر 7 أيام","Vendas totais dos últimos 7 dias","Total penjualan 7 hari terakhir"],"7 din ka total":["7-day total","7 din ka total","7 दिनों का कुल","7 دن کا مجموعہ","৭ দিনের মোট","७ दिवसांची एकूण रक्कम","7 நாள் மொத்தம்","Total de 7 días","Total sur 7 jours","إجمالي 7 أيام","Total de 7 dias","Total 7 hari"],"Add a new sale":["Add a new sale","Nayi bikri","नई बिक्री जोड़ें","نئی فروخت شامل کریں","নতুন বিক্রি যোগ করুন","नवीन विक्री जोडा","புதிய விற்பனையைச் சேர்க்கவும்","Añadir una venta","Ajouter une vente","إضافة عملية بيع","Adicionar uma venda","Tambah penjualan"],"Item aur payment ki details bharein.":["Enter item and payment details.","Item aur payment ki details bharein.","सामान और भुगतान की जानकारी भरें।","آئٹم اور ادائیگی کی تفصیلات درج کریں۔","পণ্য ও পেমেন্টের তথ্য দিন।","वस्तू आणि पेमेंटचे तपशील भरा.","பொருள் மற்றும் கட்டண விவரங்களை உள்ளிடவும்.","Introduce los detalles del artículo y el pago.","Saisissez les détails de l'article et du paiement.","أدخل تفاصيل الصنف والدفع.","Insira os detalhes do item e do pagamento.","Masukkan detail barang dan pembayaran."],"Date":["Date","Date","तारीख","تاریخ","তারিখ","तारीख","தேதி","Fecha","Date","التاريخ","Data","Tanggal"],"Item ka naam":["Item name","Item ka naam","सामान का नाम","آئٹم کا نام","পণ্যের নাম","वस्तूचे नाव","பொருளின் பெயர்","Nombre del artículo","Nom de l'article","اسم الصنف","Nome do item","Nama barang"],"Quantity":["Quantity","Quantity","मात्रा","مقدار","পরিমাণ","प्रमाण","அளவு","Cantidad","Quantité","الكمية","Quantidade","Jumlah"],"Unit":["Unit","Unit","इकाई","اکائی","একক","एकक","அலகு","Unidad","Unité","الوحدة","Unidade","Satuan"],"Rate (₹)":["Rate (₹)","Rate (₹)","दर (₹)","قیمت (₹)","দর (₹)","दर (₹)","விலை (₹)","Precio (₹)","Prix (₹)","السعر (₹)","Preço (₹)","Harga (₹)"],"Abhi mila (₹)":["Received now (₹)","Abhi mila (₹)","अभी मिला (₹)","ابھی موصول (₹)","এখন পেলাম (₹)","आत्ता मिळाले (₹)","இப்போது பெற்றது (₹)","Recibido ahora (₹)","Reçu maintenant (₹)","المبلغ المستلم الآن (₹)","Recebido agora (₹)","Diterima sekarang (₹)"],"Payment mode":["Payment method","Payment mode","भुगतान का तरीका","ادائیگی کا طریقہ","পেমেন্টের ধরন","पेमेंट पद्धत","கட்டண முறை","Método de pago","Mode de paiement","طريقة الدفع","Forma de pagamento","Metode pembayaran"],"Customer naam (optional)":["Customer name (optional)","Customer naam (optional)","ग्राहक का नाम (वैकल्पिक)","گاہک کا نام (اختیاری)","গ্রাহকের নাম (ঐচ্ছিক)","ग्राहकाचे नाव (ऐच्छिक)","வாடிக்கையாளர் பெயர் (விருப்பம்)","Nombre del cliente (opcional)","Nom du client (facultatif)","اسم العميل (اختياري)","Nome do cliente (opcional)","Nama pelanggan (opsional)"],"Note (optional)":["Note (optional)","Note (optional)","नोट (वैकल्पिक)","نوٹ (اختیاری)","নোট (ঐচ্ছিক)","टीप (ऐच्छिक)","குறிப்பு (விருப்பம்)","Nota (opcional)","Note (facultative)","ملاحظة (اختياري)","Nota (opcional)","Catatan (opsional)"],"Sale save karein":["Save sale","Sale save karein","बिक्री सेव करें","فروخت محفوظ کریں","বিক্রি সংরক্ষণ করুন","विक्री जतन करा","விற்பனையைச் சேமிக்கவும்","Guardar venta","Enregistrer la vente","حفظ البيع","Salvar venda","Simpan penjualan"],"Cancel":["Cancel","Cancel","रद्द करें","منسوخ کریں","বাতিল","रद्द करा","ரத்து செய்","Cancelar","Annuler","إلغاء","Cancelar","Batal"],"Total bill":["Total bill","Total bill","कुल बिल","کل بل","মোট বিল","एकूण बिल","மொத்த பில்","Factura total","Total de la facture","إجمالي الفاتورة","Total da conta","Total tagihan"],"Baaki udhaar":["Credit remaining","Baaki udhaar","बाकी उधार","باقی ادھار","বাকি ঋণ","बाकी उधारी","மீதமுள்ள கடன்","Crédito pendiente","Crédit restant","الائتمان المتبقي","Crédito restante","Sisa kredit"],"Udhaar ho to naam likhein":["Enter name if buying on credit","Udhaar ho to naam likhein","उधार हो तो नाम लिखें","ادھار ہو تو نام لکھیں","বাকি হলে নাম লিখুন","उधारी असल्यास नाव लिहा","கடன் என்றால் பெயரை எழுதவும்","Escribe el nombre si es a crédito","Indiquez le nom en cas de crédit","اكتب الاسم إذا كان بالدين","Informe o nome se for a crédito","Masukkan nama jika berutang"],"Koi extra details...":["Any extra details...","Koi extra details...","कोई अतिरिक्त जानकारी...","کوئی اضافی تفصیل...","অতিরিক্ত তথ্য...","अतिरिक्त तपशील...","கூடுதல் விவரங்கள்...","Detalles adicionales...","Détails supplémentaires...","أي تفاصيل إضافية...","Detalhes adicionais...","Detail tambahan..."],"Enter item name":["Enter item name","Item ka naam likhein","सामान का नाम लिखें","آئٹم کا نام درج کریں","পণ্যের নাম লিখুন","वस्तूचे नाव लिहा","பொருளின் பெயரை உள்ளிடவும்","Introduce el nombre del artículo","Saisissez le nom de l'article","أدخل اسم الصنف","Insira o nome do item","Masukkan nama barang"],"Abhi mila (₹) *":["Received now (₹) *","Abhi mila (₹) *","अभी मिला (₹) *","ابھی موصول (₹) *","এখন পেলাম (₹) *","आत्ता मिळाले (₹) *","இப்போது பெற்றது (₹) *","Recibido ahora (₹) *","Reçu maintenant (₹) *","المبلغ المستلم الآن (₹) *","Recebido agora (₹) *","Diterima sekarang (₹) *"],"Today's business summary":["Today's business summary","Aaj ka business summary","आज के कारोबार का सार","آج کے کاروبار کا خلاصہ","আজকের ব্যবসার সারাংশ","आजच्या व्यवसायाचा सारांश","இன்றைய வணிகச் சுருக்கம்","Resumen del negocio de hoy","Résumé de l'activité du jour","ملخص أعمال اليوم","Resumo dos negócios de hoje","Ringkasan bisnis hari ini"],"Today's sales total":["Today's sales total","Aaj ki total bikri","आज की कुल बिक्री","آج کی کل فروخت","আজকের মোট বিক্রি","आजची एकूण विक्री","இன்றைய மொத்த விற்பனை","Ventas totales de hoy","Ventes totales du jour","إجمالي مبيعات اليوم","Vendas totais de hoje","Total penjualan hari ini"],"Sale payment + credit collected":["Sale payments + credit collected","Sale payment + udhaar recovery","बिक्री भुगतान + वसूला गया उधार","فروخت کی ادائیگیاں + وصول شدہ ادھار","বিক্রির পেমেন্ট + আদায় করা বাকি","विक्री पेमेंट + वसूल केलेली उधारी","விற்பனை கட்டணம் + வசூலித்த கடன்","Pagos de ventas + crédito cobrado","Paiements des ventes + crédit recouvré","مدفوعات المبيعات + تحصيل الائتمان","Pagamentos de vendas + crédito recebido","Pembayaran penjualan + kredit tertagih"],"Khata dekhein ↗":["View ledger ↗","Khata dekhein ↗","खाता देखें ↗","کھاتہ دیکھیں ↗","খাতা দেখুন ↗","खाते पाहा ↗","கணக்கைப் பார்க்க ↗","Ver cuenta ↗","Voir le compte ↗","عرض الحساب ↗","Ver conta ↗","Lihat buku ↗"],"Manage ↗":["Manage ↗","Manage ↗","प्रबंधित करें ↗","انتظام ↗","পরিচালনা ↗","व्यवस्थापित करा ↗","நிர்வகிக்க ↗","Gestionar ↗","Gérer ↗","إدارة ↗","Gerenciar ↗","Kelola ↗"],"Is din ki recoveries":["Payments collected this day","Is din ki recoveries","इस दिन की वसूली","اس دن کی وصولیاں","এই দিনের আদায়","या दिवसाची वसुली","இந்த நாளின் வசூல்கள்","Pagos recibidos este día","Paiements reçus ce jour","الدفعات المستلمة اليوم","Pagamentos recebidos neste dia","Pembayaran hari ini"],"Udhaar jama entries":["Credit payments","Udhaar jama entries","उधार जमा प्रविष्टियाँ","ادھار کی ادائیگیوں کے اندراجات","বাকি জমার এন্ট্রি","उधारी जमा नोंदी","கடன் செலுத்தல் பதிவுகள்","Pagos de crédito","Paiements de crédit","إدخالات سداد الديون","Pagamentos de crédito","Catatan pembayaran kredit"],"Today":["Today","Aaj","आज","آج","আজ","आज","இன்று","Hoy","Aujourd’hui","اليوم","Hoje","Hari ini"],"Private by design · Local device storage":["Private by design · Local device storage","Privacy ka dhyan · Data isi device mein","डिज़ाइन से निजी · डेटा इसी डिवाइस में","خصوصی ڈیزائن · ڈیٹا اسی ڈیوائس میں","গোপনীয়তা · ডেটা এই ডিভাইসে","खासगीपणा · डेटा याच डिव्हाइसवर","தனியுரிமை · தரவு இந்தச் சாதனத்தில்","Privado por diseño · Almacenamiento local","Privé par conception · Stockage local","خصوصية حسب التصميم · تخزين محلي","Privado por design · Armazenamento local","Privat · Penyimpanan lokal"],"SMART SHOP HISAB":["SMART SHOP HISAB","SMART SHOP HISAB","स्मार्ट दुकान हिसाब","اسمارٹ دکان حساب","স্মার্ট দোকানের হিসাব","स्मार्ट दुकान हिशोब","ஸ்மார்ட் கடை கணக்கு","CUENTAS INTELIGENTES","COMPTES MALINS","حسابات ذكية","CONTAS INTELIGENTES","HISAB TOKO PINTAR"],"WORKSPACE":["WORKSPACE","WORKSPACE","कार्यक्षेत्र","ورک اسپیس","কর্মক্ষেত্র","कार्यक्षेत्र","பணியிடம்","ESPACIO DE TRABAJO","ESPACE DE TRAVAIL","مساحة العمل","ESPAÇO DE TRABALHO","RUANG KERJA"],"YOUR SHOP":["YOUR SHOP","Aapki dukaan","आपकी दुकान","آپ کی دکان","আপনার দোকান","तुमचे दुकान","உங்கள் கடை","TU TIENDA","VOTRE BOUTIQUE","متجرك","SUA LOJA","TOKO ANDA"],"Your records stay in this browser.":["Your records stay in this browser.","Aapka hisaab isi browser mein rehta hai.","आपका हिसाब इसी ब्राउज़र में रहता है।","آپ کا حساب اسی براؤزر میں رہتا ہے۔","আপনার হিসাব এই ব্রাউজারেই থাকে।","तुमचा हिशोब याच ब्राउझरमध्ये राहतो.","உங்கள் பதிவுகள் இந்த உலாவியிலேயே இருக்கும்.","Tus registros quedan en este navegador.","Vos données restent dans ce navigateur.","تبقى سجلاتك في هذا المتصفح.","Seus registros ficam neste navegador.","Catatan tetap di browser ini."],"Today's business summary":["Today's business summary","Aaj ka business summary","आज के कारोबार का सार","آج کے کاروبار کا خلاصہ","আজকের ব্যবসার সারাংশ","आजच्या व्यवसायाचा सारांश","இன்றைய வணிகச் சுருக்கம்","Resumen del negocio de hoy","Résumé de l’activité du jour","ملخص أعمال اليوم","Resumo do negócio de hoje","Ringkasan bisnis hari ini"],"Aaj ka business summary":["Today's business summary","Aaj ka business summary","आज के कारोबार का सार","آج کے کاروبار کا خلاصہ","আজকের ব্যবসার সারাংশ","आजच्या व्यवसायाचा सारांश","இன்றைய வணிகச் சுருக்கம்","Resumen del negocio de hoy","Résumé de l’activité du jour","ملخص أعمال اليوم","Resumo do negócio de hoje","Ringkasan bisnis hari ini"],"Aaj ki total bikri":["Today's total sales","Aaj ki total bikri","आज की कुल बिक्री","آج کی کل فروخت","আজকের মোট বিক্রি","आजची एकूण विक्री","இன்றைய மொத்த விற்பனை","Ventas totales de hoy","Ventes totales du jour","إجمالي مبيعات اليوم","Vendas totais de hoje","Total penjualan hari ini"],"Sale payment + udhaar recovery":["Sales payments + credit recovered","Sale payment + udhaar recovery","बिक्री भुगतान + उधार वसूली","فروخت کی ادائیگیاں + ادھار کی وصولی","বিক্রির পেমেন্ট + বাকি আদায়","विक्री पेमेंट + उधारी वसुली","விற்பனை கட்டணம் + கடன் வசூல்","Pagos de ventas + crédito cobrado","Paiements des ventes + crédit recouvré","مدفوعات المبيعات + تحصيل الائتمان","Pagamentos de vendas + crédito recebido","Pembayaran penjualan + kredit tertagih"],"Aaj customers ko diya":["New credit given today","Aaj customers ko diya","आज ग्राहकों को दिया गया उधार","آج گاہکوں کو دیا گیا ادھار","আজ গ্রাহকদের দেওয়া বাকি","आज ग्राहकांना दिलेली उधारी","இன்று வாடிக்கையாளர்களுக்கு வழங்கிய கடன்","Crédito entregado hoy","Crédit accordé aujourd’hui","الائتمان الممنوح اليوم","Crédito concedido hoje","Kredit diberikan hari ini"],"0 customers ka udhaar":["0 customers owe money","0 customers ka udhaar","0 ग्राहकों का बकाया","0 گاہکوں کا بقایا","০ গ্রাহকের বাকি","० ग्राहकांची उधारी","0 வாடிக்கையாளர்களின் நிலுவை","0 clientes deben dinero","0 client doivent de l’argent","لا توجد مبالغ مستحقة من العملاء","0 clientes devem dinheiro","0 pelanggan berutang"],"Khata dekhein ↗":["View ledger ↗","Khata dekhein ↗","खाता देखें ↗","کھاتہ دیکھیں ↗","খাতা দেখুন ↗","खाते पाहा ↗","கணக்கைப் பார்க்க ↗","Ver cuenta ↗","Voir le compte ↗","عرض الحساب ↗","Ver conta ↗","Lihat buku ↗"],"Manage ↗":["Manage ↗","Manage ↗","प्रबंधित करें ↗","انتظام کریں ↗","পরিচালনা করুন ↗","व्यवस्थापित करा ↗","நிர்வகிக்க ↗","Gestionar ↗","Gérer ↗","إدارة ↗","Gerenciar ↗","Kelola ↗"],"New credit":["New credit","Naya udhaar","नया उधार","نیا ادھار","নতুন বাকি","नवीन उधारी","புதிய கடன்","Nuevo crédito","Nouveau crédit","ائتمان جديد","Novo crédito","Kredit baru"],"TOTAL BAAKI":["TOTAL OWED","Kul baaki","कुल बकाया","کل بقایا","মোট বাকি","एकूण बाकी","மொத்த நிலுவை","TOTAL ADEUDADO","TOTAL DÛ","إجمالي المستحق","TOTAL EM ABERTO","TOTAL TERUTANG"],"TOTAL COLLECTION":["TOTAL COLLECTION","Kul jama","कुल जमा","کل وصولی","মোট জমা","एकूण जमा","மொத்த வசூல்","COBRO TOTAL","TOTAL ENCAISSÉ","إجمالي التحصيل","TOTAL RECEBIDO","TOTAL PENERIMAAN"],"TOTAL SALES":["TOTAL SALES","TOTAL SALES","कुल बिक्री","کل فروخت","মোট বিক্রি","एकूण विक्री","மொத்த விற்பனை","VENTAS TOTALES","VENTES TOTALES","إجمالي المبيعات","VENDAS TOTAIS","TOTAL PENJUALAN"],"PAYMENT RECEIVED":["PAYMENT RECEIVED","Payment received","प्राप्त भुगतान","موصولہ ادائیگی","প্রাপ্ত পেমেন্ট","मिळालेले पैसे","பெறப்பட்ட கட்டணம்","PAGO RECIBIDO","PAIEMENT REÇU","الدفعة المستلمة","PAGAMENTO RECEBIDO","PEMBAYARAN DITERIMA"],"Sales for this day":["Sales for this day","Is din ki bikri","इस दिन की बिक्री","اس دن کی فروخت","এই দিনের বিক্রি","या दिवसाची विक्री","இந்த நாளின் விற்பனை","Ventas de este día","Ventes de ce jour","مبيعات هذا اليوم","Vendas deste dia","Penjualan hari ini"],"Received with sales":["Received with sales","Sale ke saath mila","बिक्री के साथ मिला","فروخت کے ساتھ موصول","বিক্রির সঙ্গে পাওয়া","विक्रीसोबत मिळाले","விற்பனையுடன் பெறப்பட்டது","Recibido con ventas","Reçu avec les ventes","المستلم مع المبيعات","Recebido com as vendas","Diterima dari penjualan"],"Koi jama entry nahi":["No payment entries yet","Koi jama entry nahi","अभी तक कोई भुगतान प्रविष्टि नहीं","ابھی تک ادائیگی کا کوئی اندراج نہیں","এখনও কোনো পেমেন্ট এন্ট্রি নেই","अद्याप पेमेंटची नोंद नाही","இதுவரை கட்டணப் பதிவு இல்லை","Aún no hay pagos registrados","Aucun paiement enregistré","لا توجد دفعات مسجلة بعد","Ainda não há pagamentos registrados","Belum ada catatan pembayaran"],"Jab customer udhaar chukaye, uski entry yahan karein.":["When a customer repays credit, record it here.","Jab customer udhaar chukaye, uski entry yahan karein.","जब ग्राहक उधार चुकाए, तो उसकी प्रविष्टि यहाँ करें।","جب گاہک ادھار ادا کرے تو اس کا اندراج یہاں کریں۔","গ্রাহক বাকি পরিশোধ করলে এখানে লিখুন।","ग्राहकाने उधारी फेडल्यावर येथे नोंद करा.","வாடிக்கையாளர் கடனைத் திருப்பிச் செலுத்தும்போது இங்கே பதிவு செய்யுங்கள்.","Registra aquí cuando un cliente pague su crédito.","Enregistrez ici le remboursement d’un client.","سجّل هنا عندما يسدد العميل دينه.","Registre aqui quando um cliente pagar o crédito.","Catat di sini saat pelanggan membayar utangnya."],"Har din ka poora record.":["A complete record for every day.","Har din ka poora record.","हर दिन का पूरा रिकॉर्ड।","ہر دن کا مکمل ریکارڈ۔","প্রতিদিনের সম্পূর্ণ রেকর্ড।","प्रत्येक दिवसाची संपूर्ण नोंद.","ஒவ்வொரு நாளுக்குமான முழுப் பதிவு.","Un registro completo de cada día.","Un dossier complet pour chaque jour.","سجل كامل لكل يوم.","Um registro completo de cada dia.","Catatan lengkap setiap hari."],"Private by design · Local device storage":["Private by design · Local device storage","Privacy ka dhyan · Data isi device mein","निजता सुरक्षित · डेटा इसी डिवाइस में","رازداری محفوظ · ڈیٹا اسی ڈیوائس میں","গোপনীয়তা · ডেটা এই ডিভাইসে","खासगीपणा · डेटा याच डिव्हाइसवर","தனியுரிமை · தரவு இந்தச் சாதனத்தில்","Privado por diseño · Almacenamiento local","Privé par conception · Stockage local","خصوصية حسب التصميم · تخزين محلي","Privado por design · Armazenamento local","Privat · Penyimpanan lokal"]};
  const APP_LANGUAGE_INDEX = {"en":0,"hinglish":1,"hi":2,"ur":3,"bn":4,"mr":5,"ta":6,"es":7,"fr":8,"ar":9,"pt":10,"id":11};
  function translateVisibleText(root) {
    const index = APP_LANGUAGE_INDEX[currentLanguage] == null ? 0 : APP_LANGUAGE_INDEX[currentLanguage];
    const entries = Object.entries(APP_VISIBLE_TEXT).sort((a,b)=>b[0].length-a[0].length);
    const replaceText = value => {
      let out = value;
      for (const [source, translations] of entries) {
        const target = translations && translations[index];
        if (!target || source === target) continue;
        if (out.trim() === source) return out.replace(source, target);
        // Translate phrases embedded in a larger text node too, without touching markup.
        out = out.split(source).join(target);
      }
      return out;
    };
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (!node.parentElement || /^(SCRIPT|STYLE|OPTION)$/i.test(node.parentElement.tagName)) return;
      const raw = node.nodeValue;
      if (raw && raw.trim()) node.nodeValue = replaceText(raw);
    });
    root.querySelectorAll('[placeholder],[aria-label],[title]').forEach(el =>
      ['placeholder','aria-label','title'].forEach(attr => {
        if (el.hasAttribute(attr)) el.setAttribute(attr, replaceText(el.getAttribute(attr)));
      })
    );
  }
  try { const savedTheme = localStorage.getItem('dukaandesk.theme.v1'); document.documentElement.dataset.theme = savedTheme === 'dark' ? 'dark' : 'light'; } catch (error) { document.documentElement.dataset.theme = 'light'; }
  function render() {
    document.documentElement.lang = currentLanguage === 'hinglish' ? 'en' : currentLanguage;
    document.documentElement.dir = ['ur','ar'].includes(currentLanguage) ? 'rtl' : 'ltr';
    let content = dashboardHtml();
    if (tab === 'transactions') content = transactionsHtml();
    if (tab === 'udhaar') content = udhaarHtml();
    if (tab === 'history') content = historyHtml();
    if (tab === 'guide') content = guideHtml();
    // Entry forms and delete confirmation are full app pages, never overlay popups.
    if (saleDialog) content = saleModalHtml();
    else if (collectionDialog) content = collectionModalHtml();
    else if (deleteTarget) content = confirmModalHtml();
    app.innerHTML = shellHtml(content);
    // Bind the entry buttons directly after each render; avoids delegated-click conflicts.
    app.querySelectorAll('[data-action="new-sale"]').forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        openSale();
      });
    });
    app.querySelectorAll('[data-action="new-collection"]').forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        openCollection();
      });
    });
    translateVisibleText(app);
    if (saleDialog) {
      const input = app.querySelector('[data-field="sale-item"]');
      if (input) input.focus({ preventScroll: true });
      const customer = app.querySelector('[data-field="sale-customer"]');
      if (customer && app.querySelector('#customer-names')) customer.setAttribute('list', 'customer-names');
    }
    if (collectionDialog) {
      const input = app.querySelector('[data-field="collection-customer"]');
      if (input) input.focus({ preventScroll: true });
    }
  }
  function openSale(id) {
    editingSaleId = id || null;
    const sale = id ? state.sales.find(item => item.id === id) : null;
    saleDraft = sale ? { date: sale.date, item: sale.item, qty: String(sale.qty), unit: sale.unit, price: String(sale.price), paid: String(sale.paid), customer: sale.customer || '', paymentMode: sale.paymentMode || 'Cash', note: sale.note || '' } : freshSale();
    saleError = '';
    saleDialog = true;
    render();
  }
  function openCollection(id, customer) {
    editingCollectionId = id || null;
    const entry = id ? state.collections.find(item => item.id === id) : null;
    collectionDraft = entry ? { date: entry.date, customer: entry.customer, amount: String(entry.amount), mode: entry.mode || 'Cash', note: entry.note || '' } : freshCollection(customer || '');
    collectionError = '';
    collectionDialog = true;
    render();
  }
  function closeSale() { saleDialog = false; editingSaleId = null; saleError = ''; render(); }
  function closeCollection() { collectionDialog = false; editingCollectionId = null; collectionError = ''; render(); }
  function handleSaleSubmit() {
    const item = saleDraft.item.trim();
    const qty = Number(saleDraft.qty);
    const price = Number(saleDraft.price);
    const paid = Number(saleDraft.paid);
    const total = round(qty * price);
    if (!saleDraft.date || !item || !Number.isFinite(qty) || qty <= 0 || !Number.isFinite(price) || price < 0 || !Number.isFinite(paid) || paid < 0 || paid > total) {
      saleError = 'Date, item, quantity aur sahi payment details bharein. Received amount total bill se zyada nahi ho sakta.';
      render();
      return;
    }
    const existing = editingSaleId ? state.sales.find(row => row.id === editingSaleId) : null;
    const sale = { id: editingSaleId || newId(), createdAt: existing ? existing.createdAt : new Date().toISOString(), date: saleDraft.date, item, qty, unit: saleDraft.unit, price: round(price), paid: round(paid), total, customer: saleDraft.customer.trim(), paymentMode: saleDraft.paymentMode, note: saleDraft.note.trim() };
    if (existing) state.sales = state.sales.map(row => row.id === editingSaleId ? sale : row);
    else state.sales.push(sale);
    persist();
    saleDialog = false;
    editingSaleId = null;
    saleError = '';
    render();
    showToast(existing ? 'Sale entry update ho gayi.' : 'Nayi sale save ho gayi.');
  }
  function handleCollectionSubmit() {
    const customer = collectionDraft.customer.trim();
    const amount = Number(collectionDraft.amount);
    if (!collectionDraft.date || !customer || !Number.isFinite(amount) || amount <= 0) {
      collectionError = 'Date, customer naam aur jama amount sahi bharein.';
      render();
      return;
    }
    const existing = editingCollectionId ? state.collections.find(row => row.id === editingCollectionId) : null;
    if (!existing && amount > currentDueForCustomer(customer)) {
      collectionError = 'Jama amount current baaki se zyada hai. Amount check karein.';
      render();
      return;
    }
    if (existing) {
      const dueWithoutExisting = round(currentDueForCustomer(customer) + existing.amount);
      if (amount > dueWithoutExisting) {
        collectionError = 'Jama amount current baaki se zyada hai. Amount check karein.';
        render();
        return;
      }
    }
    const entry = { id: editingCollectionId || newId(), createdAt: existing ? existing.createdAt : new Date().toISOString(), date: collectionDraft.date, customer, amount: round(amount), mode: collectionDraft.mode, note: collectionDraft.note.trim() };
    if (existing) state.collections = state.collections.map(row => row.id === editingCollectionId ? entry : row);
    else state.collections.push(entry);
    persist();
    collectionDialog = false;
    editingCollectionId = null;
    collectionError = '';
    render();
    showToast(existing ? 'Jama entry update ho gayi.' : 'Udhaar jama save ho gaya.');
  }
  function deleteSale(id) {
    state.sales = state.sales.filter(row => row.id !== id);
    persist();
    deleteTarget = null;
    render();
    showToast('Sale entry delete ho gayi.');
  }
  function deleteCollection(id) {
    state.collections = state.collections.filter(row => row.id !== id);
    persist();
    deleteTarget = null;
    render();
    showToast('Jama entry delete ho gayi.');
  }
  function downloadBlob(filename, blob) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
  }
  function backupData() {
    const payload = { app: 'DukaanDesk', version: 1, exportedAt: new Date().toISOString(), data: state };
    downloadBlob('dukaandesk-backup-' + todayISO() + '.json', new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
    showToast('JSON backup download shuru ho gaya.');
  }
  function zipStore(files) {
    const encoder = new TextEncoder();
    const crcTable = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      crcTable[n] = c >>> 0;
    }
    const crc32 = data => {
      let crc = 0xffffffff;
      for (const byte of data) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
      return (crc ^ 0xffffffff) >>> 0;
    };
    const chunks = [];
    const central = [];
    let offset = 0;
    const u16 = (view, at, value) => view.setUint16(at, value, true);
    const u32 = (view, at, value) => view.setUint32(at, value >>> 0, true);
    for (const [name, content] of Object.entries(files)) {
      const nameBytes = encoder.encode(name);
      const data = encoder.encode(content);
      const crc = crc32(data);
      const local = new Uint8Array(30 + nameBytes.length);
      const lv = new DataView(local.buffer);
      u32(lv, 0, 0x04034b50); u16(lv, 4, 20); u16(lv, 6, 0x0800); u16(lv, 8, 0); u16(lv, 10, 0); u16(lv, 12, 0);
      u32(lv, 14, crc); u32(lv, 18, data.length); u32(lv, 22, data.length); u16(lv, 26, nameBytes.length); u16(lv, 28, 0); local.set(nameBytes, 30);
      chunks.push(local, data);
      const c = new Uint8Array(46 + nameBytes.length);
      const cv = new DataView(c.buffer);
      u32(cv, 0, 0x02014b50); u16(cv, 4, 20); u16(cv, 6, 20); u16(cv, 8, 0x0800); u16(cv, 10, 0); u16(cv, 12, 0); u16(cv, 14, 0);
      u32(cv, 16, crc); u32(cv, 20, data.length); u32(cv, 24, data.length); u16(cv, 28, nameBytes.length); u16(cv, 30, 0); u16(cv, 32, 0); u16(cv, 34, 0); u16(cv, 36, 0); u32(cv, 38, 0); u32(cv, 42, offset); c.set(nameBytes, 46);
      central.push(c);
      offset += local.length + data.length;
    }
    const centralSize = central.reduce((sum, part) => sum + part.length, 0);
    const end = new Uint8Array(22);
    const ev = new DataView(end.buffer);
    u32(ev, 0, 0x06054b50); u16(ev, 4, 0); u16(ev, 6, 0); u16(ev, 8, central.length); u16(ev, 10, central.length); u32(ev, 12, centralSize); u32(ev, 16, offset); u16(ev, 20, 0);
    return new Blob([...chunks, ...central, end], { type: 'application/zip' });
  }
  function renameShop() {
    const name = window.prompt('Aapki dukaan ka naam:', state.shopName);
    if (name == null) return;
    if (!name.trim()) { showToast('Shop name khaali nahi ho sakta.'); return; }
    state.shopName = name.trim().slice(0, 70);
    persist(); render(); showToast('Shop name update ho gaya.');
  }
  app.addEventListener('change', event => {
    const field = event.target;
    if (field && field.matches('[data-field="language"]')) setLanguage(field.value);
  });
  app.addEventListener('click', event => {
    const target = event.target.closest('[data-action]');
    if (!target) { if (!event.target.closest('.native-language-picker')) app.querySelectorAll('.language-menu').forEach(menu => { menu.hidden = true; }); return; }
    const action = target.dataset.action;
    if (action.startsWith('toggle-select:')) {
      const id = action.slice('toggle-select:'.length);
      const wrap = target.closest('.custom-select-field');
      const menu = wrap && wrap.querySelector('[data-select-menu]');
      if (!menu) return;
      const opening = menu.hidden;
      app.querySelectorAll('.custom-select-menu').forEach(item => { item.hidden = true; item.classList.remove('language-menu-opening'); });
      if (opening) {
        const header = app.querySelector('.topbar');
        const headerBottom = header ? header.getBoundingClientRect().bottom : 176;
        menu.style.setProperty('--language-menu-top', Math.max(0, headerBottom) + 'px');
        menu.style.top = Math.max(0, headerBottom) + 'px';
        menu.style.setProperty('--select-menu-left', '16px');
        menu.style.setProperty('--select-menu-width', 'calc(100vw - 32px)');
        menu.hidden = false;
        target.setAttribute('aria-expanded','true');
        menu.classList.remove('language-menu-opening');
        void menu.offsetWidth;
        menu.classList.add('language-menu-opening');
      } else {
        target.setAttribute('aria-expanded','false');
      }
      return;
    }
    if (action.startsWith('select-value:')) {
      const parts = action.split(':');
      const id = parts[1];
      let value = '';
      try { value = decodeURIComponent(parts.slice(2).join(':')); } catch (error) { value = parts.slice(2).join(':'); }
      const map = { 'sale-unit': ['sale', 'unit'], 'sale-mode': ['sale', 'paymentMode'], 'collection-mode': ['collection', 'mode'] };
      const found = map[id];
      if (found) {
        const draft = found[0] === 'sale' ? saleDraft : collectionDraft;
        draft[found[1]] = value;
        if (found[0] === 'sale') saleError = ''; else collectionError = '';
        render();
      }
      return;
    }
    if (action === 'toggle-language') {
      const menu = app.querySelector('[data-language-menu]');
      if (menu) {
        menu.hidden = !menu.hidden;
        if (!menu.hidden) {
          const header = app.querySelector('.topbar');
          const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
          menu.style.setProperty('--language-menu-top', headerBottom + 'px');
          menu.style.top = headerBottom + 'px';
          menu.classList.remove('language-menu-opening');
          void menu.offsetWidth;
          menu.classList.add('language-menu-opening');
        } else {
          menu.classList.remove('language-menu-opening');
        }
      }
      return;
    }
    if (action.startsWith('set-language:')) { setLanguage(action.slice(13)); return; }
    if (action === 'toggle-theme') { const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = next; try { localStorage.setItem('dukaandesk.theme.v1', next); } catch (error) {} render(); return; }
    if (action === 'dismiss-sale' && event.target === target) { closeSale(); return; }
    if (action === 'dismiss-collection' && event.target === target) { closeCollection(); return; }
    if (action === 'dismiss-delete' && event.target === target) { deleteTarget = null; render(); return; }
    if (action === 'tab:dashboard' || action === 'tab:transactions' || action === 'tab:udhaar' || action === 'tab:history' || action === 'tab:guide') { tab = action.slice(4); saleDialog = false; collectionDialog = false; deleteTarget = null; render(); return; }
    if (action === 'new-sale') { openSale(); return; }
    if (action === 'new-collection') { openCollection(); return; }
    if (action.startsWith('edit-sale:')) { openSale(action.slice(10)); return; }
    if (action.startsWith('delete-sale:')) { deleteTarget = { type: 'sale', id: action.slice(12) }; render(); return; }
    if (action.startsWith('edit-collection:')) { openCollection(action.slice(16)); return; }
    if (action.startsWith('delete-collection:')) { deleteTarget = { type: 'collection', id: action.slice(18) }; render(); return; }
    if (action.startsWith('collect-for:')) { openCollection(null, action.slice(12)); return; }
    if (action === 'close-sale') { closeSale(); return; }
    if (action === 'close-collection') { closeCollection(); return; }
    if (action === 'cancel-delete') { deleteTarget = null; render(); return; }
    if (action === 'confirm-delete' && deleteTarget) { const item = { ...deleteTarget }; if (item.type === 'sale') deleteSale(item.id); else deleteCollection(item.id); return; }
    if (action === 'backup') { backupData(); return; }
    if (action === 'rename-shop') { renameShop(); return; }
    if (action === 'clear-search') { searchQuery = ''; render(); return; }
    if (action === 'history-today') { historyDate = todayISO(); render(); return; }
  });
  app.addEventListener('change', event => {
    const field = event.target.dataset.field;
    if (field === 'language') { setLanguage(event.target.value); return; }
    if (field === 'sale-unit') { saleDraft.unit = event.target.value; return; }
    if (field === 'sale-mode') { saleDraft.paymentMode = event.target.value; return; }
    if (field === 'collection-mode') { collectionDraft.mode = event.target.value; return; }
  });
  app.addEventListener('input', event => {
    const fieldName = event.target.dataset.field;
    if (fieldName === 'search') {
      searchQuery = event.target.value;
      const pageTop = app.querySelector('.topbar');
      const start = event.target.selectionStart;
      render();
      const next = app.querySelector('[data-field="search"]');
      if (next) { next.focus({ preventScroll: true }); next.setSelectionRange(start, start); }
      return;
    }
    if (fieldName === 'history-date') { historyDate = event.target.value || todayISO(); render(); return; }
    const map = { 'sale-date': ['sale', 'date'], 'sale-item': ['sale', 'item'], 'sale-qty': ['sale', 'qty'], 'sale-unit': ['sale', 'unit'], 'sale-price': ['sale', 'price'], 'sale-paid': ['sale', 'paid'], 'sale-mode': ['sale', 'paymentMode'], 'sale-customer': ['sale', 'customer'], 'sale-note': ['sale', 'note'], 'collection-date': ['collection', 'date'], 'collection-customer': ['collection', 'customer'], 'collection-amount': ['collection', 'amount'], 'collection-mode': ['collection', 'mode'], 'collection-note': ['collection', 'note'] };
    const found = map[fieldName];
    if (!found) return;
    const draft = found[0] === 'sale' ? saleDraft : collectionDraft;
    draft[found[1]] = event.target.value;
    const activeName = fieldName;
    const cursor = event.target.selectionStart;
    if (found[0] === 'sale') saleError = ''; else collectionError = '';
    const selection = event.target.tagName === 'INPUT' && !['date', 'number'].includes(event.target.type) ? cursor : null;
    if (fieldName === 'sale-qty' || fieldName === 'sale-price' || fieldName === 'sale-paid' || fieldName === 'collection-amount' || fieldName === 'collection-customer') {
      const modal = found[0] === 'sale' ? saleDialog : collectionDialog;
      if (modal) {
        render();
        const next = app.querySelector('[data-field="' + activeName + '"]');
        if (next) { next.focus({ preventScroll: true }); if (selection != null && next.setSelectionRange) next.setSelectionRange(selection, selection); }
      }
    }
  });
  app.addEventListener('submit', event => {
    const form = event.target.closest('[data-form]');
    if (!form) return;
    event.preventDefault();
    if (form.dataset.form === 'sale') handleSaleSubmit();
    if (form.dataset.form === 'collection') handleCollectionSubmit();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (saleDialog) closeSale();
      else if (collectionDialog) closeCollection();
      else if (deleteTarget) { deleteTarget = null; render(); }
    }
  });
  window.__dukaanOpenSale = function () { openSale(); };
  window.__dukaanOpenCollection = function () { openCollection(); };
  render();
  window.__dukaanBoot = true;
})();