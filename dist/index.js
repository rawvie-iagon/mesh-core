// src/core.ts
import * as core from "@meshsdk/core-csl";

// src/utils/resolver.ts
var resolvePrivateKey = (words) => core.resolvePrivateKey(words);
var resolveTxHash = (txHex) => core.calculateTxHash(txHex);
var resolveDataHash = (data) => core.resolveDataHash(data);
var resolveNativeScriptHash = (script) => core.resolveNativeScriptHash(script);
var resolveScriptHash = (scriptCode, version) => {
  if (!version) {
    return core.deserializeNativeScript(scriptCode).hash().to_hex();
  }
  return core.deserializePlutusScript(scriptCode, version).hash().to_hex();
};
var resolveRewardAddress = (bech32) => core.resolveRewardAddress(bech32);
var resolveStakeKeyHash = (bech32) => core.resolveStakeKeyHash(bech32);
var resolvePlutusScriptAddress = (script, networkId) => core.resolvePlutusScriptAddress(script, networkId);
var resolveNativeScriptAddress = (script, networkId) => core.resolveNativeScriptAddress(script, networkId);
var resolveNativeScriptHex = (script) => core.toNativeScript(script).to_hex();
var resolvePaymentKeyHash = (bech32) => core.deserializeBech32Address(bech32).pubKeyHash;
var resolvePlutusScriptHash = (bech32) => core.deserializeBech32Address(bech32).scriptHash;
var resolveScriptRef = (script) => core.resolveScriptRef(script);
var resolvePoolId = (hash) => core.serializePoolId(hash);

// src/utils/deserializer.ts
var deserializeAddress = (bech32) => core.deserializeBech32Address(bech32);
var deserializeDatum = (datumCbor) => core.parseDatumCbor(datumCbor);
var deserializePoolId = (poolId) => core.resolveEd25519KeyHash(poolId);

// src/utils/serializer.ts
var serializeNativeScript = (script, stakeCredentialHash, networkId = 0, isScriptStakeCredential = false) => {
  const serializer = new core.CSLSerializer();
  const { scriptCbor, scriptHash } = serializer.deserializer.script.deserializeNativeScript(script);
  const deserializedAddress = {
    scriptHash
  };
  if (isScriptStakeCredential) {
    deserializedAddress.stakeScriptCredentialHash = stakeCredentialHash;
  } else {
    deserializedAddress.stakeCredentialHash = stakeCredentialHash;
  }
  const address = serializer.serializeAddress(deserializedAddress, networkId);
  return { address, scriptCbor };
};
var serializePlutusScript = (script, stakeCredentialHash, networkId = 0, isScriptStakeCredential = false) => {
  const scriptHash = core.deserializePlutusScript(script.code, script.version).hash().to_hex();
  const address = core.scriptHashToBech32(
    scriptHash,
    stakeCredentialHash,
    networkId,
    isScriptStakeCredential
  );
  return { address };
};
var serializeAddressObj = (address) => {
  return core.serializeAddressObj(address);
};
var serializePoolId = (hash) => core.serializePoolId(hash);
var serializeRewardAddress = (hash, isScriptHash = false, networkId = 0) => {
  return isScriptHash ? core.scriptHashToRewardAddress(hash, networkId) : core.keyHashToRewardAddress(hash, networkId);
};

// src/index.ts
export * from "@meshsdk/common";
import * as cst from "@meshsdk/core-cst";
export * from "@meshsdk/provider";
export * from "@meshsdk/transaction";
export * from "@meshsdk/wallet";
import { checkSignature, signData, generateNonce } from "@meshsdk/core-cst";
export {
  checkSignature,
  cst,
  deserializeAddress,
  deserializeDatum,
  deserializePoolId,
  generateNonce,
  resolveDataHash,
  resolveNativeScriptAddress,
  resolveNativeScriptHash,
  resolveNativeScriptHex,
  resolvePaymentKeyHash,
  resolvePlutusScriptAddress,
  resolvePlutusScriptHash,
  resolvePoolId,
  resolvePrivateKey,
  resolveRewardAddress,
  resolveScriptHash,
  resolveScriptRef,
  resolveStakeKeyHash,
  resolveTxHash,
  serializeAddressObj,
  serializeNativeScript,
  serializePlutusScript,
  serializePoolId,
  serializeRewardAddress,
  signData
};
