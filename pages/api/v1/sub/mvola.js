import axios from "axios";
import { db__admin } from "../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "./../../../../utils/apiErrorHandler";

const handler = async (req, res) => {
	try {
		const { planID } = req.body;

		// get price
		const docRef = db__admin.collection("plans").doc(planID);
		const response = await docRef.get();

		if (!response.exists)
			return apiErrorHandler(res, 500, "Plan not found");

		const { price } = response.data();

		const amount = price.promo
			? price.promo.toString()
			: price.regular.toString();

		// const URL =
		// 	"https://devapi.mvola.mg/mvola/mm/transactions/type/merchantpay/1.0.0/";

		// const data = {
		// 	amount,
		// 	currency: "Ar",
		// 	descriptionText: "test",
		// 	requestingOrganisationTransactionReference: "ABC123",
		// 	originalTransactionReference: "AZERTY",
		// 	requestDate: "2023-01-09T12:00:03.000Z",
		// 	debitParty: [
		// 		{
		// 			key: "msisdn",
		// 			value: "0343500003",
		// 		},
		// 	],
		// 	creditParty: [
		// 		{
		// 			key: "msisdn",
		// 			value: "0343500004",
		// 		},
		// 	],
		// 	metadata: [
		// 		{
		// 			key: "partnerName",
		// 			value: "test",
		// 		},
		// 		{
		// 			key: "fc",
		// 			value: "USD",
		// 		},
		// 		{
		// 			key: "amountFc",
		// 			value: "1",
		// 		},
		// 	],
		// };

		// const config = {
		// 	withCredentials: true,
		// 	headers: {
		// 		Authorization: `Bearer eyJ4NXQiOiJPRE5tWkRFMll6UTRNVEkxTVRZME1tSmhaR00yTUdWa1lUZGhOall5TWpnM01XTmpNalJqWWpnMll6bGpNRGRsWWpZd05ERmhZVGd6WkRoa1lUVm1OZyIsImtpZCI6Ik9ETm1aREUyWXpRNE1USTFNVFkwTW1KaFpHTTJNR1ZrWVRkaE5qWXlNamczTVdOak1qUmpZamcyWXpsak1EZGxZall3TkRGaFlUZ3paRGhrWVRWbU5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJ0c2lreWFuZHJpYW5qYW5pcmlhbmFAZ21haWwuY29tQGNhcmJvbi5zdXBlciIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiZklpSWwyUmpMSWtsbDVmbHR4MVY0dVU4cGhrYSIsIm5iZiI6MTY3NDYyNjYzMiwiYXpwIjoiZklpSWwyUmpMSWtsbDVmbHR4MVY0dVU4cGhrYSIsInNjb3BlIjoiRVhUX0lOVF9NVk9MQV9TQ09QRSIsImlzcyI6Imh0dHBzOlwvXC9hcGltLnByZXAudGVsbWEubWc6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTY3NDk4NjYzMiwiaWF0IjoxNjc0NjI2NjMyLCJqdGkiOiJjZjc4MmFhMy01Yzg4LTRlM2MtYmZkNC00OGU4YTliYTZiNjYifQ.qdI92lQeo1HzN_8s1qtK_VraWufgJ4vit1dCyxvFl5kABz2GqJm8Dcqmrgi79YowANg9Fg-8Dy7JPjMDg6U6q3iFaMjcCSc35SZU3cZ_YGtWhGpgVwpKmOPNv_8QdqxMidP0Q4-LdueTZ-b-CqPYQiB0_Th_mfNfNVtC2YlwE5unlqS6_NGOeWFynnWUkFsN3W0jEsZpufj6lipb16swIHawKLKDB2jtLZ9O8U35YBh0a-VO647aIIQLxGHgqeb4xJgRTdmQdDBmTcu_99PJ_qeUTC6KcpfG_F70iS4MGsSiJzaXavLVPPZhAQoeDHmOTVOZWYYgXFPJtj0TZM-Zdg`,
		// 		Version: "1.0",
		// 		"X-CorrelationID": "123e4567-e89b-12d3-a456-426614174000",
		// 		UserLanguage: "MG",
		// 		UserAccountIdentifier: "msisdn;0343500004",
		// 		partnerName: "rohy.io",
		// 		"Content-Type": "application/json",
		// 		"X-Callback-URL": "/",
		// 		"Cache-Control": "no-cache",
		// 	},
		// };

		const URL = "https://rohy-server.vercel.app/api/mvola/merchantpay";

		const fetch = await axios.post(URL, { amount });
		const result = fetch.data;

		return res.status(200).json({
			success: true,
			message: "Transaction succeed",
			payload: result,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default handler;
