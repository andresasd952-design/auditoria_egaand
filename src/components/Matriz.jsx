import { Grid, AlertTriangle } from 'lucide-react';

export default function Matriz() {
  return (
    <div className="space-y-6 text-slate-100 animate-fadeIn">
      
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400 shrink-0">
          <Grid size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Justificación Teórica de la Matriz de Riesgo y Mapa de Calor</h1>
          <span className="text-xs font-mono text-blue-400">Ruta de origen: docs_egaand/06_matriz_egaand.md</span>
        </div>
      </div>

      {/* REPRESENTACIÓN VISUAL DEL MAPA DE CALOR */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-4 text-center">
          Representación Gráfica del Mapa de Calor ISP
        </span>
        <div className="max-w-xl mx-auto grid grid-cols-4 gap-2 text-center font-mono text-xs">
          <div className="flex items-center justify-center font-bold text-slate-500">Prob \ Imp</div>
          <div className="bg-slate-950 p-2 rounded border border-slate-800 text-slate-400 font-bold">Bajo</div>
          <div className="bg-slate-950 p-2 rounded border border-slate-800 text-slate-400 font-bold">Medio</div>
          <div className="bg-slate-950 p-2 rounded border border-slate-800 text-red-400 font-bold">Crítico</div>
          
          <div className="bg-slate-950 flex items-center justify-center rounded border border-slate-800 font-bold text-slate-300">ALTA</div>
          <div className="bg-emerald-950/40 border border-emerald-800/50 p-3 rounded text-slate-500 flex items-center justify-center">Bajo</div>
          <div className="bg-amber-500/20 border border-amber-500/50 p-3 rounded text-amber-300 font-bold flex flex-col justify-center items-center">
            <span>XSS</span>
            <span className="text-[9px] font-normal opacity-80">(Reflejado)</span>
          </div>
          <div className="bg-red-600/30 border-2 border-red-500 p-3 rounded text-red-300 font-bold flex flex-col justify-center items-center shadow-lg shadow-red-950 animate-pulse">
            <span>SQLi / Comandos</span>
            <span className="text-[9px] font-normal text-white">(Riesgo Máximo)</span>
          </div>
        </div>
      </div>

      <article className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-6 font-sans text-sm leading-relaxed text-slate-300 shadow-xl">
        
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-blue-400 border-b border-slate-800 pb-1 font-mono">
            Metodología de Evaluación de Riesgos
          </h2>
          <p>
            La clasificación de criticidad de los hallazgos técnicos en la infraestructura web de ConectaTel se fundamenta en la metodología de gestión de riesgos corporativos. Para determinar la urgencia de mitigación de cada vulnerabilidad, se aplica la ecuación teórica estándar: <strong className="text-white">Riesgo = Probabilidad × Impacto</strong>.
          </p>
          <p>
            En este modelo analítico, la <strong className="text-white">Probabilidad</strong> estima qué tan fácil o frecuente resulta para una amenaza explotar la debilidad identificada, evaluada en una escala ascendente desde <em>Mínima</em> hasta <em>Alta</em>. Esta variable se apoya en las métricas de explotabilidad del vector CVSS (como el vector de acceso y la ausencia de privilegios requeridos). Por otro lado, el <strong className="text-white">Impacto</strong> mide la magnitud del daño ocasionado al negocio en caso de que el hallazgo se materialice, clasificado desde <em>Bajo</em> hasta <em>Crítico</em> según la severidad de la afectación sobre los activos de información de la compañía. El producto del cruce de ambas variables sitúa el hallazgo en una celda de criticidad dentro del mapa de calor, donde el color rojo indica que la vulnerabilidad se debe atender primero.
          </p>
        </section>

        <section className="space-y-6 pt-2">
          <h2 className="text-lg font-bold text-blue-400 border-b border-slate-800 pb-1 font-mono">
            Justificación Analítica de los Hallazgos
          </h2>

          {/* Hallazgo 1 */}
          <div className="space-y-1 bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
            <h3 className="font-bold text-red-400 text-base flex items-center gap-2 font-mono">
              <span className="h-2 w-2 rounded-full bg-red-500 inline-block"></span>
              1. Inyección SQL (SQLi): Riesgo CRÍTICO
            </h3>
            <p className="text-xs leading-relaxed pt-1 font-sans">
              Este hallazgo se ubica en la celda de máxima criticidad del mapa de calor, correspondiente al nivel de riesgo <strong className="text-white">Crítico</strong> (color rojo, de remediación obligatoria e inmediata). Este resultado se justifica analíticamente mediante el cruce de una <strong className="text-white">Probabilidad Alta</strong> por un <strong className="text-white">Impacto Crítico</strong>. La probabilidad se clasifica como alta porque el punto de entrada es un formulario público de autenticación web sin validaciones de seguridad, lo que permite a un atacante remoto y sin privilegios lanzar el ataque de forma automatizada y sin interacción humana. El impacto alcanza el nivel crítico porque ConectaTel opera como un Proveedor de Servicios de Internet (ISP); la explotación exitosa expone de forma masiva e íntegra la base de datos maestra de suscriptores. Esto genera una fuga total de información personal identificable y registros de clientes, desencadenando un daño catastrófico a nivel legal y reputacional.
            </p>
          </div>

          {/* Hallazgo 2 */}
          <div className="space-y-1 bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
            <h3 className="font-bold text-red-400 text-base flex items-center gap-2 font-mono">
              <span className="h-2 w-2 rounded-full bg-red-500 inline-block"></span>
              2. Inyección de Comandos: Riesgo CRÍTICO
            </h3>
            <p className="text-xs leading-relaxed pt-1 font-sans">
              La vulnerabilidad de inyección de comandos en las utilidades de red de ConectaTel se posiciona igualmente en el nivel de riesgo <strong className="text-white">Crítico</strong>, resultante de multiplicar una <strong className="text-white">Probabilidad Alta</strong> por un <strong className="text-white">Impacto Crítico</strong>. Su probabilidad es alta debido a que la falta de sanitización en el backend permite inyectar secuencias de comandos del sistema mediante la simple concatenación de un carácter de punto y coma, facilitando su explotación trivial por la red. El impacto se categoriza como crítico porque el atacante consigue Ejecución Remota de Código (RCE), permitiéndole tomar el control absoluto del servidor del ISP. En el rubro de las telecomunicaciones, controlar el servidor central faculta a un cibercriminal para destruir las bases de datos de abonados, interceptar el tráfico de red de toda la región o provocar un apagón absoluto de los servicios de Internet, destruyendo operacionalmente la organización.
            </p>
          </div>

          {/* Hallazgo 3 */}
          <div className="space-y-1 bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
            <h3 className="font-bold text-amber-400 text-base flex items-center gap-2 font-mono">
              <span className="h-2 w-2 rounded-full bg-amber-400 inline-block"></span>
              3. Cross-Site Scripting (XSS Reflejado): Riesgo ALTO
            </h3>
            <p className="text-xs leading-relaxed pt-1 font-sans">
              El hallazgo de Cross-Site Scripting queda clasificado dentro de la celda de riesgo <strong className="text-white">Alto</strong>, fundamentado teóricamente por la combinación de una <strong className="text-white">Probabilidad Alta</strong> frente a un <strong className="text-white">Impacto Medio</strong>. La probabilidad de ocurrencia se sitúa en el extremo superior porque la omisión de codificación de salida en la plataforma convierte al input en un vector fácilmente inyectable a través de enlaces fraudulentos elaborados. Sin embargo, el impacto se clasifica como medio —y no crítico— porque el alcance técnico del ataque no compromete la base de datos ni la terminal de Linux del servidor, sino que se ejecuta de forma cliente-servidor en el navegador de la víctima y requiere de la interacción del usuario (hacer clic en un enlace malicioso). En el ecosistema de ConectaTel, esto permite la suplantación de clientes individuales mediante el robo de cookies de sesión, facilitando el fraude a escala de usuario sin colapsar la infraestructura central.
            </p>
          </div>

        </section>

      </article>
    </div>
  );
}