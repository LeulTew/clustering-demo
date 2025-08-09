<<<<<<< HEAD
# clustering-demo
=======
# Shuttle Route Optimization System

Anntelligent routing system that optimizes shuttle routes for employee pickup and drop-off services. The system uses advanced algorithms to calculate the most efficient routes while considering vehicle capacities, geographic distances, and directional optimization.

## Features
- 🚐 Optimizes routes for multiple shuttles simultaneously
- 📍 Handles real-world geographic coordinates
- ⚖️ Respects vehicle capacity constraints
- 🧭 Considers bearing/direction for route smoothness
- 🔄 Ensures all employees are assigned exactly once
- 🌐 RESTful API interface
- ✅ Built-in route verification

## Technology Stack
- Python 3.x
- Google OR-Tools for route optimization
- FastAPI for REST API
- Haversine formula for geographic calculations
- JSON for data storage and API communication

## Security Note

To prevent direct access to FastAPI endpoints, ensure that FastAPI is bound only to localhost. For example, when starting FastAPI with uvicorn, use:

```bash
uvicorn main:app --host 127.0.0.1 --port 8000
```

Alternatively, configure your firewall to restrict external access.


>>>>>>> b1af3ea (init)
