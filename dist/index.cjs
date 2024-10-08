"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  checkSignature: () => import_core_cst.checkSignature,
  cst: () => cst,
  deserializeAddress: () => deserializeAddress,
  deserializeDatum: () => deserializeDatum,
  deserializePoolId: () => deserializePoolId,
  generateNonce: () => import_core_cst.generateNonce,
  resolveDataHash: () => resolveDataHash,
  resolveNativeScriptAddress: () => resolveNativeScriptAddress,
  resolveNativeScriptHash: () => resolveNativeScriptHash,
  resolveNativeScriptHex: () => resolveNativeScriptHex,
  resolvePaymentKeyHash: () => resolvePaymentKeyHash,
  resolvePlutusScriptAddress: () => resolvePlutusScriptAddress,
  resolvePlutusScriptHash: () => resolvePlutusScriptHash,
  resolvePoolId: () => resolvePoolId,
  resolvePrivateKey: () => resolvePrivateKey,
  resolveRewardAddress: () => resolveRewardAddress,
  resolveScriptHash: () => resolveScriptHash,
  resolveScriptRef: () => resolveScriptRef,
  resolveStakeKeyHash: () => resolveStakeKeyHash,
  resolveTxHash: () => resolveTxHash,
  serializeAddressObj: () => serializeAddressObj,
  serializeNativeScript: () => serializeNativeScript,
  serializePlutusScript: () => serializePlutusScript,
  serializePoolId: () => serializePoolId,
  serializeRewardAddress: () => serializeRewardAddress,
  signData: () => import_core_cst.signData
});
module.exports = __toCommonJS(src_exports);

// src/core.ts
var core = __toESM(require("@meshsdk/core-csl"), 1);

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
__reExport(src_exports, require("@meshsdk/common"), module.exports);
var cst = __toESM(require("@meshsdk/core-cst"), 1);
__reExport(src_exports, require("@meshsdk/provider"), module.exports);
__reExport(src_exports, require("@meshsdk/transaction"), module.exports);
__reExport(src_exports, require("@meshsdk/wallet"), module.exports);
var import_core_cst = require("@meshsdk/core-cst");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
  signData,
  ...require("@meshsdk/common"),
  ...require("@meshsdk/provider"),
  ...require("@meshsdk/transaction"),
  ...require("@meshsdk/wallet")
});
