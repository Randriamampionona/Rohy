import apiErrorHandler from "./../../../../utils/apiErrorHandler";

const handler = async (req, res) => {
	if (req.method !== "POST")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		// const main = async () => {
		// 	const consumerKey = process.env.NEXT_CONSUMER_KEY;
		// 	const consumerSecret = process.env.NEXT_CONSUMER_SECRET;
		// 	const mvola = new Client(SANDBOX_URL);
		// 	const data = await mvola.auth.generateToken(
		// 		consumerKey,
		// 		consumerSecret
		// 	);

		// 	mvola.transaction.setAccessToken(data.access_token);
		// 	mvola.transaction.setOptions({
		// 		version: "1.0",
		// 		correlationId: v4(),
		// 		userLanguage: "FR",
		// 		userAccountIdentifier: "msisdn;0343500004",
		// 		partnerName: "TestMVola",
		// 	});

		// 	const transactionRef = v4();

		// 	const tx = {
		// 		amount: 1000,
		// 		currency: "Ar",
		// 		descriptionText: "test",
		// 		requestDate: new Date().toISOString(),
		// 		debitParty: [
		// 			{
		// 				key: "msisdn",
		// 				value: "0343500003",
		// 			},
		// 		],
		// 		creditParty: [
		// 			{
		// 				key: "msisdn",
		// 				value: "0343500004",
		// 			},
		// 		],
		// 		metadata: [
		// 			{
		// 				key: "partnerName",
		// 				value: "TestMVola",
		// 			},
		// 			{
		// 				key: "fc",
		// 				value: "USD",
		// 			},
		// 			{
		// 				key: "amountFc",
		// 				value: "1",
		// 			},
		// 		],
		// 		requestingOrganisationTransactionReference: transactionRef,
		// 		originalTransactionReference: transactionRef,
		// 	};
		// 	const response = await mvola.transaction.initMerchantPayment(tx);
		// 	return response;
		// };

		const main = async () => {
			const URL =
				"ttps://devapi.mvola.mg/mvola/mm/transactions/type/merchantpay/1.0.0/";
			const get = await fetch(URL, {
				method: "POST",
				headers: {
					Accept: "application.json",
					Authorization: `Bearer ${process.env.NEXT_ACCESS_TOKEN}`,
					Version: "1.0",
					"X-CorrelationID": "123e4567-e89b-12d3-a456-426614174000",
					UserLanguage: "MG",
					UserAccountIdentifier: "msisdn;0343500004",
					partnerName: "Rohy.io",
					"Content-Type": "application/json",
					"X-Callback-URL": "http://localhost:3000/",
					"Cache-Control": "no-cache",
				},
				body: {
					amount: 1000,
					currency: "Ar",
					descriptionText: "test",
					requestDate: new Date().toISOString(),
					debitParty: [
						{
							key: "msisdn",
							value: "0343500003",
						},
					],
					creditParty: [
						{
							key: "msisdn",
							value: "0343500004",
						},
					],
					metadata: [
						{
							key: "partnerName",
							value: "TestMVola",
						},
						{
							key: "fc",
							value: "USD",
						},
						{
							key: "amountFc",
							value: "1",
						},
					],
					requestingOrganisationTransactionReference: "ABC123",
					originalTransactionReference: "AZERTY",
				},
			});
			const result = await get.json();

			return result;
		};

		console.log(await main());

		return res.status(201).json({
			success: true,
			payload: await main(),
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default handler;
