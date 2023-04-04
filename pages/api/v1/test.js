import getPerformanceTime from "./../../../utils/getPerformanceTime";

const handler = async (_req, res) => {
	const start = performance.now();

	const say_hi = "Hi !";

	for (let index = 0; index < 50000; index++) {
		// do stuff here
	}

	const end = performance.now();

	const time = getPerformanceTime(start, end);

	res.send({ say_hi, time });
};

export default handler;
