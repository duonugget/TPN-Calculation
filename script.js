function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function calculateTPN() {
  const dob = document.getElementById('dob').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const gender = document.getElementById('gender').value;
  const isPremature = document.getElementById('isPremature').checked;
  const clinicalCondition = document.getElementById('clinicalCondition').value;
  const stressFactor = parseFloat(document.getElementById('stressFactor').value);
  const days = parseInt(document.getElementById('days').value);

  const age = calculateAge(dob);

  // BEE
  let bee;
  if (gender === 'male') {
    bee = 66.5 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
  } else {
    bee = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
  }
  const activityFactor = 1.2;
  const totalCalories = bee * activityFactor * stressFactor;

  // Fluid
  let fluidPerKg;
  if (isPremature) fluidPerKg = 150;
  else if (age < 1) fluidPerKg = 120;
  else if (age < 3) fluidPerKg = 100;
  else if (age < 10) fluidPerKg = 80;
  else fluidPerKg = 35;
  const totalFluid = weight * fluidPerKg;

  // Protein
  let proteinPerKg;
  if (isPremature) proteinPerKg = 3.0;
  else if (age < 1) proteinPerKg = 2.5;
  else if (age < 10) proteinPerKg = 2.0;
  else proteinPerKg = 1.5;
  const proteinGrams = weight * proteinPerKg;
  const proteinCalories = proteinGrams * 4;

  const nonProteinCalories = totalCalories - proteinCalories;

  // Glucose/Dextrose
  const glucoseCalories = nonProteinCalories * 0.6;
  const glucoseGrams = glucoseCalories / 3.4;

  // Lipids
  const lipidCalories = nonProteinCalories * 0.4;
  const lipidGrams = lipidCalories / 10;

  // Electrolytes (simplified)
  const sodium = weight * 2.5;
  const potassium = weight * 2.0;
  const calcium = weight * 0.5;
  const magnesium = weight * 0.3;
  const phosphorus = weight * 0.5;

  const results = [
    {category: 'Energy', element: 'Total Calories', value: Math.round(totalCalories), unit: 'kcal/day'},
    {category: 'Energy', element: 'Protein Calories', value: Math.round(proteinCalories), unit: 'kcal/day'},
    {category: 'Macronutrients', element: 'Protein', value: proteinGrams.toFixed(1), unit: 'g/day'},
    {category: 'Macronutrients', element: 'Glucose', value: glucoseGrams.toFixed(1), unit: 'g/day'},
    {category: 'Macronutrients', element: 'Lipids', value: lipidGrams.toFixed(1), unit: 'g/day'},
    {category: 'Fluids', element: 'Total Fluid', value: Math.round(totalFluid), unit: 'ml/day'},
    {category: 'Electrolytes', element: 'Sodium', value: sodium.toFixed(1), unit: 'mEq/day'},
    {category: 'Electrolytes', element: 'Potassium', value: potassium.toFixed(1), unit: 'mEq/day'},
    {category: 'Electrolytes', element: 'Calcium', value: calcium.toFixed(1), unit: 'mEq/day'},
    {category: 'Electrolytes', element: 'Magnesium', value: magnesium.toFixed(1), unit: 'mEq/day'},
    {category: 'Electrolytes', element: 'Phosphorus', value: phosphorus.toFixed(1), unit: 'mmol/day'},
  ];

  // Render table
  const tbody = document.querySelector('#resultsTable tbody');
  tbody.innerHTML = '';
  results.forEach(r => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${r.category}</td><td>${r.element}</td><td>${r.value}</td><td>${r.unit}</td>`;
    tbody.appendChild(row);
  });
}

document.getElementById('calculateBtn').addEventListener('click', calculateTPN);
