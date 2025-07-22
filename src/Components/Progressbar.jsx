// Visual progress bar for a goal
import React from 'react';

export default function ProgressBar({ saved, target }) {
  const percent = Math.min(100, Math.round((saved / target) * 100));
  
  // Determine color based on progress
  let barColor = '#3498db'; // Default blue
  
  if (percent >= 100) {
    barColor = '#2ecc71'; // Green for completed
  } else if (percent >= 75) {
    barColor = '#27ae60'; // Darker green for near completion
  } else if (percent >= 50) {
    barColor = '#f39c12'; // Orange for halfway
  } else if (percent < 25) {
    barColor = '#e74c3c'; // Red for just started
  }
  
  return (
    <div className="progress-bar">
      <div 
        style={{
          width: `${percent}%`,
          backgroundColor: barColor,
          transition: 'width 0.5s ease-in-out, background-color 0.5s'
        }}
      ></div>
      <span>{percent}%</span>
    </div>
  );
}