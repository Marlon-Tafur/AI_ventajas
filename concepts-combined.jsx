import { useState } from "react";

const categories = [
  { id: "all", label: "Todos", color: "#F8FAFC" },
  { id: "connect", label: "Conexión e integración", color: "#3B82F6" },
  { id: "data", label: "Datos y procesamiento", color: "#F59E0B" },
  { id: "dev", label: "Desarrollo y despliegue", color: "#8B5CF6" },
  { id: "intelligence", label: "Inteligencia y decisión", color: "#EC4899" },
  { id: "ops", label: "Operación y conocimiento", color: "#14B8A6" },
];

const concepts = [
  // === CONEXIÓN E INTEGRACIÓN ===
  {
    id: "apis",
    cat: "connect",
    icon: "🔌",
    beforeName: "APIs (endpoints, parámetros, SDKs)",
    afterName: "Tools / MCP como \"enchufes\"",
    beforeDesc: "Tenías que entender métodos HTTP (GET/POST), endpoints, parámetros, JSON, librerías, entornos de desarrollo, SDKs, paginación, rate limiting. Sin esto, no te conectabas a nada.",
    afterDesc: "Piensas en \"herramientas\": qué hace, qué necesita, qué devuelve. La IA y la infraestructura se encargan de la plomería. Tú describes qué quieres lograr.",
    beforeSkills: ["HTTP/REST", "JSON", "SDKs", "Postman", "Programación"],
    afterSkills: ["Saber qué herramienta existe", "Describir la intención"],
    barrierBefore: 85,
    barrierAfter: 15,
    insight: "La API no desaparece — se vuelve invisible. El MCP es una capa donde la IA es el intérprete entre tu intención y la API técnica.",
  },
  {
    id: "webhooks",
    cat: "connect",
    icon: "🪝",
    beforeName: "Webhooks (eventos, payloads, firmas)",
    afterName: "\"Disparadores\": cuando pasa X, haz Y",
    beforeDesc: "\"Si no sabes webhooks, no automatizas en serio\". Tenías que configurar URLs de callback, validar firmas HMAC, parsear payloads, manejar reintentos y entender el ciclo de vida del evento.",
    afterDesc: "Lo piensas como disparadores simples: \"cuando llega un email\", \"cuando se cierra un ticket\". La herramienta/IA mapea los datos del payload sin que entiendas cada campo técnico.",
    beforeSkills: ["URLs de callback", "HMAC", "Parseo de payloads", "Gestión de reintentos"],
    afterSkills: ["Definir el evento disparador", "Mapear qué dato necesitas"],
    barrierBefore: 75,
    barrierAfter: 15,
    insight: "El webhook sigue existiendo debajo, pero se abstrae como un 'trigger'. Tu trabajo es definir el QUÉ (evento) y el ENTONCES (acción), no el CÓMO.",
  },
  {
    id: "auth",
    cat: "connect",
    icon: "🔐",
    beforeName: "Autenticación compleja (OAuth, tokens, scopes)",
    afterName: "\"Conectar cuenta\" + elegir permisos",
    beforeDesc: "Te tocaba entender flujos OAuth 2.0, tokens de acceso, refresh tokens, scopes, bearer headers, expiración, almacenamiento seguro de credenciales. Un error = tu integración no funciona.",
    afterDesc: "Se traduce a 'conectar cuenta' con un clic y elegir qué permisos das. Lo importante ahora es el criterio: qué acceso otorgas, a quién, y qué riesgos implica.",
    beforeSkills: ["OAuth 2.0", "JWT", "Refresh tokens", "Scopes", "Headers"],
    afterSkills: ["Criterio de permisos", "Entender riesgos de acceso"],
    barrierBefore: 80,
    barrierAfter: 15,
    insight: "La complejidad técnica se esconde tras un botón de 'Conectar'. Pero el criterio de seguridad — qué acceso dar y a quién — ahora es MÁS importante, no menos.",
  },
  {
    id: "connectors",
    cat: "connect",
    icon: "🧲",
    beforeName: "\"¿Tiene conector para mi app?\" como criterio #1",
    afterName: "Orquestación + Tools/MCP + puentes IA",
    beforeDesc: "La pregunta decisiva al elegir herramientas era si tenía conector nativo para tus sistemas. Sin conector = sin integración, o desarrollo costoso a medida.",
    afterDesc: "Gana quien tenga mejor orquestación, tools/MCP y estabilidad. Si no hay conector nativo, se conecta igual por un 'puente' que la IA puede construir o mediar.",
    beforeSkills: ["Evaluar catálogos de conectores", "Desarrollo custom de integraciones"],
    afterSkills: ["Evaluar orquestación", "Saber que siempre hay un camino"],
    barrierBefore: 60,
    barrierAfter: 20,
    insight: "El conector nativo sigue siendo lo ideal, pero dejó de ser un deal-breaker. La IA puede ser el 'conector universal' para muchos escenarios.",
  },
  // === DATOS Y PROCESAMIENTO ===
  {
    id: "json",
    cat: "data",
    icon: "📦",
    beforeName: "JSON / estructura de datos",
    afterName: "\"Campos esperados\" y formato de salida",
    beforeDesc: "Sabías leer y escribir JSON para no romper nada: llaves, corchetes, tipos de datos, anidamiento. Un error de sintaxis paraba todo el flujo.",
    afterDesc: "Se vuelve 'campos esperados' (nombre, monto, fecha) y 'formato de salida'. La IA transforma entre formatos, pero tú defines el contrato: qué datos esperas y cómo deben verse.",
    beforeSkills: ["Sintaxis JSON", "Tipos de datos", "Validación", "Parseo manual"],
    afterSkills: ["Definir campos y tipos esperados", "Validar resultados"],
    barrierBefore: 55,
    barrierAfter: 15,
    insight: "JSON no desaparece — es el idioma universal de la automatización. Pero ya no necesitas 'hablarlo' tú; la IA es tu traductor. Tu rol es definir el contrato.",
  },
  {
    id: "regex",
    cat: "data",
    icon: "🔍",
    beforeName: "Regex (expresiones regulares)",
    afterName: "\"Extrae nombre, DNI y monto de este texto\"",
    beforeDesc: "Si querías extraer datos de textos, regex era oro: ^[a-zA-Z0-9._%+-]+@... Sintaxis críptica, difícil de leer, depurar y mantener. Una habilidad 'de élite' que pocos dominaban.",
    afterDesc: "Lo reemplazas por extracción con IA: 'saca nombre, DNI, monto'. La IA entiende el significado, no solo el patrón. Regex queda para casos muy rígidos donde necesitas control exacto.",
    beforeSkills: ["Sintaxis regex", "Grupos de captura", "Lookahead", "Testing de patrones"],
    afterSkills: ["Describir qué extraer", "Verificar resultados"],
    barrierBefore: 80,
    barrierAfter: 5,
    insight: "Regex extraía por forma ('3 dígitos, guión, 4 dígitos'). La IA extrae por significado ('el teléfono'). Es la diferencia entre leer etiquetas y entender texto.",
  },
  {
    id: "etl",
    cat: "data",
    icon: "🧹",
    beforeName: "Parsing / ETL manual (limpiar, normalizar, mapear)",
    afterName: "IA hace la primera pasada + tú defines las reglas",
    beforeDesc: "Mucha limpieza a mano: pivot tables, VLOOKUP anidados, scripts con Pandas, valores nulos, formatos de fecha inconsistentes, deduplicación, normalización. El 80% del tiempo de un proyecto de datos.",
    afterDesc: "La IA hace la primera pasada: normaliza, detecta duplicados, categoriza, sugiere transformaciones. Tu foco pasa a definir reglas de validación y decidir 'qué es aceptable'.",
    beforeSkills: ["Pandas/Python", "Excel avanzado", "Normalización", "Deduplicación", "Mapeo de columnas"],
    afterSkills: ["Definir calidad esperada", "Reglas de validación", "Revisar excepciones"],
    barrierBefore: 75,
    barrierAfter: 15,
    insight: "La limpieza de datos era el 'trabajo sucio' que nadie quería hacer. La IA no solo lo automatiza, sino que detecta problemas que un humano tardaría horas en ver.",
  },
  {
    id: "sql",
    cat: "data",
    icon: "🗃️",
    beforeName: "\"Saber SQL\" para todo",
    afterName: "Saber qué pregunta hacer + validar resultados",
    beforeDesc: "SQL era requisito para reportes y cruces serios: JOINs, subqueries, GROUP BY, HAVING, índices, normalización. Un query complejo podía tomar horas de diseño y optimización.",
    afterDesc: "Puedes pedir consultas en lenguaje natural y la IA genera el SQL. Pero lo más importante se traduce a: saber qué pregunta quieres responder, entender tus datos y validar que el resultado tiene sentido.",
    beforeSkills: ["SQL avanzado", "JOINs", "Modelado relacional", "Índices", "Optimización"],
    afterSkills: ["Formular la pregunta correcta", "Validar resultados", "Entender tus datos"],
    barrierBefore: 75,
    barrierAfter: 15,
    insight: "SQL se traduce en algo más valioso: saber qué pregunta quieres responder. El analista de datos se convierte en analista de preguntas.",
  },
  // === DESARROLLO Y DESPLIEGUE ===
  {
    id: "programming",
    cat: "dev",
    icon: "💻",
    beforeName: "Saber programar para automatizar",
    afterName: "Saber describir procesos + probar + pedir outputs",
    beforeDesc: "Programar era la puerta de entrada a la automatización poderosa. Sin Python, JavaScript o al menos VBA, te quedabas fuera del juego serio.",
    afterDesc: "No siempre es necesario. Se traduce a saber describir procesos claramente, saber probar si funciona, y saber pedir outputs estructurados ('devuélveme una tabla con campos X, Y, Z').",
    beforeSkills: ["Python/JS/VBA", "Lógica de programación", "Debugging", "Entorno de desarrollo"],
    afterSkills: ["Describir procesos", "Probar resultados", "Pedir outputs estructurados"],
    barrierBefore: 85,
    barrierAfter: 20,
    insight: "Programar sigue dando superpoderes, pero dejó de ser requisito. El nuevo mínimo es saber pensar en procesos y saber validar lo que la IA produce.",
  },
  {
    id: "ifelse",
    cat: "dev",
    icon: "🌳",
    beforeName: "Diseñar flujos if/else eternos",
    afterName: "Reglas simples + capa de decisión IA",
    beforeDesc: "Automatizar = construir un árbol gigante de condiciones: if cliente VIP → else if monto > 1000 → else if día festivo... Cada caso borde requería una rama nueva. Los flujos se volvían inmantenibles.",
    afterDesc: "Automatizar = reglas simples para lo predecible + una capa de IA que clasifica, prioriza y enruta lo ambiguo. Tú defines los límites: cuándo decide sola y cuándo te pregunta.",
    beforeSkills: ["Lógica condicional", "Diagramas de flujo", "Manejo de excepciones", "Testing de ramas"],
    afterSkills: ["Definir reglas claras", "Establecer umbrales de autonomía", "Diseñar escalamientos"],
    barrierBefore: 65,
    barrierAfter: 20,
    insight: "Los if/else manejaban certeza. La IA maneja ambigüedad. Tu rol pasa de diseñar todas las ramas a definir las reglas del juego y los límites de autonomía.",
  },
  {
    id: "cli",
    cat: "dev",
    icon: "⌨️",
    beforeName: "Línea de comandos (CLI / Terminal)",
    afterName: "Agentes que operan la terminal por ti",
    beforeDesc: "Navegar directorios, scripts Bash, pipes, grep, awk, sed, permisos chmod, crontabs, SSH... La terminal era el poder real de un sistema, pero intimidaba a la mayoría.",
    afterDesc: "La IA genera el comando, lo explica y lo ejecuta. Tools como Claude Code operan directamente en la terminal. Describes la tarea; la IA traduce a los comandos necesarios.",
    beforeSkills: ["Bash/Shell", "Pipes", "SSH", "Cron jobs", "Permisos Unix"],
    afterSkills: ["Describir la operación", "Validar el resultado"],
    barrierBefore: 80,
    barrierAfter: 10,
    insight: "La terminal pasa de habilidad de gatekeeping técnico a herramienta que la IA opera por ti. Saber terminal sigue siendo valioso, pero ya no es la barrera.",
  },
  {
    id: "git",
    cat: "dev",
    icon: "🌿",
    beforeName: "Versionado \"de código\" (Git)",
    afterName: "Versionar todo: skills, prompts, reglas, plantillas",
    beforeDesc: "Versionabas código con Git: branches, merges, rebases, conflictos, pull requests. Los flujos de automatización y las reglas de negocio muchas veces no se versionaban.",
    afterDesc: "Ahora versionas también skills, reglas, prompts y plantillas. Se vuelven 'recetas reutilizables' con cambios controlados. Los agentes de IA manejan la mecánica de Git.",
    beforeSkills: ["git branch/merge", "Resolución de conflictos", "Gitflow", "Pull requests"],
    afterSkills: ["Concepto de versiones", "Decidir qué versionar", "Recetas reutilizables"],
    barrierBefore: 70,
    barrierAfter: 20,
    insight: "El concepto de versionado se EXPANDE, no se reduce. Antes versionabas código; ahora versionas conocimiento. La mecánica la absorbe la IA, pero el criterio es tuyo.",
  },
  {
    id: "deploy",
    cat: "dev",
    icon: "☁️",
    beforeName: "DevOps, Docker y despliegue en la nube",
    afterName: "\"Despliega esto\" con un clic o un prompt",
    beforeDesc: "Dockerfiles, docker-compose, YAML de Kubernetes, CI/CD pipelines, configuración de nginx, SSL, DNS, variables de entorno, secrets. Poner algo en producción era un mundo aparte.",
    afterDesc: "Plataformas como Vercel, Railway o Replit con IA despliegan con un prompt. Los agentes generan Dockerfiles, configuran pipelines y resuelven errores leyendo logs automáticamente.",
    beforeSkills: ["Docker", "Kubernetes", "CI/CD", "nginx", "SSL/DNS", "Cloud"],
    afterSkills: ["Saber qué quieres publicar", "Elegir plataforma"],
    barrierBefore: 90,
    barrierAfter: 20,
    insight: "DevOps no desaparece para sistemas complejos, pero la barrera para poner algo en línea cayó de semanas a minutos.",
  },
  {
    id: "css",
    cat: "dev",
    icon: "🎨",
    beforeName: "CSS avanzado y diseño responsive",
    afterName: "\"Hazme una landing con hero section y cards\"",
    beforeDesc: "Flexbox, Grid, media queries, especificidad, animaciones, SASS, BEM, z-index... Dominar CSS era una profesión en sí misma. Centrar un div era un meme por algo.",
    afterDesc: "La IA genera interfaces completas desde una descripción. Tailwind + IA = diseño sin sufrir. Herramientas como v0 de Vercel o Claude crean layouts responsivos y con animaciones al instante.",
    beforeSkills: ["Flexbox/Grid", "Media queries", "Animaciones", "SASS", "BEM"],
    afterSkills: ["Vocabulario de diseño", "Saber qué te gusta visualmente"],
    barrierBefore: 70,
    barrierAfter: 15,
    insight: "La IA eliminó la barrera entre 'tener una idea visual' y 'verla implementada'. El diseñador ahora dirige más que codifica.",
  },
  // === INTELIGENCIA Y DECISIÓN ===
  {
    id: "ml",
    cat: "intelligence",
    icon: "🧠",
    beforeName: "Machine Learning clásico (features, pipelines, modelos)",
    afterName: "Buenos ejemplos + criterios de calidad + evaluación",
    beforeDesc: "Para agregar 'inteligencia' necesitabas ML completo: limpiar datasets, feature engineering, elegir algoritmos, entrenar modelos, ajustar hiperparámetros, evaluar métricas. Meses de trabajo técnico.",
    afterDesc: "Muchas tareas de clasificación, extracción y predicción se resuelven con IA directa (zero-shot o few-shot). El valor pasa a dar buenos ejemplos, definir criterios de calidad y diseñar evaluaciones.",
    beforeSkills: ["Feature engineering", "Scikit-learn/TensorFlow", "Hiperparámetros", "Cross-validation"],
    afterSkills: ["Dar buenos ejemplos", "Definir criterios de calidad", "Evaluar resultados"],
    barrierBefore: 90,
    barrierAfter: 25,
    insight: "El ML clásico exigía datos + código + matemáticas. La IA generativa lo reemplaza en muchos casos con ejemplos + criterio + evaluación. Pero para escala y precisión extrema, ML sigue siendo rey.",
  },
  {
    id: "prompts",
    cat: "intelligence",
    icon: "✨",
    beforeName: "\"Prompt engineering\" como magia",
    afterName: "Diseño de proceso: contexto + datos + validación",
    beforeDesc: "Hace poco parecía que lo más importante era encontrar el prompt perfecto: las palabras mágicas, el orden exacto, los trucos. Se trataba como un arte oscuro con 'secretos'.",
    afterDesc: "Se traduce a diseño de proceso completo: contexto correcto + datos relevantes + validación + herramientas disponibles + criterios de éxito. El prompt es solo una pieza del sistema.",
    beforeSkills: ["Redacción de prompts", "Trucos y hacks", "\"Piensa paso a paso\""],
    afterSkills: ["Diseño de procesos", "Definir contexto", "Seleccionar datos", "Validar outputs"],
    barrierBefore: 40,
    barrierAfter: 30,
    insight: "El prompt engineering no muere, pero madura: pasa de 'encontrar las palabras mágicas' a 'diseñar el sistema completo'. Es ingeniería de procesos, no hechicería.",
  },
  // === OPERACIÓN Y CONOCIMIENTO ===
  {
    id: "docs",
    cat: "ops",
    icon: "📚",
    beforeName: "Documentación técnica extensa",
    afterName: "IA que resume, guía y valida",
    beforeDesc: "Leer docs era obligatorio para avanzar. Páginas y páginas de documentación técnica, changelogs, guías de migración. Sin leer la doc completa, te atabas.",
    afterDesc: "La IA resume la documentación, te guía paso a paso y responde preguntas puntuales. Tú necesitas saber qué objetivo persigues y validar que la integración hace lo correcto.",
    beforeSkills: ["Leer documentación extensa", "Entender APIs docs", "Buscar en StackOverflow"],
    afterSkills: ["Definir el objetivo", "Validar la implementación"],
    barrierBefore: 60,
    barrierAfter: 15,
    insight: "La documentación sigue existiendo y siendo importante, pero ya no necesitas LEERLA TODA tú. La IA es tu asistente de lectura. Tu rol es saber qué preguntar.",
  },
  {
    id: "systems",
    cat: "ops",
    icon: "🧭",
    beforeName: "Saber \"de memoria\" cómo funciona cada sistema",
    afterName: "IA ayuda a descubrir + tú defines el estándar",
    beforeDesc: "El experto era el que conocía cada pantalla, cada campo, cada menú de cada sistema. Ese conocimiento tácito tardaba años en construirse y se iba cuando se iba la persona.",
    afterDesc: "La IA ayuda a descubrir y usar los sistemas. El valor humano se desplaza a definir el estándar: nombres correctos, reglas de negocio, excepciones, criterios de calidad.",
    beforeSkills: ["Conocimiento de pantallas y campos", "Experiencia acumulada", "Memoria del sistema"],
    afterSkills: ["Definir estándares", "Reglas de negocio", "Criterios de calidad"],
    barrierBefore: 65,
    barrierAfter: 20,
    insight: "El conocimiento 'de memoria' era poder. Ahora ese conocimiento se externaliza a la IA. El poder real pasa a quien define las reglas, no a quien memoriza los menús.",
  },
  {
    id: "errors",
    cat: "ops",
    icon: "🚨",
    beforeName: "Gestión manual de errores",
    afterName: "Reintentos automáticos + alertas claras + \"plan B\"",
    beforeDesc: "Si fallaba algo, se rompía todo: revisar logs crípticos, encontrar el error, hacer fix manual, reiniciar. Muchas automatizaciones frágiles se abandonaban porque mantenerlas era agotador.",
    afterDesc: "Se traduce a reintentos automáticos, alertas claras y 'planes B'. Tú decides: qué hacer si falla (reintentar, pedir aprobación, mandar alerta, ruta alternativa). La IA hasta diagnostica el error.",
    beforeSkills: ["Leer logs", "Debug manual", "Try/catch", "Monitoreo reactivo"],
    afterSkills: ["Definir plan B", "Criterios de reintento", "Escalamiento"],
    barrierBefore: 70,
    barrierAfter: 20,
    insight: "Antes reaccionabas a los errores. Ahora los anticipas: diseñas qué pasa si falla, y la IA se encarga de ejecutar tu plan B.",
  },
  {
    id: "monitoring",
    cat: "ops",
    icon: "📊",
    beforeName: "Monitoreo técnico (observabilidad \"pesada\")",
    afterName: "Historial claro: qué entró, qué salió, cuánto costó",
    beforeDesc: "Era cosa de ingenieros: Grafana, Prometheus, ELK stack, métricas custom, alertas con umbrales, dashboards de infraestructura. Necesitabas otro equipo solo para el monitoreo.",
    afterDesc: "Se traduce a algo más simple pero clave: historial de ejecuciones, 'qué entró', 'qué salió', 'cuánto costó', 'por qué falló'. La IA puede generar los dashboards y explicar las anomalías.",
    beforeSkills: ["Grafana/Prometheus", "ELK stack", "Métricas custom", "Alertas"],
    afterSkills: ["Definir qué monitorear", "Preguntar '¿por qué falló?'"],
    barrierBefore: 80,
    barrierAfter: 20,
    insight: "El monitoreo no desaparece — se democratiza. Antes era para ingenieros de infra; ahora cualquiera puede preguntar '¿qué pasó?' y obtener una respuesta clara.",
  },
];

function BarMini({ value, color }) {
  return (
    <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden", flex: 1 }}>
      <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 2, transition: "width 0.5s ease" }} />
    </div>
  );
}

export default function ConceptsCombined() {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const filtered = filter === "all" ? concepts : concepts.filter(c => c.cat === filter);
  const activeCategory = categories.find(c => c.id === filter);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080C14",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#E2E8F0",
      padding: "32px 16px",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: 940, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 6 }}>
            <div style={{
              width: 4, height: 48, flexShrink: 0, borderRadius: 2,
              background: "linear-gradient(180deg, #3B82F6, #F59E0B, #8B5CF6, #EC4899, #14B8A6)",
            }} />
            <div>
              <h1 style={{
                fontSize: 22, fontWeight: 800, margin: 0, lineHeight: 1.25, letterSpacing: "-0.5px",
                background: "linear-gradient(135deg, #F8FAFC, #94A3B8)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Lo que antes tenías que saber
              </h1>
              <h1 style={{
                fontSize: 22, fontWeight: 800, margin: 0, lineHeight: 1.25, letterSpacing: "-0.5px",
                background: "linear-gradient(135deg, #F59E0B, #EF4444)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                vs. lo que ahora la IA resuelve por ti
              </h1>
            </div>
          </div>
          <p style={{ fontSize: 12, color: "#475569", margin: "10px 0 0 14px", lineHeight: 1.5 }}>
            {concepts.length} conceptos que eran imprescindibles y que la IA está abstrayendo — el conocimiento no desaparece, se redistribuye
          </p>
        </div>

        {/* Category filters */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20,
          padding: "10px 12px", background: "rgba(255,255,255,0.02)",
          borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)",
        }}>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => { setFilter(cat.id); setExpanded(null); }}
              style={{
                background: filter === cat.id ? `${cat.color}18` : "transparent",
                border: `1px solid ${filter === cat.id ? `${cat.color}44` : "rgba(255,255,255,0.06)"}`,
                borderRadius: 8, padding: "6px 12px", cursor: "pointer",
                fontSize: 11, fontWeight: filter === cat.id ? 700 : 500,
                color: filter === cat.id ? cat.color : "#64748B",
                transition: "all 0.2s",
              }}
            >
              {cat.label}
              {cat.id !== "all" && (
                <span style={{ marginLeft: 4, opacity: 0.6 }}>
                  ({concepts.filter(c => c.cat === cat.id).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 16, marginBottom: 16, paddingLeft: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 16, height: 4, background: "#EF4444", borderRadius: 2 }} />
            <span style={{ fontSize: 10, color: "#64748B" }}>Barrera antes</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 16, height: 4, background: "#22C55E", borderRadius: 2 }} />
            <span style={{ fontSize: 10, color: "#64748B" }}>Barrera ahora</span>
          </div>
        </div>

        {/* Concepts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map((c) => {
            const isOpen = expanded === c.id;
            const reduction = c.barrierBefore - c.barrierAfter;
            const catColor = categories.find(cat => cat.id === c.cat)?.color || "#94A3B8";

            return (
              <div key={c.id}
                onClick={() => setExpanded(isOpen ? null : c.id)}
                style={{
                  background: isOpen ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.015)",
                  border: `1px solid ${isOpen ? `${catColor}33` : "rgba(255,255,255,0.04)"}`,
                  borderRadius: 14, cursor: "pointer", transition: "all 0.25s ease",
                  borderLeft: `3px solid ${isOpen ? catColor : "rgba(255,255,255,0.06)"}`,
                }}>

                {/* Row header */}
                <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{c.icon}</span>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
                      <span style={{
                        fontSize: 12, fontWeight: 600, color: "#F87171",
                        textDecoration: "line-through", opacity: 0.8, textDecorationThickness: "1px",
                      }}>{c.beforeName}</span>
                      <span style={{ fontSize: 11, color: "#334155" }}>→</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#4ADE80" }}>
                        {c.afterName}
                      </span>
                    </div>

                    {/* Mini bars */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
                        <span style={{ fontSize: 9, color: "#64748B", width: 10, flexShrink: 0, textAlign: "right" }}>{c.barrierBefore}</span>
                        <BarMini value={c.barrierBefore} color="#EF4444" />
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
                        <span style={{ fontSize: 9, color: "#64748B", width: 10, flexShrink: 0, textAlign: "right" }}>{c.barrierAfter}</span>
                        <BarMini value={c.barrierAfter} color="#22C55E" />
                      </div>
                      <span style={{
                        fontSize: 10, fontWeight: 800, color: "#22C55E",
                        background: "rgba(34,197,94,0.08)", padding: "2px 6px",
                        borderRadius: 5, flexShrink: 0, fontVariantNumeric: "tabular-nums",
                      }}>−{reduction}%</span>
                    </div>
                  </div>

                  <div style={{
                    fontSize: 11, color: "#334155", flexShrink: 0,
                    transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "none",
                  }}>▼</div>
                </div>

                {/* Expanded */}
                {isOpen && (
                  <div style={{ padding: "0 16px 16px", animation: "fadeSlide 0.25s ease" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {/* Before */}
                      <div style={{
                        background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)",
                        borderRadius: 10, padding: "14px 12px",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#EF4444" }} />
                          <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 700, color: "#EF4444" }}>Antes</span>
                        </div>
                        <p style={{ fontSize: 11, color: "#B0BEC5", lineHeight: 1.6, margin: "0 0 10px" }}>{c.beforeDesc}</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                          {c.beforeSkills.map(s => (
                            <span key={s} style={{
                              fontSize: 8, padding: "2px 6px", background: "rgba(239,68,68,0.08)",
                              color: "#FCA5A5", borderRadius: 4, border: "1px solid rgba(239,68,68,0.12)",
                            }}>{s}</span>
                          ))}
                        </div>
                      </div>
                      {/* After */}
                      <div style={{
                        background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.12)",
                        borderRadius: 10, padding: "14px 12px",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 6px rgba(34,197,94,0.4)" }} />
                          <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 700, color: "#22C55E" }}>Ahora</span>
                        </div>
                        <p style={{ fontSize: 11, color: "#B0BEC5", lineHeight: 1.6, margin: "0 0 10px" }}>{c.afterDesc}</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                          {c.afterSkills.map(s => (
                            <span key={s} style={{
                              fontSize: 8, padding: "2px 6px", background: "rgba(34,197,94,0.08)",
                              color: "#86EFAC", borderRadius: 4, border: "1px solid rgba(34,197,94,0.12)",
                            }}>{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Insight */}
                    <div style={{
                      marginTop: 10, padding: "10px 14px",
                      background: `${catColor}08`, border: `1px solid ${catColor}18`,
                      borderRadius: 8, borderLeft: `3px solid ${catColor}`,
                    }}>
                      <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 1, color: catColor, fontWeight: 700 }}>💡 La clave</span>
                      <p style={{ fontSize: 11, color: "#CBD5E1", lineHeight: 1.6, margin: "4px 0 0", fontStyle: "italic" }}>{c.insight}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div style={{
          marginTop: 32, padding: "22px 20px",
          background: "linear-gradient(135deg, rgba(59,130,246,0.06), rgba(236,72,153,0.04))",
          border: "1px solid rgba(59,130,246,0.15)", borderRadius: 14,
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#F8FAFC", margin: "0 0 8px" }}>
            🧠 El patrón que se repite en los {concepts.length} conceptos
          </h3>
          <p style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.7, margin: 0 }}>
            En cada caso, <strong style={{ color: "#F59E0B" }}>el conocimiento no desaparece — se redistribuye</strong>.
            La IA absorbe la complejidad mecánica (la sintaxis, los comandos, la plomería técnica) y la habilidad crítica se desplaza hacia:
            <strong style={{ color: "#8B5CF6" }}> saber qué pedir, cómo validar, cuándo la IA se equivoca, y dónde poner los límites</strong>.
            Quien entiende los fundamentos técnicos <em>y</em> sabe aprovechar la IA tiene una ventaja compuesta.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
