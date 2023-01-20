import axios from "axios";
import toastNotify from "../utils/toastNotify";
import { v4 } from "uuid";

const useMvola = () => {
	const merchantPaymentFunc = async () => {
		const transactionRef = v4();

		try {
			const URL =
				"https://devapi.mvola.mg/mvola/mm/transactions/type/merchantpay/1.0.0/";
			const fetch = await axios.post(
				URL,
				{
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
							value: "rohy.io",
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
					requestingOrganisationTransactionReference: transactionRef,
					originalTransactionReference: transactionRef,
				},
				{
					withCredentials: true,
					headers: {
						Authorization:
							"eyJ4NXQiOiJPRE5tWkRFMll6UTRNVEkxTVRZME1tSmhaR00yTUdWa1lUZGhOall5TWpnM01XTmpNalJqWWpnMll6bGpNRGRsWWpZd05ERmhZVGd6WkRoa1lUVm1OZyIsImtpZCI6Ik9ETm1aREUyWXpRNE1USTFNVFkwTW1KaFpHTTJNR1ZrWVRkaE5qWXlNamczTVdOak1qUmpZamcyWXpsak1EZGxZall3TkRGaFlUZ3paRGhrWVRWbU5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJ0c2lreWFuZHJpYW5qYW5pcmlhbmFAZ21haWwuY29tQGNhcmJvbi5zdXBlciIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiZklpSWwyUmpMSWtsbDVmbHR4MVY0dVU4cGhrYSIsIm5iZiI6MTY3NDIxMzM4NywiYXpwIjoiZklpSWwyUmpMSWtsbDVmbHR4MVY0dVU4cGhrYSIsInNjb3BlIjoiRVhUX0lOVF9NVk9MQV9TQ09QRSIsImlzcyI6Imh0dHBzOlwvXC9hcGltLnByZXAudGVsbWEubWc6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTY3NDIxNjk4NywiaWF0IjoxNjc0MjEzMzg3LCJqdGkiOiJiMTY0ZjcyOC01MTY2LTRjMDItODczZi01MjBmMjllZjFhZTUifQ.PT7rlT64D2Idco6_y4LdBVOoC0vdrnK1w6c1j6iYZ3QiEbo5SOF15lpn_Mq-fO4sEP6YhYkkp0caMTGuyVZFNgrRZG0uLeM_hAPD07hK1LZLSFWfxGEFDzAbSTcXmcrOEY5narEh0ZML96J2pdGyIs674kFiCDd_31w_bU5i8uR902LqUMlC9JQrnLdaA2A4tto3MK4e25LOc8NXfopTtzy0oLKOjd-tWOAa7qZWCeJUHzXg8ZwKHwA9mMfp6dL4gtEnlM_TiKOq8X08w_jPKbLVdhrulLU5-bjwzVZp8M_UqmPno7wEAB4OUeC3juZWsOe8gyFq7RqRnM-A4aqJWg",
						Version: "1.0",
						"X-CorrelationID":
							"123e4567-e89b-12d3-a456-426614174000",
						UserLanguage: "MG",
						UserAccountIdentifier: "msisdn;0343500004",
						partnerName: "rohy.io",
						"Content-Type": "application/json",
						"X-Callback-URL": "/",
						"Cache-Control": "no-cache",
					},
				}
			);
			const result = fetch.data;

			// if (result.success) {
			// 	toastNotify("success", result.message);
			// 	console.log(result.payload);
			// 	return;
			// }

			console.log(result);

			throw new Error(result.message || "Payment error (Mvola)");
		} catch (error) {
			console.log(error);
			toastNotify("error", error);
		}
	};

	// other API calls

	return { merchantPaymentFunc };
};

export default useMvola;
