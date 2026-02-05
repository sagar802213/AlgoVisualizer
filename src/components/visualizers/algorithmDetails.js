// Algorithm details with code samples and complexity info
export const algorithmDetails = {
  // Sorting Algorithms
  "Bubble Sort": {
    category: "Sorting",
    introduction:
      "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. This process continues until the list is sorted.",
    javaCode: `public void bubbleSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}`,
    cppCode: `void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}`,
    timeComplexity: "O(n²)",
    timeComplexityWorst: "O(n²) - when array is in reverse order",
    timeComplexityBest: "O(n) - when array is already sorted",
    spaceComplexity: "O(1)",
  },
  "Selection Sort": {
    category: "Sorting",
    introduction:
      "Selection Sort divides the input into a sorted and unsorted region. It repeatedly finds the minimum element from the unsorted region and moves it to the sorted region.",
    javaCode: `public void selectionSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    int temp = arr[minIdx];
    arr[minIdx] = arr[i];
    arr[i] = temp;
  }
}`,
    cppCode: `void selectionSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    swap(arr[minIdx], arr[i]);
  }
}`,
    timeComplexity: "O(n²)",
    timeComplexityWorst: "O(n²)",
    timeComplexityBest: "O(n²)",
    spaceComplexity: "O(1)",
  },
  "Insertion Sort": {
    category: "Sorting",
    introduction:
      "Insertion Sort builds the final sorted array one item at a time. It iterates through an input array, and for each element, finds the place it belongs and inserts it there.",
    javaCode: `public void insertionSort(int[] arr) {
  for (int i = 1; i < arr.length; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
    cppCode: `void insertionSort(int arr[], int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
    timeComplexity: "O(n²)",
    timeComplexityWorst: "O(n²) - when array is in reverse order",
    timeComplexityBest: "O(n) - when array is already sorted",
    spaceComplexity: "O(1)",
  },
  "Merge Sort": {
    category: "Sorting",
    introduction:
      "Merge Sort is a divide-and-conquer algorithm that divides the array in half, recursively sorts each half, then merges the sorted halves back together.",
    javaCode: `public void mergeSort(int[] arr, int left, int right) {
  if (left < right) {
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }
}

private void merge(int[] arr, int l, int m, int r) {
  int[] left = new int[m - l + 1];
  int[] right = new int[r - m];
  for (int i = 0; i < left.length; i++) 
    left[i] = arr[l + i];
  for (int i = 0; i < right.length; i++) 
    right[i] = arr[m + 1 + i];
  
  int i = 0, j = 0, k = l;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) 
      arr[k++] = left[i++];
    else 
      arr[k++] = right[j++];
  }
  while (i < left.length) 
    arr[k++] = left[i++];
  while (j < right.length) 
    arr[k++] = right[j++];
}`,
    cppCode: `void merge(int arr[], int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  vector<int> left(n1), right(n2);
  
  for (int i = 0; i < n1; i++)
    left[i] = arr[l + i];
  for (int i = 0; i < n2; i++)
    right[i] = arr[m + 1 + i];
  
  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (left[i] <= right[j]) arr[k++] = left[i++];
    else arr[k++] = right[j++];
  }
  while (i < n1) arr[k++] = left[i++];
  while (j < n2) arr[k++] = right[j++];
}

void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
    timeComplexity: "O(n log n)",
    timeComplexityWorst: "O(n log n)",
    timeComplexityBest: "O(n log n)",
    spaceComplexity: "O(n)",
  },
  "Quick Sort": {
    category: "Sorting",
    introduction:
      "Quick Sort is a divide-and-conquer algorithm that picks a pivot element and partitions the array around it, then recursively sorts the sub-arrays.",
    javaCode: `public void quickSort(int[] arr, int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

private int partition(int[] arr, int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  for (int j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  int temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  return i + 1;
}`,
    cppCode: `int partition(int arr[], int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  for (int j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr[i], arr[j]);
    }
  }
  swap(arr[i + 1], arr[high]);
  return i + 1;
}

void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`,
    timeComplexity: "O(n log n)",
    timeComplexityWorst: "O(n²) - when pivot is always smallest/largest",
    timeComplexityBest: "O(n log n) - when pivot divides array evenly",
    spaceComplexity: "O(log n)",
  },
  "Heap Sort": {
    category: "Sorting",
    introduction:
      "Heap Sort uses a binary heap data structure to sort elements. It builds a max heap, then repeatedly extracts the maximum element and places it at the end.",
    javaCode: `public void heapSort(int[] arr) {
  int n = arr.length;
  for (int i = n / 2 - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (int i = n - 1; i > 0; i--) {
    int temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    heapify(arr, i, 0);
  }
}

private void heapify(int[] arr, int n, int i) {
  int largest = i;
  int left = 2 * i + 1;
  int right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  
  if (largest != i) {
    int temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;
    heapify(arr, n, largest);
  }
}`,
    cppCode: `void heapify(int arr[], int n, int i) {
  int largest = i;
  int left = 2 * i + 1;
  int right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  
  if (largest != i) {
    swap(arr[i], arr[largest]);
    heapify(arr, n, largest);
  }
}

void heapSort(int arr[], int n) {
  for (int i = n / 2 - 1; i >= 0; i--)
    heapify(arr, n, i);
    
  for (int i = n - 1; i > 0; i--) {
    swap(arr[0], arr[i]);
    heapify(arr, i, 0);
  }
}`,
    timeComplexity: "O(n log n)",
    timeComplexityWorst: "O(n log n)",
    timeComplexityBest: "O(n log n)",
    spaceComplexity: "O(1)",
  },

  // Searching Algorithms
  "Linear Search": {
    category: "Searching",
    introduction:
      "Linear Search sequentially checks each element in the list until the target element is found or the list ends. It works on both sorted and unsorted arrays.",
    javaCode: `public int linearSearch(int[] arr, int target) {
  for (int i = 0; i < arr.length; i++) {
    if (arr[i] == target) {
      return i;
    }
  }
  return -1; // not found
}`,
    cppCode: `int linearSearch(int arr[], int n, int target) {
  for (int i = 0; i < n; i++) {
    if (arr[i] == target) {
      return i;
    }
  }
  return -1; // not found
}`,
    timeComplexity: "O(n)",
    timeComplexityWorst: "O(n) - element at end or not present",
    timeComplexityBest: "O(1) - element at beginning",
    spaceComplexity: "O(1)",
  },
  "Binary Search": {
    category: "Searching",
    introduction:
      "Binary Search efficiently finds an element in a sorted array by repeatedly dividing the search space in half. It's much faster than linear search for large datasets.",
    javaCode: `public int binarySearch(int[] arr, int target) {
  int left = 0, right = arr.length - 1;
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1; // not found
}`,
    cppCode: `int binarySearch(int arr[], int n, int target) {
  int left = 0, right = n - 1;
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1; // not found
}`,
    timeComplexity: "O(log n)",
    timeComplexityWorst: "O(log n)",
    timeComplexityBest: "O(1) - element at middle",
    spaceComplexity: "O(1)",
  },
  "Jump Search": {
    category: "Searching",
    introduction:
      "Jump Search works on sorted arrays by jumping ahead by a fixed number of steps and then doing linear search. It's between linear and binary search in complexity.",
    javaCode: `public int jumpSearch(int[] arr, int target) {
  int n = arr.length;
  int step = (int) Math.floor(Math.sqrt(n));
  int prev = 0;
  
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += (int) Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }
  
  while (arr[prev] < target) {
    prev++;
    if (prev == Math.min(step, n)) return -1;
  }
  
  if (arr[prev] == target) return prev;
  return -1;
}`,
    cppCode: `int jumpSearch(int arr[], int n, int target) {
  int step = sqrt(n);
  int prev = 0;
  
  while (arr[min(step, n) - 1] < target) {
    prev = step;
    step += sqrt(n);
    if (prev >= n) return -1;
  }
  
  while (arr[prev] < target) {
    prev++;
    if (prev == min(step, n)) return -1;
  }
  
  if (arr[prev] == target) return prev;
  return -1;
}`,
    timeComplexity: "O(√n)",
    timeComplexityWorst: "O(√n)",
    timeComplexityBest: "O(1)",
    spaceComplexity: "O(1)",
  },
  "Interpolation Search": {
    category: "Searching",
    introduction:
      "Interpolation Search improves binary search by calculating the likely position of the target based on the value being searched. Works best on uniformly distributed data.",
    javaCode: `public int interpolationSearch(int[] arr, int target) {
  int left = 0, right = arr.length - 1;
  
  while (left <= right && target >= arr[left] && target <= arr[right]) {
    int pos = left + (right - left) / (arr[right] - arr[left]) * 
              (target - arr[left]);
    
    if (arr[pos] == target) return pos;
    else if (arr[pos] < target) left = pos + 1;
    else right = pos - 1;
  }
  return -1;
}`,
    cppCode: `int interpolationSearch(int arr[], int n, int target) {
  int left = 0, right = n - 1;
  
  while (left <= right && target >= arr[left] && target <= arr[right]) {
    int pos = left + (right - left) / (arr[right] - arr[left]) * 
              (target - arr[left]);
    
    if (arr[pos] == target) return pos;
    else if (arr[pos] < target) left = pos + 1;
    else right = pos - 1;
  }
  return -1;
}`,
    timeComplexity: "O(log log n)",
    timeComplexityWorst: "O(n) - with non-uniform data",
    timeComplexityBest: "O(1)",
    spaceComplexity: "O(1)",
  },

  // Graph Algorithms
  BFS: {
    category: "Graph",
    introduction:
      "Breadth-First Search explores vertices in layers, visiting all neighbors at the current depth before moving to the next depth. Useful for finding shortest paths in unweighted graphs.",
    javaCode: `public void bfs(Graph g, int start) {
  Queue<Integer> q = new LinkedList<>();
  boolean[] visited = new boolean[g.V];
  
  visited[start] = true;
  q.add(start);
  
  while (!q.isEmpty()) {
    int u = q.poll();
    System.out.print(u + " ");
    
    for (int v : g.adj[u]) {
      if (!visited[v]) {
        visited[v] = true;
        q.add(v);
      }
    }
  }
}`,
    cppCode: `void bfs(Graph& g, int start) {
  queue<int> q;
  vector<bool> visited(g.V, false);
  
  visited[start] = true;
  q.push(start);
  
  while (!q.empty()) {
    int u = q.front();
    q.pop();
    cout << u << " ";
    
    for (int v : g.adj[u]) {
      if (!visited[v]) {
        visited[v] = true;
        q.push(v);
      }
    }
  }
}`,
    timeComplexity: "O(V + E)",
    timeComplexityWorst: "O(V + E)",
    timeComplexityBest: "O(V + E)",
    spaceComplexity: "O(V)",
  },
  DFS: {
    category: "Graph",
    introduction:
      "Depth-First Search explores as far as possible along each branch before backtracking. Useful for cycle detection, topological sorting, and finding connected components.",
    javaCode: `public void dfs(Graph g, int start, boolean[] visited) {
  visited[start] = true;
  System.out.print(start + " ");
  
  for (int v : g.adj[start]) {
    if (!visited[v]) {
      dfs(g, v, visited);
    }
  }
}`,
    cppCode: `void dfs(Graph& g, int start, vector<bool>& visited) {
  visited[start] = true;
  cout << start << " ";
  
  for (int v : g.adj[start]) {
    if (!visited[v]) {
      dfs(g, v, visited);
    }
  }
}`,
    timeComplexity: "O(V + E)",
    timeComplexityWorst: "O(V + E)",
    timeComplexityBest: "O(V + E)",
    spaceComplexity: "O(V)",
  },
  Dijkstra: {
    category: "Graph",
    introduction:
      "Dijkstra's Algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edge weights.",
    javaCode: `public void dijkstra(Graph g, int src) {
  int[] dist = new int[g.V];
  boolean[] spt = new boolean[g.V];
  
  for (int i = 0; i < g.V; i++) dist[i] = Integer.MAX_VALUE;
  dist[src] = 0;
  
  for (int i = 0; i < g.V - 1; i++) {
    int u = findMin(dist, spt);
    spt[u] = true;
    
    for (int v : g.adj[u]) {
      if (!spt[v] && dist[u] != Integer.MAX_VALUE && 
          dist[u] + g.weight[u][v] < dist[v]) {
        dist[v] = dist[u] + g.weight[u][v];
      }
    }
  }
}`,
    cppCode: `void dijkstra(Graph& g, int src) {
  vector<int> dist(g.V, INT_MAX);
  vector<bool> spt(g.V, false);
  
  dist[src] = 0;
  
  for (int i = 0; i < g.V - 1; i++) {
    int u = findMin(dist, spt);
    spt[u] = true;
    
    for (int v : g.adj[u]) {
      if (!spt[v] && dist[u] != INT_MAX && 
          dist[u] + g.weight[u][v] < dist[v]) {
        dist[v] = dist[u] + g.weight[u][v];
      }
    }
  }
}`,
    timeComplexity: "O(V²)",
    timeComplexityWorst: "O(V²) - with adjacency matrix",
    timeComplexityBest: "O((V + E) log V) - with priority queue",
    spaceComplexity: "O(V)",
  },
  "Bellman-Ford": {
    category: "Graph",
    introduction:
      "Bellman-Ford Algorithm finds shortest paths from a source vertex to all other vertices. Unlike Dijkstra, it can handle negative edge weights.",
    javaCode: `public void bellmanFord(Graph g, int src) {
  int[] dist = new int[g.V];
  for (int i = 0; i < g.V; i++) dist[i] = Integer.MAX_VALUE;
  dist[src] = 0;
  
  for (int i = 0; i < g.V - 1; i++) {
    for (Edge e : g.edges) {
      if (dist[e.u] != Integer.MAX_VALUE && 
          dist[e.u] + e.weight < dist[e.v]) {
        dist[e.v] = dist[e.u] + e.weight;
      }
    }
  }
}`,
    cppCode: `void bellmanFord(Graph& g, int src) {
  vector<int> dist(g.V, INT_MAX);
  dist[src] = 0;
  
  for (int i = 0; i < g.V - 1; i++) {
    for (Edge e : g.edges) {
      if (dist[e.u] != INT_MAX && 
          dist[e.u] + e.weight < dist[e.v]) {
        dist[e.v] = dist[e.u] + e.weight;
      }
    }
  }
}`,
    timeComplexity: "O(VE)",
    timeComplexityWorst: "O(VE)",
    timeComplexityBest: "O(VE)",
    spaceComplexity: "O(V)",
  },
  "Kruskal's MST": {
    category: "Graph",
    introduction:
      "Kruskal's Algorithm finds the Minimum Spanning Tree by sorting edges by weight and using Union-Find to avoid cycles. Greedy approach.",
    javaCode: `public void kruskal(Graph g) {
  List<Edge> edges = new ArrayList<>(g.edges);
  Collections.sort(edges, (a, b) -> a.weight - b.weight);
  
  UnionFind uf = new UnionFind(g.V);
  List<Edge> mst = new ArrayList<>();
  
  for (Edge e : edges) {
    if (uf.find(e.u) != uf.find(e.v)) {
      mst.add(e);
      uf.union(e.u, e.v);
    }
  }
}`,
    cppCode: `void kruskal(Graph& g) {
  sort(g.edges.begin(), g.edges.end(), 
       [](Edge a, Edge b) { return a.weight < b.weight; });
  
  UnionFind uf(g.V);
  vector<Edge> mst;
  
  for (Edge e : g.edges) {
    if (uf.find(e.u) != uf.find(e.v)) {
      mst.push_back(e);
      uf.unite(e.u, e.v);
    }
  }
}`,
    timeComplexity: "O(E log E)",
    timeComplexityWorst: "O(E log E)",
    timeComplexityBest: "O(E log E)",
    spaceComplexity: "O(V + E)",
  },

  // Stack & Queue Algorithms
  "Stack Operations": {
    category: "Stack & Queue",
    introduction:
      "Stack is a Last-In-First-Out (LIFO) data structure. Elements are added and removed from the top. Common operations: push, pop, peek.",
    javaCode: `class Stack<T> {
  private List<T> items = new ArrayList<>();
  
  public void push(T item) {
    items.add(item);
  }
  
  public T pop() {
    if (isEmpty()) return null;
    return items.remove(items.size() - 1);
  }
  
  public T peek() {
    if (isEmpty()) return null;
    return items.get(items.size() - 1);
  }
  
  public boolean isEmpty() {
    return items.isEmpty();
  }
}`,
    cppCode: `template<typename T>
class Stack {
  private:
    vector<T> items;
  public:
    void push(T item) { items.push_back(item); }
    T pop() { 
      T temp = items.back(); 
      items.pop_back(); 
      return temp; 
    }
    T peek() { return items.back(); }
    bool isEmpty() { return items.empty(); }
};`,
    timeComplexity: "O(1)",
    timeComplexityWorst: "O(1) - for all operations",
    timeComplexityBest: "O(1)",
    spaceComplexity: "O(n)",
  },
  "Queue Operations": {
    category: "Stack & Queue",
    introduction:
      "Queue is a First-In-First-Out (FIFO) data structure. Elements are added at the rear and removed from the front. Common operations: enqueue, dequeue, peek.",
    javaCode: `class Queue<T> {
  private List<T> items = new ArrayList<>();
  
  public void enqueue(T item) {
    items.add(item);
  }
  
  public T dequeue() {
    if (isEmpty()) return null;
    return items.remove(0);
  }
  
  public T peek() {
    if (isEmpty()) return null;
    return items.get(0);
  }
  
  public boolean isEmpty() {
    return items.isEmpty();
  }
}`,
    cppCode: `template<typename T>
class Queue {
  private:
    deque<T> items;
  public:
    void enqueue(T item) { items.push_back(item); }
    T dequeue() {
      T temp = items.front();
      items.pop_front();
      return temp;
    }
    T peek() { return items.front(); }
    bool isEmpty() { return items.empty(); }
};`,
    timeComplexity: "O(1)",
    timeComplexityWorst: "O(1) - for all operations",
    timeComplexityBest: "O(1)",
    spaceComplexity: "O(n)",
  },
  "Priority Queue": {
    category: "Stack & Queue",
    introduction:
      "Priority Queue is an abstract data structure where elements have associated priorities. Higher priority elements are served before lower priority ones.",
    javaCode: `class PriorityQueue<T extends Comparable<T>> {
  private List<T> items = new ArrayList<>();
  
  public void insert(T item) {
    items.add(item);
    items.sort(Comparable::compareTo);
  }
  
  public T extractMax() {
    if (isEmpty()) return null;
    return items.remove(items.size() - 1);
  }
  
  public boolean isEmpty() {
    return items.isEmpty();
  }
}`,
    cppCode: `template<typename T>
class PriorityQueue {
  private:
    priority_queue<T> pq;
  public:
    void insert(T item) { pq.push(item); }
    T extractMax() {
      T temp = pq.top();
      pq.pop();
      return temp;
    }
    bool isEmpty() { return pq.empty(); }
};`,
    timeComplexity: "O(log n)",
    timeComplexityWorst: "O(n) - insert, O(log n) - extract",
    timeComplexityBest: "O(1)",
    spaceComplexity: "O(n)",
  },
  Deque: {
    category: "Stack & Queue",
    introduction:
      "Double-ended Queue (Deque) allows insertion and deletion from both ends. Combines properties of both stacks and queues.",
    javaCode: `class Deque<T> {
  private List<T> items = new ArrayList<>();
  
  public void insertFront(T item) {
    items.add(0, item);
  }
  
  public void insertRear(T item) {
    items.add(item);
  }
  
  public T deleteFront() {
    return items.isEmpty() ? null : items.remove(0);
  }
  
  public T deleteRear() {
    return items.isEmpty() ? null : items.remove(items.size() - 1);
  }
}`,
    cppCode: `template<typename T>
class Deque {
  private:
    deque<T> items;
  public:
    void insertFront(T item) { items.push_front(item); }
    void insertRear(T item) { items.push_back(item); }
    T deleteFront() {
      T temp = items.front();
      items.pop_front();
      return temp;
    }
    T deleteRear() {
      T temp = items.back();
      items.pop_back();
      return temp;
    }
};`,
    timeComplexity: "O(1)",
    timeComplexityWorst: "O(1) - for all operations",
    timeComplexityBest: "O(1)",
    spaceComplexity: "O(n)",
  },
};
