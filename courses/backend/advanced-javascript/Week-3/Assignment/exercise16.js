const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";
// Step 1: Sign up (only needed once)
async function signup(email, password) {
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data.token;
}

// Step 2: Log in
async function login(email, password) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data.token;
}

// Sign up first, then log in (use dummy credentials!)
await signup("annamani@hyf.dk", "my_Password");
login("annamani@hyf.dk", "my_Password")
  .then((token) => console.log("Got token:", token))
  .catch((err) => console.error(err.message));

//   Exercise 17
async function getOrders() {
  const token = await login("annamani@hyf.dk", "my_Password");
  const response = await fetch(`${API_BASE}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const orders = await response.json();
  return orders;
}

getOrders()
  .then((orders) => console.log("Orders:", orders))
  .catch((err) => console.error(err.message));
