export interface Block {
	id: string;
	parentId: string;
	height: number;
	timestamp: string;
	collectionGuarantees: {
		collectionId: string;
		signatures: [];
	}[];
	blockSeals: {
		blockId: string;
		executionReceiptId: string;
		executionReceiptSignatures: [];
		resultApprovalSignatures: [];
	}[];
	signatures: [];
}

export interface MomentListed {
	blockId: string;
	blockHeight: number;
	blockTimestamp: string;
	type: string;
	transactionId: string;
	transactionIndex: number;
	eventIndex: number;
	data: {
		id: number;
		price: string;
		seller: string;
		meta?: MomentMeta;
	};
}

export interface MomentMeta {
	id: number;
	playId: number;
	setId: number;
	serialNumber: number;
}

export interface MomentPurchased {
	blockId: string;
	blockHeight: number;
	blockTimestamp: string;
	type: string;
	transactionId: string;
	transactionIndex: number;
	eventIndex: number;
	data: {
		id: number;
		price: string;
		seller: string;
	};
}
