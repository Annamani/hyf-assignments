const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
// Helper: sign up (only needed once)
async function signup(email, password) {
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Signup failed");
  return response.json();
}

// Helper: login and get token
async function getAuthToken() {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "annamani@hyf.dk",
      password: "my_Password",
    }),
  });

  if (!response.ok) throw new Error("Login failed");
  const data = await response.json();
  return data.token;
}

// Create a new order (POST /orders)
async function createOrder(items) {
  const token = await getAuthToken();
  const response = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items }),
  });
  if (!response.ok) {
    const error = await response.text();
    console.error("Create order error:", error);
    throw new Error(`Create order failed: ${response.status}`);
  }
  return response.json();
}

// Get all orders (GET /orders)
async function getMyOrders() {
  const token = await getAuthToken();
  const response = await fetch(`${API_BASE}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(`Orders fetch failed: ${response.status}`);
  const orders = await response.json();
  return orders;
}

// Test (sign up first, then create and list orders):
signup("annamani@hyf.dk", "my_Password")
  .catch(() => {}) // ignore if already signed up
  .then(() => createOrder([{ teaId: 17, grams: 100 }]))
  .then((order) => {
    if (!order) throw new Error("Order is undefined");
    console.log("Created order:", order.id);
  })
  .then(() => getMyOrders())
  .then((orders) => console.log("All orders:", orders.length));
