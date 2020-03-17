interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface CalculateExercisesParams {
  target: number;
  dailyExerciseHours: Array<number>;
}

export const calculateExercises = (dailyExerciseHours: Array<number>, target: number): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours
      .reduce((total, curr) => curr === 0 ? total : total + 1, 0);

  const average = dailyExerciseHours
      .reduce((total, curr) => total + curr, 0) / periodLength;

  const success = (average >= target);
  const rating = success ? 3 : (average >= (0.8 * target)) ? 2 : 1;
  const ratingDescription = (rating === 3) ? 'excellent' : (rating === 2) ? 'average' : 'poor';

  return {
    periodLength, trainingDays, success, rating, ratingDescription, target, average
  };
};

const parseCalculateExercisesArguments = (args: Array<string>): CalculateExercisesParams => {
  if (args.length < 4) throw new Error('not enough arguments');

  if (args.every((element, index) => index < 2 || !isNaN(Number(element)))) {
    const target = Number(process.argv[2]);
    const dailyExerciseHours = process.argv.slice(3, process.argv.length)
                                           .map(value => Number(value));

    return { target, dailyExerciseHours };
  } else {
    throw new Error('provided values were not numbers');
  }
};

try {
  const { target, dailyExerciseHours } = parseCalculateExercisesArguments(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (e) {
  console.log('Error:', e.message);
}
