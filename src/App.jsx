import { useState } from "react";
import { 
  Shield, 
  BookOpen, 
  Database, 
  Code, 
  Terminal, 
  Layers, 
  Grid, 
  Sliders, 
  RefreshCw, 
  Bot, 
  Zap,
  Github 
} from "lucide-react";

// Importación de los 9 módulos secundarios
import Resumen from "./components/Resumen";
import InyeccionSQL from "./components/InyeccionSQL";
import XSS from "./components/XSS";
import Comandos from "./components/Comandos";
import Activos from "./components/Activos";
import Matriz from "./components/Matriz";
import Controles from "./components/Controles";
import Recuperacion from "./components/Recuperacion";
import Prompts from "./components/Prompts";

export default function App() {
  const [vista, setVista] = useState("resumen");

  // Diccionario maestro de navegación
  const modulos = {
    resumen: { label: "Resumen del Negocio", icon: BookOpen, component: Resumen, file: "Resumen.jsx" },
    sqli: { label: "1. Inyección SQL", icon: Database, component: InyeccionSQL, file: "InyeccionSQL.jsx" },
    xss: { label: "2. XSS Reflejado", icon: Code, component: XSS, file: "XSS.jsx" },
    comandos: { label: "3. Command Injection", icon: Terminal, component: Comandos, file: "Comandos.jsx" },
    activos: { label: "Activos y Riesgos", icon: Layers, component: Activos, file: "Activos.jsx" },
    matriz: { label: "Mapa de Calor (Matriz)", icon: Grid, component: Matriz, file: "Matriz.jsx" },
    controles: { label: "Mitigación y WAF", icon: Sliders, component: Controles, file: "Controles.jsx" },
    recuperacion: { label: "Plan de Desastres (DRP)", icon: RefreshCw, component: Recuperacion, file: "Recuperacion.jsx" },
    prompts: { label: "Bitácora de IA", icon: Bot, component: Prompts, file: "Prompts.jsx" }
  };

  const ModuloActual = modulos[vista].component;

  return (
    <div className="flex h-screen bg-[#070b19] text-slate-100 overflow-hidden font-sans">
      
      {/* ================= BARRA LATERAL IZQUIERDA ================= */}
      <aside className="w-64 bg-[#0a1023] border-r border-slate-800/80 p-4 flex flex-col shrink-0 select-none">
        
        {/* Cabecera / Marca */}
        <div className="flex items-center gap-3 px-2 mb-8 mt-2">
          <div className="p-2 bg-red-600/10 border border-red-500/30 rounded-xl text-red-500">
            <Shield size={24} />
          </div>
          <div>
            <span className="font-bold text-white text-lg block leading-none">ConectaTel</span>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              <span className="text-[10px] font-mono text-slate-400">ISP Audit Portal</span>
            </div>
          </div>
        </div>

        {/* Menú de navegación */}
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider px-2 mb-3">
          Módulos del diagnóstico
        </div>

        <nav className="space-y-1 flex-1">
          {Object.keys(modulos).map((key) => {
            const item = modulos[key];
            const Icono = item.icon;
            const isActive = vista === key;

            return (
              <button
                key={key}
                onClick={() => setVista(key)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-red-600 text-white font-bold shadow-lg shadow-red-600/20"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <Icono size={16} className={isActive ? "text-white" : "text-slate-400"} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

      </aside>

      {/* ================= ZONA CENTRAL DE CONTENIDO ================= */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#070b19]">
        
        {/* Barra superior de información (Breadcrumbs) */}
        <header className="h-16 border-b border-slate-800/80 px-8 flex items-center justify-between shrink-0 bg-[#0a1023]/50 backdrop-blur">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="text-slate-500">auditoria_egaand /</span>
            <span className="text-red-400 font-bold">{modulos[vista].file}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-full font-mono text-xs text-slate-300">
            <Zap size={14} className="text-red-500" />
            <span>Nivel de Seguridad: <strong className="text-slate-400 font-bold">LOW (DVWA)</strong></span>
          </div>
        </header>

        {/* Contenedor dinámico donde se inyecta la vista */}
        <div className="p-8 max-w-6xl mx-auto w-full flex-1 flex flex-col">
          
          <ModuloActual />

          {/* FOOTER EXCLUSIVO DE GITHUB */}
          <footer className="mt-auto pt-12 pb-4 text-center font-mono text-xs">
            <a 
              href="https://github.com/andresasd952-design" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition-all duration-200"
            >
              <Github size={15} />
              <span>Ver perfil de GitHub</span>
            </a>
          </footer>

        </div>

      </main>

    </div>
  );
}