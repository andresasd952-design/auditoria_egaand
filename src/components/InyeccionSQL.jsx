import { Database, AlertTriangle } from 'lucide-react';

export default function InyeccionSQL() {
  return (
    <div className="space-y-6 text-slate-100">
      
      {/* Barra superior de contexto */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 shrink-0">
          <Database size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Inyección SQL (SQLi) en Portal de Clientes ConectaTel</h1>
          <span className="text-xs font-mono text-red-400">Ruta de origen: docs_egaand/02_sqli_egaand.md</span>
        </div>
      </div>

      {/* CONTENEDOR VERBATIM (Copia 100% literal del Markdown) */}
      <article className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-6 font-sans text-sm leading-relaxed text-slate-300 shadow-xl">
        
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-red-400 border-b border-slate-800/80 pb-1 font-mono">
            1. Detalles del Hallazgo y Payload Inyectado
          </h2>
          <p>
            Durante la fase de explotación en la superficie de acceso al portal de clientes de ConectaTel, se logró eludir el mecanismo de autenticación e interactuar directamente con el motor de base de datos.
          </p>
          <p>El ataque se concretó introduciendo el siguiente payload en el campo de entrada (User ID):</p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-red-400 text-sm select-all inline-block tracking-widest">
            ' OR '1'='1
          </div>
        </section>

        {/* Invocación de Evidencia exacta */}
        <div className="my-6 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
          <span className="text-xs font-mono text-slate-500 block mb-2 select-all">![Evidencia SQLi](img_egaand/sqli_egaand.png)</span>
          <img 
            src="/img/sqli_egaand.png" 
            alt="Evidencia SQLi" 
            className="w-full rounded-lg border border-slate-800"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="hidden flex-col items-center justify-center p-8 text-slate-500 font-mono text-xs">
            <AlertTriangle size={24} className="text-amber-500 mb-1" />
            <span>[Archivo sqli_egaand.png pendiente de sincronización en /public/img/]</span>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-red-400 border-b border-slate-800/80 pb-1 font-mono">
            2. Análisis Técnico: ¿Por qué funciona?
          </h2>
          <p>
            La vulnerabilidad radica en un fallo crítico de diseño en la arquitectura del lado del servidor. El backend, desarrollado en PHP, captura la entrada del usuario y la concatena dinámicamente de forma directa dentro de la sintaxis de la consulta SQL, sin aplicar ninguna rutina previa de sanitización o escape de caracteres.
          </p>
          <p>
            Al insertar la comilla simple ('), el atacante logra cerrar prematuramente el campo de datos esperado por la consulta. Seguido a esto, el operador OR introduce una tautología matemática ('1'='1'), la cual siempre se evalúa como verdadera. Esto fuerza al motor de base de datos a ignorar las restricciones originales de la consulta y devolver indiscriminadamente todos los registros de la tabla.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-red-400 border-b border-slate-800/80 pb-1 font-mono">
            3. Métrica de Gravedad (CVSS v3.1)
          </h2>
          <ul className="list-disc list-inside space-y-1 text-slate-300 font-mono text-xs">
            <li><strong className="text-white font-sans">Puntuación Base:</strong> 7.5 (Alta)</li>
            <li><strong className="text-white font-sans">Vector Oficial:</strong> CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N</li>
          </ul>
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 space-y-1.5 mt-2">
            <strong className="text-white block font-mono text-xs">Impacto en el Negocio (ConectaTel):</strong>
            <p className="text-slate-300 text-xs leading-relaxed font-sans">
              Esta vulnerabilidad representa una exposición crítica para un Proveedor de Servicios de Internet. Permite a un atacante no autenticado extraer de manera masiva la base de datos completa de suscriptores, incluyendo información personal, detalles de planes contratados, registros de facturación y tráfico de red, comprometiendo de forma absoluta la confidencialidad (C:H) de los clientes de ConectaTel.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-red-400 border-b border-slate-800/80 pb-1 font-mono">
            4. Política de Prevención y Controles de Mitigación (Defensa)
          </h2>
          <p>
            Para erradicar esta vulnerabilidad desde su causa raíz y proteger los activos de información de ConectaTel, el equipo de desarrollo debe implementar los siguientes controles técnicos:
          </p>
          <ol className="list-decimal list-inside space-y-2.5 text-slate-300 pl-1">
            <li className="leading-relaxed">
              <strong className="text-white">Consultas Parametrizadas (Prepared Statements):</strong> Es el estándar de oro defensivo. Obliga a la base de datos a precompilar la instrucción SQL con &quot;huecos&quot; (?) para los datos. El input del usuario se trata estrictamente como un dato literal y jamás como código ejecutable, neutralizando cualquier intento de inyección.
            </li>
            <li className="leading-relaxed">
              <strong className="text-white">Validación Estricta de Tipos de Datos (Type Casting):</strong> Aplicar listas blancas en los puntos de entrada. Si un campo como el User ID solo debe recibir valores numéricos, el backend debe validar y forzar que el dato ingresado sea exclusivamente un número entero antes de interactuar con la base de datos.
            </li>
          </ol>
        </section>

      </article>
    </div>
  );
}