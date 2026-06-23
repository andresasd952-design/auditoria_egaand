# Plan de Recuperación ante Desastres (DRP): Compromiso Crítico de Infraestructura

El presente documento establece el Protocolo de Respuesta a Incidentes y Recuperación ante Desastres (DRP) para ConectaTel. Este protocolo se diseña bajo el escenario de máximo impacto: la confirmación de que un atacante ha logrado Ejecución Remota de Código (RCE) y ha tomado el control total del servidor principal a través de una vulnerabilidad de Inyección de Comandos. Ante la inminencia de la destrucción de datos o el secuestro de la red, el Equipo de Respuesta a Incidentes (CSIRT) de ConectaTel deberá ejecutar el siguiente flujo secuencial de cuatro fases.

## 1. FASE DE CONTENCIÓN (Aislamiento de Red)

El objetivo inmediato es detener la hemorragia de datos y evitar el movimiento lateral del atacante hacia la red central (Core) del ISP. 

Al confirmarse la intrusión, los ingenieros de red deben ejecutar un "Blackhole Routing" lógico, aislando de forma inmediata el servidor web comprometido de la red BGP de ConectaTel. Esto implica revocar instantáneamente la publicación de las rutas IP del portal hacia internet y cortar cualquier túnel interno de comunicación entre la DMZ y las bases de datos maestras de aprovisionamiento BSS/OSS. El servidor vulnerado no debe ser apagado (para preservar la evidencia forense en memoria RAM), pero quedará en cuarentena total, desconectado tanto de la red pública como de las VLANs de administración de la compañía.

## 2. FASE DE ERRADICACIÓN (Sanitización y Eliminación de Amenazas)

Una vez neutralizada la conexión del atacante, el equipo de ciberseguridad procede a la limpieza profunda de la infraestructura.

Se asume que el servidor comprometido está en un estado no confiable (contaminado con *backdoors*, *rootkits* o *shells* reversas). Por ello, el protocolo exige la destrucción lógica de las máquinas virtuales afectadas, evitando cualquier intento de "limpiar" el sistema operativo vulnerado. Paralelamente, el equipo de desarrollo debe erradicar la causa raíz a nivel de código fuente: aplicar las validaciones por listas blancas en los formularios de diagnóstico de red, implementar consultas parametrizadas para cerrar las brechas de inyección y configurar la sanitización de salida para anular los vectores XSS. El nuevo código seguro será auditado y congelado en un repositorio limpio.

## 3. FASE DE RECUPERACIÓN (Restauración y Puesta en Marcha)

El objetivo es devolver la operatividad del portal de clientes garantizando un entorno estéril y libre de vulnerabilidades.

El servicio se restaurará levantando un nuevo clúster de servidores desde cero (infraestructura inmutable) utilizando el código fuente ya parcheado. Para reconstruir los datos de los suscriptores y perfiles de red, se invocará la política de respaldos bajo el estándar de oro de la industria: la **Regla 3-2-1** (3 copias de los datos, en 2 soportes distintos, con 1 copia fuera de sitio/inmutable). El equipo de bases de datos inyectará el último respaldo inmutable validado cronológicamente antes del incidente, asegurando que la información de tráfico y facturación restaurada posea integridad absoluta antes de reconectar el portal a internet.

## 4. FASE DE CUMPLIMIENTO LEGAL (Notificación y Transparencia)

El último eslabón del DRP aborda las ramificaciones legales y el control de daños reputacionales derivados de la exfiltración de Información Personal Identificable (PII) y metadatos de telecomunicaciones.

El departamento Legal y de Riesgos de ConectaTel activará el protocolo de notificación obligatoria estipulado por la legislación vigente de protección de datos y ciberseguridad. Esto incluye un reporte técnico pericial a la Subsecretaría de Telecomunicaciones (Subtel) detallando el vector de ataque y el alcance de la afectación en los servicios regulados. Simultáneamente, se emitirá una comunicación formal, transparente y oportuna a todos los suscriptores afectados, indicando la naturaleza de los datos expuestos, las medidas definitivas de mitigación adoptadas y los pasos a seguir para proteger sus credenciales financieras y de acceso.