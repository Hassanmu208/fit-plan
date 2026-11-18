# FitPlan — fit plan for everyone

تطبيق لياقة شامل ثنائي اللغة (عربي/إنجليزي): مكتبة تمارين بالعضلات، خطط تمرين ذكية، كتالوج أكل، سجل تقدم وإنجازات — ملف واحد standalone يشتغل من المتصفح.

**🔗 اللينك الشغال:** https://hassanmu208.github.io/fit-plan/

## هيكل المشروع

```
├── index.html        ← التطبيق المبني (ملف واحد، كل الوسائط مدمجة base64)
├── src/              ← المصدر القابل للصيانة
│   ├── shell.html    ← قالب الصفحة بفتحات الدمج
│   ├── scripts/      ← منطق التطبيق (JavaScript مرقّم بالترتيب)
│   ├── styles/       ← ملفات CSS
│   └── assets/       ← صور/فريمات التمارين والخرائط العضلية
├── manifest.json     ← يحدد أي بلوك يندمج فين وأي أصل يتحوّل لـ base64
├── build.ps1         ← سكريبت البناء
└── tools/            ← سكريبتات مساعدة لمرة واحدة
```

## البناء

```powershell
powershell -ExecutionPolicy Bypass -File build.ps1
```

بيجمع `src/` حسب `manifest.json` ويطلع `preview/fitplan.html`. للنشر انسخها على `index.html` في الجذر واعمل push — GitHub Pages بتنشر من `main / (root)` تلقائيًا.

## الاستضافة

GitHub Pages — Branch: `main`, Folder: `/(root)`
