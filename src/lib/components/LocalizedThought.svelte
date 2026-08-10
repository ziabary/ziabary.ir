<script lang="ts">
  import { onMount } from 'svelte';
  import PageHero from '$lib/components/PageHero.svelte';

  export let locale: 'en' | 'es';

  const copies = {
    en: {
      pageTitle: 'Thought',
      eyebrow: 'Before the tool',
      lead: 'A concise account of the principles I have reached through years of building, failing, changing direction and building again—not a collection of final answers.',
      overview: 'At a glance',
      opening: 'Every technology springs from a philosophy: a way of seeing the problem, the human being, agency and responsibility. Using technology without understanding these deeper layers, however complex or expensive it may be, ultimately amounts to little more than playing with new tools.',
      axes: [
        ['01', 'Problem', 'Before choosing a tool'],
        ['02', 'Reality', 'Before loyalty to a model'],
        ['03', 'Building', 'Before making a claim']
      ],
      chapters: [
        {
          id: 'question', label: 'The problem before the tool', title: 'I begin with the problem, not the tool',
          paragraphs: [
            'Years of work in electronics, robotics, network security and artificial intelligence have taught me that technologies change, but one error repeats with remarkable consistency: we choose the answer before we have understood the problem.',
            'Technology is usually encountered where the answer is already visible—a product, system, algorithm or device that works. Yet the decisive choice was made much earlier, when the problem was framed. That framing determines what will be seen, what will remain invisible and which answers will never get a chance to appear.',
            'I believe that when the question is wrong, the best technology merely produces a more precise answer to the wrong question. Choosing the tool is therefore the last stage of thinking about technology, not the first.'
          ]
        },
        {
          id: 'models', label: 'Models must remain replaceable', title: 'A model must be replaceable',
          paragraphs: [
            'We cannot understand the world without models. They help us contain complexity, make decisions and build. But every model reveals one part of reality while pushing other parts outside the frame.',
            'I enjoy models, but I owe permanent loyalty to none of them. Trouble begins when we forget that a model is one way of seeing and allow it to take the place of reality itself. Past success makes this danger worse: a model that has answered correctly several times gradually changes from one possibility into the only possibility.',
            'This is not abstract for me. At Targoman, there came a point when continuing with statistical machine translation was no longer defensible, despite the contract, the plan and the money already invested. Technical reality had changed, so the plan had to change with it. Persisting with yesterday’s answer merely because we paid for it is not a virtue.'
          ],
          pull: 'The art lies in changing the model, not worshipping it.'
        },
        {
          id: 'knowing', label: 'Knowledge and doubt', title: 'Knowledge must preserve the possibility of doubt',
          paragraphs: [
            'Expertise is valuable. It shortens long paths, prevents repeated mistakes and makes complex work possible. Yet expertise also accumulates mental constraints: this cannot be done; this was solved before; this is not how the field works.',
            'Many of those constraints were once correct, which is precisely why they are difficult to see. Ignorance is not a virtue, but knowledge does not guarantee vision either. Expertise retains its value only while the expert can treat even deeply held knowledge as a provisional model.',
            'My objection is not to experts; it is to the worship of expertise. An idea should earn authority through reasoning, evidence and its power to explain reality—not through the name or position of its speaker. In a real conversation, ownership of an idea matters less than where the truth stands after criticism and correction.'
          ],
          pull: 'Abandoning a belief is not failure; becoming unable to abandon it is.'
        },
        {
          id: 'freedom', label: 'The option to choose again', title: 'I understand freedom as the ability to choose again',
          paragraphs: [
            'Freedom in technology does not mean the absence of structure. Without structure, collaboration, scale and continuity become impossible. The problem begins when structure stops being an instrument and becomes the authority that decides what is true, eliminating alternatives before they can be tested.',
            'For me, the value of open source is not merely zero price or access to code. Its deeper value is that it preserves competition among models: no answer can make itself the only possible answer, and the option to choose remains alive even when we do not exercise it today.',
            'For the same reason, I have never equated support for local technology with removing its foreign competitor. At Targoman we deliberately refused to ask for foreign services to be restricted. If a product has value, it should be able to stand in a field of real choice and rely on its own quality.'
          ],
          pull: 'The problem is not structure; it is the moment structure becomes sacred.'
        },
        {
          id: 'making', label: 'Building tests thought', title: 'Building is the test of thought',
          paragraphs: [
            'My path through work and life has never been a straight, clean line. I moved from software to electronics, from robotics to network security and from there to artificial intelligence. I do not believe that delay or failure is virtuous by itself, but much of what I know took shape inside those changes of direction.',
            'Philosophy that never meets a real constraint can become a game of words, just as technology without philosophy can become a game of tools. Building is where mental models are tested against matter, time, cost, people and environment.',
            'That is why I distinguish sharply between an elegant idea and a system that must work tomorrow morning. The same is true of ethics. Transparency, fair competition and opposition to corruption are only positions until they become visible in working methods, output quality and a willingness to accept responsibility.',
            'In teaching, the names of tools and commands rarely endure. Tools change. What is worth transferring is the ability to break a problem apart, expose hidden assumptions and reframe a question for which everyone already has a prepared answer.'
          ]
        }
      ],
      coda: 'What joins these principles for me is a readiness to revise. Models, expertise and structures are necessary for understanding and building; none should become so entangled with our identity that changing it in the face of reality feels like defeat.',
      final: 'You do not have to change your belief. Just make sure you are still able to.'
    },
    es: {
      pageTitle: 'Pensamiento',
      eyebrow: 'Antes de la herramienta',
      lead: 'Una síntesis de los principios a los que he llegado tras años de construir, fracasar, cambiar de rumbo y volver a construir; no una colección de respuestas definitivas.',
      overview: 'De un vistazo',
      opening: 'Toda tecnología nace de una filosofía: de una forma de mirar el problema, al ser humano, la capacidad de elegir y la responsabilidad. Emplear tecnología sin comprender estas capas profundas, por compleja o costosa que sea, termina siendo poco más que jugar con herramientas nuevas.',
      axes: [
        ['01', 'Problema', 'Antes de elegir herramienta'],
        ['02', 'Realidad', 'Antes de ser fiel al modelo'],
        ['03', 'Construir', 'Antes de afirmar']
      ],
      chapters: [
        {
          id: 'question', label: 'El problema antes que la herramienta', title: 'Empiezo por el problema, no por la herramienta',
          paragraphs: [
            'Años de trabajo en electrónica, robótica, seguridad de redes e inteligencia artificial me han enseñado que las tecnologías cambian, pero un error se repite casi siempre: escogemos la respuesta antes de comprender el problema.',
            'Normalmente vemos la tecnología cuando la respuesta ya está preparada: un producto, un sistema, un algoritmo o un dispositivo que funciona. Sin embargo, la decisión principal se tomó mucho antes, al formular el problema. Esa formulación decide qué se verá, qué quedará fuera y qué respuestas ni siquiera tendrán ocasión de aparecer.',
            'Creo que, cuando la pregunta es errónea, la mejor tecnología solo ofrece una respuesta más precisa a la pregunta equivocada. Elegir la herramienta es, por tanto, la última etapa de pensar la tecnología, no la primera.'
          ]
        },
        {
          id: 'models', label: 'Poder cambiar de modelo', title: 'Un modelo debe poder sustituirse',
          paragraphs: [
            'Para entender el mundo necesitamos modelos. Sin ellos no podemos contener la complejidad, decidir ni construir. Pero cada modelo, al revelar una parte de la realidad, deja otras fuera del encuadre.',
            'Me interesan los modelos, pero no guardo lealtad permanente a ninguno. El problema aparece cuando olvidamos que un modelo es una forma de mirar y lo colocamos en el lugar de la realidad. El éxito pasado aumenta el riesgo: un modelo que acertó varias veces pasa poco a poco de ser una posibilidad a ser la única posibilidad.',
            'Para mí no es una discusión abstracta. En Targoman llegó un momento en que continuar con la traducción estadística dejó de ser defendible, aunque existieran contrato, plan e inversión. La realidad técnica había cambiado y el plan debía cambiar con ella. Insistir en la respuesta de ayer solo porque hemos invertido en ella no es una virtud.'
          ],
          pull: 'El arte está en cambiar de modelo, no en adorarlo.'
        },
        {
          id: 'knowing', label: 'Saber y poder dudar', title: 'El conocimiento debe conservar la posibilidad de dudar',
          paragraphs: [
            'La experiencia es valiosa. Acorta caminos, reduce errores repetidos y permite construir cosas complejas. Pero también acumula límites mentales: esto no se puede hacer; este problema ya está resuelto; así no funciona este sector.',
            'Muchos de esos límites fueron ciertos alguna vez y precisamente por eso cuesta verlos. La ignorancia no es una virtud, pero saber tampoco garantiza ver. La experiencia conserva su valor cuando el especialista puede mirar incluso sus certezas como modelos provisionales.',
            'Mi problema no es con los especialistas, sino con el culto al especialista. Una idea debe obtener autoridad de su razonamiento, sus pruebas y su capacidad para explicar la realidad, no del nombre o cargo de quien la pronuncia. En una conversación real importa menos quién poseía la idea que dónde queda la verdad después de criticarla y corregirla.'
          ],
          pull: 'Abandonar una creencia no es fracasar; fracasar es no poder abandonarla.'
        },
        {
          id: 'freedom', label: 'La posibilidad de volver a elegir', title: 'Entiendo la libertad como la posibilidad de volver a elegir',
          paragraphs: [
            'La libertad tecnológica no significa ausencia de estructura. Sin estructura no hay colaboración, escala ni continuidad. El problema comienza cuando la estructura deja de ser un instrumento y se convierte en autoridad de la verdad, descartando otras vías antes de probarlas.',
            'Para mí, el valor del código abierto no reside solo en ser gratuito o permitir acceso al código. Su valor profundo está en preservar la competencia entre modelos: que ninguna respuesta pueda convertirse en la única respuesta posible y que la opción de elegir siga viva aunque hoy no la utilicemos.',
            'Por eso nunca he equiparado apoyar tecnología local con eliminar al competidor extranjero. En Targoman rechazamos deliberadamente pedir restricciones para otros servicios. Si un producto tiene valor, debe sostenerse en un terreno de elección real y mediante su propia calidad.'
          ],
          pull: 'El problema no es la estructura; es convertir la estructura en algo sagrado.'
        },
        {
          id: 'making', label: 'Construir pone a prueba el pensamiento', title: 'Construir es la prueba del pensamiento',
          paragraphs: [
            'Mi trayectoria profesional y vital nunca fue una línea recta y limpia. Pasé del software a la electrónica, de la robótica a la seguridad de redes y de allí a la inteligencia artificial. No creo que demorarse o fracasar sean virtudes por sí mismas, pero mucho de lo aprendido tomó forma en esos cambios de dirección.',
            'Una filosofía que nunca se enfrenta a límites reales puede convertirse en un juego de palabras, igual que la tecnología sin filosofía puede reducirse a jugar con herramientas. Construir es el lugar donde los modelos mentales se enfrentan a materia, tiempo, coste, personas y entorno.',
            'Por eso distingo entre una idea elegante y un sistema que mañana por la mañana tiene que funcionar. Lo mismo ocurre con la ética. Transparencia, competencia justa y oposición a la corrupción no pasan de ser posturas hasta que aparecen en la forma de trabajar, la calidad del resultado y la voluntad de asumir responsabilidad.',
            'En la enseñanza rara vez perduran los nombres de herramientas y comandos. Las herramientas cambian. Lo valioso es transmitir la capacidad de dividir el problema, descubrir supuestos ocultos y reformular una pregunta para la que todos ya tienen una respuesta preparada.'
          ]
        }
      ],
      coda: 'Lo que une estos principios es, para mí, la disposición a revisar. Modelos, experiencia y estructuras son necesarios para comprender y construir; ninguno debe fundirse tanto con nuestra identidad que cambiarlo ante la realidad parezca una derrota.',
      final: 'No tienes que cambiar de creencia. Solo asegúrate de que todavía puedes hacerlo.'
    }
  } as const;

  $: copy = copies[locale];
  let activeSection = 'question';

  onMount(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.thought-chapter[id]'));
    let ticking = false;
    const update = () => {
      const line = window.innerHeight * 0.34;
      let current = sections[0]?.id ?? 'question';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
        else break;
      }
      activeSection = current;
      ticking = false;
    };
    const scroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', scroll);
    return () => {
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', scroll);
    };
  });
</script>

<svelte:head><title>{copy.pageTitle} | Mehran Ziabary</title></svelte:head>

<main class="localized-thought" dir="ltr">
  <PageHero eyebrow={copy.eyebrow} title={copy.pageTitle} lead={copy.lead} />
  <section class="wrap thought-layout thought-layout--localized">
    <aside class="thought-navigation">
      <span>{copy.overview}</span>
      {#each copy.chapters as chapter}
        <a href={`#${chapter.id}`} class:active={activeSection === chapter.id} aria-current={activeSection === chapter.id ? 'location' : undefined}>{chapter.label}</a>
      {/each}
    </aside>
    <div class="thought-body thought-body--localized">
      <blockquote class="thought-opening">{copy.opening}</blockquote>
      <div class="thought-axes">
        {#each copy.axes as axis}<div><small>{axis[0]}</small><b>{axis[1]}</b><span>{axis[2]}</span></div>{/each}
      </div>
      {#each copy.chapters as chapter, index}
        <section id={chapter.id} class="thought-chapter">
          <header class="thought-chapter-head"><small>{String(index + 1).padStart(2, '0')}</small><h2>{chapter.title}</h2></header>
          {#each chapter.paragraphs as paragraph}<p>{paragraph}</p>{/each}
          {#if 'pull' in chapter && chapter.pull}<p class="thought-pull">{chapter.pull}</p>{/if}
        </section>
      {/each}
      <div class="thought-coda"><p>{copy.coda}</p><strong class="thought-final">{copy.final}</strong></div>
    </div>
  </section>
</main>

<style>
  .thought-layout--localized{grid-template-columns:210px minmax(0,780px);gap:80px;align-items:start}
  .thought-navigation{border-right:1px solid var(--line);padding-right:22px}
  .thought-navigation a{position:relative;transition:color .2s,transform .2s}
  .thought-navigation a:before{content:'';position:absolute;right:-23px;top:50%;width:2px;height:0;background:var(--teal);transform:translateY(-50%);transition:height .2s}
  .thought-navigation a.active{color:var(--teal);font-weight:700;transform:translateX(4px)}
  .thought-navigation a.active:before{height:22px}
  .thought-body--localized{max-width:780px}
  .thought-opening{margin:0 0 44px;padding:36px 0;border-block:2px solid var(--ink);font-size:clamp(23px,2.7vw,33px);line-height:1.75}
  .thought-opening:before,.thought-opening:after{content:none!important;display:none!important}
  .thought-axes{display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid var(--line);margin-bottom:65px}
  .thought-axes>div{display:grid;gap:3px;padding:18px 20px 22px}
  .thought-axes>div+div{border-left:1px solid var(--line)}
  .thought-axes small{font-size:9px;color:var(--teal)}.thought-axes b{font-size:17px}.thought-axes span{font-size:10px;color:var(--muted)}
  .thought-chapter{scroll-margin-top:105px;position:relative;margin:0;padding:68px 0;border-top:1px solid var(--line)}
  .thought-chapter-head{display:grid;grid-template-columns:72px 1fr;align-items:start;margin-bottom:26px}
  .thought-chapter-head small{font-size:38px;line-height:1.15;color:color-mix(in srgb,var(--teal) 45%,var(--line))}
  .thought-chapter-head h2{margin:0;font-size:clamp(25px,3vw,34px);line-height:1.35}
  .thought-chapter>p{margin:0 0 17px 72px;color:color-mix(in srgb,var(--ink) 78%,var(--muted));font-size:15px;line-height:1.95}
  .thought-chapter>p.thought-pull{margin:38px 0 0 72px;padding:24px 28px;border-block:1px solid var(--ink);color:var(--ink);font-size:20px;font-weight:800;line-height:1.65}
  .thought-coda{margin-top:24px;padding:52px 56px 48px;background:#0b343b;color:#eaf5f3;border-top:5px solid #24b5ad}
  .thought-coda>p{margin:0 0 34px;color:#d0dfdd;font-size:15px;line-height:1.9}
  .thought-final{display:block;padding-top:28px;border-top:1px solid rgba(142,219,213,.38);color:#fff;font-size:clamp(23px,3vw,33px);line-height:1.6}
  @media(max-width:980px){.thought-layout--localized{grid-template-columns:180px minmax(0,1fr);gap:42px}}
  @media(max-width:680px){.thought-layout--localized{grid-template-columns:1fr;gap:24px}.thought-navigation{display:none}.thought-opening{font-size:22px}.thought-axes{grid-template-columns:1fr}.thought-axes>div+div{border-left:0;border-top:1px solid var(--line)}.thought-chapter-head{grid-template-columns:50px 1fr}.thought-chapter>p,.thought-chapter>p.thought-pull{margin-left:0}.thought-coda{padding:36px 25px}}
</style>
