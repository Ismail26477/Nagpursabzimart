export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  unit: string;
  weightOptions: string[];
  image: string;
  description: string;
  nutrition: string;
  trending?: boolean;
  bestDeal?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  count: number;
}

export const categories: Category[] = [
  { id: "leafy", name: "Leafy Greens", icon: "🥬", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&h=200&fit=crop", count: 10 },
  { id: "root", name: "Root Vegetables", icon: "🥕", image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=200&h=200&fit=crop", count: 10 },
  { id: "exotic-fruits", name: "Exotic Fruits", icon: "🥭", image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=200&h=200&fit=crop", count: 10 },
  { id: "seasonal", name: "Seasonal", icon: "🍅", image: "https://images.unsplash.com/photo-1592924357228-91a4daadce55?w=200&h=200&fit=crop", count: 10 },
  { id: "herbs", name: "Fresh Herbs", icon: "🌿", image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=200&h=200&fit=crop", count: 10 },
  { id: "citrus", name: "Citrus Fruits", icon: "🍊", image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=200&h=200&fit=crop", count: 10 },
  { id: "berries", name: "Berries", icon: "🫐", image: "https://images.unsplash.com/photo-1425934398893-310a009a77f9?w=200&h=200&fit=crop", count: 10 },
  { id: "gourds", name: "Gourds", icon: "🎃", image: "https://images.unsplash.com/photo-1517868163143-9a49b81ddd25?w=200&h=200&fit=crop", count: 10 },
];

export const products: Product[] = [
  // ===== LEAFY GREENS (10) =====
  {
    id: "1", name: "Fresh Spinach", category: "leafy", price: 25, originalPrice: 35, unit: "250g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
    description: "Farm-fresh spinach leaves, rich in iron and vitamins. Perfect for salads, smoothies, and cooking.",
    nutrition: "Calories: 23 kcal | Protein: 2.9g | Iron: 2.7mg | Vitamin A: 469μg", trending: true, bestDeal: true,
  },
  {
    id: "9", name: "Fresh Broccoli", category: "leafy", price: 55, originalPrice: 70, unit: "500g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop",
    description: "Crisp green broccoli florets, a superfood packed with nutrients.",
    nutrition: "Calories: 34 kcal | Vitamin C: 89mg | Protein: 2.8g",
  },
  {
    id: "l3", name: "Methi (Fenugreek)", category: "leafy", price: 15, originalPrice: 22, unit: "250g",
    weightOptions: ["250g", "500g"], image: "https://images.unsplash.com/photo-1505253304499-671c55eb57fe?w=400&h=400&fit=crop",
    description: "Fresh fenugreek leaves, a staple in Indian cooking. Great for parathas and sabzi.",
    nutrition: "Calories: 49 kcal | Iron: 33mg | Fiber: 25g",
  },
  {
    id: "l4", name: "Palak (Indian Spinach)", category: "leafy", price: 20, originalPrice: 28, unit: "500g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=400&h=400&fit=crop",
    description: "Tender palak leaves for making delicious palak paneer, dal palak, and more.",
    nutrition: "Calories: 23 kcal | Iron: 2.7mg | Vitamin K: 483μg",
  },
  {
    id: "l5", name: "Cabbage", category: "leafy", price: 25, originalPrice: 32, unit: "1pc",
    weightOptions: ["1pc", "2pcs"], image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&h=400&fit=crop",
    description: "Fresh green cabbage, crunchy and versatile. Perfect for coleslaw, stir-fry, and sabzi.",
    nutrition: "Calories: 25 kcal | Vitamin C: 36mg | Fiber: 2.5g",
  },
  {
    id: "l6", name: "Lettuce", category: "leafy", price: 40, originalPrice: 55, unit: "200g",
    weightOptions: ["200g", "400g"], image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop",
    description: "Crisp iceberg lettuce, perfect for fresh salads, wraps, and burgers.",
    nutrition: "Calories: 14 kcal | Vitamin A: 25μg | Water: 96%", trending: true,
  },
  {
    id: "l7", name: "Amaranth Leaves (Chaulai)", category: "leafy", price: 18, originalPrice: 25, unit: "250g",
    weightOptions: ["250g", "500g"], image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop",
    description: "Nutritious amaranth leaves, commonly used in Indian dal and stir-fries.",
    nutrition: "Calories: 23 kcal | Calcium: 215mg | Iron: 2.3mg",
  },
  {
    id: "l8", name: "Spring Onion", category: "leafy", price: 12, originalPrice: 18, unit: "100g",
    weightOptions: ["100g", "250g"], image: "https://images.unsplash.com/photo-1585238341710-4d3ff484184d?w=400&h=400&fit=crop",
    description: "Fresh spring onions, adds crunch and flavor to salads, soups, and stir-fries.",
    nutrition: "Calories: 32 kcal | Vitamin C: 19mg | Vitamin K: 207μg",
  },
  {
    id: "l9", name: "Kale", category: "leafy", price: 60, originalPrice: 80, unit: "200g",
    weightOptions: ["200g", "400g"], image: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=400&h=400&fit=crop",
    description: "Superfood kale leaves, loaded with antioxidants. Great for smoothies and salads.",
    nutrition: "Calories: 49 kcal | Vitamin K: 817μg | Vitamin C: 120mg", bestDeal: true,
  },
  {
    id: "l10", name: "Sarson ka Saag (Mustard Greens)", category: "leafy", price: 22, originalPrice: 30, unit: "500g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=400&h=400&fit=crop",
    description: "Fresh mustard greens for the classic sarson ka saag. Rich in nutrients and flavor.",
    nutrition: "Calories: 27 kcal | Vitamin A: 525μg | Calcium: 115mg",
  },

  // ===== ROOT VEGETABLES (10) =====
  {
    id: "3", name: "Baby Carrots", category: "root", price: 45, originalPrice: 60, unit: "500g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400&h=400&fit=crop",
    description: "Sweet and crunchy baby carrots, perfect for snacking and cooking. Rich in beta-carotene.",
    nutrition: "Calories: 41 kcal | Vitamin A: 835μg | Fiber: 2.8g", trending: true,
  },
  {
    id: "6", name: "Red Onions", category: "root", price: 35, originalPrice: 45, unit: "1kg",
    weightOptions: ["500g", "1kg", "2kg"], image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop",
    description: "Premium red onions, essential for everyday cooking. Sharp flavor and great for salads.",
    nutrition: "Calories: 40 kcal | Vitamin C: 7mg | Quercetin: 13mg", bestDeal: true,
  },
  {
    id: "13", name: "Potato", category: "root", price: 30, originalPrice: 38, unit: "1kg",
    weightOptions: ["500g", "1kg", "2kg", "5kg"], image: "https://images.unsplash.com/photo-1518977676601-b53f82ber82?w=400&h=400&fit=crop",
    description: "Fresh farm potatoes, perfect for curries, fries, and roasting.",
    nutrition: "Calories: 77 kcal | Potassium: 421mg | Vitamin C: 20mg",
  },
  {
    id: "r4", name: "Beetroot", category: "root", price: 35, originalPrice: 45, unit: "500g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?w=400&h=400&fit=crop",
    description: "Deep red beetroots, naturally sweet and earthy. Great for juices, salads, and curries.",
    nutrition: "Calories: 43 kcal | Folate: 109μg | Iron: 0.8mg", trending: true,
  },
  {
    id: "r5", name: "Radish (Mooli)", category: "root", price: 20, originalPrice: 28, unit: "500g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=400&h=400&fit=crop",
    description: "Crisp white radish, excellent for salads, parathas, and pickles.",
    nutrition: "Calories: 16 kcal | Vitamin C: 15mg | Fiber: 1.6g",
  },
  {
    id: "r6", name: "Sweet Potato (Shakarkandi)", category: "root", price: 40, originalPrice: 52, unit: "1kg",
    weightOptions: ["500g", "1kg", "2kg"], image: "https://images.unsplash.com/photo-1596097635121-14b63b7a0c53?w=400&h=400&fit=crop",
    description: "Orange sweet potatoes, naturally sweet and loaded with beta-carotene.",
    nutrition: "Calories: 86 kcal | Vitamin A: 709μg | Fiber: 3g", bestDeal: true,
  },
  {
    id: "r7", name: "Ginger (Adrak)", category: "root", price: 25, originalPrice: 35, unit: "100g",
    weightOptions: ["100g", "250g", "500g"], image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop",
    description: "Fresh ginger root, essential for chai, cooking, and home remedies.",
    nutrition: "Calories: 80 kcal | Gingerol: 2.5mg | Vitamin B6: 0.16mg",
  },
  {
    id: "r8", name: "Garlic (Lehsun)", category: "root", price: 30, originalPrice: 40, unit: "200g",
    weightOptions: ["100g", "200g", "500g"], image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2f85?w=400&h=400&fit=crop",
    description: "Fresh garlic bulbs, a kitchen essential for flavor and health benefits.",
    nutrition: "Calories: 149 kcal | Allicin: 4.4mg | Manganese: 1.7mg",
  },
  {
    id: "r9", name: "Turnip (Shalgam)", category: "root", price: 22, originalPrice: 30, unit: "500g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1501843089957-2285de2a5ee4?w=400&h=400&fit=crop",
    description: "Fresh turnips, mildly sweet and peppery. Great for stews, pickles, and sabzi.",
    nutrition: "Calories: 28 kcal | Vitamin C: 21mg | Fiber: 1.8g",
  },
  {
    id: "r10", name: "Arbi (Colocasia)", category: "root", price: 45, originalPrice: 58, unit: "500g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=400&fit=crop",
    description: "Starchy arbi roots, delicious when fried or made into a spicy curry.",
    nutrition: "Calories: 112 kcal | Fiber: 4.1g | Potassium: 591mg",
  },

  // ===== EXOTIC FRUITS (10) =====
  {
    id: "4", name: "Fresh Mangoes", category: "exotic-fruits", price: 120, originalPrice: 180, unit: "1kg",
    weightOptions: ["500g", "1kg", "2kg"], image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop",
    description: "Alphonso mangoes, the king of fruits. Sweet, aromatic, and perfectly ripe.",
    nutrition: "Calories: 60 kcal | Vitamin C: 36mg | Sugar: 14g", trending: true, bestDeal: true,
  },
  {
    id: "10", name: "Banana (Robusta)", category: "exotic-fruits", price: 45, originalPrice: 55, unit: "1 dozen",
    weightOptions: ["6 pcs", "1 dozen"], image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
    description: "Naturally ripened robusta bananas, great for breakfast and smoothies.",
    nutrition: "Calories: 89 kcal | Potassium: 358mg | Vitamin B6: 0.4mg", bestDeal: true,
  },
  {
    id: "12", name: "Red Apples", category: "exotic-fruits", price: 150, originalPrice: 200, unit: "1kg",
    weightOptions: ["500g", "1kg", "2kg"], image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
    description: "Premium Shimla apples, crispy and sweet. A healthy snack for the whole family.",
    nutrition: "Calories: 52 kcal | Fiber: 2.4g | Vitamin C: 4.6mg", bestDeal: true,
  },
  {
    id: "e4", name: "Dragon Fruit", category: "exotic-fruits", price: 90, originalPrice: 130, unit: "1pc",
    weightOptions: ["1pc", "2pcs"], image: "https://images.unsplash.com/photo-1527325678964-54921661f888?w=400&h=400&fit=crop",
    description: "Vibrant pink dragon fruit, mildly sweet with a refreshing taste. Rich in antioxidants.",
    nutrition: "Calories: 60 kcal | Vitamin C: 3mg | Iron: 1.9mg", trending: true,
  },
  {
    id: "e5", name: "Kiwi", category: "exotic-fruits", price: 70, originalPrice: 95, unit: "3pcs",
    weightOptions: ["3pcs", "6pcs"], image: "https://images.unsplash.com/photo-1585059895524-72359e06133a?w=400&h=400&fit=crop",
    description: "Tangy green kiwis, a vitamin C powerhouse. Perfect for fruit salads and smoothies.",
    nutrition: "Calories: 61 kcal | Vitamin C: 93mg | Vitamin K: 40μg",
  },
  {
    id: "e6", name: "Avocado", category: "exotic-fruits", price: 120, originalPrice: 160, unit: "2pcs",
    weightOptions: ["1pc", "2pcs", "4pcs"], image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop",
    description: "Creamy Hass avocados, perfect for guacamole, toast, and salads.",
    nutrition: "Calories: 160 kcal | Healthy Fat: 15g | Potassium: 485mg", trending: true,
  },
  {
    id: "e7", name: "Papaya", category: "exotic-fruits", price: 40, originalPrice: 55, unit: "1pc",
    weightOptions: ["1pc", "2pcs"], image: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400&h=400&fit=crop",
    description: "Ripe papaya with sweet orange flesh. Great for digestion and skin health.",
    nutrition: "Calories: 43 kcal | Vitamin C: 61mg | Papain enzyme",
  },
  {
    id: "e8", name: "Pomegranate (Anar)", category: "exotic-fruits", price: 80, originalPrice: 110, unit: "500g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=400&fit=crop",
    description: "Ruby-red pomegranate seeds bursting with juice. Loaded with antioxidants.",
    nutrition: "Calories: 83 kcal | Vitamin C: 10mg | Fiber: 4g", bestDeal: true,
  },
  {
    id: "e9", name: "Pineapple", category: "exotic-fruits", price: 55, originalPrice: 75, unit: "1pc",
    weightOptions: ["1pc"], image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop",
    description: "Sweet tropical pineapple, hand-picked for ripeness. Great for juices and desserts.",
    nutrition: "Calories: 50 kcal | Vitamin C: 48mg | Bromelain enzyme",
  },
  {
    id: "e10", name: "Grapes (Green)", category: "exotic-fruits", price: 65, originalPrice: 85, unit: "500g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&h=400&fit=crop",
    description: "Seedless green grapes, sweet and juicy. Perfect snack or dessert topping.",
    nutrition: "Calories: 69 kcal | Vitamin C: 3.2mg | Resveratrol: 0.1mg",
  },

  // ===== SEASONAL (10) =====
  {
    id: "2", name: "Organic Tomatoes", category: "seasonal", price: 40, originalPrice: 55, unit: "500g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1592924357228-91a4daadce55?w=400&h=400&fit=crop",
    description: "Juicy organic tomatoes, vine-ripened for maximum flavor. Great for curries, salads, and sauces.",
    nutrition: "Calories: 18 kcal | Vitamin C: 14mg | Lycopene: 2.5mg", trending: true,
  },
  {
    id: "5", name: "Green Capsicum", category: "seasonal", price: 30, originalPrice: 40, unit: "250g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop",
    description: "Crisp green bell peppers, perfect for stir-fries, salads, and stuffing.",
    nutrition: "Calories: 20 kcal | Vitamin C: 80mg | Fiber: 1.7g",
  },
  {
    id: "15", name: "Cucumber", category: "seasonal", price: 20, originalPrice: 28, unit: "500g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=400&fit=crop",
    description: "Cool and crisp cucumbers, great for salads and refreshing summer drinks.",
    nutrition: "Calories: 16 kcal | Vitamin K: 16μg | Water: 95%",
  },
  {
    id: "s4", name: "Lady Finger (Bhindi)", category: "seasonal", price: 28, originalPrice: 38, unit: "250g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400&h=400&fit=crop",
    description: "Fresh tender lady fingers, perfect for bhindi masala and crispy fry.",
    nutrition: "Calories: 33 kcal | Fiber: 3.2g | Vitamin C: 23mg",
  },
  {
    id: "s5", name: "Green Peas (Matar)", category: "seasonal", price: 50, originalPrice: 65, unit: "500g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400&h=400&fit=crop",
    description: "Sweet fresh green peas, seasonal delight for pulao, matar paneer, and more.",
    nutrition: "Calories: 81 kcal | Protein: 5g | Fiber: 5g", trending: true, bestDeal: true,
  },
  {
    id: "s6", name: "Cauliflower (Gobi)", category: "seasonal", price: 30, originalPrice: 40, unit: "1pc",
    weightOptions: ["1pc", "2pcs"], image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=400&h=400&fit=crop",
    description: "Fresh white cauliflower, perfect for gobi manchurian, aloo gobi, and paratha stuffing.",
    nutrition: "Calories: 25 kcal | Vitamin C: 48mg | Vitamin K: 16μg",
  },
  {
    id: "s7", name: "Brinjal (Baingan)", category: "seasonal", price: 25, originalPrice: 32, unit: "500g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=400&h=400&fit=crop",
    description: "Glossy purple brinjals, great for bhartha, curry, and roasting.",
    nutrition: "Calories: 25 kcal | Fiber: 3g | Potassium: 229mg",
  },
  {
    id: "s8", name: "Red Capsicum", category: "seasonal", price: 50, originalPrice: 65, unit: "250g",
    weightOptions: ["250g", "500g"], image: "https://images.unsplash.com/photo-1526346698789-22fd84314424?w=400&h=400&fit=crop",
    description: "Sweet red bell peppers, high in Vitamin C. Perfect for salads and stir-fries.",
    nutrition: "Calories: 31 kcal | Vitamin C: 128mg | Vitamin A: 157μg", bestDeal: true,
  },
  {
    id: "s9", name: "Drumstick (Sahjan)", category: "seasonal", price: 35, originalPrice: 48, unit: "500g",
    weightOptions: ["250g", "500g"], image: "https://images.unsplash.com/photo-1599421498111-03d6c0a4cfae?w=400&h=400&fit=crop",
    description: "Fresh drumsticks, essential for sambar and drumstick curry.",
    nutrition: "Calories: 37 kcal | Vitamin C: 141mg | Calcium: 30mg",
  },
  {
    id: "s10", name: "Corn on the Cob", category: "seasonal", price: 15, originalPrice: 20, unit: "1pc",
    weightOptions: ["1pc", "3pcs", "6pcs"], image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=400&fit=crop",
    description: "Sweet fresh corn, perfect for roasting, boiling, or making corn chaat.",
    nutrition: "Calories: 86 kcal | Fiber: 2g | Vitamin B6: 0.1mg", trending: true,
  },

  // ===== FRESH HERBS (10) =====
  {
    id: "7", name: "Fresh Coriander", category: "herbs", price: 15, originalPrice: 20, unit: "100g",
    weightOptions: ["100g", "250g"], image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=400&fit=crop",
    description: "Aromatic fresh coriander leaves for garnishing and flavoring your dishes.",
    nutrition: "Calories: 23 kcal | Vitamin K: 310μg | Vitamin A: 337μg",
  },
  {
    id: "11", name: "Fresh Mint", category: "herbs", price: 10, originalPrice: 15, unit: "100g",
    weightOptions: ["100g", "250g"], image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400&h=400&fit=crop",
    description: "Refreshing mint leaves, perfect for chutneys, drinks, and garnishing.",
    nutrition: "Calories: 44 kcal | Iron: 5mg | Vitamin A: 212μg",
  },
  {
    id: "h3", name: "Curry Leaves (Kadi Patta)", category: "herbs", price: 10, originalPrice: 15, unit: "50g",
    weightOptions: ["50g", "100g"], image: "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?w=400&h=400&fit=crop",
    description: "Fragrant curry leaves, essential for South Indian tempering and chutneys.",
    nutrition: "Calories: 108 kcal | Iron: 0.93mg | Calcium: 810mg",
  },
  {
    id: "h4", name: "Fresh Basil (Tulsi)", category: "herbs", price: 20, originalPrice: 28, unit: "50g",
    weightOptions: ["50g", "100g"], image: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=400&h=400&fit=crop",
    description: "Holy basil leaves, used in teas, kadha, and for its medicinal properties.",
    nutrition: "Calories: 22 kcal | Vitamin K: 415μg | Iron: 3.2mg",
  },
  {
    id: "h5", name: "Lemongrass", category: "herbs", price: 15, originalPrice: 22, unit: "100g",
    weightOptions: ["100g", "250g"], image: "https://images.unsplash.com/photo-1595855759920-86e4ce1b0cd0?w=400&h=400&fit=crop",
    description: "Fragrant lemongrass stalks for teas, soups, and Thai cooking.",
    nutrition: "Calories: 99 kcal | Citral: 75% | Vitamin A: 6μg",
  },
  {
    id: "h6", name: "Dill (Suva Bhaji)", category: "herbs", price: 18, originalPrice: 25, unit: "100g",
    weightOptions: ["100g", "250g"], image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&h=400&fit=crop",
    description: "Fresh dill leaves, great for parathas, raita, and Gujarati sabzi.",
    nutrition: "Calories: 43 kcal | Vitamin C: 85mg | Manganese: 1.3mg",
  },
  {
    id: "h7", name: "Green Chillies", category: "herbs", price: 8, originalPrice: 12, unit: "100g",
    weightOptions: ["100g", "250g", "500g"], image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&h=400&fit=crop",
    description: "Spicy green chillies, essential for adding heat to any Indian dish.",
    nutrition: "Calories: 40 kcal | Vitamin C: 242mg | Capsaicin: 0.1mg", bestDeal: true,
  },
  {
    id: "h8", name: "Fresh Rosemary", category: "herbs", price: 35, originalPrice: 50, unit: "50g",
    weightOptions: ["50g", "100g"], image: "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=400&h=400&fit=crop",
    description: "Aromatic rosemary sprigs, perfect for roasted vegetables and Mediterranean dishes.",
    nutrition: "Calories: 131 kcal | Iron: 6.6mg | Calcium: 317mg",
  },
  {
    id: "h9", name: "Fresh Parsley", category: "herbs", price: 30, originalPrice: 42, unit: "100g",
    weightOptions: ["50g", "100g"], image: "https://images.unsplash.com/photo-1599629954294-5f0fef0e72c0?w=400&h=400&fit=crop",
    description: "Flat-leaf parsley, adds color and freshness to soups, salads, and garnishes.",
    nutrition: "Calories: 36 kcal | Vitamin K: 1640μg | Vitamin C: 133mg",
  },
  {
    id: "h10", name: "Fresh Thyme", category: "herbs", price: 40, originalPrice: 55, unit: "50g",
    weightOptions: ["50g", "100g"], image: "https://images.unsplash.com/photo-1509482560494-4126f8225994?w=400&h=400&fit=crop",
    description: "Earthy thyme sprigs, ideal for soups, stews, and roasted meats.",
    nutrition: "Calories: 101 kcal | Iron: 17.4mg | Vitamin C: 160mg",
  },

  // ===== CITRUS FRUITS (10) =====
  {
    id: "8", name: "Sweet Oranges", category: "citrus", price: 80, originalPrice: 100, unit: "1kg",
    weightOptions: ["500g", "1kg", "2kg"], image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&h=400&fit=crop",
    description: "Juicy Nagpur oranges, naturally sweet and loaded with Vitamin C.",
    nutrition: "Calories: 47 kcal | Vitamin C: 53mg | Fiber: 2.4g", trending: true,
  },
  {
    id: "c2", name: "Lemon (Nimbu)", category: "citrus", price: 20, originalPrice: 28, unit: "250g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&h=400&fit=crop",
    description: "Fresh lemons, a kitchen essential for drinks, marinades, and cooking.",
    nutrition: "Calories: 29 kcal | Vitamin C: 53mg | Citric Acid: 5%", bestDeal: true,
  },
  {
    id: "c3", name: "Sweet Lime (Mosambi)", category: "citrus", price: 60, originalPrice: 78, unit: "1kg",
    weightOptions: ["500g", "1kg", "2kg"], image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&h=400&fit=crop",
    description: "Refreshing mosambi, perfect for fresh juice and a great source of Vitamin C.",
    nutrition: "Calories: 43 kcal | Vitamin C: 50mg | Potassium: 490mg",
  },
  {
    id: "c4", name: "Grapefruit", category: "citrus", price: 70, originalPrice: 90, unit: "500g",
    weightOptions: ["500g", "1kg"], image: "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?w=400&h=400&fit=crop",
    description: "Tangy pink grapefruit, a refreshing breakfast fruit loaded with vitamins.",
    nutrition: "Calories: 42 kcal | Vitamin C: 31mg | Vitamin A: 58μg", trending: true,
  },
  {
    id: "c5", name: "Tangerine", category: "citrus", price: 90, originalPrice: 120, unit: "1kg",
    weightOptions: ["500g", "1kg"], image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop",
    description: "Small, sweet tangerines – easy to peel and perfect for lunchbox snacking.",
    nutrition: "Calories: 53 kcal | Vitamin C: 27mg | Fiber: 1.8g",
  },
  {
    id: "c6", name: "Kinnow", category: "citrus", price: 55, originalPrice: 70, unit: "1kg",
    weightOptions: ["500g", "1kg", "2kg"], image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&h=400&fit=crop",
    description: "Juicy Punjab kinnow, a winter favorite full of citrus flavor.",
    nutrition: "Calories: 47 kcal | Vitamin C: 55mg | Fiber: 2.3g", bestDeal: true,
  },
  {
    id: "c7", name: "Amla (Indian Gooseberry)", category: "citrus", price: 35, originalPrice: 48, unit: "250g",
    weightOptions: ["250g", "500g"], image: "https://images.unsplash.com/photo-1603048719539-9ecb4aa395e3?w=400&h=400&fit=crop",
    description: "Superfood amla, extremely rich in Vitamin C. Great for pickles, juice, and candy.",
    nutrition: "Calories: 44 kcal | Vitamin C: 600mg | Fiber: 4.3g",
  },
  {
    id: "c8", name: "Lime (Kagzi Nimbu)", category: "citrus", price: 25, originalPrice: 35, unit: "250g",
    weightOptions: ["250g", "500g"], image: "https://images.unsplash.com/photo-1546775458-0e5e66c3e6b9?w=400&h=400&fit=crop",
    description: "Small tangy limes, perfect for soda, chaat masala, and pickles.",
    nutrition: "Calories: 30 kcal | Vitamin C: 29mg | Citric Acid: 6%",
  },
  {
    id: "c9", name: "Pomelo", category: "citrus", price: 80, originalPrice: 110, unit: "1pc",
    weightOptions: ["1pc"], image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&h=400&fit=crop",
    description: "Giant citrus pomelo with sweet-tart segments. A unique seasonal treat.",
    nutrition: "Calories: 38 kcal | Vitamin C: 61mg | Potassium: 216mg",
  },
  {
    id: "c10", name: "Blood Orange", category: "citrus", price: 110, originalPrice: 150, unit: "500g",
    weightOptions: ["500g", "1kg"], image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&h=400&fit=crop",
    description: "Rare blood oranges with deep red flesh and berry-like flavor.",
    nutrition: "Calories: 50 kcal | Anthocyanins: 20mg | Vitamin C: 60mg", trending: true,
  },

  // ===== BERRIES (10) =====
  {
    id: "14", name: "Fresh Strawberries", category: "berries", price: 99, originalPrice: 140, unit: "250g",
    weightOptions: ["250g", "500g"], image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop",
    description: "Sweet and juicy strawberries, hand-picked for freshness.",
    nutrition: "Calories: 32 kcal | Vitamin C: 59mg | Manganese: 0.4mg", trending: true, bestDeal: true,
  },
  {
    id: "b2", name: "Blueberries", category: "berries", price: 180, originalPrice: 250, unit: "125g",
    weightOptions: ["125g", "250g"], image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=400&fit=crop",
    description: "Plump blueberries, antioxidant-rich superfood. Perfect for smoothies and baking.",
    nutrition: "Calories: 57 kcal | Vitamin C: 10mg | Anthocyanins: 25mg", trending: true,
  },
  {
    id: "b3", name: "Raspberries", category: "berries", price: 200, originalPrice: 280, unit: "125g",
    weightOptions: ["125g", "250g"], image: "https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=400&h=400&fit=crop",
    description: "Delicate red raspberries, sweet-tart flavor perfect for desserts.",
    nutrition: "Calories: 52 kcal | Fiber: 6.5g | Vitamin C: 26mg",
  },
  {
    id: "b4", name: "Blackberries", category: "berries", price: 160, originalPrice: 220, unit: "125g",
    weightOptions: ["125g", "250g"], image: "https://images.unsplash.com/photo-1568584711271-6c929f723e4c?w=400&h=400&fit=crop",
    description: "Juicy blackberries, rich in vitamins and perfect for jams and pies.",
    nutrition: "Calories: 43 kcal | Vitamin C: 21mg | Fiber: 5.3g", bestDeal: true,
  },
  {
    id: "b5", name: "Gooseberries (Cape)", category: "berries", price: 120, originalPrice: 160, unit: "200g",
    weightOptions: ["200g", "400g"], image: "https://images.unsplash.com/photo-1603048719539-9ecb4aa395e3?w=400&h=400&fit=crop",
    description: "Golden cape gooseberries, tangy-sweet and unique. Great for salads and desserts.",
    nutrition: "Calories: 53 kcal | Vitamin C: 11mg | Vitamin A: 36μg",
  },
  {
    id: "b6", name: "Mulberries (Shahtoot)", category: "berries", price: 80, originalPrice: 110, unit: "250g",
    weightOptions: ["250g", "500g"], image: "https://images.unsplash.com/photo-1568584711271-6c929f723e4c?w=400&h=400&fit=crop",
    description: "Fresh seasonal mulberries, sweet and dark. A rare seasonal treat.",
    nutrition: "Calories: 43 kcal | Iron: 1.9mg | Vitamin C: 36mg",
  },
  {
    id: "b7", name: "Cranberries", category: "berries", price: 220, originalPrice: 300, unit: "200g",
    weightOptions: ["200g", "400g"], image: "https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=400&h=400&fit=crop",
    description: "Tart cranberries, great for juices, sauces, and baking.",
    nutrition: "Calories: 46 kcal | Vitamin C: 14mg | Proanthocyanidins: 232mg",
  },
  {
    id: "b8", name: "Jamun (Indian Blackberry)", category: "berries", price: 60, originalPrice: 80, unit: "250g",
    weightOptions: ["250g", "500g"], image: "https://images.unsplash.com/photo-1568584711271-6c929f723e4c?w=400&h=400&fit=crop",
    description: "Seasonal jamun, deep purple and tangy. Known for blood sugar benefits.",
    nutrition: "Calories: 62 kcal | Iron: 1mg | Vitamin C: 18mg", trending: true,
  },
  {
    id: "b9", name: "Falsa (Indian Sherbet Berry)", category: "berries", price: 50, originalPrice: 68, unit: "250g",
    weightOptions: ["250g", "500g"], image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=400&fit=crop",
    description: "Tangy falsa berries, a summer favorite for refreshing sherbets and juices.",
    nutrition: "Calories: 53 kcal | Vitamin C: 22mg | Iron: 1.4mg", bestDeal: true,
  },
  {
    id: "b10", name: "Fresh Cherries", category: "berries", price: 250, originalPrice: 350, unit: "250g",
    weightOptions: ["250g", "500g"], image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=400&fit=crop",
    description: "Premium imported cherries, dark red and irresistibly sweet.",
    nutrition: "Calories: 50 kcal | Vitamin C: 7mg | Melatonin: 13ng",
  },

  // ===== GOURDS (10) =====
  {
    id: "16", name: "Bottle Gourd (Lauki)", category: "gourds", price: 35, originalPrice: 45, unit: "1pc",
    weightOptions: ["1pc", "2pcs"], image: "https://images.unsplash.com/photo-1517868163143-9a49b81ddd25?w=400&h=400&fit=crop",
    description: "Fresh bottle gourd (lauki), great for curries, juices, and healthy cooking.",
    nutrition: "Calories: 15 kcal | Fiber: 0.5g | Vitamin C: 10mg",
  },
  {
    id: "g2", name: "Bitter Gourd (Karela)", category: "gourds", price: 30, originalPrice: 40, unit: "250g",
    weightOptions: ["250g", "500g"], image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400&h=400&fit=crop",
    description: "Fresh bitter gourd, a diabetes-friendly vegetable. Great stuffed or stir-fried.",
    nutrition: "Calories: 17 kcal | Vitamin C: 84mg | Iron: 0.4mg",
  },
  {
    id: "g3", name: "Ridge Gourd (Turai)", category: "gourds", price: 25, originalPrice: 35, unit: "500g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1599421498111-03d6c0a4cfae?w=400&h=400&fit=crop",
    description: "Tender ridge gourd, perfect for light curries and dal combinations.",
    nutrition: "Calories: 20 kcal | Fiber: 0.5g | Vitamin A: 410μg",
  },
  {
    id: "g4", name: "Snake Gourd (Chichinda)", category: "gourds", price: 28, originalPrice: 38, unit: "500g",
    weightOptions: ["250g", "500g"], image: "https://images.unsplash.com/photo-1599421498111-03d6c0a4cfae?w=400&h=400&fit=crop",
    description: "Long snake gourd, mildly flavored and great for South Indian stir-fries.",
    nutrition: "Calories: 18 kcal | Fiber: 0.6g | Vitamin C: 5mg",
  },
  {
    id: "g5", name: "Ash Gourd (Petha)", category: "gourds", price: 25, originalPrice: 32, unit: "1pc",
    weightOptions: ["1pc"], image: "https://images.unsplash.com/photo-1517868163143-9a49b81ddd25?w=400&h=400&fit=crop",
    description: "Large ash gourd, used for making Agra petha sweets and healthy juice.",
    nutrition: "Calories: 13 kcal | Vitamin B3: 0.4mg | Water: 96%",
  },
  {
    id: "g6", name: "Pointed Gourd (Parwal)", category: "gourds", price: 40, originalPrice: 52, unit: "500g",
    weightOptions: ["250g", "500g"], image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=400&fit=crop",
    description: "Small pointed gourds, a delicacy in Bengali and Bihari cuisine.",
    nutrition: "Calories: 20 kcal | Vitamin A: 260μg | Fiber: 2g", bestDeal: true,
  },
  {
    id: "g7", name: "Ivy Gourd (Tindora)", category: "gourds", price: 30, originalPrice: 40, unit: "250g",
    weightOptions: ["250g", "500g"], image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=400&fit=crop",
    description: "Crunchy tindora, perfect for dry sabzi and stir-fry with spices.",
    nutrition: "Calories: 18 kcal | Fiber: 1.6g | Beta-carotene: 40μg",
  },
  {
    id: "g8", name: "Pumpkin (Kaddu)", category: "gourds", price: 20, originalPrice: 28, unit: "500g",
    weightOptions: ["500g", "1kg"], image: "https://images.unsplash.com/photo-1506917728037-b6af01a7d403?w=400&h=400&fit=crop",
    description: "Sweet orange pumpkin, versatile for curries, halwa, and soups.",
    nutrition: "Calories: 26 kcal | Vitamin A: 426μg | Potassium: 340mg", bestDeal: true,
  },
  {
    id: "g9", name: "Sponge Gourd (Ghia Tori)", category: "gourds", price: 22, originalPrice: 30, unit: "500g",
    weightOptions: ["250g", "500g"], image: "https://images.unsplash.com/photo-1599421498111-03d6c0a4cfae?w=400&h=400&fit=crop",
    description: "Soft sponge gourd, ideal for light curries with chana dal.",
    nutrition: "Calories: 20 kcal | Vitamin C: 12mg | Fiber: 0.5g",
  },
  {
    id: "g10", name: "Zucchini", category: "gourds", price: 45, originalPrice: 60, unit: "500g",
    weightOptions: ["250g", "500g", "1kg"], image: "https://images.unsplash.com/photo-1563252722-6434563a985d?w=400&h=400&fit=crop",
    description: "Fresh green zucchini, low-calorie and great for grilling, pasta, and stir-fries.",
    nutrition: "Calories: 17 kcal | Vitamin C: 18mg | Potassium: 261mg", trending: true,
  },
];
