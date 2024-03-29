import Image from "next/image";
import mvolaLogo from "../../../public/assets/mvola.jpeg";
import { ImSpinner2 } from "react-icons/im";

const MvolaBtn = ({ w = "w-52", onClick = () => null, loading = false }) => {
	return (
		<button
			disabled={loading}
			className={`secondaryBtn ${w} bg-[#fccc22] mx-auto hover:bg-[#fccc22]`}
			onClick={onClick}>
			{loading ? (
				<>
					<span className="animate-spin">
						<ImSpinner2 />
					</span>
					<span className="font-semibold whitespace-nowrap">
						Traitement...
					</span>
				</>
			) : (
				<>
					<div className="relative w-[40%] h-full">
						<Image
							src={mvolaLogo}
							alt="mvola-logo"
							layout="fill"
							objectFit="contain"
						/>
					</div>
					<span className="font-semibold whitespace-nowrap">
						Pay with MVola
					</span>
				</>
			)}
		</button>
	);
};

export default MvolaBtn;
