import { useState, useEffect, useRef } from "react";
import {
import React from "react";
import ReactDOM from "react-dom/client";
  Home, Navigation, AlertTriangle, Grid, Settings,
  Zap, Clock, Users, Wifi, WifiOff, Bell, MapPin,
  Truck, RefreshCw, CheckCircle, XCircle, ChevronRight,
  Bus, Train, Car, RotateCcw, Send, Shield
} from "lucide-react";

const ALERT_CONFIG = {
  green: {
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.25)",
    label: "VÍA LIBRE",
    title: "Sin Incidentes",
    desc: "Condiciones óptimas en toda la ruta. SmartFlow no detecta congestiones en los próximos 3 km. Ola verde activa.",
    time: 12, speed: 50,
    lights: ["g","g","g","g","g"],
    lightDesc: "5/5 semáforos en verde — ola verde activa",
    showRedir: false,
  },
  orange: {
    color: "#f97316",
    bg: "rgba(249,115,22,0.1)",
    border: "rgba(249,115,22,0.25)",
    label: "MODERADO",
    title: "Congestión Moderada",
    desc: "Se detectan 2 semáforos bloqueados en Av. Independencia. SmartFlow anticipa un retraso de +8 min. Considera salida alternativa.",
    time: 20, speed: 28,
    lights: ["g","g","y","g","r"],
    lightDesc: "3/5 semáforos libres — 2 con demora",
    showRedir: false,
  },
  red: {
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.25)",
    label: "CRÍTICO",
    title: "Tráfico Severo",
    desc: "Congestión crítica detectada. Múltiples bloqueos en ruta principal. SmartFlow recomienda ruta alternativa inmediata.",
    time: 35, speed: 12,
    lights: ["r","r","r","y","r"],
    lightDesc: "0/5 semáforos libres — redirección urgente",
    showRedir: true,
  },
};

function TrafficLight({ state }) {
  const colors = { r: "#ef4444", y: "#eab308", g: "#22c55e" };
  const glow = { r: "0 0 8px #ef4444", y: "0 0 8px #eab308", g: "0 0 8px #22c55e" };
  return (
    <div style={{ width: 26, height: 60, background: "#0f172a", borderRadius: 6, border: "0.5px solid #334155", padding: "5px 6px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
      {["r","y","g"].map(s => (
        <div key={s} style={{ width: 12, height: 12, borderRadius: "50%", background: state === s ? colors[s] : "#1e293b", boxShadow: state === s ? glow[s] : "none" }} />
      ))}
    </div>
  );
}

function Toggle({ on, onToggle }) {
  return (
    <button onClick={onToggle} style={{ width: 44, height: 26, background: on ? "#3b82f6" : "#334155", borderRadius: 13, border: "none", position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ width: 20, height: 20, background: "#fff", borderRadius: "50%", position: "absolute", top: 3, left: on ? 21 : 3, transition: "left 0.2s" }} />
    </button>
  );
}

function SectionHome({ onNav }) {
  return (
    <div>
      <div style={{ padding: "4px 20px 12px" }}>
        <div style={{ color: "#64748b", fontSize: 11, fontWeight: 500, letterSpacing: "0.8px" }}>BUENOS DÍAS</div>
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 500, marginTop: 2 }}>Lampa, Chile</div>
      </div>

      {/* Map placeholder */}
      <div style={{ margin: "0 16px 16px", borderRadius: 18, overflow: "hidden", height: 200, background: "#1a2744", position: "relative" }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.3 }}>
          {[30,55,75].map(y => <line key={y} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#2d4a7a" strokeWidth="3" />)}
          {[25,50,72].map(x => <line key={x} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#2d4a7a" strokeWidth="3" />)}
        </svg>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 60, height: 60, border: "2px solid #3b82f6", borderRadius: "50%", opacity: 0.4, animation: "pulse 2s infinite" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-70%)" }}>
          <div style={{ width: 34, height: 34, background: "#3b82f6", borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)", display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #fff" }}>
            <MapPin size={14} color="#fff" style={{ transform: "rotate(45deg)" }} />
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(15,23,42,0.85)", borderRadius: 10, padding: "6px 10px" }}>
          <div style={{ color: "#fff", fontSize: 12, fontWeight: 500 }}>Av. Lampa - Colina</div>
          <div style={{ color: "#64748b", fontSize: 10 }}>Ruta Principal</div>
        </div>
        <div style={{ position: "absolute", top: 12, right: 12, background: "#22c55e", borderRadius: 8, padding: "4px 8px", fontSize: 10, fontWeight: 500, color: "#fff", display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 6, height: 6, background: "#fff", borderRadius: "50%", animation: "blink 1.5s infinite" }} />
          EN VIVO
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: "flex", gap: 10, margin: "0 16px 16px" }}>
        {[
          { icon: <Zap size={14} color="#3b82f6" />, bg: "rgba(59,130,246,0.15)", val: "30", unit: " km/h", label: "Velocidad Prom." },
          { icon: <Clock size={14} color="#22c55e" />, bg: "rgba(34,197,94,0.15)", val: "12", unit: " min", label: "Tiempo Estimado" },
          { icon: <Users size={14} color="#a855f7" />, bg: "rgba(168,85,247,0.15)", val: "1.2k", unit: "", label: "Vehículos Activos" },
        ].map((m, i) => (
          <div key={i} style={{ flex: 1, background: "#1e293b", borderRadius: 14, padding: "12px 10px", border: "0.5px solid #334155" }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>{m.icon}</div>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: 500 }}>{m.val}<span style={{ color: "#64748b", fontSize: 11 }}>{m.unit}</span></div>
            <div style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, margin: "0 16px 16px" }}>
        <button onClick={() => onNav("nav")} style={{ flex: 1, background: "#3b82f6", border: "none", borderRadius: 14, padding: 13, color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <Navigation size={16} color="#fff" /> Iniciar Ruta
        </button>
        <button onClick={() => onNav("nav")} style={{ flex: 1, background: "#1e293b", border: "0.5px solid #334155", borderRadius: 14, padding: 13, color: "#e2e8f0", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <Bell size={16} /> Ver Alertas
        </button>
      </div>

      <div style={{ color: "#64748b", fontSize: 11, fontWeight: 500, letterSpacing: "0.8px", padding: "0 20px", marginBottom: 10 }}>ALERTAS RECIENTES</div>
      {[
        { title: "Ruta Norte libre", badge: "NORMAL", badgeColor: "#22c55e", badgeBg: "rgba(34,197,94,0.15)", desc: "Sin incidentes en Av. Lampa hacia el norte", accent: "#22c55e" },
        { title: "Congestión Moderada", badge: "MODERADO", badgeColor: "#f97316", badgeBg: "rgba(249,115,22,0.15)", desc: "+2 semáforos en Ruta 5 Norte — prever +8 min", accent: "#f97316" },
      ].map((a, i) => (
        <div key={i} style={{ margin: "0 16px 10px", background: "#1e293b", borderRadius: 14, padding: "14px 16px", borderLeft: `3px solid ${a.accent}`, borderTop: "0.5px solid #334155", borderRight: "0.5px solid #334155", borderBottom: "0.5px solid #334155" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <div style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>{a.title}</div>
            <div style={{ fontSize: 10, fontWeight: 500, padding: "2px 8px", borderRadius: 6, background: a.badgeBg, color: a.badgeColor }}>{a.badge}</div>
          </div>
          <div style={{ color: "#94a3b8", fontSize: 12 }}>{a.desc}</div>
        </div>
      ))}
    </div>
  );
}

function SectionNav() {
  const [alertType, setAlertType] = useState("green");
  const cfg = ALERT_CONFIG[alertType];

  return (
    <div>
      <div style={{ padding: "8px 20px 16px" }}>
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 500 }}>Navegación Inteligente</div>
        <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>Sistema de alertas en tiempo real</div>
      </div>

      {/* Alert selector */}
      <div style={{ display: "flex", gap: 8, margin: "0 16px 16px" }}>
        {[["green","Verde","#22c55e","rgba(34,197,94,0.15)"],["orange","Naranja","#f97316","rgba(249,115,22,0.15)"],["red","Rojo","#ef4444","rgba(239,68,68,0.15)"]].map(([t, label, color, bg]) => (
          <button key={t} onClick={() => setAlertType(t)} style={{ flex: 1, padding: "10px 4px", borderRadius: 12, border: alertType === t ? `0.5px solid ${color}` : "0.5px solid #334155", background: alertType === t ? bg : "#1e293b", color: alertType === t ? color : "#64748b", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>{label}</button>
        ))}
      </div>

      {/* Alert box */}
      <div style={{ margin: "0 16px 16px", borderRadius: 18, padding: 20, background: cfg.bg, border: `1px solid ${cfg.border}` }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: cfg.bg, border: `1px solid ${cfg.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
          {alertType === "green" ? <CheckCircle size={24} color={cfg.color} /> : alertType === "orange" ? <AlertTriangle size={24} color={cfg.color} /> : <XCircle size={24} color={cfg.color} />}
        </div>
        <div style={{ fontSize: 18, fontWeight: 500, color: cfg.color, marginBottom: 4 }}>{cfg.title}</div>
        <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5, marginBottom: 16 }}>{cfg.desc}</div>
        {cfg.showRedir && (
          <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: 14, background: "#ef4444", border: "none", borderRadius: 14, color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            <RotateCcw size={16} color="#fff" /> Redirigir Ahora
          </button>
        )}
      </div>

      {/* Traffic lights */}
      <div style={{ margin: "0 16px 16px" }}>
        <div style={{ color: "#64748b", fontSize: 11, fontWeight: 500, letterSpacing: "0.8px", marginBottom: 10 }}>SEMÁFOROS EN RUTA</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          {cfg.lights.map((s, i) => <TrafficLight key={i} state={s} />)}
        </div>
        <div style={{ color: "#64748b", fontSize: 11 }}>{cfg.lightDesc}</div>
      </div>

      {/* Metrics */}
      <div style={{ display: "flex", gap: 10, margin: "0 16px 16px" }}>
        <div style={{ flex: 1, background: "#1e293b", borderRadius: 14, padding: "12px 14px", border: "0.5px solid #334155" }}>
          <div style={{ color: "#64748b", fontSize: 11, marginBottom: 4 }}>Tiempo estimado</div>
          <div style={{ color: "#fff", fontSize: 20, fontWeight: 500 }}>{cfg.time}<span style={{ color: "#64748b", fontSize: 11 }}> min</span></div>
        </div>
        <div style={{ flex: 1, background: "#1e293b", borderRadius: 14, padding: "12px 14px", border: "0.5px solid #334155" }}>
          <div style={{ color: "#64748b", fontSize: 11, marginBottom: 4 }}>Velocidad suger.</div>
          <div style={{ color: "#fff", fontSize: 20, fontWeight: 500 }}>{cfg.speed}<span style={{ color: "#64748b", fontSize: 11 }}> km/h</span></div>
        </div>
      </div>
    </div>
  );
}

function SectionEmerg() {
  const [synced, setSynced] = useState(false);
  const [dest, setDest] = useState("CDT Norte, Lampa");
  const [syncing, setSyncing] = useState(false);

  function handleSync() {
    setSyncing(true);
    setSynced(false);
    setTimeout(() => { setSyncing(false); setSynced(true); }, 1500);
  }

  return (
    <div>
      <div style={{ padding: "8px 20px 16px" }}>
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 500 }}>Modo Emergencia</div>
        <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>Despacho de vehículo prioritario</div>
      </div>

      <div style={{ margin: "0 16px 16px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 18, padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, background: "#ef4444", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Truck size={20} color="#fff" />
        </div>
        <div>
          <div style={{ color: "#ef4444", fontSize: 14, fontWeight: 500 }}>AMBULANCIA ACTIVA</div>
          <div style={{ color: "#94a3b8", fontSize: 12 }}>Unidad SF-EMG-007 • Prioridad Máxima</div>
        </div>
      </div>

      {/* Priority route */}
      <div style={{ margin: "0 16px 12px", background: "#1e293b", borderRadius: 14, padding: 16, border: "0.5px solid #334155" }}>
        <div style={{ color: "#64748b", fontSize: 11, fontWeight: 500, letterSpacing: "0.5px", marginBottom: 8 }}>RUTA PRIORITARIA</div>
        <div style={{ color: "#60a5fa", fontSize: 15, fontWeight: 500 }}>Hospital Lampa → CDT Norte</div>
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, background: "#22c55e", borderRadius: "50%" }} />
          <span style={{ color: "#94a3b8", fontSize: 12 }}>Despejada • 3.2 km • ETA 4 min</span>
        </div>
      </div>

      {/* SmartLight sync */}
      <div style={{ margin: "0 16px 12px", background: "#1e293b", borderRadius: 14, padding: 16, border: "0.5px solid #334155" }}>
        <div style={{ color: "#64748b", fontSize: 11, fontWeight: 500, letterSpacing: "0.5px", marginBottom: 12 }}>SINCRONIZACIÓN SMARTLIGHT</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: syncing ? "#eab308" : synced ? "#22c55e" : "#ef4444", animation: "blink 1.5s infinite" }} />
            <span style={{ color: syncing ? "#eab308" : synced ? "#22c55e" : "#ef4444", fontSize: 13, fontWeight: 500 }}>
              {syncing ? "Sincronizando..." : synced ? "Sincronizado ✓" : "No sincronizado"}
            </span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {(synced ? ["g","g","g"] : ["r","r","r"]).map((s, i) => <TrafficLight key={i} state={s} />)}
          </div>
        </div>
      </div>

      {/* Destination */}
      <div style={{ margin: "0 16px 12px", background: "#1e293b", borderRadius: 14, padding: 16, border: "0.5px solid #334155" }}>
        <div style={{ color: "#64748b", fontSize: 11, fontWeight: 500, letterSpacing: "0.5px", marginBottom: 8 }}>DESTINO DE EMERGENCIA</div>
        <input value={dest} onChange={e => setDest(e.target.value)} style={{ width: "100%", background: "#0f172a", border: "0.5px solid #334155", borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 14, outline: "none" }} placeholder="Ingresar destino..." />
        <button onClick={handleSync} style={{ marginTop: 8, width: "100%", padding: 10, background: "#ef4444", border: "none", borderRadius: 10, color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
          Recalcular Ruta Prioritaria
        </button>
      </div>

      <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "calc(100% - 32px)", margin: "0 16px 16px", padding: 14, background: "#ef4444", border: "none", borderRadius: 14, color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
        <Send size={16} color="#fff" /> Despachar Unidad
      </button>
    </div>
  );
}

function SectionPlan() {
  const [selected, setSelected] = useState("taxi");
  const options = [
    { id: "taxi", Icon: Car, color: "#3b82f6", bg: "rgba(59,130,246,0.15)", title: "SmartFlow Taxi", sub: "Prioridad habilitada", time: "18 min", price: "$3.200 CLP", tags: [{ label: "⚡ Ola Verde Activa", bg: "rgba(59,130,246,0.15)", color: "#60a5fa" }, { label: "V2I Conectado", bg: "rgba(34,197,94,0.15)", color: "#4ade80" }, { label: "Más Rápido", bg: "rgba(59,130,246,0.1)", color: "#60a5fa" }] },
    { id: "micro", Icon: Bus, color: "#eab308", bg: "rgba(234,179,8,0.15)", title: "Microbus 230", sub: "Ruta directa", time: "34 min", price: "$800 CLP", tags: [{ label: "Sin Prioridad", bg: "rgba(249,115,22,0.15)", color: "#fb923c" }, { label: "3 paraderos", bg: "rgba(100,116,139,0.15)", color: "#94a3b8" }] },
    { id: "metro", Icon: Train, color: "#a855f7", bg: "rgba(168,85,247,0.15)", title: "Metro + Bus", sub: "Ruta combinada", time: "45 min", price: "$1.450 CLP", tags: [{ label: "Metro L2", bg: "rgba(168,85,247,0.15)", color: "#c084fc" }, { label: "1 transbordo", bg: "rgba(100,116,139,0.15)", color: "#94a3b8" }] },
  ];

  return (
    <div>
      <div style={{ padding: "8px 20px 16px" }}>
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 500 }}>Planificador Multimodal</div>
        <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>Comparar opciones de viaje</div>
      </div>

      <div style={{ margin: "0 16px 14px", background: "#1e293b", borderRadius: 14, padding: "12px 14px", border: "0.5px solid #334155", display: "flex", alignItems: "center", gap: 10 }}>
        <MapPin size={14} color="#64748b" />
        <span style={{ color: "#475569", fontSize: 13 }}>Centro Lampa → Mall Arauco Maipú</span>
      </div>

      {options.map(opt => {
        const isSelected = selected === opt.id;
        return (
          <div key={opt.id} onClick={() => setSelected(opt.id)} style={{ margin: "0 16px 12px", background: isSelected ? "rgba(59,130,246,0.08)" : "#1e293b", borderRadius: 16, padding: 16, border: isSelected ? "1px solid #3b82f6" : "0.5px solid #334155", cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: opt.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <opt.Icon size={18} color={opt.color} />
                </div>
                <div>
                  <div style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>{opt.title}</div>
                  <div style={{ color: "#64748b", fontSize: 11 }}>{opt.sub}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#fff", fontSize: 18, fontWeight: 500 }}>{opt.time}</div>
                <div style={{ color: "#64748b", fontSize: 11 }}>{opt.price}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {opt.tags.map((t, i) => (
                <div key={i} style={{ padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 500, background: t.bg, color: t.color }}>{t.label}</div>
              ))}
            </div>
          </div>
        );
      })}

      <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "calc(100% - 32px)", margin: "4px 16px 16px", padding: 14, background: "#3b82f6", border: "none", borderRadius: 14, color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
        <Navigation size={16} color="#fff" /> Confirmar Ruta
      </button>
    </div>
  );
}

function SectionSettings() {
  const [vehicleId, setVehicleId] = useState("");
  const [toggles, setToggles] = useState({ smartlight: true, alerts: true, share: false });
  const connected = vehicleId.length >= 5;

  function toggle(key) {
    setToggles(t => ({ ...t, [key]: !t[key] }));
  }

  return (
    <div>
      <div style={{ padding: "8px 20px 16px" }}>
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 500 }}>Configuración</div>
        <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>Red V2I y preferencias</div>
      </div>

      {/* Vehicle ID */}
      <div style={{ margin: "0 16px 20px" }}>
        <div style={{ color: "#64748b", fontSize: 11, fontWeight: 500, letterSpacing: "0.8px", marginBottom: 10 }}>CONEXIÓN SMARTFLOW</div>
        <div style={{ background: "#1e293b", borderRadius: 16, border: "0.5px solid #334155", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: "0.5px solid #0f172a" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(59,130,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {connected ? <Wifi size={16} color="#3b82f6" /> : <WifiOff size={16} color="#64748b" />}
              </div>
              <div>
                <div style={{ color: "#e2e8f0", fontSize: 14 }}>ID de Vehículo</div>
                <div style={{ color: "#64748b", fontSize: 11 }}>{connected ? `ID: ${vehicleId.toUpperCase()}` : "No conectado"}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: connected ? "#22c55e" : "#ef4444" }} />
              <span style={{ fontSize: 12, color: connected ? "#22c55e" : "#ef4444" }}>{connected ? "Online" : "Offline"}</span>
            </div>
          </div>
          <div style={{ padding: "10px 16px 14px" }}>
            <input value={vehicleId} onChange={e => setVehicleId(e.target.value)} placeholder="Ej: ABC-123" style={{ width: "100%", background: "#0f172a", border: vehicleId.length >= 5 ? "0.5px solid #3b82f6" : "0.5px solid #334155", borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            {connected && (
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <Shield size={12} color="#22c55e" />
                <span style={{ color: "#22c55e", fontSize: 11 }}>Conectado a la red SMARTFLOW</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div style={{ margin: "0 16px 20px" }}>
        <div style={{ color: "#64748b", fontSize: 11, fontWeight: 500, letterSpacing: "0.8px", marginBottom: 10 }}>FUNCIONES DE PRIORIDAD</div>
        <div style={{ background: "#1e293b", borderRadius: 16, border: "0.5px solid #334155", overflow: "hidden" }}>
          {[
            { key: "smartlight", Icon: Zap, iconBg: "rgba(34,197,94,0.15)", iconColor: "#22c55e", label: "Prioridad SmartLight", sub: "Ola verde en semáforos" },
            { key: "alerts", Icon: AlertTriangle, iconBg: "rgba(249,115,22,0.15)", iconColor: "#f97316", label: "Alertas Anticipadas", sub: "Notificaciones de congestión" },
            { key: "share", Icon: Users, iconBg: "rgba(168,85,247,0.15)", iconColor: "#a855f7", label: "Modo Compartido", sub: "Datos anónimos de ruta" },
          ].map(({ key, Icon, iconBg, iconColor, label, sub }, i, arr) => (
            <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: i < arr.length - 1 ? "0.5px solid #0f172a" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={16} color={iconColor} />
                </div>
                <div>
                  <div style={{ color: "#e2e8f0", fontSize: 14 }}>{label}</div>
                  <div style={{ color: "#64748b", fontSize: 11 }}>{toggles[key] ? "Habilitado" : "Deshabilitado"} • {sub}</div>
                </div>
              </div>
              <Toggle on={toggles[key]} onToggle={() => toggle(key)} />
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div style={{ margin: "0 16px 20px" }}>
        <div style={{ color: "#64748b", fontSize: 11, fontWeight: 500, letterSpacing: "0.8px", marginBottom: 10 }}>ACERCA DE</div>
        <div style={{ background: "#1e293b", borderRadius: 16, border: "0.5px solid #334155" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px" }}>
            <div>
              <div style={{ color: "#e2e8f0", fontSize: 14 }}>SmartFlow v2.4.1</div>
              <div style={{ color: "#64748b", fontSize: 11 }}>Red V2I • Lampa, Chile</div>
            </div>
            <span style={{ color: "#22c55e", fontSize: 12 }}>Estable</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const NAV_ITEMS = [
  { id: "home", label: "Inicio", Icon: Home },
  { id: "nav", label: "Navegar", Icon: Navigation },
  { id: "emerg", label: "Emergencia", Icon: AlertTriangle },
  { id: "plan", label: "Planner", Icon: Grid },
  { id: "settings", label: "Ajustes", Icon: Settings },
];

export default function SmartFlow() {
  const [active, setActive] = useState("home");

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "transparent", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "16px 0" }}>
      <style>{`
        @keyframes pulse { 0%{transform:translate(-50%,-50%) scale(0.8);opacity:0.6} 100%{transform:translate(-50%,-50%) scale(2);opacity:0} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
      <div style={{ width: 390, background: "#0f172a", minHeight: 700, borderRadius: 28, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", border: "1px solid #1e293b" }}>
        {/* Status bar */}
        <div style={{ background: "#0f172a", padding: "10px 20px 4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>9:41</span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ color: "#94a3b8", fontSize: 11 }}>▲▲▲ WiFi 100%</span>
          </div>
        </div>

        {/* Header */}
        <div style={{ background: "#0f172a", padding: "8px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, background: "#3b82f6", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={14} color="#fff" />
            </div>
            <div>
              <div style={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>SmartFlow</div>
              <div style={{ color: "#3b82f6", fontSize: 10, fontWeight: 500, letterSpacing: "1px" }}>URBAN MOBILITY</div>
            </div>
          </div>
          <button style={{ width: 32, height: 32, borderRadius: "50%", background: "#1e293b", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
            <Bell size={15} color="#94a3b8" />
            <div style={{ width: 8, height: 8, background: "#ef4444", borderRadius: "50%", position: "absolute", top: 4, right: 4, border: "1.5px solid #0f172a" }} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", background: "#0f172a", paddingBottom: 80 }}>
          {active === "home" && <SectionHome onNav={setActive} />}
          {active === "nav" && <SectionNav />}
          {active === "emerg" && <SectionEmerg />}
          {active === "plan" && <SectionPlan />}
          {active === "settings" && <SectionSettings />}
        </div>

        {/* Bottom nav */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#1e293b", borderTop: "0.5px solid #334155", display: "flex", justifyContent: "space-around", padding: "10px 0 14px" }}>
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setActive(id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", padding: "4px 12px", borderRadius: 10, border: "none", background: "none" }}>
              <Icon size={20} color={active === id ? "#3b82f6" : "#64748b"} />
              <span style={{ fontSize: 10, fontWeight: 500, color: active === id ? "#3b82f6" : "#64748b" }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
