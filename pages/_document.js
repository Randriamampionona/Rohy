import { Html, Head, NextScript, Main } from "next/document";

const MyDocument = () => {
	return (
		<Html lang="en">
			<Head>
				<meta name="description" content="Watch more and enjoy :)" />
				<NextScript />
			</Head>

			<body className="selection:bg-primaryColor selection:text-whiteColor">
				<Main />
			</body>
		</Html>
	);
};

export default MyDocument;
