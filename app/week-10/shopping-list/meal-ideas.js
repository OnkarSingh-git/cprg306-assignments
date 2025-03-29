"use client";
import React, { useState, useEffect } from "react";

async function fetchMealIdeas(ingredient) {
  const apiURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
}

async function fetchMealDetails(mealId) {
  const apiURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data.meals && data.meals.length > 0 ? data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching meal details:", error);
    return null;
  }
}

const MealIdeas = ({ ingredient }) => {
  const [meals, setMeals] = useState([]);
  const [expandedMealId, setExpandedMealId] = useState(null);
  const [mealIngredients, setMealIngredients] = useState([]);
  const [loadingIngredients, setLoadingIngredients] = useState(false);

  const loadMealIdeas = async () => {
    if (ingredient && ingredient.trim() !== "") {
      const fetchedMeals = await fetchMealIdeas(ingredient);
      setMeals(fetchedMeals);
    } else {
      setMeals([]);
    }
    setExpandedMealId(null);
    setMealIngredients([]);
  };

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  const handleMealClick = async (mealId) => {
    if (expandedMealId === mealId) {
      setExpandedMealId(null);
      setMealIngredients([]);
      return;
    }
    setLoadingIngredients(true);
    const details = await fetchMealDetails(mealId);
    setLoadingIngredients(false);
    setExpandedMealId(mealId);
    if (details) {
      const ingredientsList = [];
      for (let i = 1; i <= 20; i++) {
        const ingredientName = details[`strIngredient${i}`];
        const measure = details[`strMeasure${i}`];
        if (ingredientName && ingredientName.trim() !== "") {
          ingredientsList.push(
            `${measure.trim()} ${ingredientName.trim()}`.trim()
          );
        }
      }
      setMealIngredients(ingredientsList);
    }
  };

  if (!ingredient || ingredient.trim() === "") {
    return (
      <div className="p-4 bg-slate-800 max-w-sm rounded-md">
        <h2 className="text-3xl font-bold text-white mb-1">Meal Ideas</h2>
        <p className="text-white mb-4">Select an item to view meal ideas</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-slate-800 max-w-sm rounded-md">
      <h2 className="text-3xl font-bold text-white mb-1">Meal Ideas</h2>
      {meals.length > 0 ? (
        <p className="text-white mb-4">
          {meals.length} meal{meals.length > 1 ? "s" : ""} available for{" "}
          {ingredient}
        </p>
      ) : (
        <p className="text-white mb-4">No meal ideas found for {ingredient}</p>
      )}
      <ul>
        {meals.map((meal) => (
          <li
            key={meal.idMeal}
            className="mb-2 p-2 bg-slate-700 rounded-md cursor-pointer text-white"
            onClick={() => handleMealClick(meal.idMeal)}
          >
            <div className="flex items-center justify-between">
              <span>{meal.strMeal}</span>
              {expandedMealId === meal.idMeal ? (
                <span>&#9650;</span>
              ) : (
                <span>&#9660;</span>
              )}
            </div>
            {expandedMealId === meal.idMeal && (
              <div className="mt-2 bg-slate-600 p-2 rounded-md">
                {loadingIngredients ? (
                  <p className="text-sm text-white">Loading ingredients...</p>
                ) : mealIngredients.length > 0 ? (
                  <ul className="text-sm text-white">
                    {mealIngredients.map((ing, index) => (
                      <li key={index}>{ing}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-white">No ingredients found.</p>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealIdeas;
