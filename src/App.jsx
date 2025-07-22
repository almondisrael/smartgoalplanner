import { useState, useEffect } from 'react'
import './App.css'
import './Components/Components.css'
import GoalForm from './Components/Goalform.jsx'
import GoalList from './Components/Goallist.jsx'
import Overview from './Components/Overview.jsx'
import DepositForm from './Components/Deposit.jsx'
import { fetchGoals, addGoal, updateGoal, deleteGoal, depositToGoal } from './Components/api'

function App() {
  const [goals, setGoals] = useState([])
  const [editingGoal, setEditingGoal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadGoals()
  }, [])

  async function loadGoals() {
    try {
      setLoading(true)
      const data = await fetchGoals()
      setGoals(data)
      setError(null)
    } catch (err) {
      setError('Failed to load goals. Please make sure json-server is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSaveGoal(goal) {
    try {
      if (goal.id) {
        // Update existing goal
        // Make sure we're not sending the id in the update payload
        const { id, ...updateData } = goal;
        
        // Ensure numeric values
        updateData.savedAmount = Number(updateData.savedAmount);
        updateData.targetAmount = Number(updateData.targetAmount);
        
        const updated = await updateGoal(id, updateData);
        setGoals(goals.map(g => g.id === id ? updated : g));
        console.log('Updated goal:', updated);
      } else {
        // Add new goal
        const newGoal = await addGoal({
          ...goal,
          savedAmount: Number(goal.savedAmount),
          targetAmount: Number(goal.targetAmount),
          createdAt: new Date().toISOString()
        });
        setGoals([...goals, newGoal]);
        console.log('Added new goal:', newGoal);
      }
      setEditingGoal(null);
    } catch (err) {
      setError(`Failed to save goal: ${err.message}`);
      console.error('Save error:', err);
    }
  }

  async function handleDeleteGoal(id) {
    try {
      await deleteGoal(id)
      setGoals(goals.filter(g => g.id !== id))
    } catch (err) {
      setError('Failed to delete goal')
      console.error(err)
    }
  }

  async function handleDeposit(goalId, amount) {
    try {
      if (!goalId || !amount) {
        setError('Please select a goal and enter an amount')
        return
      }
      
      // Convert amount to number
      const numAmount = Number(amount)
      if (isNaN(numAmount) || numAmount <= 0) {
        setError('Please enter a valid positive amount')
        return
      }
      
      const updated = await depositToGoal(goalId, numAmount)
      setGoals(goals.map(g => g.id === goalId ? updated : g))
      setError(null) // Clear any previous errors
    } catch (err) {
      setError(`Failed to make deposit: ${err.message}`)
      console.error('Deposit error:', err)
    }
  }

  return (
    <div className="app-container">
      <header>
        <h1>Smart Goal Planner</h1>
      </header>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <p className="loading">Loading goals</p>
      ) : (
        <div className="app-content">
          <div>
            <Overview goals={goals} />
            <GoalList 
              goals={goals} 
              onEdit={setEditingGoal} 
              onDelete={handleDeleteGoal} 
            />
          </div>
          
          <div>
            <GoalForm 
              onSave={handleSaveGoal} 
              editingGoal={editingGoal}
              onCancel={() => setEditingGoal(null)}
            />
            <DepositForm goals={goals} onDeposit={handleDeposit} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
