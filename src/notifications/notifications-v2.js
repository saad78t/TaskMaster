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
