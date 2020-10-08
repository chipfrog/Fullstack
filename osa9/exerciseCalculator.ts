interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface InputValues {
  target: number,
  trainingHours: number[]
}

const parseArgumentsForExercises = (args: Array<string>): InputValues => {
  if (args.length < 4) throw new Error('Not enough input values')
  for (let i = 2; i < args.length; i ++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Some input values were not numbers!')
    }
  }
  const cloneArray = args.slice()
  cloneArray.splice(0, 3)
  return {
    target: Number(args[2]),
    trainingHours: cloneArray.map(Number)
  }
}

const calculateExercises = (target: number, trainingHours: number[]): Result => {
  const avg = avgTime(trainingHours)
  const grade = rating(avg, target)
  const description = feedback(grade)

  return {
    periodLength: trainingHours.length,
    trainingDays: aciveDays(trainingHours),
    success: avg >= target,
    rating: grade,
    ratingDescription: description,
    target: target,
    average: avg
  }
}

const aciveDays = (a: number[]) => {
  const list = [...a]
  for (let i = 0; i < list.length; i ++) {
    if (list[i] === 0) {
      list.splice(i, 1)
      i --
    }
  }
  return list.length
}

const avgTime = (a: number[]) => {
  let timeTotal = 0
  for (let i = 0; i < a.length; i ++) {
    timeTotal += a[i]
  }
  return timeTotal / a.length
}

const rating = (result: number, target: number) => {
  if (result >= target) {
    return 3
  }
  else if ((result / target) >= 0.5) {
    return 2
  }
  return 1
}

const feedback = (grade: number) => {
  if (grade === 3) {
    return "Great job! You achieved your goal!"
  }
  else if (grade === 2) {
    return "Good job but you still got room to improve!"
  }
  return "What was that? Get your act together!"
}

try {
  const { target, trainingHours } = parseArgumentsForExercises(process.argv)
  console.log(calculateExercises(target, trainingHours))
} catch (error) {
  console.log('Error, something went wrong, message: ', error.message)
}