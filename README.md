<div align="center">

# 🚀 HireScope

### A production-grade job discovery engine for Software Engineers

Discover newly posted jobs from product companies before they reach traditional job boards.

</div>

------------------------------------------------------------------------

##  Motivation

After sending **2000+ applications** and attending **28+ interviews**, I
realized the hardest part wasn't interview preparation---it was
discovering relevant openings early.

Many companies publish jobs first on their ATS-powered career pages
(Greenhouse, Lever, Workday, etc.). By the time aggregators index them,
thousands of applicants have already applied.

**HireScope** continuously monitors public career portals, filters only
relevant engineering roles, ranks them, and notifies me immediately.

------------------------------------------------------------------------

## 🛡️ Design Principles

-    Legal & ethical
-    Public APIs/endpoints only
-    No browser automation
-    No authentication bypass
-    No CAPTCHA solving
-    Config-driven architecture
-    Modular adapters
-    Production-ready logging & fault tolerance

------------------------------------------------------------------------

# 🏗 Architecture

``` text
 React Dashboard
       │
       ▼
   NestJS Backend
       │
       ▼
  Engine Service (Hourly Scheduler)
       │
       ▼
 Adapter Registry
 ├─ Greenhouse
 ├─ Lever
 └─ Workday
       │
       ▼
 Normalization Pipeline
       │
       ▼
 PostgreSQL (Prisma)
       │
       ├─ Telegram Notifications
       └─ Dashboard API
```

##  Synchronization Pipeline

``` text
Scheduler
   │
Load Enabled Companies
   │
Select Adapter
   │
Fetch Listings
   │
Title Filter
   │
Location Filter
   │
Fetch Details (filtered only)
   │
Experience Extraction
   │
Normalize
   │
Upsert
   │
Rank
   │
Notify
```

------------------------------------------------------------------------

#  ATS Adapter Architecture

Every Applicant Tracking System implements a common adapter contract.

    BaseAdapter
        ▲
        ├── GreenhouseAdapter
        ├── LeverAdapter
        └── WorkdayAdapter

The Engine never contains ATS-specific logic. New providers are added by
implementing the interface and registering them.

------------------------------------------------------------------------

#  Database

### Company

-   ATS
-   board
-   boardUrl
-   requestBody
-   applyBaseUrl
-   enabled
-   priority
-   lastSyncedAt

### Job

-   externalJobId
-   companyName
-   title
-   location
-   remoteStatus
-   postedAt
-   description
-   experienceMin
-   experienceMax
-   experienceText
-   score

------------------------------------------------------------------------

# ⚙️ Tech Stack

  Layer           Technology
  --------------- -----------------------------
  Backend         NestJS, Node.js, TypeScript
  ORM             Prisma
  Database        PostgreSQL
  Frontend        React + Tailwind CSS
  Scheduling      @nestjs/schedule
  Notifications   Telegram Bot API
  DevOps          Docker

------------------------------------------------------------------------

#  Intelligent Filtering

## Title

Includes:

-   Software Engineer
-   Backend
-   Full Stack
-   Frontend
-   Platform
-   Node.js
-   React

Excludes:

-   Intern
-   Staff
-   Principal
-   Manager
-   HR
-   Designer

## Location

Accepts:

-   India
-   India Remote
-   Global Remote

Rejects unrelated onsite international roles.

## Experience

Job descriptions are converted from HTML to plain text.

An extraction service identifies years of experience.

Jobs requiring significantly more experience than the target profile are
filtered.

------------------------------------------------------------------------

# 📈 Ranking

Each job receives a relevance score based on:

-   title
-   experience
-   remote preference
-   company relevance

Future enhancements:

-   skill matching
-   personalized preferences
-   ML-assisted ranking

------------------------------------------------------------------------

# 📂 Project Structure

``` text
backend/
  engine/
  adapters/
  services/
  prisma/
frontend/
docker-compose.yml
```

------------------------------------------------------------------------

#  Local Setup

``` bash
git clone <repository>
cd hirescope

docker compose up -d

npm install

npx prisma migrate deploy

npm run start:dev
```

------------------------------------------------------------------------

#  Roadmap

-   Workday detail strategy improvements
-   Rich sync analytics
-   Dashboard job actions
-   Production deployment
-   300+ company coverage
-   Ashby & SmartRecruiters
-   Multi-user architecture

------------------------------------------------------------------------

# 💡 Engineering Highlights

-   Adapter Pattern
-   Registry Pattern
-   Config-driven integrations
-   Fault-tolerant synchronization
-   Partial-failure recovery
-   Database-first configuration
-   Normalized domain model
-   Extensible provider ecosystem

------------------------------------------------------------------------

# 📜 License

Portfolio project created by **Rahul Ramachandran** 
