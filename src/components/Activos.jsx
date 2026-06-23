import { Layers, Database, Sliders, FileText } from 'lucide-react';

export default function Activos() {
  return (
    <div className="space-y-6 text-slate-100 animate-fadeIn">
      
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400 shrink-0">
          <Layers size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Identificación de Activos de Información: ConectaTel (ISP)</h1>
          <span className="text-xs font-mono text-purple-400">Ruta de origen: docs_egaand/05_activos_egaand.md</span>
        </div>
      </div>

      <article className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-6 font-sans text-sm leading-relaxed text-slate-300 shadow-xl">
        
        <p>
          En su calidad de Proveedor de Servicios de Internet (ISP), la postura de ciberseguridad y cumplimiento normativo de ConectaTel depende de la resiliencia de su infraestructura de enrutamiento y la protección de su cartera de clientes. El portal web auditado actúa como el punto de acceso y custodia de tres activos de información primordiales para el negocio.
        </p>

        <p>
          A continuación, se define el pilar de la Triada CIA (Confidencialidad, Integridad o Disponibilidad) que sufre el impacto más devastador en caso de un compromiso de seguridad:
        </p>

        <div className="space-y-6 pt-2">
          
          {/* Activo 1 */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-6 space-y-3">
            <h2 className="text-base font-bold text-purple-400 flex items-center gap-2 border-b border-slate-800 pb-2">
              <Database size={18} className="text-purple-400" />
              Activo 1: Base de datos de suscriptores
            </h2>
            <div className="space-y-2 text-xs font-sans">
              <p><strong className="text-white font-semibold">Descripción del Activo:</strong> Repositorio maestro que concentra la Información Personal Identificable (PII) de clientes residenciales y enlaces corporativos. Contiene nombres completos, RUT, direcciones físicas de instalación de fibra óptica (Drop), correos electrónicos de contacto, datos bancarios para el pago automático y credenciales de autenticación a la sucursal virtual.</p>
              <p><strong className="text-white font-semibold">Pilar CIA con impacto devastador:</strong> <strong className="text-red-400 font-bold underline">Confidencialidad</strong></p>
              <p><strong className="text-white font-semibold">Justificación GRC y de Red:</strong> El impacto más catastrófico sobre este activo es su exfiltración masiva. Al quedar expuesta la PII de los suscriptores, se infringe de forma directa la legislación de protección de datos de carácter personal. En una empresa de telecomunicaciones, la pérdida de confidencialidad de la base de abonados deriva en el secuestro masivo de cuentas, suplantación de identidad para fraudes de telecomunicaciones e ingeniería social, y la desvinculación inmediata de los clientes corporativos hacia la competencia.</p>
            </div>
          </div>

          {/* Activo 2 */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-6 space-y-3">
            <h2 className="text-base font-bold text-blue-400 flex items-center gap-2 border-b border-slate-800 pb-2">
              <Sliders size={18} className="text-blue-400" />
              Activo 2: Perfiles de planes y ancho de banda contratado
            </h2>
            <div className="space-y-2 text-xs font-sans">
              <p><strong className="text-white font-semibold">Descripción del Activo:</strong> Tablas de aprovisionamiento lógico que interactúan con los sistemas BSS/OSS (<em>Business/Operations Support Systems</em>). Dictan los parámetros lógicos de red para cada cliente: perfil de velocidad contratado (ej. 300 Mbps / 1 Gbps), cuotas de navegación, asignación de direcciones IP (estáticas o dinámicas bajo CGNAT) y el estado de habilitación o corte por morosidad.</p>
              <p><strong className="text-white font-semibold">Pilar CIA con impacto devastador:</strong> <strong className="text-amber-400 font-bold underline">Integridad</strong></p>
              <p><strong className="text-white font-semibold">Justificación GRC y de Red:</strong> La alteración no autorizada de estos registros destruye la lógica comercial y de aprovisionamiento del ISP. Si un atacante vulnera la integridad de esta tabla, puede modificar los parámetros en caliente para autoconcederse enlaces simétricos gigabit de forma gratuita, o peor aún, alterar los perfiles de miles de clientes legítimos para degradar su ancho de banda a cero. Esto corrompe los ciclos de facturación del ISP y genera una denegación de servicio lógica sobre las terminales ópticas (ONT) de los abonados.</p>
            </div>
          </div>

          {/* Activo 3 */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-6 space-y-3">
            <h2 className="text-base font-bold text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-2">
              <FileText size={18} className="text-emerald-400" />
              Activo 3: Logs de tráfico y metadatos de conexión
            </h2>
            <div className="space-y-2 text-xs font-sans">
              <p><strong className="text-white font-semibold">Descripción del Activo:</strong> Registros históricos y transaccionales generados por los enrutadores de borde (<em>Edge Routers</em>) y servidores de autenticación RADIUS. Vinculan unívocamente la identidad de un suscriptor con sus sesiones de red, almacenando marcas de tiempo (<em>timestamps</em>), direcciones IP de origen y destino, puertos de red utilizados y el recuento total de paquetes y volumen de tráfico cursado.</p>
              <p><strong className="text-white font-semibold">Pilar CIA con impacto devastador:</strong> <strong className="text-red-400 font-bold underline">Confidencialidad</strong></p>
              <p><strong className="text-white font-semibold">Justificación GRC y de Red:</strong> En el rubro de las telecomunicaciones, la inviolabilidad y el secreto de las comunicaciones están resguardados por garantías constitucionales. Vulnerar la confidencialidad de estos metadatos otorga a un tercero el mapa completo de hábitos de navegación, horarios y servicios consumidos por ciudadanos, empresas estratégicas y entidades gubernamentales locales. Su filtración expone a ConectaTel a litigios penales por violación del secreto de las telecomunicaciones, arriesgando la revocación inmediata de su licencia de operación por parte del ente regulador.</p>
            </div>
          </div>

        </div>

      </article>
    </div>
  );
}