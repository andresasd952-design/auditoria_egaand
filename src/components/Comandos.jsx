import ReactMarkdown from 'react-markdown';
import { Terminal } from 'lucide-react';
import md from '../../docs_egaand/04_comandos_egaand.md?raw';

const estilos = {
  p: (props) => <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300" {...props} />,
  h1: (props) => <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3 font-mono border-b border-slate-200 dark:border-slate-800 pb-1" {...props} />,
  h2: (props) => <h2 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 mt-5 mb-2 font-mono" {...props} />,
  h3: (props) => <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mt-4 mb-2" {...props} />,
  strong: (props) => <strong className="text-slate-900 dark:text-white font-bold" {...props} />,
  ul: (props) => <ul className="list-disc list-inside my-3 space-y-1 text-slate-600 dark:text-slate-300" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside my-3 space-y-1 text-slate-600 dark:text-slate-300" {...props} />,
  li: (props) => <li className="text-slate-600 dark:text-slate-300" {...props} />,
  code: (props) => <code className="bg-slate-100 dark:bg-slate-950 px-1.5 py-0.5 rounded font-mono text-xs text-red-600 dark:text-red-400 border border-slate-200 dark:border-slate-800" {...props} />,
  pre: (props) => <pre className="bg-slate-100 dark:bg-slate-950 p-4 rounded-xl font-mono text-xs text-emerald-700 dark:text-emerald-400 border border-slate-200 dark:border-slate-800 overflow-x-auto my-4 shadow-inner" {...props} />
};

export default function Comandos() {
  return (
    <div className="space-y-6 animate-fadeIn text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="p-2.5 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400 shrink-0">
          <Terminal size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">3. Command Injection</h1>
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">Origen: docs_egaand/04_comandos_egaand.md</span>
        </div>
      </div>
      <article className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl transition-colors duration-300">
        <ReactMarkdown components={estilos}>{md}</ReactMarkdown>
      </article>
    </div>
  );
}