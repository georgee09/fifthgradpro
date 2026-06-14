# Architecture Context

## Stack

| Layer            | Technology                   | Role                                                                   |
| ---------------- | ---------------------------- | ---------------------------------------------------------------------- |
| Framework        | Next.js 15 + TypeScript      | Full-stack application framework, routing, server rendering, API layer |
| UI               | Tailwind CSS + shadcn/ui     | Design system and component library                                    |
| State Management | React Query (TanStack Query) | Server state management and caching                                    |
| Forms            | React Hook Form + Zod        | Form handling and validation                                           |
| Authentication   | Auth.js (NextAuth)           | Authentication, session management, authorization                      |
| Database         | Prisma + PostgreSQL          | Data persistence and relational modeling                               |
| Caching          | Redis                        | Session caching, rate limiting, temporary data                         |
| Payments         | Stripe                       | Payment processing and refunds                                         |
| File Storage     | AWS S3 / Cloudflare R2       | Product images and media storage                                       |
| Email            | Resend                       | Transactional email delivery                                           |
| Background Jobs  | Trigger.dev / Inngest        | Asynchronous workflows and scheduled jobs                              |
| Monitoring       | Sentry                       | Error tracking and observability                                       |
| Deployment       | Vercel                       | Hosting and deployment platform                                        |

---

## System Boundaries

### `app/`

Owns application routing, layouts, route groups, pages, API routes, and server actions.

Responsibilities:

* App Router structure
* Route Handlers
* Server Components
* Layout hierarchy
* Middleware integration

Does NOT contain:

* Database logic
* Business rules
* Direct Prisma queries

---

### `features/`

Owns business domains and application use cases.

Responsibilities:

* Product domain
* Inventory domain
* Cart domain
* Checkout domain
* Order domain
* User domain
* Admin domain

Each feature contains:

```txt
feature/
├── actions/
├── services/
├── schemas/
├── repositories/
├── types/
└── components/
```

---

### `lib/`

Owns shared infrastructure and platform integrations.

Responsibilities:

* Prisma client
* Stripe client
* Auth configuration
* Redis client
* Utility functions
* Shared helpers

Must remain framework-independent whenever possible.

---

### `db/`

Owns database schema and migrations.

Responsibilities:

* Prisma schema
* Database migrations
* Seed scripts
* Database indexes

No business logic is allowed here.

---

### `services/`

Owns cross-domain workflows.

Responsibilities:

* Checkout orchestration
* Payment processing
* Fulfillment workflows
* Notification workflows

Coordinates multiple repositories and features.

---

### `repositories/`

Owns database access patterns.

Responsibilities:

* Encapsulate Prisma queries
* Data retrieval
* Persistence logic

Repositories must not contain business rules.

---

### `jobs/`

Owns asynchronous processing.

Responsibilities:

* Email sending
* Inventory synchronization
* Order status updates
* Scheduled tasks
* Retryable workflows

---

## Storage Model

### Database (PostgreSQL)

Stores:

* Users
* Roles
* Products
* Categories
* Product variants
* Inventory
* Shopping carts
* Orders
* Payments
* Coupons
* Addresses
* Audit logs

Database is the source of truth for all business data.

---

### Object Storage (S3 / R2)

Stores:

* Product images
* Category images
* Marketing assets
* Exported reports

Only metadata and file references are stored in PostgreSQL.

---

### Redis

Stores:

* Cache entries
* Session data
* Rate limiting counters
* Temporary checkout state
* Queue metadata

Redis should never be considered the primary source of truth.

---

## Auth and Access Model

### Authentication

Users authenticate using Auth.js.

Supported providers:

* Email/password
* Google OAuth
* GitHub OAuth (optional)

Authenticated sessions are stored securely and validated on every protected request.

---

### Authorization

System roles:

#### Customer

Can:

* Browse products
* Manage cart
* Place orders
* Manage profile
* View order history

Cannot:

* Access admin resources

---

#### Admin

Can:

* Manage products
* Manage inventory
* Manage orders
* Manage customers
* Access reports

---

### Ownership Model

Every business resource has a clear owner.

Examples:

* Cart belongs to exactly one user
* Order belongs to exactly one customer
* Product managed by administrators
* Address belongs to one customer

---

### Access Control Rules

Customers may only:

* Read their own profile
* Read their own orders
* Modify their own cart
* Manage their own addresses

Administrators may:

* Access administrative resources
* Manage catalog and inventory
* Process orders and refunds

All mutations must perform authorization checks on the server.

---

## Data Flow

```txt
Client
   │
   ▼
Server Components
   │
   ▼
Server Actions / API Routes
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
Prisma
   │
   ▼
PostgreSQL
```

Business rules execute only in Services.

Repositories only access data.

---

## Invariants

### 1. Business Logic Lives in Services

Route handlers, pages, and server actions must never contain core business logic.

All business workflows must be delegated to service layers.

---

### 2. Repositories Only Access Data

Repositories may query and persist data.

Repositories must not:

* Calculate pricing
* Process payments
* Apply business rules

---

### 3. Inventory Cannot Become Negative

An order may only be created when sufficient inventory exists.

Inventory updates must occur inside database transactions.

---

### 4. Orders Are Immutable After Completion

Completed orders cannot be modified directly.

Changes require:

* Refund workflows
* Cancellation workflows
* Administrative actions

---

### 5. Payments Must Be Verified

Order completion requires verified payment status from the payment provider.

Client-side payment state is never trusted.

---

### 6. Authorization Happens Server-Side

UI checks are convenience only.

All authorization decisions must be enforced on the server.

---

### 7. Database Is the Source of Truth

Redis caches, sessions, and temporary states must never replace persisted business data.

---

### 8. External Services Are Isolated

Stripe, S3, Redis, and email providers must be accessed through dedicated service wrappers.

No feature should call third-party SDKs directly.

---

### 9. Long-Running Work Is Asynchronous

Request handlers must remain fast.

The following must execute in background jobs:

* Email delivery
* Report generation
* Inventory synchronization
* Analytics aggregation

---

### 10. Every Critical Mutation Is Auditable

The system must maintain audit records for:

* Product changes
* Inventory adjustments
* Order status updates
* Refunds
* Administrative actions

---

## Architectural Principles

1. Feature-first organization.
2. Server-first development.
3. Type-safe APIs and database access.
4. Domain-driven separation of concerns.
5. Stateless application servers.
6. Explicit authorization everywhere.
7. Transactional consistency for commerce workflows.
8. Infrastructure isolated behind abstractions.
9. Scalable by default.
10. Maintainability prioritized over premature optimization.
