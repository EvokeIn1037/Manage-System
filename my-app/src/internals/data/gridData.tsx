import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { GridCellParams, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

type SparkLineData = number[];

function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

function renderSparklineCell(params: GridCellParams<SparkLineData, any>) {
  const date = new Date();
  const data = getDaysInMonth(date.getMonth(), date.getFullYear());
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={['hsl(210, 98%, 42%)']}
        xAxis={{
          scaleType: 'band',
          data,
        }}
      />
    </div>
  );
}

function renderStatus(status: 'Return' | 'Repair') {
  const colors: { [index: string]: 'success' | 'default' } = {
    Return: 'success',
    Repair: 'default',
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

export function renderAvatar(
  params: GridCellParams<{ name: string; color: string }, any, any>,
) {
  if (params.value == null) {
    return '';
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: '24px',
        height: '24px',
        fontSize: '0.85rem',
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

export const columns: GridColDef[] = [
  { field: 'serialNumber',
    headerName: 'Serial Number', 
    flex: 1.5, 
    minWidth: 200 
  },
  {
    field: 'orderNumber',
    headerName: 'Order Number',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'purchaseDate',
    headerName: 'Purchase Date',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'returnDate',
    headerName: 'Return Date',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'status',
    headerName: 'Status Type',
    flex: 0.5,
    minWidth: 80,
    renderCell: (params) => renderStatus(params.value as any),
  },
  {
    field: 'returnReason',
    headerName: 'Reason Reason',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'customerComment',
    headerName: 'Customer Comment',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'realIssue',
    headerName: 'Real Issue',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    minWidth: 150,
    renderCell: renderSparklineCell,
  },
];

export const rows: GridRowsProp = [
  {
    id: 1,
    serialNumber: 'Homepage Overview',
    status: 'Return',
    orderNumber: "114-4367767-1507402",
    purchaseDate: "2024-11-05 09:17:43",
    returnDate: 18.5,
    customerComment: "Ok",
    realIssue: [
      469172, 488506, 592287, 617401, 640374, 632751, 668638, 807246, 749198, 944863,
      911787, 844815, 992022, 1143838, 1446926, 1267886, 1362511, 1348746, 1560533,
      1670690, 1695142, 1916613, 1823306, 1683646, 2025965, 2529989, 3263473,
      3296541, 3041524, 2599497,
    ],
  },
  {
    id: 2,
    serialNumber: 'Product Details - Gadgets',
    status: 'Return',
    orderNumber: "114-5706171-6963403",
    purchaseDate: "2024-11-02 15:10:25",
    returnDate: 9.7,
    customerComment: "Gets stuck on edges of pool and does not move. Also, made of very poor quality of plastic",
    realIssue: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      557488, 1341471, 2044561, 2206438,
    ],
  },
  {
    id: 3,
    serialNumber: 'Checkout Process - Step 1',
    status: 'Repair',
    orderNumber: "113-1239713-0848213",
    purchaseDate: "2024-11-02 11:59:59",
    returnDate: 15.2,
    customerComment: "gets stuck and doesn't work",
    realIssue: [
      166896, 190041, 248686, 226746, 261744, 271890, 332176, 381123, 396435, 495620,
      520278, 460839, 704158, 559134, 681089, 712384, 765381, 771374, 851314, 907947,
      903675, 1049642, 1003160, 881573, 1072283, 1139115, 1382701, 1395655, 1355040,
      1381571,
    ],
  },
  {
    id: 4,
    serialNumber: 'User Profile Dashboard',
    status: 'Return',
    orderNumber: "111-9347496-9796218",
    purchaseDate: "2024-11-01 12:42:28",
    returnDate: 4.5,
    customerComment: "Product is faded and does not work",
    realIssue: [
      264651, 311845, 436558, 439385, 520413, 533380, 562363, 533793, 558029, 791126,
      649082, 566792, 723451, 737827, 890859, 935554, 1044397, 1022973, 1129827,
      1145309, 1195630, 1358925, 1373160, 1172679, 1340106, 1396974, 1623641,
      1687545, 1581634, 1550291,
    ],
  },
  {
    id: 5,
    serialNumber: 'Article Listing - Tech News',
    status: 'Repair',
    orderNumber: "112-4757512-1073822",
    purchaseDate: "2024-10-31 11:55:13",
    returnDate: 3.1,
    customerComment: "The swimming pool has partial sun exposure so I need to buy the solar plus chargeable unit",
    realIssue: [
      251871, 262216, 402383, 396459, 378793, 406720, 447538, 451451, 457111, 589821,
      640744, 504879, 626099, 662007, 754576, 768231, 833019, 851537, 972306,
      1014831, 1027570, 1189068, 1119099, 987244, 1197954, 1310721, 1480816, 1577547,
      1854053, 1791831,
    ],
  },
  {
    id: 6,
    serialNumber: 'FAQs - Customer Support',
    status: 'Return',
    orderNumber: "",
    purchaseDate: "",
    returnDate: 7.2,
    customerComment: "It gets stuck in one spot and does not move unless you use the remote to move it backwards. Who has time to constantly watch it ? The quality of the plastic parts is really flimsy. This product would not last one hot summer here in Texas. That flimsy plastic would deteriorate so fast.",
    realIssue: [
      13671, 16918, 27272, 34315, 42212, 56369, 64241, 77857, 70680, 91093, 108306,
      94734, 132289, 133860, 147706, 158504, 192578, 207173, 220052, 233496, 250091,
      285557, 268555, 259482, 274019, 321648, 359801, 399502, 447249, 497403,
    ],
  },
  {
    id: 7,
    serialNumber: 'Product Comparison - Laptops',
    status: 'Repair',
    orderNumber: "111-8880327-7553055",
    purchaseDate: "2024-10-14 06:45:26",
    returnDate: 6.5,
    customerComment: "Item delivered was of low quality",
    realIssue: [
      93682, 107901, 144919, 151769, 170804, 183736, 201752, 219792, 227887, 295382,
      309600, 278050, 331964, 356826, 404896, 428090, 470245, 485582, 539056, 582112,
      594289, 671915, 649510, 574911, 713843, 754965, 853020, 916793, 960158, 984265,
    ],
  },
  {
    id: 8,
    serialNumber: 'Shopping Cart - Electronics',
    status: 'Return',
    orderNumber: "111-4690584-3049044",
    purchaseDate: "2024-10-17 00:48:34",
    returnDate: 4.3,
    customerComment: "Item doesn't run at the advertised time on a full charge, won't make it through the night",
    realIssue: [
      52394, 63357, 82800, 105466, 128729, 144472, 172148, 197919, 212302, 278153,
      290499, 249824, 317499, 333024, 388925, 410576, 462099, 488477, 533956, 572307,
      591019, 681506, 653332, 581234, 719038, 783496, 911609, 973328, 1056071,
      1112940,
    ],
  },
  {
    id: 9,
    serialNumber: 'Payment Confirmation - Bank Transfer',
    status: 'Repair',
    orderNumber: "112-8578764-6309056",
    purchaseDate: "2024-10-25 09:07:44",
    returnDate: 2.7,
    customerComment: "Only cleaned pool surface,not advertised",
    realIssue: [
      15372, 16901, 25489, 30148, 40857, 51136, 64627, 75804, 89633, 100407, 114908,
      129957, 143568, 158509, 174822, 192488, 211512, 234702, 258812, 284328, 310431,
      338186, 366582, 396749, 428788, 462880, 499125, 537723, 578884, 622825,
    ],
  },
  {
    id: 10,
    serialNumber: 'Product Reviews - Smartphones',
    status: 'Return',
    orderNumber: "114-9857398-9857858",
    purchaseDate: "2024-10-18 12:11:42",
    returnDate: 5.1,
    customerComment: "The item delivered was too small.",
    realIssue: [
      70211, 89234, 115676, 136021, 158744, 174682, 192890, 218073, 240926, 308190,
      317552, 279834, 334072, 354955, 422153, 443911, 501486, 538091, 593724, 642882,
      686539, 788615, 754813, 687955, 883645, 978347, 1142551, 1233074, 1278155,
      1356724,
    ],
  },
  {
    id: 11,
    serialNumber: 'Subscription Management - Services',
    status: 'Repair',
    orderNumber: "112-8084889-9302663",
    purchaseDate: "2024-10-19 07:26:22",
    returnDate: 4.8,
    customerComment: "Solar only is a problem.",
    realIssue: [
      49662, 58971, 78547, 93486, 108722, 124901, 146422, 167883, 189295, 230090,
      249837, 217828, 266494, 287537, 339586, 363299, 412855, 440900, 490111, 536729,
      580591, 671635, 655812, 576431, 741632, 819296, 971762, 1052605, 1099234,
      1173591,
    ],
  },
  {
    id: 12,
    serialNumber: 'Order Tracking - Shipments',
    status: 'Return',
    orderNumber: "112-5506828-1721059",
    purchaseDate: "2024-10-30 13:57:02",
    returnDate: 3.5,
    customerComment: "Have a powerful pump and big pool. Can't regulate skimmer baskets low enough to keep product from getting stuck at skimmer openings",
    realIssue: [
      29589, 37965, 55800, 64672, 77995, 91126, 108203, 128900, 148232, 177159,
      193489, 164471, 210765, 229977, 273802, 299381, 341092, 371567, 413812, 457693,
      495920, 564785, 541022, 491680, 618096, 704926, 833365, 904313, 974622,
      1036567,
    ],
  },
  {
    id: 13,
    serialNumber: 'Customer Feedback - Surveys',
    status: 'Repair',
    orderNumber: "114-8588796-1320240",
    purchaseDate: "2024-10-30 22:38:45",
    returnDate: 2.3,
    customerComment: "Says will remove no see ums, but it won't",
    realIssue: [
      8472, 9637, 14892, 19276, 23489, 28510, 33845, 39602, 45867, 52605, 59189,
      65731, 76021, 85579, 96876, 108515, 119572, 131826, 145328, 160192, 176528,
      196662, 217929, 239731, 262920, 289258, 315691, 342199, 370752, 402319,
    ],
  },
  {
    id: 14,
    serialNumber: 'Account Settings - Preferences',
    status: 'Return',
    orderNumber: "111-6595549-0822654",
    purchaseDate: "2024-10-30 13:50:40",
    returnDate: 3.2,
    customerComment: "This product stopped working.",
    realIssue: [
      15792, 16948, 22728, 25491, 28412, 31268, 34241, 37857, 42068, 46893, 51098,
      55734, 60780, 66421, 72680, 79584, 87233, 95711, 105285, 115814, 127509,
      140260, 154086, 169495, 186445, 205109, 225580, 247983, 272484, 299280,
    ],
  },
  {
    id: 15,
    serialNumber: 'Login Page - Authentication',
    status: 'Repair',
    orderNumber: "112-7627424-5325827",
    purchaseDate: "2024-10-30 11:43:59",
    returnDate: 2.5,
    customerComment: "Only runs for a minute and shuts off. Defective!",
    realIssue: [
      25638, 28355, 42089, 53021, 66074, 80620, 97989, 118202, 142103, 166890,
      193869, 225467, 264089, 307721, 358059, 417835, 488732, 573924, 674878, 794657,
      938542, 1111291, 1313329, 1543835, 1812156, 2123349, 2484926, 2907023, 3399566,
      3973545,
    ],
  },
  {
    id: 16,
    serialNumber: 'Promotions - Seasonal Sales',
    status: 'Return',
    orderNumber: "112-0267781-5611450",
    purchaseDate: "2024-10-27 14:37:53",
    returnDate: 7.8,
    customerComment: "I tried it and it does not clean very well, sometimes it passes leaves and does not pick them",
    realIssue: [
      241732, 256384, 289465, 321423, 345672, 378294, 398472, 420364, 436278, 460192,
      495374, 510283, 532489, 559672, 587312, 610982, 629385, 654732, 678925, 704362,
      725182, 749384, 772361, 798234, 819472, 846291, 872183, 894673, 919283, 945672,
    ],
  },
  {
    id: 17,
    serialNumber: 'Tutorials - How to Guides',
    status: 'Repair',
    orderNumber: "112-5569977-0941025",
    purchaseDate: "2024-10-27 07:18:42",
    returnDate: 5.2,
    customerComment: "The solar power lasts too little and in rainy days is not working at all",
    realIssue: [
      12345, 14567, 16789, 18901, 21023, 23145, 25267, 27389, 29501, 31623, 33745,
      35867, 37989, 40101, 42223, 44345, 46467, 48589, 50701, 52823, 54945, 57067,
      59189, 61301, 63423, 65545, 67667, 69789, 71901, 74023,
    ],
  },
  {
    id: 18,
    serialNumber: 'Blog Posts - Tech Insights',
    status: 'Return',
    orderNumber: "114-0370900-6006605",
    purchaseDate: "2024-10-25 08:18:10",
    returnDate: 6.3,
    customerComment: "Incorrect purchased,  need pool cleaner not skimmer.",
    realIssue: [
      23456, 25678, 27890, 30102, 32324, 34546, 36768, 38980, 41202, 43424, 45646,
      47868, 50080, 52302, 54524, 56746, 58968, 61180, 63402, 65624, 67846, 70068,
      72290, 74502, 76724, 78946, 81168, 83380, 85602, 87824,
    ],
  },
  {
    id: 19,
    serialNumber: 'Events - Webinars',
    status: 'Repair',
    orderNumber: "111-6787859-6203441",
    purchaseDate: "2024-10-25 09:08:25",
    returnDate: 4.5,
    customerComment: "I have to keep troubleshooting issues. From poor battery life to • limbs getting stuck in the blades. Not worth the hassle.",
    realIssue: [
      123456, 145678, 167890, 190012, 212324, 234546, 256768, 278980, 301202, 323424,
      345646, 367868, 390080, 412302, 434524, 456746, 478968, 501180, 523402, 545624,
      567846, 590068, 612290, 634502, 656724, 678946, 701168, 723380, 745602, 767824,
    ],
  },
  {
    id: 20,
    serialNumber: 'Support - Contact Us',
    status: 'Return',
    orderNumber: "114-6039258-1190602",
    purchaseDate: "2024-10-23 16:26:15",
    returnDate: 3.9,
    customerComment: "Doesn't operate well on solar power",
    realIssue: [
      234567, 256789, 278901, 301023, 323245, 345467, 367689, 389801, 412023, 434245,
      456467, 478689, 500801, 523023, 545245, 567467, 589689, 611801, 634023, 656245,
      678467, 700689, 722801, 745023, 767245, 789467, 811689, 833801, 856023, 878245,
    ],
  },
  {
    id: 21,
    serialNumber: 'Case Studies - Success Stories',
    status: 'Repair',
    orderNumber: "114-6865610-1184219",
    purchaseDate: "2024-10-23 22:24:03",
    returnDate: 6.1,
    customerComment: "This device is useless, not working",
    realIssue: [
      34567, 36789, 38901, 41023, 43145, 45267, 47389, 49501, 51623, 53745, 55867,
      57989, 60101, 62223, 64345, 66467, 68589, 70701, 72823, 74945, 77067, 79189,
      81301, 83423, 85545, 87667, 89789, 91901, 94023, 96145,
    ],
  },
  {
    id: 22,
    serialNumber: 'News - Industry Updates',
    status: 'Return',
    orderNumber: "113-2718379-5117056",
    purchaseDate: "2024-10-22 05:31:33",
    returnDate: 5.7,
    customerComment: "Doesn't work well",
    realIssue: [
      45678, 47890, 50102, 52324, 54546, 56768, 58980, 61202, 63424, 65646, 67868,
      70080, 72302, 74524, 76746, 78968, 81180, 83402, 85624, 87846, 90068, 92290,
      94502, 96724, 98946, 101168, 103380, 105602, 107824, 110046,
    ],
  },
  {
    id: 23,
    serialNumber: 'Forum - User Discussions',
    status: 'Repair',
    orderNumber: "113-0403116-3889005",
    purchaseDate: "2024-10-19 17:41:32",
    returnDate: 4.2,
    customerComment: "Does not do the job as advertised",
    realIssue: [
      56789, 58901, 61023, 63145, 65267, 67389, 69501, 71623, 73745, 75867, 77989,
      80101, 82223, 84345, 86467, 88589, 90701, 92823, 94945, 97067, 99189, 101301,
      103423, 105545, 107667, 109789, 111901, 114023, 116145, 118267,
    ],
  },
  {
    id: 24,
    serialNumber: 'Documentation - API Reference',
    status: 'Return',
    orderNumber: "113-4718889-2234640",
    purchaseDate: "2024-10-15 05:07:16",
    returnDate: 5.0,
    customerComment: "The item only turns on for a couple of seconds and then stops working.",
    realIssue: [
      67890, 70102, 72324, 74546, 76768, 78980, 81202, 83424, 85646, 87868, 90080,
      92302, 94524, 96746, 98968, 101180, 103402, 105624, 107846, 110068, 112290,
      114502, 116724, 118946, 121168, 123380, 125602, 127824, 130046, 132268,
    ],
  },
  {
    id: 25,
    serialNumber: 'Services - Consulting',
    status: 'Repair',
    orderNumber: "112-0317736-3208250",
    purchaseDate: "2024-10-18 18:46:03",
    returnDate: 6.4,
    customerComment: "This thing would not work all by itself, you have to be there with a remote all the time to make it work, totally what I not expected it,",
    realIssue: [
      345678, 367890, 390012, 412324, 434546, 456768, 478980, 501202, 523424, 545646,
      567868, 590080, 612302, 634524, 656746, 678968, 701180, 723402, 745624, 767846,
      790068, 812290, 834502, 856724, 878946, 901168, 923380, 945602, 967824, 990046,
    ],
  },
  {
    id: 26,
    serialNumber: 'Feedback - User Reviews',
    status: 'Return',
    orderNumber: "111-2201263-4368248",
    purchaseDate: "2024-10-18 16:16:38",
    returnDate: 6.2,
    customerComment: "Didn't work for more than a minute",
    realIssue: [
      123478, 145690, 167912, 190134, 212356, 234578, 256790, 279012, 301234, 323456,
      345678, 367890, 390012, 412234, 434456, 456678, 478890, 501012, 523234, 545456,
      567678, 589890, 612012, 634234, 656456, 678678, 700890, 723012, 745234, 767456,
    ],
  },
  {
    id: 27,
    serialNumber: 'Profiles - Team Members',
    status: 'Repair',
    orderNumber: "113-3898237-7296200",
    purchaseDate: "2024-10-18 12:15:58",
    returnDate: 5.5,
    customerComment: "Bought wrong one",
    realIssue: [
      345123, 367345, 389567, 411789, 434012, 456234, 478456, 500678, 522901, 545123,
      567345, 589567, 611789, 634012, 656234, 678456, 700678, 722901, 745123, 767345,
      789567, 811789, 834012, 856234, 878456, 900678, 922901, 945123, 967345, 989567,
    ],
  },
  {
    id: 28,
    serialNumber: 'Notifications - Alerts',
    status: 'Return',
    orderNumber: "112-2537851-8481020",
    purchaseDate: "2024-10-18 18:34:56",
    returnDate: 4.9,
    customerComment: "Doesnt work",
    realIssue: [
      456123, 478345, 500567, 522789, 545012, 567234, 589456, 611678, 633901, 656123,
      678345, 700567, 722789, 745012, 767234, 789456, 811678, 833901, 856123, 878345,
      900567, 922789, 945012, 967234, 989456, 1011678, 1033901, 1056123, 1078345,
      1100567,
    ],
  },
  {
    id: 29,
    serialNumber: 'Dashboard - Metrics',
    status: 'Repair',
    orderNumber: "111-2408778-1372256",
    purchaseDate: "2024-10-09 16:36:01",
    returnDate: 6.3,
    customerComment: "Missing remote",
    realIssue: [
      567890, 590112, 612334, 634556, 656778, 678990, 701212, 723434, 745656, 767878,
      790100, 812322, 834544, 856766, 878988, 901210, 923432, 945654, 967876, 990098,
      1012320, 1034542, 1056764, 1078986, 1101208, 1123430, 1145652, 1167874,
      1190096, 1212318,
    ],
  },
  {
    id: 30,
    serialNumber: 'Reports - Monthly Analysis',
    status: 'Return',
    orderNumber: "114-5423042-4518625",
    purchaseDate: "2024-10-09 14:38:34",
    returnDate: 5.9,
    customerComment: "Runs out of energy quickly before finished skimming.",
    realIssue: [
      678901, 701123, 723345, 745567, 767789, 790011, 812233, 834455, 856677, 878899,
      901121, 923343, 945565, 967787, 990009, 1012231, 1034453, 1056675, 1078897,
      1101119, 1123341, 1145563, 1167785, 1190007, 1212229, 1234451, 1256673,
      1278895, 1301117, 1323339,
    ],
  },
  {
    id: 31,
    serialNumber: 'Training - Employee Onboarding',
    status: 'Repair',
    orderNumber: "113-4174259-3029019",
    purchaseDate: "2024-10-12 16:13:02",
    returnDate: 6.1,
    customerComment: "Not compatible",
    realIssue: [
      789012, 811234, 833456, 855678, 877890, 900112, 922334, 944556, 966778, 989000,
      1011222, 1033444, 1055666, 1077888, 1100110, 1122332, 1144554, 1166776,
      1188998, 1211220, 1233442, 1255664, 1277886, 1300108, 1322330, 1344552,
      1366774, 1388996, 1411218, 1433440,
    ],
  },
  {
    id: 32,
    serialNumber: 'Resources - Knowledge Base',
    status: 'Return',
    orderNumber: "112-4746638-2309850",
    purchaseDate: "2024-10-12 11:58:54",
    returnDate: 4.7,
    customerComment: "Does not charge",
    realIssue: [
      890123, 912345, 934567, 956789, 979012, 1001234, 1023456, 1045678, 1067890,
      1090123, 1112345, 1134567, 1156789, 1179012, 1201234, 1223456, 1245678,
      1267890, 1290123, 1312345, 1334567, 1356789, 1379012, 1401234, 1423456,
      1445678, 1467890, 1490123, 1512345, 1534567,
    ],
  },
  {
    id: 33,
    serialNumber: 'Settings - Privacy Controls',
    status: 'Repair',
    orderNumber: "113-1835650-8827447",
    purchaseDate: "2024-11-03 08:13:30",
    returnDate: 5.8,
    customerComment: "It cleans one side of the pool only",
    realIssue: [
      901234, 923456, 945678, 967890, 990112, 1012334, 1034556, 1056778, 1079000,
      1101222, 1123444, 1145666, 1167888, 1190110, 1212332, 1234554, 1256776,
      1278998, 1301220, 1323442, 1345664, 1367886, 1390108, 1412330, 1434552,
      1456774, 1478996, 1501218, 1523440, 1545662,
    ],
  },
  {
    id: 34,
    serialNumber: 'Integrations - Third-Party Services',
    status: 'Return',
    orderNumber: "111-8173787-5005056",
    purchaseDate: "2024-11-02 05:12:45",
    returnDate: 4.4,
    customerComment: "Doesn't pick up leaves very well. Remote doesn't function adequately. Gets caught up easily.",
    realIssue: [
      123457, 145679, 167891, 190113, 212335, 234557, 256779, 279001, 301223, 323445,
      345667, 367889, 390011, 412233, 434455, 456677, 478899, 501121, 523343, 545565,
      567787, 590009, 612231, 634453, 656675, 678897, 701119, 723341, 745563, 767785,
    ],
  },
  {
    id: 35,
    serialNumber: 'Account - Billing Information',
    status: 'Repair',
    orderNumber: "112-7950491-3639453",
    purchaseDate: "2024-11-01 11:40:03",
    returnDate: 5.4,
    customerComment: "not efficient enough and gets stuck with the vacuum hose and the skimmer opening.",
    realIssue: [
      234568, 256790, 278912, 301134, 323356, 345578, 367790, 390012, 412234, 434456,
      456678, 478890, 501112, 523334, 545556, 567778, 590000, 612222, 634444, 656666,
      678888, 701110, 723332, 745554, 767776, 789998, 812220, 834442, 856664, 878886,
    ],
  },
];
