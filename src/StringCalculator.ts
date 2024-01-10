import NegativeNumberException from "./NegativeNumberException.js";

export default class StringCalculator {

    public add(numbers: string): number {
        //[*][%][%][*]['][.]//1*2%3
        let delimiters = [","];
        if (numbers.startsWith("//[")) {
            const endOfDelimiter = numbers.indexOf("]//");
            const delimiterString = numbers.substring(3, endOfDelimiter); //  *][%][%][*]['][.
            delimiters = delimiterString.split(']['); // ['*','%' ...]

            numbers = numbers.substring(endOfDelimiter + 3);
        }
        const numbersList = numbers.split(new RegExp("(" + delimiters.join('|').replaceAll('*', '\\*') + ")")); // (*|%|% ...)
        const intNumberList = numbersList.map(a => Number(a));
        const negativeNumberList = intNumberList.filter(a => a < 0);
        if (negativeNumberList.length > 0) {
            throw new NegativeNumberException(negativeNumberList.join(','));
        }
        return intNumberList.filter(a => a < 1000).reduce((a, b) => a + b);
    };
};
