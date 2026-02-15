import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import { H1, H3, Lead, P } from "@/components/Typography";
import Button from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

function Page() {
	return (
		<>
			<Topbar
				links={[
					{ label: "Dashboard", path: "/dashboard" },
					{ label: "Profile", path: "/profile" },
				]}
			/>
			<main className="flex-1">
				{/* Hero Section */}
				<section className="w-full" style={{ background: `linear-gradient(135deg, var(--color-ws-base-800) 0%, var(--color-ws-base-900) 100%)` }}>
					<div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32">
						<div className="max-w-3xl mx-auto text-center">
							<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-6" style={{ background: `var(--color-ws-primary-100)`, color: `var(--color-ws-primary-700)` }}>
								Real-time Website Monitoring
							</span>
							<H1 className="text-balance text-white">
								Keep Your Website Always Online
							</H1>
							<Lead className="text-balance mt-6 text-lg" style={{ color: `var(--color-ws-accent-300)` }}>
								Monitor uptime, track performance, and get instant alerts when your website goes down. Stay ahead of issues before your users do.
							</Lead>
							<div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
								<Link href="/dashboard">
									<Button variant="base" size="lg" className="w-full sm:w-auto" style={{ background: `var(--color-ws-primary-500)`, color: `white` }}>
										Start Monitoring
									</Button>
								</Link>
								<Link href="/authenticate">
									<Button variant="outline" size="lg" className="w-full sm:w-auto" style={{ borderColor: `var(--color-ws-primary-500)`, color: `var(--color-ws-primary-500)` }}>
										Sign Up Free
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="w-full py-16 lg:py-24" style={{ borderTopColor: `var(--color-ws-base-300)`, borderTopWidth: '1px' }}>
					<div className="container mx-auto px-4 lg:px-8">
						<div className="max-w-3xl mx-auto text-center mb-16">
							<H3 className="text-balance" style={{ color: `var(--color-ws-base-500)` }}>
								Powerful Features for Complete Monitoring
							</H3>
							<P className="text-balance mt-4" style={{ color: `var(--color-ws-base-400)` }}>
								Everything you need to ensure your websites stay up and running smoothly.
							</P>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{/* Feature Card 1 */}
							<div className="p-6 rounded-lg transition-all hover:shadow-lg" style={{ borderColor: `var(--color-ws-base-300)`, borderWidth: '1px', background: `var(--color-ws-accent-200)` }}>
								<div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: `var(--color-ws-primary-100)` }}>
									<svg className="w-6 h-6" style={{ color: `var(--color-ws-primary-600)` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
									</svg>
								</div>
								<h4 className="text-lg font-semibold mb-2" style={{ color: `var(--color-ws-base-600)` }}>Uptime Monitoring</h4>
								<p className="text-sm" style={{ color: `var(--color-ws-base-400)` }}>
									Track your website uptime 24/7 with second-level precision. Get instant notifications when your site goes down.
								</p>
							</div>

							{/* Feature Card 2 */}
							<div className="p-6 rounded-lg transition-all hover:shadow-lg" style={{ borderColor: `var(--color-ws-base-300)`, borderWidth: '1px', background: `var(--color-ws-accent-200)` }}>
								<div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: `var(--color-ws-primary-100)` }}>
									<svg className="w-6 h-6" style={{ color: `var(--color-ws-primary-600)` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
									</svg>
								</div>
								<h4 className="text-lg font-semibold mb-2" style={{ color: `var(--color-ws-base-600)` }}>Performance Tracking</h4>
								<p className="text-sm" style={{ color: `var(--color-ws-base-400)` }}>
									Monitor response times and performance metrics. Identify bottlenecks and optimize your website's speed.
								</p>
							</div>

							{/* Feature Card 3 */}
							<div className="p-6 rounded-lg transition-all hover:shadow-lg" style={{ borderColor: `var(--color-ws-base-300)`, borderWidth: '1px', background: `var(--color-ws-accent-200)` }}>
								<div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: `var(--color-ws-primary-100)` }}>
									<svg className="w-6 h-6" style={{ color: `var(--color-ws-primary-600)` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
									</svg>
								</div>
								<h4 className="text-lg font-semibold mb-2" style={{ color: `var(--color-ws-base-600)` }}>Smart Alerts</h4>
								<p className="text-sm" style={{ color: `var(--color-ws-base-400)` }}>
									Receive instant notifications via email when incidents occur. Never miss a critical issue again.
								</p>
							</div>

							{/* Feature Card 4 */}
							<div className="p-6 rounded-lg transition-all hover:shadow-lg" style={{ borderColor: `var(--color-ws-base-300)`, borderWidth: '1px', background: `var(--color-ws-accent-200)` }}>
								<div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: `var(--color-ws-primary-100)` }}>
									<svg className="w-6 h-6" style={{ color: `var(--color-ws-primary-600)` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<h4 className="text-lg font-semibold mb-2" style={{ color: `var(--color-ws-base-600)` }}>Incident Management</h4>
								<p className="text-sm" style={{ color: `var(--color-ws-base-400)` }}>
									Track and manage incidents with detailed logs. Understand what happened and when to improve reliability.
								</p>
							</div>

							{/* Feature Card 5 */}
							<div className="p-6 rounded-lg transition-all hover:shadow-lg" style={{ borderColor: `var(--color-ws-base-300)`, borderWidth: '1px', background: `var(--color-ws-accent-200)` }}>
								<div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: `var(--color-ws-primary-100)` }}>
									<svg className="w-6 h-6" style={{ color: `var(--color-ws-primary-600)` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<h4 className="text-lg font-semibold mb-2" style={{ color: `var(--color-ws-base-600)` }}>100% Free Forever</h4>
								<p className="text-sm" style={{ color: `var(--color-ws-base-400)` }}>
									No credit card required. No hidden fees. Completely free monitoring for all your websites, forever.
								</p>
							</div>

							{/* Feature Card 6 */}
							<div className="p-6 rounded-lg transition-all hover:shadow-lg" style={{ borderColor: `var(--color-ws-base-300)`, borderWidth: '1px', background: `var(--color-ws-accent-200)` }}>
								<div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: `var(--color-ws-primary-100)` }}>
									<svg className="w-6 h-6" style={{ color: `var(--color-ws-primary-600)` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
									</svg>
								</div>
								<h4 className="text-lg font-semibold mb-2" style={{ color: `var(--color-ws-base-600)` }}>Easy Setup</h4>
								<p className="text-sm" style={{ color: `var(--color-ws-base-400)` }}>
									Add your websites in seconds. Start monitoring immediately with zero configuration needed.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* How It Works Section */}
				<section className="w-full py-16 lg:py-24" style={{ background: `var(--color-ws-accent-200)`, borderTopColor: `var(--color-ws-base-300)`, borderTopWidth: '1px' }}>
					<div className="container mx-auto px-4 lg:px-8">
						<div className="max-w-3xl mx-auto text-center mb-16">
							<H3 className="text-balance" style={{ color: `var(--color-ws-base-600)` }}>
								How It Works
							</H3>
							<P className="text-balance mt-4" style={{ color: `var(--color-ws-base-400)` }}>
								Get started with WebStat in just three simple steps.
							</P>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
							{/* Step 1 */}
							<div className="text-center">
								<div className="mb-6 flex justify-center">
									<div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold" style={{ background: `var(--color-ws-primary-500)`, color: 'white' }}>
										1
									</div>
								</div>
								<h4 className="text-lg font-semibold mb-3" style={{ color: `var(--color-ws-base-600)` }}>Create Account</h4>
								<p style={{ color: `var(--color-ws-base-400)` }}>
									Sign up for free in seconds. No credit card required, no complicated setup process.
								</p>
							</div>

							{/* Step 2 */}
							<div className="text-center">
								<div className="mb-6 flex justify-center">
									<div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold" style={{ background: `var(--color-ws-primary-500)`, color: 'white' }}>
										2
									</div>
								</div>
								<h4 className="text-lg font-semibold mb-3" style={{ color: `var(--color-ws-base-600)` }}>Add Your Websites</h4>
								<p style={{ color: `var(--color-ws-base-400)` }}>
									Enter your website URLs and configure monitoring preferences. Set up email alerts for immediate notifications.
								</p>
							</div>

							{/* Step 3 */}
							<div className="text-center">
								<div className="mb-6 flex justify-center">
									<div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold" style={{ background: `var(--color-ws-primary-500)`, color: 'white' }}>
										3
									</div>
								</div>
								<h4 className="text-lg font-semibold mb-3" style={{ color: `var(--color-ws-base-600)` }}>Start Monitoring</h4>
								<p style={{ color: `var(--color-ws-base-400)` }}>
									View real-time status, performance metrics, and incident history. Get alerts whenever issues occur.
								</p>
							</div>
						</div>

						<div className="flex justify-center mt-12">
							<Link href="/authenticate">
								<Button variant="base" size="lg" style={{ background: `var(--color-ws-primary-500)`, color: 'white' }}>
									Get Started Now
								</Button>
							</Link>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="w-full py-16 lg:py-24" style={{ background: `linear-gradient(135deg, var(--color-ws-primary-600) 0%, var(--color-ws-primary-700) 100%)`, borderTopColor: `var(--color-ws-base-300)`, borderTopWidth: '1px' }}>
					<div className="container mx-auto px-4 lg:px-8">
						<div className="max-w-2xl mx-auto text-center">
							<H3 className="text-balance text-white">
								Ready to Monitor Your Websites?
							</H3>
							<P className="text-balance mt-4" style={{ color: `var(--color-ws-accent-300)` }}>
								Join thousands of teams that trust WebStat to keep their websites running smoothly. Completely free, forever.
							</P>
							<div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
								<Link href="/authenticate">
									<Button variant="base" size="lg" className="w-full sm:w-auto" style={{ background: 'white', color: `var(--color-ws-primary-600)` }}>
										Sign Up Free
									</Button>
								</Link>
								<Link href="https://github.com/Ravish-Ranjan/web-stat" target="_blank">
									<Button variant="outline" size="lg" className="w-full sm:w-auto" style={{ borderColor: 'white', color: 'white' }}>
										View on GitHub
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

export default Page;
