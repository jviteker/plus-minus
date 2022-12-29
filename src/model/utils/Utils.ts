export type Int = number & { __int__: void };

const toInt = (input: number): Int => {
    return Math.round(input) as Int;
};

export class Utils {
    static randomInt = (min: number = 1, max: number = 10): Int => {
        const range = max - min + 1;

        const value = (Math.floor(Math.random() * range) + min);
        return toInt(value);
    };

    static randomString = (length: number = 6) => {
        return [...Array(length)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
    };
}
