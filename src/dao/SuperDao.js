class SuperDao {
	constructor(model) {
		this.Model = model;
	}

	async findAll() {
		return this.Model.findAll();
	}

	async findById(id) {
		return this.Model.findOne({where: {id}});
	}

	async findOneByWhere(where, attributes = null, order = ['id', 'desc']) {
		if (attributes == null) {
			return this.Model.findOne({
				where,
				order: [order],
			});
		}
		return this.Model.findOne({
			where,
			attributes,
			order: [order],
		});
	}

	async updateById(data, id) {
		return this.Model.update(data, {where: {id}});
	}

	async updateWhere(data, where) {
		return this.Model.update(data, {where});
	}

	async create(data) {
		const newData = new this.Model(data);
		return newData.save();
	}

	async findByWhere(
		where,
		attributes = undefined,
		order = ['id', 'asc'],
		limit = null,
		offset = null,
	) {
		return this.Model.findAll({
			where,
			attributes,
			order: [order],
			limit,
			offset,
		});
	}

	async deleteByWhere(where) {
		return this.Model.destroy({where});
	}

	async bulkCreate(data) {
		return this.Model.bulkCreate(data);
	}

	async getDataTableData(where, limit, offset) {
		return this.Model.findAndCountAll({
			limit: parseInt(limit, 10),
			offset: parseInt(offset, 10),
			where,
			order: [['id', 'DESC']],
		});
	}
}

module.exports = SuperDao;
