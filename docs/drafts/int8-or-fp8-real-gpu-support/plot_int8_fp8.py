from pathlib import Path
import csv
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

ROOT = Path(__file__).resolve().parent
rows = [
    {'gpu': 'H200 SXM', 'fp8_dense_tflops': 1979, 'int8_dense_tops': 1979,
     'source': 'https://www.nvidia.com/en-us/data-center/h200/',
     'basis': 'SXM; published sparse rates divided by two'},
    {'gpu': 'HGX B200', 'fp8_dense_tflops': 4500, 'int8_dense_tops': 4500,
     'source': 'https://resources.nvidia.com/en-us-blackwell-architecture/blackwell-architecture-technical-brief',
     'basis': 'Technical Brief Table 3; per GPU; dense'},
    {'gpu': 'HGX B300', 'fp8_dense_tflops': 4500, 'int8_dense_tops': 150,
     'source': 'https://resources.nvidia.com/en-us-blackwell-architecture/blackwell-architecture-technical-brief',
     'basis': 'Technical Brief Table 3; per GPU; dense; not GB300 NVL72'},
]
for row in rows:
    row['fp8_to_int8_rate_ratio'] = row['fp8_dense_tflops'] / row['int8_dense_tops']
    row['source_checked'] = '2026-09-08'
with (ROOT / 'int8-fp8-chart-data.csv').open('w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=list(rows[0]))
    writer.writeheader()
    writer.writerows(rows)

plt.rcParams.update({'font.family':'DejaVu Sans', 'font.size':12,
                     'svg.fonttype':'none', 'axes.spines.top':False,
                     'axes.spines.right':False, 'axes.spines.left':False})
fig, ax = plt.subplots(figsize=(12, 5.7))
fig.patch.set_facecolor('#fafbf9')
ax.set_facecolor('#fafbf9')
fig.subplots_adjust(left=.16, right=.93, top=.73, bottom=.28)
fig.text(.06, .91, 'The FP8 / INT8 balance changes on B300', size=21,
         weight='bold', color='#182b38')
fig.text(.06, .84, 'Ratio of published dense Tensor Core peak rates, per GPU',
         size=13, color='#475660')
bars = ax.barh([0,1,2], [r['fp8_to_int8_rate_ratio'] for r in rows],
              color=['#7a909b','#476676','#c57834'], height=.47)
ax.set_yticks([0,1,2], [r['gpu'] for r in rows])
ax.invert_yaxis()
ax.set_xlim(0,33)
ax.set_xticks([0,5,10,15,20,25,30])
ax.set_xlabel('FP8 TFLOPS / INT8 TOPS', labelpad=12)
ax.xaxis.grid(True, color='#dbe0df', linewidth=.7)
ax.set_axisbelow(True)
ax.tick_params(axis='y', length=0, pad=12)
for i,r in enumerate(rows):
    val=r['fp8_to_int8_rate_ratio']
    ax.text(val+.55, i, 'approx. 30:1' if val==30 else '1:1',
            va='center', size=12, weight='bold', color='#182b38')
ax.set_xlim(0,38)
fig.text(.06,.13, 'Specification ratios are not measured inference speedups.',
         color='#7d4429',size=12,weight='bold')
fig.text(.06,.077, 'Sources: NVIDIA H200 specifications; Blackwell Architecture Technical Brief, Table 3.',
         size=10,color='#475660')
fig.text(.06,.035, 'B300 uses the Technical Brief value of 150 dense TOPS. The Ultra datasheet lists 153.5 dense TOPS. Checked 2026-09-08.',
         size=8.5,color='#475660')
fig.savefig(ROOT/'int8-fp8-peak-ratio.png', dpi=180)
fig.savefig(ROOT/'int8-fp8-peak-ratio.svg')
