import * as fcl from '@onflow/fcl';
import { MomentPurchased } from '../types/moments';

export default async function ({
	event,
	startHeight,
	endHeight,
}: {
	event: string;
	startHeight: number;
	endHeight: number;
}): Promise<MomentPurchased[]> {
	const purchased: MomentPurchased[] = await fcl
		.send([fcl.getEventsAtBlockHeightRange(event, startHeight, endHeight)])
		.then(fcl.decode);

	return purchased;
}
