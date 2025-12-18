import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card'
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
  Lock
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
        response_message: 'Please enter an account number',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">BankPro</h1>
              <p className="text-xs text-muted-foreground">Corporate Banking</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Shield className="h-3 w-3" />
              Secure Session
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Search Section */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-6 w-6 text-primary" />
              Account Inquiry
            </CardTitle>
            <CardDescription>
              Enter account number to retrieve balance and customer information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter account number (e.g., 000000001)"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  disabled={loading}
                  className="text-lg h-12"
                  maxLength={9}
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading}
                size="lg"
                className="px-8"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
              {result && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleReset}
                  size="lg"
                >
                  Clear
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive" className="mb-8 animate-fade-in">
            <AlertTitle>Error {error.response_code}</AlertTitle>
            <AlertDescription>
              {error.response_message || 'An unexpected error occurred'}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-64 mt-2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-64 mt-2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Display */}
        {result && result.account && (
          <div className="grid gap-6 md:grid-cols-2 animate-fade-in">
            {/* Account Information Card */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-br from-primary/10 to-primary/5">
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  Account Information
                </CardTitle>
                <CardDescription>Primary account details and balance</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {/* Account Number */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Account Number</p>
                      <p className="font-mono font-semibold">{result.account.account_number}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(result.account.status)}>
                    {result.account.status}
                  </Badge>
                </div>

                {/* Account Name */}
                <div className="flex items-start gap-3 p-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Account Name</p>
                    <p className="font-semibold">{result.account.account_name}</p>
                  </div>
                </div>

                {/* Balance */}
                <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <p className="text-sm text-green-700 dark:text-green-300">Available Balance</p>
                  </div>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                    {formatCurrency(result.account.available_balance, result.account.currency)}
                  </p>
                  {result.account.hold_balance > 0 && (
                    <div className="mt-2 pt-2 border-t border-green-200 dark:border-green-800">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-700 dark:text-green-300 flex items-center gap-1">
                          <Lock className="h-3 w-3" />
                          Hold Balance
                        </span>
                        <span className="font-semibold text-green-900 dark:text-green-100">
                          {formatCurrency(result.account.hold_balance, result.account.currency)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Account Type & Currency */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Account Type</p>
                    <p className="font-semibold">{result.account.account_type}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Currency</p>
                    <p className="font-semibold">{result.account.currency}</p>
                  </div>
                </div>

                {/* Branch & Dates */}
                <div className="space-y-2 pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Branch:</span>
                    <span className="font-medium">{result.account.branch_code}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Opened:</span>
                    <span className="font-medium">{formatDate(result.account.open_date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Last Transaction:</span>
                    <span className="font-medium">{formatDate(result.account.last_transaction_date)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information Card */}
            {result.customer ? (
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Customer Information
                  </CardTitle>
                  <CardDescription>Customer profile and contact details</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {/* CIF & Name */}
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Customer ID (CIF)</p>
                    <p className="font-mono font-semibold">{result.customer.cif}</p>
                  </div>

                  <div className="flex items-start gap-3 p-3">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-semibold text-lg">{result.customer.full_name}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">{result.customer.customer_type}</Badge>
                        <Badge variant={getKYCStatusVariant(result.customer.kyc_status)}>
                          KYC: {result.customer.kyc_status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2 pt-2 border-t">
                    <p className="font-semibold text-sm mb-2">Contact Information</p>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{result.customer.email}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Mobile:</span>
                      <span className="font-medium">{result.customer.mobile}</span>
                    </div>
                    
                    {result.customer.phone !== result.customer.mobile && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="font-medium">{result.customer.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Address */}
                  <div className="space-y-2 pt-2 border-t">
                    <p className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Address
                    </p>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      <p>{result.customer.address.street}</p>
                      <p>{result.customer.address.city}, {result.customer.address.province}</p>
                      <p>{result.customer.address.postal_code}</p>
                      <p>{result.customer.address.country}</p>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Segment</p>
                      <p className="font-semibold">{result.customer.customer_segment}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Risk Rating</p>
                      <Badge variant={
                        result.customer.risk_rating === 'LOW' ? 'success' :
                        result.customer.risk_rating === 'MEDIUM' ? 'warning' : 'destructive'
                      }>
                        {result.customer.risk_rating}
                      </Badge>
                    </div>
                  </div>

                  {result.customer.date_of_birth && (
                    <div className="text-sm p-3 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground">Date of Birth:</span>
                      <span className="font-medium ml-2">{formatDate(result.customer.date_of_birth)}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert variant="warning">
                    <AlertTitle>Customer Data Unavailable</AlertTitle>
                    <AlertDescription>
                      Customer information could not be retrieved for this account.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && !result && !error && (
          <Card className="shadow-lg">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Search className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ready to Search</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Enter an account number above to retrieve account balance and customer information
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2024 BankPro. All rights reserved.</p>
            <p className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Secure Connection
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default InquiryBalance
