# Number Theory

A premium mobile application for exploring and visualizing fundamental concepts in Number Theory. Built with Expo and React Native, featuring a modern, dark-themed UI.

## 🚀 Features

The application is structured around core Number Theory concepts:

### Prime Numbers
*   **Ulam Spiral**: Visualize the distribution of prime numbers in a square spiral, revealing mysterious diagonal patterns.
*   **Primality Testing**: Efficiently check if a number is prime and discover its prime factors.

### Modular Arithmetic
*   **Modular Playground**: Visualize multiplication orbits in modular arithmetic through beautiful geometric patterns.
*   **Modular Utilities**: Perform modular inversions and other congruence calculations.

### Divisibility & Algorithms
*   **Number Theory Toolbox**: A collection of utilities including:
    *   Euclidean Algorithm (GCD/LCM) with step-by-step visualization.
    *   Prime Factorization.

For a full list of mathematical concepts planned for this app, see the [Concepts Roadmap](docs/CONCEPTS.md).

---

## 🛠 Tech Stack

*   **Framework**: [Expo](https://expo.dev/) (SDK 54)
*   **Platform**: React Native
*   **Styling**: [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS for React Native)
*   **Animations**: React Native Reanimated v4
*   **Navigation**: React Navigation v7
*   **Icons**: FontAwesome & Ionicons via `@expo/vector-icons`

---

## 📦 Getting Started

### Prerequisites
*   Node.js (LTS)
*   npm or yarn
*   Android Studio / Xcode (for native development builds)

### Installation
1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd number-theory
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App
Since the app uses experimental features like **Reanimated v4**, it requires a **Development Build**:

*   **Android**:
    ```bash
    npx expo run:android
    ```
*   **iOS**:
    ```bash
    npx expo run:ios
    ```

---

## 🎨 Design & Assets
The app features a premium dark theme (`slate-950`) with high-quality visual assets:
*   **Brand Icon**: A custom-designed golden Sigma (Σ) with a Fibonacci spiral.
*   **Splash Screen**: Optimized for high-resolution displays with a matching dark aesthetic.

---

## 📝 Configuration Notes
*   **Metro**: Configured with `withNativeWind` for CSS processing.
*   **Babel**: Optimized for NativeWind and Reanimated plugins.
*   **Worklets**: Requires `react-native-worklets-core` for Reanimated v4 functionality.
