import React, { useState } from "react";
import "./food.css";

// Sample data for recipes
const recipes = [
  {
    id: 1,
    name: "Sağlık Dolu: Kinoa Salatası",
    category: "Ana Yemek",
    subcategory: "Salata",
    time: "20dk",
    image: "/images/kinoa-salatasi.png",
    servings: "4 kişilik",
    ingredients: [
      "1 su bardağı kinoa",
      "2 su bardağı su",
      "1 adet salatalık",
      "1 adet kırmızı biber",
      "1/2 demet maydanoz",
      "1/4 demet taze nane",
      "3 yemek kaşığı zeytinyağı",
      "1 limonun suyu",
      "Tuz, karabiber",
    ],
    steps: [
      "Kinoayı bol suda yıkayın ve süzün.",
      "Tencereye kinoa ve suyu ekleyip kaynamaya bırakın.",
      "Kaynayınca kısık ateşte 15 dakika pişirin.",
      "Salatalık ve biberi küçük küpler halinde doğrayın.",
      "Maydanoz ve naneyi ince kıyın.",
      "Pişen kinoayı soğumaya bırakın.",
      "Tüm malzemeleri bir kasede karıştırın.",
      "Zeytinyağı, limon suyu, tuz ve karabiber ile tatlandırın.",
    ],
  },
  {
    id: 2,
    name: "Protein Zengini: Fırın Somon",
    category: "Ana Yemek",
    subcategory: "Balık",
    time: "25dk",
    image: "/images/firin-somon.png",
    servings: "2 kişilik",
    ingredients: [
      "2 dilim somon fileto",
      "2 yemek kaşığı zeytinyağı",
      "1 limonun suyu",
      "2 diş sarımsak",
      "Taze kekik",
      "Tuz, karabiber",
    ],
    steps: [
      "Fırını 180 derecede ısıtın.",
      "Somon filetolarını yağlı kağıt serili tepsiye yerleştirin.",
      "Zeytinyağı, limon suyu, ezilmiş sarımsak, tuz ve karabiberi karıştırın.",
      "Karışımı somonların üzerine sürün.",
      "Üzerine taze kekik serpin.",
      "Önceden ısıtılmış fırında 15-20 dakika pişirin.",
    ],
  },
  {
    id: 3,
    name: "Enerjik Başlangıç: Yulaf Kasesi",
    category: "Kahvaltı",
    subcategory: "Kahvaltılık",
    time: "10dk",
    image: "/images/yulaf-kasesi.png",
    servings: "1 kişilik",
    ingredients: [
      "1/2 su bardağı yulaf",
      "1 su bardağı badem sütü",
      "1 tatlı kaşığı bal",
      "1 adet muz",
      "1 avuç çilek",
      "1 yemek kaşığı chia tohumu",
    ],
    steps: [
      "Yulafı badem sütü ile karıştırın.",
      "Bal ekleyip karıştırın.",
      "Muzu dilimleyin ve çilekleri ikiye bölün.",
      "Yulaf karışımını kaseye alın.",
      "Üzerine meyveleri yerleştirin.",
      "Chia tohumlarını serpin ve servis yapın.",
    ],
  },
  {
    id: 4,
    name: "Sağlıklı Atıştırmalık: Badem Topları",
    category: "Ara Öğün",
    subcategory: "Atıştırmalık",
    time: "15dk",
    image: "/images/badem-toplari.jpg",
    servings: "10 adet",
    ingredients: [
      "1 su bardağı kuru hurma",
      "1/2 su bardağı badem",
      "2 yemek kaşığı kakao",
      "1 yemek kaşığı hindistan cevizi",
      "1 çimdik tuz",
    ],
    steps: [
      "Hurmaları sıcak suda 10 dakika bekletin ve çekirdeklerini çıkarın.",
      "Bademleri robottan geçirin.",
      "Hurmaları ekleyip tekrar robottan geçirin.",
      "Kakao ve tuzu ekleyip karıştırın.",
      "Karışımdan ceviz büyüklüğünde parçalar alıp yuvarlayın.",
      "Hindistan cevizine bulayın.",
      "Buzdolabında 1 saat bekletin.",
    ],
  },
  {
    id: 5,
    name: "Hafif Tatlı: Çikolatalı Avokado Mousse",
    category: "Tatlı",
    subcategory: "Tatlı",
    time: "15dk",
    image: "/images/avokado-mousse.jpg",
    servings: "2 kişilik",
    ingredients: [
      "2 adet olgun avokado",
      "3 yemek kaşığı kakao",
      "2 yemek kaşığı bal",
      "1/2 çay kaşığı vanilya özütü",
      "1 çimdik tuz",
      "Süsleme için çilek",
    ],
    steps: [
      "Avokadoları ikiye bölüp çekirdeklerini çıkarın.",
      "Kaşıkla içini oyup blendıra aktarın.",
      "Kakao, bal, vanilya ve tuzu ekleyin.",
      "Pürüzsüz bir kıvam alana kadar karıştırın.",
      "Servis kaselerine paylaştırın.",
      "Buzdolabında 1 saat dinlendirin.",
      "Servis etmeden önce çilek ile süsleyin.",
    ],
  },
  // 4 more recipes for popular section (to make 9 total)
  {
    id: 6,
    name: "Akdeniz Usulü: Sebzeli Bulgur Pilavı",
    category: "Ana Yemek",
    subcategory: "Pilav",
    time: "30dk",
    image: "/images/sebzeli-bulgur.jpg",
    servings: "4 kişilik",
    ingredients: [
      "2 su bardağı bulgur",
      "3 su bardağı sebze suyu",
      "1 adet kırmızı biber",
      "1 adet havuç",
      "1 adet kabak",
      "2 yemek kaşığı zeytinyağı",
      "1 çay kaşığı kimyon",
      "Tuz, karabiber",
    ],
    steps: [
      "Sebzeleri küçük küpler halinde doğrayın.",
      "Zeytinyağını tencerede ısıtın ve sebzeleri 5 dakika kavurun.",
      "Bulguru ekleyip karıştırın.",
      "Sebze suyunu, tuz, karabiber ve kimyonu ekleyin.",
      "Kaynamaya başlayınca kısık ateşte 15-20 dakika pişirin.",
      "Ocaktan alıp 10 dakika dinlendirin.",
    ],
  },
  {
    id: 7,
    name: "Vitamin Deposu: Renkli Mercimek Çorbası",
    category: "Ana Yemek",
    subcategory: "Çorba",
    time: "35dk",
    image: "/images/mercimek-corbasi.jpg",
    servings: "6 kişilik",
    ingredients: [
      "1 su bardağı kırmızı mercimek",
      "1 adet soğan",
      "1 adet havuç",
      "1 adet patates",
      "2 yemek kaşığı zeytinyağı",
      "1 tatlı kaşığı toz kırmızı biber",
      "6 su bardağı su",
      "Tuz, karabiber",
    ],
    steps: [
      "Mercimeği yıkayıp süzün.",
      "Soğan, havuç ve patatesi küçük küpler halinde doğrayın.",
      "Zeytinyağını tencerede ısıtıp soğanı pembeleşene kadar kavurun.",
      "Havuç ve patatesi ekleyip 3-4 dakika daha kavurun.",
      "Mercimek ve suyu ekleyip kaynamaya bırakın.",
      "Kısık ateşte 25-30 dakika pişirin.",
      "Blenderdan geçirip pürüzsüz hale getirin.",
      "Tuz ve karabiber ekleyin.",
      "Servis ederken üzerine kırmızı toz biber gezdirin.",
    ],
  },
  {
    id: 8,
    name: "Protein Kaynağı: Nohutlu Ispanak",
    category: "Ana Yemek",
    subcategory: "Sebze Yemeği",
    time: "25dk",
    image: "/images/nohutlu-ispanak.jpg",
    servings: "4 kişilik",
    ingredients: [
      "500g ıspanak",
      "1 kutu haşlanmış nohut",
      "1 adet soğan",
      "2 diş sarımsak",
      "2 yemek kaşığı zeytinyağı",
      "1 çay kaşığı kimyon",
      "Yarım limonun suyu",
      "Tuz, karabiber",
    ],
    steps: [
      "Ispanakları yıkayıp iri parçalar halinde doğrayın.",
      "Soğanı yemeklik, sarımsağı ince doğrayın.",
      "Zeytinyağını tavada ısıtıp soğanı pembeleşene kadar kavurun.",
      "Sarımsağı ekleyip 1 dakika daha kavurun.",
      "Ispanakları ekleyip soteleyerek yumuşamasını sağlayın.",
      "Nohut, kimyon, tuz ve karabiberi ekleyip karıştırın.",
      "5 dakika daha pişirip ocaktan alın.",
      "Servis ederken üzerine limon suyu gezdirin.",
    ],
  },
  {
    id: 9,
    name: "Fit Tatlı: Yoğurtlu Meyveli Parfait",
    category: "Tatlı",
    subcategory: "Sütlü Tatlı",
    time: "15dk",
    image: "/images/meyveli-parfait.jpg",
    servings: "2 kişilik",
    ingredients: [
      "2 su bardağı yoğurt",
      "2 yemek kaşığı bal",
      "1 çay kaşığı vanilya özütü",
      "1 adet muz",
      "1 avuç çilek",
      "1 avuç yaban mersini",
      "2 yemek kaşığı granola",
    ],
    steps: [
      "Yoğurt, bal ve vanilyayı karıştırın.",
      "Meyveleri yıkayıp doğrayın.",
      "Servis bardaklarına sırayla yoğurt, meyve ve granola koyun.",
      "Bu katmanları tekrarlayın.",
      "En üste granola serpin.",
      "Hemen servis yapın veya 1 saat buzdolabında bekletin.",
    ],
  },

  // Bugün Ne Pişirsem? section recipes (6 recipes)
  {
    id: 10,
    name: "Hızlı Akşam Yemeği: Tavuklu Wrap",
    category: "Ana Yemek",
    subcategory: "Tavuk",
    time: "20dk",
    image: "/images/tavuklu-wrap.jpg",
    servings: "2 kişilik",
    ingredients: [
      "2 adet tam buğday lavaş",
      "200g ızgara tavuk göğsü",
      "1 adet domates",
      "1/2 adet salatalık",
      "1/4 adet kırmızı soğan",
      "2 yemek kaşığı yoğurt",
      "1 diş sarımsak",
      "Taze nane ve maydanoz",
      "Tuz, karabiber",
    ],
    steps: [
      "Tavuk göğsünü dilimleyin.",
      "Domates, salatalık ve soğanı ince dilimleyin.",
      "Yoğurt, ezilmiş sarımsak, tuz ve karabiberi karıştırarak sos hazırlayın.",
      "Lavaşların üzerine sos sürün.",
      "Tavuk ve sebzeleri yerleştirin.",
      "Üzerine doğranmış taze otları serpin.",
      "Lavaşları rulo şeklinde sarın.",
      "İsteğe göre ızgara veya tavada hafifçe ısıtın.",
    ],
  },
  {
    id: 11,
    name: "Ev Yapımı: Falafel",
    category: "Ana Yemek",
    subcategory: "Vejetaryen",
    time: "40dk",
    image: "/images/falafel.jpg",
    servings: "4 kişilik",
    ingredients: [
      "2 su bardağı haşlanmış nohut",
      "1 adet soğan",
      "3 diş sarımsak",
      "1/2 demet maydanoz",
      "1/4 demet kişniş",
      "1 çay kaşığı kimyon",
      "1 çay kaşığı kişniş tohumu",
      "2 yemek kaşığı un",
      "Tuz, karabiber",
      "Kızartmak için zeytinyağı",
    ],
    steps: [
      "Nohut, soğan, sarımsak, maydanoz ve kişnişi robottan geçirin.",
      "Baharatlar, un, tuz ve karabiberi ekleyip karıştırın.",
      "Karışımı 30 dakika buzdolabında dinlendirin.",
      "Ceviz büyüklüğünde parçalar alıp yuvarlayın ve hafifçe bastırın.",
      "Zeytinyağını tavada ısıtın.",
      "Falafelleri her iki tarafı kızarana kadar pişirin.",
      "Kağıt havlu üzerine alıp fazla yağını süzdürün.",
    ],
  },
  {
    id: 12,
    name: "Hafif Akşam: Sebzeli Omlet",
    category: "Kahvaltı",
    subcategory: "Yumurta",
    time: "15dk",
    image: "/images/sebzeli-omlet.jpg",
    servings: "2 kişilik",
    ingredients: [
      "4 adet yumurta",
      "1 adet kırmızı biber",
      "1 adet yeşil biber",
      "1/2 adet soğan",
      "1 avuç ıspanak",
      "2 yemek kaşığı zeytinyağı",
      "50g beyaz peynir",
      "Tuz, karabiber",
    ],
    steps: [
      "Sebzeleri küçük küpler halinde doğrayın.",
      "Zeytinyağını tavada ısıtıp soğanı pembeleşene kadar kavurun.",
      "Biberleri ekleyip 2-3 dakika kavurun.",
      "Ispanağı ekleyip solana kadar pişirin.",
      "Yumurtaları çırpıp tuz ve karabiber ekleyin.",
      "Yumurtaları sebzelerin üzerine dökün.",
      "Ufalanmış beyaz peyniri serpin.",
      "Kısık ateşte üzeri kızarana kadar pişirin.",
    ],
  },
  {
    id: 13,
    name: "Besleyici: Mercimekli Köfte",
    category: "Ara Öğün",
    subcategory: "Köfte",
    time: "45dk",
    image: "/images/mercimekli-kofte.jpg",
    servings: "6 kişilik",
    ingredients: [
      "1 su bardağı kırmızı mercimek",
      "1 su bardağı ince bulgur",
      "1 adet soğan",
      "3 yemek kaşığı zeytinyağı",
      "2 yemek kaşığı domates salçası",
      "1 demet maydanoz",
      "4 dal taze soğan",
      "1 çay kaşığı kimyon",
      "1 çay kaşığı pul biber",
      "Tuz, karabiber",
    ],
    steps: [
      "Mercimeği 2 su bardağı su ile yumuşayana kadar pişirin.",
      "Ocaktan alıp bulguru ekleyin ve karıştırın.",
      "Tencerenin kapağını kapatıp 15-20 dakika dinlendirin.",
      "Soğanı yemeklik doğrayıp zeytinyağında kavurun.",
      "Salçayı ekleyip 2 dakika daha kavurun.",
      "Soğan karışımını mercimekli harca ekleyin.",
      "Baharatları, tuz ve karabiberi ekleyip karıştırın.",
      "İnce kıyılmış maydanoz ve taze soğanı ekleyin.",
      "Harç ılıdıktan sonra elinizle şekil verin.",
    ],
  },
  {
    id: 14,
    name: "Pratik Tatlı: Muzlu Yulaf Kurabiyesi",
    category: "Tatlı",
    subcategory: "Kurabiye",
    time: "25dk",
    image: "/images/muzlu-kurabiye.jpg",
    servings: "12 adet",
    ingredients: [
      "2 adet olgun muz",
      "2 su bardağı yulaf ezmesi",
      "1/4 su bardağı kuru üzüm",
      "1/4 su bardağı ceviz içi",
      "1 çay kaşığı tarçın",
      "1 çay kaşığı vanilya özütü",
    ],
    steps: [
      "Fırını 180 derecede ısıtın.",
      "Muzları çatalla ezin.",
      "Tüm malzemeleri bir kasede karıştırın.",
      "Yağlı kağıt serili tepsiye kaşık yardımıyla kurabiye şekli verin.",
      "Önceden ısıtılmış fırında 15-18 dakika pişirin.",
      "Fırından çıkarıp 10 dakika dinlendirin.",
    ],
  },
  {
    id: 15,
    name: "Akdeniz Lezzeti: Humus",
    category: "Ara Öğün",
    subcategory: "Meze",
    time: "15dk",
    image: "/images/humus.jpg",
    servings: "4 kişilik",
    ingredients: [
      "1 kutu haşlanmış nohut",
      "3 yemek kaşığı tahin",
      "2 diş sarımsak",
      "1 limonun suyu",
      "3 yemek kaşığı zeytinyağı",
      "1 çay kaşığı kimyon",
      "Tuz, karabiber",
      "Süslemek için pul biber ve maydanoz",
    ],
    steps: [
      "Nohutları süzüp yıkayın.",
      "Tüm malzemeleri blendıra ekleyin.",
      "Pürüzsüz bir kıvam alana kadar karıştırın.",
      "Gerekirse biraz su ekleyerek kıvamını ayarlayın.",
      "Servis tabağına alıp üzerine zeytinyağı gezdirin.",
      "Pul biber ve maydanoz ile süsleyin.",
    ],
  },

  // Adding more recipes for each category (20 per category)
  // Ana Yemek Category (adding more to reach 20)
  {
    id: 16,
    name: "Sebzeli Türlü",
    category: "Ana Yemek",
    subcategory: "Sebze Yemeği",
    time: "45dk",
    image: "/images/sebzeli-turlu.jpg",
    servings: "6 kişilik",
    ingredients: [
      "2 adet patates",
      "2 adet patlıcan",
      "2 adet kabak",
      "2 adet havuç",
      "2 adet biber",
      "2 adet domates",
      "1 adet soğan",
      "3 diş sarımsak",
      "3 yemek kaşığı zeytinyağı",
      "1 yemek kaşığı domates salçası",
      "2 su bardağı sıcak su",
      "Tuz, karabiber",
    ],
    steps: [
      "Tüm sebzeleri küp şeklinde doğrayın.",
      "Zeytinyağını tencerede ısıtın.",
      "Soğan ve sarımsağı kavurun.",
      "Salçayı ekleyip karıştırın.",
      "Sırasıyla havuç, patates, patlıcan, kabak ve biberi ekleyin.",
      "Domatesleri en üste yerleştirin.",
      "Sıcak su, tuz ve karabiberi ekleyin.",
      "Kısık ateşte 30-35 dakika pişirin.",
    ],
  },
  {
    id: 17,
    name: "Diyet Köfte",
    category: "Ana Yemek",
    subcategory: "Et Yemeği",
    time: "30dk",
    image: "/images/diyet-kofte.jpg",
    servings: "4 kişilik",
    ingredients: [
      "400g yağsız kıyma",
      "1 adet soğan (rendelenmiş)",
      "2 diş sarımsak (ezilmiş)",
      "1/2 demet maydanoz (ince kıyılmış)",
      "1 çay kaşığı kimyon",
      "1 çay kaşığı pul biber",
      "Tuz, karabiber",
    ],
    steps: [
      "Tüm malzemeleri derin bir kasede iyice karıştırın.",
      "Karışımı 15 dakika buzdolabında dinlendirin.",
      "Köfte şekli verin.",
      "Yapışmaz tavada veya ızgarada pişirin.",
      "Her iki tarafı da 3-4 dakika pişirin.",
      "Sıcak servis yapın.",
    ],
  },
  {
    id: 18,
    name: "Fırında Sebzeli Tavuk",
    category: "Ana Yemek",
    subcategory: "Tavuk",
    time: "50dk",
    image: "/images/sebzeli-tavuk.jpg",
    servings: "4 kişilik",
    ingredients: [
      "4 adet tavuk but",
      "2 adet patates",
      "2 adet havuç",
      "1 adet kabak",
      "1 adet kırmızı biber",
      "1 adet soğan",
      "4 diş sarımsak",
      "3 yemek kaşığı zeytinyağı",
      "1 çay kaşığı kekik",
      "1 çay kaşığı biberiye",
      "Tuz, karabiber",
    ],
    steps: [
      "Fırını 190 derecede ısıtın.",
      "Tavuk butlarını yıkayıp kurulayın.",
      "Sebzeleri iri parçalar halinde doğrayın.",
      "Fırın tepsisine tavuk ve sebzeleri yerleştirin.",
      "Zeytinyağı, baharatlar, tuz ve karabiberi karıştırın.",
      "Karışımı tavuk ve sebzelerin üzerine dökün.",
      "Önceden ısıtılmış fırında 40-45 dakika pişirin.",
    ],
  },
  {
    id: 19,
    name: "Kabak Spaghetti",
    category: "Ana Yemek",
    subcategory: "Vejetaryen",
    time: "25dk",
    image: "/images/kabak-spaghetti.jpg",
    servings: "2 kişilik",
    ingredients: [
      "2 adet büyük kabak",
      "2 yemek kaşığı zeytinyağı",
      "2 diş sarımsak",
      "10 adet cherry domates",
      "1/4 su bardağı rendelenmiş parmesan",
      "Taze fesleğen",
      "Tuz, karabiber",
    ],
    steps: [
      "Kabakları spiral kesici ile spaghetti şeklinde kesin.",
      "Zeytinyağını tavada ısıtın.",
      "Sarımsağı ekleyip 1 dakika kavurun.",
      "İkiye bölünmüş domatesleri ekleyip 2-3 dakika pişirin.",
      "Kabak spaghettisini ekleyip 3-4 dakika pişirin.",
      "Tuz ve karabiber ekleyin.",
      "Servis tabağına alıp üzerine parmesan ve taze fesleğen serpin.",
    ],
  },
  {
    id: 20,
    name: "Brokoli Çorbası",
    category: "Ana Yemek",
    subcategory: "Çorba",
    time: "30dk",
    image: "/images/brokoli-corbasi.jpg",
    servings: "4 kişilik",
    ingredients: [
      "500g brokoli",
      "1 adet patates",
      "1 adet soğan",
      "2 diş sarımsak",
      "2 yemek kaşığı zeytinyağı",
      "4 su bardağı sebze suyu",
      "1/2 su bardağı süt",
      "Tuz, karabiber",
    ],
    steps: [
      "Brokoliyi çiçeklerine ayırın.",
      "Patatesi küp şeklinde doğrayın.",
      "Soğanı yemeklik, sarımsağı ince doğrayın.",
      "Zeytinyağını tencerede ısıtıp soğan ve sarımsağı kavurun.",
      "Patates ve brokoliyi ekleyip 2 dakika kavurun.",
      "Sebze suyunu ekleyip kaynamaya bırakın.",
      "Sebzeler yumuşayana kadar 15-20 dakika pişirin.",
      "Blenderdan geçirip pürüzsüz hale getirin.",
      "Sütü ekleyip karıştırın.",
      "Tuz ve karabiber ile tatlandırın.",
    ],
  },
  {
    id: 21,
    name: "Izgara Sebzeli Kinoa",
    category: "Ana Yemek",
    subcategory: "Tahıl",
    time: "35dk",
    image: "/images/sebzeli-kinoa.jpg",
    servings: "4 kişilik",
    ingredients: [
      "1 su bardağı kinoa",
      "2 su bardağı su",
      "1 adet patlıcan",
      "1 adet kabak",
      "1 adet kırmızı biber",
      "1 adet sarı biber",
      "1 adet kırmızı soğan",
      "3 yemek kaşığı zeytinyağı",
      "2 yemek kaşığı balsamik sirke",
      "Taze kekik",
      "Tuz, karabiber",
    ],
    steps: [
      "Kinoayı bol suda yıkayıp süzün.",
      "Tencereye kinoa ve suyu ekleyip kaynamaya bırakın.",
      "Kaynayınca kısık ateşte 15 dakika pişirin.",
      "Sebzeleri iri parçalar halinde doğrayın.",
      "Zeytinyağı, tuz ve karabiber ile karıştırın.",
      "Izgarada veya ızgara tavada sebzeleri pişirin.",
      "Pişen kinoayı geniş bir kaseye alın.",
      "Izgara sebzeleri üzerine yerleştirin.",
      "Balsamik sirke ve taze kekik ile tatlandırın.",
    ],
  },
  {
    id: 22,
    name: "Karnabahar Pilavı",
    category: "Ana Yemek",
    subcategory: "Diyet",
    time: "20dk",
    image: "/images/karnabaharpilavi.jpg",
    servings: "4 kişilik",
    ingredients: [
      "1 adet orta boy karnabahar",
      "2 yemek kaşığı zeytinyağı",
      "1 adet soğan (ince doğranmış)",
      "2 diş sarımsak (ezilmiş)",
      "1/2 çay kaşığı kimyon",
      "1/4 demet maydanoz (ince kıyılmış)",
      "Tuz, karabiber",
    ],
    steps: [
      "Karnabaharı çiçeklerine ayırın.",
      "Mutfak robotunda pirinç tanesi büyüklüğünde olana kadar çekin.",
      "Zeytinyağını tavada ısıtın.",
      "Soğan ve sarımsağı pembeleşene kadar kavurun.",
      "Karnabahar pilavını ekleyip 5-6 dakika kavurun.",
      "Kimyon, tuz ve karabiber ekleyin.",
      "Ocaktan alıp maydanoz ile süsleyin.",
    ],
  },
  {
    id: 23,
    name: "Izgara Levrek",
    category: "Ana Yemek",
    subcategory: "Balık",
    time: "25dk",
    image: "/images/izgara-levrek.jpg",
    servings: "2 kişilik",
    ingredients: [
      "2 adet levrek (temizlenmiş)",
      "2 yemek kaşığı zeytinyağı",
      "1 limonun suyu",
      "2 diş sarımsak (ezilmiş)",
      "Taze kekik ve biberiye",
      "Tuz, karabiber",
    ],
    steps: [
      "Balıkları yıkayıp kurulayın.",
      "Zeytinyağı, limon suyu, sarımsak, tuz ve karabiberi karıştırın.",
      "Balıkların üzerine karışımı sürün.",
      "İçine taze otları yerleştirin.",
      "Izgarayı ısıtın.",
      "Balıkları her iki tarafı da 4-5 dakika pişirin.",
      "Limon dilimleri ile servis yapın.",
    ],
  },
  {
    id: 24,
    name: "Sebzeli Tavuk Şiş",
    category: "Ana Yemek",
    subcategory: "Tavuk",
    time: "40dk",
    image: "/images/tavuk-sis.jpg",
    servings: "4 kişilik",
    ingredients: [
      "500g tavuk göğsü (kuşbaşı)",
      "1 adet kırmızı biber",
      "1 adet yeşil biber",
      "1 adet kabak",
      "1 adet soğan",
      "3 yemek kaşığı zeytinyağı",
      "1 limonun suyu",
      "2 diş sarımsak",
      "1 çay kaşığı kekik",
      "Tuz, karabiber",
    ],
    steps: [
      "Zeytinyağı, limon suyu, ezilmiş sarımsak, kekik, tuz ve karabiberi karıştırın.",
      "Tavuk etlerini marine edin ve 30 dakika buzdolabında bekletin.",
      "Sebzeleri iri parçalar halinde doğrayın.",
      "Şiş çubuklarına sırayla tavuk ve sebzeleri dizin.",
      "Izgarada veya fırında her tarafı pişene kadar 15-20 dakika pişirin.",
    ],
  },
  {
    id: 25,
    name: "Yeşil Mercimek Yemeği",
    category: "Ana Yemek",
    subcategory: "Baklagil",
    time: "40dk",
    image: "/images/yesil-mercimek.jpg",
    servings: "4 kişilik",
    ingredients: [
      "1.5 su bardağı yeşil mercimek",
      "1 adet soğan",
      "1 adet havuç",
      "2 diş sarımsak",
      "2 yemek kaşığı zeytinyağı",
      "1 yemek kaşığı domates salçası",
      "4 su bardağı su",
      "1 çay kaşığı kimyon",
      "Tuz, karabiber",
    ],
    steps: [
      "Mercimeği yıkayıp süzün.",
      "Soğan, havuç ve sarımsağı ince doğrayın.",
      "Zeytinyağını tencerede ısıtıp soğanı kavurun.",
      "Havuç ve sarımsağı ekleyip 2-3 dakika daha kavurun.",
      "Salçayı ekleyip karıştırın.",
      "Mercimek, su, kimyon, tuz ve karabiberi ekleyin.",
      "Kaynamaya başlayınca kısık ateşte 30 dakika pişirin.",
    ],
  },
  {
    id: 26,
    name: "Sebzeli Noodle",
    category: "Ana Yemek",
    subcategory: "Asya Mutfağı",
    time: "20dk",
    image: "/images/sebzeli-noodle.jpg",
    servings: "2 kişilik",
    ingredients: [
      "200g tam buğday noodle",
      "1 adet havuç",
      "1 adet kırmızı biber",
      "1 avuç taze fasulye",
      "2 dal taze soğan",
      "2 yemek kaşığı soya sosu",
      "1 yemek kaşığı susam yağı",
      "1 diş sarımsak",
      "1 çay kaşığı zencefil (rendelenmiş)",
      "1 yemek kaşığı susam",
    ],
    steps: [
      "Noodle'ı paketteki talimatlara göre haşlayın.",
      "Sebzeleri ince şeritler halinde doğrayın.",
      "Wok tavada susam yağını ısıtın.",
      "Sarımsak ve zencefili ekleyip 30 saniye kavurun.",
      "Sebzeleri ekleyip 3-4 dakika kavurun.",
      "Haşlanmış noodle'ı ekleyin.",
      "Soya sosunu ekleyip karıştırın.",
      "Susam serperek servis yapın.",
    ],
  },
  {
    id: 27,
    name: "Mantar Sote",
    category: "Ana Yemek",
    subcategory: "Vejetaryen",
    time: "20dk",
    image: "/images/mantar-sote.jpg",
    servings: "2 kişilik",
    ingredients: [
      "500g mantar",
      "1 adet soğan",
      "2 diş sarımsak",
      "2 yemek kaşığı zeytinyağı",
      "1/2 demet maydanoz",
      "1 çay kaşığı kekik",
      "Tuz, karabiber",
    ],
    steps: [
      "Mantarları temizleyip dilimleyin.",
      "Soğanı yemeklik, sarımsağı ince doğrayın.",
      "Zeytinyağını tavada ısıtıp soğanı pembeleşene kadar kavurun.",
      "Sarımsağı ekleyip 1 dakika daha kavurun.",
      "Mantarları ekleyip suyunu salıp çekene kadar pişirin.",
      "Tuz, karabiber ve kekik ekleyin.",
      "Ocaktan almadan önce ince kıyılmış maydanozu ekleyin.",
    ],
  },
  {
    id: 28,
    name: "Sebzeli Bulgur Pilavı",
    category: "Ana Yemek",
    subcategory: "Pilav",
    time: "30dk",
    image: "/images/sebzeli-bulgur.jpg",
    servings: "4 kişilik",
    ingredients: [
      "2 su bardağı bulgur",
      "3 su bardağı sebze suyu",
      "1 adet soğan",
      "1 adet havuç",
      "1 adet kırmızı biber",
      "2 yemek kaşığı zeytinyağı",
      "1 çay kaşığı kimyon",
      "Tuz, karabiber",
    ],
    steps: [
      "Soğan, havuç ve biberi küçük küpler halinde doğrayın.",
      "Zeytinyağını tencerede ısıtıp soğanı kavurun.",
      "Havuç ve biberi ekleyip 3-4 dakika kavurun.",
      "Bulguru ekleyip karıştırın.",
      "Sebze suyu, kimyon, tuz ve karabiberi ekleyin.",
      "Kaynamaya başlayınca kısık ateşte 15 dakika pişirin.",
      "Ocaktan alıp 10 dakika dinlendirin.",
    ],
  },
  {
    id: 29,
    name: "Fırında Kabak Graten",
    category: "Ana Yemek",
    subcategory: "Sebze Yemeği",
    time: "40dk",
    image: "/images/kabak-graten.jpg",
    servings: "4 kişilik",
    ingredients: [
      "3 adet kabak",
      "1 adet soğan",
      "2 diş sarımsak",
      "1 su bardağı süt",
      "2 adet yumurta",
      "100g lor peyniri",
      "50g rendelenmiş kaşar peyniri",
      "2 yemek kaşığı zeytinyağı",
      "Tuz, karabiber",
    ],
    steps: [
      "Fırını 180 derecede ısıtın.",
      "Kabakları ince dilimleyin.",
      "Soğan ve sarımsağı ince doğrayın.",
      "Zeytinyağını tavada ısıtıp soğan ve sarımsağı kavurun.",
      "Kabakları ekleyip 5 dakika soteleyin.",
      "Süt ve yumurtaları çırpın, tuz ve karabiber ekleyin.",
      "Fırın kabına kabakları yerleştirin.",
      "Üzerine lor peynirini serpin.",
      "Süt karışımını dökün.",
      "En üste rendelenmiş kaşar peyniri serpin.",
      "Önceden ısıtılmış fırında 25-30 dakika pişirin.",
    ],
  },
  {
    id: 30,
    name: "Mercimek Köftesi",
    category: "Ana Yemek",
    subcategory: "Vejetaryen",
    time: "45dk",
    image: "/images/mercimek-koftesi.jpg",
    servings: "6 kişilik",
    ingredients: [
      "1 su bardağı kırmızı mercimek",
      "1 su bardağı ince bulgur",
      "1 adet soğan",
      "3 yemek kaşığı zeytinyağı",
      "2 yemek kaşığı domates salçası",
      "1 demet maydanoz",
      "4 dal taze soğan",
      "1 çay kaşığı kimyon",
      "1 çay kaşığı pul biber",
      "Tuz, karabiber",
    ],
    steps: [
      "Mercimeği 2 su bardağı su ile yumuşayana kadar pişirin.",
      "Ocaktan alıp bulguru ekleyin ve karıştırın.",
      "Tencerenin kapağını kapatıp 15-20 dakika dinlendirin.",
      "Soğanı yemeklik doğrayıp zeytinyağında kavurun.",
      "Salçayı ekleyip 2 dakika daha kavurun.",
      "Soğan karışımını mercimekli harca ekleyin.",
      "Baharatları, tuz ve karabiberi ekleyip karıştırın.",
      "İnce kıyılmış maydanoz ve taze soğanı ekleyin.",
      "Harç ılıdıktan sonra elinizle şekil verin.",
    ],
  },

  //kahvaltı kısmı
  // 21 Diyet Kahvaltı Tarifleri (ID: 31-51)
  {
    id: 31,
    name: "Yulaf Ezmesi Smoothie Bowl",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "15dk",
    image: "/images/yulaf-ezmesi-smoothie-bowl.jpg",
    servings: "1 kişilik",
    ingredients: [
      "1/2 su bardağı yulaf ezmesi",
      "1 adet muz",
      "1/2 su bardağı yağsız süt",
      "1 yemek kaşığı chia tohumu",
      "1 tatlı kaşığı bal (isteğe bağlı)",
      "Üzeri için: yaban mersini, çilek, hindistan cevizi",
    ],
    steps: [
      "Yulaf ezmesini süt ile karıştırıp 5 dakika bekletin.",
      "Muzu ekleyip blenderdan geçirin.",
      "Chia tohumlarını ekleyip karıştırın.",
      "Kaseye alıp üzerini meyveler ve hindistan cevizi ile süsleyin.",
    ],
  },
  {
    id: 32,
    name: "Avokado Tost",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "10dk",
    image: "/images/avokado-tost.jpg",
    servings: "1 kişilik",
    ingredients: [
      "2 dilim tam tahıllı ekmek",
      "1 adet olgun avokado",
      "1 adet yumurta",
      "Tuz, karabiber",
      "Pul biber",
      "1/2 limon suyu",
    ],
    steps: [
      "Ekmeği hafifçe kızartın.",
      "Avokadoyu ezin ve limon suyu, tuz, karabiber ekleyin.",
      "Yumurtayı haşlayın veya tavada pişirin.",
      "Avokado ezmesini ekmeğin üzerine sürün.",
      "Üzerine dilimlenmiş yumurta koyun ve baharatlarla süsleyin.",
    ],
  },
  {
    id: 33,
    name: "Yeşil Detoks Smoothie",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "5dk",
    image: "/images/yesil-detoks-smoothie.jpg",
    servings: "1 kişilik",
    ingredients: [
      "1 avuç ıspanak",
      "1 adet yeşil elma",
      "1/2 salatalık",
      "1 dilim ananas",
      "1 yemek kaşığı limon suyu",
      "1 su bardağı su",
    ],
    steps: [
      "Tüm malzemeleri blenderdan geçirin.",
      "Gerekirse biraz daha su ekleyerek kıvamını ayarlayın.",
      "Soğuk olarak hemen servis yapın.",
    ],
  },
  {
    id: 34,
    name: "Kinoa Kahvaltı Kasesi",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "25dk",
    image: "/images/kinoa-kahvalti-kasesi.jpg",
    servings: "2 kişilik",
    ingredients: [
      "1/2 su bardağı kinoa",
      "1 su bardağı badem sütü",
      "1 yemek kaşığı bal",
      "1 çay kaşığı tarçın",
      "1 avuç çilek",
      "1 avuç yaban mersini",
      "1 yemek kaşığı chia tohumu",
    ],
    steps: [
      "Kinoayı yıkayıp süzün.",
      "Badem sütü ile pişirin (yaklaşık 15 dakika).",
      "Ocaktan alıp bal ve tarçın ekleyin.",
      "Kaseye alıp üzerine meyveleri ve chia tohumunu ekleyin.",
    ],
  },
  {
    id: 35,
    name: "Yumurta Beyazlı Omlet",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "10dk",
    image: "/images/yumurta-beyazli-omlet.jpg",
    servings: "1 kişilik",
    ingredients: [
      "3 yumurta beyazı",
      "1 adet tam yumurta",
      "1/4 kırmızı biber",
      "1/4 yeşil biber",
      "2 adet mantar",
      "1 avuç ıspanak",
      "Tuz, karabiber",
    ],
    steps: [
      "Sebzeleri küçük küçük doğrayın.",
      "Yumurta beyazlarını ve tam yumurtayı çırpın.",
      "Yapışmaz tavada sebzeleri soteleyin.",
      "Üzerine yumurta karışımını dökün.",
      "Altı pişince spatula yardımıyla katlayın.",
    ],
  },
  {
    id: 36,
    name: "Yoğurtlu Meyveli Granola",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "5dk",
    image: "/images/yogurtlu-meyveli-granola.jpg",
    servings: "1 kişilik",
    ingredients: [
      "1 su bardağı yağsız yoğurt",
      "2 yemek kaşığı ev yapımı granola",
      "1 adet muz",
      "5-6 adet çilek",
      "1 tatlı kaşığı bal",
      "1 çay kaşığı tarçın",
    ],
    steps: [
      "Yoğurdu kaseye alın.",
      "Üzerine meyveleri ekleyin.",
      "Granola, bal ve tarçın ile süsleyin.",
    ],
  },
  {
    id: 37,
    name: "Yeşil Mercimekli Kahvaltı Çanağı",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "20dk",
    image: "/images/yesil-mercimekli-kahvalti-canagi.jpg",
    servings: "2 kişilik",
    ingredients: [
      "1/2 su bardağı yeşil mercimek",
      "1 adet haşlanmış yumurta",
      "1/4 avokado",
      "5-6 adet kiraz domates",
      "1 avuç roka",
      "1 yemek kaşığı zeytinyağı",
      "Limon suyu, tuz, karabiber",
    ],
    steps: [
      "Mercimeği haşlayıp süzün.",
      "Yumurtayı haşlayıp soyun ve dilimleyin.",
      "Avokadoyu dilimleyin, domatesleri ikiye bölün.",
      "Tüm malzemeleri bir kaseye yerleştirin.",
      "Zeytinyağı, limon suyu, tuz ve karabiber ile tatlandırın.",
    ],
  },
  {
    id: 38,
    name: "Protein Pancake",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "15dk",
    image: "/images/protein-pancake.jpg",
    servings: "1 kişilik",
    ingredients: [
      "1 adet muz",
      "2 adet yumurta",
      "1 ölçek protein tozu (vanilyalı)",
      "1 yemek kaşığı yulaf ezmesi",
      "1 çay kaşığı tarçın",
      "Üzeri için: yaban mersini ve az miktarda akçaağaç şurubu",
    ],
    steps: [
      "Muzu ezin ve yumurtalarla karıştırın.",
      "Protein tozu, yulaf ezmesi ve tarçını ekleyip karıştırın.",
      "Yapışmaz tavada küçük pancakeler halinde pişirin.",
      "Üzerine yaban mersini ve çok az akçaağaç şurubu ile servis yapın.",
    ],
  },
  {
    id: 39,
    name: "Lor Peynirli Tost",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "10dk",
    image: "/images/lor-peynirli-tost.jpg",
    servings: "1 kişilik",
    ingredients: [
      "2 dilim çavdar ekmeği",
      "3 yemek kaşığı lor peyniri",
      "5-6 adet fesleğen yaprağı",
      "3-4 dilim salatalık",
      "Taze kekik",
      "Karabiber",
    ],
    steps: [
      "Lor peynirini ezin ve baharatlarla karıştırın.",
      "Ekmeğin üzerine peynir karışımını sürün.",
      "Salatalık dilimlerini ve fesleğen yapraklarını yerleştirin.",
      "Diğer dilim ekmeği üzerine kapatın.",
      "Tost makinesinde veya tavada hafifçe kızartın.",
    ],
  },
  {
    id: 40,
    name: "Chia Tohumlu Puding",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "10dk + bekleme",
    image: "/images/chia-tohumlu-puding.jpg",
    servings: "1 kişilik",
    ingredients: [
      "2 yemek kaşığı chia tohumu",
      "1 su bardağı badem sütü",
      "1 tatlı kaşığı bal veya akçaağaç şurubu",
      "1/2 çay kaşığı vanilya özütü",
      "Üzeri için: taze meyveler ve fındık",
    ],
    steps: [
      "Chia tohumlarını süt ile karıştırın.",
      "Bal ve vanilyayı ekleyip tekrar karıştırın.",
      "Buzdolabında en az 4 saat veya bir gece bekletin.",
      "Servis etmeden önce üzerine meyve ve fındık ekleyin.",
    ],
  },
  {
    id: 41,
    name: "Sebzeli Tofu Scramble",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "15dk",
    image: "/images/sebzeli-tofu-scramble.jpg",
    servings: "2 kişilik",
    ingredients: [
      "200g sıkı tofu",
      "1/4 kırmızı biber",
      "1/4 sarı biber",
      "1/2 soğan",
      "1 avuç ıspanak",
      "1 çay kaşığı zerdeçal",
      "1/2 çay kaşığı kimyon",
      "Tuz, karabiber",
      "1 yemek kaşığı zeytinyağı",
    ],
    steps: [
      "Tofuyu elinizle ufalayın.",
      "Sebzeleri küçük küçük doğrayın.",
      "Zeytinyağında soğanı kavurun.",
      "Biberleri ekleyip 2-3 dakika pişirin.",
      "Tofuyu ve baharatları ekleyip karıştırın.",
      "Son olarak ıspanağı ekleyip solana kadar pişirin.",
    ],
  },
  {
    id: 42,
    name: "Muzlu Yulaf Lapası",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "10dk",
    image: "/images/muzlu-yulaf-lapasi.jpg",
    servings: "1 kişilik",
    ingredients: [
      "1/2 su bardağı yulaf ezmesi",
      "1 su bardağı süt (badem, hindistan cevizi veya inek sütü)",
      "1 adet muz",
      "1 çay kaşığı tarçın",
      "1 yemek kaşığı kuru üzüm",
      "1 tatlı kaşığı bal (isteğe bağlı)",
    ],
    steps: [
      "Yulaf ezmesini süt ile karıştırıp orta ateşte pişirin.",
      "Muzun yarısını ezin ve yulafa ekleyin.",
      "Kalan muzun yarısını dilimleyin.",
      "Lapayı kaseye alıp üzerine muz dilimleri, kuru üzüm ve tarçın serpin.",
    ],
  },
  {
    id: 43,
    name: "Yeşil Çaylı Smoothie",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "5dk",
    image: "/images/yesil-cayli-smoothie.jpg",
    servings: "1 kişilik",
    ingredients: [
      "1 fincan demlenmiş ve soğutulmuş yeşil çay",
      "1 adet muz",
      "1/2 avokado",
      "1 avuç ıspanak",
      "1 tatlı kaşığı bal",
      "1/2 limon suyu",
    ],
    steps: [
      "Tüm malzemeleri blenderdan geçirin.",
      "Kıvamı çok katı olursa biraz su ekleyin.",
      "Soğuk olarak hemen servis yapın.",
    ],
  },
  {
    id: 44,
    name: "Tam Tahıllı Waffle",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "20dk",
    image: "/images/tam-tahilli-waffle.jpg",
    servings: "2 kişilik",
    ingredients: [
      "1 su bardağı tam buğday unu",
      "1 çay kaşığı kabartma tozu",
      "1 adet yumurta",
      "3/4 su bardağı yağsız süt",
      "2 yemek kaşığı zeytinyağı",
      "1 çay kaşığı vanilya özütü",
      "Üzeri için: taze meyveler ve az miktarda bal",
    ],
    steps: [
      "Kuru malzemeleri bir kapta karıştırın.",
      "Başka bir kapta yumurta, süt, zeytinyağı ve vanilyayı çırpın.",
      "Kuru karışımı sıvı karışıma ekleyip karıştırın.",
      "Waffle makinesini ısıtın ve hamuru pişirin.",
      "Üzerine taze meyveler ve az miktarda bal ile servis yapın.",
    ],
  },
  {
    id: 45,
    name: "Fırında Yumurtalı Avokado",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "15dk",
    image: "/images/firinda-yumurtali-avokado.jpg",
    servings: "1 kişilik",
    ingredients: [
      "1 adet avokado",
      "2 adet yumurta",
      "Tuz, karabiber",
      "Pul biber",
      "1 yemek kaşığı doğranmış maydanoz",
    ],
    steps: [
      "Avokadoyu ikiye bölüp çekirdeğini çıkarın.",
      "Her bir yarımın içini biraz genişletin.",
      "Yumurtaları avokado çukurlarına kırın.",
      "Tuz ve karabiber serpin.",
      "Önceden ısıtılmış 200°C fırında 10-12 dakika pişirin.",
      "Üzerine pul biber ve maydanoz serperek servis yapın.",
    ],
  },
  {
    id: 46,
    name: "Yulaflı Elma Parçacıkları",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "25dk",
    image: "/images/yulafli-elma-parcaciklari.jpg",
    servings: "2 kişilik",
    ingredients: [
      "2 adet elma",
      "1 su bardağı yulaf ezmesi",
      "1 yemek kaşığı keten tohumu",
      "1 çay kaşığı tarçın",
      "1/4 çay kaşığı muskat",
      "2 yemek kaşığı bal",
      "2 yemek kaşığı hindistan cevizi yağı",
    ],
    steps: [
      "Elmaları küp küp doğrayın.",
      "Yulaf ezmesi, keten tohumu ve baharatları karıştırın.",
      "Hindistan cevizi yağını eritin ve bal ile karıştırın.",
      "Tüm malzemeleri karıştırıp fırın tepsisine yayın.",
      "180°C fırında 20 dakika pişirin, arada karıştırın.",
    ],
  },
  {
    id: 47,
    name: "Ispanaklı Yumurta Muffin",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "25dk",
    image: "/images/ispanakli-yumurta-muffin.jpg",
    servings: "6 adet",
    ingredients: [
      "6 adet yumurta",
      "1 avuç ıspanak",
      "1/4 kırmızı biber",
      "1/4 sarı biber",
      "2 yemek kaşığı süzme yoğurt",
      "Tuz, karabiber",
      "1 çay kaşığı kekik",
    ],
    steps: [
      "Yumurtaları çırpın ve baharatları ekleyin.",
      "Ispanağı doğrayın, biberleri küçük küçük kesin.",
      "Sebzeleri yumurta karışımına ekleyin.",
      "Muffin kalıplarına paylaştırın.",
      "180°C fırında 20 dakika pişirin.",
    ],
  },
  {
    id: 48,
    name: "Hindistan Cevizli Chia Puding",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "10dk + bekleme",
    image: "/images/hindistan-cevizli-chia-puding.jpg",
    servings: "2 kişilik",
    ingredients: [
      "4 yemek kaşığı chia tohumu",
      "1 su bardağı hindistan cevizi sütü",
      "1/2 çay kaşığı vanilya özütü",
      "1 yemek kaşığı hindistan cevizi rendesi",
      "1 yemek kaşığı akçaağaç şurubu",
      "Üzeri için: taze meyveler",
    ],
    steps: [
      "Chia tohumlarını hindistan cevizi sütü ile karıştırın.",
      "Vanilya, hindistan cevizi rendesi ve akçaağaç şurubunu ekleyin.",
      "Buzdolabında en az 4 saat veya bir gece bekletin.",
      "Servis etmeden önce üzerine taze meyveler ekleyin.",
    ],
  },
  {
    id: 49,
    name: "Karabuğdaylı Kahvaltı Kasesi",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "20dk",
    image: "/images/karabugdayli-kahvalti-kasesi.jpg",
    servings: "2 kişilik",
    ingredients: [
      "1/2 su bardağı karabuğday",
      "1 su bardağı su",
      "1 adet muz",
      "1 avuç çilek",
      "1 yemek kaşığı chia tohumu",
      "2 yemek kaşığı yoğurt",
      "1 tatlı kaşığı bal",
    ],
    steps: [
      "Karabuğdayı yıkayıp süzün.",
      "Su ile pişirin (yaklaşık 15 dakika).",
      "Soğumaya bırakın.",
      "Meyveleri doğrayın.",
      "Karabuğdayı kaseye alıp üzerine yoğurt, meyveler, chia tohumu ve bal ekleyin.",
    ],
  },
  {
    id: 50,
    name: "Sebzeli Tofu Wrap",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "15dk",
    image: "/images/sebzeli-tofu-wrap.jpg",
    servings: "1 kişilik",
    ingredients: [
      "1 adet tam buğday lavaşı",
      "100g tofu",
      "1/4 kırmızı biber",
      "1/4 sarı biber",
      "1 avuç roka",
      "1 yemek kaşığı zeytinyağı",
      "1/2 çay kaşığı zerdeçal",
      "Tuz, karabiber",
    ],
    steps: [
      "Tofuyu küçük parçalara bölün ve baharatlarla karıştırın.",
      "Zeytinyağında tofuyu soteleyin.",
      "Biberleri ince ince doğrayıp tofuya ekleyin ve 2-3 dakika pişirin.",
      "Lavaşı ısıtın ve içine roka yapraklarını yerleştirin.",
      "Tofu karışımını ekleyip sarın.",
    ],
  },
  {
    id: 51,
    name: "Meyveli Yoğurt Parfesi",
    category: "Kahvaltı",
    subcategory: "Diyet",
    time: "10dk",
    image: "/images/meyveli-yogurt-parfesi.jpg",
    servings: "1 kişilik",
    ingredients: [
      "1 su bardağı yağsız yoğurt",
      "1/2 su bardağı yaban mersini",
      "1/2 su bardağı çilek",
      "2 yemek kaşığı granola",
      "1 tatlı kaşığı bal",
      "1 çay kaşığı tarçın",
    ],
    steps: [
      "Uzun bir bardağın dibine yoğurdun bir kısmını koyun.",
      "Üzerine meyvelerin bir kısmını ekleyin.",
      "Tekrar yoğurt ve meyve katmanları oluşturun.",
      "En üste granola serpin.",
      "Bal ve tarçın ile süsleyin.",
    ],
  },

  // 21 Diyet Ara Öğün Tarifleri (ID: 52-72)
  {
    id: 52,
    name: "Badem Ezmeli Elma Dilimleri",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "5dk",
    image: "/images/badem-ezmeli-elma-dilimleri.jpg",
    servings: "1 kişilik",
    ingredients: [
      "1 adet elma",
      "1 yemek kaşığı badem ezmesi",
      "1 çay kaşığı tarçın",
      "5-6 adet badem (kıyılmış)",
    ],
    steps: [
      "Elmayı yıkayıp dilimleyin.",
      "Üzerine badem ezmesi sürün.",
      "Tarçın serpin ve kıyılmış bademlerle süsleyin.",
    ],
  },
  {
    id: 53,
    name: "Proteinli Enerji Topları",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "15dk + bekleme",
    image: "/images/proteinli-enerji-toplari.jpg",
    servings: "10 adet",
    ingredients: [
      "1 su bardağı yulaf ezmesi",
      "2 yemek kaşığı protein tozu",
      "2 yemek kaşığı fıstık ezmesi",
      "1 yemek kaşığı bal",
      "1 yemek kaşığı chia tohumu",
      "2 yemek kaşığı hindistan cevizi rendesi",
    ],
    steps: [
      "Tüm malzemeleri bir kapta karıştırın.",
      "Karışımdan ceviz büyüklüğünde parçalar alıp yuvarlayın.",
      "Hindistan cevizi rendesine bulayın.",
      "Buzdolabında 30 dakika bekletin.",
    ],
  },
  {
    id: 54,
    name: "Humuslu Salatalık Çubukları",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "10dk",
    image: "/images/humuslu-salatalik-cubuklari.jpg",
    servings: "1 kişilik",
    ingredients: [
      "1 adet salatalık",
      "3 yemek kaşığı humus",
      "1 çay kaşığı pul biber",
      "1 çay kaşığı zeytinyağı",
      "Taze nane yaprakları",
    ],
    steps: [
      "Salatalığı çubuklar halinde kesin.",
      "Humusu bir kaseye alın ve üzerine zeytinyağı gezdirin.",
      "Pul biber serpin ve nane yapraklarıyla süsleyin.",
      "Salatalık çubuklarını humusa batırarak tüketin.",
    ],
  },
  {
    id: 55,
    name: "Yoğurtlu Meyveli Buz",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "10dk + dondurma",
    image: "/images/yogurtlu-meyveli-buz.jpg",
    servings: "4 adet",
    ingredients: [
      "1 su bardağı yağsız yoğurt",
      "1/2 su bardağı karışık orman meyveleri",
      "1 tatlı kaşığı bal",
      "1/2 çay kaşığı vanilya özütü",
    ],
    steps: [
      "Yoğurt, bal ve vanilyayı karıştırın.",
      "Buz kalıplarına biraz yoğurt karışımı koyun.",
      "Üzerine meyveleri yerleştirin.",
      "Kalan yoğurdu ekleyin.",
      "Dondurucuda en az 4 saat bekletin.",
    ],
  },
  {
    id: 56,
    name: "Avokado Çikolatalı Mousse",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "10dk",
    image: "/images/avokado-cikolatali-mousse.jpg",
    servings: "2 kişilik",
    ingredients: [
      "1 adet olgun avokado",
      "2 yemek kaşığı kakao tozu",
      "1 yemek kaşığı bal",
      "1/4 su bardağı badem sütü",
      "1/2 çay kaşığı vanilya özütü",
      "Üzeri için: yaban mersini",
    ],
    steps: [
      "Avokadoyu ezin.",
      "Tüm malzemeleri blenderdan geçirin.",
      "Kâselere paylaştırın.",
      "Üzerini yaban mersini ile süsleyin.",
      "Servis etmeden önce 30 dakika buzdolabında bekletin.",
    ],
  },
  {
    id: 57,
    name: "Baharatlı Nohut Çerezi",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "40dk",
    image: "/images/baharatli-nohut-cerezi.jpg",
    servings: "4 kişilik",
    ingredients: [
      "1 kutu haşlanmış nohut (400g)",
      "1 yemek kaşığı zeytinyağı",
      "1 çay kaşığı kimyon",
      "1 çay kaşığı kırmızı toz biber",
      "1/2 çay kaşığı zerdeçal",
      "Tuz, karabiber",
    ],
    steps: [
      "Nohutları süzüp kurulayın.",
      "Zeytinyağı ve baharatlarla karıştırın.",
      "Fırın tepsisine tek kat halinde yayın.",
      "180°C fırında 30-35 dakika, altın rengi olana kadar pişirin.",
      "Arada karıştırın ve soğuduktan sonra servis yapın.",
    ],
  },
  {
    id: 58,
    name: "Yaban Mersinli Yoğurt Kasesi",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "5dk",
    image: "/images/yaban-mersinli-yogurt-kasesi.jpg",
    servings: "1 kişilik",
    ingredients: [
      "1 su bardağı yağsız yoğurt",
      "1/2 su bardağı yaban mersini",
      "1 yemek kaşığı keten tohumu",
      "1 tatlı kaşığı bal",
      "1 çay kaşığı tarçın",
    ],
    steps: [
      "Yoğurdu kaseye alın.",
      "Üzerine yaban mersinlerini ekleyin.",
      "Keten tohumu serpin.",
      "Bal ve tarçın ile tatlandırın.",
    ],
  },
  {
    id: 59,
    name: "Yeşil Smoothie Bowl",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "10dk",
    image: "/images/yesil-smoothie-bowl.jpg",
    servings: "1 kişilik",
    ingredients: [
      "1 adet muz",
      "1 avuç ıspanak",
      "1/2 avokado",
      "1/4 su bardağı badem sütü",
      "Üzeri için: chia tohumu, hindistan cevizi rendesi, kivi dilimleri",
    ],
    steps: [
      "Muz, ıspanak, avokado ve badem sütünü blenderdan geçirin.",
      "Kaseye alın.",
      "Üzerini kivi dilimleri, chia tohumu ve hindistan cevizi rendesi ile süsleyin.",
    ],
  },
  {
    id: 60,
    name: "Badem Sütlü Chia Puding",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "5dk + bekleme",
    image: "/images/badem-sutlu-chia-puding.jpg",
    servings: "1 kişilik",
    ingredients: [
      "2 yemek kaşığı chia tohumu",
      "1 su bardağı badem sütü",
      "1/2 çay kaşığı vanilya özütü",
      "1 tatlı kaşığı bal",
      "Üzeri için: taze meyveler",
    ],
    steps: [
      "Chia tohumlarını badem sütü ile karıştırın.",
      "Vanilya ve balı ekleyip karıştırın.",
      "Buzdolabında en az 4 saat bekletin.",
      "Üzerini taze meyvelerle süsleyin.",
    ],
  },
  {
    id: 61,
    name: "Fırında Elma Dilimleri",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "30dk",
    image: "/images/firinda-elma-dilimleri.jpg",
    servings: "2 kişilik",
    ingredients: ["2 adet elma", "1 çay kaşığı tarçın", "1 tatlı kaşığı bal"],
    steps: [
      "Elmaları ince dilimler halinde kesin.",
      "Fırın tepsisine yağlı kağıt serin ve elma dilimlerini dizin.",
      "Üzerlerine tarçın serpin.",
      "160°C fırında 25 dakika pişirin.",
      "Çıkarınca üzerine bal gezdirin.",
    ],
  },
  {
    id: 62,
    name: "Lor Peynirli Kabak Mücveri",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "20dk",
    image: "/images/lor-peynirli-kabak-mucveri.jpg",
    servings: "2 kişilik",
    ingredients: [
      "2 adet orta boy kabak",
      "100g lor peyniri",
      "1 adet yumurta",
      "2 yemek kaşığı tam buğday unu",
      "1 avuç doğranmış dereotu",
      "Tuz, karabiber",
      "1 yemek kaşığı zeytinyağı",
    ],
    steps: [
      "Kabakları rendeleyin ve suyunu sıkın.",
      "Tüm malzemeleri karıştırın.",
      "Yapışmaz tavada zeytinyağı ile küçük mücverler halinde pişirin.",
      "Her iki tarafı da altın rengi olana kadar kızartın.",
    ],
  },
  {
    id: 63,
    name: "Kinoa Salatası",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "25dk",
    image: "/images/kinoa-salatasi.jpg",
    servings: "2 kişilik",
    ingredients: [
      "1/2 su bardağı kinoa",
      "1 su bardağı su",
      "1/2 salatalık",
      "5-6 adet kiraz domates",
      "1/4 kırmızı soğan",
      "1 avuç maydanoz",
      "2 yemek kaşığı zeytinyağı",
      "1 limonun suyu",
      "Tuz, karabiber",
    ],
    steps: [
      "Kinoayı yıkayıp süzün.",
      "Su ile pişirin (yaklaşık 15 dakika).",
      "Soğumaya bırakın.",
      "Sebzeleri küçük küçük doğrayın.",
      "Tüm malzemeleri karıştırın.",
      "Zeytinyağı, limon suyu, tuz ve karabiber ile tatlandırın.",
    ],
  },
  {
    id: 64,
    name: "Yoğurtlu Meyveli Dondurma",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "10dk + dondurma",
    image: "/images/yogurtlu-meyveli-dondurma.jpg",
    servings: "4 kişilik",
    ingredients: [
      "2 su bardağı yağsız yoğurt",
      "1 su bardağı karışık dondurulmuş meyveler",
      "2 yemek kaşığı bal",
      "1 çay kaşığı vanilya özütü",
    ],
    steps: [
      "Dondurulmuş meyveleri blenderdan geçirin.",
      "Yoğurt, bal ve vanilyayı ekleyip karıştırın.",
      "Karışımı bir kaba aktarın.",
      "Dondurucuda 4 saat bekletin, her saat başı karıştırın.",
    ],
  },
  {
    id: 65,
    name: "Baharatlı Edamame",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "10dk",
    image: "/images/baharatli-edamame.jpg",
    servings: "2 kişilik",
    ingredients: [
      "200g edamame (soya fasulyesi)",
      "1 çay kaşığı deniz tuzu",
      "1/2 çay kaşığı kırmızı pul biber",
      "1 diş ezilmiş sarımsak",
      "1 limonun kabuğu rendesi",
    ],
    steps: [
      "Edamame'yi tuzlu suda 5 dakika haşlayın.",
      "Süzüp bir kaseye alın.",
      "Üzerine tuz, pul biber, sarımsak ve limon kabuğu rendesi serpin.",
      "Karıştırıp sıcak servis yapın.",
    ],
  },
  {
    id: 66,
    name: "Tam Tahıllı Kraker ve Humus",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "5dk",
    image: "/images/tam-tahilli-kraker-humus.jpg",
    servings: "1 kişilik",
    ingredients: [
      "10 adet tam tahıllı kraker",
      "3 yemek kaşığı humus",
      "5-6 adet kiraz domates",
      "Taze kekik",
    ],
    steps: [
      "Krakerleri tabağa dizin.",
      "Üzerlerine humus sürün.",
      "İkiye bölünmüş kiraz domatesleri yerleştirin.",
      "Taze kekik ile süsleyin.",
    ],
  },
  {
    id: 67,
    name: "Yulaf Ezmeli Muz Sandviç",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "5dk",
    image: "/images/yulaf-ezmeli-muz-sandvic.jpg",
    servings: "1 kişilik",
    ingredients: [
      "1 adet muz",
      "1 yemek kaşığı fıstık ezmesi",
      "1 yemek kaşığı yulaf ezmesi",
      "1 çay kaşığı chia tohumu",
    ],
    steps: [
      "Muzu ortadan ikiye kesin.",
      "Uzunlamasına yarın ama tamamen ayırmayın.",
      "İçine fıstık ezmesi sürün.",
      "Yulaf ezmesi ve chia tohumu serpin.",
    ],
  },
  {
    id: 68,
    name: "Sebzeli Tavuk Ruloları",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "15dk",
    image: "/images/sebzeli-tavuk-rulolari.jpg",
    servings: "2 kişilik",
    ingredients: [
      "100g haşlanmış tavuk göğsü",
      "1/2 avokado",
      "1/4 salatalık",
      "1/4 kırmızı biber",
      "1 avuç roka",
      "1 yemek kaşığı yoğurt",
      "Tuz, karabiber",
    ],
    steps: [
      "Tavuk göğsünü ince dilimler halinde kesin.",
      "Avokadoyu ezin ve yoğurt ile karıştırın.",
      "Sebzeleri ince şeritler halinde doğrayın.",
      "Tavuk dilimlerinin üzerine avokado karışımını sürün.",
      "Sebzeleri yerleştirip rulo yapın.",
    ],
  },
  {
    id: 69,
    name: "Kefirli Meyve Smoothie",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "5dk",
    image: "/images/kefirli-meyve-smoothie.jpg",
    servings: "1 kişilik",
    ingredients: [
      "1 su bardağı kefir",
      "1/2 su bardağı karışık orman meyveleri",
      "1 tatlı kaşığı bal",
      "1 çay kaşığı tarçın",
      "5-6 adet badem",
    ],
    steps: [
      "Kefir, meyveler, bal ve tarçını blenderdan geçirin.",
      "Bardağa dökün.",
      "Üzerine kıyılmış badem serpin.",
    ],
  },
  {
    id: 70,
    name: "Mercimek Köftesi",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "40dk",
    image: "/images/mercimek-koftesi-diyet.jpg",
    servings: "4 kişilik",
    ingredients: [
      "1 su bardağı kırmızı mercimek",
      "1/2 su bardağı ince bulgur",
      "1 adet soğan",
      "2 yemek kaşığı zeytinyağı",
      "1 yemek kaşığı domates salçası",
      "1 demet maydanoz",
      "Tuz, karabiber, pul biber",
    ],
    steps: [
      "Mercimeği yumuşayana kadar haşlayın.",
      "Bulguru ekleyip karıştırın ve 15 dakika dinlendirin.",
      "Soğanı yemeklik doğrayıp zeytinyağında kavurun.",
      "Salçayı ekleyip 2 dakika daha kavurun.",
      "Soğan karışımını mercimekli harca ekleyin.",
      "Baharatları ve ince kıyılmış maydanozu ekleyin.",
      "Harç ılıdıktan sonra şekil verin.",
    ],
  },
  {
    id: 71,
    name: "Yoğurtlu Salatalık Çanağı",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "10dk",
    image: "/images/yogurtlu-salatalik-canagi.jpg",
    servings: "1 kişilik",
    ingredients: [
      "1 adet salatalık",
      "1/2 su bardağı yağsız yoğurt",
      "1 diş sarımsak",
      "1 yemek kaşığı zeytinyağı",
      "1 çay kaşığı kuru nane",
      "Tuz, karabiber",
    ],
    steps: [
      "Salatalığı küp küp doğrayın.",
      "Sarımsağı ezin ve yoğurtla karıştırın.",
      "Yoğurdu salatalıkların üzerine dökün.",
      "Zeytinyağı gezdirip baharatları serpin.",
    ],
  },
  {
    id: 72,
    name: "Fırında Tatlı Patates Cipsler",
    category: "Ara Öğün",
    subcategory: "Diyet",
    time: "30dk",
    image: "/images/firinda-tatli-patates-cipsler.jpg",
    servings: "2 kişilik",
    ingredients: [
      "1 adet orta boy tatlı patates",
      "1 yemek kaşığı zeytinyağı",
      "1 çay kaşığı deniz tuzu",
      "1/2 çay kaşığı kekik",
    ],
    steps: [
      "Tatlı patatesi çok ince dilimleyin.",
      "Zeytinyağı, tuz ve kekik ile harmanlayın.",
      "Fırın tepsisine tek kat halinde dizin.",
      "180°C fırında 20-25 dakika, kenarları kızarana kadar pişirin.",
    ],
  },

  // 22 Diyet Tatlı Tarifleri (ID: 73-94)
  {
    id: 73,
    name: "Çikolatalı Avokado Puding",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "15dk + soğutma",
    image: "/images/cikolatali-avokado-puding.jpg",
    servings: "2 kişilik",
    ingredients: [
      "2 adet olgun avokado",
      "3 yemek kaşığı kakao tozu",
      "2 yemek kaşığı bal",
      "1/4 su bardağı badem sütü",
      "1 çay kaşığı vanilya özütü",
      "Üzeri için: yaban mersini ve nane yaprağı",
    ],
    steps: [
      "Avokadoları ezin.",
      "Tüm malzemeleri blenderdan geçirin.",
      "Kâselere paylaştırın.",
      "Buzdolabında en az 2 saat soğutun.",
      "Servis etmeden önce yaban mersini ve nane yaprağı ile süsleyin.",
    ],
  },
  {
    id: 74,
    name: "Muzlu Dondurma",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "10dk + dondurma",
    image: "/images/muzlu-dondurma.jpg",
    servings: "2 kişilik",
    ingredients: [
      "3 adet olgun muz (dondurulmuş)",
      "2 yemek kaşığı fıstık ezmesi",
      "1 çay kaşığı vanilya özütü",
      "Üzeri için: kıyılmış fındık",
    ],
    steps: [
      "Dondurulmuş muzları blenderdan geçirin.",
      "Fıstık ezmesi ve vanilyayı ekleyip tekrar karıştırın.",
      "Hemen servis yapın veya dondurucuda 30 dakika bekletip daha katı kıvam almasını sağlayın.",
      "Üzerine kıyılmış fındık serpin.",
    ],
  },
  {
    id: 75,
    name: "Chia Tohumlu Puding",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "10dk + bekleme",
    image: "/images/chia-tohumlu-puding-tatli.jpg",
    servings: "2 kişilik",
    ingredients: [
      "4 yemek kaşığı chia tohumu",
      "1 su bardağı badem sütü",
      "1 yemek kaşığı akçaağaç şurubu",
      "1/2 çay kaşığı vanilya özütü",
      "Üzeri için: taze meyveler ve fındık",
    ],
    steps: [
      "Chia tohumlarını süt ile karıştırın.",
      "Akçaağaç şurubu ve vanilyayı ekleyip tekrar karıştırın.",
      "Buzdolabında en az 4 saat veya bir gece bekletin.",
      "Servis etmeden önce üzerine taze meyveler ve fındık ekleyin.",
    ],
  },
  {
    id: 76,
    name: "Elmalı Tarçınlı Yulaf Kurabiyesi",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "25dk",
    image: "/images/elmali-tarcinli-yulaf-kurabiyesi.jpg",
    servings: "12 adet",
    ingredients: [
      "2 su bardağı yulaf ezmesi",
      "1 adet elma (rendelenmiş)",
      "2 adet muz (ezilmiş)",
      "1/4 su bardağı kuru üzüm",
      "1 çay kaşığı tarçın",
      "1 çay kaşığı vanilya özütü",
    ],
    steps: [
      "Tüm malzemeleri bir kapta karıştırın.",
      "Kaşık yardımıyla yağlı kağıt serilmiş tepsiye yerleştirin.",
      "180°C fırında 15-20 dakika pişirin.",
    ],
  },
  {
    id: 77,
    name: "Hindistan Cevizli Enerji Topları",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "15dk + soğutma",
    image: "/images/hindistan-cevizli-enerji-toplari.jpg",
    servings: "15 adet",
    ingredients: [
      "1 su bardağı kuru hurma",
      "1/2 su bardağı badem",
      "1/2 su bardağı ceviz",
      "2 yemek kaşığı kakao tozu",
      "1 yemek kaşığı hindistan cevizi yağı",
      "1/4 su bardağı hindistan cevizi rendesi",
    ],
    steps: [
      "Hurmaları sıcak suda 10 dakika bekletin ve çekirdeklerini çıkarın.",
      "Tüm malzemeleri (hindistan cevizi rendesi hariç) mutfak robotunda karıştırın.",
      "Karışımdan ceviz büyüklüğünde parçalar alıp yuvarlayın.",
      "Hindistan cevizi rendesine bulayın.",
      "Buzdolabında 1 saat bekletin.",
    ],
  },
  {
    id: 78,
    name: "Yoğurtlu Dondurulmuş Üzüm",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "10dk + dondurma",
    image: "/images/yogurtlu-dondurulmus-uzum.jpg",
    servings: "2 kişilik",
    ingredients: [
      "2 su bardağı üzüm",
      "1/2 su bardağı yağsız yoğurt",
      "1 yemek kaşığı bal",
    ],
    steps: [
      "Üzümleri yıkayıp kurulayın.",
      "Yoğurt ve balı karıştırın.",
      "Üzümleri yoğurtlu karışıma batırın.",
      "Yağlı kağıt serilmiş tepsiye dizin.",
      "Dondurucuda 2-3 saat bekletin.",
    ],
  },
  {
    id: 79,
    name: "Fırında Elma Tatlısı",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "30dk",
    image: "/images/firinda-elma-tatlisi.jpg",
    servings: "4 kişilik",
    ingredients: [
      "4 adet elma",
      "2 yemek kaşığı bal",
      "1 çay kaşığı tarçın",
      "1/4 su bardağı kuru üzüm",
      "1/4 su bardağı ceviz (kıyılmış)",
      "1 yemek kaşığı limon suyu",
    ],
    steps: [
      "Elmaların içini oyun ama tamamen delmeyin.",
      "Bal, tarçın, kuru üzüm ve cevizi karıştırın.",
      "Karışımı elmaların içine doldurun.",
      "Fırın kabına dizin ve her birinin üzerine limon suyu damlatın.",
      "180°C fırında 20-25 dakika pişirin.",
    ],
  },
  {
    id: 80,
    name: "Çilekli Yoğurt Parfesi",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "15dk",
    image: "/images/cilekli-yogurt-parfesi.jpg",
    servings: "2 kişilik",
    ingredients: [
      "2 su bardağı yağsız yoğurt",
      "1 su bardağı çilek (doğranmış)",
      "2 yemek kaşığı bal",
      "1/4 su bardağı granola",
      "1 yemek kaşığı chia tohumu",
    ],
    steps: [
      "Yoğurt ve balın yarısını karıştırın.",
      "Bardakların dibine granola koyun.",
      "Üzerine yoğurt karışımının bir kısmını ekleyin.",
      "Çileklerin bir kısmını ekleyin.",
      "Katmanları tekrarlayın.",
      "En üste chia tohumu serpin.",
    ],
  },
  {
    id: 81,
    name: "Muzlu Yulaf Keki",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "35dk",
    image: "/images/muzlu-yulaf-keki.jpg",
    servings: "8 dilim",
    ingredients: [
      "2 adet olgun muz",
      "2 adet yumurta",
      "1/4 su bardağı bal",
      "1/4 su bardağı zeytinyağı",
      "1 çay kaşığı vanilya özütü",
      "1.5 su bardağı yulaf unu",
      "1 çay kaşığı kabartma tozu",
      "1/2 çay kaşığı tarçın",
      "1/4 su bardağı ceviz (kıyılmış)",
    ],
    steps: [
      "Muzları ezin ve yumurta, bal, zeytinyağı, vanilya ile karıştırın.",
      "Kuru malzemeleri ekleyip karıştırın.",
      "Cevizleri ekleyin.",
      "Yağlanmış kek kalıbına dökün.",
      "180°C fırında 25-30 dakika pişirin.",
    ],
  },
  {
    id: 82,
    name: "Kayısılı Chia Puding",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "10dk + bekleme",
    image: "/images/kayisili-chia-puding.jpg",
    servings: "2 kişilik",
    ingredients: [
      "4 yemek kaşığı chia tohumu",
      "1 su bardağı badem sütü",
      "4 adet kuru kayısı (doğranmış)",
      "1 yemek kaşığı bal",
      "1/2 çay kaşığı tarçın",
    ],
    steps: [
      "Chia tohumlarını süt ile karıştırın.",
      "Bal ve tarçını ekleyip karıştırın.",
      "Doğranmış kayısıları ekleyin.",
      "Buzdolabında en az 4 saat bekletin.",
    ],
  },
  {
    id: 83,
    name: "Yaban Mersinli Dondurma",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "15dk + dondurma",
    image: "/images/yaban-mersinli-dondurma.jpg",
    servings: "4 kişilik",
    ingredients: [
      "2 su bardağı dondurulmuş yaban mersini",
      "1 su bardağı yağsız yoğurt",
      "2 yemek kaşığı bal",
      "1 çay kaşığı vanilya özütü",
      "1 yemek kaşığı limon suyu",
    ],
    steps: [
      "Tüm malzemeleri blenderdan geçirin.",
      "Karışımı bir kaba aktarın.",
      "Dondurucuda 4 saat bekletin, her saat başı karıştırın.",
    ],
  },
  {
    id: 84,
    name: "Hindistan Cevizli Muz Dilimleri",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "10dk + dondurma",
    image: "/images/hindistan-cevizli-muz-dilimleri.jpg",
    servings: "2 kişilik",
    ingredients: [
      "2 adet muz",
      "2 yemek kaşığı fıstık ezmesi",
      "1/4 su bardağı hindistan cevizi rendesi",
    ],
    steps: [
      "Muzları dilimleyin.",
      "Her dilimin üzerine fıstık ezmesi sürün.",
      "Hindistan cevizi rendesine bulayın.",
      "Yağlı kağıt serilmiş tepsiye dizin.",
      "Dondurucuda 2 saat bekletin.",
    ],
  },
  {
    id: 85,
    name: "Çikolatalı Meyve Şişleri",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "20dk + soğutma",
    image: "/images/cikolatali-meyve-sisleri.jpg",
    servings: "4 kişilik",
    ingredients: [
      "100g bitter çikolata (%70 kakao)",
      "1 adet muz",
      "10 adet çilek",
      "1 adet kivi",
      "10 adet üzüm",
      "2 yemek kaşığı kıyılmış fındık",
    ],
    steps: [
      "Çikolatayı benmari usulü eritin.",
      "Meyveleri küçük parçalara kesin.",
      "Meyveleri şişlere dizin.",
      "Erimiş çikolatayı meyvelerin üzerine gezdirin.",
      "Kıyılmış fındık serpin.",
      "Buzdolabında 30 dakika bekletin.",
    ],
  },
  {
    id: 86,
    name: "Badem Unlu Kurabiye",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "25dk",
    image: "/images/badem-unlu-kurabiye.jpg",
    servings: "12 adet",
    ingredients: [
      "2 su bardağı badem unu",
      "1/4 su bardağı hindistan cevizi yağı (erimiş)",
      "1/4 su bardağı bal",
      "1 adet yumurta",
      "1 çay kaşığı vanilya özütü",
      "1/4 çay kaşığı tuz",
    ],
    steps: [
      "Tüm malzemeleri bir kapta karıştırın.",
      "Hamurdan ceviz büyüklüğünde parçalar alıp yuvarlayın.",
      "Yağlı kağıt serilmiş tepsiye dizin ve elinizle hafifçe bastırın.",
      "170°C fırında 10-12 dakika pişirin.",
    ],
  },
  {
    id: 87,
    name: "Vegan Çikolata Mousse",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "15dk + soğutma",
    image: "/images/vegan-cikolata-mousse.jpg",
    servings: "4 kişilik",
    ingredients: [
      "1 kutu silken tofu (300g)",
      "3 yemek kaşığı kakao tozu",
      "3 yemek kaşığı akçaağaç şurubu",
      "1 çay kaşığı vanilya özütü",
      "Üzeri için: ahududu ve nane yaprağı",
    ],
    steps: [
      "Tofuyu süzün ve kağıt havlu ile kurulayın.",
      "Tüm malzemeleri blenderdan geçirin.",
      "Kâselere paylaştırın.",
      "Buzdolabında en az 2 saat soğutun.",
      "Servis etmeden önce ahududu ve nane yaprağı ile süsleyin.",
    ],
  },
  {
    id: 88,
    name: "Şekersiz Elmalı Crumble",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "40dk",
    image: "/images/sekersiz-elmali-crumble.jpg",
    servings: "4 kişilik",
    ingredients: [
      "4 adet elma",
      "1 çay kaşığı tarçın",
      "1 yemek kaşığı limon suyu",
      "1 su bardağı yulaf ezmesi",
      "1/4 su bardağı badem unu",
      "2 yemek kaşığı hindistan cevizi yağı",
      "2 yemek kaşığı bal",
    ],
    steps: [
      "Elmaları soyun, çekirdeklerini çıkarın ve küp küp doğrayın.",
      "Elmaları tarçın ve limon suyu ile karıştırıp fırın kabına yayın.",
      "Yulaf ezmesi, badem unu, hindistan cevizi yağı ve balı karıştırın.",
      "Karışımı elmaların üzerine serpin.",
      "180°C fırında 30 dakika pişirin.",
    ],
  },
  {
    id: 89,
    name: "Hindistan Cevizli Pirinç Sütlacı",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "40dk + soğutma",
    image: "/images/hindistan-cevizli-pirinc-sutlaci.jpg",
    servings: "4 kişilik",
    ingredients: [
      "1/2 su bardağı pirinç",
      "1 su bardağı su",
      "2 su bardağı hindistan cevizi sütü",
      "2 yemek kaşığı bal",
      "1 çay kaşığı vanilya özütü",
      "1 çay kaşığı tarçın",
      "Üzeri için: hindistan cevizi rendesi",
    ],
    steps: [
      "Pirinci su ile pişirin.",
      "Hindistan cevizi sütünü ekleyip karıştırarak pişirmeye devam edin.",
      "Bal ve vanilyayı ekleyin.",
      "Kıvam alana kadar pişirin (yaklaşık 20 dakika).",
      "Kâselere paylaştırın.",
      "Üzerine tarçın ve hindistan cevizi rendesi serpin.",
      "Soğuduktan sonra servis yapın.",
    ],
  },
  {
    id: 90,
    name: "Yulaf Unlu Muffin",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "30dk",
    image: "/images/yulaf-unlu-muffin.jpg",
    servings: "12 adet",
    ingredients: [
      "2 su bardağı yulaf unu",
      "2 adet muz (ezilmiş)",
      "2 adet yumurta",
      "1/4 su bardağı zeytinyağı",
      "1/4 su bardağı bal",
      "1 çay kaşığı vanilya özütü",
      "1 çay kaşığı kabartma tozu",
      "1/2 çay kaşığı tarçın",
      "1/2 su bardağı yaban mersini",
    ],
    steps: [
      "Kuru malzemeleri bir kapta karıştırın.",
      "Başka bir kapta muz, yumurta, zeytinyağı, bal ve vanilyayı çırpın.",
      "İki karışımı birleştirin.",
      "Yaban mersinlerini ekleyin.",
      "Muffin kalıplarına paylaştırın.",
      "180°C fırında 20-25 dakika pişirin.",
    ],
  },
  {
    id: 91,
    name: "Hurmalı Enerji Barları",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "20dk + soğutma",
    image: "/images/hurmali-enerji-barlari.jpg",
    servings: "12 adet",
    ingredients: [
      "1 su bardağı kuru hurma",
      "1/2 su bardağı badem",
      "1/2 su bardağı kaju",
      "1/4 su bardağı chia tohumu",
      "1/4 su bardağı kuru üzüm",
      "1 çay kaşığı tarçın",
    ],
    steps: [
      "Hurmaları sıcak suda 10 dakika bekletin ve çekirdeklerini çıkarın.",
      "Tüm malzemeleri mutfak robotunda karıştırın.",
      "Karışımı yağlı kağıt serilmiş kare bir kaba yayın.",
      "Buzdolabında 2 saat bekletin.",
      "Dilimleyerek servis yapın.",
    ],
  },
  {
    id: 92,
    name: "Portakallı Chia Puding",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "10dk + bekleme",
    image: "/images/portakalli-chia-puding.jpg",
    servings: "2 kişilik",
    ingredients: [
      "4 yemek kaşığı chia tohumu",
      "1 su bardağı portakal suyu (taze sıkılmış)",
      "1/2 su bardağı hindistan cevizi sütü",
      "1 yemek kaşığı bal",
      "1 portakalın rendesi",
      "Üzeri için: portakal dilimleri",
    ],
    steps: [
      "Chia tohumlarını portakal suyu ve hindistan cevizi sütü ile karıştırın.",
      "Bal ve portakal rendesini ekleyip karıştırın.",
      "Buzdolabında en az 4 saat bekletin.",
      "Üzerini portakal dilimleri ile süsleyin.",
    ],
  },
  {
    id: 93,
    name: "Fırında Armut Tatlısı",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "35dk",
    image: "/images/firinda-armut-tatlisi.jpg",
    servings: "4 kişilik",
    ingredients: [
      "4 adet armut",
      "2 yemek kaşığı bal",
      "1 çay kaşığı tarçın",
      "1/4 su bardağı ceviz (kıyılmış)",
      "1/4 su bardağı kuru üzüm",
      "1 yemek kaşığı limon suyu",
    ],
    steps: [
      "Armutları ikiye bölün ve çekirdeklerini çıkarın.",
      "Bal, tarçın, ceviz ve kuru üzümü karıştırın.",
      "Karışımı armutların içine doldurun.",
      "Fırın kabına dizin ve her birinin üzerine limon suyu damlatın.",
      "180°C fırında 25-30 dakika pişirin.",
    ],
  },
  {
    id: 94,
    name: "Çilekli Dondurulmuş Yoğurt",
    category: "Tatlı",
    subcategory: "Diyet",
    time: "15dk + dondurma",
    image: "/images/cilekli-dondurulmus-yogurt.jpg",
    servings: "4 kişilik",
    ingredients: [
      "2 su bardağı dondurulmuş çilek",
      "1 su bardağı yağsız yoğurt",
      "2 yemek kaşığı bal",
      "1 çay kaşığı vanilya özütü",
      "1 yemek kaşığı limon suyu",
    ],
    steps: [
      "Tüm malzemeleri blenderdan geçirin.",
      "Karışımı bir kaba aktarın.",
      "Dondurucuda 4 saat bekletin, her saat başı karıştırın.",
      "Servis etmeden 10 dakika önce dondurucudan çıkarın.",
    ],
  },

  // Continue adding more recipes for each category...
];

// Categories with their icons
const categories = [
  { id: 1, name: "Ana Yemek", icon: "/images/ana-yemek-icon.png" },
  { id: 2, name: "Ara Öğün", icon: "/images/ara-ogun-icon.png" },
  { id: 3, name: "Kahvaltı", icon: "/images/kahvalti-icon.png" },
  { id: 4, name: "Tatlı", icon: "/images/tatli-icon.png" },
];

// Generate more recipes for each category (20 per category)
const generateMoreRecipes = () => {
  const allRecipes = [...recipes];
  const lastId = allRecipes.length;

  //   // Generate recipes for Ana Yemek
  //   for (let i = 0; i < 15; i++) {
  //     allRecipes.push({
  //       id: lastId + i + 1,
  //       name: `Ana Yemek Tarifi ${i + 1}`,
  //       category: "Ana Yemek",
  //       subcategory: ["Çorba", "Et Yemeği", "Tavuk", "Balık", "Sebze Yemeği"][
  //         i % 5
  //       ],
  //       time: `${20 + i * 5}dk`,
  //       image: "/images/recipe-placeholder.jpg",
  //       servings: `${2 + (i % 4)} kişilik`,
  //       ingredients: [
  //         "Malzeme 1",
  //         "Malzeme 2",
  //         "Malzeme 3",
  //         "Malzeme 4",
  //         "Malzeme 5",
  //       ],
  //       steps: ["Adım 1", "Adım 2", "Adım 3", "Adım 4"],
  //     });
  //   }

  //   // Generate recipes for Ara Öğün
  //   for (let i = 0; i < 18; i++) {
  //     allRecipes.push({
  //       id: lastId + 16 + i,
  //       name: `Ara Öğün Tarifi ${i + 1}`,
  //       category: "Ara Öğün",
  //       subcategory: ["Atıştırmalık", "Meze", "Tost", "Sandviç"][i % 4],
  //       time: `${10 + i * 3}dk`,
  //       image: "/images/recipe-placeholder.jpg",
  //       servings: `${1 + (i % 3)} kişilik`,
  //       ingredients: ["Malzeme 1", "Malzeme 2", "Malzeme 3", "Malzeme 4"],
  //       steps: ["Adım 1", "Adım 2", "Adım 3"],
  //     });
  //   }

  //   // Generate recipes for Kahvaltı
  //   for (let i = 0; i < 19; i++) {
  //     allRecipes.push({
  //       id: lastId + 34 + i,
  //       name: `Kahvaltı Tarifi ${i + 1}`,
  //       category: "Kahvaltı",
  //       subcategory: ["Yumurta", "Ekmek", "Kahvaltılık", "Tatlı"][i % 4],
  //       time: `${5 + i * 2}dk`,
  //       image: "/images/recipe-placeholder.jpg",
  //       servings: `${1 + (i % 4)} kişilik`,
  //       ingredients: ["Malzeme 1", "Malzeme 2", "Malzeme 3"],
  //       steps: ["Adım 1", "Adım 2", "Adım 3"],
  //     });
  //   }

  //   // Generate recipes for Tatlı
  //   for (let i = 0; i < 19; i++) {
  //     allRecipes.push({
  //       id: lastId + 53 + i,
  //       name: `Tatlı Tarifi ${i + 1}`,
  //       category: "Tatlı",
  //       subcategory: [
  //         "Sütlü Tatlı",
  //         "Şerbetli Tatlı",
  //         "Kurabiye",
  //         "Kek",
  //         "Dondurma",
  //       ][i % 5],
  //       time: `${15 + i * 5}dk`,
  //       image: "/images/recipe-placeholder.jpg",
  //       servings: `${2 + (i % 6)} kişilik`,
  //       ingredients: [
  //         "Malzeme 1",
  //         "Malzeme 2",
  //         "Malzeme 3",
  //         "Malzeme 4",
  //         "Malzeme 5",
  //       ],
  //       steps: ["Adım 1", "Adım 2", "Adım 3", "Adım 4"],
  //     });
  //   }

  return allRecipes;
};

const allRecipes = generateMoreRecipes();

function Food() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter recipes by category
  const filteredRecipes = selectedCategory
    ? allRecipes.filter((recipe) => recipe.category === selectedCategory)
    : allRecipes;

  // Get popular recipes (first 9)
  const popularRecipes = allRecipes.slice(0, 9);

  // Get recipes for "Bugün Ne Pişirsem?" section (next 6)
  const todaysRecipes = allRecipes.slice(9, 15);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentView("category");
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView("recipe");
  };

  const goBack = () => {
    if (currentView === "recipe") {
      if (selectedCategory) {
        setCurrentView("category");
      } else {
        setCurrentView("home");
      }
    } else if (currentView === "category") {
      setCurrentView("home");
      setSelectedCategory(null);
    }
  };

  const goHome = () => {
    setCurrentView("home");
    setSelectedCategory(null);
    setSelectedRecipe(null);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter recipes based on search term
  const searchResults = searchTerm
    ? allRecipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="app">
      <header className="header">
        <h1 onClick={goHome}>YemekTarifleri</h1>
        <p className="subtitle">Sağlıklı Yaşamın Lezzetli Hali</p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Tarif Bul... 🔍"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </header>

      {currentView !== "home" && (
        <button className="back-button" onClick={goBack}>
          ← Geri
        </button>
      )}

      {currentView === "home" && (
        <>
          <div className="categories">
            {categories.map((category) => (
              <div
                key={category.id}
                className="category-item"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="category-icon">
                  <div className="icon-placeholder"></div>
                </div>
                <p>{category.name}</p>
              </div>
            ))}
          </div>

          {searchTerm && (
            <section className="search-results">
              <h2>Arama Sonuçları</h2>
              <div className="recipe-cards">
                {searchResults.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="recipe-card"
                    onClick={() => handleRecipeClick(recipe)}
                  >
                    <div className="recipe-image">
                   <img src={recipe.image} alt={recipe.name} />

                    </div>
                    <div className="recipe-info">
                      <span className="recipe-subcategory">
                        {recipe.subcategory}
                      </span>
                      <h3 className="recipe-name">{recipe.name}</h3>
                      <span className="recipe-time">{recipe.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              {searchResults.length === 0 && (
                <p className="no-results">
                  Aradığınız kriterlere uygun tarif bulunamadı.
                </p>
              )}
            </section>
          )}

          {!searchTerm && (
            <>
              <section className="popular-recipes">
                <h2>Popüler Diyet Yemekleri</h2>
                <div className="recipe-cards">
                  {popularRecipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="recipe-card"
                      onClick={() => handleRecipeClick(recipe)}
                    >
                      <div className="recipe-image">
                       <img src={recipe.image} alt={recipe.name} />

                      </div>
                      <div className="recipe-info">
                        <span className="recipe-subcategory">
                          {recipe.subcategory}
                        </span>
                        <h3 className="recipe-name">{recipe.name}</h3>
                        <span className="recipe-time">{recipe.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="todays-recipes">
                <h2>Lezzetli Yemek Tarifleri</h2>
                <h3>Bugün Ne Pişirsem?</h3>
                <div className="recipe-cards">
                  {todaysRecipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="recipe-card"
                      onClick={() => handleRecipeClick(recipe)}
                    >
                      <div className="recipe-image">
                       <img src={recipe.image} alt={recipe.name} />

                      </div>
                      <div className="recipe-info">
                        <span className="recipe-subcategory">
                          {recipe.subcategory}
                        </span>
                        <h3 className="recipe-name">{recipe.name}</h3>
                        <span className="recipe-time">{recipe.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </>
      )}

      {currentView === "category" && (
        <section className="category-recipes">
          <h2>{selectedCategory} Tarifleri</h2>
          <div className="recipe-cards">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="recipe-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div className="recipe-image">
                <img src={recipe.image} alt={recipe.name} />

                </div>
                <div className="recipe-info">
                  <span className="recipe-subcategory">
                    {recipe.subcategory}
                  </span>
                  <h3 className="recipe-name">{recipe.name}</h3>
                  <span className="recipe-time">{recipe.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {currentView === "recipe" && selectedRecipe && (
        <section className="recipe-detail">
          <h2>{selectedRecipe.name}</h2>
          <div className="recipe-detail-image">
            <img src={selectedRecipe.image} alt={selectedRecipe.name} />

          </div>

          <div className="recipe-meta">
            <span className="recipe-time">
              <i className="icon-time"></i> {selectedRecipe.time}
            </span>
            <span className="recipe-servings">
              <i className="icon-servings"></i> {selectedRecipe.servings}
            </span>
            <span className="recipe-category">
              <i className="icon-category"></i> {selectedRecipe.category}
            </span>
          </div>

          <div className="recipe-content">
            <div className="ingredients">
              <h3>Malzemeler</h3>
              <ul>
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="steps">
              <h3>Yapılış</h3>
              <ol>
                {selectedRecipe.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Food;
