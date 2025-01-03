import { cn } from "../../lib/utils";
import { ReactNode } from "react";

interface CardProps {
	children: ReactNode;
	className?: string;
}

export function Card({ children, className }: CardProps) {
	return (
		<div
			className={cn(
				"rounded-lg border bg-card text-card-foreground shadow-sm",
				"dark:bg-gray-800 dark:border-gray-700",
				className
			)}
		>
			{children}
		</div>
	);
}

Card.Header = function CardHeader({ children, className }: CardProps) {
	return (
		<div
			className={cn(
				"flex flex-col space-y-1.5 p-6",
				"dark:text-gray-100",
				className
			)}
		>
			{children}
		</div>
	);
};

Card.Title = function CardTitle({ children, className }: CardProps) {
	return (
		<h3
			className={cn(
				"text-2xl font-semibold leading-none tracking-tight",
				"dark:text-gray-100",
				className
			)}
		>
			{children}
		</h3>
	);
};

Card.Description = function CardDescription({
	children,
	className,
}: CardProps) {
	return (
		<p
			className={cn(
				"text-sm text-muted-foreground",
				"dark:text-gray-400",
				className
			)}
		>
			{children}
		</p>
	);
};

Card.Content = function CardContent({ children, className }: CardProps) {
	return <div className={cn("p-6 pt-0", className)}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className }: CardProps) {
	return (
		<div className={cn("flex items-center p-6 pt-0", className)}>
			{children}
		</div>
	);
};
