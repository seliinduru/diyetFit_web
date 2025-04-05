import React, { useState } from "react";
import { auth, sendPasswordResetEmail } from "../../Config/FirebaseConfig"; // Doğru import
import { useNavigate } from "react-router-dom"; // Sayfa yönlendirme için

const ForgetPassword = () => {
  const [email, setEmail] = useState(""); // Kullanıcının e-posta adresi
  const [isLoading, setIsLoading] = useState(false); // Yükleniyor durumu
  const navigate = useNavigate(); // Yönlendirme için navigate kullanıyoruz

  // Şifre sıfırlama işlemi
  const handlePasswordReset = (e) => {
    e.preventDefault();

    // E-posta boşsa, kullanıcıya uyarı
    if (email === "") {
      alert("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }

    setIsLoading(true); // Yükleniyor durumunu aktif et

    // Firebase v9+ yöntemine uygun şekilde fonksiyonu çağırıyoruz
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert(
          "E-posta adresinize şifre sıfırlama bağlantısı gönderildi. Lütfen e-postanızı kontrol edin."
        );
        setIsLoading(false); // Yükleniyor durumunu kapat
        navigate("/login"); // Şifre sıfırlama sonrası login sayfasına yönlendir
      })
      .catch((error) => {
        setIsLoading(false); // Yükleniyor durumunu kapat
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Hata: ${errorMessage}`); // Hata mesajını göster
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Şifrenizi Sıfırlayın</h2>
        <form onSubmit={handlePasswordReset}>
          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            disabled={isLoading} // Yükleniyor durumu aktifse buton disable
          >
            {isLoading ? "Yükleniyor..." : "Şifreyi Sıfırla"}
          </button>
        </form>
        <button style={styles.backButton} onClick={() => navigate("/login")}>
          Geri
        </button>
      </div>
    </div>
  );
};

// CSS Stiller
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "white",
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
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    outline: "none",
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
  },
  backButton: {
    marginTop: "15px",
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    color: "#4caf50",
  },
};

export default ForgetPassword;
