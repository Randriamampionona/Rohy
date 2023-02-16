import { GlobalContext } from "../../store/context/GlobalContext";
import { AdminSidebar } from "../Common";

const DashboardHOC = (Component) => {
	return function HOC({ ...props }) {
		const { isAdminSidebarOpen } = GlobalContext();

		return (
			<section className="dashboardSection">
				<AdminSidebar />
				<main
					className={
						isAdminSidebarOpen
							? "admin-main-section--minimize"
							: "admin-main-section--full"
					}>
					<Component {...props} />
				</main>
			</section>
		);
	};
};

export default DashboardHOC;
