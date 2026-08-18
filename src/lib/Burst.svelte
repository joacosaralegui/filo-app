<script>
  // Estalla un puñado de partículas desde el centro cuando cambia `trigger`.
  export let trigger = 0; // cambiar este número dispara un burst nuevo

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
    const n = 28;
    parts = Array.from({ length: n }, (_, i) => {
      const ang = (Math.PI * 2 * i) / n + Math.random() * 0.5;
      const dist = 90 + Math.random() * 120;
      return {
        id: trigger + "-" + i,
        tx: Math.cos(ang) * dist,
        ty: Math.sin(ang) * dist - 40, // sesgo hacia arriba
        rot: (Math.random() * 720 - 360) | 0,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        size: 6 + Math.random() * 7,
        delay: Math.random() * 40,
      };
    });
    setTimeout(() => (parts = []), 900);
  }
</script>

{#if parts.length}
  <div class="burst" aria-hidden="true">
    {#each parts as p (p.id)}
      <span
        style="--tx:{p.tx}px; --ty:{p.ty}px; --rot:{p.rot}deg; --c:{p.color}; --s:{p.size}px; --d:{p.delay}ms"
      ></span>
    {/each}
  </div>
{/if}

<style>
  .burst {
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    pointer-events: none;
    z-index: 60;
  }
  span {
    position: absolute;
    width: var(--s);
    height: var(--s);
    background: var(--c);
    border-radius: 2px;
    opacity: 0;
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
