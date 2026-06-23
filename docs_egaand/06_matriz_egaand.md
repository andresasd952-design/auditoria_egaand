# Justificación Teórica de la Matriz de Riesgo y Mapa de Calor

---

## Metodología de Evaluación de Riesgos

La clasificación de criticidad de los hallazgos técnicos en la infraestructura web de ConectaTel se fundamenta en la metodología de gestión de riesgos corporativos. Para determinar la urgencia de mitigación de cada vulnerabilidad, se aplica la ecuación teórica estándar: **Riesgo = Probabilidad × Impacto**. 

En este modelo analítico, la **Probabilidad** estima qué tan fácil o frecuente resulta para una amenaza explotar la debilidad identificada, evaluada en una escala ascendente desde *Mínima* hasta *Alta*. Esta variable se apoya en las métricas de explotabilidad del vector CVSS (como el vector de acceso y la ausencia de privilegios requeridos). Por otro lado, el **Impacto** mide la magnitud del daño ocasionado al negocio en caso de que el hallazgo se materialice, clasificado desde *Bajo* hasta *Crítico* según la severidad de la afectación sobre los activos de información de la compañía. El producto del cruce de ambas variables sitúa el hallazgo en una celda de criticidad dentro del mapa de calor, donde el color rojo indica que la vulnerabilidad se debe atender primero.

---

## Justificación Analítica de los Hallazgos

### 1. Inyección SQL (SQLi): Riesgo CRÍTICO

Este hallazgo se ubica en la celda de máxima criticidad del mapa de calor, correspondiente al nivel de riesgo **Crítico** (color rojo, de remediación obligatoria e inmediata). Este resultado se justifica analíticamente mediante el cruce de una **Probabilidad Alta** por un **Impacto Crítico**. La probabilidad se clasifica como alta porque el punto de entrada es un formulario público de autenticación web sin validaciones de seguridad, lo que permite a un atacante remoto y sin privilegios lanzar el ataque de forma automatizada y sin interacción humana. El impacto alcanza el nivel crítico porque ConectaTel opera como un Proveedor de Servicios de Internet (ISP); la explotación exitosa expone de forma masiva e íntegra la base de datos maestra de suscriptores. Esto genera una fuga total de información personal identificable y registros de clientes, desencadenando un daño catastrófico a nivel legal y reputacional.

### 2. Inyección de Comandos: Riesgo CRÍTICO

La vulnerabilidad de inyección de comandos en las utilidades de red de ConectaTel se posiciona igualmente en el nivel de riesgo **Crítico**, resultante de multiplicar una **Probabilidad Alta** por un **Impacto Crítico**. Su probabilidad es alta debido a que la falta de sanitización en el backend permite inyectar secuencias de comandos del sistema mediante la simple concatenación de un carácter de punto y coma, facilitando su explotación trivial por la red. El impacto se categoriza como crítico porque el atacante consigue Ejecución Remota de Código (RCE), permitiéndole tomar el control absoluto del servidor del ISP. En el rubro de las telecomunicaciones, controlar el servidor central faculta a un cibercriminal para destruir las bases de datos de abonados, interceptar el tráfico de red de toda la región o provocar un apagón absoluto de los servicios de Internet, destruyendo operacionalmente la organización.

### 3. Cross-Site Scripting (XSS Reflejado): Riesgo ALTO

El hallazgo de Cross-Site Scripting queda clasificado dentro de la celda de riesgo **Alto**, fundamentado teóricamente por la combinación de una **Probabilidad Alta** frente a un **Impacto Medio**. La probabilidad de ocurrencia se sitúa en el extremo superior porque la omisión de codificación de salida en la plataforma convierte al input en un vector fácilmente inyectable a través de enlaces fraudulentos elaborados. Sin embargo, el impacto se clasifica como medio —y no crítico— porque el alcance técnico del ataque no compromete la base de datos ni la terminal de Linux del servidor, sino que se ejecuta de forma cliente-servidor en el navegador de la víctima y requiere de la interacción del usuario (hacer clic en un enlace malicioso). En el ecosistema de ConectaTel, esto permite la suplantación de clientes individuales mediante el robo de cookies de sesión, facilitando el fraude a escala de usuario sin colapsar la infraestructura central.