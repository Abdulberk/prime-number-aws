import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import expressAsyncHandler from 'express-async-handler';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

const isPrime = async (n: number): Promise<boolean> => {
  if (n <= 2) return n === 2;
  if (n % 2 === 0) return false;

  const limit = Math.sqrt(n);
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return false;
  }

  return true;
};

const getNextPrime = async (currentPrime: number): Promise<number> => {
  let nextNum = currentPrime + 1;
  while (true) {
    if (await isPrime(nextNum)) return nextNum;
    nextNum++;
  }
};

let currentPrime = 3487961;

app.get('/next_prime', expressAsyncHandler(async (req: Request, res: Response) => {


  const nextPrimeNumber = await getNextPrime(currentPrime);
  if (nextPrimeNumber > 10000000) {
    currentPrime = 2;
  } else {
    currentPrime = nextPrimeNumber;
  }


  res.status(200).json({ next_prime: nextPrimeNumber });
}));




app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
