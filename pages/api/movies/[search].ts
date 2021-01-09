import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { search },
  } = req;

  axios
    .get(`https://www.omdbapi.com/?s=${search}&apikey=${process.env.API_KEY}`)
    .then((result) => {
      console.log(result.data);
      res.statusCode = 200;
      res.json(result.data);
    })
    .catch((err) => {
      res.statusCode = 400;
      res.send(err);
    });
};
