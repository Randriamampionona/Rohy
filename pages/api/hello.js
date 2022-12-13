// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
	res.status(200).json({
		result: {
			slug: "/suggestion/1571",
			title: "Black Adam",
			desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo molestias ipsa iusto quam perferendis. Dolor labore accusamus repellat vitae facilis a quo rem aspernatur inventore voluptatibus voluptates mollitia odio, corporis ut doloremque animi placeat, nobis minima, tempore sed dicta unde.",
			category: "suggestion",
			img: "/assets/suggestion.jfif",
			textBtn: "A decouvrir",
		},
	});
}
