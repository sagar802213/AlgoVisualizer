# 🎓 AlgoVisualizer

> Interactive Data Structures & Algorithms Visualizer built with React and Tailwind CSS

Visualize sorting, searching, graph, and stack/queue algorithms with beautiful step-by-step animations. Learn DSA concepts interactively with code implementations in Java and C++.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7.3-646cff?logo=vite)

## ✨ Features

### 🔄 Sorting Algorithms

- **Bubble Sort** - Compare adjacent elements
- **Selection Sort** - Find minimum element
- **Insertion Sort** - Build sorted array incrementally
- **Merge Sort** - Divide and conquer approach
- **Quick Sort** - Efficient pivot-based sorting
- **Heap Sort** - Heap data structure sorting

### 🔍 Searching Algorithms

- **Linear Search** - Sequential search
- **Binary Search** - Divide and search
- **Jump Search** - Skip-based search
- **Interpolation Search** - Interpolation-based search

### 🗺️ Graph Algorithms

- **BFS** - Breadth-First Search
- **DFS** - Depth-First Search
- **Dijkstra** - Shortest path algorithm
- **Bellman-Ford** - Negative weight handling
- **Kruskal's MST** - Minimum Spanning Tree

### 📚 Stack & Queue

- **Stack Operations** - LIFO data structure
- **Queue Operations** - FIFO data structure
- **Priority Queue** - Priority-based dequeue
- **Deque** - Double-ended queue

### 🎨 Interactive Features

- ✅ Real-time visualization with smooth animations
- ✅ Adjustable speed control (1-100%)
- ✅ Custom array input for sorting
- ✅ Step-by-step algorithm explanations
- ✅ "How It Works" modal with:
  - Algorithm introduction
  - Java implementation
  - C++ implementation
  - Time complexity analysis
  - Space complexity analysis
- ✅ Dark/Light theme switcher
- ✅ User authentication
- ✅ Settings panel (Sound, Voice, Language)
- ✅ Feedback collection system

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sagar802213/AlgoVisualizer.git
cd AlgoVisualizer

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5174`

### Build for Production

```bash
npm run build
npm run preview
```

## 📦 Project Structure

```
src/
├── components/
│   ├── visualizers/          # Algorithm visualizer components
│   │   ├── SortingVisualizer.jsx
│   │   ├── SearchingVisualizer.jsx
│   │   ├── GraphVisualizer.jsx
│   │   ├── StackQueueVisualizer.jsx
│   │   ├── algorithmDetails.js
│   │   └── config.js
│   ├── HowItWorksModal.jsx   # Algorithm details modal
│   ├── SettingsPanel.jsx     # Settings & preferences
│   └── FeedbackPanel.jsx     # Feedback collection
├── context/
│   ├── AuthContext.jsx       # User authentication
│   └── ThemeContext.jsx      # Dark/Light theme
├── pages/
│   ├── Home.jsx              # Landing page
│   ├── Login.jsx             # Authentication page
│   └── Visualize.jsx         # Main visualizer
└── App.jsx                   # Root component
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.3
- **Styling**: Tailwind CSS 4.1
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Animations**: CSS + JavaScript

## 📚 How to Use

1. **Home Page** - Browse available algorithms
2. **Select Category** - Choose from Sorting, Searching, Graph, or Stack & Queue
3. **Pick Algorithm** - Select specific algorithm to visualize
4. **Customize** - Adjust speed, input array, or parameters
5. **Visualize** - Click Start to watch the animation
6. **Learn** - Click "How it works" to see code and complexity analysis

## 🎯 Algorithm Complexity Reference

### Sorting Algorithms

| Algorithm      | Best       | Average    | Worst      | Space    |
| -------------- | ---------- | ---------- | ---------- | -------- |
| Bubble Sort    | O(n)       | O(n²)      | O(n²)      | O(1)     |
| Selection Sort | O(n²)      | O(n²)      | O(n²)      | O(1)     |
| Insertion Sort | O(n)       | O(n²)      | O(n²)      | O(1)     |
| Merge Sort     | O(n log n) | O(n log n) | O(n log n) | O(n)     |
| Quick Sort     | O(n log n) | O(n log n) | O(n²)      | O(log n) |
| Heap Sort      | O(n log n) | O(n log n) | O(n log n) | O(1)     |

### Searching Algorithms

| Algorithm            | Best | Average      | Worst    | Space |
| -------------------- | ---- | ------------ | -------- | ----- |
| Linear Search        | O(1) | O(n)         | O(n)     | O(1)  |
| Binary Search        | O(1) | O(log n)     | O(log n) | O(1)  |
| Jump Search          | O(1) | O(√n)        | O(√n)    | O(1)  |
| Interpolation Search | O(1) | O(log log n) | O(n)     | O(1)  |

## 🔐 Authentication

- Email-based login system
- User avatar with initials
- Logout functionality
- Session persistence

## 🎨 Customization

### Themes

- **Light Mode** - Clean white interface
- **Dark Mode** - Eye-friendly dark interface (default)

### Settings

- Speed adjustment (1-100%)
- Sound effects toggle
- Voice narration toggle
- Multiple language support (8 languages)

## 📝 Code Examples

Each algorithm includes production-ready code in:

- ✅ **Java** - Full implementation with comments
- ✅ **C++** - STL-based implementation

Copy code directly from the "How It Works" modal!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Icons by [Lucide React](https://lucide.dev)
- UI Framework by [Tailwind CSS](https://tailwindcss.com)
- Build tool [Vite](https://vitejs.dev)
- Inspired by educational DSA learning platforms

## 📧 Contact

- GitHub: [@sagar802213](https://github.com/sagar802213)
- Repository: [AlgoVisualizer](https://github.com/sagar802213/AlgoVisualizer)

---

⭐ If you find this project helpful, please give it a star!

**Happy Learning! 🚀**
