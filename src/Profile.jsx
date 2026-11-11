// src/Profile.jsx
import { useState } from 'react';
import { Utensils, Target, Globe, Users, Heart } from 'lucide-react';

export default function Profile({ onSave }) {
  const [goal, setGoal] = useState('lose_weight');
  const [cuisine, setCuisine] = useState('indian');
  const [dietType, setDietType] = useState('non_veg');
  const [householdSize, setHouseholdSize] = useState(1);
  const [healthCondition, setHealthCondition] = useState('none');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ 
      goal, 
      cuisine, 
      dietType, 
      householdSize: Number(householdSize),
      healthCondition 
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '480px', background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'inline-flex', background: '#ecfdf5', padding: '16px', borderRadius: '50%', marginBottom: '15px' }}>
            <Utensils size={32} color="#10b981" />
          </div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Welcome to SmartPrep</h1>
          <p style={{ color: '#6b7280' }}>Let's build your perfect week.</p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 1. HOUSEHOLD SIZE */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', marginBottom: '8px', fontSize: '0.9rem' }}>
              <Users size={16} /> Cooking for how many people?
            </label>
            <select value={householdSize} onChange={(e) => setHouseholdSize(Number(e.target.value))} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem', background: '#f9fafb' }}>
              <option value={1}>Just me (1 person)</option>
              <option value={2}>Couple (2 people)</option>
              <option value={3}>Small Family (3 people)</option>
              <option value={4}>Family (4 people)</option>
              <option value={5}>Large Family (5+ people)</option>
            </select>
          </div>

          {/* 2. MAIN GOAL */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', marginBottom: '8px', fontSize: '0.9rem' }}>
              <Target size={16} /> Main Goal
            </label>
            <select value={goal} onChange={(e) => setGoal(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem', background: '#f9fafb' }}>
              <option value="lose_weight">Lose Weight</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain_muscle">Gain Muscle</option>
            </select>
          </div>

          {/* 3. PREFERRED CUISINE */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', marginBottom: '8px', fontSize: '0.9rem' }}>
              <Globe size={16} /> Preferred Cuisine
            </label>
            <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem', background: '#f9fafb' }}>
              <option value="indian">Pakistani / Indian</option>
              <option value="asian">East Asian</option>
              <option value="middle_eastern">Middle Eastern</option>
              <option value="western">Western</option>
              <option value="mexican">Mexican</option>
              <option value="any">Any Cuisine (Surprise me)</option>
            </select>
          </div>

          {/* 4. DIET PREFERENCE */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', marginBottom: '8px', fontSize: '0.9rem' }}>
              <Utensils size={16} /> Diet Preference
            </label>
            <select value={dietType} onChange={(e) => setDietType(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem', background: '#f9fafb' }}>
              <option value="non_veg">Non-Vegetarian (I eat meat)</option>
              <option value="veg">Vegetarian (No meat, but dairy)</option>
            </select>
          </div>

          {/* 5. HEALTH CONDITION */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', marginBottom: '8px', fontSize: '0.9rem' }}>
              <Heart size={16} /> Health Condition
            </label>
            <select value={healthCondition} onChange={(e) => setHealthCondition(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem', background: '#f9fafb' }}>
              <option value="none">None</option>
              <option value="metabolic">Metabolic (Diabetes, PCOS, Cholesterol)</option>
              <option value="digestive">Digestive (IBS, Acid Reflux, Gluten)</option>
              <option value="heart">Heart Health (High BP, Heart Disease)</option>
              <option value="uric_acid">Uric Acid / Gout</option>
              <option value="kidney">Kidney Health</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
            Generate My Meal Plan
          </button>
        </form>
      </div>
    </div>
  );
}