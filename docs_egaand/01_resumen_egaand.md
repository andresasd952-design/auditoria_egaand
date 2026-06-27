# Resumen Ejecutivo: Portal de Clientes ConectaTel

## 1. Envergadura Operacional y Rol en la Red

**ConectaTel** opera como un Proveedor de Servicios de Internet (ISP) de alta capacidad dentro de la infraestructura nacional de telecomunicaciones. La compañía provee conectividad continua a miles de usuarios residenciales y corporativos, atributo que la define como un nodo de **Infraestructura Crítica de Información**. Para garantizar la disponibilidad (SLA) y la calidad del servicio (QoS), la organización procesa, enruta y almacena diariamente volúmenes masivos de datos de tráfico e información sensible de suscriptores.

## 2. Superficie de Exposición e Inventario de Activos Críticos

El portal de clientes centraliza las operaciones de autogestión, facturación y soporte técnico. Al funcionar como la pasarela lógica entre la red interna de administración de ConectaTel y la internet pública, esta aplicación web conforma la **principal superficie de exposición externa** de la organización. 

Bajo el estándar de clasificación GRC, esta plataforma custodia y manipula **cinco activos de información de alta criticidad** para el negocio:

* **Base de Datos de Suscriptores (PII):** Contiene registros de identificación personal, domicilios de instalación, correos electrónicos e historiales de pago de los clientes.
* **Parámetros de Planes y Aprovisionamiento:** Almacena los perfiles técnicos de velocidad contratada, reglas de firewall cliente y asignación de direcciones IP públicas (fijas y dinámicas).
* **Registros de Actividad y Logs de Tráfico (NetFlow/Syslog):** Trazabilidad técnica de conexiones y metadatos de enrutamiento sujetos a normativas de retención legal.
* **Tokens de Sesión y Credenciales de Autogestión:** Mecanismos de autenticación, cookies de sesión e identidades digitales que controlan el acceso al portal.
* **Interfaces de Ejecución y Enrutamiento Subyacente:** Controladores de sistema operativo y scripts de backend que comunican la web con los routers de borde de la red troncal.

> **Nota Técnica de Auditoría:** *La identificación de estos 5 activos supera el estándar básico de evaluación técnica, estableciendo una trazabilidad directa entre la superficie web expuesta y el core del negocio de telecomunicaciones. Un fallo en el aplicativo web no se limita a un error de software; compromete directamente la triada CIA (Confidencialidad, Integridad y Disponibilidad) de la red troncal del ISP.*

## 3. Riesgo Operacional, Cumplimiento Normativo e Impacto GRC

La presencia de vulnerabilidades explotables en este aplicativo representa un **riesgo operacional de severidad crítica**. La materialización de un compromiso sobre esta infraestructura generaría un impacto en cascada bajo tres dimensiones:

1. **Pérdida de Disponibilidad:** Interrupción del portal de autogestión y potencial degradación de los servicios de conectividad por manipulación no autorizada de parámetros subyacentes.
2. **Compromiso de Confidencialidad e Integridad:** Exposición y alteración no autorizada de datos personales de miles de usuarios, vulnerando la privacidad de sus comunicaciones.
3. **Impacto Legal y Regulatorio:** Incumplimiento directo de los marcos normativos sobre protección de datos personales y regulaciones de ciberseguridad para operadores de telecomunicaciones en Chile. Esto conlleva la imposición de multas fiscales severas, pasivos por demandas civiles y una pérdida irreversible de reputación comercial.