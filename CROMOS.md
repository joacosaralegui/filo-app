# Cromos — guía de generación

Álbum de cromos para el sistema de progresión: una carta por filósofo, en el
mismo estilo que `socrates.png` / `logo.png`.

## Método

1. **Pasá `socrates.png` como imagen de referencia** en cada generación. Nano
   banana (Gemini 2.5 Flash Image) condiciona por imagen: la consistencia de
   estilo entre 20 cromos sale de ahí, no de la descripción textual.
2. **Un render por filósofo.** No un grid de 20: cada cromo necesita su propio
   archivo en alta, y si una cara sale mal querés rehacer esa sola.
3. **El bloque de estilo va idéntico siempre.** Lo único que cambia es la línea
   del sujeto.
4. Aspecto **3:4 vertical** (formato carta coleccionable).

## Prompt

Bloque de estilo — copiar tal cual en cada generación:

```
Using the attached image as the exact style reference, create a portrait in the
identical illustration style.

STYLE (match precisely):
Vintage editorial book-plate illustration. A classical marble bust rendered in
fine stippled ink — dense pointillist dot shading for the volumes, crisp thin
ink contour lines, engraving/etching feel. Aged cream paper background with
visible paper grain and subtle risograph misregistration.

COMPOSITION: the bust in three-quarter view, occupying the central two thirds.
Behind it, large flat geometric shapes in solid matte color: a mustard-ochre
circle like a halo, and an olive-green arch (rounded-top window). A small Greek
temple with columns and cypress trees in the middle distance, drawn in fine
olive line work. A botanical branch with olive and rust-colored leaves entering
from one corner, overlapping the foreground.

PALETTE (strict, no other colors): bone cream #faf9ef, olive green #606c38,
mustard ochre #dda15e, rust terracotta #bc6c25, dark ink #283618.
Matte, muted, flat color fills. No gradients, no photorealism, no 3D rendering,
no drop shadows, no lens effects, no text or lettering anywhere.

SUBJECT: [FILÓSOFO + RASGOS]
```

Y la línea del sujeto, por cromo. Los rasgos icónicos importan: sin ellos el
modelo devuelve veinte bustos griegos genéricos.

## Roster (20)

Sacados de los glosarios de los dos cursos. Los rasgos son los mínimos para que
cada uno salga reconocible.

### Moderna — de Montaigne a Hamann

| # | Filósofo | Rasgos para el prompt |
|---|---|---|
| 1 | Michel de Montaigne | balding, high forehead, pointed Renaissance beard, ruff collar |
| 2 | René Descartes | long dark wavy hair to the shoulders, thin moustache, wide lace collar |
| 3 | Thomas Hobbes | elderly, gaunt, skullcap, thin white hair, sharp nose |
| 4 | Baruch Spinoza | dark curly shoulder-length hair, large dark eyes, thin oval face |
| 5 | John Locke | long grey curled wig, heavy-lidded calm eyes, soft jaw |
| 6 | G. W. Leibniz | enormous cascading baroque wig, plump face, small mouth |
| 7 | Voltaire | thin sardonic smile, sunken cheeks, small powdered wig |
| 8 | David Hume | round full face, ruddy heavy cheeks, small powdered wig |
| 9 | Jean-Jacques Rousseau | fur hat, soft round face, dark alert eyes |
| 10 | Immanuel Kant | small thin face, high domed forehead, small powdered wig, sharp chin |

### Contemporánea — desde Nietzsche

| # | Filósofo | Rasgos para el prompt |
|---|---|---|
| 11 | G. W. F. Hegel | severe downturned mouth, heavy jowls, swept-back grey hair, high collar |
| 12 | Karl Marx | enormous full white beard, thick mane of hair, broad forehead |
| 13 | Friedrich Nietzsche | huge drooping walrus moustache, intense deep-set eyes, heavy brow |
| 14 | Sigmund Freud | neatly trimmed grey beard, round wire glasses, cigar |
| 15 | Henri Bergson | high bald domed forehead, thin face, small white moustache |
| 16 | Martin Heidegger | small dark moustache, receding hairline, peasant jacket |
| 17 | Jean-Paul Sartre | round thick-rimmed glasses, one eye askew, receding hair, pipe |
| 18 | Simone de Beauvoir | dark hair swept up in a turban-style updo, strong brows, elegant profile |
| 19 | Hannah Arendt | dark short wavy bob, cigarette holder, arched brows |
| 20 | Michel Foucault | completely bald, round glasses, turtleneck |

## Si aun así querés la hoja de contacto

Sirve como referencia de estilo, no como fuente de los cromos:

```
[BLOQUE DE ESTILO]
COMPOSITION OVERRIDE: a 4x5 grid of 20 separate small square portrait
medallions on a single sheet of aged cream paper, each medallion a different
philosopher bust in the style above, thin ink rule lines separating them,
generous margins. No text, no labels, no names.
```

Contá con que las caras van a salir genéricas: a ese tamaño el modelo no
sostiene el parecido. Es una guía de paleta y de aire, nada más.
