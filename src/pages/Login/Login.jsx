import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Config/FirebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

      navigate("/main_page");
    } catch (err) {
      setError("Giriş başarısız: " + err.message);
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    box: {
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
      width: "100%",
      maxWidth: "400px",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#4caf50",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
    },
    error: {
      color: "red",
      marginBottom: "15px",
    },
    rememberContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "15px",
    },
    footerLinks: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "15px",
      fontSize: "14px",
    },
    eyeIcon: {
      position: "absolute",
      right: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
    },
    inputGroup: {
      position: "relative",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Giriş Yap</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <div style={styles.inputGroup}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <span
              style={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <div style={styles.rememberContainer}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              id="rememberMe"
            />
            <label htmlFor="rememberMe" style={{ marginLeft: "8px" }}>
              Beni Hatırla
            </label>
          </div>

          <button type="submit" style={styles.button}>
            Giriş Yap
          </button>
        </form>

        <div style={styles.footerLinks}>
          <span
            style={{ color: "#4caf50", cursor: "pointer" }}
            onClick={() => navigate("/forget_password")}
          >
            Şifremi unuttum
          </span>
          <span
            style={{ color: "#4caf50", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Kayıt Ol
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
