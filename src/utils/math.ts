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
