# Políticas de Prevención y Controles de Mitigación

Para garantizar la resiliencia del portal de clientes de ConectaTel, se establece una estrategia de defensa en profundidad fundamentada en los marcos normativos de la industria (**OWASP Top 10** y **CIS Controls v8**). Esta estrategia aborda el tratamiento de riesgos desde dos frentes complementarios: la erradicación de las causas raíz durante el ciclo de escritura de código (Prevención) y la contención perimetral en caso de intentos de explotación (Mitigación).

## 1. Políticas de Prevención (Ciclo de Desarrollo Seguro / SSDLC)

La prevención tiene como objetivo evitar que las vulnerabilidades lleguen a existir en el entorno de producción. El equipo de ingeniería de ConectaTel deberá adherirse estrictamente al Ciclo de Desarrollo Seguro (SSDLC), implementando estas directrices obligatorias:

* **Principio de Desconfianza Absoluta (Zero Trust en Input):** Se instaura como norma de arquitectura que "toda entrada proveniente de un cliente es intrínsecamente hostil". Queda prohibido depender de validaciones exclusivas en el lado del cliente (Frontend/HTML5).
* **Consultas Parametrizadas (Defensa contra SQLi):** Para proteger la **«Base de Datos de Suscriptores (PII)»** y los **«Parámetros de Planes y Aprovisionamiento»**, queda prohibida la concatenación dinámica. Toda consulta deberá estructurarse mediante *Prepared Statements* (Ej. PDO en PHP), garantizando que el motor trate la entrada del suscriptor siempre como un dato literal y jamás como código ejecutable.
* **Validación por Listas Blancas (Defensa contra Command Injection):** Para proteger las **«Interfaces de Ejecución y Enrutamiento Subyacente»**, todo formulario de diagnóstico de red deberá validar la entrada bajo un enfoque de aceptación positiva. El backend verificará mediante expresiones regulares (Regex) que el formato sea exclusivamente una dirección IPv4, descartando automáticamente caracteres de secuenciación (como `;`, `|` o `&&`).
* **Codificación Contextual de Salida (Defensa contra XSS):** Para proteger los **«Tokens de Sesión y Credenciales de Autogestión»**, los programadores aplicarán rutinas de *Output Encoding* antes de reflejar cualquier dato en el navegador del usuario. Esto fuerza la transformación de caracteres especiales en entidades HTML seguras (ej. convertir `<` en `&lt;`).

## 2. Controles de Mitigación (Defensa Perimetral y Contención)

Los controles de mitigación asumen que las fallas de código pueden existir transitoriamente; su misión es actuar como una red tecnológica para reducir el impacto de un ataque en curso. Se exige el despliegue de los siguientes mecanismos en la red del ISP:

* **Despliegue de Web Application Firewall (WAF):** Implementar un WAF como proxy inverso perimetral. Este dispositivo inspeccionará el tráfico HTTP/HTTPS en tiempo real mediante el *Core Rule Set* de OWASP, bloqueando en caliente patrones maliciosos conocidos (como el payload `' OR '1'='1' -- ` o la secuencia `; cat /etc/passwd`) antes de que logren tocar el servidor web.
* **Segmentación Lógica de Red mediante VLANs (Ref: CIS Control 12):** Aplicar el principio de mínimo privilegio sobre la topología. Se debe separar tajantemente la VLAN de la Zona Desmilitarizada (DMZ) —donde reside el portal web— de la VLAN de administración interna y la red BSS/OSS. Si un atacante consigue Ejecución Remota de Código (RCE), la barrera de la VLAN contendrá el ataque, impidiendo el movimiento lateral hacia los enrutadores troncales (*routers core*) y protegiendo los **«Registros de Actividad y Logs de Tráfico»**.
* **Hardening de Cabeceras HTTP y Cookies Seguras:**
    * **Content-Security-Policy (CSP):** Configurar el servidor para inyectar la cabecera CSP, restringiendo desde cuáles dominios el navegador puede cargar *scripts*, anulando la ejecución de código JavaScript inyectado por terceros.
    * **Atributo HttpOnly:** Configurar todas las cookies de sesión con las banderas `HttpOnly` y `Secure`. Esto vuelve al token invisible para el motor JavaScript del navegador (DOM), neutralizando por completo el impacto de robo de sesión derivado de una inyección XSS.