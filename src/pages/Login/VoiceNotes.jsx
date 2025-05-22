import React, { useState, useEffect, useRef } from 'react';
import './VoiceNotes.css';

const VoiceNotes = ({ onSave }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [isBrowserSupported, setIsBrowserSupported] = useState(true);
  
  const recognitionRef = useRef(null);
  
  // Tarayıcı desteğini kontrol et
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsBrowserSupported(false);
      return;
    }
    
    // SpeechRecognition nesnesini oluştur
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'tr-TR';
    
    // SpeechRecognition olayları
    recognitionRef.current.onresult = (event) => {
      let interim = '';
      let currentFinal = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          currentFinal += transcript + ' ';
        } else {
          interim += transcript;
        }
      }
      
      if (currentFinal) {
        setFinalTranscript(prev => prev + currentFinal);
      }
      
      setInterimTranscript(interim);
      setRecognizedText(finalTranscript + currentFinal);
    };
    
    recognitionRef.current.onerror = (event) => {
      console.error('Konuşma tanıma hatası:', event.error);
      
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        stopRecording();
        alert('Mikrofon erişimi reddedildi veya servis kullanılamıyor.');
      }
    };
    
    recognitionRef.current.onend = () => {
      if (isRecording) {
        try {
          recognitionRef.current.start();
        } catch (error) {
          console.error('Kayıt yeniden başlatılamadı:', error);
          setIsRecording(false);
        }
      }
    };
    
    // Cleanup function
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isRecording, finalTranscript]);

  const openVoiceModal = () => {
    clearVoiceText();
    setIsVoiceModalOpen(true);
  };

  const clearVoiceText = () => {
    setRecognizedText('');
    setFinalTranscript('');
    setInterimTranscript('');
  };

  const startRecording = () => {
    if (!recognitionRef.current) return;
    
    try {
      recognitionRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Kayıt başlatılırken hata oluştu:', error);
      alert('Kayıt başlatılamadı. Lütfen sayfayı yenileyip tekrar deneyin.');
    }
  };

  const stopRecording = () => {
    if (!recognitionRef.current) return;
    
    setIsRecording(false);
    recognitionRef.current.stop();
  };

  const saveVoiceNote = () => {
    if (!recognizedText.trim()) return;
    
    setIsVoiceModalOpen(false);
    setIsNoteModalOpen(true);
    setNoteTitle('Sesli Not - ' + new Date().toLocaleString('tr-TR'));
  };

  const closeAllModals = () => {
    if (isRecording && recognitionRef.current) {
      stopRecording();
    }
    
    setIsVoiceModalOpen(false);
    setIsNoteModalOpen(false);
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    
    // Call the onSave callback with the recognized text and title
    if (onSave && typeof onSave === 'function') {
      onSave(recognizedText.trim(), noteTitle);
    }
    
    closeAllModals();
  };

  return (
    <div className="voice-notes-container">
      <button 
        onClick={openVoiceModal} 
        disabled={!isBrowserSupported}
        title={!isBrowserSupported ? 'Tarayıcınız sesli not özelliğini desteklemiyor' : ''}
        className="voice-note-btn"
      >
        <i className="fas fa-microphone"></i> Sesli Not
      </button>
      
      {/* Sesli Not Modal */}
      {isVoiceModalOpen && (
        <div className="modal" id="voice-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Sesli Not</h2>
              <span className="close" onClick={closeAllModals}>&times;</span>
            </div>
            <div className="modal-body">
              <div id="voice-status">
                {isRecording ? (
                  <>
                    <i className="fas fa-microphone fa-3x recording"></i>
                    <p>Konuşun...</p>
                  </>
                ) : (
                  <>
                    <i className="fas fa-microphone fa-3x"></i>
                    <p>Kayıt için butona tıklayın</p>
                  </>
                )}
              </div>
              
              <div id="voice-text">
                {recognizedText || interimTranscript ? (
                  <>
                    <p>{recognizedText}</p>
                    <p className="interim">{interimTranscript}</p>
                  </>
                ) : (
                  <p className="placeholder">Konuşmanız burada görünecek...</p>
                )}
              </div>
              
              <div className="voice-controls">
                <button 
                  id="start-recording" 
                  onClick={startRecording} 
                  disabled={isRecording}
                >
                  <i className="fas fa-play"></i> Kayıt Başlat
                </button>
                <button 
                  id="stop-recording" 
                  onClick={stopRecording} 
                  disabled={!isRecording}
                >
                  <i className="fas fa-stop"></i> Kayıt Durdur
                </button>
                <button 
                  id="clear-voice-text" 
                  onClick={clearVoiceText}
                >
                  <i className="fas fa-trash"></i> Temizle
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                id="save-voice-note" 
                onClick={saveVoiceNote} 
                disabled={!recognizedText.trim()}
              >
                <i className="fas fa-save"></i> Kaydet
              </button>
              <button id="cancel-voice" onClick={closeAllModals}>
                <i className="fas fa-times"></i> İptal
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Not Kaydetme Modal */}
      {isNoteModalOpen && (
        <div className="modal" id="note-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Sesli Not</h2>
              <span className="close" onClick={closeAllModals}>&times;</span>
            </div>
            <div className="modal-body">
              <form id="note-form" onSubmit={handleSaveNote}>
                <input type="hidden" id="note-id" />
                
                <div className="form-group">
                  <label htmlFor="note-title">Başlık:</label>
                  <input
                    type="text"
                    id="note-title"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="note-content">İçerik:</label>
                  <textarea
                    id="note-content"
                    value={recognizedText.trim()}
                    onChange={(e) => setRecognizedText(e.target.value)}
                    required
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label>
                    <input type="checkbox" id="note-favorite" /> Favorilere Ekle
                  </label>
                </div>
                
                <div className="form-buttons">
                  <button type="submit" className="save-btn">
                    <i className="fas fa-save"></i> Kaydet
                  </button>
                  <button type="button" className="cancel-btn" onClick={closeAllModals}>
                    <i className="fas fa-times"></i> İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceNotes;
