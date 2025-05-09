import dataModel from '../models/dataModel.js';

export const detailbydate = async (req, res) => {
//   const mode = req.query.mode;
  const start = req.query.start;
  const end = req.query.end;

  if (!start || !end) {
    return res
      .status(400)
      .json({ error: 'Missing required query params: start and end (yyyy-mm-dd).' });
  }

  try {
    const orders = await dataModel.findByDate(start, end);
    return res.json(orders);
  } catch (err) {
    console.error('Error fetching return orders:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
