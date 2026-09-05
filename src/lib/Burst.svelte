<script>
  // Estalla un puñado de partículas desde el centro cuando cambia `trigger`.
  export let trigger = 0; // cambiar este número dispara un burst nuevo
  export let count = 28; // cantidad de partículas
  export let power = 1; // multiplica el alcance (para bursts de celebración)

  const FALLBACK = ["#606c38", "#dda15e", "#bc6c25"];
  let parts = [];

  $: if (trigger) spawn();

  function palette() {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--burst-colors");
    const list = raw.split(",").map((s) => s.trim()).filter(Boolean);
    return list.length ? list : FALLBACK;
  }

  function spawn() {
    const COLORS = palette();
    const n = count;
    parts = Array.from({ length: n }, (_, i) => {
      const ang = (Math.PI * 2 * i) / n + Math.random() * 0.5;
      const dist = (90 + Math.random() * 120) * power;
      return {
        id: trigger + "-" + i,
        tx: Math.cos(ang) * dist,
        ty: Math.sin(ang) * dist - 40 * power, // sesgo hacia arriba
        rot: (Math.random() * 720 - 360) | 0,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        size: 6 + Math.random() * 7,
        delay: Math.random() * 40,
      };
    });
    setTimeout(() => (parts = []), 900 + 300 * (power - 1));
  }
</script>

{#if parts.length}
  <div class="pointer-events-none fixed inset-0 z-[60] grid place-items-center" aria-hidden="true">
    {#each parts as p (p.id)}
      <span
        class="absolute h-[var(--s)] w-[var(--s)] rounded-[2px] bg-[var(--c)] opacity-0"
        style="--tx:{p.tx}px; --ty:{p.ty}px; --rot:{p.rot}deg; --c:{p.color}; --s:{p.size}px; --d:{p.delay}ms"
      ></span>
    {/each}
  </div>
{/if}

<style>
  span {
    animation: fly 780ms cubic-bezier(0.15, 0.7, 0.3, 1) var(--d) forwards;
  }
  @keyframes fly {
    0% {
      transform: translate(0, 0) scale(0.4) rotate(0deg);
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      transform: translate(var(--tx), var(--ty)) scale(1) rotate(var(--rot));
      opacity: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    span {
      animation-duration: 1ms;
    }
  }
</style>
