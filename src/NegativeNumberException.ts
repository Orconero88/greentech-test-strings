export default class NegativeNumberException implements Error {
    name: string;
    message: string;

    constructor(message: string) {
        this.message = message
        this.name = 'Negatives not allowed';
    }

};