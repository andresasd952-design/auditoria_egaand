# 3. Inyección de Comandos (OS Command Injection) en Servidor de ConectaTel

![Evidencia Comandos](/img_egaand/comandos_egaand.png)
*Figura 3: Explotación de la utilidad de diagnóstico de red. El sistema concatena el payload malicioso, ejecutando el comando 'cat /etc/passwd' y exponiendo los usuarios del sistema operativo.*

## 1. Detalles del Hallazgo y Vector de Explotación

Durante la auditoría de seguridad sobre las utilidades web de diagnóstico de red (herramienta Ping) del portal de **ConectaTel**, se logró una intrusión de criticidad máxima. El punto de entrada vulnerable permitió la ejecución arbitraria de órdenes directamente en el sistema operativo subyacente.

El ataque se materializó inyectando el siguiente payload en el campo de dirección IP, apuntando directamente a las **Interfaces de Ejecución y Enrutamiento Subyacente** del servidor:

`127.0.0.1; cat /etc/passwd`

## 2. Análisis Técnico de la Causa Raíz: ¿Por qué funciona?

La vulnerabilidad se desencadena por una falla crítica en la validación de entrada acoplada al uso inseguro de funciones de ejecución del sistema (como `shell_exec()` o `system()` en PHP). La aplicación web toma el *input* del usuario y lo transfiere de manera directa y cruda hacia el intérprete de comandos del servidor Linux (Bash/sh).

Dentro de la arquitectura de la consola, el carácter de punto y coma (`;`) es interpretado de forma nativa como un operador de secuenciación de instrucciones. Al inyectar este carácter, el atacante fuerza al servidor a encadenar la ejecución: primero resuelve de forma rutinaria el comando original (`ping -c 4 127.0.0.1`) y, acto seguido e incondicionalmente, procesa la segunda instrucción introducida (`cat /etc/passwd`). El servidor procesa ambas órdenes con los privilegios del servicio web y devuelve el *Standard Output* (stdout) directamente a la pantalla del cliente.

## 3. Métrica de Gravedad y Tabla de Evaluación (CVSS v3.1)

Esta es la vulnerabilidad de mayor severidad modelada en la infraestructura del ISP, representando un compromiso total.

| Métrica CVSS v3.1 | Valor Asignado | Justificación Técnica en el Contexto de ConectaTel |
| :--- | :---: | :--- |
| **Vector del Ataque (AV)** | Red (N) | El exploit se envía mediante una petición HTTP estándar desde la internet pública. |
| **Complejidad (AC)** | Baja (L) | Explotación trivial; no requiere evadir mitigaciones de memoria ni condiciones de carrera. |
| **Privilegios (PR)** | Ninguno (N) | Ejecutable de forma anónima desde la superficie pública del portal. |
| **Interacción (UI)** | Ninguna (N) | El ataque es unilateral; no requiere que un administrador interactúe con el payload. |
| **Alcance (S)** | Sin Cambios (U) | El componente afectado y el impacto ocurren dentro del mismo entorno del servidor web. |
| **Confidencialidad (C)** | Alta (H) | Exposición irrestricta de archivos del sistema, configuraciones y credenciales internas. |
| **Integridad (I)** | Alta (H) | Capacidad de modificar, reescribir o eliminar archivos críticos del servidor (Ej: `rm -rf`). |
| **Disponibilidad (A)** | Alta (H) | Posibilidad de apagar servicios, saturar la CPU o destruir bases de datos en caliente. |

* **Puntuación Base Resultante:** **9.8**
* **Calificación de Severidad:** **CRÍTICA**
* **Cadena Vectorial Oficial:** `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`

> **Nota Técnica de Auditoría:** *El impacto de negocio es devastador. Una Ejecución Remota de Código (RCE) permite a un actor de amenaza establecer una puerta trasera (Reverse Shell), tomar el control total de la infraestructura de ConectaTel y pivotar hacia la red troncal (routers y switches core), provocando el colapso absoluto de los servicios de telecomunicaciones.*

## 4. Políticas de Prevención (Tratamiento de la Causa Raíz)

Para clausurar este vector de ataque desde el desarrollo del código fuente, el equipo de ingeniería debe implementar:

1. **Uso de APIs de Lenguaje Seguras (Evitar el OS Shell):** Es la regla de oro. La aplicación no debe invocar las herramientas nativas de la consola (evitar funciones como `exec`, `passthru` o `system`). En su lugar, debe utilizar bibliotecas de red propias del lenguaje (por ejemplo, librerías de sockets o cURL) para realizar diagnósticos, las cuales no interpretan operadores de consola.
2. **Validación de Entrada Estricta (Whitelisting de formato):** Si es absolutamente inevitable pasar el dato a un comando, el backend debe validar mediante una Expresión Regular (Regex) que el *input* cumpla exclusivamente con la estructura numérica de una dirección IPv4 (ej. `^\d{1,3}(\.\d{1,3}){3}$`), rechazando cualquier cadena que contenga letras o caracteres especiales (`;`, `|`, `&&`, `$`).

## 5. Controles de Mitigación y Defensa en Profundidad

Para contener el impacto en caso de que una falla de código persista, se debe blindar la infraestructura subyacente:

* **Aislamiento y Mínimo Privilegio (Ref: CIS Controls v8 - Control 3):** El proceso del servidor web (ej. `www-data` o `apache`) debe ejecutarse con los privilegios más restrictivos posibles, sin permisos de lectura sobre archivos sensibles como `/etc/passwd` ni permisos de escritura fuera de su directorio web (Chroot Jail).
* **Filtrado de Egresos en Firewall (Egress Filtering):** Configurar el firewall perimetral del servidor web para denegar por defecto cualquier conexión saliente hacia internet. Esto neutraliza la capacidad del atacante de descargarse malware adicional (mediante `wget` o `curl`) o de establecer una conexión reversa (Reverse Shell) hacia su propio servidor de comando y control.