# Cross-Site Scripting (XSS Reflejado) en Portal de ConectaTel

![Evidencia XSS](img_egaand/xss_egaand.png)

## 1. Detalles del Hallazgo y Payload Inyectado
[cite_start]Durante la evaluación de seguridad al portal de clientes de la telco, se identificó una vulnerabilidad de Cross-Site Scripting (XSS) en su variante reflejada[cite: 668, 677].

El ataque fue validado inyectando el siguiente payload en el campo de entrada vulnerable:
[cite_start]`<script>alert('XSS')</script>` [cite: 667, 669]

## 2. Análisis Técnico: ¿Por qué funciona?
[cite_start]La vulnerabilidad se produce porque la aplicación web refleja el input del usuario directamente en la respuesta HTTP devuelta al navegador, omitiendo por completo la codificación de caracteres o cualquier tipo de sanitización[cite: 668, 669]. 

[cite_start]Dado que la página devuelve el texto sin procesar, el equipo de la víctima es incapaz de distinguir la entrada del usuario del código nativo de la página[cite: 669, 675]. [cite_start]En consecuencia, el navegador no lo representa como texto plano, sino que lo interpreta y ejecuta directamente como código JavaScript legítimo[cite: 669, 675].

## 3. Métrica de Gravedad (CVSS v3.1)
* **Puntuación Base:** 6.1 (Media)
* **Vector Oficial:** `CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N`

**Impacto en el Negocio (ConectaTel):**
[cite_start]Mediante esta vulnerabilidad, un atacante puede ejecutar código malicioso diseñado para robar la sesión de otro usuario activo[cite: 676]. En el contexto operativo de un Proveedor de Servicios de Internet (ISP), el robo de cookies de sesión permitiría a un cibercriminal secuestrar las cuentas de los clientes de ConectaTel, facilitando la suplantación de identidad para acceder a la sucursal virtual, exponer el tráfico de red, visualizar datos de facturación o manipular fraudulentamente los planes contratados.

## 4. Política de Prevención y Controles de Mitigación
Para neutralizar esta brecha y proteger a los suscriptores, la arquitectura del frontend y backend debe incorporar las siguientes medidas defensivas:

1. [cite_start]**Codificación de Salida (Output Encoding):** Se debe escapar la salida de forma obligatoria en todos los puntos donde se reflejen datos introducidos por el usuario[cite: 683]. [cite_start]Esto implica convertir caracteres especiales en sus entidades HTML correspondientes (por ejemplo, transformar `<` en `&lt;`), forzando al navegador a renderizar el contenido estrictamente como texto y no como código ejecutable[cite: 683].
2. [cite_start]**Content-Security-Policy (CSP):** Implementar una estricta política de seguridad de contenido configurando la cabecera HTTP `Content-Security-Policy`[cite: 683]. Esta capa adicional de defensa limitará explícitamente desde qué dominios se permite la carga y ejecución de scripts, bloqueando la ejecución de código JavaScript inyectado (inline).