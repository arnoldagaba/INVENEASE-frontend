import React from "react";
import { X } from "lucide-react";
import { Button } from "./Button";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	children,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
				<div
					className="fixed inset-0 bg-neutral-900/50 dark:bg-neutral-900/80 transition-opacity"
					onClick={onClose}
				/>

				<div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-neutral-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
					<div className="px-4 pb-4 pt-5 sm:p-6">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
								{title}
							</h3>
							<Button variant="ghost" size="icon" onClick={onClose}>
								<X className="h-4 w-4" />
							</Button>
						</div>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};
