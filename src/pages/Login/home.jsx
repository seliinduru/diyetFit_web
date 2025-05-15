import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const navigate = useNavigate();
  const [activeCircle, setActiveCircle] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    // Initial check
    checkIfMobile();
    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);
    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

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

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCreateDiet = () => {
    if (user) {
      navigate("/create_diet");
    } else {
      setShowLoginAlert(true);
      // Hide the alert after 3 seconds
      setTimeout(() => {
        setShowLoginAlert(false);
      }, 3000);
    }
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
          {/* Hamburger menu for mobile */}
          {isMobile ? (
            <>
              <div style={styles.hamburger} onClick={toggleMobileMenu}>
                <div style={styles.hamburgerLine}></div>
                <div style={styles.hamburgerLine}></div>
                <div style={styles.hamburgerLine}></div>
              </div>
              {/* Mobile menu overlay */}
              {mobileMenuOpen && (
                <div
                  style={styles.mobileMenuOverlay}
                  onClick={toggleMobileMenu}
                >
                  <div
                    style={styles.mobileMenu}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div style={styles.mobileMenuHeader}>
                      <img
                        src="/diyetfit_logoo.png"
                        alt="DiyetFit Logo"
                        style={styles.mobileMenuLogo}
                      />
                      <button
                        style={styles.mobileMenuClose}
                        onClick={toggleMobileMenu}
                      >
                        ✕
                      </button>
                    </div>
                    <ul style={styles.mobileMenuLinks}>
                      <li style={styles.mobileMenuItem}>
                        <button
                          onClick={() => {
                            handleCreateDiet();
                            toggleMobileMenu();
                          }}
                          style={styles.mobileMenuButton}
                        >
                          <span style={styles.navIcon}>📋</span> Diyet Oluştur
                        </button>
                      </li>
                      <li style={styles.mobileMenuItem}>
                        <button
                          onClick={() => {
                            navigate("/recipes");
                            toggleMobileMenu();
                          }}
                          style={styles.mobileMenuButton}
                        >
                          <span style={styles.navIcon}>🍲</span> Yemek Tarifleri
                        </button>
                      </li>
                      <li style={styles.mobileMenuItem}>
                        <button
                          onClick={() => {
                            navigate("/kac_kalori");
                            toggleMobileMenu();
                          }}
                          style={styles.mobileMenuButton}
                        >
                          <span style={styles.navIcon}>🔢</span> Kaç Kalori
                        </button>
                      </li>
                      <li style={styles.mobileMenuItem}>
                        <button
                          onClick={() => {
                            navigate("/vki");
                            toggleMobileMenu();
                          }}
                          style={styles.mobileMenuButton}
                        >
                          <span style={styles.navIcon}>📊</span> BKİ Hesapla
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </>
          ) : (
            <nav>
              <ul style={styles.navLinks}>
                <li>
                  <button
                    onClick={handleCreateDiet}
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
              </ul>
            </nav>
          )}
        </div>
      </header>
      <div style={styles.contentContainer}>
        {/* Login Alert */}
        {showLoginAlert && (
          <div style={styles.loginAlert}>
            <div style={styles.alertContent}>
              <span style={styles.alertIcon}>⚠️</span>
              <p style={styles.alertText}>Lütfen giriş yapınız</p>
              <button 
                style={styles.alertButton}
                onClick={() => setShowLoginAlert(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
        
        {/* YUVARLAK BUTONLAR */}
        <section style={styles.circleSection}>
          {Object.keys(circleData).map((title) => (
            <div
              key={title}
              style={{
                ...styles.circle,
                ...(isMobile ? styles.circleMobile : {}),
              }}
              className="circle-button"
              onClick={() => handleCircleClick(title)}
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
              style={{
                ...styles.modalContent,
                ...(isMobile ? styles.modalContentMobile : {}),
              }}
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
        <section style={styles.imageSection}>
          <div style={styles.imageContainer}>
            <img
              src="/anasayfa2.png"
              alt="Ana Sayfa Resmi"
              style={styles.heroImage}
            />
            {/* Hero content positioned on the right side */}
            <div
              style={{
                ...styles.heroContent,
                ...(isMobile ? styles.heroContentMobile : {}),
              }}
            >
              <h2 style={styles.heroText}>Fit Kalmak İçin Bir Adım Atın!</h2>
              <p style={styles.heroSubtitle}>
                DiyetFit ile sağlıklı bir yaşam için ilk adımınızı atın. Kişisel
                diyet planları, kalori hesaplama ve tarifler burada! Haydi
                başlayalım!
              </p>
              <div style={styles.buttons}>
                <button
                  onClick={handleLogin}
                  className="action-button"
                  style={{
                    ...styles.mainButton,
                    backgroundColor: "#ffffff",
                    color: "#388E3C",
                    border: "2px solid #388E3C",
                  }}
                >
                  Giriş Yap
                </button>
                <button
                  onClick={handleRegister}
                  className="action-button"
                  style={{
                    ...styles.mainButton,
                    backgroundColor: "#ffffff",
                    color: "#388E3C",
                    border: "2px solid #388E3C",
                  }}
                >
                  Kayıt Ol
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* NASIL ÇALIŞIR BÖLÜMÜ - Resmin altına eklendi */}
        <section style={styles.howItWorks}>
          <h2 style={styles.howItWorksTitle}>Nasıl Çalışır?</h2>
          <div style={styles.steps}>
            <div style={styles.step}>
              <div style={styles.stepNumber}>1</div>
              <div style={styles.stepIcon}>👤</div>
              <h3 style={styles.stepTitle}>Kayıt Olun</h3>
              <p style={styles.stepDescription}>
                Hesabınızı oluşturun ve kişisel bilgilerinizi girerek başlayın.
              </p>
            </div>
            <div style={styles.step}>
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
            <div style={styles.step}>
              <div style={styles.stepNumber}>3</div>
              <div style={styles.stepIcon}>🥗</div>
              <h3 style={styles.stepTitle}>Diyet Planı Oluşturun</h3>
              <p style={styles.stepDescription}>
                Sizin için oluşturulan kişiselleştirilmiş diyet planını
                inceleyin.
              </p>
            </div>
                        <div style={styles.step}>
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
      {/* CSS for hover effects */}
      <style>
        {`
          .circle-button {
            transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
          }
          
          .circle-button:hover {
            transform: scale(1.08);
            box-shadow: 0 6px 12px rgba(0,0,0,0.3);
            background-color: #388E3C;
          }
          
          .action-button {
            transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
          }
          
          .action-button:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            background-color: #388E3C !important;
            color: white !important;
          }
          
          .step {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .step:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.15);
          }
          @media (max-width: 768px) {
            .circle-button {
              width: 100px !important;
              height: 100px !important;
              font-size: 12px !important;
            }
            
            .step {
              margin-bottom: 40px;
            }
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
  // Login Alert styles
  loginAlert: {
    position: "fixed",
    top: "90px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2000,
    width: "90%",
    maxWidth: "400px",
    animation: "fadeIn 0.3s ease-out",
  },
  alertContent: {
    backgroundColor: "#ff6b6b",
    color: "white",
    padding: "15px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  alertIcon: {
    fontSize: "20px",
    marginRight: "10px",
  },
  alertText: {
    margin: 0,
    flex: 1,
    fontWeight: "500",
  },
  alertButton: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    padding: "0 5px",
  },
  // Hamburger menu styles
  hamburger: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "30px",
    height: "21px",
    cursor: "pointer",
    zIndex: 1001,
  },
  hamburgerLine: {
    width: "100%",
    height: "3px",
    backgroundColor: "#388E3C",
    borderRadius: "3px",
  },
  mobileMenuOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "flex-end",
  },
  mobileMenu: {
    width: "80%",
    maxWidth: "300px",
    height: "100%",
    backgroundColor: "#ffffff",
    boxShadow: "-5px 0 15px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    padding: "20px 0",
    overflowY: "auto",
  },
  mobileMenuHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px 20px",
    borderBottom: "1px solid #eee",
  },
  mobileMenuLogo: {
    width: "120px",
    height: "auto",
  },
  mobileMenuClose: {
    background: "none",
    border: "none",
    fontSize: "24px",
    color: "#388E3C",
    cursor: "pointer",
  },
  mobileMenuLinks: {
    listStyleType: "none",
    padding: "20px 0",
    margin: 0,
  },
  mobileMenuItem: {
    margin: "10px 0",
  },
  mobileMenuButton: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "15px 20px",
    fontSize: "16px",
    color: "#388E3C",
    background: "none",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    transition: "background-color 0.3s",
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
  circleMobile: {
    width: "100px",
    height: "100px",
    fontSize: "12px",
    padding: "8px",
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
  modalContentMobile: {
    width: "95%",
    maxWidth: "350px",
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
  imageSection: {
    textAlign: "center",
    padding: "0",
    backgroundColor: "#f2f2f2",
    position: "relative",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "80vh",
    objectFit: "cover",
  },
  heroContent: {
    position: "absolute",
    top: "45%",
    right: "5%",
    transform: "translateY(-50%)",
    textAlign: "right",
    maxWidth: "500px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  },
  heroContentMobile: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    maxWidth: "90%",
    width: "90%",
    padding: "20px",
  },
  heroText: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#388E3C",
  },
  heroSubtitle: {
    fontSize: "18px",
    marginBottom: "30px",
    color: "#333",
    lineHeight: "1.6",
  },
  buttons: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  mainButton: {
    padding: "12px 25px",
    backgroundColor: "#0066cc",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.2s",
    textTransform: "uppercase",
    fontWeight: "bold",
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
    transition: "color 0.3s",
  },
  footerIcon: {
    marginRight: "10px",
    fontSize: "16px",
  },
  socialLinks: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  socialLink: {
    color: "#ffffff",
    textDecoration: "none",
    backgroundColor: "#4CAF50",
    padding: "8px 12px",
    borderRadius: "5px",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
  footerBottom: {
    borderTop: "1px solid #444",
    paddingTop: "20px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: "14px",
    margin: "0",
  },
  footerLegal: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  footerLegalLink: {
    color: "#aaaaaa",
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.3s",
  },
};

export default Home;


