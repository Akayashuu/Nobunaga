import Application from "./Application";

const ApplicationInstance = new Application();
(async (e) => {
	await ApplicationInstance.init();
})();

type ApplicationType = typeof ApplicationInstance;
export { ApplicationInstance, type ApplicationType };
