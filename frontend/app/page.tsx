/* frontend/app/page.tsx */

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, FileText, Presentation as PresentationChart, Sparkles, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-gray-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-heading font-extrabold text-gray-900">
              AI Proposal & Pitch Deck Generator
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Pricing
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="outline" className="hover:bg-indigo-50 hover:text-indigo-700" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="py-24 px-4 bg-gradient-to-b from-indigo-50 via-white to-slate-50">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Zap className="h-4 w-4" />
            AI-Powered Business Documents
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-extrabold mb-6 leading-tight">
            Generate Professional <span className="text-indigo-600">Proposals</span> &{" "}
            <span className="text-emerald-600">Pitch Decks</span> in Minutes
          </h1>
          <p className="text-lg md:text-xl mb-8 leading-relaxed text-gray-700">
            Transform your business ideas into compelling proposals and investor-ready pitch decks using advanced AI.
            Perfect for freelancers, startups, and small businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg" asChild>
              <Link href="/register">
                Register
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 hover:bg-indigo-50" asChild>
              <Link href="#demo">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-extrabold text-gray-900 mb-4">
              Everything You Need to Win Business
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform handles the heavy lifting so you can focus on what matters most – growing your
              business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Card className="border border-gray-200 hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardHeader>
                <FileText className="h-14 w-14 text-indigo-600 mb-4" />
                <CardTitle className="font-heading text-xl font-semibold">Smart Proposals</CardTitle>
                <CardDescription className="text-gray-700">
                  Generate comprehensive business proposals with executive summaries, problem statements, and detailed
                  solutions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-gray-200 hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardHeader>
                <PresentationChart className="h-14 w-14 text-emerald-600 mb-4" />
                <CardTitle className="font-heading text-xl font-semibold">Investor Pitch Decks</CardTitle>
                <CardDescription className="text-gray-700">
                  Create professional slide decks with compelling narratives, market analysis, and financial projections.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-gray-200 hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardHeader>
                <Users className="h-14 w-14 text-rose-600 mb-4" />
                <CardTitle className="font-heading text-xl font-semibold">Target Market Analysis</CardTitle>
                <CardDescription className="text-gray-700">
                  AI-powered market research and competitive analysis to strengthen your business case.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-heading font-extrabold mb-6">
            Ready to Transform Your Business Documents?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-indigo-100">
            Join thousands of entrepreneurs who trust AI Proposal & Pitch Deck Generator to create winning proposals and
            pitch decks.
          </p>
          <Button size="lg" className="text-lg px-8 bg-white text-indigo-700 hover:bg-gray-100 shadow-lg" asChild>
            <Link href="/register">
              Register
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-heading font-bold text-gray-900">
              AI Proposal & Pitch Deck Generator
            </span>
          </div>
          <p className="text-gray-500 text-sm">© 2025 AI Proposal & Pitch Deck Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
