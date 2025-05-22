import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  getDocs,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../../Config/FirebaseConfig"; // auth'u da import ediyoruz
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"; // Kullanıcı durumunu izlemek için
import "./SavedDietPlans.css";

/**
 * Kullanıcının kaydettiği diyet planlarını gösteren bileşen
 * @returns {JSX.Element} - Kaydedilmiş diyet planları bileşeni
 */
const SavedDietPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [userId, setUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Kullanıcı kimliğini al
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setError("Oturum açmanız gerekiyor");
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Kullanıcı kimliği alındıktan sonra planları getir
  useEffect(() => {
    const fetchPlans = async () => {
      if (!userId) {
        return; // Kullanıcı kimliği yoksa işlemi durdur
      }
      try {
        console.log("Planlar getiriliyor, userId:", userId);
        const plansRef = collection(db, "dietPlans", userId, "plans");
        const q = query(plansRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const plansList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        }));

        console.log("Getirilen planlar:", plansList);
        setPlans(plansList);
        setLoading(false);
      } catch (err) {
        console.error("Planları getirme hatası:", err);
        setError("Diyet planları yüklenirken bir hata oluştu: " + err.message);
        setLoading(false);
      }
    };

    if (userId) {
      fetchPlans();
    }
  }, [userId]);

  // Tarih formatını düzenle
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Plan silme işlemi
  const handleDeletePlan = async (planId) => {
    try {
      await deleteDoc(doc(db, "dietPlans", userId, "plans", planId));
      setPlans(plans.filter((plan) => plan.id !== planId));
      setConfirmDelete(null);
      // Eğer silinen plan şu an görüntüleniyorsa, görüntülemeyi kapat
      if (selectedPlan && selectedPlan.id === planId) {
        setSelectedPlan(null);
      }
    } catch (err) {
      console.error("Plan silme hatası:", err);
      setError("Plan silinirken bir hata oluştu");
    }
  };

  // Planı yazdırma işlemi
  const handlePrint = () => {
    const printContent = document.getElementById("printable-plan");
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;

    // Sayfayı yeniden yükle (yazdırma sonrası React state'ini düzeltmek için)
    window.location.reload();
  };

  // Arama işlemi
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrelenmiş planlar
  const filteredPlans = plans.filter((plan) => {
    const searchTermLower = searchTerm.toLowerCase();
    const dateStr = formatDate(plan.createdAt).toLowerCase();
    const contentStr = (plan.planContent || "").toLowerCase();

    return (
      dateStr.includes(searchTermLower) || contentStr.includes(searchTermLower)
    );
  });

  return (
    <div className="saved-plans-container">
      <div className="saved-plans-header">
        <h1>Kaydedilmiş Diyet Planlarım</h1>
        <button
          onClick={() => navigate("/create_diet")}
          className="create-new-plan-button"
        >
          <i className="fas fa-plus"></i>+ Yeni Diyet Planı Oluştur
        </button>
      </div>
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Diyet planlarınız yükleniyor...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <h3>Hata Oluştu</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Tekrar Dene
          </button>
        </div>
      ) : (
        <div className="plans-content">
          {plans.length === 0 ? (
            <div className="no-plans-message">
              <i className="fas fa-clipboard-list empty-icon"></i>
              <h2>Henüz kaydedilmiş diyet planınız bulunmuyor</h2>
              <p>
                Diyet planı oluşturup kaydederek burada görüntüleyebilirsiniz.
              </p>
              <button
                onClick={() => navigate("/create-diet-plan")}
                className="create-plan-button"
              >
                Diyet Planı Oluştur
              </button>
            </div>
          ) : (
            <div className="plans-layout">
              {/* Sol panel - Plan listesi */}
              <div className="plans-list">
                <div className="search-container">
                  <div className="search-input-wrapper">
                    <i className="fas fa-search search-icon"></i>
                    <input
                      type="text"
                      placeholder="Plan içeriği veya tarih ara..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="search-input"
                    />
                    {searchTerm && (
                      <button
                        className="clear-search"
                        onClick={() => setSearchTerm("")}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    )}
                  </div>
                </div>
                <h2>Diyet Planlarım ({filteredPlans.length})</h2>
                <div className="plans-grid">
                  {filteredPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`plan-card ${
                        selectedPlan?.id === plan.id ? "selected" : ""
                      }`}
                      onClick={() => setSelectedPlan(plan)}
                    >
                      <div className="plan-card-header">
                        <h3>Diyet Planı</h3>
                        <span className="plan-date">
                          {formatDate(plan.createdAt)}
                        </span>
                      </div>
                      <div className="plan-card-preview">
                        {plan.planContent
                          ? plan.planContent.substring(0, 100) + "..."
                          : "İçerik yüklenemedi"}
                      </div>
                      <div className="plan-card-actions">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPlan(plan);
                          }}
                          className="view-button"
                        >
                          <i className="fas fa-eye"></i> Görüntüle
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDelete(plan.id);
                          }}
                          className="delete-button"
                        >
                          <i className="fas fa-trash"></i> Sil
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Sağ panel - Seçilen planın detayları */}
              {selectedPlan ? (
                <div className="plan-details">
                  <div className="plan-details-header">
                    <h2>Diyet Planı Detayları</h2>
                    <div className="plan-details-actions">
                      <button onClick={handlePrint} className="print-button">
                        <i className="fas fa-print"></i> Yazdır
                      </button>
                      <button
                        onClick={() => setSelectedPlan(null)}
                        className="close-button"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                  <div className="plan-details-date">
                    <i className="far fa-calendar-alt"></i>{" "}
                    {formatDate(selectedPlan.createdAt)}
                  </div>
                  <div id="printable-plan" className="plan-details-content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedPlan.planContent
                          ? selectedPlan.planContent.replace(/\n/g, "<br>")
                          : "İçerik yüklenemedi",
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="no-plan-selected">
                  <div className="no-plan-message">
                    <i className="fas fa-hand-point-left"></i>
                    <h3>Görüntülemek için bir diyet planı seçin</h3>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {/* Silme onay modalı */}
      {confirmDelete && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <h3>Diyet Planını Silmek İstediğinize Emin Misiniz?</h3>
            <p>Bu işlem geri alınamaz.</p>
            <div className="modal-buttons">
              <button
                onClick={() => setConfirmDelete(null)}
                className="cancel-button"
              >
                İptal
              </button>
              <button
                onClick={() => handleDeletePlan(confirmDelete)}
                className="confirm-button"
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedDietPlans;
