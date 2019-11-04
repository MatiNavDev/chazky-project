## Chasky-Project-Frontend (MERN)

Este proyecto busca poder simular que distintos usuarios quieran viajar y que otros vehiculos quieran
aceptar viajes. El mismo fue realizado utilizando la libreria React junto con Redux para la comparticion de datos y
utilizando una API Rest junto con sockets.

### Objetivo

La idea de esta aplicacion es poder ir eligiendo usuarios y vehiculos e ir combinando los distintos requerimientos y si el vehiculo acepta testear si puede aceptar otros usuarios.

### Casos de prueba planteados

Se busco simular que varios usuarios puedan requerir viajar, y que varios vehiculos puedan requerir adquirir clientes.
Cuando un usuario busca viajar, el flujo seria:
-   Selecciona usuario => se le activan los requerimientos
-   Selecciona que requerimientos quiere que tenga el vehiculo
-   Selecciona si desea compartir Vehiculo
-   Busca Vehiculo.
-   Cancelar Viaje ya aceptado por vehiculo, lo que hace que el mismo usuario sea cancelado y al vehiculo que lo escogio se le remueva este usuario de la lista de usuarios aceptados

Con esto, el usuario se queda "esperando" por nuevos vehiculos que puedan aparecer y puedan aceptar viaje. Por lo cual
el flujo respecto a un vehiculo seria:
-   Selecciona vehiculo => solo le aparece buscar, sin ningun requerimiento posible ya que los mismos se encuentrar ya cargados
    con los vehiculos:
    -   Todo terreno: tiene todos los requerimientos
    -   Moderno y rapido: tiene dichos requerimientos
    -   Modesto: no tiene ningun requerimientos
-   Cuando apreta buscar, se le traen todos los usuarios que pueden viajar con el (ya que cumple los requerimientos) y luego se queda esperano por otros usuarios que puedan aparecer.
-   Los usuarios los puede aceptar o rechazar
    -   Rechazar: lo agrega a lista de no permitidos y mientras el vehiculo se encuentre elegido (es decir, hasta que no finalize) si ese usuario cancelase y volviera a querer buscar vehiculo, este no seria una opcion.
    -   Aceptar: lo agrega a la lista de usuarios Aceptados (que estan viajando con el). Si el usuario comparte viaje, entonces puede aceptar otro usuario que quiera viajar, caso contrario no.
-   Finalizar Viajes: finaliza al vehiculo, y por lo tanto finaliza los viajes de los usuarios que se encuentran conectados

A modo de simplificacion y "volver a empezar desde cero" se agrego el boton "limpiar conexiones" en el header de la app que limpia todos los vehiculos y usuarios conectados. (Mas que nada para evitar tener que finalizar los viajes en cada una de las pestanas)

--- 
### Eliminar Seleccion

Para eliminar usuario o vehiculo seleccionado (sin haber apretado boton buscar), seleccionar el espacio en blanco 

### Cancelar Usuario o Vehiculo elegido

Con volver hacia atras (home) se cancela el elemento seleccionado


