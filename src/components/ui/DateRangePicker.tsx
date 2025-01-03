import { cn } from "../../lib/utils";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DateRangePickerProps {
	value: DateRange | undefined;
	onChange: (range: DateRange | undefined) => void;
	className?: string;
}

export function DateRangePicker({
	value,
	onChange,
	className,
}: DateRangePickerProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					"flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2",
					"focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
					"dark:border-gray-600 dark:bg-gray-700 dark:text-white",
					className
				)}
			>
				<span>
					{value?.from ? (
						value.to ? (
							<>
								{format(value.from, "LLL dd, y")} -{" "}
								{format(value.to, "LLL dd, y")}
							</>
						) : (
							format(value.from, "LLL dd, y")
						)
					) : (
						<span>Pick a date range</span>
					)}
				</span>
				<CalendarIcon className="ml-2 h-4 w-4" />
			</button>

			{isOpen && (
				<>
					<div
						className="fixed inset-0 z-40"
						onClick={() => setIsOpen(false)}
					/>
					<div className="absolute right-0 z-50 mt-2 rounded-md border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
						<DayPicker
							mode="range"
							defaultMonth={value?.from}
							selected={value}
							onSelect={(range) => {
								onChange(range);
								if (range?.to) {
									setIsOpen(false);
								}
							}}
							numberOfMonths={2}
							className="dark:bg-gray-800 dark:text-white"
							classNames={{
								months:
									"flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
								month: "space-y-4",
								caption: "flex justify-center pt-1 relative items-center",
								caption_label: "text-sm font-medium",
								nav: "space-x-1 flex items-center",
								nav_button: cn(
									"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
									"text-gray-800 dark:text-gray-100"
								),
								nav_button_previous: "absolute left-1",
								nav_button_next: "absolute right-1",
								table: "w-full border-collapse space-y-1",
								head_row: "flex",
								head_cell:
									"text-gray-500 rounded-md w-8 font-normal text-[0.8rem] dark:text-gray-400",
								row: "flex w-full mt-2",
								cell: cn(
									"relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
									"first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
								),
								day: cn(
									"h-8 w-8 p-0 font-normal",
									"aria-selected:opacity-100",
									"hover:bg-gray-100 dark:hover:bg-gray-700",
									"focus:outline-none focus:ring-2 focus:ring-primary"
								),
								day_selected: "bg-primary text-primary-foreground",
								day_today: "bg-gray-100 dark:bg-gray-800",
								day_outside: "text-gray-500 opacity-50 dark:text-gray-400",
								day_disabled: "text-gray-500 opacity-50 dark:text-gray-400",
								day_range_middle:
									"aria-selected:bg-gray-100 aria-selected:text-gray-900 dark:aria-selected:bg-gray-800 dark:aria-selected:text-gray-50",
								day_hidden: "invisible",
							}}
						/>
					</div>
				</>
			)}
		</div>
	);
}
