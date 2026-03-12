# Number Theory Explorer

A comprehensive, interactive educational mobile application designed to explore the fascinating world of number theory. Built with React Native and Expo, this app provides visualizers, calculators, and educational content for a wide range of mathematical concepts.

## 🚀 Features

### 🧩 Core Concepts
- **Divisibility & Primes**: Explore prime numbers with the Sieve of Eratosthenes, factorization, and primality testing.
- **Modular Arithmetic**: Interactive playgrounds for modular addition, multiplication, inverses, and exponentiation.
- **Euclidean Algorithm**: Step-by-step visualizers for finding the Greatest Common Divisor (GCD).
- **Diophantine Equations**: Solve and understand linear Diophantine equations.

### 🔐 Cryptography
- **RSA Algorithm**: Learn the fundamentals of public-key cryptography.
- **Diffie-Hellman Key Exchange**: Visual representation of secure key sharing.
- **Digital Signatures**: Understand how authenticity is verified in the digital world.
- **Hashing**: Explore cryptographic hash functions.

### 🔢 Advanced Topics
- **Chinese Remainder Theorem (CRT)**: Solve systems of congruences.
- **Quadratic Reciprocity**: Dive into the elegant laws of quadratic residues.
- **Continued Fractions**: Discover the representation of real numbers as nested fractions.
- **Primitive Roots**: Find generators for modular groups.

### 🎨 Visualizations & Patterns
- **Ulam Spiral**: Witness the patterns of prime numbers in a 2D grid.
- **Pascal's Triangle**: Explore binomial coefficients and related patterns.
- **Collatz Conjecture**: Track the "hailstone" sequences of any number.
- **Fibonacci Numbers**: Delve into the golden ratio and recursive sequences.
- **Pythagorean Triples**: Generate and visualize right-angled triangle properties.

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Navigation**: [React Navigation](https://reactnavigation.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Localization**: [i18next](https://www.i18next.com/) with `react-i18next`
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn
- Expo Go app on your mobile device (for testing)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/svinod-030/number-theory.git
   cd number-theory
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Run on device**:
   Scan the QR code displayed in the terminal using the Expo Go app (Android) or the Camera app (iOS).

## 📂 Project Structure

- `src/components`: Reusable UI components.
- `src/screens`: Individual screens for each mathematical concept.
- `src/navigation`: Navigation configuration and route definitions.
- `src/store`: State management using Zustand.
- `src/utils`: Helper functions and mathematical algorithms.
- `src/i18n`: Internationalization setup and translation files.

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
