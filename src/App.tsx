import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { StockTable } from './components/StockTable';
import {
  BarChart3,
  LayoutDashboard,
  TrendingUp,
  LineChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { UserButton, useUser, useAuth, useClerk } from '@clerk/clerk-react';
import UpgradeModal from './components/UpgradeModal';
import { useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'active' : '';

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-background/80 backdrop-blur-xl z-50 flex flex-col">
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-success flex items-center justify-center shadow-[0_0_15px_var(--color-success)]">
          <TrendingUp size={18} className="text-success-foreground" />
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground">Ratiofy<span className="text-success">.</span></span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Plataforma</p>
        <Link to="/" className={`nav-item ${isActive('/')}`}>
          <LayoutDashboard size={20} />
          <span>Radar de Valor</span>
        </Link>
        <Link to="/analysis" className={`nav-item ${isActive('/analysis')}`}>
          <BarChart3 size={20} />
          <span>Análisis</span>
        </Link>
        <Link to="#" className="nav-item">
          <LineChart size={20} />
          <span>Estrategias</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-border mt-auto mb-4 mx-4 rounded-xl bg-card">
        <div className="flex items-center gap-3">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10 border-2 border-border shadow-sm",
                userButtonPopoverCard: "bg-surface border border-border shadow-xl",
                userButtonPopoverActionButtonText: "text-foreground",
                userButtonPopoverActionButtonIcon: "text-muted-foreground",
                userButtonPopoverFooter: "hidden"
              }
            }}
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">Perfil</span>
            <span className="text-xs text-muted-foreground">Gestionar cuenta</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

const MetricCard = ({ title, value, change, isPositive, icon: Icon }: any) => (
  <div className="metric-card group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2.5 rounded-xl bg-card border border-border text-muted-foreground group-hover:text-success group-hover:border-success/30 transition-colors">
        <Icon size={22} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-success' : 'text-muted-foreground'}`}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {change}
      </div>
    </div>
    <div>
      <h4 className="text-muted-foreground font-medium mb-1">{title}</h4>
      <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
    </div>
  </div>
);

function App() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const clerk = useClerk();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Determinar el Plan
  const isPro = user?.publicMetadata?.stripe_role === 'pro';
  const isFree = isSignedIn && !isPro;
  const isAnon = !isSignedIn;

  const handleStrategyClick = () => {
    if (isAnon) {
      clerk.openSignUp();
    } else if (isFree) {
      setShowUpgradeModal(true);
    } else {
      // lógica normal PRO
    }
  };

  return (
    <div className="font-sans min-h-screen">
      {/* Modal de Upgrade Global */}
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />

      <Routes>

        {/* Dashboard Principal - Radar de Valor (Público, con estados condicionales) */}
        <Route path="/" element={
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-64 p-10">
              <header className="flex flex-col xl:flex-row justify-between xl:items-end gap-6 mb-10">
                <div>
                  <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">Radar de Valor</h1>
                  <p className="text-muted-foreground font-medium">Métricas clave para identificar oportunidades de inversión.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">

                  <div className="flex flex-col gap-1.5 w-full sm:w-48">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1">Estrategia Activa</label>
                    <select className="bg-card border border-border text-foreground text-sm rounded-xl focus:ring-1 focus:ring-success focus:border-success block w-full px-4 py-2.5 outline-none font-medium transition-colors">
                      <option>Crecimiento de Valor</option>
                      <option>Dividendos Seguros</option>
                    </select>
                  </div>

                  {/* Botón Nueva Estrategia con lógica de upgrade */}
                  <div className="flex flex-col justify-end">
                    <button
                      onClick={handleStrategyClick}
                      className="h-[42px] px-4 bg-muted hover:bg-muted/80 text-foreground text-sm font-semibold rounded-xl border border-border transition-colors flex items-center gap-2"
                    >
                      <BarChart3 size={16} />
                      Nueva Estrategia {(isFree && <span className="text-[10px] bg-success/20 text-success px-1.5 py-0.5 rounded ml-1">PRO</span>)}
                    </button>
                  </div>

                  <div className="flex flex-col gap-1.5 w-full sm:w-64 relative">
                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1">Buscar Empresa</label>
                    <input
                      type="text"
                      placeholder="Buscar por NEMO..."
                      className="bg-card border border-border text-foreground text-sm rounded-xl block w-full pl-4 pr-10 py-2.5 outline-none focus:ring-1 focus:ring-success focus:border-success placeholder-muted-foreground font-medium transition-colors"
                    />
                    <svg className="w-4 h-4 text-muted-foreground absolute right-4 top-[32px] pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </div>

                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <MetricCard title="Empresas Analizadas" value="2,845" change="+125 esta semana" isPositive={true} icon={Activity} />
                <MetricCard title="Estrategias Activas" value="12" change="3 en seguimiento" isPositive={true} icon={BarChart3} />
                <MetricCard title="Oportunidades de Valor" value="14" change="Alta convicción" isPositive={true} icon={LineChart} />
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase font-bold tracking-wider text-muted-foreground px-5 py-4 rounded-xl bg-muted/50 border border-border">
                  <span className="text-foreground">Criterios:</span>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                    <span>ROE &gt; 15%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                    <span>Yield &gt; 3%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                    <span>PER &lt; 12</span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-6">Últimos Análisis de Radar</h3>

              <StockTable
                isAnon={isAnon}
                isFree={isFree}
                isPro={isPro}
                onUpgradeClick={() => setShowUpgradeModal(true)}
              />
            </main>
          </div>
        } />

        {/* Vista individual de Análisis */}
        <Route path="/analysis" element={
          <ProtectedRoute>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 ml-64 p-10">
                <h1 className="text-3xl font-bold text-foreground mb-6">Análisis Fundamental</h1>
                <div className="flex justify-center items-center h-[60vh] border border-border border-dashed rounded-2xl bg-muted/10">
                  <p className="text-muted-foreground font-medium">Módulo de análisis en construcción...</p>
                </div>
              </main>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
