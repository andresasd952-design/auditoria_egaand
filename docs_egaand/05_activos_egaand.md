# Identificación de Activos de Información: ConectaTel (ISP)

---

En su calidad de Proveedor de Servicios de Internet (ISP), la postura de ciberseguridad y cumplimiento normativo de ConectaTel depende de la resiliencia de su infraestructura de enrutamiento y la protección de su cartera de clientes. El portal web auditado actúa como el punto de acceso y custodia de tres activos de información primordiales para el negocio. 

A continuación, se define el pilar de la Triada CIA (Confidencialidad, Integridad o Disponibilidad) que sufre el impacto más devastador en caso de un compromiso de seguridad:

*   **Activo 1: Base de datos de suscriptores**
    *   **Descripción del Activo:** Repositorio maestro que concentra la Información Personal Identificable (PII) de clientes residenciales y enlaces corporativos. Contiene nombres completos, RUT, direcciones físicas de instalación de fibra óptica (Drop), correos electrónicos de contacto, datos bancarios para el pago automático y credenciales de autenticación a la sucursal virtual.
    *   **Pilar CIA con impacto devastador:** **Confidencialidad**
    *   **Justificación GRC y de Red:** El impacto más catastrófico sobre este activo es su exfiltración masiva. Al quedar expuesta la PII de los suscriptores, se infringe de forma directa la legislación de protección de datos de carácter personal. En una empresa de telecomunicaciones, la pérdida de confidencialidad de la base de abonados deriva en el secuestro masivo de cuentas, suplantación de identidad para fraudes de telecomunicaciones e ingeniería social, y la desvinculación inmediata de los clientes corporativos hacia la competencia.

*   **Activo 2: Perfiles de planes y ancho de banda contratado**
    *   **Descripción del Activo:** Tablas de aprovisionamiento lógico que interactúan con los sistemas BSS/OSS (*Business/Operations Support Systems*). Dictan los parámetros lógicos de red para cada cliente: perfil de velocidad contratado (ej. 300 Mbps / 1 Gbps), cuotas de navegación, asignación de direcciones IP (estáticas o dinámicas bajo CGNAT) y el estado de habilitación o corte por morosidad.
    *   **Pilar CIA con impacto devastador:** **Integridad**
    *   **Justificación GRC y de Red:** La alteración no autorizada de estos registros destruye la lógica comercial y de aprovisionamiento del ISP. Si un atacante vulnera la integridad de esta tabla, puede modificar los parámetros en caliente para autoconcederse enlaces simétricos gigabit de forma gratuita, o peor aún, alterar los perfiles de miles de clientes legítimos para degradar su ancho de banda a cero. Esto corrompe los ciclos de facturación del ISP y genera una denegación de servicio lógica sobre las terminales ópticas (ONT) de los abonados.

*   **Activo 3: Logs de tráfico y metadatos de conexión**
    *   **Descripción del Activo:** Registros históricos y transaccionales generados por los enrutadores de borde (*Edge Routers*) y servidores de autenticación RADIUS. Vinculan unívocamente la identidad de un suscriptor con sus sesiones de red, almacenando marcas de tiempo (*timestamps*), direcciones IP de origen y destino, puertos de red utilizados y el recuento total de paquetes y volumen de tráfico cursado.
    *   **Pilar CIA con impacto devastador:** **Confidencialidad**
    *   **Justificación GRC y de Red:** En el rubro de las telecomunicaciones, la inviolabilidad y el secreto de las comunicaciones están resguardados por garantías constitucionales. Vulnerar la confidencialidad de estos metadatos otorga a un tercero el mapa completo de hábitos de navegación, horarios y servicios consumidos por ciudadanos, empresas estratégicas y entidades gubernamentales locales. Su filtración expone a ConectaTel a litigios penales por violación del secreto de las telecomunicaciones, arriesgando la revocación inmediata de su licencia de operación por parte del ente regulador.