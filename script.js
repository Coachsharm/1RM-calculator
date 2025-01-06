document.getElementById('calculate').addEventListener('click', () => {
  const weight = parseFloat(document.getElementById('weight').value);
  const reps = parseInt(document.getElementById('reps').value);
  
  if (isNaN(weight) || isNaN(reps) || weight <= 0 || reps <= 0) {
    alert('Please enter valid weight and reps');
    return;
  }

  const oneRM = weight * (1 + reps / 30);
  const results = [];
  
  for (let i = 1; i <= 12; i++) {
    const rmWeight = oneRM / (1 + i / 30);
    results.push({
      repMax: `${i}RM`,
      weight: rmWeight.toFixed(2)
    });
  }

  const tbody = document.querySelector('#results-table tbody');
  tbody.innerHTML = results.map(result => `
    <tr>
      <td>${result.repMax}</td>
      <td>${result.weight} kg</td>
    </tr>
  `).join('');
});
