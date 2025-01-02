import React from "react";
import { X } from "lucide-react";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";

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
	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 bg-neutral-900/50 dark:bg-neutral-900/80"
							onClick={onClose}
						/>

						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 10 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 10 }}
							transition={{ duration: 0.2, type: "spring", bounce: 0.3 }}
							className="relative transform overflow-hidden rounded-lg bg-white dark:bg-neutral-800 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg"
						>
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
						</motion.div>
					</div>
				</div>
			)}
		</AnimatePresence>
	);
};
