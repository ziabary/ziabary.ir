---
title: "Cuando un OTP por SMS reduce la seguridad"
slug: cuando-un-otp-por-sms-reduce-la-seguridad
lang: es
date: 2019-12-17
faDate: "17 de diciembre de 2019"
category: "Seguridad · Arquitectura"
excerpt: "Un código de un solo uso no es automáticamente un segundo factor. El despliegue bancario iraní de 2019 deja una lección duradera: sustituir conocimiento por posesión puede reducir la seguridad."
readTime: "9 min de lectura"
cover: "/images/articles/dynamic-password-fraud/cover.jpg"
external: "https://virgool.io/targoman/%DA%A9%D9%84%D8%A7%D9%87%D8%A8%D8%B1%D8%AF%D8%A7%D8%B1%DB%8C-%D8%A8%D8%A7-%D8%B1%D9%85%D8%B2-%D9%BE%D9%88%DB%8C%D8%A7-%D8%AF%D8%B1-%D8%AF%D9%88-%DA%AF%D8%A7%D9%85-xogucr6uuatn"
source: "Virgool (original en persa)"
related:
  - construir-targoman-sin-padrinos
draft: false
---

> **Contexto.** Escribí este artículo durante la implantación obligatoria de contraseñas de un solo uso para pagos con tarjeta en Irán, en 2019. Los detalles bancarios son locales e históricos; el error de diseño de seguridad no lo es.

A finales de 2019, los bancos iraníes comenzaron a sustituir la «segunda contraseña» estática utilizada en compras por internet por un código de corta duración enviado por SMS. La medida se presentó como respuesta al fraude por phishing. Después de activarla en varios bancos, sin embargo, vi que se había creado una nueva vía de fraude sorprendentemente fluida.

El problema no era que las contraseñas de un solo uso fueran inseguras por naturaleza. La implementación eliminó un secreto que el cliente **sabía** y lo sustituyó por acceso a un dispositivo que el cliente **tenía**. Eso no es autenticación de dos factores: es cambiar un factor por otro. Para ciertos usuarios y modelos de amenaza, además, el nuevo factor era más débil.

El título provocador del original persa hablaba de «fraude en dos pasos». Era una advertencia, no un manual. Esas rutas existían tanto si se describían como si no. Ocultar el modelo de amenaza protege el diseño defectuoso, no a las personas expuestas.

<figure>
<img src="/images/articles/dynamic-password-fraud/cover.jpg" alt="Ilustración del artículo original sobre contraseñas de un solo uso por SMS" />
<figcaption>El artículo original apareció antes del despliegue nacional</figcaption>
</figure>

## Primer paso: obtener los datos de la tarjeta

El flujo de uno de los grandes bancos era representativo:

1. Iniciar una compra por internet.
2. Introducir número de tarjeta, CVV2 y fecha de caducidad en la pasarela.
3. Enviar por SMS al banco los últimos cuatro dígitos de la tarjeta.
4. Recibir el código de pago y escribirlo en la pasarela.

Solo el código recibido por SMS se consideraba secreto. El resto estaba impreso en la tarjeta y podía obtenerse de formas corrientes:

- La víctima envía una fotografía después de que alguien, mediante ingeniería social, afirme necesitarla para realizar una transferencia.
- Un comerciante o empleado manipula brevemente la tarjeta en el terminal y registra sus datos visibles.
- Un familiar, amigo o compañero con acceso físico fotografía o copia la tarjeta.
- Una página de phishing recoge precisamente la información que el programa OTP pretendía proteger.

Ninguna de estas vías es exótica. La arquitectura de seguridad debe partir de comportamientos plausibles y accesos cotidianos, no de un usuario ideal que jamás presta una tarjeta, nunca confía en una persona conocida y nunca encuentra una interfaz convincente.

## Segundo paso: obtener el teléfono

Antes del cambio, quien tuviera los datos visibles de la tarjeta todavía necesitaba una contraseña memorizada. Con el diseño basado solo en SMS, el requisito restante era acceder temporalmente al teléfono registrado.

El acceso físico siempre ha sido una frontera de seguridad. Cuando forma parte del modelo de amenaza, no basta con suponer que todos los dispositivos están bloqueados y todos sus dueños permanecen atentos.

Varios grupos podían obtener ese acceso de manera plausible:

- **Familiares, amigos y compañeros.** Confiamos el teléfono a las personas conocidas precisamente porque las conocemos. Los usuarios que dependen del SMS en lugar de una aplicación bancaria también pueden ser menos propensos a configurar un bloqueo fuerte. Uno o dos minutos sin vigilancia pueden bastar.
- **Tiendas y servicios de reparación.** El dispositivo se entrega desbloqueado —o acompañado del código— para instalar, transferir datos o reparar. Un empleado malicioso puede consultar mensajes y quizá tenga otra ocasión de ver la tarjeta.
- **Ladrones.** Una cartera y un móvil robados ya no son solamente dos objetos con valor de reventa. Juntos pueden convertirse en acceso a la cuenta antes de que la víctima comunique la pérdida.
- **Personas con acceso privilegiado.** Algunos trabajadores tienen acceso profesional a paneles de SMS, procesos de duplicado de SIM o infraestructura relacionada. La mayoría son honestos; el modelo de amenaza debe incluir a los pocos que no lo son.

La cuestión no es que estos ataques sean inevitables ni dominantes. La cuestión es que la arquitectura convirtió la posesión de dos objetos que solemos llevar juntos —cartera y teléfono— en la ruta completa hacia el pago.

## Un código de un solo uso no es automáticamente un segundo factor

Algunos lectores respondieron que criticar el OTP por SMS era como declarar insegura una cerradura porque pueden robar la llave: el usuario debe protegerla. Otros preguntaron qué alternativa podía servir a quienes no tenían smartphone o internet móvil.

Ambas objeciones pasan por alto el cambio arquitectónico. El propósito declarado del programa era proteger a quienes ya eran vulnerables al phishing. Un diseño para esa población no puede presuponer los hábitos de seguridad cuya ausencia originó el problema.

Como mínimo, la implantación debía conservar una auténtica autenticación de dos factores: algo que el cliente sabe **y** algo que posee. En su lugar, se eliminó el secreto estático y la posesión del teléfono pasó a ser suficiente.

Si una aplicación se consideraba inviable, incluso un flujo de reto y respuesta por un canal separado podía mantener el factor de conocimiento. Por ejemplo, el usuario podía solicitar el OTP mediante USSD usando un código privado, en lugar de enviar los cuatro dígitos visibles de la tarjeta. El mecanismo exacto es discutible; el principio es conservar dos factores independientes.

La diferencia se entiende mejor con una caja fuerte. Algunas se abren con una combinación, otras con una llave y las más seguras exigen ambas. La implementación de 2019 se presentó como si una caja de combinación fija hubiera sido mejorada con una combinación variable. En realidad, la nueva combinación la generaba un objeto que podía desaparecer junto con la cartera. El sistema se acercó a una caja que solo requiere llave, no a una que exige llave y combinación.

Imprimir los datos de la tarjeta en la propia tarjeta y llamarlos secretos no arregla nada. Equivale a dejar la combinación de la caja bajo el cristal de la mesa que está a su lado y colocar un cartel: «La combinación está aquí, pero también tiene que sacar la llave de mi bolsillo».

## La lección general

Los controles de seguridad deben evaluarse como sistemas, no como nombres de funciones. «Contraseña dinámica», «OTP» y «2FA» suenan tranquilizadores, pero no explican quién puede hacer qué en condiciones reales.

Antes de sustituir un flujo de autenticación conviene preguntar:

- ¿Qué factor se añade y cuál se elimina?
- ¿Los factores supuestamente independientes suelen transportarse juntos?
- ¿A qué usuarios pretende proteger la política y qué comportamiento cabe esperar de ellos?
- ¿Qué sucede después de acceso físico, reparación, cambio de SIM o robo?
- ¿El cambio reduce la superficie de ataque o solo la desplaza a un lugar menos visible?

Una caducidad breve puede reducir la reutilización de un código. No puede convertir posesión en conocimiento, hacer independientes dos objetos correlacionados ni compensar un modelo de amenaza que excluye a las mismas personas para las que se diseñó el sistema.

