// Comprehensive Kenyan Agricultural Data & Analytics for Agrovet Ltd Admin Operations

export const INITIAL_ORDERS = [
  {
    id: 'AGV-2026-8942',
    date: '10 Oct 2026',
    time: '09:42 AM',
    status: 'Processing',
    customerName: 'Kiprono Koech',
    phone: '+254 723 881 204',
    email: 'koechfarms@gmail.com',
    county: 'Uasin Gishu County',
    town: 'Eldoret, Moiben Ward',
    landmark: 'Near Moiben Junction, Green Valley Dairy Farm',
    notes: 'Urgent: Acaricide needed before Saturday cattle dipping',
    paymentMethod: 'M-Pesa STK Push',
    mpesaRef: 'QDK82X901MZ',
    items: [
      {
        id: 'prod-03',
        name: 'Triatix D.D. EC Acaricide (Amitraz)',
        brand: 'Coopers K-Brands',
        pack: '1 Litre',
        qty: 2,
        price: 2400,
        total: 4800,
        image: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'prod-01',
        name: 'Alamycin 10% Injection (Oxytetracycline)',
        brand: 'Norbrook Kenya',
        pack: '100 ml',
        qty: 3,
        price: 650,
        total: 1950,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 6750,
    deliveryFee: 450,
    total: 7200
  },
  {
    id: 'AGV-2026-8911',
    date: '09 Oct 2026',
    time: '04:15 PM',
    status: 'Dispatched',
    customerName: 'Grace Wangari',
    phone: '+254 711 405 918',
    email: 'gwangari@wananchi.com',
    county: 'Kiambu County',
    town: 'Limuru, Tigoni',
    landmark: 'Highland Fresh Greens Farm gate #4',
    notes: 'Please verify PCPB seal on fungicide bags',
    paymentMethod: 'M-Pesa STK Push',
    mpesaRef: 'QDK71Y320NX',
    items: [
      {
        id: 'prod-06',
        name: 'Ridomil Gold MZ 68 WG Fungicide',
        brand: 'Syngenta Kenya',
        pack: '1 kg',
        qty: 4,
        price: 3200,
        total: 12800,
        image: 'https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'prod-02',
        name: 'Thunder 145 O-TEQ Insecticide',
        brand: 'Bayer CropScience',
        pack: '500 ml',
        qty: 2,
        price: 1850,
        total: 3700,
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 16500,
    deliveryFee: 0,
    total: 16500
  },
  {
    id: 'AGV-2026-8874',
    date: '08 Oct 2026',
    time: '11:20 AM',
    status: 'Delivered',
    customerName: 'Peter Mwangi Njoroge',
    phone: '+254 722 559 310',
    email: 'mwangidairy@yahoo.com',
    county: 'Nakuru County',
    town: 'Naivasha, Mirera',
    landmark: 'Mirera Center opposite Chief\'s Office',
    notes: 'Delivered via Rider Kamau. Signed and verified.',
    paymentMethod: 'M-Pesa STK Push',
    mpesaRef: 'QDK55T118LK',
    items: [
      {
        id: 'prod-04',
        name: 'High-Yield Dairy Meal 16% CP',
        brand: 'Unga Farm Care',
        pack: '50 kg Bag',
        qty: 6,
        price: 2850,
        total: 17100,
        image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'prod-09',
        name: 'Maclik Super Dry Cow Mineral Salt',
        brand: 'Twiga Chemical',
        pack: '10 kg Bucket',
        qty: 3,
        price: 1650,
        total: 4950,
        image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 22050,
    deliveryFee: 650,
    total: 22700
  },
  {
    id: 'AGV-2026-8802',
    date: '07 Oct 2026',
    time: '02:50 PM',
    status: 'Delivered',
    customerName: 'Agnes Muthoni',
    phone: '+254 708 920 443',
    email: 'agnesmuthoni@gmail.com',
    county: 'Kirinyaga County',
    town: 'Mwea, Wang\'uru',
    landmark: 'Near Rice Mills Gate B',
    notes: 'For French beans and tomato nursery preparation',
    paymentMethod: 'M-Pesa STK Push',
    mpesaRef: 'QDK39B782MM',
    items: [
      {
        id: 'prod-05',
        name: 'Panar 15 Hybrid Maize Seed (PAN 15)',
        brand: 'Corteva Agriscience',
        pack: '2 kg Pack',
        qty: 5,
        price: 620,
        total: 3100,
        image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'prod-08',
        name: 'YaraMila Power NPK 17:17:17 Planting Blend',
        brand: 'Yara East Africa',
        pack: '50 kg Bag',
        qty: 2,
        price: 5200,
        total: 10400,
        image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 13500,
    deliveryFee: 500,
    total: 14000
  },
  {
    id: 'AGV-2026-8740',
    date: '06 Oct 2026',
    time: '10:05 AM',
    status: 'Delivered',
    customerName: 'David Mutua',
    phone: '+254 733 601 889',
    email: 'mutuaorchards@gmail.com',
    county: 'Machakos County',
    town: 'Matuu, Yatta Canal',
    landmark: 'Mango & Citrus Orchard block 3',
    notes: 'Tools inspection verified before dispatch',
    paymentMethod: 'Cash on Delivery',
    mpesaRef: 'COD-VERIFIED-441',
    items: [
      {
        id: 'prod-10',
        name: 'Knapsack Pressure Sprayer (16 Litre)',
        brand: 'Matabi Agro',
        pack: '16 Litre Unit',
        qty: 2,
        price: 3600,
        total: 7200,
        image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 7200,
    deliveryFee: 400,
    total: 7600
  },
  {
    id: 'AGV-2026-8699',
    date: '05 Oct 2026',
    time: '01:30 PM',
    status: 'Pending',
    customerName: 'Benson Chege',
    phone: '+254 721 349 008',
    email: 'bchege@yahoo.com',
    county: 'Murang\'a County',
    town: 'Kangema, Kanyenyaini',
    landmark: 'Near Tea Factory Weighbridge',
    notes: 'Awaiting M-Pesa STK confirmation re-push',
    paymentMethod: 'M-Pesa STK Push',
    mpesaRef: 'QDK11M992PP',
    items: [
      {
        id: 'prod-07',
        name: 'Wormicid Plus Dewormer Bolus (Albendazole)',
        brand: 'Cosmos Pharmaceuticals',
        pack: 'Strip of 10 Boluses',
        qty: 4,
        price: 380,
        total: 1520,
        image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 1520,
    deliveryFee: 350,
    total: 1870
  }
];

// Inflow Breakdown by Specific Agrovet Services
export const SERVICE_INFLOW_DATA = [
  {
    id: 'service-clinical-visit',
    title: 'On-Farm Clinical Vet Visits & Disease Diagnosis',
    leadSpecialist: 'Dr. Peter Karanja, BVM (KVB #2104)',
    inflowAmount: 285000,
    bookingsCount: 95,
    avgTicket: 3000,
    sharePercentage: 29.5,
    growthRate: '+24.5%',
    accentColor: '#1E6BFF',
    icon: 'Stethoscope',
    description: 'Emergency dystocia assistance, mastitis culture sampling, post-mortem pathology, and acute bovine disease interventions on Kenyan dairy & beef farms.'
  },
  {
    id: 'service-whatsapp-televet',
    title: '24/7 Digital WhatsApp Telehealth Consultations',
    leadSpecialist: 'Agrovet Triage Desk (KVB Registered Nurses)',
    inflowAmount: 124500,
    bookingsCount: 249,
    avgTicket: 500,
    sharePercentage: 12.9,
    growthRate: '+41.2%',
    accentColor: '#25D366',
    icon: 'MessageCircle',
    description: 'Instant photo & symptom triage via WhatsApp, remote prescription validation, withdrawal period advice, and safe dosage calculations.'
  },
  {
    id: 'service-agronomy-soil',
    title: 'Agronomy Crop Scouting & Soil Testing Analysis',
    leadSpecialist: 'Faith Wambui, MSc Agronomy (PCPB Specialist)',
    inflowAmount: 178000,
    bookingsCount: 58,
    avgTicket: 3068,
    sharePercentage: 18.5,
    growthRate: '+19.8%',
    accentColor: '#10B981',
    icon: 'Sprout',
    description: 'Comprehensive N-P-K & pH laboratory soil profiling, foliar nutrition planning, pest threshold scouting, and herbicide rotation guidance.'
  },
  {
    id: 'service-herd-vaccine',
    title: 'Herd Vaccination & AI Protocol Management',
    leadSpecialist: 'Veterinary Mobile Field Unit',
    inflowAmount: 210000,
    bookingsCount: 35,
    avgTicket: 6000,
    sharePercentage: 21.8,
    growthRate: '+15.4%',
    accentColor: '#F5C542',
    icon: 'ShieldCheck',
    description: 'Scheduled FMD, Anthrax, Blackquarter vaccination drives, synchronization protocols, and liquid nitrogen semen straw storage handling.'
  },
  {
    id: 'service-wholesale-b2b',
    title: 'B2B Wholesale & SACCO Bulk Fulfillment',
    leadSpecialist: 'Commercial Agribusiness Logistics Team',
    inflowAmount: 890000,
    bookingsCount: 18,
    avgTicket: 49444,
    sharePercentage: 92.3, // High ticket enterprise
    growthRate: '+31.0%',
    accentColor: '#D4A017',
    icon: 'Building',
    description: 'Pallet-load distribution of registered feed supplements and PCPB inputs directly to dairy co-operatives, commercial ranches, and sub-agrovets.'
  },
  {
    id: 'service-coldchain-delivery',
    title: 'Express Farmgate Cold-Chain Logistics Fees',
    leadSpecialist: 'Dedicated Fleet Dispatch (47 Counties)',
    inflowAmount: 86400,
    bookingsCount: 288,
    avgTicket: 300,
    sharePercentage: 9.0,
    growthRate: '+12.5%',
    accentColor: '#60A5FA',
    icon: 'Truck',
    description: 'Dedicated temperature-regulated delivery boxes ensuring live vaccines, antibiotics, and sensitive chemicals maintain efficacy straight to farm gates.'
  }
];

// Revenue Breakdown by Product Category in the Shop
export const CATEGORY_PERFORMANCE_DATA = [
  {
    id: 'veterinary-drugs',
    name: 'Veterinary Drugs & Antibiotics',
    icon: 'Stethoscope',
    grossRevenue: 482500,
    unitsSold: 612,
    avgItemPrice: 788,
    marginPercent: 32.5,
    topProduct: 'Alamycin 10% Injection (Norbrook)',
    stockHealth: 'Good (94% in stock)',
    accent: '#1E6BFF'
  },
  {
    id: 'animal-feeds',
    name: 'Animal Feeds & Mineral Salts',
    icon: 'Wheat',
    grossRevenue: 398000,
    unitsSold: 154,
    avgItemPrice: 2584,
    marginPercent: 18.2,
    topProduct: 'High-Yield Dairy Meal 16% CP (50kg)',
    stockHealth: 'High Turnover',
    accent: '#F5C542'
  },
  {
    id: 'crop-chemicals',
    name: 'Crop Chemicals & Insecticides',
    icon: 'ShieldAlert',
    grossRevenue: 312400,
    unitsSold: 218,
    avgItemPrice: 1433,
    marginPercent: 28.0,
    topProduct: 'Thunder 145 O-TEQ (Bayer)',
    stockHealth: 'Low Stock Alert (3 SKUs)',
    accent: '#10B981'
  },
  {
    id: 'fertilizers',
    name: 'Fertilizers & Foliar Feeds',
    icon: 'Sprout',
    grossRevenue: 245600,
    unitsSold: 68,
    avgItemPrice: 3611,
    marginPercent: 16.5,
    topProduct: 'YaraMila Power NPK 17:17:17 (50kg)',
    stockHealth: 'Adequate',
    accent: '#F59E0B'
  },
  {
    id: 'seeds',
    name: 'Certified Hybrid Seeds',
    icon: 'Leaf',
    grossRevenue: 189200,
    unitsSold: 295,
    avgItemPrice: 641,
    marginPercent: 22.0,
    topProduct: 'Panar 15 Hybrid Maize Seed (PAN 15)',
    stockHealth: 'Fast Seasonal Demand',
    accent: '#34D399'
  },
  {
    id: 'farm-tools',
    name: 'Farm Tools & Equipment',
    icon: 'Wrench',
    grossRevenue: 94500,
    unitsSold: 42,
    avgItemPrice: 2250,
    marginPercent: 35.0,
    topProduct: 'Knapsack Pressure Sprayer 16L (Matabi)',
    stockHealth: 'Healthy Stock',
    accent: '#60A5FA'
  }
];

// Historical Inflow Trend (Past 6 Months)
export const MONTHLY_REVENUE_TREND = [
  { month: 'May 2026', productSales: 780000, servicesInflow: 380000, total: 1160000 },
  { month: 'Jun 2026', productSales: 850000, servicesInflow: 420000, total: 1270000 },
  { month: 'Jul 2026', productSales: 910000, servicesInflow: 490000, total: 1400000 },
  { month: 'Aug 2026', productSales: 990000, servicesInflow: 560000, total: 1550000 },
  { month: 'Sep 2026', productSales: 1080000, servicesInflow: 640000, total: 1720000 },
  { month: 'Oct 2026 (MTD)', productSales: 1180600, servicesInflow: 964400, total: 2145000 }
];

// County Breakdown
export const COUNTY_REVENUE_DATA = [
  { county: 'Kiambu County', revenue: 642000, orders: 114, share: '29.9%' },
  { county: 'Nakuru County', revenue: 485000, orders: 82, share: '22.6%' },
  { county: 'Uasin Gishu County', revenue: 395000, orders: 67, share: '18.4%' },
  { county: 'Machakos County', revenue: 248000, orders: 49, share: '11.6%' },
  { county: 'Kirinyaga County', revenue: 198000, orders: 44, share: '9.2%' },
  { county: 'Nairobi & Suburbs', revenue: 177000, orders: 72, share: '8.3%' }
];

// Initial Service Bookings List
export const INITIAL_SERVICE_BOOKINGS = [
  {
    id: 'SRV-2026-301',
    date: '10 Oct 2026',
    farmerName: 'Simon Ndung\'u',
    phone: '+254 722 411 909',
    county: 'Kiambu County',
    serviceType: 'On-Farm Clinical Vet Visit',
    assignedSpecialist: 'Dr. Peter Karanja',
    issue: 'High-producing Friesian cow down with suspected Milk Fever (hypocalcemia) after calving.',
    urgency: 'Critical Emergency (Today)',
    status: 'Visit Completed',
    fee: 3500,
    paid: true
  },
  {
    id: 'SRV-2026-298',
    date: '09 Oct 2026',
    farmerName: 'Eunice Cherotich',
    phone: '+254 719 308 114',
    county: 'Nakuru County',
    serviceType: 'Agronomy Soil Testing & Fertility Audit',
    assignedSpecialist: 'Faith Wambui',
    issue: 'Acidity test and micro-nutrient profiling for 4-acre greenhouse tomato and capsicum block.',
    urgency: 'Scheduled (Within 48h)',
    status: 'In Progress (Lab Processing)',
    fee: 4500,
    paid: true
  },
  {
    id: 'SRV-2026-294',
    date: '09 Oct 2026',
    farmerName: 'Jackson Ochieng',
    phone: '+254 734 890 221',
    county: 'Kisumu County',
    serviceType: '24/7 Digital WhatsApp Telehealth',
    assignedSpecialist: 'Agrovet Triage Desk',
    issue: 'Photo review of layer chickens displaying mild respiratory rales and sneezing.',
    urgency: 'Routine',
    status: 'Prescription Issued',
    fee: 500,
    paid: true
  },
  {
    id: 'SRV-2026-289',
    date: '08 Oct 2026',
    farmerName: 'Gatundu Dairy Co-operative',
    phone: '+254 720 115 670',
    county: 'Kiambu County',
    serviceType: 'Herd Vaccination & AI Protocol',
    assignedSpecialist: 'Veterinary Mobile Field Unit',
    issue: 'Lumpy Skin Disease (LSD) preventive vaccination rollout for 120 member dairy cattle.',
    urgency: 'Scheduled Drive',
    status: 'Completed',
    fee: 28000,
    paid: true
  }
];

// Initial Customer Inquiries, Messages & Wholesale Requests
export const INITIAL_INQUIRIES = [
  {
    id: 'INQ-2026-104',
    date: '10 Oct 2026',
    time: '11:15 AM',
    type: 'Contact Message',
    name: 'Samuel Kiprotich',
    phone: '+254 712 990 412',
    county: 'Uasin Gishu County',
    subject: 'Bulk Dairy Meal & Mineral Salt supply',
    message: 'We have 45 lactating dairy cows in Turbo. Looking for monthly recurring supply of High-Yield Dairy Meal 50kg bags. Please provide quotation and delivery schedule.',
    status: 'Pending Reply'
  },
  {
    id: 'INQ-2026-102',
    date: '10 Oct 2026',
    time: '08:40 AM',
    type: 'Wholesale Quote',
    name: 'Makueni Farmers Cooperative Society',
    phone: '+254 721 554 890',
    county: 'Makueni County',
    subject: 'Wholesale: Fertilizer & Certified Seeds',
    message: 'Cooperative bulk order request: 300 Bags of YaraMila Power NPK 17:17:17 and 150 Bags of Panar 15 Hybrid Maize Seed. Required within 10 days.',
    status: 'Replied'
  },
  {
    id: 'INQ-2026-098',
    date: '09 Oct 2026',
    time: '03:20 PM',
    type: 'Product Inquiry',
    name: 'Ann Njeri Mwangi',
    phone: '+254 728 331 705',
    county: 'Murang\'a County',
    subject: 'Inquiry on Belt 480 SC Insecticide',
    message: 'Farmer requested dosage instructions and Pre-Harvest Interval (PHI) for French beans greenhouse block before purchasing.',
    status: 'Replied'
  },
  {
    id: 'INQ-2026-095',
    date: '08 Oct 2026',
    time: '01:05 PM',
    type: 'Clinical Triage',
    name: 'David Muthomi',
    phone: '+254 701 448 912',
    county: 'Meru County',
    subject: 'Coffee Berry Borer & Foliar Nutrition',
    message: 'Need specialist agronomy guidance on copper fungicide rotation and boron foliar application after heavy rains.',
    status: 'Pending Reply'
  }
];
