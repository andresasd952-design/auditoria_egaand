# 2. Cross-Site Scripting (XSS Reflejado) en Portal de ConectaTel

![Evidencia XSS](/img_egaand/xss_egaand.png)
*Figura 2: Ejecución exitosa de un payload JavaScript (XSS Reflejado) en el navegador del cliente. La alerta demuestra que el aplicativo procesa y renderiza código arbitrario insertado en el parámetro de entrada.*

## 1. Detalles del Hallazgo y Vector de Explotación

Durante la evaluación dinámica de la superficie de exposición del portal de clientes de **ConectaTel**, se identificó una vulnerabilidad de Cross-Site Scripting (XSS) en su variante Reflejada (Non-Persistent). 

El ataque fue validado inyectando el siguiente payload de prueba de concepto (PoC) en un parámetro de entrada no saneado:

`<script>alert('XSS_ConectaTel')</script>`

## 2. Análisis Técnico de la Causa Raíz: ¿Por qué funciona?

La vulnerabilidad se produce por una falla en el ciclo de procesamiento de datos del aplicativo web. El servidor captura el *input* enviado por el usuario mediante una petición HTTP (GET o POST) y lo refleja inmediatamente en el código fuente de la respuesta (DOM), omitiendo por completo rutinas de codificación de salida (Output Encoding) o neutralización de caracteres especiales HTML.

Dado que el servidor devuelve la cadena sin procesar, el navegador de la víctima es incapaz de distinguir entre el código nativo de la página y la entrada inyectada por el atacante. En consecuencia, el motor JavaScript del navegador (como V8) no renderiza la entrada como texto plano, sino que la interpreta y la ejecuta directamente dentro del contexto de confianza del sitio de ConectaTel.

## 3. Métrica de Gravedad y Tabla de Evaluación (CVSS v3.1)

Se procedió a evaluar el hallazgo utilizando el estándar CVSS, destacando que el alcance del ataque salta de la infraestructura del ISP hacia el endpoint del usuario.

| Métrica CVSS v3.1 | Valor Asignado | Justificación Técnica en el Contexto de ConectaTel |
| :--- | :---: | :--- |
| **Vector del Ataque (AV)** | Red (N) | El vector de inyección se distribuye a través de la Internet pública (URL maliciosa). |
| **Complejidad (AC)** | Baja (L) | No existen barreras de seguridad perimetral que impidan la inyección del payload. |
| **Privilegios (PR)** | Ninguno (N) | El actor de amenaza no requiere autenticación previa para elaborar el vector de ataque. |
| **Interacción (UI)** | Requerida (R) | Es mandatorio que el suscriptor de ConectaTel interactúe con el enlace malicioso. |
| **Alcance (S)** | Cambiado (C) | El ataque se origina en el portal, pero el impacto ocurre en el navegador de la víctima. |
| **Confidencialidad (C)** | Baja (L) | Permite la lectura del activo **Tokens de Sesión y Credenciales**. |
| **Integridad (I)** | Baja (L) | Posibilidad de modificar la apariencia del portal (Defacement) en el equipo de la víctima. |
| **Disponibilidad (A)** | Ninguna (N) | La ejecución del script no compromete la disponibilidad del servidor de ConectaTel. |

* **Puntuación Base Resultante:** **6.1**
* **Calificación de Severidad:** **MEDIA**
* **Cadena Vectorial Oficial:** `CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N`

> **Nota Técnica de Auditoría:** *A pesar de poseer una severidad base Media, el impacto de negocio para un ISP es crítico. Mediante la lectura del objeto `document.cookie`, un atacante puede extraer el identificador de sesión activa del suscriptor, facilitando el secuestro completo de la cuenta (Account Takeover) para visualizar datos de facturación o alterar parámetros de red del cliente, vulnerando la confianza depositada en ConectaTel.*

## 4. Políticas de Prevención (Tratamiento de la Causa Raíz)

Para neutralizar esta brecha desde el ciclo de desarrollo seguro (SSDLC), el área de ingeniería de software debe implementar:

1. **Codificación de Salida Contextual (Context-Aware Output Encoding):** Es la defensa principal contra XSS. Antes de que el servidor refleje cualquier dato no confiable en la pantalla del usuario, debe aplicar una función que convierta caracteres peligrosos en sus entidades HTML seguras (Ej: transformar `<` en `&lt;` y `>` en `&gt;`). Esto fuerza al navegador a tratar el contenido estrictamente como texto visual.
2. **Saneamiento de Entrada (Input Validation):** Implementar listas blancas (Whitelisting) mediante expresiones regulares, rechazando cualquier petición que contenga etiquetas HTML o manejadores de eventos (como `onload` o `onerror`) en campos de búsqueda o parámetros URL.

## 5. Controles de Mitigación y Defensa en Profundidad

Adicional a la prevención en código, se deben aplicar los siguientes controles normados por la industria:

* **Implementación de CSP (Ref: OWASP Top 10 A03:2021):** Configurar de forma estricta la cabecera HTTP `Content-Security-Policy`. Esta política actúa como un cortafuegos en el navegador, prohibiendo explícitamente la ejecución de código JavaScript en línea (inline scripts) y restringiendo la carga de recursos únicamente a dominios autorizados por ConectaTel.
* **Protección de Cookies de Sesión (Ref: CIS Controls v8 - Control 16):** Configurar las banderas `HttpOnly` y `Secure` en todas las cookies de autenticación. El atributo `HttpOnly` volverá el token de sesión invisible e inaccesible para cualquier script ejecutado a través del DOM, anulando la efectividad del ataque de robo de sesión.