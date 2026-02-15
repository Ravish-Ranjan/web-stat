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
				<section className="w-full bg-gradient-to-b from-background via-background to-primary/5 dark:to-primary/10">
					<div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32">
						<div className="max-w-3xl mx-auto text-center">
							<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:bg-primary/20 mb-6">
								✨ Real-time Website Monitoring
							</span>
							<H1 className="text-balance text-foreground">
								Keep Your Website Always Online
							</H1>
							<Lead className="text-balance mt-6 text-lg">
								Monitor uptime, track performance, and get instant alerts when your website goes down. Stay ahead of issues before your users do.
							</Lead>
							<div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
								<Link href="/dashboard">
									<Button variant="base" size="lg" className="w-full sm:w-auto">
										Start Monitoring
									</Button>
								</Link>
								<Link href="/authenticate">
									<Button variant="outline" size="lg" className="w-full sm:w-auto">
										Sign Up Free
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="w-full py-16 lg:py-24 border-t border-border">
					<div className="container mx-auto px-4 lg:px-8">
						<div className="max-w-3xl mx-auto text-center mb-16">
							<H3 className="text-balance">
								Powerful Features for Complete Monitoring
							</H3>
							<P className="text-muted-foreground text-balance">
								Everything you need to ensure your websites stay up and running smoothly.
							</P>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{/* Feature Card 1 */}
							<div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
								<div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
									<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
									</svg>
								</div>
								<h4 className="text-lg font-semibold text-foreground mb-2">Uptime Monitoring</h4>
								<p className="text-sm text-muted-foreground">
									Track your website uptime 24/7 with second-level precision. Get instant notifications when your site goes down.
								</p>
							</div>

							{/* Feature Card 2 */}
							<div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
								<div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
									<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
									</svg>
								</div>
								<h4 className="text-lg font-semibold text-foreground mb-2">Performance Tracking</h4>
								<p className="text-sm text-muted-foreground">
									Monitor response times and performance metrics. Identify bottlenecks and optimize your website's speed.
								</p>
							</div>

							{/* Feature Card 3 */}
							<div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
								<div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
									<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
									</svg>
								</div>
								<h4 className="text-lg font-semibold text-foreground mb-2">Smart Alerts</h4>
								<p className="text-sm text-muted-foreground">
									Receive instant notifications via email when incidents occur. Never miss a critical issue again.
								</p>
							</div>

							{/* Feature Card 4 */}
							<div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
								<div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
									<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<h4 className="text-lg font-semibold text-foreground mb-2">Incident Management</h4>
								<p className="text-sm text-muted-foreground">
									Track and manage incidents with detailed logs. Understand what happened and when to improve reliability.
								</p>
							</div>

							{/* Feature Card 5 */}
							<div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
								<div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
									<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<h4 className="text-lg font-semibold text-foreground mb-2">Affordable Pricing</h4>
								<p className="text-sm text-muted-foreground">
									Transparent pricing with no hidden fees. Start monitoring for free and scale as you grow.
								</p>
							</div>

							{/* Feature Card 6 */}
							<div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
								<div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
									<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
									</svg>
								</div>
								<h4 className="text-lg font-semibold text-foreground mb-2">Easy Setup</h4>
								<p className="text-sm text-muted-foreground">
									Add your websites in seconds. Start monitoring immediately with zero configuration needed.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="w-full py-16 lg:py-24 bg-primary/5 dark:bg-primary/10 border-t border-border">
					<div className="container mx-auto px-4 lg:px-8">
						<div className="max-w-2xl mx-auto text-center">
							<H3 className="text-balance text-foreground">
								Ready to Monitor Your Websites?
							</H3>
							<P className="text-muted-foreground text-balance mt-4">
								Join thousands of teams that trust WebStat to keep their websites running smoothly.
							</P>
							<div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
								<Link href="/authenticate">
									<Button variant="base" size="lg" className="w-full sm:w-auto">
										Get Started Free
									</Button>
								</Link>
								<Link href="https://github.com/Ravish-Ranjan/web-stat" target="_blank">
									<Button variant="outline" size="lg" className="w-full sm:w-auto">
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
