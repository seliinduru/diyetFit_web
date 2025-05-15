import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const [activeCircle, setActiveCircle] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoaded, setIsLoaded] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [activeTip, setActiveTip] = useState(0);

  // Diet tips for the new section
  const dietTips = [
    {
      title: "Dengeli Beslenme",
      content:
        "Her öğünde protein, karbonhidrat ve sağlıklı yağları dengeli şekilde tüketin.",
      icon: "🍽️",
    },
    {
      title: "Su İçmeyi Unutmayın",
      content:
        "Günde en az 2-2.5 litre su içmek metabolizmanızı hızlandırır ve toksinlerin atılmasına yardımcı olur.",
      icon: "💧",
    },
    {
      title: "Porsiyon Kontrolü",
      content:
        "Yediğiniz miktarı kontrol etmek, kalori alımınızı dengelemenin en etkili yollarından biridir.",
      icon: "⚖️",
    },
    {
      title: "Düzenli Egzersiz",
      content:
        "Haftada en az 3-4 kez 30 dakikalık egzersiz yaparak metabolizmanızı aktif tutun.",
      icon: "🏃‍♀️",
    },
  ];

  useEffect(() => {
    // Set isLoaded to true after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    // Update date every minute
    const dateInterval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    // Auto-rotate tips
    const tipInterval = setInterval(() => {
      setActiveTip((prev) => (prev + 1) % dietTips.length);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(dateInterval);
      clearInterval(tipInterval);
    };
  }, [dietTips.length]);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("tr-TR", options);
  };

  const circleData = {
    Hakkımızda: [
      "DiyetFit, sağlıklı yaşamı herkes için ulaşılabilir kılmak amacıyla kuruldu.",
      "Uzman kadromuz ile kişiselleştirilmiş çözümler sunuyoruz.",
      "Amacımız sadece zayıflamak değil, sürdürülebilir sağlık!",
    ],
    Motivasyon: [
      "Küçük adımlar büyük değişimlere yol açar.",
      "Her gün yeniden başlamak için bir fırsattır.",
      "Sen yapabilirsin! Vücudun sana teşekkür edecek.",
    ],
    "Sağlık İpuçları": [
      "Her gün 2 litre su içmeyi unutma.",
      "Günde en az 30 dakika yürüyüş yap.",
      "İşlenmiş gıdalardan uzak durmaya çalış.",
    ],
    "Mobil Uygulama İndir": [
      "Uygulamamızı Android ve iOS platformlarında kullanabilirsiniz.",
      "Anlık kalori takibi ve kişisel hedeflerle uyumludur.",
      "Uygulamada bildirimlerle hatırlatma alırsınız.",
    ],
    "Günlük Takip": [
      "Günlük aldığın kaloriyi kaydet.",
      "Öğün saatlerini düzenli girerek takip et.",
      "Her gün gelişimini grafiklerle takip edebilirsin.",
    ],
  };

  const handleCircleClick = (title) => {
    setActiveCircle(title);
    setPageIndex(0);
  };

  const handleNext = () => {
    if (pageIndex < circleData[activeCircle].length - 1) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  const handleCreateDiet = () => {
    navigate("/create_diet");
  };

  const toggleTips = () => {
    setShowTips(!showTips);
  };

  return (
    <div style={styles.container}>
      {/* Fixed Header */}
      <header style={styles.header}>
        <div style={styles.navbar}>
          <img
            src="/diyetfit_logoo.png"
            alt="DiyetFit Logo"
            style={styles.logo}
          />
          <nav>
            <ul style={styles.navLinks}>
              <li>
                <button
                  onClick={() => navigate("/create_diet")}
                  style={styles.navButton}
                >
                  <span style={styles.navIcon}>📋</span> Diyet Oluştur
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/recipes")}
                  style={styles.navButton}
                >
                  <span style={styles.navIcon}>🍲</span> Yemek Tarifleri
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/kac_kalori")}
                  style={styles.navButton}
                >
                  <span style={styles.navIcon}>🔢</span> Kaç Kalori
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/vki")}
                  style={styles.navButton}
                >
                  <span style={styles.navIcon}>📊</span> BKİ Hesapla
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/profile")}
                  style={styles.navButton}
                >
                  <span style={styles.navIcon}>👤</span> Profilim
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div style={styles.contentContainer}>
        {/* Date Widget */}
        <div style={styles.dateWidget} className="date-widget">
          <div style={styles.dateIcon}>📅</div>
          <div style={styles.dateText}>{formatDate(currentDate)}</div>
        </div>

        {/* YUVARLAK BUTONLAR */}
        <section style={styles.circleSection}>
          {Object.keys(circleData).map((title, index) => (
            <div
              key={title}
              style={styles.circle}
              className={`circle-button ${isLoaded ? "loaded" : ""}`}
              onClick={() => handleCircleClick(title)}
              data-delay={index * 150}
            >
              {title}
            </div>
          ))}
        </section>

        {/* Modal Overlay */}
        {activeCircle && (
          <div
            style={styles.modalOverlay}
            onClick={() => setActiveCircle(null)}
          >
            {/* Modal Content - stopPropagation prevents clicks inside the modal from closing it */}
            <div
              style={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={styles.modalHeader}>
                <h3 style={styles.modalTitle}>{activeCircle}</h3>
                <button
                  style={styles.closeButton}
                  onClick={() => setActiveCircle(null)}
                >
                  ✕
                </button>
              </div>
              <div style={styles.modalBody}>
                <p style={styles.modalText}>
                  {circleData[activeCircle][pageIndex]}
                </p>
              </div>
              <div style={styles.modalFooter}>
                <button
                  style={{
                    ...styles.modalButton,
                    ...(pageIndex === 0 ? styles.disabledButton : {}),
                  }}
                  onClick={handlePrev}
                  disabled={pageIndex === 0}
                >
                  ◀ Önceki
                </button>
                <div style={styles.pageIndicator}>
                  {circleData[activeCircle].map((_, index) => (
                    <span
                      key={index}
                      style={{
                        ...styles.dot,
                        ...(index === pageIndex ? styles.activeDot : {}),
                      }}
                    />
                  ))}
                </div>
                <button
                  style={{
                    ...styles.modalButton,
                    ...(pageIndex === circleData[activeCircle].length - 1
                      ? styles.disabledButton
                      : {}),
                  }}
                  onClick={handleNext}
                  disabled={pageIndex === circleData[activeCircle].length - 1}
                >
                  Sonraki ▶
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Section - Enhanced with animations */}
        <section class="welcome-section">
          <div class="welcome-container">
            <div class="welcome-content">
              <div class="brand-element fade-in">
                <div class="logo-shape">
                  <span class="logo-text">🍀</span>
                </div>
              </div>
              <div class="text-content slide-up">
                <h1 class="welcome-title">DiyetFit'e Hoşgeldiniz</h1>
                <p class="welcome-description">
                  Sağlıklı yaşam yolculuğunuzda yanınızdayız. Kişiselleştirilmiş
                  diyet planları, kalori takibi ve sağlıklı tariflerle
                  hedeflerinize ulaşmanıza yardımcı oluyoruz.
                </p>
                <h2 class="welcome-subtitle">Haydi Başlayalım</h2>
                <button class="action-button">Diyet Oluştur</button>
              </div>
            </div>
          </div>
        </section>

        {/* NEW SECTION: Daily Diet Tips */}
        <section style={styles.dietTipsSection}>
          <h2 style={styles.dietTipsTitle} className="section-title">
            Günlük Beslenme İpuçları
          </h2>
          <button
            onClick={toggleTips}
            style={styles.tipsToggleButton}
            className="tips-toggle-button"
          >
            {showTips ? "İpuçlarını Gizle" : "İpuçlarını Göster"}
          </button>

          {showTips && (
            <div style={styles.tipsContainer} className="tips-container">
              <div style={styles.tipsCarousel}>
                {dietTips.map((tip, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.tipCard,
                      ...(index === activeTip
                        ? styles.activeTip
                        : styles.inactiveTip),
                    }}
                    className={`tip-card ${
                      index === activeTip ? "active-tip" : ""
                    }`}
                  >
                    <div style={styles.tipIcon}>{tip.icon}</div>
                    <h3 style={styles.tipTitle}>{tip.title}</h3>
                    <p style={styles.tipContent}>{tip.content}</p>
                  </div>
                ))}
              </div>
              <div style={styles.tipIndicators}>
                {dietTips.map((_, index) => (
                  <span
                    key={index}
                    style={{
                      ...styles.tipDot,
                      ...(index === activeTip ? styles.activeTipDot : {}),
                    }}
                    onClick={() => setActiveTip(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* NASIL ÇALIŞIR BÖLÜMÜ */}
        <section style={styles.howItWorks}>
          <h2 style={styles.howItWorksTitle} className="section-title">
            Nasıl Çalışır?
          </h2>
          <div style={styles.steps}>
            <div style={styles.step} className="step-card">
              <div style={styles.stepNumber}>1</div>
              <div style={styles.stepIcon}>👤</div>
              <h3 style={styles.stepTitle}>Kayıt Olun</h3>
              <p style={styles.stepDescription}>
                Hesabınızı oluşturun ve kişisel bilgilerinizi girerek başlayın.
              </p>
            </div>
            <div style={styles.step} className="step-card">
              <div style={styles.stepNumber}>2</div>
              <div style={styles.stepIcon}>📝</div>
              <h3 style={styles.stepTitle}>
                Özelleştirilmiş Soruları Yanıtlayın
              </h3>
              <p style={styles.stepDescription}>
                Hedeflerinize uygun soruları cevaplayarak ihtiyaçlarınızı
                belirleyin.
              </p>
            </div>
            <div style={styles.step} className="step-card">
              <div style={styles.stepNumber}>3</div>
              <div style={styles.stepIcon}>🥗</div>
              <h3 style={styles.stepTitle}>Diyet Planı Oluşturun</h3>
              <p style={styles.stepDescription}>
                Sizin için oluşturulan kişiselleştirilmiş diyet planını
                inceleyin.
              </p>
            </div>
            <div style={styles.step} className="step-card">
              <div style={styles.stepNumber}>4</div>
              <div style={styles.stepIcon}>📅</div>
              <h3 style={styles.stepTitle}>Diyet Planınızı Takip Edin</h3>
              <p style={styles.stepDescription}>
                Günlük olarak diyetinize sadık kalın ve gelişiminizi izleyin.
              </p>
            </div>
          </div>
        </section>

        <footer style={styles.footer}>
          <div style={styles.footerContainer}>
            <div style={styles.footerRow}>
              <div style={styles.footerColumn}>
                <h3 style={styles.footerHeading}>Mobil Uygulama</h3>
                <ul style={styles.footerList}>
                  <li>
                    <a
                      href="https://play.google.com/store/apps"
                      style={styles.footerLink}
                    >
                      <span style={styles.footerIcon}>📱</span> Android için
                      İndir
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://apps.apple.com/us/app"
                      style={styles.footerLink}
                    >
                      <span style={styles.footerIcon}>📱</span> iOS için İndir
                    </a>
                  </li>
                  <li>
                    <a href="/app-features" style={styles.footerLink}>
                      <span style={styles.footerIcon}>✨</span> Uygulama
                      Özellikleri
                    </a>
                  </li>
                  <li>
                    <a href="/app-faq" style={styles.footerLink}>
                      <span style={styles.footerIcon}>❓</span> Sık Sorulan
                      Sorular
                    </a>
                  </li>
                </ul>
              </div>
              <div style={styles.footerColumn}>
                <h3 style={styles.footerHeading}>Hizmetlerimiz</h3>
                <ul style={styles.footerList}>
                  <li>
                    <a href="/personal-diet" style={styles.footerLink}>
                      <span style={styles.footerIcon}>🥗</span> Kişisel Diyet
                      Planları
                    </a>
                  </li>
                  <li>
                    <a href="/nutrition-consulting" style={styles.footerLink}>
                      <span style={styles.footerIcon}>👩‍⚕️</span> Beslenme
                      Danışmanlığı
                    </a>
                  </li>
                  <li>
                    <a href="/online-coaching" style={styles.footerLink}>
                      <span style={styles.footerIcon}>💻</span> Online Koçluk
                    </a>
                  </li>
                  <li>
                    <a href="/corporate-wellness" style={styles.footerLink}>
                      <span style={styles.footerIcon}>🏢</span> Kurumsal Sağlık
                    </a>
                  </li>
                </ul>
              </div>
              <div style={styles.footerColumn}>
                <h3 style={styles.footerHeading}>Kurumsal</h3>
                <ul style={styles.footerList}>
                  <li>
                    <a href="/about" style={styles.footerLink}>
                      <span style={styles.footerIcon}>🏛️</span> Hakkımızda
                    </a>
                  </li>
                  <li>
                    <a href="/careers" style={styles.footerLink}>
                      <span style={styles.footerIcon}>💼</span> Kariyer
                      Fırsatları
                    </a>
                  </li>
                  <li>
                    <a href="/team" style={styles.footerLink}>
                      <span style={styles.footerIcon}>👥</span> Uzman Ekibimiz
                    </a>
                  </li>
                  <li>
                    <a href="/press" style={styles.footerLink}>
                      <span style={styles.footerIcon}>📰</span> Basında Biz
                    </a>
                  </li>
                </ul>
              </div>
              <div style={styles.footerColumn}>
                <h3 style={styles.footerHeading}>İletişim</h3>
                <ul style={styles.footerList}>
                  <li>
                    <a
                      href="mailto:info@diyetfit.com"
                      style={styles.footerLink}
                    >
                      <span style={styles.footerIcon}>📧</span>{" "}
                      info@diyetfit.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+902121234567" style={styles.footerLink}>
                      <span style={styles.footerIcon}>📞</span> +90 (212) 123 45
                      67
                    </a>
                  </li>
                  <li>
                    <a href="https://maps.google.com" style={styles.footerLink}>
                      <span style={styles.footerIcon}>📍</span> İstanbul,
                      Türkiye
                    </a>
                  </li>
                  <li style={styles.socialLinks}>
                    <a href="https://facebook.com" style={styles.socialLink}>
                      Facebook
                    </a>
                    <a href="https://instagram.com" style={styles.socialLink}>
                      Instagram
                    </a>
                    <a href="https://twitter.com" style={styles.socialLink}>
                      Twitter
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div style={styles.footerBottom}>
              <p style={styles.footerText}>
                © 2025 DiyetFit. Tüm hakları saklıdır.
              </p>
              <div style={styles.footerLegal}>
                <a href="/privacy" style={styles.footerLegalLink}>
                  Gizlilik Politikası
                </a>
                <a href="/terms" style={styles.footerLegalLink}>
                  Kullanım Koşulları
                </a>
                <a href="/cookies" style={styles.footerLegalLink}>
                  Çerez Politikası
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* CSS for hover effects and animations */}
      <style>
        {`
    /* Circle button animations and effects */
    .circle-button {
      transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
      opacity: 0;
      transform: scale(0.8) translateY(20px);
    }
          
    .circle-button.loaded {
      opacity: 1;
      transform: scale(1) translateY(0);
      animation: fadeInUp 0.6s forwards;
    }
          
    .circle-button:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 12px rgba(0,0,0,0.3);
      background-color: #388E3C;
    }
          
    /* Apply different animation delays to each circle */
    .circle-button:nth-child(1) { animation-delay: 0.1s; }
    .circle-button:nth-child(2) { animation-delay: 0.2s; }
    .circle-button:nth-child(3) { animation-delay: 0.3s; }
    .circle-button:nth-child(4) { animation-delay: 0.4s; }
    .circle-button:nth-child(5) { animation-delay: 0.5s; }
          
    /* Date widget animation */
    .date-widget {
      animation: slideInRight 0.5s ease-out forwards;
    }
          
    /* Welcome container animation */
    .welcome-container {
      animation: fadeIn 1s ease-out;
    }
          
    /* Welcome section styles */
    .welcome-section {
      padding: 40px 20px;
      background-color: #f8f9fa;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .welcome-container {
      max-width: 1000px;
      background-color: white;
      padding: 50px;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      width: 100%;
      overflow: hidden;
    }
    
    .welcome-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
    }
    
    .brand-element {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
    }
    
    .logo-shape {
      width: 120px;
      height: 120px;
     background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);

      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 8px 20px rgba(46, 125, 50, 0.25);
      transition: transform 0.5s ease, box-shadow 0.5s ease;
      animation: fadeIn 1s ease-in-out;
    }
    
    .logo-shape:hover {
      transform: scale(1.05) rotate(5deg);
      box-shadow: 0 12px 25px rgba(46, 125, 50, 0.35);
    }
    
    .logo-text {
      font-size: 48px;
      font-weight: 800;
      color: white;
      letter-spacing: -1px;
    }
    
    .text-content {
      flex: 1;
      text-align: center;
      animation: slideUp 0.8s ease-out;
    }
    
    .welcome-title {
      font-size: 36px;
      font-weight: 700;
      color: #2e7d32;
      margin-top: 0;
      margin-bottom: 15px;
      text-align: center;
      position: relative;
    }
    
    .welcome-title:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background-color: #2e7d32;
      border-radius: 3px;
    }
    
    .welcome-description {
      font-size: 17px;
      line-height: 1.7;
      color: #555;
      margin: 25px 0 20px;
      text-align: center;
    }
    
    .welcome-subtitle {
      font-size: 24px;
      font-weight: 600;
      color: #2e7d32;
      margin-bottom: 20px;
      text-align: center;
    }
    
    .action-button {
      padding: 14px 36px;
      background-color: #2e7d32;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(46, 125, 50, 0.2);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
          
    /* Section title animation */
    .section-title {
      position: relative;
    }
          
    .section-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 3px;
      background-color: #4CAF50;
      animation: lineExpand 1s ease-out forwards 0.5s;
    }
          
    /* Step card animations */
    .step-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      animation: fadeInUp 0.8s ease-out forwards;
    }
          
    .step-card:nth-child(1) { animation-delay: 0.1s; }
    .step-card:nth-child(2) { animation-delay: 0.3s; }
    .step-card:nth-child(3) { animation-delay: 0.5s; }
    .step-card:nth-child(4) { animation-delay: 0.7s; }
          
    .step-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.15);
    }
          
    /* Action button effects */
    .action-button {
      transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
      position: relative;
      overflow: hidden;
    }
          
    .action-button:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      background-color: #1b5e20 !important;
      color: white !important;
    }
          
    .action-button::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 5px;
      height: 5px;
      background: rgba(255, 255, 255, 0.5);
      opacity: 0;
      border-radius: 100%;
      transform: scale(1, 1) translate(-50%);
      transform-origin: 50% 50%;
    }
          
    .action-button:focus:not(:active)::after {
      animation: ripple 1s ease-out;
    }
          
    /* Pulse animation for create diet button */
    .pulse-animation {
      animation: pulse 2s infinite;
    }
          
    /* Tips toggle button animation */
    .tips-toggle-button {
      transition: all 0.3s ease;
    }
          
    .tips-toggle-button:hover {
      background-color: #2E7D32 !important;
      transform: scale(1.05);
    }
          
    /* Tips container animation */
    .tips-container {
      animation: fadeIn 0.5s ease-out;
    }
          
    /* Tip card animations */
    .tip-card {
      transition: all 0.5s ease;
    }
          
    .tip-card.active-tip {
      animation: fadeInScale 0.5s ease-out;
    }
          
    /* Modal animation */
    @keyframes modalFadeIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Mobile Responsiveness for welcome section */
    @media (min-width: 768px) {
      .welcome-content {
        flex-direction: row;
      }
      
      .text-content {
        text-align: left;
        padding-left: 40px;
      }
      
      .welcome-title, .welcome-subtitle, .welcome-description {
        text-align: left;
      }
      
      .welcome-title:after {
        left: 0;
        transform: none;
      }
    }
    
    @media (max-width: 767px) {
      .welcome-container {
        padding: 30px 20px;
      }
      
      .logo-shape {
        width: 100px;
        height: 100px;
      }
      
      .logo-text {
        font-size: 40px;
      }
      
      .welcome-title {
        font-size: 28px;
      }
      
      .welcome-subtitle {
        font-size: 20px;
      }
      
      .welcome-description {
        font-size: 16px;
      }
      
      .action-button {
        padding: 12px 30px;
        width: 100%;
        max-width: 250px;
      }
    }
          
    /* Animations */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
          
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { 
        opacity: 0;
        transform: translateY(30px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
          
    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
          
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
          
    @keyframes lineExpand {
      from { width: 0; }
      to { width: 80px; }
    }
          
    @keyframes ripple {
      0% {
        transform: scale(0, 0);
        opacity: 0.5;
      }
      20% {
        transform: scale(25, 25);
        opacity: 0.5;
      }
      100% {
        opacity: 0;
        transform: scale(40, 40);
      }
    }
          
    @keyframes float {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
          
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
      }
    }
          
    /* Footer link hover effects */
    ${styles.footerLink}:hover {
      color: #4CAF50;
      transform: translateX(5px);
    }
          
    ${styles.socialLink}:hover {
      background-color: #2E7D32;
    }
          
    ${styles.footerLegalLink}:hover {
      color: #4CAF50;
    }
  `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    backgroundColor: "#ffffff",
    margin: "0",
    padding: "0",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  header: {
    backgroundColor: "#ffffff",
    color: "#ffffff",
    padding: "15px 0",
    textAlign: "center",
    fontSize: "20px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  contentContainer: {
    marginTop: "80px", // Add space for the fixed header
    display: "flex",
    flexDirection: "column",
    flex: 1,
    position: "relative",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  logo: {
    width: "180px",
    height: "auto",
    marginLeft: "10px",
  },
  navLinks: {
    listStyleType: "none",
    margin: "0",
    padding: "0",
    display: "flex",
    gap: "15px",
  },
  navButton: {
    background: "none",
    border: "none",
    color: "#388E3C",
    fontSize: "16px",
    cursor: "pointer",
    textTransform: "uppercase",
    padding: "8px 16px",
    transition: "color 0.3s, transform 0.2s",
    letterSpacing: "1px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  navIcon: {
    fontSize: "18px",
  },
  // Date widget styles
  dateWidget: {
    position: "fixed",
    top: "200px",
    right: "20px",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
    zIndex: 100,
  },
  dateIcon: {
    fontSize: "24px",
    marginRight: "10px",
  },
  dateText: {
    fontSize: "14px",
    fontWeight: "500",
  },
  circleSection: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    margin: "50px 0 20px 0",
    flexWrap: "wrap",
    backgroundColor: "#f9f9f9",
    padding: "20px 0",
    zIndex: "20",
  },
  circle: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    backgroundColor: "#4CAF50",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    cursor: "pointer",
    fontSize: "14px",
    padding: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  // Modal styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(5px)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    animation: "modalFadeIn 0.3s ease-out",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    borderBottom: "1px solid #eee",
    backgroundColor: "#4CAF50",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  modalTitle: {
    margin: 0,
    color: "white",
    fontSize: "20px",
    fontWeight: "600",
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
    padding: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    transition: "background-color 0.2s",
  },
  modalBody: {
    padding: "30px 20px",
    fontSize: "16px",
    lineHeight: "1.6",
    minHeight: "100px",
  },
  modalText: {
    margin: 0,
    textAlign: "center",
    fontSize: "18px",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    borderTop: "1px solid #eee",
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
    cursor: "not-allowed",
    opacity: 0.7,
  },
  pageIndicator: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#ddd",
    display: "inline-block",
  },
  activeDot: {
    backgroundColor: "#4CAF50",
  },
  // Enhanced welcome section styles
  welcomeSection: {
    padding: "40px 20px",
    backgroundColor: "#f2f2f2",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeContainer: {
    maxWidth: "1000px",
    backgroundColor: "white",
    padding: "30px 50px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    width: "150%",
  },
  welcomeContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  imageContainer: {
    position: "relative",
    marginBottom: "10px",
  },
  mainImage: {
    width: "220px",
    height: "auto",
    borderRadius: "0",
    boxShadow: "none",
  },
  textContainer: {
    flex: "1",
    textAlign: "center",
  },
  welcomeTitle: {
    fontSize: "42px",
    fontWeight: "bold",
    color: "#388E3C",
    marginTop: "-40px",
    marginBottom: "0px",
    textAlign: "center",
  },
  welcomeText: {
    fontSize: "18px",
    lineHeight: "1.8",
    color: "#555",
    marginBottom: "0px",
    textAlign: "center",
  },
  welcomeSubtitle: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#388E3C",
    marginBottom: "0px",
    textAlign: "center",
  },
  // Enhanced create diet button
  createDietButton: {
    padding: "15px 40px",
    backgroundColor: "#388E3C",
    color: "white",
    border: "none",
    borderRadius: "30px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(56, 142, 60, 0.3)",
    transition: "all 0.3s ease",
    marginTop: "15px",
  },
  welcomeEmoji: {
    fontSize: "36px",
    margin: "0 10px",
  },
  textEmoji: {
    fontSize: "18px",
    marginRight: "5px",
  },
  subtitleEmoji: {
    fontSize: "24px",
    margin: "0 8px",
  },
  buttonEmoji: {
    fontSize: "18px",
    margin: "0 5px",
  },

  // NEW SECTION: Diet Tips styles
  dietTipsSection: {
    padding: "60px 20px",
    backgroundColor: "#f0f7f0",
    textAlign: "center",
  },
  dietTipsTitle: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#388E3C",
    marginBottom: "30px",
    position: "relative",
    display: "inline-block",
  },
  tipsToggleButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "12px 25px",
    borderRadius: "25px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "30px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  tipsContainer: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  tipsCarousel: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    height: "250px",
    marginBottom: "20px",
  },
  tipCard: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
    position: "absolute",
    transition: "all 0.5s ease",
  },
  activeTip: {
    opacity: 1,
    transform: "scale(1) translateX(0)",
    zIndex: 2,
  },
  inactiveTip: {
    opacity: 0,
    transform: "scale(0.8) translateX(50px)",
    zIndex: 1,
  },
  tipIcon: {
    fontSize: "40px",
    marginBottom: "15px",
  },
  tipTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#388E3C",
    marginBottom: "15px",
  },
  tipContent: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#555",
  },
  tipIndicators: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },
  tipDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#ddd",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  activeTipDot: {
    backgroundColor: "#4CAF50",
    transform: "scale(1.2)",
  },

  // Nasıl Çalışır bölümü için stil tanımlamaları
  howItWorks: {
    padding: "80px 20px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  howItWorksTitle: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#388E3C",
    marginBottom: "50px",
    position: "relative",
    display: "inline-block",
  },
  steps: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  step: {
    flex: "1 1 250px",
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    padding: "30px 20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    maxWidth: "280px",
  },
  stepNumber: {
    position: "absolute",
    top: "-20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "40px",
    height: "40px",
    backgroundColor: "#388E3C",
    color: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "bold",
    boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
  },
  stepIcon: {
    fontSize: "40px",
    marginBottom: "20px",
    marginTop: "10px",
  },
  stepTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#388E3C",
    marginBottom: "15px",
  },
  stepDescription: {
    fontSize: "16px",
    color: "#555",
    lineHeight: "1.6",
  },
  footer: {
    backgroundColor: "#333333",
    color: "#ffffff",
    padding: "60px 0 20px",
    fontSize: "14px",
    marginTop: "auto",
  },
  footerContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  footerRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: "40px",
  },
  footerColumn: {
    flex: "1 1 250px",
    marginBottom: "30px",
    padding: "0 15px",
  },
  footerHeading: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#4CAF50",
    position: "relative",
    paddingBottom: "10px",
  },
  footerList: {
    listStyleType: "none",
    padding: "0",
    margin: "0",
  },
  footerLink: {
    color: "#dddddd",
    textDecoration: "none",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
    transition: "color 0.3s, transform 0.3s",
  },
  footerIcon: {
    marginRight: "10px",
    fontSize: "16px",
  },
  socialLinks: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "15px",
  },
  socialLink: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "8px 12px",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
  footerBottom: {
    borderTop: "1px solid #444444",
    paddingTop: "20px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    margin: "0",
    fontSize: "14px",
    color: "#aaaaaa",
  },
  footerLegal: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  footerLegalLink: {
    color: "#aaaaaa",
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.3s",
  },
};

export default MainPage;
