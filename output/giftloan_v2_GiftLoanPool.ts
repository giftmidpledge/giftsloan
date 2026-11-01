import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    ComputeError,
    TupleItem,
    TupleReader,
    Dictionary,
    contractAddress,
    address,
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

export function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    }
}

export type SignedBundle = {
    $$type: 'SignedBundle';
    signature: Buffer;
    signedData: Slice;
}

export function storeSignedBundle(src: SignedBundle) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBuffer(src.signature);
        b_0.storeBuilder(src.signedData.asBuilder());
    };
}

export function loadSignedBundle(slice: Slice) {
    const sc_0 = slice;
    const _signature = sc_0.loadBuffer(64);
    const _signedData = sc_0;
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadGetterTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function storeTupleSignedBundle(source: SignedBundle) {
    const builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.signedData.asCell());
    return builder.build();
}

export function dictValueParserSignedBundle(): DictionaryValue<SignedBundle> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSignedBundle(src)).endCell());
        },
        parse: (src) => {
            return loadSignedBundle(src.loadRef().beginParse());
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

export function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

export function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

export function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

export function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

export function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

export function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type OwnershipAssigned = {
    $$type: 'OwnershipAssigned';
    queryId: bigint;
    prevOwner: Address;
    forwardPayload: Slice;
}

export function storeOwnershipAssigned(src: OwnershipAssigned) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(85167505, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.prevOwner);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadOwnershipAssigned(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 85167505) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _prevOwner = sc_0.loadAddress();
    const _forwardPayload = sc_0;
    return { $$type: 'OwnershipAssigned' as const, queryId: _queryId, prevOwner: _prevOwner, forwardPayload: _forwardPayload };
}

export function loadTupleOwnershipAssigned(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _prevOwner = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'OwnershipAssigned' as const, queryId: _queryId, prevOwner: _prevOwner, forwardPayload: _forwardPayload };
}

export function loadGetterTupleOwnershipAssigned(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _prevOwner = source.readAddress();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'OwnershipAssigned' as const, queryId: _queryId, prevOwner: _prevOwner, forwardPayload: _forwardPayload };
}

export function storeTupleOwnershipAssigned(source: OwnershipAssigned) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.prevOwner);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserOwnershipAssigned(): DictionaryValue<OwnershipAssigned> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOwnershipAssigned(src)).endCell());
        },
        parse: (src) => {
            return loadOwnershipAssigned(src.loadRef().beginParse());
        }
    }
}

export type NftTransfer = {
    $$type: 'NftTransfer';
    queryId: bigint;
    newOwner: Address;
    responseDestination: Address | null;
    customPayload: Cell | null;
    forwardAmount: bigint;
    forwardPayload: Slice;
}

export function storeNftTransfer(src: NftTransfer) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadNftTransfer(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    const _responseDestination = sc_0.loadMaybeAddress();
    const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _forwardAmount = sc_0.loadCoins();
    const _forwardPayload = sc_0;
    return { $$type: 'NftTransfer' as const, queryId: _queryId, newOwner: _newOwner, responseDestination: _responseDestination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

export function loadTupleNftTransfer(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _customPayload = source.readCellOpt();
    const _forwardAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'NftTransfer' as const, queryId: _queryId, newOwner: _newOwner, responseDestination: _responseDestination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

export function loadGetterTupleNftTransfer(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    const _responseDestination = source.readAddressOpt();
    const _customPayload = source.readCellOpt();
    const _forwardAmount = source.readBigNumber();
    const _forwardPayload = source.readCell().asSlice();
    return { $$type: 'NftTransfer' as const, queryId: _queryId, newOwner: _newOwner, responseDestination: _responseDestination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

export function storeTupleNftTransfer(source: NftTransfer) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardAmount);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

export function dictValueParserNftTransfer(): DictionaryValue<NftTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadNftTransfer(src.loadRef().beginParse());
        }
    }
}

export type DeployEscrow = {
    $$type: 'DeployEscrow';
    nft: Address;
}

export function storeDeployEscrow(src: DeployEscrow) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953982992, 32);
        b_0.storeAddress(src.nft);
    };
}

export function loadDeployEscrow(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953982992) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    return { $$type: 'DeployEscrow' as const, nft: _nft };
}

export function loadTupleDeployEscrow(source: TupleReader) {
    const _nft = source.readAddress();
    return { $$type: 'DeployEscrow' as const, nft: _nft };
}

export function loadGetterTupleDeployEscrow(source: TupleReader) {
    const _nft = source.readAddress();
    return { $$type: 'DeployEscrow' as const, nft: _nft };
}

export function storeTupleDeployEscrow(source: DeployEscrow) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    return builder.build();
}

export function dictValueParserDeployEscrow(): DictionaryValue<DeployEscrow> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployEscrow(src)).endCell());
        },
        parse: (src) => {
            return loadDeployEscrow(src.loadRef().beginParse());
        }
    }
}

export type LoanRequest = {
    $$type: 'LoanRequest';
    nft: Address;
    borrower: Address;
    principal: bigint;
    term: bigint;
    exp: bigint;
    sig: Cell;
}

export function storeLoanRequest(src: LoanRequest) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953982993, 32);
        b_0.storeAddress(src.nft);
        b_0.storeAddress(src.borrower);
        b_0.storeCoins(src.principal);
        b_0.storeUint(src.term, 16);
        b_0.storeUint(src.exp, 32);
        b_0.storeRef(src.sig);
    };
}

export function loadLoanRequest(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953982993) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _borrower = sc_0.loadAddress();
    const _principal = sc_0.loadCoins();
    const _term = sc_0.loadUintBig(16);
    const _exp = sc_0.loadUintBig(32);
    const _sig = sc_0.loadRef();
    return { $$type: 'LoanRequest' as const, nft: _nft, borrower: _borrower, principal: _principal, term: _term, exp: _exp, sig: _sig };
}

export function loadTupleLoanRequest(source: TupleReader) {
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _principal = source.readBigNumber();
    const _term = source.readBigNumber();
    const _exp = source.readBigNumber();
    const _sig = source.readCell();
    return { $$type: 'LoanRequest' as const, nft: _nft, borrower: _borrower, principal: _principal, term: _term, exp: _exp, sig: _sig };
}

export function loadGetterTupleLoanRequest(source: TupleReader) {
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _principal = source.readBigNumber();
    const _term = source.readBigNumber();
    const _exp = source.readBigNumber();
    const _sig = source.readCell();
    return { $$type: 'LoanRequest' as const, nft: _nft, borrower: _borrower, principal: _principal, term: _term, exp: _exp, sig: _sig };
}

export function storeTupleLoanRequest(source: LoanRequest) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeAddress(source.borrower);
    builder.writeNumber(source.principal);
    builder.writeNumber(source.term);
    builder.writeNumber(source.exp);
    builder.writeCell(source.sig);
    return builder.build();
}

export function dictValueParserLoanRequest(): DictionaryValue<LoanRequest> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLoanRequest(src)).endCell());
        },
        parse: (src) => {
            return loadLoanRequest(src.loadRef().beginParse());
        }
    }
}

export type LoanApproved = {
    $$type: 'LoanApproved';
    repay: bigint;
    principal: bigint;
    dueAt: bigint;
    treasury: Address;
}

export function storeLoanApproved(src: LoanApproved) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953982994, 32);
        b_0.storeCoins(src.repay);
        b_0.storeCoins(src.principal);
        b_0.storeUint(src.dueAt, 32);
        b_0.storeAddress(src.treasury);
    };
}

export function loadLoanApproved(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953982994) { throw Error('Invalid prefix'); }
    const _repay = sc_0.loadCoins();
    const _principal = sc_0.loadCoins();
    const _dueAt = sc_0.loadUintBig(32);
    const _treasury = sc_0.loadAddress();
    return { $$type: 'LoanApproved' as const, repay: _repay, principal: _principal, dueAt: _dueAt, treasury: _treasury };
}

export function loadTupleLoanApproved(source: TupleReader) {
    const _repay = source.readBigNumber();
    const _principal = source.readBigNumber();
    const _dueAt = source.readBigNumber();
    const _treasury = source.readAddress();
    return { $$type: 'LoanApproved' as const, repay: _repay, principal: _principal, dueAt: _dueAt, treasury: _treasury };
}

export function loadGetterTupleLoanApproved(source: TupleReader) {
    const _repay = source.readBigNumber();
    const _principal = source.readBigNumber();
    const _dueAt = source.readBigNumber();
    const _treasury = source.readAddress();
    return { $$type: 'LoanApproved' as const, repay: _repay, principal: _principal, dueAt: _dueAt, treasury: _treasury };
}

export function storeTupleLoanApproved(source: LoanApproved) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.repay);
    builder.writeNumber(source.principal);
    builder.writeNumber(source.dueAt);
    builder.writeAddress(source.treasury);
    return builder.build();
}

export function dictValueParserLoanApproved(): DictionaryValue<LoanApproved> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLoanApproved(src)).endCell());
        },
        parse: (src) => {
            return loadLoanApproved(src.loadRef().beginParse());
        }
    }
}

export type LoanRejected = {
    $$type: 'LoanRejected';
}

export function storeLoanRejected(src: LoanRejected) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953982995, 32);
    };
}

export function loadLoanRejected(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953982995) { throw Error('Invalid prefix'); }
    return { $$type: 'LoanRejected' as const };
}

export function loadTupleLoanRejected(source: TupleReader) {
    return { $$type: 'LoanRejected' as const };
}

export function loadGetterTupleLoanRejected(source: TupleReader) {
    return { $$type: 'LoanRejected' as const };
}

export function storeTupleLoanRejected(source: LoanRejected) {
    const builder = new TupleBuilder();
    return builder.build();
}

export function dictValueParserLoanRejected(): DictionaryValue<LoanRejected> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLoanRejected(src)).endCell());
        },
        parse: (src) => {
            return loadLoanRejected(src.loadRef().beginParse());
        }
    }
}

export type RescueNft = {
    $$type: 'RescueNft';
    nft: Address;
    to: Address;
}

export function storeRescueNft(src: RescueNft) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953982996, 32);
        b_0.storeAddress(src.nft);
        b_0.storeAddress(src.to);
    };
}

export function loadRescueNft(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953982996) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _to = sc_0.loadAddress();
    return { $$type: 'RescueNft' as const, nft: _nft, to: _to };
}

export function loadTupleRescueNft(source: TupleReader) {
    const _nft = source.readAddress();
    const _to = source.readAddress();
    return { $$type: 'RescueNft' as const, nft: _nft, to: _to };
}

export function loadGetterTupleRescueNft(source: TupleReader) {
    const _nft = source.readAddress();
    const _to = source.readAddress();
    return { $$type: 'RescueNft' as const, nft: _nft, to: _to };
}

export function storeTupleRescueNft(source: RescueNft) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeAddress(source.to);
    return builder.build();
}

export function dictValueParserRescueNft(): DictionaryValue<RescueNft> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRescueNft(src)).endCell());
        },
        parse: (src) => {
            return loadRescueNft(src.loadRef().beginParse());
        }
    }
}

export type Rescue = {
    $$type: 'Rescue';
    to: Address;
}

export function storeRescue(src: Rescue) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953982997, 32);
        b_0.storeAddress(src.to);
    };
}

export function loadRescue(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953982997) { throw Error('Invalid prefix'); }
    const _to = sc_0.loadAddress();
    return { $$type: 'Rescue' as const, to: _to };
}

export function loadTupleRescue(source: TupleReader) {
    const _to = source.readAddress();
    return { $$type: 'Rescue' as const, to: _to };
}

export function loadGetterTupleRescue(source: TupleReader) {
    const _to = source.readAddress();
    return { $$type: 'Rescue' as const, to: _to };
}

export function storeTupleRescue(source: Rescue) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.to);
    return builder.build();
}

export function dictValueParserRescue(): DictionaryValue<Rescue> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRescue(src)).endCell());
        },
        parse: (src) => {
            return loadRescue(src.loadRef().beginParse());
        }
    }
}

export type RescueAnyNft = {
    $$type: 'RescueAnyNft';
    nft: Address;
    to: Address;
}

export function storeRescueAnyNft(src: RescueAnyNft) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953982998, 32);
        b_0.storeAddress(src.nft);
        b_0.storeAddress(src.to);
    };
}

export function loadRescueAnyNft(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953982998) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _to = sc_0.loadAddress();
    return { $$type: 'RescueAnyNft' as const, nft: _nft, to: _to };
}

export function loadTupleRescueAnyNft(source: TupleReader) {
    const _nft = source.readAddress();
    const _to = source.readAddress();
    return { $$type: 'RescueAnyNft' as const, nft: _nft, to: _to };
}

export function loadGetterTupleRescueAnyNft(source: TupleReader) {
    const _nft = source.readAddress();
    const _to = source.readAddress();
    return { $$type: 'RescueAnyNft' as const, nft: _nft, to: _to };
}

export function storeTupleRescueAnyNft(source: RescueAnyNft) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeAddress(source.to);
    return builder.build();
}

export function dictValueParserRescueAnyNft(): DictionaryValue<RescueAnyNft> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRescueAnyNft(src)).endCell());
        },
        parse: (src) => {
            return loadRescueAnyNft(src.loadRef().beginParse());
        }
    }
}

export type RescueForeignNft = {
    $$type: 'RescueForeignNft';
    escrowNft: Address;
    foreign: Address;
    to: Address;
}

export function storeRescueForeignNft(src: RescueForeignNft) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953982999, 32);
        b_0.storeAddress(src.escrowNft);
        b_0.storeAddress(src.foreign);
        b_0.storeAddress(src.to);
    };
}

export function loadRescueForeignNft(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953982999) { throw Error('Invalid prefix'); }
    const _escrowNft = sc_0.loadAddress();
    const _foreign = sc_0.loadAddress();
    const _to = sc_0.loadAddress();
    return { $$type: 'RescueForeignNft' as const, escrowNft: _escrowNft, foreign: _foreign, to: _to };
}

export function loadTupleRescueForeignNft(source: TupleReader) {
    const _escrowNft = source.readAddress();
    const _foreign = source.readAddress();
    const _to = source.readAddress();
    return { $$type: 'RescueForeignNft' as const, escrowNft: _escrowNft, foreign: _foreign, to: _to };
}

export function loadGetterTupleRescueForeignNft(source: TupleReader) {
    const _escrowNft = source.readAddress();
    const _foreign = source.readAddress();
    const _to = source.readAddress();
    return { $$type: 'RescueForeignNft' as const, escrowNft: _escrowNft, foreign: _foreign, to: _to };
}

export function storeTupleRescueForeignNft(source: RescueForeignNft) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.escrowNft);
    builder.writeAddress(source.foreign);
    builder.writeAddress(source.to);
    return builder.build();
}

export function dictValueParserRescueForeignNft(): DictionaryValue<RescueForeignNft> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRescueForeignNft(src)).endCell());
        },
        parse: (src) => {
            return loadRescueForeignNft(src.loadRef().beginParse());
        }
    }
}

export type RescueForeign = {
    $$type: 'RescueForeign';
    nft: Address;
    to: Address;
}

export function storeRescueForeign(src: RescueForeign) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983000, 32);
        b_0.storeAddress(src.nft);
        b_0.storeAddress(src.to);
    };
}

export function loadRescueForeign(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983000) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _to = sc_0.loadAddress();
    return { $$type: 'RescueForeign' as const, nft: _nft, to: _to };
}

export function loadTupleRescueForeign(source: TupleReader) {
    const _nft = source.readAddress();
    const _to = source.readAddress();
    return { $$type: 'RescueForeign' as const, nft: _nft, to: _to };
}

export function loadGetterTupleRescueForeign(source: TupleReader) {
    const _nft = source.readAddress();
    const _to = source.readAddress();
    return { $$type: 'RescueForeign' as const, nft: _nft, to: _to };
}

export function storeTupleRescueForeign(source: RescueForeign) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeAddress(source.to);
    return builder.build();
}

export function dictValueParserRescueForeign(): DictionaryValue<RescueForeign> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRescueForeign(src)).endCell());
        },
        parse: (src) => {
            return loadRescueForeign(src.loadRef().beginParse());
        }
    }
}

export type Repay = {
    $$type: 'Repay';
}

export function storeRepay(src: Repay) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953982978, 32);
    };
}

export function loadRepay(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953982978) { throw Error('Invalid prefix'); }
    return { $$type: 'Repay' as const };
}

export function loadTupleRepay(source: TupleReader) {
    return { $$type: 'Repay' as const };
}

export function loadGetterTupleRepay(source: TupleReader) {
    return { $$type: 'Repay' as const };
}

export function storeTupleRepay(source: Repay) {
    const builder = new TupleBuilder();
    return builder.build();
}

export function dictValueParserRepay(): DictionaryValue<Repay> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRepay(src)).endCell());
        },
        parse: (src) => {
            return loadRepay(src.loadRef().beginParse());
        }
    }
}

export type LiquidateNft = {
    $$type: 'LiquidateNft';
    nft: Address;
}

export function storeLiquidateNft(src: LiquidateNft) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983001, 32);
        b_0.storeAddress(src.nft);
    };
}

export function loadLiquidateNft(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983001) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    return { $$type: 'LiquidateNft' as const, nft: _nft };
}

export function loadTupleLiquidateNft(source: TupleReader) {
    const _nft = source.readAddress();
    return { $$type: 'LiquidateNft' as const, nft: _nft };
}

export function loadGetterTupleLiquidateNft(source: TupleReader) {
    const _nft = source.readAddress();
    return { $$type: 'LiquidateNft' as const, nft: _nft };
}

export function storeTupleLiquidateNft(source: LiquidateNft) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    return builder.build();
}

export function dictValueParserLiquidateNft(): DictionaryValue<LiquidateNft> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidateNft(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidateNft(src.loadRef().beginParse());
        }
    }
}

export type LiquidateByPool = {
    $$type: 'LiquidateByPool';
    to: Address;
}

export function storeLiquidateByPool(src: LiquidateByPool) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983002, 32);
        b_0.storeAddress(src.to);
    };
}

export function loadLiquidateByPool(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983002) { throw Error('Invalid prefix'); }
    const _to = sc_0.loadAddress();
    return { $$type: 'LiquidateByPool' as const, to: _to };
}

export function loadTupleLiquidateByPool(source: TupleReader) {
    const _to = source.readAddress();
    return { $$type: 'LiquidateByPool' as const, to: _to };
}

export function loadGetterTupleLiquidateByPool(source: TupleReader) {
    const _to = source.readAddress();
    return { $$type: 'LiquidateByPool' as const, to: _to };
}

export function storeTupleLiquidateByPool(source: LiquidateByPool) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.to);
    return builder.build();
}

export function dictValueParserLiquidateByPool(): DictionaryValue<LiquidateByPool> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidateByPool(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidateByPool(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    amount: bigint;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953982980, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdraw(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953982980) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

export function loadTupleWithdraw(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

export function loadGetterTupleWithdraw(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

export function storeTupleWithdraw(source: Withdraw) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

export function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type SetMaxLoan = {
    $$type: 'SetMaxLoan';
    value: bigint;
}

export function storeSetMaxLoan(src: SetMaxLoan) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953982981, 32);
        b_0.storeCoins(src.value);
    };
}

export function loadSetMaxLoan(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953982981) { throw Error('Invalid prefix'); }
    const _value = sc_0.loadCoins();
    return { $$type: 'SetMaxLoan' as const, value: _value };
}

export function loadTupleSetMaxLoan(source: TupleReader) {
    const _value = source.readBigNumber();
    return { $$type: 'SetMaxLoan' as const, value: _value };
}

export function loadGetterTupleSetMaxLoan(source: TupleReader) {
    const _value = source.readBigNumber();
    return { $$type: 'SetMaxLoan' as const, value: _value };
}

export function storeTupleSetMaxLoan(source: SetMaxLoan) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.value);
    return builder.build();
}

export function dictValueParserSetMaxLoan(): DictionaryValue<SetMaxLoan> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetMaxLoan(src)).endCell());
        },
        parse: (src) => {
            return loadSetMaxLoan(src.loadRef().beginParse());
        }
    }
}

export type SetSigner = {
    $$type: 'SetSigner';
    key: bigint;
}

export function storeSetSigner(src: SetSigner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953982982, 32);
        b_0.storeUint(src.key, 256);
    };
}

export function loadSetSigner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953982982) { throw Error('Invalid prefix'); }
    const _key = sc_0.loadUintBig(256);
    return { $$type: 'SetSigner' as const, key: _key };
}

export function loadTupleSetSigner(source: TupleReader) {
    const _key = source.readBigNumber();
    return { $$type: 'SetSigner' as const, key: _key };
}

export function loadGetterTupleSetSigner(source: TupleReader) {
    const _key = source.readBigNumber();
    return { $$type: 'SetSigner' as const, key: _key };
}

export function storeTupleSetSigner(source: SetSigner) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.key);
    return builder.build();
}

export function dictValueParserSetSigner(): DictionaryValue<SetSigner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetSigner(src)).endCell());
        },
        parse: (src) => {
            return loadSetSigner(src.loadRef().beginParse());
        }
    }
}

export type ProposeOwner = {
    $$type: 'ProposeOwner';
    newOwner: Address;
}

export function storeProposeOwner(src: ProposeOwner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953982983, 32);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadProposeOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953982983) { throw Error('Invalid prefix'); }
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ProposeOwner' as const, newOwner: _newOwner };
}

export function loadTupleProposeOwner(source: TupleReader) {
    const _newOwner = source.readAddress();
    return { $$type: 'ProposeOwner' as const, newOwner: _newOwner };
}

export function loadGetterTupleProposeOwner(source: TupleReader) {
    const _newOwner = source.readAddress();
    return { $$type: 'ProposeOwner' as const, newOwner: _newOwner };
}

export function storeTupleProposeOwner(source: ProposeOwner) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.newOwner);
    return builder.build();
}

export function dictValueParserProposeOwner(): DictionaryValue<ProposeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProposeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadProposeOwner(src.loadRef().beginParse());
        }
    }
}

export type AcceptOwner = {
    $$type: 'AcceptOwner';
}

export function storeAcceptOwner(src: AcceptOwner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953982984, 32);
    };
}

export function loadAcceptOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953982984) { throw Error('Invalid prefix'); }
    return { $$type: 'AcceptOwner' as const };
}

export function loadTupleAcceptOwner(source: TupleReader) {
    return { $$type: 'AcceptOwner' as const };
}

export function loadGetterTupleAcceptOwner(source: TupleReader) {
    return { $$type: 'AcceptOwner' as const };
}

export function storeTupleAcceptOwner(source: AcceptOwner) {
    const builder = new TupleBuilder();
    return builder.build();
}

export function dictValueParserAcceptOwner(): DictionaryValue<AcceptOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAcceptOwner(src)).endCell());
        },
        parse: (src) => {
            return loadAcceptOwner(src.loadRef().beginParse());
        }
    }
}

export type SetTreasury = {
    $$type: 'SetTreasury';
    to: Address;
}

export function storeSetTreasury(src: SetTreasury) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983003, 32);
        b_0.storeAddress(src.to);
    };
}

export function loadSetTreasury(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983003) { throw Error('Invalid prefix'); }
    const _to = sc_0.loadAddress();
    return { $$type: 'SetTreasury' as const, to: _to };
}

export function loadTupleSetTreasury(source: TupleReader) {
    const _to = source.readAddress();
    return { $$type: 'SetTreasury' as const, to: _to };
}

export function loadGetterTupleSetTreasury(source: TupleReader) {
    const _to = source.readAddress();
    return { $$type: 'SetTreasury' as const, to: _to };
}

export function storeTupleSetTreasury(source: SetTreasury) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.to);
    return builder.build();
}

export function dictValueParserSetTreasury(): DictionaryValue<SetTreasury> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetTreasury(src)).endCell());
        },
        parse: (src) => {
            return loadSetTreasury(src.loadRef().beginParse());
        }
    }
}

export type LoanIssued = {
    $$type: 'LoanIssued';
    nft: Address;
    borrower: Address;
    principal: bigint;
    repay: bigint;
    dueAt: bigint;
}

export function storeLoanIssued(src: LoanIssued) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983008, 32);
        b_0.storeAddress(src.nft);
        b_0.storeAddress(src.borrower);
        b_0.storeCoins(src.principal);
        b_0.storeCoins(src.repay);
        b_0.storeUint(src.dueAt, 32);
    };
}

export function loadLoanIssued(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983008) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _borrower = sc_0.loadAddress();
    const _principal = sc_0.loadCoins();
    const _repay = sc_0.loadCoins();
    const _dueAt = sc_0.loadUintBig(32);
    return { $$type: 'LoanIssued' as const, nft: _nft, borrower: _borrower, principal: _principal, repay: _repay, dueAt: _dueAt };
}

export function loadTupleLoanIssued(source: TupleReader) {
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _principal = source.readBigNumber();
    const _repay = source.readBigNumber();
    const _dueAt = source.readBigNumber();
    return { $$type: 'LoanIssued' as const, nft: _nft, borrower: _borrower, principal: _principal, repay: _repay, dueAt: _dueAt };
}

export function loadGetterTupleLoanIssued(source: TupleReader) {
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _principal = source.readBigNumber();
    const _repay = source.readBigNumber();
    const _dueAt = source.readBigNumber();
    return { $$type: 'LoanIssued' as const, nft: _nft, borrower: _borrower, principal: _principal, repay: _repay, dueAt: _dueAt };
}

export function storeTupleLoanIssued(source: LoanIssued) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeAddress(source.borrower);
    builder.writeNumber(source.principal);
    builder.writeNumber(source.repay);
    builder.writeNumber(source.dueAt);
    return builder.build();
}

export function dictValueParserLoanIssued(): DictionaryValue<LoanIssued> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLoanIssued(src)).endCell());
        },
        parse: (src) => {
            return loadLoanIssued(src.loadRef().beginParse());
        }
    }
}

export type LoanRepaid = {
    $$type: 'LoanRepaid';
    nft: Address;
    borrower: Address;
    repay: bigint;
}

export function storeLoanRepaid(src: LoanRepaid) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983009, 32);
        b_0.storeAddress(src.nft);
        b_0.storeAddress(src.borrower);
        b_0.storeCoins(src.repay);
    };
}

export function loadLoanRepaid(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983009) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _borrower = sc_0.loadAddress();
    const _repay = sc_0.loadCoins();
    return { $$type: 'LoanRepaid' as const, nft: _nft, borrower: _borrower, repay: _repay };
}

export function loadTupleLoanRepaid(source: TupleReader) {
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _repay = source.readBigNumber();
    return { $$type: 'LoanRepaid' as const, nft: _nft, borrower: _borrower, repay: _repay };
}

export function loadGetterTupleLoanRepaid(source: TupleReader) {
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _repay = source.readBigNumber();
    return { $$type: 'LoanRepaid' as const, nft: _nft, borrower: _borrower, repay: _repay };
}

export function storeTupleLoanRepaid(source: LoanRepaid) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeAddress(source.borrower);
    builder.writeNumber(source.repay);
    return builder.build();
}

export function dictValueParserLoanRepaid(): DictionaryValue<LoanRepaid> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLoanRepaid(src)).endCell());
        },
        parse: (src) => {
            return loadLoanRepaid(src.loadRef().beginParse());
        }
    }
}

export type LoanLiquidated = {
    $$type: 'LoanLiquidated';
    nft: Address;
    to: Address;
}

export function storeLoanLiquidated(src: LoanLiquidated) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983010, 32);
        b_0.storeAddress(src.nft);
        b_0.storeAddress(src.to);
    };
}

export function loadLoanLiquidated(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983010) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _to = sc_0.loadAddress();
    return { $$type: 'LoanLiquidated' as const, nft: _nft, to: _to };
}

export function loadTupleLoanLiquidated(source: TupleReader) {
    const _nft = source.readAddress();
    const _to = source.readAddress();
    return { $$type: 'LoanLiquidated' as const, nft: _nft, to: _to };
}

export function loadGetterTupleLoanLiquidated(source: TupleReader) {
    const _nft = source.readAddress();
    const _to = source.readAddress();
    return { $$type: 'LoanLiquidated' as const, nft: _nft, to: _to };
}

export function storeTupleLoanLiquidated(source: LoanLiquidated) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeAddress(source.to);
    return builder.build();
}

export function dictValueParserLoanLiquidated(): DictionaryValue<LoanLiquidated> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLoanLiquidated(src)).endCell());
        },
        parse: (src) => {
            return loadLoanLiquidated(src.loadRef().beginParse());
        }
    }
}

export type GiftLoanPool$Data = {
    $$type: 'GiftLoanPool$Data';
    owner: Address;
    treasury: Address;
    signerKey: bigint;
    maxLoan: bigint;
    pendingOwner: Address | null;
}

export function storeGiftLoanPool$Data(src: GiftLoanPool$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.treasury);
        b_0.storeUint(src.signerKey, 256);
        b_0.storeCoins(src.maxLoan);
        const b_1 = new Builder();
        b_1.storeAddress(src.pendingOwner);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGiftLoanPool$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _treasury = sc_0.loadAddress();
    const _signerKey = sc_0.loadUintBig(256);
    const _maxLoan = sc_0.loadCoins();
    const sc_1 = sc_0.loadRef().beginParse();
    const _pendingOwner = sc_1.loadMaybeAddress();
    return { $$type: 'GiftLoanPool$Data' as const, owner: _owner, treasury: _treasury, signerKey: _signerKey, maxLoan: _maxLoan, pendingOwner: _pendingOwner };
}

export function loadTupleGiftLoanPool$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _treasury = source.readAddress();
    const _signerKey = source.readBigNumber();
    const _maxLoan = source.readBigNumber();
    const _pendingOwner = source.readAddressOpt();
    return { $$type: 'GiftLoanPool$Data' as const, owner: _owner, treasury: _treasury, signerKey: _signerKey, maxLoan: _maxLoan, pendingOwner: _pendingOwner };
}

export function loadGetterTupleGiftLoanPool$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _treasury = source.readAddress();
    const _signerKey = source.readBigNumber();
    const _maxLoan = source.readBigNumber();
    const _pendingOwner = source.readAddressOpt();
    return { $$type: 'GiftLoanPool$Data' as const, owner: _owner, treasury: _treasury, signerKey: _signerKey, maxLoan: _maxLoan, pendingOwner: _pendingOwner };
}

export function storeTupleGiftLoanPool$Data(source: GiftLoanPool$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.treasury);
    builder.writeNumber(source.signerKey);
    builder.writeNumber(source.maxLoan);
    builder.writeAddress(source.pendingOwner);
    return builder.build();
}

export function dictValueParserGiftLoanPool$Data(): DictionaryValue<GiftLoanPool$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGiftLoanPool$Data(src)).endCell());
        },
        parse: (src) => {
            return loadGiftLoanPool$Data(src.loadRef().beginParse());
        }
    }
}

export type LoanEscrow$Data = {
    $$type: 'LoanEscrow$Data';
    pool: Address;
    nft: Address;
    status: bigint;
    borrower: Address | null;
    treasury: Address | null;
    principal: bigint;
    repay: bigint;
    dueAt: bigint;
    reqAt: bigint;
}

export function storeLoanEscrow$Data(src: LoanEscrow$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.pool);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.status, 8);
        b_0.storeAddress(src.borrower);
        const b_1 = new Builder();
        b_1.storeAddress(src.treasury);
        b_1.storeCoins(src.principal);
        b_1.storeCoins(src.repay);
        b_1.storeUint(src.dueAt, 32);
        b_1.storeUint(src.reqAt, 32);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLoanEscrow$Data(slice: Slice) {
    const sc_0 = slice;
    const _pool = sc_0.loadAddress();
    const _nft = sc_0.loadAddress();
    const _status = sc_0.loadUintBig(8);
    const _borrower = sc_0.loadMaybeAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _treasury = sc_1.loadMaybeAddress();
    const _principal = sc_1.loadCoins();
    const _repay = sc_1.loadCoins();
    const _dueAt = sc_1.loadUintBig(32);
    const _reqAt = sc_1.loadUintBig(32);
    return { $$type: 'LoanEscrow$Data' as const, pool: _pool, nft: _nft, status: _status, borrower: _borrower, treasury: _treasury, principal: _principal, repay: _repay, dueAt: _dueAt, reqAt: _reqAt };
}

export function loadTupleLoanEscrow$Data(source: TupleReader) {
    const _pool = source.readAddress();
    const _nft = source.readAddress();
    const _status = source.readBigNumber();
    const _borrower = source.readAddressOpt();
    const _treasury = source.readAddressOpt();
    const _principal = source.readBigNumber();
    const _repay = source.readBigNumber();
    const _dueAt = source.readBigNumber();
    const _reqAt = source.readBigNumber();
    return { $$type: 'LoanEscrow$Data' as const, pool: _pool, nft: _nft, status: _status, borrower: _borrower, treasury: _treasury, principal: _principal, repay: _repay, dueAt: _dueAt, reqAt: _reqAt };
}

export function loadGetterTupleLoanEscrow$Data(source: TupleReader) {
    const _pool = source.readAddress();
    const _nft = source.readAddress();
    const _status = source.readBigNumber();
    const _borrower = source.readAddressOpt();
    const _treasury = source.readAddressOpt();
    const _principal = source.readBigNumber();
    const _repay = source.readBigNumber();
    const _dueAt = source.readBigNumber();
    const _reqAt = source.readBigNumber();
    return { $$type: 'LoanEscrow$Data' as const, pool: _pool, nft: _nft, status: _status, borrower: _borrower, treasury: _treasury, principal: _principal, repay: _repay, dueAt: _dueAt, reqAt: _reqAt };
}

export function storeTupleLoanEscrow$Data(source: LoanEscrow$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.pool);
    builder.writeAddress(source.nft);
    builder.writeNumber(source.status);
    builder.writeAddress(source.borrower);
    builder.writeAddress(source.treasury);
    builder.writeNumber(source.principal);
    builder.writeNumber(source.repay);
    builder.writeNumber(source.dueAt);
    builder.writeNumber(source.reqAt);
    return builder.build();
}

export function dictValueParserLoanEscrow$Data(): DictionaryValue<LoanEscrow$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLoanEscrow$Data(src)).endCell());
        },
        parse: (src) => {
            return loadLoanEscrow$Data(src.loadRef().beginParse());
        }
    }
}

 type GiftLoanPool_init_args = {
    $$type: 'GiftLoanPool_init_args';
    owner: Address;
    treasury: Address;
    signerKey: bigint;
    maxLoan: bigint;
}

function initGiftLoanPool_init_args(src: GiftLoanPool_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.treasury);
        b_0.storeInt(src.signerKey, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.maxLoan, 257);
        b_0.storeRef(b_1.endCell());
    };
}

async function GiftLoanPool_init(owner: Address, treasury: Address, signerKey: bigint, maxLoan: bigint) {
    const __code = Cell.fromHex('b5ee9c72410251010013e1000228ff008e88f4a413f4bcf2c80bed5320e303ed43d90113020271020d02016a0305018fb0c47b513434800063873e903e9034fffe8035007435cb00645b64fe9000788c454510cc1b056386be903e9020404075c035007420404075c00c0510cc013455409b78b6cf1b1460040008f8276f1002012006080193af7a76a268690000c70e7d207d2069fffd006a00e86b9600c8b6c9fd2000f1188a8a2198360ac70d7d207d20408080eb806a00e8408080eb80180a21980268aa8136f12a826d9e3628c0070164f82801db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d02d020120090b018ea935ed44d0d200018e1cfa40fa40d3fffa00d401d0d72c01916d93fa4001e231151443306c158e1afa40fa40810101d700d401d0810101d7003014433004d155026de2db3c6c510a000223018eab23ed44d0d200018e1cfa40fa40d3fffa00d401d0d72c01916d93fa4001e231151443306c158e1afa40fa40810101d700d401d0810101d7003014433004d155026de2db3c6c510c0002200201480e10018fb6035da89a1a400031c39f481f481a7fff401a803a1ae580322db27f48003c4622a288660d82b1c35f481f481020203ae01a803a1020203ae006028866009a2aa04dbc5b678d8a300f0002240201201112018fb2fcbb513434800063873e903e9034fffe8035007435cb00645b64fe9000788c454510cc1b056386be903e9020404075c035007420404075c00c0510cc013455409b78b6cf1b146034018fb0a83b513434800063873e903e9034fffe8035007435cb00645b64fe9000788c454510cc1b056386be903e9020404075c035007420404075c00c0510cc013455409b78b6cf1b14603c02ee3001d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e1cfa40fa40d3fffa00d401d0d72c01916d93fa4001e231151443306c158e1afa40fa40810101d700d401d0810101d7003014433004d155026de206925f06e07025d74920c21f953105d31f06de218210b0123410bae30221141502d85b04fa40308200f2b4f8416f24135f03821008f0d180bef2f4f82801db3c821004c4b4007170146d50245f41f90001f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f9040003c8cf8580ca0012cccccf884008cbff01fa028069cf40cf8634f400c901fb0040342d1e04fc8210b0123411bae302218210b0123404ba8edf5b04fa00308200e240f84225c705f2f48200af8cf8276f1022a182101dcd6500bef2f45230716d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb004034e0218210b0123405bae30221161e1f2003f85b04fa40fa40fa00d30fd31fd430f82826db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0812becf84222c705f2f47070547ba92f5611547dcb547da8ed41ed43ed44ed45ed47925b70ed67ed65ed64ed63ed61800b7fed118aed41edf101f2ff2d171a02fe104b103a49cd25db3cc8f828cf162acf1629cf1628fa025270cb0f52d0cb1fc9f90021c2009328c2009170e2935383bb9170e295f823500ebb923d70e28e15f8276f10f8416f24135f03a12882101dcd6500a0be9170e2970bd0541c03f910933b3b70e28e163b3b5238a881270fa0812710a9045230a00a7f0a50889139e21819005620c00193308032e020c0079430810096e020c00e94308101b8e020c01594308103c0e0c01f938107c6e070000a4b1947770a01e68e4d155f05708042706f00c801308210b012341301cb1fc910246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00e30dc87f01ca0055405045ce12cecbff01fa02c858206e9430cf84809201cee2cdc9ed541b01fef8232382015180a8a0542650546580c855408210b01234205006cb1f14ce12ce01fa0201fa02cb1fc9c88258c000000000000000000000000101cb67ccc970fb00820afaf0807170f8230582015180a815a05427502cc855308210b01234125005cb1f5003fa0201fa02cb1fcec94430102610246d50436d03c8cf8580ca001c01c889cf16ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00017170136d6d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb001d0001100044c87f01ca0055405045ce12cecbff01fa02c858206e9430cf84809201cee2cdc9ed54006c5f0303fa00308200e240f84224c705f2f4440302c87f01ca0055405045ce12cecbff01fa02c858206e9430cf84809201cee2cdc9ed5404ce8210b0123406ba8e3710235f0303d3ff308200e240f84224c705f2f44034c87f01ca0055405045ce12cecbff01fa02c858206e9430cf84809201cee2cdc9ed54e0218210b012341bbae302218210b0123407bae302218210b0123408bae302218210b0123419ba21222324006c5b3203fa40308200e240f84224c705f2f4441302c87f01ca0055405045ce12cecbff01fa02c858206e9430cf84809201cee2cdc9ed54006c5b3503fa40308200e240f84224c705f2f4443012c87f01ca0055405045ce12cecbff01fa02c858206e9430cf84809201cee2cdc9ed5400865b333381468f246eb3f2f48128a7f84205206ef2d08015c70514f2f4f84255206dc87f01ca0055405045ce12cecbff01fa02c858206e9430cf84809201cee2cdc9ed54043ce302218210b0123414bae302218210b0123416bae302218210b0123417ba2526292b04fc5b04fa403082009d82f8416f24135f0382100ee6b280bef2f4f82801db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d07080407f26c8018210b012341a58cb1fcec910246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb08a8ae22d27472804fe5b04fa40fa40308200e240f84226c705f2f4f82858db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0821008f0d180717f04c8018210b012341558cb1fcec91034413010246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb08a8ae22d27472800065bcf810054f400c901fb004034c87f01ca0055405045ce12cecbff01fa02c858206e9430cf84809201cee2cdc9ed5401fe5b04fa40fa40308200e240f84226c705f2f4821008f0d180717f706d218b08270405085520c8555082105fcc3d145007cb1f15cb3f13ce01206e9430cf84809201cee2f40001fa02cec9413010246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f4002a0050c901fb004034c87f01ca0055405045ce12cecbff01fa02c858206e9430cf84809201cee2cdc9ed54016ce30236c00005c12115b08e244034c87f01ca0055405045ce12cecbff01fa02c858206e9430cf84809201cee2cdc9ed54e05f05f2c0822c02fe5b04fa40fa40fa40308200e240f84227c705f2f4f8285003db3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0821008f0d18071037f05c8598210b01234185003cb1fcecec944301210246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e012d50011688c87001ca005a02cecec92e0228ff008e88f4a413f4bcf2c80bed5320e303ed43d92f3d0202713035020162313301a3b3ee7b5134348000638cbe903e9034c1f5cb00645b64fe9000788075007435cb00645b64fe900078807e803e8034c7f4c7cc041644160415c4159b0667fe903e901640b4405c1b5b551c888838b6cf1b24603200022701a3b3a7fb5134348000638cbe903e9034c1f5cb00645b64fe9000788075007435cb00645b64fe900078807e803e8034c7f4c7cc041644160415c4159b0667fe903e901640b4405c1b5b551c888838b6cf1b246034000221020120363801a3b8d0aed44d0d200018e32fa40fa40d307d72c01916d93fa4001e201d401d0d72c01916d93fa4001e201fa00fa00d31fd31f3010591058105710566c199ffa40fa405902d101706d6d54722220e2db3c6c91837000226020120393b01a3b50f7da89a1a400031c65f481f481a60fae580322db27f48003c403a803a1ae580322db27f48003c403f401f401a63fa63e6020b220b020ae20acd8333ff481f480b205a202e0dadaa8e44441c5b678d92303a00022501a3b477fda89a1a400031c65f481f481a60fae580322db27f48003c403a803a1ae580322db27f48003c403f401f401a63fa63e6020b220b020ae20acd8333ff481f480b205a202e0dadaa8e44441c5b678d92303c00022202f83001d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e32fa40fa40d307d72c01916d93fa4001e201d401d0d72c01916d93fa4001e201fa00fa00d31fd31f3010591058105710566c199ffa40fa405902d101706d6d54722220e20ae3027029d74920c21f953109d31f0ade21821005138d91ba3e3f01c23824c0018e9e3402206ef2d080706d53112810ac0b104a1039106845558042db3c085551de10685515c87f01ca0055805089ce16ce14cb0758206e9430cf84809201cee2c858206e9430cf84809201cee258fa0258fa0212cb1f12cb1fcdc9ed544e04508f9d5b08d33ffa40f8427070530088535ec705932dc0009170e29136e30d03e0218210b0123412ba40414244000000ec2f514f514f514f514f514f514f04561704561904561104561104561004ed41ed43ed44ed45ed47925b70ed67ed65ed64ed63ed6180107fed118e213001d2000193d430d0defa00d30fd31fd43010df10ce10bd10ac109b108a10797fed41edf101f2ff08111008109f108e109d5e38108a503305441402b68e9b10345f04109b108a1079106810571046103502708042db3c085551e30d10685515c87f01ca0055805089ce16ce14cb0758206e9430cf84809201cee2c858206e9430cf84809201cee258fa0258fa0212cb1f12cb1fcdc9ed544e4300e6333538383b71f82322821007270e00237f2d0510471038102d11111cc855508210b01234115007cb1f15ce13ce01fa02cb0fcb1fccc92a044913508810246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0004fe8e5e5f0604fa00fa00d31ffa4030813c65f84228c705f2f481385e05c00115f2f410571046724316c87f01ca0055805089ce16ce14cb0758206e9430cf84809201cee2c858206e9430cf84809201cee258fa0258fa0212cb1f12cb1fcdc9ed54e0218210b0123413bae302218210b0123402bae302218210b012341abae30245464a4b01ce5b38813c65f84228c705f2f481385e05c00115f2f402206ef2d080706d53112810ac0b104a1039106845558042db3cc87f01ca0055805089ce16ce14cb0758206e9430cf84809201cee2c858206e9430cf84809201cee258fa0258fa0212cb1f12cb1fcdc9ed544e02fc5b388116b705c00215f2f402206ef2d080814f1ff84222c705f2f4816945f8232882015180a0bbf2f4816960f8416f24135f0325821008f0d180a0bef2f4547232a123206ef2d080706d8209312d0022fb0252a57170136d6d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae2f400c9014748001a58cf8680cf8480f400f400cf8101fcfb0022c2008e3a027170136d6d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00926c21e2547625c855208210b01234215004cb1f12cece01fa02c9c88258c000000000000000000000000101cb67ccc970fb0053002810ac0b103a10494901841068051034598306db3cc87f01ca0055805089ce16ce14cb0758206e9430cf84809201cee2c858206e9430cf84809201cee258fa0258fa0212cb1f12cb1fcdc9ed544e02dc5b3407fa4030813c65f84228c705f2f48116b705c00215f2f4814868f8232482015180a0bcf2f4706d8209312d0022fb025365c8598210b01234225003cb1fcecec9c88258c000000000000000000000000101cb67ccc970fb0053112810ac0b104a10391068105746668306db3c4e4c04d2218210b0123415ba8f4c5b08fa4030813c65f84229c705f2f48200857726c000917f9f26c00198f8232b810e10a0bc9170e2e2f2f425c001953470356d04de70530710ac0b108a10791068105710460555208040db3ce0218210b0123418bae3023ac00009c12119b04e4c4d4f0070c87f01ca0055805089ce16ce14cb0758206e9430cf84809201cee2c858206e9430cf84809201cee258fa0258fa0212cb1f12cb1fcdc9ed5401ce5b08fa40fa4030813c65f8422ac705f2f4814e265328c705b3f2f4702010ac109b108a10791068105710468040db3cc87f01ca0055805089ce16ce14cb0758206e9430cf84809201cee2c858206e9430cf84809201cee258fa0258fa0212cb1f12cb1fcdc9ed544e00ce6d708b0826105604075520c8555082105fcc3d145007cb1f15cb3f13ce01206e9430cf84809201cee2f40001fa02cec9125a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0000888e3c10685515c87f01ca0055805089ce16ce14cb0758206e9430cf84809201cee2c858206e9430cf84809201cee258fa0258fa0212cb1f12cb1fcdc9ed54e05f09f2c082007e6eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb004034c87f01ca0055405045ce12cecbff01fa02c858206e9430cf84809201cee2cdc9ed54111c3411');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initGiftLoanPool_init_args({ $$type: 'GiftLoanPool_init_args', owner, treasury, signerKey, maxLoan })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const GiftLoanPool_errors = {
    2: { message: "Stack underflow" },
    3: { message: "Stack overflow" },
    4: { message: "Integer overflow" },
    5: { message: "Integer out of expected range" },
    6: { message: "Invalid opcode" },
    7: { message: "Type check error" },
    8: { message: "Cell overflow" },
    9: { message: "Cell underflow" },
    10: { message: "Dictionary error" },
    11: { message: "'Unknown' error" },
    12: { message: "Fatal error" },
    13: { message: "Out of gas error" },
    14: { message: "Virtualization error" },
    32: { message: "Action list is invalid" },
    33: { message: "Action list is too long" },
    34: { message: "Action is invalid or not supported" },
    35: { message: "Invalid source address in outbound message" },
    36: { message: "Invalid destination address in outbound message" },
    37: { message: "Not enough Toncoin" },
    38: { message: "Not enough extra currencies" },
    39: { message: "Outbound message does not fit into a cell after rewriting" },
    40: { message: "Cannot process a message" },
    41: { message: "Library reference is null" },
    42: { message: "Library change action error" },
    43: { message: "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree" },
    50: { message: "Account state size exceeded limits" },
    128: { message: "Null reference exception" },
    129: { message: "Invalid serialization prefix" },
    130: { message: "Invalid incoming message" },
    131: { message: "Constraints error" },
    132: { message: "Access denied" },
    133: { message: "Contract stopped" },
    134: { message: "Invalid argument" },
    135: { message: "Code of a contract was not found" },
    136: { message: "Invalid standard address" },
    138: { message: "Not a basechain address" },
    5815: { message: "No loan" },
    10407: { message: "Not pending owner" },
    11244: { message: "Not escrow" },
    14430: { message: "Bad state" },
    15461: { message: "Pool only" },
    18063: { message: "No proposal" },
    18536: { message: "Not due yet" },
    20006: { message: "Use Rescue" },
    20255: { message: "Not borrower" },
    26949: { message: "Too late" },
    26976: { message: "Send repay + 0.15" },
    34167: { message: "Loan active" },
    40322: { message: "Send at least 0.25" },
    44940: { message: "Reserve" },
    57920: { message: "Owner only" },
    62132: { message: "Send at least 0.15" },
} as const

export const GiftLoanPool_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
    "No loan": 5815,
    "Not pending owner": 10407,
    "Not escrow": 11244,
    "Bad state": 14430,
    "Pool only": 15461,
    "No proposal": 18063,
    "Not due yet": 18536,
    "Use Rescue": 20006,
    "Not borrower": 20255,
    "Too late": 26949,
    "Send repay + 0.15": 26976,
    "Loan active": 34167,
    "Send at least 0.25": 40322,
    "Reserve": 44940,
    "Owner only": 57920,
    "Send at least 0.15": 62132,
} as const

const GiftLoanPool_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SignedBundle","header":null,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"signedData","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"OwnershipAssigned","header":85167505,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prevOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"NftTransfer","header":1607220500,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"DeployEscrow","header":2953982992,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LoanRequest","header":2953982993,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"borrower","type":{"kind":"simple","type":"address","optional":false}},{"name":"principal","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"term","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"exp","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"sig","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"LoanApproved","header":2953982994,"fields":[{"name":"repay","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"principal","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"dueAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"treasury","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LoanRejected","header":2953982995,"fields":[]},
    {"name":"RescueNft","header":2953982996,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Rescue","header":2953982997,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RescueAnyNft","header":2953982998,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RescueForeignNft","header":2953982999,"fields":[{"name":"escrowNft","type":{"kind":"simple","type":"address","optional":false}},{"name":"foreign","type":{"kind":"simple","type":"address","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RescueForeign","header":2953983000,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Repay","header":2953982978,"fields":[]},
    {"name":"LiquidateNft","header":2953983001,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LiquidateByPool","header":2953983002,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Withdraw","header":2953982980,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"SetMaxLoan","header":2953982981,"fields":[{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"SetSigner","header":2953982982,"fields":[{"name":"key","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"ProposeOwner","header":2953982983,"fields":[{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"AcceptOwner","header":2953982984,"fields":[]},
    {"name":"SetTreasury","header":2953983003,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LoanIssued","header":2953983008,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"borrower","type":{"kind":"simple","type":"address","optional":false}},{"name":"principal","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"repay","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"dueAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LoanRepaid","header":2953983009,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"borrower","type":{"kind":"simple","type":"address","optional":false}},{"name":"repay","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"LoanLiquidated","header":2953983010,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GiftLoanPool$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"treasury","type":{"kind":"simple","type":"address","optional":false}},{"name":"signerKey","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"maxLoan","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"pendingOwner","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"LoanEscrow$Data","header":null,"fields":[{"name":"pool","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"status","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"borrower","type":{"kind":"simple","type":"address","optional":true}},{"name":"treasury","type":{"kind":"simple","type":"address","optional":true}},{"name":"principal","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"repay","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"dueAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"reqAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
]

const GiftLoanPool_opcodes = {
    "OwnershipAssigned": 85167505,
    "NftTransfer": 1607220500,
    "DeployEscrow": 2953982992,
    "LoanRequest": 2953982993,
    "LoanApproved": 2953982994,
    "LoanRejected": 2953982995,
    "RescueNft": 2953982996,
    "Rescue": 2953982997,
    "RescueAnyNft": 2953982998,
    "RescueForeignNft": 2953982999,
    "RescueForeign": 2953983000,
    "Repay": 2953982978,
    "LiquidateNft": 2953983001,
    "LiquidateByPool": 2953983002,
    "Withdraw": 2953982980,
    "SetMaxLoan": 2953982981,
    "SetSigner": 2953982982,
    "ProposeOwner": 2953982983,
    "AcceptOwner": 2953982984,
    "SetTreasury": 2953983003,
    "LoanIssued": 2953983008,
    "LoanRepaid": 2953983009,
    "LoanLiquidated": 2953983010,
}

const GiftLoanPool_getters: ABIGetter[] = [
    {"name":"escrowAddress","methodId":87796,"arguments":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"loanLimit","methodId":109554,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"pool","methodId":82705,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"ownerAddress","methodId":102426,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"pendingOwnerAddress","methodId":89891,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":true}},
    {"name":"signerPublicKey","methodId":111264,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"treasuryAddress","methodId":88373,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const GiftLoanPool_getterMapping: { [key: string]: string } = {
    'escrowAddress': 'getEscrowAddress',
    'loanLimit': 'getLoanLimit',
    'pool': 'getPool',
    'ownerAddress': 'getOwnerAddress',
    'pendingOwnerAddress': 'getPendingOwnerAddress',
    'signerPublicKey': 'getSignerPublicKey',
    'treasuryAddress': 'getTreasuryAddress',
}

const GiftLoanPool_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DeployEscrow"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LoanRequest"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetMaxLoan"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetSigner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetTreasury"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ProposeOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AcceptOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LiquidateNft"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RescueNft"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RescueAnyNft"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RescueForeignNft"}},
]

export const MIN_RESERVE = 500000000n;
export const GAS = 150000000n;
export const DEPLOY_MIN = 150000000n;
export const ESCROW_FUND = 80000000n;
export const ESCROW_KEEP = 20000000n;
export const REPAY_GRACE = 86400n;
export const REQUEST_VALUE = 120000000n;
export const APPROVE_VALUE = 50000000n;
export const LIQUIDATE_MIN = 250000000n;
export const STUCK_AFTER = 3600n;

export class GiftLoanPool implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = GiftLoanPool_errors_backward;
    public static readonly opcodes = GiftLoanPool_opcodes;
    
    static async init(owner: Address, treasury: Address, signerKey: bigint, maxLoan: bigint) {
        return await GiftLoanPool_init(owner, treasury, signerKey, maxLoan);
    }
    
    static async fromInit(owner: Address, treasury: Address, signerKey: bigint, maxLoan: bigint) {
        const __gen_init = await GiftLoanPool_init(owner, treasury, signerKey, maxLoan);
        const address = contractAddress(0, __gen_init);
        return new GiftLoanPool(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new GiftLoanPool(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  GiftLoanPool_types,
        getters: GiftLoanPool_getters,
        receivers: GiftLoanPool_receivers,
        errors: GiftLoanPool_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | DeployEscrow | LoanRequest | Withdraw | SetMaxLoan | SetSigner | SetTreasury | ProposeOwner | AcceptOwner | LiquidateNft | RescueNft | RescueAnyNft | RescueForeignNft) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployEscrow') {
            body = beginCell().store(storeDeployEscrow(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LoanRequest') {
            body = beginCell().store(storeLoanRequest(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetMaxLoan') {
            body = beginCell().store(storeSetMaxLoan(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetSigner') {
            body = beginCell().store(storeSetSigner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetTreasury') {
            body = beginCell().store(storeSetTreasury(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ProposeOwner') {
            body = beginCell().store(storeProposeOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AcceptOwner') {
            body = beginCell().store(storeAcceptOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LiquidateNft') {
            body = beginCell().store(storeLiquidateNft(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RescueNft') {
            body = beginCell().store(storeRescueNft(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RescueAnyNft') {
            body = beginCell().store(storeRescueAnyNft(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RescueForeignNft') {
            body = beginCell().store(storeRescueForeignNft(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getEscrowAddress(provider: ContractProvider, nft: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(nft);
        const source = (await provider.get('escrowAddress', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
    async getLoanLimit(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('loanLimit', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getPool(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('pool', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getOwnerAddress(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('ownerAddress', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
    async getPendingOwnerAddress(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('pendingOwnerAddress', builder.build())).stack;
        const result = source.readAddressOpt();
        return result;
    }
    
    async getSignerPublicKey(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('signerPublicKey', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getTreasuryAddress(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('treasuryAddress', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
}