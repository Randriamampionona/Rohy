const getSubscriptionStatus = (subscriptionData) => {
	const { status, start, end } = subscriptionData;

	const subPeriod =
		process.env.NODE_ENV === "production"
			? +process.env.NEXT_SUBSCRIPTION_PERIOD // + 31 days
			: +process.env.NEXT_DEV_SUBSCRIPTION_PERIOD; // + 1h for the test

	const checkDatePeriod = () =>
		!!(end >= Date.now() && end - subPeriod >= start);

	if (checkDatePeriod() === false || status.code === 3) {
		return {
			active: false,
			status: { text: "expired", code: 3 },
		};
	} else if (status.code === 2) {
		return {
			active: false,
			status: { text: "canceled", code: 2 },
		};
	} else if (checkDatePeriod() === true || status.code === 1) {
		return {
			active: true,
			status: { text: "active", code: 1 },
		};
	} else {
		return {
			active: false,
			status: { text: "expired", code: 3 },
		};
	}
};

export default getSubscriptionStatus;

//************NOTE************//
// sub text (should be active)
// sub code (should be 1)
// end date >= todays date (should >= todays date)
// todays date - sub period <= start date (should be <= start date)

// {
//     subscription_ID: transaction_data.orderID,
// 	   status: {
// 	   	text: "active",
// 	   	code: 1
// 	   }
//     details: transaction_details,
//     data: transaction_data,
//     plan: { id, name },
//     created_date: admin.firestore.FieldValue.serverTimestamp(),
//     start: Date.now(),
//     end: Date.now() + 3600000, // + 1h for test
// }
