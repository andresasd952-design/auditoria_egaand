# Inyección de Comandos (Command Injection) en Servidor de ConectaTel

![Evidencia Comandos](img_egaand/comandos_egaand.png)

## 1. Detalles del Hallazgo y Payload Inyectado
Durante las pruebas de penetración efectuadas sobre las utilidades de diagnóstico de red del portal de ConectaTel, se logró una intrusión de máximo nivel. El punto de entrada vulnerable permitió la ejecución arbitraria de órdenes en el sistema operativo subyacente.

El ataque se materializó mediante la inyección del siguiente payload letal:
[cite_start]`127.0.0.1; cat /etc/passwd` [cite: 685]

## 2. Análisis Técnico: ¿Por qué funciona?
[cite_start]La vulnerabilidad se desencadena debido a una falla crítica en la sanitización del código: la aplicación web transfiere la entrada del usuario de manera directa y cruda hacia la consola del sistema operativo[cite: 758].

[cite_start]Dentro de la arquitectura de un servidor Linux, el carácter de punto y coma (`;`) es interpretado nativamente como un operador de secuenciación de instrucciones[cite: 752]. [cite_start]Al inyectar este carácter, el servidor encadena la ejecución: primero resuelve de forma rutinaria el comando original (`ping` a la IP 127.0.0.1) y, acto seguido e incondicionalmente, procesa la segunda instrucción introducida por el atacante (`cat /etc/passwd`)[cite: 741, 742, 749]. [cite_start]Esto fuerza al servidor a leer y devolver por pantalla el archivo confidencial que lista las cuentas internas del sistema[cite: 744, 745].

## 3. Métrica de Gravedad (CVSS v3.1)
* **Puntuación Base:** 9.8 (Crítica)
* **Vector Oficial:** `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`

**Impacto en el Negocio (ConectaTel):**
[cite_start]Esta es la vulnerabilidad de mayor severidad detectada en el portal[cite: 754]. [cite_start]La técnica demostrada resulta en una Ejecución Remota de Código (RCE), permitiendo a un individuo externo tomar el control total de la infraestructura tecnológica del ISP[cite: 753]. [cite_start]Con este acceso, un atacante posee la capacidad de instalar software malicioso, eliminar bases de datos en caliente o pivotar hacia otras redes internas, provocando el colapso absoluto de los servicios de telecomunicaciones de ConectaTel y la exposición irrestricta de toda su cartera de clientes[cite: 753].

## 4. Política de Prevención y Controles de Mitigación
Para clausurar este vector de ataque, el equipo de ingeniería debe implementar de inmediato las siguientes medidas arquitectónicas:

1. [cite_start]**Desacoplamiento del Sistema Operativo:** Como regla estricta de seguridad, jamás se debe transferir la entrada del usuario directamente al intérprete de comandos o terminal del servidor[cite: 758].
2. [cite_start]**Listas Blancas (Whitelisting) de Validación:** Se debe aplicar una validación de formato indeclinable en el *backend*, asegurando que el input introducido cumpla exclusivamente con la estructura numérica de una dirección IP, descartando el uso de caracteres especiales (como `;`, `|` o `&&`)[cite: 759].
3. [cite_start]**Uso de APIs Seguras:** Para la ejecución de tareas de red (como hacer un *ping* o un *traceroute*), la aplicación no debe invocar las herramientas nativas de la consola, sino utilizar bibliotecas o APIs de red seguras propias del lenguaje de programación que impidan la ejecución paralela de código[cite: 759].