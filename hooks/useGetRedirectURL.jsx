import { useRouter } from "next/router";

const useGetRedirectURL = () => {
	const {
		query: { rdc },
	} = useRouter();

	const getRedirectURLFunc = (defaultLink) => {
		return rdc
			? `/${rdc.replaceAll("-QUEST-", "?").replaceAll("-AND-", "&")}`
			: defaultLink;
	};

	return { getRedirectURLFunc };
};

export default useGetRedirectURL;
