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

/**
 * Generates the coefficients of the continued fraction representation of a/b.
 */
export function getContinuedFraction(a: number, b: number): number[] {
    let x = Math.abs(a);
    let y = Math.abs(b);
    if (y === 0) return [];

    const coefficients: number[] = [];
    while (y !== 0) {
        const quotient = Math.floor(x / y);
        coefficients.push(quotient);
        const remainder = x % y;
        x = y;
        y = remainder;
    }
    return coefficients;
}

/**
 * Calculates a sequence of powers of a modulo n: a^1, a^2, ... mod n
 * Returns the sequence until it hits 1 or repeats.
 */
export function getPowerResidues(a: number, n: number): number[] {
    if (n <= 1) return [];
    const residues: number[] = [];
    let current = a % n;
    const seen = new Set<number>();

    while (current > 0 && !seen.has(current)) {
        residues.push(current);
        if (current === 1) break;
        seen.add(current);
        current = (current * a) % n;
    }

    return residues;
}

/**
 * Checks if a is a primitive root modulo n.
 */
export function isPrimitiveRoot(a: number, n: number): boolean {
    if (n <= 1) return false;
    const phi = getTotient(n);
    const residues = getPowerResidues(a, n);
    // a is a primitive root if its order is phi(n)
    // and all residues are coprime to n
    return residues.length === phi && residues.every(r => {
        let x = n, y = r;
        while (y) { x %= y;[x, y] = [y, x]; }
        return x === 1;
    });
}

/**
 * Returns all primitive roots modulo n.
 */
export function getPrimitiveRoots(n: number): number[] {
    const roots: number[] = [];
    for (let a = 2; a < n; a++) {
        if (isPrimitiveRoot(a, n)) {
            roots.push(a);
        }
    }
    return roots;
}

/**
 * Returns all divisors of n.
 */
export function getDivisors(n: number): number[] {
    const val = Math.abs(n);
    if (val === 0) return [];
    if (val === 1) return [1];

    const divisors: number[] = [];
    for (let i = 1; i * i <= val; i++) {
        if (val % i === 0) {
            divisors.push(i);
            if (i * i !== val) {
                divisors.push(val / i);
            }
        }
    }
    return divisors.sort((a, b) => a - b);
}

export type NumberClassification = 'Perfect' | 'Abundant' | 'Deficient';

/**
 * Classifies a number based on the sum of its proper divisors.
 */
export function getNumberClassification(n: number): {
    classification: NumberClassification;
    sum: number;
    properDivisors: number[]
} {
    const divisors = getDivisors(n);
    const properDivisors = divisors.filter(d => d < n);
    const sum = properDivisors.reduce((acc, curr) => acc + curr, 0);

    let classification: NumberClassification = 'Deficient';
    if (sum === n && n !== 0) {
        classification = 'Perfect';
    } else if (sum > n) {
        classification = 'Abundant';
    }

    return { classification, sum, properDivisors };
}

/**
 * Extended Euclidean Algorithm.
 * Finds x, y such that ax + by = gcd(a, b).
 */
export function extendedGCD(a: number, b: number): { gcd: number; x: number; y: number } {
    if (b === 0) {
        return { gcd: a, x: 1, y: 0 };
    }
    const { gcd, x: x1, y: y1 } = extendedGCD(b, a % b);
    const x = y1;
    const y = x1 - Math.floor(a / b) * y1;
    return { gcd, x, y };
}

export interface ExtendedGCDStep {
    a: number;
    b: number;
    q: number;
    r: number;
    x: number;
    y: number;
}

/**
 * Extended Euclidean Algorithm with steps.
 */
export function extendedGCDWithSteps(a: number, b: number): {
    gcd: number;
    x: number;
    y: number;
    steps: ExtendedGCDStep[]
} {
    let old_r = a, r = b;
    let old_s = 1, s = 0;
    let old_t = 0, t = 1;

    const steps: ExtendedGCDStep[] = [];

    while (r !== 0) {
        const quotient = Math.floor(old_r / r);
        const next_r = old_r - quotient * r;
        const next_s = old_s - quotient * s;
        const next_t = old_t - quotient * t;

        steps.push({ a: old_r, b: r, q: quotient, r: next_r, x: old_s, y: old_t });

        old_r = r;
        r = next_r;
        old_s = s;
        s = next_s;
        old_t = t;
        t = next_t;
    }

    // Final step
    steps.push({ a: old_r, b: 0, q: 0, r: 0, x: old_s, y: old_t });

    return { gcd: old_r, x: old_s, y: old_t, steps };
}

/**
 * Computes the modular multiplicative inverse of a modulo m.
 */
export function getModularInverse(a: number, m: number): number | null {
    const { gcd, x } = extendedGCD(a, m);
    if (gcd !== 1) return null; // Inverse doesn't exist
    return ((x % m) + m) % m;
}

/**
 * Computes (base^exp) % mod efficiently.
 */
export function powerMod(base: number, exp: number, mod: number): number {
    if (mod === 1) return 0;
    let res = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 === 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp = Math.floor(exp / 2);
    }
    return res;
}

/**
 * Checks if a set of numbers are pairwise coprime.
 */
export function arePairwiseCoprime(numbers: number[]): boolean {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            const { gcd } = getGCDWithSteps(numbers[i], numbers[j]);
            if (gcd !== 1) return false;
        }
    }
    return true;
}

export interface CRTResult {
    x: number;
    N: number;
    steps: {
        ni: number;
        ai: number;
        Mi: number;
        yi: number;
    }[];
}

/**
 * Solves a system of congruences using the Chinese Remainder Theorem.
 * x ≡ ai (mod ni)
 */
export function solveCRT(remainders: number[], moduli: number[]): CRTResult | null {
    if (remainders.length !== moduli.length || remainders.length === 0) return null;
    if (!arePairwiseCoprime(moduli)) return null;

    const N = moduli.reduce((acc, curr) => acc * curr, 1);
    const steps = [];
    let x = 0;

    for (let i = 0; i < moduli.length; i++) {
        const ni = moduli[i];
        const ai = remainders[i];
        const Mi = N / ni;
        const yi = getModularInverse(Mi, ni);

        if (yi === null) return null; // Should not happen if coprime

        steps.push({ ni, ai, Mi, yi });
        x = (x + ai * Mi * yi) % N;
    }

    return { x: (x + N) % N, N, steps };
}

/**
 * Calculates the Legendre Symbol (a/p) where p is an odd prime.
 * Returns 1 if a is a quadratic residue mod p, -1 if it's a non-residue, 0 if p|a.
 */
export function legendreSymbol(a: number, p: number): number {
    if (p < 2) return 0;
    const res = powerMod(a, (p - 1) / 2, p);
    return res > 1 ? -1 : res;
}

/**
 * Calculates the Jacobi Symbol (a/n) where n is any odd positive integer.
 */
export function jacobiSymbol(a: number, n: number): number {
    if (n <= 0 || n % 2 === 0) return 0;
    a = a % n;
    if (a < 0) a += n;
    if (a === 0) return 0;
    if (a === 1) return 1;

    let t = 1;
    while (a !== 0) {
        while (a % 2 === 0) {
            a /= 2;
            const r = n % 8;
            if (r === 3 || r === 5) t = -t;
        }
        [a, n] = [n, a];
        if (a % 4 === 3 && n % 4 === 3) t = -t;
        a %= n;
    }
    return n === 1 ? t : 0;
}

/**
 * Solves a linear Diophantine equation ax + by = c.
 * Returns a particular solution (x0, y0) and the steps to generate the general solution.
 */
export function solveLinearDiophantine(a: number, b: number, c: number): {
    x0: number,
    y0: number,
    g: number,
    possible: boolean,
    stepX: number,
    stepY: number
} | null {
    if (a === 0 && b === 0) return null;

    const { gcd: g, x: x_g, y: y_g } = extendedGCD(a, b);

    if (c % g !== 0) {
        return { x0: 0, y0: 0, g, possible: false, stepX: 0, stepY: 0 };
    }

    const x0 = x_g * (c / g);
    const y0 = y_g * (c / g);
    const stepX = b / g;
    const stepY = a / g;

    return { x0, y0, g, possible: true, stepX, stepY };
}
