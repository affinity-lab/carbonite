import {BaseEntity, In, PrimaryGeneratedColumn, type SaveOptions} from "typeorm";
import {transfer} from "@affinity-lab/util";


export default class Atom extends BaseEntity {

	@PrimaryGeneratedColumn() id: number;

	public save(): Promise<this> {
		return super.save({transaction: false});
	}

	static async pick<T extends Atom>(this: { new(): T; } & typeof Atom, id: number): Promise<T | null> {
		if (typeof id !== "number" || isNaN(id)) return null;
		return await this.findOneBy({id}) as T;
	}

	static async collect<T extends Atom>(this: { new(): T; } & typeof Atom, ...id: Array<number>): Promise<Array<T>> {
		return await this.findBy({id: In(id)}) as Array<T>;
	}

	static export(items: Array<Atom>, ...properties: Array<string>): Array<object> {
		let data = [];
		items.forEach(item => data.push(transfer.export(item, ...properties)))
		return data;
	}

	export(...properties: Array<string>): object {return transfer.export(this, ...properties)}
	import(data: object, ...properties: Array<string>) { transfer.import(this, data, ...properties)}
}