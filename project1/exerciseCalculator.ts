interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyExerciseHours: Array<number>, target: number) : Result => {
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
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));