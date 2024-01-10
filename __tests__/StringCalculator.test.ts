
import NegativeNumberException from "../src/NegativeNumberException.js";
import StringCalculator from "../src/StringCalculator.js";

describe('Testing Add method of String Calculator', () => {
  const stringCalculator = new StringCalculator();

  it('Test 1a: A string "" must return 0', () => {
    expect(stringCalculator.add("")).toBe(0);
  });

  it('Test 1b: A string "1" must return 1', () => {
    expect(stringCalculator.add("1")).toBe(1);
  });

  it('Test 1c: A string "1,2" must return 3', () => {
    expect(stringCalculator.add("1,2")).toBe(3);
  });

  it('Test 2: Passing a random set of comma separated numbers, the add method must return the sum of them', () => {
    const generatedNumbersList = [];
    let sum = 0;
    const numbersCount = Math.floor(Math.random() * 100) + 1;
    for (let i = 0; i < numbersCount; i++) {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      generatedNumbersList.push(randomNumber);
      sum += randomNumber;
    }
    expect(stringCalculator.add(generatedNumbersList.join(','))).toBe(sum);
  });

  it('Test 3: Passing one or more negative comma separated numbers, the add method must throw an exception with the list of them', () => {
    const generatedNumbersList = [];

    const numbersCount = Math.floor(Math.random() * 100) + 1;
    for (let i = 0; i < numbersCount; i++) {
      const randomNumber = Math.floor(Math.random() * 200) - 100;
      generatedNumbersList.push(randomNumber);
    }

    const negativeNumberList = generatedNumbersList.filter(a => a < 0);

    try {
      expect(() => stringCalculator.add(generatedNumbersList.join(','))).toThrow(NegativeNumberException);
      stringCalculator.add(generatedNumbersList.join(','));
      fail("Add method must fail");
    } catch (error) {
      expect(error.message).toBe(negativeNumberList.join(','));
    }
  });

  it('Test 4: Passing a list containing numbers greater than 1000 in the add method, should return ', () => {
    expect(stringCalculator.add("1000,2")).toBe(2);
  });

  it('Test 5: Passing a delimiter "//[***]//1***2***3", should return 6', () => {
    expect(stringCalculator.add("//[***]//1***2***3")).toBe(6);
  });

  it('Test 6: Passing multiple delimiters "//[*][%]//1*2%3", should return 6', () => {
    expect(stringCalculator.add("//[*][%]//1*2%3")).toBe(6);
  });

  it('Test 7: Passing multiple delimiters with length longer than one "//[***][%][pippo]//1***2%3pippo4", should return 10', () => {
    expect(stringCalculator.add("//[***][%][pippo]//1***2%3pippo4")).toBe(10);
  });
});
