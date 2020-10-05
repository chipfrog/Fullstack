interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
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

const calculateExercises = (a: number[], b: number): Result => {
  const avg = avgTime(a)
  const grade = rating(avg, b)
  const description = feedback(grade)

  return {
    periodLength: a.length,
    trainingDays: aciveDays(a),
    success: avg >= b,
    rating: grade,
    ratingDescription: description,
    target: b,
    average: avg
  }
}

console.log(calculateExercises([1, 1, 1, 0, 1, 1, 0], 2))