---
title: "IA de confianza cero: principios y controles prácticos"
slug: zero-trust-ai-principles-and-controls-es
lang: es
date: 2025-05-13
faDate: "13 de mayo de 2025"
category: Seguridad
cover: "/images/articles/zero-trust-ai-principles-and-controls/cover.png"
excerpt: "Convertir los principios de ZTAI en controles de identidad, datos, modelos, resultados e infraestructura, con límites explícitos sobre lo que demuestra cada control."
readTime: "9 min"
draft: false
related: ["zero-trust-ai-maturity-model-es", "from-zero-trust-to-zero-trust-ai-es", "mlops-foundation-of-zero-trust-ai-es", "ztai-indirect-data-access-es"]
---

El [modelo de madurez de ZTAI](/es/articles/zero-trust-ai-maturity-model-es/) describe cómo avanzar hacia un ciclo de vida de IA controlado. Esa progresión necesita controles concretos: qué se verifica, qué acción se autoriza, dónde se aplica una decisión y qué ocurre cuando dejan de cumplirse las condiciones exigidas.

La IA de confianza cero, tal como se desarrolla en esta colección, aplica la confianza cero a los datos, modelos y flujos de trabajo de IA. Los principios siguientes deben interpretarse frente a un modelo de amenazas explícito. Un control que limita a un desarrollador no limita necesariamente al administrador de infraestructura, y verificar el origen de un artefacto no demuestra que su comportamiento sea seguro.

## Verificar explícitamente y reevaluar el acceso

Cada solicitud de uso de datos, modelos o recursos de cómputo debe vincularse con una identidad verificada y una finalidad autorizada. No basta con estar dentro de la red, pertenecer al equipo de desarrollo o ejecutarse como servicio interno.

La verificación continúa durante todo el ciclo de vida. Los datos cambian, los modelos se sustituyen, las dependencias evolucionan y el comportamiento de usuarios y cargas de trabajo puede variar. Una decisión tomada al crear una cuenta no puede servir de aprobación permanente para todos sus usos posteriores.

La identidad del solicitante es solo una parte de la decisión. El contexto pertinente puede incluir los datos, la operación, la versión del software, el entorno de ejecución, el destino del resultado y la duración del acceso. Un entrenamiento autorizado para ciertos datos y una ubicación de salida no debería heredar permiso para procesar otros datos o escribir resultados donde quiera.

## Conceder solo el acceso necesario para la tarea

El mínimo privilegio se aplica a personas, servicios, trabajos de entrenamiento y cargas de inferencia. Los roles son un punto de partida, pero la decisión también puede depender de atributos como la sensibilidad de los datos, el riesgo actual y la operación solicitada.

Un científico de datos no necesita necesariamente acceso irrestricto a cada registro original. Los esquemas, las distribuciones, las estadísticas aprobadas y las muestras de desarrollo seleccionadas con cuidado pueden permitir una parte importante del trabajo. Los desarrolladores pueden definir el preprocesamiento y los parámetros de entrenamiento mientras una canalización autorizada realiza el procesamiento sensible en otro entorno.

<figure>
  <img src="/images/articles/zero-trust-ai-maturity-model/maturity-level-4-separated-environments.png" alt="Desarrollo y producción separados para preparar código y experimentos sin acceso rutinario a los datos de producción" />
  <figcaption>Separar el desarrollo del procesamiento sensible reduce la necesidad de acceso directo. Las vías del código, los resultados y la administración siguen necesitando controles propios. Etiquetas en inglés.</figcaption>
</figure>

Esta disposición requiere un proceso de desarrollo utilizable. Si los desarrolladores no pueden inspeccionar un esquema, reproducir un fallo o evaluar un modelo mediante interfaces aprobadas, necesitarán excepciones repetidamente. Las capacidades operativas descritas en [MLOps como base de ZTAI](/es/articles/mlops-foundation-of-zero-trust-ai-es/) ayudan a que el mínimo privilegio sea viable.

El permiso para definir el procesamiento también necesita límites. Quien puede ejecutar código arbitrario sobre datos sensibles y recibir resultados arbitrarios puede reconstruir el acceso que la arquitectura pretendía eliminar. El artículo sobre [acceso indirecto a los datos](/es/articles/ztai-indirect-data-access-es/) examina esta combinación en detalle.

## Suponer que un componente puede verse comprometido

Diseñe para una cuenta comprometida, datos manipulados, una dependencia insegura o un artefacto de modelo malicioso. El sistema necesita contener el efecto, conservar evidencia útil y permitir la recuperación.

Los datos sensibles deben permanecer detrás de interfaces controladas y fronteras de procesamiento explícitas. Ingenieros y administradores no deberían adquirir acceso irrestricto por el carácter operativo de su función. Cuando la arquitectura confíe en un administrador, debe declarar ese supuesto; cuando pretenda excluirlo, la tecnología subyacente debe sostener esa frontera más exigente.

La segmentación limita el alcance de un componente comprometido. Autorizar por separado los cambios de política, la ejecución de trabajos y la publicación de resultados también dificulta que un único rol comprometido elimine sus propias restricciones. Estas protecciones deben sobrevivir a cambios y fallos rutinarios, no aplicarse únicamente al recorrido ideal de un diagrama.

## Revisar los resultados según sus consecuencias

Las respuestas de los modelos necesitan distintos niveles de verificación según su uso. Un resumen interno de consecuencias limitadas puede admitir comprobaciones automáticas ligeras. Una recomendación que influye en una decisión del personal puede necesitar revisión humana. Las decisiones dirigidas a clientes, financieras, clínicas u operativas pueden exigir validación más sólida, trazabilidad y aprobación explícita.

Importa quién actuará a partir del resultado, qué podría salir mal y si la decisión puede revertirse. Los datos de origen, la versión del modelo y el historial de revisión deben estar disponibles con el detalle que requiera ese riesgo.

Una respuesta fluida no demuestra exactitud, y una respuesta exacta puede divulgar información que su destinatario no está autorizado a recibir. La revisión de calidad y los controles de confidencialidad evalúan propiedades relacionadas, pero diferentes.

## Mejorar la revisión mediante retroalimentación

Las decisiones de revisión pueden revelar patrones de fallo recurrentes. Registrarlos ayuda a mejorar pruebas, afinar políticas y reducir tareas manuales repetitivas. Algunas comprobaciones de bajo riesgo podrán automatizarse con el tiempo, mientras los casos difíciles o de mayores consecuencias seguirán sujetos al juicio humano.

La retroalimentación debe entrar en un proceso de mejora controlado. La actuación de un revisor no es automáticamente una etiqueta de entrenamiento fiable, y una corrección en producción no debe modificar silenciosamente un modelo o una política de publicación. Los cambios necesitan evaluación antes de afectar a decisiones posteriores. La automatización debe hacer la revisión más coherente sin convertir un ciclo de retroalimentación sin examinar en otra fuente de errores.

## Proteger los datos durante todo su ciclo de vida

Proteger el almacenamiento y el tráfico de red es necesario, pero la información sensible también puede quedar expuesta durante el procesamiento. El cifrado en reposo y en tránsito responde a amenazas distintas de la protección durante la ejecución. La computación confidencial y los enfoques criptográficos como el cifrado homomórfico tienen capacidades, costes de rendimiento y supuestos de confianza diferentes; la elección debe ajustarse a la carga de trabajo.

El desarrollo y las pruebas deben utilizar datos cuyo riesgo de divulgación haya sido evaluado. El enmascaramiento, la desidentificación y la generación sintética pueden reducir la exposición, pero su eficacia depende de la transformación y de la información conservada. Considerar público cualquier conjunto transformado debilitaría la separación entre desarrollo y producción.

Los registros de procedencia e integridad ayudan a establecer de dónde vienen los datos y si han cambiado. Los artefactos firmados, los hashes y los registros de auditoría protegidos respaldan esa evidencia. No demuestran que la fuente original fuera veraz ni que un conjunto correctamente firmado esté libre de envenenamiento.

La clasificación también debe acompañar a los artefactos derivados. Un resultado debe conservar las restricciones pertinentes de sus entradas, salvo que una decisión controlada de publicación justifique otro tratamiento. Esto incluye estadísticas, representaciones vectoriales, conjuntos sintéticos, puntos de control y modelos, no solo archivos con registros reconocibles.

## Proteger el modelo y su mecanismo de carga

Los artefactos de modelos necesitan control de acceso, verificación de integridad y, cuando corresponda, cifrado. Sus API requieren acceso autenticado y autorizado, además de supervisión de abuso o intentos de extracción. La evaluación debe incluir las condiciones adversarias pertinentes para la aplicación prevista.

El entrenamiento adversario y la limitación del dominio de operación pueden mejorar la robustez frente a amenazas concretas. Ninguno demuestra resistencia a todos los ataques. El sistema debe seguir restringiendo a qué puede acceder el modelo y qué acciones pueden provocar sus resultados.

La incorporación de modelos merece especial atención. Descargar un archivo de pesos también puede introducir una ruta de deserialización insegura, código personalizado o dependencias sin revisar. Un proceso de admisión controlado debe inspeccionar el paquete, restringir su ejecución y aceptar solo los formatos y capacidades necesarios para el despliegue.

Convertir un artefacto a un formato como SafeTensors puede evitar posteriormente la dependencia de una serialización ejecutable, pero la conversión no es segura si primero carga un formato ejecutable no fiable en un entorno privilegiado. La inspección y conversión deben tratarse como procesamiento aislado, con recursos limitados, de entradas no fiables. Un formato de pesos más seguro tampoco demuestra que el comportamiento del modelo sea benigno ni vuelve fiable el código que lo acompaña.

Las técnicas de defensa mediante objetivos móviles, incluidos los cambios destinados a dificultar el sondeo de un modelo, necesitan pruebas de su beneficio y de su efecto sobre la calidad. No deben sustituir a los controles de acceso establecidos ni presentarse como solución general al robo de modelos y los ataques adversarios.

## Proteger la infraestructura y el proceso operativo

Separe los entornos de desarrollo, entrenamiento e inferencia según sus necesidades de acceso y las consecuencias de un compromiso. Supervise la actividad de red, el uso de API y el comportamiento de los modelos para detectar extracción, abuso o servicios de IA no aprobados. Estos registros también pueden contener información sensible y necesitan controles de acceso y conservación.

Utilice autenticación robusta, incluida la autenticación multifactor cuando corresponda para las personas. Los servicios automatizados necesitan identidades de carga de trabajo verificables y credenciales de alcance limitado, preferiblemente con vigencia reducida. Los mecanismos de autenticación humana no sustituyen a una identidad de máquina bien diseñada.

Un motor de políticas como Open Policy Agent permite expresar reglas de autorización y aplicarlas de forma coherente. Su independencia depende de quién puede modificar la política, desplegar el motor u obtener sus credenciales administrativas y de firma. Ejecutarlo como servicio separado no sirve si la carga de procesamiento puede reescribir sus reglas.

El trabajo de seguridad pertenece al proceso de CI/CD: revisión de dependencias, aplicación de parches, análisis estático y dinámico, comprobaciones de artefactos y procedimientos de incidentes ensayados. El modelado de amenazas debe considerar las fronteras entre la organización, los operadores de su plataforma y los proveedores externos. Cada parte necesita una responsabilidad clara sobre los controles que realmente opera.

La supervisión y el análisis de incidentes asistidos por IA pueden ayudar a identificar patrones o priorizar trabajo. Sus recomendaciones siguen necesitando validación y límites de acceso adecuados. Conceder amplios poderes de actuación a un asistente de seguridad crea otra carga de trabajo cuya autoridad hay que gobernar.

Las decisiones de hardware y plataforma también importan. Los [artículos sobre GPU y servidores en español](/es/articles/gpu-server-platform-components-es/) explican por qué el entorno operativo, las interfaces y la configuración admitida de un servidor deben evaluarse junto con sus aceleradores.

## Introducir los controles en una organización existente

Las dificultades no se limitan a elegir herramientas. Los equipos pueden carecer de conocimientos especializados, los sistemas heredados pueden no ofrecer fronteras útiles para aplicar políticas y las prácticas establecidas pueden depender del acceso irrestricto a datos reales. Reconstruir canalizaciones y proporcionar entornos de desarrollo seguros requiere tiempo y dinero.

Una introducción por etapas debe empezar por un flujo concreto y sus vías de acceso de mayores consecuencias. Establezca la evidencia necesaria para entenderlo; después reduzca privilegios amplios, controle las vías de publicación y pruebe cómo se comportan las restricciones durante el mantenimiento. Los sistemas existentes pueden necesitar cambios arquitectónicos antes de que sea realista formular afirmaciones más exigentes.

ZTAI combina de forma continua políticas, ingeniería, operaciones y revisión. Una prueba útil consiste en comprobar si la organización puede explicar una decisión de acceso concreta, mostrar dónde se aplicó y demostrar qué sucede cuando fallan las condiciones requeridas. El último artículo de la [colección](/es/guides/zero-trust-ai/) aplica esa prueba a la difícil afirmación de que [las personas ya no tienen acceso a los datos sensibles](/es/articles/ztai-indirect-data-access-es/).
