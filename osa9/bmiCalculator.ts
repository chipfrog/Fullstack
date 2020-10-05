const calculateBmi = (a: number, b: number): string => {
  const bmi = b / ((a/100) ** 2)

  if (bmi < 18.5) {
    console.log(bmi)
    return "Underweight"
  }
  else if (18.5 <= bmi && bmi <= 25) {
    console.log(bmi)
    return "Normal (healthy weight)"
  }
  else if (25 <= bmi && bmi <= 30) {
    console.log(bmi)
    return "Overweight"
  }
  else if (bmi > 30) {
    console.log(bmi)
    return "Obese"
  }
}

console.log(calculateBmi(180, 74))
console.log(calculateBmi(200, 45))
console.log(calculateBmi(180, 95))
console.log(calculateBmi(150,100))