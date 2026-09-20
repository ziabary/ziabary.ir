"""Render the Persian worked example from dated, shared inputs; rental dates stay unchanged."""
from pathlib import Path
import json,re
root=Path(__file__).resolve().parents[1];d=json.loads((root/'data/llm/cost-example.fa.json').read_text());parts=d['parts'];total=sum(x['amountToman'] for x in parts);months=d['amortizationMonths'];ram=next(x for x in parts if x['component']=='ram');gpu=next(x for x in parts if x['component']=='gpu')['amountToman'];old=total-ram['amountToman']+400000000
tr=str.maketrans('0123456789,.','۰۱۲۳۴۵۶۷۸۹٬٫')
def f(n,dp=0):return format(n,',.'+str(dp)+'f').translate(tr)
p=root/'src/lib/content/articles/true-llm-cost-buy-rent-or-api.md';s=p.read_text()
s=s.replace('قیمت‌ها در **۲۵ شهریور ۱۴۰۵، برابر با ۱۶ سپتامبر ۲۰۲۶** از صفحات عرضه‌کنندگان گردآوری شده‌اند.', 'قیمت‌ها را در **۲۵ شهریور ۱۴۰۵، برابر با ۱۶ سپتامبر ۲۰۲۶** از صفحات عرضه‌کنندگان گردآوری شده‌اند؛ فقط عرضهٔ RAM در **۲۸ شهریور، ۱۹ سپتامبر** به‌روزرسانی شده است.')
s=re.sub(r'\| حافظهٔ میزبان \|.*',f'| حافظهٔ میزبان | <bdi dir="ltr">{ram["name"]}</bdi>، مشاهدهٔ ۲۸ شهریور ۱۴۰۵؛ موجود در انبار | [لیون کامپیوتر؛ {f(ram["amountToman"])}]({ram["sourceUrl"]}) |',s)
s=re.sub(r'\| \*\*جمع قطعات\*\*.*',f'| **جمع قطعات** | **یک ایستگاه کاری با یک GPU** | **{f(total)}** |',s)
a=s.index('در این سبد، **کارت');b=s.index('\nاگر استفاده از API را',a) if '\nاگر استفاده از API را' in s[a:] else -1
# Preserve the comparison with API and subsequent sections verbatim.
end=s.index('\n',s.index('شدت استفاده نتیجه',a));end=s.index('\n',end+1) if s[end+1:end+2]!='\n' else end
startnext=s.index('\n\n',s.index('شدت استفاده نتیجه',a))
rents=[x.get('monthlyToman',x.get('monthlyEquivalentToman')) for x in d['rentComparisons']]
rows=[(v*months-total,(v*months-total)/months) for v in rents]
block=f'''در این سبد، **کارت {f(gpu/total*100,2)} درصد مبلغ خرید است** و بقیهٔ قطعات **{f((total-gpu)/1e6,1)} میلیون تومان** هزینه دارند. سهم RAM **{f(ram['amountToman']/total*100,2)} درصد** است. کیت ۶۴ گیگابایتی V-Color از لیون، جای کیت G.Skill با قیمت ۴۰۰ میلیون تومانی تکاف را گرفته؛ این انتخابِ محصول دیگری است و جمع خرید را **{f(old-total)} تومان** پایین می‌آورد. قیمت سایر قطعات متعلق به ۲۵ شهریور است. با فرض تاریخیِ دلار ۲۳۰ هزار تومانی، جمع سبد معادل **{f(total/d['historicalFxAssumptionTomanPerUsd'],2)} دلار** می‌شود.

این نمونهٔ یک ایستگاه کاری دارای 4090 است؛ شروع کار محدود سازمانی الزاماً به چنین خریدی نیاز ندارد. قیمت‌ها هم عرضه‌های مشخص همین فروشندگان‌اند. کیس ایستاده است و رادیاتور در جلو نصب می‌شود؛ برای استقرار در رک، [شاسی و اجزای سکوی سرور GPU](/articles/gpu-server-platform-components/) انتخاب متفاوتی می‌خواهد.

حالا **{f(total/1e9,4)} میلیارد تومان** خرید را در **۲۴ ماه** سرشکن کنیم: ماهانه **{f(total/months)} تومان**، یعنی **{f((old-total)/months)} تومان** کمتر از سبد قبلی. تعرفه‌های اجارهٔ ۲۵ شهریور را ثابت نگه می‌داریم و ارزش فروش دست‌دوم را از خرید کم نمی‌کنیم. اختلاف زیر، فضای باقی‌مانده برای برق، استقرار، نگهداری و تأمین سرمایه است:

| گزینهٔ اجاره برای مقایسه | پرداخت اجاره در ۲۴ ماه، تومان | فاصله با خرید قطعات، تومان | سقف متوسط هزینهٔ اضافهٔ مالکیت در ماه برای برابرشدن دو مسیر، تومان |
|---|---:|---:|---:|
| ایران‌سرور؛ 4090 Smart ماهانه | {f(rents[0]*months)} | {f(rows[0][0])} | {f(rows[0][1])} |
| ایران‌سرور؛ Smart با پرداخت سالانه و ۱۰٪ تخفیف | {f(rents[1]*months)} | {f(rows[1][0])} | {f(rows[1][1])} |
| ابر فردوسی؛ یک 4090، ماهی ۷۲۰ ساعت | {f(rents[2]*months)} | {f(rows[2][0])} | {f(rows[2][1])} |

با [تخفیف ۱۰درصدی پرداخت سالانهٔ ایران‌سرور](https://www.iranserver.com/vps/gpu/)، هزینهٔ سال اول ۹۸۲٫۸ میلیون تومان می‌شود؛ ردیف دوساله تکرار همان تعرفه و تخفیف در سال دوم را فرض می‌کند. سقف هزینهٔ اضافهٔ مالکیت از ماهانه **{f(rows[0][1]/1e6,2)}** به **{f(rows[1][1]/1e6,2)} میلیون تومان** می‌رسد.

در قرارداد ماهانهٔ ایران‌سرور، فاصلهٔ دوساله **{f(rows[0][0]/1e6,1)} میلیون تومان** است؛ در ردیف فردوسی **{f(rows[2][0]/1e6,3)} میلیون تومان**. برق، نگهداری و هزینهٔ سرمایه می‌توانند این فاصله را پر کنند. توسعهٔ برنامه و نگهداری موتور هم در هر دو مسیر باقی می‌مانند.

منابع میزبان یکسان نیستند: سیستم خریدنی **۶۴ گیگابایت RAM و دو ترابایت SSD** دارد، Smart ایران‌سرور **۹۰ و ۷۰۰ گیگابایت** و فردوسی **۱۶ و ۱۰۰ گیگابایت**. اگر ۱۶ گیگابایت RAM برای بارگذاری مدل یا اجزای RAG کافی نباشد، پلن فردوسی مناسب همان کار نیست. در هر سه، حافظهٔ کارت ۲۴ گیگابایت است؛ نیاز به [حافظهٔ ۴۸ گیگابایتی](/articles/llms-on-rtx-4090-24gb-vs-48gb/) صورت‌حساب دیگری می‌سازد.

شدت استفاده نتیجه را بیشتر عوض می‌کند: با **پنجاه ساعت کار در ماه**، اجارهٔ فردوسی در دو سال **۹۵٬۱۶۰٬۰۰۰ تومان**، حدود **{f(95160000/total*100,1)} درصد** خرید قطعات است. برای سرویس شبانه‌روزی، هزینهٔ استقرار و تأمین سرمایه را باید در فاصلهٔ خرید و اجاره جا داد؛ برای مصرف مقطعی، بخش زیادی از سرمایهٔ خرید بیشتر اوقات بی‌استفاده می‌ماند.'''
s=s[:a]+block+s[startnext:];p.write_text(s)
print(json.dumps({'purchase':total,'monthly':round(total/months),'rentalDifferences':rows,'dollar':round(total/d['historicalFxAssumptionTomanPerUsd'],2)}))
