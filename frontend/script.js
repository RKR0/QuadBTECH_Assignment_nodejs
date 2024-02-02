// Function to fetch data from the server
const fetchDataFromServer = async () => {
  try {
      const response = await fetch('http://localhost:5000/api/quadbtech/');
      if (!response.ok) {
          throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching data:', error.message);
  }
};

// Function to generate serial numbers
const generateSerialNumbers = (data) => {
  return data.map((item, index) => {
      return { ...item, serialNumber: index + 1 };
  });
};

// Function to render the table rows
const renderTableRows = (data) => {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';

  data.forEach((item) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${item.serialNumber}</td>
          <td>${item.name}</td>
          <td>₹ ${item.last}</td>
          <td>₹ ${item.buy} / ₹ ${item.sell}</td>
          <td>${item.volume}</td>
          <td>${item.base_unit}</td>
      `;
      tableBody.appendChild(row);
  });
};

// Fetch data and render the table
const fetchDataAndRenderTable = async () => {
  const data = await fetchDataFromServer();
  if (data) {
      const dataWithSerialNumbers = generateSerialNumbers(data);
      renderTableRows(dataWithSerialNumbers);
  }
};

// Call the function to fetch data and render the table
fetchDataAndRenderTable();

// Set the initial timer value
let timerValue = 60;

// Update the circular progress bar and timer text
const updateProgressBar = () => {
    const progressBar = document.querySelector('.CircularProgressbar-path');
    const timerText = document.querySelector('.CircularProgressbar-text');
    
    // Calculate the dash offset based on the timer value
    const dashOffset = (60 - timerValue) / 60 * 289.027;
    
    progressBar.style.strokeDashoffset = dashOffset;
    timerText.textContent = timerValue;

    // Decrease the timer value
    if (timerValue > 0) {
        timerValue--;
        setTimeout(updateProgressBar, 1000); // Update every second
    }
};

// Start the timer
updateProgressBar();
