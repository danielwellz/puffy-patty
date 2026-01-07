import { ChecklistType } from "../checklists/checklist-template.entity";
import { RecipeIngredient } from "../recipes/recipe.entity";
import { ShiftType } from "../shifts/shift.entity";
import { UserRole } from "../users/user.entity";

export type SeedUser = { phone: string; name: string; role: UserRole; password: string; branchId?: string };

export const seedUsers: SeedUser[] = [
  { phone: "09120001000", name: "مدیر اصلی", role: UserRole.Manager, password: "password123", branchId: "main" },
  { phone: "09120000001", name: "سروش", role: UserRole.HeadChef, password: "password123", branchId: "main" },
  { phone: "09120000002", name: "احسان", role: UserRole.KitchenStaff, password: "password123", branchId: "main" },
  { phone: "09120000003", name: "نسترن", role: UserRole.KitchenStaff, password: "password123", branchId: "main" },
  { phone: "09120000004", name: "طنین", role: UserRole.KitchenStaff, password: "password123", branchId: "main" },
  { phone: "09120000005", name: "فریماه", role: UserRole.KitchenStaff, password: "password123", branchId: "main" }
];

export const seedRecipes: { name: string; category: string; ingredients: RecipeIngredient[]; notes?: string }[] = [
  {
    name: "پافیرونی",
    category: "پیتزا",
    ingredients: [
      { item: "خمیر پیتزا", amount: 300, unit: "گرم" },
      { item: "مارینارا", amount: 40, unit: "گرم" },
      { item: "سس تند", amount: 20, unit: "گرم" },
      { item: "پنیر", amount: 140, unit: "گرم" },
      { item: "پپرونی", amount: 100, unit: "گرم" },
      { item: "روغن پاپریکا", amount: 20, unit: "گرم" },
      { item: "پیکل فلفل شیرین", amount: 7, unit: "گرم" }
    ],
    notes: "پیتزای دیترویتی با پپرونی و روغن پاپریکا"
  },
  {
    name: "اِل پُیو",
    category: "پیتزا",
    ingredients: [
      { item: "خمیر پیتزا", amount: 300, unit: "گرم" },
      { item: "مارینارا", amount: 95, unit: "گرم" },
      { item: "فیله مرغ", amount: 150, unit: "گرم" },
      { item: "گوجه گیلاسی", amount: 26, unit: "گرم" },
      { item: "پنیر", amount: 140, unit: "گرم" },
      { item: "زیتون سبز", amount: 25, unit: "گرم" },
      { item: "قارچ", amount: 40, unit: "گرم" },
      { item: "سس جعفری", amount: 20, unit: "گرم" },
      { item: "پیکل فلفل شیرین", amount: 7, unit: "گرم" }
    ]
  },
  {
    name: "نئاندرتال",
    category: "پیتزا",
    ingredients: [
      { item: "خمیر پیتزا", amount: 300, unit: "گرم" },
      { item: "سس قارچ", amount: 120, unit: "گرم" },
      { item: "قارچ", amount: 65, unit: "گرم" },
      { item: "پنیر", amount: 140, unit: "گرم" },
      { item: "سس جعفری", amount: 25, unit: "گرم" },
      { item: "روغن جعفری", amount: 2, unit: "گرم" },
      { item: "دیپ پارمزان", amount: 30, unit: "گرم" },
      { item: "گردو خرد شده", amount: 15, unit: "گرم" }
    ],
    notes: "سس قارچ و گردو، الهام از دفترچه دستور"
  },
  {
    name: "کْریمی کرانچ",
    category: "پیتزا",
    ingredients: [
      { item: "خمیر پیتزا", amount: 300, unit: "گرم" },
      { item: "سس کرمی", amount: 60, unit: "گرم" },
      { item: "بیکن", amount: 100, unit: "گرم" },
      { item: "پنیر", amount: 140, unit: "گرم" },
      { item: "ذرت", amount: 8, unit: "گرم" },
      { item: "قارچ", amount: 40, unit: "گرم" },
      { item: "سس رشیو", amount: 10, unit: "گرم" }
    ]
  },
  {
    name: "پُلد بیف",
    category: "پیتزا",
    ingredients: [
      { item: "خمیر پیتزا", amount: 300, unit: "گرم" },
      { item: "سس رزا (کرمی + سیر)", amount: 60, unit: "گرم" },
      { item: "بیف پولد", amount: 110, unit: "گرم" },
      { item: "پنیر", amount: 140, unit: "گرم" },
      { item: "پنیر گودا ورقه‌ای", amount: 36, unit: "گرم" },
      { item: "سس سیر", amount: 20, unit: "گرم" },
      { item: "قارچ", amount: 30, unit: "گرم" },
      { item: "پیاز کاراملی", amount: 8, unit: "گرم" }
    ]
  },
  {
    name: "دَفت چیز",
    category: "برگر",
    ingredients: [
      { item: "نان برگر", amount: 100, unit: "گرم" },
      { item: "پتی بیف", amount: 130, unit: "گرم" },
      { item: "پنیر حلومی", amount: 40, unit: "گرم" },
      { item: "پنیر گودا", amount: 18, unit: "گرم" },
      { item: "سس رشیو", amount: 30, unit: "گرم" },
      { item: "کاهو", amount: 25, unit: "گرم" },
      { item: "زیتون سبز", amount: 16, unit: "گرم" },
      { item: "پیکل", amount: 10, unit: "گرم" }
    ]
  },
  {
    name: "مجیک بیف",
    category: "برگر",
    ingredients: [
      { item: "نان برگر", amount: 100, unit: "گرم" },
      { item: "پتی بیف", amount: 130, unit: "گرم" },
      { item: "بیکن", amount: 30, unit: "گرم" },
      { item: "سس رشیو", amount: 30, unit: "گرم" },
      { item: "پیاز کاراملی", amount: 20, unit: "گرم" },
      { item: "گوجه", amount: 35, unit: "گرم" },
      { item: "پیکل", amount: 10, unit: "گرم" },
      { item: "چیپس کرانچی", amount: 20, unit: "گرم" }
    ]
  },
  {
    name: "کاراملایز ساسج",
    category: "برگر",
    ingredients: [
      { item: "نان برگر", amount: 100, unit: "گرم" },
      { item: "پتی بیف", amount: 130, unit: "گرم" },
      { item: "گودا", amount: 18, unit: "گرم" },
      { item: "مارمالاد سوسیس", amount: 50, unit: "گرم" },
      { item: "سالاد کلم", amount: 45, unit: "گرم" },
      { item: "سس رشیو", amount: 30, unit: "گرم" },
      { item: "سس جعفری", amount: 10, unit: "گرم" },
      { item: "گوجه", amount: 35, unit: "گرم" },
      { item: "پیکل", amount: 10, unit: "گرم" }
    ]
  },
  {
    name: "هانتر",
    category: "هات‌داگ",
    ingredients: [
      { item: "نان هات‌داگ", amount: 90, unit: "گرم" },
      { item: "سوسیس", amount: 70, unit: "گرم" },
      { item: "کره لیمو", amount: 20, unit: "گرم" },
      { item: "پیاز شور", amount: 14, unit: "گرم" },
      { item: "ذرت", amount: 10, unit: "گرم" },
      { item: "زیتون", amount: 6, unit: "گرم" },
      { item: "پنیر جار", amount: 8, unit: "گرم" },
      { item: "سس جعفری", amount: 6, unit: "گرم" }
    ]
  },
  {
    name: "کالچر",
    category: "هات‌داگ",
    ingredients: [
      { item: "نان هات‌داگ", amount: 90, unit: "گرم" },
      { item: "سس عسل خردل", amount: 20, unit: "گرم" },
      { item: "سوسیس", amount: 73, unit: "گرم" },
      { item: "پیاز شور", amount: 14, unit: "گرم" },
      { item: "گوجه گیلاسی", amount: 10, unit: "گرم" },
      { item: "زیتون سیاه", amount: 6, unit: "گرم" },
      { item: "دیپ پنیر", amount: 15, unit: "گرم" },
      { item: "جعفری", amount: 2, unit: "گرم" }
    ]
  },
  {
    name: "سس رشیو",
    category: "سس",
    ingredients: [
      { item: "مایونز", amount: 200, unit: "گرم" },
      { item: "خردل", amount: 40, unit: "گرم" },
      { item: "کچاپ", amount: 30, unit: "گرم" },
      { item: "پیکل پیاز", amount: 20, unit: "گرم" },
      { item: "سس باربیکیو", amount: 20, unit: "گرم" },
      { item: "شکر", amount: 5, unit: "گرم" },
      { item: "کره", amount: 10, unit: "گرم" },
      { item: "اسپرایت", amount: 10, unit: "میلی‌لیتر" }
    ]
  },
  {
    name: "سس تند همدانیان",
    category: "سس",
    ingredients: [
      { item: "سس پایه تند", amount: 100, unit: "گرم" },
      { item: "هالاپینو", amount: 20, unit: "گرم" },
      { item: "فلفل قرمز", amount: 5, unit: "گرم" }
    ]
  },
  {
    name: "دیپ پارمزان",
    category: "دیپ",
    ingredients: [
      { item: "پنیر پارمزان", amount: 60, unit: "گرم" },
      { item: "کره", amount: 20, unit: "گرم" },
      { item: "خامه", amount: 40, unit: "گرم" }
    ]
  },
  {
    name: "دیپ پنیر گودا",
    category: "دیپ",
    ingredients: [
      { item: "گودا", amount: 80, unit: "گرم" },
      { item: "شیر", amount: 50, unit: "میلی‌لیتر" },
      { item: "کره", amount: 10, unit: "گرم" }
    ]
  },
  {
    name: "خمیر پیتزا",
    category: "پیش‌نیاز",
    ingredients: [
      { item: "آرد سفید", amount: 1000, unit: "گرم" },
      { item: "آب", amount: 650, unit: "میلی‌لیتر" },
      { item: "مخمر", amount: 7, unit: "گرم" },
      { item: "نمک", amount: 20, unit: "گرم" },
      { item: "روغن", amount: 30, unit: "میلی‌لیتر" }
    ]
  }
];

export const seedChecklists: { type: ChecklistType; items: string[]; role: string }[] = [
  {
    type: ChecklistType.Open,
    role: "کادر آشپزخانه",
    items: [
      "روشن کردن سانترفیوژ",
      "روشن کردن چراغ‌های بیرون",
      "روشن کردن گاز و هات‌لاین",
      "شارژ کردن تاپینگ و یخچال تاپینگ",
      "بررسی کیفیت مواد اولیه",
      "چک کردن یخچال نوشیدنی",
      "چک کردن میز سفارش و تحویل",
      "بررسی سطل زباله و کیسه تمیز",
      "بهداشت دست و لباس کار",
      "نظافت جلوی درب و پله ورودی"
    ]
  },
  {
    type: ChecklistType.Handover,
    role: "کادر شیفت",
    items: [
      "تبادل اطلاعات بین دو شیفت",
      "تحویل گزارش آماده‌سازی روزانه",
      "تحویل سفارشات در جریان",
      "مرتب کردن و نظافت ایستگاه‌ها",
      "تحویل لاگ هدررفت و خرید"
    ]
  },
  {
    type: ChecklistType.Close,
    role: "شیفت شب",
    items: [
      "خاموش کردن تابلو و چراغ‌های اضافه",
      "جمع کردن و بستن تاپینگ",
      "تمیز کردن یخچال‌ها و سطوح داخل",
      "تمیز کردن فرایرها و گریل",
      "خاموش کردن گاز و هات‌لاین",
      "خاموش کردن سانترفیوژ",
      "شستن توری فر پیتزا و ابزار",
      "مرتب کردن انبار خشک و یخچال نوشیدنی",
      "تی کشیدن و شستشوی کف آشپزخانه",
      "شستن ظروف و ابزار کار",
      "تخلیه زباله و گذاشتن کیسه تمیز",
      "پر کردن سس‌ها و مواد روز بعد",
      "چک کردن تاریخ و دورریز مواد تاریخ‌گذشته",
      "نظافت سالن و جلوی درب مغازه",
      "تمیز کردن هود و سطوح استیل",
      "خاموش کردن چراغ‌های بیرون",
      "بستن درب فریزر و یخچال‌ها",
      "مرتب کردن میز سفارشات آنلاین",
      "گزارش موجودی کمبودها",
      "تمیز کردن سینک و ماشین ظرفشویی",
      "پاک کردن اثرات روغن از دیوارها",
      "گرفتن عکس نهایی و ارسال در گروه واتساپ"
    ]
  }
];

export const prepTemplateItems = [
  "خمیر پیتزا",
  "گی (کره حیوانی)",
  "پیاز کاراملی",
  "بادمجان چیپسی",
  "چیپس سیب‌زمینی",
  "فلفل شیرین (ترشی فلفل ریز عسلی)",
  "خیارشور پیاز",
  "میکس پیاز و فلفل دلمه‌ای",
  "مارمالاد ساسج",
  "مرینیت گوشت برگر",
  "مرینیت مرغ",
  "کُچی سس",
  "استاک سوسیس",
  "سس سالاد کلم",
  "دیپ پارمزان",
  "دیپ پنیر",
  "سس مایوکاپری",
  "سس خامه",
  "سس قارچ",
  "سس رشیو",
  "سس تند",
  "سس جعفری",
  "سس گوجه مارینارا",
  "سس لیمو کره",
  "سس سیر",
  "روغن سیر",
  "روغن جعفری",
  "روغن پاپریکا",
  "روغن سبز",
  "ادویه سیب‌زمینی"
];

export const shoppingTemplateItems: { category: string; itemName: string }[] = [
  // پروتئین
  { category: "پروتئین", itemName: "گوشت برگر قلوه‌گاه" },
  { category: "پروتئین", itemName: "گوشت برگر سردست" },
  { category: "پروتئین", itemName: "فیله مرغ" },
  { category: "پروتئین", itemName: "پپرونی" },
  { category: "پروتئین", itemName: "بیکن" },
  { category: "پروتئین", itemName: "رست بیف" },
  { category: "پروتئین", itemName: "سوسیس هات‌داگ" },
  { category: "پروتئین", itemName: "سوسیس شکاری" },
  // نان
  { category: "نان", itemName: "نان برگر" },
  { category: "نان", itemName: "نان هات‌داگ" },
  // لبنیات
  { category: "لبنیات و پنیر", itemName: "خامه صبحانه" },
  { category: "لبنیات و پنیر", itemName: "شیر تتراپک" },
  { category: "لبنیات و پنیر", itemName: "پنیر پیتزا موزارلا رنده" },
  { category: "لبنیات و پنیر", itemName: "پنیر موزارلا ورقه‌ای" },
  { category: "لبنیات و پنیر", itemName: "پنیر گودا ورقه‌ای" },
  { category: "لبنیات و پنیر", itemName: "پنیر چدار ورقه‌ای" },
  { category: "لبنیات و پنیر", itemName: "پنیر پارمزان" },
  { category: "لبنیات و پنیر", itemName: "پنیر خامه‌ای" },
  { category: "لبنیات و پنیر", itemName: "پنیر هالومی" },
  { category: "لبنیات و پنیر", itemName: "پنیر کوزه" },
  { category: "لبنیات و پنیر", itemName: "کره مارگارین" },
  // سبزیجات
  { category: "سبزیجات", itemName: "سیب‌زمینی درشت" },
  { category: "سبزیجات", itemName: "سیب‌زمینی نیمه‌آماده" },
  { category: "سبزیجات", itemName: "قارچ" },
  { category: "سبزیجات", itemName: "بادمجان قلمی" },
  { category: "سبزیجات", itemName: "کاهو مجلسی" },
  { category: "سبزیجات", itemName: "کلم بنفش" },
  { category: "سبزیجات", itemName: "گوجه فرنگی" },
  { category: "سبزیجات", itemName: "گوجه چری" },
  { category: "سبزیجات", itemName: "پیاز سفید/زرد" },
  { category: "سبزیجات", itemName: "پیازچه" },
  { category: "سبزیجات", itemName: "سیر تازه" },
  // چاشنی و کنسروی
  { category: "چاشنی", itemName: "کنسرو گوجه پوست‌کنده" },
  { category: "چاشنی", itemName: "کنسرو ذرت" },
  { category: "چاشنی", itemName: "رب گوجه فرنگی" },
  { category: "چاشنی", itemName: "زیتون سبز اسلایس" },
  { category: "چاشنی", itemName: "زیتون سیاه اسلایس" },
  { category: "چاشنی", itemName: "خیارشور" },
  { category: "چاشنی", itemName: "ترشی فلفل ریز شیرین" },
  { category: "چاشنی", itemName: "عسل" },
  { category: "چاشنی", itemName: "شکر" },
  { category: "چاشنی", itemName: "ارده" },
  { category: "چاشنی", itemName: "آبلیمو" },
  { category: "چاشنی", itemName: "سرکه سفید" },
  { category: "چاشنی", itemName: "سس مایونز" },
  { category: "چاشنی", itemName: "سس کچاپ" },
  { category: "چاشنی", itemName: "سس خردل" },
  { category: "چاشنی", itemName: "سس باربیکیو" },
  { category: "چاشنی", itemName: "سس ورچستر" },
  { category: "چاشنی", itemName: "سس بالزامیک" },
  { category: "چاشنی", itemName: "سس چیلی تای" },
  { category: "چاشنی", itemName: "سس تند همدانیان" },
  { category: "چاشنی", itemName: "نوشابه اسپرایت" },
  { category: "چاشنی", itemName: "نوشابه کوکاکولا" },
  { category: "چاشنی", itemName: "آب معدنی" },
  // مواد خشک
  { category: "مواد خشک", itemName: "آرد سفید" },
  { category: "مواد خشک", itemName: "مخمر خشک" },
  { category: "مواد خشک", itemName: "روغن مایع سرخ‌کردنی" },
  { category: "مواد خشک", itemName: "روغن کانولا" },
  { category: "مواد خشک", itemName: "گردوی خرد شده" },
  { category: "مواد خشک", itemName: "مغز تخمه" },
  { category: "مواد خشک", itemName: "چیپس یا کرانچی" },
  // ادویه
  { category: "ادویه", itemName: "نمک" },
  { category: "ادویه", itemName: "فلفل سیاه" },
  { category: "ادویه", itemName: "فلفل قرمز" },
  { category: "ادویه", itemName: "پودر فلفل قرمز" },
  { category: "ادویه", itemName: "فلفل چیلی خشک" },
  { category: "ادویه", itemName: "پول بیبر" },
  { category: "ادویه", itemName: "پاپریکا معمولی" },
  { category: "ادویه", itemName: "پاپریکا دودی" },
  { category: "ادویه", itemName: "جوز هندی" },
  { category: "ادویه", itemName: "آویشن" },
  { category: "ادویه", itemName: "پودر سیر" },
  { category: "ادویه", itemName: "پودر پیاز" },
  { category: "ادویه", itemName: "پودر کره" },
  { category: "ادویه", itemName: "پودر انبه" },
  { category: "ادویه", itemName: "دانه خردل" },
  { category: "ادویه", itemName: "ادویه سیب‌زمینی" },
  { category: "ادویه", itemName: "ادویه فلفل لیمویی" },
  { category: "ادویه", itemName: "پودر شیکاگو" },
  // بسته‌بندی
  { category: "بسته‌بندی", itemName: "جعبه پیتزا" },
  { category: "بسته‌بندی", itemName: "جعبه برگر" },
  { category: "بسته‌بندی", itemName: "جعبه هات‌داگ" },
  { category: "بسته‌بندی", itemName: "جعبه سیب‌زمینی" },
  { category: "بسته‌بندی", itemName: "کاغذ مومی" },
  { category: "بسته‌بندی", itemName: "ورق تک پیتزا" },
  { category: "بسته‌بندی", itemName: "ساک دستی" },
  { category: "بسته‌بندی", itemName: "نی بسته‌بندی" },
  { category: "بسته‌بندی", itemName: "سس کاپ" },
  { category: "بسته‌بندی", itemName: "لیوان یکبار مصرف" },
  { category: "بسته‌بندی", itemName: "کارد و چنگال یکبارمصرف" },
  { category: "بسته‌بندی", itemName: "سلفون" },
  { category: "بسته‌بندی", itemName: "کیسه فریزر" },
  { category: "بسته‌بندی", itemName: "کیسه زباله بزرگ" },
  { category: "بسته‌بندی", itemName: "کیسه زباله کوچک" },
  { category: "بسته‌بندی", itemName: "پلاستیک سایز ۱ یا ۲" },
  { category: "بسته‌بندی", itemName: "دستکش لاتکس مشکی" },
  { category: "بسته‌بندی", itemName: "کلاه یکبارمصرف" }
];

export const expirationRulesSeed = [
  { item: "گوشت چرخ کرده خام", shelfLife: "۲-۳ روز" },
  { item: "فیله مرغ خام", shelfLife: "۱-۲ روز" },
  { item: "سوسیس خام", shelfLife: "۳-۵ روز" },
  { item: "پنیر (گودا/موزارلا و ...)", shelfLife: "طبق بسته‌بندی" },
  { item: "سبزیجات شسته", shelfLife: "۱-۲ روز" },
  { item: "قارچ تازه", shelfLife: "۲-۳ روز" },
  { item: "خمیر پیتزا", shelfLife: "۲۴-۴۸ ساعت" },
  { item: "گوشت مرینیت", shelfLife: "۷۲ ساعت" },
  { item: "مرغ مرینیت", shelfLife: "همان روز" },
  { item: "پیاز کاراملی", shelfLife: "۲ روز" },
  { item: "میکس پیاز و فلفل دلمه‌ای", shelfLife: "۲ روز" },
  { item: "ترشی فلفل عسلی", shelfLife: "۱۴ روز" },
  { item: "سس خامه", shelfLife: "۲ روز" },
  { item: "سس قارچ", shelfLife: "۲ روز" },
  { item: "سس رشیو", shelfLife: "۵ روز" },
  { item: "سس تند", shelfLife: "۸ روز" },
  { item: "کُچی سس", shelfLife: "۱۰ روز" },
  { item: "سس سیر", shelfLife: "۴ روز" },
  { item: "دیپ پنیر گودا", shelfLife: "۳ روز" },
  { item: "استاک سوسیس", shelfLife: "۲ روز" }
];

export const periodicTasksSeed = [
  { taskName: "دیپ کلین آشپزخانه", frequencyDays: 7 },
  { taskName: "نظافت سانتریفیوژ (فیلتر/بدنه)", frequencyDays: 7 },
  { taskName: "تعویض روغن سرخ‌کن", frequencyDays: 5 },
  { taskName: "مرتب‌سازی انبار", frequencyDays: 7 },
  { taskName: "نظافت کامل فر پیتزا", frequencyDays: 7 },
  { taskName: "تمیز کردن دیوارها", frequencyDays: 4 },
  { taskName: "شستن سطل‌های زباله", frequencyDays: 3 },
  { taskName: "نظافت پشت یخچال‌های قدی", frequencyDays: 5 },
  { taskName: "نظافت پشت هات‌لاین‌ها", frequencyDays: 3 },
  { taskName: "نظافت کامل ظرفشویی", frequencyDays: 6 },
  { taskName: "ضدعفونی عمیق تخته‌ها", frequencyDays: 30 }
];

export const seedShiftTemplates: { phone: string; offsets: number[]; type: ShiftType; start: string; end: string }[] = [
  { phone: "09120000001", offsets: [0, 1, 2, 3, 4, 5, 6], type: ShiftType.Evening, start: "17:00", end: "01:00" }, // سروش
  { phone: "09120000002", offsets: [0, 1, 2, 3, 4, 5], type: ShiftType.Morning, start: "09:00", end: "17:00" }, // احسان
  { phone: "09120000003", offsets: [0, 1, 2, 3, 4, 5, 6], type: ShiftType.Evening, start: "17:00", end: "01:00" }, // نسترن
  { phone: "09120000004", offsets: [0, 1, 2, 3, 4, 5, 6], type: ShiftType.Morning, start: "09:00", end: "17:00" }, // طنین
  { phone: "09120000005", offsets: [0, 1, 2, 3, 4, 5, 6, 0], type: ShiftType.Evening, start: "17:00", end: "01:00" } // فریماه با یک شیفت اضافه
];
