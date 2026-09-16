"""Recheck the article arithmetic and the saved public tariff evidence."""
from pathlib import Path
from decimal import Decimal as D
import json,re
from urllib.parse import unquote
ROOT=Path(__file__).resolve().parent
ARTICLE=Path('src/lib/content/articles/true-llm-cost-buy-rent-or-api.md')
text=ARTICLE.read_text()
def norm(s):
    return s.translate(str.maketrans('۰۱۲۳۴۵۶۷۸۹٬٫','0123456789,.')).replace('\u200c','').replace('\xa0',' ')
def evidence(name):
    return norm(json.loads((ROOT/'evidence'/(name+'.json')).read_text())['text'])
def near(name,label,values,length=240):
    s=evidence(name);i=s.index(label);fragment=s[i:i+length]
    for value in values: assert value in fragment,(name,label,value,fragment)
for name,i,o in [('GPT-4o mini','33,120','132,480'),('GPT-4.1 mini','88,320','353,280'),('GPT-5 mini','55,200','441,600')]:
    near('arvan',name,[i+' تومان',o+' تومان'])
near('iranserver','RTX4090-Smart',['91,0 میلیون تومان','CPU 32 cores','90GB RAM','700GB SSD'])
near('iranserver','RTX3090-Start',['40,5 میلیون تومان','CPU 16 cores','30GB RAM','330GB SSD'])
near('iranserver','A6000-Light',['117,0 میلیون تومان','CPU 16 cores','60GB RAM','700GB SSD'])
near('iranserver-hourly','RTX4090-Smart',['189','ساعتی','CPU 32 cores','90GB RAM','700GB SSD'])
near('ferdowsi','GPU-4090-8c-16r-100d-x1',['79,300','تومان/ ساعتی','8هسته','16GB','100GB'])
near('gapgpt','gpt-4.1-mini',['$0.40','$1.60'])
near('liara','openai/gpt-4.1-mini',['$0.4','$1.6'])
near('avalai','قیمت ورودی',['$0.40 / 1M tokens','$1.60 / 1M tokens'])
near('liara','میرزاخانی\nقیمت ماهانه',['600,000 تومان'])
near('liara','تورینگ\nقیمت ماهانه',['1,050,000 تومان'])
near('drhp','529,000,000',['تومان','نوسانات ارز','استعلام دقیق قیمت'])
rows=[(33120,132480,13248000,39744000),(88320,353280,35328000,105984000),(55200,441600,33120000,88320000)]
for i,o,short,doc in rows:
    assert D(100000)*(2000*i+500*o)/1000000==short
    assert D(100000)*(8000*i+1000*o)/1000000==doc
    assert format(short,',') in norm(text) and format(doc,',') in norm(text)
assert 189000*50==9450000 and 189000*720==136080000
assert 79300*50==3965000 and 79300*720==57096000
assert round(D(91000000)/189000,1)==D('481.5')
assert (2000*D(88320)+500*D(353280))/1000000==D('353.28')
assert (8000*D(88320)+1000*D(353280))/1000000==D('1059.84')
assert round(D(91000000)/D('353.28')/1000)==258
assert round(D(91000000)/D('1059.84')/1000)==86
assert D('.40')*230000==92000 and D('1.60')*230000==368000
assert D(200)*D('.4')+D(50)*D('1.6')==160
assert 160*230000==36800000 and 160*230000+600000==37400000
for removed in ['۸۰۰ میلیون','۱۲ میلیون','۱۶۰ میلیون','۱٬۰۷۲','۲۹٫۸','۲٬۹۷۸','حدود ۲۹۸','۴۴۴ تومان']:
    assert removed not in text,removed
assert 'الان یا الان؟' in text
for slug in set(re.findall(r'\]\(/articles/([^/#)]+)',text)):
    target=(ARTICLE.parent/(slug+'.md')).read_text()
    date=re.search(r'^date: [\"\x27]?(\d{4}-\d{2}-\d{2})',target,re.M).group(1)
    assert date<='2026-09-16' and not re.search(r'^draft:\s*true\s*$',target,re.M),slug
report=json.loads((ROOT/'pricing-audit.json').read_text())
report.pop('ownership_example',None)
basket=json.loads((ROOT/'hardware-basket.json').read_text())
for item in basket['items']:
    name=item['evidence'][:-5]
    assert format(item['toman'], ',') in evidence(name), name
    assert format(item['toman'], ',') in norm(text), name
    assert unquote(item['url']) in unquote(text), name
capital=sum(item['toman'] for item in basket['items'])
assert capital == basket['total_toman'] == 1281100000
assert 91000000*24 == 2184000000
assert 79300*720*24 == 1370304000
assert 79300*50*24 == 95160000
assert 91000000*24-capital == 902900000
assert 79300*720*24-capital == 89204000
assert round(D(capital)/24) == 53379167
assert round(D(91000000)-D(capital)/24) == 37620833
assert round(D(79300*720)-D(capital)/24) == 3716833
assert capital-529000000 == 752100000
assert round(D(529000000)/capital*100,1) == D('41.3')
assert round(D(95160000)/capital*100,1) == D('7.4')
for value in [capital,2184000000,1370304000,902900000,89204000,53379167,37620833,3716833,95160000]:
    assert format(value,',') in norm(text), value
report['ownership_budget']=basket
report['ownership_budget']['calculations']={'monthly_capital_24m_rounded':53379167,'iranserver_rent_24m':2184000000,'ferdowsi_rent_24m':1370304000,'extra_ownership_budget_24m_iranserver':902900000,'extra_ownership_budget_24m_ferdowsi':89204000,'ferdowsi_light_use_24m':95160000}
report['exchange_rate']={'toman_per_usd':230000,'source':'Explicit rate supplied by the author in this request','use':'Fixed conversion basis, not a verified spot market or provider settlement rate','input_per_million_toman':92000,'output_per_million_toman':368000,'short_100k_usd':160,'short_100k_toman':36800000,'with_mirzakhani_plan_toman':37400000}
report['scenario_inputs']={'requests':100000,'short_input_tokens':2000,'short_output_tokens':500,'document_input_tokens':8000,'document_output_tokens':1000,'rental_example_hours':[50,720],'scope':'Explicit comparison inputs; not measured customer usage. 720 hours means a 30-day period.'}
report['evidence_files']=[str(p.relative_to(ROOT)) for p in sorted((ROOT/'evidence').glob('*.json'))]
report['public_tariff_evidence_checked']=True
report['arithmetic_passed']=True
report['purchase_price_status']='Eight directly observed retail component prices; explicit parts-only total, dated evidence, no invented operations quote or resale value.'
(ROOT/'pricing-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print('PASS: public tariffs, eight component prices and source links, basket sum, two-year rental/capital comparisons, FX, article links and chronology.')
