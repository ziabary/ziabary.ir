---
language:
- fa
library_name: sentence-transformers
pipeline_tag: sentence-similarity
tags:
- sentence-transformers
- sentence-similarity
- feature-extraction
- loss:CachedMultipleNegativesRankingLoss
widget:
- source_sentence: درنا از پرندگان مهاجر با پاهای بلند و گردن دراز است.
  sentences:
  - >-
    درناها با قامتی بلند و بال‌های پهن، از زیباترین پرندگان مهاجر به شمار
    می‌روند.
  - درناها پرندگانی کوچک با پاهای کوتاه هستند که مهاجرت نمی‌کنند.
  - ایران برای بار دیگر توانست به مدال طلا دست یابد.
- source_sentence: در زمستان هوای تهران بسیار آلوده است.
  sentences:
  - تهران هوای پاکی در فصل زمستان دارد.
  - مشهد و تهران شلوغ‌ترین شهرهای ایران هستند.
  - در زمستان‌ها هوای تهران پاک نیست.
- source_sentence: یادگیری زبان خارجی فرصت‌های شغلی را افزایش می‌دهد.
  sentences:
  - تسلط بر چند زبان، شانس استخدام در شرکت‌های بین‌المللی را بالا می‌برد.
  - دانستن زبان‌های خارجی تأثیری در موفقیت شغلی ندارد.
  - دمای هوا در قطب جنوب به پایین‌ترین حد خود در 50 سال اخیر رسید.
- source_sentence: سفر کردن باعث گسترش دیدگاه‌های فرهنگی می‌شود.
  sentences:
  - بازدید از کشورهای مختلف به درک بهتر تنوع فرهنگی کمک می‌کند.
  - سفر کردن هیچ تأثیری بر دیدگاه‌های فرهنگی افراد ندارد
  - دمای هوا در قطب جنوب به پایین‌ترین حد خود در 50 سال اخیر رسید.
base_model:
- PartAI/TookaBERT-Base
---

# Tooka-SBERT-V2-Small


This model is a Sentence Transformers model trained for semantic textual similarity and embedding tasks. It maps sentences and paragraphs to a dense vector space, where semantically similar texts are close together.

The model is trained in two sizes: [**Small**](https://huggingface.co/PartAI/Tooka-SBERT-V2-Small/) and [**Large**](https://huggingface.co/PartAI/Tooka-SBERT-V2-Large/)

## Usage

### Direct Usage (Sentence Transformers)

First install the Sentence Transformers library:

```bash
pip install sentence-transformers==3.4.1
```

Then you can load this model and run inference.
```python
from sentence_transformers import SentenceTransformer

# Download from the 🤗 Hub
model = SentenceTransformer("PartAI/Tooka-SBERT-V2-Small")
# Run inference
sentences = [
    'درنا از پرندگان مهاجر با پاهای بلند و گردن دراز است.',
    'درناها با قامتی بلند و بال‌های پهن، از زیباترین پرندگان مهاجر به شمار می‌روند.',
    'درناها پرندگانی کوچک با پاهای کوتاه هستند که مهاجرت نمی‌کنند.'
]
embeddings = model.encode(sentences)
print(embeddings.shape)
# [3, 768]

# Get the similarity scores for the embeddings
similarities = model.similarity(embeddings, embeddings)
print(similarities.shape)
# [3, 3]
```

## 🛠️ Training Details
The training is performed in two stages:

1. **Pretraining** on the *Targoman News* dataset  
2. **Fine-tuning** on multiple synthetic datasets

### Stage 1: Pretraining
- We use an **asymmetric** setup.
- Input formatting:
  - Titles are prepended with `"سوال: "`
  - Texts are prepended with `"متن: "`
- Loss function: `CachedMultipleNegativesRankingLoss`

### Stage 2: Fine-tuning
- Loss functions:
  - `CachedMultipleNegativesRankingLoss`
  - `CoSENTLoss`
- Used across multiple synthetic datasets


#  📊 Evaluation
We evaluate our model on the [**PTEB Benchmark**](https://huggingface.co/spaces/PartAI/pteb-leaderboard). Our model **outperforms mE5-Base on average across PTEB tasks**.

For *Retrieval* and *Reranking* tasks, we follow the same asymmetric structure, prepending:
- `"سوال: "` to queries  
- `"متن: "` to documents


| Model                                                                          | #Params | Pair-Classification-Avg | Classification-Avg | Retrieval-Avg | Reranking-Avg | CrossTasks-Avg |
|--------------------------------------------------------------------------------|:-------:|-------------------------|--------------------|---------------|---------------|----------------|
| [Tooka-SBERT-V2-Large](https://huggingface.co/PartAI/Tooka-SBERT-V2-Large)     |  353M   | 80.24                   | 74.73              | 59.80         | 73.44         | **72.05**      |
| [Tooka-SBERT-V2-Small](https://huggingface.co/PartAI/Tooka-SBERT-V2-Small)     |  123M   | 75.69                   | 72.16              | 61.24         | 73.40         | 70.62          |
| [jina-embeddings-v3](https://huggingface.co/jinaai/jina-embeddings-v3)         |  572M   | 71.88                   | **79.27**          | **65.18**     | 64.62         | 70.24          |
| [multilingual-e5-base](https://huggingface.co/intfloat/multilingual-e5-base)   |  278M   | 70.76                   | 69.71              | 63.90         | **76.01**     | 70.09          |
| [Tooka-SBERT-V1-Large](https://huggingface.co/PartAI/Tooka-SBERT)              |  353M   | **81.52**               | 71.54              | 45.61         | 60.44         | 64.78          |


### Task-Specific Datasets in PTEB

- **Pair-Classification**:  
  - FarsTail

- **Classification**:  
  - MassiveIntentClassification  
  - MassiveScenarioClassification  
  - MultilingualSentimentClassification  
  - PersianFoodSentimentClassification

- **Retrieval**:  
  - MIRACLRetrieval  
  - NeuCLIR2023Retrieval  
  - WikipediaRetrievalMultilingual

- **Reranking**:  
  - MIRACLReranking  
  - WikipediaRerankingMultilingual


## Citation

### BibTeX

#### Sentence Transformers
```bibtex
@inproceedings{reimers-2019-sentence-bert,
    title = "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks",
    author = "Reimers, Nils and Gurevych, Iryna",
    booktitle = "Proceedings of the 2019 Conference on Empirical Methods in Natural Language Processing",
    month = "11",
    year = "2019",
    publisher = "Association for Computational Linguistics",
    url = "https://arxiv.org/abs/1908.10084",
}
```

#### CachedMultipleNegativesRankingLoss
```bibtex
@misc{gao2021scaling,
    title={Scaling Deep Contrastive Learning Batch Size under Memory Limited Setup}, 
    author={Luyu Gao and Yunyi Zhang and Jiawei Han and Jamie Callan},
    year={2021},
    eprint={2101.06983},
    archivePrefix={arXiv},
    primaryClass={cs.LG}
}
```