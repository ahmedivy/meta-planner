import MetaApi from "metaapi.cloud-sdk";

const token = process.env.META_API_TOKEN;
const api = new MetaApi(token);

export { api };
