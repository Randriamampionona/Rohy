import apiErrorHandler from "./../../../../utils/apiErrorHandler";
import { MVolaMarchantPayAPI } from "mvola-api";
import { v4 } from "uuid";

const handler = async (req, res) => {
	if (req.method !== "POST")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const consumerKey = "fIiIl2RjLIkll5fltx1V4uU8phka";
	const consumerSecret = "z1BPikAbueZdNtCSwmEsucocIc4a";
	const mvolaApi = new MVolaMarchantPayAPI();

	// set token directly
	// mvolaApi.setAccessToken(access_token);

	// if you need to revoke token
	mvolaApi.revokeToken(consumerKey, consumerSecret, true).then(() => {
		// init transaction config
		mvolaApi.initConfig({
			version: "1.0",
			xCorrelationID: v4(),
			userLanguage: "MG",
			userAccountIdentifier: "msisdn;034350003",
			partnerName: "Mvola API",
		});

		const trans = {
			amount: 500,
			currency: "Ar",
			descriptionText: "Description",
			requestDate: new Date().toISOString(),
			debitParty: [
				{
					key: "msisdn",
					value: "034350003",
				},
			],
			creditParty: [
				{
					key: "msisdn",
					value: "034350003",
				},
			],
			metadata: [
				{
					key: "partnerName",
					value: "Mvola API",
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
			requestingOrganisationTransactionReference: v4(),
			originalTransactionReference: v4(),
		};

		mvolaApi.initiateTranscation(trans).then((result) => {
			console.log(result);

			return res.status(201).json({
				success: true,
				payload: result
			})
		});
	});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default handler;
