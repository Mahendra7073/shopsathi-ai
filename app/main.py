import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from app.database import Base, engine
from app.seed_data import seed_db
from app.routers import (
    health,
    orders,
    customers,
    products,
    returns,
    refunds,
    support,
    analytics,
)

# Initialize database and seed demo data on startup
seed_db()

app = FastAPI(
    title="ShopSathi AI — E-Commerce Customer Support Backend",
    description="Agentic Customer Support Backend supporting Kipps.AI Chat & Voice Agents, REST APIs, Tool Functions, and Observability.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configurable CORS setup
allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "*")
origins = [origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom Global Exception Handler to prevent exposing raw stack traces
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "message": "An unexpected error occurred while processing your request. Please try again or contact support."
        }
    )

# Include Routers
app.include_router(health.router)
app.include_router(orders.router)
app.include_router(customers.router)
app.include_router(products.router)
app.include_router(returns.router)
app.include_router(refunds.router)
app.include_router(support.router)
app.include_router(analytics.router)

# Mount static directory for interactive dashboard
static_dir = os.path.join(os.path.dirname(__file__), "static")
if not os.path.exists(static_dir):
    os.makedirs(static_dir)

app.mount("/static", StaticFiles(directory=static_dir), name="static")

@app.get("/", summary="Root redirect to API documentation")
def root():
    return {
        "message": "ShopSathi AI Customer Support API is running.",
        "documentation": "/docs",
        "dashboard": "/static/index.html",
        "health": "/health"
    }
