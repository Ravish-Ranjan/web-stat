import { cva } from "class-variance-authority";

export default cva(
	"inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
				base: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
				primary:
					"border-transparent bg-ws-primary-500 dark:bg-ws-primary-600 text-primary-foreground [a&]:hover:bg-ws-primary-700/90 [a&]:dark:hover:bg-ws-primary-400/90",
				secondary:
					"border-transparent bg-ws-secondary-500 dark:bg-ws-secondary-600 text-primary-foreground [a&]:hover:bg-ws-secondary-700/90 [a&]:dark:hover:bg-ws-secondary-400/90",
				destructive:
					"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);
