const checkActivePlanHandler = (subscriptionData) => {
	const { active, canceled, start, end } = subscriptionData;

	const getValidity = () => {
		return !!(
			(
				active && // if sub active (should be true)
				!canceled && // if not canceled (should be false)
				end >= Date.now() && // if end date >= todays date
				Date.now() - 3600000 <= start
			) // if todays date - 1h <= start date
		);
	};

	return getValidity();
};

export default checkActivePlanHandler;

// {
//     subscription_ID: transaction_data.orderID,
//     active: true,
// 	   canceled: false,
//     details: transaction_details,
//     data: transaction_data,
//     plan: { id, name },
//     created_date: admin.firestore.FieldValue.serverTimestamp(),
//     start: Date.now(),
//     end: Date.now() + 3600000, // + 1h for test
// }
