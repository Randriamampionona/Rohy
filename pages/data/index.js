import { useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";

const DataPage = () => {
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);

	const fetchData = async () => {
		try {
			const URL = "/v1/data";
			const fetch = await axios.get(URL, {
				headers: { table_page: page },
			});
			const result = fetch.data;

			if (result.success) {
				setData((prev) => [...prev, ...result.payload?.results]);
			}

			setPage((prev) => prev + 1);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<InfiniteScroll
			pageStart={0}
			loadMore={fetchData}
			hasMore={data.length < 200}
			loader={"Lading..."}
			style={{ width: "100%", display: "flex", flexDirection: "column" }}>
			{data?.map((d, i) => (
				<span key={i} className="px-2 py-4 text-center mb-2">
					{d}
				</span>
			))}
		</InfiniteScroll>
	);
};

export default DataPage;
