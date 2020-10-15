import express from 'express';
import { calculateBmiForWeb } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

interface ReqType {
  "daily_exercises": number[],
  "target": number
}

const app = express();
app.use(express.json());

app.get('/hello', (_req: Express.Request, res: express.Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: express.Request, res: express.Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) ||height === 0 ||weight === 0) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }
  else {
    const bmi = calculateBmiForWeb(Number(req.query.height), Number(req.query.weight));
    const result = {
      weight: weight,
      height: height,
      bmi: bmi
    };
    return res.send(result);
  }  
});

const includesStrings = (daily_exercises: number[]) => {
  for (let i = 0; i < daily_exercises.length; i ++) {
    if (isNaN(daily_exercises[i]) ||daily_exercises[i].toString() === "") {
      return true;
    }
  }
  return false;
};

app.post('/exercises', (req: express.Request, res: express.Response) => {
  const body = req.body as ReqType;
  const target = body.target;
  const daily_exercises = body.daily_exercises;

  if (target === undefined || daily_exercises === undefined) {
    return res.status(400).send({ error: 'parameters missing' });
  }
  else if (isNaN(target) || target.toString() === "" || !Array.isArray(daily_exercises) 
  || daily_exercises.length === 0 ||includesStrings(daily_exercises)) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }
  const result = calculateExercises(target, daily_exercises);
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});