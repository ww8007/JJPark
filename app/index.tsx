import useFunnel from "../src/common/hooks/useFunnel";
import 신청화면 from "../src/park/components/신청화면";
import 결과화면 from "../src/park/components/결과화면";
import { useCallback, useEffect, useMemo } from "react";
import useAuthContext from "../src/auth/hooks/useAuthContext";
import { STATUS } from "../src/user/db/user";
import useNotification from "../src/notification/hooks/useNotification";
import Loading from "../src/common/ui/Loading";
import { useBackHandler } from "../src/common/hooks/useBackHandler";

const index = () => {
	useBackHandler();
	const { user } = useAuthContext();
	const { requestUserPermission } = useNotification();

	useEffect(() => {
		requestUserPermission();
	}, []);

	const memoStep = useMemo(() => ["LOADING", "SUBMIT", "RESULT"], []);
	const { Funnel, setStep } = useFunnel({
		step: memoStep
	});

	const onClickSubmit = useCallback(() => {
		setStep("RESULT");
	}, []);

	const onClickCancel = useCallback(() => {
		setStep("SUBMIT");
	}, []);

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				if (user.status === STATUS.NONE) {
					setStep("SUBMIT");
				}
				if (user.status !== STATUS.NONE) {
					setStep("RESULT");
				}
			}, 1000);
		}
	}, [user?.status]);

	return (
		<>
			<Funnel>
				<Funnel.Step name='LOADING'>
					<Loading />
				</Funnel.Step>
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
