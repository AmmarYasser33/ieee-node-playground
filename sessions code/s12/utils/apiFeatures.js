class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const filter = { ...this.queryStr };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((filed) => delete filter[filed]);

    let filterStr = JSON.stringify(filter);
    filterStr = filterStr.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(filterStr));

    return this;
  }

  sort() {
    // -price,title
    // -price title
    if (this.queryStr.sort) {
      this.query.sort(this.queryStr.sort.split(",").join(" "));
    } else {
      this.query.sort("createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      this.query.select(this.queryStr.fields.split(",").join(" "));
    } else {
      this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = parseInt(this.queryStr.page);
    const limit = parseInt(this.queryStr.limit);
    const skip = (page - 1) * limit; // (2 - 1) * 5 , (3-1)*5

    this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeatures;
