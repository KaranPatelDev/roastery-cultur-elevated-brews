import { createRoot } from "react-dom/client";
import { Component, ReactNode } from "react";
import App from "./App.tsx";
import "./index.css";

type ErrorBoundaryState = {
	hasError: boolean;
	message: string;
};

class RootErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
	constructor(props: { children: ReactNode }) {
		super(props);
		this.state = { hasError: false, message: "" };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return {
			hasError: true,
			message: error?.message || "Unexpected runtime error",
		};
	}

	componentDidCatch(error: Error) {
		console.error("Root render error:", error);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="root-error-boundary">
					<div>
						<h1 className="root-error-title">Render Error</h1>
						<p className="root-error-message">{this.state.message}</p>
						<p className="root-error-hint">
							Open browser console for stack details.
						</p>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

createRoot(document.getElementById("root")!).render(
	<RootErrorBoundary>
		<App />
	</RootErrorBoundary>,
);
