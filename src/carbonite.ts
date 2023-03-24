import {DataSource} from "typeorm";
import ModuleManager from "./module-manager";

export default class Carbonite {

	private static moduleManagers: Array<ModuleManager> = [];

	static addModuleManager(moduleManager: ModuleManager) {Carbonite.moduleManagers.push(moduleManager);}

	static async initialize(dataSource: DataSource) {
		for (let moduleManager of Carbonite.moduleManagers) await moduleManager.initialize(dataSource);
		return dataSource;
	}
}

