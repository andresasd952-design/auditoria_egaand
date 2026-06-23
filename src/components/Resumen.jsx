import { ShieldAlert, Server, HardDrive, Cpu } from 'lucide-react';

function Resumen() {
  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner de Cabecera */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700/80 rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 text-slate-700/20 pointer-events-none">
          <Server size={280} />
        </div>
        <div className="max-w-2xl relative z-10">
          <span className="px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full text-red-400 font-mono text-xs uppercase tracking-wider">
            Informe de Diagnóstico Ejecutivo
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-3 mb-2">
            Superficie de Exposición: ConectaTel
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Evaluación de vulnerabilidades web y de infraestructura sobre la sucursal virtual de autogestión de clientes del Proveedor de Servicios de Internet (ISP).
          </p>
        </div>
      </div>

      {/* Grid de 3 Pilares Operacionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition">
          <div className="text-blue-400 mb-3"><Server size={24} /></div>
          <h3 className="font-bold text-white text-base mb-1">Envergadura ISP</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Suministro de conectividad troncal de fibra óptica a miles de usuarios residenciales y enlaces dedicados corporativos a nivel regional.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition">
          <div className="text-emerald-400 mb-3"><Cpu size={24} /></div>
          <h3 className="font-bold text-white text-base mb-1">Núcleo Virtual</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            El portal auditado opera como la sucursal virtual de autogestión, centralizando pagos, cambios de planes y reportes de averías técnicas.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition">
          <div className="text-purple-400 mb-3"><HardDrive size={24} /></div>
          <h3 className="font-bold text-white text-base mb-1">Custodia Crítica</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Almacenamiento en bases de datos de información personal identificable (PII), perfiles lógicos de ancho de banda y metadatos de tráfico.
          </p>
        </div>

      </div>

      {/* Caja de Advertencia de Negocio */}
      <div className="bg-red-950/30 border-2 border-red-500/40 rounded-2xl p-6 flex gap-4 items-start">
        <div className="p-3 bg-red-500 rounded-xl text-white mt-1">
          <ShieldAlert size={24} />
        </div>
        <div className="space-y-1 text-slate-300 text-sm leading-relaxed">
          <h4 className="text-white font-bold text-base flex items-center gap-2">
            <span>Riesgo de Negocio Letal</span>
            <span className="text-xs font-mono bg-red-500/20 text-red-300 px-2 py-0.5 rounded border border-red-500/30">Criterio Transversal</span>
          </h4>
          <p>
            Una vulnerabilidad en este portal no representa una simple falla de software; en el rubro de las telecomunicaciones constituye un vector letal. Su explotación expone la privacidad del tráfico de red de los suscriptores y viola de forma directa la legislación vigente sobre protección de datos personales y ciberseguridad, arriesgando la revocación de la licencia de operación.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Resumen;