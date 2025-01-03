import { Card } from "../components/ui/Card";

export default function Reports() {
	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-8">Reports</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Card>
					<Card.Header>
						<Card.Title>Data Analysis</Card.Title>
						<Card.Description>
							Create and view data analysis reports
						</Card.Description>
					</Card.Header>
					<Card.Content>
						<p>Select data points and generate insights</p>
					</Card.Content>
					<Card.Footer>
						<button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
							Create Report
						</button>
					</Card.Footer>
				</Card>

				<Card>
					<Card.Header>
						<Card.Title>Trend Analysis</Card.Title>
						<Card.Description>
							View historical trends and patterns
						</Card.Description>
					</Card.Header>
					<Card.Content>
						<p>Analyze trends over time</p>
					</Card.Content>
					<Card.Footer>
						<button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
							View Trends
						</button>
					</Card.Footer>
				</Card>

				<Card>
					<Card.Header>
						<Card.Title>Custom Reports</Card.Title>
						<Card.Description>
							Generate custom reports based on specific criteria
						</Card.Description>
					</Card.Header>
					<Card.Content>
						<p>Create personalized reports</p>
					</Card.Content>
					<Card.Footer>
						<button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
							Customize
						</button>
					</Card.Footer>
				</Card>
			</div>
		</div>
	);
}