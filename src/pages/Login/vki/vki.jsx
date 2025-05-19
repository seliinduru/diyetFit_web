import React, { useState } from 'react';
import './vki.css';

// BMI Hesaplama Bileşeni
const BMICalculator = () => {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState('Erkek');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');
  const [markerPosition, setMarkerPosition] = useState(0);

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    const roundedBMI = Math.round(bmiValue * 10) / 10;
    
    setBmi(roundedBMI);
    
    // BMI kategorisi ve yorumu belirleme
    let categoryText = '';
    let commentText = '';
    let position = 0;
    
    if (roundedBMI < 18.5) {
      categoryText = 'Zayıf';
      commentText = 'Zayıf – Vücut ağırlığınız idealin altında. Beslenmenize dikkat edin.';
      position = (roundedBMI / 40) * 100;
    } else if (roundedBMI >= 18.5 && roundedBMI < 25) {
      categoryText = 'Sağlıklı';
      commentText = 'Sağlıklı – Vücut ağırlığınız ideal seviyede. Böyle devam edin!';
      position = (roundedBMI / 40) * 100;
    } else if (roundedBMI >= 25 && roundedBMI < 30) {
      categoryText = 'Fazla Kilolu';
      commentText = 'Fazla Kilolu – Egzersiz ve dengeli beslenme önerilir.';
      position = (roundedBMI / 40) * 100;
    } else if (roundedBMI >= 30 && roundedBMI < 35) {
      categoryText = 'Obez';
      commentText = 'Obez – Sağlık uzmanına danışmanız önerilir.';
      position = (roundedBMI / 40) * 100;
    } else {
      categoryText = 'Aşırı Obez';
      commentText = 'Aşırı Obez – Mutlaka sağlık desteği almanız gerekir.';
      position = (roundedBMI / 40) * 100;
    }
    
    setCategory(categoryText);
    setComment(commentText);
    setMarkerPosition(position);
  };

  return (
    <div className="bmi-card bmi-calculator-card">
      <h2 className="bmi-card-title">VKİ Hesaplama Aracı</h2>
      
      <div className="bmi-form-group">
        <label className="bmi-form-label">Boy (cm)</label>
        <div className="bmi-slider-container">
          <input
            type="range"
            className="bmi-slider"
            min="120"
            max="220"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value))}
          />
          <input
            type="number"
            className="bmi-number-input"
            value={height}
            min="120"
            max="220"
            onChange={(e) => setHeight(parseInt(e.target.value))}
          />
        </div>
      </div>
      
      <div className="bmi-form-group">
        <label className="bmi-form-label">Kilo (kg)</label>
        <div className="bmi-slider-container">
          <input
            type="range"
            className="bmi-slider"
            min="30"
            max="200"
            value={weight}
            onChange={(e) => setWeight(parseInt(e.target.value))}
          />
          <input
            type="number"
            className="bmi-number-input"
            value={weight}
            min="30"
            max="200"
            onChange={(e) => setWeight(parseInt(e.target.value))}
          />
        </div>
      </div>
      
      <div className="bmi-form-group">
        <label className="bmi-form-label">Yaş</label>
        <input
          type="number"
          className="bmi-number-input bmi-full-width"
          value={age}
          min="1"
          max="120"
          onChange={(e) => setAge(parseInt(e.target.value))}
        />
      </div>
      
      <div className="bmi-form-group">
        <label className="bmi-form-label">Cinsiyet</label>
        <select
          className="bmi-select-input"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="Erkek">Erkek</option>
          <option value="Kadın">Kadın</option>
        </select>
      </div>
      
      <button className="bmi-button" onClick={calculateBMI}>
        VKİ Hesapla
      </button>
      
      {bmi && (
        <div className="bmi-result-card">
          <h3 className="bmi-result-title">Sonuç</h3>
          <div className="bmi-value">{bmi}</div>
          <div className={`bmi-category ${category.toLowerCase().replace(' ', '-')}`}>{category}</div>
          <p className="bmi-comment">{comment}</p>
          
          <div className="bmi-progress">
            <div 
              className="bmi-marker"
              style={{ left: `${markerPosition}%` }}
            ></div>
          </div>
          
          <div className="bmi-scale">
            <span>Zayıf</span>
            <span>Normal</span>
            <span>Kilolu</span>
            <span>Obez</span>
            <span>Aşırı Obez</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Bilgilendirici İçerik Bileşeni
const InfoSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const infoItems = [
    {
      title: 'Vücut Kitle İndeksi (VKİ) Nedir?',
      content: 'Vücut Kitle İndeksi (VKİ), vücut ağırlığının (kg), boy uzunluğunun (m) karesine bölünmesiyle hesaplanan bir değerdir. Kişinin kilo durumunu değerlendirmek için kullanılır.'
    },
    {
      title: 'Vücut Kitle İndeksi Nasıl Hesaplanır?',
      content: 'VKİ = Kilo (kg) / Boy² (m²) formülü ile hesaplanır. Örneğin, 75 kg ağırlığında ve 1.65 m boyundaki bir kişinin VKİ değeri: 75 / (1.65 × 1.65) = 27.5 olarak hesaplanır.'
    },
    {
      title: 'Boy Kilo Endeksi Hesaplama Adımları',
      content: 'Kilonuzu kilogram cinsinden ölçün. Boyunuzu metre cinsinden ölçün. Kilonuzu, boyunuzun karesine bölün. Sonuç, vücut kitle indeksinizdir.'
    },
    {
      title: 'Vücut Kitle İndeksi Kaç Olmalı?',
      content: 'Sağlıklı bir VKİ değeri 18.5 ile 24.9 arasındadır. 25-29.9 arası fazla kilolu, 30 ve üzeri obez olarak değerlendirilir.'
    },
    {
      title: 'VKİ Sonuçları Ne Anlama Gelir?',
      content: '0 - 18.4: Zayıf – Vücut ağırlığınız idealin altında.\n18.5 - 24.9: Sağlıklı – Vücut ağırlığınız ideal seviyede.\n25 - 29.9: Fazla Kilolu – Egzersiz ve dengeli beslenme önerilir.\n30 - 34.9: Obez – Sağlık uzmanına danışmanız önerilir.\n35+: Aşırı Obez – Mutlaka sağlık desteği almanız gerekir.'
    },
    {
      title: 'Yaşa Göre VKİ Değerleri',
      content: 'VKİ değerleri yaşa göre farklılık gösterebilir. Yaşlı bireylerde biraz daha yüksek VKİ değerleri normal kabul edilebilir. Çocuklarda ise yaşa ve cinsiyete özel VKİ persentil tabloları kullanılır.'
    },
    {
      title: 'Kadınlar İçin VKİ',
      content: 'Kadınlar ve erkekler için VKİ kategorileri aynıdır, ancak vücut kompozisyonu farklılıkları nedeniyle kadınlarda vücut yağ oranı genellikle daha yüksektir. Bu nedenle, kadınlarda VKİ değerlendirmesi yaparken ek ölçümler (bel çevresi gibi) dikkate alınabilir.'
    },
    {
      title: 'Çocuklarda VKİ Hesaplama',
      content: 'Çocuklarda VKİ hesaplanırken yaş ve cinsiyet faktörleri dikkate alınır. Sonuçlar, yaşa ve cinsiyete özgü persentil eğrileri kullanılarak değerlendirilir.'
    },
    {
      title: 'VKİ Dışında Dikkate Alınan Faktörler',
      content: 'VKİ, vücut yağ dağılımını göstermez. Bel çevresi, kalça-bel oranı, kas kütlesi ve vücut yağ yüzdesi gibi ek ölçümler daha kapsamlı bir değerlendirme sağlar.'
    },
    {
      title: 'Sıkça Sorulan Sorular (SSS)',
      content: 'S: VKİ her yaş için güvenilir midir?\nC: Hayır, özellikle çocuklar, yaşlılar ve atletik yapıdaki kişiler için yanıltıcı olabilir.\n\nS: Düşük VKİ her zaman sağlıksız mıdır?\nC: Her zaman değil, ancak çok düşük VKİ değerleri yetersiz beslenme belirtisi olabilir.\n\nS: Yüksek kas kütlesi VKİ sonucunu etkiler mi?\nC: Evet, kas kütlesi yüksek olan kişilerde VKİ değeri yüksek çıkabilir, ancak bu sağlıksız olduklarını göstermez.'
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bmi-card bmi-info-card">
      <h2 className="bmi-card-title">Bilgilendirici İçerik</h2>
      <div className="bmi-accordion">
        {infoItems.map((item, index) => (
          <div className="bmi-accordion-item" key={index}>
            <div 
              className="bmi-accordion-header"
              onClick={() => toggleAccordion(index)}
            >
              {item.title}
              <span className="bmi-accordion-icon">{activeIndex === index ? '−' : '+'}</span>
            </div>
            <div className={`bmi-accordion-content ${activeIndex === index ? 'active' : ''}`}>
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Ana Uygulama Bileşeni
function BKİ() {
  return (
    <div className="bmi-calculator-app">
      <div className="bmi-container">
        <header className="bmi-header">
          <h1 className="bmi-main-title">Vücut Kitle İndeksi (VKİ) Hesaplama</h1>
          <p className="bmi-subtitle">Sağlıklı yaşam için vücut kitle indeksinizi hesaplayın ve değerlendirin</p>
        </header>
        <div className="bmi-app-layout">
          <div className="bmi-calculator-section">
            <BMICalculator />
          </div>
          <div className="bmi-info-section">
            <InfoSection />
          </div>
        </div>
        <footer className="bmi-footer">
          <p>© 2023 VKİ Hesaplama Aracı | Tüm Hakları Saklıdır</p>
        </footer>
      </div>
    </div>
  );
}

export default BKİ;
 