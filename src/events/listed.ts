import * as fcl from '@onflow/fcl';
import * as types from '@onflow/types';

import { LISTED_MOMENT_META } from '../lib/scripts';
import { MomentListed, MomentMeta } from '../types/moments';

export default async function ({
	event,
	startHeight,
	endHeight,
}: {
	event: string;
	startHeight: number;
	endHeight: number;
}): Promise<MomentListed[]> {
	const moments: MomentListed[] = await fcl
		.send([fcl.getEventsAtBlockHeightRange(event, startHeight, endHeight)])
		.then(fcl.decode);

	const meta: MomentListed[] = await Promise.all(
		moments.map(async (m) => {
			const response: MomentMeta = await fcl
				.send([
					fcl.script(LISTED_MOMENT_META),
					fcl.args([
						fcl.arg(m.data.id, types.UInt64),
						fcl.arg(m.data.seller, types.Address),
					]),
				])
				.then(fcl.decode);

			m.data.meta = response;
			return m;
		}),
	);

	return meta;
}
