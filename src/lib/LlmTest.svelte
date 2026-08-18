<script>
  /* ==========================================================================
   * PANTALLA DE PRUEBA — corrector de preguntas abiertas en el dispositivo
   *
   * No es parte de la app: se entra sólo por la URL con #llm-test.
   * Sirve para medir, en teléfonos reales, si un modelo chico corriendo en el
   * navegador (WebLLM + WebGPU) puede corregir respuestas abiertas.
   *
   * IDEA: el razonamiento difícil ("¿qué cuenta como correcto?") se resuelve una
   * vez, en autoría, y queda escrito en `puntosClave` (la rúbrica). El modelo del
   * teléfono sólo verifica "¿la respuesta expresa esta idea? sí/no", que es una
   * tarea mucho más fácil. El puntaje lo cuenta JS, no el modelo.
   *
   * WebLLM se importa dinámicamente desde CDN: no entra al bundle de la app.
   * ========================================================================== */
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const WEBLLM_CDN = "https://esm.run/@mlc-ai/web-llm@0.2.84";
  const TRANSFORMERS_CDN = "https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.2.0";

  // --- modelos a probar -----------------------------------------------------
  // Dos runtimes distintos, ambos sobre WebGPU:
  //  · webllm       → MLC, kernels propios.
  //  · transformers → transformers.js + ONNX Runtime Web, shaders distintos.
  // Importa tenerlos a los dos: los modelos Qwen3.5 usan atención lineal híbrida
  // (kernels conv1d) y ese shader no compila en algunos drivers con MLC. ONNX
  // genera otros shaders, así que puede andar donde MLC falla (y viceversa).
  const MODELS = [
    {
      runtime: "transformers",
      id: "onnx-community/Qwen3.5-0.8B-ONNX-OPT",
      label: "Qwen3.5-0.8B · ONNX",
      size: "~850 MB",
    },
    {
      runtime: "webllm",
      id: "Qwen3.5-0.8B-q4f16_1-MLC",
      label: "Qwen3.5-0.8B · MLC",
      size: "~0.5 GB",
    },
    {
      runtime: "webllm",
      id: "Qwen3.5-2B-q4f16_1-MLC",
      label: "Qwen3.5-2B · MLC",
      size: "~1.2 GB",
    },
    {
      runtime: "webllm",
      id: "Qwen3-1.7B-q4f16_1-MLC",
      label: "Qwen3-1.7B · MLC (transformer clásico)",
      size: "~1.1 GB",
    },
    {
      runtime: "webllm",
      id: "Qwen2.5-3B-Instruct-q4f16_1-MLC",
      label: "Qwen2.5-3B · MLC",
      size: "~1.9 GB",
    },
  ];

  // --- tarjeta + rúbrica ----------------------------------------------------
  // Los puntos describen la IDEA, no el término técnico: si un punto dijera
  // "menciona la durée", el modelo castigaría paráfrasis correctas.
  const CARD = {
    contexto:
      "Para Bergson, el tiempo de la ciencia es un tiempo espacializado, medido con relojes, homogéneo y divisible. Frente a él está la 'durée' (duración): el tiempo vivido de la conciencia, cualitativo, continuo e indivisible, donde los estados se funden unos con otros.",
    pregunta: "¿Qué distinción central propone Bergson sobre el tiempo?",
    puntosClave: [
      "Identifica un tiempo objetivo/externo: el que mide la ciencia con relojes, homogéneo y divisible en partes",
      "Identifica un tiempo interior o vivido de la conciencia (lo que Bergson llama 'durée'), aunque el estudiante no use ese nombre",
      "Caracteriza ese tiempo vivido como continuo o cualitativo: fluye sin cortarse, no se divide en partes separadas",
    ],
  };

  // --- casos de prueba ------------------------------------------------------
  // `esperado` = lo que daría un corrector humano razonable.
  const CASES = [
    {
      id: "correcta",
      etiqueta: "Correcta",
      esperado: 3,
      respuesta:
        "Bergson diferencia el tiempo que mide la ciencia con relojes, que es homogéneo y se puede dividir, del tiempo vivido o durée, que es cualitativo y fluye de manera continua sin partes separadas.",
    },
    {
      id: "parafraseada",
      etiqueta: "Correcta parafraseada (sin vocabulario técnico)",
      esperado: 3,
      respuesta:
        "Una cosa es el tiempo del reloj, siempre igual y que se puede partir en pedazos, y otra muy distinta es cómo sentimos pasar el tiempo por dentro, que va todo junto y no se corta.",
    },
    {
      id: "parcial",
      etiqueta: "Parcial (nombra la distinción, no la desarrolla)",
      esperado: 2,
      respuesta: "Bergson habla del tiempo del reloj y del tiempo vivido, la durée.",
    },
    {
      id: "incorrecta",
      etiqueta: "Incorrecta (dice lo contrario)",
      esperado: 0,
      respuesta:
        "Bergson dice que el tiempo es absoluto y siempre igual para todos, como pensaba Newton, y que se puede medir de forma objetiva con exactitud.",
    },
    {
      id: "evasiva",
      etiqueta: "Evasiva / sin contenido",
      esperado: 0,
      respuesta:
        "El tiempo es un tema muy importante en la filosofía y Bergson escribió mucho sobre eso.",
    },
  ];

  // --- estado ---------------------------------------------------------------
  let modelId = MODELS[0].id;
  let engine = null;
  let engineModelId = null;
  let status = "Listo.";
  let progressPct = 0;
  let busy = false;
  let answers = CASES.map((c) => c.respuesta);
  let results = CASES.map(() => null); // { obtenido, acierta, ms, puntos, comentario } | { error } | null

  const hasWebGPU = typeof navigator !== "undefined" && !!navigator.gpu;
  const deviceRam = typeof navigator !== "undefined" ? navigator.deviceMemory : undefined;

  $: filas = results.filter((r) => r && !r.error);
  $: aciertos = filas.filter((r) => r.acierta).length;
  $: msPromedio = filas.length
    ? Math.round(filas.reduce((a, r) => a + r.ms, 0) / filas.length)
    : 0;

  // --- prompt ---------------------------------------------------------------
  // Pedimos CITA textual antes del veredicto: obliga a mirar la respuesta en vez
  // de repetir la rúbrica de memoria. `/no_think` apaga el modo razonador de
  // Qwen3.x (más rápido, JSON más limpio); otros modelos lo ignoran.
  function buildMessages(respuesta) {
    const n = CARD.puntosClave.length;
    const lista = CARD.puntosClave.map((p, i) => `${i + 1}. ${p}`).join("\n");

    const system = `Sos un corrector de filosofía en español. Para cada PUNTO CLAVE decidís si la respuesta del estudiante EXPRESA ESA IDEA.

REGLAS
- Evaluá la IDEA, no las palabras exactas. Lenguaje coloquial, ejemplos o sinónimos cuentan como válidos.
- NO exijas términos técnicos. Ejemplo: si el punto habla de "la durée" y el estudiante dice "el tiempo que sentimos por dentro, que no se corta", el punto ESTÁ PRESENTE.
- Para cada punto, primero escribí la CITA textual de la respuesta que expresa la idea. Si no encontrás ninguna, dejá la cita vacía y marcá presente=false.
- No regales puntos ausentes, pero tampoco castigues una idea correcta por estar dicha con otras palabras.

FORMATO
Respondé SOLO con JSON válido, sin texto adicional, con exactamente ${n} elementos en "puntos" (en orden):
{"puntos":[{"n":1,"cita":"","presente":true,"por_que":""}],"comentario":""}
/no_think`;

    const user = `CONTEXTO (información correcta):
${CARD.contexto}

PREGUNTA:
${CARD.pregunta}

PUNTOS CLAVE (son ${n}):
${lista}

RESPUESTA DEL ESTUDIANTE:
"${respuesta}"

Evaluá los ${n} puntos y devolvé el JSON. /no_think`;

    return [
      { role: "system", content: system },
      { role: "user", content: user },
    ];
  }

  // Los modelos chicos envuelven el JSON en prosa o ```bloques```; Qwen3.x puede
  // anteponer <think>...</think>. Limpiamos y extraemos el primer objeto.
  function parseVerdict(text) {
    const limpio = (text || "").replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
    const m = limpio.match(/\{[\s\S]*\}/);
    if (!m) return null;
    const intentar = (s) => {
      try {
        return JSON.parse(s);
      } catch {
        return null;
      }
    };
    const obj = intentar(m[0]) ?? intentar(m[0].replace(/,\s*([}\]])/g, "$1"));
    return obj && Array.isArray(obj.puntos) ? obj : null;
  }

  // --- motores --------------------------------------------------------------
  // Cada runtime se envuelve en el mismo adaptador { generate, unload } para que
  // el resto del código no sepa cuál está corriendo.

  // WebLLM (MLC). cacheBackend "indexeddb": la Cache API por defecto falla al
  // guardar las respuestas redirigidas del CDN de HuggingFace
  // ("Cache.add() encountered a network error").
  async function loadWebllm(model, onStatus) {
    const webllm = await import(/* @vite-ignore */ WEBLLM_CDN);
    const eng = await webllm.CreateMLCEngine(model.id, {
      appConfig: { ...webllm.prebuiltAppConfig, cacheBackend: "indexeddb" },
      initProgressCallback: (r) => onStatus(r.text, r.progress),
    });
    return {
      async generate(messages) {
        const r = await eng.chat.completions.create({
          messages,
          temperature: 0,
          max_tokens: 700,
        });
        return r.choices[0].message.content;
      },
      unload: () => eng.unload(),
    };
  }

  // transformers.js + ONNX Runtime Web. El modelo es multimodal
  // (image-text-to-text), pero lo usamos sólo con texto: no le pasamos imágenes.
  // `enable_thinking: false` apaga el modo razonador de forma explícita.
  async function loadTransformers(model, onStatus) {
    const { AutoProcessor, Qwen3_5ForConditionalGeneration, TextStreamer } = await import(
      /* @vite-ignore */ TRANSFORMERS_CDN
    );
    onStatus("Cargando procesador…", 0);
    const processor = await AutoProcessor.from_pretrained(model.id);

    const net = await Qwen3_5ForConditionalGeneration.from_pretrained(model.id, {
      dtype: { embed_tokens: "q4", vision_encoder: "fp16", decoder_model_merged: "q4" },
      device: "webgpu",
      progress_callback: (p) => {
        if (p.status === "progress" && p.total) {
          onStatus(`Descargando ${p.file}…`, p.loaded / p.total);
        } else if (p.status) {
          onStatus(p.status, undefined);
        }
      },
    });

    return {
      async generate(messages) {
        // El chat template espera el contenido como lista de partes tipadas.
        const asParts = messages.map((m) => ({
          role: m.role,
          content: [{ type: "text", text: m.content }],
        }));
        const text = processor.apply_chat_template(asParts, {
          add_generation_prompt: true,
          tokenizer_kwargs: { enable_thinking: false },
        });
        const inputs = await processor(text);

        // Acumulamos con el streamer en vez de recortar tensores a mano.
        let out = "";
        const streamer = new TextStreamer(processor.tokenizer, {
          skip_prompt: true,
          skip_special_tokens: true,
          callback_function: (t) => (out += t),
        });
        await net.generate({ ...inputs, do_sample: false, max_new_tokens: 700, streamer });
        return out;
      },
      unload: () => net.dispose?.(),
    };
  }

  async function ensureEngine() {
    if (engineModelId === modelId && engine) return;
    if (engine) {
      await engine.unload();
      engine = null;
      engineModelId = null;
    }
    const model = MODELS.find((m) => m.id === modelId);
    const onStatus = (text, progress) => {
      status = text;
      if (typeof progress === "number") progressPct = Math.round(progress * 100);
    };
    engine =
      model.runtime === "transformers"
        ? await loadTransformers(model, onStatus)
        : await loadWebllm(model, onStatus);
    engineModelId = modelId;
  }

  async function run() {
    busy = true;
    results = CASES.map(() => null);
    try {
      status = "Cargando modelo…";
      await ensureEngine();
      progressPct = 100;

      for (let i = 0; i < CASES.length; i++) {
        status = `Corrigiendo ${i + 1}/${CASES.length}…`;
        const t0 = performance.now();
        try {
          const raw = await engine.generate(buildMessages(answers[i]));
          const ms = Math.round(performance.now() - t0);
          const parsed = parseVerdict(raw);

          results[i] = parsed
            ? {
                obtenido: parsed.puntos.filter((p) => p.presente).length,
                acierta:
                  parsed.puntos.filter((p) => p.presente).length === CASES[i].esperado,
                puntos: parsed.puntos,
                comentario: parsed.comentario,
                ms,
              }
            : { error: "JSON inválido", raw, ms };
        } catch (err) {
          results[i] = { error: err.message };
        }
        results = results; // reactividad
      }
      status = "Listo.";
    } catch (err) {
      status = `Error: ${err.message}`;
      console.error(err);
    } finally {
      busy = false;
    }
  }
</script>

<div class="wrap">
  <button class="back" on:click={() => dispatch("back")}>← Volver</button>

  <h1>Prueba: corrector en el dispositivo</h1>
  <p class="sub">
    El modelo corre 100% en este teléfono (WebLLM + WebGPU). Verifica punto por
    punto si la respuesta expresa cada idea de la rúbrica; el puntaje lo calcula
    la app, no el modelo. Cada caso declara el resultado <b>esperado</b> para
    medir si el modelo acierta.
  </p>

  <div class="diag">
    <div><b>WebGPU:</b> {hasWebGPU ? "✓ disponible" : "✗ no disponible"}</div>
    <div><b>RAM del dispositivo:</b> {deviceRam ? `~${deviceRam} GB` : "desconocida"}</div>
  </div>

  {#if !hasWebGPU}
    <p class="warn">
      Este dispositivo no expone WebGPU, así que no puede correr el modelo. En un
      caso real acá mostraríamos la respuesta modelo para que el estudiante se
      autoevalúe.
    </p>
  {/if}

  <div class="controls">
    <select bind:value={modelId} disabled={busy}>
      {#each MODELS as m}
        <option value={m.id}>{m.label} · {m.size}</option>
      {/each}
    </select>
    <button class="primary" on:click={run} disabled={busy || !hasWebGPU}>
      {busy ? "Trabajando…" : "Cargar modelo y corregir"}
    </button>
  </div>

  <p class="note">
    La primera vez descarga el modelo (se guarda en el dispositivo). Conviene
    hacerlo con Wi-Fi.
  </p>

  <div class="status">{status}</div>
  {#if progressPct > 0 && progressPct < 100}
    <div class="bar"><i style="width:{progressPct}%"></i></div>
  {/if}

  {#if filas.length}
    <div class="summary">
      Coincide con el humano en
      <b class={aciertos === CASES.length ? "ok" : "bad"}>{aciertos}/{CASES.length}</b>
      casos · {msPromedio} ms promedio
    </div>
  {/if}

  {#each CASES as c, i}
    <div class="case">
      <div class="case-head">
        <span class="tag">{c.etiqueta}</span>
        <span class="tag">esperado {c.esperado}/{CARD.puntosClave.length}</span>
      </div>

      <textarea bind:value={answers[i]} rows="3" disabled={busy}></textarea>

      {#if results[i]}
        {#if results[i].error}
          <div class="res bad">
            ✗ {results[i].error}
            {#if results[i].raw}<pre>{results[i].raw}</pre>{/if}
          </div>
        {:else}
          <div class="res">
            <div class="score">
              <b class={results[i].acierta ? "ok" : "bad"}>
                {results[i].obtenido}/{CARD.puntosClave.length}
              </b>
              <span class={results[i].acierta ? "ok" : "bad"}>
                {results[i].acierta ? "✓ coincide" : "✗ difiere"}
              </span>
              <span class="ms">{results[i].ms} ms</span>
            </div>
            {#each results[i].puntos as p}
              <div class={p.presente ? "ok" : "bad"}>
                {p.presente ? "✓" : "✗"} Punto {p.n}: {p.por_que}
              </div>
              {#if p.cita}<div class="cita">“{p.cita}”</div>{/if}
            {/each}
            {#if results[i].comentario}
              <div class="coment">💬 {results[i].comentario}</div>
            {/if}
          </div>
        {/if}
      {/if}
    </div>
  {/each}
</div>

<style>
  .wrap {
    max-width: 720px;
    margin: 0 auto;
    padding: 16px 16px 48px;
    color: var(--text);
  }
  .back {
    background: none;
    border: none;
    color: var(--accent);
    font: inherit;
    padding: 4px 0;
    cursor: pointer;
  }
  h1 {
    font-size: 1.25rem;
    margin: 8px 0 4px;
  }
  .sub {
    color: var(--text-soft);
    font-size: 0.85rem;
    margin: 0 0 14px;
  }
  .diag {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 10px 12px;
    font-size: 0.85rem;
    display: grid;
    gap: 2px;
    margin-bottom: 12px;
  }
  .warn {
    background: var(--surface-2);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 10px 12px;
    font-size: 0.85rem;
  }
  .controls {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }
  select,
  button.primary {
    font: inherit;
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid var(--line);
    background: var(--surface);
    color: var(--text);
    flex: 1 1 auto;
    min-width: 0;
  }
  button.primary {
    background: var(--accent);
    color: var(--on-accent);
    border-color: var(--accent);
    font-weight: 600;
    cursor: pointer;
  }
  button.primary:disabled {
    opacity: 0.5;
  }
  .note,
  .status {
    font-size: 0.8rem;
    color: var(--text-soft);
    margin: 6px 0;
  }
  .bar {
    height: 4px;
    background: var(--line);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 12px;
  }
  .bar > i {
    display: block;
    height: 100%;
    background: var(--accent);
    transition: width 0.2s;
  }
  .summary {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 10px 12px;
    font-size: 0.9rem;
    margin: 12px 0;
  }
  .case {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 12px;
    margin-bottom: 12px;
  }
  .case-head {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }
  .tag {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    background: var(--surface-2);
    color: var(--text-soft);
    padding: 3px 7px;
    border-radius: 5px;
  }
  textarea {
    width: 100%;
    font: inherit;
    font-size: 0.9rem;
    padding: 8px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: var(--bg);
    color: var(--text);
    resize: vertical;
  }
  .res {
    margin-top: 10px;
    font-size: 0.85rem;
    display: grid;
    gap: 3px;
  }
  .score {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 4px;
  }
  .score b {
    font-size: 1rem;
  }
  .ms {
    color: var(--text-soft);
    font-size: 0.75rem;
    margin-left: auto;
  }
  .ok {
    color: #3f6212;
  }
  .bad {
    color: #b91c1c;
  }
  .cita {
    color: var(--text-soft);
    font-style: italic;
    padding-left: 14px;
  }
  .coment {
    margin-top: 4px;
  }
  pre {
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 0.7rem;
    color: var(--text-soft);
    max-height: 140px;
    overflow: auto;
  }
</style>
