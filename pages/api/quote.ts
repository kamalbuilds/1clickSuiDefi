// api/quote.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { abc } = req.body;

  try {
    const response = await axios.post(`https://api.defi.fi/v1/swap/simulate?offer_address=${offer_address}&ask_address=${ask_address}&units=${units}&slippage_tolerance=${slippage_tolerance}`, {
      abc
    });

    console.log(response.data,"data here ")

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
