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
					Authorization: `Bearer eyJ4NXQiOiJPRE5tWkRFMll6UTRNVEkxTVRZME1tSmhaR00yTUdWa1lUZGhOall5TWpnM01XTmpNalJqWWpnMll6bGpNRGRsWWpZd05ERmhZVGd6WkRoa1lUVm1OZyIsImtpZCI6Ik9ETm1aREUyWXpRNE1USTFNVFkwTW1KaFpHTTJNR1ZrWVRkaE5qWXlNamczTVdOak1qUmpZamcyWXpsak1EZGxZall3TkRGaFlUZ3paRGhrWVRWbU5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJ0c2lreWFuZHJpYW5qYW5pcmlhbmFAZ21haWwuY29tQGNhcmJvbi5zdXBlciIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiZklpSWwyUmpMSWtsbDVmbHR4MVY0dVU4cGhrYSIsIm5iZiI6MTY3NDEyMTU3NywiYXpwIjoiZklpSWwyUmpMSWtsbDVmbHR4MVY0dVU4cGhrYSIsInNjb3BlIjoiRVhUX0lOVF9NVk9MQV9TQ09QRSIsImlzcyI6Imh0dHBzOlwvXC9hcGltLnByZXAudGVsbWEubWc6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTY3NDEyNTE3NywiaWF0IjoxNjc0MTIxNTc3LCJqdGkiOiI5OWY5MTVlNC0zMjllLTRiMGMtODUzYi02MWRiYTFkMWJjN2IifQ.jP_1k3SBFmyfAW0kp2kCSW0bASXMCgAyF1jxdS47JAGgW1SWNRyx-3t_9h5wB-V_ZSNV60P7t6eao5RJYz2_HaR54hmo6xHWhyVaE9XBBtx8AWrkLt7aQuohQ7LAsXTbFUV2jZkjiUNjwrYaMKqKSJEute3H9bivoxqY3If9NmQbPqVRfY3wer6tJKUV22R9GkBgAA1oT0a461MhQs209nD6nCXwJkAyzMvdvDlH1DQdU3wCto_HWB17DBZaM-xTgIJSegX3n302zQYius9NhWlmeG8RQd-d8TiRfT2qjcEzSmb9rrKveUpQVHe-H2AyDKS3Yq_HIJaPvLv8f15bHQ`,
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
