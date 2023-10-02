import {
	useState,
	ReactNode,
	ReactElement,
	isValidElement,
	Children,
	useEffect
} from "react";

interface StepProps<P> {
	name: P;
	children: ReactNode;
}

interface FunnelProps<P> {
	children: Array<ReactElement<StepProps<P>>> | ReactElement<StepProps<P>>;
}

interface FunnelHookProps<P> {
	step: P[];
}

function useFunnel<P extends string | number>({
	step: _step
}: FunnelHookProps<P>) {
	const [step, setStep] = useState<P | null>(null);

	useEffect(() => {
		setStep(_step[0]);
	}, [_step]);

	const Step: React.FC<StepProps<P>> = (props) => {
		return <>{props.children}</>;
	};

	const Funnel: React.FC<FunnelProps<P>> & { Step: React.FC<StepProps<P>> } = ({
		children
	}) => {
		// name이 현재 step과 같은 Step을 찾아서 children을 렌더링
		const targetStep = Children.toArray(children)
			.filter(isValidElement)
			.find(
				(child): child is ReactElement<StepProps<P>> =>
					isValidElement<StepProps<P>>(child) && child.props.name === step
			);

		return targetStep ? targetStep : null;
	};

	Funnel.Step = Step;

	return { Funnel, setStep };
}

export default useFunnel;
