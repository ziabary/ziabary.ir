---
title: "Construir Targoman sin padrinos"
slug: construir-targoman-sin-padrinos
lang: es
date: 2019-05-06
faDate: "6 de mayo de 2019"
category: "IA · Experiencia"
excerpt: "Ocho años para convertir un proyecto persa de traducción automática en un servicio público: cambios de paradigma, contratos difíciles, infraestructura escasa y ningún contacto privilegiado."
readTime: "20 min de lectura"
cover: "/images/articles/targoman-without-rent/cover.png"
external: "https://virgool.io/targoman/%D9%82%D8%B5%D9%87-%D8%AA%D8%B1%DA%AF%D9%85%D8%A7%D9%86-%D8%A8%D8%AF%D9%88%D9%86-%D8%B1%D8%A7%D9%86%D8%AA-%D9%87%D9%85-%D9%85%DA%AF%D8%B1-%D9%85%DB%8C-%D8%B4%D9%88%D8%AF-rqbt1zut3uri"
source: "Virgool (original en persa)"
related:
  - cuando-un-otp-por-sms-reduce-la-seguridad
draft: false
---

> **Sobre esta edición.** Esta es una traducción adaptada para lectores internacionales de un artículo publicado originalmente en persa en 2019. Mantengo fechas, instituciones y cifras porque forman parte de la evidencia; añado contexto cuando una particularidad iraní podría ocultar la lección general.

A menudo me preguntan cómo nació [Targoman](https://targoman.ir/), nuestro sistema de traducción automática para el persa, cuánto apoyo público recibió y por qué. Creo que, cuando hay dinero público de por medio, la transparencia no es un favor: es una obligación. No deberíamos esperar a que alguien pregunte para explicar lo ocurrido.

Esta no es, por tanto, una leyenda de startup cuidadosamente pulida. Es la historia menos cómoda: contratos de investigación modificados después de comenzar el trabajo, meses sin cobrar, infraestructura que nunca llegó, un paradigma técnico que quedó obsoleto días antes de firmar y un equipo que, una y otra vez, prefirió reconstruir antes que defender el plan de ayer.

También responde a dos mitos persistentes. El primero sostiene que para obtener un proyecto público de I+D hacen falta conexiones políticas. El segundo presenta la financiación pública como dinero fácil. Nuestra experiencia fue exactamente la contraria en ambos casos.

<figure>
<img src="/images/articles/targoman-without-rent/cover.png" alt="El servicio de traducción automática Targoman" />
<figcaption>El servicio de traducción automática Targoman</figcaption>
</figure>

## Acto primero: proponer a propósito la tecnología «equivocada»

La historia comenzó en la Universidad Tecnológica Amirkabir, en Teherán, en septiembre de 2009. Yo llevaba seis años trabajando en seguridad de redes e inteligencia artificial cuando regresé a la universidad para cursar estudios de posgrado en IA. En el segundo semestre estudié procesamiento del lenguaje natural con el doctor Saeid Khadivi, un joven profesor que acababa de doctorarse en traducción automática por la Universidad RWTH de Aquisgrán.

El Centro de Investigación de Telecomunicaciones de Irán había convocado varios proyectos universitarios, entre ellos un buscador web y un motor de traducción. El pliego exigía un traductor basado en reglas. El doctor Khadivi creía que el futuro estaba en la traducción estadística, el enfoque que Google ya había desplegado. Ninguno de los dos encajaba en el perfil que parecía premiar la contratación: yo era nuevo en traducción automática y él era joven y no tenía experiencia con organismos públicos.

¿Podíamos presentar una propuesta contraria al pliego? Lo hicimos. La primera sección explicaba, con argumentos técnicos, por qué construir otro motor basado en reglas era una decisión equivocada. Comparamos la traducción estadística con sus predecesoras y sostuvimos que la arquitectura solicitada estaba camino de la extinción.

Como era previsible, no ganamos. La Universidad de Teherán obtuvo el contrato para el sistema basado en reglas. Pero seguimos reuniéndonos con técnicos y directivos del centro, mostrando evidencia y defendiendo la alternativa. Unos veinte meses después de la convocatoria, el centro aceptó financiar en Amirkabir un proyecto paralelo: un motor estadístico inglés–persa. De esa decisión nació el primer motor iraní de este tipo para el par de lenguas.

El contrato era de 210 millones de tomans de entonces. El 30 % correspondía a gastos generales de la universidad, 50 millones financiaron un corpus bilingüe de diez millones de palabras y 10 millones se destinaron a equipos. Para un año completo de investigación quedaron en la práctica unos 137 millones: aproximadamente 11 millones al mes para todo el proyecto.

La primera API se entregó en enero de 2012. En las evaluaciones utilizadas entonces obtuvo un BLEU aproximadamente un 15 % superior al de los demás sistemas disponibles, incluido Google. Al finalizar el contrato, la diferencia declarada alcanzó el 25 %. Parsijoo, un buscador iraní, escogió nuestro motor entre tres alternativas nacionales.

<figure>
<img src="/images/articles/targoman-without-rent/image-01-20b69d.png" alt="Primera interfaz del sistema, llamado entonces Dilmāj" />
<figcaption>La primera interfaz del sistema, llamado entonces Dilmāj</figcaption>
</figure>

Después presentamos una propuesta que irritó a parte del mercado local. Los sistemas rivales, basados en reglas, necesitaban un esfuerzo casi independiente para traducir del persa al inglés, estimado en cerca de mil millones de tomans y tres años. Nosotros dijimos que podíamos volver bidireccional el motor en tres meses usando menos de la ampliación permitida del contrato. El centro aceptó. En julio de 2012 Dilmāj ya traducía en ambos sentidos, y la dirección persa–inglés resultó ser incluso mejor.

Nos acusaron de «estropear el mercado» por hacer demasiado por demasiado poco. Aquella crítica reveló una diferencia que nos acompañaría durante años: ¿debíamos maximizar el tamaño del contrato o la utilidad del sistema?

## Acto segundo: veintiún meses sin cobrar

El contrato terminó en agosto de 2012. Podíamos entregar los servidores y marcharnos. En su lugar, mantuvimos y mejoramos el servicio durante veintiún meses sin contrato de soporte.

Lo necesitaba. Funcionaba en tres servidores y sus componentes de investigación de código abierto nunca habían sido diseñados para un servicio público fiable. Con menos de 500.000 palabras diarias, el motor podía caerse más de veinte veces al día. La traducción representaba una parte importante del tráfico de Parsijoo y la demanda seguía creciendo. Seis meses después rozaba las 800.000 palabras diarias. Un prototipo de laboratorio había encontrado usuarios; ahora debía convertirse en un producto de ingeniería.

Las negociaciones avanzaron despacio entre una reorganización institucional y un cambio de Gobierno. Finalmente, en enero de 2014, se firmó un contrato de dos años por 400 millones de tomans. Tras gastos universitarios, equipos y seguros, quedaron unos 243 millones para ejecutar veinticuatro meses de trabajo.

La primera fase fue aceptada en junio, pero ni siquiera se había pagado el anticipo. Un competidor sostuvo que contratar a través de una universidad perjudicaba al sector privado e intentó cancelar el proyecto. El acuerdo acabó reescrito en su alcance técnico, propiedad intelectual, licencias y obligaciones de crecimiento. Un proyecto de investigación se convirtió en un contrato de producto obligado a cuadruplicar usuarios y palabras traducidas.

No pudimos conservarlo todo, pero protegimos tres puntos. El nombre **Targoman**, escogido y registrado por nosotros de forma independiente, no sería apropiado. El código esencial podría publicarse con licencias LGPLv3 y BSD para que el trabajo sobreviviera aunque cambiara el contratista. Y conservamos durante el contrato el derecho comercial sobre el corpus bilingüe creado en el primer proyecto.

El pago de la primera fase llegó casi un año después de comenzar, cuando ya habíamos entregado la segunda.

El contrato prometía treinta servidores; recibimos cinco. Una migración a una plataforma nacional de virtualización consumió cuatro meses y fracasó. Volvimos a las mismas cinco máquinas físicas. Aun así, en enero de 2016 presentamos un Targoman rediseñado: ya no era un prototipo ensamblado, sino un sistema desarrollado y preparado como servicio, con mejoras importantes de calidad, especialmente en textos literarios.

## Acto tercero: cuando las instituciones no tienen una casilla

En agosto de 2015 constituimos Targoman Intelligent Processing. Un nuevo programa nacional prefería contratar empresas, así que nos asociamos con el equipo de Farazin, un traductor basado en reglas. La idea era combinarlo con el motor estadístico de Targoman.

Las dos empresas jóvenes acordaron repartir el proyecto por igual, pero el presupuesto aprobado fue menos de la mitad del solicitado. A diferencia de los contratos universitarios, este incluía seguros laborales y contractuales, IVA, impuestos anuales, garantías bancarias y otros costes.

Entonces apareció un obstáculo revelador: la oficina de contratación no sabía cómo firmar con dos empresas conjuntamente. Pasé casi dos meses estudiando consorcios y sociedades civiles con el departamento jurídico. Diseñamos un contrato de responsabilidad solidaria y descubrimos que los bancos tampoco sabían abrir una cuenta corporativa compartida. Con ayuda de la administración central de Bank Mellat hubo que crear un formulario y un procedimiento. Cuatro meses después abrimos una de las primeras cuentas conjuntas de dos personas jurídicas del banco. Cada cheque —dos sellos y cuatro firmas— seguía siendo una aventura.

<figure>
<img src="/images/articles/targoman-without-rent/image-06-d1b043.png" alt="La cuenta bancaria corporativa compartida para la asociación" />
<figcaption>La figura jurídica existía en la ley; el procedimiento operativo tuvo que inventarse</figcaption>
</figure>

Este episodio administrativo no es una nota al margen. Solemos describir la innovación como un problema técnico y tratar contratos, bancos y categorías institucionales como elementos neutrales. No lo son. Una colaboración técnicamente sólida puede fracasar porque el sistema que la rodea no tiene una casilla donde colocarla.

## Acto cuarto: devolver el contrato sin firmar

Recibimos el borrador final el 29 de septiembre de 2016. Dos días antes, Google había anunciado su traducción neuronal en producción para chino–inglés, con resultados que sorprendieron al sector. La investigación llevaba años en marcha, pero pocos esperaban un servicio comercial a esa escala tan pronto. Google anunció que seguirían otros pares de lenguas.

Nuestra propuesta aprobada era un híbrido estadístico y basado en reglas. Firmarla sin cambios habría significado gastar dinero público y nuestro tiempo en un sistema obsoleto antes de secarse la tinta.

Así que nos negamos a firmar.

Todos los demás proyectos avanzaban; el presupuesto existía y el papeleo estaba terminado. Los responsables preguntaron, con razón, qué ocurriría con el traductor nacional si nos retirábamos. Respondimos que firmaríamos únicamente si cambiaba la propuesta: mantener el sistema estadístico para cumplir los compromisos existentes y dirigir la investigación hacia la traducción neuronal. Aceptamos los objetivos originales de calidad y adopción aun sabiendo que el nuevo camino implicaba mucho más riesgo.

Cinco meses después aprobaron la propuesta revisada por el mismo precio y con compromisos considerablemente mayores.

<figure>
<img src="/images/articles/targoman-without-rent/image-07-5d0da1.png" alt="Anuncio de Google sobre traducción automática neuronal en 2016" />
<figcaption>El anuncio que volvió obsoleta una arquitectura ya aprobada</figcaption>
</figure>

## Acto quinto: Targoman se vuelve neuronal

Habíamos empezado a investigar antes de firmar, así que entregamos la primera fase cuarenta y cinco días antes. El pago volvió a retrasarse mientras un panel externo reevaluaba los proyectos. Algunos se redujeron y dos, hasta donde sé, fueron cancelados. Nuestro primer pago llegó en septiembre. Para entonces, la falta de liquidez ya había obligado a compañeros valiosos a marcharse.

El 11 de julio de 2017 el equipo puso en servicio un Targoman neuronal. El contrato solo exigía un prototipo experimental. Google todavía ofrecía inglés–persa con su motor estadístico y, durante un breve periodo, la calidad de Targoman fue muy superior. Enviamos demostraciones a periodistas y figuras tecnológicas y apenas recibimos reacción. Dos semanas después Google migró inglés–persa a su sistema neuronal y terminó nuestra pequeña celebración.

La respuesta no fue defender el motor anterior ni la letra del contrato. Convencimos a los supervisores de que seguir invirtiendo en traducción estadística desperdiciaría dinero, asumimos el riesgo operativo de un sistema neuronal joven, trasladamos a él todos los compromisos contractuales y retiramos el motor estadístico.

La demanda creció con rapidez. El contrato exigía pasar de 120 a 240 palabras por segundo; la tercera entrega alcanzó 1.600. La calidad también superó los objetivos. El Academic Center for Education, Culture and Research aportó un corpus de treinta millones de palabras de artículos científicos traducidos, lo que permitió entrenar un modelo especializado para nuestro asistente Tarjomyar y multiplicó su uso.

<figure>
<img src="/images/articles/targoman-without-rent/image-11-eac59c.png" alt="Crecimiento del uso tras la migración neuronal de Targoman" />
<figcaption>El uso creció con fuerza después de poner en servicio el motor neuronal</figcaption>
</figure>

## La factura después de la última entrega

La última fase se entregó en marzo de 2018, pero para cobrar necesitábamos un certificado de la seguridad social. Aunque durante el año habíamos pagado unos 58 millones de tomans por el personal, el organismo reclamó inicialmente otros 64 millones. Tras recurrir, la cifra bajó a 30 millones.

De los 350 millones correspondientes a nuestra empresa, las deducciones directas incluyeron 88 millones en seguridad social, 31 millones de IVA, unos 20 millones para adquirir y publicar corpus exigidos por el contrato, alrededor de 11 millones en retenciones de fases, casi 5 millones en garantías bancarias y entre 9 y 15 millones estimados de impuesto anual. El alquiler, los salarios y los costes normales no están incluidos. El último pago de un proyecto aprobado en 2015 llegó en diciembre de 2018.

Después no esperamos otro contrato público. Targoman siguió mejorando, firmó acuerdos internacionales de desarrollo y llegó a nueve idiomas. También propusimos asumir el coste de operar el servicio. Nuestra posición era —y sigue siendo— que el apoyo público tiene sentido en la I+D cuyo riesgo está fuera del alcance de una empresa joven. No debe convertirse en dependencia permanente.

## Lo que el proyecto me demostró

No cuento esta historia para afirmar que todas nuestras decisiones fueron correctas. La cuento porque los proyectos públicos deben poder auditarse, incluidos sus errores, y porque las versiones simplificadas ocultan las lecciones útiles.

- La I+D pública puede producir algo más que informes y prototipos.
- El deber de un contratista es maximizar el valor público, no el tamaño ni la duración del contrato.
- Una arquitectura aprobada no es sagrada. Cuando cambia la realidad, devolver un contrato puede ser más responsable que cumplir exactamente lo que pide.
- Las licencias abiertas y la propiedad deciden si el conocimiento sobrevive a un cambio de proveedor.
- Infraestructura, contratación, banca y procedimientos jurídicos forman parte del entorno del producto.
- Un producto local no necesita que bloqueen a su competidor extranjero. Si el usuario conserva una elección real, la calidad puede demostrar su valor.
- Competir con una tecnológica global no siempre exige su presupuesto; sí exige foco, evidencia, resistencia y libertad para cambiar de modelo.

Durante ocho años no ofrecimos un soborno —ni siquiera un bolígrafo publicitario— a nadie. Nos apoyamos en el trabajo y en resultados medibles para merecer continuidad. Fue lento, caro y agotador, pero posible.

Combatir la corrupción no puede reducirse a condenarla desde una distancia segura. El trabajo honesto tiene que entrar en los mismos sistemas difíciles, hacer visibles sus costes y encender las luces.

