"""Rebuild charts 2–6 from the article's supplied CSVs as standalone SVGs."""
from pathlib import Path
from zipfile import ZipFile
import csv, io, base64
from xml.sax.saxutils import escape
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'static/images/articles/ai-talent-infrastructure'
NAVY, TEAL, ORANGE, MUTED = '#17283d', '#087f8c', '#f87916', '#536579'
def fa(v): return str(v).translate(str.maketrans('0123456789.,','۰۱۲۳۴۵۶۷۸۹٫٬'))
def data(name):
 with ZipFile(ROOT/'static/downloads/ai-talent-infrastructure-data.zip') as z:
  return list(csv.DictReader(io.StringIO(z.read('data/'+name+'.csv').decode('utf-8-sig'))))
class Chart:
 def __init__(self,title,subtitle):
  self.parts=['<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1080" viewBox="0 0 1800 1080" role="img" aria-labelledby="title">','<title id="title">'+escape(title)+'</title>']
  self.rect(0,0,1800,1080,'#fafaf9',28)
  self.text(1720,90,title,46,bold=True);self.text(1720,150,subtitle,30,color=MUTED)
  self.line(80,186,1720,186)
 def rect(self,x,y,w,h,color,rx=12,stroke='none'):
  self.parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{color}" stroke="{stroke}" stroke-width="2"/>')
 def line(self,x,y,x2,y2,color='#dbe0e5',width=2):
  self.parts.append(f'<path d="M{x} {y}L{x2} {y2}" stroke="{color}" stroke-width="{width}"/>')
 def text(self,x,y,value,size=32,color=NAVY,bold=False,center=False):
  self.parts.append(f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{700 if bold else 400}" fill="{color}" direction="rtl" text-anchor="{"middle" if center else "start"}">{escape(str(value))}</text>')
 def footer(self,*lines):
  self.line(80,974,1720,974)
  for i,line in enumerate(lines):self.text(1720,1016+i*36,line,25,color=MUTED)
 def save(self,name):
  faces=[]
  for face,weight in [('Regular',400),('Bold',700)]:
   font=(ROOT/f'static/fonts/IranSansX/fonts/woff2/IRANSansX-{face}.woff2').read_bytes()
   faces.append('@font-face{font-family:DiagramIranSansX;src:url(data:font/woff2;base64,'+base64.b64encode(font).decode()+") format('woff2');font-weight:"+str(weight)+';font-style:normal;}')
  self.parts.append('<style id="diagram-embedded-font">'+''.join(faces)+'text,tspan,foreignObject *{font-family:DiagramIranSansX,sans-serif!important;}</style>')
  (OUT/(name+'.svg')).write_text('\n'.join(self.parts+['</svg>\n']))

c=Chart('شکاف پرورش با جذب و ماندگاری استعداد','رتبهٔ ایران در سنجه‌های منتخب شاخص رقابت استعداد ۲۰۲۵؛ از ۱۳۵ کشور، رتبهٔ کمتر بهتر است.')
for tick in [0,20,40,60,80,100,120,135]:c.text(570+1000*tick/135,242,fa(tick),26,color=MUTED,center=True)
for i,r in enumerate(data('gtci-2025-iran')):
 y=300+i*78+(44 if i>=3 else 0);x=570+1000*int(r['rank'])/135
 c.text(515,y+11,r['indicator'],34);c.line(570,y,1570,y,'#e2e6e9',7)
 color=TEAL if r['group']=='strength' else ORANGE
 c.parts.append(f'<circle cx="{x}" cy="{y}" r="17" fill="{color}"/>')
 c.text(x+82,y+12,fa(r['rank']),32,bold=True)
c.line(100,498,1700,498);c.text(1680,534,'سنجه‌های محیط جذب، به‌کارگیری و ماندگاری',26,color=MUTED)
c.footer('منبع: اینسید و مؤسسهٔ پورتولنز، شاخص جهانی رقابت استعداد ۲۰۲۵.','سال مرجع متغیرها یکسان نیست؛ عمدهٔ داده‌ها مربوط به ۲۰۲۳ تا ۲۰۲۵ هستند.')
c.save('02-gtci-2025-talent-gap')

rows=data('jobvision-1405'); c=Chart('بازار کار ۱۴۰۵؛ فرصت کمتر، رقابت بیشتر','هفتهٔ دوم اردیبهشت ۱۴۰۵؛ شوک جنگی و آتش‌بس شکننده، نه بازار عادی کار')
for x in [90,940]:c.rect(x,240,770,665,'#ffffff',24,'#dce4ec')
c.text(800,320,'فرصت‌های شغلی',40,bold=True);c.text(800,375,'شاخص تعدیل‌شده؛ روند معمول برابر با ۱۰۰',28,color=MUTED)
for y,label,val,color in [(445,'روند معمول',rows[0]['baseline'],'#94a3b8'),(640,'هفتهٔ دوم اردیبهشت ۱۴۰۵',rows[0]['current'],TEAL)]:
 c.text(790,y,label,30);c.rect(145,y+30,580,65,'#edf0f2');c.rect(145,y+30,580*float(val)/100,65,color);c.text(810,y+76,fa(val),34,bold=True)
c.text(800,847,'۵۳٪ پایین‌تر از روند معمول',34,color=ORANGE,bold=True)
c.text(1650,320,'رقابت کارجویان',40,bold=True);c.text(1650,375,'تعداد رزومه به‌ازای هر فرصت شغلی',29,color=MUTED)
for x,label,val,color in [(1130,'سال‌های گذشته',rows[1]['baseline'],MUTED),(1510,'سال ۱۴۰۵',rows[1]['current'],TEAL)]:
 c.text(x,510,label,30,color=MUTED,center=True);c.text(x,635,fa(val),80,color=color,bold=True,center=True)
c.text(1650,847,'حدود ۱۳۰٪ رقابت بیشتر',34,color=ORANGE,bold=True)
c.footer('منبع: داده‌های تحلیلی جاب‌ویژن، اردیبهشت ۱۴۰۵.','این داده‌ها بازار مشاهده‌شده در جاب‌ویژن را نشان می‌دهند، نه کل اشتغال کشور.')
c.save('03-jobvision-1405')

c=Chart('اثر جنگ ۱۲روزه بر بنگاه‌ها و نیروی انسانی','نظرسنجی ایران‌تلنت و اتاق بازرگانی تهران از ۷۳۵ مدیر و مالک کسب‌وکار؛ تیر و مرداد ۱۴۰۴')
labels=[['افت یا توقف تولید و خدمت','در جنگ ۱۲روزه'],['افت بیش از ۵۰٪ نقدینگی','در بخش فناوری اطلاعات'],['اختلال اینترنت برای شرکت‌های','دارای امکان دورکاری'],['قرار دادن تعدیل نیرو','در برنامهٔ پساجنگ'],['پیش‌بینی کاهش تولید، فروش و','نیروی انسانی در ۳ ماه بعد']]
for i,r in enumerate(data('war-business-impact-1404')):
 y=270+i*137
 for j,line in enumerate(labels[i]):c.text(680,y+j*39,line,32)
 c.text(680,y+78,r['note'],25,color=MUTED)
 w=850*float(r['value'])/100;c.rect(730,y-8,850,64,'#edf0f2');c.rect(730,y-8,w,64,TEAL if i<3 else ORANGE)
 c.text(730+w+100,y+37,fa(r['value'])+'٪',34,bold=True)
c.footer('منبع: ایران‌تلنت و اتاق بازرگانی تهران، گزارش تأثیر جنگ بر کسب‌وکارها، ۱۴۰۴.','این ارقام نتایج نظرسنجی‌اند و سرشماری کل بنگاه‌های کشور نیستند.')
c.save('04-war-business-impact')

c=Chart('بازار کار کل کشور در بهار ۱۴۰۵','مقایسه با بهار ۱۴۰۴؛ جنگ ۴۰روزه و آتش‌بس شکننده در بخش مهمی از این فصل')
for i,r in enumerate(data('labor-force-spring-1405')):
 x=90 if i%2==0 else 940;y=235+(i//2)*365
 c.rect(x,y,770,330,'#ffffff',24,'#dce4ec')
 title='نرخ بیکاری ۱۵ سال و بیشتر' if i==0 else r['metric']
 c.text(x+710,y+60,title,35,bold=True)
 for cx,year,value,color in [(x+565,'بهار ۱۴۰۴',r['spring_1404'],MUTED),(x+205,'بهار ۱۴۰۵',r['spring_1405'],TEAL)]:
  c.text(cx,y+117,year,27,color=MUTED,center=True)
  c.text(cx,y+195,fa(value),61,color=color,bold=True,center=True)
  c.text(cx,y+238,'درصد' if r['unit']=='٪' else r['unit'],26,color=MUTED,center=True)
 change=r['change'].replace('+','افزایش ').replace('−','کاهش ')
 c.text(x+710,y+295,change,29,color=ORANGE,bold=True)
c.footer('منبع: طرح آمارگیری نیروی کار مرکز آمار ایران، بهار ۱۴۰۵؛ بازنشر تسنیم.','تغییرات نسبت به سال قبل، از اختلاف ارقام اعلام‌شده محاسبه شده‌اند.')
c.save('05-labor-market-spring-1405')

rows=data('economy-talent-snapshot-1405');c=Chart('فشار اقتصادی بر ماندگاری استعداد؛ ۹ مهر ۱۴۰۵','سه سنجه با واحدهای متفاوت؛ برای توضیح زمینهٔ اقتصادی، نه ساختن یک شاخص ترکیبی')
for x in [70,640,1210]:c.rect(x,240,520,685,'#ffffff',24,'#dce4ec')
c.text(540,315,'تورم بانک مرکزی',36,bold=True)
for i,label in enumerate(['ماهانه','۱۲ماهه','نقطه‌به‌نقطه']):
 y=400+i*147;c.text(530,y,label,30,color=MUTED);c.text(330,y+76,fa(rows[i]['value'])+'٪',57,color=TEAL,bold=True,center=True)
c.text(540,884,'شهریور ۱۴۰۵',27,color=MUTED)
c.text(1110,315,'دلار بازار آزاد',36,bold=True);c.text(900,505,fa(format(int(rows[3]['value']),',')),65,bold=True,center=True);c.text(900,570,'تومان',31,color=MUTED,center=True)
c.text(900,702,'۱۱۶٫۱۲٪ افزایش در یک سال',31,color=ORANGE,bold=True,center=True)
c.text(1110,810,'۹ مهر ۱۴۰۵، ساعت ۱۱:۳۰',28,color=MUTED);c.text(1110,865,'نرخ لحظه‌ای و زمان‌حساس',27,color=MUTED)
c.text(1680,309,'کارشناس علوم داده',34,bold=True);c.text(1680,354,'و هوش مصنوعی',34,bold=True)
for y,label,val,color in [(430,'میانهٔ دریافتی ۱۴۰۴',rows[4]['value'],MUTED),(623,'میانهٔ درخواستی ۱۴۰۵',rows[5]['value'],TEAL)]:
 c.text(1680,y,label,29,color=MUTED);c.text(1340,y+80,fa(val),56,color=color,bold=True,center=True);c.text(1680,y+78,'میلیون تومان',26,color=MUTED)
c.text(1680,798,'فاصلهٔ اسمی: حدود ۴۳٪',30,color=ORANGE,bold=True);c.text(1680,849,'تهران، سطح کارشناس',25,color=MUTED);c.text(1680,892,'«درخواستی» با «دریافتی» یکسان نیست.',23,color=MUTED)
c.footer('منابع: بانک مرکزی ایران؛ شبکهٔ اطلاع‌رسانی طلا و ارز؛ گزارش حقوق و دستمزد ایران‌تلنت ۱۴۰۵.','از این سه سنجه، افت واقعی حقوق محاسبه نشده است.')
c.save('06-economy-talent-snapshot')
print('Rebuilt five standalone SVG charts from the supplied CSVs.')
