# Proyecto frontend Hackaton JOBMadrid2022  
## Mapa buscador de zonas de descanso cerca de ti. (Bares, restaurantes y parques)

### Background y uso:

Este proyecto web sirve para poder buscar los mejores restaurantes, bares y parques cerca de tu ubicacion, en un area de un tamaño personalizable hasta 1 KM.

Apareceran los 20 resultados mejor valorados en la base de datos de Google Maps al realizar las busquedas debido a que la API no te permite devolver todos los resultados, solo los 20 mejores o los 20 mas cercanos (yo he optado por los mejores). Pueden ser 60 utilizando la paginacion, pero por el tipo de aplicacion y de ejercicio no he visto necesario implementarlo para conseguir una funcionalidad acorde a lo que se busca conseguir con esta web. Tambien debemos de tener en cuenta que el filtrado se hace en base a los tipos asociados en la base de datos de google maps a cada uno de los lugares, y que estos no siempre son 100% acertados. (Aunque para acotar este problema he incluido algunos filtros extra, como para los parques, que solo saldran especificamente los que esten al aire libre a pesar de que haya lugares con la etiqueta de parque, como por ejemplo los parques recreativos de niños pequeños).

Ademas de esto, se han realizado las tareas extra de agregar responsividad a la pagina y el calculo de rutas. Las rutas se pueden calcular tanto haciendo click en los resultados de la pagina, como buscar cualquier destino desde el input correspondiente.

### Stack y API utilizados:

Se han utilizado HTML, CSS y JS como base para la visualizacion y programacion de la pagina web.
Tambien se han utilizado algunos frameworks: JQuery para facilitar el uso de JS y BootStrap para la responsividad de la pagina.
Por ultimo, he utilizado la API de Google Maps para el mapa.

### Contacto:
E-mail: Hupogo2000@protonmail.com
Telefono: (+34) 679932812

Licencia MIT
