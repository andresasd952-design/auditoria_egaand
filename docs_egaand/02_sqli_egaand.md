# 1. Inyección SQL (SQLi) en Portal de Clientes ConectaTel

![Evidencia SQLi](img_egaand/sqli_egaand.png)
*Figura 1: Evidencia de ejecución exitosa de Inyección SQL en el formulario de autenticación del portal de ConectaTel, evidenciando el ingreso del payload tautológico y el posterior volcado no autorizado de registros.*

## 1. Detalles del Hallazgo y Vector de Explotación

Durante la evaluación de seguridad sobre la superficie de exposición externa del portal de autogestión de **ConectaTel**, se detectó una vulnerabilidad crítica en el formulario de inicio de sesión. Un actor de amenaza no autenticado puede evadir completamente los controles de control de acceso e interactuar de forma directa con el motor de base de datos relacional subyacente.

El compromiso se materializó inyectando la siguiente expresión booleana en el parámetro de entrada `User ID`:

`' OR '1'='1`

## 2. Análisis Técnico de la Causa Raíz: ¿Por qué funciona?

La vulnerabilidad radica en un fallo crítico de diseño en la capa de abstracción de datos del servidor. El backend, desarrollado en PHP, captura el *input* enviado por el cliente y lo concatena de forma aritmética y literal directamente dentro de la sintaxis del comando SQL, omitiendo rutinas previas de saneamiento, escape de caracteres o precompilación.

Al insertar el carácter de comilla simple (`'`), el intérprete rompe el encapsulamiento del string original esperado. Inmediatamente después, el operador lógico `OR` introduce una tautología matemática (`'1'='1`) que el motor de base de datos evalúa permanentemente como verdadera (`True`). Esto destruye la lógica condicional `WHERE` de la consulta, forzando al motor a ignorar la verificación de contraseña y devolver el cursor con la totalidad de los registros alojados en la tabla de usuarios.

## 3. Métrica de Gravedad y Tabla de Evaluación (CVSS v3.1)

Para estandarizar el nivel de riesgo de acuerdo con la escala internacional de 0.0 a 10.0, se modeló el siguiente vector técnico:

| Métrica CVSS v3.1 | Valor Asignado | Justificación Técnica en el Contexto de ConectaTel |
| :--- | :---: | :--- |
| **Vector del Ataque (AV)** | Red (N) | Explotable de forma remota vía Internet pública, sin acceso físico ni red local. |
| **Complejidad (AC)** | Baja (L) | No requiere condiciones de carrera ni recolección previa de información interna. |
| **Privilegios (PR)** | Ninguno (N) | El atacante ejecuta el payload como un usuario anónimo externo. |
| **Interacción (UI)** | Ninguna (N) | Explotación unilateral automática; no requiere inducción de ingeniería social. |
| **Alcance (S)** | Sin Cambios (U) | El impacto queda contenido dentro del alcance del componente vulnerable (DB). |
| **Confidencialidad (C)** | Alta (H) | Permite el volcado absoluto de la **Base de Datos de Suscriptores (PII)**. |
| **Integridad (I) / Disponib. (A)** | Ninguna (N) | El vector evaluado de lectura tautológica no altera ni destruye archivos de red. |

* **Puntuación Base Resultante:** **7.5**
* **Calificación de Severidad:** **ALTA**
* **Cadena Vectorial Oficial:** `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N`

> **Nota Técnica de Auditoría:** *Aunque el puntaje base es 7.5, el impacto en el negocio bajo el estándar GRC asciende a nivel Crítico. Al materializarse el acceso no autorizado a los datos de identidad y facturación de clientes residenciales, ConectaTel incurre en una infracción directa de la ley chilena de protección de datos personales, exponiéndose a sanciones administrativas y pérdida de licencias de operación.*

## 4. Políticas de Prevención (Tratamiento de la Causa Raíz)

Para erradicar la vulnerabilidad a nivel de arquitectura de software, la gerencia de informática debe exigir el cumplimiento obligatorio de las siguientes normativas de codificación segura:

1. **Implementación de Consultas Parametrizadas (Prepared Statements):** Es el estándar normativo de defensa. Obliga al driver de la base de datos (PDO en PHP) a precompilar la estructura de la consulta SQL separada de los datos ingresados. El parámetro del usuario se procesa estrictamente como un tipo de dato literal, neutralizando cualquier intento de ejecución de comandos.
2. **Validación Estricta de Tipos de Datos (Whitelist Type Casting):** Todo punto de entrada debe pasar por una rutina de tipado estricto. Si el parámetro de identificación requiere un número entero, el backend debe forzar la función `intval()` antes de procesar el dato.

## 5. Controles de Mitigación y Defensa en Profundidad

Independientemente del parcheo del código fuente, se deben desplegar controles técnicos de contención referenciados a estándares de la industria:

* **Principio de Mínimo Privilegio en Base de Datos (Ref: CIS Controls v8 - Control 3):** La cuenta de usuario que utiliza la aplicación web para conectarse a la base de datos debe tener denegados los permisos administrativos (`DROP`, `ALTER`, `GRANT`) y el acceso a tablas del sistema subyacente.
* **Inspección de Tráfico mediante WAF (Ref: OWASP Top 10 A03:2021):** Implementar un Web Application Firewall con firmas de detección activas para neutralizar patrones de sintaxis SQL maliciosa (uso de comillas simples sueltas, comandos `UNION SELECT` y expresiones `OR 1=1`) antes de que el paquete alcance al servidor web.
* **Saneamiento de Entrada (Ref: NIST SP 800-53 Rev. 5 - SI-10):** Desplegar rutinas de validación sintáctica estricta para rechazar secuencias de caracteres especiales en campos de autenticación.