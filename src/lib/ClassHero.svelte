<script>
  // Tarjeta "foto + pretítulo + título de clase + botón", compartida entre la
  // portada de un curso (CourseView) y la tarjeta "Continuar con" de Inicio:
  // misma info (de qué curso/clase se trata, y el CTA para entrar), sólo
  // cambia si la tarjeta ENTERA es el botón (Inicio, para tocar en cualquier
  // lado) o si el único tap target es el CTA de abajo (CourseView, porque
  // debajo hay una lista de clases con sus propios botones).
  import { createEventDispatcher } from "svelte";

  export let img;
  export let pretitle;
  export let title;
  export let buttonLabel;
  export let wholeCardClickable = false;

  const dispatch = createEventDispatcher();
  const onClick = () => dispatch("click");
</script>

{#if wholeCardClickable}
  <button
    class="group flex w-full cursor-pointer flex-col gap-4 rounded-[4px] halftone-surface-subtle bg-surface p-5 text-left [font-family:inherit] transition-transform active:scale-[0.99]"
    on:click={onClick}
  >
    <div class="flex items-center gap-4">
      <img class="aspect-square w-[30%] flex-none rounded-[4px] object-cover opacity-[85%]" src={img} alt="" />
      <div class="flex min-w-0 flex-1 flex-col gap-2">
        <p class="font-serif text-[16px] leading-[1.3] font-medium text-accent">{pretitle}</p>
        <h2 class="font-serif text-[22px] leading-[1.22] font-semibold text-text">{title}</h2>
      </div>
    </div>
    <span
      class="flex w-full items-center justify-center gap-2 rounded-[4px] halftone-surface bg-accent-3 px-6 py-[15px] text-[17px] font-bold text-on-accent uppercase transition-transform group-active:scale-[0.97]"
    >
      {buttonLabel}
    </span>
  </button>
{:else}
  <div class="flex flex-col gap-4 rounded-[4px] halftone-surface-subtle bg-surface p-5">
    <div class="flex items-center gap-4">
      <img class="aspect-square w-[30%] flex-none rounded-[4px] object-cover opacity-[85%]" src={img} alt="" />
      <div class="flex min-w-0 flex-1 flex-col gap-2">
        <p class="font-serif text-[16px] leading-[1.3] font-medium text-accent">{pretitle}</p>
        <h2 class="font-serif text-[22px] leading-[1.22] font-semibold text-text">{title}</h2>
      </div>
    </div>
    <button
      class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[4px] border-0 halftone-surface bg-accent-3 px-6 py-[15px] text-[17px] font-bold text-on-accent uppercase [font-family:inherit] transition-transform active:scale-[0.98]"
      on:click={onClick}
    >
      {buttonLabel}
    </button>
  </div>
{/if}
