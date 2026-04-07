type SessionPayload = {
  userId: number;
  username: string;
  exp: number;
};

type User = {
  id: number;
  username: string;
  password: string;
};

type Customer = {
  id: number;
  name: string;
  milk: string;
  quantity: number;
  price_per_liter: number;
  total: number;
  created_at: string;
};

const users: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'hashed_admin1234',
  },
];

const customers: Customer[] = [
  {
    id: 1,
    name: 'Rahul Sharma',
    milk: 'Cow Milk',
    quantity: 2,
    price_per_liter: 60,
    total: 120,
    created_at: new Date('2026-04-01').toISOString(),
  },
  {
    id: 2,
    name: 'Priya Singh',
    milk: 'Buffalo Milk',
    quantity: 1.5,
    price_per_liter: 72,
    total: 108,
    created_at: new Date('2026-04-02').toISOString(),
  },
  {
    id: 3,
    name: 'Amit Verma',
    milk: 'Cow Milk',
    quantity: 3,
    price_per_liter: 60,
    total: 180,
    created_at: new Date('2026-04-03').toISOString(),
  },
];

let nextUserId = users.length + 1;
let nextCustomerId = customers.length + 1;

function encodeSession(payload: SessionPayload) {
  return Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
}

function decodeSession(value: string) {
  try {
    const parsed = JSON.parse(
      Buffer.from(value, 'base64url').toString('utf8')
    ) as SessionPayload;
    if (parsed.exp < Date.now()) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function calculateTotal(quantity: number, pricePerLiter: number) {
  return Number((quantity * pricePerLiter).toFixed(2));
}

function parseCookieHeader(cookies: string) {
  return cookies
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, entry) => {
      const [key, ...rest] = entry.split('=');
      if (!key) {
        return acc;
      }
      acc[key] = rest.join('=');
      return acc;
    }, {});
}

export async function getSessionFromCookies(cookies: string) {
  const parsedCookies = parseCookieHeader(cookies);
  const sessionToken = parsedCookies.session;
  if (!sessionToken) {
    return null;
  }

  return decodeSession(decodeURIComponent(sessionToken));
}

export function getSummary() {
  return {
    customerCount: customers.length,
    totalLiters: Number(
      customers.reduce((sum, customer) => sum + customer.quantity, 0).toFixed(1)
    ),
    totalRevenue: Number(
      customers.reduce((sum, customer) => sum + customer.total, 0).toFixed(2)
    ),
  };
}

export function getCustomers() {
  return [...customers];
}

export function getAllCustomers() {
  return getCustomers();
}

export function getCustomerById(id: number) {
  return customers.find((customer) => customer.id === id) ?? null;
}

export function createCustomer(
  name: string,
  milk: string,
  quantity: number,
  price_per_liter: number
) {
  const customer = {
    id: nextCustomerId++,
    name,
    milk,
    quantity,
    price_per_liter,
    total: calculateTotal(quantity, price_per_liter),
    created_at: new Date().toISOString(),
  };

  customers.push(customer);
  return customer;
}

export function updateCustomer(
  id: number,
  name: string,
  milk: string,
  quantity: number,
  price_per_liter: number
) {
  const customer = customers.find((entry) => entry.id === id);
  if (!customer) {
    return null;
  }

  customer.name = name;
  customer.milk = milk;
  customer.quantity = quantity;
  customer.price_per_liter = price_per_liter;
  customer.total = calculateTotal(quantity, price_per_liter);

  return customer;
}

export function deleteCustomer(id: number) {
  const index = customers.findIndex((customer) => customer.id === id);
  if (index === -1) {
    return false;
  }

  customers.splice(index, 1);
  return true;
}

export function getUserByUsername(username: string) {
  return users.find((user) => user.username === username) ?? null;
}

export async function verifyPassword(password: string, hash: string) {
  return hash === `hashed_${password}`;
}

export async function hashPassword(password: string) {
  return `hashed_${password}`;
}

export function createUser(username: string, hashedPassword: string) {
  const user = { id: nextUserId++, username, password: hashedPassword };
  users.push(user);
  return user;
}

export async function createSession(payload: SessionPayload) {
  return encodeSession(payload);
}
