import React, { useState } from "react";
import {
  Home, Navigation, AlertTriangle, Grid, Settings,
  Zap, Clock, Users, Wifi, WifiOff, Bell, MapPin,
  Truck, CheckCircle, XCircle, RotateCcw, Send, Shield,
  Bus, Train, Car
} from "lucide-react";

// --- CONFIGURACIÓN DE ALERTAS ---
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

// --- COMPONENTES ATÓMICOS ---
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

// --- SECCIONES ---
function SectionHome({ onNav }) {
  return (
    <div>
      <div style={{ padding: "4px 20px 12px" }}>
        <div style={{ color: "#64748b", fontSize: 11, fontWeight: 500, letterSpacing: "0.8px" }}>BUENOS DÍAS</div>
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 500, marginTop: 2 }}>Lampa, Chile</div>
      </div>
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
      </div>
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
      <div style={{ display: "flex", gap: 10, margin: "0 16px 16px" }}>
        <button onClick={() => onNav("nav")} style={{ flex: 1, background: "#3b82f6", border: "none", borderRadius: 14, padding: 13, color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <Navigation size={16} color="#fff" /> Iniciar Ruta
        </button>
      </div>
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
      </div>
      <div style={{ display: "flex", gap: 8, margin: "0 16px 16px" }}>
        {["green", "orange", "red"].map((t) => (
          <button key={t} onClick={() => setAlertType(t)} style={{ flex: 1, padding: "10px 4px", borderRadius: 12, background: alertType === t ? ALERT_CONFIG[t].bg : "#1e293b", color: ALERT_CONFIG[t].color, border: "0.5px solid #334155", cursor: "pointer" }}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>
      <div style={{ margin: "0 16px 16px", borderRadius: 18, padding: 20, background: cfg.bg, border: `1px solid ${cfg.border}` }}>
        <div style={{ fontSize: 18, fontWeight: 500, color: cfg.color, marginBottom: 4 }}>{cfg.title}</div>
        <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>{cfg.desc}</div>
      </div>
      <div style={{ margin: "0 16px 16px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          {cfg.lights.map((s, i) => <TrafficLight key={i} state={s} />)}
        </div>
        <div style={{ color: "#64748b", fontSize: 11 }}>{cfg.lightDesc}</div>
      </div>
    </div>
  );
}

function SectionEmerg() {
  const [synced, setSynced] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => { setSyncing(false); setSynced(true); }, 1500);
  };
  return (
    <div style={{ padding: "0 16px" }}>
      <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 18, padding: 16, marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, background: "#ef4444", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}><Truck size={20} color="#fff" /></div>
        <div style={{ color: "#ef4444", fontWeight: "bold" }}>AMBULANCIA ACTIVA</div>
      </div>
      <button onClick={handleSync} style={{ width: "100%", padding: 14, background: "#ef4444", border: "none", borderRadius: 14, color: "#fff", fontWeight: "bold", cursor: "pointer" }}>
        {syncing ? "Sincronizando..." : "Activar Ola Verde"}
      </button>
      {synced && <div style={{ color: "#22c55e", textAlign: "center", marginTop: 10 }}>✓ Ruta Prioritaria Despejada</div>}
    </div>
  );
}

function SectionSettings() {
  const [toggles, setToggles] = useState({ smartlight: true, alerts: true });
  return (
    <div style={{ padding: "0 16px" }}>
      <div style={{ background: "#1e293b", borderRadius: 16, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ color: "#fff" }}>Ola Verde SmartLight</span>
          <Toggle on={toggles.smartlight} onToggle={() => setToggles({...toggles, smartlight: !toggles.smartlight})} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#fff" }}>Alertas de Tráfico</span>
          <Toggle on={toggles.alerts} onToggle={() => setToggles({...toggles, alerts: !toggles.alerts})} />
        </div>
      </div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function SmartFlow() {
  const [active, setActive] = useState("home");

  const NAV_ITEMS = [
    { id: "home", label: "Inicio", Icon: Home },
    { id: "nav", label: "Navegar", Icon: Navigation },
    { id: "emerg", label: "Emergencia", Icon: AlertTriangle },
    { id: "settings", label: "Ajustes", Icon: Settings },
  ];

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", display: "flex", justifyContent: "center", padding: "20px" }}>
      <style>{`
        @keyframes pulse { 0%{transform:translate(-50%,-50%) scale(0.8);opacity:0.6} 100%{transform:translate(-50%,-50%) scale(2);opacity:0} }
        * { box-sizing: border-box; }
      `}</style>
      
      <div style={{ width: 390, height: 700, background: "#0f172a", borderRadius: 30, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", border: "1px solid #1e293b", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
        
        {/* Header */}
        <div style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, background: "#3b82f6", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={16} color="#fff" /></div>
            <span style={{ color: "#fff", fontWeight: "bold" }}>SmartFlow</span>
          </div>
          <Bell size={18} color="#64748b" />
        </div>

        {/* Dynamic Content */}
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: 100 }}>
          {active === "home" && <SectionHome onNav={setActive} />}
          {active === "nav" && <SectionNav />}
          {active === "emerg" && <SectionEmerg />}
          {active === "settings" && <SectionSettings />}
        </div>

        {/* Bottom Navigation */}
        <div style={{ position: "absolute", bottom: 0, width: "100%", background: "#1e293b", display: "flex", justifyContent: "space-around", padding: "15px 0 25px", borderTop: "1px solid #334155" }}>
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setActive(id)} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer" }}>
              <Icon size={20} color={active === id ? "#3b82f6" : "#64748b"} />
              <span style={{ fontSize: 10, color: active === id ? "#3b82f6" : "#64748b" }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
