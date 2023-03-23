import {DataSource} from "typeorm";
import Carbonite from "./carbonite";

export default abstract class ModuleManager {
	constructor() { Carbonite.addModuleManager(this);}
	abstract initialize(dataSource: DataSource): void;
}