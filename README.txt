LalaStreaming - versión corregida sin límite de imágenes

Esta versión corrige el error:
QuotaExceededError: Failed to execute 'setItem' on 'Storage'

Qué cambió:
- Ya NO se guardan imágenes pesadas en localStorage.
- Ahora subes tus imágenes a GitHub dentro de la carpeta /imagenes.
- En admin.html escribes la ruta de la imagen:
  imagenes/netflix.png
  imagenes/disney.png
  imagenes/crunchyroll.png

Pasos:
1. Sube todos estos archivos a GitHub reemplazando los anteriores.
2. Sube tus imágenes dentro de la carpeta imagenes.
3. Entra a admin.html.
4. Si aún aparece el error anterior, abre consola y ejecuta:
   localStorage.clear()
5. Recarga la página y configura tus productos.

Contraseña inicial:
123456


Actualización profesional agregada:
- Botón visible para cambiar precios a USD / Soles.
- Imagen destacada de oferta arriba del catálogo.
- Carrusel automático de promociones.
- Etiqueta "🔥 Más vendido".
- Contador de clientes atendidos editable desde admin.html.
- Botón flotante "📲 Comprar ahora".
- netflix.png agregado en carpeta /imagenes.

Para usar la imagen de Netflix:
En admin.html, en Netflix, coloca la ruta:
imagenes/netflix.png


Actualización carrusel:
- Se eliminó el carrusel anterior.
- Se colocó el nuevo carrusel arriba de "Oferta destacada".
- Se añadió mensaje: +50 clientes satisfechos.


Corrección:
- Se eliminaron solo las 2 secciones visuales superiores:
  1) banner-section
  2) trust
- Se mantuvo el carrusel arriba de Oferta destacada.
- El carrusel conserva la misma información:
  Promos de la semana, Streaming al mejor precio, Paga fácil y +50 clientes satisfechos.


FIX:
- Se corrigió el carrusel para que no dependa del bloque eliminado "banners".
- El carrusel ahora se genera directamente por ID promoCarousel.
- Se reforzó el CSS de animación scrollPromos.


Actualización panel admin:
- Nuevo diseño organizado tipo dashboard.
- Menú lateral con secciones.
- Oferta destacada editable con vista previa.
- Edición de imagen por ruta: imagenes/nombre.png.
- Se mantienen productos, categorías, carrusel, ventas y configuración.


Corrección carrusel:
- El carrusel vuelve a generarse desde app.js con ID promoCarousel.
- Ya no depende de bloques eliminados.
- Se reforzó el CSS para que se vea y se anime correctamente.
