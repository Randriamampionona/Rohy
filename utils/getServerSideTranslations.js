import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const getServerSideTranslations = async (ctx, namespaces = []) => {
	return {
		...(await serverSideTranslations(ctx.locale, [...namespaces])),
	};
};

export default getServerSideTranslations;
