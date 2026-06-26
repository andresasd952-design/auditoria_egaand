import ReactMarkdown from 'react-markdown';
import { BookOpen } from 'lucide-react';
import contenidoMarkdown from '../../docs_egaand/01_resumen_egaand.md?raw';

export default function Resumen() {
  return (
    <div className="space-y-6 text-slate-100 animate-fadeIn">
      
      {/* Cabecera visual de la sección */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400 shrink-0">
          <BookOpen size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Resumen Ejecutivo de la Auditoría</h1>
          <span className="text-xs font-mono text-cyan-400">Ruta de origen: docs_egaand/01_resumen_egaand.md</span>
        </div>
      </div>

      {/* Contenedor principal con mapeo de componentes */}
      <article className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <div className="font-sans text-sm text-slate-300">
          <ReactMarkdown
            components={{
              // Forzamos un margen inferior grande (mb-5) y un interlineado cómodo en cada párrafo
              p: ({ ...props }) => <p className="mb-5 leading-relaxed text-slate-300" {...props} />,
              
              // Estilizados para los títulos que vengan del Markdown
              h1: ({ ...props }) => <h1 className="text-xl font-bold text-white mt-6 mb-3 font-mono border-b border-slate-800 pb-1" {...props} />,
              h2: ({ ...props }) => <h2 className="text-lg font-bold text-cyan-400 mt-6 mb-3 font-mono" {...props} />,
              h3: ({ ...props }) => <h3 className="text-base font-bold text-slate-200 mt-4 mb-2" {...props} />,
              
              // Resaltados en negrita con blanco brillante para que resalten en el modo oscuro
              strong: ({ ...props }) => <strong className="text-white font-bold" {...props} />,
              
              // Formato limpio para las listas y viñetas
              ul: ({ ...props }) => <ul className="list-disc list-inside my-4 space-y-2 text-slate-300" {...props} />,
              ol: ({ ...props }) => <ol className="list-decimal list-inside my-4 space-y-2 text-slate-300" {...props} />,
              li: ({ ...props }) => <li className="pl-1 text-slate-300" {...props} />,
            }}
          >
            {contenidoMarkdown}
          </ReactMarkdown>
        </div>
      </article>

    </div>
  );
}