import { cn } from "../../lib/utils";
import { forwardRef, SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	className?: string;
	error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ className, children, error, ...props }, ref) => {
		return (
			<select
				className={cn(
					"block w-full rounded-md border border-gray-300 bg-white px-3 py-2",
					"focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
					"dark:border-gray-600 dark:bg-gray-700 dark:text-white",
					"disabled:cursor-not-allowed disabled:opacity-50",
					error && "border-red-500 focus:border-red-500 focus:ring-red-500",
					className
				)}
				ref={ref}
				{...props}
			>
				{children}
			</select>
		);
	}
);

Select.displayName = "Select";
