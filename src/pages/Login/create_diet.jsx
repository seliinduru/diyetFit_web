import React, { useState, useEffect, useRef } from "react";
import { db } from "../../Config/FirebaseConfig"; // Import Firestore database
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { getAuth } from "firebase/auth"; // Import auth to get current user
import DietPlanGenerator from "../../components/DietPlanGenerator"; // Import the DietPlanGenerator component

const DietQuestions = () => {
  const questions = [
    {
      question: "Cinsiyetiniz nedir? 🧑‍🤝‍🧑",
      options: ["Kadın 👩", "Erkek 👨", "Diğer 🤷‍♂️"],
      type: "select",
      required: true
    },
    {
      question: "Yaşınızı girin: 🎂",
      type: "input",
      inputType: "number",
      min: 1,
      max: 120,
      required: true,
      placeholder: "Örn: 30"
    },
    {
      question: "Boyunuz kaç cm? 📏",
      type: "input",
      inputType: "number",
      min: 50,
      max: 250,
      required: true,
      placeholder: "Örn: 170"
    },
    {
      question: "Kilonuz kaç kg? ⚖️",
      type: "input",
      inputType: "number",
      min: 20,
      max: 300,
      required: true,
      placeholder: "Örn: 70"
    },
    {
      question: "Günlük hareketliliğinizi nasıl tanımlarsınız? 🏃‍♂️",
      options: ["Hareketsiz 🛋️", "Az aktif 🚶‍♂️", "Orta aktif 🏃‍♂️", "Çok aktif 🏋️‍♂️"],
      type: "select",
      required: true
    },
    {
      question: "Diyet amacınız nedir? 🎯",
      options: ["Kilo vermek ➖", "Kilo almak ➕", "Kilomu korumak ⚖️", "Kas kütlesi artırmak 💪"],
      type: "select",
      required: true
    },
    {
      question: "Hedef kilonuz nedir? 🎯",
      type: "input",
      inputType: "number",
      min: 20,
      max: 300,
      required: true,
      placeholder: "Örn: 65"
    },
    {
      question: "Özel bir beslenme tercihiniz var mı? 🥗",
      options: ["Vejetaryen 🥦", "Vegan 🌱", "Glutensiz 🍞🚫", "Ketojenik 🥩", "Paleo 🍗", "Özel yok 🍽️"],
      type: "select",
      required: true
    },
    {
      question: "Günde kaç öğün yemek istersiniz? 🍽️",
      options: [
        "1 Ana Öğün 🍽️", 
        "2 Ana Öğün 🍽️", 
        "3 Ana Öğün 🍽️", 
        "2 Ana + 1 Ara Öğün 🍴", 
        "3 Ana + 2 Ara Öğün 🍴", 
        "5-6 küçük öğün 🍱"
      ],
      type: "select",
      required: true
    },
    {
      question: "Diyetinizde nelere öncelik vermek istersiniz? 🍎",
      options: ["Yüksek protein 🍗", "Düşük karbonhidrat 🍞🚫", "Lif oranı yüksek 🌾", "Düşük yağ 🧈🚫", "Dengeli beslenme 🥗"],
      type: "select",
      required: true
    },
  ];

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState(""); // State for submission errors
  const [formattedAnswers, setFormattedAnswers] = useState([]); // State to store formatted answers for DietPlanGenerator
  const [questionnaireId, setQuestionnaireId] = useState(null); // State to store the questionnaire ID
  
  const contentRef = useRef(null);
  const current = questions[index];
  const auth = getAuth(); // Get Firebase auth instance
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    // Reset error when question changes
    setError("");
    
    // Set input value if returning to an input question
    if (current?.type === "input" && answers[index]) {
      setInputValue(answers[index]);
    } else if (current?.type === "input") {
      setInputValue("");
    }
    
    // Scroll content to top when question changes
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [index, current?.type, answers]);

  const validateInput = () => {
    if (!current) return true;
    
    if (current.required && !inputValue && current.type === "input") {
      setError("Bu alanı boş bırakamazsınız.");
      return false;
    }
    
    if (current.required && !answers[index] && current.type === "select") {
      setError("Lütfen bir seçenek belirleyin.");
      return false;
    }
    
    if (current.type === "input") {
      const numValue = Number(inputValue);
      
      if (isNaN(numValue)) {
        setError("Lütfen geçerli bir sayı girin.");
        return false;
      }
      
      if (current.min !== undefined && numValue < current.min) {
        setError(`Lütfen en az ${current.min} değerini girin.`);
        return false;
      }
      
      if (current.max !== undefined && numValue > current.max) {
        setError(`Lütfen en fazla ${current.max} değerini girin.`);
        return false;
      }
    }
    
    return true;
  };

  // Function to save answers to Firestore
  const saveAnswersToFirestore = async (answersData) => {
    try {
      // Create an object with question-answer pairs
      const formatted = questions.map((q, i) => ({
        question: q.question,
        answer: answersData[i]
      }));
      
      setFormattedAnswers(formatted); // Save formatted answers for DietPlanGenerator
      
      // Create the data object to save
      const dietData = {
        answers: formatted,
        createdAt: serverTimestamp(),
        userId: userId || 'anonymous',
        userEmail: auth.currentUser ? auth.currentUser.email : 'anonymous',
      };
      
      // Add document to "dietQuestionnaires" collection
      const docRef = await addDoc(collection(db, "dietQuestionnaires"), dietData);
      console.log("Document written with ID: ", docRef.id);
      setQuestionnaireId(docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  };

  const handleNext = () => {
    if (!validateInput()) return;
    
    const updated = [...answers];
    if (current?.type === "input") updated[index] = inputValue;
    setAnswers(updated);
    
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      setIsSubmitting(true);
      setIsComplete(true);
      console.log("Final answers:", updated);
      
      // Save answers to Firestore
      saveAnswersToFirestore(updated)
        .then(() => {
          // Simulate processing time
          setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
          }, 1500);
        })
        .catch((error) => {
          setIsSubmitting(false);
          setSubmissionError("Diyet planınız kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.");
          console.error("Error saving diet questionnaire:", error);
        });
    }
  };

  const handleBack = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleSelect = (option) => {
    const updated = [...answers];
    updated[index] = option;
    setAnswers(updated);
    setError("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (error) setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleNext();
    }
  };

  const handleExitSurvey = () => {
    if (window.confirm("Anketten çıkmak istediğinize emin misiniz? Tüm ilerlemeniz kaybolacaktır.")) {
      window.location.href = "/"; // Ana sayfaya yönlendir
    }
  };

  const renderContent = () => {
    if (isComplete) {
      if (isSubmitting) {
        return (
          <div className="result-container">
            <div className="loading-container">
              <div className="loading-circle"></div>
              <h2 className="loading-text">Diyet planınız oluşturuluyor</h2>
              <p className="loading-subtext">Lütfen bekleyiniz...</p>
            </div>
          </div>
        );
      } else if (submissionError) {
        return (
          <div className="result-container">
            <div className="error-container">
              <div className="error-icon">❌</div>
              <h2 className="error-text">Bir hata oluştu</h2>
              <p className="error-subtext">{submissionError}</p>
              <button 
                className="error-btn"
                onClick={() => {
                  setIsComplete(false);
                  setSubmissionError("");
                  setIndex(questions.length - 1);
                }}
              >
                Tekrar Dene
              </button>
            </div>
          </div>
        );
      } else if (showSuccess) {
        return (
          <div className="diet-plan-wrapper">
            <DietPlanGenerator userAnswers={formattedAnswers} userId={userId} />
          </div>
        );
      }
    }
    
    return (
      <>
        <div className="progress-container">
          <div className="progress">
            <div 
              className="bar"
              style={{ width: `${((index + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="question-status">
            Soru {index + 1}/{questions.length}
          </div>
        </div>
        
        <div className="content-area" ref={contentRef}>
          <div className="question-text">{current.question}</div>
          
          {current.type === "input" ? (
            <div className="input-container">
              <input
                type={current.inputType || "text"}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={current.placeholder || "Cevabınızı yazın"}
                className={`input ${error ? "input-error" : ""}`}
                min={current.min}
                max={current.max}
              />
              {error && <div className="error-message">{error}</div>}
            </div>
          ) : (
            <div className="options">
              {current.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  className={`option-btn ${answers[index] === opt ? "selected" : ""}`}
                >
                  {opt}
                </button>
              ))}
              {error && <div className="error-message">{error}</div>}
            </div>
          )}
        </div>
        
        <div className="btn-group">
          {index > 0 && (
            <button 
              className="nav-btn back"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              ← Geri
            </button>
          )}
          <button 
            className="nav-btn next"
            onClick={handleNext}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="loading-spinner"></span>
            ) : index === questions.length - 1 ? (
              "Tamamla ✓"
            ) : (
              "İleri →"
            )}
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="diet-container">
        {/* Exit button */}
        <button className="exit-btn" onClick={handleExitSurvey}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className={`card ${showSuccess ? "card-expanded" : ""}`}>
          {renderContent()}
        </div>
      </div>
      <style>
        {`
        .diet-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
          min-height: 100vh;
          background-color: #f5f7fa;
          font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
          position: relative;
        }
        
        .exit-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          
          background-color: white;
          border: none;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #6b7c93;
          transition: all 0.2s;
          z-index: 100;
        }
        
        .exit-btn:hover {
          background-color: #f8f9fa;
          transform: scale(1.05);
          color: #e53935;
        }
        
        .card {
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          max-width: 550px;
          width: 100%;
          height: 600px;
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: max-width 0.5s ease, height 0.5s ease;
        }
        
        .card-expanded {
          max-width: 900px;
          height: auto;
          min-height: 600px;
        }
        
        .diet-plan-wrapper {
          width: 100%;
          height: 100%;
          overflow: auto;
        }
        
        .progress-container {
          padding: 20px 30px 0;
          position: sticky;
          top: 0;
          background-color: white;
          z-index: 10;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .progress {
          height: 8px;
          background-color: #eef2f7;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 10px;
        }
        
        .bar {
          height: 100%;
          background: linear-gradient(90deg, #ff8c00, #ff5722);
          border-radius: 10px;
          transition: width 0.4s ease-in-out;
        }
        
        .question-status {
          font-size: 14px;
          color: #6b7c93;
          margin-bottom: 15px;
          text-align: right;
          font-weight: 500;
        }
        
        .content-area {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .question-text {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 30px;
          color: #32325d;
          text-align: center;
          
          line-height: 1.4;
        }
        
        .input-container {
          width: 100%;
          margin-bottom: 20px;
        }
        
        .input {
          padding: 15px;
          font-size: 16px;
          width: 100%;
          border: 2px solid #e0e6ed;
          border-radius: 10px;
          transition: all 0.3s;
          box-sizing: border-box;
        }
        
        .input:focus {
          border-color: #ff8c00;
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.1);
        }
        
        .input-error {
          border-color: #e53935;
        }
        
        .input-error:focus {
          border-color: #e53935;
          box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.1);
        }
        
        .error-message {
          color: #e53935;
          font-size: 14px;
          margin-top: 8px;
          text-align: left;
        }
        
        .options {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
        
        .option-btn {
          padding: 15px;
          border-radius: 10px;
          background-color: #f7f9fc;
          color: #32325d;
          border: 2px solid #e0e6ed;
          font-size: 16px;
          text-align: left;
          transition: all 0.2s;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        
        .option-btn:hover {
          background-color: #fff;
          border-color: #ff8c00;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 140, 0, 0.1);
        }
        
        .selected {
          background-color: #fff8f0;
          border-color: #ff8c00;
          color: #ff8c00;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(255, 140, 0, 0.1);
        }
        
        .btn-group {
          padding: 20px 30px;
          display: flex;
          justify-content: space-between;
          border-top: 1px solid #f0f0f0;
          background-color: white;
        }
        
        .nav-btn {
          padding: 14px 24px;
          border-radius: 10px;
          border: none;
          color: white;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 120px;
        }
        
        .nav-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .back {
          background-color: #6b7c93;
        }
        
        .back:hover:not(:disabled) {
          background-color: #5a6987;
          transform: translateY(-2px);
        }
        
        .next {
          background: linear-gradient(90deg, #ff8c00, #ff5722);
          box-shadow: 0 4px 12px rgba(255, 140, 0, 0.2);
        }
        
        .next:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(255, 140, 0, 0.3);
        }
        
        /* Loading spinner */
        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        /* Result container styles */
        .result-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 30px;
          text-align: center;
        }
        
        /* Loading screen styles */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .loading-circle {
          width: 80px;
          height: 80px;
          border: 4px solid rgba(255, 140, 0, 0.1);
          border-top-color: #ff8c00;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 30px;
        }
        
        .loading-text {
          font-size: 24px;
          font-weight: 600;
          color: #32325d;
          margin-bottom: 10px;
        }
        
        .loading-subtext {
          font-size: 16px;
          color: #6b7c93;
        }
        
        /* Success screen styles */
        .success-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.5s ease-out;
        }
        
        .success-text {
          font-size: 24px;
          font-weight: 600;
          color: #32325d;
          margin: 20px 0 10px;
        }
        
        .success-subtext {
          font-size: 16px;
          color: #6b7c93;
          margin-bottom: 30px;
        }
        
        .success-btn {
          padding: 14px 24px;
          border-radius: 10px;
          background: linear-gradient(90deg, #4caf50, #2e7d32);
          color: white;
          font-weight: 600;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
        }
        
        .success-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(76, 175, 80, 0.3);
        }
        
        /* Error screen styles */
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.5s ease-out;
        }
        
        .error-icon {
          font-size: 50px;
          color: #e53935;
          margin-bottom: 20px;
        }
        
        .error-text {
          font-size: 24px;
          font-weight: 600;
          color: #32325d;
          margin-bottom: 10px;
        }
        
        .error-subtext {
          font-size: 16px;
          color: #6b7c93;
          margin-bottom: 30px;
        }
        
        .error-btn {
          padding: 14px 24px;
          border-radius: 10px;
          background: linear-gradient(90deg, #f44336, #d32f2f);
          color: white;
          font-weight: 600;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(244, 67, 54, 0.2);
        }
        
        .error-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(244, 67, 54, 0.3);
        }
        
        /* Success checkmark animation */
        .success-checkmark {
          width: 80px;
          height: 80px;
          margin: 0 auto;
        }
        
        .check-icon {
          width: 80px;
          height: 80px;
          position: relative;
          border-radius: 50%;
          box-sizing: content-box;
          border: 4px solid #4CAF50;
        }
        
        .check-icon::before {
          top: 3px;
          left: -2px;
          width: 30px;
          transform-origin: 100% 50%;
          border-radius: 100px 0 0 100px;
        }
        
        .check-icon::after {
          top: 0;
          left: 30px;
          width: 60px;
          transform-origin: 0 50%;
          border-radius: 0 100px 100px 0;
          animation: rotate-circle 4.25s ease-in;
        }
        
        .check-icon::before, .check-icon::after {
          content: '';
          height: 100px;
          position: absolute;
          background: #FFFFFF;
          transform: rotate(-45deg);
        }
        
        .icon-line {
          height: 5px;
          background-color: #4CAF50;
          display: block;
          border-radius: 2px;
          position: absolute;
          z-index: 10;
        }
        
        .icon-line.line-tip {
          top: 46px;
          left: 14px;
          width: 25px;
          transform: rotate(45deg);
          animation: icon-line-tip 0.75s;
        }
        
        .icon-line.line-long {
          top: 38px;
          right: 8px;
          width: 47px;
          transform: rotate(-45deg);
          animation: icon-line-long 0.75s;
        }
        
        .icon-circle {
          top: -4px;
          left: -4px;
          z-index: 10;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          position: absolute;
          box-sizing: content-box;
          border: 4px solid rgba(76, 175, 80, 0.5);
        }
        
        .icon-fix {
          top: 8px;
          width: 5px;
          left: 26px;
          z-index: 1;
          height: 85px;
          position: absolute;
          transform: rotate(-45deg);
          background-color: white;
        }
        
        @keyframes rotate-circle {
          0% {
            transform: rotate(-45deg);
          }
          5% {
            transform: rotate(-45deg);
          }
          12% {
            transform: rotate(-405deg);
          }
          100% {
            transform: rotate(-405deg);
          }
        }
        
        @keyframes icon-line-tip {
          0% {
            width: 0;
            left: 1px;
            top: 19px;
          }
          54% {
            width: 0;
            left: 1px;
            top: 19px;
          }
          70% {
            width: 50px;
            left: -8px;
            top: 37px;
          }
          84% {
            width: 17px;
            left: 21px;
            top: 48px;
          }
          100% {
            width: 25px;
            left: 14px;
            top: 46px;
          }
        }
        
        @keyframes icon-line-long {
          0% {
            width: 0;
            right: 46px;
            top: 54px;
          }
          65% {
            width: 0;
            right: 46px;
            top: 54px;
          }
          84% {
            width: 55px;
            right: 0px;
            top: 35px;
          }
          100% {
            width: 47px;
            right: 8px;
            top: 38px;
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 600px) {
          .card {
            height: 85vh;
                        border-radius: 12px;
          }
          
          .question-text {
            font-size: 18px;
          }
          
          .option-btn {
            padding: 12px;
            font-size: 15px;
            
          }
          
          .nav-btn {
            padding: 12px 18px;
            font-size: 15px;
            min-width: 100px;
          }
          
          .progress-container {
            padding: 15px 20px 0;
          }
          
          .content-area {
            padding: 20px;
          }
          
          .btn-group {
            padding: 15px 20px;
          }
          
          .exit-btn {
            top: 10px;
            right: 10px;
            width: 36px;
            height: 36px;
          }
          
          .loading-text {
            font-size: 20px;
          }
          
          .success-text {
            font-size: 20px;
          }
        }
        
        /* Scrollbar styling */
        .content-area::-webkit-scrollbar {
          width: 8px;
        }
        
        .content-area::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .content-area::-webkit-scrollbar-thumb {
          background: #ddd;
          border-radius: 10px;
        }
        
        .content-area::-webkit-scrollbar-thumb:hover {
          background: #ccc;
        }
        
        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .question-text, .options, .input-container {
          animation: fadeIn 0.4s ease-out;
        }
        
        /* Diet Plan Generator specific styles */
        .diet-plan-wrapper {
          padding: 20px;
          animation: fadeIn 0.5s ease-out;
        }
        
        @media print {
          .exit-btn {
            display: none;
          }
          
          .card {
            box-shadow: none;
            height: auto;
          }
          
          .diet-plan-actions {
            display: none;
          }
        }
        `}
      </style>
    </>
  );
};

export default DietQuestions;


