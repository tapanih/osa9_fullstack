interface CalculateBmiParams {
  height: number,
  weight: number
}

const calculateBmi = (height: number, weight: number) : string => {
  const heightInMeters = 0.01 * height;
  const BMI = weight / (heightInMeters * heightInMeters);

  if (BMI < 15) {
      return "Very severely underweight";
  } else if (BMI < 16) {
      return "Severely underweight";
  } else if (BMI < 18.5) {
      return "Underweight";
  } else if (BMI < 25) {
      return "Normal (healthy weight)";
  } else if (BMI < 30) {
      return "Overweight";
  } else if (BMI < 35) {
      return "Obese Class I (Moderately obese)";
  } else if (BMI < 40) {
      return "Obese Class II (Severely obese)";
  } else {
      return "Obese Class III (Very severely obese)";
  }
}

const parseCalculateBmiArguments = (args: Array<string>) : CalculateBmiParams => {
  if (args.length < 4) throw new Error('not enough arguments');
  if (args.length > 4) throw new Error('too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('provided values were not numbers');
  }
}

try {
  const { height, weight } = parseCalculateBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error:', e.message);
}
