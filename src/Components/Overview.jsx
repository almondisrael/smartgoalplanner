// Overview component - Shows summary statistics
import React from 'react';

export default function Overview({ goals }) {
  // Calculate summary statistics
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + Number(goal.savedAmount), 0);
  const totalTarget = goals.reduce((sum, goal) => sum + Number(goal.targetAmount), 0);
  const completedGoals = goals.filter(goal => Number(goal.savedAmount) >= Number(goal.targetAmount)).length;
  const percentComplete = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;
  
  // Get categories
  const categories = [...new Set(goals.map(goal => goal.category))];
  
  return (
    <div className="overview">
      <h2>Financial Goals Overview</h2>
      
      {goals.length === 0 ? (
        <p>No goals yet. Add your first financial goal to get started!</p>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="label">Total Goals</div>
              <div className="value">{totalGoals}</div>
            </div>
            
            <div className="stat-card">
              <div className="label">Total Saved</div>
              <div className="value">${totalSaved.toLocaleString()}</div>
            </div>
            
            <div className="stat-card">
              <div className="label">Total Target</div>
              <div className="value">${totalTarget.toLocaleString()}</div>
            </div>
            
            <div className="stat-card">
              <div className="label">Progress</div>
              <div className="value">{percentComplete}%</div>
            </div>
          </div>
          
          <div className="mt-3">
            <h3 className="mb-2">Categories</h3>
            <ul>
              {categories.map(category => {
                const categoryGoals = goals.filter(goal => goal.category === category);
                const categorySaved = categoryGoals.reduce((sum, goal) => sum + Number(goal.savedAmount), 0);
                const categoryTarget = categoryGoals.reduce((sum, goal) => sum + Number(goal.targetAmount), 0);
                
                return (
                  <li key={category}>
                    <strong>{category}</strong>: ${categorySaved.toLocaleString()} of ${categoryTarget.toLocaleString()}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}