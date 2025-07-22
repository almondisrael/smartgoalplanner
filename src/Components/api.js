/**
 * API Service - Handles all API requests to json-server
 */

const API_URL = 'http://localhost:3000';
const GOALS_ENDPOINT = `${API_URL}/goals`;

/**
 * Fetch all goals from the server
 * @returns {Promise<Array>} Array of goal objects
 */
export async function fetchGoals() {
  const res = await fetch(GOALS_ENDPOINT);
  if (!res.ok) {
    throw new Error('Failed to fetch goals');
  }
  return res.json();
}

/**
 * Fetch a single goal by ID
 * @param {string} id - Goal ID
 * @returns {Promise<Object>} Goal object
 */
export async function fetchGoal(id) {
  const res = await fetch(`${GOALS_ENDPOINT}/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch goal with id ${id}`);
  }
  return res.json();
}

/**
 * Add a new goal
 * @param {Object} goal - Goal data
 * @returns {Promise<Object>} Created goal object
 */
export async function addGoal(goal) {
  const res = await fetch(GOALS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal),
  });
  if (!res.ok) {
    throw new Error('Failed to create goal');
  }
  return res.json();
}

/**
 * Update an existing goal
 * @param {string} id - Goal ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated goal object
 */
export async function updateGoal(id, updates) {
  if (!id) {
    throw new Error('Goal ID is required for updates');
  }
  
  console.log(`Updating goal ${id} with:`, updates);
  
  try {
    const res = await fetch(`${GOALS_ENDPOINT}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to update goal with id ${id}: ${res.status} ${errorText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Update goal error:', error);
    throw error;
  }
}

/**
 * Delete a goal
 * @param {string} id - Goal ID
 * @returns {Promise<void>}
 */
export async function deleteGoal(id) {
  const res = await fetch(`${GOALS_ENDPOINT}/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error(`Failed to delete goal with id ${id}`);
  }
  return res.json();
}

/**
 * Add funds to a goal
 * @param {string} id - Goal ID
 * @param {number} amount - Amount to deposit
 * @returns {Promise<Object>} Updated goal object
 */
export async function depositToGoal(id, amount) {
  try {
    // Fetch current goal
    const goal = await fetchGoal(id);
    
    // Update savedAmount
    const newAmount = Number(goal.savedAmount) + Number(amount);
    
    // Update the goal
    return updateGoal(id, { savedAmount: newAmount });
  } catch (error) {
    console.error('Error in depositToGoal:', error);
    throw error;
  }
}