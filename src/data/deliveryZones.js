export const FREE_DELIVERY_THRESHOLD = 15000; // Free delivery across Kenya for orders >= KES 15,000

export const DELIVERY_ZONES = [
  {
    id: 'nairobi-express',
    county: 'Nairobi',
    name: 'Nairobi CBD & Environs (Westlands, Karen, Kasarani, Embakasi, Kikuyu)',
    fee: 250,
    eta: 'Same-day (Within 3 - 5 Hours)',
    method: 'Dedicated Agrovet Courier Rider',
    freeThreshold: FREE_DELIVERY_THRESHOLD,
    codAvailable: true
  },
  {
    id: 'kiambu',
    county: 'Kiambu',
    name: 'Kiambu County (Thika, Ruiru, Limuru, Githunguri, Kiambu Town)',
    fee: 300,
    eta: 'Same-day or Next Morning',
    method: 'Agrovet Field Dispatch / Speedaf',
    freeThreshold: FREE_DELIVERY_THRESHOLD,
    codAvailable: true
  },
  {
    id: 'nakuru-naivasha',
    county: 'Nakuru',
    name: 'Nakuru County (Nakuru City, Naivasha, Gilgil, Molo, Rongai)',
    fee: 400,
    eta: 'Next Morning (12 - 24 Hours)',
    method: 'Wells Fargo Courier / Easy Coach',
    freeThreshold: FREE_DELIVERY_THRESHOLD,
    codAvailable: false
  },
  {
    id: 'uasin-gishu',
    county: 'Uasin Gishu',
    name: 'North Rift (Eldoret, Turbo, Moiben, Kitale, Kapsabet)',
    fee: 450,
    eta: 'Next Morning (24 Hours)',
    method: 'Wells Fargo Courier / G4S Parcel',
    freeThreshold: FREE_DELIVERY_THRESHOLD,
    codAvailable: false
  },
  {
    id: 'central-highlands',
    county: 'Nyeri & Meru',
    name: 'Central & Mount Kenya (Nyeri, Karatina, Meru, Embu, Kirinyaga)',
    fee: 400,
    eta: 'Next Day Delivery (24 Hours)',
    method: 'Wells Fargo / Modern Coast Parcel',
    freeThreshold: FREE_DELIVERY_THRESHOLD,
    codAvailable: false
  },
  {
    id: 'kisumu-western',
    county: 'Kisumu & Western',
    name: 'Western & Lake Basin (Kisumu City, Kakamega, Bungoma, Busia, Kisii)',
    fee: 500,
    eta: 'Next Day Delivery (24 - 36 Hours)',
    method: 'Easy Coach Parcel / Wells Fargo',
    freeThreshold: FREE_DELIVERY_THRESHOLD,
    codAvailable: false
  },
  {
    id: 'eastern-machakos',
    county: 'Machakos & Eastern',
    name: 'Lower Eastern (Machakos, Kitui, Athi River, Makueni, Emali)',
    fee: 350,
    eta: 'Next Day (24 Hours)',
    method: 'Wells Fargo Courier Express',
    freeThreshold: FREE_DELIVERY_THRESHOLD,
    codAvailable: false
  },
  {
    id: 'coast-mombasa',
    county: 'Mombasa & Coast',
    name: 'Coast Region (Mombasa, Kilifi, Malindi, Kwale, Diani)',
    fee: 550,
    eta: '24 - 48 Hours',
    method: 'Speedaf Courier / SGR Freight',
    freeThreshold: FREE_DELIVERY_THRESHOLD,
    codAvailable: false
  },
  {
    id: 'self-pickup',
    county: 'Nairobi',
    name: 'Free Self Pick-up at Nairobi Central Depot (Sheikh Karume Rd)',
    fee: 0,
    eta: 'Ready in 30 Minutes',
    method: 'Customer Pickup',
    freeThreshold: 0,
    codAvailable: true
  }
];
