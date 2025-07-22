// Form to deposit to a goal
import React, { useState } from 'react';

export default function DepositForm({ goals, onDeposit }) {
  const [goalId, setGoalId] = useState('');
  const [amount, setAmount] = useState('');
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    setSuccess('');
    
    // Validate inputs
    if (!goalId) {
      setFormError('Please select a goal');
      return;
    }
    
    if (!amount || Number(amount) <= 0) {
      setFormError('Please enter a valid amount');
      return;
    }
    
    // Get goal name for success message
    const selectedGoal = goals.find(g => g.id === goalId);
    const goalName = selectedGoal ? selectedGoal.name : 'goal';
    
    try {
      // Submit deposit
      onDeposit(goalId, amount);
      
      // Show success message
      setSuccess(`Successfully added $${Number(amount).toFixed(2)} to ${goalName}!`);
      
      // Reset form
      setGoalId('');
      setAmount('');
    } catch (error) {
      setFormError(`Failed to make deposit: ${error.message}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <h2>Make a Deposit</h2>
      
      {formError && <div className="form-error">{formError}</div>}
      {success && <div className="form-success">{success}</div>}
      
      <div className="form-group">
        <label htmlFor="goalId">Select Goal:</label>
        <select 
          id="goalId"
          value={goalId} 
          onChange={e => setGoalId(e.target.value)} 
          required
        >
          <option value="">-- Choose a goal --</option>
          {goals.map(goal => (
            <option key={goal.id} value={goal.id}>
              {goal.name} (${Number(goal.savedAmount).toLocaleString()} / ${Number(goal.targetAmount).toLocaleString()})
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="amount">Deposit Amount ($):</label>
        <input 
          id="amount"
          type="number" 
          value={amount} 
          onChange={e => setAmount(e.target.value)} 
          min="0.01"
          step="0.01"
          placeholder="e.g., 100"
          required 
        />
      </div>
      
      <button type="submit">Make Deposit</button>
    </form>
  );
}
