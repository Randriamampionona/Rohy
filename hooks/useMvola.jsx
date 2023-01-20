import axios from "axios";
import toastNotify from "../utils/toastNotify";
import { v4 } from "uuid";

const useMvola = () => {
	const merchantPaymentFunc = async () => {
		const transactionRef = v4();

		try {
			const URL =
				"https://devapi.mvola.mg/mvola/mm/transactions/type/merchantpay/1.0.0/";

			const data = {
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
			};

			const config = {
				withCredentials: true,
				headers: {
					Authorization:
						"Bearer eyJ4NXQiOiJPRE5tWkRFMll6UTRNVEkxTVRZME1tSmhaR00yTUdWa1lUZGhOall5TWpnM01XTmpNalJqWWpnMll6bGpNRGRsWWpZd05ERmhZVGd6WkRoa1lUVm1OZyIsImtpZCI6Ik9ETm1aREUyWXpRNE1USTFNVFkwTW1KaFpHTTJNR1ZrWVRkaE5qWXlNamczTVdOak1qUmpZamcyWXpsak1EZGxZall3TkRGaFlUZ3paRGhrWVRWbU5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJ0c2lreWFuZHJpYW5qYW5pcmlhbmFAZ21haWwuY29tQGNhcmJvbi5zdXBlciIsImF1dCI6IkFQUExJQ0FUSU9OIiwiYXVkIjoiZklpSWwyUmpMSWtsbDVmbHR4MVY0dVU4cGhrYSIsIm5iZiI6MTY3NDIxNTk0NSwiYXpwIjoiZklpSWwyUmpMSWtsbDVmbHR4MVY0dVU4cGhrYSIsInNjb3BlIjoiRVhUX0lOVF9NVk9MQV9TQ09QRSIsImlzcyI6Imh0dHBzOlwvXC9hcGltLnByZXAudGVsbWEubWc6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTY3NDU3NTk0NSwiaWF0IjoxNjc0MjE1OTQ1LCJqdGkiOiJmOTkyMDk2NC1mZDM0LTQ4YjgtOTllMC1mMjllY2M2YTIzZGUifQ.Ul-MPHDt7NaYsUJGyKVfUcMTz5mVIe3PVMtF_X_XTCSTQ5zabVpQGU3JX7btIlWY1-WPmB_xi-mLKPE7THG6dg0OU1BOYyqqqGJqbS5VHmzML1UNmJqbWrbe0SOUijjbVVMxXwz5RQCFLqoaAheqfxzXIvwNw8ocy5_PGq-FHvN088Z1cgVYxo_pcvNCqUhSGfcGIY9Wt-qlal6PE4PqPs3Ox-chCfg86A_pE07e5c0pCQES2ExFSuPTH8R_axP47WjnsgtkvV-0pZEGGvfabGUOhytYaa4dxlKteozjfjIYVsgaxhUR5bgq9S11njz_naIEjkUfv6hR1pKU9Sr9fg",
					Version: "1.0",
					"X-CorrelationID": "123e4567-e89b-12d3-a456-426614174000",
					UserLanguage: "MG",
					UserAccountIdentifier: "msisdn;0343500004",
					partnerName: "rohy.io",
					// "Content-Type": "application/json",
					"X-Callback-URL": "/",
					"Cache-Control": "no-cache",
				},
			};

			const fetch = await axios.post(URL, data, config);
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
