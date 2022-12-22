import Head from "next/head";

const MetaHead = ({ subTitle }) => {
	return (
		<Head>
			<title>{subTitle ? `Rohy | ${subTitle}` : "Rohy"}</title>
			<link rel="icon" href="/assets/ico.png" />
		</Head>
	);
};

export default MetaHead;
