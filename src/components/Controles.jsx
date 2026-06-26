import ReactMarkdown from 'react-markdown';
import { Sliders } from 'lucide-react';
import md from '../../docs_egaand/07_controles_egaand.md?raw';

const estilos = {
  p: props => <p className="mb-4 leading-relaxed text-slate-300" {...props} />,
  h1: props => <h1 className="text-xl font-bold text-white mt-6 mb-3 font-mono border-b border-slate-800 pb-1" {...props} />,
  h2: props => <h2 className="text-lg font-bold text-cyan-400 mt-5 mb-2 font-mono" {...props} />,
  h3: props => <h3 className="text-base font-bold text-slate-200 mt-4 mb-2" {...props} />,
  strong: props => <strong className="text-white font-bold" {...props} />,
  ul: props => <ul className="list-disc list-inside my-3 space-y-1 text-slate-300" {...props} />,
  ol: props => <ol className="list-decimal list-inside my-3 space-y-1 text-slate-300" {...props} />,
  li: props => <li className="text-slate-300" {...props} />,
  code: props => <code className="bg-slate-950 px-1.5 py-0.5 rounded font-mono text-xs text-emerald-400 border border-slate-800" {...props} />,
  pre: props => <pre className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto my-4 shadow-inner" {...props} />
};

export default function Controles() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 shrink-0"><Sliders size={24} /></div>
        <div>
          <h1 className="text-2xl font-bold text-white">Controles de Mitigación y Reglas WAF</h1>
          <span className="text-xs font-mono text-cyan-400">Origen: docs_egaand/07_controles_egaand.md</span>
        </div>
      </div>
      <article className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <ReactMarkdown components={estilos}>{md}</ReactMarkdown>
      </article>
    </div>
  );
}