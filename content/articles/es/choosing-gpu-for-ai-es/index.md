---
title: "Elegir una GPU para IA: rendimiento, coste y carga de trabajo real"
slug: choosing-gpu-for-ai-es
lang: es
date: 2025-05-19
faDate: "19 de mayo de 2025"
draft: false
category: Infraestructura de IA
excerpt: "Comparar el rendimiento útil con el coste completo del despliegue: memoria, software, servidor anfitrión y forma de utilizar el servicio."
readTime: "6 min"
cover: "/images/articles/choosing-gpu-for-ai/cover.png"
related: ["gpu-types-for-ai-es", "int8-or-fp8-real-gpu-support-es", "pcie-gpu-server-selection-es"]
---

Cuando se elaboró la primera versión de esta guía, las RTX 6000 Ada, A100 y H100 eran opciones destacadas para infraestructuras de aprendizaje profundo. H200 y Blackwell han ampliado desde entonces las alternativas. El criterio de decisión sigue siendo el mismo: una GPU más reciente o potente compensa únicamente si la carga de trabajo prevista puede aprovechar lo que ofrece.

Comprar un acelerador de gama alta sin evaluar la aplicación suele provocar tres problemas:

- La GPU y la plataforma de servidor que necesita pueden costar mucho más de lo que justifica su rendimiento útil.
- Las tareas pequeñas o poco paralelizadas pueden dejar inactiva gran parte de la capacidad de cálculo.
- El software diseñado para una sola GPU puede necesitar cambios importantes antes de beneficiarse de un sistema con varias GPU.

Por eso, para un equipo de desarrollo con presupuesto limitado, un servicio de inferencia o una instalación de investigación compartida, las [tarjetas de consumo y de estación de trabajo](/es/articles/gpu-types-for-ai-es/) deben figurar entre las candidatas junto con los aceleradores de centro de datos. La cuestión es cuánta capacidad utilizable proporciona la inversión completa.

### Qué enseñan las pruebas históricas

El siguiente gráfico procede del [análisis de GPU para aprendizaje profundo publicado por Tim Dettmers en 2023](https://timdettmers.com/2023/01/30/which-gpu-for-deep-learning/). Con las cargas y los precios considerados, tarjetas como la RTX 4090 ofrecían una relación atractiva entre rendimiento y coste frente a la A100. Los resultados ilustran un método de comparación; no son precios actuales ni una clasificación válida para todos los modelos.

<figure>
  <img src="/images/articles/choosing-gpu-for-ai/100000010000063C000005D17A54F86E.png" alt="Comparación histórica de 2023 del rendimiento relativo de entrenamiento e inferencia por dólar estadounidense entre distintas GPU" loading="lazy" />
  <figcaption>Rendimiento por coste histórico, según el análisis de Tim Dettmers. Debe recalcularse con el hardware, el software y los precios disponibles para el despliegue propuesto.</figcaption>
</figure>

Las siguientes capturas de las [pruebas de TensorDock](https://www.tensordock.com/benchmarks.html) muestran la misma idea para cargas concretas de modelos de lenguaje. Una tarjeta económica puede obtener buenos resultados en una prueba, mientras que otra carga cambia el orden. Son capturas conservadas del artículo original: los precios de alquiler, los controladores y los motores de ejecución han cambiado desde que se obtuvieron.

<figure>
  <img src="/images/articles/choosing-gpu-for-ai/10000001000004620000024FADFE4917.png" alt="Comparación histórica de TensorDock del rendimiento de inferencia de Mistral 7B por dólar" loading="lazy" />
  <figcaption>Inferencia de Mistral 7B: comparación histórica del rendimiento por dólar.</figcaption>
</figure>

<figure>
  <img src="/images/articles/choosing-gpu-for-ai/10000001000004620000024F5C538DDA.png" alt="Comparación histórica de TensorDock del rendimiento de inferencia de OPT-125M por dólar" loading="lazy" />
  <figcaption>Inferencia de OPT-125M: al cambiar el modelo, cambian los resultados relativos.</figcaption>
</figure>

<figure>
  <img src="/images/articles/choosing-gpu-for-ai/100000010000046200000249EA59A2F7.png" alt="Comparación histórica de TensorDock de la latencia por lote y el coste del entrenamiento de Mistral 7B en FP16; los valores menores son preferibles" loading="lazy" />
  <figcaption>Entrenamiento de Mistral 7B: la métrica representa la latencia por lote en relación con el coste, y los valores menores son preferibles. No debe interpretarse como otro gráfico de rendimiento de inferencia.</figcaption>
</figure>

El entrenamiento y la inferencia exigen cosas distintas al hardware. En inferencia suele importar si caben los pesos y la caché KV, cuántas solicitudes se pueden atender a la vez y cuánto tarda cada usuario en recibir una respuesta. El entrenamiento necesita además gradientes, activaciones y estados del optimizador. El entrenamiento distribuido añade comunicación recurrente entre GPU.

Por tanto, un resultado de inferencia no se puede trasladar al entrenamiento. Incluso dentro de cada categoría, el tamaño del modelo, el tamaño de lote, la precisión numérica y la memoria disponible pueden cambiar el resultado. La diferencia entre un formato que figura en una ficha técnica y el que realmente utiliza el motor de ejecución se explica en [INT8 o FP8: soporte real de la GPU](/es/articles/int8-or-fp8-real-gpu-support-es/).

### Comparar el despliegue completo

NVIDIA ofrece algunas tarjetas de consumo como diseños de referencia, mientras que fabricantes asociados como ASUS, MSI y Gigabyte comercializan sus propias versiones. El precio refleja algo más que el procesador: pueden variar el disipador, las dimensiones, la alimentación, el ruido y otras características. Una función útil en un ordenador para videojuegos puede aportar poco a una máquina dedicada a IA.

La calidad de construcción, el precio y los requisitos de integración merecen más atención que los elementos decorativos. Muchas variantes de RTX 4090 son demasiado grandes o tienen un flujo de aire inadecuado para un despliegue denso en servidores. Incluso una tarjeta compacta o con ventilador de turbina debe comprobarse por su número de pieza exacto. La denominación comercial de un distribuidor no sustituye a una especificación oficial ni a una configuración admitida por el fabricante del servidor. La [selección de servidores para GPU PCIe](/es/articles/pcie-gpu-server-selection-es/) detalla las comprobaciones mecánicas, térmicas y eléctricas.

El coste debe incluir el servidor anfitrión, la refrigeración, la alimentación, la preparación del software y la utilización prevista. Una GPU barata que exige mucho trabajo de integración puede salir cara al operarla. A la inversa, un sistema integrado costoso puede aportar poco si cada trabajo se ejecuta de forma independiente en una tarjeta.

### Un conjunto reducido y deliberado de configuraciones

Un servicio de cómputo compartido no necesita necesariamente un único modelo de GPU para todos sus clientes. Un conjunto limitado de configuraciones puede atender distintas necesidades de memoria y rendimiento sin complicar demasiado la operación. Conviene estandarizar donde se reduzca el trabajo de soporte e introducir otro tipo de tarjeta cuando una carga diferenciada lo justifique.

Las comparaciones de rendimiento por coste tienen una larga historia. Por ejemplo, la [comparación de Lambda entre RTX 2080 Ti, V100 y otras GPU de la época](https://lambda.ai/blog/best-gpu-tensorflow-2080-ti-vs-v100-vs-titan-v-vs-1080-ti-benchmark) dividía el rendimiento por el coste total del sistema. Las cifras son históricas, pero el método sigue siendo útil.

Para una compra actual, hay que ejecutar el modelo previsto con sus longitudes de entrada, tamaños de lote y objetivos de servicio reales. Después se compara el coste de la capacidad que supera esas pruebas. La tarjeta más potente sobre el papel puede ser la elección correcta, pero debe demostrarlo con la carga de trabajo.
