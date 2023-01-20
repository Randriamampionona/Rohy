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
						"eyJ4NXQiOiJPRE5tWkRFMll6UTRNVEkxTVRZME1tSmhaR00yTUdWa1lUZGhOall5TWpnM01XTmpNalJqWWpnMll6bGpNRGRsWWpZd05ERmhZVGd6WkRoa1lUVm1OZyIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ0c2lreWFuZHJpYW5qYW5pcmlhbmFAZ21haWwuY29tQGNhcmJvbi5zdXBlciIsImFwcGxpY2F0aW9uIjp7Im93bmVyIjoidHNpa3lhbmRyaWFuamFuaXJpYW5hQGdtYWlsLmNvbSIsInRpZXJRdW90YVR5cGUiOm51bGwsInRpZXIiOiJVbmxpbWl0ZWQiLCJuYW1lIjoiUk9IWSIsImlkIjo1NzgsInV1aWQiOiI5NTY1NzhmZC1jZGM0LTRlZmItOGQ2MC1mYjc0NDRkYjhlMWYifSwiaXNzIjoiaHR0cHM6XC9cL2FwaW0ucHJlcC50ZWxtYS5tZzo5NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsiR29sZCI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0IjpudWxsfX0sImtleXR5cGUiOiJTQU5EQk9YIiwicGVybWl0dGVkUmVmZXJlciI6IiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6Ik1WT0xBLU1lcmNoYW50LVBheS1BUEkiLCJjb250ZXh0IjoiXC9tdm9sYVwvbW1cL3RyYW5zYWN0aW9uc1wvdHlwZVwvbWVyY2hhbnRwYXlcLzEuMC4wIiwicHVibGlzaGVyIjoiYWRtaW4iLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiR29sZCJ9XSwicGVybWl0dGVkSVAiOiIiLCJpYXQiOjE2NzQyMTU2MDcsImp0aSI6ImQ1MGQxMDE2LTFiMWQtNGZlZC1iYTQ0LTEzZDYwNGJlNjA5NCJ9.pD-L7Dhkc_5hQ3DzxDV_-uuhA8FBI_YPvUwORzhY9Kw6KRi9ja7JrKpZlZ-HJYTL6mZaXwEj2TJx2EdxIRVyUvgKMg48tGn4L2x_dZ7GwVO4fGUDHpGPxEG_46rpWNws7M4YyALrBIefuhXVp9vi7pDXGnHcyXv9KVLo5aOTebi7srTDgZu3_jwWVyUGN05YLvcl0mqAWQdoyPujjtrwDdtb8cfZqyviYt6yLMKcbhOQTblHHspHcBSKV8NDtZLnw_P4TerWZl6hi7U0R8t3f6tPdzXbsXNpeNiNdKdtZ0cwgAb0XG99Gp5QhZX2zsLS_3xwMjI-w88vQKNNgtu5zw==",
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
