import { useState } from 'react'
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
  Activity,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ChevronRight,
  DollarSign,
  Users,
  Award
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-3 slide-in-left">
              <div className="relative">
                <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-gradient-to-br from-[hsl(var(--soft-blue))] to-[hsl(var(--soft-indigo))] flex items-center justify-center soft-glow-blue">
                  <Wallet className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold gradient-text">
                  ModernBank
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Account Inquiry System
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 lg:gap-3 slide-in-right">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900">
                <div className="h-2 w-2 rounded-full bg-green-500 status-pulse"></div>
                <span className="text-xs font-medium text-green-700 dark:text-green-300">Online</span>
              </div>
              <Badge variant="outline" className="gap-1.5">
                <Shield className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Secured</span>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-6 lg:py-12">
        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-8 lg:mb-12 scale-in">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-3xl p-6 lg:p-10 border border-blue-100 dark:border-blue-900 elevated-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[hsl(var(--soft-blue))] to-[hsl(var(--soft-indigo))] flex items-center justify-center soft-glow-blue shrink-0">
                <Search className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Search Account
                </h2>
                <p className="text-muted-foreground">
                  Enter a 9-digit account number to retrieve detailed information
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="000000001"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  disabled={loading}
                  className="h-14 lg:h-16 text-base lg:text-lg pl-4 pr-12 bg-white dark:bg-gray-900"
                  maxLength={9}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 h-12 lg:h-14 text-base font-semibold"
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Search Account
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                
                {result && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleReset}
                    className="sm:w-auto h-12 lg:h-14"
                  >
                    Clear Results
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8 slide-in-bottom">
            <Alert variant="destructive" className="elevated-card">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="font-bold">Error {error.response_code}</AlertTitle>
              <AlertDescription>
                {error.response_message || 'An error occurred while fetching account data'}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
              {[1, 2].map((i) => (
                <div key={i} className="bg-card rounded-3xl p-6 lg:p-8 border elevated-card">
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Display */}
        {result && result.account && (
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
              {/* Account Card */}
              <div className="slide-in-left">
                <div className="bg-card rounded-3xl overflow-hidden border elevated-card hover-lift">
                  {/* Card Header */}
                  <div className="p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-b">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[hsl(var(--soft-blue))] to-[hsl(var(--soft-indigo))] flex items-center justify-center">
                        <Wallet className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">Account Information</h3>
                        <p className="text-sm text-muted-foreground">Primary account details</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 lg:p-8 space-y-6">
                    {/* Account Number & Status */}
                    <div className="bg-muted/30 rounded-2xl p-5 border">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-[hsl(var(--soft-blue))]" />
                          <div>
                            <p className="text-xs text-muted-foreground mb-0.5">Account Number</p>
                            <p className="text-xl font-bold font-mono">{result.account.account_number}</p>
                          </div>
                        </div>
                        <Badge variant={getStatusVariant(result.account.status)} className="text-xs font-semibold px-3 py-1">
                          {result.account.status}
                        </Badge>
                      </div>
                      
                      {/* Account Holder */}
                      <div className="pt-4 border-t">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">Account Holder</p>
                        </div>
                        <p className="text-lg font-semibold">{result.account.account_name}</p>
                      </div>
                    </div>

                    {/* Balance Display */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl p-6 border border-green-200 dark:border-green-900">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <p className="text-sm font-medium text-green-900 dark:text-green-100">Available Balance</p>
                      </div>
                      <p className="text-4xl lg:text-5xl font-bold text-green-700 dark:text-green-300 mb-4">
                        {formatCurrency(result.account.available_balance, result.account.currency)}
                      </p>
                      
                      {result.account.hold_balance > 0 && (
                        <div className="pt-4 mt-4 border-t border-green-200 dark:border-green-800 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">On Hold</span>
                          </div>
                          <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                            {formatCurrency(result.account.hold_balance, result.account.currency)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Account Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/30 rounded-xl p-4 border">
                        <p className="text-xs text-muted-foreground mb-1">Account Type</p>
                        <p className="font-semibold">{result.account.account_type}</p>
                      </div>
                      <div className="bg-muted/30 rounded-xl p-4 border">
                        <p className="text-xs text-muted-foreground mb-1">Currency</p>
                        <p className="font-semibold">{result.account.currency}</p>
                      </div>
                    </div>

                    {/* Timeline Information */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Branch Code</p>
                          <p className="font-medium">{result.account.branch_code}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Opened On</p>
                          <p className="font-medium">{formatDate(result.account.open_date)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <div className="h-8 w-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                          <Activity className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Last Transaction</p>
                          <p className="font-medium">{formatDate(result.account.last_transaction_date)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Card */}
              {result.customer ? (
                <div className="slide-in-right">
                  <div className="bg-card rounded-3xl overflow-hidden border elevated-card hover-lift">
                    {/* Card Header */}
                    <div className="p-6 lg:p-8 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-950/30 dark:to-indigo-900/30 border-b">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[hsl(var(--soft-purple))] to-[hsl(var(--soft-indigo))] flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">Customer Profile</h3>
                          <p className="text-sm text-muted-foreground">Personal information</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 lg:p-8 space-y-6">
                      {/* Customer ID & Name */}
                      <div className="bg-muted/30 rounded-2xl p-5 border">
                        <p className="text-xs text-muted-foreground mb-1">Customer ID</p>
                        <p className="text-lg font-bold font-mono text-[hsl(var(--soft-purple))] mb-4">
                          {result.customer.cif}
                        </p>
                        
                        <div className="pt-4 border-t">
                          <p className="text-xs text-muted-foreground mb-1">Full Name</p>
                          <p className="text-xl font-bold mb-3">{result.customer.full_name}</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">
                              <Users className="h-3 w-3 mr-1" />
                              {result.customer.customer_type}
                            </Badge>
                            <Badge variant={getKYCStatusVariant(result.customer.kyc_status)} className="text-xs">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              KYC: {result.customer.kyc_status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-muted-foreground mb-3">Contact Details</p>
                        
                        <div className="flex items-center gap-3 bg-muted/30 rounded-xl p-4 border">
                          <div className="h-9 w-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                            <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                            <p className="text-sm font-medium truncate">{result.customer.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 bg-muted/30 rounded-xl p-4 border">
                          <div className="h-9 w-9 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                            <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground mb-0.5">Mobile</p>
                            <p className="text-sm font-medium">{result.customer.mobile}</p>
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="bg-muted/30 rounded-2xl p-5 border">
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="h-4 w-4 text-[hsl(var(--soft-purple))]" />
                          <p className="text-sm font-semibold">Address</p>
                        </div>
                        <div className="text-sm space-y-1 text-muted-foreground">
                          <p>{result.customer.address.street}</p>
                          <p>{result.customer.address.city}, {result.customer.address.province}</p>
                          <p>{result.customer.address.postal_code}</p>
                          <p className="font-medium text-foreground">{result.customer.address.country}</p>
                        </div>
                      </div>

                      {/* Customer Segment & Risk */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 rounded-xl p-4 border border-amber-200 dark:border-amber-900">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                            <p className="text-xs text-muted-foreground">Segment</p>
                          </div>
                          <p className="text-sm font-bold text-amber-700 dark:text-amber-300">{result.customer.customer_segment}</p>
                        </div>
                        <div className="bg-muted/30 rounded-xl p-4 border">
                          <p className="text-xs text-muted-foreground mb-2">Risk Rating</p>
                          <Badge variant={
                            result.customer.risk_rating === 'LOW' ? 'success' :
                            result.customer.risk_rating === 'MEDIUM' ? 'warning' : 'destructive'
                          } className="font-bold">
                            {result.customer.risk_rating}
                          </Badge>
                        </div>
                      </div>

                      {result.customer.date_of_birth && (
                        <div className="flex items-center gap-3 bg-muted/30 rounded-xl p-4 border">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground mb-0.5">Date of Birth</p>
                            <p className="text-sm font-medium">{formatDate(result.customer.date_of_birth)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="slide-in-right">
                  <div className="bg-card rounded-3xl p-12 border text-center elevated-card">
                    <div className="h-16 w-16 rounded-2xl bg-muted mx-auto mb-4 flex items-center justify-center">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Customer Data Unavailable</h3>
                    <p className="text-muted-foreground">
                      Unable to retrieve customer profile information
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !result && !error && (
          <div className="max-w-2xl mx-auto scale-in">
            <div className="text-center py-16">
              <div className="inline-flex h-20 w-20 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 items-center justify-center mb-6 float-gentle">
                <Search className="h-10 w-10 text-[hsl(var(--soft-blue))]" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Ready to Search</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter an account number above to retrieve detailed account and customer information
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 lg:mt-20">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 ModernBank. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Bank-grade security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default InquiryBalance
