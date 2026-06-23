import { Terminal as TerminalIcon, AlertTriangle } from 'lucide-react';

export default function Comandos() {
  return (
    <div className="space-y-6 text-slate-100 animate-fadeIn">
      
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 bg-red-600/10 border border-red-500/30 rounded-xl text-red-500 shrink-0">
          <TerminalIcon size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Inyección de Comandos (OS Command Injection) en ConectaTel</h1>
          <span className="text-xs font-mono text-red-400">Ruta de origen: docs_egaand/04_comandos_egaand.md</span>
        </div>
      </div>

      <article className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-6 font-sans text-sm leading-relaxed text-slate-300 shadow-xl">
        
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-red-400 border-b border-slate-800/80 pb-1 font-mono">
            1. Descripción del Ataque y Payload
          </h2>
          <p>
            Durante las pruebas de penetración en el formulario de diagnóstico de red de ConectaTel, se descubrió una vulnerabilidad crítica de Inyección de Comandos del Sistema Operativo.
          </p>
          <p>El ataque se ejecutó introduciendo el siguiente payload en el campo de dirección IP:</p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-red-400 text-sm select-all inline-block tracking-widest">
            127.0.0.1; cat /etc/passwd
          </div>
        </section>

        <div className="my-6 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
          <span className="text-xs font-mono text-slate-500 block mb-2 select-all">![Evidencia Comandos](img_egaand/comandos_egaand.png)</span>
          <img 
            src="/img/comandos_egaand.png" 
            alt="Evidencia Comandos" 
            className="w-full rounded-lg border border-slate-800"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="hidden flex-col items-center justify-center p-8 text-slate-500 font-mono text-xs">
            <AlertTriangle size={24} className="text-amber-500 mb-1" />
            <span>[Archivo comandos_egaand.png pendiente de sincronización en /public/img/]</span>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-red-400 border-b border-slate-800/80 pb-1 font-mono">
            2. Explicación Técnica de la Explotación
          </h2>
          <p>
            El procesador de comandos de Linux interpreta el carácter punto y coma (;) como un separador y secuenciador lógico de instrucciones. El script del lado del servidor toma el valor ingresado y lo pasa directamente a una función de ejecución del sistema para lanzar un ping a la IP indicada.
          </p>
          <p>
            Al inyectar el punto y coma, el sistema operativo ejecuta primero el ping a la interfaz local e inmediatamente después ejecuta el comando arbitrario concatenado (cat /etc/passwd), exponiendo en la pantalla del navegador el listado completo de usuarios del servidor de ConectaTel.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-red-400 border-b border-slate-800/80 pb-1 font-mono">
            3. Métrica CVSS v3.1
          </h2>
          <ul className="list-disc list-inside space-y-1 text-slate-300 font-mono text-xs">
            <li><strong className="text-white font-sans">Puntuación Base:</strong> 9.8 (Crítica)</li>
            <li><strong className="text-white font-sans">Vector Oficial:</strong> CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H</li>
          </ul>
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 space-y-1.5 mt-2">
            <strong className="text-white block font-mono text-xs">Justificación del Impacto:</strong>
            <p className="text-slate-300 text-xs leading-relaxed font-sans">
              Se califica con el puntaje máximo (9.8 Crítico) porque la vulnerabilidad otorga al atacante Ejecución Remota de Código (RCE) con los privilegios del usuario del servidor web. Esto permite comprometer de forma absoluta e irrestricta la Confidencialidad, Integridad y Disponibilidad de toda la infraestructura del ISP.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-red-400 border-b border-slate-800/80 pb-1 font-mono">
            4. Remediación
          </h2>
          <p>
            Para cerrar este vector de ataque, la lógica de la herramienta de diagnóstico debe reestructurarse bajo los siguientes principios:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 pl-1">
            <li className="leading-relaxed">
              <strong className="text-white">Implementación de Listas Blancas (Whitelisting):</strong> Validar estrictamente el formato de entrada mediante una expresión regular (Regex) que permita exclusivamente los caracteres de una dirección IPv4 o IPv6 válida, rechazando automáticamente cualquier carácter ajeno.
            </li>
            <li className="leading-relaxed">
              <strong className="text-white">Desacoplamiento de la Consola del Sistema:</strong> Evitar por completo el uso de funciones de invocación a la shell del sistema operativo. En su lugar, utilizar bibliotecas o APIs nativas del lenguaje de programación diseñadas específicamente para el monitoreo de red y envío de paquetes ICMP.
            </li>
          </ol>
        </section>

      </article>
    </div>
  );
}