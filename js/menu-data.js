// Single source of truth for menu data.
const MENU_DATA = [
  // Detroit pizzas
  {
    id: "p11",
    number: 11,
    category: "detroit",
    tags: ["signature"],
    price: 410,
    currencyKey: "toman",
    image: "assets/placeholders/pizza.svg",
    media: { image: "assets/placeholders/pizza.svg", video: null, poster: "assets/placeholders/pizza.svg" },
    name: { en: "Pufferoni", fa: "پافیرونی" },
    desc: {
      en: "Detroit crust, pepperoni heat, paprika oil finish.",
      fa: "کِرست دیترویتی، پپرونی تند و روغن پاپریکا."
    },
    ingredients: {
      en: ["Dough", "Pepperoni", "Spicy sauce", "Marinara", "Olives", "Paprika oil", "Cheese", "Sweet pepper pickles"],
      fa: ["خمیر", "پپرونی", "سس اسپایسی", "مارینارا", "زیتون", "روغن پاپریکا", "پنیر", "پیکل فلفل شیرین"]
    },
    recipe: [
      { label: { en: "Dough", fa: "خمیر" }, qty: 300, unit: "g" },
      { label: { en: "Pepperoni", fa: "پپرونی" }, qty: 100, unit: "g" },
      { label: { en: "Spicy sauce", fa: "سس تند" }, qty: 20, unit: "g" },
      { label: { en: "Marinara", fa: "مارینارا" }, qty: 40, unit: "g" },
      { label: { en: "Black olives", fa: "زیتون سیاه" }, qty: 15, unit: "g" },
      { label: { en: "Green oil", fa: "روغن سبز" }, qty: 2, unit: "g" },
      { label: { en: "Paprika oil", fa: "روغن پاپریکا" }, qty: 20, unit: "g" },
      { label: { en: "Cheese", fa: "پنیر" }, qty: 140, unit: "g" },
      { label: { en: "Sweet pepper pickles", fa: "پیکل فلفل شیرین" }, qty: 7, unit: "g" }
    ]
  },
  {
    id: "p12",
    number: 12,
    category: "detroit",
    tags: [],
    price: 420,
    currencyKey: "toman",
    image: "assets/placeholders/pizza.svg",
    media: { image: "assets/placeholders/pizza.svg", video: null, poster: "assets/placeholders/pizza.svg" },
    name: { en: "El Pollo", fa: "اِل پُیو" },
    desc: {
      en: "Chicken, marinara, cherry tomatoes, parsley sauce.",
      fa: "مرغ، مارینارا، گوجه گیلاسی و سس جعفری."
    },
    ingredients: {
      en: ["Dough", "Marinara", "Chicken", "Cherry tomato", "Cheese", "Paprika oil", "Green olives", "Mushrooms", "Parsley sauce", "Sweet pepper pickles"],
      fa: ["خمیر", "مارینارا", "مرغ", "گوجه گیلاسی", "پنیر", "روغن پاپریکا", "زیتون سبز", "قارچ", "سس جعفری", "پیکل فلفل شیرین"]
    },
    recipe: [
      { label: { en: "Dough", fa: "خمیر" }, qty: 300, unit: "g" },
      { label: { en: "Marinara", fa: "مارینارا" }, qty: 95, unit: "g" },
      { label: { en: "Chicken", fa: "مرغ" }, qty: 150, unit: "g" },
      { label: { en: "Cherry tomato", fa: "گوجه گیلاسی" }, qty: 26, unit: "g" },
      { label: { en: "Cheese", fa: "پنیر" }, qty: 140, unit: "g" },
      { label: { en: "Paprika oil", fa: "روغن پاپریکا" }, qty: 5, unit: "g" },
      { label: { en: "Green olives", fa: "زیتون سبز" }, qty: 25, unit: "g" },
      { label: { en: "Mushrooms", fa: "قارچ" }, qty: 40, unit: "g" },
      { label: { en: "Parsley sauce", fa: "سس جعفری" }, qty: 20, unit: "g" },
      { label: { en: "Sweet pepper pickles", fa: "پیکل فلفل شیرین" }, qty: 7, unit: "g" }
    ]
  },
  {
    id: "p13",
    number: 13,
    category: "detroit",
    tags: [],
    price: 490,
    currencyKey: "toman",
    image: "assets/placeholders/pizza.svg",
    media: { image: "assets/placeholders/pizza.svg", video: null, poster: "assets/placeholders/pizza.svg" },
    name: { en: "Neanderthal", fa: "نئاندرتال" },
    desc: {
      en: "Mushroom sauce, walnuts, parsley oil lift.",
      fa: "سس قارچ، گردو و عطر روغن جعفری."
    },
    ingredients: {
      en: ["Dough", "Mushroom sauce", "Mushrooms", "Cheese", "Parsley sauce", "Parsley oil", "Parmesan dip", "Walnut", "Sweet pepper pickles"],
      fa: ["خمیر", "سس قارچ", "قارچ", "پنیر", "سس جعفری", "روغن جعفری", "دیپ پارمزان", "گردو", "پیکل فلفل شیرین"]
    },
    recipe: [
      { label: { en: "Dough", fa: "خمیر" }, qty: 300, unit: "g" },
      { label: { en: "Mushroom sauce", fa: "سس قارچ" }, qty: 120, unit: "g" },
      { label: { en: "Mushrooms", fa: "قارچ" }, qty: 65, unit: "g" },
      { label: { en: "Cheese", fa: "پنیر" }, qty: 140, unit: "g" },
      { label: { en: "Parsley sauce", fa: "سس جعفری" }, qty: 25, unit: "g" },
      { label: { en: "Parsley oil", fa: "روغن جعفری" }, qty: 2, unit: "g" },
      { label: { en: "Parmesan dip", fa: "دیپ پارمزان" }, qty: 30, unit: "g" },
      { label: { en: "Walnut", fa: "گردو خرد شده" }, qty: 15, unit: "g" },
      { label: { en: "Sweet pepper pickles", fa: "پیکل فلفل شیرین" }, qty: 7, unit: "g" }
    ]
  },
  {
    id: "p14",
    number: 14,
    category: "detroit",
    tags: [],
    price: 430,
    currencyKey: "toman",
    image: "assets/placeholders/pizza.svg",
    media: { image: "assets/placeholders/pizza.svg", video: null, poster: "assets/placeholders/pizza.svg" },
    name: { en: "Egg Plant", fa: "اِگ پلَنِت" },
    desc: {
      en: "Chicken, eggplant, lemon butter drizzle.",
      fa: "مرغ، بادمجان و چکه کره لیمو."
    },
    ingredients: {
      en: ["Dough", "Cream sauce", "Chicken", "Eggplant", "Green olives", "Cheese", "Lemon butter", "Paprika oil", "Green oil", "Sweet pepper pickles"],
      fa: ["خمیر", "سس کرِمی", "مرغ", "بادمجان", "زیتون سبز", "پنیر", "کره لیمو", "روغن پاپریکا", "روغن سبز", "پیکل فلفل شیرین"]
    },
    recipe: [
      { label: { en: "Dough", fa: "خمیر" }, qty: 300, unit: "g" },
      { label: { en: "Cream sauce", fa: "سس کرِمی" }, qty: 60, unit: "g" },
      { label: { en: "Chicken", fa: "مرغ" }, qty: 150, unit: "g" },
      { label: { en: "Eggplant", fa: "بادمجان" }, qty: 30, unit: "g" },
      { label: { en: "Green olives", fa: "زیتون سبز" }, qty: 25, unit: "g" },
      { label: { en: "Cheese", fa: "پنیر" }, qty: 140, unit: "g" },
      { label: { en: "Lemon butter", fa: "کره لیمو" }, qty: 25, unit: "g" },
      { label: { en: "Paprika oil", fa: "روغن پاپریکا" }, qty: 2, unit: "g" },
      { label: { en: "Green oil", fa: "روغن سبز" }, qty: 2, unit: "g" },
      { label: { en: "Sweet pepper pickles", fa: "پیکل فلفل شیرین" }, qty: 7, unit: "g" }
    ]
  },
  {
    id: "p15",
    number: 15,
    category: "detroit",
    tags: ["signature"],
    price: 440,
    currencyKey: "toman",
    image: "assets/placeholders/pizza.svg",
    media: { image: "assets/placeholders/pizza.svg", video: null, poster: "assets/placeholders/pizza.svg" },
    name: { en: "Creamy Crunch", fa: "کْریمی کرانچ" },
    desc: {
      en: "Cream sauce, bacon, corn crunch, rashio note.",
      fa: "سس کرمی، بیکن، تردی ذرت و سس رشیو."
    },
    ingredients: {
      en: ["Dough", "Cream sauce", "Bacon", "Cheese", "Corn", "Mushrooms", "Rashio sauce", "Sweet pepper pickles"],
      fa: ["خمیر", "سس کرمی", "بیکن", "پنیر", "ذرت", "قارچ", "سس رشیو", "پیکل فلفل شیرین"]
    },
    recipe: [
      { label: { en: "Dough", fa: "خمیر" }, qty: 300, unit: "g" },
      { label: { en: "Cream sauce", fa: "سس کرمی" }, qty: 60, unit: "g" },
      { label: { en: "Bacon", fa: "بیکن" }, qty: 100, unit: "g" },
      { label: { en: "Cheese", fa: "پنیر" }, qty: 140, unit: "g" },
      { label: { en: "Corn", fa: "ذرت" }, qty: 8, unit: "g" },
      { label: { en: "Mushrooms", fa: "قارچ" }, qty: 40, unit: "g" },
      { label: { en: "Rashio sauce", fa: "سس رشیو" }, qty: 10, unit: "g" },
      { label: { en: "Sweet pepper pickles", fa: "پیکل فلفل شیرین" }, qty: 7, unit: "g" }
    ]
  },
  {
    id: "p16",
    number: 16,
    category: "detroit",
    tags: ["signature"],
    price: 520,
    currencyKey: "toman",
    image: "assets/placeholders/pizza.svg",
    media: { image: "assets/placeholders/pizza.svg", video: null, poster: "assets/placeholders/pizza.svg" },
    name: { en: "Pulled Beef", fa: "پُلد بیف" },
    desc: {
      en: "Pulled beef, rosa sauce, caramelized onion.",
      fa: "بیف پولد، سس رزا و پیاز کاراملی."
    },
    ingredients: {
      en: ["Dough", "Rosa sauce", "Pulled beef", "Gouda slices", "Cheese", "Garlic sauce", "Mushrooms", "Caramelized onion", "Sweet pepper pickles"],
      fa: ["خمیر", "سس رُزا", "بیف پولد", "گودا اسلایس", "پنیر", "سس سیر", "قارچ", "پیاز کاراملی", "پیکل فلفل شیرین"]
    },
    recipe: [
      { label: { en: "Dough", fa: "خمیر" }, qty: 300, unit: "g" },
      { label: { en: "Rosa sauce (cream+garlic)", fa: "سس رُزا (کرِم+سیر)" }, qty: 60, unit: "g" },
      { label: { en: "Pulled beef", fa: "بیف پولد" }, qty: 110, unit: "g" },
      { label: { en: "Gouda slices", fa: "گودا (اسلایس)" }, qty: 36, unit: "g" },
      { label: { en: "Cheese", fa: "پنیر" }, qty: 140, unit: "g" },
      { label: { en: "Garlic sauce", fa: "سس سیر" }, qty: 20, unit: "g" },
      { label: { en: "Mushrooms", fa: "قارچ" }, qty: 30, unit: "g" },
      { label: { en: "Caramelized onion", fa: "پیاز کاراملی" }, qty: 8, unit: "g" },
      { label: { en: "Sweet pepper pickles", fa: "پیکل فلفل شیرین" }, qty: 7, unit: "g" }
    ]
  },
  // Burgers
  {
    id: "b1",
    number: 1,
    category: "burgers",
    tags: ["signature"],
    price: 520,
    currencyKey: "toman",
    image: "assets/placeholders/burger.svg",
    media: { image: "assets/placeholders/burger.svg", video: null, poster: "assets/placeholders/burger.svg" },
    name: { en: "Daft Cheese", fa: "دَفت چیز" },
    desc: {
      en: "Fries + beef, halloumi, gouda, rashio, olives.",
      fa: "به همراه سیب‌زمینی؛ بیف، حلومی، گودا، رشیو، زیتون."
    },
    ingredients: {
      en: ["Bun", "Beef", "Halloumi", "Gouda", "Rashio", "Lettuce", "Green olives", "Pickles"],
      fa: ["نان", "بیف", "پنیر حلومی", "گودا", "سس رشیو", "کاهو", "زیتون سبز", "پیکل"]
    },
    recipe: [
      { label: { en: "Bun", fa: "نان" }, qty: 100, unit: "g" },
      { label: { en: "Beef", fa: "بیف" }, qty: 130, unit: "g" },
      { label: { en: "Halloumi", fa: "حلومی" }, qty: 40, unit: "g" },
      { label: { en: "Gouda", fa: "گودا" }, qty: 18, unit: "g" },
      { label: { en: "Rashio (top+bottom)", fa: "رشیو (بالا/پایین)" }, qty: 30, unit: "g" },
      { label: { en: "Lettuce", fa: "کاهو" }, qty: 25, unit: "g" },
      { label: { en: "Green olives", fa: "زیتون سبز" }, qty: 16, unit: "g" },
      { label: { en: "Pickles", fa: "پیکل" }, qty: 10, unit: "g" }
    ]
  },
  {
    id: "b2",
    number: 2,
    category: "burgers",
    tags: [],
    price: 495,
    currencyKey: "toman",
    image: "assets/placeholders/burger.svg",
    media: { image: "assets/placeholders/burger.svg", video: null, poster: "assets/placeholders/burger.svg" },
    name: { en: "Magic Beef", fa: "مجیک بیف" },
    desc: {
      en: "Fries + beef, bacon, mushrooms, rashio, crunch.",
      fa: "به همراه سیب‌زمینی؛ بیف، بیکن، قارچ، رشیو و تردی."
    },
    ingredients: {
      en: ["Bun", "Beef", "Rashio", "Gouda", "Bacon", "Mushrooms", "Lettuce", "Caramelized onion", "Tomato", "Pickles", "Chips"],
      fa: ["نان", "بیف", "رشیو", "گودا", "بیکن", "قارچ", "کاهو", "پیاز کاراملی", "گوجه", "پیکل", "چیپس"]
    },
    recipe: [
      { label: { en: "Bun", fa: "نان" }, qty: 100, unit: "g" },
      { label: { en: "Beef", fa: "بیف" }, qty: 130, unit: "g" },
      { label: { en: "Rashio (top+bottom)", fa: "رشیو (بالا/پایین)" }, qty: 30, unit: "g" },
      { label: { en: "Gouda", fa: "گودا" }, qty: 18, unit: "g" },
      { label: { en: "Bacon", fa: "بیکن" }, qty: 30, unit: "g" },
      { label: { en: "Mushrooms", fa: "قارچ" }, qty: 25, unit: "g" },
      { label: { en: "Lettuce", fa: "کاهو" }, qty: 25, unit: "g" },
      { label: { en: "Caramelized onion", fa: "پیاز کاراملی" }, qty: 20, unit: "g" },
      { label: { en: "Tomato", fa: "گوجه" }, qty: 35, unit: "g" },
      { label: { en: "Pickles", fa: "پیکل" }, qty: 10, unit: "g" },
      { label: { en: "Chips", fa: "چیپس" }, qty: 20, unit: "g" }
    ]
  },
  {
    id: "b3",
    number: 3,
    category: "burgers",
    tags: [],
    price: 495,
    currencyKey: "toman",
    image: "assets/placeholders/burger.svg",
    media: { image: "assets/placeholders/burger.svg", video: null, poster: "assets/placeholders/burger.svg" },
    name: { en: "Parmigiano", fa: "پارمیجانو" },
    desc: {
      en: "Fries + beef, mozzarella, parmesan dip, chips.",
      fa: "به همراه سیب‌زمینی؛ بیف، موزارلا، دیپ پارمزان و چیپس."
    },
    ingredients: {
      en: ["Bun", "Beef", "Rashio", "Lettuce", "Mozzarella", "Parmesan dip", "Chips"],
      fa: ["نان", "بیف", "رشیو", "کاهو", "موزارلا", "دیپ پارمزان", "چیپس"]
    },
    recipe: [
      { label: { en: "Bun", fa: "نان" }, qty: 100, unit: "g" },
      { label: { en: "Beef", fa: "بیف" }, qty: 130, unit: "g" },
      { label: { en: "Rashio (top+bottom)", fa: "رشیو (بالا/پایین)" }, qty: 30, unit: "g" },
      { label: { en: "Lettuce", fa: "کاهو" }, qty: 25, unit: "g" },
      { label: { en: "Mozzarella slice", fa: "موزارلا اسلایس" }, qty: 18, unit: "g" },
      { label: { en: "Parmesan dip", fa: "دیپ پارمزان" }, qty: 20, unit: "g" },
      { label: { en: "Chips", fa: "چیپس" }, qty: 20, unit: "g" }
    ]
  },
  {
    id: "b4",
    number: 4,
    category: "burgers",
    tags: [],
    price: 495,
    currencyKey: "toman",
    image: "assets/placeholders/burger.svg",
    media: { image: "assets/placeholders/burger.svg", video: null, poster: "assets/placeholders/burger.svg" },
    name: { en: "Deep Cheese", fa: "دیپ چیز" },
    desc: {
      en: "Fries + beef, gouda dip, rashio, mayo-capri.",
      fa: "به همراه سیب‌زمینی؛ بیف، دیپ گودا، رشیو و مایو کاپری."
    },
    ingredients: {
      en: ["Bun", "Beef", "Gouda cheese dip", "Lettuce", "Pickles", "Rashio", "Mayo-capri"],
      fa: ["نان", "بیف", "دیپ پنیر گودا", "کاهو", "پیکل", "رشیو", "مایو کاپری"]
    },
    recipe: [
      { label: { en: "Bun", fa: "نان" }, qty: 100, unit: "g" },
      { label: { en: "Beef", fa: "بیف" }, qty: 130, unit: "g" },
      { label: { en: "Gouda cheese dip", fa: "دیپ پنیر گودا" }, qty: 50, unit: "g" },
      { label: { en: "Lettuce", fa: "کاهو" }, qty: 25, unit: "g" },
      { label: { en: "Pickles", fa: "پیکل" }, qty: 10, unit: "g" },
      { label: { en: "Rashio (top+bottom)", fa: "رشیو (بالا/پایین)" }, qty: 30, unit: "g" },
      { label: { en: "Mayo-capri", fa: "مایو کاپری" }, qty: 20, unit: "g" }
    ]
  },
  {
    id: "b5",
    number: 5,
    category: "burgers",
    tags: ["spicy"],
    price: 430,
    currencyKey: "toman",
    image: "assets/placeholders/burger.svg",
    media: { image: "assets/placeholders/burger.svg", video: null, poster: "assets/placeholders/burger.svg" },
    name: { en: "JillyzWilliz", fa: "جیلیزویلیز" },
    desc: {
      en: "Fries + beef, spicy sauce, jalapeno, rashio.",
      fa: "به همراه سیب‌زمینی؛ بیف، سس اسپایسی، هالاپینو و رشیو."
    },
    ingredients: {
      en: ["Bun", "Beef", "Spicy sauce", "Rashio", "Jalapeno", "Gouda"],
      fa: ["نان", "بیف", "سس اسپایسی", "رشیو", "هالاپینو", "گودا"]
    },
    recipe: [
      { label: { en: "Bun", fa: "نان" }, qty: 100, unit: "g" },
      { label: { en: "Beef", fa: "بیف" }, qty: 130, unit: "g" },
      { label: { en: "Spicy sauce", fa: "سس تند" }, qty: 7, unit: "g" },
      { label: { en: "Rashio (top+bottom)", fa: "رشیو (بالا/پایین)" }, qty: 30, unit: "g" },
      { label: { en: "Jalapeno", fa: "هالاپینو" }, qty: 10, unit: "g" },
      { label: { en: "Gouda", fa: "گودا" }, qty: 18, unit: "g" }
    ]
  },
  {
    id: "b6",
    number: 6,
    category: "burgers",
    tags: [],
    price: 520,
    currencyKey: "toman",
    image: "assets/placeholders/burger.svg",
    media: { image: "assets/placeholders/burger.svg", video: null, poster: "assets/placeholders/burger.svg" },
    name: { en: "Caramelized Sausage", fa: "کاراملایز ساسج" },
    desc: {
      en: "Fries + beef, gouda, sausage marmalade, coleslaw.",
      fa: "به همراه سیب‌زمینی؛ بیف، گودا، مارمالاد سوسیس و کلم سالاد."
    },
    ingredients: {
      en: ["Bun", "Beef", "Gouda", "Sausage marmalade", "Coleslaw", "Rashio", "Parsley sauce", "Tomato", "Pickles"],
      fa: ["نان", "بیف", "گودا", "مارمالاد سوسیس", "کلم‌سالاد", "رشیو", "سس جعفری", "گوجه", "پیکل"]
    },
    recipe: [
      { label: { en: "Bun", fa: "نان" }, qty: 100, unit: "g" },
      { label: { en: "Beef", fa: "بیف" }, qty: 130, unit: "g" },
      { label: { en: "Gouda", fa: "گودا" }, qty: 18, unit: "g" },
      { label: { en: "Sausage marmalade", fa: "مارمالاد سوسیس" }, qty: 50, unit: "g" },
      { label: { en: "Coleslaw (with seeds)", fa: "کلم‌سالاد" }, qty: 45, unit: "g" },
      { label: { en: "Rashio (top+bottom)", fa: "رشیو (بالا/پایین)" }, qty: 30, unit: "g" },
      { label: { en: "Parsley sauce", fa: "سس جعفری" }, qty: 10, unit: "g" },
      { label: { en: "Tomato", fa: "گوجه" }, qty: 35, unit: "g" },
      { label: { en: "Pickles", fa: "پیکل" }, qty: 10, unit: "g" }
    ]
  },
  // Hotdogs
  {
    id: "h21",
    number: 21,
    category: "hotdogs",
    tags: ["signature"],
    price: 340,
    currencyKey: "toman",
    image: "assets/placeholders/hotdog.svg",
    media: { image: "assets/placeholders/hotdog.svg", video: null, poster: "assets/placeholders/hotdog.svg" },
    name: { en: "Hunter", fa: "هانتِر" },
    desc: {
      en: "Fries + sausage, lemon butter, pickled onion.",
      fa: "به همراه سیب‌زمینی؛ سوسیس، کره لیمو و پیاز شور."
    },
    ingredients: {
      en: ["Bun", "Lemon butter", "Sausage", "Pickle-onion", "Corn", "Olives", "Jar cheese", "Parsley sauce"],
      fa: ["نان", "کره لیمو", "سوسیس", "پیاز شور", "ذرت", "زیتون", "پنیر جارن", "سس جعفری"]
    },
    recipe: [
      { label: { en: "Bun", fa: "نان" }, qty: 90, unit: "g" },
      { label: { en: "Lemon butter", fa: "کره لیمو" }, qty: 20, unit: "g" },
      { label: { en: "Sausage", fa: "سوسیس" }, qty: 70, unit: "g" },
      { label: { en: "Pickle-onion", fa: "پیاز شور" }, qty: 14, unit: "g" },
      { label: { en: "Corn", fa: "ذرت" }, qty: 10, unit: "g" },
      { label: { en: "Olives", fa: "زیتون" }, qty: 6, unit: "g" },
      { label: { en: "Jar cheese", fa: "پنیر جار" }, qty: 8, unit: "g" },
      { label: { en: "Parsley sauce", fa: "سس جعفری" }, qty: 6, unit: "g" }
    ]
  },
  {
    id: "h22",
    number: 22,
    category: "hotdogs",
    tags: ["spicy"],
    price: 290,
    currencyKey: "toman",
    image: "assets/placeholders/hotdog.svg",
    media: { image: "assets/placeholders/hotdog.svg", video: null, poster: "assets/placeholders/hotdog.svg" },
    name: { en: "Kishi", fa: "کیشی" },
    desc: {
      en: "Fries + sausage, spicy kick, parsley sauce.",
      fa: "به همراه سیب‌زمینی؛ سوسیس، تندی سس و سس جعفری."
    },
    ingredients: {
      en: ["Bun", "Spicy sauce", "Sausage", "Parsley sauce", "Paprika oil", "Caramelized onion", "Pickle-onion"],
      fa: ["نان", "سس اسپایسی", "سوسیس", "سس جعفری", "روغن پاپریکا", "پیاز کاراملی", "پیاز شور"]
    },
    recipe: [
      { label: { en: "Bun", fa: "نان" }, qty: 90, unit: "g" },
      { label: { en: "Spicy sauce", fa: "سس تند" }, qty: 2, unit: "g" },
      { label: { en: "Sausage", fa: "سوسیس" }, qty: 70, unit: "g" },
      { label: { en: "Parsley sauce", fa: "سس جعفری" }, qty: 6, unit: "g" },
      { label: { en: "Paprika oil", fa: "روغن پاپریکا" }, qty: 2, unit: "g" },
      { label: { en: "Caramelized onion", fa: "پیاز کاراملی" }, qty: 18, unit: "g" },
      { label: { en: "Pickle-onion", fa: "پیاز شور" }, qty: 14, unit: "g" }
    ]
  },
  {
    id: "h23",
    number: 23,
    category: "hotdogs",
    tags: [],
    price: 330,
    currencyKey: "toman",
    image: "assets/placeholders/hotdog.svg",
    media: { image: "assets/placeholders/hotdog.svg", video: null, poster: "assets/placeholders/hotdog.svg" },
    name: { en: "Culture", fa: "کالچِر" },
    desc: {
      en: "Fries + honey mustard, sausage, cheetos crunch.",
      fa: "به همراه سیب‌زمینی؛ سس عسل خردل، سوسیس و تردی چیتوز."
    },
    ingredients: {
      en: ["Bun", "Honey mustard", "Sausage", "Pickle-onion", "Cherry tomato", "Black olives", "Cheese dip", "Parsley", "Cheetos"],
      fa: ["نان", "سس عسل خردل", "سوسیس", "پیاز شور", "گوجه گیلاسی", "زیتون سیاه", "دیپ پنیر", "جعفری", "چیتوز"]
    },
    recipe: [
      { label: { en: "Bun", fa: "نان" }, qty: 90, unit: "g" },
      { label: { en: "Honey mustard", fa: "سس عسل خردل" }, qty: 20, unit: "g" },
      { label: { en: "Sausage", fa: "سوسیس" }, qty: 73, unit: "g" },
      { label: { en: "Pickle-onion", fa: "پیاز شور" }, qty: 14, unit: "g" },
      { label: { en: "Cherry tomato", fa: "گوجه گیلاسی" }, qty: 10, unit: "g" },
      { label: { en: "Black olives", fa: "زیتون سیاه" }, qty: 6, unit: "g" },
      { label: { en: "Cheese dip", fa: "دیپ پنیر" }, qty: 15, unit: "g" },
      { label: { en: "Parsley", fa: "جعفری" }, qty: 2, unit: "g" },
      { label: { en: "Cheetos", fa: "چیتوز" }, qty: 4, unit: "g" }
    ]
  },
  {
    id: "h24",
    number: 24,
    category: "hotdogs",
    tags: [],
    price: 320,
    currencyKey: "toman",
    image: "assets/placeholders/hotdog.svg",
    media: { image: "assets/placeholders/hotdog.svg", video: null, poster: "assets/placeholders/hotdog.svg" },
    name: { en: "Concheese", fa: "کانچیز" },
    desc: {
      en: "Fries + lemon butter, garlic sauce, mozzarella.",
      fa: "به همراه سیب‌زمینی؛ کره لیمو، سس سیر و موزارلا."
    },
    ingredients: {
      en: ["Bun", "Lemon butter", "Sausage", "Garlic sauce", "Crunchy topping", "Mozzarella", "Gouda cheese dip", "Pickle-onion"],
      fa: ["نان", "کره لیمو", "سوسیس", "سس سیر", "تاپینگ کرانچی", "موزارلا", "دیپ پنیر گودا", "پیاز شور"]
    },
    recipe: [
      { label: { en: "Bun", fa: "نان" }, qty: 90, unit: "g" },
      { label: { en: "Lemon butter", fa: "کره لیمو" }, qty: 20, unit: "g" },
      { label: { en: "Sausage", fa: "سوسیس" }, qty: 70, unit: "g" },
      { label: { en: "Garlic sauce", fa: "سس سیر" }, qty: 8, unit: "g" },
      { label: { en: "Crunchy topping", fa: "کرانچی" }, qty: 4, unit: "g" },
      { label: { en: "Mozzarella", fa: "موزارلا" }, qty: 18, unit: "g" },
      { label: { en: "Gouda cheese dip", fa: "دیپ پنیر گودا" }, qty: 15, unit: "g" },
      { label: { en: "Pickle-onion", fa: "پیاز شور" }, qty: 14, unit: "g" }
    ]
  },
  {
    id: "h25",
    number: 25,
    category: "hotdogs",
    tags: [],
    price: 310,
    currencyKey: "toman",
    image: "assets/placeholders/hotdog.svg",
    media: { image: "assets/placeholders/hotdog.svg", video: null, poster: "assets/placeholders/hotdog.svg" },
    name: { en: "Ki Ki", fa: "کی کی" },
    desc: {
      en: "Fries + sausage, coleslaw, paprika oil, olives.",
      fa: "به همراه سیب‌زمینی؛ سوسیس، کلم‌سالاد، روغن پاپریکا و زیتون."
    },
    ingredients: {
      en: ["Bun", "Rashio", "Sausage", "Coleslaw", "Parsley sauce", "Paprika oil", "Black olives", "Cherry tomato"],
      fa: ["نان", "رشیو", "سوسیس", "کلم‌سالاد", "سس جعفری", "روغن پاپریکا", "زیتون سیاه", "گوجه گیلاسی"]
    },
    recipe: [
      { label: { en: "Bun", fa: "نان" }, qty: 90, unit: "g" },
      { label: { en: "Rashio", fa: "رشیو" }, qty: 8, unit: "g" },
      { label: { en: "Sausage", fa: "سوسیس" }, qty: 70, unit: "g" },
      { label: { en: "Coleslaw", fa: "کلم‌سالاد" }, qty: 40, unit: "g" },
      { label: { en: "Parsley sauce", fa: "سس جعفری" }, qty: 6, unit: "g" },
      { label: { en: "Paprika oil", fa: "روغن پاپریکا" }, qty: 2, unit: "g" },
      { label: { en: "Black olives", fa: "زیتون سیاه" }, qty: 6, unit: "g" },
      { label: { en: "Cherry tomato", fa: "گوجه گیلاسی" }, qty: 10, unit: "g" }
    ]
  },
  // Sauces (no price)
  {
    id: "s1",
    number: 101,
    category: "sauces",
    tags: [],
    price: null,
    currencyKey: "toman",
    image: "assets/placeholders/fries.svg",
    media: { image: "assets/placeholders/fries.svg", video: null, poster: "assets/placeholders/fries.svg" },
    name: { en: "Lemon Butter", fa: "کره لیمو" },
    desc: { en: "Butter sauce with a lemon twist.", fa: "سس کره با طعم لیمو." },
    ingredients: {
      en: ["Butter", "Lemon zest", "Herbs"],
      fa: ["کره", "رنده لیمو", "سبزیجات"]
    },
    recipe: []
  },
  {
    id: "s2",
    number: 102,
    category: "sauces",
    tags: [],
    price: null,
    currencyKey: "toman",
    image: "assets/placeholders/fries.svg",
    media: { image: "assets/placeholders/fries.svg", video: null, poster: "assets/placeholders/fries.svg" },
    name: { en: "Parsley", fa: "جعفری" },
    desc: { en: "Fresh parsley sauce.", fa: "سس جعفری تازه." },
    ingredients: { en: ["Parsley", "Oil", "Garlic"], fa: ["جعفری", "روغن", "سیر"] },
    recipe: []
  },
  {
    id: "s3",
    number: 103,
    category: "sauces",
    tags: ["signature"],
    price: null,
    currencyKey: "toman",
    image: "assets/placeholders/fries.svg",
    media: { image: "assets/placeholders/fries.svg", video: null, poster: "assets/placeholders/fries.svg" },
    name: { en: "Rashio", fa: "رشیو" },
    desc: { en: "Puffy Patty signature sauce.", fa: "سس مخصوص پافی پتی." },
    ingredients: { en: ["Secret blend"], fa: ["ترکیب مخصوص"] },
    recipe: []
  },
  {
    id: "s4",
    number: 104,
    category: "sauces",
    tags: [],
    price: null,
    currencyKey: "toman",
    image: "assets/placeholders/fries.svg",
    media: { image: "assets/placeholders/fries.svg", video: null, poster: "assets/placeholders/fries.svg" },
    name: { en: "Mushroom", fa: "قارچ" },
    desc: { en: "Thick mushroom sauce.", fa: "سس غلیظ قارچ." },
    ingredients: { en: ["Mushrooms", "Cream", "Garlic"], fa: ["قارچ", "کرِم", "سیر"] },
    recipe: []
  },
  {
    id: "s5",
    number: 105,
    category: "sauces",
    tags: ["spicy"],
    price: null,
    currencyKey: "toman",
    image: "assets/placeholders/fries.svg",
    media: { image: "assets/placeholders/fries.svg", video: null, poster: "assets/placeholders/fries.svg" },
    name: { en: "Spicy", fa: "تند" },
    desc: { en: "Hot pepper sauce.", fa: "سس فلفل تند." },
    ingredients: { en: ["Chili peppers", "Oil"], fa: ["فلفل چیلی", "روغن"] },
    recipe: []
  },
  {
    id: "s6",
    number: 106,
    category: "sauces",
    tags: [],
    price: null,
    currencyKey: "toman",
    image: "assets/placeholders/fries.svg",
    media: { image: "assets/placeholders/fries.svg", video: null, poster: "assets/placeholders/fries.svg" },
    name: { en: "Cream", fa: "خامه" },
    desc: { en: "Creamy & mild.", fa: "کرِمی و ملایم." },
    ingredients: { en: ["Cream", "Milk"], fa: ["کرِم", "شیر"] },
    recipe: []
  },
  // Drinks
  {
    id: "d1",
    number: 201,
    category: "drinks",
    tags: [],
    price: null,
    currencyKey: "toman",
    image: "assets/placeholders/drink.svg",
    media: { image: "assets/placeholders/drink.svg", video: null, poster: "assets/placeholders/drink.svg" },
    name: { en: "Soda", fa: "نوشابه" },
    desc: { en: "Based on approved tariff.", fa: "طبق نرخ مصوب." },
    ingredients: { en: ["Chilled soda"], fa: ["نوشابه خنک"] },
    recipe: []
  },
  {
    id: "d2",
    number: 202,
    category: "drinks",
    tags: [],
    price: null,
    currencyKey: "toman",
    image: "assets/placeholders/drink.svg",
    media: { image: "assets/placeholders/drink.svg", video: null, poster: "assets/placeholders/drink.svg" },
    name: { en: "Mineral Water", fa: "آب معدنی" },
    desc: { en: "Based on approved tariff.", fa: "طبق نرخ مصوب." },
    ingredients: { en: ["Mineral water"], fa: ["آب معدنی"] },
    recipe: []
  }
];
