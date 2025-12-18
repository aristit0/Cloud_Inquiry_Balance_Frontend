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
  Activity,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
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
                <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center soft-glow-blue">
                  <Wallet className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold gradient-text">
                  ModernBank
                </h1>
                <p className="text-xs text-gray-600 hidden sm:block">
                  Account Inquiry System
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 lg:gap-3 slide-in-right">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                <div className="h-2 w-2 rounded-full bg-emerald-500 status-pulse"></div>
                <span className="text-xs font-medium text-emerald-700">Online</span>
              </div>
              <Badge variant="outline" className="gap-1.5 border-gray-300">
                <Shield className="h-3.5 w-3.5" />
                <span className="hidden sm:inline text-gray-700">Secured</span>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-6 lg:py-12">
        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-8 lg:mb-12 scale-in">
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-6 lg:p-10 border border-blue-200 elevated-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center soft-glow-blue shrink-0">
                <Search className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Search Account
                </h2>
                <p className="text-gray-700">
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
                  className="h-14 lg:h-16 text-base lg:text-lg pl-4 pr-12 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                  maxLength={9}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <CreditCard className="h-5 w-5 text-gray-400" />
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
                    className="sm:w-auto h-12 lg:h-14 border-gray-300 text-gray-700 hover:bg-gray-50"
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
            <Alert variant="destructive" className="elevated-card border-red-300">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="font-bold text-red-900">Error {error.response_code}</AlertTitle>
              <AlertDescription className="text-red-800">
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
                <div key={i} className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-200 elevated-card">
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-48 bg-gray-200" />
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-3/4 bg-gray-200" />
                    <Skeleton className="h-32 w-full bg-gray-200" />
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
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 elevated-card hover-lift">
                  {/* Card Header */}
                  <div className="p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-blue-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                        <Wallet className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Account Information</h3>
                        <p className="text-sm text-gray-700">Primary account details</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 lg:p-8 space-y-6">
                    {/* Account Number & Status */}
                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-xs text-gray-600 mb-0.5">Account Number</p>
                            <p className="text-xl font-bold font-mono text-gray-900">{result.account.account_number}</p>
                          </div>
                        </div>
                        <Badge variant={getStatusVariant(result.account.status)} className="text-xs font-semibold px-3 py-1">
                          {result.account.status}
                        </Badge>
                      </div>
                      
                      {/* Account Holder */}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="h-4 w-4 text-gray-600" />
                          <p className="text-xs text-gray-600">Account Holder</p>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">{result.account.account_name}</p>
                      </div>
                    </div>

                    {/* Balance Display */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="h-5 w-5 text-emerald-700" />
                        <p className="text-sm font-medium text-emerald-900">Available Balance</p>
                      </div>
                      <p className="text-4xl lg:text-5xl font-bold text-emerald-800 mb-4">
                        {formatCurrency(result.account.available_balance, result.account.currency)}
                      </p>
                      
                      {result.account.hold_balance > 0 && (
                        <div className="pt-4 mt-4 border-t border-emerald-200 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-gray-600" />
                            <span className="text-sm text-gray-700">On Hold</span>
                          </div>
                          <span className="text-lg font-bold text-orange-700">
                            {formatCurrency(result.account.hold_balance, result.account.currency)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Account Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">Account Type</p>
                        <p className="font-semibold text-gray-900">{result.account.account_type}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">Currency</p>
                        <p className="font-semibold text-gray-900">{result.account.currency}</p>
                      </div>
                    </div>

                    {/* Timeline Information */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-blue-700" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-600">Branch Code</p>
                          <p className="font-medium text-gray-900">{result.account.branch_code}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-purple-700" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-600">Opened On</p>
                          <p className="font-medium text-gray-900">{formatDate(result.account.open_date)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                          <Activity className="h-4 w-4 text-indigo-700" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-600">Last Transaction</p>
                          <p className="font-medium text-gray-900">{formatDate(result.account.last_transaction_date)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Card */}
              {result.customer ? (
                <div className="slide-in-right">
                  <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 elevated-card hover-lift">
                    {/* Card Header */}
                    <div className="p-6 lg:p-8 bg-gradient-to-br from-purple-50 to-indigo-50 border-b border-purple-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">Customer Profile</h3>
                          <p className="text-sm text-gray-700">Personal information</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 lg:p-8 space-y-6">
                      {/* Customer ID & Name */}
                      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                        <p className="text-xs text-gray-600 mb-1">Customer ID</p>
                        <p className="text-lg font-bold font-mono text-purple-700 mb-4">
                          {result.customer.cif}
                        </p>
                        
                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-xs text-gray-600 mb-1">Full Name</p>
                          <p className="text-xl font-bold text-gray-900 mb-3">{result.customer.full_name}</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
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
                        <p className="text-sm font-semibold text-gray-900 mb-3">Contact Details</p>
                        
                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                            <Mail className="h-4 w-4 text-blue-700" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-600 mb-0.5">Email</p>
                            <p className="text-sm font-medium text-gray-900 truncate">{result.customer.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <div className="h-9 w-9 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                            <Phone className="h-4 w-4 text-green-700" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-600 mb-0.5">Mobile</p>
                            <p className="text-sm font-medium text-gray-900">{result.customer.mobile}</p>
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="h-4 w-4 text-purple-600" />
                          <p className="text-sm font-semibold text-gray-900">Address</p>
                        </div>
                        <div className="text-sm space-y-1 text-gray-700">
                          <p>{result.customer.address.street}</p>
                          <p>{result.customer.address.city}, {result.customer.address.province}</p>
                          <p>{result.customer.address.postal_code}</p>
                          <p className="font-medium text-gray-900">{result.customer.address.country}</p>
                        </div>
                      </div>

                      {/* Customer Segment & Risk */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="h-4 w-4 text-amber-700" />
                            <p className="text-xs text-gray-600">Segment</p>
                          </div>
                          <p className="text-sm font-bold text-amber-800">{result.customer.customer_segment}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <p className="text-xs text-gray-600 mb-2">Risk Rating</p>
                          <Badge variant={
                            result.customer.risk_rating === 'LOW' ? 'success' :
                            result.customer.risk_rating === 'MEDIUM' ? 'warning' : 'destructive'
                          } className="font-bold">
                            {result.customer.risk_rating}
                          </Badge>
                        </div>
                      </div>

                      {result.customer.date_of_birth && (
                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          <div>
                            <p className="text-xs text-gray-600 mb-0.5">Date of Birth</p>
                            <p className="text-sm font-medium text-gray-900">{formatDate(result.customer.date_of_birth)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="slide-in-right">
                  <div className="bg-white rounded-3xl p-12 border border-gray-200 text-center elevated-card">
                    <div className="h-16 w-16 rounded-2xl bg-gray-100 mx-auto mb-4 flex items-center justify-center">
                      <User className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Data Unavailable</h3>
                    <p className="text-gray-600">
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
              <div className="inline-flex h-20 w-20 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 items-center justify-center mb-6 float-gentle">
                <Search className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to Search</h3>
              <p className="text-gray-700 max-w-md mx-auto">
                Enter an account number above to retrieve detailed account and customer information
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12 lg:mt-20">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <p>© 2024 ModernBank. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-600" />
              <span>Bank-grade security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default InquiryBalance
