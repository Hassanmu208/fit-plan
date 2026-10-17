# رفع FitPlan على GitHub

## الملفات
- `index.html`: كود التطبيق.
- `assets/`: الصور والخلفيات التي يستدعيها التطبيق.

يجب أن يظل `index.html` ومجلد `assets` في المستوى نفسه. لا تغيّر أسماء ملفات الصور أو تنقلها خارج المجلد.

## الرفع باستخدام GitHub Desktop
1. فك ضغط `FitPlan-GitHub-Upload.zip`.
2. أنشئ مستودعًا جديدًا على GitHub.
3. في GitHub Desktop اختر **File → Clone Repository** ثم اختر المستودع الجديد.
4. انسخ `index.html` ومجلد `assets` من المجلد الذي فككت ضغطه إلى مجلد المستودع المحلي.
5. في GitHub Desktop اكتب رسالة مثل `Add FitPlan app`, ثم اختر **Commit to main** وبعدها **Push origin**.

## نشره كموقع
بعد رفع الملفات، افتح المستودع على GitHub ثم **Settings → Pages**. تحت **Build and deployment** اختر **Deploy from a branch**، ثم الفرع `main` والمجلد `/(root)`، واضغط **Save**. سيظهر رابط الموقع في صفحة Pages بعد اكتمال النشر.

يمكنك أيضًا فتح المستودع على GitHub واختيار **Add file → Upload files**، ثم رفع `index.html` ومجلد `assets` مع الحفاظ على هيكل المجلدات.