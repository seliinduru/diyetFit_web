import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../Config/FirebaseConfig";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: email,
        uid: user.uid,
      });

      console.log("Kullanıcı başarıyla kaydedildi:", { email });
      navigate("/login");
    } catch (error) {
      console.error("Hata oluştu:", error);
      alert(error.message);
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f4f4",
      fontFamily: "'Arial', sans-serif",
    },
    box: {
      backgroundColor: "white",
      padding: "40px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      width: "100%",
      maxWidth: "400px",
      boxSizing: "border-box",
    },
    title: {
      marginBottom: "20px",
      fontSize: "28px",
      fontWeight: "bold",
      color: "#333",
    },
    inputGroup: {
      marginBottom: "20px",
      position: "relative",
    },
    input: {
      width: "100%",
      padding: "14px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "16px",
      outline: "none",
      transition: "border-color 0.3s",
    },
    inputFocus: {
      borderColor: "#4caf50",
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#4caf50",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#45a049",
    },
    footer: {
      marginTop: "20px",
      fontSize: "14px",
    },
    footerLink: {
      color: "#4caf50",
      textDecoration: "none",
      fontWeight: "bold",
    },
    footerLinkHover: {
      textDecoration: "underline",
    },
    eyeIcon: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
    },
    backButton: {
      position: "absolute",
      top: "20px",
      left: "20px",
      background: "none",
      border: "none",
      fontSize: "28px",
      color: "#4caf50",
      cursor: "pointer",
      transition: "transform 0.3s",
    },
    backButtonHover: {
      transform: "scale(1.1)",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
          onMouseEnter={(e) => (e.target.style.transform = styles.backButtonHover.transform)}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          ←
        </button>

        <h2 style={styles.title}>Kayıt Ol</h2>
        <form onSubmit={handleRegister}>
          {/* E-posta */}
          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          {/* Şifre */}
          <div style={styles.inputGroup}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
            <span
              style={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Şifrenizi Tekrar Girin */}
          <div style={styles.inputGroup}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Şifrenizi Tekrar Girin"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
            <span
              style={styles.eyeIcon}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Kayıt Ol
          </button>
        </form>
        <div style={styles.footer}>
          <p>
            Zaten hesabınız var mı?{" "}
            <button
              onClick={() => navigate("/")}
              style={{ background: "none", border: "none", color: styles.footerLink.color, cursor: "pointer" }}
              onMouseEnter={(e) => (e.target.style.textDecoration = styles.footerLinkHover.textDecoration)}
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              Giriş Yap
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
