"use server";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import path from "path";
import fs from "fs";
import SMTPPool from "nodemailer/lib/smtp-pool";

class Mailer {
	private transporter: nodemailer.Transporter<
		SMTPPool.SentMessageInfo,
		SMTPPool.Options
	>;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: parseInt(process.env.EMAIL_PORT || "587"),
			secure: process.env.EMAIL_PORT === "465", // true for 465, false for 587
			pool: true, // <--- Add this for more stable connections
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
			// Optional: for Gmail/Outlook specifically
			tls: {
				rejectUnauthorized: false,
			},
		});
	}

	async verifyEmail(to: string, name: string, verificationUrl: string) {
		try {
			const templatePath = path.join(
				process.cwd(),
				"emails",
				"verify-email.handlebars"
			);
			const templateSource = fs.readFileSync(templatePath, "utf8");
			const template = handlebars.compile(templateSource);

			const parsedHtml = template({
				name,
				email: to,
				verificationUrl,
				date: new Date().toLocaleString(),
			});

			const info = await this.transporter.sendMail({
				from: `"WebStat" <${process.env.EMAIL_USER}>`,
				to,
				subject: "WebStat : Verify your email",
				html: parsedHtml,
			});

			console.log("Email sent: ", info.messageId);
			return info;
		} catch (error) {
			console.error("Nodemailer Error: ", error);
			throw error; // Re-throw so the API knows it failed
		}
	}
	async welcomeBack(to: string, name: string) {
		try {
			const templatePath = path.join(
				process.cwd(),
				"emails",
				"welcome-back.handlebars"
			);
			const templateSource = fs.readFileSync(templatePath, "utf8");
			const template = handlebars.compile(templateSource);

			const parsedHtml = template({
				name,
				date: new Date().toLocaleString(),
			});

			const info = await this.transporter.sendMail({
				from: `"WebStat" <${process.env.EMAIL_USER}>`,
				to,
				subject:
					"WebStat : Welcome back! Your monitoring is back online",
				html: parsedHtml,
			});

			console.log("Email sent: ", info.messageId);
			return info;
		} catch (error) {
			console.error("Nodemailer Error: ", error);
			throw error; // Re-throw so the API knows it failed
		}
	}
	async passwordChanged(to: string, name: string) {
		try {
			const templatePath = path.join(
				process.cwd(),
				"emails",
				"password-changed.handlebars"
			);
			const templateSource = fs.readFileSync(templatePath, "utf8");
			const template = handlebars.compile(templateSource);

			const parsedHtml = template({
				name,
				email:to,
				date: new Date().toLocaleString(),
			});

			const info = await this.transporter.sendMail({
				from: `"WebStat" <${process.env.EMAIL_USER}>`,
				to,
				subject:
					"WebStat : Security Alert - Your WebStat password has been changed",
				html: parsedHtml,
			});

			console.log("Email sent: ", info.messageId);
			return info;
		} catch (error) {
			console.error("Nodemailer Error: ", error);
			throw error; // Re-throw so the API knows it failed
		}
	}
}
export default Mailer;
