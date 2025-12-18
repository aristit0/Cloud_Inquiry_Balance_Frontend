import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import { Button } from './Button'
import { Input } from './Input'
import { Alert, AlertDescription, AlertTitle } from './Alert'
import { Badge } from './Badge'
import { Skeleton } from './Skeleton'
import { inquiryAPI } from '@/lib/api'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import { 
  Search, 
  User, 
  CreditCard, 
  Building2, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Shield,
  TrendingUp,
  Wallet,
  Lock,
  Zap,
  Cpu,
  Activity,
  Terminal,
  Database,
  Sparkles
} from 'lucide-react'

function InquiryBalance() {
  const [accountNumber, setAccountNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!accountNumber.trim()) {
      setError({
        response_code: '400',
        response_message: 'Account number required',
      })
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await inquiryAPI.inquiryBalance(accountNumber)
      setResult(response)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setAccountNumber('')
    setResult(null)
    setError(null)
  }

  const getStatusVariant = (status) => {
    const variants = {
      'ACTIVE': 'success',
      'INACTIVE': 'secondary',
      'DORMANT': 'warning',
      'BLOCKED': 'destructive',
    }
    return variants[status] || 'default'
  }

  const getKYCStatusVariant = (status) => {
    const variants = {
      'VERIFIED': 'success',
      'PENDING': 'warning',
      'EXPIRED': 'destructive',
    }
    return variants[status] || 'default'
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[hsl(var(--neon-cyan))] opacity-10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[hsl(var(--neon-purple))] opacity-10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[hsl(var(--neon-pink))] opacity-10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-[hsl(var(--border))] backdrop-blur-xl bg-background/80 scan-line">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 slide-in-left">
              <div className="relative">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[hsl(var(--neon-cyan))] to-[hsl(var(--neon-purple))] flex items-center justify-center glow-cyan">
                  <Database className="h-6 w-6 text-background" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[hsl(var(--neon-green))] rounded-full pulse-glow"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold neon-cyan" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  CYBERBANK
                </h1>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Terminal className="h-3 w-3" />
                  Inquiry System v2.0
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 slide-in-right">
              <div className="glass px-3 py-1.5 rounded-lg border-glow-cyan flex items-center gap-2">
                <Activity className="h-4 w-4 neon-green" />
                <span className="text-xs font-mono">ONLINE</span>
              </div>
              <Badge variant="outline" className="gap-1 border-[hsl(var(--neon-cyan))]">
                <Shield className="h-3 w-3 neon-cyan" />
                <span className="neon-cyan">SECURED</span>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Search Section */}
        <div className="mb-8 scale-in">
          <div className="glass rounded-2xl p-8 border-glow-purple shimmer">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-[hsl(var(--neon-cyan))/0.2] flex items-center justify-center border border-[hsl(var(--neon-cyan))]">
                <Search className="h-5 w-5 neon-cyan" />
              </div>
              <div>
                <h2 className="text-xl font-bold gradient-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  ACCOUNT INQUIRY
                </h2>
                <p className="text-sm text-muted-foreground font-mono">
                  Enter account ID to retrieve data
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-cyan))] to-[hsl(var(--neon-purple))] opacity-0 group-focus-within:opacity-20 rounded-lg blur transition-opacity"></div>
                <Input
                  type="text"
                  placeholder="000000001"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  disabled={loading}
                  className="relative h-14 text-lg font-mono bg-[hsl(var(--card))] border-[hsl(var(--border))] focus:border-[hsl(var(--neon-cyan))] transition-all"
                  maxLength={9}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Cpu className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={loading}
                className="h-14 px-8 bg-gradient-to-r from-[hsl(var(--neon-cyan))] to-[hsl(var(--neon-purple))] hover:from-[hsl(var(--neon-purple))] hover:to-[hsl(var(--neon-cyan))] text-background font-bold glow-cyan transition-all"
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                    SCANNING...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5" />
                    SEARCH
                  </>
                )}
              </Button>
              
              {result && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleReset}
                  className="h-14 px-8 border-[hsl(var(--neon-pink))] text-[hsl(var(--neon-pink))] hover:bg-[hsl(var(--neon-pink))/0.1]"
                >
                  RESET
                </Button>
              )}
            </form>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 slide-in-bottom">
            <Alert variant="destructive" className="glass border-[hsl(var(--destructive))] glow-pink">
              <AlertTitle className="flex items-center gap-2 font-bold">
                <Sparkles className="h-4 w-4" />
                ERROR {error.response_code}
              </AlertTitle>
              <AlertDescription className="font-mono">
                {error.response_message || 'System error occurred'}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="glass rounded-2xl p-6 border-glow-cyan shimmer">
                <div className="space-y-4">
                  <Skeleton className="h-8 w-48 bg-[hsl(var(--muted))]" />
                  <Skeleton className="h-4 w-full bg-[hsl(var(--muted))]" />
                  <Skeleton className="h-4 w-3/4 bg-[hsl(var(--muted))]" />
                  <Skeleton className="h-24 w-full bg-[hsl(var(--muted))]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Display */}
        {result && result.account && (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Account Card */}
            <div className="slide-in-left">
              <div className="glass rounded-2xl overflow-hidden border-glow-cyan holographic">
                <div className="p-6 bg-gradient-to-br from-[hsl(var(--neon-cyan))/0.1] to-transparent border-b border-[hsl(var(--border))]">
                  <div className="flex items-center gap-3 mb-2">
                    <Wallet className="h-6 w-6 neon-cyan" />
                    <h3 className="text-xl font-bold neon-cyan" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      ACCOUNT DATA
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">Primary account information</p>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Account Number & Status */}
                  <div className="glass rounded-xl p-4 border border-[hsl(var(--border))]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 neon-cyan" />
                        <div>
                          <p className="text-xs text-muted-foreground font-mono">ACC ID</p>
                          <p className="font-mono font-bold text-lg neon-cyan">{result.account.account_number}</p>
                        </div>
                      </div>
                      <Badge variant={getStatusVariant(result.account.status)} className="font-bold">
                        {result.account.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Account Holder */}
                  <div className="glass rounded-xl p-4 border border-[hsl(var(--border))]">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 neon-purple" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground font-mono">HOLDER</p>
                        <p className="font-semibold text-lg">{result.account.account_name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Balance */}
                  <div className="glass rounded-xl p-6 bg-gradient-to-br from-[hsl(var(--neon-green))/0.1] to-[hsl(var(--neon-cyan))/0.1] border-2 border-[hsl(var(--neon-green))] glow-cyan">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 neon-green" />
                      <p className="text-sm text-muted-foreground font-mono">AVAILABLE</p>
                    </div>
                    <p className="text-4xl font-bold gradient-text mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {formatCurrency(result.account.available_balance, result.account.currency)}
                    </p>
                    {result.account.hold_balance > 0 && (
                      <div className="pt-3 mt-3 border-t border-[hsl(var(--border))] flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          HOLD
                        </span>
                        <span className="font-bold neon-pink">
                          {formatCurrency(result.account.hold_balance, result.account.currency)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass rounded-lg p-3 border border-[hsl(var(--border))]">
                      <p className="text-xs text-muted-foreground font-mono mb-1">TYPE</p>
                      <p className="font-bold">{result.account.account_type}</p>
                    </div>
                    <div className="glass rounded-lg p-3 border border-[hsl(var(--border))]">
                      <p className="text-xs text-muted-foreground font-mono mb-1">CURRENCY</p>
                      <p className="font-bold">{result.account.currency}</p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground font-mono">BRANCH:</span>
                      <span className="font-semibold neon-cyan">{result.account.branch_code}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground font-mono">OPENED:</span>
                      <span className="font-semibold">{formatDate(result.account.open_date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground font-mono">LAST TXN:</span>
                      <span className="font-semibold">{formatDate(result.account.last_transaction_date)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Card */}
            {result.customer ? (
              <div className="slide-in-right">
                <div className="glass rounded-2xl overflow-hidden border-glow-purple holographic">
                  <div className="p-6 bg-gradient-to-br from-[hsl(var(--neon-purple))/0.1] to-transparent border-b border-[hsl(var(--border))]">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="h-6 w-6 neon-purple" />
                      <h3 className="text-xl font-bold neon-purple" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        CUSTOMER PROFILE
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">Identity and contact information</p>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {/* CIF & Name */}
                    <div className="glass rounded-xl p-4 border border-[hsl(var(--border))]">
                      <p className="text-xs text-muted-foreground font-mono mb-2">CIF ID</p>
                      <p className="font-mono font-bold text-lg neon-purple mb-3">{result.customer.cif}</p>
                      
                      <div className="pt-3 border-t border-[hsl(var(--border))]">
                        <p className="text-xs text-muted-foreground font-mono mb-1">NAME</p>
                        <p className="font-bold text-xl mb-2">{result.customer.full_name}</p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">
                            {result.customer.customer_type}
                          </Badge>
                          <Badge variant={getKYCStatusVariant(result.customer.kyc_status)} className="text-xs">
                            KYC: {result.customer.kyc_status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground font-mono mb-2">CONTACT</p>
                      
                      <div className="glass rounded-lg p-3 border border-[hsl(var(--border))] flex items-center gap-3">
                        <Mail className="h-4 w-4 neon-cyan" />
                        <span className="text-sm font-mono">{result.customer.email}</span>
                      </div>
                      
                      <div className="glass rounded-lg p-3 border border-[hsl(var(--border))] flex items-center gap-3">
                        <Phone className="h-4 w-4 neon-cyan" />
                        <span className="text-sm font-mono">{result.customer.mobile}</span>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="glass rounded-xl p-4 border border-[hsl(var(--border))]">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-4 w-4 neon-pink" />
                        <p className="text-xs text-muted-foreground font-mono">ADDRESS</p>
                      </div>
                      <div className="text-sm space-y-1">
                        <p>{result.customer.address.street}</p>
                        <p>{result.customer.address.city}, {result.customer.address.province}</p>
                        <p>{result.customer.address.postal_code}</p>
                        <p className="text-muted-foreground">{result.customer.address.country}</p>
                      </div>
                    </div>

                    {/* Segment & Risk */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="glass rounded-lg p-3 border border-[hsl(var(--border))]">
                        <p className="text-xs text-muted-foreground font-mono mb-1">SEGMENT</p>
                        <p className="font-bold">{result.customer.customer_segment}</p>
                      </div>
                      <div className="glass rounded-lg p-3 border border-[hsl(var(--border))]">
                        <p className="text-xs text-muted-foreground font-mono mb-1">RISK</p>
                        <Badge variant={
                          result.customer.risk_rating === 'LOW' ? 'success' :
                          result.customer.risk_rating === 'MEDIUM' ? 'warning' : 'destructive'
                        } className="font-bold">
                          {result.customer.risk_rating}
                        </Badge>
                      </div>
                    </div>

                    {result.customer.date_of_birth && (
                      <div className="glass rounded-lg p-3 border border-[hsl(var(--border))]">
                        <p className="text-xs text-muted-foreground font-mono mb-1">DOB</p>
                        <p className="font-semibold">{formatDate(result.customer.date_of_birth)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="slide-in-right">
                <div className="glass rounded-2xl p-8 border border-[hsl(var(--border))] text-center">
                  <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-bold mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    CUSTOMER DATA UNAVAILABLE
                  </p>
                  <p className="text-sm text-muted-foreground font-mono">
                    Unable to retrieve customer profile
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && !result && !error && (
          <div className="scale-in">
            <div className="glass rounded-2xl p-16 text-center border-glow-cyan">
              <div className="relative inline-block mb-6">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[hsl(var(--neon-cyan))] to-[hsl(var(--neon-purple))] flex items-center justify-center glow-cyan float">
                  <Search className="h-12 w-12 text-background" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[hsl(var(--neon-green))] rounded-full pulse-glow"></div>
              </div>
              <h3 className="text-2xl font-bold mb-3 gradient-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                SYSTEM READY
              </h3>
              <p className="text-muted-foreground font-mono max-w-md mx-auto">
                Enter account number to initiate data retrieval sequence
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative border-t border-[hsl(var(--border))] backdrop-blur-xl bg-background/80 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm">
            <p className="text-muted-foreground font-mono flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              © 2024 CYBERBANK • All rights reserved
            </p>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 neon-green" />
              <span className="text-muted-foreground font-mono">256-BIT ENCRYPTION</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default InquiryBalance
