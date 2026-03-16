import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  ArrowRight, 
  Layers, 
  MousePointer2, 
  Zap, 
  Instagram, 
  Twitter, 
  Github 
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 overflow-x-hidden relative">
      
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-[80px]" />
      </div>

      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl group-hover:rotate-[360deg] transition-transform duration-700">
              <ShoppingBag className="text-white w-5 h-5" />
            </div>
            <span className="font-black text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              PRODUCT <span className="text-blue-500">STORE</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
            <Link href="#" className="hover:text-blue-400 transition-colors">EXPLORE</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">TRENDING</Link>
          </div>

          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10 rounded-xl">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-none rounded-xl px-6 font-bold shadow-lg shadow-blue-500/20">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      <main className="relative pt-48 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <Zap size={14} fill="currentColor" /> Premium Inventory 2026
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
            NEXT GEN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              COMMERCE.
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
            Experience the future of shopping with our hyper-curated selection of premium products. 
          </p>

          <div className="flex flex-col sm:row items-center justify-center gap-6">
            <Button size="lg" className="h-16 px-12 text-lg font-bold rounded-2xl bg-white text-slate-950 hover:bg-slate-200 transition-all hover:scale-105 active:scale-95">
              BROWSE CATALOG <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          <FeatureItem 
            color="blue"
            icon={<Layers size={24} />} 
            title="Curated Lists" 
            desc="Only the highest quality products survive our selection process." 
          />
          <FeatureItem 
            color="purple"
            icon={<MousePointer2 size={24} />} 
            title="One-Tap Buy" 
            desc="Seamless checkout experience designed for speed." 
          />
          <FeatureItem 
            color="pink"
            icon={<Zap size={24} />} 
            title="Instant Update" 
            desc="Real-time stock tracking across all international hubs." 
          />
        </div>
      </main>

      <footer className="relative z-10 px-6 pb-12 mt-20">
        <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] -z-10" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="text-white w-4 h-4" />
                </div>
                <span className="font-black text-xl tracking-tighter">PRODUCT STORE</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                The world's first decentralized luxury product platform.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Twitter size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Instagram size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Github size={18} />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Navigation</h4>
              <ul className="text-slate-500 text-sm space-y-4">
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Storefront</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Marketplace</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Collections</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Platform</h4>
              <ul className="text-slate-500 text-sm space-y-4">
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Privacy</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">Terms</li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">API Docs</li>
              </ul>
            </div>

            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
              <h4 className="font-bold text-white mb-2">Weekly Drop</h4>
              <p className="text-slate-500 text-xs mb-6">Be the first to know about limited releases.</p>
              <div className="space-y-3">
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500" placeholder="Email Address" />
                <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl font-bold">SUBSCRIBE</Button>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/5 text-center text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
            © 2026 PRODUCT STORE — ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureItem({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: 'blue' | 'purple' | 'pink' }) {
  const shadowColor = {
    blue: 'shadow-blue-500/10 border-blue-500/20',
    purple: 'shadow-purple-500/10 border-purple-500/20',
    pink: 'shadow-pink-500/10 border-pink-500/20'
  }[color];

  return (
    <div className={`p-10 bg-white/5 backdrop-blur-xl border ${shadowColor} rounded-[2.5rem] shadow-2xl hover:bg-white/10 transition-all group`}>
      <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="font-black text-2xl text-white mb-3 tracking-tight italic uppercase">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  );
}