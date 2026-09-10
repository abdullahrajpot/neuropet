"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  CreditCard, 
  Search, 
  Filter,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  PoundSterling,
  Calendar,
  User,
  PawPrint,
  ChevronLeft,
} from "lucide-react";

interface Transaction {
  _id: string;
  clientId: string;
  ownerName: string;
  email: string;
  petName: string;
  consultationType: string;
  paymentAmount: number;
  tipAmount: number;
  paymentStatus: string;
  paymentDate: Date;
  paymentIntentId?: string;
  createdAt: Date;
}

const PLAN_DETAILS: Record<string, { name: string; color: string; basePrice: number }> = {
  'discovery': { name: 'Free Discovery Call', color: 'bg-blue-100 text-blue-800', basePrice: 0 },
  'behavior-essentials': { name: 'Behaviour Essentials', color: 'bg-primary-100 text-primary-900', basePrice: 270 },
  'behavior-intensive': { name: 'Behaviour Intensive', color: 'bg-accent-100 text-accent-800', basePrice: 470 },
  'puppy-foundations': { name: 'Puppy Foundations', color: 'bg-green-100 text-green-800', basePrice: 220 },
};

export default function AdminTransactionsPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPlan, setFilterPlan] = useState<string>("all");

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      try {
        // Check authentication
        const authRes = await fetch("/api/auth/me");
        if (!authRes.ok) {
          router.push("/admin/login");
          return;
        }
        const authData = await authRes.json();
        if (authData.user.role !== "admin") {
          router.push("/admin/login");
          return;
        }

        // Fetch appointments with payment data
        const key = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "neuropet-admin";
        const res = await fetch(`/api/appointments?key=${key}`);
        
        if (res.ok) {
          const appointments = await res.json();
          
          // Filter to only show transactions (appointments with payment data)
          const transactionData = appointments
            .filter((a: any) => a.paymentAmount && a.paymentAmount > 0)
            .map((a: any) => ({
              _id: a._id,
              clientId: a.clientId,
              ownerName: a.ownerName,
              email: a.email,
              petName: a.petName,
              consultationType: a.consultationType || 'discovery',
              paymentAmount: a.paymentAmount || 0,
              tipAmount: a.tipAmount || 0,
              paymentStatus: a.paymentStatus || 'pending',
              paymentDate: a.paymentDate || a.createdAt,
              paymentIntentId: a.paymentIntentId,
              createdAt: a.createdAt,
            }))
            .sort((a: Transaction, b: Transaction) => 
              new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
            );

          setTransactions(transactionData);
          setFilteredTransactions(transactionData);
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, [router]);

  // Apply filters
  useEffect(() => {
    let filtered = [...transactions];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t => 
        t.ownerName.toLowerCase().includes(query) ||
        t.email.toLowerCase().includes(query) ||
        t.petName.toLowerCase().includes(query) ||
        t.clientId.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(t => t.paymentStatus === filterStatus);
    }

    // Plan filter
    if (filterPlan !== "all") {
      filtered = filtered.filter(t => t.consultationType === filterPlan);
    }

    setFilteredTransactions(filtered);
  }, [searchQuery, filterStatus, filterPlan, transactions]);

  // Calculate stats
  const totalRevenue = filteredTransactions.reduce((sum, t) => sum + t.paymentAmount, 0);
  const totalTips = filteredTransactions.reduce((sum, t) => sum + (t.tipAmount || 0), 0);
  const successfulPayments = filteredTransactions.filter(t => t.paymentStatus === 'succeeded').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'succeeded':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      succeeded: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      failed: 'bg-red-100 text-red-800 border-red-200',
      refunded: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-700 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-ink-600">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link 
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-sm text-primary-700 hover:text-primary-900 mb-3 font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="font-display text-3xl text-primary-900 mb-2">Transactions</h1>
          <p className="text-ink-600">View all payment transactions and plan purchases</p>
        </div>
        <button
          onClick={() => {
            // Simple CSV export
            const csv = [
              ['Date', 'Client ID', 'Client Name', 'Email', 'Pet Name', 'Plan', 'Amount', 'Tip', 'Total', 'Status'].join(','),
              ...filteredTransactions.map(t => [
                new Date(t.paymentDate).toLocaleDateString(),
                t.clientId,
                `"${t.ownerName}"`,
                t.email,
                t.petName,
                PLAN_DETAILS[t.consultationType]?.name || t.consultationType,
                (t.paymentAmount - (t.tipAmount || 0)).toFixed(2),
                (t.tipAmount || 0).toFixed(2),
                t.paymentAmount.toFixed(2),
                t.paymentStatus,
              ].join(','))
            ].join('\n');
            
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary-700 text-white rounded-full font-semibold hover:bg-primary-800 transition-colors text-sm"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-primary-100">Total Revenue</p>
            <PoundSterling className="w-8 h-8 text-white opacity-30" strokeWidth={1.5} />
          </div>
          <p className="text-4xl font-bold">£{totalRevenue.toFixed(2)}</p>
          <p className="text-xs text-primary-200 mt-1">
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-ink-600">Successful</p>
            <CheckCircle className="w-8 h-8 text-green-500 opacity-20" strokeWidth={1.5} />
          </div>
          <p className="text-4xl font-bold text-green-700">{successfulPayments}</p>
          <p className="text-xs text-ink-500 mt-1">
            {filteredTransactions.length > 0 
              ? `${((successfulPayments / filteredTransactions.length) * 100).toFixed(0)}% success rate`
              : 'No transactions'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-accent-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-ink-600">Total Tips</p>
            <CreditCard className="w-8 h-8 text-accent-600 opacity-20" strokeWidth={1.5} />
          </div>
          <p className="text-4xl font-bold text-accent-700">£{totalTips.toFixed(2)}</p>
          <p className="text-xs text-ink-500 mt-1">From generous clients</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
            <input
              type="text"
              placeholder="Search by name, email, pet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-primary-200 rounded-full text-sm focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-primary-200 rounded-full text-sm focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="succeeded">Succeeded</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          {/* Plan Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-primary-200 rounded-full text-sm focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Plans</option>
              <option value="behavior-essentials">Behaviour Essentials</option>
              <option value="behavior-intensive">Behaviour Intensive</option>
              <option value="puppy-foundations">Puppy Foundations</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary-50 border-b-2 border-primary-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-900 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-900 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-900 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-900 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-900 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-primary-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-100">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <CreditCard className="w-12 h-12 text-ink-300" strokeWidth={1.5} />
                      <p className="text-ink-600 font-semibold">No transactions found</p>
                      <p className="text-sm text-ink-500">
                        {searchQuery || filterStatus !== "all" || filterPlan !== "all"
                          ? "Try adjusting your filters"
                          : "Transactions will appear here when clients make payments"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => {
                  const planInfo = PLAN_DETAILS[transaction.consultationType];
                  const planAmount = transaction.paymentAmount - (transaction.tipAmount || 0);
                  
                  return (
                    <tr key={transaction._id} className="hover:bg-primary-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-ink-400" />
                          <span className="font-semibold text-primary-900">
                            {new Date(transaction.paymentDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="text-xs text-ink-500 mt-0.5">
                          {new Date(transaction.paymentDate).toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-primary-700" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-primary-900">{transaction.ownerName}</p>
                            <p className="text-xs text-ink-500">{transaction.email}</p>
                            <div className="flex items-center gap-1.5 mt-1">
                              <PawPrint className="w-3 h-3 text-accent-600" />
                              <span className="text-xs font-semibold text-accent-700">{transaction.petName}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold ${planInfo?.color || 'bg-gray-100 text-gray-800'}`}>
                          {planInfo?.name || transaction.consultationType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-lg font-bold text-primary-900">
                          £{transaction.paymentAmount.toFixed(2)}
                        </div>
                        {transaction.tipAmount && transaction.tipAmount > 0 && (
                          <div className="text-xs text-ink-600 mt-0.5">
                            Plan: £{planAmount.toFixed(2)} + Tip: £{transaction.tipAmount.toFixed(2)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(transaction.paymentStatus)}
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(transaction.paymentStatus)}`}>
                            {transaction.paymentStatus.charAt(0).toUpperCase() + transaction.paymentStatus.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/assessments/${transaction._id}`}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors"
                        >
                          View Details
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      {filteredTransactions.length > 0 && (
        <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm font-semibold text-primary-900 mb-1">Showing Results</p>
              <p className="text-xs text-ink-600">
                {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} 
                {(searchQuery || filterStatus !== "all" || filterPlan !== "all") && ` (filtered from ${transactions.length} total)`}
              </p>
            </div>
            {(searchQuery || filterStatus !== "all" || filterPlan !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterStatus("all");
                  setFilterPlan("all");
                }}
                className="px-4 py-2 bg-primary-700 text-white rounded-full text-sm font-semibold hover:bg-primary-800 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
