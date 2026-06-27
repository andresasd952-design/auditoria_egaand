import ReactMarkdown from 'react-markdown';
import { Grid } from 'lucide-react';
import md from '../../docs_egaand/06_matriz_egaand.md?raw';

const estilos = {
  p: (props) => <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300" {...props} />,
  h1: (props) => <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3 font-mono border-b border-slate-200 dark:border-slate-800 pb-1" {...props} />,
  h2: (props) => <h2 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 mt-5 mb-2 font-mono" {...props} />,
  h3: (props) => <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mt-4 mb-2" {...props} />,
  strong: (props) => <strong className="text-slate-900 dark:text-white font-bold" {...props} />,
  ul: (props) => <ul className="list-disc list-inside my-3 space-y-1 text-slate-600 dark:text-slate-300" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside my-3 space-y-1 text-slate-600 dark:text-slate-300" {...props} />,
  li: (props) => <li className="text-slate-600 dark:text-slate-300" {...props} />,
  code: (props) => <code className="bg-slate-100 dark:bg-slate-950 px-1.5 py-0.5 rounded font-mono text-xs text-purple-600 dark:text-purple-400 border border-slate-200 dark:border-slate-800" {...props} />,
  pre: (props) => <pre className="bg-slate-100 dark:bg-slate-950 p-4 rounded-xl font-mono text-xs text-emerald-700 dark:text-emerald-400 border border-slate-200 dark:border-slate-800 overflow-x-auto my-4 shadow-inner" {...props} />
};

export default function Matriz() {
  return (
    <div className="space-y-6 animate-fadeIn text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Cabecera de la sección */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="p-2.5 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 rounded-xl text-purple-600 dark:text-purple-400 shrink-0">
          <Grid size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Mapa de Calor (Matriz de Riesgo GRC)</h1>
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">Origen: docs_egaand/06_matriz_egaand.md</span>
        </div>
      </div>

      {/* --- NUEVO BLOQUE: GRILLA VISUAL DE CALOR --- */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl transition-colors duration-300">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold mb-4">
          Representación Gráfica de Exposición Inherente
        </h2>

        <div className="overflow-x-auto pb-2">
          <div className="min-w-[480px] grid grid-cols-4 gap-2 text-center text-xs font-sans">
            
            {/* Cabecera Eje X (Impacto) */}
            <div className="flex items-end justify-center pb-2 font-mono font-bold text-slate-400 dark:text-slate-500 text-[10px]">PROB \ IMP</div>
            <div className="bg-slate-100 dark:bg-slate-800/50 p-2 rounded font-mono font-bold text-slate-600 dark:text-slate-300">LEVE</div>
            <div className="bg-slate-100 dark:bg-slate-800/50 p-2 rounded font-mono font-bold text-slate-600 dark:text-slate-300">MODERADO</div>
            <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 p-2 rounded font-mono font-bold text-red-600 dark:text-red-400">CRÍTICO</div>

            {/* FILA 1: PROBABILIDAD ALTA */}
            <div className="flex items-center justify-center font-mono font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 rounded p-2">ALTA</div>
            
            <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-500/20 bg-amber-50/50 dark:bg-amber-500/5 flex items-center justify-center text-amber-700 dark:text-amber-400 opacity-40">Medio</div>
            
            {/* Celda Alta x Moderado (AQUÍ VA EL XSS) */}
            <div className="p-3 rounded-xl border-2 border-orange-400 dark:border-orange-500 bg-orange-100/80 dark:bg-orange-500/20 flex flex-col justify-between items-center shadow-sm min-h-[85px]">
               <span className="text-[10px] font-mono font-bold uppercase text-orange-700 dark:text-orange-300">Alto</span>
               <span className="px-2 py-0.5 bg-orange-500 text-white font-bold rounded shadow-sm text-[11px] w-full mt-1">XSS #03</span>
            </div>

            {/* Celda Alta x Crítico (AQUÍ VA SQLi y COMANDOS) */}
            <div className="p-3 rounded-xl border-2 border-red-500 dark:border-red-500 bg-red-100 dark:bg-red-600/25 flex flex-col justify-between items-center shadow-md min-h-[85px]">
               <span className="text-[10px] font-mono font-bold uppercase text-red-700 dark:text-red-300">Crítico</span>
               <div className="flex flex-col gap-1 w-full mt-1">
                 <span className="px-2 py-0.5 bg-red-600 text-white font-bold rounded shadow-sm text-[10px]">SQLi #02</span>
                 <span className="px-2 py-0.5 bg-red-600 text-white font-bold rounded shadow-sm text-[10px]">RCE #04</span>
               </div>
            </div>

            {/* FILA 2: PROBABILIDAD MEDIA */}
            <div className="flex items-center justify-center font-mono font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 rounded p-2">MEDIA</div>
            
            <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5 flex items-center justify-center text-emerald-700 dark:text-emerald-400 opacity-40">Bajo</div>
            <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-500/20 bg-amber-50/50 dark:bg-amber-500/5 flex items-center justify-center text-amber-700 dark:text-amber-400 opacity-40">Medio</div>
            <div className="p-3 rounded-xl border border-orange-200 dark:border-orange-500/20 bg-orange-50/50 dark:bg-orange-500/5 flex items-center justify-center text-orange-700 dark:text-orange-400 opacity-40">Alto</div>

            {/* FILA 3: PROBABILIDAD BAJA */}
            <div className="flex items-center justify-center font-mono font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 rounded p-2">BAJA</div>
            
            <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5 flex items-center justify-center text-emerald-700 dark:text-emerald-400 opacity-30">Muy Bajo</div>
            <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5 flex items-center justify-center text-emerald-700 dark:text-emerald-400 opacity-40">Bajo</div>
            <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-500/20 bg-amber-50/50 dark:bg-amber-500/5 flex items-center justify-center text-amber-700 dark:text-amber-400 opacity-40">Medio</div>

          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-3">
          <span>▲ Eje Y: Probabilidad de Ocurrencia</span>
          <span>► Eje X: Impacto en las Operaciones del ISP</span>
        </div>
      </div>

      {/* --- BLOQUE ORIGINAL: JUSTIFICACIÓN TEÓRICA EN MARKDOWN --- */}
      <article className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl transition-colors duration-300">
        <h3 className="text-sm font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
          Desarrollo Teórico y Fundamentación
        </h3>
        <ReactMarkdown components={estilos}>{md}</ReactMarkdown>
      </article>

    </div>
  );
}