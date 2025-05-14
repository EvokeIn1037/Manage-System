import { connectDB } from '../config/db.js';

const test_map = new Map([
  [0, "Body Dirty"],
  [1, "Body Missing Parts"],
  [2, "Body Surface Defect"],
  [10000, "Power not On"],
  [10001, "Power not Off"],
  [10100, "LED Power: Flash Red and Green"],
  [10101, "LED Power: Flash Solid Red"],
  [10200, "Power not Charging"],
  [10201, "Power Charging Slow"],
  [10300, "SE Plus Power Charging Tip Dirty"],
  [10301, "SE Plus Power Charging Tip Broken"],
  [20000, "Solar Panel Surface Defect"],
  [30000, "LED Left Red Off"],
  [30001, "LED Left Green Off"],
  [30100, "LED Right Red Off"],
  [30101, "LED Right Green Off"],
  [40000, "Front Motor Power On but not Spin"],
  [40001, "Front Motor Noisy or Shaking"],
  [40002, "Front Motor Twitching"],
  [40003, "Front Motor Spin then Stop"],
  [40004, "Front Motor Stuck"],
  [40005, "Front Motor Broken Plastic Parts"],
  [40100, "Rear Right Motor Power On but not Spin"],
  [40101, "Rear Right Motor Noisy or Shaking"],
  [40102, "Rear Right Motor Twitching"],
  [40103, "Rear Right Motor Spin then Stop"],
  [40104, "Rear Right Motor Stuck"],
  [40105, "Rear Right Motor Broken Plastic Parts"],
  [40200, "Rear Left Motor Power On but not Spin"],
  [40201, "Rear Left Motor Noisy or Shaking"],
  [40202, "Rear Left Motor Twitching"],
  [40203, "Rear Left Motor Spin then Stop"],
  [40204, "Rear Left Motor Stuck"],
  [40205, "Rear Left Motor Broken Plastic Parts"],
  [50000, "Ultrasound Right No Reading"],
  [50001, "Ultrasound Right Unstable Reading"],
  [50100, "Ultrasound Left No Reading"],
  [50101, "Ultrasound Left Unstable Reading"],
  [60000, "Angular Velocity No Reading"],
  [60001, "Angular Velocity Unstable Reading"]
]);

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

  const doc_info = await Promise.all(docs.map(async doc => {
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

    const test_col = db.collection('tester_data');
    const record = await test_col.findOne(
      {
        sn: doc.sn,
        test_time: { $gte: new Date(doc.return_time) }
      },
      {
        sort: { test_time: 1 }  // earliest test_time ≥ returnDate
      }
    );

    let test_issue = "There is no issue recorded.";
    if (record != null && record.has_issue === true) {
      test_issue = "";
      const lenint = record.issues.length, lenmap = record.notes.size;
      let cnt = 0;
      let flag_issue = false;
      if (lenint > 0) {
        let index = 0;
        while (index < lenint - 1) {
          if (test_map.has(record.issues[index])) {
            test_issue += (test_map.get(record.issues[index]) + ", ");
            flag_issue = true;
          }
          index++;
        }
        if (flag_issue === false) test_issue = test_issue.substring(0, test_issue.length - 2);
        if (test_map.has(record.issues[index])) {
          test_issue += test_map.get(record.issues[index]);
          flag_issue = true;
        }
        if (flag_issue) cnt += 1;
      }
      if (lenmap > 0) {
        if (cnt > 0) test_issue += ", ";
        cnt += 1;
        test_issue += Array.from(record.notes.values()).join(", ");
      }
      if (record.report != "" && cnt > 0) test_issue += (", " + record.report);
    }

    const data_info = {
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
      serialNumber: doc.sn,
      realIssue: test_issue
    };

    // console.log(data_info);

    return data_info;
  }));

  // convert ObjectId to string (optional) and dates to ISO
  return doc_info;
};

export default {
  findByDate,
};
