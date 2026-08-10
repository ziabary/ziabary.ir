/* eslint-disable */
const serverData = {
  "meta": {
    "sourceDocument": "TPD-DMV-GEN-001.v1(1).odt",
    "sourceLastReviewedFa": "۱۴۰۴/۰۲/۲۹",
    "extractedAt": "2026-08-10",
    "recordCount": 64,
    "warning": "عنوان ستون بله/خیر در سه جدول PCIe داخل سند مبدأ خالی است؛ مقدار خام حفظ شده و معنایی برای آن جعل نشده است. قیمت‌ها نیز برآورد تاریخی سند هستند."
  },
  "categories": [
    {
      "id": "a100-sxm",
      "label": "A100 SXM"
    },
    {
      "id": "h100-sxm",
      "label": "H100 SXM"
    },
    {
      "id": "h200-sxm",
      "label": "H200 SXM"
    },
    {
      "id": "industrial-pcie",
      "label": "کارت صنعتی PCIe"
    },
    {
      "id": "consumer-dual-slot",
      "label": "کارت عمومی دو اسلات"
    },
    {
      "id": "rtx4090-5090",
      "label": "RTX 4090 / RTX 5090"
    }
  ],
  "records": [
    {
      "id": "thinkmate-gpx-xt6-24s3",
      "maker": "Thinkmate",
      "model": "GPX XT6-24S3",
      "cpu": "2 x Xeon Gen3",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "4 x 2200",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": "6x NVMe",
      "sourceUrl": "https://www.thinkmate.com/system/gpx-xt6-24s3-8nvlink",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "a100-sxm",
          "categoryLabel": "A100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "nvidia-offered-by-exxact-fujitsu-dell-dgx-a100",
      "maker": "Nvidia: offered by: Exxact Fujitsu Dell",
      "model": "DGX-A100",
      "cpu": "2 x AMD 7742",
      "memorySlotsOrCapacity": "2TB",
      "network": "2 x 10G + 8x200G Direct GPU",
      "powerSupplies": "4 x 2200",
      "height": "6U",
      "heightU": 6.0,
      "otherFeatures": "DGX software stack and NVIDIA AI Enterprise",
      "sourceUrl": "https://www.exxactcorp.com/category/NVIDIA-DGX-Systems",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "a100-sxm",
          "categoryLabel": "A100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "supermicro-420gp-tnar",
      "maker": "Supermicro",
      "model": "420GP-TNAR",
      "cpu": "2 x Xeon Gen3",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "4 x 2200 4 x 3300",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": "6x SATA/NVMe",
      "sourceUrl": "https://www.supermicro.com/en/products/system/GPU/4U/SYS-420GP-TNAR",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "a100-sxm",
          "categoryLabel": "A100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "supermicro-4124go-nart",
      "maker": "Supermicro",
      "model": "4124GO-NART",
      "cpu": "2 x AMD 7003",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "4 x 2200 4 x 3000",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": "6x SATA/NVMe",
      "sourceUrl": "https://www.supermicro.com/en/Aplus/system/4U/4124/AS-4124GO-NART.cfm",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "a100-sxm",
          "categoryLabel": "A100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "asa-asa4104-ep2-r",
      "maker": "ASA",
      "model": "ASA4104-EP2-R",
      "cpu": "2 x AMD 7003",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "4 x 3000",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": "6x SATA/NVMe",
      "sourceUrl": "https://www.asacomputers.com/4u-8x-gpu-ai-epyc-server.html",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "a100-sxm",
          "categoryLabel": "A100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "asa-asa4103-x2-r",
      "maker": "ASA",
      "model": "ASA4103-X2-R",
      "cpu": "2 x Xeon Gen3",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "4 x 3000",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": "6x SATA/NVMe",
      "sourceUrl": "https://www.asacomputers.com/gpu-servers.html#:~:text=4U%20Server%20%2D-,ASA4103%2DX2%2DR,-CUSTOMIZE",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "a100-sxm",
          "categoryLabel": "A100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "bizon-g9000-g2",
      "maker": "BIZON",
      "model": "G9000 G2",
      "cpu": "2 x EPYC 9004",
      "memorySlotsOrCapacity": "48",
      "network": "1 x 10G",
      "powerSupplies": "4 x 3000",
      "height": "6U",
      "heightU": 6.0,
      "otherFeatures": "BIZON OS + DNN libraries",
      "sourceUrl": "https://bizon-tech.com/bizon-g9000.html",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "a100-sxm",
          "categoryLabel": "A100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        },
        {
          "categoryId": "h100-sxm",
          "categoryLabel": "H100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        },
        {
          "categoryId": "h200-sxm",
          "categoryLabel": "H200 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "lenovo-sd665-n-v2",
      "maker": "Lenovo",
      "model": "SD665-N V2",
      "cpu": "2 x Xeon Gen3",
      "memorySlotsOrCapacity": "16",
      "network": "2 x 25G",
      "powerSupplies": "9 x 2400 external",
      "height": "1U",
      "heightU": 1.0,
      "otherFeatures": "Water cooling 4 x A100",
      "sourceUrl": "https://lenovopress.lenovo.com/lp1396-thinksystem-sd650-n-v2-server?orgRef=https%253A%252F%252Fwww.google.com%252F",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "a100-sxm",
          "categoryLabel": "A100 SXM",
          "maxGpuCount": 4,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "fujitsu-gx2570",
      "maker": "Fujitsu",
      "model": "GX2570",
      "cpu": "2 x Xeon Gen3",
      "memorySlotsOrCapacity": "32",
      "network": "-",
      "powerSupplies": "4 x 2200",
      "height": "4 U",
      "heightU": 4.0,
      "otherFeatures": "4 x NVME",
      "sourceUrl": "https://sp.ts.fujitsu.com/dmsp/Publications/public/ds-py-gx2570-m6.pdf",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "a100-sxm",
          "categoryLabel": "A100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "supermicro-8125gs-tnhr",
      "maker": "Supermicro",
      "model": "8125GS-TNHR",
      "cpu": "2 x EPYC 9004",
      "memorySlotsOrCapacity": "24",
      "network": "2 x 10G*",
      "powerSupplies": "6 x 3000",
      "height": "8U",
      "heightU": 8.0,
      "otherFeatures": "16x NVMe",
      "sourceUrl": "https://www.supermicro.com/en/products/system/gpu/8u/as-8125gs-tnhr",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h100-sxm",
          "categoryLabel": "H100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "supermicro-821ge-tnhr",
      "maker": "Supermicro",
      "model": "821GE-TNHR",
      "cpu": "2 x Xeon Gen5",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G*",
      "powerSupplies": "6 x 3000",
      "height": "8U",
      "heightU": 8.0,
      "otherFeatures": "16x NVMe",
      "sourceUrl": "https://www.supermicro.com/en/products/system/gpu/8u/sys-821ge-tnhr",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h100-sxm",
          "categoryLabel": "H100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "ixsystems-ix-5208g-h1",
      "maker": "IXSystems",
      "model": "iX-5208G-H1",
      "cpu": "2 x Xeon Gen4",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "6 x 3000",
      "height": "5U",
      "heightU": 5.0,
      "otherFeatures": "8x NVMe",
      "sourceUrl": "https://www.ixsystems.com/ix-server-family/gpu-servers/ix-5208g/",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h100-sxm",
          "categoryLabel": "H100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "thinkmate-qh14-28e4-8hgx",
      "maker": "Thinkmate",
      "model": "QH14-28E4-8HGX",
      "cpu": "2 x EPYC 9004",
      "memorySlotsOrCapacity": "24",
      "network": "2 x 10G*",
      "powerSupplies": "6 x 3000",
      "height": "8U",
      "heightU": 8.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.thinkmate.com/system/gpx-qh14-28e4-8hgx",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h100-sxm",
          "categoryLabel": "H100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "thinkmate-xh20-28s4-8hgx",
      "maker": "Thinkmate",
      "model": "XH20-28S4-8HGX",
      "cpu": "2 x Xeon Gen5",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G*",
      "powerSupplies": "6 x 3000",
      "height": "8U",
      "heightU": 8.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.thinkmate.com/system/gpx-xh20-28s4-8hgx",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h100-sxm",
          "categoryLabel": "H100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "qct-d74h",
      "maker": "QCT",
      "model": "D74H",
      "cpu": "2 x Xeon Gen5",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G*",
      "powerSupplies": "6 x 3000",
      "height": "7U",
      "heightU": 7.0,
      "otherFeatures": null,
      "sourceUrl": "https://qct.io/product/index/Server/rackmount-server/GPGPU-Xeon-Phi/QuantaGrid-D74H-7U",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h100-sxm",
          "categoryLabel": "H100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "gigabyte-g593-sd0",
      "maker": "Gigabyte",
      "model": "G593-SD0",
      "cpu": "2 x Xeon Gen5",
      "memorySlotsOrCapacity": "32",
      "network": "1 x 10G",
      "powerSupplies": "6 x 3000",
      "height": "5U",
      "heightU": 5.0,
      "otherFeatures": "13xPCIe",
      "sourceUrl": "https://www.gigabyte.com/Enterprise/GPU-Server/G593-SD0-rev-AAX1",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h100-sxm",
          "categoryLabel": "H100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "gigabyte-g593-zd2",
      "maker": "Gigabyte",
      "model": "G593-ZD2",
      "cpu": "2 x EPYC 9004",
      "memorySlotsOrCapacity": "24",
      "network": "1 x 10G",
      "powerSupplies": "6 x 3000",
      "height": "5U",
      "heightU": 5.0,
      "otherFeatures": "8x NVMe/SAS",
      "sourceUrl": "https://www.gigabyte.com/Enterprise/GPU-Server/G593-ZD2-rev-AAX1",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h100-sxm",
          "categoryLabel": "H100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "lambdalabs-hyperplane-amd",
      "maker": "lambdalabs",
      "model": "Hyperplane AMD",
      "cpu": "2 x EPYC 9654",
      "memorySlotsOrCapacity": "1.5TB",
      "network": "2 x 10G + 8 x 400G Direct GPU",
      "powerSupplies": "6 x 3000",
      "height": "8U",
      "heightU": 8.0,
      "otherFeatures": "Lambda Stack pre-installed",
      "sourceUrl": "https://lambdalabs.com/deep-learning/servers/hyperplane",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h100-sxm",
          "categoryLabel": "H100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        },
        {
          "categoryId": "h200-sxm",
          "categoryLabel": "H200 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "lambdalabs-hyperplane-intel",
      "maker": "lambdalabs",
      "model": "Hyperplane Intel",
      "cpu": "2 x Xeon 8480",
      "memorySlotsOrCapacity": "2TB",
      "network": "6 x 3000",
      "powerSupplies": "8U",
      "height": null,
      "heightU": null,
      "otherFeatures": null,
      "sourceUrl": "https://lambdalabs.com/deep-learning/servers/hyperplane",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h100-sxm",
          "categoryLabel": "H100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        },
        {
          "categoryId": "h200-sxm",
          "categoryLabel": "H200 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "nvidia-by-exxact-fujitsu-dgx-h100",
      "maker": "Nvidia by: Exxact Fujitsu",
      "model": "DGX-H100",
      "cpu": "2 x Xeon Gen4",
      "memorySlotsOrCapacity": "2TB",
      "network": "2 x 10G + 8 x 400G Direct GPU",
      "powerSupplies": "6 x 3000",
      "height": "8U",
      "heightU": 8.0,
      "otherFeatures": "NVIDIA AI Enterprise software",
      "sourceUrl": "https://www.exxactcorp.com/category/NVIDIA-DGX-Systems",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h100-sxm",
          "categoryLabel": "H100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "asus-esc-n8-e11",
      "maker": "Asus",
      "model": "ESC N8-E11",
      "cpu": "2 x Xeon Gen5",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "6 x 3000",
      "height": "7U",
      "heightU": 7.0,
      "otherFeatures": "8x NVMe/SAS",
      "sourceUrl": "https://servers.asus.com/products/servers/gpu-servers/ESC-N8-E11",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h100-sxm",
          "categoryLabel": "H100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "asus-esc-n8-e12",
      "maker": "Asus",
      "model": "ESC N8-E12",
      "cpu": "2 x EPYC 9004",
      "memorySlotsOrCapacity": "24",
      "network": "2 x 10G",
      "powerSupplies": "6 x 3000",
      "height": "7U",
      "heightU": 7.0,
      "otherFeatures": "10x NVMe/SAS",
      "sourceUrl": "https://servers.asus.com/products/servers/gpu-servers/ESC-N8A-E12",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h100-sxm",
          "categoryLabel": "H100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "dell-xe9680",
      "maker": "DELL",
      "model": "XE9680",
      "cpu": "2 x Xeon Gen4",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 1G",
      "powerSupplies": "6 x 2800",
      "height": "6U",
      "heightU": 6.0,
      "otherFeatures": "8x NVMe/SAS",
      "sourceUrl": "https://www.dell.com/en-us/shop/ipovw/poweredge-xe9680",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h100-sxm",
          "categoryLabel": "H100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "asa-asa5103-x2-r",
      "maker": "ASA",
      "model": "ASA5103-X2-R",
      "cpu": "2 x Xeon Gen5",
      "memorySlotsOrCapacity": "32",
      "network": "1 x 10G",
      "powerSupplies": "6 x 3000",
      "height": "5U",
      "heightU": 5.0,
      "otherFeatures": "8 NVME/SAS",
      "sourceUrl": "https://www.asacomputers.com/5u-8x-gpu-server.html",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h100-sxm",
          "categoryLabel": "H100 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "lenovo-sd665-n-v3",
      "maker": "Lenovo",
      "model": "SD665-N V3",
      "cpu": "2 x EPYC 9004",
      "memorySlotsOrCapacity": "24",
      "network": "2 x 25G",
      "powerSupplies": "9 x 2400 external",
      "height": "1U",
      "heightU": 1.0,
      "otherFeatures": "Water cooling 4 x H100",
      "sourceUrl": "https://www.lenovo.com/us/en/p/servers-storage/servers/supercomputing/thinksystem-sd665-n-v3/len21ts0011",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h100-sxm",
          "categoryLabel": "H100 SXM",
          "maxGpuCount": 4,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "ixsystems-ix-5208g-h2",
      "maker": "IXSystems",
      "model": "iX-5208G-H2",
      "cpu": "2 x Xeon Gen4",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "6 x 3000",
      "height": "5U",
      "heightU": 5.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.ixsystems.com/ix-server-family/gpu-servers/ix-5208g-h2/",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h200-sxm",
          "categoryLabel": "H200 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "nvidia-by-exxact-fujitsu-dell-dgx-h200",
      "maker": "Nvidia by: Exxact Fujitsu Dell",
      "model": "DGX-H200",
      "cpu": "2 x Xeon Gen4",
      "memorySlotsOrCapacity": "2TB",
      "network": "2 x 10G + 8 x 400G Direct GPU",
      "powerSupplies": "6 x 3000",
      "height": "8U",
      "heightU": 8.0,
      "otherFeatures": "NVIDIA AI Enterprise Optimized AI software",
      "sourceUrl": "https://www.exxactcorp.com/category/NVIDIA-DGX-Systems",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h200-sxm",
          "categoryLabel": "H200 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "supermicro-by-arc-8125gs-tnhr",
      "maker": "Supermicro by ARC",
      "model": "8125GS-TNHR",
      "cpu": "2 x EPYC 9004",
      "memorySlotsOrCapacity": "24",
      "network": "2 x 10G*",
      "powerSupplies": "6 x 3000",
      "height": "8U",
      "heightU": 8.0,
      "otherFeatures": "16x NVMe",
      "sourceUrl": "https://www.supermicro.com/en/products/system/gpu/8u/as-8125gs-tnhr",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h200-sxm",
          "categoryLabel": "H200 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "supermicro-by-arc-821ge-tnhr",
      "maker": "Supermicro by ARC",
      "model": "821GE-TNHR",
      "cpu": "2 x Xeon Gen5",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G*",
      "powerSupplies": "6 x 3000",
      "height": "8U",
      "heightU": 8.0,
      "otherFeatures": "16x NVMe",
      "sourceUrl": "https://www.supermicro.com/en/products/system/gpu/8u/sys-821ge-tnhr",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "h200-sxm",
          "categoryLabel": "H200 SXM",
          "maxGpuCount": 8,
          "maxGpuCountRaw": null,
          "pcieGeneration": null,
          "compatibilityFlagRaw": null,
          "documentPriceRaw": null,
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "ixsystems-ax-4212g",
      "maker": "IXSystems",
      "model": "AX-4212G",
      "cpu": "2 x EPYC 9004",
      "memorySlotsOrCapacity": "48",
      "network": "2 x 1G",
      "powerSupplies": "4 x 3000",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.ixsystems.com/ix-server-family/gpu-servers/ax-4212g/",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8+2",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "بلی",
          "documentPriceRaw": "نامعلوم",
          "documentPriceUsd": null
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "نامعلوم",
          "documentPriceUsd": null
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$0",
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "lenovo-sr675-v3",
      "maker": "Lenovo",
      "model": "SR675 V3",
      "cpu": "2 x EPYC 9004",
      "memorySlotsOrCapacity": "24",
      "network": "2 x 10G",
      "powerSupplies": "4 x 2600",
      "height": "3U",
      "heightU": 3.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.lenovo.com/us/en/p/servers-storage/servers/racks/thinksystem-sr675-v3/len21ts0007",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "بلی",
          "documentPriceRaw": "$29٬000",
          "documentPriceUsd": 29000
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$29٬000",
          "documentPriceUsd": 29000
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$29٬000",
          "documentPriceUsd": 29000
        }
      ]
    },
    {
      "id": "tyan-ft83a-b7129",
      "maker": "Tyan",
      "model": "FT83A-B7129",
      "cpu": "2 x Xeon Gen3",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "4 x 4800",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.tyan.com/Barebones_FT83AB7129_B7129F83AV8E4HR-N",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 10,
          "maxGpuCountRaw": "10",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "$11٬500",
          "documentPriceUsd": 11500
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 4,
          "maxGpuCountRaw": "4",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$11٬500",
          "documentPriceUsd": 11500
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 4,
          "maxGpuCountRaw": "4",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$11٬500",
          "documentPriceUsd": 11500
        }
      ]
    },
    {
      "id": "asus-rino-rg488-g11",
      "maker": "ASUS/Rino",
      "model": "RG488-G11",
      "cpu": "2 x Xeon Gen5",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "3 x 3000",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": null,
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "بلی",
          "documentPriceRaw": "$8٬500",
          "documentPriceUsd": 8500
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$8٬500",
          "documentPriceUsd": 8500
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$8٬500",
          "documentPriceUsd": 8500
        }
      ]
    },
    {
      "id": "asus-rino-esc8000a-e11",
      "maker": "ASUS/Rino",
      "model": "ESC8000A-E11",
      "cpu": "2 x EPYC 7003",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 1G",
      "powerSupplies": "4 x 2200",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://servers.asus.com/products/Servers/GPU-Servers/ESC8000A-E11",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "بلی",
          "documentPriceRaw": "$7٬900",
          "documentPriceUsd": 7900
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$7٬900",
          "documentPriceUsd": 7900
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$7٬900",
          "documentPriceUsd": 7900
        }
      ]
    },
    {
      "id": "asus-rino-esc8000a-e12",
      "maker": "ASUS/Rino",
      "model": "ESC8000A-E12",
      "cpu": "2 x EPYC 9004",
      "memorySlotsOrCapacity": "24",
      "network": "2 x 10G",
      "powerSupplies": "4 x 3000",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://servers.asus.com/products/servers/gpu-servers/esc8000a-e12",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "بلی",
          "documentPriceRaw": "$15٬500",
          "documentPriceUsd": 15500
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$15٬500",
          "documentPriceUsd": 15500
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$15٬500",
          "documentPriceUsd": 15500
        }
      ]
    },
    {
      "id": "asus-rino-esc4000-e10",
      "maker": "ASUS/Rino",
      "model": "ESC4000-E10",
      "cpu": "2 x Xeon Gen3",
      "memorySlotsOrCapacity": "16",
      "network": "2 x 1G",
      "powerSupplies": "2 x 1600",
      "height": "2U",
      "heightU": 2.0,
      "otherFeatures": null,
      "sourceUrl": "https://servers.asus.com/products/servers/gpu-servers/esc4000-e10s",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "$6٬000",
          "documentPriceUsd": 6000
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 4,
          "maxGpuCountRaw": "4",
          "pcieGeneration": 2,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$6٬000",
          "documentPriceUsd": 6000
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 4,
          "maxGpuCountRaw": "4",
          "pcieGeneration": 2,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$6٬000",
          "documentPriceUsd": 6000
        }
      ]
    },
    {
      "id": "asus-rino-esc4000a-e11",
      "maker": "ASUS/Rino",
      "model": "ESC4000A-E11",
      "cpu": "2 x EPYC 7003",
      "memorySlotsOrCapacity": "8",
      "network": "2 x 1G",
      "powerSupplies": "2 x 2600",
      "height": "2U",
      "heightU": 2.0,
      "otherFeatures": null,
      "sourceUrl": "https://servers.asus.com/products/servers/gpu-servers/esc4000-e11",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "$4٬200",
          "documentPriceUsd": 4200
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 4,
          "maxGpuCountRaw": "4",
          "pcieGeneration": 2,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$4٬200",
          "documentPriceUsd": 4200
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 4,
          "maxGpuCountRaw": "4",
          "pcieGeneration": 2,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$4٬200",
          "documentPriceUsd": 4200
        }
      ]
    },
    {
      "id": "gigabyte-g492-h80",
      "maker": "Gigabyte",
      "model": "G492-H80",
      "cpu": "2 x Xeon Gen4",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "3 x 2200",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.gigabyte.com/Enterprise/GPU-Server/G492-H80-rev-100",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "$9٬600",
          "documentPriceUsd": 9600
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$9٬600",
          "documentPriceUsd": 9600
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$9٬600",
          "documentPriceUsd": 9600
        }
      ]
    },
    {
      "id": "gigabyte-g292-280",
      "maker": "Gigabyte",
      "model": "G292-280",
      "cpu": "2 x Xeon Gen4",
      "memorySlotsOrCapacity": "24",
      "network": "2 x 10G",
      "powerSupplies": "2 x 3200",
      "height": "2U",
      "heightU": 2.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.gigabyte.com/Enterprise/GPU-Server/G292-280-rev-100",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "$8٬800",
          "documentPriceUsd": 8800
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$8٬800",
          "documentPriceUsd": 8800
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$8٬800",
          "documentPriceUsd": 8800
        }
      ]
    },
    {
      "id": "gigabyte-g292-z40",
      "maker": "Gigabyte",
      "model": "G292-Z40",
      "cpu": "2 x EPYC 7003",
      "memorySlotsOrCapacity": "16",
      "network": "2 x 10G",
      "powerSupplies": "2 x 2200",
      "height": "2U",
      "heightU": 2.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.gigabyte.com/Enterprise/GPU-Server/G292-Z40-rev-100",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "$7٬900",
          "documentPriceUsd": 7900
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$7٬900",
          "documentPriceUsd": 7900
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$7٬900",
          "documentPriceUsd": 7900
        }
      ]
    },
    {
      "id": "gigabyte-g292-z44",
      "maker": "Gigabyte",
      "model": "G292-Z44",
      "cpu": "2 x EPYC 7003",
      "memorySlotsOrCapacity": "16",
      "network": "2 x 10G",
      "powerSupplies": "2 x 2200",
      "height": "2U",
      "heightU": 2.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.gigabyte.com/Enterprise/GPU-Server/G292-Z44-rev-100",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "$6٬900",
          "documentPriceUsd": 6900
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$6٬900",
          "documentPriceUsd": 6900
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$6٬900",
          "documentPriceUsd": 6900
        }
      ]
    },
    {
      "id": "gigabyte-g492-ha0",
      "maker": "Gigabyte",
      "model": "G492-HA0",
      "cpu": "2 x Xeon Gen4",
      "memorySlotsOrCapacity": "32",
      "network": "-",
      "powerSupplies": "3 x 2200",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.gigabyte.com/Enterprise/GPU-Server/G492-HA0-rev-100",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 10,
          "maxGpuCountRaw": "10",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "$11٬000",
          "documentPriceUsd": 11000
        }
      ]
    },
    {
      "id": "gigabyte-g293-s42",
      "maker": "Gigabyte",
      "model": "G293-S42",
      "cpu": "2 x Xeon Gen3",
      "memorySlotsOrCapacity": "24",
      "network": "2 x 10G",
      "powerSupplies": "2 x 3000",
      "height": "2U",
      "heightU": 2.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.gigabyte.com/Enterprise/GPU-Server/G293-S42-rev-AAP1",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "بلی",
          "documentPriceRaw": "$11٬380",
          "documentPriceUsd": 11380
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$11٬380",
          "documentPriceUsd": 11380
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$11٬380",
          "documentPriceUsd": 11380
        }
      ]
    },
    {
      "id": "gigabyte-g493-sb0",
      "maker": "Gigabyte",
      "model": "G493-SB0",
      "cpu": "2 x Xeon Gen5",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "4 x 3000",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.gigabyte.com/Enterprise/GPU-Server/G493-SB0-rev-AAP1",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "بلی",
          "documentPriceRaw": "$13٬240",
          "documentPriceUsd": 13240
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$13٬240",
          "documentPriceUsd": 13240
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$13٬240",
          "documentPriceUsd": 13240
        }
      ]
    },
    {
      "id": "gigabyte-g493-sb1",
      "maker": "Gigabyte",
      "model": "G493-SB1",
      "cpu": "2 x Xeon Gen5",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "4 x 3000",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.gigabyte.com/Enterprise/GPU-Server/G493-SB1-rev-AAP1",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 10,
          "maxGpuCountRaw": "10",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "بلی",
          "documentPriceRaw": "$15٬300",
          "documentPriceUsd": 15300
        }
      ]
    },
    {
      "id": "gigabyte-g493-zb0",
      "maker": "Gigabyte",
      "model": "G493-ZB0",
      "cpu": "2 x EPYC 9004",
      "memorySlotsOrCapacity": "24",
      "network": "2 x 10G",
      "powerSupplies": "4 x 3000",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.gigabyte.com/Enterprise/GPU-Server/G493-ZB0-rev-AAP1",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "بلی",
          "documentPriceRaw": "$15٬300",
          "documentPriceUsd": 15300
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$15٬300",
          "documentPriceUsd": 15300
        }
      ]
    },
    {
      "id": "asrock-4u10g-rome2-2t",
      "maker": "ASRock",
      "model": "4U10G-ROME2/2T",
      "cpu": "2 x EPYC 7003",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "4 x 1600",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.asrockrack.com/general/productdetail.asp?model=4U10G-ROME2/2T",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 10,
          "maxGpuCountRaw": "10",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "$8٬400",
          "documentPriceUsd": 8400
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 4,
          "maxGpuCountRaw": "4",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$8٬400",
          "documentPriceUsd": 8400
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 4,
          "maxGpuCountRaw": "4",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$8٬400",
          "documentPriceUsd": 8400
        }
      ]
    },
    {
      "id": "supermicro-4125gs-tnrt",
      "maker": "Supermicro",
      "model": "4125GS-TNRT",
      "cpu": "2 x EPYC 9004",
      "memorySlotsOrCapacity": "24",
      "network": "2 x 10G",
      "powerSupplies": "4 x 2000",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.supermicro.com/en/products/system/gpu/4u/as-4125gs-tnrt",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "بلی",
          "documentPriceRaw": "$12٬000",
          "documentPriceUsd": 12000
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$12٬000",
          "documentPriceUsd": 12000
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 3,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$12٬000",
          "documentPriceUsd": 12000
        }
      ]
    },
    {
      "id": "supermicro-4125gs-tnrt1",
      "maker": "Supermicro",
      "model": "4125GS-TNRT1",
      "cpu": "2 x EPYC 9004",
      "memorySlotsOrCapacity": "12",
      "network": "2 x 10G",
      "powerSupplies": "4 x 2000",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.supermicro.com/en/products/system/gpu/4u/as-4125gs-tnrt1",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 10,
          "maxGpuCountRaw": "10",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "بلی",
          "documentPriceRaw": "$13٬000",
          "documentPriceUsd": 13000
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$13٬000",
          "documentPriceUsd": 13000
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$13٬000",
          "documentPriceUsd": 13000
        }
      ]
    },
    {
      "id": "supermicro-4125gs-tnrt2",
      "maker": "Supermicro",
      "model": "4125GS-TNRT2",
      "cpu": "2 x EPYC 9004",
      "memorySlotsOrCapacity": "24",
      "network": "2 x 10G",
      "powerSupplies": "4 x 2000",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.supermicro.com/en/products/system/gpu/4u/as-4125gs-tnrt2",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 10,
          "maxGpuCountRaw": "10",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "بلی",
          "documentPriceRaw": "$14٬000",
          "documentPriceUsd": 14000
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$14٬000",
          "documentPriceUsd": 14000
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$14٬000",
          "documentPriceUsd": 14000
        }
      ]
    },
    {
      "id": "supermicro-521ge-tnrt",
      "maker": "Supermicro",
      "model": "521GE-TNRT",
      "cpu": "2 x Xeon Gen5",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "4 x 3000",
      "height": "5U",
      "heightU": 5.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.supermicro.com/en/products/system/gpu/5u/sys-521ge-tnrt",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 10,
          "maxGpuCountRaw": "10",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "$27٬000",
          "documentPriceUsd": 27000
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$27٬000",
          "documentPriceUsd": 27000
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$27٬000",
          "documentPriceUsd": 27000
        }
      ]
    },
    {
      "id": "supermicro-421ge-tnrt",
      "maker": "Supermicro",
      "model": "421GE-TNRT",
      "cpu": "2 x Xeon Gen5",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "4 x 2700",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.supermicro.com/en/products/system/gpu/4u/sys-421ge-tnrt",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 10,
          "maxGpuCountRaw": "10",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "بلی",
          "documentPriceRaw": "$12٬000",
          "documentPriceUsd": 12000
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$12٬000",
          "documentPriceUsd": 12000
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$12٬000",
          "documentPriceUsd": 12000
        }
      ]
    },
    {
      "id": "supermicro-421ge-tnrt3",
      "maker": "Supermicro",
      "model": "421GE-TNRT3",
      "cpu": "2 x Xeon Gen5",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "4 x 2700",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.supermicro.com/en/products/system/gpu/4u/sys-421ge-tnrt3",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "نامعلوم",
          "documentPriceUsd": null
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "نامعلوم",
          "documentPriceUsd": null
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 3,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$0",
          "documentPriceUsd": null
        }
      ]
    },
    {
      "id": "supermicro-420gp-tnr",
      "maker": "Supermicro",
      "model": "420GP-TNR",
      "cpu": "2 x Xeon Gen3",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 1G",
      "powerSupplies": "4 x 2000",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.supermicro.com/en/products/system/gpu/4u/sys-420gp-tnr",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 10,
          "maxGpuCountRaw": "10",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "$12٬000",
          "documentPriceUsd": 12000
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 4,
          "maxGpuCountRaw": "4",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$12٬000",
          "documentPriceUsd": 12000
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 4,
          "maxGpuCountRaw": "4",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$12٬000",
          "documentPriceUsd": 12000
        }
      ]
    },
    {
      "id": "supermicro-4124gs-tnr",
      "maker": "Supermicro",
      "model": "4124GS-TNR",
      "cpu": "2 x EPYC 7003",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 1G",
      "powerSupplies": "4 x 2000",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.supermicro.com/Aplus/system/4U/4124/AS-4124GS-TNR.cfm",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "$8٬400",
          "documentPriceUsd": 8400
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 4,
          "maxGpuCountRaw": "4",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$8٬400",
          "documentPriceUsd": 8400
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 4,
          "maxGpuCountRaw": "4",
          "pcieGeneration": 3,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$8٬400",
          "documentPriceUsd": 8400
        }
      ]
    },
    {
      "id": "supermicro-4124gs-tnr-plus",
      "maker": "Supermicro",
      "model": "4124GS-TNR+",
      "cpu": "2 x EPYC 7003",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 1G",
      "powerSupplies": "4 x 2000",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.supermicro.com/Aplus/system/4U/4124/AS-4124GS-TNR.cfm",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "$9٬100",
          "documentPriceUsd": 9100
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 4,
          "maxGpuCountRaw": "4",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$9٬100",
          "documentPriceUsd": 9100
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 4,
          "maxGpuCountRaw": "4",
          "pcieGeneration": 3,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$9٬100",
          "documentPriceUsd": 9100
        }
      ]
    },
    {
      "id": "thinkmate-qh24-24e4",
      "maker": "Thinkmate",
      "model": "QH24-24E4",
      "cpu": "2 x EPYC 9004",
      "memorySlotsOrCapacity": "24",
      "network": "2 x 10G",
      "powerSupplies": "4 x 2000",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.thinkmate.com/system/gpx-qh24-24e4-8gpu",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "بلی",
          "documentPriceRaw": "$16٬500",
          "documentPriceUsd": 16500
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$16٬500",
          "documentPriceUsd": 16500
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$16٬500",
          "documentPriceUsd": 16500
        }
      ]
    },
    {
      "id": "thinkmate-xh8-22s4",
      "maker": "Thinkmate",
      "model": "XH8-22S4",
      "cpu": "2 x Xeon Gen4",
      "memorySlotsOrCapacity": "24",
      "network": "2 x 10G",
      "powerSupplies": "2 x 3000",
      "height": "2U",
      "heightU": 2.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.thinkmate.com/system/gpx-xh8-22s4-8gpu",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "بلی",
          "documentPriceRaw": "$11٬500",
          "documentPriceUsd": 11500
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$11٬500",
          "documentPriceUsd": 11500
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$11٬500",
          "documentPriceUsd": 11500
        }
      ]
    },
    {
      "id": "thinkmate-xs12-24s3-8",
      "maker": "Thinkmate",
      "model": "XS12-24S3-8",
      "cpu": "2 x Xeon Gen4",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "3 x 2200",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.thinkmate.com/system/gpx-xs12-24s3-8gpu",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "$9٬900",
          "documentPriceUsd": 9900
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$9٬900",
          "documentPriceUsd": 9900
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$9٬900",
          "documentPriceUsd": 9900
        }
      ]
    },
    {
      "id": "thinkmate-xs12-24s3-10",
      "maker": "Thinkmate",
      "model": "XS12-24S3-10",
      "cpu": "2 x Xeon Gen4",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "3 x 2200",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.thinkmate.com/system/gpx-xs12-24s3-10gpu",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 10,
          "maxGpuCountRaw": "10",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "$11٬000",
          "documentPriceUsd": 11000
        }
      ]
    },
    {
      "id": "thinkmate-qt8-22e2",
      "maker": "Thinkmate",
      "model": "QT8-22E2",
      "cpu": "2 x EPYC 7003",
      "memorySlotsOrCapacity": "16",
      "network": "2 x 10G",
      "powerSupplies": "2 x 2200",
      "height": "2U",
      "heightU": 2.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.thinkmate.com/system/gpx-qt8-22e2-8gpu",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "$7٬000",
          "documentPriceUsd": 7000
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$7٬000",
          "documentPriceUsd": 7000
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$7٬000",
          "documentPriceUsd": 7000
        }
      ]
    },
    {
      "id": "thinkmate-qt8-24e2",
      "maker": "Thinkmate",
      "model": "QT8-24E2",
      "cpu": "2 x EPYC 7003",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "2 x 2200",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.thinkmate.com/system/gpx-qt8-24e2-8gpu",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "$8٬500",
          "documentPriceUsd": 8500
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$8٬500",
          "documentPriceUsd": 8500
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$8٬500",
          "documentPriceUsd": 8500
        }
      ]
    },
    {
      "id": "thinkmate-xn6-24s3-10",
      "maker": "Thinkmate",
      "model": "XN6-24S3-10",
      "cpu": "2 x Xeon Gen4",
      "memorySlotsOrCapacity": "32",
      "network": "2 x 10G",
      "powerSupplies": "4 x 2000",
      "height": "4U",
      "heightU": 4.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.thinkmate.com/system/gpx-xn6-24s3-10gpu",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 10,
          "maxGpuCountRaw": "10",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "$12٬000",
          "documentPriceUsd": 12000
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$12٬000",
          "documentPriceUsd": 12000
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "دارد",
          "documentPriceRaw": "$12٬000",
          "documentPriceUsd": 12000
        }
      ]
    },
    {
      "id": "thinkmate-qh8-22e4",
      "maker": "Thinkmate",
      "model": "QH8-22E4",
      "cpu": "2 x EPYC 9004",
      "memorySlotsOrCapacity": "24",
      "network": "2 x 10G",
      "powerSupplies": "2 x 3000",
      "height": "2U",
      "heightU": 2.0,
      "otherFeatures": null,
      "sourceUrl": "https://www.thinkmate.com/system/gpx-qh8-22e4-8gpu",
      "sourceBasis": "استخراج عین جدول‌های سند TPD-DMV-GEN-001.v1؛ مشخصات و قیمت نیازمند بازبینی روز هستند",
      "compatibility": [
        {
          "categoryId": "industrial-pcie",
          "categoryLabel": "کارت صنعتی PCIe",
          "maxGpuCount": 8,
          "maxGpuCountRaw": "8",
          "pcieGeneration": 5,
          "compatibilityFlagRaw": "خیر",
          "documentPriceRaw": "$12٬300",
          "documentPriceUsd": 12300
        },
        {
          "categoryId": "consumer-dual-slot",
          "categoryLabel": "کارت عمومی دو اسلات",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$12٬300",
          "documentPriceUsd": 12300
        },
        {
          "categoryId": "rtx4090-5090",
          "categoryLabel": "RTX 4090 / RTX 5090",
          "maxGpuCount": 5,
          "maxGpuCountRaw": "5",
          "pcieGeneration": 4,
          "compatibilityFlagRaw": "ندارد",
          "documentPriceRaw": "$12٬300",
          "documentPriceUsd": 12300
        }
      ]
    }
  ]
};

export default serverData;
