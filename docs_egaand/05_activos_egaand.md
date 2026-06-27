# Identificación de Activos de Información: ConectaTel (ISP)

---

En su calidad de Proveedor de Servicios de Internet (ISP), la postura de ciberseguridad y cumplimiento normativo de ConectaTel depende de la resiliencia de su infraestructura de enrutamiento y la protección de su cartera de clientes. El portal web auditado actúa como el punto de exposición y custodia de **cinco activos de información primordiales** para la continuidad del negocio. 

A continuación, se detalla el inventario de estos activos y se define el pilar de la Triada CIA (Confidencialidad, Integridad o Disponibilidad) que sufriría el impacto más devastador en caso de un compromiso de seguridad:

* **Activo 1: Base de Datos de Suscriptores (PII)**
    * **Descripción del Activo:** Repositorio maestro que concentra la Información Personal Identificable (PII) de clientes residenciales y enlaces corporativos. Contiene nombres completos, RUT, direcciones físicas de instalación de fibra óptica (Drop), correos electrónicos de contacto, datos bancarios para pago automático y credenciales.
    * **Pilar CIA con impacto devastador:** **Confidencialidad**
    * **Justificación GRC y de Red:** El impacto más catastrófico sobre este activo es su exfiltración masiva (como el demostrado mediante Inyección SQL). Al quedar expuesta la PII, se infringe directamente la legislación chilena de protección de datos. En telecomunicaciones, esta pérdida de confidencialidad deriva en el secuestro masivo de cuentas, fraudes por ingeniería social y la pérdida de contratos corporativos.

* **Activo 2: Parámetros de Planes y Aprovisionamiento**
    * **Descripción del Activo:** Tablas lógicas que interactúan con los sistemas BSS/OSS (*Business/Operations Support Systems*). Dictan los parámetros de red para cada cliente: perfil de velocidad (ej. 300 Mbps / 1 Gbps), asignación de direcciones IP (estáticas o dinámicas bajo CGNAT) y el estado de corte por morosidad.
    * **Pilar CIA con impacto devastador:** **Integridad**
    * **Justificación GRC y de Red:** La alteración no autorizada de estos registros destruye la lógica comercial del ISP. Si un atacante vulnera la integridad de esta tabla, puede autoconcederse enlaces simétricos gigabit gratuitos, o alterar los perfiles de miles de clientes para degradar su ancho de banda a cero, generando una Denegación de Servicio (DoS) lógica sobre las terminales ópticas (ONT).

* **Activo 3: Registros de Actividad y Logs de Tráfico (NetFlow/Syslog)**
    * **Descripción del Activo:** Registros históricos generados por los enrutadores de borde (*Edge Routers*) y servidores RADIUS. Vinculan unívocamente la identidad de un suscriptor con sus sesiones de red, almacenando *timestamps*, direcciones IP de origen/destino y recuento de paquetes.
    * **Pilar CIA con impacto devastador:** **Confidencialidad**
    * **Justificación GRC y de Red:** En Chile, la inviolabilidad y el secreto de las comunicaciones están resguardados por garantías constitucionales. Vulnerar la confidencialidad de estos metadatos otorga el mapa completo de hábitos de navegación de ciudadanos y empresas estratégicas. Su filtración expone a ConectaTel a litigios penales, arriesgando la revocación de su licencia por parte de la Subtel.

* **Activo 4: Tokens de Sesión y Credenciales de Autogestión**
    * **Descripción del Activo:** Identificadores lógicos (Cookies, JSON Web Tokens) generados por el servidor web para mantener el estado de autenticación continuo de un cliente válido sin que deba reingresar sus credenciales en cada clic.
    * **Pilar CIA con impacto devastador:** **Confidencialidad**
    * **Justificación GRC y de Red:** Como se demostró en el vector de ataque Cross-Site Scripting (XSS), la lectura no autorizada de estos tokens permite a un atacante materializar un secuestro de sesión (*Account Takeover*). Al robar la cookie, el ciberdelincuente suplanta la identidad digital del usuario legítimo ante los sistemas del ISP, eludiendo cualquier control perimetral.

* **Activo 5: Interfaces de Ejecución y Enrutamiento Subyacente**
    * **Descripción del Activo:** Capa de sistema operativo del servidor web y su capacidad de ejecución de binarios de red, los cuales son utilizados lícitamente por el portal para herramientas de diagnóstico (Ping, Traceroute).
    * **Pilar CIA con impacto devastador:** **Disponibilidad**
    * **Justificación GRC y de Red:** Si un atacante logra inyectar comandos del sistema operativo (*OS Command Injection*), adquiere privilegios de Ejecución Remota de Código (RCE). El impacto más devastador es sobre la disponibilidad, ya que el atacante podría utilizar esta cabeza de playa para borrar bases de datos en caliente, apagar interfaces de red o pivotar hacia los *routers core* de ConectaTel, provocando un apagón masivo de los servicios de telecomunicaciones.