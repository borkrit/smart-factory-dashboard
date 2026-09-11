# IIoT Industrial Dashboard (Factory Management Kiosk)

A high-performance information dashboard optimized for tablet devices deployed in factory environments. Designed to run in **Kiosk Mode**, this application provides real-time operational management for factory machines, work shifts, production zones, and shop-floor personnel.

---

## 🛠 Tech Stack

* **Frontend:** React 19, TypeScript, Vite
* **State Management & Architecture:** Zustand, Modular Registry Pattern
* **Styling:** Tailwind CSS
* **Backend / Database:** Supabase (PostgreSQL, Row Level Security, Realtime Engine)
* **Realtime Protocol:** WebSockets (Postgres Changes Subscription)

---

## 🏗 Data Architecture & Database Model

### PostgreSQL / Supabase Schema

1. **`shops`** — Top-level organizational units/departments.
2. **`zones`** — Logical and physical factory sub-areas (mapped to shops).
3. **`shifts`** — Work shift definitions (`start_time`, `end_time`, `code`, `name`).
4. **`machines`** — Equipment nodes linked to `zones` and `shops`.
5. **`workers`** — Personnel and operators assigned to a default shift (`default_shift_id`).
6. **`machine_operators`** — Many-to-Many junction table mapping machines, operators, and work shifts.