import { Fragment } from "react";
import ReactPlayer from "react-player/lazy";
import dynamic from "next/dynamic";

const Player = ({ videoDetails }) => {
	return (
		<Fragment>
			<ReactPlayer
				playing={true}
				muted={true}
				controls={true}
				pip={true}
				width={"100%"}
				height={"100%"}
				url={videoDetails?.video.url}
			/>
		</Fragment>
	);
};

export default dynamic(() => Promise.resolve(Player), { ssr: false });
