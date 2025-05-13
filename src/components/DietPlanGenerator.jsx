import React, { useState } from 'react';
import { generateDietPlan, generateDietPlanStreaming } from '../services/dietService';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Config/FirebaseConfig'; // Firebase yapılandırmanıza göre ayarlayın
import '../styles/dietPlan.css';

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
  const [showDetails, setShowDetails] = useState(false);
  const [useStreaming, setUseStreaming] = useState(false);

  /**
   * Diyet planı oluşturma işlemini başlatır
   */
  const generatePlan = async () => {
    setLoading(true);
    setError(null);
    setDietPlan('');
    
    try {
      let plan;
      
      if (useStreaming) {
        // Streaming API ile diyet planı oluştur
        plan = await generateDietPlanStreaming(userAnswers, (chunk) => {
          // Her yeni metin parçası geldiğinde state'i güncelle
          setDietPlan(prev => prev + chunk);
        });
      } else {
        // Normal REST API ile diyet planı oluştur
        plan = await generateDietPlan(userAnswers);
        setDietPlan(plan);
      }
      
      // Firestore'a kaydet
      if (userId) {
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, {
          dietPlan: plan,
          generatedAt: new Date()
        });
      }
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

  return (
    <div className="diet-plan-container">
      {!dietPlan && !loading && (
        <div className="diet-plan-intro">
          <h2>Kişiselleştirilmiş Diyet Planı</h2>
          <p>
            Verdiğiniz bilgilere göre size özel bir diyet planı oluşturmak için aşağıdaki butona tıklayın.
            Bu plan, günlük kalori ihtiyacınızı, makro besin dağılımınızı ve 7 günlük yemek önerilerini içerecektir.
          </p>
          
          <div className="options-container">
            <label className="streaming-option">
              <input
                type="checkbox"
                checked={useStreaming}
                onChange={() => setUseStreaming(!useStreaming)}
              />
              Canlı yanıt göster (Streaming API)
            </label>
          </div>
          
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
            <div className="diet-plan-actions">
              <button 
                onClick={handlePrint}
                className="print-button"
              >
                <i className="fas fa-print"></i> Yazdır
              </button>
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="details-button"
              >
                {showDetails ? "Detayları Gizle" : "Detayları Göster"}
              </button>
            </div>
          </div>
          
          {showDetails && (
            <div className="user-details">
              <h3>Kişisel Bilgileriniz</h3>
              <ul>
                {userAnswers.map((answer, index) => (
                  <li key={index}>
                    <strong>{answer.question.replace(/\s*[🧑‍🤝‍🧑👩👨🤷‍♂️🎂📏⚖️🛋️🚶‍♂️🏃‍♂️🏋️‍♂️➖➕💪🎯🥦🌱🍞🚫🥩🍗🍽️🍴🍱🌾🧈🥗🍎]+\s*/g, '')}:</strong> {answer.answer.replace(/\s*[🧑‍🤝‍🧑👩👨🤷‍♂️🎂📏⚖️🛋️🚶‍♂️🏃‍♂️🏋️‍♂️➖➕💪🎯🥦🌱🍞🚫🥩🍗🍽️🍴🍱🌾🧈🥗🍎]+\s*/g, '')}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
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
  );
};

export default DietPlanGenerator;