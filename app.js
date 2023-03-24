const randomMealButton = document.getElementById("randomMeal")

function displayRandomMeal(category, element) 
  {
  // Get a reference to the meals collection in Firestore
  const mealsCollection = db.collection("mealsdb");

  // Query Firestore for meals in the specified category
  mealsCollection.where("category", "==", category.toLowerCase()).get().then((querySnapshot) => 
  {
  // Get an array of meal documents
  const meals = querySnapshot.docs;

  // If there are no meals in the specified category, display a message instead of a random meal
  if (meals.length === 0) 
  {
  const htmlElement = document.getElementById(element);
  htmlElement.textContent = "No meals found in this category.";
  return;
  }

  // Select a random meal from the array
  const randomMeal = meals[Math.floor(Math.random() * meals.length)].data();

  // Display the random meal in the specified HTML element
  const htmlElement = document.getElementById(element);
  htmlElement.innerHTML = `
  <h2>${randomMeal.name}</h2>
  <p><strong>Ingredients:</strong> ${randomMeal.ingredients}</p>
  <p><strong>Recipe:</strong> ${randomMeal.recipe}</p>`;
  });
  }

function displayMeals() 
{
  const mealList = document.getElementById("mealList");

  // Add event listener to the form submission
  const form = document.getElementById("intakeForm");
  form.addEventListener("submit", event => 
  {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the values from the form
  const mealName = form.elements["mealName"].value;
  const mealIngredients = form.elements["mealIngredients"].value;
  const mealRecipe = form.elements["mealRecipe"].value;
  const mealCategory = form.elements["mealCategory"].value.toLowerCase(); // Get the category value from the form

  // Update Firestore collection with the form values
  db.collection("mealsdb").add
  ({
  name: mealName,
  ingredients: mealIngredients,
  recipe: mealRecipe,
  category: mealCategory // Add category field to Firestore
  });

  // Clear the form after submission
  form.reset();
  });

  // Listen for changes in Firestore collection and update the page
  db.collection("mealsdb").onSnapshot((snapshot) => 
  {
  mealList.innerHTML = ""; // Clear the existing list

  snapshot.docs.forEach(doc => {
  const data = doc.data();
  const li = document.createElement("li");

  // Create a remove button for each list item
  const removeButton = document.createElement("button");
  removeButton.textContent = "X";
  removeButton.classList.add("remove-button"); // add class to button
  removeButton.addEventListener("click", () => 
  {
  // Display a confirmation dialog before deleting the item
  const confirmDelete = confirm("Are you sure you want to delete this item?");
  if (confirmDelete) 
  {
  // Remove the item from Firestore collection
  db.collection("mealsdb").doc(doc.id).delete();
  }
  });

  // Add the meal information and the remove button to the list item
  li.textContent = data.name + ": " + data.ingredients + " - " + data.recipe + " - " + data.category; // Display the category information
  li.appendChild(removeButton);
  mealList.appendChild(li);
  });
  });

  // Add event listener to the "Random Meal" button
  const randomMealButton = document.getElementById("randomMeal");
  randomMealButton.addEventListener("click", () => 
  {
  // Display a random meal for each meal category
  const breakfastOption = document.getElementById("breakfastOption");
  const lunchOption = document.getElementById("lunchOption");
  const dinnerOption = document.getElementById("dinnerOption");

  const categories = ["Breakfast", "Lunch", "Dinner"];
  categories.forEach((category) => 
  {
  if (category === "Breakfast") 
  {
      displayRandomMeal("Breakfast", "breakfastOption");
  } else if (category === "Lunch") 
  {
  displayRandomMeal("Lunch", "lunchOption");
  } else if (category === "Dinner") 
  {
  displayRandomMeal("Dinner", "dinnerOption");
  }
  });
  });
}
window.addEventListener("load", () => {
  displayMeals();
  setTimeout(() => {
    randomMealButton.click();
  }, 100); // 1000 milliseconds = 1 second
});
