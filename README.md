# 🚐 Shuttle Route Optimization System

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A smart routing system that optimizes shuttle routes for employee transportation. It uses advanced algorithms to create efficient pickup routes while respecting vehicle capacities and real-world geography.

## ✨ Quick Start

Get up and running in minutes:

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/LeulTew/clustering-demo.git
   cd clustering-demo
   ```

2. **Set up environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Start the services**
   ```bash
   # Terminal 1: Start the API server
   uvicorn src.main:app --host 127.0.0.1 --port 8000

   # Terminal 2: Start the web interface
   python webapp/app.py
   ```

4. **Open your browser**
   - Visit `http://localhost:5000`
   - Click "Run Clustering" to see optimized routes

## 🎯 What It Does

This system solves the complex problem of assigning employees to shuttle routes efficiently. Imagine you have:
- A headquarters location
- Multiple employee locations across a city
- Limited shuttle capacity
- Need to minimize travel time and distance

The algorithm finds the optimal way to group employees into routes that shuttles can follow, ensuring everyone gets picked up without exceeding capacity.

## 🚀 Features

- **Multi-Shuttle Optimization**: Handles multiple vehicles simultaneously
- **Real Geography**: Uses accurate distance and bearing calculations
- **Capacity Aware**: Respects vehicle passenger limits
- **Smooth Routes**: Penalizes sharp turns for practical driving
- **Verification**: Ensures every employee is assigned exactly once
- **Web Interface**: Interactive map with route visualization
- **REST API**: Easy integration with other systems

## 🛠️ Tech Stack

- **Backend**: Python 3.x with FastAPI
- **Optimization**: Google OR-Tools for route solving
- **Geography**: Haversine formula for real-world distances
- **Frontend**: Flask web app with Leaflet maps
- **Routing**: OSRM for road-following route visualization

## 🔧 How It Works

### The Algorithm

1. **Calculate Distances**: Uses the haversine formula to find real-world distances between all locations
2. **Consider Direction**: Calculates bearings to avoid inefficient route changes
3. **Build Cost Model**: Combines distance with directional penalties for realistic routing
4. **Solve Optimization**: Applies Google OR-Tools to find optimal employee assignments
5. **Verify Results**: Double-checks that all constraints are met

### Route Visualization

The web interface shows:
- Employee locations as markers
- Optimized routes as colored lines
- Shuttle capacity usage
- Interactive map controls

## 📡 API Reference

### POST /clustering

Assign employees to shuttle routes.

**Request:**
```json
{
  "locations": {
    "HQ": [9.0222, 38.7468],
    "employees": [
      {
        "id": "emp1",
        "latitude": 9.0328,
        "longitude": 38.7634
      }
    ]
  },
  "shuttles": [
    {
      "id": 1,
      "capacity": 5
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "routes": [
    {
      "shuttle_id": 1,
      "employees": ["emp1"]
    }
  ],
  "verification_passed": true
}
```

### GET /health

Check if the service is running.

## 🔒 Security

For production use:
- Bind FastAPI to localhost only
- Use HTTPS in production
- Consider authentication for API access

## 🤝 Contributing

Found a bug or have an idea? Open an issue or submit a pull request!

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.


