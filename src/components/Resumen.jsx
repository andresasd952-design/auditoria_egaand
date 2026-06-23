import { BookOpen } from 'lucide-react';

export default function Resumen() {
  return (
    <div className="space-y-6 text-slate-100 animate-fadeIn">
      
      {/* Barra superior de contexto */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 shrink-0">
          <BookOpen size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Resumen Ejecutivo: Portal de Clientes ConectaTel</h1>
          <span className="text-xs font-mono text-red-400">Ruta de origen: docs_egaand/01_resumen_egaand.md</span>
        </div>
      </div>

      {/* CONTENEDOR VERBATIM (Copia 100% literal del Markdown) */}
      <article className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-6 font-sans text-sm leading-relaxed text-slate-300 shadow-xl">
        
        <p>
          ConectaTel se posiciona como un pilar fundamental en la infraestructura de telecomunicaciones, operando como un Proveedor de Servicios de Internet (ISP) de alta capacidad. La envergadura operacional de la compañía abarca el suministro ininterrumpido de conectividad a miles de usuarios, lo que la convierte en una entidad crítica para el ecosistema digital local. Como eje central de estas operaciones, la organización procesa, enruta y almacena diariamente volúmenes masivos de información confidencial, garantizando la estabilidad, disponibilidad y calidad del servicio para suscriptores tanto residenciales como corporativos.
        </p>

        <p>
          El ecosistema digital de la empresa tiene como núcleo su portal de clientes, el cual funciona como una sucursal virtual integral de autogestión y administración. Esta plataforma ha sido diseñada para centralizar la interacción continua con los usuarios, custodiando activos de información sumamente críticos para el negocio: la base de datos personal de los suscriptores, el detalle de los planes contratados y los registros de tráfico de la red. Al ser el punto de convergencia directo entre la infraestructura interna de ConectaTel y el acceso público en internet, este portal representa la superficie de exposición más sensible de la organización.
        </p>

        <p>
          En consecuencia, cualquier vulnerabilidad presente en este portal trasciende la categoría de una simple falla técnica de software para convertirse en un riesgo de negocio de nivel letal. La explotación de debilidades en esta infraestructura no solo compromete la continuity operativa de la compañía, sino que expone directamente la privacidad del tráfico de telecomunicaciones de los clientes. Una brecha de esta magnitud provocaría una violación severa a la normativa legal vigente sobre protección de datos personales, desencadenando daños reputacionales irreversibles, sanciones económicas paralizantes por parte de los entes reguladores y la pérdida absoluta de la confianza del mercado.
        </p>

      </article>
    </div>
  );
}