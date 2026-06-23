import { RefreshCw, ShieldAlert, Trash2, HardDrive, Scale } from 'lucide-react';

export default function Recuperacion() {
  return (
    <div className="space-y-6 text-slate-100 animate-fadeIn">
      
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 shrink-0">
          <RefreshCw size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Plan de Recuperación ante Desastres (DRP): Compromiso Crítico de Infraestructura</h1>
          <span className="text-xs font-mono text-red-400">Ruta de origen: docs_egaand/08_recuperacion_egaand.md</span>
        </div>
      </div>

      <article className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-6 font-sans text-sm leading-relaxed text-slate-300 shadow-xl">
        
        <p>
          El presente documento establece el Protocolo de Respuesta a Incidentes y Recuperación ante Desastres (DRP) para ConectaTel. Este protocolo se diseña bajo el escenario de máximo impacto: la confirmación de que un atacante ha logrado Ejecución Remota de Código (RCE) y ha tomado el control total del servidor principal a través de una vulnerabilidad de Inyección de Comandos. Ante la inminencia de la destrucción de datos o el secuestro de la red, el Equipo de Respuesta a Incidentes (CSIRT) de ConectaTel deberá ejecutar el siguiente flujo secuencial de cuatro fases.
        </p>

        {/* FASE 1 */}
        <section className="space-y-3 pt-2">
          <h2 className="text-base font-bold text-red-400 border-b border-slate-800 pb-1 font-mono flex items-center gap-2">
            <ShieldAlert size={18} />
            1. FASE DE CONTENCIÓN (Aislamiento de Red)
          </h2>
          <p>
            El objetivo inmediato es detener la hemorragia de datos y evitar el movimiento lateral del atacante hacia la red central (Core) del ISP.
          </p>
          <p>
            Al confirmarse la intrusión, los ingenieros de red deben ejecutar un &quot;Blackhole Routing&quot; lógico, aislando de forma inmediata el servidor web comprometido de la red BGP de ConectaTel. Esto implica revocar instantáneamente la publicación de las rutas IP del portal hacia internet y cortar cualquier túnel interno de comunicación entre la DMZ y las bases de datos maestras de aprovisionamiento BSS/OSS. El servidor vulnerado no debe ser apagado (para preservar la evidencia forense en memoria RAM), pero quedará en cuarentena total, desconectado tanto de la red pública como de las VLANs de administración de la compañía.
          </p>
        </section>

        {/* FASE 2 */}
        <section className="space-y-3 pt-2">
          <h2 className="text-base font-bold text-red-400 border-b border-slate-800 pb-1 font-mono flex items-center gap-2">
            <Trash2 size={18} />
            2. FASE DE ERRADICACIÓN (Sanitización y Eliminación de Amenazas)
          </h2>
          <p>
            Una vez neutralizada la conexión del atacante, el equipo de ciberseguridad procede a la limpieza profunda de la infraestructura.
          </p>
          <p>
            Se asume que el servidor comprometido está en un estado no confiable (contaminado con <em>backdoors</em>, <em>rootkits</em> o <em>shells</em> reversas). Por ello, el protocolo exige la destrucción lógica de las máquinas virtuales afectadas, evitando cualquier intento de &quot;limpiar&quot; el sistema operativo vulnerado. Paralelamente, el equipo de desarrollo debe erradicar la causa raíz a nivel de código fuente: aplicar las validaciones por listas blancas en los formularios de diagnóstico de red, implementar consultas parametrizadas para cerrar las brechas de inyección y configurar la sanitización de salida para anular los vectores XSS. El nuevo código seguro será auditado y congelado en un repositorio limpio.
          </p>
        </section>

        {/* FASE 3 */}
        <section className="space-y-3 pt-2">
          <h2 className="text-base font-bold text-red-400 border-b border-slate-800 pb-1 font-mono flex items-center gap-2">
            <HardDrive size={18} />
            3. FASE DE RECUPERACIÓN (Restauración y Puesta en Marcha)
          </h2>
          <p>
            El objetivo es devolver la operatividad del portal de clientes garantizando un entorno estéril y libre de vulnerabilidades.
          </p>
          <p>
            El servicio se restaurará levantando un nuevo clúster de servidores desde cero (infraestructura inmutable) utilizando el código fuente ya parcheado. Para reconstruir los datos de los suscriptores y perfiles de red, se invocará la política de respaldos bajo el estándar de oro de la industria: la <strong className="text-white">Regla 3-2-1</strong> (3 copias de los datos, en 2 soportes distintos, con 1 copia fuera de sitio/inmutable). El equipo de bases de datos inyectará el último respaldo inmutable validado cronológicamente antes del incidente, asegurando que la información de tráfico y facturación restaurada posea integridad absoluta antes de reconectar el portal a internet.
          </p>
        </section>

        {/* FASE 4 */}
        <section className="space-y-3 pt-2">
          <h2 className="text-base font-bold text-red-400 border-b border-slate-800 pb-1 font-mono flex items-center gap-2">
            <Scale size={18} />
            4. FASE DE CUMPLIMIENTO LEGAL (Notificación y Transparencia)
          </h2>
          <p>
            El último eslabón del DRP aborda las ramificaciones legales y el control de daños reputacionales derivados de la exfiltración de Información Personal Identificable (PII) y metadatos de telecomunicaciones.
          </p>
          <p>
            El departamento Legal y de Riesgos de ConectaTel activará el protocolo de notificación obligatoria estipulado por la legislación vigente de protección de datos y ciberseguridad. Esto incluye un reporte técnico pericial a la Subsecretaría de Telecomunicaciones (Subtel) detallando el vector de ataque y el alcance de la afectación en los servicios regulados. Simultáneamente, se emitirá una comunicación formal, transparente y oportuna a todos los suscriptores afectados, indicando la naturaleza de los datos expuestos, las medidas definitivas de mitigación adoptadas y los pasos a seguir para proteger sus credenciales financieras y de acceso.
          </p>
        </section>

      </article>
    </div>
  );
}