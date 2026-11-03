---
title: "Más allá de la GPU: CPU, memoria, almacenamiento y red"
slug: gpu-server-platform-components-es
lang: es
date: 2025-05-19
faDate: "19 de mayo de 2025"
draft: false
category: Infraestructura de IA
excerpt: "Dimensionar el resto del servidor según la preparación de datos, el uso de memoria, el tráfico de almacenamiento y el patrón de comunicación de la aplicación."
readTime: "6 min"
cover: "/images/articles/gpu-server-platform-components/cover.png"
related: ["pcie-gpu-server-selection-es", "dgx-and-standard-gpu-servers-es", "choosing-gpu-for-ai-es"]
---

Un servidor con varias GPU puede acelerar un trabajo paralelo o ejecutar varias tareas independientes a la vez. El segundo uso resulta valioso incluso cuando la aplicación no puede distribuir una tarea entre GPU: los usuarios pueden compartir chasis, alimentación y espacio de rack. En ambos casos, la plataforma anfitriona debe suministrar datos y servicios con suficiente rapidez para aprovechar los aceleradores.

Este artículo trata la CPU, la memoria del sistema, el almacenamiento y la red. Para instalar físicamente tarjetas concretas, consulte la [guía de selección de servidores PCIe](/es/articles/pcie-gpu-server-selection-es/).

### Capacidad y topología de CPU

Aunque las GPU realizan gran parte del cálculo en muchas cargas de IA, las CPU siguen preparando los datos, planificando las tareas y recogiendo los resultados. La tokenización, la decodificación, el aumento de datos y determinadas etapas de recuperación de información pueden consumir bastante tiempo de CPU. Algunas tareas que no necesitan GPU pueden ejecutarse en servidores convencionales, reservando los aceleradores para el trabajo que sí se beneficia de ellos.

No existe una marca de CPU ni una frecuencia mínima universal para un servidor de GPU. En una configuración con varios aceleradores, el número de líneas PCIe, la conexión de las ranuras a cada CPU, los canales de memoria y su ancho de banda pueden importar más que el número nominal de núcleos. El procesador también debe ser compatible con la configuración de chasis elegida.

La topología NUMA requiere especial atención en un servidor de dos zócalos. Una GPU, el proceso que carga sus datos y su tarjeta de red pueden estar conectados a CPU distintas. Los recorridos de tráfico resultantes afectan al rendimiento incluso cuando las especificaciones principales parecen suficientes. La topología propuesta debe evaluarse con la aplicación, sin tratar la CPU como una compra aislada.

### Memoria del sistema

La RAM necesaria depende de cómo utiliza la aplicación el equipo anfitrión. Una carga de inferencia bien optimizada puede mantener el modelo y el conjunto activo de datos en la GPU y necesitar relativamente poca memoria del sistema. Los cargadores de datos, las cachés, el preprocesamiento, la descarga de trabajo a CPU y los usuarios concurrentes pueden cambiar mucho ese requisito.

Una proporción fija entre RAM del sistema y memoria total de las GPU es solo una aproximación de planificación. No sustituye a las mediciones. Son más útiles la cantidad de datos retenidos en memoria, el número de procesos de trabajo y el comportamiento de las asignaciones de memoria de la aplicación.

En un despliegue que examiné, un equipo utilizaba más de un terabyte de memoria del sistema y concluyó que debía ampliar el servidor. La depuración redujo la necesidad a unos 64 GB. Esto no es una recomendación de dimensionamiento para otras cargas: muestra cómo un fallo de software puede parecer una falta de hardware. Conviene analizar el uso de memoria antes de convertir cada agotamiento de RAM en una solicitud de compra.

### Tres funciones del almacenamiento

Separar tres funciones ayuda a diseñar el almacenamiento:

- **Sistema operativo y herramientas esenciales.** Dimensionar estos discos para el sistema operativo, los controladores y el software de gestión. Utilizar dispositivos fiables y definir el procedimiento de recuperación. La duplicación en espejo puede mejorar la disponibilidad, pero el diseño adecuado depende de cuánto tiempo puede tardar la máquina en volver al servicio.
- **Contenedores, registros, cachés y espacio temporal.** La capacidad y el rendimiento de entrada/salida dependen de la carga y de su patrón de lectura y escritura. Hay que elegir la disposición de unidades y el esquema RAID considerando la tolerancia a fallos y el tiempo de reconstrucción; ni un número fijo de discos ni un nivel concreto de RAID constituyen una configuración universal para IA.
- **Modelos, conjuntos de datos y puntos de control.** Pueden ser locales o compartidos. La capacidad se calcula a partir del volumen de datos, su crecimiento, las versiones conservadas y la política de retención. Los datos o puntos de control que no se pueden reproducir necesitan redundancia adecuada y una copia de seguridad independiente.

El almacenamiento compartido también impone requisitos a la red. Un SSD local de gran capacidad no resuelve un cuello de botella provocado por leer repetidamente datos de entrenamiento desde un servicio compartido saturado. Hay que medir el recorrido completo durante el arranque, la ejecución sostenida y la escritura de puntos de control.

### Separar las funciones de la red

Los trabajos independientes pueden exigir poco a la red de cómputo, aunque el acceso a datos siga siendo intenso. En una tarea distribuida entre varios servidores, la red pasa a formar parte del propio cálculo.

Al diseñar el sistema conviene distinguir tres funciones:

- **Gestión fuera de banda.** Separar el acceso de gestión del tráfico de las aplicaciones, con una red dedicada cuando lo exija el modelo operativo. Dimensionarla para las herramientas de administración y los procedimientos de recuperación.
- **Acceso de usuarios y servicios.** Diseñarlo según las transferencias de datos, la política de seguridad y la ubicación de clientes y conjuntos de datos. No tiene por qué compartir la red de gestión ni la de cómputo.
- **Comunicación entre nodos de cómputo.** Fijar objetivos de ancho de banda y latencia según la estrategia de paralelismo, el número de GPU, las operaciones colectivas y el uso de RDMA o GPUDirect. Una velocidad Ethernet conocida no basta para determinar su idoneidad.

La [documentación de NCCL](https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/overview.html) de NVIDIA describe la comunicación entre GPU dentro de un nodo y entre nodos mediante PCIe, NVLink, InfiniBand y redes IP. Que una biblioteca pueda utilizar esos transportes no demuestra cuánto escalará una aplicación concreta. Hay que probar el código y la configuración previstos.

En los [sistemas HGX/DGX H100 y H200](/es/articles/dgx-and-standard-gpu-servers-es/), NVSwitch conecta las GPU dentro del servidor. No sustituye a la red entre servidores. La [arquitectura de referencia DGX SuperPOD](https://docs.nvidia.com/dgx-superpod/reference-architecture-scalable-infrastructure-h100/latest/dgx-superpod-architecture.html) especifica por separado los nodos de cómputo, las redes, la gestión y el almacenamiento. Por ello, el ancho de banda interno de NVLink nunca debe figurar en una solicitud de compra como si fuera el disponible entre dos servidores.

Una plataforma equilibrada es aquella cuyos componentes sostienen juntos la carga prevista. Conviene comenzar con una ejecución representativa, identificar dónde esperan las GPU y dimensionar la CPU, la memoria, el almacenamiento y la red para reducir esas esperas. El [artículo sobre selección de GPU](/es/articles/choosing-gpu-for-ai-es/) aplica el mismo razonamiento al acelerador.
