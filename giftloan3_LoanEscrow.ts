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

export type Excesses = {
    $$type: 'Excesses';
    queryId: bigint;
}

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadExcesses(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, queryId: _queryId };
}

export function loadTupleExcesses(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Excesses' as const, queryId: _queryId };
}

export function loadGetterTupleExcesses(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Excesses' as const, queryId: _queryId };
}

export function storeTupleExcesses(source: Excesses) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
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

export type LoanRequest = {
    $$type: 'LoanRequest';
    nft: Address;
    borrower: Address;
    principal: bigint;
    valuation: bigint;
    valuationExp: bigint;
    term: bigint;
    exp: bigint;
    operationId: bigint;
    rateBps: bigint;
    ratePerDayBps: bigint;
    sig: Cell;
    sig2: Cell;
    sig3: Cell;
}

export function storeLoanRequest(src: LoanRequest) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953982993, 32);
        b_0.storeAddress(src.nft);
        b_0.storeAddress(src.borrower);
        b_0.storeCoins(src.principal);
        b_0.storeCoins(src.valuation);
        b_0.storeUint(src.valuationExp, 32);
        b_0.storeUint(src.term, 16);
        b_0.storeUint(src.exp, 32);
        b_0.storeUint(src.operationId, 32);
        b_0.storeUint(src.rateBps, 32);
        b_0.storeUint(src.ratePerDayBps, 32);
        b_0.storeRef(src.sig);
        b_0.storeRef(src.sig2);
        b_0.storeRef(src.sig3);
    };
}

export function loadLoanRequest(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953982993) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _borrower = sc_0.loadAddress();
    const _principal = sc_0.loadCoins();
    const _valuation = sc_0.loadCoins();
    const _valuationExp = sc_0.loadUintBig(32);
    const _term = sc_0.loadUintBig(16);
    const _exp = sc_0.loadUintBig(32);
    const _operationId = sc_0.loadUintBig(32);
    const _rateBps = sc_0.loadUintBig(32);
    const _ratePerDayBps = sc_0.loadUintBig(32);
    const _sig = sc_0.loadRef();
    const _sig2 = sc_0.loadRef();
    const _sig3 = sc_0.loadRef();
    return { $$type: 'LoanRequest' as const, nft: _nft, borrower: _borrower, principal: _principal, valuation: _valuation, valuationExp: _valuationExp, term: _term, exp: _exp, operationId: _operationId, rateBps: _rateBps, ratePerDayBps: _ratePerDayBps, sig: _sig, sig2: _sig2, sig3: _sig3 };
}

export function loadTupleLoanRequest(source: TupleReader) {
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _principal = source.readBigNumber();
    const _valuation = source.readBigNumber();
    const _valuationExp = source.readBigNumber();
    const _term = source.readBigNumber();
    const _exp = source.readBigNumber();
    const _operationId = source.readBigNumber();
    const _rateBps = source.readBigNumber();
    const _ratePerDayBps = source.readBigNumber();
    const _sig = source.readCell();
    const _sig2 = source.readCell();
    const _sig3 = source.readCell();
    return { $$type: 'LoanRequest' as const, nft: _nft, borrower: _borrower, principal: _principal, valuation: _valuation, valuationExp: _valuationExp, term: _term, exp: _exp, operationId: _operationId, rateBps: _rateBps, ratePerDayBps: _ratePerDayBps, sig: _sig, sig2: _sig2, sig3: _sig3 };
}

export function loadGetterTupleLoanRequest(source: TupleReader) {
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _principal = source.readBigNumber();
    const _valuation = source.readBigNumber();
    const _valuationExp = source.readBigNumber();
    const _term = source.readBigNumber();
    const _exp = source.readBigNumber();
    const _operationId = source.readBigNumber();
    const _rateBps = source.readBigNumber();
    const _ratePerDayBps = source.readBigNumber();
    const _sig = source.readCell();
    const _sig2 = source.readCell();
    const _sig3 = source.readCell();
    return { $$type: 'LoanRequest' as const, nft: _nft, borrower: _borrower, principal: _principal, valuation: _valuation, valuationExp: _valuationExp, term: _term, exp: _exp, operationId: _operationId, rateBps: _rateBps, ratePerDayBps: _ratePerDayBps, sig: _sig, sig2: _sig2, sig3: _sig3 };
}

export function storeTupleLoanRequest(source: LoanRequest) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeAddress(source.borrower);
    builder.writeNumber(source.principal);
    builder.writeNumber(source.valuation);
    builder.writeNumber(source.valuationExp);
    builder.writeNumber(source.term);
    builder.writeNumber(source.exp);
    builder.writeNumber(source.operationId);
    builder.writeNumber(source.rateBps);
    builder.writeNumber(source.ratePerDayBps);
    builder.writeCell(source.sig);
    builder.writeCell(source.sig2);
    builder.writeCell(source.sig3);
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

export type LoanPrepare = {
    $$type: 'LoanPrepare';
    nft: Address;
    repay: bigint;
    principal: bigint;
    dueAt: bigint;
    ratePerDayBps: bigint;
    operationId: bigint;
}

export function storeLoanPrepare(src: LoanPrepare) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953982994, 32);
        b_0.storeAddress(src.nft);
        b_0.storeCoins(src.repay);
        b_0.storeCoins(src.principal);
        b_0.storeUint(src.dueAt, 32);
        b_0.storeUint(src.ratePerDayBps, 32);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadLoanPrepare(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953982994) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _repay = sc_0.loadCoins();
    const _principal = sc_0.loadCoins();
    const _dueAt = sc_0.loadUintBig(32);
    const _ratePerDayBps = sc_0.loadUintBig(32);
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'LoanPrepare' as const, nft: _nft, repay: _repay, principal: _principal, dueAt: _dueAt, ratePerDayBps: _ratePerDayBps, operationId: _operationId };
}

export function loadTupleLoanPrepare(source: TupleReader) {
    const _nft = source.readAddress();
    const _repay = source.readBigNumber();
    const _principal = source.readBigNumber();
    const _dueAt = source.readBigNumber();
    const _ratePerDayBps = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanPrepare' as const, nft: _nft, repay: _repay, principal: _principal, dueAt: _dueAt, ratePerDayBps: _ratePerDayBps, operationId: _operationId };
}

export function loadGetterTupleLoanPrepare(source: TupleReader) {
    const _nft = source.readAddress();
    const _repay = source.readBigNumber();
    const _principal = source.readBigNumber();
    const _dueAt = source.readBigNumber();
    const _ratePerDayBps = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanPrepare' as const, nft: _nft, repay: _repay, principal: _principal, dueAt: _dueAt, ratePerDayBps: _ratePerDayBps, operationId: _operationId };
}

export function storeTupleLoanPrepare(source: LoanPrepare) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.repay);
    builder.writeNumber(source.principal);
    builder.writeNumber(source.dueAt);
    builder.writeNumber(source.ratePerDayBps);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserLoanPrepare(): DictionaryValue<LoanPrepare> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLoanPrepare(src)).endCell());
        },
        parse: (src) => {
            return loadLoanPrepare(src.loadRef().beginParse());
        }
    }
}

export type LoanReady = {
    $$type: 'LoanReady';
    nft: Address;
    borrower: Address;
    repay: bigint;
    principal: bigint;
    dueAt: bigint;
    ratePerDayBps: bigint;
    operationId: bigint;
}

export function storeLoanReady(src: LoanReady) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983011, 32);
        b_0.storeAddress(src.nft);
        b_0.storeAddress(src.borrower);
        b_0.storeCoins(src.repay);
        b_0.storeCoins(src.principal);
        b_0.storeUint(src.dueAt, 32);
        b_0.storeUint(src.ratePerDayBps, 32);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadLoanReady(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983011) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _borrower = sc_0.loadAddress();
    const _repay = sc_0.loadCoins();
    const _principal = sc_0.loadCoins();
    const _dueAt = sc_0.loadUintBig(32);
    const _ratePerDayBps = sc_0.loadUintBig(32);
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'LoanReady' as const, nft: _nft, borrower: _borrower, repay: _repay, principal: _principal, dueAt: _dueAt, ratePerDayBps: _ratePerDayBps, operationId: _operationId };
}

export function loadTupleLoanReady(source: TupleReader) {
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _repay = source.readBigNumber();
    const _principal = source.readBigNumber();
    const _dueAt = source.readBigNumber();
    const _ratePerDayBps = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanReady' as const, nft: _nft, borrower: _borrower, repay: _repay, principal: _principal, dueAt: _dueAt, ratePerDayBps: _ratePerDayBps, operationId: _operationId };
}

export function loadGetterTupleLoanReady(source: TupleReader) {
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _repay = source.readBigNumber();
    const _principal = source.readBigNumber();
    const _dueAt = source.readBigNumber();
    const _ratePerDayBps = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanReady' as const, nft: _nft, borrower: _borrower, repay: _repay, principal: _principal, dueAt: _dueAt, ratePerDayBps: _ratePerDayBps, operationId: _operationId };
}

export function storeTupleLoanReady(source: LoanReady) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeAddress(source.borrower);
    builder.writeNumber(source.repay);
    builder.writeNumber(source.principal);
    builder.writeNumber(source.dueAt);
    builder.writeNumber(source.ratePerDayBps);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserLoanReady(): DictionaryValue<LoanReady> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLoanReady(src)).endCell());
        },
        parse: (src) => {
            return loadLoanReady(src.loadRef().beginParse());
        }
    }
}

export type LoanFinalize = {
    $$type: 'LoanFinalize';
    nft: Address;
    operationId: bigint;
}

export function storeLoanFinalize(src: LoanFinalize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983012, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadLoanFinalize(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983012) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'LoanFinalize' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleLoanFinalize(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanFinalize' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleLoanFinalize(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanFinalize' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleLoanFinalize(source: LoanFinalize) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserLoanFinalize(): DictionaryValue<LoanFinalize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLoanFinalize(src)).endCell());
        },
        parse: (src) => {
            return loadLoanFinalize(src.loadRef().beginParse());
        }
    }
}

export type LoanRejected = {
    $$type: 'LoanRejected';
    nft: Address;
    operationId: bigint;
}

export function storeLoanRejected(src: LoanRejected) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953982995, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadLoanRejected(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953982995) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'LoanRejected' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleLoanRejected(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanRejected' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleLoanRejected(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanRejected' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleLoanRejected(source: LoanRejected) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
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

export type RejectByEscrow = {
    $$type: 'RejectByEscrow';
    nft: Address;
    operationId: bigint;
}

export function storeRejectByEscrow(src: RejectByEscrow) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983057, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadRejectByEscrow(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983057) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'RejectByEscrow' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleRejectByEscrow(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'RejectByEscrow' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleRejectByEscrow(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'RejectByEscrow' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleRejectByEscrow(source: RejectByEscrow) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserRejectByEscrow(): DictionaryValue<RejectByEscrow> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRejectByEscrow(src)).endCell());
        },
        parse: (src) => {
            return loadRejectByEscrow(src.loadRef().beginParse());
        }
    }
}

export type LoanFinalizedAck = {
    $$type: 'LoanFinalizedAck';
    nft: Address;
    operationId: bigint;
}

export function storeLoanFinalizedAck(src: LoanFinalizedAck) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983035, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadLoanFinalizedAck(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983035) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'LoanFinalizedAck' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleLoanFinalizedAck(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanFinalizedAck' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleLoanFinalizedAck(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanFinalizedAck' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleLoanFinalizedAck(source: LoanFinalizedAck) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserLoanFinalizedAck(): DictionaryValue<LoanFinalizedAck> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLoanFinalizedAck(src)).endCell());
        },
        parse: (src) => {
            return loadLoanFinalizedAck(src.loadRef().beginParse());
        }
    }
}

export type RescueNft = {
    $$type: 'RescueNft';
    nft: Address;
    operationId: bigint;
    to: Address;
}

export function storeRescueNft(src: RescueNft) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953982996, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeAddress(src.to);
    };
}

export function loadRescueNft(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953982996) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _to = sc_0.loadAddress();
    return { $$type: 'RescueNft' as const, nft: _nft, operationId: _operationId, to: _to };
}

export function loadTupleRescueNft(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _to = source.readAddress();
    return { $$type: 'RescueNft' as const, nft: _nft, operationId: _operationId, to: _to };
}

export function loadGetterTupleRescueNft(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _to = source.readAddress();
    return { $$type: 'RescueNft' as const, nft: _nft, operationId: _operationId, to: _to };
}

export function storeTupleRescueNft(source: RescueNft) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
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

export type RescuePreparedNft = {
    $$type: 'RescuePreparedNft';
    nft: Address;
    operationId: bigint;
    to: Address;
}

export function storeRescuePreparedNft(src: RescuePreparedNft) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983013, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeAddress(src.to);
    };
}

export function loadRescuePreparedNft(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983013) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _to = sc_0.loadAddress();
    return { $$type: 'RescuePreparedNft' as const, nft: _nft, operationId: _operationId, to: _to };
}

export function loadTupleRescuePreparedNft(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _to = source.readAddress();
    return { $$type: 'RescuePreparedNft' as const, nft: _nft, operationId: _operationId, to: _to };
}

export function loadGetterTupleRescuePreparedNft(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _to = source.readAddress();
    return { $$type: 'RescuePreparedNft' as const, nft: _nft, operationId: _operationId, to: _to };
}

export function storeTupleRescuePreparedNft(source: RescuePreparedNft) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    builder.writeAddress(source.to);
    return builder.build();
}

export function dictValueParserRescuePreparedNft(): DictionaryValue<RescuePreparedNft> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRescuePreparedNft(src)).endCell());
        },
        parse: (src) => {
            return loadRescuePreparedNft(src.loadRef().beginParse());
        }
    }
}

export type RescuePrepared = {
    $$type: 'RescuePrepared';
    nft: Address;
    operationId: bigint;
    to: Address;
}

export function storeRescuePrepared(src: RescuePrepared) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983014, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeAddress(src.to);
    };
}

export function loadRescuePrepared(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983014) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _to = sc_0.loadAddress();
    return { $$type: 'RescuePrepared' as const, nft: _nft, operationId: _operationId, to: _to };
}

export function loadTupleRescuePrepared(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _to = source.readAddress();
    return { $$type: 'RescuePrepared' as const, nft: _nft, operationId: _operationId, to: _to };
}

export function loadGetterTupleRescuePrepared(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _to = source.readAddress();
    return { $$type: 'RescuePrepared' as const, nft: _nft, operationId: _operationId, to: _to };
}

export function storeTupleRescuePrepared(source: RescuePrepared) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    builder.writeAddress(source.to);
    return builder.build();
}

export function dictValueParserRescuePrepared(): DictionaryValue<RescuePrepared> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRescuePrepared(src)).endCell());
        },
        parse: (src) => {
            return loadRescuePrepared(src.loadRef().beginParse());
        }
    }
}

export type ReleasePendingNft = {
    $$type: 'ReleasePendingNft';
    nft: Address;
    operationId: bigint;
    amount: bigint;
}

export function storeReleasePendingNft(src: ReleasePendingNft) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983018, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadReleasePendingNft(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983018) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _amount = sc_0.loadCoins();
    return { $$type: 'ReleasePendingNft' as const, nft: _nft, operationId: _operationId, amount: _amount };
}

export function loadTupleReleasePendingNft(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _amount = source.readBigNumber();
    return { $$type: 'ReleasePendingNft' as const, nft: _nft, operationId: _operationId, amount: _amount };
}

export function loadGetterTupleReleasePendingNft(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _amount = source.readBigNumber();
    return { $$type: 'ReleasePendingNft' as const, nft: _nft, operationId: _operationId, amount: _amount };
}

export function storeTupleReleasePendingNft(source: ReleasePendingNft) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    builder.writeNumber(source.amount);
    return builder.build();
}

export function dictValueParserReleasePendingNft(): DictionaryValue<ReleasePendingNft> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReleasePendingNft(src)).endCell());
        },
        parse: (src) => {
            return loadReleasePendingNft(src.loadRef().beginParse());
        }
    }
}

export type ResendFinalize = {
    $$type: 'ResendFinalize';
    nft: Address;
    operationId: bigint;
}

export function storeResendFinalize(src: ResendFinalize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983021, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadResendFinalize(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983021) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'ResendFinalize' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleResendFinalize(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'ResendFinalize' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleResendFinalize(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'ResendFinalize' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleResendFinalize(source: ResendFinalize) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserResendFinalize(): DictionaryValue<ResendFinalize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeResendFinalize(src)).endCell());
        },
        parse: (src) => {
            return loadResendFinalize(src.loadRef().beginParse());
        }
    }
}

export type CancelAck = {
    $$type: 'CancelAck';
    nft: Address;
    operationId: bigint;
}

export function storeCancelAck(src: CancelAck) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983042, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadCancelAck(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983042) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'CancelAck' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleCancelAck(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'CancelAck' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleCancelAck(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'CancelAck' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleCancelAck(source: CancelAck) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserCancelAck(): DictionaryValue<CancelAck> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCancelAck(src)).endCell());
        },
        parse: (src) => {
            return loadCancelAck(src.loadRef().beginParse());
        }
    }
}

export type LoanClosed = {
    $$type: 'LoanClosed';
    nft: Address;
    operationId: bigint;
}

export function storeLoanClosed(src: LoanClosed) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983044, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadLoanClosed(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983044) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'LoanClosed' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleLoanClosed(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanClosed' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleLoanClosed(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanClosed' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleLoanClosed(source: LoanClosed) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserLoanClosed(): DictionaryValue<LoanClosed> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLoanClosed(src)).endCell());
        },
        parse: (src) => {
            return loadLoanClosed(src.loadRef().beginParse());
        }
    }
}

export type RepayInit = {
    $$type: 'RepayInit';
    nft: Address;
    operationId: bigint;
    principal: bigint;
    interest: bigint;
}

export function storeRepayInit(src: RepayInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983045, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeCoins(src.principal);
        b_0.storeCoins(src.interest);
    };
}

export function loadRepayInit(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983045) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _principal = sc_0.loadCoins();
    const _interest = sc_0.loadCoins();
    return { $$type: 'RepayInit' as const, nft: _nft, operationId: _operationId, principal: _principal, interest: _interest };
}

export function loadTupleRepayInit(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _principal = source.readBigNumber();
    const _interest = source.readBigNumber();
    return { $$type: 'RepayInit' as const, nft: _nft, operationId: _operationId, principal: _principal, interest: _interest };
}

export function loadGetterTupleRepayInit(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _principal = source.readBigNumber();
    const _interest = source.readBigNumber();
    return { $$type: 'RepayInit' as const, nft: _nft, operationId: _operationId, principal: _principal, interest: _interest };
}

export function storeTupleRepayInit(source: RepayInit) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    builder.writeNumber(source.principal);
    builder.writeNumber(source.interest);
    return builder.build();
}

export function dictValueParserRepayInit(): DictionaryValue<RepayInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRepayInit(src)).endCell());
        },
        parse: (src) => {
            return loadRepayInit(src.loadRef().beginParse());
        }
    }
}

export type RepayAck = {
    $$type: 'RepayAck';
    nft: Address;
    operationId: bigint;
}

export function storeRepayAck(src: RepayAck) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983046, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadRepayAck(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983046) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'RepayAck' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleRepayAck(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'RepayAck' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleRepayAck(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'RepayAck' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleRepayAck(source: RepayAck) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserRepayAck(): DictionaryValue<RepayAck> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRepayAck(src)).endCell());
        },
        parse: (src) => {
            return loadRepayAck(src.loadRef().beginParse());
        }
    }
}

export type ResendRepayAck = {
    $$type: 'ResendRepayAck';
    nft: Address;
    operationId: bigint;
}

export function storeResendRepayAck(src: ResendRepayAck) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983047, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadResendRepayAck(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983047) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'ResendRepayAck' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleResendRepayAck(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'ResendRepayAck' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleResendRepayAck(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'ResendRepayAck' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleResendRepayAck(source: ResendRepayAck) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserResendRepayAck(): DictionaryValue<ResendRepayAck> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeResendRepayAck(src)).endCell());
        },
        parse: (src) => {
            return loadResendRepayAck(src.loadRef().beginParse());
        }
    }
}

export type RedirectReturn = {
    $$type: 'RedirectReturn';
    to: Address;
}

export function storeRedirectReturn(src: RedirectReturn) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983056, 32);
        b_0.storeAddress(src.to);
    };
}

export function loadRedirectReturn(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983056) { throw Error('Invalid prefix'); }
    const _to = sc_0.loadAddress();
    return { $$type: 'RedirectReturn' as const, to: _to };
}

export function loadTupleRedirectReturn(source: TupleReader) {
    const _to = source.readAddress();
    return { $$type: 'RedirectReturn' as const, to: _to };
}

export function loadGetterTupleRedirectReturn(source: TupleReader) {
    const _to = source.readAddress();
    return { $$type: 'RedirectReturn' as const, to: _to };
}

export function storeTupleRedirectReturn(source: RedirectReturn) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.to);
    return builder.build();
}

export function dictValueParserRedirectReturn(): DictionaryValue<RedirectReturn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRedirectReturn(src)).endCell());
        },
        parse: (src) => {
            return loadRedirectReturn(src.loadRef().beginParse());
        }
    }
}

export type RescueForeignNft = {
    $$type: 'RescueForeignNft';
    nft: Address;
    operationId: bigint;
    foreignNft: Address;
    to: Address;
}

export function storeRescueForeignNft(src: RescueForeignNft) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983069, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeAddress(src.foreignNft);
        b_0.storeAddress(src.to);
    };
}

export function loadRescueForeignNft(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983069) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _foreignNft = sc_0.loadAddress();
    const _to = sc_0.loadAddress();
    return { $$type: 'RescueForeignNft' as const, nft: _nft, operationId: _operationId, foreignNft: _foreignNft, to: _to };
}

export function loadTupleRescueForeignNft(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _foreignNft = source.readAddress();
    const _to = source.readAddress();
    return { $$type: 'RescueForeignNft' as const, nft: _nft, operationId: _operationId, foreignNft: _foreignNft, to: _to };
}

export function loadGetterTupleRescueForeignNft(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _foreignNft = source.readAddress();
    const _to = source.readAddress();
    return { $$type: 'RescueForeignNft' as const, nft: _nft, operationId: _operationId, foreignNft: _foreignNft, to: _to };
}

export function storeTupleRescueForeignNft(source: RescueForeignNft) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    builder.writeAddress(source.foreignNft);
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
    foreignNft: Address;
    to: Address;
}

export function storeRescueForeign(src: RescueForeign) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983070, 32);
        b_0.storeAddress(src.foreignNft);
        b_0.storeAddress(src.to);
    };
}

export function loadRescueForeign(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983070) { throw Error('Invalid prefix'); }
    const _foreignNft = sc_0.loadAddress();
    const _to = sc_0.loadAddress();
    return { $$type: 'RescueForeign' as const, foreignNft: _foreignNft, to: _to };
}

export function loadTupleRescueForeign(source: TupleReader) {
    const _foreignNft = source.readAddress();
    const _to = source.readAddress();
    return { $$type: 'RescueForeign' as const, foreignNft: _foreignNft, to: _to };
}

export function loadGetterTupleRescueForeign(source: TupleReader) {
    const _foreignNft = source.readAddress();
    const _to = source.readAddress();
    return { $$type: 'RescueForeign' as const, foreignNft: _foreignNft, to: _to };
}

export function storeTupleRescueForeign(source: RescueForeign) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.foreignNft);
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

export type SignersProposed = {
    $$type: 'SignersProposed';
    applyAt: bigint;
}

export function storeSignersProposed(src: SignersProposed) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983077, 32);
        b_0.storeUint(src.applyAt, 32);
    };
}

export function loadSignersProposed(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983077) { throw Error('Invalid prefix'); }
    const _applyAt = sc_0.loadUintBig(32);
    return { $$type: 'SignersProposed' as const, applyAt: _applyAt };
}

export function loadTupleSignersProposed(source: TupleReader) {
    const _applyAt = source.readBigNumber();
    return { $$type: 'SignersProposed' as const, applyAt: _applyAt };
}

export function loadGetterTupleSignersProposed(source: TupleReader) {
    const _applyAt = source.readBigNumber();
    return { $$type: 'SignersProposed' as const, applyAt: _applyAt };
}

export function storeTupleSignersProposed(source: SignersProposed) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.applyAt);
    return builder.build();
}

export function dictValueParserSignersProposed(): DictionaryValue<SignersProposed> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSignersProposed(src)).endCell());
        },
        parse: (src) => {
            return loadSignersProposed(src.loadRef().beginParse());
        }
    }
}

export type SignersApplied = {
    $$type: 'SignersApplied';
}

export function storeSignersApplied(src: SignersApplied) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983078, 32);
    };
}

export function loadSignersApplied(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983078) { throw Error('Invalid prefix'); }
    return { $$type: 'SignersApplied' as const };
}

export function loadTupleSignersApplied(source: TupleReader) {
    return { $$type: 'SignersApplied' as const };
}

export function loadGetterTupleSignersApplied(source: TupleReader) {
    return { $$type: 'SignersApplied' as const };
}

export function storeTupleSignersApplied(source: SignersApplied) {
    const builder = new TupleBuilder();
    return builder.build();
}

export function dictValueParserSignersApplied(): DictionaryValue<SignersApplied> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSignersApplied(src)).endCell());
        },
        parse: (src) => {
            return loadSignersApplied(src.loadRef().beginParse());
        }
    }
}

export type MaxLoanChanged = {
    $$type: 'MaxLoanChanged';
    value: bigint;
}

export function storeMaxLoanChanged(src: MaxLoanChanged) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983081, 32);
        b_0.storeCoins(src.value);
    };
}

export function loadMaxLoanChanged(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983081) { throw Error('Invalid prefix'); }
    const _value = sc_0.loadCoins();
    return { $$type: 'MaxLoanChanged' as const, value: _value };
}

export function loadTupleMaxLoanChanged(source: TupleReader) {
    const _value = source.readBigNumber();
    return { $$type: 'MaxLoanChanged' as const, value: _value };
}

export function loadGetterTupleMaxLoanChanged(source: TupleReader) {
    const _value = source.readBigNumber();
    return { $$type: 'MaxLoanChanged' as const, value: _value };
}

export function storeTupleMaxLoanChanged(source: MaxLoanChanged) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.value);
    return builder.build();
}

export function dictValueParserMaxLoanChanged(): DictionaryValue<MaxLoanChanged> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMaxLoanChanged(src)).endCell());
        },
        parse: (src) => {
            return loadMaxLoanChanged(src.loadRef().beginParse());
        }
    }
}

export type MaxLoanProposed = {
    $$type: 'MaxLoanProposed';
    value: bigint;
    applyAt: bigint;
}

export function storeMaxLoanProposed(src: MaxLoanProposed) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983082, 32);
        b_0.storeCoins(src.value);
        b_0.storeUint(src.applyAt, 32);
    };
}

export function loadMaxLoanProposed(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983082) { throw Error('Invalid prefix'); }
    const _value = sc_0.loadCoins();
    const _applyAt = sc_0.loadUintBig(32);
    return { $$type: 'MaxLoanProposed' as const, value: _value, applyAt: _applyAt };
}

export function loadTupleMaxLoanProposed(source: TupleReader) {
    const _value = source.readBigNumber();
    const _applyAt = source.readBigNumber();
    return { $$type: 'MaxLoanProposed' as const, value: _value, applyAt: _applyAt };
}

export function loadGetterTupleMaxLoanProposed(source: TupleReader) {
    const _value = source.readBigNumber();
    const _applyAt = source.readBigNumber();
    return { $$type: 'MaxLoanProposed' as const, value: _value, applyAt: _applyAt };
}

export function storeTupleMaxLoanProposed(source: MaxLoanProposed) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.value);
    builder.writeNumber(source.applyAt);
    return builder.build();
}

export function dictValueParserMaxLoanProposed(): DictionaryValue<MaxLoanProposed> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMaxLoanProposed(src)).endCell());
        },
        parse: (src) => {
            return loadMaxLoanProposed(src.loadRef().beginParse());
        }
    }
}

export type LiquidatorChanged = {
    $$type: 'LiquidatorChanged';
    to: Address | null;
}

export function storeLiquidatorChanged(src: LiquidatorChanged) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983083, 32);
        b_0.storeAddress(src.to);
    };
}

export function loadLiquidatorChanged(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983083) { throw Error('Invalid prefix'); }
    const _to = sc_0.loadMaybeAddress();
    return { $$type: 'LiquidatorChanged' as const, to: _to };
}

export function loadTupleLiquidatorChanged(source: TupleReader) {
    const _to = source.readAddressOpt();
    return { $$type: 'LiquidatorChanged' as const, to: _to };
}

export function loadGetterTupleLiquidatorChanged(source: TupleReader) {
    const _to = source.readAddressOpt();
    return { $$type: 'LiquidatorChanged' as const, to: _to };
}

export function storeTupleLiquidatorChanged(source: LiquidatorChanged) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.to);
    return builder.build();
}

export function dictValueParserLiquidatorChanged(): DictionaryValue<LiquidatorChanged> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidatorChanged(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidatorChanged(src.loadRef().beginParse());
        }
    }
}

export type OwnerProposed = {
    $$type: 'OwnerProposed';
    newOwner: Address;
}

export function storeOwnerProposed(src: OwnerProposed) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983084, 32);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadOwnerProposed(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983084) { throw Error('Invalid prefix'); }
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'OwnerProposed' as const, newOwner: _newOwner };
}

export function loadTupleOwnerProposed(source: TupleReader) {
    const _newOwner = source.readAddress();
    return { $$type: 'OwnerProposed' as const, newOwner: _newOwner };
}

export function loadGetterTupleOwnerProposed(source: TupleReader) {
    const _newOwner = source.readAddress();
    return { $$type: 'OwnerProposed' as const, newOwner: _newOwner };
}

export function storeTupleOwnerProposed(source: OwnerProposed) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.newOwner);
    return builder.build();
}

export function dictValueParserOwnerProposed(): DictionaryValue<OwnerProposed> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOwnerProposed(src)).endCell());
        },
        parse: (src) => {
            return loadOwnerProposed(src.loadRef().beginParse());
        }
    }
}

export type OwnerChanged = {
    $$type: 'OwnerChanged';
    newOwner: Address;
}

export function storeOwnerChanged(src: OwnerChanged) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983085, 32);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadOwnerChanged(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983085) { throw Error('Invalid prefix'); }
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'OwnerChanged' as const, newOwner: _newOwner };
}

export function loadTupleOwnerChanged(source: TupleReader) {
    const _newOwner = source.readAddress();
    return { $$type: 'OwnerChanged' as const, newOwner: _newOwner };
}

export function loadGetterTupleOwnerChanged(source: TupleReader) {
    const _newOwner = source.readAddress();
    return { $$type: 'OwnerChanged' as const, newOwner: _newOwner };
}

export function storeTupleOwnerChanged(source: OwnerChanged) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.newOwner);
    return builder.build();
}

export function dictValueParserOwnerChanged(): DictionaryValue<OwnerChanged> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOwnerChanged(src)).endCell());
        },
        parse: (src) => {
            return loadOwnerChanged(src.loadRef().beginParse());
        }
    }
}

export type RescueArmed = {
    $$type: 'RescueArmed';
    nft: Address;
    operationId: bigint;
    to: Address;
}

export function storeRescueArmed(src: RescueArmed) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983086, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeAddress(src.to);
    };
}

export function loadRescueArmed(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983086) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _to = sc_0.loadAddress();
    return { $$type: 'RescueArmed' as const, nft: _nft, operationId: _operationId, to: _to };
}

export function loadTupleRescueArmed(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _to = source.readAddress();
    return { $$type: 'RescueArmed' as const, nft: _nft, operationId: _operationId, to: _to };
}

export function loadGetterTupleRescueArmed(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _to = source.readAddress();
    return { $$type: 'RescueArmed' as const, nft: _nft, operationId: _operationId, to: _to };
}

export function storeTupleRescueArmed(source: RescueArmed) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    builder.writeAddress(source.to);
    return builder.build();
}

export function dictValueParserRescueArmed(): DictionaryValue<RescueArmed> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRescueArmed(src)).endCell());
        },
        parse: (src) => {
            return loadRescueArmed(src.loadRef().beginParse());
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

export type ExtendLoan = {
    $$type: 'ExtendLoan';
    extDays: bigint;
    operationId: bigint;
}

export function storeExtendLoan(src: ExtendLoan) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983030, 32);
        b_0.storeUint(src.extDays, 8);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadExtendLoan(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983030) { throw Error('Invalid prefix'); }
    const _extDays = sc_0.loadUintBig(8);
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'ExtendLoan' as const, extDays: _extDays, operationId: _operationId };
}

export function loadTupleExtendLoan(source: TupleReader) {
    const _extDays = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'ExtendLoan' as const, extDays: _extDays, operationId: _operationId };
}

export function loadGetterTupleExtendLoan(source: TupleReader) {
    const _extDays = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'ExtendLoan' as const, extDays: _extDays, operationId: _operationId };
}

export function storeTupleExtendLoan(source: ExtendLoan) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.extDays);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserExtendLoan(): DictionaryValue<ExtendLoan> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExtendLoan(src)).endCell());
        },
        parse: (src) => {
            return loadExtendLoan(src.loadRef().beginParse());
        }
    }
}

export type LiquidateNft = {
    $$type: 'LiquidateNft';
    nft: Address;
    operationId: bigint;
}

export function storeLiquidateNft(src: LiquidateNft) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983001, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadLiquidateNft(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983001) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'LiquidateNft' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleLiquidateNft(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'LiquidateNft' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleLiquidateNft(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'LiquidateNft' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleLiquidateNft(source: LiquidateNft) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
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
    attemptId: bigint;
    to: Address;
    caller: Address;
}

export function storeLiquidateByPool(src: LiquidateByPool) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983002, 32);
        b_0.storeUint(src.attemptId, 32);
        b_0.storeAddress(src.to);
        b_0.storeAddress(src.caller);
    };
}

export function loadLiquidateByPool(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983002) { throw Error('Invalid prefix'); }
    const _attemptId = sc_0.loadUintBig(32);
    const _to = sc_0.loadAddress();
    const _caller = sc_0.loadAddress();
    return { $$type: 'LiquidateByPool' as const, attemptId: _attemptId, to: _to, caller: _caller };
}

export function loadTupleLiquidateByPool(source: TupleReader) {
    const _attemptId = source.readBigNumber();
    const _to = source.readAddress();
    const _caller = source.readAddress();
    return { $$type: 'LiquidateByPool' as const, attemptId: _attemptId, to: _to, caller: _caller };
}

export function loadGetterTupleLiquidateByPool(source: TupleReader) {
    const _attemptId = source.readBigNumber();
    const _to = source.readAddress();
    const _caller = source.readAddress();
    return { $$type: 'LiquidateByPool' as const, attemptId: _attemptId, to: _to, caller: _caller };
}

export function storeTupleLiquidateByPool(source: LiquidateByPool) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.attemptId);
    builder.writeAddress(source.to);
    builder.writeAddress(source.caller);
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

export type ProposeSigners = {
    $$type: 'ProposeSigners';
    k1: bigint;
    k2: bigint;
    k3: bigint;
}

export function storeProposeSigners(src: ProposeSigners) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983019, 32);
        b_0.storeUint(src.k1, 256);
        b_0.storeUint(src.k2, 256);
        b_0.storeUint(src.k3, 256);
    };
}

export function loadProposeSigners(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983019) { throw Error('Invalid prefix'); }
    const _k1 = sc_0.loadUintBig(256);
    const _k2 = sc_0.loadUintBig(256);
    const _k3 = sc_0.loadUintBig(256);
    return { $$type: 'ProposeSigners' as const, k1: _k1, k2: _k2, k3: _k3 };
}

export function loadTupleProposeSigners(source: TupleReader) {
    const _k1 = source.readBigNumber();
    const _k2 = source.readBigNumber();
    const _k3 = source.readBigNumber();
    return { $$type: 'ProposeSigners' as const, k1: _k1, k2: _k2, k3: _k3 };
}

export function loadGetterTupleProposeSigners(source: TupleReader) {
    const _k1 = source.readBigNumber();
    const _k2 = source.readBigNumber();
    const _k3 = source.readBigNumber();
    return { $$type: 'ProposeSigners' as const, k1: _k1, k2: _k2, k3: _k3 };
}

export function storeTupleProposeSigners(source: ProposeSigners) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.k1);
    builder.writeNumber(source.k2);
    builder.writeNumber(source.k3);
    return builder.build();
}

export function dictValueParserProposeSigners(): DictionaryValue<ProposeSigners> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProposeSigners(src)).endCell());
        },
        parse: (src) => {
            return loadProposeSigners(src.loadRef().beginParse());
        }
    }
}

export type ApplySigners = {
    $$type: 'ApplySigners';
}

export function storeApplySigners(src: ApplySigners) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983020, 32);
    };
}

export function loadApplySigners(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983020) { throw Error('Invalid prefix'); }
    return { $$type: 'ApplySigners' as const };
}

export function loadTupleApplySigners(source: TupleReader) {
    return { $$type: 'ApplySigners' as const };
}

export function loadGetterTupleApplySigners(source: TupleReader) {
    return { $$type: 'ApplySigners' as const };
}

export function storeTupleApplySigners(source: ApplySigners) {
    const builder = new TupleBuilder();
    return builder.build();
}

export function dictValueParserApplySigners(): DictionaryValue<ApplySigners> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeApplySigners(src)).endCell());
        },
        parse: (src) => {
            return loadApplySigners(src.loadRef().beginParse());
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

export type ClaimReturn = {
    $$type: 'ClaimReturn';
}

export function storeClaimReturn(src: ClaimReturn) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983072, 32);
    };
}

export function loadClaimReturn(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983072) { throw Error('Invalid prefix'); }
    return { $$type: 'ClaimReturn' as const };
}

export function loadTupleClaimReturn(source: TupleReader) {
    return { $$type: 'ClaimReturn' as const };
}

export function loadGetterTupleClaimReturn(source: TupleReader) {
    return { $$type: 'ClaimReturn' as const };
}

export function storeTupleClaimReturn(source: ClaimReturn) {
    const builder = new TupleBuilder();
    return builder.build();
}

export function dictValueParserClaimReturn(): DictionaryValue<ClaimReturn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimReturn(src)).endCell());
        },
        parse: (src) => {
            return loadClaimReturn(src.loadRef().beginParse());
        }
    }
}

export type ResendLiquidation = {
    $$type: 'ResendLiquidation';
    nft: Address;
    operationId: bigint;
}

export function storeResendLiquidation(src: ResendLiquidation) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983073, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadResendLiquidation(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983073) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'ResendLiquidation' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleResendLiquidation(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'ResendLiquidation' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleResendLiquidation(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'ResendLiquidation' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleResendLiquidation(source: ResendLiquidation) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserResendLiquidation(): DictionaryValue<ResendLiquidation> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeResendLiquidation(src)).endCell());
        },
        parse: (src) => {
            return loadResendLiquidation(src.loadRef().beginParse());
        }
    }
}

export type ApplyMaxLoan = {
    $$type: 'ApplyMaxLoan';
}

export function storeApplyMaxLoan(src: ApplyMaxLoan) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983076, 32);
    };
}

export function loadApplyMaxLoan(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983076) { throw Error('Invalid prefix'); }
    return { $$type: 'ApplyMaxLoan' as const };
}

export function loadTupleApplyMaxLoan(source: TupleReader) {
    return { $$type: 'ApplyMaxLoan' as const };
}

export function loadGetterTupleApplyMaxLoan(source: TupleReader) {
    return { $$type: 'ApplyMaxLoan' as const };
}

export function storeTupleApplyMaxLoan(source: ApplyMaxLoan) {
    const builder = new TupleBuilder();
    return builder.build();
}

export function dictValueParserApplyMaxLoan(): DictionaryValue<ApplyMaxLoan> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeApplyMaxLoan(src)).endCell());
        },
        parse: (src) => {
            return loadApplyMaxLoan(src.loadRef().beginParse());
        }
    }
}

export type ProposeRate = {
    $$type: 'ProposeRate';
    term: bigint;
    rateBps: bigint;
}

export function storeProposeRate(src: ProposeRate) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983024, 32);
        b_0.storeUint(src.term, 16);
        b_0.storeUint(src.rateBps, 32);
    };
}

export function loadProposeRate(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983024) { throw Error('Invalid prefix'); }
    const _term = sc_0.loadUintBig(16);
    const _rateBps = sc_0.loadUintBig(32);
    return { $$type: 'ProposeRate' as const, term: _term, rateBps: _rateBps };
}

export function loadTupleProposeRate(source: TupleReader) {
    const _term = source.readBigNumber();
    const _rateBps = source.readBigNumber();
    return { $$type: 'ProposeRate' as const, term: _term, rateBps: _rateBps };
}

export function loadGetterTupleProposeRate(source: TupleReader) {
    const _term = source.readBigNumber();
    const _rateBps = source.readBigNumber();
    return { $$type: 'ProposeRate' as const, term: _term, rateBps: _rateBps };
}

export function storeTupleProposeRate(source: ProposeRate) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.term);
    builder.writeNumber(source.rateBps);
    return builder.build();
}

export function dictValueParserProposeRate(): DictionaryValue<ProposeRate> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProposeRate(src)).endCell());
        },
        parse: (src) => {
            return loadProposeRate(src.loadRef().beginParse());
        }
    }
}

export type ApplyRate = {
    $$type: 'ApplyRate';
    term: bigint;
}

export function storeApplyRate(src: ApplyRate) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983025, 32);
        b_0.storeUint(src.term, 16);
    };
}

export function loadApplyRate(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983025) { throw Error('Invalid prefix'); }
    const _term = sc_0.loadUintBig(16);
    return { $$type: 'ApplyRate' as const, term: _term };
}

export function loadTupleApplyRate(source: TupleReader) {
    const _term = source.readBigNumber();
    return { $$type: 'ApplyRate' as const, term: _term };
}

export function loadGetterTupleApplyRate(source: TupleReader) {
    const _term = source.readBigNumber();
    return { $$type: 'ApplyRate' as const, term: _term };
}

export function storeTupleApplyRate(source: ApplyRate) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.term);
    return builder.build();
}

export function dictValueParserApplyRate(): DictionaryValue<ApplyRate> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeApplyRate(src)).endCell());
        },
        parse: (src) => {
            return loadApplyRate(src.loadRef().beginParse());
        }
    }
}

export type CancelRate = {
    $$type: 'CancelRate';
    term: bigint;
}

export function storeCancelRate(src: CancelRate) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983026, 32);
        b_0.storeUint(src.term, 16);
    };
}

export function loadCancelRate(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983026) { throw Error('Invalid prefix'); }
    const _term = sc_0.loadUintBig(16);
    return { $$type: 'CancelRate' as const, term: _term };
}

export function loadTupleCancelRate(source: TupleReader) {
    const _term = source.readBigNumber();
    return { $$type: 'CancelRate' as const, term: _term };
}

export function loadGetterTupleCancelRate(source: TupleReader) {
    const _term = source.readBigNumber();
    return { $$type: 'CancelRate' as const, term: _term };
}

export function storeTupleCancelRate(source: CancelRate) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.term);
    return builder.build();
}

export function dictValueParserCancelRate(): DictionaryValue<CancelRate> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCancelRate(src)).endCell());
        },
        parse: (src) => {
            return loadCancelRate(src.loadRef().beginParse());
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
    operationId: bigint;
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
        b_0.storeUint(src.operationId, 32);
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
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'LoanIssued' as const, nft: _nft, borrower: _borrower, principal: _principal, repay: _repay, dueAt: _dueAt, operationId: _operationId };
}

export function loadTupleLoanIssued(source: TupleReader) {
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _principal = source.readBigNumber();
    const _repay = source.readBigNumber();
    const _dueAt = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanIssued' as const, nft: _nft, borrower: _borrower, principal: _principal, repay: _repay, dueAt: _dueAt, operationId: _operationId };
}

export function loadGetterTupleLoanIssued(source: TupleReader) {
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _principal = source.readBigNumber();
    const _repay = source.readBigNumber();
    const _dueAt = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanIssued' as const, nft: _nft, borrower: _borrower, principal: _principal, repay: _repay, dueAt: _dueAt, operationId: _operationId };
}

export function storeTupleLoanIssued(source: LoanIssued) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeAddress(source.borrower);
    builder.writeNumber(source.principal);
    builder.writeNumber(source.repay);
    builder.writeNumber(source.dueAt);
    builder.writeNumber(source.operationId);
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
    operationId: bigint;
}

export function storeLoanRepaid(src: LoanRepaid) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983009, 32);
        b_0.storeAddress(src.nft);
        b_0.storeAddress(src.borrower);
        b_0.storeCoins(src.repay);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadLoanRepaid(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983009) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _borrower = sc_0.loadAddress();
    const _repay = sc_0.loadCoins();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'LoanRepaid' as const, nft: _nft, borrower: _borrower, repay: _repay, operationId: _operationId };
}

export function loadTupleLoanRepaid(source: TupleReader) {
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _repay = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanRepaid' as const, nft: _nft, borrower: _borrower, repay: _repay, operationId: _operationId };
}

export function loadGetterTupleLoanRepaid(source: TupleReader) {
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _repay = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanRepaid' as const, nft: _nft, borrower: _borrower, repay: _repay, operationId: _operationId };
}

export function storeTupleLoanRepaid(source: LoanRepaid) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeAddress(source.borrower);
    builder.writeNumber(source.repay);
    builder.writeNumber(source.operationId);
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
    operationId: bigint;
}

export function storeLoanLiquidated(src: LoanLiquidated) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983010, 32);
        b_0.storeAddress(src.nft);
        b_0.storeAddress(src.to);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadLoanLiquidated(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983010) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _to = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'LoanLiquidated' as const, nft: _nft, to: _to, operationId: _operationId };
}

export function loadTupleLoanLiquidated(source: TupleReader) {
    const _nft = source.readAddress();
    const _to = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanLiquidated' as const, nft: _nft, to: _to, operationId: _operationId };
}

export function loadGetterTupleLoanLiquidated(source: TupleReader) {
    const _nft = source.readAddress();
    const _to = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanLiquidated' as const, nft: _nft, to: _to, operationId: _operationId };
}

export function storeTupleLoanLiquidated(source: LoanLiquidated) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeAddress(source.to);
    builder.writeNumber(source.operationId);
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

export type LoanAborted = {
    $$type: 'LoanAborted';
    nft: Address;
    reason: bigint;
    operationId: bigint;
}

export function storeLoanAborted(src: LoanAborted) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983015, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.reason, 8);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadLoanAborted(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983015) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _reason = sc_0.loadUintBig(8);
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'LoanAborted' as const, nft: _nft, reason: _reason, operationId: _operationId };
}

export function loadTupleLoanAborted(source: TupleReader) {
    const _nft = source.readAddress();
    const _reason = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanAborted' as const, nft: _nft, reason: _reason, operationId: _operationId };
}

export function loadGetterTupleLoanAborted(source: TupleReader) {
    const _nft = source.readAddress();
    const _reason = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanAborted' as const, nft: _nft, reason: _reason, operationId: _operationId };
}

export function storeTupleLoanAborted(source: LoanAborted) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.reason);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserLoanAborted(): DictionaryValue<LoanAborted> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLoanAborted(src)).endCell());
        },
        parse: (src) => {
            return loadLoanAborted(src.loadRef().beginParse());
        }
    }
}

export type LoanPrepared = {
    $$type: 'LoanPrepared';
    nft: Address;
    principal: bigint;
    repay: bigint;
    dueAt: bigint;
    operationId: bigint;
}

export function storeLoanPrepared(src: LoanPrepared) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983016, 32);
        b_0.storeAddress(src.nft);
        b_0.storeCoins(src.principal);
        b_0.storeCoins(src.repay);
        b_0.storeUint(src.dueAt, 32);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadLoanPrepared(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983016) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _principal = sc_0.loadCoins();
    const _repay = sc_0.loadCoins();
    const _dueAt = sc_0.loadUintBig(32);
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'LoanPrepared' as const, nft: _nft, principal: _principal, repay: _repay, dueAt: _dueAt, operationId: _operationId };
}

export function loadTupleLoanPrepared(source: TupleReader) {
    const _nft = source.readAddress();
    const _principal = source.readBigNumber();
    const _repay = source.readBigNumber();
    const _dueAt = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanPrepared' as const, nft: _nft, principal: _principal, repay: _repay, dueAt: _dueAt, operationId: _operationId };
}

export function loadGetterTupleLoanPrepared(source: TupleReader) {
    const _nft = source.readAddress();
    const _principal = source.readBigNumber();
    const _repay = source.readBigNumber();
    const _dueAt = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanPrepared' as const, nft: _nft, principal: _principal, repay: _repay, dueAt: _dueAt, operationId: _operationId };
}

export function storeTupleLoanPrepared(source: LoanPrepared) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.principal);
    builder.writeNumber(source.repay);
    builder.writeNumber(source.dueAt);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserLoanPrepared(): DictionaryValue<LoanPrepared> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLoanPrepared(src)).endCell());
        },
        parse: (src) => {
            return loadLoanPrepared(src.loadRef().beginParse());
        }
    }
}

export type LoanFinalized = {
    $$type: 'LoanFinalized';
    nft: Address;
    operationId: bigint;
}

export function storeLoanFinalized(src: LoanFinalized) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983017, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadLoanFinalized(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983017) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'LoanFinalized' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleLoanFinalized(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanFinalized' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleLoanFinalized(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanFinalized' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleLoanFinalized(source: LoanFinalized) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserLoanFinalized(): DictionaryValue<LoanFinalized> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLoanFinalized(src)).endCell());
        },
        parse: (src) => {
            return loadLoanFinalized(src.loadRef().beginParse());
        }
    }
}

export type RateProposed = {
    $$type: 'RateProposed';
    term: bigint;
    oldRateBps: bigint;
    newRateBps: bigint;
    applyAt: bigint;
}

export function storeRateProposed(src: RateProposed) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983027, 32);
        b_0.storeUint(src.term, 16);
        b_0.storeUint(src.oldRateBps, 32);
        b_0.storeUint(src.newRateBps, 32);
        b_0.storeUint(src.applyAt, 32);
    };
}

export function loadRateProposed(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983027) { throw Error('Invalid prefix'); }
    const _term = sc_0.loadUintBig(16);
    const _oldRateBps = sc_0.loadUintBig(32);
    const _newRateBps = sc_0.loadUintBig(32);
    const _applyAt = sc_0.loadUintBig(32);
    return { $$type: 'RateProposed' as const, term: _term, oldRateBps: _oldRateBps, newRateBps: _newRateBps, applyAt: _applyAt };
}

export function loadTupleRateProposed(source: TupleReader) {
    const _term = source.readBigNumber();
    const _oldRateBps = source.readBigNumber();
    const _newRateBps = source.readBigNumber();
    const _applyAt = source.readBigNumber();
    return { $$type: 'RateProposed' as const, term: _term, oldRateBps: _oldRateBps, newRateBps: _newRateBps, applyAt: _applyAt };
}

export function loadGetterTupleRateProposed(source: TupleReader) {
    const _term = source.readBigNumber();
    const _oldRateBps = source.readBigNumber();
    const _newRateBps = source.readBigNumber();
    const _applyAt = source.readBigNumber();
    return { $$type: 'RateProposed' as const, term: _term, oldRateBps: _oldRateBps, newRateBps: _newRateBps, applyAt: _applyAt };
}

export function storeTupleRateProposed(source: RateProposed) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.term);
    builder.writeNumber(source.oldRateBps);
    builder.writeNumber(source.newRateBps);
    builder.writeNumber(source.applyAt);
    return builder.build();
}

export function dictValueParserRateProposed(): DictionaryValue<RateProposed> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRateProposed(src)).endCell());
        },
        parse: (src) => {
            return loadRateProposed(src.loadRef().beginParse());
        }
    }
}

export type RateApplied = {
    $$type: 'RateApplied';
    term: bigint;
    newRateBps: bigint;
}

export function storeRateApplied(src: RateApplied) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983028, 32);
        b_0.storeUint(src.term, 16);
        b_0.storeUint(src.newRateBps, 32);
    };
}

export function loadRateApplied(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983028) { throw Error('Invalid prefix'); }
    const _term = sc_0.loadUintBig(16);
    const _newRateBps = sc_0.loadUintBig(32);
    return { $$type: 'RateApplied' as const, term: _term, newRateBps: _newRateBps };
}

export function loadTupleRateApplied(source: TupleReader) {
    const _term = source.readBigNumber();
    const _newRateBps = source.readBigNumber();
    return { $$type: 'RateApplied' as const, term: _term, newRateBps: _newRateBps };
}

export function loadGetterTupleRateApplied(source: TupleReader) {
    const _term = source.readBigNumber();
    const _newRateBps = source.readBigNumber();
    return { $$type: 'RateApplied' as const, term: _term, newRateBps: _newRateBps };
}

export function storeTupleRateApplied(source: RateApplied) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.term);
    builder.writeNumber(source.newRateBps);
    return builder.build();
}

export function dictValueParserRateApplied(): DictionaryValue<RateApplied> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRateApplied(src)).endCell());
        },
        parse: (src) => {
            return loadRateApplied(src.loadRef().beginParse());
        }
    }
}

export type RateCancelled = {
    $$type: 'RateCancelled';
    term: bigint;
}

export function storeRateCancelled(src: RateCancelled) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983029, 32);
        b_0.storeUint(src.term, 16);
    };
}

export function loadRateCancelled(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983029) { throw Error('Invalid prefix'); }
    const _term = sc_0.loadUintBig(16);
    return { $$type: 'RateCancelled' as const, term: _term };
}

export function loadTupleRateCancelled(source: TupleReader) {
    const _term = source.readBigNumber();
    return { $$type: 'RateCancelled' as const, term: _term };
}

export function loadGetterTupleRateCancelled(source: TupleReader) {
    const _term = source.readBigNumber();
    return { $$type: 'RateCancelled' as const, term: _term };
}

export function storeTupleRateCancelled(source: RateCancelled) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.term);
    return builder.build();
}

export function dictValueParserRateCancelled(): DictionaryValue<RateCancelled> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRateCancelled(src)).endCell());
        },
        parse: (src) => {
            return loadRateCancelled(src.loadRef().beginParse());
        }
    }
}

export type LoanExtended = {
    $$type: 'LoanExtended';
    nft: Address;
    borrower: Address;
    extensionDays: bigint;
    totalExtendedDays: bigint;
    extraInterest: bigint;
    newDueAt: bigint;
    newRepay: bigint;
    operationId: bigint;
}

export function storeLoanExtended(src: LoanExtended) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983031, 32);
        b_0.storeAddress(src.nft);
        b_0.storeAddress(src.borrower);
        b_0.storeUint(src.extensionDays, 8);
        b_0.storeUint(src.totalExtendedDays, 8);
        b_0.storeCoins(src.extraInterest);
        b_0.storeUint(src.newDueAt, 32);
        b_0.storeCoins(src.newRepay);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadLoanExtended(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983031) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _borrower = sc_0.loadAddress();
    const _extensionDays = sc_0.loadUintBig(8);
    const _totalExtendedDays = sc_0.loadUintBig(8);
    const _extraInterest = sc_0.loadCoins();
    const _newDueAt = sc_0.loadUintBig(32);
    const _newRepay = sc_0.loadCoins();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'LoanExtended' as const, nft: _nft, borrower: _borrower, extensionDays: _extensionDays, totalExtendedDays: _totalExtendedDays, extraInterest: _extraInterest, newDueAt: _newDueAt, newRepay: _newRepay, operationId: _operationId };
}

export function loadTupleLoanExtended(source: TupleReader) {
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _extensionDays = source.readBigNumber();
    const _totalExtendedDays = source.readBigNumber();
    const _extraInterest = source.readBigNumber();
    const _newDueAt = source.readBigNumber();
    const _newRepay = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanExtended' as const, nft: _nft, borrower: _borrower, extensionDays: _extensionDays, totalExtendedDays: _totalExtendedDays, extraInterest: _extraInterest, newDueAt: _newDueAt, newRepay: _newRepay, operationId: _operationId };
}

export function loadGetterTupleLoanExtended(source: TupleReader) {
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _extensionDays = source.readBigNumber();
    const _totalExtendedDays = source.readBigNumber();
    const _extraInterest = source.readBigNumber();
    const _newDueAt = source.readBigNumber();
    const _newRepay = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanExtended' as const, nft: _nft, borrower: _borrower, extensionDays: _extensionDays, totalExtendedDays: _totalExtendedDays, extraInterest: _extraInterest, newDueAt: _newDueAt, newRepay: _newRepay, operationId: _operationId };
}

export function storeTupleLoanExtended(source: LoanExtended) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeAddress(source.borrower);
    builder.writeNumber(source.extensionDays);
    builder.writeNumber(source.totalExtendedDays);
    builder.writeNumber(source.extraInterest);
    builder.writeNumber(source.newDueAt);
    builder.writeNumber(source.newRepay);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserLoanExtended(): DictionaryValue<LoanExtended> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLoanExtended(src)).endCell());
        },
        parse: (src) => {
            return loadLoanExtended(src.loadRef().beginParse());
        }
    }
}

export type FinalizeBounce = {
    $$type: 'FinalizeBounce';
    escrow: Address;
}

export function storeFinalizeBounce(src: FinalizeBounce) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983033, 32);
        b_0.storeAddress(src.escrow);
    };
}

export function loadFinalizeBounce(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983033) { throw Error('Invalid prefix'); }
    const _escrow = sc_0.loadAddress();
    return { $$type: 'FinalizeBounce' as const, escrow: _escrow };
}

export function loadTupleFinalizeBounce(source: TupleReader) {
    const _escrow = source.readAddress();
    return { $$type: 'FinalizeBounce' as const, escrow: _escrow };
}

export function loadGetterTupleFinalizeBounce(source: TupleReader) {
    const _escrow = source.readAddress();
    return { $$type: 'FinalizeBounce' as const, escrow: _escrow };
}

export function storeTupleFinalizeBounce(source: FinalizeBounce) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.escrow);
    return builder.build();
}

export function dictValueParserFinalizeBounce(): DictionaryValue<FinalizeBounce> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFinalizeBounce(src)).endCell());
        },
        parse: (src) => {
            return loadFinalizeBounce(src.loadRef().beginParse());
        }
    }
}

export type CancelBounce = {
    $$type: 'CancelBounce';
    escrow: Address;
}

export function storeCancelBounce(src: CancelBounce) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983054, 32);
        b_0.storeAddress(src.escrow);
    };
}

export function loadCancelBounce(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983054) { throw Error('Invalid prefix'); }
    const _escrow = sc_0.loadAddress();
    return { $$type: 'CancelBounce' as const, escrow: _escrow };
}

export function loadTupleCancelBounce(source: TupleReader) {
    const _escrow = source.readAddress();
    return { $$type: 'CancelBounce' as const, escrow: _escrow };
}

export function loadGetterTupleCancelBounce(source: TupleReader) {
    const _escrow = source.readAddress();
    return { $$type: 'CancelBounce' as const, escrow: _escrow };
}

export function storeTupleCancelBounce(source: CancelBounce) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.escrow);
    return builder.build();
}

export function dictValueParserCancelBounce(): DictionaryValue<CancelBounce> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCancelBounce(src)).endCell());
        },
        parse: (src) => {
            return loadCancelBounce(src.loadRef().beginParse());
        }
    }
}

export type RepayBounce = {
    $$type: 'RepayBounce';
    escrow: Address;
}

export function storeRepayBounce(src: RepayBounce) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983048, 32);
        b_0.storeAddress(src.escrow);
    };
}

export function loadRepayBounce(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983048) { throw Error('Invalid prefix'); }
    const _escrow = sc_0.loadAddress();
    return { $$type: 'RepayBounce' as const, escrow: _escrow };
}

export function loadTupleRepayBounce(source: TupleReader) {
    const _escrow = source.readAddress();
    return { $$type: 'RepayBounce' as const, escrow: _escrow };
}

export function loadGetterTupleRepayBounce(source: TupleReader) {
    const _escrow = source.readAddress();
    return { $$type: 'RepayBounce' as const, escrow: _escrow };
}

export function storeTupleRepayBounce(source: RepayBounce) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.escrow);
    return builder.build();
}

export function dictValueParserRepayBounce(): DictionaryValue<RepayBounce> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRepayBounce(src)).endCell());
        },
        parse: (src) => {
            return loadRepayBounce(src.loadRef().beginParse());
        }
    }
}

export type RescuePreparedRefused = {
    $$type: 'RescuePreparedRefused';
    nft: Address;
    operationId: bigint;
}

export function storeRescuePreparedRefused(src: RescuePreparedRefused) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983034, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadRescuePreparedRefused(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983034) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'RescuePreparedRefused' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleRescuePreparedRefused(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'RescuePreparedRefused' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleRescuePreparedRefused(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'RescuePreparedRefused' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleRescuePreparedRefused(source: RescuePreparedRefused) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserRescuePreparedRefused(): DictionaryValue<RescuePreparedRefused> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRescuePreparedRefused(src)).endCell());
        },
        parse: (src) => {
            return loadRescuePreparedRefused(src.loadRef().beginParse());
        }
    }
}

export type LoanConfirmed = {
    $$type: 'LoanConfirmed';
    nft: Address;
    operationId: bigint;
}

export function storeLoanConfirmed(src: LoanConfirmed) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983036, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadLoanConfirmed(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983036) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'LoanConfirmed' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleLoanConfirmed(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanConfirmed' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleLoanConfirmed(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'LoanConfirmed' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleLoanConfirmed(source: LoanConfirmed) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserLoanConfirmed(): DictionaryValue<LoanConfirmed> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLoanConfirmed(src)).endCell());
        },
        parse: (src) => {
            return loadLoanConfirmed(src.loadRef().beginParse());
        }
    }
}

export type NftReturnFailed = {
    $$type: 'NftReturnFailed';
    nft: Address;
    to: Address;
    operationId: bigint;
}

export function storeNftReturnFailed(src: NftReturnFailed) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983037, 32);
        b_0.storeAddress(src.nft);
        b_0.storeAddress(src.to);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadNftReturnFailed(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983037) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _to = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'NftReturnFailed' as const, nft: _nft, to: _to, operationId: _operationId };
}

export function loadTupleNftReturnFailed(source: TupleReader) {
    const _nft = source.readAddress();
    const _to = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'NftReturnFailed' as const, nft: _nft, to: _to, operationId: _operationId };
}

export function loadGetterTupleNftReturnFailed(source: TupleReader) {
    const _nft = source.readAddress();
    const _to = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'NftReturnFailed' as const, nft: _nft, to: _to, operationId: _operationId };
}

export function storeTupleNftReturnFailed(source: NftReturnFailed) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeAddress(source.to);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserNftReturnFailed(): DictionaryValue<NftReturnFailed> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftReturnFailed(src)).endCell());
        },
        parse: (src) => {
            return loadNftReturnFailed(src.loadRef().beginParse());
        }
    }
}

export type LtvRejected = {
    $$type: 'LtvRejected';
    nft: Address;
    operationId: bigint;
    principal: bigint;
    valuation: bigint;
}

export function storeLtvRejected(src: LtvRejected) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983041, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeCoins(src.principal);
        b_0.storeCoins(src.valuation);
    };
}

export function loadLtvRejected(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983041) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _principal = sc_0.loadCoins();
    const _valuation = sc_0.loadCoins();
    return { $$type: 'LtvRejected' as const, nft: _nft, operationId: _operationId, principal: _principal, valuation: _valuation };
}

export function loadTupleLtvRejected(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _principal = source.readBigNumber();
    const _valuation = source.readBigNumber();
    return { $$type: 'LtvRejected' as const, nft: _nft, operationId: _operationId, principal: _principal, valuation: _valuation };
}

export function loadGetterTupleLtvRejected(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _principal = source.readBigNumber();
    const _valuation = source.readBigNumber();
    return { $$type: 'LtvRejected' as const, nft: _nft, operationId: _operationId, principal: _principal, valuation: _valuation };
}

export function storeTupleLtvRejected(source: LtvRejected) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    builder.writeNumber(source.principal);
    builder.writeNumber(source.valuation);
    return builder.build();
}

export function dictValueParserLtvRejected(): DictionaryValue<LtvRejected> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLtvRejected(src)).endCell());
        },
        parse: (src) => {
            return loadLtvRejected(src.loadRef().beginParse());
        }
    }
}

export type LiquidationBounty = {
    $$type: 'LiquidationBounty';
    nft: Address;
    caller: Address;
    amount: bigint;
    operationId: bigint;
}

export function storeLiquidationBounty(src: LiquidationBounty) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983058, 32);
        b_0.storeAddress(src.nft);
        b_0.storeAddress(src.caller);
        b_0.storeCoins(src.amount);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadLiquidationBounty(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983058) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _caller = sc_0.loadAddress();
    const _amount = sc_0.loadCoins();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'LiquidationBounty' as const, nft: _nft, caller: _caller, amount: _amount, operationId: _operationId };
}

export function loadTupleLiquidationBounty(source: TupleReader) {
    const _nft = source.readAddress();
    const _caller = source.readAddress();
    const _amount = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'LiquidationBounty' as const, nft: _nft, caller: _caller, amount: _amount, operationId: _operationId };
}

export function loadGetterTupleLiquidationBounty(source: TupleReader) {
    const _nft = source.readAddress();
    const _caller = source.readAddress();
    const _amount = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'LiquidationBounty' as const, nft: _nft, caller: _caller, amount: _amount, operationId: _operationId };
}

export function storeTupleLiquidationBounty(source: LiquidationBounty) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeAddress(source.caller);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserLiquidationBounty(): DictionaryValue<LiquidationBounty> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidationBounty(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidationBounty(src.loadRef().beginParse());
        }
    }
}

export type LiquidationRefused = {
    $$type: 'LiquidationRefused';
    nft: Address;
    operationId: bigint;
    caller: Address;
}

export function storeLiquidationRefused(src: LiquidationRefused) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983060, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeAddress(src.caller);
    };
}

export function loadLiquidationRefused(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983060) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _caller = sc_0.loadAddress();
    return { $$type: 'LiquidationRefused' as const, nft: _nft, operationId: _operationId, caller: _caller };
}

export function loadTupleLiquidationRefused(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _caller = source.readAddress();
    return { $$type: 'LiquidationRefused' as const, nft: _nft, operationId: _operationId, caller: _caller };
}

export function loadGetterTupleLiquidationRefused(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _caller = source.readAddress();
    return { $$type: 'LiquidationRefused' as const, nft: _nft, operationId: _operationId, caller: _caller };
}

export function storeTupleLiquidationRefused(source: LiquidationRefused) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    builder.writeAddress(source.caller);
    return builder.build();
}

export function dictValueParserLiquidationRefused(): DictionaryValue<LiquidationRefused> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidationRefused(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidationRefused(src.loadRef().beginParse());
        }
    }
}

export type ExtensionSyncAck = {
    $$type: 'ExtensionSyncAck';
    nft: Address;
    operationId: bigint;
    totalExtendedDays: bigint;
    newDueAt: bigint;
    newRepay: bigint;
    interestPaid: boolean;
}

export function storeExtensionSyncAck(src: ExtensionSyncAck) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983061, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeUint(src.totalExtendedDays, 8);
        b_0.storeUint(src.newDueAt, 32);
        b_0.storeCoins(src.newRepay);
        b_0.storeBit(src.interestPaid);
    };
}

export function loadExtensionSyncAck(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983061) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _totalExtendedDays = sc_0.loadUintBig(8);
    const _newDueAt = sc_0.loadUintBig(32);
    const _newRepay = sc_0.loadCoins();
    const _interestPaid = sc_0.loadBit();
    return { $$type: 'ExtensionSyncAck' as const, nft: _nft, operationId: _operationId, totalExtendedDays: _totalExtendedDays, newDueAt: _newDueAt, newRepay: _newRepay, interestPaid: _interestPaid };
}

export function loadTupleExtensionSyncAck(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _totalExtendedDays = source.readBigNumber();
    const _newDueAt = source.readBigNumber();
    const _newRepay = source.readBigNumber();
    const _interestPaid = source.readBoolean();
    return { $$type: 'ExtensionSyncAck' as const, nft: _nft, operationId: _operationId, totalExtendedDays: _totalExtendedDays, newDueAt: _newDueAt, newRepay: _newRepay, interestPaid: _interestPaid };
}

export function loadGetterTupleExtensionSyncAck(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _totalExtendedDays = source.readBigNumber();
    const _newDueAt = source.readBigNumber();
    const _newRepay = source.readBigNumber();
    const _interestPaid = source.readBoolean();
    return { $$type: 'ExtensionSyncAck' as const, nft: _nft, operationId: _operationId, totalExtendedDays: _totalExtendedDays, newDueAt: _newDueAt, newRepay: _newRepay, interestPaid: _interestPaid };
}

export function storeTupleExtensionSyncAck(source: ExtensionSyncAck) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    builder.writeNumber(source.totalExtendedDays);
    builder.writeNumber(source.newDueAt);
    builder.writeNumber(source.newRepay);
    builder.writeBoolean(source.interestPaid);
    return builder.build();
}

export function dictValueParserExtensionSyncAck(): DictionaryValue<ExtensionSyncAck> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExtensionSyncAck(src)).endCell());
        },
        parse: (src) => {
            return loadExtensionSyncAck(src.loadRef().beginParse());
        }
    }
}

export type ResyncExtension = {
    $$type: 'ResyncExtension';
}

export function storeResyncExtension(src: ResyncExtension) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983062, 32);
    };
}

export function loadResyncExtension(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983062) { throw Error('Invalid prefix'); }
    return { $$type: 'ResyncExtension' as const };
}

export function loadTupleResyncExtension(source: TupleReader) {
    return { $$type: 'ResyncExtension' as const };
}

export function loadGetterTupleResyncExtension(source: TupleReader) {
    return { $$type: 'ResyncExtension' as const };
}

export function storeTupleResyncExtension(source: ResyncExtension) {
    const builder = new TupleBuilder();
    return builder.build();
}

export function dictValueParserResyncExtension(): DictionaryValue<ResyncExtension> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeResyncExtension(src)).endCell());
        },
        parse: (src) => {
            return loadResyncExtension(src.loadRef().beginParse());
        }
    }
}

export type ExtensionSyncBounce = {
    $$type: 'ExtensionSyncBounce';
    nft: Address;
    operationId: bigint;
    stage: bigint;
}

export function storeExtensionSyncBounce(src: ExtensionSyncBounce) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983063, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeUint(src.stage, 8);
    };
}

export function loadExtensionSyncBounce(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983063) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _stage = sc_0.loadUintBig(8);
    return { $$type: 'ExtensionSyncBounce' as const, nft: _nft, operationId: _operationId, stage: _stage };
}

export function loadTupleExtensionSyncBounce(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _stage = source.readBigNumber();
    return { $$type: 'ExtensionSyncBounce' as const, nft: _nft, operationId: _operationId, stage: _stage };
}

export function loadGetterTupleExtensionSyncBounce(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _stage = source.readBigNumber();
    return { $$type: 'ExtensionSyncBounce' as const, nft: _nft, operationId: _operationId, stage: _stage };
}

export function storeTupleExtensionSyncBounce(source: ExtensionSyncBounce) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    builder.writeNumber(source.stage);
    return builder.build();
}

export function dictValueParserExtensionSyncBounce(): DictionaryValue<ExtensionSyncBounce> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExtensionSyncBounce(src)).endCell());
        },
        parse: (src) => {
            return loadExtensionSyncBounce(src.loadRef().beginParse());
        }
    }
}

export type SetLiquidator = {
    $$type: 'SetLiquidator';
    to: Address | null;
}

export function storeSetLiquidator(src: SetLiquidator) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983064, 32);
        b_0.storeAddress(src.to);
    };
}

export function loadSetLiquidator(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983064) { throw Error('Invalid prefix'); }
    const _to = sc_0.loadMaybeAddress();
    return { $$type: 'SetLiquidator' as const, to: _to };
}

export function loadTupleSetLiquidator(source: TupleReader) {
    const _to = source.readAddressOpt();
    return { $$type: 'SetLiquidator' as const, to: _to };
}

export function loadGetterTupleSetLiquidator(source: TupleReader) {
    const _to = source.readAddressOpt();
    return { $$type: 'SetLiquidator' as const, to: _to };
}

export function storeTupleSetLiquidator(source: SetLiquidator) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.to);
    return builder.build();
}

export function dictValueParserSetLiquidator(): DictionaryValue<SetLiquidator> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetLiquidator(src)).endCell());
        },
        parse: (src) => {
            return loadSetLiquidator(src.loadRef().beginParse());
        }
    }
}

export type LiquidationDone = {
    $$type: 'LiquidationDone';
    nft: Address;
    operationId: bigint;
    caller: Address;
}

export function storeLiquidationDone(src: LiquidationDone) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983065, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeAddress(src.caller);
    };
}

export function loadLiquidationDone(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983065) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _caller = sc_0.loadAddress();
    return { $$type: 'LiquidationDone' as const, nft: _nft, operationId: _operationId, caller: _caller };
}

export function loadTupleLiquidationDone(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _caller = source.readAddress();
    return { $$type: 'LiquidationDone' as const, nft: _nft, operationId: _operationId, caller: _caller };
}

export function loadGetterTupleLiquidationDone(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _caller = source.readAddress();
    return { $$type: 'LiquidationDone' as const, nft: _nft, operationId: _operationId, caller: _caller };
}

export function storeTupleLiquidationDone(source: LiquidationDone) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    builder.writeAddress(source.caller);
    return builder.build();
}

export function dictValueParserLiquidationDone(): DictionaryValue<LiquidationDone> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidationDone(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidationDone(src.loadRef().beginParse());
        }
    }
}

export type LiquidationNftBounce = {
    $$type: 'LiquidationNftBounce';
    nft: Address;
    operationId: bigint;
    attemptId: bigint;
}

export function storeLiquidationNftBounce(src: LiquidationNftBounce) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983088, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeUint(src.attemptId, 32);
    };
}

export function loadLiquidationNftBounce(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983088) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _attemptId = sc_0.loadUintBig(32);
    return { $$type: 'LiquidationNftBounce' as const, nft: _nft, operationId: _operationId, attemptId: _attemptId };
}

export function loadTupleLiquidationNftBounce(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _attemptId = source.readBigNumber();
    return { $$type: 'LiquidationNftBounce' as const, nft: _nft, operationId: _operationId, attemptId: _attemptId };
}

export function loadGetterTupleLiquidationNftBounce(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _attemptId = source.readBigNumber();
    return { $$type: 'LiquidationNftBounce' as const, nft: _nft, operationId: _operationId, attemptId: _attemptId };
}

export function storeTupleLiquidationNftBounce(source: LiquidationNftBounce) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    builder.writeNumber(source.attemptId);
    return builder.build();
}

export function dictValueParserLiquidationNftBounce(): DictionaryValue<LiquidationNftBounce> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidationNftBounce(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidationNftBounce(src.loadRef().beginParse());
        }
    }
}

export type LiquidationConfirmed = {
    $$type: 'LiquidationConfirmed';
    nft: Address;
    operationId: bigint;
    attemptId: bigint;
}

export function storeLiquidationConfirmed(src: LiquidationConfirmed) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983089, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeUint(src.attemptId, 32);
    };
}

export function loadLiquidationConfirmed(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983089) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _attemptId = sc_0.loadUintBig(32);
    return { $$type: 'LiquidationConfirmed' as const, nft: _nft, operationId: _operationId, attemptId: _attemptId };
}

export function loadTupleLiquidationConfirmed(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _attemptId = source.readBigNumber();
    return { $$type: 'LiquidationConfirmed' as const, nft: _nft, operationId: _operationId, attemptId: _attemptId };
}

export function loadGetterTupleLiquidationConfirmed(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _attemptId = source.readBigNumber();
    return { $$type: 'LiquidationConfirmed' as const, nft: _nft, operationId: _operationId, attemptId: _attemptId };
}

export function storeTupleLiquidationConfirmed(source: LiquidationConfirmed) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    builder.writeNumber(source.attemptId);
    return builder.build();
}

export function dictValueParserLiquidationConfirmed(): DictionaryValue<LiquidationConfirmed> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidationConfirmed(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidationConfirmed(src.loadRef().beginParse());
        }
    }
}

export type LiquidationConfirmationAck = {
    $$type: 'LiquidationConfirmationAck';
    nft: Address;
    operationId: bigint;
    attemptId: bigint;
}

export function storeLiquidationConfirmationAck(src: LiquidationConfirmationAck) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983090, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeUint(src.attemptId, 32);
    };
}

export function loadLiquidationConfirmationAck(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983090) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _attemptId = sc_0.loadUintBig(32);
    return { $$type: 'LiquidationConfirmationAck' as const, nft: _nft, operationId: _operationId, attemptId: _attemptId };
}

export function loadTupleLiquidationConfirmationAck(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _attemptId = source.readBigNumber();
    return { $$type: 'LiquidationConfirmationAck' as const, nft: _nft, operationId: _operationId, attemptId: _attemptId };
}

export function loadGetterTupleLiquidationConfirmationAck(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _attemptId = source.readBigNumber();
    return { $$type: 'LiquidationConfirmationAck' as const, nft: _nft, operationId: _operationId, attemptId: _attemptId };
}

export function storeTupleLiquidationConfirmationAck(source: LiquidationConfirmationAck) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    builder.writeNumber(source.attemptId);
    return builder.build();
}

export function dictValueParserLiquidationConfirmationAck(): DictionaryValue<LiquidationConfirmationAck> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidationConfirmationAck(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidationConfirmationAck(src.loadRef().beginParse());
        }
    }
}

export type ExtensionInterestPayment = {
    $$type: 'ExtensionInterestPayment';
    nft: Address;
    operationId: bigint;
    totalExtendedDays: bigint;
    amount: bigint;
}

export function storeExtensionInterestPayment(src: ExtensionInterestPayment) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983091, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeUint(src.totalExtendedDays, 8);
        b_0.storeCoins(src.amount);
    };
}

export function loadExtensionInterestPayment(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983091) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _totalExtendedDays = sc_0.loadUintBig(8);
    const _amount = sc_0.loadCoins();
    return { $$type: 'ExtensionInterestPayment' as const, nft: _nft, operationId: _operationId, totalExtendedDays: _totalExtendedDays, amount: _amount };
}

export function loadTupleExtensionInterestPayment(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _totalExtendedDays = source.readBigNumber();
    const _amount = source.readBigNumber();
    return { $$type: 'ExtensionInterestPayment' as const, nft: _nft, operationId: _operationId, totalExtendedDays: _totalExtendedDays, amount: _amount };
}

export function loadGetterTupleExtensionInterestPayment(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _totalExtendedDays = source.readBigNumber();
    const _amount = source.readBigNumber();
    return { $$type: 'ExtensionInterestPayment' as const, nft: _nft, operationId: _operationId, totalExtendedDays: _totalExtendedDays, amount: _amount };
}

export function storeTupleExtensionInterestPayment(source: ExtensionInterestPayment) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    builder.writeNumber(source.totalExtendedDays);
    builder.writeNumber(source.amount);
    return builder.build();
}

export function dictValueParserExtensionInterestPayment(): DictionaryValue<ExtensionInterestPayment> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExtensionInterestPayment(src)).endCell());
        },
        parse: (src) => {
            return loadExtensionInterestPayment(src.loadRef().beginParse());
        }
    }
}

export type ExtensionInterestPaid = {
    $$type: 'ExtensionInterestPaid';
    nft: Address;
    operationId: bigint;
    totalExtendedDays: bigint;
}

export function storeExtensionInterestPaid(src: ExtensionInterestPaid) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983092, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeUint(src.totalExtendedDays, 8);
    };
}

export function loadExtensionInterestPaid(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983092) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _totalExtendedDays = sc_0.loadUintBig(8);
    return { $$type: 'ExtensionInterestPaid' as const, nft: _nft, operationId: _operationId, totalExtendedDays: _totalExtendedDays };
}

export function loadTupleExtensionInterestPaid(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _totalExtendedDays = source.readBigNumber();
    return { $$type: 'ExtensionInterestPaid' as const, nft: _nft, operationId: _operationId, totalExtendedDays: _totalExtendedDays };
}

export function loadGetterTupleExtensionInterestPaid(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _totalExtendedDays = source.readBigNumber();
    return { $$type: 'ExtensionInterestPaid' as const, nft: _nft, operationId: _operationId, totalExtendedDays: _totalExtendedDays };
}

export function storeTupleExtensionInterestPaid(source: ExtensionInterestPaid) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    builder.writeNumber(source.totalExtendedDays);
    return builder.build();
}

export function dictValueParserExtensionInterestPaid(): DictionaryValue<ExtensionInterestPaid> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExtensionInterestPaid(src)).endCell());
        },
        parse: (src) => {
            return loadExtensionInterestPaid(src.loadRef().beginParse());
        }
    }
}

export type ResyncExtensionFor = {
    $$type: 'ResyncExtensionFor';
    nft: Address;
    operationId: bigint;
}

export function storeResyncExtensionFor(src: ResyncExtensionFor) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983068, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadResyncExtensionFor(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983068) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'ResyncExtensionFor' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleResyncExtensionFor(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'ResyncExtensionFor' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleResyncExtensionFor(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'ResyncExtensionFor' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleResyncExtensionFor(source: ResyncExtensionFor) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserResyncExtensionFor(): DictionaryValue<ResyncExtensionFor> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeResyncExtensionFor(src)).endCell());
        },
        parse: (src) => {
            return loadResyncExtensionFor(src.loadRef().beginParse());
        }
    }
}

export type ResendReject = {
    $$type: 'ResendReject';
    nft: Address;
    operationId: bigint;
}

export function storeResendReject(src: ResendReject) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983094, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadResendReject(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983094) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'ResendReject' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleResendReject(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'ResendReject' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleResendReject(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'ResendReject' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleResendReject(source: ResendReject) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserResendReject(): DictionaryValue<ResendReject> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeResendReject(src)).endCell());
        },
        parse: (src) => {
            return loadResendReject(src.loadRef().beginParse());
        }
    }
}

export type OwnerForceLiquidate = {
    $$type: 'OwnerForceLiquidate';
    nft: Address;
}

export function storeOwnerForceLiquidate(src: OwnerForceLiquidate) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983095, 32);
        b_0.storeAddress(src.nft);
    };
}

export function loadOwnerForceLiquidate(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983095) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    return { $$type: 'OwnerForceLiquidate' as const, nft: _nft };
}

export function loadTupleOwnerForceLiquidate(source: TupleReader) {
    const _nft = source.readAddress();
    return { $$type: 'OwnerForceLiquidate' as const, nft: _nft };
}

export function loadGetterTupleOwnerForceLiquidate(source: TupleReader) {
    const _nft = source.readAddress();
    return { $$type: 'OwnerForceLiquidate' as const, nft: _nft };
}

export function storeTupleOwnerForceLiquidate(source: OwnerForceLiquidate) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    return builder.build();
}

export function dictValueParserOwnerForceLiquidate(): DictionaryValue<OwnerForceLiquidate> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOwnerForceLiquidate(src)).endCell());
        },
        parse: (src) => {
            return loadOwnerForceLiquidate(src.loadRef().beginParse());
        }
    }
}

export type OwnerAbortLiquidation = {
    $$type: 'OwnerAbortLiquidation';
    nft: Address;
    operationId: bigint;
}

export function storeOwnerAbortLiquidation(src: OwnerAbortLiquidation) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983096, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadOwnerAbortLiquidation(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983096) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'OwnerAbortLiquidation' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleOwnerAbortLiquidation(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'OwnerAbortLiquidation' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleOwnerAbortLiquidation(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'OwnerAbortLiquidation' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleOwnerAbortLiquidation(source: OwnerAbortLiquidation) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserOwnerAbortLiquidation(): DictionaryValue<OwnerAbortLiquidation> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOwnerAbortLiquidation(src)).endCell());
        },
        parse: (src) => {
            return loadOwnerAbortLiquidation(src.loadRef().beginParse());
        }
    }
}

export type AbortLiquidation = {
    $$type: 'AbortLiquidation';
    attemptId: bigint;
    operationId: bigint;
    nft: Address;
}

export function storeAbortLiquidation(src: AbortLiquidation) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983097, 32);
        b_0.storeUint(src.attemptId, 32);
        b_0.storeUint(src.operationId, 32);
        b_0.storeAddress(src.nft);
    };
}

export function loadAbortLiquidation(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983097) { throw Error('Invalid prefix'); }
    const _attemptId = sc_0.loadUintBig(32);
    const _operationId = sc_0.loadUintBig(32);
    const _nft = sc_0.loadAddress();
    return { $$type: 'AbortLiquidation' as const, attemptId: _attemptId, operationId: _operationId, nft: _nft };
}

export function loadTupleAbortLiquidation(source: TupleReader) {
    const _attemptId = source.readBigNumber();
    const _operationId = source.readBigNumber();
    const _nft = source.readAddress();
    return { $$type: 'AbortLiquidation' as const, attemptId: _attemptId, operationId: _operationId, nft: _nft };
}

export function loadGetterTupleAbortLiquidation(source: TupleReader) {
    const _attemptId = source.readBigNumber();
    const _operationId = source.readBigNumber();
    const _nft = source.readAddress();
    return { $$type: 'AbortLiquidation' as const, attemptId: _attemptId, operationId: _operationId, nft: _nft };
}

export function storeTupleAbortLiquidation(source: AbortLiquidation) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.attemptId);
    builder.writeNumber(source.operationId);
    builder.writeAddress(source.nft);
    return builder.build();
}

export function dictValueParserAbortLiquidation(): DictionaryValue<AbortLiquidation> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAbortLiquidation(src)).endCell());
        },
        parse: (src) => {
            return loadAbortLiquidation(src.loadRef().beginParse());
        }
    }
}

export type LiquidationAbortAck = {
    $$type: 'LiquidationAbortAck';
    nft: Address;
    operationId: bigint;
    attemptId: bigint;
}

export function storeLiquidationAbortAck(src: LiquidationAbortAck) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983100, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeUint(src.attemptId, 32);
    };
}

export function loadLiquidationAbortAck(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983100) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _attemptId = sc_0.loadUintBig(32);
    return { $$type: 'LiquidationAbortAck' as const, nft: _nft, operationId: _operationId, attemptId: _attemptId };
}

export function loadTupleLiquidationAbortAck(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _attemptId = source.readBigNumber();
    return { $$type: 'LiquidationAbortAck' as const, nft: _nft, operationId: _operationId, attemptId: _attemptId };
}

export function loadGetterTupleLiquidationAbortAck(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _attemptId = source.readBigNumber();
    return { $$type: 'LiquidationAbortAck' as const, nft: _nft, operationId: _operationId, attemptId: _attemptId };
}

export function storeTupleLiquidationAbortAck(source: LiquidationAbortAck) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    builder.writeNumber(source.attemptId);
    return builder.build();
}

export function dictValueParserLiquidationAbortAck(): DictionaryValue<LiquidationAbortAck> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidationAbortAck(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidationAbortAck(src.loadRef().beginParse());
        }
    }
}

export type ResendLiquidationAbort = {
    $$type: 'ResendLiquidationAbort';
    nft: Address;
    operationId: bigint;
}

export function storeResendLiquidationAbort(src: ResendLiquidationAbort) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983101, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadResendLiquidationAbort(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983101) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'ResendLiquidationAbort' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleResendLiquidationAbort(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'ResendLiquidationAbort' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleResendLiquidationAbort(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'ResendLiquidationAbort' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleResendLiquidationAbort(source: ResendLiquidationAbort) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserResendLiquidationAbort(): DictionaryValue<ResendLiquidationAbort> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeResendLiquidationAbort(src)).endCell());
        },
        parse: (src) => {
            return loadResendLiquidationAbort(src.loadRef().beginParse());
        }
    }
}

export type LiquidationAbortConfirmed = {
    $$type: 'LiquidationAbortConfirmed';
    attemptId: bigint;
    operationId: bigint;
    nft: Address;
}

export function storeLiquidationAbortConfirmed(src: LiquidationAbortConfirmed) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983102, 32);
        b_0.storeUint(src.attemptId, 32);
        b_0.storeUint(src.operationId, 32);
        b_0.storeAddress(src.nft);
    };
}

export function loadLiquidationAbortConfirmed(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983102) { throw Error('Invalid prefix'); }
    const _attemptId = sc_0.loadUintBig(32);
    const _operationId = sc_0.loadUintBig(32);
    const _nft = sc_0.loadAddress();
    return { $$type: 'LiquidationAbortConfirmed' as const, attemptId: _attemptId, operationId: _operationId, nft: _nft };
}

export function loadTupleLiquidationAbortConfirmed(source: TupleReader) {
    const _attemptId = source.readBigNumber();
    const _operationId = source.readBigNumber();
    const _nft = source.readAddress();
    return { $$type: 'LiquidationAbortConfirmed' as const, attemptId: _attemptId, operationId: _operationId, nft: _nft };
}

export function loadGetterTupleLiquidationAbortConfirmed(source: TupleReader) {
    const _attemptId = source.readBigNumber();
    const _operationId = source.readBigNumber();
    const _nft = source.readAddress();
    return { $$type: 'LiquidationAbortConfirmed' as const, attemptId: _attemptId, operationId: _operationId, nft: _nft };
}

export function storeTupleLiquidationAbortConfirmed(source: LiquidationAbortConfirmed) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.attemptId);
    builder.writeNumber(source.operationId);
    builder.writeAddress(source.nft);
    return builder.build();
}

export function dictValueParserLiquidationAbortConfirmed(): DictionaryValue<LiquidationAbortConfirmed> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidationAbortConfirmed(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidationAbortConfirmed(src.loadRef().beginParse());
        }
    }
}

export type LiquidationAbortFinalAck = {
    $$type: 'LiquidationAbortFinalAck';
    nft: Address;
    operationId: bigint;
    attemptId: bigint;
}

export function storeLiquidationAbortFinalAck(src: LiquidationAbortFinalAck) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983103, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeUint(src.attemptId, 32);
    };
}

export function loadLiquidationAbortFinalAck(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983103) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _attemptId = sc_0.loadUintBig(32);
    return { $$type: 'LiquidationAbortFinalAck' as const, nft: _nft, operationId: _operationId, attemptId: _attemptId };
}

export function loadTupleLiquidationAbortFinalAck(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _attemptId = source.readBigNumber();
    return { $$type: 'LiquidationAbortFinalAck' as const, nft: _nft, operationId: _operationId, attemptId: _attemptId };
}

export function loadGetterTupleLiquidationAbortFinalAck(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _attemptId = source.readBigNumber();
    return { $$type: 'LiquidationAbortFinalAck' as const, nft: _nft, operationId: _operationId, attemptId: _attemptId };
}

export function storeTupleLiquidationAbortFinalAck(source: LiquidationAbortFinalAck) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    builder.writeNumber(source.attemptId);
    return builder.build();
}

export function dictValueParserLiquidationAbortFinalAck(): DictionaryValue<LiquidationAbortFinalAck> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidationAbortFinalAck(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidationAbortFinalAck(src.loadRef().beginParse());
        }
    }
}

export type PrepareEscrow = {
    $$type: 'PrepareEscrow';
    nft: Address;
    operationId: bigint;
}

export function storePrepareEscrow(src: PrepareEscrow) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983104, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadPrepareEscrow(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983104) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'PrepareEscrow' as const, nft: _nft, operationId: _operationId };
}

export function loadTuplePrepareEscrow(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'PrepareEscrow' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTuplePrepareEscrow(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'PrepareEscrow' as const, nft: _nft, operationId: _operationId };
}

export function storeTuplePrepareEscrow(source: PrepareEscrow) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserPrepareEscrow(): DictionaryValue<PrepareEscrow> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePrepareEscrow(src)).endCell());
        },
        parse: (src) => {
            return loadPrepareEscrow(src.loadRef().beginParse());
        }
    }
}

export type EscrowBootstrap = {
    $$type: 'EscrowBootstrap';
    nft: Address;
    operationId: bigint;
}

export function storeEscrowBootstrap(src: EscrowBootstrap) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983105, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadEscrowBootstrap(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983105) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'EscrowBootstrap' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleEscrowBootstrap(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'EscrowBootstrap' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleEscrowBootstrap(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'EscrowBootstrap' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleEscrowBootstrap(source: EscrowBootstrap) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserEscrowBootstrap(): DictionaryValue<EscrowBootstrap> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEscrowBootstrap(src)).endCell());
        },
        parse: (src) => {
            return loadEscrowBootstrap(src.loadRef().beginParse());
        }
    }
}

export type EscrowReady = {
    $$type: 'EscrowReady';
    nft: Address;
    operationId: bigint;
}

export function storeEscrowReady(src: EscrowReady) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983106, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
    };
}

export function loadEscrowReady(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983106) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    return { $$type: 'EscrowReady' as const, nft: _nft, operationId: _operationId };
}

export function loadTupleEscrowReady(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'EscrowReady' as const, nft: _nft, operationId: _operationId };
}

export function loadGetterTupleEscrowReady(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    return { $$type: 'EscrowReady' as const, nft: _nft, operationId: _operationId };
}

export function storeTupleEscrowReady(source: EscrowReady) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserEscrowReady(): DictionaryValue<EscrowReady> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEscrowReady(src)).endCell());
        },
        parse: (src) => {
            return loadEscrowReady(src.loadRef().beginParse());
        }
    }
}

export type LiquidationAborted = {
    $$type: 'LiquidationAborted';
    nft: Address;
    operationId: bigint;
    reason: bigint;
}

export function storeLiquidationAborted(src: LiquidationAborted) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983098, 32);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.operationId, 32);
        b_0.storeUint(src.reason, 8);
    };
}

export function loadLiquidationAborted(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983098) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _operationId = sc_0.loadUintBig(32);
    const _reason = sc_0.loadUintBig(8);
    return { $$type: 'LiquidationAborted' as const, nft: _nft, operationId: _operationId, reason: _reason };
}

export function loadTupleLiquidationAborted(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _reason = source.readBigNumber();
    return { $$type: 'LiquidationAborted' as const, nft: _nft, operationId: _operationId, reason: _reason };
}

export function loadGetterTupleLiquidationAborted(source: TupleReader) {
    const _nft = source.readAddress();
    const _operationId = source.readBigNumber();
    const _reason = source.readBigNumber();
    return { $$type: 'LiquidationAborted' as const, nft: _nft, operationId: _operationId, reason: _reason };
}

export function storeTupleLiquidationAborted(source: LiquidationAborted) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeNumber(source.operationId);
    builder.writeNumber(source.reason);
    return builder.build();
}

export function dictValueParserLiquidationAborted(): DictionaryValue<LiquidationAborted> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidationAborted(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidationAborted(src.loadRef().beginParse());
        }
    }
}

export type ExtensionRecovery = {
    $$type: 'ExtensionRecovery';
    nft: Address;
    borrower: Address;
    principal: bigint;
    ratePerDayBps: bigint;
    extensionDays: bigint;
    totalExtendedDays: bigint;
    extraInterest: bigint;
    paidInterest: bigint;
    newDueAt: bigint;
    newRepay: bigint;
    operationId: bigint;
}

export function storeExtensionRecovery(src: ExtensionRecovery) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2953983067, 32);
        b_0.storeAddress(src.nft);
        b_0.storeAddress(src.borrower);
        b_0.storeCoins(src.principal);
        b_0.storeUint(src.ratePerDayBps, 32);
        b_0.storeUint(src.extensionDays, 8);
        b_0.storeUint(src.totalExtendedDays, 8);
        b_0.storeCoins(src.extraInterest);
        b_0.storeCoins(src.paidInterest);
        b_0.storeUint(src.newDueAt, 32);
        const b_1 = new Builder();
        b_1.storeCoins(src.newRepay);
        b_1.storeUint(src.operationId, 32);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadExtensionRecovery(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2953983067) { throw Error('Invalid prefix'); }
    const _nft = sc_0.loadAddress();
    const _borrower = sc_0.loadAddress();
    const _principal = sc_0.loadCoins();
    const _ratePerDayBps = sc_0.loadUintBig(32);
    const _extensionDays = sc_0.loadUintBig(8);
    const _totalExtendedDays = sc_0.loadUintBig(8);
    const _extraInterest = sc_0.loadCoins();
    const _paidInterest = sc_0.loadCoins();
    const _newDueAt = sc_0.loadUintBig(32);
    const sc_1 = sc_0.loadRef().beginParse();
    const _newRepay = sc_1.loadCoins();
    const _operationId = sc_1.loadUintBig(32);
    return { $$type: 'ExtensionRecovery' as const, nft: _nft, borrower: _borrower, principal: _principal, ratePerDayBps: _ratePerDayBps, extensionDays: _extensionDays, totalExtendedDays: _totalExtendedDays, extraInterest: _extraInterest, paidInterest: _paidInterest, newDueAt: _newDueAt, newRepay: _newRepay, operationId: _operationId };
}

export function loadTupleExtensionRecovery(source: TupleReader) {
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _principal = source.readBigNumber();
    const _ratePerDayBps = source.readBigNumber();
    const _extensionDays = source.readBigNumber();
    const _totalExtendedDays = source.readBigNumber();
    const _extraInterest = source.readBigNumber();
    const _paidInterest = source.readBigNumber();
    const _newDueAt = source.readBigNumber();
    const _newRepay = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'ExtensionRecovery' as const, nft: _nft, borrower: _borrower, principal: _principal, ratePerDayBps: _ratePerDayBps, extensionDays: _extensionDays, totalExtendedDays: _totalExtendedDays, extraInterest: _extraInterest, paidInterest: _paidInterest, newDueAt: _newDueAt, newRepay: _newRepay, operationId: _operationId };
}

export function loadGetterTupleExtensionRecovery(source: TupleReader) {
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _principal = source.readBigNumber();
    const _ratePerDayBps = source.readBigNumber();
    const _extensionDays = source.readBigNumber();
    const _totalExtendedDays = source.readBigNumber();
    const _extraInterest = source.readBigNumber();
    const _paidInterest = source.readBigNumber();
    const _newDueAt = source.readBigNumber();
    const _newRepay = source.readBigNumber();
    const _operationId = source.readBigNumber();
    return { $$type: 'ExtensionRecovery' as const, nft: _nft, borrower: _borrower, principal: _principal, ratePerDayBps: _ratePerDayBps, extensionDays: _extensionDays, totalExtendedDays: _totalExtendedDays, extraInterest: _extraInterest, paidInterest: _paidInterest, newDueAt: _newDueAt, newRepay: _newRepay, operationId: _operationId };
}

export function storeTupleExtensionRecovery(source: ExtensionRecovery) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.nft);
    builder.writeAddress(source.borrower);
    builder.writeNumber(source.principal);
    builder.writeNumber(source.ratePerDayBps);
    builder.writeNumber(source.extensionDays);
    builder.writeNumber(source.totalExtendedDays);
    builder.writeNumber(source.extraInterest);
    builder.writeNumber(source.paidInterest);
    builder.writeNumber(source.newDueAt);
    builder.writeNumber(source.newRepay);
    builder.writeNumber(source.operationId);
    return builder.build();
}

export function dictValueParserExtensionRecovery(): DictionaryValue<ExtensionRecovery> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExtensionRecovery(src)).endCell());
        },
        parse: (src) => {
            return loadExtensionRecovery(src.loadRef().beginParse());
        }
    }
}

export type OpInfo = {
    $$type: 'OpInfo';
    state: bigint;
    prevState: bigint;
    principal: bigint;
    repay: bigint;
    dueAt: bigint;
    pending: bigint;
    ratePerDay: bigint;
    extendedDays: bigint;
    paidInterest: bigint;
    opId: bigint;
    nft: Address;
    borrower: Address;
    liquidator: Address | null;
    liquidationTo: Address | null;
    liquidationAttempt: bigint;
    liquidationRetryReady: boolean;
    liquidationConfirmPending: boolean;
    extensionInterestPaidDays: bigint;
    lastExtensionExtra: bigint;
    since: bigint;
}

export function storeOpInfo(src: OpInfo) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.state, 8);
        b_0.storeUint(src.prevState, 8);
        b_0.storeCoins(src.principal);
        b_0.storeCoins(src.repay);
        b_0.storeUint(src.dueAt, 32);
        b_0.storeCoins(src.pending);
        b_0.storeUint(src.ratePerDay, 32);
        b_0.storeUint(src.extendedDays, 8);
        b_0.storeCoins(src.paidInterest);
        b_0.storeUint(src.opId, 32);
        b_0.storeAddress(src.nft);
        const b_1 = new Builder();
        b_1.storeAddress(src.borrower);
        b_1.storeAddress(src.liquidator);
        b_1.storeAddress(src.liquidationTo);
        b_1.storeUint(src.liquidationAttempt, 32);
        b_1.storeBit(src.liquidationRetryReady);
        b_1.storeBit(src.liquidationConfirmPending);
        b_1.storeUint(src.extensionInterestPaidDays, 8);
        b_1.storeCoins(src.lastExtensionExtra);
        b_1.storeUint(src.since, 32);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadOpInfo(slice: Slice) {
    const sc_0 = slice;
    const _state = sc_0.loadUintBig(8);
    const _prevState = sc_0.loadUintBig(8);
    const _principal = sc_0.loadCoins();
    const _repay = sc_0.loadCoins();
    const _dueAt = sc_0.loadUintBig(32);
    const _pending = sc_0.loadCoins();
    const _ratePerDay = sc_0.loadUintBig(32);
    const _extendedDays = sc_0.loadUintBig(8);
    const _paidInterest = sc_0.loadCoins();
    const _opId = sc_0.loadUintBig(32);
    const _nft = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _borrower = sc_1.loadAddress();
    const _liquidator = sc_1.loadMaybeAddress();
    const _liquidationTo = sc_1.loadMaybeAddress();
    const _liquidationAttempt = sc_1.loadUintBig(32);
    const _liquidationRetryReady = sc_1.loadBit();
    const _liquidationConfirmPending = sc_1.loadBit();
    const _extensionInterestPaidDays = sc_1.loadUintBig(8);
    const _lastExtensionExtra = sc_1.loadCoins();
    const _since = sc_1.loadUintBig(32);
    return { $$type: 'OpInfo' as const, state: _state, prevState: _prevState, principal: _principal, repay: _repay, dueAt: _dueAt, pending: _pending, ratePerDay: _ratePerDay, extendedDays: _extendedDays, paidInterest: _paidInterest, opId: _opId, nft: _nft, borrower: _borrower, liquidator: _liquidator, liquidationTo: _liquidationTo, liquidationAttempt: _liquidationAttempt, liquidationRetryReady: _liquidationRetryReady, liquidationConfirmPending: _liquidationConfirmPending, extensionInterestPaidDays: _extensionInterestPaidDays, lastExtensionExtra: _lastExtensionExtra, since: _since };
}

export function loadTupleOpInfo(source: TupleReader) {
    const _state = source.readBigNumber();
    const _prevState = source.readBigNumber();
    const _principal = source.readBigNumber();
    const _repay = source.readBigNumber();
    const _dueAt = source.readBigNumber();
    const _pending = source.readBigNumber();
    const _ratePerDay = source.readBigNumber();
    const _extendedDays = source.readBigNumber();
    const _paidInterest = source.readBigNumber();
    const _opId = source.readBigNumber();
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _liquidator = source.readAddressOpt();
    const _liquidationTo = source.readAddressOpt();
    source = source.readTuple();
    const _liquidationAttempt = source.readBigNumber();
    const _liquidationRetryReady = source.readBoolean();
    const _liquidationConfirmPending = source.readBoolean();
    const _extensionInterestPaidDays = source.readBigNumber();
    const _lastExtensionExtra = source.readBigNumber();
    const _since = source.readBigNumber();
    return { $$type: 'OpInfo' as const, state: _state, prevState: _prevState, principal: _principal, repay: _repay, dueAt: _dueAt, pending: _pending, ratePerDay: _ratePerDay, extendedDays: _extendedDays, paidInterest: _paidInterest, opId: _opId, nft: _nft, borrower: _borrower, liquidator: _liquidator, liquidationTo: _liquidationTo, liquidationAttempt: _liquidationAttempt, liquidationRetryReady: _liquidationRetryReady, liquidationConfirmPending: _liquidationConfirmPending, extensionInterestPaidDays: _extensionInterestPaidDays, lastExtensionExtra: _lastExtensionExtra, since: _since };
}

export function loadGetterTupleOpInfo(source: TupleReader) {
    const _state = source.readBigNumber();
    const _prevState = source.readBigNumber();
    const _principal = source.readBigNumber();
    const _repay = source.readBigNumber();
    const _dueAt = source.readBigNumber();
    const _pending = source.readBigNumber();
    const _ratePerDay = source.readBigNumber();
    const _extendedDays = source.readBigNumber();
    const _paidInterest = source.readBigNumber();
    const _opId = source.readBigNumber();
    const _nft = source.readAddress();
    const _borrower = source.readAddress();
    const _liquidator = source.readAddressOpt();
    const _liquidationTo = source.readAddressOpt();
    const _liquidationAttempt = source.readBigNumber();
    const _liquidationRetryReady = source.readBoolean();
    const _liquidationConfirmPending = source.readBoolean();
    const _extensionInterestPaidDays = source.readBigNumber();
    const _lastExtensionExtra = source.readBigNumber();
    const _since = source.readBigNumber();
    return { $$type: 'OpInfo' as const, state: _state, prevState: _prevState, principal: _principal, repay: _repay, dueAt: _dueAt, pending: _pending, ratePerDay: _ratePerDay, extendedDays: _extendedDays, paidInterest: _paidInterest, opId: _opId, nft: _nft, borrower: _borrower, liquidator: _liquidator, liquidationTo: _liquidationTo, liquidationAttempt: _liquidationAttempt, liquidationRetryReady: _liquidationRetryReady, liquidationConfirmPending: _liquidationConfirmPending, extensionInterestPaidDays: _extensionInterestPaidDays, lastExtensionExtra: _lastExtensionExtra, since: _since };
}

export function storeTupleOpInfo(source: OpInfo) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.state);
    builder.writeNumber(source.prevState);
    builder.writeNumber(source.principal);
    builder.writeNumber(source.repay);
    builder.writeNumber(source.dueAt);
    builder.writeNumber(source.pending);
    builder.writeNumber(source.ratePerDay);
    builder.writeNumber(source.extendedDays);
    builder.writeNumber(source.paidInterest);
    builder.writeNumber(source.opId);
    builder.writeAddress(source.nft);
    builder.writeAddress(source.borrower);
    builder.writeAddress(source.liquidator);
    builder.writeAddress(source.liquidationTo);
    builder.writeNumber(source.liquidationAttempt);
    builder.writeBoolean(source.liquidationRetryReady);
    builder.writeBoolean(source.liquidationConfirmPending);
    builder.writeNumber(source.extensionInterestPaidDays);
    builder.writeNumber(source.lastExtensionExtra);
    builder.writeNumber(source.since);
    return builder.build();
}

export function dictValueParserOpInfo(): DictionaryValue<OpInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOpInfo(src)).endCell());
        },
        parse: (src) => {
            return loadOpInfo(src.loadRef().beginParse());
        }
    }
}

export type GiftLoanPool$Data = {
    $$type: 'GiftLoanPool$Data';
    owner: Address;
    signerKey1: bigint;
    signerKey2: bigint;
    signerKey3: bigint;
    maxLoan: bigint;
    pendingOwner: Address | null;
    designatedLiquidator: Address | null;
    pendingTotal: bigint;
    ops: Dictionary<Address, OpInfo>;
    activeEscrowByNft: Dictionary<Address, Address>;
    escrowReady: Dictionary<Address, boolean>;
    rateBps: Dictionary<number, number>;
    nextRateBps: Dictionary<number, number>;
    rateApplyAt: Dictionary<number, number>;
    nextSigner1: bigint;
    nextSigner2: bigint;
    nextSigner3: bigint;
    signersAt: bigint;
    nextMaxLoan: bigint;
    maxLoanAt: bigint;
}

export function storeGiftLoanPool$Data(src: GiftLoanPool$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.signerKey1, 256);
        b_0.storeUint(src.signerKey2, 256);
        const b_1 = new Builder();
        b_1.storeUint(src.signerKey3, 256);
        b_1.storeCoins(src.maxLoan);
        b_1.storeAddress(src.pendingOwner);
        b_1.storeAddress(src.designatedLiquidator);
        const b_2 = new Builder();
        b_2.storeCoins(src.pendingTotal);
        b_2.storeDict(src.ops, Dictionary.Keys.Address(), dictValueParserOpInfo());
        b_2.storeDict(src.activeEscrowByNft, Dictionary.Keys.Address(), Dictionary.Values.Address());
        b_2.storeDict(src.escrowReady, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        const b_3 = new Builder();
        b_3.storeDict(src.rateBps, Dictionary.Keys.Uint(16), Dictionary.Values.Uint(32));
        b_3.storeDict(src.nextRateBps, Dictionary.Keys.Uint(16), Dictionary.Values.Uint(32));
        b_3.storeDict(src.rateApplyAt, Dictionary.Keys.Uint(16), Dictionary.Values.Uint(32));
        b_3.storeUint(src.nextSigner1, 256);
        b_3.storeUint(src.nextSigner2, 256);
        b_3.storeUint(src.nextSigner3, 256);
        b_3.storeUint(src.signersAt, 32);
        b_3.storeCoins(src.nextMaxLoan);
        b_3.storeUint(src.maxLoanAt, 32);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGiftLoanPool$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _signerKey1 = sc_0.loadUintBig(256);
    const _signerKey2 = sc_0.loadUintBig(256);
    const sc_1 = sc_0.loadRef().beginParse();
    const _signerKey3 = sc_1.loadUintBig(256);
    const _maxLoan = sc_1.loadCoins();
    const _pendingOwner = sc_1.loadMaybeAddress();
    const _designatedLiquidator = sc_1.loadMaybeAddress();
    const sc_2 = sc_1.loadRef().beginParse();
    const _pendingTotal = sc_2.loadCoins();
    const _ops = Dictionary.load(Dictionary.Keys.Address(), dictValueParserOpInfo(), sc_2);
    const _activeEscrowByNft = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Address(), sc_2);
    const _escrowReady = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_2);
    const sc_3 = sc_2.loadRef().beginParse();
    const _rateBps = Dictionary.load(Dictionary.Keys.Uint(16), Dictionary.Values.Uint(32), sc_3);
    const _nextRateBps = Dictionary.load(Dictionary.Keys.Uint(16), Dictionary.Values.Uint(32), sc_3);
    const _rateApplyAt = Dictionary.load(Dictionary.Keys.Uint(16), Dictionary.Values.Uint(32), sc_3);
    const _nextSigner1 = sc_3.loadUintBig(256);
    const _nextSigner2 = sc_3.loadUintBig(256);
    const _nextSigner3 = sc_3.loadUintBig(256);
    const _signersAt = sc_3.loadUintBig(32);
    const _nextMaxLoan = sc_3.loadCoins();
    const _maxLoanAt = sc_3.loadUintBig(32);
    return { $$type: 'GiftLoanPool$Data' as const, owner: _owner, signerKey1: _signerKey1, signerKey2: _signerKey2, signerKey3: _signerKey3, maxLoan: _maxLoan, pendingOwner: _pendingOwner, designatedLiquidator: _designatedLiquidator, pendingTotal: _pendingTotal, ops: _ops, activeEscrowByNft: _activeEscrowByNft, escrowReady: _escrowReady, rateBps: _rateBps, nextRateBps: _nextRateBps, rateApplyAt: _rateApplyAt, nextSigner1: _nextSigner1, nextSigner2: _nextSigner2, nextSigner3: _nextSigner3, signersAt: _signersAt, nextMaxLoan: _nextMaxLoan, maxLoanAt: _maxLoanAt };
}

export function loadTupleGiftLoanPool$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _signerKey1 = source.readBigNumber();
    const _signerKey2 = source.readBigNumber();
    const _signerKey3 = source.readBigNumber();
    const _maxLoan = source.readBigNumber();
    const _pendingOwner = source.readAddressOpt();
    const _designatedLiquidator = source.readAddressOpt();
    const _pendingTotal = source.readBigNumber();
    const _ops = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserOpInfo(), source.readCellOpt());
    const _activeEscrowByNft = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Address(), source.readCellOpt());
    const _escrowReady = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    const _rateBps = Dictionary.loadDirect(Dictionary.Keys.Uint(16), Dictionary.Values.Uint(32), source.readCellOpt());
    const _nextRateBps = Dictionary.loadDirect(Dictionary.Keys.Uint(16), Dictionary.Values.Uint(32), source.readCellOpt());
    const _rateApplyAt = Dictionary.loadDirect(Dictionary.Keys.Uint(16), Dictionary.Values.Uint(32), source.readCellOpt());
    source = source.readTuple();
    const _nextSigner1 = source.readBigNumber();
    const _nextSigner2 = source.readBigNumber();
    const _nextSigner3 = source.readBigNumber();
    const _signersAt = source.readBigNumber();
    const _nextMaxLoan = source.readBigNumber();
    const _maxLoanAt = source.readBigNumber();
    return { $$type: 'GiftLoanPool$Data' as const, owner: _owner, signerKey1: _signerKey1, signerKey2: _signerKey2, signerKey3: _signerKey3, maxLoan: _maxLoan, pendingOwner: _pendingOwner, designatedLiquidator: _designatedLiquidator, pendingTotal: _pendingTotal, ops: _ops, activeEscrowByNft: _activeEscrowByNft, escrowReady: _escrowReady, rateBps: _rateBps, nextRateBps: _nextRateBps, rateApplyAt: _rateApplyAt, nextSigner1: _nextSigner1, nextSigner2: _nextSigner2, nextSigner3: _nextSigner3, signersAt: _signersAt, nextMaxLoan: _nextMaxLoan, maxLoanAt: _maxLoanAt };
}

export function loadGetterTupleGiftLoanPool$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _signerKey1 = source.readBigNumber();
    const _signerKey2 = source.readBigNumber();
    const _signerKey3 = source.readBigNumber();
    const _maxLoan = source.readBigNumber();
    const _pendingOwner = source.readAddressOpt();
    const _designatedLiquidator = source.readAddressOpt();
    const _pendingTotal = source.readBigNumber();
    const _ops = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserOpInfo(), source.readCellOpt());
    const _activeEscrowByNft = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Address(), source.readCellOpt());
    const _escrowReady = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    const _rateBps = Dictionary.loadDirect(Dictionary.Keys.Uint(16), Dictionary.Values.Uint(32), source.readCellOpt());
    const _nextRateBps = Dictionary.loadDirect(Dictionary.Keys.Uint(16), Dictionary.Values.Uint(32), source.readCellOpt());
    const _rateApplyAt = Dictionary.loadDirect(Dictionary.Keys.Uint(16), Dictionary.Values.Uint(32), source.readCellOpt());
    const _nextSigner1 = source.readBigNumber();
    const _nextSigner2 = source.readBigNumber();
    const _nextSigner3 = source.readBigNumber();
    const _signersAt = source.readBigNumber();
    const _nextMaxLoan = source.readBigNumber();
    const _maxLoanAt = source.readBigNumber();
    return { $$type: 'GiftLoanPool$Data' as const, owner: _owner, signerKey1: _signerKey1, signerKey2: _signerKey2, signerKey3: _signerKey3, maxLoan: _maxLoan, pendingOwner: _pendingOwner, designatedLiquidator: _designatedLiquidator, pendingTotal: _pendingTotal, ops: _ops, activeEscrowByNft: _activeEscrowByNft, escrowReady: _escrowReady, rateBps: _rateBps, nextRateBps: _nextRateBps, rateApplyAt: _rateApplyAt, nextSigner1: _nextSigner1, nextSigner2: _nextSigner2, nextSigner3: _nextSigner3, signersAt: _signersAt, nextMaxLoan: _nextMaxLoan, maxLoanAt: _maxLoanAt };
}

export function storeTupleGiftLoanPool$Data(source: GiftLoanPool$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.signerKey1);
    builder.writeNumber(source.signerKey2);
    builder.writeNumber(source.signerKey3);
    builder.writeNumber(source.maxLoan);
    builder.writeAddress(source.pendingOwner);
    builder.writeAddress(source.designatedLiquidator);
    builder.writeNumber(source.pendingTotal);
    builder.writeCell(source.ops.size > 0 ? beginCell().storeDictDirect(source.ops, Dictionary.Keys.Address(), dictValueParserOpInfo()).endCell() : null);
    builder.writeCell(source.activeEscrowByNft.size > 0 ? beginCell().storeDictDirect(source.activeEscrowByNft, Dictionary.Keys.Address(), Dictionary.Values.Address()).endCell() : null);
    builder.writeCell(source.escrowReady.size > 0 ? beginCell().storeDictDirect(source.escrowReady, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeCell(source.rateBps.size > 0 ? beginCell().storeDictDirect(source.rateBps, Dictionary.Keys.Uint(16), Dictionary.Values.Uint(32)).endCell() : null);
    builder.writeCell(source.nextRateBps.size > 0 ? beginCell().storeDictDirect(source.nextRateBps, Dictionary.Keys.Uint(16), Dictionary.Values.Uint(32)).endCell() : null);
    builder.writeCell(source.rateApplyAt.size > 0 ? beginCell().storeDictDirect(source.rateApplyAt, Dictionary.Keys.Uint(16), Dictionary.Values.Uint(32)).endCell() : null);
    builder.writeNumber(source.nextSigner1);
    builder.writeNumber(source.nextSigner2);
    builder.writeNumber(source.nextSigner3);
    builder.writeNumber(source.signersAt);
    builder.writeNumber(source.nextMaxLoan);
    builder.writeNumber(source.maxLoanAt);
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
    opId: bigint;
    loanState: bigint;
    spent: boolean;
    borrower: Address | null;
    principal: bigint;
    repay: bigint;
    paidInterest: bigint;
    repayDue: bigint;
    dueAt: bigint;
    reqAt: bigint;
    preparedAt: bigint;
    ratePerDayBps: bigint;
    extendedDays: bigint;
    extensionSyncPending: boolean;
    extensionSyncAt: bigint;
    lastExtensionDays: bigint;
    lastExtraInterest: bigint;
    pendingReturnTo: Address | null;
    returnAttempts: bigint;
    returnQuerySeq: bigint;
    pendingReturnQueryId: bigint;
    rescueArmedAt: bigint;
    rescueArmedTo: Address | null;
    lastDepositor: Address | null;
    returnSetAt: bigint;
    repayPayer: Address | null;
    liquidated: boolean;
    liquidationAttempt: bigint;
    lastAbortedLiquidationAttempt: bigint;
    bootstrapReady: boolean;
}

export function storeLoanEscrow$Data(src: LoanEscrow$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.pool);
        b_0.storeAddress(src.nft);
        b_0.storeUint(src.opId, 32);
        b_0.storeUint(src.loanState, 8);
        b_0.storeBit(src.spent);
        b_0.storeAddress(src.borrower);
        b_0.storeCoins(src.principal);
        const b_1 = new Builder();
        b_1.storeCoins(src.repay);
        b_1.storeCoins(src.paidInterest);
        b_1.storeCoins(src.repayDue);
        b_1.storeUint(src.dueAt, 32);
        b_1.storeUint(src.reqAt, 32);
        b_1.storeUint(src.preparedAt, 32);
        b_1.storeUint(src.ratePerDayBps, 32);
        b_1.storeUint(src.extendedDays, 8);
        b_1.storeBit(src.extensionSyncPending);
        b_1.storeUint(src.extensionSyncAt, 32);
        b_1.storeUint(src.lastExtensionDays, 8);
        b_1.storeCoins(src.lastExtraInterest);
        b_1.storeAddress(src.pendingReturnTo);
        b_1.storeUint(src.returnAttempts, 8);
        b_1.storeUint(src.returnQuerySeq, 64);
        const b_2 = new Builder();
        b_2.storeUint(src.pendingReturnQueryId, 64);
        b_2.storeUint(src.rescueArmedAt, 32);
        b_2.storeAddress(src.rescueArmedTo);
        b_2.storeAddress(src.lastDepositor);
        b_2.storeUint(src.returnSetAt, 32);
        b_2.storeAddress(src.repayPayer);
        b_2.storeBit(src.liquidated);
        b_2.storeUint(src.liquidationAttempt, 32);
        b_2.storeUint(src.lastAbortedLiquidationAttempt, 32);
        b_2.storeBit(src.bootstrapReady);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLoanEscrow$Data(slice: Slice) {
    const sc_0 = slice;
    const _pool = sc_0.loadAddress();
    const _nft = sc_0.loadAddress();
    const _opId = sc_0.loadUintBig(32);
    const _loanState = sc_0.loadUintBig(8);
    const _spent = sc_0.loadBit();
    const _borrower = sc_0.loadMaybeAddress();
    const _principal = sc_0.loadCoins();
    const sc_1 = sc_0.loadRef().beginParse();
    const _repay = sc_1.loadCoins();
    const _paidInterest = sc_1.loadCoins();
    const _repayDue = sc_1.loadCoins();
    const _dueAt = sc_1.loadUintBig(32);
    const _reqAt = sc_1.loadUintBig(32);
    const _preparedAt = sc_1.loadUintBig(32);
    const _ratePerDayBps = sc_1.loadUintBig(32);
    const _extendedDays = sc_1.loadUintBig(8);
    const _extensionSyncPending = sc_1.loadBit();
    const _extensionSyncAt = sc_1.loadUintBig(32);
    const _lastExtensionDays = sc_1.loadUintBig(8);
    const _lastExtraInterest = sc_1.loadCoins();
    const _pendingReturnTo = sc_1.loadMaybeAddress();
    const _returnAttempts = sc_1.loadUintBig(8);
    const _returnQuerySeq = sc_1.loadUintBig(64);
    const sc_2 = sc_1.loadRef().beginParse();
    const _pendingReturnQueryId = sc_2.loadUintBig(64);
    const _rescueArmedAt = sc_2.loadUintBig(32);
    const _rescueArmedTo = sc_2.loadMaybeAddress();
    const _lastDepositor = sc_2.loadMaybeAddress();
    const _returnSetAt = sc_2.loadUintBig(32);
    const _repayPayer = sc_2.loadMaybeAddress();
    const _liquidated = sc_2.loadBit();
    const _liquidationAttempt = sc_2.loadUintBig(32);
    const _lastAbortedLiquidationAttempt = sc_2.loadUintBig(32);
    const _bootstrapReady = sc_2.loadBit();
    return { $$type: 'LoanEscrow$Data' as const, pool: _pool, nft: _nft, opId: _opId, loanState: _loanState, spent: _spent, borrower: _borrower, principal: _principal, repay: _repay, paidInterest: _paidInterest, repayDue: _repayDue, dueAt: _dueAt, reqAt: _reqAt, preparedAt: _preparedAt, ratePerDayBps: _ratePerDayBps, extendedDays: _extendedDays, extensionSyncPending: _extensionSyncPending, extensionSyncAt: _extensionSyncAt, lastExtensionDays: _lastExtensionDays, lastExtraInterest: _lastExtraInterest, pendingReturnTo: _pendingReturnTo, returnAttempts: _returnAttempts, returnQuerySeq: _returnQuerySeq, pendingReturnQueryId: _pendingReturnQueryId, rescueArmedAt: _rescueArmedAt, rescueArmedTo: _rescueArmedTo, lastDepositor: _lastDepositor, returnSetAt: _returnSetAt, repayPayer: _repayPayer, liquidated: _liquidated, liquidationAttempt: _liquidationAttempt, lastAbortedLiquidationAttempt: _lastAbortedLiquidationAttempt, bootstrapReady: _bootstrapReady };
}

export function loadTupleLoanEscrow$Data(source: TupleReader) {
    const _pool = source.readAddress();
    const _nft = source.readAddress();
    const _opId = source.readBigNumber();
    const _loanState = source.readBigNumber();
    const _spent = source.readBoolean();
    const _borrower = source.readAddressOpt();
    const _principal = source.readBigNumber();
    const _repay = source.readBigNumber();
    const _paidInterest = source.readBigNumber();
    const _repayDue = source.readBigNumber();
    const _dueAt = source.readBigNumber();
    const _reqAt = source.readBigNumber();
    const _preparedAt = source.readBigNumber();
    const _ratePerDayBps = source.readBigNumber();
    source = source.readTuple();
    const _extendedDays = source.readBigNumber();
    const _extensionSyncPending = source.readBoolean();
    const _extensionSyncAt = source.readBigNumber();
    const _lastExtensionDays = source.readBigNumber();
    const _lastExtraInterest = source.readBigNumber();
    const _pendingReturnTo = source.readAddressOpt();
    const _returnAttempts = source.readBigNumber();
    const _returnQuerySeq = source.readBigNumber();
    const _pendingReturnQueryId = source.readBigNumber();
    const _rescueArmedAt = source.readBigNumber();
    const _rescueArmedTo = source.readAddressOpt();
    const _lastDepositor = source.readAddressOpt();
    const _returnSetAt = source.readBigNumber();
    const _repayPayer = source.readAddressOpt();
    source = source.readTuple();
    const _liquidated = source.readBoolean();
    const _liquidationAttempt = source.readBigNumber();
    const _lastAbortedLiquidationAttempt = source.readBigNumber();
    const _bootstrapReady = source.readBoolean();
    return { $$type: 'LoanEscrow$Data' as const, pool: _pool, nft: _nft, opId: _opId, loanState: _loanState, spent: _spent, borrower: _borrower, principal: _principal, repay: _repay, paidInterest: _paidInterest, repayDue: _repayDue, dueAt: _dueAt, reqAt: _reqAt, preparedAt: _preparedAt, ratePerDayBps: _ratePerDayBps, extendedDays: _extendedDays, extensionSyncPending: _extensionSyncPending, extensionSyncAt: _extensionSyncAt, lastExtensionDays: _lastExtensionDays, lastExtraInterest: _lastExtraInterest, pendingReturnTo: _pendingReturnTo, returnAttempts: _returnAttempts, returnQuerySeq: _returnQuerySeq, pendingReturnQueryId: _pendingReturnQueryId, rescueArmedAt: _rescueArmedAt, rescueArmedTo: _rescueArmedTo, lastDepositor: _lastDepositor, returnSetAt: _returnSetAt, repayPayer: _repayPayer, liquidated: _liquidated, liquidationAttempt: _liquidationAttempt, lastAbortedLiquidationAttempt: _lastAbortedLiquidationAttempt, bootstrapReady: _bootstrapReady };
}

export function loadGetterTupleLoanEscrow$Data(source: TupleReader) {
    const _pool = source.readAddress();
    const _nft = source.readAddress();
    const _opId = source.readBigNumber();
    const _loanState = source.readBigNumber();
    const _spent = source.readBoolean();
    const _borrower = source.readAddressOpt();
    const _principal = source.readBigNumber();
    const _repay = source.readBigNumber();
    const _paidInterest = source.readBigNumber();
    const _repayDue = source.readBigNumber();
    const _dueAt = source.readBigNumber();
    const _reqAt = source.readBigNumber();
    const _preparedAt = source.readBigNumber();
    const _ratePerDayBps = source.readBigNumber();
    const _extendedDays = source.readBigNumber();
    const _extensionSyncPending = source.readBoolean();
    const _extensionSyncAt = source.readBigNumber();
    const _lastExtensionDays = source.readBigNumber();
    const _lastExtraInterest = source.readBigNumber();
    const _pendingReturnTo = source.readAddressOpt();
    const _returnAttempts = source.readBigNumber();
    const _returnQuerySeq = source.readBigNumber();
    const _pendingReturnQueryId = source.readBigNumber();
    const _rescueArmedAt = source.readBigNumber();
    const _rescueArmedTo = source.readAddressOpt();
    const _lastDepositor = source.readAddressOpt();
    const _returnSetAt = source.readBigNumber();
    const _repayPayer = source.readAddressOpt();
    const _liquidated = source.readBoolean();
    const _liquidationAttempt = source.readBigNumber();
    const _lastAbortedLiquidationAttempt = source.readBigNumber();
    const _bootstrapReady = source.readBoolean();
    return { $$type: 'LoanEscrow$Data' as const, pool: _pool, nft: _nft, opId: _opId, loanState: _loanState, spent: _spent, borrower: _borrower, principal: _principal, repay: _repay, paidInterest: _paidInterest, repayDue: _repayDue, dueAt: _dueAt, reqAt: _reqAt, preparedAt: _preparedAt, ratePerDayBps: _ratePerDayBps, extendedDays: _extendedDays, extensionSyncPending: _extensionSyncPending, extensionSyncAt: _extensionSyncAt, lastExtensionDays: _lastExtensionDays, lastExtraInterest: _lastExtraInterest, pendingReturnTo: _pendingReturnTo, returnAttempts: _returnAttempts, returnQuerySeq: _returnQuerySeq, pendingReturnQueryId: _pendingReturnQueryId, rescueArmedAt: _rescueArmedAt, rescueArmedTo: _rescueArmedTo, lastDepositor: _lastDepositor, returnSetAt: _returnSetAt, repayPayer: _repayPayer, liquidated: _liquidated, liquidationAttempt: _liquidationAttempt, lastAbortedLiquidationAttempt: _lastAbortedLiquidationAttempt, bootstrapReady: _bootstrapReady };
}

export function storeTupleLoanEscrow$Data(source: LoanEscrow$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.pool);
    builder.writeAddress(source.nft);
    builder.writeNumber(source.opId);
    builder.writeNumber(source.loanState);
    builder.writeBoolean(source.spent);
    builder.writeAddress(source.borrower);
    builder.writeNumber(source.principal);
    builder.writeNumber(source.repay);
    builder.writeNumber(source.paidInterest);
    builder.writeNumber(source.repayDue);
    builder.writeNumber(source.dueAt);
    builder.writeNumber(source.reqAt);
    builder.writeNumber(source.preparedAt);
    builder.writeNumber(source.ratePerDayBps);
    builder.writeNumber(source.extendedDays);
    builder.writeBoolean(source.extensionSyncPending);
    builder.writeNumber(source.extensionSyncAt);
    builder.writeNumber(source.lastExtensionDays);
    builder.writeNumber(source.lastExtraInterest);
    builder.writeAddress(source.pendingReturnTo);
    builder.writeNumber(source.returnAttempts);
    builder.writeNumber(source.returnQuerySeq);
    builder.writeNumber(source.pendingReturnQueryId);
    builder.writeNumber(source.rescueArmedAt);
    builder.writeAddress(source.rescueArmedTo);
    builder.writeAddress(source.lastDepositor);
    builder.writeNumber(source.returnSetAt);
    builder.writeAddress(source.repayPayer);
    builder.writeBoolean(source.liquidated);
    builder.writeNumber(source.liquidationAttempt);
    builder.writeNumber(source.lastAbortedLiquidationAttempt);
    builder.writeBoolean(source.bootstrapReady);
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

 type LoanEscrow_init_args = {
    $$type: 'LoanEscrow_init_args';
    pool: Address;
    nft: Address;
    opId: bigint;
}

function initLoanEscrow_init_args(src: LoanEscrow_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.pool);
        b_0.storeAddress(src.nft);
        b_0.storeInt(src.opId, 257);
    };
}

async function LoanEscrow_init(pool: Address, nft: Address, opId: bigint) {
    const __code = Cell.fromHex('b5ee9c724102cb010042dd00022cff008e88f4a413f4bcf2c80bed53208e8130e1ed43d9012d020271020a020120030802012004060283b64cfda89a1a400031c57f481f481020203ae00aa4007a2b0e0e0daa8e444a8e000a8e000e0a8e222daa8e22240dada44dae0a644ffc61bb678ae20be1eae20be1f02e0500022c0283b4499da89a1a400031c57f481f481020203ae00aa4007a2b0e0e0daa8e444a8e000a8e000e0a8e222daa8e22240dada44dae0a644ffc61bb678ae20be1eae20be1f02e07000456190283ba598ed44d0d200018e2bfa40fa40810101d700552003d15870706d547222547000547000705471116d547111206d6d226d7053227fe30ddb3c57105f0f57105f0f82e090004561d0201200b160201200c0e0283b54afda89a1a400031c57f481f481020203ae00aa4007a2b0e0e0daa8e444a8e000a8e000e0a8e222daa8e22240dada44dae0a644ffc61bb678ae20be1eae20be1f02e0d0002260201200f110283b1773b5134348000638afe903e9020404075c0154800f4561c1c1b551c88951c00151c001c151c445b551c44481b5b489b5c14c89ff8c376cf15c417c3d5c417c3e02e100004561002015812140282a9a2ed44d0d200018e2bfa40fa40810101d700552003d15870706d547222547000547000705471116d547111206d6d226d7053227fe30ddb3c57105f0f57105f0f2e130002230282ab0aed44d0d200018e2bfa40fa40810101d700552003d15870706d547222547000547000705471116d547111206d6d226d7053227fe30ddb3c57105f0f57105f0f2e1500022902012017220201201820020158191e0201201a1c0281a4f7da89a1a400031c57f481f481020203ae00aa4007a2b0e0e0daa8e444a8e000a8e000e0a8e222daa8e22240dada44dae0a644ffc61bb678ae20be1eae20be1f2e1b0004561a0281a6ddda89a1a400031c57f481f481020203ae00aa4007a2b0e0e0daa8e444a8e000a8e000e0a8e222daa8e22240dada44dae0a644ffc61bb678ae20be1eae20be1f2e1d0002280282a892ed44d0d200018e2bfa40fa40810101d700552003d15870706d547222547000547000705471116d547111206d6d226d7053227fe30ddb3c57105f0f57105f0f2e1f0004561b0283b3a97b5134348000638afe903e9020404075c0154800f4561c1c1b551c88951c00151c001c151c445b551c44481b5b489b5c14c89ff8c376cf15c417c3d5c417c3e02e2100045615020120232802012024260283addff6a268690000c715fd207d20408080eb802a9001e8ac383836aa39112a38002a3800382a3888b6aa38889036b69136b829913ff186ed9e2b882f87ab882f87c02e25000456180283ad1776a268690000c715fd207d20408080eb802a9001e8ac383836aa39112a38002a3800382a3888b6aa38889036b69136b829913ff186ed9e2b882f87ab882f87c02e270004561c020120292b0283ac64f6a268690000c715fd207d20408080eb802a9001e8ac383836aa39112a38002a3800382a3888b6aa38889036b69136b829913ff186ed9e2b882f87ab882f87c02e2a0002250283ac3276a268690000c715fd207d20408080eb802a9001e8ac383836aa39112a38002a3800382a3888b6aa38889036b69136b829913ff186ed9e2b882f87ab882f87c02e2c000a56185618a104eeeda2edfb01d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e2bfa40fa40810101d700552003d15870706d547222547000547000705471116d547111206d6d226d7053227fe30d1121e302705620d74920c21f97311120d31f1121de218210b0123481bae302218210d53276dbba2e314e5001c8db3c5720111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e2f01f4fa40fa40d31fd307d200d72c01916d93fa4001e201fa00d401d0fa00fa00fa00d31fd31fd31fd31fd307d200d31fd307fa00d72c01916d93fa4001e201d307d33fd430d0d33fd31fd72c01916d93fa4001e201d72c01916d93fa4001e201d31fd72c01916d93fa4001e201d200d31fd31fd200301119112011193000481119111f11191119111e11191119111d11191119111c11191119111b11191119111a111902fe111f8020d7217021d749c21f9430d31f01de208210b0123472ba8ee15b111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551ce020c83204fe8210b0123473ba8ee15b111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551ce0208210b0123411bae302208210b0123423bae302c833373a03fa5bf842561ec705b38ee0111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551ce0561ac001e300111d111f111d111c111e111cc8343901fe5618206ef2d080111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a10891078106710561045103411203503fa4130705621db3c111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550edb3c111f01111e01111d01111c01111ba57536004a01111a011119011118011117011116011115011114011113011112011111011110010f55c103fa5bf842561ec705b38ee0111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551ce0561ac002e300111d111f111d111c111e111cc83839006c571a73561c72561dc855208210b01234275004cb1f12cecb07cb1fc9c88258c000000000000000000000000101cb67ccc970fb00111a01a8111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551cc8044c2082105fcc3d14bae30231208210b0123437bae302208210b012345bbae3028210b0123445ba3b46474a03fc30d33f0131f842561ec705b38ee130111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551ce0561bc00a935301ba9170e2e30228c83c3f03fe30571a782a206ef2d080561d01561dc855208210b012343d5004cb1f12cececb1fc9c88258c000000000000000000000000101cb67ccc970fb0082089896807370561f561f561fc855208210b01234705004cb1f12cecb1fcb1fc95621553010246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb08a8a3dc73e00065bcf8101eee2f400c901fb00111d111f111d111c111e111c111b111d111b111c1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610354403c803f2c00092307f9228bde28ee0111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551ce037702a6ee3022a206ef2d0800ac8404101e8111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a091068105710461035443012c803fa8e34571a72561c780b561dc855208210b012343d5004cb1f12cececb1fc9c88258c000000000000000000000000101cb67ccc970fb008f447122e30f111f01111e01111d01111c01111b09111a091119091118091117091116091115091114091113091112091111091110090f109e0d109c509b1a47804560444013e242434501fc111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd0c109b1a10791068261068105710461035045023db3ca101fc5311112011221120804256201123112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0411100410df44012a105e10bd10ac109b108a107906080704055520db3cc501e4111d111f111d111c111e111c111b111d111b09111c091119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac0b108a10891068105710461035443012c803e830f842561ec705b38ee0111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551ce02ee303561c561c71c8c8524803e830f842561ec705b38ee0111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551ce02ee303561c561c73c8c8524801fe55208210b01234575004cb1f12cecb1fcb07c9c88258c000000000000000000000000101cb67ccc970fb00111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211104901740f11110f0e11100e10df551cc87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54c904fe8ffcf842561ec705b38ee0111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551ce0561ac309e30239571908206ef2d080286eb3e0c8524b4d01fa973007206ef2d080923807e26d746d7020f8276f108208989680a120c100923020de561721bc9257179130e25616c2008e401116157370136d6d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb000311140393355715e2111d111f111d4c01d0111c111e111c111b111d111b01111c011119111b11191118111a1118111711191117111611181116111511171115031116031113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd0c0b108a107910681057104610451024c8000a5f0f5f0f5b01fe5b5720111efa40d31f30813c65f8425620c705f2f48200cdeb02561ec70512f2f481483201561cbaf2f47f8208989680717f561f561fc8598210b01234825003cb1fcecb1fc95621553010246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c9014f01ecfb00111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610354430c8043ce30221821005138d91bae302218210b0123412bae302218210b0123424ba5155666904fc5b111fd33f30f842561ec705b38ee130111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551ce028e30328bde3023770561ac006c88b525301c0111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551cc801fc9221b39170e2932a6eb39170e28e4a820898968072fb022a206ef2d0802181008270136d6d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00de111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11185401fc1117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a091068105710461035443012c87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54c904445b111fd33f31fa40f842205620c705935622b39170e2e302707054700054700088885659595801fa5b111e1120111e70821007270e007156201123112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f5702900e11100e10df10ce10bd10ac109b108a1079106810575550db3cc87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54c5c904fe8856280c562bc70592562d9170e2945615c0009170e28e192bc000917f932bc006e2917f932bc007e2923b7f930bc008e2923b70e2208e2657125712571253a06d56186eb39c571757176d22011118011117de0111140111130211120258de5628c000935627b39170e29356186e9170e221923070df9170e30d913ce30d09595a5b6000000016f8276f1082100bebc200be01fc562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a562b0a564a0a564c0a562d491a46875044451503112c562ced41ed43ed44ed45ed47925b70ed675c02faed65ed64ed63ed61802c7fed118aed41edf101f2ff0d112c0d0e112b0e0d112a0d0e11290e0d11280d0e11270e0d11260d0e11250e0d11240d0e11230e0d11220d0e11210e0d11200d0e111f0e0d111e0d0e111d0e0d111c0d0e111b0e0d111a0d0e11190e0d11180d0e11170e0d11160d0e11150e0d11140d0e11130e5d5f01f83001d2000193d430d0defa00fa00d31fd30fd31fd31fd31fd4d4d4301129112b11291128112a1128112711291127112611281126112511271125112411261124112311251123112211241122112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a5e009a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10cd55097f00260d11120d0e11110e5e2d10de4ab9478644531203fc8e945f0a9130e30d1112111a11120a11120a109a1069e30d111d111f111d111c111e111c111b111d111b06111c061119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131111111311111110111211100f11110f0e11100e10df10ce10bd10ab108a10791078105755146164c802fc111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a108910781067105610451034112041305620db3cc06201fc111f1120111f70821007270e007156211123112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111106301a20f11100f10ef10de10cd10bc10ab109a108910781067105610455520db3c111f01111e01111d01111c01111b01111a011119011118011117011116011115011114011113011112011111011110010f55c1c502f83a57105710571257125719571e571f71f823256d70206d821007270e00277f562a0b10ae0911290908112708071121070611190605111805562a0504111604031115034e1dc855c0db3cc9562104103b4abb10246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae2f400c901fb0065c7004e8210b0123411500ecb1f1cce1ace5008fa025006fa0214cb1f12cb0fcb1fcb1fcb1fcb1fcccccc01f65b57115711571257135713571357141118fa40fa00fa00d31fd31fd31f30813c65f842561ec705f2f481385e111ac00101111a01f2f48200cdeb05561bc70515f2f481483211185619ba01111801f2f4727f5d70561bf823561f4813111e19561fc855408210b01234285006cb1f14ce58fa0201fa02cb1fcb1fc96702f8c88258c000000000000000000000000101cb67ccc970fb00821004c4b400717f561b206ef2d080562054316553bd5624c855608210b01234235008cb1f16ce14ce58fa0201fa02cb1fcb1fcb1fc95621553010246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae2f400c901fb00c76801bc111d111f111d111c111e111c111b111d111b03111c0302111b021118111a1118111901111801011117011114111611140411150411121114111205111305061112060f11110f0e11100e10df10ce10bd10ac109b108a1079103847671513c8043ce302218210b0123413bae302218210b0123451bae302218210b0123426ba6a6f6f7702fe5b111ffa40d31f30813c65f8425621c705f2f48200cdeb02561fc70512f2f481483201561dbaf2f481385e561bc002917f94561bc003e2917f94561bc004e2f2f4111ac304208e2c561c561cc8598210b01234295003cb1fcecb1fc9c88258c000000000000000000000000101cb67ccc970fb00de7421e3008208989680736b6c0012821008f0d18072fb0202fe7056205620c8598210b012343b5003cb1fcecb1fc95622553010246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0001e300111d111f111d111c111e111c111b111d111b111c1119111b11191118111a11181117111911171116111811166d6e00865618206ef2d0807081008270136d6d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0001e41115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610354403c87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54c901f85b111ffa40d31f30813c65f8425621c705f2f48200cdeb02561fc70512f2f481483201561dbaf2f4111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211107002780f11110f0e11100e10df551cdb3cc87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed5471c901f2561cc30194561cc3029170e294561cc3039170e2dc561a206ef2d080561dc30191779170e2112011211120111f1121111f111e1121111e111d1121111d111c1121111c111b1121111b111a1121111a1119112111191118112111181117112111171116112111161115112111151114112111141113112111137202d61112112111121111112111111110112111100f11210f0e11210e0d11210d0c11210c0b11210b0a11210a0911210908112108071121070611210605112105041121040311210302112102011121015621db3c561e73561fc855208210b01234275004cb1f12cecb07cb1fc9a57301fcc88258c000000000000000000000000101cb67ccc970fb00111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e740104db3c7502f6821007bfa48070fb02111f1120111f70821007270e00715623112211211120111f111e111d111c111b111a11191118111711161115111411131112111111100f0e0d0c0b0a09080706050403112403520302112502011125db3c11207081008270136d6d50436d03c8cf8580ca00cf8440ce01fa028069cf40025cc57600fa6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e043ce302218210b0123436bae302218210b0123402bae302218210b0123455ba787d828501fe5b111ffa40d31ffa4030813c65f8425622c705f2f48200cdeb035620c70513f2f481483201561ebaf2f4813aaa561cc001917f94561cc002e2917f94561cc003e2f2f48200cfb6561a206ef2d0805220c705f2f4561bc0019f8200a564f8235615810e10a0bcf2f49f8200a564f8235614810e10a0bcf2f4e2111e111f111e7902fe111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a10891078106710561045103411204130775621db3c561e71561fc8a57a02fe55208210b01234275004cb1f12cecb07cb1fc9c88258c000000000000000000000000101cb67ccc970fb00821008583b0070fb0270821007270e0056200256230271db3c8208989680737056215621c8598210b01234425003cb1fcecb1fc95623553010246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e01c57b01fa6eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0011207081008270136d6d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11197c01d41118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550ec87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54c901fe5b3c3c3c111cd307d31f308200d28a561ac004f2f4814f1ff8425619206ef2d080c705f2f481483201561bbaf2f481096a0db31df2f48200b48e2cc200932cc1089170e2f2f48112e353dca0c108f2f4816945f8235612bbf2f456142ea82ca881270fa0812710a9048200f685f8416f24135f0322821005f5e100a0bef2f47e01fe51dca011142da02c82015180a801111201a07ff82353eff8416f24135f035612a1821005f5e100a120c2008e41561b206ef2d080017370136d6d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb009130e2820afaf080717f561d206ef2d0807f01fe5622015615561e56182c561e5627c855708210b01234375009cb1f17ce15ce13cb07cb0701fa02cb1f01fa02cb1fc95623553010246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00561a206ef2d080561f502301111201561a011114278001fa56195622c855708210b01234375009cb1f17ce15ce13cb07cb0701fa02cb1f01fa02cb1fc9c88258c000000000000000000000000101cb67ccc970fb00111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111311181113111511171115111411161114021115028101c0111211141112111111131111111011121110111011111110011110010f0e0d10ac109b108a10791068105710460350554414c87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54c902fc5b571f8200d28a111bc00401111b01f2f48165fc2eb3f2f45617206ef2d080816945f823561582015180a0bbf2f456165618a15616a1561821a0811ee2f8416f24135f0322bef2f48117e8f8276f1022821007bfa480a0bef2f48209c9c380a0820afaf080a079111d030211210201112201db3c345715f8416f24135f03c08301faf84271561f561f561c7f1125c855308210b01234455005cb1f13cecb1f01fa0201fa02c95621040311240311230110246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00111d111f111d111c111e111c111b111d111b111a111c111a8401aa1119111b11191118111a11181117111911171116111811161115111711151113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a10791068105710465a1514c8043ce302218210b0123474bae302218210b0123456bae302218210b0123446ba868a8d9104f65b111ffa40d31fd307d31ffa00d20030813c65f8425625c705f2f482009aa8065623c70594045621ba923470e215f2f45612e303561ec304e3028200e5d5025614ba12f2f48200a734015617ba94025619ba923270e212f2f49d3c3c3c0111120108a070705300e30e111d111f111d111c111e111c111b111d111b8787888901c45f04111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551cc800fa2bc2008e632b820afaf080a0717f561f561f56145611c855308210b01234735005cb1f13cecb1fcb0701fa02c95621553010246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00993c3c3c7070542d0c1de2041115044edc103b550201b2111a111c111a1119111b11191118111a1118111711191117111611181116041117041114111611141113111511131112111411121111111311111110111211100f11110f031110034fed10ac109b108a107910681057463304c802fc5b111ffa40d31fd30730813c65f8425622c705f2f482009aa8035620c7059401561eba923170e212f2f42fe3033d3d3d8200e5d551beba1bf2f40111120108a070705300111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118111711191117111611181116041117041114111611148b8c01c230111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551cc801c01113111511131112111411121111111311111110111211100f11110f031110034fed10ac109b108a10791068105740165034c87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54c902fc5b571f8142312ff2f48200d28a561bc004f2f4817deff842561a206ef2d080c705917f96f842561fc705e2f2f48200ccaef8416f24135f03820b938700bef2f47080407f561b206ef2d080562001561c5616561356175614561f561e56225628c855a0db3cc95621553010246d50436d03c8cf8580ca00cf8440ce01fa028e8f00548210b012345b500ccb1f1ace18ce5006fa0214cb1f12cb07cb0701fa0201fa02cb1fc858fa0212cb1fcd01fe8069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e90016410df551cc87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54c9043ce302218210b012341abae302218210b0123471bae302218210b0123479ba929aa2a802fe5b111ffa40d31f30813c65f8425621c705f2f48200cdeb02561fc70512f2f481483201561dbaf2f4561ac006e302816209561bc009f2f42a206ef2d080111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a1119111811191118111711181117111611171116111511161115111411151114939501fa70804270561f561fc8598210b01234445003cb1fcecb1fc95621553010246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911179401c81116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551cc87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54c902fe1113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a10891078106710561045103411204130765621db3c111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a1119111811191118111711181117111611171116111511161115a59602a81114111511141113111411131112111311121111111211111110111111100f11100f550edb3cc87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed5497c902ee820898968070fb02111f1120111f70820afaf080715623112211211120111f111e111d111c111b111a11191118111711161115111411131112111111100f0e0d0c0b0a09080706050403112403520302112502011125db3c8208989680737056215621c8598210b01234445003cb1fcecb1fc956235530c59801f610246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0011207081008270136d6d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00111e111f111e9900b4111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e03f85b111fd31ffa40fa4030813c65f8425622c705f2f4816ddd5334bcf2f4561dc0048e995611917f9af823561782015180a0bbe2e30230353a5b3857178e2d30353a5b8155ca1119c00801111901f2f48200a701286eb39908206ef2d08021c705923870e218f2f406111606e27a70815eb55619561dc705b39170e30d9b9d9e01fa6c21708042561f561f7005c855208210b01234545004cb1f12cecb1fcec95621504410246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11189c01d81117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551cc87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54db31c90010f828561a01c705b301fc975619561cc705b39170e2f2f470f823111d111f111d111c111e111c111b111d111b03111c031119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce1b1d108a1079106810571046451550339f0260db3cc87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54a0c9013482100e4e1c0070fb028116282d6eb3f2f42c206ef2d08023db3ca101ec82100bebc200717f6d820afaf080db3c5e3356275520c8555082105fcc3d145007cb1f15cb3f13ce01206e9430cf84809201cee2f40001fa02cec95622434410246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00c604fc5b111ffa40d31fd31f30813c65f8425622c705f2f482009aa8035620c7059401561eba923170e212f2f48200a4005112baf2f4561ac00ae30f7080407f5621562127c855208210b01234725004cb1f12cecb1fcb1fc95623553010246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae2a3a6c7a701fc317f2a206ef2d080111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079106810571046a4011010355e217601db3ca501d43f3f3f3f3f3f3f57105710571057105710571057116d7054700054700020705471110f111d0f0c111b0c0b111a0b0a11190a091118090811170807111607061114060511130504111204031111030211100250fe1c1b1a1918171615144330db3c343636706d50766d04c000dc812084561bc00691229170e2f2f4111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551c0168f400c901fb00c87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54c903f68eed5b111fd31fd31ffa4030813c65f8425622c705f2f482009aa8015620c7059401561eba923170e2f2f48200a4005312baf2f4561bc0089f571b571e812a4921b3f2f4800b561a8e198200b421561cc00b94562022ba9170e2f2f401111f01111b01e2708040561f561f7f1120c8e0218210b012347ebae30221a9abae01f855208210b012347c5004cb1f12cecb1fcb1fc9562104111f0110246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00111d111f111d111c111e111c111b111d111b111c1119111b11191118111a1118111711191117111611181116aa01bc1115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551cc87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54c901fe5b111fd31fd31ffa4030813c65f8425622c705f2f482009aa8015620c7059401561eba923170e2f2f48200a400215621baf2f4561bc00b973a3a5719746d708e108200a88f561cc004f2f402111b0250bae2708040561f561f7f0fc855208210b012347f5004cb1f12cecb1fcb1fc956210450ee10246d50436d03c8cf8580ac01fcca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00111d111f111d111c111e111c111b111d111b01111c011119111b11191118111a1118111711191117111611181116111511171115111411161114111311151113111211141112111111131111111011121110ad019a0f11110f0e11100e10df10ce10bd0c109b108a107910681057104610354413c87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54c9044e8210b0123415bae302218210b012345ebae302218210b0123450bae3025721208210b0123460baafbcbec204fa5b111ffa4030813c65f8425620c705f2f48200f312215620c705b397f8285220c705b39170e29621561fc705b39170e2f2f42b6eb39f8113092c206ef2d0805220c705f2f4de561be303561bc008e302561bc006917f94561bc007e2e302308200d1faf2f0111d111f111d111c111e111c111b111d111b111a111c111ab0b5b8bb02f827c30093266eb39170e29906206ef2d08026c705923670e29cf8232781012ca0810e10a0bb9170e2e3038200a0b0f8230881012ca018bc17f2f4111c111d111c111b111c111b111a111b111a1119111a1119111811191118111711181117111611171116111511161115111411151114111311141113111211131112b1b301fe36f82325561d01561d5008c855208210b012346e5004cb1f12cecb1fcec9c88258c000000000000000000000000101cb67ccc970fb00561d70804270136d6d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00111d111f111d111c111e111cb201ce111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a1079081057104610354403c802f61111111211111110111111100f11100f10ef10de10cd10bc10ab109a108910787007086d07105610451034401311205620db3c111f1120111f70821007270e007156211123112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a1119c0b402a81118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a108910781067105610455520db3cc5c802fc571b8200ad4c2b6eb3f2f4111d111e111d111c111d111c111b111c111b77111c111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e11205620db3c111f1120111f70821007270e00715621c0b601fc1123112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109ab70278108910781067105610455520db3cc87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54c5c901fe8200ad4c2c6eb3f2f4111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a108910781067105610451034b902f4112041305620db3c111f1120111f70821007270e007156211123112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111c111b111c111b111a111b111a1119111a1119111811191118111711181117111611171116111511161115111411151114111311141113111211131112c0ba02b01111111211111110111111100f11100f10ef10de10cd10bc10ab109a108910781067105610455520db3cc87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54c5c901ec1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551cc87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54c901f85b111ffa40fa4030813c65f8425621c705f2f481295a225620c705b3f2f48200f312215621c705b397f8285220c705b39170e2955312c705b39170e2f2f47020112111231121112011221120111f1121111f111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a1118bd02a41117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df10ce10bd10ac109b108a107910681057104610458040db3cc5c801fa5b111ffa4030812537111cc00801111c01f2f48200ad4c2b6eb3f2f4815ca8f8422c206ef2d080c705f2f48148f7f8416f24135f03821007270e00bef2f48200f312f828561c01c705b397561b561fc705b39170e297561b561ec705b39170e2f2f4111d111e111d111c111d111c111b111c111b77111c111a111b111abf02fc1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f550e11205620db3c111f1120111f70821007270e007156211123112111221121112011211120111f1120111f111e111f111e111d111e111d111c111d111cc0c1001a36393a3a7020f823105c49b50202cc111b111c111b111a111b111a1119111a11191118111911181117111811171116111711161115111611151114111511141113111411131112111311121111111211111110111111100f11100f10ef10de10cd10bc10ab109a108910781067105610455520db3cc5c802f0e302c0001120c12101112001b08ee0111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0e11100e10df551ce05f0f5f0f5bf2c082c3c801fe303a571e8200ad4c2a6eb3f2f482009d13561ac000917f94561ac006e2917f94561ac007e2917f94561ac008e2f2f48200a564f8230482015180a014bc13f2f48148f7f8416f24135f03821007270e00bef2f428206ef2d0805619c0089377571ade70f8235311112011221120804056201123112011221120111f1121111fc402ec111e1120111e111d111f111d111c111e111c111b111d111b111a111c111a1119111b11191118111a11181117111911171116111811161115111711151114111611141113111511131112111411121111111311111110111211100f11110f0511100510df10ce10bd10ac109b104a070904065520db3cc5c802f253245625c7059303c000923370e299323d0da4543ddd41eede245624c70592f8289123e26d70db3c5e24c8555082105fcc3d145007cb1f15cb3f13ce01206e9430cf84809201cee2f40001fa02cec9125a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae2f400c901fb00c6c7000c70c8ca00c9d0001a58cf8680cf8480f400f400cf81015cc87f01ca001120111f111e111d111c111b111a111911181117111611151114111311121111111055e0db3cc9ed54c901e401111f011120ce01111d01ce01111b01cb1f01111901cb0701111701ca00011115206e9430cf84809201cee2011113fa02c8011112fa02011110fa02500efa021ccb1f1acb1f18cb1f16cb1f14cb0712ca00cb1fcb0701fa0201206e9430cf84809201cee2cb07cb3f01c8cb3f12cb1f5003ca006c206e9430cf84809201cee25003206e9430cf84809201cee213cb1f5003206e9430cf84809201cee213ca0013cb1f13cb1f13ca00cdcd38c7c802');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initLoanEscrow_init_args({ $$type: 'LoanEscrow_init_args', pool, nft, opId })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const LoanEscrow_errors = {
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
    2103: { message: "Interest accounting" },
    2410: { message: "Previous extension sync pending" },
    4316: { message: "Bad rate" },
    4521: { message: "Cannot rescue to pool" },
    4835: { message: "Extension limit" },
    4873: { message: "Must return to recorded recipient" },
    5111: { message: "Confirmation already acknowledged" },
    5672: { message: "Missing liquidation recipient" },
    6120: { message: "Escrow gas reserve too low" },
    6607: { message: "No active escrow for NFT" },
    7189: { message: "Zero amount" },
    7316: { message: "Recovery duplicate mismatch" },
    7705: { message: "Bad proposal" },
    7906: { message: "Send principal + interest" },
    8324: { message: "Not awaiting liquidation confirmation" },
    9033: { message: "Pool cannot liquidate" },
    9527: { message: "Not failed" },
    9558: { message: "Extension sequence" },
    10407: { message: "Not pending owner" },
    10586: { message: "Not a foreign NFT" },
    10825: { message: "Already liquidated" },
    11244: { message: "Not escrow" },
    11688: { message: "Not issued or already finalized" },
    12258: { message: "Zero operation" },
    14101: { message: "Amount mismatch" },
    14192: { message: "Keys must differ" },
    14430: { message: "Bad state" },
    15018: { message: "Not cancellable" },
    15461: { message: "Pool only" },
    16013: { message: "Zero limit" },
    16091: { message: "NFT transfer not confirmed bounced" },
    16945: { message: "No pending extension sync" },
    17021: { message: "Closed extension days" },
    18063: { message: "No proposal" },
    18482: { message: "Wrong op" },
    18679: { message: "Send at least 0.12" },
    18683: { message: "No abort pending" },
    19585: { message: "Bad duplicate total" },
    20255: { message: "Not borrower" },
    20290: { message: "Recovery identity mismatch" },
    21106: { message: "Not liquidating" },
    21962: { message: "Not active or retryable" },
    22303: { message: "DueAt mismatch" },
    23720: { message: "Not recipient" },
    23975: { message: "Recovery interest mismatch" },
    24245: { message: "Bad liquidation recipient" },
    24972: { message: "Bad extension" },
    25097: { message: "Not repaying" },
    25389: { message: "No operation" },
    26108: { message: "Extension sync pending" },
    26949: { message: "Too late" },
    28125: { message: "Stale liquidation attempt" },
    28182: { message: "Not cancelled" },
    28411: { message: "Borrower mismatch" },
    28482: { message: "Zero key" },
    29587: { message: "Escrow mismatch" },
    30271: { message: "Closed extension total" },
    30680: { message: "Not overdue" },
    31908: { message: "No op" },
    32239: { message: "Borrower or owner only" },
    32604: { message: "Timelock" },
    35140: { message: "Unknown operation recovery disabled" },
    36074: { message: "Liquidation already pending" },
    36281: { message: "Recovery terms mismatch" },
    36371: { message: "Recovery paid-interest mismatch" },
    36497: { message: "Recovery due mismatch" },
    36692: { message: "Zero op" },
    36945: { message: "Loan not payable" },
    37408: { message: "New due mismatch" },
    38705: { message: "Closed interest mismatch" },
    38727: { message: "Underpaid" },
    38896: { message: "Interest underpaid" },
    39002: { message: "Not recoverable" },
    39015: { message: "Send at least 0.5 TON" },
    39573: { message: "Use RescueNft for the loan NFT" },
    39592: { message: "Wrong operation" },
    40140: { message: "Duplicate mismatch" },
    40211: { message: "Not claimable" },
    40322: { message: "Send at least 0.25" },
    40706: { message: "Pending accounting underflow" },
    40736: { message: "Extension sequence mismatch" },
    40885: { message: "RatePerDay mismatch" },
    41136: { message: "Rescue not armed long enough" },
    41984: { message: "Wrong attempt" },
    42034: { message: "Principal mismatch" },
    42340: { message: "Too early" },
    42617: { message: "Bad total days" },
    42753: { message: "Wrong pending recipient" },
    42804: { message: "Extension state mismatch" },
    43151: { message: "Not aborting" },
    44200: { message: "No abort confirmation pending" },
    44364: { message: "No pending return" },
    44752: { message: "No operation for escrow" },
    44940: { message: "Reserve" },
    44968: { message: "Recovery sequence" },
    45498: { message: "Bad duplicate extension" },
    46113: { message: "Transfer not confirmed bounced" },
    46222: { message: "Days 1..7" },
    46580: { message: "Bad operation ID" },
    48885: { message: "Stale interest payment" },
    48889: { message: "Not stuck long enough" },
    49907: { message: "Recovery debt invariant" },
    50024: { message: "Unknown term" },
    50051: { message: "Bad recovery totals" },
    50197: { message: "Bad previous state" },
    50209: { message: "Recovery repay mismatch" },
    50271: { message: "Only CANCEL_PENDING" },
    52398: { message: "Send at least 0.06" },
    52715: { message: "Wrong nft" },
    52943: { message: "No confirmed NFT transfer bounce" },
    53174: { message: "To must be borrower" },
    53754: { message: "Use RescuePreparedNft" },
    53898: { message: "No active loan" },
    54669: { message: "Extra interest mismatch" },
    55118: { message: "Bad rescue destination" },
    55524: { message: "NFT mismatch" },
    55830: { message: "Bad snapshot" },
    57144: { message: "Pool cannot own itself" },
    57920: { message: "Owner only" },
    57941: { message: "Duplicate interest mismatch" },
    58585: { message: "Not liquidated" },
    58837: { message: "Extension days mismatch" },
    59810: { message: "Repay mismatch" },
    59852: { message: "Interest amount mismatch" },
    60587: { message: "Closed extension mismatch" },
    61491: { message: "New repay mismatch" },
    61530: { message: "Not active" },
    61707: { message: "Not liquidator or owner" },
    62132: { message: "Send at least 0.15" },
    62200: { message: "Not closed" },
    62226: { message: "Bad destination" },
    63109: { message: "Send extra + 0.10" },
} as const

export const LoanEscrow_errors_backward = {
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
    "Interest accounting": 2103,
    "Previous extension sync pending": 2410,
    "Bad rate": 4316,
    "Cannot rescue to pool": 4521,
    "Extension limit": 4835,
    "Must return to recorded recipient": 4873,
    "Confirmation already acknowledged": 5111,
    "Missing liquidation recipient": 5672,
    "Escrow gas reserve too low": 6120,
    "No active escrow for NFT": 6607,
    "Zero amount": 7189,
    "Recovery duplicate mismatch": 7316,
    "Bad proposal": 7705,
    "Send principal + interest": 7906,
    "Not awaiting liquidation confirmation": 8324,
    "Pool cannot liquidate": 9033,
    "Not failed": 9527,
    "Extension sequence": 9558,
    "Not pending owner": 10407,
    "Not a foreign NFT": 10586,
    "Already liquidated": 10825,
    "Not escrow": 11244,
    "Not issued or already finalized": 11688,
    "Zero operation": 12258,
    "Amount mismatch": 14101,
    "Keys must differ": 14192,
    "Bad state": 14430,
    "Not cancellable": 15018,
    "Pool only": 15461,
    "Zero limit": 16013,
    "NFT transfer not confirmed bounced": 16091,
    "No pending extension sync": 16945,
    "Closed extension days": 17021,
    "No proposal": 18063,
    "Wrong op": 18482,
    "Send at least 0.12": 18679,
    "No abort pending": 18683,
    "Bad duplicate total": 19585,
    "Not borrower": 20255,
    "Recovery identity mismatch": 20290,
    "Not liquidating": 21106,
    "Not active or retryable": 21962,
    "DueAt mismatch": 22303,
    "Not recipient": 23720,
    "Recovery interest mismatch": 23975,
    "Bad liquidation recipient": 24245,
    "Bad extension": 24972,
    "Not repaying": 25097,
    "No operation": 25389,
    "Extension sync pending": 26108,
    "Too late": 26949,
    "Stale liquidation attempt": 28125,
    "Not cancelled": 28182,
    "Borrower mismatch": 28411,
    "Zero key": 28482,
    "Escrow mismatch": 29587,
    "Closed extension total": 30271,
    "Not overdue": 30680,
    "No op": 31908,
    "Borrower or owner only": 32239,
    "Timelock": 32604,
    "Unknown operation recovery disabled": 35140,
    "Liquidation already pending": 36074,
    "Recovery terms mismatch": 36281,
    "Recovery paid-interest mismatch": 36371,
    "Recovery due mismatch": 36497,
    "Zero op": 36692,
    "Loan not payable": 36945,
    "New due mismatch": 37408,
    "Closed interest mismatch": 38705,
    "Underpaid": 38727,
    "Interest underpaid": 38896,
    "Not recoverable": 39002,
    "Send at least 0.5 TON": 39015,
    "Use RescueNft for the loan NFT": 39573,
    "Wrong operation": 39592,
    "Duplicate mismatch": 40140,
    "Not claimable": 40211,
    "Send at least 0.25": 40322,
    "Pending accounting underflow": 40706,
    "Extension sequence mismatch": 40736,
    "RatePerDay mismatch": 40885,
    "Rescue not armed long enough": 41136,
    "Wrong attempt": 41984,
    "Principal mismatch": 42034,
    "Too early": 42340,
    "Bad total days": 42617,
    "Wrong pending recipient": 42753,
    "Extension state mismatch": 42804,
    "Not aborting": 43151,
    "No abort confirmation pending": 44200,
    "No pending return": 44364,
    "No operation for escrow": 44752,
    "Reserve": 44940,
    "Recovery sequence": 44968,
    "Bad duplicate extension": 45498,
    "Transfer not confirmed bounced": 46113,
    "Days 1..7": 46222,
    "Bad operation ID": 46580,
    "Stale interest payment": 48885,
    "Not stuck long enough": 48889,
    "Recovery debt invariant": 49907,
    "Unknown term": 50024,
    "Bad recovery totals": 50051,
    "Bad previous state": 50197,
    "Recovery repay mismatch": 50209,
    "Only CANCEL_PENDING": 50271,
    "Send at least 0.06": 52398,
    "Wrong nft": 52715,
    "No confirmed NFT transfer bounce": 52943,
    "To must be borrower": 53174,
    "Use RescuePreparedNft": 53754,
    "No active loan": 53898,
    "Extra interest mismatch": 54669,
    "Bad rescue destination": 55118,
    "NFT mismatch": 55524,
    "Bad snapshot": 55830,
    "Pool cannot own itself": 57144,
    "Owner only": 57920,
    "Duplicate interest mismatch": 57941,
    "Not liquidated": 58585,
    "Extension days mismatch": 58837,
    "Repay mismatch": 59810,
    "Interest amount mismatch": 59852,
    "Closed extension mismatch": 60587,
    "New repay mismatch": 61491,
    "Not active": 61530,
    "Not liquidator or owner": 61707,
    "Send at least 0.15": 62132,
    "Not closed": 62200,
    "Bad destination": 62226,
    "Send extra + 0.10": 63109,
} as const

const LoanEscrow_types: ABIType[] = [
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
    {"name":"Excesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"NftTransfer","header":1607220500,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"LoanRequest","header":2953982993,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"borrower","type":{"kind":"simple","type":"address","optional":false}},{"name":"principal","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"valuation","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"valuationExp","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"term","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"exp","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"rateBps","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"ratePerDayBps","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"sig","type":{"kind":"simple","type":"cell","optional":false}},{"name":"sig2","type":{"kind":"simple","type":"cell","optional":false}},{"name":"sig3","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"LoanPrepare","header":2953982994,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"repay","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"principal","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"dueAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"ratePerDayBps","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LoanReady","header":2953983011,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"borrower","type":{"kind":"simple","type":"address","optional":false}},{"name":"repay","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"principal","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"dueAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"ratePerDayBps","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LoanFinalize","header":2953983012,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LoanRejected","header":2953982995,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"RejectByEscrow","header":2953983057,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LoanFinalizedAck","header":2953983035,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"RescueNft","header":2953982996,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Rescue","header":2953982997,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RescueAnyNft","header":2953982998,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RescuePreparedNft","header":2953983013,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RescuePrepared","header":2953983014,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ReleasePendingNft","header":2953983018,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ResendFinalize","header":2953983021,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CancelAck","header":2953983042,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LoanClosed","header":2953983044,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"RepayInit","header":2953983045,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"principal","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"interest","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"RepayAck","header":2953983046,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"ResendRepayAck","header":2953983047,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"RedirectReturn","header":2953983056,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RescueForeignNft","header":2953983069,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"foreignNft","type":{"kind":"simple","type":"address","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RescueForeign","header":2953983070,"fields":[{"name":"foreignNft","type":{"kind":"simple","type":"address","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SignersProposed","header":2953983077,"fields":[{"name":"applyAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"SignersApplied","header":2953983078,"fields":[]},
    {"name":"MaxLoanChanged","header":2953983081,"fields":[{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"MaxLoanProposed","header":2953983082,"fields":[{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"applyAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LiquidatorChanged","header":2953983083,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"OwnerProposed","header":2953983084,"fields":[{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"OwnerChanged","header":2953983085,"fields":[{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RescueArmed","header":2953983086,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Repay","header":2953982978,"fields":[]},
    {"name":"ExtendLoan","header":2953983030,"fields":[{"name":"extDays","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LiquidateNft","header":2953983001,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LiquidateByPool","header":2953983002,"fields":[{"name":"attemptId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"caller","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Withdraw","header":2953982980,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"SetMaxLoan","header":2953982981,"fields":[{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ProposeSigners","header":2953983019,"fields":[{"name":"k1","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"k2","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"k3","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"ApplySigners","header":2953983020,"fields":[]},
    {"name":"ProposeOwner","header":2953982983,"fields":[{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"AcceptOwner","header":2953982984,"fields":[]},
    {"name":"ClaimReturn","header":2953983072,"fields":[]},
    {"name":"ResendLiquidation","header":2953983073,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"ApplyMaxLoan","header":2953983076,"fields":[]},
    {"name":"ProposeRate","header":2953983024,"fields":[{"name":"term","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"rateBps","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"ApplyRate","header":2953983025,"fields":[{"name":"term","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"CancelRate","header":2953983026,"fields":[{"name":"term","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"LoanIssued","header":2953983008,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"borrower","type":{"kind":"simple","type":"address","optional":false}},{"name":"principal","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"repay","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"dueAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LoanRepaid","header":2953983009,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"borrower","type":{"kind":"simple","type":"address","optional":false}},{"name":"repay","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LoanLiquidated","header":2953983010,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LoanAborted","header":2953983015,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"reason","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LoanPrepared","header":2953983016,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"principal","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"repay","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"dueAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LoanFinalized","header":2953983017,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"RateProposed","header":2953983027,"fields":[{"name":"term","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"oldRateBps","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"newRateBps","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"applyAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"RateApplied","header":2953983028,"fields":[{"name":"term","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"newRateBps","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"RateCancelled","header":2953983029,"fields":[{"name":"term","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"LoanExtended","header":2953983031,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"borrower","type":{"kind":"simple","type":"address","optional":false}},{"name":"extensionDays","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"totalExtendedDays","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"extraInterest","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"newDueAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"newRepay","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"FinalizeBounce","header":2953983033,"fields":[{"name":"escrow","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CancelBounce","header":2953983054,"fields":[{"name":"escrow","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RepayBounce","header":2953983048,"fields":[{"name":"escrow","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RescuePreparedRefused","header":2953983034,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LoanConfirmed","header":2953983036,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"NftReturnFailed","header":2953983037,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LtvRejected","header":2953983041,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"principal","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"valuation","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"LiquidationBounty","header":2953983058,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"caller","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LiquidationRefused","header":2953983060,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"caller","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ExtensionSyncAck","header":2953983061,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"totalExtendedDays","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"newDueAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"newRepay","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"interestPaid","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"ResyncExtension","header":2953983062,"fields":[]},
    {"name":"ExtensionSyncBounce","header":2953983063,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"stage","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"SetLiquidator","header":2953983064,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"LiquidationDone","header":2953983065,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"caller","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LiquidationNftBounce","header":2953983088,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"attemptId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LiquidationConfirmed","header":2953983089,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"attemptId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LiquidationConfirmationAck","header":2953983090,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"attemptId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"ExtensionInterestPayment","header":2953983091,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"totalExtendedDays","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ExtensionInterestPaid","header":2953983092,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"totalExtendedDays","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"ResyncExtensionFor","header":2953983068,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"ResendReject","header":2953983094,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"OwnerForceLiquidate","header":2953983095,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"OwnerAbortLiquidation","header":2953983096,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"AbortLiquidation","header":2953983097,"fields":[{"name":"attemptId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"nft","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LiquidationAbortAck","header":2953983100,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"attemptId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"ResendLiquidationAbort","header":2953983101,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LiquidationAbortConfirmed","header":2953983102,"fields":[{"name":"attemptId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"nft","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LiquidationAbortFinalAck","header":2953983103,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"attemptId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"PrepareEscrow","header":2953983104,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"EscrowBootstrap","header":2953983105,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"EscrowReady","header":2953983106,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LiquidationAborted","header":2953983098,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"reason","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"ExtensionRecovery","header":2953983067,"fields":[{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"borrower","type":{"kind":"simple","type":"address","optional":false}},{"name":"principal","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"ratePerDayBps","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"extensionDays","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"totalExtendedDays","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"extraInterest","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"paidInterest","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"newDueAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"newRepay","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"operationId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"OpInfo","header":null,"fields":[{"name":"state","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"prevState","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"principal","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"repay","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"dueAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"pending","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"ratePerDay","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"extendedDays","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"paidInterest","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"opId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"borrower","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidator","type":{"kind":"simple","type":"address","optional":true}},{"name":"liquidationTo","type":{"kind":"simple","type":"address","optional":true}},{"name":"liquidationAttempt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"liquidationRetryReady","type":{"kind":"simple","type":"bool","optional":false}},{"name":"liquidationConfirmPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"extensionInterestPaidDays","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"lastExtensionExtra","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"since","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"GiftLoanPool$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"signerKey1","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"signerKey2","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"signerKey3","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"maxLoan","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"pendingOwner","type":{"kind":"simple","type":"address","optional":true}},{"name":"designatedLiquidator","type":{"kind":"simple","type":"address","optional":true}},{"name":"pendingTotal","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"ops","type":{"kind":"dict","key":"address","value":"OpInfo","valueFormat":"ref"}},{"name":"activeEscrowByNft","type":{"kind":"dict","key":"address","value":"address"}},{"name":"escrowReady","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"rateBps","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"uint","valueFormat":32}},{"name":"nextRateBps","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"uint","valueFormat":32}},{"name":"rateApplyAt","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"uint","valueFormat":32}},{"name":"nextSigner1","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"nextSigner2","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"nextSigner3","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"signersAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"nextMaxLoan","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"maxLoanAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"LoanEscrow$Data","header":null,"fields":[{"name":"pool","type":{"kind":"simple","type":"address","optional":false}},{"name":"nft","type":{"kind":"simple","type":"address","optional":false}},{"name":"opId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"loanState","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"spent","type":{"kind":"simple","type":"bool","optional":false}},{"name":"borrower","type":{"kind":"simple","type":"address","optional":true}},{"name":"principal","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"repay","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"paidInterest","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"repayDue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"dueAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"reqAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"preparedAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"ratePerDayBps","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"extendedDays","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"extensionSyncPending","type":{"kind":"simple","type":"bool","optional":false}},{"name":"extensionSyncAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lastExtensionDays","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"lastExtraInterest","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"pendingReturnTo","type":{"kind":"simple","type":"address","optional":true}},{"name":"returnAttempts","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"returnQuerySeq","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"pendingReturnQueryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"rescueArmedAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"rescueArmedTo","type":{"kind":"simple","type":"address","optional":true}},{"name":"lastDepositor","type":{"kind":"simple","type":"address","optional":true}},{"name":"returnSetAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"repayPayer","type":{"kind":"simple","type":"address","optional":true}},{"name":"liquidated","type":{"kind":"simple","type":"bool","optional":false}},{"name":"liquidationAttempt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lastAbortedLiquidationAttempt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"bootstrapReady","type":{"kind":"simple","type":"bool","optional":false}}]},
]

const LoanEscrow_opcodes = {
    "OwnershipAssigned": 85167505,
    "Excesses": 3576854235,
    "NftTransfer": 1607220500,
    "LoanRequest": 2953982993,
    "LoanPrepare": 2953982994,
    "LoanReady": 2953983011,
    "LoanFinalize": 2953983012,
    "LoanRejected": 2953982995,
    "RejectByEscrow": 2953983057,
    "LoanFinalizedAck": 2953983035,
    "RescueNft": 2953982996,
    "Rescue": 2953982997,
    "RescueAnyNft": 2953982998,
    "RescuePreparedNft": 2953983013,
    "RescuePrepared": 2953983014,
    "ReleasePendingNft": 2953983018,
    "ResendFinalize": 2953983021,
    "CancelAck": 2953983042,
    "LoanClosed": 2953983044,
    "RepayInit": 2953983045,
    "RepayAck": 2953983046,
    "ResendRepayAck": 2953983047,
    "RedirectReturn": 2953983056,
    "RescueForeignNft": 2953983069,
    "RescueForeign": 2953983070,
    "SignersProposed": 2953983077,
    "SignersApplied": 2953983078,
    "MaxLoanChanged": 2953983081,
    "MaxLoanProposed": 2953983082,
    "LiquidatorChanged": 2953983083,
    "OwnerProposed": 2953983084,
    "OwnerChanged": 2953983085,
    "RescueArmed": 2953983086,
    "Repay": 2953982978,
    "ExtendLoan": 2953983030,
    "LiquidateNft": 2953983001,
    "LiquidateByPool": 2953983002,
    "Withdraw": 2953982980,
    "SetMaxLoan": 2953982981,
    "ProposeSigners": 2953983019,
    "ApplySigners": 2953983020,
    "ProposeOwner": 2953982983,
    "AcceptOwner": 2953982984,
    "ClaimReturn": 2953983072,
    "ResendLiquidation": 2953983073,
    "ApplyMaxLoan": 2953983076,
    "ProposeRate": 2953983024,
    "ApplyRate": 2953983025,
    "CancelRate": 2953983026,
    "LoanIssued": 2953983008,
    "LoanRepaid": 2953983009,
    "LoanLiquidated": 2953983010,
    "LoanAborted": 2953983015,
    "LoanPrepared": 2953983016,
    "LoanFinalized": 2953983017,
    "RateProposed": 2953983027,
    "RateApplied": 2953983028,
    "RateCancelled": 2953983029,
    "LoanExtended": 2953983031,
    "FinalizeBounce": 2953983033,
    "CancelBounce": 2953983054,
    "RepayBounce": 2953983048,
    "RescuePreparedRefused": 2953983034,
    "LoanConfirmed": 2953983036,
    "NftReturnFailed": 2953983037,
    "LtvRejected": 2953983041,
    "LiquidationBounty": 2953983058,
    "LiquidationRefused": 2953983060,
    "ExtensionSyncAck": 2953983061,
    "ResyncExtension": 2953983062,
    "ExtensionSyncBounce": 2953983063,
    "SetLiquidator": 2953983064,
    "LiquidationDone": 2953983065,
    "LiquidationNftBounce": 2953983088,
    "LiquidationConfirmed": 2953983089,
    "LiquidationConfirmationAck": 2953983090,
    "ExtensionInterestPayment": 2953983091,
    "ExtensionInterestPaid": 2953983092,
    "ResyncExtensionFor": 2953983068,
    "ResendReject": 2953983094,
    "OwnerForceLiquidate": 2953983095,
    "OwnerAbortLiquidation": 2953983096,
    "AbortLiquidation": 2953983097,
    "LiquidationAbortAck": 2953983100,
    "ResendLiquidationAbort": 2953983101,
    "LiquidationAbortConfirmed": 2953983102,
    "LiquidationAbortFinalAck": 2953983103,
    "PrepareEscrow": 2953983104,
    "EscrowBootstrap": 2953983105,
    "EscrowReady": 2953983106,
    "LiquidationAborted": 2953983098,
    "ExtensionRecovery": 2953983067,
}

const LoanEscrow_getters: ABIGetter[] = [
    {"name":"loanState","methodId":125486,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"pendingReturnQueryIdValue","methodId":114442,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"operationId","methodId":91544,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"isSpent","methodId":117906,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"pendingReturnToAddress","methodId":70247,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":true}},
    {"name":"borrowerAddress","methodId":116859,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":true}},
    {"name":"dueAtTs","methodId":122533,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"repayAmount","methodId":123839,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"repayDueNow","methodId":129124,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"extensionSyncIsPending","methodId":107996,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"principalAmount","methodId":74316,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"rescueArmedTs","methodId":117614,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"lastDepositorAddress","methodId":100951,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":true}},
    {"name":"returnSetTs","methodId":127177,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"isLiquidated","methodId":113058,"arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
]

export const LoanEscrow_getterMapping: { [key: string]: string } = {
    'loanState': 'getLoanState',
    'pendingReturnQueryIdValue': 'getPendingReturnQueryIdValue',
    'operationId': 'getOperationId',
    'isSpent': 'getIsSpent',
    'pendingReturnToAddress': 'getPendingReturnToAddress',
    'borrowerAddress': 'getBorrowerAddress',
    'dueAtTs': 'getDueAtTs',
    'repayAmount': 'getRepayAmount',
    'repayDueNow': 'getRepayDueNow',
    'extensionSyncIsPending': 'getExtensionSyncIsPending',
    'principalAmount': 'getPrincipalAmount',
    'rescueArmedTs': 'getRescueArmedTs',
    'lastDepositorAddress': 'getLastDepositorAddress',
    'returnSetTs': 'getReturnSetTs',
    'isLiquidated': 'getIsLiquidated',
}

const LoanEscrow_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"EscrowBootstrap"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Excesses"}},
    {"receiver":"internal","message":{"kind":"typed","type":"OwnershipAssigned"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LoanPrepare"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LoanFinalize"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LoanRejected"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RejectByEscrow"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RescuePrepared"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExtendLoan"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Repay"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExtensionSyncAck"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExtensionInterestPaid"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ResyncExtension"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RepayAck"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LiquidateByPool"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LiquidationConfirmed"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AbortLiquidation"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LiquidationAbortConfirmed"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Rescue"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RescueForeign"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RedirectReturn"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimReturn"}},
]

export const MIN_RESERVE = 100000000n;
export const POOL_FEE_BUFFER = 0n;
export const GAS = 120000000n;
export const ESCROW_KEEP = 10000000n;
export const ESCROW_ACTIVE_RESERVE = 150000000n;
export const REPAY_ESCROW_MIN = 130000000n;
export const CLOSE_NFT_VALUE = 50000000n;
export const REPAY_GRACE = 86400n;
export const REQUEST_VALUE = 120000000n;
export const READY_VALUE = 80000000n;
export const ACK_VALUE = 10000000n;
export const LIQUIDATE_MIN = 250000000n;
export const STUCK_AFTER = 3600n;
export const ESCROW_MIN_BALANCE = 200000000n;
export const ESCROW_PREPARE_MIN = 500000000n;
export const PREPARED_RESCUE_DELAY = 3600n;
export const RESCUE_ARM_DELAY = 300n;
export const RESCUE_ARM_WINDOW = 3600n;
export const RESEND_PUBLIC_DELAY = 3600n;
export const SIGNER_DELAY = 86400n;
export const RATE_DELAY = 86400n;
export const MAX_RATE_BPS = 10000n;
export const MAX_EXTENSION_PER_CALL = 7n;
export const MAX_TOTAL_EXTENSION = 7n;
export const EXTEND_GAS = 100000000n;
export const MAX_LTV_BPS = 4000n;
export const LIQUIDATE_BOUNTY = 100000000n;
export const LIQUIDATION_TRANSFER_VALUE = 200000000n;
export const LIQUIDATION_FORWARD_VALUE = 50000000n;
export const PUBLIC_RESCUE_DELAY = 604800n;
export const RETURN_CLAIM_DELAY = 86400n;
export const ADMIN_DELAY = 86400n;
export const REPAY_ACK_VALUE = 50000000n;
export const RESCUE_VALUE = 150000000n;
export const RESYNC_VALUE = 120000000n;
export const RESYNC_MIN = 60000000n;
export const REPAY_POOL_FEE = 30000000n;
export const EXTEND_SYNC_VALUE = 50000000n;
export const LIQUIDATION_STUCK_AFTER = 86400n;
export const POOL_REQUESTED = 1n;
export const POOL_ISSUED = 3n;
export const POOL_FINALIZED = 4n;
export const POOL_CLOSED = 5n;
export const POOL_CANCEL_PENDING = 7n;
export const POOL_LIQUIDATING = 8n;
export const POOL_LIQUIDATED = 9n;
export const POOL_CANCELLED = 10n;
export const POOL_ABORT_PENDING = 11n;
export const POOL_ABORT_CONFIRM_PENDING = 12n;
export const LS_IDLE = 0n;
export const LS_REQUESTED = 1n;
export const LS_PREPARED = 2n;
export const LS_READY_BOUNCED = 3n;
export const LS_ACTIVE = 4n;
export const LS_CLOSED = 6n;
export const LS_ABORTED = 7n;
export const LS_RETURN_FAILED = 8n;
export const LS_REPAYING = 9n;
export const LS_LIQUIDATION_PENDING = 10n;
export const LS_ABORTING = 11n;

export class LoanEscrow implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = LoanEscrow_errors_backward;
    public static readonly opcodes = LoanEscrow_opcodes;
    
    static async init(pool: Address, nft: Address, opId: bigint) {
        return await LoanEscrow_init(pool, nft, opId);
    }
    
    static async fromInit(pool: Address, nft: Address, opId: bigint) {
        const __gen_init = await LoanEscrow_init(pool, nft, opId);
        const address = contractAddress(0, __gen_init);
        return new LoanEscrow(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new LoanEscrow(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  LoanEscrow_types,
        getters: LoanEscrow_getters,
        receivers: LoanEscrow_receivers,
        errors: LoanEscrow_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | EscrowBootstrap | Excesses | OwnershipAssigned | LoanPrepare | LoanFinalize | LoanRejected | RejectByEscrow | RescuePrepared | ExtendLoan | Repay | ExtensionSyncAck | ExtensionInterestPaid | ResyncExtension | RepayAck | LiquidateByPool | LiquidationConfirmed | AbortLiquidation | LiquidationAbortConfirmed | Rescue | RescueForeign | RedirectReturn | ClaimReturn) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'EscrowBootstrap') {
            body = beginCell().store(storeEscrowBootstrap(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Excesses') {
            body = beginCell().store(storeExcesses(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'OwnershipAssigned') {
            body = beginCell().store(storeOwnershipAssigned(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LoanPrepare') {
            body = beginCell().store(storeLoanPrepare(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LoanFinalize') {
            body = beginCell().store(storeLoanFinalize(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LoanRejected') {
            body = beginCell().store(storeLoanRejected(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RejectByEscrow') {
            body = beginCell().store(storeRejectByEscrow(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RescuePrepared') {
            body = beginCell().store(storeRescuePrepared(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExtendLoan') {
            body = beginCell().store(storeExtendLoan(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Repay') {
            body = beginCell().store(storeRepay(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExtensionSyncAck') {
            body = beginCell().store(storeExtensionSyncAck(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExtensionInterestPaid') {
            body = beginCell().store(storeExtensionInterestPaid(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ResyncExtension') {
            body = beginCell().store(storeResyncExtension(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RepayAck') {
            body = beginCell().store(storeRepayAck(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LiquidateByPool') {
            body = beginCell().store(storeLiquidateByPool(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LiquidationConfirmed') {
            body = beginCell().store(storeLiquidationConfirmed(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AbortLiquidation') {
            body = beginCell().store(storeAbortLiquidation(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LiquidationAbortConfirmed') {
            body = beginCell().store(storeLiquidationAbortConfirmed(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Rescue') {
            body = beginCell().store(storeRescue(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RescueForeign') {
            body = beginCell().store(storeRescueForeign(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RedirectReturn') {
            body = beginCell().store(storeRedirectReturn(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClaimReturn') {
            body = beginCell().store(storeClaimReturn(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getLoanState(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('loanState', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getPendingReturnQueryIdValue(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('pendingReturnQueryIdValue', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getOperationId(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('operationId', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getIsSpent(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('isSpent', builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getPendingReturnToAddress(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('pendingReturnToAddress', builder.build())).stack;
        const result = source.readAddressOpt();
        return result;
    }
    
    async getBorrowerAddress(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('borrowerAddress', builder.build())).stack;
        const result = source.readAddressOpt();
        return result;
    }
    
    async getDueAtTs(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('dueAtTs', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getRepayAmount(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('repayAmount', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getRepayDueNow(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('repayDueNow', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getExtensionSyncIsPending(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('extensionSyncIsPending', builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getPrincipalAmount(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('principalAmount', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getRescueArmedTs(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('rescueArmedTs', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getLastDepositorAddress(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('lastDepositorAddress', builder.build())).stack;
        const result = source.readAddressOpt();
        return result;
    }
    
    async getReturnSetTs(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('returnSetTs', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getIsLiquidated(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('isLiquidated', builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
}