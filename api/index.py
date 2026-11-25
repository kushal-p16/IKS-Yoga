import sys
import os
from pathlib import Path

# ─── Path setup ───────────────────────────────────────────────────────────────
# Add backend directory to Python path so app.* imports work
backend_dir = Path(__file__).resolve().parent.parent / "backend"
sys.path.insert(0, str(backend_dir))

# ─── Vercel environment overrides ─────────────────────────────────────────────
# Vercel serverless has a read-only filesystem except /tmp
# Override DATABASE_URL so SQLite writes to /tmp (writable)
if not os.environ.get("DATABASE_URL"):
    os.environ["DATABASE_URL"] = "sqlite:////tmp/yogaveda.db"
elif os.environ.get("DATABASE_URL", "").startswith("sqlite:///./"):
    # Convert relative sqlite path to /tmp
    os.environ["DATABASE_URL"] = "sqlite:////tmp/yogaveda.db"

# ─── Import FastAPI app ────────────────────────────────────────────────────────
from app.main import app  # noqa: E402

# Vercel Python runtime automatically detects and serves the ASGI `app` object.
