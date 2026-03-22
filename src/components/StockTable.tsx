"use client"

// Local utility for Tailwind class merging since we are porting this component directly
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// Types
export interface StockData {
  ticker: string
  name: string
  price: number
  currency: string
  roe: number
  yield: number
  per: number
  decision: "Comprar" | "Mantener" | "Descartar"
}

// Criteria thresholds
const CRITERIA = {
  roe: 15,      // ROE > 15% is good
  yield: 3,     // Yield > 3% is good
  per: 12,      // PER < 12 is good (lower is better)
}

// Check if a stock meets all criteria
function meetsAllCriteria(stock: StockData) {
  return stock.roe > CRITERIA.roe && stock.yield > CRITERIA.yield && stock.per < CRITERIA.per
}

// Check individual criteria
function meetsRoeCriteria(roe: number) { return roe > CRITERIA.roe }
function meetsYieldCriteria(yieldVal: number) { return yieldVal > CRITERIA.yield }
function meetsPerCriteria(per: number) { return per < CRITERIA.per }

// Full dataset - variety of scenarios
export const stockData: StockData[] = [
  // All criteria met - should highlight entire row
  { ticker: "BSANTANDER", name: "Banco Santander Chile", price: 42.80, currency: "CLP", roe: 19.2, yield: 4.8, per: 8.5, decision: "Comprar" },
  { ticker: "BANCO_CHILE", name: "Banco de Chile", price: 98.50, currency: "CLP", roe: 21.4, yield: 5.2, per: 9.1, decision: "Comprar" },
  
  // Two criteria met
  { ticker: "ENELAM", name: "Enel Américas S.A.", price: 112.40, currency: "CLP", roe: 18.2, yield: 5.6, per: 14.9, decision: "Mantener" },
  { ticker: "CMPC", name: "Empresas CMPC S.A.", price: 1845, currency: "CLP", roe: 16.8, yield: 3.4, per: 13.2, decision: "Mantener" },
  
  // One criterion met
  { ticker: "CENCOSUD", name: "Cencosud S.A.", price: 1920, currency: "CLP", roe: 17.3, yield: 2.1, per: 14.8, decision: "Mantener" },
  { ticker: "SQM-B", name: "Sociedad Química y Minera", price: 48.20, currency: "USD", roe: 12.4, yield: 4.2, per: 18.6, decision: "Mantener" },
  { ticker: "CAP", name: "CAP S.A.", price: 7250, currency: "CLP", roe: 9.8, yield: 2.8, per: 10.4, decision: "Mantener" },
  
  // No criteria met
  { ticker: "COPEC", name: "Empresas Copec S.A.", price: 6890, currency: "CLP", roe: 8.7, yield: 2.1, per: 14.4, decision: "Mantener" },
  { ticker: "FALABELLA", name: "Falabella S.A.", price: 2340, currency: "CLP", roe: 6.2, yield: 1.8, per: 22.3, decision: "Descartar" },
  { ticker: "VAPORES", name: "Compañía Sud Americana de Vapores", price: 68.90, currency: "CLP", roe: 4.5, yield: 1.2, per: 28.7, decision: "Descartar" },
  
  // More all criteria met
  { ticker: "ITAUCORP", name: "Itaú Corpbanca", price: 3.25, currency: "CLP", roe: 18.9, yield: 3.8, per: 7.2, decision: "Comprar" },
  
  // Mixed
  { ticker: "COLBUN", name: "Colbún S.A.", price: 142.30, currency: "CLP", roe: 14.2, yield: 3.9, per: 11.8, decision: "Mantener" },
  { ticker: "ECL", name: "Engie Energía Chile", price: 890, currency: "CLP", roe: 11.5, yield: 4.1, per: 9.5, decision: "Mantener" },
]

// ============================================
// OPTION B: Pill/Chip Style (Selected)
// Metrics that meet criteria get a subtle pill background
// All criteria met = row with gradient accent
// ============================================

function MetricValue({ 
  value, 
  unit, 
  meetsTarget = false,
}: { 
  value: number | string
  unit: string
  meetsTarget?: boolean
}) {
  const formattedValue = typeof value === "number" 
    ? value.toLocaleString("es-CL", { minimumFractionDigits: 1, maximumFractionDigits: 1 })
    : value

  return (
    <span className={cn(
      "inline-flex items-baseline justify-end font-mono tabular-nums px-2 py-0.5 rounded-md transition-colors",
      meetsTarget && "bg-success/15 text-success"
    )}>
      <span className={cn(meetsTarget ? "font-medium" : "text-foreground")}>
        {formattedValue}
      </span>
      <span className={cn(
        "ml-0.5 text-[0.65em] font-normal",
        meetsTarget ? "text-success/70" : "text-muted-foreground"
      )}>
        {unit}
      </span>
    </span>
  )
}

function DecisionBadge({ decision, highlight = false }: { decision: StockData["decision"]; highlight?: boolean }) {
  const variants = {
    Comprar: highlight 
      ? "bg-success/20 border-success/50 text-success font-medium" 
      : "bg-success/10 border-success/30 text-success",
    Mantener: "bg-muted border-border text-muted-foreground",
    Descartar: "bg-destructive/10 border-destructive/30 text-destructive",
  }

  return (
    <span className={cn(
      "inline-flex items-center justify-center min-w-[70px] px-2.5 py-0.5 text-xs font-medium rounded-full border transition-colors",
      variants[decision]
    )}>
      {decision}
    </span>
  )
}

function TableHeader() {
  return (
    <div className="grid grid-cols-[minmax(160px,1.5fr)_repeat(4,minmax(80px,1fr))_100px] gap-4 px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground border-b border-border">
      <div className="text-left">Activo</div>
      <div className="text-right">Precio</div>
      <div className="text-right">ROE</div>
      <div className="text-right">Yield</div>
      <div className="text-right">PER</div>
      <div className="text-center">Decisión</div>
    </div>
  )
}

function TableRow({ stock }: { stock: StockData }) {
  const allMet = meetsAllCriteria(stock)
  
  return (
    <div className={cn(
      "group grid grid-cols-[minmax(160px,1.5fr)_repeat(4,minmax(80px,1fr))_100px] gap-4 px-4 py-4 items-center border-b border-border/50 transition-all duration-150 hover:bg-muted/50 cursor-default relative last:border-0",
      allMet && "bg-gradient-to-r from-success/10 via-success/5 to-transparent"
    )}>
      {allMet && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-success rounded-r" />
      )}
      <div className="text-left min-w-0">
        <div className={cn("font-semibold truncate", allMet ? "text-success" : "text-foreground")}>{stock.ticker}</div>
        <div className="text-[11px] text-muted-foreground truncate leading-tight mt-0.5">{stock.name}</div>
      </div>
      <div className="text-right">
        <MetricValue value={stock.price} unit={stock.currency === "USD" ? "$" : stock.currency} />
      </div>
      <div className="text-right">
        <MetricValue value={stock.roe} unit="%" meetsTarget={meetsRoeCriteria(stock.roe)} />
      </div>
      <div className="text-right">
        <MetricValue value={stock.yield} unit="%" meetsTarget={meetsYieldCriteria(stock.yield)} />
      </div>
      <div className="text-right">
        <MetricValue value={stock.per} unit="x" meetsTarget={meetsPerCriteria(stock.per)} />
      </div>
      <div className="text-center flex justify-center">
        <DecisionBadge decision={stock.decision} highlight={allMet} />
      </div>
    </div>
  )
}

export function StockTable() {
  return (
    <div className="w-full rounded-lg border border-border bg-card overflow-hidden">
      <TableHeader />
      <div>
        {stockData.map((stock) => (
          <TableRow key={stock.ticker} stock={stock} />
        ))}
      </div>
    </div>
  )
}
