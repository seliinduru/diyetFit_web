import React, { useState } from "react";

const DietQuestions = () => {
  const questions = [
    { question: "Cinsiyetiniz nedir? 🧑‍🤝‍🧑", options: ["Kadın 👩", "Erkek 👨", "Diğer 🤷‍♂️"], type: "select" },
    { question: "Yaşınızı girin: 🎂", type: "input" },
    { question: "Boyunuz kaç cm? 📏", type: "input" },
    { question: "Kilonuz kaç kg? ⚖️", type: "input" },
    { question: "Günlük hareketliliğinizi nasıl tanımlarsınız? 🏃‍♂️", options: ["Hareketsiz 🛋️", "Az aktif 🚶‍♂️", "Orta aktif 🏃‍♂️", "Çok aktif 🏋️‍♂️"], type: "select" },
    { question: "Diyet amacınız nedir? 🎯", options: ["Kilo vermek ➖", "Kilo almak ➕", "Kilomu korumak ⚖️", "Kas kütlesi artırmak 💪"], type: "select" },
    { question: "Hedef kilonuz nedir? 🎯", type: "input" },
    { question: "Özel bir beslenme tercihiniz var mı? 🥗", options: ["Vejetaryen 🥦", "Vegan 🌱", "Glutensiz 🍞🚫", "Ketojenik 🥩", "Paleo 🍗", "Özel yok 🍽️"], type: "select" },
    { question: "Günde kaç öğün yemek istersiniz? 🍽️", options: ["3 Ana Öğün 🍽️", "3 Ana + 2 Ara Öğün 🍴", "5-6 küçük öğün 🍱"], type: "select" },
    { question: "Diyetinizde nelere öncelik vermek istersiniz? 🍎", options: ["Yüksek protein 🍗", "Düşük karbonhidrat 🍞🚫", "Lif oranı yüksek 🌾", "Düşük yağ 🧈🚫", "Dengeli beslenme 🥗"], type: "select" },
  ];

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [inputValue, setInputValue] = useState("");

  const current = questions[index];

  const handleNext = () => {
    const updated = [...answers];
    if (current.type === "input") updated[index] = inputValue;
    setAnswers(updated);
    setInputValue("");
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      console.log("Final answers:", updated);
      alert("Diyet planı oluşturuluyor...");
    }
  };

  const handleBack = () => {
    if (index > 0) {
      setIndex(index - 1);
      const prev = answers[index - 1];
      if (questions[index - 1].type === "input") setInputValue(prev);
    }
  };

  const handleSelect = (option) => {
    const updated = [...answers];
    updated[index] = option;
    setAnswers(updated);
  };

  return (
    <>
      <div className="diet-container">
        <div className="card">
          {/* Progress Bar */}
          <div className="progress">
            <div className="bar" style={{ width: `${((index + 1) / questions.length) * 100}%` }}></div>
          </div>

          {/* Soruların Durumunu Göster */}
          <div className="question-status">
            {index + 1}/{questions.length}
          </div>

          {/* Soru */}
          <div className="question-text">{current.question}</div>

          {current.type === "input" ? (
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Cevabınızı yazın"
              className="input"
            />
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
            </div>
          )}

          <div className="btn-group">
            {index > 0 && (
              <button className="nav-btn back" onClick={handleBack}>
                ← Geri
              </button>
            )}
            <button className="nav-btn next" onClick={handleNext}>
              {index === questions.length - 1 ? "Bitir ✓" : "İleri →"}
            </button>
          </div>
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
          background-color: #fff8f0;
          font-family: sans-serif;
        }

        .card {
         background-color: white;
         padding: 30px;
         border-radius: 16px;
         box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
         max-width: 500px;
         width: 100%;
        text-align: center;
        height: 500px;
        overflow-y: auto;
        position: relative;
        }

        .progress {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background-color: #eee;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .bar {
          height: 100%;
          background-color: #ff8c00;
          transition: width 0.4s ease-in-out;
        }

        .question-status {
          font-size: 16px;
          color: #333;
          margin-top: 10px;
        }

        .question-text {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #333;
        }

        .input {
          padding: 12px;
          font-size: 16px;
          width: 100%;
          border: 1px solid #ff8c00;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .option-btn {
          padding: 12px;
          border-radius: 8px;
          background-color: #ffa726;
          color: white;
          border: none;
          font-size: 16px;
          text-align: left;
          transition: all 0.3s;
        }

        .option-btn:hover {
          background-color: #fb8c00;
        }

        .selected {
          background-color: #fb8c00;
          font-weight: bold;
        }

        .btn-group {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
        }

        .nav-btn {
          padding: 12px 20px;
          border-radius: 8px;
          border: none;
          color: white;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
        }

        .back {
          background-color: #e64a19;
        }

        .next {
          background-color: #ff8c00;
        }
      `}
      </style>
    </>
  );
};

export default DietQuestions;
