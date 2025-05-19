import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [dietData, setDietData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setLoading(true);
        try {
          // Önce kullanıcı bilgilerini her durumda al
          const userQuery = query(
            collection(db, "users"),
            where("uid", "==", currentUser.uid)
          );
          const userSnapshot = await getDocs(userQuery);
          if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            setUser({
              ...userData,
              email: currentUser.email, // Auth'dan email bilgisini al
            });
            // Sonra diyet anket verilerini kontrol et
            const dietQuery = query(
              collection(db, "dietQuestionnaires"),
              where("userId", "==", currentUser.uid)
            );
            const dietSnapshot = await getDocs(dietQuery);
            if (!dietSnapshot.empty) {
              // Diyet verisi bulundu
              const dietDoc = dietSnapshot.docs[0].data();
              setDietData(dietDoc);
            }
          } else {
            setError("Kullanıcı bilgileri bulunamadı.");
          }
        } catch (err) {
          console.error("Veri çekme hatası:", err);
          setError(
            "Veriler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
          );
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setDietData(null);
        setLoading(false);
        setError("Lütfen giriş yapın.");
      }
    });
    return () => unsubscribe();
  }, []);

  // Helper function to determine icon based on question content
  const getIconForQuestion = (question) => {
    const questionLower = question.toLowerCase();
    
    if (questionLower.includes('diyet amacı') || questionLower.includes('hedef'))
      return '🎯';
    if (questionLower.includes('kilo') || questionLower.includes('ağırlık'))
      return '⚖️';
    if (questionLower.includes('boy') || questionLower.includes('uzunluk'))
      return '📏';
    if (questionLower.includes('yaş'))
      return '🗓️';
    if (questionLower.includes('aktivite') || questionLower.includes('egzersiz'))
      return '🏃‍♂️';
    if (questionLower.includes('cinsiyet'))
      return '👤';
    if (questionLower.includes('alerji') || questionLower.includes('hassasiyet'))
      return '⚠️';
    if (questionLower.includes('tercih') || questionLower.includes('sevdiğiniz'))
      return '❤️';
    if (questionLower.includes('sevmediğiniz') || questionLower.includes('istemediğiniz'))
      return '👎';
    
    // Default icon
    return '📝';
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("profile-dark-mode");
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      // Çıkış yapıldıktan sonra ana sayfaya yönlendir
      navigate("/home");
    } catch (error) {
      console.error("Çıkış yapılırken hata oluştu:", error);
    }
  };

  const handleCreateDiet = () => {
    navigate("/create_diet");
  };

  const handleViewDiet = () => {
    navigate("/view-diet");
  };

  const navigateToHealthJournal = () => {
    navigate("/userPanel");
  };

  // Kullanıcı avatarı için ilk harfi al
  const getInitial = (email) => {
    return email ? email.charAt(0).toUpperCase() : "?";
  };

  // Yükleme durumu
  if (loading) {
    return (
      <div
        className={`profile-container ${darkMode ? "profile-dark-mode" : ""}`}
      >
        <div className="profile-header">
          <h1 className="profile-title">Profil</h1>
          <button className="profile-theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? "Açık Tema" : "Koyu Tema"}
          </button>
        </div>
        <div className="profile-loading-container">
          <div className="profile-spinner"></div>
          <p>Veriler yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div
        className={`profile-container ${darkMode ? "profile-dark-mode" : ""}`}
      >
        <div className="profile-header">
          <h1 className="profile-title">Profil</h1>
          <button className="profile-theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? "Açık Tema" : "Koyu Tema"}
          </button>
        </div>
        <div className="profile-error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`profile-container ${darkMode ? "profile-dark-mode" : ""}`}>
      <div className="profile-header">
        <div className="profile-header-left">
          <h1 className="profile-title">Profil</h1>
        </div>
        <div className="profile-header-right">
          <button className="profile-theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? "Açık Tema" : "Koyu Tema"}
          </button>
          <button className="profile-logout-button" onClick={handleLogout}>
            Çıkış Yap
          </button>
        </div>
      </div>
      {user && (
        <div className="profile-user-welcome">
          <div className="profile-avatar">{getInitial(user.email)}</div>
          <h2 className="profile-welcome-text">Hoş geldin, {user.email}</h2>
        </div>
      )}
      <div className="profile-content-container">
        {/* Sağlık Günlüğü Bölümü */}
        <div className="profile-health-journal">
          <div className="profile-section-header">
            <h2 className="profile-section-title">Kişisel Sağlık Günlüğünüz</h2>
            <p className="profile-section-description">
              Günlük sağlık verilerinizi takip edin, beslenme ve egzersiz
              alışkanlıklarınızı kaydedin.
            </p>
          </div>
          <div className="profile-journal-actions">
            <button
              className="profile-action-button profile-journal-button"
              onClick={navigateToHealthJournal}
            >
              <span className="profile-button-icon">📔</span> Sağlık Günlüğüne
              Git
            </button>
          </div>
        </div>
        
        {/* Diyet Planı Bölümü - YENİ TASARIM */}
        <div className="profile-diet-section">
          <h2 className="profile-section-title">Kişisel Bilgileriniz</h2>
          {dietData && dietData.answers ? (
            <>
              <div className="profile-info-container">
                {dietData.answers.map((item, index) => (
                  <div key={index} className="profile-info-item">
                    <div className="profile-info-header">
                      <span className="profile-info-icon">
                        {getIconForQuestion(item.question)}
                      </span>
                      <h3 className="profile-info-question">{item.question}</h3>
                    </div>
                    <div className="profile-info-answer">{item.answer}</div>
                  </div>
                ))}
              </div>
              <div className="profile-action-container">
                <button
                  className="profile-action-button profile-view-diet"
                  onClick={handleViewDiet}
                >
                  <span className="profile-button-icon">👁️</span> Diyet Planını Görüntüle
                </button>
              </div>
            </>
          ) : (
            <div className="profile-no-diet-container">
              <div className="profile-no-diet-icon">❌</div>
              <h3 className="profile-no-diet-title">
                Henüz bir diyet planınız bulunmuyor.
              </h3>
              <button
                className="profile-action-button profile-create-diet"
                onClick={handleCreateDiet}
              >
                <span className="profile-button-icon">➕</span> Diyet Planı Oluştur
              </button>
            </div>
          )}
        </div>
        
        {/* Hızlı Erişim Kartları */}
        <div className="profile-quick-access">
          <h2 className="profile-section-title">Hızlı Erişim</h2>
          <div className="profile-quick-cards">
            <div
              className="profile-quick-card"
              onClick={navigateToHealthJournal}
            >
              <div className="profile-quick-card-icon">📔</div>
              <div className="profile-quick-card-title">Sağlık Günlüğü</div>
            </div>
            <div
              className="profile-quick-card"
              onClick={() => navigate("/recipes")}
            >
              <div className="profile-quick-card-icon">🍲</div>
              <div className="profile-quick-card-title">Yemek Tarifleri</div>
            </div>
            <div
              className="profile-quick-card"
              onClick={() => navigate("/kac_kalori")}
            >
              <div className="profile-quick-card-icon">🔢</div>
              <div className="profile-quick-card-title">Kaç Kalori</div>
            </div>
            <div
              className="profile-quick-card"
              onClick={() => navigate("/vki")}
            >
              <div className="profile-quick-card-icon">📊</div>
              <div className="profile-quick-card-title">BKİ Hesapla</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
