import React, { useState } from 'react';
import { generateDietPlan } from '../services/dietService';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Config/FirebaseConfig';
import '../styles/dietPlan.css';
import { useNavigate } from 'react-router-dom';

/**
 * Diyet planı oluşturan ve gösteren bileşen
 * @param {Array} userAnswers - Kullanıcının anket cevapları
 * @param {string} userId - Kullanıcı ID'si
 * @returns {JSX.Element} - Diyet planı bileşeni
 */
const DietPlanGenerator = ({ userAnswers, userId }) => {
  const [dietPlan, setDietPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const navigate = useNavigate();

  /**
   * Diyet planı oluşturma işlemini başlatır
   */
  const generatePlan = async () => {
    setLoading(true);
    setError(null);
    setDietPlan('');
    
    try {
      // Normal REST API ile diyet planı oluştur
      const plan = await generateDietPlan(userAnswers);
      setDietPlan(plan);
    } catch (err) {
      setError("Diyet planı oluşturulurken bir hata oluştu: " + err.message);
      console.error("Diyet planı oluşturma hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Diyet planını yazdırma işlemini başlatır
   */
  const handlePrint = () => {
    window.print();
  };

  /**
   * Diyet planını kaydetme işlemini başlatır
   */
  const handleSave = async () => {
    try {
      if (userId && dietPlan) {
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, {
          dietPlan: dietPlan,
          generatedAt: new Date()
        });
        setShowSaveSuccess(true);
        setTimeout(() => {
          setShowSaveSuccess(false);
        }, 3000);
      }
    } catch (err) {
      setError("Diyet planı kaydedilirken bir hata oluştu: " + err.message);
    }
  };

  /**
   * Sayfadan çıkış işlemini başlatır
   */
  const handleExit = () => {
    if (dietPlan) {
      setShowConfirmModal(true);
    } else {
      navigate('/dashboard');
    }
  };

  /**
   * Çıkış onaylandığında yönlendirme yapar
   */
  const confirmExit = () => {
    setShowConfirmModal(false);
    navigate('/dashboard');
  };

  /**
   * Kullanıcı bilgilerini formatlar
   */
  const formatUserInfo = (answer) => {
    const question = answer.question.replace(/\s*[🧑‍🤝‍🧑👩👨🤷‍♂️🎂📏⚖️🛋️🚶‍♂️🏃‍♂️🏋️‍♂️➖➕💪🎯🥦🌱🍞🚫🥩🍗🍽️🍴🍱🌾🧈🥗🍎]+\s*/g, '');
    const answerText = answer.answer.replace(/\s*[🧑‍🤝‍🧑👩👨🤷‍♂️🎂📏⚖️🛋️🚶‍♂️🏃‍♂️🏋️‍♂️➖➕💪🎯🥦🌱🍞🚫🥩🍗🍽️🍴🍱🌾🧈🥗🍎]+\s*/g, '');
    return { question, answerText };
  };

  return (
    <div className="diet-plan-page">
      {/* Üst köşede yazdır butonu */}
      {dietPlan && (
        <button 
          onClick={handlePrint}
          className="print-button"
        >
          <i className="fas fa-print"></i> Yazdır
        </button>
      )}

      <div className="diet-plan-layout">
        {/* Sol panel - Kişisel bilgiler */}
        <div className="user-info-panel">
          <h2>Kişisel Bilgileriniz</h2>
          {userAnswers.length > 0 ? (
            <ul className="user-info-list">
              {userAnswers.map((answer, index) => {
                const { question, answerText } = formatUserInfo(answer);
                return (
                  <li key={index}>
                    <strong>{question}:</strong> 
                    <span>{answerText}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Kişisel bilgiler bulunamadı.</p>
          )}
        </div>

        {/* Sağ panel - Diyet planı */}
        <div className="diet-plan-panel">
          {!dietPlan && !loading && (
            <div className="diet-plan-intro">
              <h2>Kişiselleştirilmiş Diyet Planı</h2>
              <p>
                Verdiğiniz bilgilere göre size özel bir diyet planı oluşturmak için aşağıdaki butona tıklayın.
                Bu plan, günlük kalori ihtiyacınızı, makro besin dağılımınızı ve 7 günlük yemek önerilerini içerecektir.
              </p>
              
              <button 
                onClick={generatePlan}
                className="generate-button"
                disabled={loading}
              >
                Diyet Planı Oluştur
              </button>
            </div>
          )}
          
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <h3>Diyet Planınız Hazırlanıyor</h3>
              <p>Kişisel bilgilerinize göre en uygun diyet planı oluşturuluyor. Bu işlem birkaç dakika sürebilir.</p>
            </div>
          )}
          
          {error && (
            <div className="error-message">
              <h3>Hata Oluştu</h3>
              <p>{error}</p>
              <button 
                onClick={generatePlan}
                className="retry-button"
              >
                Tekrar Dene
              </button>
            </div>
          )}
          
          {dietPlan && (
            <div className="diet-plan">
              <div className="diet-plan-header">
                <h2>Kişiselleştirilmiş 7 Günlük Diyet Planınız</h2>
              </div>
              
              <div className="plan-content">
                <div dangerouslySetInnerHTML={{ __html: dietPlan.replace(/\n/g, '<br>') }} />
              </div>
              
              <div className="diet-plan-footer">
                <p>
                  <strong>Not:</strong> Bu diyet planı, verdiğiniz bilgilere göre oluşturulmuştur. 
                  Herhangi bir sağlık sorununuz varsa, bu planı uygulamadan önce bir sağlık uzmanına danışmanız önerilir.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Alt kısım - Butonlar */}
      {dietPlan && (
        <div className="action-buttons">
          <button 
            onClick={handleSave}
            className="save-button"
          >
            Diyet Planımı Kaydet
          </button>
          <button 
            onClick={handleExit}
            className="exit-button"
          >
            Kaydetmeden Çık
          </button>
        </div>
      )}

      {/* Çıkış onay modalı */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <h3>Çıkmak istediğinize emin misiniz?</h3>
            <p>Diyet planınız kaydedilmeyecek.</p>
            <div className="modal-buttons">
              <button onClick={() => setShowConfirmModal(false)} className="cancel-button">
                İptal
              </button>
              <button onClick={confirmExit} className="confirm-button">
                Evet, Çık
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Başarılı kaydetme bildirimi */}
      {showSaveSuccess && (
        <div className="success-notification">
          <p>Diyet planınız başarıyla kaydedildi</p>
        </div>
      )}
    </div>
  );
};

export default DietPlanGenerator;
