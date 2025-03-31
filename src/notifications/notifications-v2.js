/* لم افهم لماذا نحتاج قيمه null في الريديوسر هوك

السؤال رائع! دعني أوضح لك سبب استخدام null عند تمرير useReducer للقيمة الابتدائية (initialState).

🎯 لماذا نستخدم null بدلًا من initialState مباشرة؟
في useReducer، يمكنك تمرير الحالة الابتدائية (initialState) كقيمة مباشرة، لكن عندما تحتاج إلى استعادة البيانات من localStorage أو تحديد الحالة بشكل ديناميكي عند تحميل التطبيق، فإن الطريقة المثلى هي استخدام دالة initializer function.

⚡ إذا مررت initialState مباشرة مثل هذا:


const [{ items, sortBy }, dispatch] = useReducer(reducer, initialState);
📌 المشكلة:

ستظل initialState ثابتة في كل مرة يتم تشغيل التطبيق، ولن تستعيد البيانات من localStorage.
عند إعادة تحميل الصفحة، ستبدأ items كمصفوفة فارغة []، حتى لو كانت هناك بيانات محفوظة سابقًا.
✅ الحل باستخدام initializer function

const [{ items, sortBy }, dispatch] = useReducer(reducer, null, getInitialState);
📌 لماذا نستخدم null هنا؟

لأن useReducer يأخذ ثلاث معاملات (arguments):
reducer → الدالة التي تعالج الإجراءات (actions).
initialState → الحالة الابتدائية (يمكن أن تكون null أو undefined).
initializer function → دالة يتم استدعاؤها فقط عند تحميل التطبيق لأول مرة لإرجاع الحالة الابتدائية.
✅ عندما نستخدم null، فإن useReducer سيتجاهل القيمة الثانية (initialState) وسيستخدم الدالة الثالثة (initializer function) لاسترجاع البيانات من localStorage.

📌 مقارنة بين الطريقتين
❌ الطريقة الخطأ:

const [{ items, sortBy }, dispatch] = useReducer(reducer, initialState);
🔴 المشكلة:

لا يتم استعادة البيانات من localStorage عند إعادة تحميل الصفحة.
initialState ستظل دائمًا { items: [], sortBy: "input" } حتى لو كانت هناك بيانات محفوظة.
✅ الطريقة الصحيحة:

const getInitialState = () => {
  const storedItems = localStorage.getItem("itemsV2");
  return storedItems
    ? { items: JSON.parse(storedItems), sortBy: "input" }
    : { items: [], sortBy: "input" };
};

const [{ items, sortBy }, dispatch] = useReducer(reducer, null, getInitialState);
🟢 لماذا هذه الطريقة أفضل؟
1️⃣ عند تحميل الصفحة لأول مرة:

يتم استدعاء getInitialState() واستعادة البيانات من localStorage إذا كانت موجودة.
إذا لم تكن هناك بيانات، يتم استخدام الحالة الافتراضية { items: [], sortBy: "input" }.
2️⃣ في التحديثات المستقبلية (re-renders):

لا يتم استدعاء getInitialState مرة أخرى! بل يتم تحديث items عبر dispatch كما هو متوقع.
✨ خلاصة
💡 null يجعل useReducer يتجاهل initialState ويستخدم initializer function فقط عند تحميل التطبيق.
🔥 هذا يضمن استعادة البيانات من localStorage عند بدء التشغيل، دون التأثير على الأداء لاحقًا.
🚀 أفضل ممارسة عند الحاجة إلى جلب البيانات المخزنة ديناميكيًا! */

/*
اشرح هذا السطر 
localStorage.setItem("darkMode", JSON.stringify(darkMode ?? false));



هذا السطر يقوم بحفظ قيمة darkMode في localStorage، مع التأكد من أنها ليست undefined، وإذا كانت undefined، يتم تعيينها إلى false بدلاً من ذلك.

تحليل الكود خطوة بخطوة

localStorage.setItem("darkMode", JSON.stringify(darkMode ?? false));
darkMode ?? false

?? هو "nullish coalescing operator"، ويُستخدم لإرجاع القيمة اليمنى (false) فقط إذا كانت القيمة اليسرى (darkMode) null أو undefined.

هذا يعني:

إذا كان darkMode true → سيبقى true

إذا كان darkMode false → سيبقى false

إذا كان darkMode undefined أو null → سيتم استخدام false بدلاً منه.

JSON.stringify(...)

يحول القيمة إلى نص (string) حتى يتمكن localStorage من تخزينها.

لأن localStorage يخزن البيانات كنصوص فقط، نحتاج إلى تحويل true أو false إلى "true" أو "false".

localStorage.setItem("darkMode", ...)

يخزن القيمة المحولة في localStorage باستخدام المفتاح "darkMode".

💡 أمثلة عملية
✅ حالة darkMode = true

let darkMode = true;
localStorage.setItem("darkMode", JSON.stringify(darkMode ?? false));
🔹 القيمة المخزنة في localStorage → "true"

✅ حالة darkMode = false

let darkMode = false;
localStorage.setItem("darkMode", JSON.stringify(darkMode ?? false));
🔹 القيمة المخزنة في localStorage → "false"

✅ حالة darkMode = undefined (يتم تصحيحه إلى false)

let darkMode; // undefined
localStorage.setItem("darkMode", JSON.stringify(darkMode ?? false));
🔹 القيمة المخزنة في localStorage → "false"

⚠️ لماذا نستخدم ?? وليس ||؟
|| (OR) كان يمكن أن يعمل أيضًا، ولكن الفرق هو أنه يعالج القيم الـ falsy (مثل 0, "", false) على أنها غير صالحة.

?? (nullish coalescing) يعالج فقط null و undefined، مما يمنع أي تغيير غير متوقع في القيم.

📌 مثال يوضح الفرق:


let darkMode = false;
console.log(darkMode || true); // ❌ النتيجة: true (خطأ!)
console.log(darkMode ?? true); // ✅ النتيجة: false (صحيح!)
💡 لهذا السبب نستخدم ?? بدلاً من || لضمان الاحتفاظ بالقيم الصحيحة! 🚀
*/
