import { Bot, MessageSquare, CheckCircle, Wrench, Sparkles } from 'lucide-react';

export default function Prompts() {
  return (
    <div className="space-y-6 text-slate-100 animate-fadeIn">
      
      {/* Barra superior de contexto */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 shrink-0">
          <Bot size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Bitácora de Uso de Inteligencia Artificial y Reflexión</h1>
          <span className="text-xs font-mono text-cyan-400">Ruta de origen: docs_egaand/09_prompts_egaand.md</span>
        </div>
      </div>

      {/* CONTENEDOR VERBATIM (Copia literal del Markdown) */}
      <article className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-8 font-sans text-sm leading-relaxed text-slate-300 shadow-xl">
        
        {/* Metadatos de la bitácora */}
        <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div><strong className="text-white">Proyecto:</strong> auditoria_egaand</div>
          <div><strong className="text-white">Entidad Auditada:</strong> ConectaTel (ISP)</div>
          <div><strong className="text-white">Herramientas IA Empleadas:</strong> Google Gemini / GitHub Copilot Chat</div>
          <div className="md:col-span-2 text-slate-400">
            <strong className="text-white">Objetivo de la Bitácora:</strong> Evidenciar el uso dirigido, crítico y validado de asistentes de Inteligencia Artificial generativa durante el ciclo de auditoría (Criterio Transversal).
          </div>
        </div>

        {/* SECCIÓN 1: Interacciones */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-cyan-400 border-b border-slate-800 pb-1 font-mono flex items-center gap-2">
            <MessageSquare size={18} />
            1. Registro de Interacciones e Ingeniería de Prompts
          </h2>

          {/* Interacción A */}
          <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800/80 space-y-3">
            <h3 className="text-white font-bold text-sm font-mono flex items-center gap-2">
              <span className="text-cyan-400">###</span> Interacción A: Contextualización del Negocio (Resumen Ejecutivo)
            </h3>
            <div className="space-y-2 text-xs font-sans pl-2 border-l-2 border-cyan-500/40">
              <p><strong className="text-white">Prompt inyectado:</strong> <em>&quot;Actúa como un consultor de ciberseguridad y redactor técnico. Redacta en formato Markdown estándar el resumen ejecutivo para la auditoría de ConectaTel. El contexto de negocio es un Proveedor de Servicios de Internet (ISP) cuyo portal de clientes custodia datos críticos: suscriptores, planes y tráfico. Redacta 3 párrafos explicando: 1) Envergadura operacional del ISP, 2) El portal como sucursal virtual, y 3) Por qué una vulnerabilidad aquí es un riesgo de negocio letal bajo la ley de protección de datos.&quot;</em></p>
              <p><strong className="text-white">Sección de destino:</strong> <code className="text-cyan-300 font-mono">01_resumen_egaand.md</code></p>
              <p className="flex gap-2 items-start"><CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" /> <span><strong className="text-white">Qué se aceptó:</strong> La estructura lógica de tres párrafos y la vinculación de una brecha de software con la legislación de datos personales.</span></p>
              <p className="flex gap-2 items-start"><Wrench size={14} className="text-amber-400 shrink-0 mt-0.5" /> <span><strong className="text-white">Qué se corrigió / refinó:</strong> Se eliminaron metadatos de cabecera generados por la IA para evitar redundancias visuales en el renderizado web posterior.</span></p>
            </div>
          </div>

          {/* Interacción B */}
          <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800/80 space-y-3">
            <h3 className="text-white font-bold text-sm font-mono flex items-center gap-2">
              <span className="text-cyan-400">###</span> Interacción B: Documentación Técnica de Explotación (Los 3 Ataques)
            </h3>
            <div className="space-y-2 text-xs font-sans pl-2 border-l-2 border-cyan-500/40">
              <p><strong className="text-white">Prompt inyectado (Caso de muestra: Command Injection):</strong> <em>&quot;Actúa como especialista de Red Team. Documenta en Markdown estricto el ataque de Inyección de Comandos en el servidor de ConectaTel. Estructúralo con: 1) Título, 2) Invocación de captura exacta: ![Evidencia Comandos](img_egaand/comandos_egaand.png), 3) Payload: &#39;127.0.0.1; cat /etc/passwd&#39;, 4) Explicación técnica de cómo Linux interpreta el carácter &#39;;&#39; como secuenciador, 5) Métrica CVSS 3.1 justificando un 9.8 (Crítica) por Ejecución Remota de Código (RCE), y 6) Remediación mediante listas blancas y desacoplamiento de la consola.&quot;</em></p>
              <p><strong className="text-white">Secciones de destino:</strong> <code className="text-cyan-300 font-mono">02_sqli_egaand.md</code>, <code className="text-cyan-300 font-mono">03_xss_egaand.md</code>, <code className="text-cyan-300 font-mono">04_comandos_egaand.md</code></p>
              <p className="flex gap-2 items-start"><CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" /> <span><strong className="text-white">Qué se aceptó:</strong> La explicación nativa de bajo nivel sobre el comportamiento del procesador de comandos de Linux y los cálculos matemáticos del vector CVSS.</span></p>
              <p className="flex gap-2 items-start"><Wrench size={14} className="text-amber-400 shrink-0 mt-0.5" /> <span><strong className="text-white">Qué se corrigió / refinó:</strong> Se corrigieron las rutas de invocación de las imágenes, ya que la IA tendía a sugerir rutas absolutas (/public/img/...) en lugar de la sintaxis relativa exigida por el repositorio académico.</span></p>
            </div>
          </div>

          {/* Interacción C */}
          <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800/80 space-y-3">
            <h3 className="text-white font-bold text-sm font-mono flex items-center gap-2">
              <span className="text-cyan-400">###</span> Interacción C: Deconstrucción de Activos y Matriz de Riesgo
            </h3>
            <div className="space-y-2 text-xs font-sans pl-2 border-l-2 border-cyan-500/40">
              <p><strong className="text-white">Prompt inyectado:</strong> <em>&quot;Actúa como consultor GRC. Para un ISP de telecomunicaciones (ConectaTel), identifica sus 3 activos de información primordiales custodiados por el portal. Para cada activo, define explícitamente cuál de los pilares de la Triada CIA sufre el impacto más devastador si es vulnerado. Luego, genera la justificación teórica de por qué SQLi e Inyección de Comandos caen en Riesgo Crítico en el Mapa de Calor (Probabilidad x Impacto).&quot;</em></p>
              <p><strong className="text-white">Secciones de destino:</strong> <code className="text-cyan-300 font-mono">05_activos_egaand.md</code>, <code className="text-cyan-300 font-mono">06_matriz_egaand.md</code></p>
              <p className="flex gap-2 items-start"><CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" /> <span><strong className="text-white">Qué se aceptó:</strong> La justificación técnica de que alterar un BSS/OSS destruye la &quot;Integridad&quot; del aprovisionamiento de fibra óptica.</span></p>
              <p className="flex gap-2 items-start"><Wrench size={14} className="text-amber-400 shrink-0 mt-0.5" /> <span><strong className="text-white">Qué se corrigió / refinó:</strong> Se detuvo a la IA cuando intentó dibujar tablas ASCII mediante caracteres | y -, ordenándole entregar únicamente el análisis narrativo puro.</span></p>
            </div>
          </div>

          {/* Interacción D */}
          <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800/80 space-y-3">
            <h3 className="text-white font-bold text-sm font-mono flex items-center gap-2">
              <span className="text-cyan-400">###</span> Interacción D: Arquitectura Defensiva y Continuidad de Negocio
            </h3>
            <div className="space-y-2 text-xs font-sans pl-2 border-l-2 border-cyan-500/40">
              <p><strong className="text-white">Prompt inyectado:</strong> <em>&quot;Apoyándote en OWASP y CIS Controls, redacta las Políticas de Prevención (SSDLC, exigir Prepared Statements) y Controles de Mitigación (WAF perimetral, VLANs) para ConectaTel. Acto seguido, redacta un DRP de 4 fases secuenciales (Contención, Erradicación, Recuperación bajo regla 3-2-1, y Cumplimiento legal ante la Subtel) ante un compromiso RCE total.&quot;</em></p>
              <p><strong className="text-white">Secciones de destino:</strong> <code className="text-cyan-300 font-mono">07_controles_egaand.md</code>, <code className="text-cyan-300 font-mono">08_recuperacion_egaand.md</code></p>
              <p className="flex gap-2 items-start"><CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" /> <span><strong className="text-white">Qué se aceptó:</strong> El protocolo secuencial de respuesta a incidentes y la aplicación de la regla de oro de respaldos 3-2-1.</span></p>
              <p className="flex gap-2 items-start"><Wrench size={14} className="text-amber-400 shrink-0 mt-0.5" /> <span><strong className="text-white">Qué se corrigió / refinó:</strong> Se hizo una auditoría de lectura exhaustiva para purgar fragmentos de sintaxis residuales colados por el motor de inferencia de la IA.</span></p>
            </div>
          </div>

        </section>

        {/* SECCIÓN 2: Reflexión Profesional */}
        <section className="space-y-4 pt-4 border-t border-slate-800">
          <h2 className="text-lg font-bold text-cyan-400 font-mono flex items-center gap-2">
            <Sparkles size={18} />
            2. Reflexión Profesional sobre el Foco de la Evaluación
          </h2>
          <div className="space-y-4 text-slate-300 leading-relaxed font-sans text-xs sm:text-sm bg-slate-950/40 p-6 rounded-2xl border border-slate-800/80">
            <p>
              El uso intensivo de Inteligencia Artificial durante la construcción de este informe de auditoría me permitió comprobar una regla empírica de la ciberseguridad moderna: <strong className="text-white">la Inteligencia Artificial es un excelente dactilógrafo de código, pero un pésimo arquitecto de seguridad por defecto.</strong> Durante las pruebas de generación, quedó en evidencia que si a un modelo generativo se le pide <em>&quot;escribir un backend en PHP para un login&quot;</em>, su respuesta automática y estadísticamente más probable es entregar un código vulnerable que concatena las variables directamente en el string de SQL. Para que la IA entregue código blindado, el usuario debe ordenárselo explícitamente mediante instrucciones restrictivas (<em>&quot;usa PDO y prepared statements vinculando parámetros&quot;</em>).
            </p>

            <p>
              Esto redefine por completo el valor del ingeniero en informática: nuestra ventaja competitiva en el mercado ya no reside en la capacidad memorística de teclear sintaxis más rápido que una máquina, sino en poseer el <strong className="text-white font-semibold">criterio técnico, el conocimiento de los marcos normativos (OWASP/CIS) y la malicia de auditor</strong> necesarios para saber qué instrucciones de seguridad exigirle a la IA, y cómo auditar implacablemente el producto que esta nos devuelve antes de pasarlo a un entorno de producción.
            </p>
          </div>
        </section>

      </article>
    </div>
  );
}