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

from fastapi import APIRouter
from fastapi.responses import RedirectResponse

# Include Routers (Direct + /api prefix alias)
routers = [
    health.router,
    orders.router,
    customers.router,
    products.router,
    returns.router,
    refunds.router,
    support.router,
    analytics.router,
]

for r in routers:
    app.include_router(r)

api_router = APIRouter(prefix="/api")
for r in routers:
    api_router.include_router(r)
app.include_router(api_router)

# Mount static directory for interactive admin dashboard
static_dir = os.path.join(os.path.dirname(__file__), "static")
if not os.path.exists(static_dir):
    os.makedirs(static_dir)

app.mount("/static", StaticFiles(directory=static_dir), name="static")

# Mount production frontend if built
frontend_dist = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "dist")
if os.path.exists(frontend_dist):
    assets_dir = os.path.join(frontend_dist, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")
    app.mount("/app", StaticFiles(directory=frontend_dist, html=True), name="frontend")

@app.get("/", summary="Root redirect to API documentation")
def root():
    return {
        "message": "ShopSathi AI Customer Support API is running.",
        "frontend": "/app/" if os.path.exists(frontend_dist) else "Run 'npm run build' in frontend/",
        "documentation": "/docs",
        "dashboard": "/static/index.html",
        "health": "/health"
    }
