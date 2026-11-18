// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Profile from './Profile';
import { generatePlan, swapSingleMeal } from './generatePlan';
import { getFoodImage } from './images.js';
import { Utensils, Calendar, ShoppingCart, Settings, Trash2, Check, Users } from 'lucide-react';
import { supabase } from './supabase';
import Auth from './Auth';

function App() {
  const [profile, setProfile] = useState(null);
  const [weekPlan, setWeekPlan] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('meals');
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [notice, setNotice] = useState('');

  // 1. Check Auth Session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setSessionLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch Data (ONLY runs if session exists)
  useEffect(() => {
    if (session) {
      axios.get(`http://localhost:3001/api/user-data/${session.user.id}`)
        .then(res => {
          if (res.data.profile) {
            setProfile(res.data.profile);
            setWeekPlan(res.data.mealPlan || []);
          }
          setIsLoadingData(false);
        })
        .catch(err => {
          console.error("Error fetching data:", err);
          setIsLoadingData(false);
        });
    } else {
      setIsLoadingData(false);
    }
  }, [session]);

  const saveToDatabase = (newProfile, newPlan) => {
    if (!session) return;
    axios.post('http://localhost:3001/api/save-data', {
      userId: session.user.id,
      profile: newProfile,
      mealPlan: newPlan
    }).catch(err => console.error("Error saving data:", err));
  };

  const showNotice = (text) => {
    setNotice(text);
    setTimeout(() => setNotice(''), 3000);
  };

  const handleProfileSave = (userProfile) => {
    setProfile(userProfile);
    setIsGenerating(true);
    setActiveTab('meals');

    setTimeout(() => {
      const newPlan = generatePlan(userProfile);
      setWeekPlan(newPlan);
      setIsGenerating(false);
      saveToDatabase(userProfile, newPlan);
    }, 1000);
  };

  const handleSwapMeal = (dayIndex, mealIndex, mealType) => {
    const excludeNames = weekPlan.flatMap(day => day.meals.map(m => m.name));
    const newMeal = swapSingleMeal(profile, mealType, excludeNames);
    if (newMeal) {
      const updatedPlan = JSON.parse(JSON.stringify(weekPlan));
      updatedPlan[dayIndex].meals[mealIndex] = newMeal;
      setWeekPlan(updatedPlan);
      saveToDatabase(profile, updatedPlan);
    } else {
      showNotice('No other options available for this meal with your settings.');
    }
  };

  const handleReset = () => {
    saveToDatabase(null, []);
    setProfile(null);
    setWeekPlan([]);
  };

  // --- RENDER LOGIC ---

  // 1. Wait for Supabase to check if user is logged in
  if (sessionLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <h1>Connecting...</h1>
      </div>
    );
  }

  // 2. If no session, show the Auth screen
  if (!session) {
    return <Auth />;
  }

  // 3. If session exists but data is still loading, show spinner
  if (isLoadingData) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <h1>Loading your data...</h1>
      </div>
    );
  }

  // 4. If user has no profile, show the setup screen
  if (!profile) return <Profile onSave={handleProfileSave} />;

  // 5. If generating, show spinner
  if (isGenerating) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <h1>🤖 Analyzing your preferences...</h1>
      </div>
    );
  }

  // --- GROCERY LIST ---
  const householdSize = profile.householdSize || 1;
  const allMeals = weekPlan.flatMap(day => day.meals);

  const groceryDict = {};
  allMeals.forEach(meal => {
    if (meal.ingredients) {
      // Recipe quantities are written for `servings` people (default 2),
      // so scale by household size / servings.
      const multiplier = householdSize / (meal.servings || 2);
      meal.ingredients.forEach(ing => {
        const unit = ing.unit === 'cups' ? 'cup' : ing.unit;
        const key = `${ing.name.toLowerCase()}-${unit}`;
        if (groceryDict[key]) {
          groceryDict[key].qty += ing.qty * multiplier;
        } else {
          groceryDict[key] = { name: ing.name, qty: ing.qty * multiplier, unit };
        }
      });
    }
  });

  const groceryList = Object.values(groceryDict)
    .map(item => ({ ...item, qty: Math.round(item.qty * 100) / 100 }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="dashboard">
      <div className="header">
        <div>
          <h1><Utensils size={28} color="#10b981" /> SmartPrep</h1>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users size={14} /> Cooking for {householdSize} {householdSize === 1 ? 'person' : 'people'}
          </div>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={() => setProfile(null)}>
            <Settings size={16} /> Edit
          </button>
          <button className="btn btn-danger" onClick={() => { supabase.auth.signOut(); handleReset(); }}>
            <Trash2 size={16} /> Sign Out
          </button>
        </div>
      </div>

      {notice && (
        <div style={{ background: '#fef3c7', color: '#92400e', padding: '10px 14px', borderRadius: '8px', marginBottom: '15px', fontSize: '0.9rem' }}>
          {notice}
        </div>
      )}

      <div className="tabs">
        <button className={`tab ${activeTab === 'meals' ? 'active' : ''}`} onClick={() => setActiveTab('meals')}>
          <Calendar size={18} /> Weekly Menu
        </button>
        <button className={`tab ${activeTab === 'grocery' ? 'active' : ''}`} onClick={() => setActiveTab('grocery')}>
          <ShoppingCart size={18} /> Grocery List
        </button>
      </div>

      {activeTab === 'meals' && (
        <div>
          {profile.healthCondition && profile.healthCondition !== 'none' && (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '10px' }}>
              Meal suggestions are general guidance and are not medical advice. Please follow your doctor's or dietitian's recommendations.
            </p>
          )}

          {weekPlan.map((dayObj, dayIndex) => (
            <div key={dayObj.day}>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#374151', marginTop: '30px' }}>{dayObj.day}</h2>

              {dayObj.meals.length === 0 && (
                <p style={{ color: '#ef4444' }}>
                  No matching recipes for this day. Try changing your settings with Edit.
                </p>
              )}

              <div className="day-grid">
                {dayObj.meals.map((meal, mealIndex) => (
                  <div key={`${meal.id}-${meal.name}-${mealIndex}`} className={`meal-card ${meal.type}`} style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
                    <button
                      onClick={() => handleSwapMeal(dayIndex, mealIndex, meal.type)}
                      style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', zIndex: 10 }}
                      title="Swap this meal"
                    >
                      🔄
                    </button>
                    <img
                      src={getFoodImage(meal)}
                      alt={meal.name}
                      style={{ width: '100%', height: '150px', objectFit: 'cover', backgroundColor: '#f3f4f6' }}
                    />
                    <div style={{ padding: '16px' }}>
                      <div className="meal-type">{meal.type}</div>
                      <div className="meal-name" style={{ marginBottom: 0 }}>{meal.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'grocery' && (
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Your Shopping List</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
            Based on your weekly menu for {householdSize} {householdSize === 1 ? 'person' : 'people'}.
          </p>
          {groceryList.length === 0 ? (
            <p style={{ color: '#ef4444' }}>No ingredients found. Please reset and generate a new plan.</p>
          ) : (
            <div className="grocery-list">
              {groceryList.map((item, index) => (
                <label key={index} className="grocery-item custom-checkbox" style={{ padding: '16px', display: 'flex' }}>
                  <input type="checkbox" />
                  <div className="checkmark"><Check size={14} strokeWidth={3} /></div>
                  <span style={{ textDecoration: 'none', color: 'var(--text-main)' }}>
                    <strong>{item.qty} {item.unit}</strong> {item.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;