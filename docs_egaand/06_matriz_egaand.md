# Justificación Teórica de la Matriz de Riesgos y Mapa de Calor

---

## 1. Metodología de Evaluación de Riesgos (NIST / ISO 27005)

La clasificación de criticidad de los hallazgos técnicos en la infraestructura web de ConectaTel se fundamenta en metodologías formales de gestión de riesgos corporativos. Para determinar la urgencia de mitigación de cada vulnerabilidad, se aplica la ecuación teórica estándar: 

**Riesgo = Probabilidad × Impacto**

* **La Probabilidad:** Estima la viabilidad de que un actor de amenaza explote la debilidad, basándose en el vector de ataque, la complejidad técnica y la necesidad de autenticación previa.
* **El Impacto:** Mide la magnitud del daño ocasionado al negocio y a la Triada CIA (Confidencialidad, Integridad, Disponibilidad) en caso de materializarse el compromiso sobre los activos críticos del ISP.

El producto de ambas variables sitúa al hallazgo en una celda de criticidad dentro del Mapa de Calor Corporativo.

### Mapa de Calor de Vulnerabilidades - ConectaTel

| Probabilidad \ Impacto | Bajo | Medio | Alto | Crítico |
| :--- | :---: | :---: | :---: | :---: |
| **Alta** | Bajo | **Alto (XSS)** | Alto | **Crítico (SQLi / Cmd Inj)** |
| **Media** | Bajo | Medio | Alto | Alto |
| **Baja** | Bajo | Bajo | Medio | Medio |

---

## 2. Justificación Analítica de los Hallazgos

### A. Inyección de Comandos (OS Command Injection): Riesgo CRÍTICO
Este hallazgo se ubica en la celda de máxima criticidad del mapa de calor (remediación obligatoria inmediata). 
* **Justificación:** Resulta del cruce de una **Probabilidad Alta** (explotación trivial mediante el carácter `;` sin necesidad de autenticación) por un **Impacto Crítico**. 
* **Afectación del Activo:** El atacante consigue Ejecución Remota de Código (RCE), comprometiendo de forma total el activo **«Interfaces de Ejecución y Enrutamiento Subyacente»**. En el rubro de las telecomunicaciones, esto faculta a un cibercriminal para destruir las bases de datos de abonados, pivotar hacia la red troncal o provocar un apagón absoluto de los servicios de Internet (Pérdida total de Disponibilidad).

### B. Inyección SQL (SQLi): Riesgo CRÍTICO
Esta vulnerabilidad comparte el nivel de riesgo **Crítico** en la cúspide de la matriz.
* **Justificación:** Se fundamenta analíticamente mediante una **Probabilidad Alta** (el punto de entrada es un formulario público automatizable) cruzada con un **Impacto Crítico** para el negocio.
* **Afectación del Activo:** La explotación exitosa expone masivamente el activo **«Base de Datos de Suscriptores (PII)»**. Esto genera una fuga total de información personal identificable, desencadenando un daño catastrófico a nivel legal por infracción a la ley de protección de datos, acarreando multas regulatorias y pérdida irreversible de reputación comercial.

### C. Cross-Site Scripting (XSS Reflejado): Riesgo ALTO
El hallazgo de Cross-Site Scripting queda clasificado dentro de la celda de riesgo **Alto**.
* **Justificación:** Se fundamenta por la combinación de una **Probabilidad Alta** (omisión de codificación de salida fácilmente explotable) frente a un **Impacto Medio**. El impacto no es crítico porque el ataque no compromete los servidores del ISP directamente, sino que requiere la interacción del usuario y se ejecuta en su navegador.
* **Afectación del Activo:** Permite la suplantación de clientes individuales mediante el robo del activo **«Tokens de Sesión y Credenciales de Autogestión»**. Esto facilita el fraude a escala de usuario específico (*Account Takeover*) sin llegar a colapsar la infraestructura central de ConectaTel.