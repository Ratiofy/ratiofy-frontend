import { X, CheckCircle2 } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-lg bg-surface border border-border shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="w-12 h-12 rounded-xl bg-success/20 text-success flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-2">Desbloquea Ratiofy <span className="text-success">PRO</span></h2>
          <p className="text-muted-foreground mb-8">
            Accede al poder completo de nuestra Inteligencia Artificial para filtrar el mercado sin restricciones.
          </p>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-foreground">
              <CheckCircle2 size={18} className="text-success" />
              <span>Análisis de IA estructurados e ilimitados</span>
            </li>
            <li className="flex items-center gap-3 text-foreground">
              <CheckCircle2 size={18} className="text-success" />
              <span>Estrategias de Inversión personalizadas</span>
            </li>
            <li className="flex items-center gap-3 text-foreground">
              <CheckCircle2 size={18} className="text-success" />
              <span>Filtros avanzados sobre todas las métricas</span>
            </li>
            <li className="flex items-center gap-3 text-foreground">
              <CheckCircle2 size={18} className="text-success" />
              <span>Sincronización de precios diariamente</span>
            </li>
          </ul>

          <div className="pt-6 border-t border-border flex flex-col gap-3">
            <button 
              className="w-full bg-success hover:bg-success/90 text-success-foreground font-bold rounded-xl py-3 transition-colors"
              onClick={() => alert('Pronto integraremos Stripe para el upgrade.')}
            >
              Actualizar a Ratiofy PRO
            </button>
            <button 
              className="w-full bg-transparent hover:bg-muted text-foreground font-medium rounded-xl py-3 transition-colors"
              onClick={onClose}
            >
              Quizás más tarde
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
