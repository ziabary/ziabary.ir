
```bash
ssh root@SERVER_IP 'mkdir -p /data/ziabary-community'

rsync -av \
  --exclude='config/' \
  --exclude='data/' \
  --exclude='backups/' \
  --exclude='test-results/' \
  --exclude='node_modules/' \
  --exclude='.env' \
  ./ root@SERVER_IP:/data/ziabary-community/

scp '/home/user/Documents/Mehran/ziabary.ir/Páginas_y_pantallas_Ruta_de_página_y_clase_de_pantalla.csv' \
  root@SERVER_IP:/data/ziabary-community/analytics.csv
```

این روش آخرین تغییرات فعلی را منتقل می‌کند و به commit یا push وابسته نیست.

۲. **روی سرور، تنظیمات اولیه را بساز:**

```bash
ssh root@SERVER_IP
cd /data/ziabary-community

cp .env.example .env
docker build -t ziabary-community:production .

mkdir -p config

docker run --rm \
  --user "$(id -u):$(id -g)" \
  --mount "type=bind,src=$PWD/config,dst=/app/config" \
  ziabary-community:production node tools/setup.mjs

nano config/bootstrap.txt
```

داخل `bootstrap.txt` نام کاربری، رمز حداقل ۱۶ کاراکتری و **کلیدهای واقعی آرکپچا** را قرار بده:

```text
Username: admin
Password: YOUR_LONG_PRIVATE_PASSWORD
ARCAPTCHA_SITE_KEY: YOUR_REAL_SITE_KEY
ARCAPTCHA_SECRET_KEY: YOUR_REAL_SECRET_KEY
```

سپس دسترسی فایل‌ها را برای کاربر کانتینر تنظیم کن:

```bash
chown 1000:1000 config/secrets.json config/bootstrap.txt
chmod 600 config/secrets.json config/bootstrap.txt
chmod 600 analytics.csv
```

این مالکیت لازم است، چون کانتینر با کاربر `1000` اجرا می‌شود و secrets فایل‌محور Compose مجوز فایل میزبان را حفظ می‌کنند. [مستندات Docker](https://docs.docker.com/reference/compose-file/services/#secrets)

۳. **فایل `.env` سرویس را تنظیم کن:**

```bash
nano .env
```

مقادیر اصلی:

```dotenv
PUBLIC_URL=https://api.ziabary.ir
SITE_ORIGINS=https://ziabary.ir,https://www.ziabary.ir
SITE_URL=https://ziabary.ir
COMMUNITY_PORT=8787

TRUSTED_PROXY_CIDRS=

COMMENTS_PER_SECOND=5
VISIT_RETENTION_DAYS=90
ANALYTICS_RETENTION_DAYS=1095
MAX_DATABASE_MIB=512
ADMIN_DISPLAY_NAME=مهران ضیابری
```

بعد اجرا کن:

```bash
docker compose up -d --build
docker compose ps
curl --fail http://127.0.0.1:8787/health
```

اگر اجرا نشد:

```bash
docker compose logs --tail=100 community
```

۴. **دامنه و HTTPS را وصل کن.**

رکورد `api.ziabary.ir` را مستقیماً به IP سرور بده. پروکسی HTTPS باید درخواست‌ها را به `127.0.0.1:8787` بفرستد؛ پورت ۸۷۸۷ فقط روی localhost منتشر شده است.

اگر Caddy روی میزبان داری، محتوای `Caddyfile.example` را به تنظیمات آن اضافه کن:

```caddyfile
api.ziabary.ir {
    encode zstd gzip

    request_body {
        max_size 16KB
    }

    reverse_proxy 127.0.0.1:8787 {
        header_up X-Forwarded-For {remote_host}
        header_up X-Forwarded-Proto https
    }
}
```

سپس تنظیمات را اعتبارسنجی و reload کن. این پیکربندی هدر IP ورودی را با IP اتصال جایگزین می‌کند. [مستندات Caddy](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy)

برای شناسایی IP واقعی کاربران، gateway شبکهٔ کانتینر را بخوان:

```bash
docker inspect "$(docker compose ps -q community)" \
  --format '{{range .NetworkSettings.Networks}}{{.Gateway}}{{end}}'
```

اگر مثلاً خروجی `172.18.0.1` بود، در `.env` بگذار:

```dotenv
TRUSTED_PROXY_CIDRS=127.0.0.1/32,172.18.0.1/32
```

آدرس مثال را با خروجی سرور خودت جایگزین کن، سپس:

```bash
docker compose up -d
curl --fail https://api.ziabary.ir/health
```

پنل اکنون اینجاست:

**https://api.ziabary.ir/admin/**

۵. **سایت اصلی را به سرویس وصل و منتشر کن.**

روی سیستم خودت، در ریشهٔ پروژه، مقدار زیر را داخل `.env.local` قرار بده:

```dotenv
PUBLIC_COMMUNITY_API_URL=https://api.ziabary.ir
```

سپس با تنظیمات فعلی انتشار سایت:

```bash
npm run deploy
```

این فرمان سایت را منتشر می‌کند؛ کانتینر سرویس مستقل از آن نصب و به‌روز می‌شود.

۶. **آمار قبلی را روی سرور وارد کن.** بعد از انتشار نسخهٔ جدید سایت:

```bash
cd /data/ziabary-community

# پیش‌نمایش
docker compose exec -T community \
  node tools/import-views.mjs - --multiplier 3 < analytics.csv

# ثبت نهایی
docker compose exec -T community \
  node tools/import-views.mjs - --multiplier 3 --apply < analytics.csv
```

**هم بازدید و هم بازدیدکننده سه‌برابر وارد می‌شوند.** اجرای دوباره، آمار را تکراری اضافه نمی‌کند.

۷. در پایان یک نظر بفرست، در پنل تأییدش کن و آمار IP را هم بررسی کن. برای نگهداری سرویس:

- تغییر `bootstrap.txt`: فرمان `docker compose restart community`
- تغییر `.env`: فرمان `docker compose up -d`
- تغییر کد: فرمان `docker compose up -d --build`

از دیتابیس و هر دو فایل `config/secrets.json` و `config/bootstrap.txt` پشتیبان بگیر؛ فرمان پشتیبان‌گیری در [راهنمای سرویس](/home/user/Projects/ziabary.ir/services/community/README.md) آمده است.