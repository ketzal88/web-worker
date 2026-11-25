# Qué es el ROAS, cómo se calcula y cuál es un buen ROAS para tu tienda

> El ROAS es lo que facturás por cada peso de publicidad. Fórmula, ejemplo con números y cómo calcular el ROAS de equilibrio para saber si ganás plata.

Publicado el 2026-11-25 · Actualizado el 2026-11-25 · Gabriel Uccello · https://worker.ar/blog/metricas/que-es-el-roas-como-se-calcula/

## En corto

- El ROAS (Return on Ad Spend) es el valor de las ventas que generan tus anuncios dividido por lo que gastaste en ellos. Gastar $100.000 y vender $400.000 da un ROAS de 4, o 400%.
- No existe un buen ROAS universal. El número que importa es tu ROAS de equilibrio: 1 dividido tu margen de contribución.
- Con 30% de margen de contribución, el equilibrio es 3,33. Con 50%, es 2. Por debajo de ese número perdés plata aunque la plataforma muestre un ROAS alto.
- Meta y Google Ads reportan el ROAS con su propia atribución. Contrastalo siempre con las ventas reales de tu tienda en el mismo período.

El ROAS (Return on Ad Spend, retorno sobre la inversión publicitaria) es cuánto vendés por cada peso que gastás en anuncios. Se calcula dividiendo el valor de las ventas atribuidas a los anuncios por el gasto en esos anuncios, y un resultado de 4 significa que por cada $1 invertido entraron $4 en ventas. Lo que casi nadie aclara: ese 4 no te dice si ganaste o perdiste plata, porque no mira el costo de lo que vendiste.

## Qué es el ROAS

El ROAS es una razón entre ingresos y gasto publicitario. Mide eficiencia de los anuncios, no rentabilidad del negocio.

Google lo define en su ayuda oficial como el valor de conversión promedio que querés obtener por cada dólar que gastás en anuncios (en el [centro de ayuda de Google Ads](https://support.google.com/google-ads/answer/6268637?hl=en), dentro de la explicación de la estrategia de ROAS objetivo). Meta lo calcula a partir del valor de los eventos de compra que le llegan desde el píxel de Meta o desde la app, como describe la [documentación de la Marketing API](https://developers.facebook.com/documentation/ads-commerce/marketing-api/ad-rules/guides/roas-ad-rules).

Dos consecuencias prácticas:

- Si la compra llega a la plataforma sin valor, el ROAS no se puede calcular bien. Antes de mirar el número, verificá que el píxel y la API de conversiones manden el valor de cada compra.
- El ROAS se puede expresar como número (4) o como porcentaje (400%). Es lo mismo. Google lo muestra en la columna "Conv. value/cost" como número, y lo pide en porcentaje cuando configurás un ROAS objetivo.

## Cómo se calcula el ROAS

La fórmula es una sola división, y se hace con el mismo período y la misma moneda en ambos números.

1. Tomá el valor de las ventas atribuidas a los anuncios en el período.
2. Tomá lo que gastaste en esos anuncios en el mismo período.
3. Dividí ventas por gasto.

**ROAS = ventas atribuidas a anuncios ÷ gasto en anuncios**

Google da este ejemplo en su ayuda: $5 en ventas ÷ $1 de gasto × 100% = 500% de ROAS objetivo. En pesos, la cuenta es la misma.

> Ejemplo (números inventados para ilustrar): una campaña gasta $100.000 en el mes y la plataforma le atribuye $400.000 en ventas. ROAS = 400.000 ÷ 100.000 = 4, o 400%.

Dos cuidados al hacer la cuenta:

- **Usá ventas sin IVA si tu margen está calculado sin IVA.** Mezclar un ingreso con IVA y un costo sin IVA infla el ROAS.
- **Fijate qué ventana de atribución estás mirando.** Meta permite reportar con ventanas distintas, por ejemplo clic a 7 días o vista a 1 día, y el ROAS cambia según cuál elijas. Para comparar dos períodos usá siempre la misma.

## Por qué un ROAS alto no te asegura ganancia

El ROAS ignora todo lo que no sea el gasto en anuncios. No descuenta el costo del producto, el envío, la comisión de la pasarela de pago, las devoluciones ni la estructura de tu empresa.

Por eso dos tiendas con el mismo ROAS pueden estar en situaciones opuestas. Una que vende con 60% de margen puede ganar plata con un ROAS de 2. Otra que vende con 20% de margen pierde con un ROAS de 4.

La métrica que sí mira costos es el ROI: divide la ganancia neta por la inversión total.

## Qué ROAS necesitás para no perder plata

El ROAS de equilibrio (breakeven ROAS) es el ROAS mínimo con el que las ventas que traen los anuncios cubren su costo variable y el propio gasto publicitario. Se calcula con tu margen de contribución:

**ROAS de equilibrio = 1 ÷ margen de contribución**

El margen de contribución es el porcentaje del precio que te queda después de restar todo lo que cuesta vender una unidad, menos la publicidad: costo del producto, envío a tu cargo, comisión de cobro, embalaje y cualquier otro costo variable.

Cómo sacarlo, paso a paso:

1. Partí del precio de venta sin IVA.
2. Restá el costo del producto.
3. Restá los costos variables por unidad (envío, comisión de pago, embalaje).
4. Lo que queda es el margen de contribución en pesos. Dividilo por el precio para tener el porcentaje.
5. Calculá 1 ÷ ese porcentaje.

> Ejemplo (números inventados): vendés un producto a $50.000 sin IVA. El costo del producto es $30.000 y los costos variables (envío, comisión de pago, embalaje) suman $5.000. Te quedan $15.000 de margen de contribución, es decir 30%. ROAS de equilibrio = 1 ÷ 0,30 = 3,33.

Comprobalo con un gasto de $100.000 en anuncios:

| ROAS logrado | Ventas generadas | Margen de contribución (30%) | Resultado tras pagar los anuncios |
| --- | --- | --- | --- |
| 2,0 | $200.000 | $60.000 | -$40.000 |
| 3,33 | $333.333 | $100.000 | $0 (equilibrio) |
| 4,0 | $400.000 | $120.000 | +$20.000 |
| 5,0 | $500.000 | $150.000 | +$50.000 |

Estos valores son del ejemplo, no de una cuenta real. Lo que sí es general es la relación entre margen y equilibrio:

| Margen de contribución | ROAS de equilibrio |
| --- | --- |
| 20% | 5,00 |
| 25% | 4,00 |
| 30% | 3,33 |
| 40% | 2,50 |
| 50% | 2,00 |

Cuanto más bajo el margen, más ROAS necesitás solo para quedar en cero. Por eso un ROAS que en una categoría es excelente, en otra es una pérdida.

## Cuál es un buen ROAS para tu tienda

Un buen ROAS es uno que queda por encima del equilibrio por un margen suficiente para pagar lo que no está en el margen de contribución: sueldos, herramientas, alquiler, impuestos sobre la ganancia y la ganancia que querés.

No vamos a darte un número tipo "un buen ROAS es 4" porque no existe uno que sirva para todos. Los promedios que circulan mezclan rubros, márgenes y ticket, y no te dicen nada sobre tus costos. Lo que sí podés hacer:

1. Calculá tu ROAS de equilibrio por producto o por categoría, no uno solo para toda la tienda.
2. Definí tu ROAS objetivo por encima del equilibrio. Una forma simple: decidí cuánto querés que te quede por cada $1 de anuncios y despejá. Si querés que te quede $0,20 por peso invertido con 30% de margen, necesitás ventas de $4 por peso (4 × 0,30 = 1,20, o sea $1 para pagar el anuncio y $0,20 de ganancia).
3. Usá ese número como ROAS objetivo en Google Ads o como referencia para decidir qué campañas escalar o apagar en el Administrador de anuncios de Meta.

El ROAS de equilibrio también cambia con el tiempo. Si subís el precio, bajás el costo del producto o negociás el envío, el margen sube y el equilibrio baja. Recalculalo cuando cambie alguno de esos números.

## Por qué el ROAS de la plataforma no coincide con tus ventas

El ROAS que ves en el Administrador de anuncios de Meta o en Google Ads sale del modelo de atribución de cada plataforma, no de tu contabilidad. Es una estimación útil para comparar campañas entre sí, no una medida exacta de ganancia.

Los motivos habituales de diferencia:

- **Ventanas de atribución distintas.** Meta puede atribuir una compra a un clic de hasta 7 días antes o a una vista del anuncio el día anterior. Tu tienda solo sabe que hubo una venta.
- **Doble conteo entre plataformas.** Un cliente puede haber visto un anuncio en Instagram, hacer clic en uno de Google Ads y comprar. Las dos plataformas pueden reclamar esa venta.
- **Compras que no se miden.** Si el píxel o la API de conversiones fallan o se bloquean, hay ventas que ninguna plataforma ve.
- **Devoluciones y cancelaciones.** El ROAS cuenta la venta cuando se hace, no cuando se confirma que se quedó.

La forma de ordenar esto es comparar, en el mismo período, el gasto total en publicidad contra las ventas totales de la tienda. Si usás Tiendanube, esas ventas las ves en su panel de ventas. Con GA4 podés ver de qué canal vino cada compra, siempre que las UTM estén bien armadas. Ese ratio global (ventas totales ÷ gasto total en anuncios) es más duro que el ROAS de cada plataforma, y es el que mejor te dice si la publicidad en conjunto está funcionando.

## Qué hacer ahora

1. **Calculá tu margen de contribución** de los 3 productos que más vendés y de ahí tu ROAS de equilibrio. Usá la calculadora de rentabilidad de abajo si querés ahorrarte la planilla.
2. **Comparalo con el ROAS que reporta cada plataforma** en los últimos 30 días. Si alguna campaña está por debajo del equilibrio y no es de captación de clientes nuevos con recompra esperada, es candidata a pausar o rediseñar.
3. **Verificá que cada compra llegue con su valor** al píxel de Meta y a Google Ads, y contrastá el total de ventas atribuidas con las ventas reales de tu tienda del mismo mes.

## Preguntas frecuentes

### ¿Qué significa ROAS?

ROAS significa Return on Ad Spend, retorno sobre la inversión publicitaria. Se calcula dividiendo los ingresos que generan los anuncios por lo que gastaste en ellos. Si gastás $100.000 y esos anuncios traen $400.000 en ventas, tu ROAS es 4, o 400%. No descuenta costos, así que no mide ganancia.

### ¿Cuál es un buen ROAS?

Depende de tu margen. Un buen ROAS es el que supera tu ROAS de equilibrio, que es 1 dividido tu margen de contribución. Con 30% de margen el equilibrio es 3,33, con 50% es 2. No existe un número bueno universal, y copiar el de otra tienda con otros costos lleva a decidir mal.

### ¿Cuál es la diferencia entre ROAS y ROI?

El ROAS divide ingresos por gasto en anuncios y no considera otros costos. El ROI divide la ganancia neta por la inversión total, así que sí descuenta costo del producto, envíos y comisiones. Una campaña puede tener un ROAS de 4 y un ROI negativo si el margen es bajo. Para saber si ganás plata, mirá los dos.

### ¿Por qué el ROAS de Meta no coincide con el de mi tienda?

Meta atribuye las compras con su propia ventana de atribución, por ejemplo 7 días después del clic o 1 día después de ver el anuncio. Tu tienda registra ventas por otros criterios, y una misma compra puede aparecer en Meta, Google Ads y GA4 a la vez. Por eso conviene comparar contra las ventas reales del período.

### ¿Cómo se calcula el ROAS en Google Ads?

Google Ads lo muestra como la columna Conv. value/cost, valor de conversión dividido costo. Para pasarlo a porcentaje se multiplica por 100: $5 de ventas por $1 de gasto es 500%. Para que funcione hay que cargar el valor de cada conversión en el seguimiento de conversiones.
