// Global variables
let handoverCount = 0;
let qosCategory = 'Voice';

// Get DOM elements
const handoverCountElement = document.getElementById('handover-count');
const qosCategoryElement = document.getElementById('qos-category');
const simulateButton = document.getElementById('simulate-button');
const resetButton = document.getElementById('reset-button');
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');

// Network simulation variables
let simulationInterval;
let handoverInterval;

// Network cell properties
const cellRadius = 100;
const cellColor = 'rgba(0, 0, 255, 0.5)';
const handoverColor = 'rgba(255, 0, 0, 0.7)';
const maxCells = 5;
const maxHandovers = 10;

// Cell class
class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = cellRadius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = cellColor;
    ctx.fill();
    ctx.closePath();
  }
}

// Draw a random cell
function drawCell() {
  const x = Math.random() * (canvas.width - cellRadius * 2) + cellRadius;
  const y = Math.random() * (canvas.height - cellRadius * 2) + cellRadius;
  return new Cell(x, y);
}

// Draw handovers on the canvas
function drawHandover(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = handoverColor;
  ctx.fill();
  ctx.closePath();
}

// Start the simulation
function startSimulation() {
  let cells = [];
  handoverCount = 0;
  handoverCountElement.textContent = `Handovers: ${handoverCount}`;

  // Create random cells
  for (let i = 0; i < maxCells; i++) {
    cells.push(drawCell());
  }

  // Draw cells on the canvas
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cells.forEach(cell => {
      cell.draw();
    });

    if (handoverCount < maxHandovers) {
      // Simulate handover
      const handoverCell = cells[Math.floor(Math.random() * cells.length)];
      drawHandover(handoverCell.x, handoverCell.y);
      handoverCount++;
      handoverCountElement.textContent = `Handovers: ${handoverCount}`;
    }

    // Stop the simulation when max handovers are reached
    if (handoverCount >= maxHandovers) {
      clearInterval(handoverInterval);
      qosCategory = 'Video';
      qosCategoryElement.textContent = `QoS Category: ${qosCategory}`;
    }
  }

  // Call draw function every 2 seconds
  simulationInterval = setInterval(draw, 2000);
  handoverInterval = setInterval(() => {
    if (handoverCount < maxHandovers) {
      handoverCount++;
      handoverCountElement.textContent = `Handovers: ${handoverCount}`;
    }
  }, 2000);
}

// Reset the simulation
function resetSimulation() {
  clearInterval(simulationInterval);
  clearInterval(handoverInterval);
  handoverCount = 0;
  qosCategory = 'Voice';
  handoverCountElement.textContent = `Handovers: 0`;
  qosCategoryElement.textContent = `QoS Category: Voice`;
}

// Event listeners for buttons
simulateButton.addEventListener('click', startSimulation);
resetButton.addEventListener('click', resetSimulation);
