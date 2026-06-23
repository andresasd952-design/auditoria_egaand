import { useState } from 'react';
import { 
  Shield, BookOpen, Database, Code, Terminal as TerminalIcon, 
  Layers, Grid, Sliders, RefreshCw, Bot, Server, Activity 
} from 'lucide-react';

// Importación de las 9 pantallas modulares
import Resumen from './components/Resumen';
import InyeccionSQL from './components/InyeccionSQL';
import XSS from './components/XSS';
import Comandos from './components/Comandos';
import Activos from './components/Activos';
import Matriz from './components/Matriz';
import Controles from './components/Controles';
import Recuperacion from './components/Recuperacion';
import Prompts from './components/Prompts';

function App() {
  const [vistaActual, setVistaActual] = useState('Resumen');

  const menuNavegacion = [
    { id: 'Resumen', titulo: 'Resumen del Negocio', icono: <BookOpen size={18} /> },
    { id: 'InyeccionSQL', titulo: '1. Inyección SQL', icono: <Database size={18} /> },
    { id: 'XSS', titulo: '2. XSS Reflejado', icono: <Code size={18} /> },
    { id: 'Comandos', titulo: '3. Command Injection', icono: <TerminalIcon size={18} /> },
    { id: 'Activos', titulo: 'Activos y Riesgos', icono: <Layers size={18} /> },
    { id: 'Matriz', titulo: 'Mapa de Calor (Matriz)', icono: <Grid size={18} /> },
    { id: 'Controles', titulo: 'Mitigación y WAF', icono: <Sliders size={18} /> },
    { id: 'Recuperacion', titulo: 'Plan de Desastres (DRP)', icono: <RefreshCw size={18} /> },
    { id: 'Prompts', titulo: 'Bitácora de IA', icono: <Bot size={18} /> },
  ];

  const renderizarPantalla = () => {
    switch (vistaActual) {
      case 'Resumen': return <Resumen />;
      case 'InyeccionSQL': return <InyeccionSQL />;
      case 'XSS': return <XSS />;
      case 'Comandos': return <Comandos />;
      case 'Activos': return <Activos />;
      case 'Matriz': return <Matriz />;
      case 'Controles': return <Controles />;
      case 'Recuperacion': return <Recuperacion />;
      case 'Prompts': return <Prompts />;
      default: return <Resumen />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 font-sans text-slate-100 overflow-hidden">
      
      {/* BARRA LATERAL IZQUIERDA (SIDEBAR SOC) */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between z-10 shadow-2xl">
        <div>
          {/* Encabezado Marca */}
          <div className="p-6 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
                <Shield size={24} />
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight tracking-wide text-white">Conecta<span className="text-red-500">Tel</span></h1>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  ISP Audit Portal
                </span>
              </div>
            </div>
          </div>

          {/* Menú de botones */}
          <div className="px-3 py-6">
            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 font-mono">
              Módulos del Diagnóstico
            </p>
            <nav className="space-y-1">
              {menuNavegacion.map((item) => {
                const activo = vistaActual === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setVistaActual(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activo 
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/20 font-semibold translate-x-1' 
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <span className={activo ? 'text-white' : 'text-slate-500'}>{item.icono}</span>
                    {item.titulo}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tarjeta inferior de Servidor Activo */}
        <div className="p-4 m-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-mono">
            <span>BGP AS99210</span>
            <span className="text-emerald-400 font-bold">100% UP</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-full"></div>
          </div>
        </div>
      </aside>

      {/* ÁREA CENTRAL DE VISUALIZACIÓN */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950">
        
        {/* Barra superior de migas de pan */}
        <header className="h-16 border-b border-slate-800/80 px-8 flex items-center justify-between bg-slate-900/40 backdrop-blur">
          <div className="flex items-center gap-2 text-sm font-mono text-slate-400">
            <Server size={16} className="text-slate-500" />
            <span>auditoria_egaand</span>
            <span>/</span>
            <span className="text-red-400 font-semibold">{vistaActual}.jsx</span>
          </div>
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs font-mono text-slate-300">
            <Activity size={14} className="text-red-400 animate-spin" />
            <span>Nivel de Seguridad: LOW (DVWA)</span>
          </div>
        </header>

        {/* Contenedor con scroll para las pantallas */}
        <main className="flex-1 overflow-y-auto p-10">
          <div className="max-w-4xl mx-auto">
            {renderizarPantalla()}
          </div>
        </main>

        {/* Pie de página académico */}
        <footer className="h-12 border-t border-slate-800/80 px-8 flex items-center justify-between text-xs text-slate-500 bg-slate-900/20 font-mono">
          <span>Estudiante: Andrés Sebastián Egaña Flores</span>
          <span>Docente: Rubén Schnettler • INACAP Valparaíso (T13034)</span>
        </footer>
      </div>

    </div>
  );
}

export default App;
