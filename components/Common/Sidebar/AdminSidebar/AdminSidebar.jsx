import { useRouter } from "next/router";
import React from "react";

const AdminSidebar = () => {
	const { pathname } = useRouter();

	if (pathname === "/admin") return;

	return <aside>AdminSidebar</aside>;
};

export default AdminSidebar;
