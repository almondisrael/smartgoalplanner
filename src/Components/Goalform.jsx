// Form to add/edit a goal
import React, { useState, useEffect } from 'react';

const initialState = {
  name: '',
  targetAmount: '',
  savedAmount: 0,
  category: '',
  deadline: '',
};

// Predefined categories for selection
const categories = [
  'Travel',
  'Emergency',
  'Electronics',
  'Real Estate',
  'Vehicle',
  'Education',
  'Shopping',
  'Retirement',
  'Home',
  'Other'
];

export default function GoalForm({ onSave, editingGoal, onCancel }) {
  const [goal, setGoal] = useState(initialState);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (editingGoal) setGoal(editingGoal);
    else setGoal(initialState);
  }, [editingGoal]);

  function handleChange(e) {
    const { name, value } = e.target;
    setGoal(g => ({ ...g, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    
    // Validate inputs
    if (!goal.name.trim()) {
      setFormError('Please enter a goal name');
      return;
    }
    
    if (!goal.targetAmount || Number(goal.targetAmount) <= 0) {
      setFormError('Please enter a valid target amount');
      return;
    }
    
    if (!goal.category) {
      setFormError('Please select a category');
      return;
    }
    
    if (!goal.deadline) {
      setFormError('Please select a deadline');
      return;
    }
    
    // Make sure we're passing the goal with its ID if we're editing
    const goalToSave = editingGoal ? { ...goal, id: editingGoal.id } : goal;
    
    onSave(goalToSave);
    setGoal(initialState);
  }

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <h2>{editingGoal ? 'Edit Goal' : 'Add New Goal'}</h2>
      
      {formError && <div className="form-error">{formError}</div>}
      
      <div className="form-group">
        <label htmlFor="name">Goal Name:</label>
        <input 
          id="name" 
          name="name" 
          value={goal.name} 
          onChange={handleChange} 
          placeholder="e.g., Japan Trip Fund"
          required 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="targetAmount">Target Amount ($):</label>
        <input 
          id="targetAmount" 
          name="targetAmount" 
          type="number" 
          min="1"
          step="0.01"
          value={goal.targetAmount} 
          onChange={handleChange} 
          placeholder="e.g., 5000"
          required 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select 
          id="category" 
          name="category" 
          value={goal.category} 
          onChange={handleChange}
          required
        >
          <option value="">-- Select a category --</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="deadline">Target Date:</label>
        <input 
          id="deadline" 
          name="deadline" 
          type="date" 
          value={goal.deadline} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div className="form-buttons">
        <button type="submit">{editingGoal ? 'Update Goal' : 'Add Goal'}</button>
        {editingGoal && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}