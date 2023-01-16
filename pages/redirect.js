import { useRouter } from "next/router";
import React from "react";

const RedirectPage = () => {
	const { query } = useRouter();

	return <div>Redirect page</div>;
};

export default RedirectPage;
