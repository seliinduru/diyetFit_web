import React from "react";
import { useNavigate } from "react-router-dom"; // Yönlendirme için useNavigate'i import et

const Home = () => {
  const navigate = useNavigate();  // Yönlendirme fonksiyonunu oluştur

  const handleLogin = () => {
    navigate("/login");  // Giriş sayfasına yönlendir
  };

  const handleRegister = () => {
    navigate("/register");  // Kayıt ol sayfasına yönlendir
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.navbar}>
          <h1 style={styles.logo}>DiyetFit</h1>
          <nav>
            <ul style={styles.navLinks}>
              <li>
                <button onClick={() => navigate("/create-diet")} style={styles.navButton}>
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

      <div style={styles.heroSection}>
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
      </div>

      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2025 DiyetFit. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f5f5f5",
    padding: "0",
    margin: "0",
  },
  header: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "15px 0",
    textAlign: "center",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    marginLeft: "20px",
  },
  navLinks: {
    listStyleType: "none",
    margin: "0",
    padding: "0",
    display: "flex",
  },
  navButton: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    marginLeft: "20px",
    cursor: "pointer",
    textTransform: "uppercase",
    transition: "color 0.3s",
  },
  navButtonHover: {
    color: "#fff",
  },
  heroSection: {
    textAlign: "center",
    padding: "50px 20px",
    backgroundColor: "#ff9800",
    color: "#fff",
  },
  heroText: {
    fontSize: "32px",
    fontWeight: "bold",
    margin: "0 0 10px 0",
  },
  heroSubtitle: {
    fontSize: "18px",
    margin: "0 0 30px 0",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  mainButton: {
    padding: "15px 30px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.2s",
  },
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "10px",
  },
  footerText: {
    fontSize: "14px",
  },
};

export default Home;
