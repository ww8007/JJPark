import useFunnel from "../src/common/hooks/useFunnel";
import 신청화면 from "../src/park/components/신청화면";
import 결과화면 from "../src/park/components/결과화면";
import { useEffect, useMemo } from "react";
import useAuthContext from "../src/auth/hooks/useAuthContext";
import { STATUS } from "../src/user/db/user";

const index = () => {
	const { user } = useAuthContext();
	const memoStep = useMemo(() => ["SUBMIT", "RESULT"], []);
	const { Funnel, setStep } = useFunnel({
		step: memoStep
	});

	const onClickSubmit = () => {
		setStep("RESULT");
	};

	const onClickCancel = () => {
		setStep("SUBMIT");
	};

	useEffect(() => {
		if (!user) return;
		if (user.status !== STATUS.NONE) {
			setStep("RESULT");
		}
	}, [user]);

	return (
		<>
			<Funnel>
				<Funnel.Step name='SUBMIT'>
					<신청화면 onNext={onClickSubmit} />
				</Funnel.Step>
				<Funnel.Step name='RESULT'>
					<결과화면 onPrev={onClickCancel} />
				</Funnel.Step>
			</Funnel>
		</>
	);
};

export default index;
