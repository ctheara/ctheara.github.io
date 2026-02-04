---
layout: page
title: Movie Watchlist API- Python
description: Track your movies watchlist
img: assets/img/projects/movies-watchlist-cover.png
importance: 5
category: work
github: https://github.com/ctheara/movies-watchlist-python
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/movies-watchlist-cover.png" title="movie-watchlist-python" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<!-- <div class="caption">
    github - movies-watchlist-python
</div> -->

A personal movie watchlist application that integrates with the OMDb API to fetch movie metadata and provides analytics on your viewing habits. I wanted to learn how to create APIs and do CRUD in python.

**Features:**
- Search movies by title using `OMDb API`
- Add/remove movies to personal watchlist
- Track watched vs. unwatched status

<br>

## Tech Stack

- **Backend:** `FastAPI`, `Python 3.8+`
- **Database:** `PostgreSQL`, `SQLAlchemy ORM`
- **Data Processing:** `Pandas`
- **API Integration:** OMDb API via `Requests`
- **Testing:** `pytest`, `pytest-cov`
- **DevOps:** `Docker`, `uvicorn`

<br>

## Architecture

The application follows a clean, layered architecture:

```
┌─────────────────┐
│   FastAPI App   │  ← REST endpoints
├─────────────────┤
│   CRUD Layer    │  ← Database operations
├─────────────────┤
│  SQLAlchemy ORM │  ← Data models
├─────────────────┤
│   PostgreSQL    │  ← Persistent storage
└─────────────────┘
        ↕
┌─────────────────┐
│   OMDb Client   │  ← External API integration
└─────────────────┘
```

<br>

## Key Features & Implementation

1. **RESTful API Design**- Implemented 8 endpoints following REST conventions with proper HTTP status codes:
    - `GET /api/v1/search/{title}` - Search movies
    - `GET /api/v1/movies/{imdb_id}` - Get movie details
    - `GET /api/v1/movies/` - List watchlist (with optional `?watched=true/false` filter)
    - `POST /api/v1/movies` - Add to watchlist
    - `PATCH /api/v1/movies/{imdb_id}/watched` - Update status
    - `DELETE /api/v1/movies/{imdb_id}` - Remove from watchlist
    - `GET /api/v1/analytics` - Get watchlist analytics
2. **Data Analytics with Pandas** - Built analytics and computes insights from watchlist data
3. **Database Design** - `PostgreSQL` schema with SQLAlchemy ORM managing movie metadata and watch status.
4. **External API Integration** with OMDb client to get movie data.
5. **Comprehensive Testing** achieving 90%+ code coverage with `pytest` including CRUD operations, API endpoints, and edge cases.

<br>

## Learnings:

1. **New Technologies:** `FastAPI`, `SQLAlchemy`, `pytest`
2. **API Design:** Following REST conventions makes APIs intuitive and predictable
3. **Documentation:** FastAPI's auto-generated docs saved significant development time

<br>

## Links

- **GitHub Repository:** [ctheara/movies-watchlist-python](https://github.com/ctheara/movies-watchlist-python)
- **API Documentation:** Run locally and visit `/docs`

---

**Technologies:** `Python` · `FastAPI` · `PostgreSQL` · `SQLAlchemy` · `Pandas` · `Docker` · `pytest` · `RESTful API`
