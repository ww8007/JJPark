import { usePathname, useRouter } from "expo-router";
import React from "react";

import useFunnel from "../src/common/hooks/useFunnel";
import 신청화면 from "../src/components/신청화면";

const index = () => {
	const { Funnel } = useFunnel({
		step: ["SUBMIT", 'SUCCESS" , "LOADING', "FAILURE"]
	});

	usePathname();

	return (
		<>
			<Funnel>
				<Funnel.Step name='SUBMIT'>
					<신청화면 />
				</Funnel.Step>
			</Funnel>
		</>
	);
};

export default index;
