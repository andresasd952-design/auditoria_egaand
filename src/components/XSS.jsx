import { Code, AlertTriangle } from 'lucide-react';

export default function XSS() {
  return (
    <div className="space-y-6 text-slate-100">
      
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 shrink-0">
          <Code size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Cross-Site Scripting (XSS Reflejado) en Portal de ConectaTel</h1>
          <span className="text-xs font-mono text-amber-400">Ruta de origen: docs_egaand/03_xss_egaand.md</span>
        </div>
      </div>

      <article className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-6 font-sans text-sm leading-relaxed text-slate-300 shadow-xl">
        
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-amber-400 border-b border-slate-800/80 pb-1 font-mono">
            1. Detalles del Hallazgo y Payload Inyectado
          </h2>
          <p>
            Durante la evaluación de seguridad al portal de clientes de la telco, se identificó una vulnerabilidad de Cross-Site Scripting (XSS) en su variante reflejada.
          </p>
          <p>El ataque fue validado inyectando el siguiente payload en el campo de entrada vulnerable:</p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-amber-400 text-sm select-all inline-block tracking-wider">
            &lt;script&gt;alert('XSS')&lt;/script&gt;
          </div>
        </section>

        <div className="my-6 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
          <span className="text-xs font-mono text-slate-500 block mb-2 select-all">![Evidencia XSS](img_egaand/xss_egaand.png)</span>
          <img 
            src="/img/xss_egaand.png" 
            alt="Evidencia XSS" 
            className="w-full rounded-lg border border-slate-800"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="hidden flex-col items-center justify-center p-8 text-slate-500 font-mono text-xs">
            <AlertTriangle size={24} className="text-amber-500 mb-1" />
            <span>[Archivo xss_egaand.png pendiente de sincronización en /public/img/]</span>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-amber-400 border-b border-slate-800/80 pb-1 font-mono">
            2. Análisis Técnico: ¿Por qué funciona?
          </h2>
          <p>
            La vulnerabilidad se produce porque la aplicación web refleja el input del usuario directamente en la respuesta HTTP devuelta al navegador, omitiendo por completo la codificación de caracteres o cualquier tipo de sanitización.
          </p>
          <p>
            Dado que la página devuelve el texto sin procesar, el equipo de la víctima es incapaz de distinguir la entrada del usuario del código nativo de la página. En consecuencia, el navegador no lo representa como texto plano, sino que lo interpreta y ejecuta directamente como código JavaScript legítimo.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-amber-400 border-b border-slate-800/80 pb-1 font-mono">
            3. Métrica de Gravedad (CVSS v3.1)
          </h2>
          <ul className="list-disc list-inside space-y-1 text-slate-300 font-mono text-xs">
            <li><strong className="text-white font-sans">Puntuación Base:</strong> 6.1 (Media)</li>
            <li><strong className="text-white font-sans">Vector Oficial:</strong> CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N</li>
          </ul>
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 space-y-1.5 mt-2">
            <strong className="text-white block font-mono text-xs">Impacto en el Negocio (ConectaTel):</strong>
            <p className="text-slate-300 text-xs leading-relaxed font-sans">
              Mediante esta vulnerabilidad, un atacante puede ejecutar código malicioso diseñado para robar la sesión de otro usuario activo. En el contexto operativo de un Proveedor de Servicios de Internet (ISP), el robo de cookies de sesión permitiría a un cibercriminal secuestrar las cuentas de los clientes de ConectaTel, facilitando la suplantación de identidad para acceder a la sucursal virtual, exponer el tráfico de red, visualizar datos de facturación o manipular fraudulentamente los planes contratados.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-amber-400 border-b border-slate-800/80 pb-1 font-mono">
            4. Política de Prevención y Controles de Mitigación
          </h2>
          <p>
            Para neutralizar esta brecha y proteger a los suscriptores, la arquitectura del frontend y backend debe incorporar las siguientes medidas defensivas:
          </p>
          <ol className="list-decimal list-inside space-y-2.5 text-slate-300 pl-1">
            <li className="leading-relaxed">
              <strong className="text-white">Codificación de Salida (Output Encoding):</strong> Se debe escapar la salida de forma obligatoria en todos los puntos donde se reflejen datos introducidos por el usuario. Esto implica convertir caracteres especiales en sus entidades HTML correspondientes (por ejemplo, transformar &lt; en &amp;lt;), forzando al navegador a renderizar el contenido estrictamente como texto y no como código ejecutable.
            </li>
            <li className="leading-relaxed">
              <strong className="text-white">Content-Security-Policy (CSP):</strong> Implementar una estricta política de seguridad de contenido configurando la cabecera HTTP Content-Security-Policy. Esta capa adicional de defensa limitará explícitamente desde qué dominios se permite la carga y ejecución de scripts, bloqueando la ejecución de código JavaScript inyectado (inline).
            </li>
          </ol>
        </section>

      </article>
    </div>
  );
}