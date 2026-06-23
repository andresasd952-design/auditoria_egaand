import { Sliders, ShieldCheck, FileCode } from 'lucide-react';

export default function Controles() {
  return (
    <div className="space-y-6 text-slate-100 animate-fadeIn">
      
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 shrink-0">
          <Sliders size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Políticas de Prevención y Controles de Mitigación</h1>
          <span className="text-xs font-mono text-emerald-400">Ruta de origen: docs_egaand/07_controles_egaand.md</span>
        </div>
      </div>

      <article className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-6 font-sans text-sm leading-relaxed text-slate-300 shadow-xl">
        
        <p>
          Para garantizar la resiliencia del portal de clientes de ConectaTel, se establece una estrategia de defensa en profundidad fundamentada en los marcos de trabajo de la industria <strong className="text-white">OWASP</strong> y <strong className="text-white">CIS Controls</strong>. Esta estrategia aborda la seguridad desde dos frentes complementarios: la erradicación de las vulnerabilidades desde el ciclo de escritura del código (Prevención) y la contención perimetral del daño en caso de un intento de explotación (Mitigación).
        </p>

        {/* SECCIÓN 1 */}
        <section className="space-y-4 pt-2">
          <h2 className="text-lg font-bold text-emerald-400 border-b border-slate-800 pb-1 font-mono flex items-center gap-2">
            <FileCode size={18} />
            1. Políticas de Prevención (Ciclo de Desarrollo Seguro / SSDLC)
          </h2>
          <p>
            La prevención tiene como objetivo vital evitar que las fallas de seguridad lleguen a existir en el entorno de producción. El equipo de desarrollo de software de ConectaTel deberá adherirse de forma estricta al Ciclo de Desarrollo Seguro (SSDLC), cumpliendo con las siguientes políticas obligatorias:
          </p>

          <ul className="space-y-3 pl-1 text-xs font-sans">
            <li className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
              <strong className="text-white font-semibold block mb-1 text-emerald-300">Principio de Desconfianza Absoluta:</strong> 
              Se instaura como norma de ingeniería el concepto de que &quot;toda entrada proveniente del usuario es intrínsecamente hostil&quot;. Queda prohibido depender de validaciones en el lado del cliente (frontend/HTML5) como única medida de protección.
            </li>

            <li className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
              <strong className="text-white font-semibold block mb-1 text-emerald-300">Prohibición de Concatenación Dinámica (CIS Control 16 / OWASP):</strong> 
              Queda estrictamente prohibido construir consultas a la base de datos o comandos del sistema operativo uniendo cadenas de texto con <em>inputs</em> del usuario. Toda consulta dirigida a la base de datos deberá estructurarse obligatoriamente mediante Consultas Parametrizadas (<em>Prepared Statements</em>), garantizando que el motor de base de datos trate la entrada del suscriptor siempre como un dato literal y jamás como código ejecutable.
            </li>

            <li className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
              <strong className="text-white font-semibold block mb-1 text-emerald-300">Validación Estricta por Listas Blancas (Whitelisting):</strong> 
              Todo formulario del portal deberá validar la entrada del usuario bajo un enfoque de aceptación positiva. Si un campo requiere un parámetro de red, el backend deberá verificar mediante expresiones regulares que el formato corresponda exclusivamente a una dirección IP válida o a un valor numérico entero, descartando de forma automática cualquier carácter de control o secuenciación (como <code className="text-red-400 font-mono">;</code>, <code className="text-red-400 font-mono">&#39;</code>, <code className="text-red-400 font-mono">|</code> o <code className="text-red-400 font-mono">&amp;&amp;</code>).
            </li>

            <li className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
              <strong className="text-white font-semibold block mb-1 text-emerald-300">Codificación Contextual de Salida (Output Encoding):</strong> 
              Para neutralizar los ataques de Cross-Site Scripting (XSS), los programadores deberán aplicar rutinas de codificación de salida antes de reflejar cualquier dato en el navegador del suscriptor. Esto forzará la transformación de caracteres especiales en sus correspondientes entidades seguras (por ejemplo, convertir <code className="text-amber-400 font-mono">&lt;</code> en <code className="text-amber-400 font-mono">&amp;lt;</code>).
            </li>
          </ul>
        </section>

        {/* SECCIÓN 2 */}
        <section className="space-y-4 pt-4">
          <h2 className="text-lg font-bold text-emerald-400 border-b border-slate-800 pb-1 font-mono flex items-center gap-2">
            <ShieldCheck size={18} />
            2. Controles de Mitigación (Defensa Perimetral y Contención)
          </h2>
          <p>
            Los controles de mitigación asumen que las vulnerabilidades pueden existir: su misión es actuar como una red de contención tecnológica para reducir y amortiguar el impacto de un ataque en curso. Para la infraestructura de ConectaTel, se exige el despliegue de los siguientes mecanismos:
          </p>

          <ul className="space-y-3 pl-1 text-xs font-sans">
            <li className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
              <strong className="text-white font-semibold block mb-1 text-blue-300">Despliegue de Web Application Firewall (WAF):</strong> 
              Implementar un Firewall de Aplicación Web en el perímetro de la red, posicionado como intermediario de proxy inverso entre internet y el servidor web de ConectaTel. Este dispositivo inspeccionará el tráfico HTTP/HTTPS en tiempo real mediante el conjunto de reglas base de OWASP (<em>Core Rule Set</em>), detectando y bloqueando en caliente patrones maliciosos (como <code className="text-red-400 font-mono">&#39; OR &#39;1&#39;=&#39;1</code> o secuencias de comandos <code className="text-red-400 font-mono">; cat</code>) antes de que logren tocar el backend de PHP.
            </li>

            <li className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
              <strong className="text-white font-semibold block mb-1 text-blue-300">Segmentación Lógica de Red mediante VLANs:</strong> 
              Aplicar el principio de mínimo privilegio sobre la arquitectura de red, dividiendo la infraestructura del ISP en Redes de Área Local Virtuales (VLANs) fuertemente aisladas entre sí. Se debe separar de forma tajante la VLAN de la Zona Desmilitarizada (DMZ) pública —donde reside el portal web—, respecto a la VLAN de administración interna, la VLAN de bases de datos de suscriptores y la VLAN de gestión BSS/OSS. Si un atacante consigue Ejecución Remota de Código (RCE) en el portal web, la barrera de la VLAN contendrá el ataque, impidiendo el movimiento lateral hacia los enrutadores de la red central.
            </li>

            <li className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
              <strong className="text-white font-semibold block mb-1 text-blue-300">Hardening de Cabeceras HTTP (Content-Security-Policy):</strong> 
              Configurar el servidor web para inyectar de forma obligatoria la directiva de seguridad <code className="text-emerald-300 font-mono">Content-Security-Policy</code> (CSP) en las respuestas HTTP. Esta cabecera restringirá explícitamente desde cuáles dominios el navegador del cliente tiene permitido cargar y ejecutar <em>scripts</em>, mitigando drásticamente el impacto de un XSS al anular la ejecución de código inyectado por terceros.
            </li>
          </ul>
        </section>

      </article>
    </div>
  );
}