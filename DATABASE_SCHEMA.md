# Database Schema Documentation

> This file documents all tables, columns, relationships, and security policies used in the VeggyExpress project.
> Use this as a reference if migrating to another database (e.g., MongoDB, PostgreSQL, MySQL).

---

## Tables

### 1. `profiles`
Stores additional user information beyond authentication.

| Column      | Type                     | Nullable | Default             | Notes                       |
|-------------|--------------------------|----------|---------------------|-----------------------------|
| id          | UUID (PK)                | No       | `gen_random_uuid()` |                             |
| user_id     | UUID                     | No       | —                   | References auth user        |
| full_name   | TEXT                     | Yes      | `''`                |                             |
| phone       | TEXT                     | Yes      | `''`                |                             |
| avatar_url  | TEXT                     | Yes      | `''`                |                             |
| created_at  | TIMESTAMP WITH TIME ZONE | No       | `now()`             |                             |
| updated_at  | TIMESTAMP WITH TIME ZONE | No       | `now()`             | Auto-updated via trigger    |

**Access Rules:**
- Users can SELECT, INSERT, UPDATE their own profile (`user_id = auth.uid()`)
- No DELETE allowed

---

### 2. `orders`
Stores order header information.

| Column           | Type                     | Nullable | Default             | Notes                |
|------------------|--------------------------|----------|---------------------|----------------------|
| id               | UUID (PK)                | No       | `gen_random_uuid()` |                      |
| user_id          | UUID                     | No       | —                   | References auth user |
| order_number     | TEXT                     | No       | —                   | Human-readable ID    |
| status           | TEXT                     | No       | `'In Transit'`      |                      |
| total            | NUMERIC                  | No       | `0`                 |                      |
| delivery_address | TEXT                     | Yes      | —                   |                      |
| created_at       | TIMESTAMP WITH TIME ZONE | No       | `now()`             |                      |
| updated_at       | TIMESTAMP WITH TIME ZONE | No       | `now()`             |                      |

**Access Rules:**
- Users can SELECT, INSERT, UPDATE their own orders (`user_id = auth.uid()`)
- No DELETE allowed

---

### 3. `order_items`
Stores individual items within an order.

| Column     | Type                     | Nullable | Default             | Notes                    |
|------------|--------------------------|----------|---------------------|--------------------------|
| id         | UUID (PK)                | No       | `gen_random_uuid()` |                          |
| order_id   | UUID (FK → orders.id)    | No       | —                   | Parent order             |
| product_id | TEXT                     | No       | —                   | References product data  |
| name       | TEXT                     | No       | —                   | Product name at purchase |
| quantity   | INTEGER                  | No       | `1`                 |                          |
| price      | NUMERIC                  | No       | `0`                 | Price at purchase time   |
| image      | TEXT                     | No       | `''`                |                          |
| created_at | TIMESTAMP WITH TIME ZONE | No       | `now()`             |                          |

**Access Rules:**
- Users can SELECT, INSERT their own order items (via join to `orders.user_id`)
- No UPDATE or DELETE allowed

---

### 4. `reviews`
Product ratings and text reviews.

| Column      | Type                     | Nullable | Default             | Notes                |
|-------------|--------------------------|----------|---------------------|----------------------|
| id          | UUID (PK)                | No       | `gen_random_uuid()` |                      |
| user_id     | UUID                     | No       | —                   | References auth user |
| product_id  | TEXT                     | No       | —                   | Product identifier   |
| rating      | INTEGER                  | No       | —                   | 1–5 stars            |
| review_text | TEXT                     | Yes      | —                   |                      |
| created_at  | TIMESTAMP WITH TIME ZONE | No       | `now()`             |                      |

**Access Rules:**
- Anyone can SELECT (public reviews)
- Users can INSERT, UPDATE, DELETE their own reviews (`user_id = auth.uid()`)

---

### 5. `wishlist`
User's saved/favorite products.

| Column     | Type                     | Nullable | Default             | Notes                          |
|------------|--------------------------|----------|---------------------|--------------------------------|
| id         | UUID (PK)                | No       | `gen_random_uuid()` |                                |
| user_id    | UUID                     | No       | —                   | References auth user           |
| product_id | TEXT                     | No       | —                   | Product identifier             |
| created_at | TIMESTAMP WITH TIME ZONE | No       | `now()`             |                                |

**Unique Constraint:** `(user_id, product_id)` — prevents duplicate favorites.

**Access Rules:**
- Users can SELECT, INSERT, DELETE their own wishlist items (`user_id = auth.uid()`)
- No UPDATE allowed

---

### 6. `saved_addresses`
User's saved delivery addresses.

| Column     | Type                     | Nullable | Default             | Notes                  |
|------------|--------------------------|----------|---------------------|------------------------|
| id         | UUID (PK)                | No       | `gen_random_uuid()` |                        |
| user_id    | UUID                     | No       | —                   | References auth user   |
| label      | TEXT                     | No       | `'Home'`            | e.g., Home, Office     |
| address    | TEXT                     | No       | —                   | Full address string    |
| area       | TEXT                     | No       | —                   | Neighborhood/area      |
| city       | TEXT                     | No       | `'Nagpur'`          |                        |
| lat        | DOUBLE PRECISION         | Yes      | —                   | Latitude               |
| lng        | DOUBLE PRECISION         | Yes      | —                   | Longitude              |
| is_default | BOOLEAN                  | No       | `false`             |                        |
| created_at | TIMESTAMP WITH TIME ZONE | No       | `now()`             |                        |
| updated_at | TIMESTAMP WITH TIME ZONE | No       | `now()`             |                        |

**Access Rules:**
- Users can SELECT, INSERT, UPDATE, DELETE their own addresses (`user_id = auth.uid()`)

---

### 7. `user_roles`
Stores user roles for authorization (separated from profiles for security).

| Column  | Type                  | Nullable | Default             | Notes                        |
|---------|-----------------------|----------|---------------------|------------------------------|
| id      | UUID (PK)             | No       | `gen_random_uuid()` |                              |
| user_id | UUID                  | No       | —                   | References auth user         |
| role    | ENUM (`app_role`)     | No       | `'user'`            | Values: admin, moderator, user |

**Access Rules:**
- Users can only SELECT their own role
- No INSERT, UPDATE, DELETE from client side

---

## Enums

### `app_role`
```
'admin' | 'moderator' | 'user'
```

---

## Database Functions

### `has_role(_user_id UUID, _role app_role) → BOOLEAN`
Security definer function to check if a user has a specific role. Used in RLS policies to avoid infinite recursion.

### `handle_new_user() → TRIGGER`
Automatically creates a profile and assigns `'user'` role when a new auth user signs up.

### `update_updated_at_column() → TRIGGER`
Sets `updated_at = now()` before any UPDATE on tables that use it.

---

## Relationships (ERD)

```
auth.users (1) ──→ (1) profiles
auth.users (1) ──→ (N) orders ──→ (N) order_items
auth.users (1) ──→ (N) reviews
auth.users (1) ──→ (N) wishlist
auth.users (1) ──→ (N) saved_addresses
auth.users (1) ──→ (1) user_roles
```

---

## MongoDB Migration Notes

If migrating to MongoDB, consider the following:

1. **UUIDs → ObjectIds**: Replace UUID primary keys with MongoDB `_id` (ObjectId).
2. **Foreign Keys → Embedded/Referenced**: 
   - `order_items` can be **embedded** inside `orders` documents (denormalized).
   - `reviews` and `wishlist` can remain as separate collections with `user_id` references.
3. **RLS → Application-level auth**: MongoDB doesn't have RLS. Implement access control in your application layer or use MongoDB Realm rules.
4. **Enums → String validation**: Use Mongoose schema validation or MongoDB JSON Schema for enum-like constraints.
5. **Triggers → Change Streams**: Replace database triggers with MongoDB Change Streams or Mongoose middleware (pre/post hooks).
6. **Timestamps**: Use Mongoose `timestamps: true` option for automatic `createdAt`/`updatedAt`.

### Example MongoDB Schema (Mongoose)

```javascript
// profiles
const profileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  fullName: { type: String, default: '' },
  phone: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
}, { timestamps: true });

// orders (with embedded items)
const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  orderNumber: { type: String, required: true },
  status: { type: String, default: 'In Transit' },
  total: { type: Number, default: 0 },
  deliveryAddress: String,
  items: [{
    productId: String,
    name: String,
    quantity: { type: Number, default: 1 },
    price: { type: Number, default: 0 },
    image: { type: String, default: '' },
  }],
}, { timestamps: true });

// reviews
const reviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: String,
}, { timestamps: true });

// wishlist
const wishlistSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: String, required: true },
}, { timestamps: true });
wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });
```
