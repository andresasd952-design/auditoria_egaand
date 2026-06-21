# Inyección SQL (SQLi) en Portal de Clientes ConectaTel

![Evidencia SQLi](img_egaand/sqli_egaand.png)

## 1. Detalles del Hallazgo y Payload Inyectado
Durante la fase de explotación en la superficie de acceso al portal de clientes de ConectaTel, se logró eludir el mecanismo de autenticación e interactuar directamente con el motor de base de datos. 

El ataque se concretó introduciendo el siguiente payload en el campo de entrada (User ID):
`' OR '1'='1`

## 2. Análisis Técnico: ¿Por qué funciona?
La vulnerabilidad radica en un fallo crítico de diseño en la arquitectura del lado del servidor. El backend, desarrollado en PHP, captura la entrada del usuario y la concatena dinámicamente de forma directa dentro de la sintaxis de la consulta SQL, sin aplicar ninguna rutina previa de sanitización o escape de caracteres.

Al insertar la comilla simple (`'`), el atacante logra cerrar prematuramente el campo de datos esperado por la consulta. Seguido a esto, el operador `OR` introduce una tautología matemática (`'1'='1`), la cual siempre se evalúa como verdadera. Esto fuerza al motor de base de datos a ignorar las restricciones originales de la consulta y devolver indiscriminadamente todos los registros de la tabla.

## 3. Métrica de Gravedad (CVSS v3.1)
* **Puntuación Base:** 7.5 (Alta)
* **Vector Oficial:** `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N`

**Impacto en el Negocio (ConectaTel):**
Esta vulnerabilidad representa una exposición crítica para un Proveedor de Servicios de Internet. Permite a un atacante no autenticado extraer de manera masiva la base de datos completa de suscriptores, incluyendo información personal, detalles de planes contratados, registros de facturación y tráfico de red, comprometiendo de forma absoluta la confidencialidad (C:H) de los clientes de ConectaTel.

## 4. Política de Prevención y Controles de Mitigación (Defensa)
Para erradicar esta vulnerabilidad desde su causa raíz y proteger los activos de información de ConectaTel, el equipo de desarrollo debe implementar los siguientes controles técnicos:

1. **Consultas Parametrizadas (Prepared Statements):** Es el estándar de oro defensivo. Obliga a la base de datos a precompilar la instrucción SQL con "huecos" (`?`) para los datos. El *input* del usuario se trata estrictamente como un dato literal y jamás como código ejecutable, neutralizando cualquier intento de inyección.
2. **Validación Estricta de Tipos de Datos (Type Casting):** Aplicar listas blancas en los puntos de entrada. Si un campo como el *User ID* solo debe recibir valores numéricos, el backend debe validar y forzar que el dato ingresado sea exclusivamente un número entero antes de interactuar con la base de datos.