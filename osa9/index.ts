import express from 'express'
import { calculateBmiForWeb } from './bmiCalculator'

const app = express()

app.get('/hello', (_req: Express.Request, res: express.Response) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req: express.Request, res: express.Response) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (isNaN(height) || isNaN(weight) || height === 0 || weight === 0) {
    return res.status(400).send({ error: 'malformatted parameters' })
  }
  
  else {
    const bmi = calculateBmiForWeb(Number(req.query.height), Number(req.query.weight))

    const result = {
      weight: weight,
      height: height,
      bmi: bmi
    }
    return res.send(result)
  }  
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})