import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.navbar}>
          <img src="/diyetfit_logoo.png" alt="DiyetFit Logo" style={styles.logo} />
          <nav>
            <ul style={styles.navLinks}>
              <li>
                <button onClick={() => navigate("/create_diet")} style={styles.navButton}>
                  Diyet Oluştur
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/recipes")} style={styles.navButton}>
                  Yemek Tarifleri
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/calorie-calculator")} style={styles.navButton}>
                  Kalori Hesapla
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Resmin navbar'ın hemen altına eklenmesi */}
      <section style={styles.imageSection}>
        <div style={styles.imageContainer}>
          <img src="/anasayfa2.png" alt="Ana Sayfa Resmi" style={styles.heroImage} />
        </div>
      </section>

      <section style={styles.heroSection}>
        <h2 style={styles.heroText}>Fit Kalmak İçin Bir Adım Atın!</h2>
        <p style={styles.heroSubtitle}>DiyetFit ile sağlıklı bir yaşam için ilk adımınızı atın. Kişisel diyet planları, kalori hesaplama ve tarifler burada!</p>

        <div style={styles.buttons}>
          <button
            onClick={handleLogin}
            style={styles.mainButton}
          >
            Giriş Yap
          </button>
          <button
            onClick={handleRegister}
            style={styles.mainButton}
          >
            Kayıt Ol
          </button>
        </div>
      </section>

      <footer style={styles.footer}>
        <div style={styles.footerLinks}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerHeading}>Mobil Uygulama İndirin</h3>
            <ul style={styles.footerList}>
              <li><a href="https://play.google.com/store/apps" style={styles.footerLink}>Android için İndir</a></li>
              <li><a href="https://apps.apple.com/us/app" style={styles.footerLink}>iOS için İndir</a></li>
            </ul>
          </div>

          <div style={styles.footerSection}>
            <h3 style={styles.footerHeading}>İletişim</h3>
            <ul style={styles.footerList}>
              <li><a href="mailto:contact@diyetfit.com" style={styles.footerLink}>E-posta</a></li>
              <li><a href="tel:+123456789" style={styles.footerLink}>Telefon</a></li>
            </ul>
          </div>

          <div style={styles.footerSection}>
            <h3 style={styles.footerHeading}>Biz Kimiz?</h3>
            <ul style={styles.footerList}>
              <li><a href="/about" style={styles.footerLink}>Hakkımızda</a></li>
              <li><a href="/careers" style={styles.footerLink}>Kariyer</a></li>
              <li><a href="/team" style={styles.footerLink}>Ekibimiz</a></li>
            </ul>
          </div>
        </div>

        <p style={styles.footerText}>© 2025 DiyetFit. Tüm hakları saklıdır.</p>
      </footer>
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
    height: "100vh",  // Sayfa yüksekliğini tam yapıyoruz
  },
  header: {
    backgroundColor: "#ffffff",
    color: "#ffffff",
    padding: "15px 0",
    textAlign: "center",
    fontSize: "20px",
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
    transition: "color 0.3s",
    letterSpacing: "1px",
  },
  imageSection: {
    textAlign: "center",
    padding: "20px 0",
    backgroundColor: "#f2f2f2",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "-20px",
  },
  heroImage: {
    width: "100%",  // Resmin genişliğini tam ekran yapmak
    height: "auto",  // Yüksekliği oranla koruyarak genişletiyoruz
    objectFit: "cover",  // Resmin tam olarak ekranı kaplamasını sağlıyoruz
  },
  heroSection: {
    position: "absolute",
    top: "50%",
    right: "0",
    transform: "translateY(-50%)",
    textAlign: "right",
    color: "#ffffff",
    padding: "20px",
    zIndex: 10,
  },
  heroText: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  heroSubtitle: {
    fontSize: "18px",
    marginBottom: "50px",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "flex-end",
  },
  mainButton: {
    padding: "12px 25px",
    backgroundColor: "#0066cc",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
    textTransform: "uppercase",
  },
  footer: {
    backgroundColor: "#333333",
    color: "#ffffff",
    textAlign: "center",
    padding: "40px 0",
    fontSize: "14px",
    marginTop: "auto",  // Alt paneli sayfanın altına sabitlemek için
  },
  footerLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  footerSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "30px",
  },
  footerHeading: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#ffcc00",
  },
  footerList: {
    listStyleType: "none",
    padding: "0",
  },
  footerLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "14px",
    marginBottom: "10px",
    transition: "color 0.3s",
  },
  footerText: {
    fontSize: "12px",
    marginTop: "30px",
  },
};

export default Home;
