## [PROMPT 00] Directriz Maestra: Procesamiento de Hallazgos
**Archivo destino:** *(Uso transversal como Prompt del Sistema o plantilla base)*

> Actúa como un Auditor Senior en Ciberseguridad y Consultor GRC. A continuación, te proporcionaré un texto base con los hallazgos técnicos de una prueba de penetración o controles de seguridad. Tu objetivo es reestructurar y refinar este texto para un informe corporativo de nivel ingeniería, aplicando estrictamente las siguientes directrices:
> 1. **Tono y Formato:** Utiliza un lenguaje técnico, formal y objetivo (estándar corporativo). Estructura la respuesta en formato Markdown, utilizando jerarquía de títulos (`##`), listas y tablas para facilitar la lectura técnica.
> 2. **Trazabilidad de Activos y Triada CIA:** Vincula obligatoriamente el hallazgo o control con uno de los 5 activos de información definidos para el alcance: Base de Datos de Suscriptores, Parámetros de Planes, Registros de Tráfico, Tokens de Sesión, o Interfaces de Ejecución. Especifica qué pilar de la Triada CIA (Confidencialidad, Integridad, Disponibilidad) se ve afectado.
> 3. **Métricas Estandarizadas:** Si el texto describe una vulnerabilidad, integra una tabla de evaluación bajo el estándar CVSS v3.1, justificando técnicamente el vector de ataque y su severidad en el contexto del negocio.
> 4. **Separación Estricta de Controles:** Al proponer soluciones, separa las medidas tajantemente en: Políticas de Prevención (causa raíz en el código fuente / SSDLC) y Controles de Mitigación (defensa perimetral en red). Respalda citando *OWASP Top 10* y *CIS Controls v8*.
> 5. **Congruencia:** Mantén absoluta coherencia con el contexto de la empresa auditada (Proveedor de Servicios de Internet / ISP) y asegúrate de que los payloads coincidan exactamente con la evidencia visual recopilada.
> 
> **Texto base a procesar:** 

## [PROMPT 01] Resumen Ejecutivo
**Archivo destino:** `01_resumen_egaand.md`

> Actúa como un consultor de ciberseguridad estratégica. Redacta en formato Markdown puro el archivo `01_resumen_egaand.md` para el resumen ejecutivo de ConectaTel (rubro Proveedor de Servicios de Internet / ISP). Estructúralo en 3 secciones con subtítulos `##` y viñetas limpias:
> 1. **Envergadura Operacional y Rol en la Red:** Destacando su rol de nodo crítico de conectividad local.
> 2. **Superficie de Exposición y Activos Custodiados:** Mencionando que el portal de clientes centraliza la autogestión y custodia: Bases de datos de suscriptores, Parámetros de planes contratados y Registros de actividad de red.
> 3. **Riesgo Operacional e Impacto Legal:** Explicando que una brecha paraliza el servicio e infringe las leyes de protección de datos personales, derivando en multas y pérdida de reputación.

## [PROMPT 02] Hallazgo: Inyección SQL (SQLi)
**Archivo destino:** `02_sqli_egaand.md`

> Actúa como un auditor de ciberseguridad web. Redacta en formato Markdown limpio el contenido técnico para el archivo `02_sqli_egaand.md` de la auditoría del portal de ConectaTel. Estructura con:
> 1. **Título principal.**
> 2. **Invocación de la captura obligatoria:** `/!/[Evidencia SQLi](img_egaand/sqli_egaand.png)`
> 3. **Indicación del payload inyectado:** `' OR '1'='1`
> 4. **Explicación técnica:** El backend PHP concatena el input dinámicamente en la consulta SQL sin sanitizar, generando una tautología lógica que burla la autenticación.
> 5. **Métrica CVSS 3.1:** 7.5 (Alta) con el vector `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N`, explicando que expone la base de datos completa de suscriptores de internet.
> 6. **Defensa:** Prepared Statements (Consultas Parametrizadas) y validación estricta de tipos de datos (Type Casting).

## [PROMPT 03] Hallazgo: Cross-Site Scripting (XSS)
**Archivo destino:** `03_xss_egaand.md`

> Actúa como un pentester web. Redacta en formato Markdown puro el contenido para el archivo `03_xss_egaand.md` documentando el ataque de Cross-Site Scripting (XSS Reflejado) en el portal de ConectaTel. Puntos:
> 1. **Título.**
> 2. **Captura:** `/!/[Evidencia XSS](img_egaand/xss_egaand.png)`
> 3. **Payload:** `<script>alert('XSS')</script>` explicando que la web refleja el input en el HTML devuelta al navegador sin codificar entidades.
> 4. **Métrica CVSS 3.1:** 6.1 (Media) con el vector `CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N`, explicando que permite el robo de cookies de sesión de los clientes de la telco.
> 5. **Mitigación:** Codificación de Salida (Output Encoding) y configuración de la cabecera Content-Security-Policy (CSP).

## [PROMPT 04] Hallazgo: Inyección de Comandos
**Archivo destino:** `04_comandos_egaand.md`

> Actúa como especialista de Red Team. Redacta en formato Markdown el archivo `04_comandos_egaand.md` documentando la Inyección de Comandos en el servidor de ConectaTel. Estructúralo con:
> 1. **Título.**
> 2. **Captura:** `/!/[Evidencia Comandos](img_egaand/comandos_egaand.png)`
> 3. **El payload letal:** `127.0.0.1; cat /etc/passwd` explicándolo técnicamente (Linux interpreta el punto y coma `;` como un separador para encadenar instrucciones, ejecutando el ping y leyendo el archivo interno de cuentas de usuario).
> 4. **Métrica CVSS 3.1:** 9.8 (Crítica) con el vector oficial `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`, argumentando que el atacante logra Ejecución Remota de Código (RCE) y toma el control total del servidor del ISP.
> 5. **Remediación:** No pasar inputs del usuario a la terminal del SO y aplicar listas blancas de validación de formato IP.

## [PROMPT 05] Inventario de Activos de Información
**Archivo destino:** `05_activos_egaand.md`

> Actúa como consultor de Gobierno, Riesgo y Cumplimiento (GRC). Redacta en formato Markdown el archivo `05_activos_egaand.md` para ConectaTel. Desarrolla una lista analítica con los 3 activos de información primordiales expuestos en su portal de clientes:
> 1. **Base de datos de suscriptores**
> 2. **Perfiles de planes y ancho de banda asignado**
> 3. **Logs de tráfico y metadatos de conexión**
> 
> Para cada uno, define cuál pilar de la Triada CIA (Confidencialidad, Integridad o Disponibilidad) sufre el impacto más devastador si un atacante lo vulnera, fundamentándolo en el contexto de las telecomunicaciones.

## [PROMPT 06] Justificación de Matriz de Riesgo
**Archivo destino:** `06_matriz_egaand.md`

> Actúa como analista de riesgos informáticos. Redacta en formato Markdown el archivo `06_matriz_egaand.md` explicando la justificación teórica del Mapa de Calor para ConectaTel. Explica brevemente la fórmula Riesgo = Probabilidad x Impacto. Luego, redacta tres párrafos independientes justificando la ubicación de los hallazgos:
> 1. **SQLi en nivel CRÍTICO** (Alta prob. x Impacto Crítico de fuga de datos de suscriptores).
> 2. **Comandos en nivel CRÍTICO** (Alta prob. x Impacto Crítico de RCE sobre el servidor del ISP).
> 3. **XSS en nivel ALTO** (Alta prob. x Impacto Medio de secuestro de sesión de clientes).
> 
> No dibujes tablas ASCII, haz un desarrollo analítico puro.

## [PROMPT 07] Controles de Prevención y Mitigación
**Archivo destino:** `07_controles_egaand.md`

> Actúa como arquitecto de seguridad web basado en OWASP y CIS Controls. Redacta en formato Markdown el archivo `07_controles_egaand.md` para ConectaTel. Divide el texto en dos secciones claras:
> 1. **Políticas de Prevención:** Controles de desarrollo seguro en el código fuente para evitar inyecciones, como parametrización y validación estricta de tipos de entrada.
> 2. **Controles de Mitigación:** Defensas de infraestructura perimetral para contener ataques, proponiendo explícitamente el despliegue de un Web Application Firewall (WAF) y segmentación de red mediante VLANs.

## [PROMPT 08] Plan de Disaster Recovery (DRP)
**Archivo destino:** `08_recuperacion_egaand.md`

> Actúa como un Incident Response Manager (IRM). Redacta en formato Markdown el archivo `08_recuperacion_egaand.md` conteniendo el Plan de Recuperación ante Desastres (DRP) para ConectaTel ante el compromiso total de su servidor vía Inyección de Comandos. Diseña un protocolo en 4 fases secuenciales:
> 1. **Contención:** Aislamiento del host comprometido de la red BGP del ISP.
> 2. **Erradicación:** Eliminación de shells maliciosas y sanitización del código.
> 3. **Recuperación:** Restauración del servicio en un nodo limpio usando respaldos bajo la regla 3-2-1.
> 4. **Cumplimiento Legal:** Notificación obligatoria de la brecha de datos a los suscriptores y a la Subsecretaría de Telecomunicaciones.


