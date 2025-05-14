import { connectDB } from '../config/db.js';

export const findByDate = async (start, end) => {
  const db = await connectDB();

  const col = db.collection('return_orders'); 
  // parse start / end, make end go to end of day
  const startDate = new Date(start);
  const endDate = new Date(end);
  endDate.setHours(23, 59, 59, 999);

  const docs = await col
    .find({
      return_time: { 
        $gte: startDate,
        $lte: endDate
      }
    })
    .toArray();

  // convert ObjectId to string (optional) and dates to ISO
  return docs.map(doc => {
    // Helper to format to "YYYY-MM-DDTHH:mm:ss.000+00:00"
    const fmt = d => {
        const pad = n => n.toString().padStart(2, '0');
      
        const year   = d.getFullYear();
        const month  = pad(d.getMonth() + 1);
        const day    = pad(d.getDate());
        const hour   = pad(d.getHours());
        const minute = pad(d.getMinutes());
        const second = pad(d.getSeconds());
      
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      };

    return {
      id: doc._id.toString(),
      asin: doc.asin,
      customerComment: doc.comments,
      disposition: doc.disposition,
      lpn: doc.lpn,
      manage_center: doc.manage_center,
      ncx_rate: doc.ncx_rate,
      orderNumber: doc.order_number,
      // format purchase_time and return_time
      purchaseDate: fmt(new Date(doc.purchase_time)),
      removal_id: doc.removal_id,
      return_rate: doc.return_rate,
      returnReason: doc.return_reason,
      status: doc.return_status,
      returnDate: fmt(new Date(doc.return_time)),
      serialNumber: doc.sn
    };
  });
};

export default {
  findByDate,
};
