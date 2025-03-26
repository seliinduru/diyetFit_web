import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Sayfa yönlendirmek için

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Şifreyi göstermek için state
  const [rememberMe, setRememberMe] = useState(false); // Beni hatırla checkbox'ı
  const navigate = useNavigate(); // Yönlendirme fonksiyonu

  useEffect(() => {
    // Beni hatırla seçili ise, localStorage'dan giriş bilgilerini al
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true); // Eğer bilgileri bulduysak, "Beni hatırla" seçili olsun
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Giriş yapıldı:", { email, password });

    if (rememberMe) {
      // Beni hatırla seçili ise, email ve şifreyi localStorage'a kaydet
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      // Eğer "Beni hatırla" seçili değilse, localStorage'dan bilgileri sil
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  };

  // Stiller (CSS)
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "white",
      fontFamily: "'Arial', sans-serif",
    },
    box: {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
      textAlign: "center",
      width: "100%",
      maxWidth: "400px",
    },
    title: {
      marginBottom: "20px",
      fontSize: "24px",
      color: "#333",
    },
    inputGroup: {
      marginBottom: "15px",
      position: "relative", // Göz simgesini konumlandırmak için
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      fontSize: "16px",
      outline: "none",
      transition: "box-shadow 0.3s",
    },
    inputFocus: {
      borderColor: "#4caf50",
      boxShadow: "0 0 5px rgba(76, 175, 80, 0.5)",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#4caf50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background 0.3s, transform 0.2s",
      fontWeight: "bold",
    },
    buttonHover: {
      backgroundColor: "#45a049",
      transform: "scale(1.05)", // Hover sırasında butonun büyümesi
    },
    links: {
      marginTop: "15px",
      display: "flex",
      justifyContent: "space-between",
    },
    link: {
      color: "#4caf50",
      textDecoration: "none",
      fontSize: "14px",
    },
    linkHover: {
      textDecoration: "underline", // Altının çizili olması için
    },
    eyeIcon: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
    },
    rememberMe: {
      display: "flex",
      alignItems: "center",
      marginBottom: "15px",
    },
    forgotPassword: {
      color: "blue", // Mavi renk
      textDecoration: "none", // Altı çizili olmaması için
    },
    forgotPasswordContainer: {
      display: "flex",
      justifyContent: "space-between", // Beni hatırla ve Şifrenizi mi unuttunuz? yazılarını sağa hizalamak için
      alignItems: "center",
      marginTop: "15px", // Aralarındaki mesafeyi artırmak için
    },
    backButton: {
      position: "absolute",
      top: "20px",
      left: "20px",
      background: "none",
      border: "none",
      fontSize: "28px", // Ok simgesinin boyutu
      color: "#4caf50",
      cursor: "pointer",
      transition: "transform 0.3s",
    },
    backButtonHover: {
      transform: "scale(1.1)", // Hover efekti ile biraz büyüsün
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        {/* Geri gitme butonu */}
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)} // Bir önceki sayfaya git
          onMouseEnter={(e) => (e.target.style.transform = styles.backButtonHover.transform)} // Hover sırasında büyüme
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")} // Hover sonrası eski boyuta dönüş
        >
          ←
        </button>

        <h2 style={styles.title}>Giriş Yap</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) =>
                (e.target.style.boxShadow = styles.inputFocus.boxShadow)
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              type={showPassword ? "text" : "password"} // Şifreyi göster/gizle
              placeholder="Şifreniz"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) =>
                (e.target.style.boxShadow = styles.inputFocus.boxShadow)
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
            <span
              style={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)} // Göz simgesine tıklayınca şifreyi göster/gizle
            >
              {showPassword ? "🙈" : "👁️"} {/* Göz simgesi */}
            </span>
          </div>

          {/* Beni hatırla checkbox'ı */}
          <div style={styles.rememberMe}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)} // Checkbox değişince state'i güncelle
            />
            <label style={{ marginLeft: "8px" }}>Beni hatırla</label>
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
            onMouseOver={(e) =>
              (e.target.style.transform = styles.buttonHover.transform)
            } // Hover sırasında büyüme
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")} // Hover sonrası eski boyuta dönüş
          >
            Giriş Yap
          </button>
        </form>

        {/* Şifrenizi mi unuttunuz? ve Kayıt Ol linklerinin hizalanması */}
        <div style={styles.forgotPasswordContainer}>
          <a
            href="#"
            style={styles.forgotPassword}
            onMouseEnter={(e) =>
              (e.target.style.textDecoration = styles.linkHover.textDecoration)
            }
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Şifremi unuttum
          </a>
          {/* "Kayıt Ol" butonuna tıklandığında yönlendirme yapılacak */}
          <button
            onClick={() => navigate("/register")}
            style={{
              ...styles.link,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Kayıt Ol
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
