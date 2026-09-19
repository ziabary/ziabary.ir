"""Render the supplied paper's single-pass output-length sweep (Table 20).
Temporary tooling: matplotlib>=3.11, fonttools[woff].
Run from repository root; font conversion stays in /tmp.
"""
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties
from fontTools.ttLib import TTFont
font = TTFont('static/fonts/IranSansX/fonts/woff2/IRANSansX-Regular.woff2')
font.flavor = None
font.save('/tmp/gpu-cc-IranSansX.ttf')
fp = FontProperties(fname='/tmp/gpu-cc-IranSansX.ttf')
def fa(s):
    return s  # Matplotlib 3.11 shapes Persian and applies bidi natively.
def digits(s):
    return str(s).translate(str.maketrans('0123456789.', '۰۱۲۳۴۵۶۷۸۹٫'))
plt.rcParams.update({'svg.fonttype':'path', 'svg.hashsalt':'gpu-cc-output-sweep', 'font.size':14})
fig, ax = plt.subplots(figsize=(10,5.4), layout='constrained')
fig.set_facecolor('#f5f9f9'); ax.set_facecolor('#f5f9f9')
x=[256,512,1024,2048]; y=[14.4,10.1,7.0,1.1]
ax.plot(x,y,marker='o',color='#007d81',lw=2.5,markersize=9)
ax.set_xlim(100,2200); ax.set_ylim(0,17)
ax.set_xticks(x, [digits(v) for v in x], fontproperties=fp)
ax.set_yticks([0,4,8,12,16], [digits(v) for v in [0,4,8,12,16]], fontproperties=fp)
ax.set_xlabel(fa('تعداد توکن خروجی'), fontproperties=fp,fontsize=16,labelpad=12)
ax.set_ylabel(fa('افت توان عملیاتی (درصد)'), fontproperties=fp,fontsize=16,labelpad=12)
ax.set_title(fa('طول خروجی و سربار پردازش محرمانه'),fontproperties=fp,fontsize=20,pad=20)
for a,b in zip(x,y):
    ax.annotate(fa(digits(f'{b:.1f}')+'٪'), (a,b), xytext=(0,14), textcoords='offset points',ha='center',fontproperties=fp,fontsize=16,color='#12343c')
ax.grid(axis='y',color='#d4e1e3',linewidth=.8); ax.set_axisbelow(True)
for side in ['top','right']: ax.spines[side].set_visible(False)
for side in ['left','bottom']: ax.spines[side].set_color('#94aaad')
ax.tick_params(colors='#12343c')
fig.savefig('static/images/articles/gpu-confidential-computing-overhead/output-length-overhead.svg',metadata={'Date':None,'Description':'Single-pass sweep: MiniMax-M2.7, 8 B200, TP8, input 1024, concurrency 32. Repeated 2048-token runs yielded 2.8–3.6%, not 1.1%. Source arXiv:2608.26575v2.'})
fig.savefig('/tmp/gpu-cc-output-length.png',dpi=130)
