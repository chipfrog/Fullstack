interface BmiInputs {
  height: number,
  weight: number
}

const parseArguments = (args: Array<string>): BmiInputs => {
  if (args.length < 4) throw new Error('Not enough input values');
  if (args.length > 4) throw new Error('Too many input values');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Input values were not numbers!');
  }
};

const calculateBmi = (a: number, b: number) => {
  const bmi = b / ((a/100) ** 2);
  if (bmi < 18.5) {
    return "Underweight";
  }
  else if (18.5 <= bmi && bmi <= 25) {
    return "Normal (healthy weight)";   
  }
  else if (25 <= bmi && bmi <= 30) {
    return "Overweight";
  }
  else if (bmi > 30) {
    return "Obese";
  }
  else {
    return "Error";
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  console.log('Error, something went wrong, message: ', (error as Error).message);
}

export const calculateBmiForWeb = (height : number, weight : number): string => {
  return calculateBmi(height, weight);
};