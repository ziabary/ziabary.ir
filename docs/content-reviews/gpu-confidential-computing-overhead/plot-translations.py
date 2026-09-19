"""Render the English and Spanish editions of the Table 20 plot.
Run from repository root with matplotlib>=3.11. No source measurements change.
"""
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
plt.rcParams.update({'svg.fonttype':'path','svg.hashsalt':'gpu-cc-output-sweep','font.size':14})
x=[256,512,1024,2048]; y=[14.4,10.1,7.0,1.1]
labels={
'en': ('Output length and confidential computing overhead','Output tokens','Throughput loss (%)'),
'es': ('Longitud de salida y sobrecarga de computación confidencial','Tokens de salida','Pérdida de rendimiento (%)')
}
for locale,(title,xlabel,ylabel) in labels.items():
    fig,ax=plt.subplots(figsize=(10,5.4),layout='constrained')
    fig.set_facecolor('#f5f9f9'); ax.set_facecolor('#f5f9f9')
    ax.plot(x,y,marker='o',color='#007d81',lw=2.5,markersize=9)
    ax.set_xlim(100,2200); ax.set_ylim(0,17)
    ax.set_xticks(x); ax.set_yticks([0,4,8,12,16])
    ax.set_xlabel(xlabel,fontsize=16,labelpad=12)
    ax.set_ylabel(ylabel,fontsize=16,labelpad=12)
    ax.set_title(title,fontsize=16 if locale=='es' else 18,pad=20)
    for a,b in zip(x,y):
        label=f'{b:.1f}%' if locale=='en' else f'{b:.1f}'.replace('.',',')+' %'
        ax.annotate(label,(a,b),xytext=(0,14),textcoords='offset points',ha='center',fontsize=16,color='#12343c')
    ax.grid(axis='y',color='#d4e1e3',linewidth=.8); ax.set_axisbelow(True)
    for side in ['top','right']: ax.spines[side].set_visible(False)
    for side in ['left','bottom']: ax.spines[side].set_color('#94aaad')
    ax.tick_params(colors='#12343c')
    fig.savefig(f'static/images/articles/gpu-confidential-computing-overhead/output-length-overhead-{locale}.svg',metadata={'Date':None,'Description':'Single-pass output-length sweep, arXiv:2608.26575v2, Table 20. Repeated 2048-token runs yielded 2.8–3.6%.'})
    fig.savefig(f'/tmp/gpu-cc-chart-{locale}.png',dpi=120)
    plt.close(fig)
