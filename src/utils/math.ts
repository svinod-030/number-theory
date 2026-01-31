/**
 * Computes the Greatest Common Divisor (GCD) of two numbers using the Euclidean Algorithm.
 * Returns both the result and the steps taken.
 */
export function getGCDWithSteps(a: number, b: number): { gcd: number; steps: string[] } {
    if (isNaN(a) || isNaN(b)) return { gcd: 1, steps: ['Invalid input'] };

    let x = Math.abs(Math.round(a));
    let y = Math.abs(Math.round(b));
    const steps: string[] = [];

    if (x === 0 && y === 0) return { gcd: 0, steps: ['GCD(0,0) is undefined'] };
    if (x === 0) return { gcd: y, steps: [`GCD(0,${y}) = ${y}`] };
    if (y === 0) return { gcd: x, steps: [`GCD(${x},0) = ${x}`] };

    if (x < y) {
        [x, y] = [y, x];
    }

    while (y !== 0 && !isNaN(y)) {
        const remainder = x % y;
        const quotient = Math.floor(x / y);
        steps.push(`${x} = ${y} × ${quotient} + ${remainder}`);
        x = y;
        y = remainder;
    }

    return { gcd: x, steps };
}

/**
 * Checks if a number is prime.
 */
export function isPrime(n: number): boolean {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

/**
 * Generates prime factors of a number.
 */
export function getPrimeFactors(n: number): number[] {
    let d = 2;
    const factors: number[] = [];
    let temp = Math.abs(n);

    while (temp >= d * d) {
        if (temp % d === 0) {
            factors.push(d);
            temp /= d;
        } else {
            d++;
        }
    }
    if (temp > 1) {
        factors.push(temp);
    }
    return factors;
}
/**
 * Generates coordinates for a square spiral (Ulam Spiral).
 * Returns array of {x, y, n, isPrime}
 */
export function getUlamSpiral(size: number): { x: number; y: number; n: number; isPrime: boolean }[] {
    const points = [];
    let x = 0;
    let y = 0;
    let dx = 0;
    let dy = -1;
    let step = 1;
    let segmentLength = 1;
    let segmentPassed = 0;

    for (let n = 1; n <= size; n++) {
        points.push({ x, y, n, isPrime: isPrime(n) });

        if (segmentPassed < segmentLength) {
            x += dx;
            y += dy;
            segmentPassed++;
        }

        if (segmentPassed === segmentLength) {
            segmentPassed = 0;
            // Turn left
            const temp = dx;
            dx = -dy;
            dy = temp;

            if (dy === 0) {
                segmentLength++;
            }
        }
    }
    return points;
}

export interface FactorNode {
    value: number;
    left?: FactorNode;
    right?: FactorNode;
    isPrime: boolean;
}

/**
 * Generates a recursive factor tree structure for a number.
 */
export function getFactorTree(n: number): FactorNode {
    const val = Math.abs(n);
    const isP = isPrime(val);
    if (isP || val <= 1) {
        return { value: val, isPrime: isP };
    }

    // Find the smallest factor to start the split
    let d = 2;
    while (val % d !== 0) {
        d++;
    }

    return {
        value: val,
        isPrime: false,
        left: { value: d, isPrime: isPrime(d) },
        right: getFactorTree(val / d)
    };
}

/**
 * Computes the Least Common Multiple (LCM) of two numbers.
 */
export function getLCM(a: number, b: number): number {
    if (a === 0 || b === 0) return 0;
    const { gcd } = getGCDWithSteps(a, b);
    return Math.abs(a * b) / gcd;
}

/**
 * Generates the first n Fibonacci numbers.
 */
export function getFibonacciSequence(n: number): number[] {
    if (n <= 0) return [];
    if (n === 1) return [0];
    const seq = [0, 1];
    for (let i = 2; i < n; i++) {
        seq.push(seq[i - 1] + seq[i - 2]);
    }
    return seq;
}

export interface FibonacciRect {
    x: number;
    y: number;
    size: number;
    direction: number; // 0: Right, 1: Down, 2: Left, 3: Up
    value: number;
}

/**
 * Computes coordinates for Fibonacci squares in a spiral.
 */
export function getFibonacciRects(n: number): FibonacciRect[] {
    const seq = getFibonacciSequence(n + 1).slice(1); // 1, 1, 2, 3, 5, 8...
    const rects: FibonacciRect[] = [];

    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;

    for (let i = 0; i < seq.length; i++) {
        const size = seq[i];
        const dir = i % 4;

        let rectX = 0;
        let rectY = 0;

        if (i === 0) {
            rectX = 0;
            rectY = 0;
            minX = 0;
            maxX = 1;
            minY = 0;
            maxY = 1;
        } else {
            // Adjust directions based on standard clockwise spiral
            // 1: Right, 2: Down, 3: Left, 0: Up
            if (dir === 1) { // Right
                rectX = maxX;
                rectY = minY;
                maxX += size;
            } else if (dir === 2) { // Down
                rectX = minX;
                rectY = maxY;
                maxY += size;
            } else if (dir === 3) { // Left
                rectX = minX - size;
                rectY = minY;
                minX -= size;
            } else if (dir === 0) { // Up
                rectX = minX;
                rectY = minY - size;
                minY -= size;
            }
        }

        rects.push({ x: rectX, y: rectY, size, direction: dir, value: size });
    }

    return rects;
}

/**
 * Calculates Euler's Totient Function phi(n).
 */
export function getTotient(n: number): number {
    if (n === 0) return 0;
    let result = n;
    let temp = Math.abs(n);

    for (let i = 2; i * i <= temp; i++) {
        if (temp % i === 0) {
            while (temp % i === 0) {
                temp /= i;
            }
            result -= result / i;
        }
    }
    if (temp > 1) {
        result -= result / temp;
    }
    return Math.round(result);
}

/**
 * Returns a list of numbers up to n that are relatively prime to n.
 */
export function getCoprimes(n: number): number[] {
    const coprimes = [];
    for (let i = 1; i <= n; i++) {
        let a = n;
        let b = i;
        while (b) {
            a %= b;
            [a, b] = [b, a];
        }
        if (a === 1) coprimes.push(i);
    }
    return coprimes;
}

/**
 * Generates Pascal's Triangle up to a certain number of rows.
 */
export function getPascalTriangle(rows: number): number[][] {
    const triangle: number[][] = [];
    for (let i = 0; i < rows; i++) {
        triangle[i] = new Array(i + 1);
        triangle[i][0] = 1;
        triangle[i][i] = 1;
        for (let j = 1; j < i; j++) {
            triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
        }
    }
    return triangle;
}

/**
 * Computes the combination nCr.
 */
export function combinations(n: number, r: number): number {
    if (r < 0 || r > n) return 0;
    if (r === 0 || r === n) return 1;
    if (r > n / 2) r = n - r;

    let res = 1;
    for (let i = 1; i <= r; i++) {
        res = (res * (n - i + 1)) / i;
    }
    return Math.round(res);
}
