import { useState, useEffect } from "react";
import { Shield, BookOpen, Database, Code, Terminal, Layers, Grid, Sliders, RefreshCw, Bot, Zap, Menu, X, Sun, Moon } from "lucide-react";

// Importación de módulos
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Estado del modo oscuro (por defecto Falso = Tema Claro)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  // Efecto para aplicar la clase "dark" al HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

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

    const handleNavigation = (key) => {
      setVista(key);
      setIsMobileMenuOpen(false);
    };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#070b19] text-slate-900 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-300">
      
      {/* SIDEBAR - Responsive */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#0a1023] border-r border-slate-200 dark:border-slate-800/80 p-4 flex flex-col transform transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-2 mb-8 mt-2">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-600/10 border border-red-200 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-500">
                    <Shield size={24} />
                </div>
                <div>
                    <span className="font-bold text-slate-900 dark:text-white text-lg block leading-none">ConectaTel</span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-500 mt-1 block">ISP Audit Portal</span>
                </div>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-500 dark:text-slate-400">
                <X size={24} />
            </button>
        </div>

        <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 mb-3">Módulos</div>
        <nav className="space-y-1 flex-1 overflow-y-auto">
          {Object.keys(modulos).map((key) => {
            const item = modulos[key];
            const Icono = item.icon;
            const isActive = vista === key;
            return (
              <button
                key={key}
                onClick={() => handleNavigation(key)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive ? "bg-red-600 text-white font-bold shadow-lg shadow-red-600/20" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <Icono size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Overlay para móvil */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-slate-50 dark:bg-[#070b19] transition-colors duration-300">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800/80 px-4 md:px-8 flex items-center justify-between shrink-0 bg-white/80 dark:bg-[#0a1023]/50 backdrop-blur transition-colors duration-300">
          <div className="flex items-center gap-3">
             <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-slate-600 dark:text-slate-300">
                <Menu size={24} />
             </button>
             <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
                <span className="hidden md:inline">auditoria_egaand / </span>
                <span className="text-red-500 dark:text-red-400 font-bold">{modulos[vista].file}</span>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-full font-mono text-xs text-slate-600 dark:text-slate-300">
              <Zap size={14} className="text-red-500" />
              <span>Nivel: <strong className="text-slate-800 dark:text-slate-400">LOW</strong></span>
            </div>
            
            {/* Botón para alternar tema */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto w-full flex-1 flex flex-col">
          <ModuloActual />
          <footer className="mt-auto pt-12 pb-4 text-center font-mono text-xs">
            <a href="https://github.com/andresasd952-design" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm">
              <span>Ver perfil de GitHub</span>
            </a>
          </footer>
        </div>
      </main>
    </div>
  );
}