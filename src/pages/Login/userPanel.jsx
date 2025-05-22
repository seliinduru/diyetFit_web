import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import EmojiPicker from 'emoji-picker-react';
import './UserPanel.css';
import { db, auth } from '../../Config/FirebaseConfig'; // Import Firebase config
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import VoiceNotes from './VoiceNotes'; // Import the VoiceNotes component

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// localStorage polyfill for environments without it
const storage = {};
const localStoragePolyfill = {
  getItem: (key) => {
    return storage[key] || null;
  },
  setItem: (key, value) => {
    storage[key] = value;
  },
  removeItem: (key) => {
    delete storage[key];
  }
};

// Use actual localStorage if available, otherwise use polyfill
const storageSystem = typeof window !== 'undefined' && window.localStorage
  ? window.localStorage
  : localStoragePolyfill;

const UserPanel = ({ userEmail }) => {
  // Note state
  const [note, setNote] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  // Water tracker state
  const [waterGlasses, setWaterGlasses] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  // Weight tracker state
  const [weight, setWeight] = useState(0);
  const [targetWeight, setTargetWeight] = useState(55.0);
  const [weightInputValue, setWeightInputValue] = useState('');
  const [targetWeightInputValue, setTargetWeightInputValue] = useState('');
  
  // Weight history for chart
  const [weightHistory, setWeightHistory] = useState([]);
  
  // Todo list state
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  
  // Firebase user state
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const noteInputRef = useRef(null);

  // Get the current user's email for storage keys
  const getUserStorageKey = () => {
    // If we have an authenticated user with email, use that
    const authUser = auth.currentUser;
    if (authUser && authUser.email) {
      return authUser.email;
    }
    // Otherwise fall back to the email passed as prop
    return userEmail;
  };

  // Check for authenticated user and set userId
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        // If the user's email is different from the prop, log it
        if (user.email && user.email !== userEmail) {
          console.log("Using authenticated email instead of prop email");
        }
      } else {
        setUserId(null);
      }
      setIsLoading(false);
    });
    
    return () => unsubscribe();
  }, [userEmail]);

  // Load user data on component mount
  useEffect(() => {
    if (!isLoading) {
      loadUserData();
      
      // Update date and time every minute
      const interval = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 60000);
      
      // Check if day changed to reset water counter
      const midnightCheck = setInterval(() => {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) {
          setWaterGlasses(0);
          saveWaterData(0);
        }
      }, 60000);
      
      return () => {
        clearInterval(interval);
        clearInterval(midnightCheck);
      };
    }
  }, [isLoading, userEmail]);

  // Load data from Firestore
  const loadFromFirestore = async () => {
    if (!userId) return null;
    
    try {
      const userDocRef = doc(db, "userHealth", userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error("Error loading data from Firestore:", error);
      return null;
    }
  };

  // Save data to Firestore
  const saveToFirestore = async (data) => {
    if (!userId) return;
    
    try {
      const userDocRef = doc(db, "userHealth", userId);
      await setDoc(userDocRef, data, { merge: true });
      console.log("Data saved to Firestore");
    } catch (error) {
      console.error("Error saving to Firestore:", error);
    }
  };

  const loadUserData = async () => {
    try {
      // First load from localStorage
      loadFromLocalStorage();
      
      // If user is logged in, check Firestore data
      if (userId) {
        const firestoreData = await loadFromFirestore();
        
        if (firestoreData) {
          // If localStorage has no data or Firestore data is newer, use Firestore data
          const shouldUseFirestoreData = shouldUpdateFromFirestore(firestoreData);
          
          if (shouldUseFirestoreData) {
            updateDataFromFirestore(firestoreData);
          } else {
            // Sync localStorage data to Firestore
            syncLocalDataToFirestore();
          }
        } else {
          // If no data in Firestore, save localStorage data to Firestore
          syncLocalDataToFirestore();
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  // Load data from localStorage
  const loadFromLocalStorage = () => {
    try {
      const userKey = getUserStorageKey();
      
      // Load note
      const savedNote = storageSystem.getItem(`note_${userKey}`);
      if (savedNote) setNote(savedNote);
      
      // Load water data
      const savedWaterData = storageSystem.getItem(`water_${userKey}_${getCurrentDateKey()}`);
      if (savedWaterData) setWaterGlasses(parseInt(savedWaterData, 10));
      
      // Load weight data
      const savedWeight = storageSystem.getItem(`weight_${userKey}`);
      if (savedWeight) {
        const parsedWeight = parseFloat(savedWeight);
        setWeight(parsedWeight);
        setWeightInputValue(parsedWeight.toFixed(1));
      }
      
      // Load target weight
      const savedTargetWeight = storageSystem.getItem(`targetWeight_${userKey}`);
      if (savedTargetWeight) {
        const parsedTargetWeight = parseFloat(savedTargetWeight);
        setTargetWeight(parsedTargetWeight);
        setTargetWeightInputValue(parsedTargetWeight.toFixed(1));
      } else {
        setTargetWeight(55.0); // Default target weight
        setTargetWeightInputValue('55.0');
      }
      
      // Load weight history
      const savedWeightHistory = storageSystem.getItem(`weightHistory_${userKey}`);
      if (savedWeightHistory) {
        setWeightHistory(JSON.parse(savedWeightHistory));
      }
      
      // Load todos
      const savedTodos = storageSystem.getItem(`todos_${userKey}`);
      if (savedTodos) {
        try {
          const parsedTodos = JSON.parse(savedTodos);
          if (Array.isArray(parsedTodos)) {
            setTodos(parsedTodos);
          } else {
            console.error('Saved todos is not an array:', parsedTodos);
            setTodos([]);
          }
        } catch (e) {
          console.error('Error parsing todos:', e);
          setTodos([]);
        }
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  };

  // Check if Firestore data is newer than localStorage data
  const shouldUpdateFromFirestore = (firestoreData) => {
    const userKey = getUserStorageKey();
    
    // If no data in localStorage, use Firestore data
    if (!storageSystem.getItem(`note_${userKey}`) && 
        !storageSystem.getItem(`water_${userKey}_${getCurrentDateKey()}`) &&
        !storageSystem.getItem(`weight_${userKey}`) &&
        !storageSystem.getItem(`targetWeight_${userKey}`) &&
        !storageSystem.getItem(`weightHistory_${userKey}`) &&
        !storageSystem.getItem(`todos_${userKey}`)) {
      return true;
    }
    
    // If Firestore has lastUpdated field and it's newer than localStorage's, use Firestore data
    if (firestoreData.lastUpdated) {
      const localLastUpdated = storageSystem.getItem(`lastUpdated_${userKey}`);
      if (!localLastUpdated || new Date(firestoreData.lastUpdated) > new Date(localLastUpdated)) {
        return true;
      }
    }
    
    return false;
  };

  // Update state and localStorage with Firestore data
  const updateDataFromFirestore = (firestoreData) => {
    try {
      const userKey = getUserStorageKey();
      
      // Update note
      if (firestoreData.note !== undefined) {
        setNote(firestoreData.note);
        storageSystem.setItem(`note_${userKey}`, firestoreData.note);
      }
      
      // Update water data
      if (firestoreData.waterGlasses !== undefined) {
        setWaterGlasses(firestoreData.waterGlasses);
        storageSystem.setItem(`water_${userKey}_${getCurrentDateKey()}`, firestoreData.waterGlasses.toString());
      }
      
      // Update weight
      if (firestoreData.weight !== undefined) {
        setWeight(firestoreData.weight);
        setWeightInputValue(firestoreData.weight.toFixed(1));
        storageSystem.setItem(`weight_${userKey}`, firestoreData.weight.toString());
      }
      
      // Update target weight
      if (firestoreData.targetWeight !== undefined) {
        setTargetWeight(firestoreData.targetWeight);
        setTargetWeightInputValue(firestoreData.targetWeight.toFixed(1));
        storageSystem.setItem(`targetWeight_${userKey}`, firestoreData.targetWeight.toString());
      }
      
      // Update weight history
      if (firestoreData.weightHistory !== undefined) {
        setWeightHistory(firestoreData.weightHistory);
        storageSystem.setItem(`weightHistory_${userKey}`, JSON.stringify(firestoreData.weightHistory));
      }
      
      // Update todos
      if (firestoreData.todos !== undefined) {
        setTodos(firestoreData.todos);
        storageSystem.setItem(`todos_${userKey}`, JSON.stringify(firestoreData.todos));
      }
      
      // Update lastUpdated
      if (firestoreData.lastUpdated) {
        storageSystem.setItem(`lastUpdated_${userKey}`, firestoreData.lastUpdated);
      }
      
      console.log("Data updated from Firestore");
    } catch (error) {
      console.error("Error updating data from Firestore:", error);
    }
  };

  // Sync localStorage data to Firestore
  const syncLocalDataToFirestore = async () => {
    if (!userId) return;
    
    try {
      const currentData = {
        note: note,
        waterGlasses: waterGlasses,
        weight: weight,
        targetWeight: targetWeight,
        weightHistory: weightHistory,
        todos: todos,
        lastUpdated: new Date().toISOString()
      };
      
      await saveToFirestore(currentData);
      storageSystem.setItem(`lastUpdated_${getUserStorageKey()}`, currentData.lastUpdated);
    } catch (error) {
      console.error("Error syncing localStorage data to Firestore:", error);
    }
  };

  const getCurrentDateKey = () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  };

  const saveNote = (text) => {
    try {
      const userKey = getUserStorageKey();
      
      setNote(text);
      storageSystem.setItem(`note_${userKey}`, text);
      
      // Save to Firestore if user is logged in
      if (userId) {
        saveToFirestore({
          note: text,
          lastUpdated: new Date().toISOString()
        });
        storageSystem.setItem(`lastUpdated_${userKey}`, new Date().toISOString());
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const saveWaterData = (glasses) => {
    try {
      const userKey = getUserStorageKey();
      
      storageSystem.setItem(`water_${userKey}_${getCurrentDateKey()}`, glasses.toString());
      
      // Save to Firestore if user is logged in
      if (userId) {
        saveToFirestore({
          waterGlasses: glasses,
          lastUpdated: new Date().toISOString()
        });
        storageSystem.setItem(`lastUpdated_${userKey}`, new Date().toISOString());
      }
    } catch (error) {
      console.error('Error saving water data:', error);
    }
  };

  const saveWeight = (newWeight) => {
    try {
      const userKey = getUserStorageKey();
      
      setWeight(newWeight);
      setWeightInputValue(newWeight.toFixed(1));
      storageSystem.setItem(`weight_${userKey}`, newWeight.toString());
      
      // Update weight history
      const today = new Date().toISOString().split('T')[0];
      const updatedHistory = [...weightHistory];
      const existingEntryIndex = updatedHistory.findIndex(entry => entry.date === today);
      
      if (existingEntryIndex >= 0) {
        updatedHistory[existingEntryIndex].weight = newWeight;
      } else {
        updatedHistory.push({ date: today, weight: newWeight });
      }
      
      // Sort by date and keep only last 30 entries
      updatedHistory.sort((a, b) => new Date(a.date) - new Date(b.date));
      const recentHistory = updatedHistory.slice(-30);
      
      setWeightHistory(recentHistory);
      storageSystem.setItem(`weightHistory_${userKey}`, JSON.stringify(recentHistory));
      
      // Save to Firestore if user is logged in
      if (userId) {
        saveToFirestore({
          weight: newWeight,
          weightHistory: recentHistory,
          lastUpdated: new Date().toISOString()
        });
        storageSystem.setItem(`lastUpdated_${userKey}`, new Date().toISOString());
         } } catch (error) {
      console.error('Error saving weight:', error);
    }
  };

  const saveTargetWeight = (newTargetWeight) => {
    try {
      const userKey = getUserStorageKey();
      
      setTargetWeight(newTargetWeight);
      setTargetWeightInputValue(newTargetWeight.toFixed(1));
      storageSystem.setItem(`targetWeight_${userKey}`, newTargetWeight.toString());
      
      // Save to Firestore if user is logged in
      if (userId) {
        saveToFirestore({
          targetWeight: newTargetWeight,
          lastUpdated: new Date().toISOString()
        });
        storageSystem.setItem(`lastUpdated_${userKey}`, new Date().toISOString());
      }
    } catch (error) {
      console.error('Error saving target weight:', error);
    }
  };

  const saveTodos = (updatedTodos) => {
    try {
      const userKey = getUserStorageKey();
      
      setTodos(updatedTodos);
      const todosString = JSON.stringify(updatedTodos);
      storageSystem.setItem(`todos_${userKey}`, todosString);
      
      // Save to Firestore if user is logged in
      if (userId) {
        saveToFirestore({
          todos: updatedTodos,
          lastUpdated: new Date().toISOString()
        });
        storageSystem.setItem(`lastUpdated_${userKey}`, new Date().toISOString());
      }
      
      console.log('Todos saved successfully:', updatedTodos);
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  };

  const addWaterGlass = () => {
    if (waterGlasses < 8) {
      const newCount = waterGlasses + 1;
      setWaterGlasses(newCount);
      saveWaterData(newCount);
    }
  };

  const decreaseWaterGlass = () => {
    if (waterGlasses > 0) {
      const newCount = waterGlasses - 1;
      setWaterGlasses(newCount);
      saveWaterData(newCount);
    }
  };

  const increaseWeight = () => {
    const newWeight = parseFloat((weight + 0.1).toFixed(1));
    saveWeight(newWeight);
  };

  const decreaseWeight = () => {
    if (weight > 0.1) {
      const newWeight = parseFloat((weight - 0.1).toFixed(1));
      saveWeight(newWeight);
    }
  };

  const increaseTargetWeight = () => {
    const newTargetWeight = parseFloat((targetWeight + 0.1).toFixed(1));
    saveTargetWeight(newTargetWeight);
  };

  const decreaseTargetWeight = () => {
    if (targetWeight > 0.1) {
      const newTargetWeight = parseFloat((targetWeight - 0.1).toFixed(1));
      saveTargetWeight(newTargetWeight);
    }
  };

  const handleWeightInputChange = (e) => {
    setWeightInputValue(e.target.value);
  };

  const handleWeightInputBlur = () => {
    const newWeight = parseFloat(weightInputValue);
    if (!isNaN(newWeight) && newWeight > 0) {
      saveWeight(newWeight);
    } else {
      setWeightInputValue(weight.toFixed(1));
    }
  };

  const handleTargetWeightInputChange = (e) => {
    setTargetWeightInputValue(e.target.value);
  };

  const handleTargetWeightInputBlur = () => {
    const newTargetWeight = parseFloat(targetWeightInputValue);
    if (!isNaN(newTargetWeight) && newTargetWeight > 0) {
      saveTargetWeight(newTargetWeight);
    } else {
      setTargetWeightInputValue(targetWeight.toFixed(1));
    }
  };

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    const cursorPosition = noteInputRef.current.selectionStart;
    const textBeforeCursor = note.slice(0, cursorPosition);
    const textAfterCursor = note.slice(cursorPosition);
    
    const newText = textBeforeCursor + emoji + textAfterCursor;
    saveNote(newText);
    
    // Close emoji picker
    setShowEmojiPicker(false);
    
    // Focus back on textarea and set cursor position after emoji
    setTimeout(() => {
      noteInputRef.current.focus();
      noteInputRef.current.selectionStart = cursorPosition + emoji.length;
      noteInputRef.current.selectionEnd = cursorPosition + emoji.length;
    }, 10);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        createdAt: new Date().toISOString()
      };
      
      const updatedTodos = [...todos, todoItem];
      saveTodos(updatedTodos);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    saveTodos(updatedTodos);
  };

  const formatDateTime = (date) => {
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    // Turkish month and day names
    const turkishMonths = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    
    const turkishDays = [
      'Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'
    ];
    
    const day = date.getDate();
    const month = turkishMonths[date.getMonth()];
    const year = date.getFullYear();
    const weekday = turkishDays[date.getDay()];
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day} ${month} ${year} ${weekday} ${hours}:${minutes}`;
  };

  const getWaterProgress = () => {
    return (waterGlasses / 8) * 100;
  };

  // Handle voice note save
  const handleVoiceNoteSave = (voiceNoteText, title) => {
    // Here you can implement logic to save the voice note
    // For example, you could add it to a voice notes array in state
    // or save it to Firestore
    
    // For now, let's just add it as a todo item
    if (voiceNoteText.trim() !== '') {
      const todoItem = {
        id: Date.now(),
        text: `${title}: ${voiceNoteText}`,
        completed: false,
        createdAt: new Date().toISOString(),
        isVoiceNote: true
      };
      
      const updatedTodos = [...todos, todoItem];
      saveTodos(updatedTodos);
    }
  };

  // If still loading, show loading indicator
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Veriler yükleniyor...</p>
      </div>
    );
  }

  const weights = weightHistory.map(e => e.weight);
  const chartData = {
    labels: weightHistory.map(entry => {
      const date = new Date(entry.date);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }),
    datasets: [
      {
        label: 'Kilo (kg)',
        data: weights,
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.3)',
        pointBackgroundColor: '#2196f3',
        pointRadius: 5,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Hedef Kilo (kg)',
        data: weightHistory.map(() => targetWeight),
        borderColor: '#f44336',
        borderDash: [6, 6],
        pointRadius: 0,
        tension: 0,
        fill: false
      }
    ]
  };

  const minWeight = weights.length ? Math.min(...weights, targetWeight) - 5 : targetWeight - 5;
  const maxWeight = weights.length ? Math.max(...weights, targetWeight) + 5 : targetWeight + 5;
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: minWeight,
        max: maxWeight,
        ticks: {
          stepSize: 1,
          color: '#666',
          font: { size: 12 }
        },
        grid: {
          color: 'rgba(0,0,0,0.1)',
          borderDash: [5, 5],
        }
      },
      x: {
        ticks: {
          color: '#666',
          font: { size: 12 }
        },
        grid: {
          display: false
        }
      }
    },
    animation: {
      duration: 1200,
      easing: 'easeOutQuart'
    }
  };

  // Get current user's email for display
  const currentUserEmail = auth.currentUser ? auth.currentUser.email : userEmail;

  return (
    <div className="user-panel">
      <header className="health-journal-header">
        <h1>SAĞLIK GÜNLÜĞÜ</h1>
        {currentUserEmail && (
          <div className="user-info">
            <span className="user-email">{currentUserEmail}</span>
          </div>
        )}
      </header>
      
      <div className="container">
        {/* Note Creation Section */}
        <div className="section note-section">
          <h2 className="section-title">NOT OLUŞTUR</h2>
          <h3 className="section-subtitle">Bugün nasıl hissediyorsun?</h3>
          <div className="note-container">
            <textarea
              ref={noteInputRef}
              className="note-input"
              value={note}
              onChange={(e) => saveNote(e.target.value)}
              placeholder="Notunuzu buraya yazın..."
            />
            <button 
              className="emoji-button"
              onClick={toggleEmojiPicker}
              title="Emoji ekle"
            >
              😊
            </button>
            {showEmojiPicker && (
              <div className="emoji-picker-container">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
          
          {/* Voice Notes Integration */}
          <div className="voice-notes-wrapper">
            <VoiceNotes onSave={handleVoiceNoteSave} />
          </div>
        </div>

        {/* Water Tracker Section */}
        <div className="section water-section">
          <div className="date-container">
            <p className="date-text">{formatDateTime(currentDateTime)}</p>
          </div>
          <h2 className="section-title">SU TAKİPÇİSİ</h2>
          <h3 className="section-subtitle">Günlük Hedef: 2.00 litre</h3>
          
          <div className="progress-container">
            <div 
              className="progress-bar"
              style={{ width: `${getWaterProgress()}%` }}
            />
          </div>
          
          <div className="water-glasses-container">
            {Array(8).fill().map((_, index) => (
              <div
                key={index}
                className={`water-glass ${index < waterGlasses ? 'filled-glass' : 'empty-glass'}`}
              >
                <span className="glass-text">💧</span>
              </div>
            ))}
          </div>
          
          <div className="water-controls">
            <button 
              className="water-button"
              onClick={decreaseWaterGlass}
            >
              -
            </button>
            <span className="water-count">{waterGlasses} / 8</span>
            <button 
              className="water-button"
              onClick={addWaterGlass}
            >
              +
            </button>
          </div>
        </div>

        {/* Weight Tracker Section */}
        <div className="section weight-section">
          <h2 className="section-title">KİLO TAKİBİ</h2>
          
          <div className="weight-input-container">
            <div className="weight-input-group">
              <label htmlFor="current-weight">Mevcut Kilo (kg):</label>
              <input
                id="current-weight"
                type="number"
                step="0.1"
                min="0"
                value={weightInputValue}
                onChange={handleWeightInputChange}
                onBlur={handleWeightInputBlur}
                className="weight-input"
              />
            </div>
            
            <div className="weight-input-group">
              <label htmlFor="target-weight">Hedef Kilo (kg):</label>
              <input
                id="target-weight"
                type="number"
                step="0.1"
                min="0"
                value={targetWeightInputValue}
                onChange={handleTargetWeightInputChange}
                onBlur={handleTargetWeightInputBlur}
                className="weight-input"
              />
            </div>
          </div>
          
          <div className="weight-display">
            <span className="weight-value">{weight.toFixed(1)}</span>
            <span className="weight-unit">kg</span>
          </div>
          
          <div className="weight-controls">
            <button 
              className="weight-button"
              onClick={decreaseWeight}
            >
              -
            </button>
            <button 
              className="weight-button"
              onClick={increaseWeight}
            >
              +
            </button>
          </div>
          
          <h3 className="section-subtitle">Hedef Kilo Ayarla</h3>
          <div className="weight-controls">
            <button
                          className="weight-button"
              onClick={decreaseTargetWeight}
            >
              -
            </button>
            <button 
              className="weight-button"
              onClick={increaseTargetWeight}
            >
              +
            </button>
          </div>
          
          <div className="progress-info">
            <p className="progress-info-text">
              {weight > 0
                ? weight > targetWeight
                  ? `Hedefe ulaşmak için ${(weight - targetWeight).toFixed(1)} kg vermelisiniz`
                  : weight < targetWeight
                    ? `Hedefe ulaşmak için ${(targetWeight - weight).toFixed(1)} kg almalısınız`
                    : "Tebrikler! Hedefe ulaştınız!"
                : "Mevcut kilonuzu girin"
              }
            </p>
          </div>
          
          <div className="weight-chart-container">
            <Line data={chartData} options={chartOptions} height={250} />
          </div>
        </div>
        
        {/* Todo List Section */}
        <div className="section todo-section">
          <h2 className="section-title">HEDEF TAKİP LİSTESİ</h2>
          <h3 className="section-subtitle">Sağlık hedeflerinizi takip edin</h3>
          
          <div className="todo-input-container">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Yeni hedef ekleyin..."
              className="todo-input"
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button className="todo-add-button" onClick={addTodo}>
              Ekle
            </button>
          </div>
          
          <ul className="todo-list">
            {todos.length === 0 ? (
              <li className="todo-empty">Henüz hedef eklenmedi</li>
            ) : (
              todos.map((todo) => (
                <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''} ${todo.isVoiceNote ? 'voice-note-item' : ''}`}>
                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="todo-checkbox"
                    />
                    {todo.isVoiceNote && <i className="fas fa-microphone todo-icon"></i>}
                    <span className="todo-text">{todo.text}</span>
                  </div>
                  <button 
                    className="todo-delete-button"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    ✖
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
 

              

