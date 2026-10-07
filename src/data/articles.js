export const ARTICLES = [
  {
    id: 'art-01',
    title: 'Mastitis in Dairy Cows: Early Detection, Treatment & Teat Dip Protocols',
    slug: 'mastitis-dairy-cow-detection-treatment-protocols',
    category: 'Dairy Management',
    readTime: '6 min read',
    author: 'Dr. Peter Karanja (BVM, Registered Vet Surgeon)',
    date: 'Updated Oct 2026',
    excerpt: 'Subclinical mastitis robs Kenyan dairy farmers of up to 4 litres of milk per cow daily. Learn how the California Mastitis Test (CMT) and barrier teat dips protect your herd.',
    image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80',
    keyTakeaways: [
      'Perform the CMT test once every 14 days on all lactating cows.',
      'Always dip teats immediately after cluster detachment using 0.5% chlorhexidine.',
      'Keep cows standing for 30 minutes post-milking by providing fresh green silage.',
      'Never consume or sell milk during antibiotic withholding periods (3-5 days).'
    ],
    recommendedProductIds: ['prod-13', 'prod-01'],
    content: `
      <h3>Understanding Clinical vs Subclinical Mastitis</h3>
      <p>Mastitis remains the single most expensive disease on Kenyan dairy farms. While clinical mastitis is easily recognized by clots in milk or swollen, hot quarters, <strong>subclinical mastitis</strong> causes 70% of financial losses without visible changes in the milk.</p>

      <h3>The 4-Step Post-Milking Teat Disinfection Protocol</h3>
      <p>When milking ends, the teat sphincter muscle takes 30 to 45 minutes to seal tightly. If cows lie down on soiled bedding during this window, environmental bacteria (E. coli, Streptococcus uberis) enter the teat canal.</p>
      <ol>
        <li><strong>Dry wipe first:</strong> Never wash teats with dirty communal rags. Use disposable paper towels.</li>
        <li><strong>Post-milking teat dip:</strong> Immerse at least 80% of each teat in a chlorhexidine barrier dip.</li>
        <li><strong>Feed immediately:</strong> Place fresh dairy meal or silage in feed troughs so cows remain standing while sphincters close.</li>
        <li><strong>Withholding period discipline:</strong> If treating with intramammary antibiotics, strictly separate milk for the required days.</li>
      </ol>
    `
  },
  {
    id: 'art-02',
    title: 'Fall Armyworm Control: Timing Pesticide Sprays for Maximum Maize Yield',
    slug: 'fall-armyworm-control-timing-spraying-maize',
    category: 'Crop Protection',
    readTime: '5 min read',
    author: 'Faith Muthoni (MSc Crop Protection, Lead Agronomist)',
    date: 'Updated Oct 2026',
    excerpt: 'Spraying maize when armyworms are already burrowed deep inside the whorl wastes money. Master scouting techniques and chemical rotation before yield drops 40%.',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    keyTakeaways: [
      'Scout fields twice weekly starting 10 days after germination.',
      'Target spraying early morning (6:00 - 8:30 AM) when caterpillars come out to feed.',
      'Rotate chemical classes: never use the same active ingredient back-to-back.',
      'Direct knapsack nozzle straight down into the funnel/whorl of each plant.'
    ],
    recommendedProductIds: ['prod-15', 'prod-11', 'prod-02'],
    content: `
      <h3>The Window of Vulnerability</h3>
      <p>Fall Armyworm (Spodoptera frugiperda) caterpillars hatch within 3 to 5 days. During early instars (1st and 2nd instar), larvae feed on leaf epidermis, creating characteristic "window-pane" feeding signs. This is the only window when contact and systemic insecticides achieve 95%+ control.</p>

      <h3>Proper Application Technique with Knapsack Sprayers</h3>
      <p>Broadcasting mist over the entire crop canopy does not reach the target. Adjust your knapsack nozzle to a solid stream or narrow cone and aim directly into the whorl. For heavy infestations, utilize flubendiamide (Belt 480 SC) in rotation with indoxacarb or emamectin benzoate.</p>
    `
  },
  {
    id: 'art-03',
    title: 'Poultry Vaccination Schedule (Day 1 to Week 18) for Kenbro & Broilers',
    slug: 'poultry-vaccination-schedule-kenbro-broilers',
    category: 'Poultry Specialties',
    readTime: '7 min read',
    author: 'Dr. Peter Karanja (BVM, Registered Vet Surgeon)',
    date: 'Updated Oct 2026',
    excerpt: 'Vaccines are not cures—they are insurance policies. Review the standard Kenyan smallholder and commercial poultry immunization calendar.',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80',
    keyTakeaways: [
      'Marek’s Disease: Day 1 (administered at hatchery).',
      'Gumboro (IBD) 1st dose: Day 10-12 via clean chlorine-free drinking water.',
      'Newcastle Disease (LaSota): Day 14-16 via eye drop or drinking water.',
      'Gumboro Booster: Day 21-24.',
      'Fowl Pox: Week 6-8 by wing-web puncture.'
    ],
    recommendedProductIds: ['prod-12'],
    content: `
      <h3>Cold Chain Maintenance: Why Vaccines Fail</h3>
      <p>The most common cause of vaccine breakdown in Kenya is exposure to room temperature or chlorine-treated tap water. Live vaccines such as Newcastle LaSota die within 20 minutes if mixed with tap water containing residual chlorine.</p>

      <p>Always mix live vaccines with skimmed milk powder (2g per litre of borehole or rainwater) to stabilize the viral particles, and ensure the entire flock drinks within 2 hours.</p>
    `
  },
  {
    id: 'art-04',
    title: 'Foliar Fertilizers vs Basal NPK: Correcting Leaf Yellowing in Tomatoes',
    slug: 'foliar-vs-basal-npk-leaf-yellowing-tomatoes',
    category: 'Soil & Plant Nutrition',
    readTime: '5 min read',
    author: 'Faith Muthoni (MSc Crop Protection, Lead Agronomist)',
    date: 'Updated Oct 2026',
    excerpt: 'Is your tomato crop suffering from Nitrogen deficiency, Magnesium chlorosis, or root nematode damage? Diagnosing leaf symptoms before buying foliar feeds.',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a07?auto=format&fit=crop&w=600&q=80',
    keyTakeaways: [
      'Lower leaves turning yellow first indicates mobile Nitrogen (N) deficiency.',
      'Interveinal chlorosis (yellowing between green veins) signals Magnesium deficiency.',
      'Foliar feeds deliver emergency micronutrients within 4-6 hours through leaf stomata.',
      'Foliars supplement but CANNOT replace basal planting fertilizers (DAP/NPK).'
    ],
    recommendedProductIds: ['prod-16', 'prod-09', 'prod-04'],
    content: `
      <h3>Rapid Nutrient Recovery</h3>
      <p>When heavy rains leach soil nutrients or root rot restricts uptake, foliar spraying provides immediate resuscitation. Products like Easygro Vegetative contain chelated trace elements that are absorbed directly through the leaf cuticles within hours, restoring dark green vigor and flowering capacity.</p>
    `
  }
];
