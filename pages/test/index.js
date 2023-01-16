import React, { useEffect } from "react";
import { useRouter } from "next/router";

const TestPage = () => {
	const { replace } = useRouter();
	const access = false;

	useEffect(() => {
		!access &&
			replace(
				"/infos?rdc=redirect-QUEST-p=all-channels-AND-key=548148691"
			);
	}, []);

	return <div>Test page</div>;
};

export default TestPage;
