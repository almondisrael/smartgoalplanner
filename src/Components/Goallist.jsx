// Lists all goals, allows edit/delete
import React from 'react';
import ProgressBar from './Progressbar.jsx';

export default function GoalList({ goals, onEdit, onDelete }) {
  return (
    <div className="goal-list">
      <h2>Your Goals</h2>
      {goals.length === 0 ? <p>No goals yet.</p> : (
        <ul>
          {goals.map(goal => (
            <li key={goal.id}>
              <div>
                <strong>{goal.name}</strong>
                <div className="goal-details">
                  <span>${goal.savedAmount} of ${goal.targetAmount}</span>
                  <span className="goal-category">{goal.category}</span>
                </div>
                <ProgressBar saved={goal.savedAmount} target={goal.targetAmount} />
              </div>
              <div className="actions-container">
                <button onClick={() => onEdit(goal)}>Edit</button>
                <button onClick={() => onDelete(goal.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}