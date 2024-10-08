import { Data, NativeScript, LanguageVersion, PlutusScript, DeserializedAddress, PubKeyAddress, ScriptAddress } from '@meshsdk/common';
export * from '@meshsdk/common';
import * as coreCst from '@meshsdk/core-cst';
export { coreCst as cst };
export { checkSignature, generateNonce, signData } from '@meshsdk/core-cst';
export * from '@meshsdk/provider';
export * from '@meshsdk/transaction';
export * from '@meshsdk/wallet';

/**
 * Resolve the private key from mnemonic words
 *
 * Update pending to support resolving a tree of private key
 *
 * @param words The mnemonic words
 * @returns The private key
 */
declare const resolvePrivateKey: (words: string[]) => string;
/**
 * Resolve the transaction hash from transaction hex
 * @param txHex The transaction hex
 * @returns The transaction hash
 */
declare const resolveTxHash: (txHex: string) => string;
/**
 * Hash Cardano data
 * @param data Cardano data in Mesh Data type
 * @returns Cardano data hash
 */
declare const resolveDataHash: (data: Data) => string;
/**
 * Hash Cardano native script
 * @param script Cardano native script in Mesh NativeScript type
 * @returns Cardano native script hash
 */
declare const resolveNativeScriptHash: (script: NativeScript) => string;
/**
 * Converting script cbor hex to script hash
 * @param scriptCode The script cbor hex
 * @param version The language version of the plutus script, without providing indicates it is a native script
 * @returns The script hash
 */
declare const resolveScriptHash: (scriptCode: string, version?: LanguageVersion) => string;
/**
 * Resolve the Ed25519 key hash from bech32 address
 * @param bech32 The bech32 address
 * @returns The Ed25519 key hash
 */
declare const resolveRewardAddress: (bech32: string) => string;
/**
 * Resolve the stake key hash from bech32 address
 * @param bech32 The bech32 address, either in addrxxx or stakexxx
 * @returns The stake key hash
 */
declare const resolveStakeKeyHash: (bech32: string) => string;
/**
 * Deprecated - use `serializePlutusScript` instead
 */
declare const resolvePlutusScriptAddress: (script: PlutusScript, networkId?: number) => string;
/**
 * Deprecated - use `serializeNativeScript` instead
 */
declare const resolveNativeScriptAddress: (script: NativeScript, networkId?: number) => string;
/**
 * Deprecated - use `serializeNativeScript` instead
 */
declare const resolveNativeScriptHex: (script: NativeScript) => string;
/**
 * Deprecated - use `deserializeAddress` instead
 */
declare const resolvePaymentKeyHash: (bech32: string) => string;
/**
 * Deprecated - use `deserializeAddress` instead
 */
declare const resolvePlutusScriptHash: (bech32: string) => string;
/**
 * Deprecated - this is more used with the low level process inside Mesh
 *
 * If you need this, please import @meshsdk/core-csl or @meshsdk/core-cst instead
 */
declare const resolveScriptRef: (script: NativeScript | PlutusScript) => string;
/**
 * Deprecated - use `serializePoolId` instead
 */
declare const resolvePoolId: (hash: string) => string;

/**
 * Deserialize bech32 address into payment and staking parts, with visibility of whether they are script or key hash
 * @param bech32 The bech32 address
 * @returns The deserialized address object:
 *
 * ```ts
 * const { pubKeyHash, scriptHash, stakeCredentialHash, stakeScriptCredentialHash } = deserializeAddress(bech32Address);
 * ```
 */
declare const deserializeAddress: (bech32: string) => DeserializedAddress;
/**
 * Deserialize a datum from a CBOR string to JSON object
 * @param datumCbor The CBOR string
 * @returns The deserialized JSON object
 */
declare const deserializeDatum: <T = any>(datumCbor: string) => T;
/**
 * Deserialize a script from a poolxxxx to Ed25519 key hash
 * @param poolId The poolxxxx bech32 pool id
 * @returns The Ed25519 key hash
 */
declare const deserializePoolId: (poolId: string) => string;

/**
 * Serialize Native script into bech32 address
 * @param script The native script object
 * @param networkId 0 (testnet) or 1 (mainnet). Default to be 0 (testnet).
 * @returns Bech32 address
 */
declare const serializeNativeScript: (script: NativeScript, stakeCredentialHash?: string, networkId?: number, isScriptStakeCredential?: boolean) => {
    address: string;
    scriptCbor: string | undefined;
};
/**
 * Serialize Native script into bech32 address
 * @param script The native script object
 * @param networkId 0 (testnet) or 1 (mainnet). Default to be 0 (testnet).
 * @returns Bech32 address
 */
declare const serializePlutusScript: (script: PlutusScript, stakeCredentialHash?: string, networkId?: number, isScriptStakeCredential?: boolean) => {
    address: string;
};
/**
 * Serialize address in Cardano data JSON format into bech32 address
 * @param address The Cardano address in data JSON format
 * @returns Bech32 address
 */
declare const serializeAddressObj: (address: PubKeyAddress | ScriptAddress) => string;
/**
 * Resolve the pool id from hash
 * @param hash The pool hash
 * @returns The pool id
 */
declare const serializePoolId: (hash: string) => string;
/**
 * Serialize a script hash or key hash into bech32 reward address
 * @param hash The script hash or key hash
 * @param isScriptHash Whether the hash is a script hash
 * @param networkId 0 (testnet) or 1 (mainnet). Default to be 0 (testnet).
 * @returns Bech32 reward address
 */
declare const serializeRewardAddress: (hash: string, isScriptHash?: boolean, networkId?: 0 | 1) => string;

export { deserializeAddress, deserializeDatum, deserializePoolId, resolveDataHash, resolveNativeScriptAddress, resolveNativeScriptHash, resolveNativeScriptHex, resolvePaymentKeyHash, resolvePlutusScriptAddress, resolvePlutusScriptHash, resolvePoolId, resolvePrivateKey, resolveRewardAddress, resolveScriptHash, resolveScriptRef, resolveStakeKeyHash, resolveTxHash, serializeAddressObj, serializeNativeScript, serializePlutusScript, serializePoolId, serializeRewardAddress };
