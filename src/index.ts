import * as fcl from '@onflow/fcl';
import { config } from '@onflow/config';
import { scheduleJob } from 'node-schedule';

import logger from './logger';
import { FLOW_ACCESS_NODE, CONTRACT, EVENTS } from './constants';
import { Block } from './types/moments';

import MomentsListed from './events/listed';
import MomentsPurchased from './events/purchased';

config().put('accessNode.api', FLOW_ACCESS_NODE);

const EventMomentListed = `A.${CONTRACT.MARKET_ADDRESS}.${CONTRACT.MARKET_NAME}.${EVENTS.MOMENT_LISTED}`;
const EventMomentPurchased = `A.${CONTRACT.MARKET_ADDRESS}.${CONTRACT.MARKET_NAME}.${EVENTS.MOMENT_PURCHASED}`;

let lastEndHeight: number | null;

scheduleJob('*/10 * * * * *', async () => {
	const block: Block = await fcl.send([fcl.getBlock(true)]).then(fcl.decode);
	if (block.height === lastEndHeight) return;

	const startHeight = lastEndHeight ? lastEndHeight + 1 : block.height;
	const endHeight = block.height;
	lastEndHeight = block.height;

	const purchased = await MomentsPurchased({
		event: EventMomentPurchased,
		startHeight,
		endHeight,
	});

	const listed = await MomentsListed({
		event: EventMomentListed,
		startHeight,
		endHeight,
	});

	purchased.map((p) =>
		logger.info(
			`Seller ${p.data.seller} sold ${p.data.id} for $${p.data.price}`,
		),
	);

	listed.map((l) =>
		logger.info(
			`Seller ${l.data.seller} listed ${l.data.id} for $${l.data.price}`,
		),
	);
});
