interface BmiInputs {
  height: number,
  weight: number
}

const parseArguments = (args: Array<string>): BmiInputs => {
  if (args.length < 4) throw new Error('Not enough input values')
  if (args.length > 4) throw new Error('Too many input values')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Input values were not numbers!')
  }
}

const calculateBmi = (a: number, b: number) => {
  const bmi = b / ((a/100) ** 2)
  if (bmi < 18.5) {
    console.log("Underweight")
  }
  else if (18.5 <= bmi && bmi <= 25) {
    console.log("Normal (healthy weight)")   
  }
  else if (25 <= bmi && bmi <= 30) {
    console.log("Overweight")
  }
  else if (bmi > 30) {
    console.log("Obese")
  }
}

try {
  const { height, weight } = parseArguments(process.argv)
  calculateBmi(height, weight)
} catch (error) {
  console.log('Error, something went wrong, message: ', error.message)
}