import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((error: any, _req: any, res: any, _next: any) => {
  if (error instanceof SyntaxError) {
    res.status(400).send({ error: 'invalid json' });
  }
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    res.send({ height, weight, bmi: calculateBmi(height, weight) });
  } else {
    res.status(400).send({ error: 'invalid parameters' });
  }
});

app.post('/exercises', (req, res) => {
  if (!req.body.daily_exercises || !req.body.target) {
    res.status(400).send({ error: 'parameters missing' });
  } else {
    const parsedDailyExercises = JSON.parse(JSON.stringify(req.body.daily_exercises));
    const target = Number(req.body.target);
    if (!isNaN(target) && Array.isArray(parsedDailyExercises) && parsedDailyExercises.every(value => !isNaN(Number(value)))) {
      const dailyExerciseHours = parsedDailyExercises.map(value => Number(value));
      res.json(calculateExercises(dailyExerciseHours, target));
    } else {
      res.status(400).send({ error: 'invalid parameters' });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});