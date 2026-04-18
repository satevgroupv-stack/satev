// esp_simulator.js
const axios = require('axios');

// --------- CONFIG ---------
const apiBaseUrl = "https://satev.vercel.app/api/machines/";
const machineToken = "mch_sk_4740ed6ce010137901ba3580ff6cd85e";
const dispenseTimePerDrinkMs = 0; // 5 seconds per drink
const basePollIntervalMs = 2000;     // 2 seconds when idle
// -------------------------

let orderInProgress = false;
let orderedDrinks = 0;
let dispensedDrinks = 0;

async function pollServerForCommands() {
  try {
    const response = await axios.get(`${apiBaseUrl}commands`, {
      headers: {
        'Authorization': `Bearer ${machineToken}`,
        'Accept': 'application/json'
      }
    });

    if (response.status === 200 && response.data.success) {
      console.log(JSON.stringify(response.data));
      const products = response.data.data?.command?.payload?.products;
      if (!products || products.length === 0) return;

      const quantity = products[0].quantity || 0;
      const productName = products[0].name || "Drink";

      if (quantity <= 0 || quantity > 100) return;
      if (orderInProgress) {
        console.log("Server order ignored: machine busy");
        return;
      }

      console.log(`\n=== NEW ORDER: ${quantity} x ${productName} ===`);
      orderedDrinks = quantity;
      dispensedDrinks = 0;
      orderInProgress = true;

      await dispenseDrinks(quantity, productName);

      // After dispensing, schedule next poll
      setTimeout(startPolling, 0);

    } else if (response.status === 204) {
      console.log("No new command");
    }

  } catch (err) {
    console.error("HTTP error:", err.message);
  }
}

// Simulate dispensing drinks
async function dispenseDrinks(quantity, name) {
  while (dispensedDrinks < quantity) {
    dispensedDrinks++;
    console.log(`Dispensing #${dispensedDrinks} → ${name}`);
    await sleep(dispenseTimePerDrinkMs);
  }
  console.log(`*** ORDER COMPLETED: ${quantity} x ${name} ***`);
  orderedDrinks = 0;
  orderInProgress = false;
}

// Helper sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Polling loop
function startPolling() {
  setTimeout(async () => {
    await pollServerForCommands();
    if (!orderInProgress) {
      startPolling();
    }
  }, orderInProgress ? 0 : basePollIntervalMs);
}

// Start
console.log(">>> ESP32 Simulator Started <<<");
startPolling();