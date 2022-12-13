import axios from "axios";
import { Category, Intro, Suggestion } from "../components/Home";

const HomePage = ({ suggestionData, categoryData }) => {
	return (
		<section className="w-full">
			<Intro />

			<main className="w-full py-16 px-4 md:px-6 lg:px-8 xl:px-12 space-y-20">
				<Suggestion suggestionData={suggestionData} />

				{categoryData?.map((category) => (
					<Category key={category.slug} {...category} />
				))}
			</main>
		</section>
	);
};

export default HomePage;

export const getStaticProps = async () => {
	try {
		const fetch = await axios.get(
			// "https://api.themoviedb.org/3/movie/popular?api_key=21ad01e70707b8167d893fa104cf05cb&language=en-US&page=1"
			`${process.env.NEXT_PUBLIC_BASE_ENDPOINT}/api/hello`
		);
		const result = fetch.data;

		return {
			props: {
				suggestionData: result.result,
				categoryData: [
					{
						slug: "/cinema",
						category: "cinema",
						title: "Le meilleur du cinema recent, c'est ici!",
						desc: "Tout le cinéma franais et international diffusé juste après la sortie en salle. Bref, que du cinéma super frais.",
						textBtn: "tout le cinema",
						data: [],
					},
					{
						slug: "/sport",
						category: "sport",
						title: "Trouver un live ne devrait pas être un sport...",
						desc: "Les plus grandes compétions de football européennes et africaines, les 5 prestigieux championnats de football européens, et aussi la NBA, le Top 14, les Grand Prix de Formule 1",
						textBtn: "tout le sport",
						data: [],
					},
					{
						slug: "/series",
						category: "series",
						title: "Cherry sur le cake: toutes les meilleures series",
						desc: "Toutes les dernières séries internationales, mais surtout les meilleures, sont avec ROHY.",
						textBtn: "toutes les series",
						data: [],
					},
				],
			},
		};
	} catch (error) {
		return {
			props: {
				suggestionData: [],
			},
		};
	}
};
