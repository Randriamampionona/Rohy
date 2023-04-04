const getPerformanceTime = (start, end) => {
	const time = (end - start).toFixed();

	return time > 99 ? time / 100 + " s" : time + " ms";
};

export default getPerformanceTime;
