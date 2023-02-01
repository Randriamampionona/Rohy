import { AdminSidebar } from "../Common";

const DashboardHOC = (Component) => {
	return function HOC({ ...props }) {
		return (
			<section className="dashboardSection">
				<AdminSidebar />
				<main className="col-[2/7] flex-grow flex-shrink p-4">
					<Component {...props} />
				</main>
			</section>
		);
	};
};

export default DashboardHOC;
