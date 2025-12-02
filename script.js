function calculateTPN() {
    // Get input values
    const weight = parseFloat(document.getElementById('weight').value);
    const caloriesPerKg = parseFloat(document.getElementById('calories').value);
    const proteinPerKg = parseFloat(document.getElementById('protein').value);
    const carbsPercent = parseFloat(document.getElementById('carbs').value);
    const fatPercent = parseFloat(document.getElementById('fat').value);

    if (weight <= 0) {
        alert("Please enter a valid weight");
        return;
    }

    // Calculate total calories and protein
    const totalCalories = weight * caloriesPerKg;
    const totalProtein = weight * proteinPerKg;

    // Calculate carbs and fat in grams
    const carbsCalories = (totalCalories * (carbsPercent / 100));
    const fatCalories = (totalCalories * (fatPercent / 100));

    const totalCarbs = carbsCalories / 4; // 1g carbs = 4 kcal
    const totalFat = fatCalories / 9;     // 1g fat = 9 kcal

    // Display results
    document.getElementById('totalCalories').innerText = `Total Calories: ${totalCalories.toFixed(2)} kcal`;
    document.getElementById('totalProtein').innerText = `Total Protein: ${totalProtein.toFixed(2)} g`;
    document.getElementById('totalCarbs').innerText = `Total Carbohydrates: ${totalCarbs.toFixed(2)} g`;
    document.getElementById('totalFat').innerText = `Total Fat: ${totalFat.toFixed(2)} g`;
}
