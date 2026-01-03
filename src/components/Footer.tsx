import { CodepenIcon, GithubIcon, LinkedinIcon } from "@/assets/footerIcons";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="w-full bg-ws-accent-200 dark:bg-ws-base-500 border-t border-border pt-16 pb-8">
			<div className="container mx-auto px-4 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
					{/* Brand Section */}
					<div className="lg:col-span-2">
						<div className="flex items-center gap-2 mb-6 group">
							<Image
								src={"/assets/icons/logo.svg"}
								alt="logo"
								height={36}
								width={36}
							/>
							<span className="text-2xl font-bold tracking-tight text-foreground">
								WebStat
							</span>
						</div>
						<p className="text-muted-foreground leading-relaxed max-w-sm mb-8">
							Reliable real-time monitoring for your digital
							infrastructure. Stay informed, minimize downtime,
							and optimize your website performance with our
							advanced status tracking tools.
						</p>
						<div className="flex gap-4">
							<Link
								href="https://github.com/Ravish-Ranjan/web-stat"
								className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-background hover:border-primary transition-all duration-300"
								target="_blank"
								rel="noopener noreferrer"
							>
								<GithubIcon
									className="w-5 h-5"
									strokeWidth={2}
								/>
								<span className="sr-only">GitHub</span>
							</Link>
							<Link
								href="https://www.linkedin.com/in/ravish-ranjan-1a0757238"
								className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-background hover:border-primary transition-all duration-300"
							>
								<LinkedinIcon
									className="w-5 h-5"
									strokeWidth={2}
								/>
								<span className="sr-only">LinkedIn</span>
							</Link>
							<Link
								href="https://codepen.io/_ravishranjan_"
								className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-background hover:border-primary transition-all duration-300"
							>
								<CodepenIcon
									className="w-5 h-5"
									strokeWidth={2}
								/>
								<span className="sr-only">Codepen</span>
							</Link>
						</div>
					</div>

					{/* Links Sections */}
					<div>
						<h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-6">
							Product
						</h3>
						<ul className="space-y-4">
							<li>
								<Link
									href="/dashboard"
									className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
								>
									Websites Overview
								</Link>
							</li>
							<li>
								<Link
									href="/dashboard/uptime"
									className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
								>
									Uptime Monitoring
								</Link>
							</li>
							<li>
								<Link
									href="/dashboard/incidents"
									className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
								>
									Incident Monitoring
								</Link>
							</li>
							<li>
								<Link
									href="/dashboard/performance"
									className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
								>
									Response Time Monitoring
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-6">
							Resources
						</h3>
						<ul className="space-y-4">
							<li>
								<Link
									href="#"
									target="_blank"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									Documentation
								</Link>
							</li>
							<li>
								<Link
									href="#"
									target="_blank"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									API Reference
								</Link>
							</li>
							<li>
								<Link
									href="#"
									target="_blank"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									Privacy Policy
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-6">
							Support
						</h3>
						<ul className="space-y-4">
							<li>
								<Link
									href="mailto:support.webstat@ravishdev.org"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									Contact Us
								</Link>
							</li>

							<li>
								<Link
									href="https://github.com/Ravish-Ranjan/web-stat/issues"
									target="_blank"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									Github Issues
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-sm text-muted-foreground">
						© {new Date().getFullYear()} WebStat. All rights
						reserved.
					</p>
					<div className="flex items-center gap-8">
						<Link
							href="/terms"
							className="text-xs text-muted-foreground hover:text-primary transition-colors"
						>
							Terms of Service
						</Link>
						<Link
							href="/privacy"
							className="text-xs text-muted-foreground hover:text-primary transition-colors"
						>
							Cookie Policy
						</Link>
						<div className="flex items-center gap-2 text-xs text-muted-foreground">
							<span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
							All Systems Operational
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
