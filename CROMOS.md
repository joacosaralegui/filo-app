# Cromos — guía de generación

Álbum de cromos para el sistema de progresión: una carta por filósofo, en el
mismo estilo que `arte/socrates.png` / `arte/logo.png`.

## Método

1. **Pasá `arte/socrates.png` como imagen de referencia** en cada generación. Nano
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

## Roster (22)

Sacados de los glosarios de los dos cursos. Los rasgos son los mínimos para que
cada uno salga reconocible.

### Moderna — de Montaigne a Marx

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
| 11 | J. G. Fichte | severe hollow-cheeked face, sharp aquiline nose, short brushed-forward hair, high stiff collar |
| 12 | F. W. J. Schelling | youthful broad face, wide-set intense eyes, tousled dark curls, loose romantic cravat |
| 13 | G. W. F. Hegel | severe downturned mouth, heavy jowls, swept-back grey hair, high collar |
| 14 | Karl Marx | enormous full white beard, thick mane of hair, broad forehead |

### Contemporánea — desde Nietzsche

| # | Filósofo | Rasgos para el prompt |
|---|---|---|
| 1 | Friedrich Nietzsche | huge drooping walrus moustache, intense deep-set eyes, heavy brow |
| 2 | Sigmund Freud | neatly trimmed grey beard, round wire glasses, cigar |
| 3 | Henri Bergson | high bald domed forehead, thin face, small white moustache |
| 4 | Martin Heidegger | small dark moustache, receding hairline, peasant jacket |
| 5 | Jean-Paul Sartre | round thick-rimmed glasses, one eye askew, receding hair, pipe |
| 6 | Simone de Beauvoir | dark hair swept up in a turban-style updo, strong brows, elegant profile |
| 7 | Hannah Arendt | dark short wavy bob, cigarette holder, arched brows |
| 8 | Michel Foucault | completely bald, round glasses, turtleneck |

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

---

# Cromos de ideas (complemento)

Las 20 clases que no tienen un pensador como cromo. Con estos, cada una de las
40 clases desbloquea exactamente un cromo.

Mismo bloque de estilo que los retratos (medallón circular, disco de color
plano, hojas de laurel, grabado punteado, paleta de la app), cambiando el
sujeto: en vez de un busto, un objeto o escena simbólica.

## Moderna

| Clase | Cromo | Descripción para generar |
|---|---|---|
| 2 · La nueva ciencia | La matematización de la naturaleza | an armillary sphere beside a telescope, over a page of geometric diagrams |
| 10 · La Ilustración en Inglaterra | El librepensamiento | a coffee-house table with scattered pamphlets and a burning candle |
| 12 · La Aufklärung alemana | Aufklärung | an oil lamp illuminating an open book, rays spreading from the flame |
| 13 · Lessing | La parábola de los tres anillos | three interlocking golden rings resting on velvet |
| 15 · Kant y la minoría de edad | Sapere aude | a hand breaking a thin chain, light entering through an open doorway |
| 16 · Hamann | La metacrítica de la razón | a quill pen laid across a page of geometric proofs, ink blotting the figures |
| 19 · El romanticismo de Jena | El Romanticismo | a lone figure seen from behind facing a stormy mountain range |

## Contemporánea

| Clase | Cromo | Descripción para generar |
|---|---|---|
| 3 · El leninismo | Acelerar la historia | a steam locomotive rushing forward, a red star on its front |
| 5 · El modernismo y la vanguardia | La vanguardia | a shattered violin and fragmented geometric planes, cubist arrangement |
| 6 · La fenomenología | A las cosas mismas | a single clay pitcher on a table, radiating observation lines from an eye |
| 9 · La Escuela de Frankfurt | La teoría crítica | a cracked gramophone horn above a grid of city rooftops |
| 12 · Los hijos de Husserl | El rostro del otro | two classical profiles facing each other, almost touching |
| 13 · Marxismo revisionista | La praxis | a worker's hammer resting on an open book |
| 14 · Estructuralismo y antropología | La estructura | a woven textile pattern dissolving into a diagram of knots, a tribal mask |
| 15 · Girard | El chivo expiatorio | a goat standing alone before a crowd of shadowed silhouettes |
| 17 · Derrida | La deconstrucción | a printed word unravelling into loose threads at its edges |
| 18 · La antipolítica | Vivir en la verdad | a single candle burning in a dark window |
| 19 · La controversia Heidegger | La controversia | a wooden lectern split in two, papers scattered |
| 20 · De la modernidad a la posmodernidad | La posmodernidad | a hall of mirrors reflecting the same classical bust endlessly |
